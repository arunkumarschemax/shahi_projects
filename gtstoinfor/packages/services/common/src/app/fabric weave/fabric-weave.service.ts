import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { FabricWeave } from './fabric-weave.entity';
import { FabricWeaveAdapter } from './dto/fabric-weave.adapter';
import { FabriCWeaveDto } from './dto/fabric-weave.dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { FabricWeaveRequest } from './dto/fabric-weave-request';
import { AllFabricWeaveResponseModel, FabricWeaveDto, FabricWeaveResponseModel, UploadResponse } from '@project-management-system/shared-models';

@Injectable()
export class FabricWeaveService {
  
    constructor(
        @InjectRepository(FabricWeave)
        private fabricWeaveRepository: Repository<FabricWeave>,
        private fabricWeaveAdapter: FabricWeaveAdapter,
      ){}

      async getFabricWeaveWithoutRelations( fabricWeaveName: string): Promise<FabricWeave>{
        const fabricWeaveResponse = await this.fabricWeaveRepository.findOne({
          where: {fabricWeaveName: Raw(alias => `fabric_weave_name = '${fabricWeaveName}'`)},
        });
        if(fabricWeaveResponse){
          return fabricWeaveResponse;
        }
        else{
          return null;
        }
      }

      async createFabricWeave(dto: FabriCWeaveDto, isUpdate: boolean): Promise<FabricWeaveResponseModel> {
        console.log(dto,'service');
        
        try {
          let previousValue;
            const entity = await this.fabricWeaveRepository.findOne({ where: { fabricWeaveName: dto.fabricWeaveName } });
            if (entity) {
              throw new FabricWeaveResponseModel(false, 11104, 'Fabric Weave already exists');
            }
            if(isUpdate){
            const certificatePrevious = await this.fabricWeaveRepository.findOne({ where: { fabricWeaveId: dto.fabricWeaveId } });
            if (!certificatePrevious) {
              throw new ErrorResponse(0, 'Given Fabric Weave does not exist');
            }
            previousValue = certificatePrevious.fabricWeaveName;
          }
          const converted: FabricWeave = this.fabricWeaveAdapter.convertDtoToEntity(dto, isUpdate);
          const savedEntity: FabricWeave = await this.fabricWeaveRepository.save(converted);
          const savedDto: FabriCWeaveDto = this.fabricWeaveAdapter.convertEntityToDto(savedEntity);
          
          if (savedDto) {
            const response = new FabricWeaveResponseModel(true, 1, isUpdate ? 'Fabric Weave Updated Successfully' : 'Fabric Weave Created Successfully',[savedDto]);
            return response;
          } else {
            throw new FabricWeaveResponseModel(false, 11106, 'Fabric Weave saved but issue while transforming into DTO');
          }
        } catch (error) {
          return error;
        }
      }
      
      

      async getAllFabricWeave():Promise<AllFabricWeaveResponseModel>{
        const fabricWeave = await this.fabricWeaveRepository.find({order:{createdAt:'ASC'}})
        if(fabricWeave.length >0){
            return new AllFabricWeaveResponseModel(true,1,'Fabric Weaves Retrieved Successfully',fabricWeave)
        }else{
            return new AllFabricWeaveResponseModel(false,0,'No Fabric Weaves Found',[])

        }

    }

    async getAllActiveFabricWeave():Promise<AllFabricWeaveResponseModel>{
      const fabricWeave = await this.fabricWeaveRepository.find({where:{isActive:true},order:{createdAt:'ASC'}})
      if(fabricWeave.length >0){
          return new AllFabricWeaveResponseModel(true,1,'Active fabricWeaves Retrieved Successfully',fabricWeave)
      }else{
          return new AllFabricWeaveResponseModel(false,0,'No  Employees Found ',[])

      }

  } 

async activateOrDeactivateFabricWeave(req: FabricWeaveRequest): Promise<FabricWeaveResponseModel> {
  try {
      const fabricWeaveExists = await this.getFabricWeaveById(req.fabricWeaveId);
      if (fabricWeaveExists) {
          if (!fabricWeaveExists) {
              throw new ErrorResponse(10113, 'Someone updated the current Fabric Weave information. Refresh and try again');
          } else {
                  const status =  await this.fabricWeaveRepository.update(
                      { fabricWeaveId: req.fabricWeaveId },
                      { isActive: req.isActive,updatedUser: req.updatedUser });
                 
                  if (fabricWeaveExists.isActive) {
                      if (status.affected) {
                          const response: FabricWeaveResponseModel = new FabricWeaveResponseModel(true, 10115, 'Fabric Weave is de-activated successfully');
                          return response;
                      } else {
                          throw new FabricWeaveResponseModel(false,10111, 'Fabric Weave is already deactivated');
                      }
                  } else {
                      if (status.affected) {
                          const response: FabricWeaveResponseModel = new FabricWeaveResponseModel(true, 10114, 'Fabric Weave is activated successfully');
                          return response;
                      } else {
                          throw new FabricWeaveResponseModel(false,10112, 'Fabric Weave is already  activated');
                      }
                  }
          }
      } else {
          throw new FabricWeaveResponseModel(false,99998, 'No Records Found');
      }
  } catch (err) {
      return err;
  }
}

async getActiveFabricWeaveById( req: FabricWeaveRequest): Promise<FabricWeaveResponseModel> {
  try {
      const entities: FabricWeave = await this.fabricWeaveRepository.findOne({where:{fabricWeaveId: req.fabricWeaveId}});
        
        const data: FabricWeaveDto = this.fabricWeaveAdapter.convertEntityToDto(entities);
        if (data) {
            const response = new FabricWeaveResponseModel(true, 11101 , 'Fabric Weave retrieved Successfully',[data]);
            return response;
        }
        else{
            throw new FabricWeaveResponseModel(false,11106,'Something went wrong');
        }
  } catch (err) {
      return err;
  }
}

async getFabricWeaveById(fabricWeaveId: number): Promise<FabricWeave> {
      const Response = await this.fabricWeaveRepository.findOne({
      where: {fabricWeaveId: fabricWeaveId},
      });
     if (Response) {
      return Response;
      } else {
      return null;
      }
  }

  async updatePath(filePath: string, fileName: string, id: number): Promise<UploadResponse>{
    try {
      console.log("coming ra mawa")
      console.log(id)
      let imagePathUpdate;
      imagePathUpdate = await this.fabricWeaveRepository.update(
        { fabricWeaveId: id },
        { fabricWeaveImagePath: filePath, fabricWeaveImageName: fileName },
      );
      const result = await this.fabricWeaveRepository.findOne({ where: { fabricWeaveId: id } })
      console.log('*****result*****', result)
      if (imagePathUpdate.affected > 0) {
          return new UploadResponse(true, 11, 'Uploaded successfully', filePath);
      }
      else {
          return new UploadResponse(false, 11, 'Uploaded failed', filePath);
      }
  }
  catch (error) {
      console.log(error);
  }
  }

}