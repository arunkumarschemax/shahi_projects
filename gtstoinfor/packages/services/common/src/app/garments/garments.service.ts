import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
// import { CurrenciesDTO } from '../currencies/dto/currencies.dto';
import { GarmentsDTO } from './dto/garments.dto';
import { Currencies} from '../currencies/currencies.entity';
import { CurrenciesAdapter } from '../currencies/dto/currencies.adapter';
import { AllGarmentResponseModel, GarmentResponseModel } from '@project-management-system/shared-models';
import { InjectRepository } from '@nestjs/typeorm';
import { Garments } from './garments.entity';
import { GarmentsAdapter } from './dto/garments.adapter';
import { GarmentRequest } from './dto/garments.request';
// import { CurrencyRequest } from './dto/currencies.request';
// import { UserRequestDto } from './dto/user-logs-dto';

@Injectable()
export class GarmentsService {
  
    constructor(
      
        @InjectRepository(Garments)
        private garmentsRepository: Repository<Garments>,
        private garmentsAdapter: GarmentsAdapter,
    ){}

    async getGramentDetailsWithoutRelations(garmentName: string): Promise<Garments> {
        const currenciesResponse = await this.garmentsRepository.findOne({
          where: {garmentId: Raw(alias => `garment_name = '${garmentName}'`)},
        });
        if (currenciesResponse) {
          return currenciesResponse;
        } else {
          return null;
        }
      }

      async createGarment(garmemtsDto: GarmentsDTO, isUpdate: boolean): Promise<GarmentResponseModel> {
        // console.log(currenciesDto,'nnnnnh');
        
        try {
          let previousValue
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const garmentsEntity = await this.getGramentDetailsWithoutRelations(garmemtsDto.garmentName);
            if (garmentsEntity) {
              //return new InformationMessageError(11104, "State already exists");
              throw new GarmentResponseModel(false,11104, 'Garment already exists');
            }
          }
          else{
            const certificatePrevious = await this.garmentsRepository.findOne({where:{garmentId:garmemtsDto.garmentId}})
            previousValue = certificatePrevious.garmentName
            const garmentsEntity = await this.getGramentDetailsWithoutRelations(garmemtsDto.garmentName);
            if (garmentsEntity) {
              if(garmentsEntity.garmentId!=garmemtsDto.garmentId) {
                throw new GarmentResponseModel(false,11104, 'Garment already exists');      
              }
            }
          }
          const convertedGarmentEntity: Garments = this.garmentsAdapter.convertDtoToEntity(garmemtsDto,isUpdate);
          const savedCurrencyEntity: Garments = await this.garmentsRepository.save(
            convertedGarmentEntity
          );
          const savedGarmentDto: GarmentsDTO = this.garmentsAdapter.convertEntityToDto(convertedGarmentEntity);
            // console.log(savedStateDto);
          if (savedGarmentDto) {
            const presentValue = savedGarmentDto.garmentName;
           // generating resposnse
           const response = new GarmentResponseModel(true,1,isUpdate? 'Garment Updated Successfully': 'Garment Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Garment Updated Successfully': 'Garment Created Successfully'
           const userName = isUpdate? savedGarmentDto.updatedUser :savedGarmentDto.createdUser;
          //  const newLogDto = new LogsDto(1,name, 'Currencies', savedCurrencyDto.currencyId, true, displayValue,userName,previousValue,presentValue)
          //  let res = await this.logService.createLog(newLogDto);
          //  console.log(res);
           return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new GarmentResponseModel(false,11106,'Garment saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }
      }  
      
      async getAllGarments():Promise<AllGarmentResponseModel>{
        const garment = await this.garmentsRepository.find({
            // where:{isActive:true},
            order:{garmentName:'ASC'}})
        if(garment.length >0){
            return new AllGarmentResponseModel(true,1,'Garments Retrived Sucessfully',garment)
        }else{
            return new AllGarmentResponseModel(false,0,'No Garments Found ')

        }
    }
    async getAllActiveGarments():Promise<AllGarmentResponseModel>{
      const garment = await this.garmentsRepository.find({
          where:{isActive:true},
          order:{garmentName:'ASC'}})
      if(garment.length >0){
          return new AllGarmentResponseModel(true,1,'Garments Retrived Sucessfully',garment)
      }else{
          return new AllGarmentResponseModel(false,0,'No Garments Found ')

      }

  }
  async activateOrDeactivateGarment(garmentReq: GarmentRequest): Promise<GarmentResponseModel> {
        try {
            const garmentExists = await this.getGarmentById(garmentReq.garmentId);
            if (garmentExists) {
                if (garmentReq.versionFlag !== garmentExists.versionFlag) {
                    throw new GarmentResponseModel(false,10113, 'Someone updated the current Garment information.Refresh and try again');
                } else {
                    
                        const garmentStatus =  await this.garmentsRepository.update(
                            { garmentId: garmentReq.garmentId },
                            { isActive: garmentReq.isActive,updatedUser: garmentReq.updatedUser });
                       
                        if (garmentExists.isActive) {
                            if (garmentStatus.affected) {
                                const GarmentResponse: GarmentResponseModel = new GarmentResponseModel(true, 10115, 'Garment is de-activated successfully');
                                return GarmentResponse;
                            } else {
                                throw new GarmentResponseModel(false,10111, 'Garment is already deactivated');
                            }
                        } else {
                            if (garmentStatus.affected) {
                                const GarmentResponse: GarmentResponseModel = new GarmentResponseModel(true, 10114, 'Garment is activated successfully');
                                return GarmentResponse;
                            } else {
                                throw new GarmentResponseModel(false,10112, 'Garment is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new GarmentResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
    async getActiveGarmentById(garmentReq: GarmentRequest): Promise<GarmentResponseModel> {
      try {
          //retrieves all companies
          const garmentEntities: Garments = await this.garmentsRepository.findOne({
            where:{garmentId:garmentReq.garmentId}
            });
            
            const garmentData: GarmentsDTO = this.garmentsAdapter.convertEntityToDto(garmentEntities);
            if (garmentData) {
                const response = new GarmentResponseModel(true, 11101 , 'Garment retrived Successfully',garmentData);
                return response;
            }
            else{
                throw new GarmentResponseModel(false,11106,'Something went wrong');
            }
            // generating resposnse
      } catch (err) {
          return err;
      }
  }

    async getGarmentById(garmentId: number): Promise<Garments> {
        //  console.log(employeeId);
            const Response = await this.garmentsRepository.findOne({
            where: {garmentId: garmentId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }

}
