
import { UserRole } from '../../common/userRole';
import { User } from './../../user/user.entity';

export const mockedUserNormal:User = {  
  id:"0ad2321c-fc89-4cb0-b059-07880e3a6943",
  username: "thuonggaUser",
  password: "$2a$10$7xZEc/UXjuGDs/Axj0m.leSPkc0sNDyGzHf5kqLO0ZcvLcxKSMTxG",
  role:UserRole.USER,
  isActive:true, 
  versioning:  { 
    create_at:  new Date(Date.now()),
    modified_at: new Date(Date.now()),
    revision:1
  },
  async encryptPassword() { 

  },
  assignments: []
}

export const mockedUserAdmin:User = { 
  id: "befce479-7a57-4842-9206-0cc716551597",
  username:"thuonggaAdmin",
  password:"$2a$10$7xZEc/UXjuGDs/Axj0m.leSPkc0sNDyGzHf5kqLO0ZcvLcxKSMTxG",
  isActive:true, 
  role:UserRole.ADMIN,
  versioning:  { 
    create_at:  new Date(Date.now()),
    modified_at: new Date(Date.now()),
    revision:1
  },
  async encryptPassword() { 

  },
  assignments: []

}
export const mockedUserDatabase:User[] = [mockedUserAdmin,mockedUserNormal]