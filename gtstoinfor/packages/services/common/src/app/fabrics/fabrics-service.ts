import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { AllFabricsResponseModel } from '@project-management-system/shared-models';
import { FabricsResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { FabricsAdapter } from './dto/fabrics.adapter';
import { Fabrics } from './fabrics-entity';
import { FabricsRequest } from './dto/fabrics-request';
import { FabricsDTO } from './dto/fabrics.dto';
import { Console } from 'console';

@Injectable()
export class FabricsService{
    constructor(
        @InjectRepository(Fabrics)

        private fabricsRepository: Repository<Fabrics>,
        private fabricsAdapter: FabricsAdapter,
      ){}
      async getFabricsWithoutRelations(fabric: string): Promise<Fabrics>{
        const FabricsResponse = await this.fabricsRepository.findOne({
          where: {fabricsName: Raw(alias => `fabrics_Name = '${fabric}'`)},
        });
        if(FabricsResponse){
          return FabricsResponse;
        }
        else{
          return null;
        }
      }


      async createFabrics(fabricsDto: FabricsDTO, isUpdate: boolean): Promise<FabricsResponseModel>{
        console.log('ertyudfghjk============',fabricsDto)
        // const response = new ProfitControlHeadResponseModel();

        try{
          let previousValue
        const fabricDtos: FabricsDTO[] = [];

          if(!isUpdate){

            const fabricsEntity = await this.getFabricsWithoutRelations(fabricsDto.fabricsName);
            if (fabricsEntity){
                // console.log(fabricsEntity,'------')
              throw new FabricsResponseModel(false,11104, 'Fabrics already exists'); 
            }
          }
          else{
            // console.log('ertyudfghjk============')

            const certificatePrevious = await this.fabricsRepository.findOne({where:{fabricsId:fabricsDto.fabricsId}})
            previousValue =(certificatePrevious.fabricsName)
            const fabricsEntity = await this.getFabricsWithoutRelations(fabricsDto.fabricsName);
            // console.log('ertyudfghjk============',certificatePrevious)
            if (fabricsEntity){
              if(fabricsEntity.fabricsId != fabricsDto.fabricsId ){
                throw new FabricsResponseModel(false,11104, 'Fabrics already exists'); 
              }
            }
          }
          const convertedfabricsEntity: Fabrics = this.fabricsAdapter.convertDtoToEntity(fabricsDto,isUpdate);

          console.log(convertedfabricsEntity);
        const savedfabricsEntity: Fabrics = await this.fabricsRepository.save(convertedfabricsEntity);
        const savedfabricsDto: FabricsDTO = this.fabricsAdapter.convertEntityToDto(savedfabricsEntity);
        fabricDtos.push(savedfabricsDto)
        //   console.log(savedfabricsDto,'saved');
        if (savedfabricsDto) {
          const presentValue = fabricsDto.fabricsName;
          //generating resposnse
          const response =new FabricsResponseModel(true,1,isUpdate? 'Fabrics Updated Successfully':'Fabrics Created Successfully')
          const name=isUpdate?'updated':'created'
          const displayValue = isUpdate? 'Fabrics Updated Successfully': 'Fabrics Created Successfully'
          const userName = isUpdate? savedfabricsDto.updatedUser :savedfabricsDto.createdUser;
            // const newLogDto = new LogsDto(1,name, 'Fabrics', savedProfitCenterDto.profitCenter, true, displayValue,userName,previousValue,presentValue)
            // let res = await this.logService.createLog(newLogDto);
            // console.log(response,'9999999999999999');
            // const response = new AllProfitCenterResponseModel(true,1000,isUpdate? 'Fabrics Updated Successfully': Fabrics Created Successfully');
          return response;
        } else {
          //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
          throw new FabricsResponseModel(false,11106,'Fabrics saved but issue while transforming into DTO');
        }
        // return response;
      } catch (error) {
        // when error occures while saving the data , the execution will come to catch block.
        // tslint:disable-next-line: typedef
        return error;
      }
    }

    async getAllFabrics(): Promise<AllFabricsResponseModel> {
        try {
          const FabricssDTO: FabricsDTO[] = [];
          const FabricsEntity: Fabrics[] = await this.fabricsRepository.find({ order :{'fabricsName':'ASC'}});
          if (FabricsEntity) {
            FabricsEntity.forEach(FabricsEntity => {
              const convertedFabricsDto: FabricsDTO = this.fabricsAdapter.convertEntityToDto(
                FabricsEntity
              );
              FabricssDTO.push(convertedFabricsDto);
              // console.log(FabricssDTO,'kkkkkkkkkkkkk')
            });
  
            const response = new AllFabricsResponseModel(true,1,'Fabrics retrieved successfully',FabricssDTO);
            // console.log(response,'jkl');
            return response;
          } else {
            throw new FabricsResponseModel(false,99998, 'Data not found');
          }
        } catch (err) {
          return err;
        }
      }  

      async getAllActiveFabrics(): Promise<AllFabricsResponseModel> {
        // const page: number = 1;
        // const response = new AllProfitCenterResponseModel();
        try {
          const FabDTO: FabricsDTO[] = [];
          //retrieves all companies
          const fabricsEntity: Fabrics[] = await this.fabricsRepository.find({where:{"isActive":true},order :{'fabricsName':'ASC'}});
          //console.log(statesEntities);
          
          if (fabricsEntity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            fabricsEntity.forEach(fabricsEntity => {
              const convertedFabricsDto: FabricsDTO = this.fabricsAdapter.convertEntityToDto(
                fabricsEntity
              );
              FabDTO.push(convertedFabricsDto);
            });
    
            //generated response
  
            const response = new AllFabricsResponseModel(true,1,'Fabrics Retrieved successfully',FabDTO);
            return response;
          } else {
            throw new FabricsResponseModel(false,99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }  
      
      async activateOrDeactivateFabrics(fabReq: FabricsRequest): Promise<FabricsResponseModel> {
        try {
            const FabExists = await this.getFabricsById(fabReq.fabricsId);
            if (FabExists) {
                if (!FabExists) {
                    throw new FabricsResponseModel(false,10113, 'Someone updated the current Fabrics information.Refresh and try again');
                } else {
                    
                        const FabStatus =  await this.fabricsRepository.update(
                            { fabricsId: fabReq.fabricsId },
                            { isActive: fabReq.isActive,updatedUser: fabReq.updatedUser });
                       
                        if (FabExists.isActive) {
                            if (FabStatus.affected) {
                                const fabResponse: FabricsResponseModel = new FabricsResponseModel(true, 10115, 'Fabrics  is de-activated successfully');
                                return fabResponse;
                            } else {
                                throw new FabricsResponseModel(false,10111, 'Fabrics is already deactivated');
                            }
                        } else {
                            if (FabStatus.affected) {
                                const fabResponse: FabricsResponseModel = new FabricsResponseModel(true, 10114, 'Fabrics  is activated successfully');
                                return fabResponse;
                            } else {
                                throw new FabricsResponseModel(false,10112, 'Fabrics is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new FabricsResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getActiveFabricsById(profitReq: FabricsRequest): Promise<FabricsResponseModel> {
        try {
            //retrieves all companies
            const FabEntities: Fabrics = await this.fabricsRepository.findOne({
              where:{fabricsId:profitReq.fabricsId}
              });
              
              const Fabricss: FabricsDTO = this.fabricsAdapter.convertEntityToDto(FabEntities)
              if (Fabricss) {
                  const response = new FabricsResponseModel(true, 11101 , 'Fabrics  retrived Successfully',[Fabricss]);
                  return response;
              }
              else{
                  throw new FabricsResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getFabricsById(fabricsId: number): Promise<Fabrics> {
        //  console.log(employeeId);
            const Response = await this.fabricsRepository.findOne({
            where: {fabricsId: fabricsId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        } 
}