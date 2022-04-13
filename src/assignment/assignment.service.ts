import { AnswerService } from './../answer/answer.service';
import { QuestionService } from './../question/question.service';
import { ICreateAssignmentDetail, ICreateSubmitAssignment } from './dtos/post-submit-assignment.dto';
import { ICreateAssignment } from './dtos/create-assignment.dto';
import { IUserDto } from './../user/dtos/user.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './assignment.entity';
import { SurveyService } from 'src/survey/survey.service';
import { UserRole } from 'src/common/userRole';

@Injectable()
export class AssignmentService {
  constructor(
  @InjectRepository(Assignment) private readonly repoAssignment: Repository<Assignment>,

  private readonly surveyService:SurveyService,
  private readonly questionService:QuestionService,
  private readonly answerService: AnswerService
  ) {}
  async findOneAssignmentById(id:string ) {
    const assignment = await this.repoAssignment.findOne({where:{id}})
    if (!assignment) {
      throw new HttpException(`Do not found assignment with id ${id}`,HttpStatus.NOT_FOUND)
    }
    return assignment;
  }
  async getAllAssignmentByUser(user: {id:string,role:string}) {
    
    if(user.role === UserRole.ADMIN) {
      return await this.repoAssignment.find()
    }else { 
      return await this.repoAssignment.find({where:{owner:{id:user.id}}})
    }
  }
  async createAssignmentByUser(user:IUserDto,payload:ICreateAssignment) {
    const survey = await this.surveyService.findOneSurvey(payload.surveyId)
    const assignment = this.repoAssignment.create({
      survey,
      owner:user,
    })
    await this.repoAssignment.save(assignment);
    return assignment;
  }
  async createUserQuestionAnswers(payload:ICreateAssignmentDetail) {
    // check question exist
    const question = await this.questionService.findAQuestion(payload.questionId)
    // create User question 
    let amountQuestionIsRight = 0;
    const user_question_answers_promise = payload.userQuestionAnswers.map(async ans => { 
      const answer = await this.answerService.findOneAnswerById(ans.choice_id);
      if(answer.isAnswer){ 
        amountQuestionIsRight++;
      }
      return {choiceAnswer:answer,isRight:answer.isAnswer}
    })
    const user_question_answers = await Promise.all(user_question_answers_promise)
    return {
      question,
      user_question_answers,
      amountQuestionIsRight
    }
  }
  async createAssignDetail(payload:ICreateSubmitAssignment,pointSurvey:number) {
    const assignmentDetailsPromise = await payload.data.map(async el =>  { 
      const {question,user_question_answers,amountQuestionIsRight} = await this.createUserQuestionAnswers(el);
      const answersRight =  question.answers.filter(el  =>  el.isAnswer)
      const pointQuestion = amountQuestionIsRight/ answersRight.length
      pointSurvey+=pointQuestion;
      return  {
        userQuestionAnswers:user_question_answers
        ,pointQuestion
        ,question}
    })
    const assignmentDetails = await Promise.all(assignmentDetailsPromise)
    return {
      assignmentDetails,
      pointSurvey
    }
  } 
  async userSubmitAssignment(id:string, user:{id:string}, payload:ICreateSubmitAssignment) {
  
    const assignment = await this.findOneAssignmentById(id);
    // check assignment of user ? 
    // console.log(assignment)
    if(assignment.owner.id !== user.id) {
      throw new HttpException(`user do not have this assignment`, HttpStatus.BAD_REQUEST)
    }
    // check assignment isFinised 
    if(assignment.isFinished) {
      throw new HttpException(`Bạn đã làm xong assignment này vui lòng làm bài khác }`, HttpStatus.BAD_REQUEST)
    }
    // calculator point and create AssigneDetail
    const {assignmentDetails,pointSurvey} = await this.createAssignDetail(payload,0);
    Object.assign(assignment,{assignmentDetails,pointSurvey,isFinished:true})
    
      return await this.repoAssignment.save(assignment);

  }
  async getOneAssignment(user:{id:string,role:string}, id:string) {
    const assignment = await this.findOneAssignmentById(id)
    // check user have admin 
    // if admin see when finished 
    if(user.role === UserRole.ADMIN) {
      return assignment;
    }
    // if user not' user check assignment of user 
    if (assignment.owner.id !==  user.id) {
      throw new HttpException(`user do not have this assignment }`, HttpStatus.BAD_REQUEST)
    }
    return assignment;
  }
  async deleteOneAssignment(id:string ) {
    const assignment =await  this.findOneAssignmentById(id);
    await this.repoAssignment.remove(assignment);
    return;
  }
}
