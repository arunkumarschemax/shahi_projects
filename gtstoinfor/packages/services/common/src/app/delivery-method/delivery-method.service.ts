import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { DeliveryMethod } from './delivery-method.entity';
import { DeliveryMethodAdapter } from './dto/delivery-method.adapter';
import { DeliveryMethodDTO } from './dto/delivery-method.dto';
import { AllDeliveryResponseModel, DeliveryMethodResponseModel } from 'packages/libs/shared-models/src/common/delivery-method';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { DeliveryMethodRequest } from './dto/delivery-method.request';

@Injectable()
export class DeliveryMethodService {
  
    constructor(
        @InjectRepository(DeliveryMethod)
        private deliveryMethodRepository: Repository<DeliveryMethod>,
        private deliveryMethodAdapter: DeliveryMethodAdapter,
      ){}

      async getDeliveryMethodWithoutRelations(deliveryMethod: string): Promise<DeliveryMethod>{
        const DeliveryMethodResponse = await this.deliveryMethodRepository.findOne({
          where: {deliveryMethod: Raw(alias => `delivery_method = '${deliveryMethod}'`)},
        });
        if(DeliveryMethodResponse){
          return DeliveryMethodResponse;
        }
        else{
          return null;
        }
      }

      async createDeliveryMethod(deliveryMethodDTO: DeliveryMethodDTO, isUpdate: boolean): Promise<DeliveryMethodResponseModel> {
        try {
          let previousValue;
          if (!isUpdate) {
            const deliveryMethodEntity = await this.deliveryMethodRepository.findOne({ where: { deliveryMethod: deliveryMethodDTO.deliveryMethod } });
            if (deliveryMethodEntity) {
              throw new DeliveryMethodResponseModel(false, 11104, 'Delivery Method already exists');
            }
          } else {
            const certificatePrevious = await this.deliveryMethodRepository.findOne({ where: { deliveryMethodId: deliveryMethodDTO.deliveryMethodId } });
            if (!certificatePrevious) {
              throw new ErrorResponse(0, 'Given delivery does not exist');
            }
            
            if (certificatePrevious.deliveryMethod !== deliveryMethodDTO.deliveryMethod) {
              throw new DeliveryMethodResponseModel(false, 11104, 'Cannot update to an existing delivery method');
            }
            
            previousValue = certificatePrevious.deliveryMethod;
          }
          
          const convertedDeliveryMethod: DeliveryMethod = this.deliveryMethodAdapter.convertDtoToEntity(deliveryMethodDTO, isUpdate);
          const savedDeliveryMethodEntity: DeliveryMethod = await this.deliveryMethodRepository.save(convertedDeliveryMethod);
          const savedDeliveryMethodDto: DeliveryMethodDTO = this.deliveryMethodAdapter.convertEntityToDto(savedDeliveryMethodEntity);
          
          if (savedDeliveryMethodDto) {
            const response = new DeliveryMethodResponseModel(true, 1, isUpdate ? 'Delivery Method Updated Successfully' : 'Delivery Method Created Successfully');
            return response;
          } else {
            throw new DeliveryMethodResponseModel(false, 11106, 'Delivery Method saved but issue while transforming into DTO');
          }
        } catch (error) {
          return error;
        }
      }
      
      

    async getAllDeliveryMethods(): Promise<AllDeliveryResponseModel> {
      try {
        const deliveryMethodDTO: DeliveryMethodDTO[] = [];
        const DeliveryMethodEntity: DeliveryMethod[] = await this.deliveryMethodRepository.find({ 
          order :{deliveryMethod:'ASC'}});
        if (DeliveryMethodEntity) {
          // converts the data fetched from the database which of type companies array to type StateDto array.
          DeliveryMethodEntity.forEach(DeliveryMethodEntity => {
            const convertedDeliveryMethodDto: DeliveryMethodDTO = this.deliveryMethodAdapter.convertEntityToDto(
              DeliveryMethodEntity
            );
            deliveryMethodDTO.push(convertedDeliveryMethodDto);
          });
          //generated response
          const response = new AllDeliveryResponseModel(true,1,'Delivery Method retrieved successfully',deliveryMethodDTO);
          return response;
        } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
        // return response;
      } catch (err) {
        return err;
      }
    }  

    async getAllActiveDeliveryMethods(): Promise<AllDeliveryResponseModel> {
      // const page: number = 1;
      // const response = new AllDeliveryResponseModel();
      try {
        const deliveryMethodDTO: DeliveryMethodDTO[] = [];
        //retrieves all companies
        const DeliveryMethodEntity: DeliveryMethod[] = await this.deliveryMethodRepository.find({where:{"isActive":true},order :{deliveryMethod:'ASC'}});
        //console.log(statesEntities);
        
        if (DeliveryMethodEntity) {
          // converts the data fetched from the database which of type companies array to type StateDto array.
          DeliveryMethodEntity.forEach(DeliveryMethodEntity => {
            const convertedDeliveryMethodDto: DeliveryMethodDTO = this.deliveryMethodAdapter.convertEntityToDto(
              DeliveryMethodEntity
            );
            deliveryMethodDTO.push(convertedDeliveryMethodDto);
          });
  
          //generated response

          const response = new AllDeliveryResponseModel(true,1,'Delivery Method retrieved successfully',deliveryMethodDTO);
          return response;
        } else {
          throw new ErrorResponse(99998, 'Data not found');
        }
        // return response;
      } catch (err) {
        return err;
      }
    }  

async activateOrDeactivateDeliveryMethod(deliveryMethodReq: DeliveryMethodRequest): Promise<DeliveryMethodResponseModel> {
  console.log(deliveryMethodReq,'hoioooo')
  try {
      const deliveryMethodExists = await this.getDeliveryMethodById(deliveryMethodReq.deliveryMethodId);
      console.log(deliveryMethodExists,'sdfghjk')
      if (deliveryMethodExists) {
          if (!deliveryMethodExists) {
              throw new ErrorResponse(10113, 'Someone updated the current Delivery Method information. Refresh and try again');
          } else {
              
                  const deliveryMethodStatus =  await this.deliveryMethodRepository.update(
                      { deliveryMethodId: deliveryMethodReq.deliveryMethodId },
                      { isActive: deliveryMethodReq.isActive,updatedUser: deliveryMethodReq.updatedUser });
                      console.log(deliveryMethodStatus,'kkkkkkkkkkk')
                 
                  if (deliveryMethodExists.isActive) {
                      if (deliveryMethodStatus.affected) {
                          const deliveryMethodResponse: DeliveryMethodResponseModel = new DeliveryMethodResponseModel(true, 10115, 'Delivery Method is de-activated successfully');
                          return deliveryMethodResponse;
                      } else {
                          throw new DeliveryMethodResponseModel(false,10111, 'Delivery Method is already deactivated');
                      }
                  } else {
                      if (deliveryMethodStatus.affected) {
                          const deliveryMethodResponse: DeliveryMethodResponseModel = new DeliveryMethodResponseModel(true, 10114, 'Delivery Method is activated successfully');
                          return deliveryMethodResponse;
                      } else {
                          throw new DeliveryMethodResponseModel(false,10112, 'Delivery Method is already  activated');
                      }
                  }
              // }
          }
      } else {
          throw new DeliveryMethodResponseModel(false,99998, 'No Records Found');
      }
  } catch (err) {
      return err;
  }
}

async getActiveDeliveryMethodById(deliveryMethodReq: DeliveryMethodRequest): Promise<DeliveryMethodResponseModel> {
  try {
      //retrieves all companies
      const deliveryMethodEntities: DeliveryMethod = await this.deliveryMethodRepository.findOne({
        where:{deliveryMethodId:deliveryMethodReq.deliveryMethodId}
        });
        
        const deliveryMethodData: DeliveryMethodDTO = this.deliveryMethodAdapter.convertEntityToDto(deliveryMethodEntities);
        if (deliveryMethodData) {
            const response = new DeliveryMethodResponseModel(true, 11101 , 'Delivery Method retrieved Successfully',[deliveryMethodData]);
            return response;
        }
        else{
            throw new DeliveryMethodResponseModel(false,11106,'Something went wrong');
        }
        // generating resposnse
  } catch (err) {
      return err;
  }
}

async getDeliveryMethodById(deliveryMethodId: number): Promise<DeliveryMethod> {
  //  console.log(employeeId);
      const Response = await this.deliveryMethodRepository.findOne({
      where: {deliveryMethodId: deliveryMethodId},
      });
      // console.log(employeeResponse);
      if (Response) {
      return Response;
      } else {
      return null;
      }
  }

}