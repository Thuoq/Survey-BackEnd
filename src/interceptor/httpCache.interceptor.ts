import { Injectable, CacheInterceptor, ExecutionContext, CACHE_KEY_METADATA } from '@nestjs/common';
var parseurl = require('parseurl')

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor { 
  protected trackBy(context: ExecutionContext): string {
    const cacheKey = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler()
    )
    if (cacheKey) {
      const request  = context.switchToHttp().getRequest()
      return `${cacheKey}-${parseurl(request).query}`;
    }
    return super.trackBy(context);
  }
}