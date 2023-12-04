import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Console } from 'console';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { variety } from './variety-entity';
import { VarietyAdapter } from './dto/variety-adapter';
import { AllVarietysResponseModel, CommonResponseModel } from '@project-management-system/shared-models';
import { VarietyDTO } from './dto/variety-dto';

@Injectable()
export class varietyService{
    constructor(
        @InjectRepository(variety)

        private varRepository: Repository<variety>,
        private varAdapter: VarietyAdapter,
      ){}

      async getVarietyWithoutRelations(variety: string): Promise<variety>{
        const Response = await this.varRepository.findOne({
          where: {variety: Raw(alias => `variety = '${variety}'`)},
        });
        if(Response){
          return Response;
        }
        else{
          return null;
        }
      }



    async createVariety(varDTO: VarietyDTO, isUpdate: boolean): Promise<CommonResponseModel> {
        console.log(varDTO,'_____________________')
        try {
          if (!isUpdate) {
            const existingDept = await this.varRepository.findOne({ where: { variety: varDTO.variety }});
            const existingDept1 = await this.varRepository.findOne({ where: { varietyCode: varDTO.varietyCode }});

            if (existingDept) {
              throw new CommonResponseModel(false, 11104, 'Variety name already exists');
            } else if (existingDept1){
              throw new CommonResponseModel(false, 11104, 'Variety Code already exists');
               
            }
          } else {
            const departmentByName = await this.varRepository.findOne({ where: { variety: varDTO.variety } });
            const departById = await this.varRepository.findOne({ where: { varietyId: varDTO.varietyId } });
            
            if (departmentByName && departById.varietyId !== varDTO.varietyId) {
              throw new CommonResponseModel(false, 11104, 'variety name already exists');
            }
            
            if (!varDTO || !departById) {
              throw new ErrorResponse(11104, 'Given variety does not exist');
            }
          }
          
          const convVertiety: variety = this.varAdapter.convertDtoToEntity(varDTO, isUpdate);
          const savedVarEntity: variety = await this.varRepository.save(convVertiety);
          const savedvarDTO: VarietyDTO = this.varAdapter.convertEntityToDto(savedVarEntity);
          
          if (savedvarDTO) {
            const response = new CommonResponseModel(true, 1, isUpdate ? 'Variety Updated Successfully' : 'Variety Created Successfully');
            return response;
          } else {
            throw new CommonResponseModel(false, 11106, 'Variety saved but issue while transforming into DTO');
          }
        } catch (error) {
          return error;
        }
      }
      

        async getAllVariety(): Promise<AllVarietysResponseModel> {
    
        try {
          const varDTO: VarietyDTO[] = [];
          const varEntity: variety[] = await this.varRepository.find({ order :{'varietyCode':'ASC'}});
          if (varEntity) {
            varEntity.forEach(varEntity => {
              const convertedVarDTO: VarietyDTO = this.varAdapter.convertEntityToDto(
                varEntity
              );
              varDTO.push(convertedVarDTO);
            });
    
  
            const response = new AllVarietysResponseModel(true,1,'Variety retrieved successfully',varDTO);

            return response;
          } else {
            throw new AllVarietysResponseModel(false,99998, 'Data not found');
          }
        } catch (err) {
          return err;
        }
      }  

      async getAllActiveVariety(): Promise<AllVarietysResponseModel> {
        try {
    
        const varDTO: VarietyDTO[] = [];
          const  varEntity: variety[] = await this.varRepository.find({where:{"isActive":true},order :{'varietyCode':'ASC'}});
          
          if (varEntity) {
            varEntity.forEach(varEntity => {
              const convertedDepartDto: VarietyDTO = this.varAdapter.convertEntityToDto(
                varEntity
              );
              varDTO.push(convertedDepartDto);
            });
    
  
            const response = new AllVarietysResponseModel(true,1,'Variety retrieved successfully',varDTO);
            return response;
          } else {
            throw new AllVarietysResponseModel(false,99998, 'Data not found');
          }
        } catch (err) {
          return err;
        }
      }  

      async getVarietyById(varietyId: number): Promise<variety> {
            const Response = await this.varRepository.findOne({
            where: {varietyId: varietyId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        } 

      async activateOrDeactivateVariety(req: VarietyDTO): Promise<AllVarietysResponseModel> {
        try {
            const Exist = await this.getVarietyById(req.varietyId);
            if (Exist) {
                if (!Exist) {
                    throw new AllVarietysResponseModel(false,10113, 'Someone updated the current  Varietyinformation.Refresh and try again');
                } else {
                    
                        const DepartmentStatus =  await this.varRepository.update(
                            { varietyId: req.varietyId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (Exist.isActive) {
                            if (DepartmentStatus.affected) {
                                const DepartmentResponse: AllVarietysResponseModel = new AllVarietysResponseModel(true, 10115, 'Variety is Deactivated successfully');
                                return DepartmentResponse;
                            } else {
                                throw new AllVarietysResponseModel(false,10111, 'Variety is already deactivated');
                            }
                        } else {
                            if (DepartmentStatus.affected) {
                                const DepartResponse: AllVarietysResponseModel = new AllVarietysResponseModel(true, 10114, 'Variety is Activated successfully');
                                return DepartResponse;
                            } else {
                                throw new AllVarietysResponseModel(false,10112, 'Variety is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new AllVarietysResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getActiveVarietyById(req: VarietyDTO): Promise<AllVarietysResponseModel> {
      console.log(req,"serv")
      try {
          const Entity: variety = await this.varRepository.findOne({
            where:{varietyId:req.varietyId}
            });
            const data: VarietyDTO = this.varAdapter.convertEntityToDto(Entity);
            if (data) {
                const response = new AllVarietysResponseModel(true, 11101 , 'Variety  retrived Successfully',[data]);
                return response;
            }
            else{
                throw new AllVarietysResponseModel(false,11106,'Something went wrong');
            }
      } catch (err) {
          return err;
      }
  }





    
}