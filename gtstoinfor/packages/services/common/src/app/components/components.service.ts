import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Components } from './components.entity';
import { ComponentsAdapter } from './dto/components.adapter';
import { ComponentsDTO } from './dto/components.dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { ComponentRequest } from './dto/components.request';
import { AllComponentsResponseModel, ComponentResponseModel } from '@project-management-system/shared-models';

@Injectable()
export class ComponentsService {
  
    constructor(
        @InjectRepository(Components)
        private componentsRepository: Repository<Components>,
        private componentsAdapter: ComponentsAdapter,
      ){}

      async getComponentsWithoutRelations(component: string): Promise<Components>{
        const ComponentsResponse = await this.componentsRepository.findOne({
          where: {componentName: Raw(alias => `component_name = '${component}'`)},
        });
        if(ComponentsResponse){
          return ComponentsResponse;
        }
        else{
          return null;
        }
      }

    async createComponent(componentsDTO: ComponentsDTO, isUpdate: boolean): Promise<ComponentResponseModel> {
      
      try {
        let previousValue
        if (!isUpdate) {
          const deliveryMethodEntity = await this.componentsRepository.findOne({where:{componentName:componentsDTO.componentName}})
          if (deliveryMethodEntity) {
            //return new InformationMessageError(11104, "State already exists");
            throw new ComponentResponseModel(false,11104, 'Component already exists');
          }
        } else{
          console.log('came in');
          const certificatePrevious = await this.componentsRepository.findOne({where:{componentId:componentsDTO.componentId}})
          previousValue = certificatePrevious.componentName
          console.log(certificatePrevious)
          // const deliveryMethodEntities = await this.getDeliveryMethodWithoutRelations(deliveryMethodDTO.deliveryMethodId);
          if(!certificatePrevious) {
            throw new ErrorResponse(0, 'Given component does not exist');
          }
        }
        const convertedComponents: Components = this.componentsAdapter.convertDtoToEntity(componentsDTO,isUpdate);
        console.log(convertedComponents);
        const savedComponentEntity: Components = await this.componentsRepository.save(convertedComponents);
        const savedComponentDto: ComponentsDTO = this.componentsAdapter.convertEntityToDto(convertedComponents);
          // console.log(savedStateDto);
        if (savedComponentDto) {
          const presentValue = savedComponentDto.componentName;
         // generating resposnse
         const response = new ComponentResponseModel(true,1,isUpdate? 'Component Updated Successfully': 'Component Created Successfully');
         const name=isUpdate?'updated':'created'
         const displayValue = isUpdate? 'Component Updated Successfully': 'Component Created Successfully'
         const userName = isUpdate? savedComponentDto.updatedUser :savedComponentDto.createdUser;
        //  const newLogDto = new LogsDto(1,name, 'Currencies', savedCurrencyDto.currencyId, true, displayValue,userName,previousValue,presentValue)
        //  let res = await this.logService.createLog(newLogDto);
        //  console.log(res);
         return response
        } else {
          //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
          throw new ComponentResponseModel(false,11106,'Component saved but issue while transforming into DTO');
        }
      } catch (error) {
        // when error occures while saving the data , the execution will come to catch block.
        // tslint:disable-next-line: typedef
        return error;
      }
    }

    async getAllComponents(): Promise<AllComponentsResponseModel> {
      try {
        const componentsDTO: ComponentsDTO[] = [];
        const componentEntity: Components[] = await this.componentsRepository.find({ 
          order :{componentName:'ASC'}});
        if (componentEntity) {
          // converts the data fetched from the database which of type companies array to type StateDto array.
          componentEntity.forEach(componentEntity => {
            const convertedComponentsDto: ComponentsDTO = this.componentsAdapter.convertEntityToDto(
              componentEntity
            );
            componentsDTO.push(convertedComponentsDto);
          });
          //generated response
          const response = new AllComponentsResponseModel(true,1,'Components retrieved successfully',componentsDTO);
          return response;
        } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
        // return response;
      } catch (err) {
        return err;
      }
    }  

    async getAllActiveComponents(): Promise<AllComponentsResponseModel> {
      // const page: number = 1;
      // const response = new AllDeliveryResponseModel();
      try {
        const componentsDTO: ComponentsDTO[] = [];
        //retrieves all companies
        const componentsEntity: ComponentsDTO[] = await this.componentsRepository.find({where:{"isActive":true},order :{componentName:'ASC'}});
        //console.log(statesEntities);
        
        if (componentsEntity) {
          // converts the data fetched from the database which of type companies array to type StateDto array.
          componentsEntity.forEach(componentsEntity => {
            const convertedComponentDto: ComponentsDTO = this.componentsAdapter.convertEntityToDto(
              componentsEntity
            );
            componentsDTO.push(convertedComponentDto);
          });
  
          //generated response

          const response = new AllComponentsResponseModel(true,1,'Components retrieved successfully',componentsDTO);
          return response;
        } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
        // return response;
      } catch (err) {
        return err;
      }
    }  

async activateOrDeactivateComponent(req: ComponentRequest): Promise<ComponentResponseModel> {
  console.log(req,'hoioooo')
  try {
      const componentsExists = await this.getComponentById(req.componentId);
      console.log(componentsExists,'sdfghjk')
      if (componentsExists) {
          if (!componentsExists) {
              throw new ErrorResponse(10113, 'Someone updated the current Components information. Refresh and try again');
          } else {
              
                  const componentStatus =  await this.componentsRepository.update(
                      { componentId: req.componentId },
                      { isActive: req.isActive,updatedUser: req.updatedUser });
                 
                  if (componentsExists.isActive) {
                      if (componentStatus.affected) {
                          const componentResponse: ComponentResponseModel = new ComponentResponseModel(true, 10115, 'Component is de-activated successfully');
                          return componentResponse;
                      } else {
                          throw new ComponentResponseModel(false,10111, 'Component is already deactivated');
                      }
                  } else {
                      if (componentStatus.affected) {
                          const componentResponse: ComponentResponseModel = new ComponentResponseModel(true, 10114, 'Component is activated successfully');
                          return componentResponse;
                      } else {
                          throw new ComponentResponseModel(false,10112, 'Component is already  activated');
                      }
                  }
              // }
          }
      } else {
          throw new ComponentResponseModel(false,99998, 'No Records Found');
      }
  } catch (err) {
      return err;
  }
}

async getActiveComponentById(req: ComponentRequest): Promise<ComponentResponseModel> {
  try {
      //retrieves all companies
      const componentEntities: Components = await this.componentsRepository.findOne({
        where:{componentId:req.componentId}
        });
        
        const componentData: ComponentsDTO = this.componentsAdapter.convertEntityToDto(componentEntities);
        if (componentData) {
            const response = new ComponentResponseModel(true, 11101 , 'Component retrieved Successfully',[componentData]);
            return response;
        }
        else{
            throw new ComponentResponseModel(false,11106,'Something went wrong');
        }
        // generating resposnse
  } catch (err) {
      return err;
  }
}

async getComponentById(componentId: number): Promise<Components> {
  //  console.log(employeeId);
      const Response = await this.componentsRepository.findOne({
      where: {componentId: componentId},
      });
      // console.log(employeeResponse);
      if (Response) {
      return Response;
      } else {
      return null;
      }
  }

}