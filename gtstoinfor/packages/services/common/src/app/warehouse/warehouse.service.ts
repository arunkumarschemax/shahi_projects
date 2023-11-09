import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { WarehouseDTO } from '../warehouse/dto/warehouse.dto';
import { Warehouse} from '../warehouse/warehouse.entity';
import { WareHouseAdapter } from '../warehouse/dto/warehouse.adapter';
import { AllWarehouseResponseModel, WarehouseResponseModel } from '@project-management-system/shared-models';
import { InjectRepository } from '@nestjs/typeorm';
import { WarehouseRequest } from './dto/warehouse.request';
import { UserRequestDto } from './dto/user-log-dto';

@Injectable()
export class WarehouseService {
  
    constructor(
      
        @InjectRepository(Warehouse)
        private Repository: Repository<Warehouse>,
        private Adapter: WareHouseAdapter,
    ){}

    async getWarehouseDetailsWithoutRelations(warehouseName: string): Promise<Warehouse> {
        // tslint:disable-next-line: typedef
        const Response = await this.Repository.findOne({
          where: {warehouseId: Raw(alias => `warehouse_name = '${warehouseName}'`)},
        });
        if (Response) {
          return Response;
        } else {
          return null;
        }
      }
   
      async createWarehouse(Dto:WarehouseDTO, isUpdate: boolean): Promise<WarehouseResponseModel> {
        console.log(Dto,'nnnnnh');
        
        try {
          let previousValue
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const Entity = await this.getWarehouseDetailsWithoutRelations(Dto.warehouseName);
            if (Entity) {
              //return new InformationMessageError(11104, "State already exists");
              throw new WarehouseResponseModel(false,11104, 'Warehouse already exists');
            }
          }
          else{
            const certificatePrevious = await this.Repository.findOne({where:{warehouseId:Dto.warehouseId}})
            previousValue = certificatePrevious.warehouseName
            const Entity = await this.getWarehouseDetailsWithoutRelations(Dto.warehouseName);
            if (Entity) {
              if(Entity.warehouseId!=Dto.warehouseId) {
                throw new WarehouseResponseModel(false,11104, 'warehouse already exists');      
              }
            }
          }
          const convertedEntity: Warehouse = this.Adapter.convertDtoToEntity(Dto,isUpdate);
          const savedEntity: Warehouse = await this.Repository.save(
            convertedEntity
          );
          const savedDto: WarehouseDTO = this.Adapter.convertEntityToDto(convertedEntity);
            // console.log(savedStateDto);
          if (Dto) {
            const presentValue = Dto.warehouseName;
           // generating resposnse
           const response = new WarehouseResponseModel(true,1,isUpdate? 'Warehouse Updated Successfully': 'Warehouse Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'Warehouse Updated Successfully': 'Warehouse Created Successfully'
           const userName = isUpdate? Dto.updatedUser :savedDto.createdUser;
          //  const newLogDto = new LogsDto(1,name, 'Currencies', savedCurrencyDto.currencyId, true, displayValue,userName,previousValue,presentValue)
          //  let res = await this.logService.createLog(newLogDto);
          //  console.log(res);
           return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new WarehouseResponseModel(false,11106,'warehouse saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }
      }  

      async getAllWarehouse(req?:UserRequestDto): Promise<AllWarehouseResponseModel> {
        // const page: number = 1;
        try {
          const WarehouseDtos: WarehouseDTO[] = [];
          //retrieves all companies
          const Entities: Warehouse[] = await this.Repository.find({order :{'warehouseName':'ASC'}});
          //console.log(statesEntities);
          if (Entities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            Entities.forEach(Entity => {
              const convertedDto: WarehouseDTO = this.Adapter.convertEntityToDto(
                Entity
              );
              WarehouseDtos.push(convertedDto);
            });
            const response = new AllWarehouseResponseModel(true,1,'Warehouse retrieved successfully',WarehouseDtos);
            // if(req?.createdUser){
            //   const newLogDto = new LogsDto(0,'view', 'Currencies', 0, true, 'Currencies retrieved successfully',req.createdUser,"","")
            //   let res = await this.logService.createLog(newLogDto);
            //   console.log(res);
            // }
            return response;
          } else {
            throw new WarehouseResponseModel(false,99998, 'Data not found');
          }
          
        } catch (err) {
          return err;
        }
      }
      async getAllActiveWarehouse(): Promise<AllWarehouseResponseModel> {
        // const page: number = 1;
        try {
            const Dtos: WarehouseDTO[] = [];
            //retrieves all companies
            const Entities: Warehouse[] = await this.Repository.find({ order: { 'warehouseName': 'ASC' },where:{isActive:true}
           });
         console.log(Entities)
            if (Entities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
            Entities.forEach(Entity => {
                    const convertedDtos: WarehouseDTO = this.Adapter.convertEntityToDto(
                      Entity
                    );
                    Dtos.push(convertedDtos);
                });
                const response = new AllWarehouseResponseModel(true, 11108, "Warehouse retrieved successfully", Dtos);
                return response;
            } else {
                throw new WarehouseResponseModel(false,99998, 'Data not found'); Dtos
            }
        } catch (err) {
            return err;
        }
    }
      async activateOrDeactivateWarehouse(Req: any): Promise<WarehouseResponseModel> {
        try {
            const Exists = await this.getWarehouseById(Req.warehouseId);
            if (Exists) {
                if (Req.versionFlag !== Exists.versionFlag) {
                    throw new WarehouseResponseModel(false,10113, 'Someone updated the current warehouse information.Refresh and try again');
                } else {
                    
                        const WarehouseStatus =  await this.Repository.update(
                            { warehouseId: Req.warehouseId },
                            { isActive: Req.isActive,updatedUser: Req.updatedUser });
                       
                        if (Exists.isActive) {
                            if (WarehouseStatus.affected) {
                                const WarehouseResponse: WarehouseResponseModel = new WarehouseResponseModel(true, 10115, 'Warehouse is Deactivated successfully');
                                return WarehouseResponse;
                            } else {
                                throw new WarehouseResponseModel(false,10111, 'Warehouse is already deactivated');
                            }
                        } else {
                            if (WarehouseStatus.affected) {
                                const WarehouseResponse: WarehouseResponseModel = new WarehouseResponseModel(true, 10114, 'Warehouse is Activated successfully');
                                return WarehouseResponse;
                            } else {
                                throw new WarehouseResponseModel(false,10112, 'Warehouse is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new WarehouseResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
      async getActiveWarehouseById(Req: WarehouseRequest): Promise<WarehouseResponseModel> {
        try {
            //retrieves all warehouse
            const Entities: Warehouse = await this.Repository.findOne({
              where:{warehouseId:Req.warehouseId}
              });
              
              const Data: WarehouseDTO = this.Adapter.convertEntityToDto(Entities);
              if (Data) {
                  const response = new WarehouseResponseModel(true, 11101 , ' retrived Successfully',Data);
                  return response;
              }
              else{
                  throw new WarehouseResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getWarehouseById(Id: number): Promise<Warehouse> {
        //  console.log(employeeId);
            const Response = await this.Repository.findOne({
            where: {warehouseId: Id},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }

}
