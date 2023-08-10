import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllAttributesResponse, AttributeResponse } from '@project-management-system/shared-models';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { Attributes } from './attributes.entity';
import { AttributeAdapter } from './dto/attribute.adapter';
import { AttributeDto } from './dto/attribute.dto';
import { AttributeRequest } from './dto/attribute.request';
import { AttributeAgainstRequest } from './dto/attribute-against.request';


@Injectable()
export class AttributeService {
    constructor(
        @InjectRepository(Attributes) private attributeRepository: Repository<Attributes>,
        private attributeAdapter: AttributeAdapter,
    ) { }


    async createAttribute(attributeDto: AttributeDto, isUpdate: boolean): Promise<AttributeResponse> {
        try {
          if (!isUpdate) {
            const attributeEntity = await this.attributeRepository.findOne({ where: { 
              attributeName: attributeDto.attributeName,
              attributeAgainst: attributeDto.attributeAgainst
            } });
            if (attributeEntity) {
              throw new AttributeResponse(false, 11104, 'Attribute already exists');
            }
          } else {
            const attributeEntity = await this.attributeRepository.findOne({ where: { attributeId: attributeDto.attributeId } });
            if (!attributeEntity) {
              throw new ErrorResponse(11104, 'Attribute not found');
            }
            const attributeWithSameName = await this.attributeRepository.findOne({ where: { 
              attributeName: attributeDto.attributeName,
              attributeAgainst: attributeDto.attributeAgainst
             } });

            if (attributeWithSameName && attributeWithSameName.attributeId !== attributeDto.attributeId) {
                throw new AttributeResponse(false, 11104, 'Attribute already exists');
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


      async getAllAttributes(): Promise<AllAttributesResponse> {
        try {
          const attributeDto: AttributeDto[] = [];
          const attributeEntity: Attributes[] = await this.attributeRepository.find({ order :{attributeName:'ASC'}});
          if (attributeEntity) {
            attributeEntity.forEach(attributeEntity => {
              const convertedAttributesDto: AttributeDto = this.attributeAdapter.convertEntityToDto( attributeEntity );
              attributeDto.push(convertedAttributesDto);
            });
            const response = new AllAttributesResponse(true,1,'Attributes retrieved successfully',attributeDto);
            return response;
          } else {
            throw new ErrorResponse(99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      }

      async activateOrDeactivateAttributes(req: AttributeRequest): Promise<AttributeResponse> {
        console.log(req,'hoioooo')
        try {
            const attributeExists = await this.getAttributeById(req.attributeId);
            console.log(attributeExists,'sdfghjk')
            if (attributeExists) {
                if (!attributeExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current Attribute information. Refresh and try again');
                } else {
                    
                        const attributeStatus =  await this.attributeRepository.update(
                            { attributeId: req.attributeId },
                            { isActive: req.isActive,updatedUser: req.updatedUser });
                       
                        if (attributeExists.isActive) {
                            if (attributeStatus.affected) {
                                const componentResponse: AttributeResponse = new AttributeResponse(true, 10115, 'Attribute is de-activated successfully');
                                return componentResponse;
                            } else {
                                throw new AttributeResponse(false,10111, 'Attribute is already deactivated');
                            }
                        } else {
                            if (attributeStatus.affected) {
                                const componentResponse: AttributeResponse = new AttributeResponse(true, 10114, 'Component is activated successfully');
                                return componentResponse;
                            } else {
                                throw new AttributeResponse(false,10112, 'Attribute is already  activated');
                            }
                        }
                    // }
                }
            } else {
                throw new AttributeResponse(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
      }


      async getAttributeById(attributeId: number): Promise<Attributes> {
        //  console.log(employeeId);
            const Response = await this.attributeRepository.findOne({ where: {attributeId: attributeId}});
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }
  
      async getAllActiveAttributes(): Promise<AllAttributesResponse> {
        try {
          const attributeDto: AttributeDto[] = [];
          const attributeEntity: Attributes[] = await this.attributeRepository.find({where:{"isActive":true},order :{attributeName:'ASC'}});
          
          if (attributeEntity) {
            attributeEntity.forEach(attributeEntity => {
              const convertedComponentDto: AttributeDto = this.attributeAdapter.convertEntityToDto( attributeEntity );
              attributeDto.push(convertedComponentDto);
            });
  
            const response = new AllAttributesResponse(true,1,'Attributes retrieved successfully',attributeDto);
            return response;
          } else {
            throw new ErrorResponse(99998, 'Data not found');
          }
        } catch (err) {
          return err;
        }
      }  
  

  
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


  async getAttributeByAttributeAgainst(attributeAgainst: AttributeAgainstRequest): Promise<AllAttributesResponse> {
    console.log(attributeAgainst,'???????????????????????')
      const Response = await this.attributeRepository.find({ where: {
          attributeAgainst: attributeAgainst.attributeAgainst,
          isActive: attributeAgainst.isActive
      }});
      // console.log(employeeResponse);
      if (Response) {
          const res = new AllAttributesResponse(true,1,'Attributes retrieved successfully',Response);
          return res;
      } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
  }
  
  
      

}


