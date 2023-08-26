import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { AllSizeResponseModel, SizeDto } from '@project-management-system/shared-models';
import { SizeResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { SizeAdapter } from './dto/sizes-adapter';
import { Size } from './sizes-entity';
import { SizeRequest } from './dto/sizes-request';
import { SizeRequestDto } from '@project-management-system/shared-models';
import { Console } from 'console';

@Injectable()
export class SizeService{
    constructor(
        @InjectRepository(Size)

        private SizeRepository: Repository<Size>,
        private SizeAdapter: SizeAdapter,
      ){}
      async getsizeWithoutRelations(size: string): Promise<Size>{
        const sizeResponse = await this.SizeRepository.findOne({
          where: {size: Raw(alias => `Sizes = '${size}'`)},
        });
        if(sizeResponse){
          return sizeResponse;
        }
        else{
          return null;
        }
      }


      async createSize(sizedto: SizeDto, isUpdate: boolean): Promise<SizeResponseModel>{
        console.log('ggggggggg============',isUpdate)
        // const response = new ProfitControlHeadResponseModel();
        try{
          let previousValue
        const sizedDto2: SizeDto[] = [];

          if(!isUpdate){

            const SizeEntity = await this.getsizeWithoutRelations(sizedto.size);
            if (SizeEntity){
                console.log(SizeEntity,'------')
              throw new SizeResponseModel(false,11104, 'Size already exists'); 
            }
          }
          else{
            console.log('ertyudfghjk============')

            const certificatePrevious = await this.SizeRepository.findOne({where:{sizeId:sizedto.sizeId}})
            previousValue =(certificatePrevious.size)
            const sizeEntity = await this.getsizeWithoutRelations(sizedto.size);
            console.log('ertyudfghjk============',certificatePrevious)
            if (sizeEntity){
              if(sizeEntity.sizeId != sizedto.sizeId ){
                throw new SizeResponseModel(false,11104, 'Size already exists'); 
              }
            }
          }
          const convertedSizeEntity: Size = this.SizeAdapter.convertDtoToEntity(sizedto,isUpdate);

          console.log(convertedSizeEntity);
        const savedSizeEntity: Size = await this.SizeRepository.save(convertedSizeEntity);
        const savedSizeDto: SizeDto = this.SizeAdapter.convertEntityToDto(savedSizeEntity);
        sizedDto2.push(savedSizeDto)
          console.log(savedSizeDto,'saved');
        if (savedSizeDto) {
          const presentValue = sizedto.size;
          //generating resposnse
          const response =new SizeResponseModel(true,1,isUpdate? 'Size  Updated Successfully':'Size Successfully')
          const name=isUpdate?'updated':'created'
          const displayValue = isUpdate? 'Size Updated Successfully': 'Size Created Successfully'
          const userName = isUpdate? savedSizeDto.updatedUser :savedSizeDto.createdUser;
            // const newLogDto = new LogsDto(1,name, 'Size', savedProfitCenterDto.profitCenter, true, displayValue,userName,previousValue,presentValue)
            // let res = await this.logService.createLog(newLogDto);
            console.log(response,'9999999999999999');
            // const response = new AllProfitCenterResponseModel(true,1000,isUpdate? 'SizeUpdated Successfully': Size Created Successfully');
          return response;
        } else {
          //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
          throw new SizeResponseModel(false,11106,'Size saved but issue while transforming into DTO');
        }
        // return response;
      } catch (error) {
        // when error occures while saving the data , the execution will come to catch block.
        // tslint:disable-next-line: typedef
        return error;
      }
    }

    async getAllSizes(): Promise<AllSizeResponseModel> {
        // const page: number = 1;
        // const response = new AllSizeResponseModel();
        try {
          const sizedto: SizeDto[] = [];
          //retrieves all companies
          const sizeEntity: Size[] = await this.SizeRepository.find({ order :{'size':'ASC'}});
          //console.log(statesEntities);
          if (sizeEntity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            sizeEntity.forEach(sizeEntity => {
              const convertedsizeDto: SizeDto = this.SizeAdapter.convertEntityToDto(
                sizeEntity
              );
              sizedto.push(convertedsizeDto);
            });
    
            //generated response
  
            const response = new AllSizeResponseModel(true,1,'size retrieved successfully',sizedto);
          //  if(req?.createdUser){
          // //   const newLogDto = new LogsDto(1,'view', 'size', 0, true, 'size retrieved successfully',req.createdUser,'','',)
          // //   let res = await this.logService.createLog(newLogDto);
          // //   console.log(res);
          //  }
            return response;
          } else {
            throw new SizeResponseModel(false,99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }  

      async getAllActiveSizes(): Promise<AllSizeResponseModel> {
        // const page: number = 1;
        // const response = new AllSizeResponseModel();
        try {
          const sizesDTO: SizeDto[] = [];
          //retrieves all companies
          const SizeEntity: Size[] = await this.SizeRepository.find({where:{"isActive":true},order :{'size':'ASC'}});
          //console.log(statesEntities);
          
          if (SizeEntity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            SizeEntity.forEach(SizeEntity => {
              const convertedSizeDto: Size = this.SizeAdapter.convertEntityToDto(
                SizeEntity
              );
              sizesDTO.push(convertedSizeDto);
            });
    
            //generated response
  
            const response = new AllSizeResponseModel(true,1,'Size retrieved successfully',sizesDTO);
            return response;
          } else {
            throw new SizeResponseModel(false,99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }  
      
      async activateOrDeactivateSize(SizeReq: SizeRequest): Promise<SizeResponseModel> {
        try {
            const sizeExists = await this.getSizeById(SizeReq.sizeId);
            if (sizeExists) {
                if (!sizeExists) {
                    throw new SizeResponseModel(false,10113, 'Someone updated the current Size information.Refresh and try again');
                } else {
                    
                        const SizeStatus =  await this.SizeRepository.update(
                            { sizeId: SizeReq.sizeId },
                            { isActive: SizeReq.isActive,updatedUser: SizeReq.updatedUser });
                       
                        if (sizeExists.isActive) {
                            if (SizeStatus.affected) {
                                const sizeResponse: SizeResponseModel = new SizeResponseModel(true, 10115, 'Size is de-activated successfully');
                                return sizeResponse;
                            } else {
                                throw new SizeResponseModel(false,10111, 'Size is already deactivated');
                            }
                        } else {
                            if (SizeStatus.affected) {
                                const sizesResponse: SizeResponseModel = new SizeResponseModel(true, 10114, 'Size  is activated successfully');
                                return sizesResponse;
                            } else {
                                throw new SizeResponseModel(false,10112, 'Profit Control Head is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new SizeResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getActiveSizeById(SizeReq: SizeRequest): Promise<SizeResponseModel> {
        try {
            //retrieves all companies
            const sizeEntities: Size = await this.SizeRepository.findOne({
              where:{sizeId:SizeReq.sizeId}
              });
              
              const sized: SizeDto = this.SizeAdapter.convertEntityToDto(sizeEntities);
              if (sized) {
                  const response = new SizeResponseModel(true, 11101 , 'Size  retrived Successfully',[sized]);
                  return response;
              }
              else{
                  throw new SizeResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getSizeById(sizeId: number): Promise<Size> {
        //  console.log(employeeId);
            const Response = await this.SizeRepository.findOne({
            where: {sizeId: sizeId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        } 
}