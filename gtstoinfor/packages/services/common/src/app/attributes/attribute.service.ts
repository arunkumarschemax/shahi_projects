import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllAttributesResponse, AttributeResponse } from '@project-management-system/shared-models';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { Attributes } from './attributes.entity';
import { AttributeAdapter } from './dto/attribute.adapter';
import { AttributeDto } from './dto/attribute.dto';

@Injectable()
export class AttributeService {
    constructor(
        @InjectRepository(Attributes) private attributeRepository: Repository<Attributes>,
        private attributeAdapter: AttributeAdapter,
    ) { }


    async createAttribute(attributeDto: AttributeDto, isUpdate: boolean): Promise<AttributeResponse> {
        try {
          if (!isUpdate) {
            const attributeEntity = await this.attributeRepository.findOne({ where: { attributeName: attributeDto.attributeName } });
            if (attributeEntity) {
              throw new AttributeResponse(false, 11104, 'Attribute already exists');
            }
          } else {
            const attributeEntity = await this.attributeRepository.findOne({ where: { attributeId: attributeDto.attributeId } });
            if (!attributeEntity) {
              throw new ErrorResponse(11104, 'Attribute not found');
            }
          }
      
          const convertedAttribute: Attributes = this.attributeAdapter.convertDtoToEntity(attributeDto, isUpdate);
          const savedAttributeEntity: Attributes = await this.attributeRepository.save(convertedAttribute);
          const savedAttributeDto: AttributeDto = this.attributeAdapter.convertEntityToDto(savedAttributeEntity);
      
          if (savedAttributeDto) {
            const response = new AttributeResponse(true, 1, isUpdate ? 'Attribute Updated Successfully' : 'Attribute Created Successfully');
            return response;
          } else {
            throw new AttributeResponse(false, 11106, 'Attribute saved but issue while transforming into DTO');
          }
        } catch (error) {
          return error;
        }
      }


    //   async getAllAttributes(): Promise<AllAttributesResponse> {
    //     try {
    //       const attributeDto: AttributeDto[] = [];
    //       const attributeEntity: Attributes[] = await this.attributeRepository.find({ order :{attributeName:'ASC'}});
    //       if (attributeEntity) {
    //         attributeEntity.forEach(attributeEntity => {
    //           const convertedAttributesDto: AttributeDto = this.attributeAdapter.convertEntityToDto( attributeEntity );
    //           attributeDto.push(convertedAttributesDto);
    //         });
    //         const response = new AllAttributesResponse(true,1,'Attributes retrieved successfully',attributeDto);
    //         return response;
    //       } else {
    //         throw new ErrorResponse(99998, 'Data not found');
    //       }
    //       // return response;
    //     } catch (err) {
    //       return err;
    //     }
    //   }  
  
//       async getAllActiveComponents(): Promise<AllComponentsResponseModel> {
//         // const page: number = 1;
//         // const response = new AllDeliveryResponseModel();
//         try {
//           const componentsDTO: ComponentsDTO[] = [];
//           //retrieves all companies
//           const componentsEntity: ComponentsDTO[] = await this.componentsRepository.find({where:{"isActive":true},order :{componentName:'ASC'}});
//           //console.log(statesEntities);
          
//           if (componentsEntity) {
//             // converts the data fetched from the database which of type companies array to type StateDto array.
//             componentsEntity.forEach(componentsEntity => {
//               const convertedComponentDto: ComponentsDTO = this.componentsAdapter.convertEntityToDto(
//                 componentsEntity
//               );
//               componentsDTO.push(convertedComponentDto);
//             });
    
//             //generated response
  
//             const response = new AllComponentsResponseModel(true,1,'Components retrieved successfully',componentsDTO);
//             return response;
//           } else {
//             throw new ErrorResponse(99998, 'Data not found');
//           }
//           // return response;
//         } catch (err) {
//           return err;
//         }
//       }  
  
//   async activateOrDeactivateComponent(req: ComponentRequest): Promise<ComponentResponseModel> {
//     console.log(req,'hoioooo')
//     try {
//         const componentsExists = await this.getComponentById(req.componentId);
//         console.log(componentsExists,'sdfghjk')
//         if (componentsExists) {
//             if (!componentsExists) {
//                 throw new ErrorResponse(10113, 'Someone updated the current Components information. Refresh and try again');
//             } else {
                
//                     const componentStatus =  await this.componentsRepository.update(
//                         { componentId: req.componentId },
//                         { isActive: req.isActive,updatedUser: req.updatedUser });
                   
//                     if (componentsExists.isActive) {
//                         if (componentStatus.affected) {
//                             const componentResponse: ComponentResponseModel = new ComponentResponseModel(true, 10115, 'Component is de-activated successfully');
//                             return componentResponse;
//                         } else {
//                             throw new ComponentResponseModel(false,10111, 'Component is already deactivated');
//                         }
//                     } else {
//                         if (componentStatus.affected) {
//                             const componentResponse: ComponentResponseModel = new ComponentResponseModel(true, 10114, 'Component is activated successfully');
//                             return componentResponse;
//                         } else {
//                             throw new ComponentResponseModel(false,10112, 'Component is already  activated');
//                         }
//                     }
//                 // }
//             }
//         } else {
//             throw new ComponentResponseModel(false,99998, 'No Records Found');
//         }
//     } catch (err) {
//         return err;
//     }
//   }
  
//   async getActiveComponentById(req: ComponentRequest): Promise<ComponentResponseModel> {
//     try {
//         //retrieves all companies
//         const componentEntities: Components = await this.componentsRepository.findOne({
//           where:{componentId:req.componentId}
//           });
          
//           const componentData: ComponentsDTO = this.componentsAdapter.convertEntityToDto(componentEntities);
//           if (componentData) {
//               const response = new ComponentResponseModel(true, 11101 , 'Component retrieved Successfully',[componentData]);
//               return response;
//           }
//           else{
//               throw new ComponentResponseModel(false,11106,'Something went wrong');
//           }
//           // generating resposnse
//     } catch (err) {
//         return err;
//     }
//   }
  
//   async getComponentById(componentId: number): Promise<Components> {
//     //  console.log(employeeId);
//         const Response = await this.componentsRepository.findOne({
//         where: {componentId: componentId},
//         });
//         // console.log(employeeResponse);
//         if (Response) {
//         return Response;
//         } else {
//         return null;
//         }
//     }
      

}
