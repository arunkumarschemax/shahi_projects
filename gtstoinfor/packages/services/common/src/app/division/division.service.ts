import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { Division} from '../division/division.entity';
import { DivisionAdapter} from '../division/dto/division.adapter';
import { AllDivisionResponseModel, DivisionResponseModel } from '@project-management-system/shared-models';
import { InjectRepository } from '@nestjs/typeorm';
import { DivisionRequest } from './dto/division.request';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { DivisionDTO } from './dto/division.dto';


@Injectable()
export class DivisionService {
    getActiveCompanyById(divisionreq: DivisionRequest): DivisionResponseModel | PromiseLike<DivisionResponseModel> {
        throw new Error('Method not implemented.');
    }
  
    constructor(
      
        @InjectRepository(Division)
        private divisionRepository: Repository<Division>,
        private divisionAdapter: DivisionAdapter,
    ){}

    async getDivisionDetailsWithoutRelations(divisionName: string): Promise<Division> {
        // tslint:disable-next-line: typedef
        const divisionResponse = await this.divisionRepository.findOne({
          where: {divisionId: Raw(alias => `division_name = '${divisionName}'`)},
        });
        if (divisionResponse) {
          return divisionResponse;
        } else {
          return null;
        }
      }

      async createDivision(divisionDto: DivisionDTO, isUpdate: boolean): Promise<DivisionResponseModel> {
        
        try {
          let previousValue
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const divisionEntity = await this.getDivisionDetailsWithoutRelations(divisionDto.divisionName);
            if (divisionEntity) {
              //return new InformationMessageError(11104, "State already exists");
              throw new DivisionResponseModel(false,11104, 'Division already exists');
            }
          }
          else{
            const certificatePrevious = await this.divisionRepository.findOne({where:{divisionId:divisionDto.divisionId}})
            previousValue = certificatePrevious.divisionName
            const divisionEntity = await this.getDivisionDetailsWithoutRelations(divisionDto.divisionName);
            if (divisionEntity) {
              if(divisionEntity.divisionId!=divisionDto.divisionId) {
                throw new DivisionResponseModel(false,11104, 'Division already exists');      
              }
            }
          }
          const converteddivisionEntity: Division = this.divisionAdapter.convertDtoToEntity(divisionDto,isUpdate);
          const saveddivisionEntity: Division = await this.divisionRepository.save(
            converteddivisionEntity
          );
          const saveddivisionDto: DivisionDTO = this.divisionAdapter.convertEntityToDto(converteddivisionEntity);
            // console.log(savedStateDto);
          if (saveddivisionDto) {
            const presentValue = saveddivisionDto.divisionName;
           // generating resposnse
           const response = new DivisionResponseModel(true,1,isUpdate? 'division Updated Successfully': 'division Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'division Updated Successfully': 'division Created Successfully'
           const userName = isUpdate? saveddivisionDto.updatedUser :saveddivisionDto.createdUser;
          //  const newLogDto = new LogsDto(1,name, 'division', savedCurrencyDto.currencyId, true, displayValue,userName,previousValue,presentValue)
          //  let res = await this.logService.createLog(newLogDto);
           return response
          } else {
            throw new DivisionResponseModel(false,11106,'division saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }
      }  

      async getAlldivision(req?:UserRequestDto): Promise<AllDivisionResponseModel> {
        // const page: number = 1;
        try {
          const divisionDtos: DivisionDTO[] = [];
          //retrieves all companies
          const divisionEntities: Division[] = await this.divisionRepository.find({order :{'divisionName':'ASC'}});
          //console.log(statesEntities);
          if (divisionEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            divisionEntities.forEach(divisionEntity => {
              const converteddivisionDto: DivisionDTO = this.divisionAdapter.convertEntityToDto(
                divisionEntity
              );
              divisionDtos.push(converteddivisionDto);
            });
            const response = new AllDivisionResponseModel(true,1,'Division retrieved successfully',divisionDtos);
            // if(req?.createdUser){
            //   const newLogDto = new LogsDto(0,'view', 'Currencies', 0, true, 'Currencies retrieved successfully',req.createdUser,"","")
            //   let res = await this.logService.createLog(newLogDto);
            //   console.log(res);
            // }
            return response;
          } else {
            throw new DivisionResponseModel(false,99998, 'Data not found');
          }
          
        } catch (err) {
          return err;
        }
      }
      async getAllActivedivision(): Promise<AllDivisionResponseModel> {
        // const page: number = 1;
        try {
            const divisionDtos: DivisionDTO[] = [];
            //retrieves all companies
            const divisionEntities: Division[] = await this.divisionRepository.find({ order: { 'divisionName': 'ASC' },where:{isActive:true}
           });
        // console.log(divisionEntities)
            if (divisionEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                divisionEntities.forEach(countriesEntity => {
                    const converteddivisionDtos: DivisionDTO = this.divisionAdapter.convertEntityToDto(
                      countriesEntity
                    );
                    divisionDtos.push(converteddivisionDtos);
                });
                const response = new AllDivisionResponseModel(true, 11108, "division retrieved successfully", divisionDtos);
                return response;
            } else {
                throw new DivisionResponseModel(false,99998, 'Data not found'); divisionDtos
            }
        } catch (err) {
            return err;
        }
    }
      async activateOrDeactivatedivision(divisionReq: DivisionRequest): Promise<DivisionResponseModel> {
        try {
          // console.log(divisionReq,"divisionReq");
          
            const divisionExists = await this.getdivisionById(divisionReq.divisionId);
            console.log(divisionExists,"divisionExists");
            
            if (divisionExists) {
                if (!divisionExists) {
                    throw new DivisionResponseModel(false,10113, 'Someone updated the current  information.Refresh and try again');
                } else {
                    
                        const divisionStatus =  await this.divisionRepository.update(
                            { divisionId: divisionReq.divisionId },
                            { isActive: divisionReq.isActive,updatedUser: divisionReq.updatedUser });
                       
                        if (divisionExists.isActive) {
                            if (divisionStatus.affected) {
                                const divisionResponse: DivisionResponseModel = new DivisionResponseModel(true, 10115, 'Division is de-activated successfully');
                                return divisionResponse;
                            } else {
                                throw new DivisionResponseModel(false,10111, 'division is already deactivated');
                            }
                        } else {
                            if (divisionStatus.affected) {
                                const divisionResponse: DivisionResponseModel = new DivisionResponseModel(true, 10114, 'Division is activated successfully');
                                return divisionResponse;
                            } else {
                                throw new DivisionResponseModel(false,10112, 'Division is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new DivisionResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

  
      async getActivedivisionById(divisionReq: DivisionRequest): Promise<DivisionResponseModel> {
        try {
            //retrieves all companies
            const divisionEntities: Division = await this.divisionRepository.findOne({
              where:{divisionId:divisionReq.divisionId}
              });
              
              const divisionData: DivisionDTO = this.divisionAdapter.convertEntityToDto(divisionEntities);
              if (divisionData) {
                  const response = new DivisionResponseModel(true, 11101 , 'Currency retrived Successfully',divisionData);
                  return response;
              }
              else{
                  throw new DivisionResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getdivisionById(divisionId: number): Promise<Division> {
        //  console.log(employeeId);
            const Response = await this.divisionRepository.findOne({
            where: {divisionId: divisionId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }

}
