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
        let previousValue
        // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
        if (!isUpdate) {
          const deliveryMethodEntity = await this.deliveryMethodRepository.findOne({where:{deliveryMethodId:deliveryMethodDTO.deliveryMethodId}})
          if (deliveryMethodEntity) {
            //return new InformationMessageError(11104, "State already exists");
            throw new DeliveryMethodResponseModel(false,11104, 'Delivery Method already exists');
          }
        } else{
          console.log('came in');
          const certificatePrevious = await this.deliveryMethodRepository.findOne({where:{deliveryMethodId:deliveryMethodDTO.deliveryMethodId}})
          previousValue = certificatePrevious.deliveryMethod
          console.log(certificatePrevious)
          // const deliveryMethodEntities = await this.getDeliveryMethodWithoutRelations(deliveryMethodDTO.deliveryMethodId);
          if(!certificatePrevious) {
            throw new ErrorResponse(0, 'Given delivery does not exist');
          }
        }
        const convertedDeliveryMethod: DeliveryMethod = this.deliveryMethodAdapter.convertDtoToEntity(deliveryMethodDTO,isUpdate);
        console.log(convertedDeliveryMethod);
        const savedDeliveryMethodEntity: DeliveryMethod = await this.deliveryMethodRepository.save(convertedDeliveryMethod);
        const savedDeliveryMethodDto: DeliveryMethodDTO = this.deliveryMethodAdapter.convertEntityToDto(convertedDeliveryMethod);
          // console.log(savedStateDto);
        if (savedDeliveryMethodDto) {
          const presentValue = savedDeliveryMethodDto.deliveryMethod;
         // generating resposnse
         const response = new DeliveryMethodResponseModel(true,1,isUpdate? 'Delivery Method Updated Successfully': 'Delivery Method Created Successfully');
         const name=isUpdate?'updated':'created'
         const displayValue = isUpdate? 'Delivery Method Updated Successfully': 'Delivery Method Created Successfully'
         const userName = isUpdate? savedDeliveryMethodDto.updatedUser :savedDeliveryMethodDto.createdUser;
        //  const newLogDto = new LogsDto(1,name, 'Currencies', savedCurrencyDto.currencyId, true, displayValue,userName,previousValue,presentValue)
        //  let res = await this.logService.createLog(newLogDto);
        //  console.log(res);
         return response
        } else {
          //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
          throw new DeliveryMethodResponseModel(false,11106,'Delivery Method saved but issue while transforming into DTO');
        }
      } catch (error) {
        // when error occures while saving the data , the execution will come to catch block.
        // tslint:disable-next-line: typedef
        return error;
      }
    }

    async getAllDeliveryMethods(): Promise<AllDeliveryResponseModel> {
      // const page: number = 1;
      // const response = new AllDeliveryResponseModel();
      try {
        const deliveryMethodDTO: DeliveryMethodDTO[] = [];
        //retrieves all companies
        const DeliveryMethodEntity: DeliveryMethod[] = await this.deliveryMethodRepository.find({ order :{deliveryMethod:'ASC'}});
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