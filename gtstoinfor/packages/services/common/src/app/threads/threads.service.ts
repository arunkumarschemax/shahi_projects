import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { ThreadsDto } from './dto/threads.dto';
import { ThreadsEntity } from './threads.entity';
import { ThreadsAdapter } from './dto/threads.adapter';
import { AllThreadsResponseModel,CommonResponseModel,ItemsResponseModel, ThreadsResponseModel } from '@project-management-system/shared-models';
import { InjectRepository } from '@nestjs/typeorm';
import { ThreadRequest } from './dto/threads.request';
import { ThreadsRepository } from './threads.repo';

@Injectable()
export class ThreadsService {
  
    constructor(
      
        private threadsRepository: ThreadsRepository,
        private threadAdapter: ThreadsAdapter,
    ){}

    async getThreadDetailsWithoutRelations(tex: string): Promise<ThreadsEntity> {
        const itemResponse = await this.threadsRepository.findOne({
          where: {threadId: Raw(alias => `tex = '${tex}'`)},
        });
        if (itemResponse) {
          return itemResponse;
        } else {
          return null;
        }
      }

      async createThread(threadDto: ThreadsDto, isUpdate: boolean): Promise<ThreadsResponseModel> {
        try {
          let previousValue
          if (!isUpdate) {
            const ThreadEntity = await this.getThreadDetailsWithoutRelations(threadDto.tex);
            if (ThreadEntity) {
              throw new ThreadsResponseModel(false,11104, 'Thread already exists');
            }
          }
          else{
            const certificatePrevious = await this.threadsRepository.findOne({where:{threadId:threadDto.threadId}})
            previousValue = certificatePrevious.tex
            const threadEntity = await this.getThreadDetailsWithoutRelations(threadDto.tex);
            if (threadEntity) {
              if(threadEntity.threadId!=threadDto.threadId) {
                throw new ThreadsResponseModel(false,11104, 'Threads already exists');      
              }
            }
          }
          const convertedThreadEntity: ThreadsEntity = this.threadAdapter.convertDtoToEntity(threadDto,isUpdate);
          const savedThreadEntity: ThreadsEntity = await this.threadsRepository.save( convertedThreadEntity);
          const savedThreadDto: ThreadsDto = this.threadAdapter.convertEntityToDto(savedThreadEntity);
          if (savedThreadDto) {
            const presentValue = savedThreadDto.tex;
           const response = new ThreadsResponseModel(true,1,isUpdate? 'Threads Updated Successfully': 'Threads Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Threads Updated Successfully': 'Threads Created Successfully'
           const userName = isUpdate? savedThreadDto.updatedUser :savedThreadDto.createdUser;
        
           return response
          } else {
            throw new ItemsResponseModel(false,11106,'Threads saved but issue while transforming into DTO');
          }
        } catch (error) {
         
          return error;
        }
      }  

      // async getAllThreads(): Promise<CommonResponseModel> {
       
      //       const info = await this.threadsRepository.getThreadsData()
      //       console.log(info,"finsp-------------------------")
      //       if (info) {
      //           return new CommonResponseModel(true, 1, 'Data retrieved', info)
      //       } else {
      //           return new CommonResponseModel(false, 0, 'No data found')
      //       }
      //   } catch (err) {
      //       return new CommonResponseModel(false, 0, 'Something went wrong', err)
      //   }
    
    async getAllThreads(): Promise<CommonResponseModel> {
      const data = await this.threadsRepository.getThreadsData()
      if (data.length > 0)
          return new CommonResponseModel(true, 1, 'data retrived', data)
      else
          return new CommonResponseModel(false, 0, 'No data found');
  }

      async getAllActiveThreads(): Promise<AllThreadsResponseModel> {
        // const page: number = 1;
        try {
            const threadsDtos: ThreadsDto[] = [];
            //retrieves all companies
            const threadEntities: ThreadsEntity[] = await this.threadsRepository.find({ order: { 'tex': 'ASC' },where:{isActive:true}
           });
        //  console.log(CurrenciesEntities)
            if (threadEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                threadEntities.forEach(tex => {
                    const convertedItemDtos: ThreadsDto = this.threadAdapter.convertEntityToDto(
                      tex
                    );
                    threadsDtos.push(convertedItemDtos);
                });
                const response = new AllThreadsResponseModel(true, 11108, "Threads retrieved successfully", threadsDtos);
                return response;
            } else {
                throw new AllThreadsResponseModel(false,99998, 'Data not found'); threadsDtos
            }
        } catch (err) {
            return err;
        }
    }
   

}
