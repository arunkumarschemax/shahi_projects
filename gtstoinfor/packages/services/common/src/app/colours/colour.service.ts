import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { AllColourResponseModel, AllProfitControlHeadResponseModel } from '@project-management-system/shared-models';
import { ProfitControlHeadResponseModel } from '@project-management-system/shared-models';
import {ColourResponseModel} from '@project-management-system/shared-models'
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { ColourAdapter } from './dto/colour-adapter';
import { Colour } from './colour.entity';
import { ColourRequest } from './dto/colour-request';
import { ColourRequestDto } from '@project-management-system/shared-models';
import { Console } from 'console';
import { ColourDTO } from './dto/colour-dto';

@Injectable()
export class ColourService{
    constructor(
        @InjectRepository(Colour)

        private ColourRepository: Repository<Colour>,
        private ColourAdapter: ColourAdapter,
      ){}
      async getColourWithoutRelations(Colour: string): Promise<Colour>{
        const colourResponse = await this.ColourRepository.findOne({
          where: {colour: Raw(alias => `colour = '${Colour}'`)},
        });
        if(colourResponse){
          return colourResponse;
        }
        else{
          return null;
        }
      }


      async createColour(colourDto: ColourDTO, isUpdate: boolean): Promise<ColourResponseModel>{
        console.log('ertyudfghjk============',isUpdate)
        // const response = new ProfitControlHeadResponseModel();
        try{
          let previousValue
        const ColourDtos: ColourDTO[] = [];

          if(!isUpdate){

            const colourEntity = await this.getColourWithoutRelations(colourDto.colour);
            if (colourEntity){
                console.log(colourEntity,'------')
              throw new ColourResponseModel(false,11104, 'Colour already exists'); 
            }
          }
          else{
            console.log('ertyudfghjk============')

            const certificatePrevious = await this.ColourRepository.findOne({where:{colourId:colourDto.colourId}})
            previousValue =(certificatePrevious.colour)
            const ColourEntity = await this.getColourWithoutRelations(colourDto.colour);
            console.log('ertyudfghjk============',certificatePrevious)
            if (ColourEntity){
              if(ColourEntity.colour != colourDto.colour ){
                throw new ColourResponseModel(false,11104, 'Colour already exists'); 
              }
            }
          }
          const convertedColourEntity: Colour = this.ColourAdapter.convertDtoToEntity(colourDto,isUpdate);

          console.log(convertedColourEntity);
        const savedColourEntity: Colour = await this.ColourRepository.save(convertedColourEntity);
        const savedHeadDto: ColourDTO = this.ColourAdapter.convertEntityToDto(savedColourEntity);
        ColourDtos.push(savedColourEntity)
          console.log(savedColourEntity,'saved');
        if (savedColourEntity) {
          const presentValue = colourDto.colour;
          //generating resposnse
          const response =new ColourResponseModel(true,1,isUpdate? 'Colour Updated Successfully':'Colour created Successfully')
          const name=isUpdate?'updated':'created'
          const displayValue = isUpdate? 'Colour Updated Successfully': 'Colour Created Successfully'
          const userName = isUpdate? savedHeadDto.updatedUser :savedHeadDto.createdUser;
            // const newLogDto = new LogsDto(1,name, 'Profit Control Head', savedProfitCenterDto.profitCenter, true, displayValue,userName,previousValue,presentValue)
            // let res = await this.logService.createLog(newLogDto);
            console.log(response,'9999999999999999');
            // const response = new AllProfitCenterResponseModel(true,1000,isUpdate? 'Profit Control Head Updated Successfully': Profit Control Head Created Successfully');
          return response;
        } else {
          //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
          throw new ColourResponseModel(false,11106,'Colour saved but issue while transforming into DTO');
        }
        // return response;
      } catch (error) {
        // when error occures while saving the data , the execution will come to catch block.
        // tslint:disable-next-line: typedef
        return error;
      }
    }

    async getAllColours(): Promise<AllColourResponseModel> {
        // const page: number = 1;
        // const response = new AllPaymentResponseModel();
        try {
          const ColorDto: ColourDTO[] = [];
          //retrieves all companies
          const Entity: Colour[] = await this.ColourRepository.find({ order :{'colour':'ASC'}});
          //console.log(statesEntities);
          if (Entity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            Entity.forEach(Entity => {
              const convertedColourDto: ColourDTO = this.ColourAdapter.convertEntityToDto(
                Entity
              );
              ColorDto.push(convertedColourDto);
            });
    
            //generated response
  
            const response = new AllColourResponseModel(true,1,'Colour retrieved successfully',ColorDto);
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

      async getAllActiveColour(): Promise<AllColourResponseModel> {
        // const page: number = 1;
        // const response = new AllProfitCenterResponseModel();
        try {
          const colorDTO: ColourDTO[] = [];
          //retrieves all companies
          const colourEntity: Colour[] = await this.ColourRepository.find({where:{"isActive":true},order :{'colour':'ASC'}});
          //console.log(statesEntities);
          
          if (colourEntity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            colourEntity.forEach(colourEntity => {
              const convertedColourDto: Colour = this.ColourAdapter.convertEntityToDto(
                colourEntity
              );
              colorDTO.push(convertedColourDto);
            });
    
            //generated response
  
            const response = new AllColourResponseModel(true,1,'Colour retrieved successfully',colorDTO);
            return response;
          } else {
            throw new AllColourResponseModel(false,99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }  
      
      async activateOrDeactivateColour(profitReq: ColourRequest): Promise<ColourResponseModel> {
        try {
            const profitExists = await this.getColourById(profitReq.colourId);
            if (profitExists) {
                if (!profitExists) {
                    throw new ColourResponseModel(false,10113, 'Someone updated the current Colour  information.Refresh and try again');
                } else {
                    
                        const ProfitStatus =  await this.ColourRepository.update(
                            { colourId: profitReq.colourId },
                            { isActive: profitReq.isActive,updatedUser: profitReq.updatedUser });
                       
                        if (profitExists.isActive) {
                            if (ProfitStatus.affected) {
                                const ProfitResponse: ColourResponseModel = new ColourResponseModel(true, 10115, 'Colour  is de-activated successfully');
                                return ProfitResponse;
                            } else {
                                throw new ColourResponseModel(false,10111, 'Colour  is already deactivated');
                            }
                        } else {
                            if (ProfitStatus.affected) {
                                const ProfitResponse: ColourResponseModel = new ColourResponseModel(true, 10114, 'Colour   is activated successfully');
                                return ProfitResponse;
                            } else {
                                throw new ColourResponseModel(false,10112, 'Colour  is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new ColourResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getActiveColourById(profitReq: ColourRequest): Promise<ColourResponseModel> {
        try {
            //retrieves all companies
            const profitControlEntities: Colour = await this.ColourRepository.findOne({
              where:{colourId:profitReq.colourId}
              });
              
              const profitControlHead: Colour = this.ColourAdapter.convertEntityToDto(profitControlEntities);
              if (profitControlHead) {
                  const response = new ColourResponseModel(true, 11101 , 'Colour  retrived Successfully',[profitControlHead]);
                  return response;
              }
              else{
                  throw new ColourResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getColourById(colourId: number): Promise<Colour> {
        //  console.log(employeeId);
            const Response = await this.ColourRepository.findOne({
            where: {colourId: colourId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        } 
}