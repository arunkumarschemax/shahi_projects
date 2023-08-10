import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { AllProfitControlHeadResponseModel } from '@project-management-system/shared-models';
import { ProfitControlHeadResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ProfitColtrolHeadAdapter } from './dto/profit-control-head.adapter';
import { ProfitControlHead } from './profit-control-head-entity';
import { ProfitControlHeadRequest } from './dto/profit-control-head-request';
import { ProfitControlHeadDTO } from './dto/profit-control-head.dto';
import { Console } from 'console';

@Injectable()
export class ProfitControlHeadService{
    constructor(
        @InjectRepository(ProfitControlHead)

        private ProfitControlHeadRepository: Repository<ProfitControlHead>,
        private ProfitControlHeadAdapter: ProfitColtrolHeadAdapter,
      ){}
      async getProfitControlHeadWithoutRelations(ProfitControlHead: string): Promise<ProfitControlHead>{
        const ProfitCenterResponse = await this.ProfitControlHeadRepository.findOne({
          where: {profitControlHead: Raw(alias => `profit_control_head = '${ProfitControlHead}'`)},
        });
        if(ProfitCenterResponse){
          return ProfitCenterResponse;
        }
        else{
          return null;
        }
      }


      async createProfitControlHead(ProfitControlDto: ProfitControlHeadDTO, isUpdate: boolean): Promise<ProfitControlHeadResponseModel>{
        console.log('ertyudfghjk============',isUpdate)
        // const response = new ProfitControlHeadResponseModel();
        try{
          let previousValue
        const ProfitContorolDtos: ProfitControlHeadDTO[] = [];

          if(!isUpdate){

            const ProfitControlHeadEntity = await this.getProfitControlHeadWithoutRelations(ProfitControlDto.profitControlHead);
            if (ProfitControlHeadEntity){
                console.log(ProfitControlHeadEntity,'------')
              throw new ProfitControlHeadResponseModel(false,11104, 'Profit Control Head already exists'); 
            }
          }
          else{
            console.log('ertyudfghjk============')

            const certificatePrevious = await this.ProfitControlHeadRepository.findOne({where:{profitControlHeadId:ProfitControlDto.profitControlHeadId}})
            previousValue =(certificatePrevious.profitControlHead)
            const ProfitControlHeadEntity = await this.getProfitControlHeadWithoutRelations(ProfitControlDto.profitControlHead);
            console.log('ertyudfghjk============',certificatePrevious)
            if (ProfitControlHeadEntity){
              if(ProfitControlHeadEntity.profitControlHeadId != ProfitControlDto.profitControlHeadId ){
                throw new ProfitControlHeadResponseModel(false,11104, 'Profit Control Head already exists'); 
              }
            }
          }
          const convertedProfitCenterEntity: ProfitControlHead = this.ProfitControlHeadAdapter.convertDtoToEntity(ProfitControlDto,isUpdate);

          console.log(convertedProfitCenterEntity);
        const savedProfitControlHeadEntity: ProfitControlHead = await this.ProfitControlHeadRepository.save(convertedProfitCenterEntity);
        const savedProfitControlHeadDto: ProfitControlHeadDTO = this.ProfitControlHeadAdapter.convertEntityToDto(savedProfitControlHeadEntity);
        ProfitContorolDtos.push(savedProfitControlHeadDto)
          console.log(savedProfitControlHeadDto,'saved');
        if (savedProfitControlHeadDto) {
          const presentValue = ProfitControlDto.profitControlHead;
          //generating resposnse
          const response =new ProfitControlHeadResponseModel(true,1,isUpdate? 'Profit Control Head Updated Successfully':'Profit Control Head Successfully')
          const name=isUpdate?'updated':'created'
          const displayValue = isUpdate? 'Profit Control Head Updated Successfully': 'Profit Control Head Created Successfully'
          const userName = isUpdate? savedProfitControlHeadDto.updatedUser :savedProfitControlHeadDto.createdUser;
            // const newLogDto = new LogsDto(1,name, 'Profit Control Head', savedProfitCenterDto.profitCenter, true, displayValue,userName,previousValue,presentValue)
            // let res = await this.logService.createLog(newLogDto);
            console.log(response,'9999999999999999');
            // const response = new AllProfitCenterResponseModel(true,1000,isUpdate? 'Profit Control Head Updated Successfully': Profit Control Head Created Successfully');
          return response;
        } else {
          //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
          throw new ProfitControlHeadResponseModel(false,11106,'Profit Control Head saved but issue while transforming into DTO');
        }
        // return response;
      } catch (error) {
        // when error occures while saving the data , the execution will come to catch block.
        // tslint:disable-next-line: typedef
        return error;
      }
    }

    async getAllProfitControlHead(): Promise<AllProfitControlHeadResponseModel> {
        // const page: number = 1;
        // const response = new AllPaymentResponseModel();
        try {
          const ProfitControlHeadDTO: ProfitControlHeadDTO[] = [];
          //retrieves all companies
          const ProfitControlHeadEntity: ProfitControlHead[] = await this.ProfitControlHeadRepository.find({ order :{'profitControlHead':'ASC'}});
          //console.log(statesEntities);
          if (ProfitControlHeadEntity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            ProfitControlHeadEntity.forEach(ProfitControlHeadEntity => {
              const convertedProfitControlHeadDto: ProfitControlHeadDTO = this.ProfitControlHeadAdapter.convertEntityToDto(
                ProfitControlHeadEntity
              );
              ProfitControlHeadDTO.push(convertedProfitControlHeadDto);
            });
    
            //generated response
  
            const response = new AllProfitControlHeadResponseModel(true,1,'Profit Center retrieved successfully',ProfitControlHeadDTO);
          //  if(req?.createdUser){
          // //   const newLogDto = new LogsDto(1,'view', 'ProfitCenter', 0, true, 'Profit Center retrieved successfully',req.createdUser,'','',)
          // //   let res = await this.logService.createLog(newLogDto);
          // //   console.log(res);
          //  }
            return response;
          } else {
            throw new ProfitControlHeadResponseModel(false,99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }  

      async getAllActiveProfitControlHead(): Promise<AllProfitControlHeadResponseModel> {
        // const page: number = 1;
        // const response = new AllProfitCenterResponseModel();
        try {
          const ProfitcontrolHeadDTO: ProfitControlHeadDTO[] = [];
          //retrieves all companies
          const ProfitControlHeadEntity: ProfitControlHead[] = await this.ProfitControlHeadRepository.find({where:{"isActive":true},order :{'profitControlHead':'ASC'}});
          //console.log(statesEntities);
          
          if (ProfitControlHeadEntity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            ProfitControlHeadEntity.forEach(ProfitControlHeadEntity => {
              const convertedProfitControlHeadDto: ProfitControlHead = this.ProfitControlHeadAdapter.convertEntityToDto(
                ProfitControlHeadEntity
              );
              ProfitcontrolHeadDTO.push(convertedProfitControlHeadDto);
            });
    
            //generated response
  
            const response = new AllProfitControlHeadResponseModel(true,1,'Profit Control Head retrieved successfully',ProfitcontrolHeadDTO);
            return response;
          } else {
            throw new ProfitControlHeadResponseModel(false,99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }  
      
      async activateOrDeactivateProfitControlHead(profitReq: ProfitControlHeadRequest): Promise<ProfitControlHeadResponseModel> {
        try {
            const profitExists = await this.getProfitControlHeadById(profitReq.profitControlHeadId);
            if (profitExists) {
                if (!profitExists) {
                    throw new ProfitControlHeadResponseModel(false,10113, 'Someone updated the current Profit Control Head information.Refresh and try again');
                } else {
                    
                        const ProfitStatus =  await this.ProfitControlHeadRepository.update(
                            { profitControlHeadId: profitReq.profitControlHeadId },
                            { isActive: profitReq.isActive,updatedUser: profitReq.updatedUser });
                       
                        if (profitExists.isActive) {
                            if (ProfitStatus.affected) {
                                const ProfitResponse: ProfitControlHeadResponseModel = new ProfitControlHeadResponseModel(true, 10115, 'Profit Control Head  is de-activated successfully');
                                return ProfitResponse;
                            } else {
                                throw new ProfitControlHeadResponseModel(false,10111, 'Profit Control Head  is already deactivated');
                            }
                        } else {
                            if (ProfitStatus.affected) {
                                const ProfitResponse: ProfitControlHeadResponseModel = new ProfitControlHeadResponseModel(true, 10114, 'Profit Control Head  is activated successfully');
                                return ProfitResponse;
                            } else {
                                throw new ProfitControlHeadResponseModel(false,10112, 'Profit Control Head is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new ProfitControlHeadResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getActiveProfitControlHeadById(profitReq: ProfitControlHeadRequest): Promise<ProfitControlHeadResponseModel> {
        try {
            //retrieves all companies
            const profitControlEntities: ProfitControlHead = await this.ProfitControlHeadRepository.findOne({
              where:{profitControlHeadId:profitReq.profitControlHeadId}
              });
              
              const profitControlHead: ProfitControlHeadDTO = this.ProfitControlHeadAdapter.convertEntityToDto(profitControlEntities);
              if (profitControlHead) {
                  const response = new ProfitControlHeadResponseModel(true, 11101 , 'Profit Control Head   retrived Successfully',[profitControlHead]);
                  return response;
              }
              else{
                  throw new ProfitControlHeadResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getProfitControlHeadById(profitControlHeadId: number): Promise<ProfitControlHead> {
        //  console.log(employeeId);
            const Response = await this.ProfitControlHeadRepository.findOne({
            where: {profitControlHeadId: profitControlHeadId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        } 
}