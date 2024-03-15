import { Injectable } from '@nestjs/common';
import { ThreadsDto } from './threads.dto';
import { ThreadsEntity } from '../threads.entity';

@Injectable()
export class ThreadsAdapter {
  /**
   * 
   * @param ThreadsDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity(  threadsDto: ThreadsDto,  isUpdate: boolean = false ): ThreadsEntity {
    const threads = new ThreadsEntity();
    threads.threadId=threadsDto.threadId;
    threads.tex=threadsDto.tex;
    threads.supplierId=threadsDto.supplierId;
    threads.styleId=threadsDto.styleId;
    threads.colorCode=threadsDto.colorCode;
    threads.colorCombo=threadsDto.colorCombo;
    threads.quality=threadsDto.quality;
    threads.shadeNumber=threadsDto.shadeNumber;
    threads.isActive=threadsDto.isActive==undefined?true:threadsDto.isActive;
    if (isUpdate) {
        threads.updatedUser = threadsDto.updatedUser;
    } else {
        threads.isActive = true;
        threads.createdUser = threadsDto.createdUser;
    }
   return threads;
  }
  public convertEntityToDto(threadObject: ThreadsEntity): ThreadsDto {
    const threadsDto= new ThreadsDto;
    threadsDto.threadId=threadObject.threadId;
    threadsDto.tex=threadObject.tex;
    threadsDto.supplierId=threadObject.supplierId;
    threadsDto.styleId=threadObject.styleId;
    threadsDto.colorCode=threadObject.colorCode;
    threadsDto.colorCombo=threadObject.colorCombo;
    threadsDto.quality=threadObject.quality;
    threadsDto.shadeNumber=threadObject.shadeNumber;
    threadsDto.isActive = threadObject.isActive;
    threadsDto.createdAt = threadObject.createdAt;
    threadsDto.updatedAt = threadObject.updatedAt;
    threadsDto.createdUser = threadObject.createdUser;
    threadsDto.updatedUser = threadObject.updatedUser;
    threadsDto.versionFlag = threadObject.versionFlag;
    return threadsDto;
  }
}
