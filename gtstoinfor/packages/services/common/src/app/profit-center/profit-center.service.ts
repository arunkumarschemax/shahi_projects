import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { AllProfitCenterResponseModel } from '@project-management-system/shared-models';
import { ProfitCenterResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ProfitCenter } from './profit-center-entity';
import { ProfitCenterAdapter } from './dto/profit-center.adapter';
import { ProfitCenterDTO } from './dto/profit-center.dto';
import { ProfitCenterRequest } from './dto/profit-center-request';
import { Console } from 'console';

@Injectable()
export class ProfitCenterService{
    constructor(
        @InjectRepository(ProfitCenter)

        private ProfitCenterRepository: Repository<ProfitCenter>,
        private ProfitCenterAdapter: ProfitCenterAdapter,
      ){}
      async getProfitCenterWithoutRelations(ProfitCenter: string): Promise<ProfitCenter>{
        const ProfitCenterResponse = await this.ProfitCenterRepository.findOne({
          where: {profitCenter: Raw(alias => `profit_center = '${ProfitCenter}'`)},
        });
        if(ProfitCenterResponse){
          return ProfitCenterResponse;
        }
        else{
          return null;
        }
      }


      async createProfitCenter(ProfitCenterDto: ProfitCenterDTO, isUpdate: boolean): Promise<ProfitCenterResponseModel>{
        console.log('ertyudfghjk============',isUpdate)
        // const response = new PaymentMethodResponseModel();
        try{
          let previousValue
        const ProfitCenterDtos: ProfitCenterDTO[] = [];

          if(!isUpdate){

            const ProfitCenterEntity = await this.getProfitCenterWithoutRelations(ProfitCenterDto.profitCenter);
            if (ProfitCenterEntity){
                console.log(ProfitCenterEntity,'------')
              throw new ProfitCenterResponseModel(false,11104, 'Profit Center already exists'); 
            }
          }
          else{
            console.log('ertyudfghjk============')

            const certificatePrevious = await this.ProfitCenterRepository.findOne({where:{profitCenterId:ProfitCenterDto.profitCenterId}})
            previousValue =(certificatePrevious.profitCenter)
            const ProfitCenterEntity = await this.getProfitCenterWithoutRelations(ProfitCenterDto.profitCenter);
            console.log('ertyudfghjk============',certificatePrevious)
            if (ProfitCenterEntity){
              if(ProfitCenterEntity.profitCenterId != ProfitCenterDto.profitCenterId ){
                throw new ProfitCenterResponseModel(false,11104, 'Profit Center already exists'); 
              }
            }
          }
          const convertedProfitCenterEntity: ProfitCenter = this.ProfitCenterAdapter.convertDtoToEntity(ProfitCenterDto,isUpdate);

          console.log(convertedProfitCenterEntity);
        const savedProfitCenterEntity: ProfitCenter = await this.ProfitCenterRepository.save(convertedProfitCenterEntity);
        const savedProfitCenterDto: ProfitCenterDTO = this.ProfitCenterAdapter.convertEntityToDto(savedProfitCenterEntity);
        ProfitCenterDtos.push(savedProfitCenterDto)
          console.log(savedProfitCenterDto,'saved');
        if (savedProfitCenterDto) {
          const presentValue = ProfitCenterDto.profitCenter;
          //generating resposnse
          const response =new ProfitCenterResponseModel(true,1,isUpdate? 'Profit Center Updated Successfully':'Profit Center Successfully')
          const name=isUpdate?'updated':'created'
          const displayValue = isUpdate? 'Profit Center Updated Successfully': 'Profit Center Created Successfully'
          const userName = isUpdate? savedProfitCenterDto.updatedUser :savedProfitCenterDto.createdUser;
            // const newLogDto = new LogsDto(1,name, 'Profit Center', savedProfitCenterDto.profitCenter, true, displayValue,userName,previousValue,presentValue)
            // let res = await this.logService.createLog(newLogDto);
            console.log(response,'9999999999999999');
            // const response = new AllProfitCenterResponseModel(true,1000,isUpdate? 'Profit Center Updated Successfully': 'Profit Center Created Successfully');
          return response;
        } else {
          //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
          throw new ProfitCenterResponseModel(false,11106,'Profit Center saved but issue while transforming into DTO');
        }
        // return response;
      } catch (error) {
        // when error occures while saving the data , the execution will come to catch block.
        // tslint:disable-next-line: typedef
        return error;
      }
    }

    async getAllProfitCenter(): Promise<AllProfitCenterResponseModel> {
        // const page: number = 1;
        // const response = new AllPaymentResponseModel();
        try {
          const ProfitCenterDTO: ProfitCenterDTO[] = [];
          //retrieves all companies
          const ProfitCenterEntity: ProfitCenter[] = await this.ProfitCenterRepository.find({ order :{'profitCenter':'ASC'}});
          //console.log(statesEntities);
          if (ProfitCenterEntity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            ProfitCenterEntity.forEach(ProfitCenterEntity => {
              const convertedProfitCenterDto: ProfitCenterDTO = this.ProfitCenterAdapter.convertEntityToDto(
                ProfitCenterEntity
              );
              ProfitCenterDTO.push(convertedProfitCenterDto);
            });
    
            //generated response
  
            const response = new AllProfitCenterResponseModel(true,1,'Profit Center retrieved successfully',ProfitCenterDTO);
          //  if(req?.createdUser){
          // //   const newLogDto = new LogsDto(1,'view', 'ProfitCenter', 0, true, 'Profit Center retrieved successfully',req.createdUser,'','',)
          // //   let res = await this.logService.createLog(newLogDto);
          // //   console.log(res);
          //  }
            return response;
          } else {
            throw new ProfitCenterResponseModel(false,99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }  

      async getAllActiveProfitCenter(): Promise<AllProfitCenterResponseModel> {
        // const page: number = 1;
        // const response = new AllProfitCenterResponseModel();
        try {
          const ProfitcenterDTO: ProfitCenterDTO[] = [];
          //retrieves all companies
          const ProfitCenterEntity: ProfitCenter[] = await this.ProfitCenterRepository.find({where:{"isActive":true},order :{'profitCenter':'ASC'}});
          //console.log(statesEntities);
          
          if (ProfitCenterEntity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            ProfitCenterEntity.forEach(ProfitCenterEntity => {
              const convertedProfitCenterDto: ProfitCenter = this.ProfitCenterAdapter.convertEntityToDto(
                ProfitCenterEntity
              );
              ProfitcenterDTO.push(convertedProfitCenterDto);
            });
    
            //generated response
  
            const response = new AllProfitCenterResponseModel(true,1,'Profit Center retrieved successfully',ProfitcenterDTO);
            return response;
          } else {
            throw new ProfitCenterResponseModel(false,99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }  
      async activateOrDeactivateProfitCenter(profitReq: ProfitCenterRequest): Promise<ProfitCenterResponseModel> {
        try {
            const profitExists = await this.getProfitCenterById(profitReq.profitCenterId);
            if (profitExists) {
                if (profitReq.versionFlag !== profitExists.versionFlag) {
                    throw new ProfitCenterResponseModel(false,10113, 'Someone updated the current Profit Center information.Refresh and try again');
                } else {
                    
                        const ProfitStatus =  await this.ProfitCenterRepository.update(
                            { profitCenterId: profitReq.profitCenterId },
                            { isActive: profitReq.isActive,updatedUser: profitReq.updatedUser });
                       
                        if (profitExists.isActive) {
                            if (ProfitStatus.affected) {
                                const ProfitResponse: ProfitCenterResponseModel = new ProfitCenterResponseModel(true, 10115, 'Profit Center  is de-activated successfully');
                                return ProfitResponse;
                            } else {
                                throw new ProfitCenterResponseModel(false,10111, 'Profit Center  is already deactivated');
                            }
                        } else {
                            if (ProfitStatus.affected) {
                                const ProfitResponse: ProfitCenterResponseModel = new ProfitCenterResponseModel(true, 10114, 'Profit Center  is activated successfully');
                                return ProfitResponse;
                            } else {
                                throw new ProfitCenterResponseModel(false,10112, 'Profit Center  is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new ProfitCenterResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getActiveProfitCenterById(profitReq: ProfitCenterRequest): Promise<ProfitCenterResponseModel> {
        try {
            //retrieves all companies
            const profitCenterEntities: ProfitCenter = await this.ProfitCenterRepository.findOne({
              where:{profitCenterId:profitReq.profitCenterId}
              });
              
              const profitCenter: ProfitCenterDTO = this.ProfitCenterAdapter.convertEntityToDto(profitCenterEntities);
              if (profitCenter) {
                  const response = new ProfitCenterResponseModel(true, 11101 , 'Profit Center  retrived Successfully',[profitCenter]);
                  return response;
              }
              else{
                  throw new ProfitCenterResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }
    async getProfitCenterById(profitCenterId: number): Promise<ProfitCenter> {
        //  console.log(employeeId);
            const Response = await this.ProfitCenterRepository.findOne({
            where: {profitCenterId: profitCenterId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        } 
}