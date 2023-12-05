import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Console } from 'console';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { trimEntity } from './trim-entity';
import { TrimAdapter } from './dto/trim-adapter';
import { AllTrimResponseModel, CommonResponseModel } from '@project-management-system/shared-models';
import { TrimDTO } from './dto/trim-dto';

@Injectable()
export class trimService{
    constructor(
        @InjectRepository(trimEntity)

        private trimRepository: Repository<trimEntity>,
        private trimAdapter: TrimAdapter,
      ){}

      async createTrim(DTO: TrimDTO, isUpdate: boolean): Promise<CommonResponseModel> {
        console.log(DTO,'_____________________')
        try {
          if (!isUpdate) {
            const existingDept = await this.trimRepository.findOne({ where: { trimCategory: DTO.trimCategory }});

            if (existingDept) {
              throw new CommonResponseModel(false, 11104, 'Trim Category already exists');
            } 
          } else {
            const REC = await this.trimRepository.findOne({ where: { trimCategory: DTO.trimCategory } });
            const Id = await this.trimRepository.findOne({ where: { trimId: DTO.trimId } });
            
            if (REC && Id.trimId !== DTO.trimId) {
              throw new CommonResponseModel(false, 11104, 'Trim Category already exists');
            }
            
            if (!DTO || !Id) {
              throw new ErrorResponse(11104, 'Given Trim Category does not exist');
            }
          }
          
          const convVertiety: trimEntity = this.trimAdapter.convertDtoToEntity(DTO, isUpdate);
          const savedVarEntity: trimEntity = await this.trimRepository.save(convVertiety);
          const savedDTO: TrimDTO = this.trimAdapter.convertEntityToDto(savedVarEntity);
          
          if (savedDTO) {
            const response = new CommonResponseModel(true, 1, isUpdate ? 'Trim Category Updated Successfully' : 'Trim Category Created Successfully');
            return response;
          } else {
            throw new CommonResponseModel(false, 11106, 'Trim Category saved but issue while transforming into DTO');
          }
        } catch (error) {
          return error;
        }
      }
      

        async getAllTrim(): Promise<AllTrimResponseModel> {
    
        try {
          const trimDTO: TrimDTO[] = [];
          const trimEnt: trimEntity[] = await this.trimRepository.find({ order :{'trimCategory':'ASC'}});
          if (trimEnt) {
            trimEnt.forEach(trimEnt => {
              const convertedtrimDTO: TrimDTO = this.trimAdapter.convertEntityToDto(
                trimEnt
              );
              trimDTO.push(convertedtrimDTO);
            });
    
  
            const response = new AllTrimResponseModel(true,1,'Trim retrieved successfully',trimDTO);

            return response;
          } else {
            throw new AllTrimResponseModel(false,99998, 'Data not found');
          }
        } catch (err) {
          return err;
        }
      }  

      async getAllActiveTrim(): Promise<AllTrimResponseModel> {
        try {
    
        const trimDTO: TrimDTO[] = [];
          const  trimEnt: trimEntity[] = await this.trimRepository.find({where:{"isActive":true},order :{'trimCategory':'ASC'}});
          
          if (trimEnt) {
            trimEnt.forEach(trimEnt => {
              const convertedDepartDto: TrimDTO = this.trimAdapter.convertEntityToDto(
                trimEnt
              );
              trimDTO.push(convertedDepartDto);
            });
    
  
            const response = new AllTrimResponseModel(true,1,'Trim retrieved successfully',trimDTO);
            return response;
          } else {
            throw new AllTrimResponseModel(false,99998, 'Data not found');
          }
        } catch (err) {
          return err;
        }
      }

      async getTrimById(trimId: number): Promise<trimEntity> {
        const Response = await this.trimRepository.findOne({
        where: {trimId: trimId},
        });
        // console.log(employeeResponse);
        if (Response) {
        return Response;
        } else {
        return null;
        }
    } 

  async activateOrDeactivateTrim(req: TrimDTO): Promise<AllTrimResponseModel> {
    try {
        const Exist = await this.getTrimById(req.trimId);
        if (Exist) {
            if (!Exist) {
                throw new AllTrimResponseModel(false,10113, 'Someone updated the current   Trim category information.Refresh and try again');
            } else {
                
                    const Status =  await this.trimRepository.update(
                        { trimId: req.trimId },
                        { isActive: req.isActive,updatedUser: req.updatedUser });
                   
                    if (Exist.isActive) {
                        if (Status.affected) {
                            const Response: AllTrimResponseModel = new AllTrimResponseModel(true, 10115, 'Trim Category is Deactivated successfully');
                            return Response;
                        } else {
                            throw new AllTrimResponseModel(false,10111, 'Trim Category is already deactivated');
                        }
                    } else {
                        if (Status.affected) {
                            const response: AllTrimResponseModel = new AllTrimResponseModel(true, 10114, 'Trim Category is Activated successfully');
                            return response;
                        } else {
                            throw new AllTrimResponseModel(false,10112, 'Trim Category is already  activated');
                        }
                    }
                // }
            }
        } else {
            throw new AllTrimResponseModel(false,99998, 'No Records Found');
        }
    } catch (err) {
        return err;
    }
}
    

async getActiveTrimById(req: TrimDTO): Promise<AllTrimResponseModel> {
  console.log(req,"serv")
  try {
      const Entity: trimEntity = await this.trimRepository.findOne({
        where:{trimId:req.trimId}
        });
        const data: TrimDTO = this.trimAdapter.convertEntityToDto(Entity);
        if (data) {
            const response = new AllTrimResponseModel(true, 11101 , 'Trim Category retrived Successfully',[data]);
            return response;
        }
        else{
            throw new AllTrimResponseModel(false,11106,'Something went wrong');
        }
  } catch (err) {
      return err;
  }
}

      






    
}