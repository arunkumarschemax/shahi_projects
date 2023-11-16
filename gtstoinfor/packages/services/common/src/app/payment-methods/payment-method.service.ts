
import { PaymentMethodController } from './payment-method.controller';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { AllPaymentMethodResponseModel } from '@project-management-system/shared-models';
import { PaymentMethodResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { PaymentMethod } from './payment-method-entity';
import { PaymentMethodAdapter } from './dto/payment-method.adapter';
import { PaymentMethodDTO } from './dto/payment-method.dto';
import { PaymentMethodRequest } from './dto/payment-request';
@Injectable()
export class PaymentMethodService {
  
    constructor(
        @InjectRepository(PaymentMethod)

        private PaymentMethodRepository: Repository<PaymentMethod>,
        private PaymentMethodAdapter: PaymentMethodAdapter,
      ){}
      async getPaymentMethodWithoutRelations(PaymentMethod: string): Promise<PaymentMethod>{
        const PaymentMethodResponse = await this.PaymentMethodRepository.findOne({
          where: {paymentMethod: Raw(alias => `payment_method = '${PaymentMethod}'`)},
        });
        if(PaymentMethodResponse){
          return PaymentMethodResponse;
        }
        else{
          return null;
        }
      }
  
      async createPaymentMethod(PaymentMethodDTO: PaymentMethodDTO, isUpdate: boolean): Promise<PaymentMethodResponseModel>{
  
        // const response = new PaymentMethodResponseModel();
        try{
          let previousValue
        const PaymentMethodDtos: PaymentMethodDTO[] = [];

          if(!isUpdate){
            const PaymentMethodEntity = await this.getPaymentMethodWithoutRelations(PaymentMethodDTO.paymentMethod);
            if (PaymentMethodEntity){
              throw new PaymentMethodResponseModel(false,11104, 'Payment Method already exists'); 
            }
          }
          else{
            const certificatePrevious = await this.PaymentMethodRepository.findOne({where:{paymentMethodId:PaymentMethodDTO.paymentMethodId}})
            previousValue =(certificatePrevious.paymentMethod)
            const PaymentMethodEntity = await this.getPaymentMethodWithoutRelations(PaymentMethodDTO.paymentMethod);
            if (PaymentMethodEntity){
              if(PaymentMethodEntity.paymentMethodId != PaymentMethodDTO.paymentMethodId ){
                throw new PaymentMethodResponseModel(false,11104, 'Payment Method already exists'); 
              }
            }
          }
          const convertedPaymentMethodEntity: PaymentMethod = this.PaymentMethodAdapter.convertDtoToEntity(PaymentMethodDTO,isUpdate);

          // console.log(convertedPaymentMethodEntity);
        const savedPaymentMethodEntity: PaymentMethod = await this.PaymentMethodRepository.save(convertedPaymentMethodEntity);
        const savedPaymentMethodDto: PaymentMethodDTO = this.PaymentMethodAdapter.convertEntityToDto(savedPaymentMethodEntity);
        PaymentMethodDtos.push(savedPaymentMethodDto)
          console.log(savedPaymentMethodDto);
        if (savedPaymentMethodDto) {
          const presentValue = PaymentMethodDTO.paymentMethod;
          //generating resposnse
   
          const name=isUpdate?'updated':'created'
          const displayValue = isUpdate? 'PaymentMethod Updated Successfully': 'PaymentMethod Created Successfully'
          const userName = isUpdate? savedPaymentMethodDto.updatedUser :savedPaymentMethodDto.createdUser;
            // const newLogDto = new LogsDto(1,name, 'PaymentMethod', savedPaymentMethodDto.paymentMethodId, true, displayValue,userName,previousValue,presentValue)
            // let res = await this.logService.createLog(newLogDto);
            // /console.log(res);
            const response = new AllPaymentMethodResponseModel(true,1000,isUpdate? 'PaymentMethod Updated Successfully': 'PaymentMethod Created Successfully');
          return response;
        } else {
          //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
          throw new PaymentMethodResponseModel(false,11106,'Payment Method saved but issue while transforming into DTO');
        }
        // return response;
      } catch (error) {
        // when error occures while saving the data , the execution will come to catch block.
        // tslint:disable-next-line: typedef
        return error;
      }
    }
    async getAllPaymentMethods(): Promise<AllPaymentMethodResponseModel> {
      // const page: number = 1;
      // const response = new AllPaymentResponseModel();
      try {
        const PaymentMethodDTO: PaymentMethodDTO[] = [];
        //retrieves all companies
        const PaymentMethodEntity: PaymentMethod[] = await this.PaymentMethodRepository.find({ order :{'paymentMethod':'ASC'}});
        //console.log(statesEntities);
        if (PaymentMethodEntity) {
          // converts the data fetched from the database which of type companies array to type StateDto array.
          PaymentMethodEntity.forEach(PaymentMethodEntity => {
            const convertedPaymentMethodDto: PaymentMethodDTO = this.PaymentMethodAdapter.convertEntityToDto(
                PaymentMethodEntity
            );
            PaymentMethodDTO.push(convertedPaymentMethodDto);
          });
  
          //generated response

          const response = new AllPaymentMethodResponseModel(true,1,'Payment method retrieved successfully',PaymentMethodDTO);
        //  if(req?.createdUser){
        // //   const newLogDto = new LogsDto(1,'view', 'PaymentMethod', 0, true, 'Payment mode retrieved successfully',req.createdUser,'','',)
        // //   let res = await this.logService.createLog(newLogDto);
        // //   console.log(res);
        //  }
          return response;
        } else {
          throw new PaymentMethodResponseModel(false,99998, 'Data not found');
        }
        // return response;
      } catch (err) {
        return err;
      }
    }  

    async getAllActivePaymentMethods(): Promise<AllPaymentMethodResponseModel> {
      // const page: number = 1;
      // const response = new AllPaymentResponseModel();
      try {
        const PaymentMethodDTO: PaymentMethodDTO[] = [];
        //retrieves all companies
        const PaymentMethodEntity: PaymentMethod[] = await this.PaymentMethodRepository.find({where:{"isActive":true},order :{'paymentMethod':'ASC'}});
        //console.log(statesEntities);
        
        if (PaymentMethodEntity) {
          // converts the data fetched from the database which of type companies array to type StateDto array.
          PaymentMethodEntity.forEach(PaymentMethodEntity => {
            const convertedPaymentMethodDto: PaymentMethodDTO = this.PaymentMethodAdapter.convertEntityToDto(
                PaymentMethodEntity
            );
            PaymentMethodDTO.push(convertedPaymentMethodDto);
          });
  
          //generated response

          const response = new AllPaymentMethodResponseModel(true,1,'Payment mode retrieved successfully',PaymentMethodDTO);
          return response;
        } else {
          throw new PaymentMethodResponseModel(false,99998, 'Data not found');
        }
        // return response;
      } catch (err) {
        return err;
      }
    }  


    async activateOrDeactivatePaymentMethod(paymentreq: PaymentMethodRequest): Promise<PaymentMethodResponseModel> {
      try {
          const paymentExists = await this.getPaymentMethodById(paymentreq.paymentMethodId);
          if (paymentExists) {
              if (paymentreq.versionFlag !== paymentExists.versionFlag) {
                  throw new PaymentMethodResponseModel(false,10113, 'Someone updated the current PaymentMethod information.Refresh and try again');
              } else {
                  
                      const PaymentStatus =  await this.PaymentMethodRepository.update(
                          { paymentMethodId: paymentreq.paymentMethodId },
                          { isActive: paymentreq.isActive,updatedUser: paymentreq.updatedUser });
                     
                      if (paymentExists.isActive) {
                          if (PaymentStatus.affected) {
                              const paymentResponse: PaymentMethodResponseModel = new PaymentMethodResponseModel(true, 10115, 'PaymentMethod is de-activated successfully');
                              return paymentResponse;
                          } else {
                              throw new PaymentMethodResponseModel(false,10111, 'PaymentMethod is already deactivated');
                          }
                      } else {
                          if (PaymentStatus.affected) {
                              const paymentResponse: PaymentMethodResponseModel = new PaymentMethodResponseModel(true, 10114, 'PaymentMethod is activated successfully');
                              return paymentResponse;
                          } else {
                              throw new PaymentMethodResponseModel(false,10112, 'PaymentMethod is already  activated');
                          }
                      }
                  // }
              }
          } else {
              throw new PaymentMethodResponseModel(false,99998, 'No Records Found');
          }
      } catch (err) {
          return err;
      }
  }

  async getActivePaymentMethodById(paymentreq: PaymentMethodRequest): Promise<PaymentMethodResponseModel> {
    try {
        //retrieves all companies
        const paymentmethodEntities: PaymentMethod = await this.PaymentMethodRepository.findOne({
          where:{paymentMethodId:paymentreq.paymentMethodId}
          });
          
          const paymentmethods: PaymentMethodDTO = this.PaymentMethodAdapter.convertEntityToDto(paymentmethodEntities);
          if (paymentmethods) {
              const response = new PaymentMethodResponseModel(true, 11101 , 'Payment Method retrived Successfully',[paymentmethods]);
              return response;
          }
          else{
              throw new PaymentMethodResponseModel(false,11106,'Something went wrong');
          }
          // generating resposnse
    } catch (err) {
        return err;
    }
}
async getPaymentMethodById(paymentMethodId: number): Promise<PaymentMethod> {
  //  console.log(employeeId);
      const Response = await this.PaymentMethodRepository.findOne({
      where: {paymentMethodId: paymentMethodId},
      });
      // console.log(employeeResponse);
      if (Response) {
      return Response;
      } else {
      return null;
      }
  }
}


