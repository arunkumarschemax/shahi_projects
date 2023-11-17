import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { PaymentTerms } from './payment-terms.entity';
import { PaymentTermsDTO } from './dto/payment-terms.dto';
import { PaymentTermsResponseModel, AllPaymentTermsResponseModel, PaymentTermsDropDownResponseModel, PaymentTermsDropDownDto, PaymentTermsCategory } from '@project-management-system/shared-models' ;
import { PaymentTermsRequest } from './dto/payment-terms.request';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { PaymentTermsAdapter } from './dto/payment-terms.adapter';

@Injectable()
export class PaymentTermsService {
    constructor(

        @InjectRepository(PaymentTerms)
        private paymentTermsRepository: Repository<PaymentTerms>,
        private paymentTermsAdapter: PaymentTermsAdapter,
      ) {}
    /**
     * create/update paymentTerms
     * @param paymentTermsDTO 
     * @param isUpdate 
     * @param request 
     */
    async createPaymentTerms(paymentTermsDTO: any, isUpdate: boolean): Promise<PaymentTermsResponseModel> {
        console.log(paymentTermsDTO,"dto88880")
        try {
          let previousValue
            // to check whether PaymentTerms exists with the passed  PaymentTerms  or not. if isUpdate is false, a check will be done whether a record with the passed PaymentTerms is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed PaymentTerms  then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
            if (!isUpdate) {
            const PaymentTermsEntity = await this.getPaymentTermsDetailsWithoutRelations(paymentTermsDTO.paymentTermsName);
            if (PaymentTermsEntity) {
                throw new PaymentTermsResponseModel(false,11104, 'PaymentTerms already exists');         
            } 
            // var notificationStatus='Created';
            }
            else{
                const certificatePrevious = await this.paymentTermsRepository.findOne({where:{paymentTermsId:paymentTermsDTO.paymentTermsId}})
                previousValue =(certificatePrevious.paymentTermsCategory+","+certificatePrevious.paymentTermsName)
                const PaymentTermsEntity = await this.getPaymentTermsDetailsWithoutRelations(paymentTermsDTO.paymentTermsName);
                if (PaymentTermsEntity) {
                    if(PaymentTermsEntity.paymentTermsId != paymentTermsDTO.paymentTermsId ){
                        throw new PaymentTermsResponseModel(false,11104, 'PaymentTerms already exists');
                    }         
                } 
              }
            // else{
            // var notificationStatus='Updated';
            // }
            const convertedPaymentTermsEntity: PaymentTerms = this.paymentTermsAdapter.convertDtoToEntity(paymentTermsDTO,isUpdate);
            const savedPaymentTermsEntity: PaymentTerms = await this.paymentTermsRepository.save(
            convertedPaymentTermsEntity
            );
            const savedPaymentTermsDto: PaymentTermsDTO = this.paymentTermsAdapter.convertEntityToDto(savedPaymentTermsEntity);
            if (savedPaymentTermsDto) {
                const presentValue = savedPaymentTermsDto.paymentTermsCategory+","+savedPaymentTermsDto.paymentTermsName;
            // generating resposnse
            const response = new PaymentTermsResponseModel(true,isUpdate ? 11101 : 11100,isUpdate? 'PaymentTerm Updated Successfully': 'PaymentTerm Created Successfully',savedPaymentTermsDto);
            const name=isUpdate?'updated':'created'
            const displayValue = isUpdate? 'PaymentTerm Updated Successfully': 'PaymentTerm Created Successfully'
            const userName = isUpdate? savedPaymentTermsDto.updatedUser :savedPaymentTermsDto.createdUser;
            return response;
            } else {
            throw new PaymentTermsResponseModel(false,11106,'PaymentTerm saved but issue while transforming into DTO');
            }
        } catch (error) {
            // when error occures while saving the data , the execution will come to catch block.
            // tslint:disable-next-line: typedef
            return error;
        }
    }
    /**
     * get paymentTerms details
     * @param paymentTermsName 
     */
    // @LogActions({isAsync: true})
    async getPaymentTermsDetailsWithoutRelations(paymentTermsName: string): Promise<PaymentTerms> {
        // tslint:disable-next-line: typedef
        const PaymentTermsResponse = await this.paymentTermsRepository.findOne({
        where: {paymentTermsId: Raw(alias => `payment_terms_name = '${paymentTermsName}'`)},
        });
        if (PaymentTermsResponse) {
        return PaymentTermsResponse;
        } else {
        return null;
        }
    }

     /**
     * gets all paymentTerms details  
     * @returns all paymentTerms details .
     */
    async getAllPaymentTerms(req?:UserRequestDto): Promise<AllPaymentTermsResponseModel> {
        // const page: number = 1;
        try {
          const paymentTermsDTO: PaymentTermsDTO[] = [];
          //retrieves all companies
          const paymentTermsEntities: PaymentTerms[] = await this.paymentTermsRepository.find({order :{paymentTermsName:'ASC'}});
          //console.log(paymentTermsEntities);
          if (paymentTermsEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            paymentTermsEntities.forEach(paymentTermsEntity => {
              const convertedstatesDto: PaymentTermsDTO = this.paymentTermsAdapter.convertEntityToDto(
                paymentTermsEntity
              );
              paymentTermsDTO.push(convertedstatesDto);
            });
            const response = new AllPaymentTermsResponseModel(true,11108,"PaymentTerms retrieved Successfully",paymentTermsDTO);
           
            
            return response;
          } else {
            throw new PaymentTermsResponseModel(false,99998, 'Data not found');
          }
        } catch (err) {
          throw err;PaymentTerms
        }
      }
      async getAllActivePaymentTerms(): Promise<AllPaymentTermsResponseModel> {
        // const page: number = 1;
        try {
            const paymentTermsDTO: PaymentTermsDTO[] = [];
            //retrieves all companies
            const PaymentTermsEntities: PaymentTerms[] = await this.paymentTermsRepository.find({ order: {paymentTermsName: 'ASC' },where:{isActive:true},
           });
         console.log(PaymentTermsEntities)
            if (PaymentTermsEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                PaymentTermsEntities.forEach(paymentTermsEntity => {
                    const convertedpaymentTermsDTO: PaymentTermsDTO = this.paymentTermsAdapter.convertEntityToDto(
                      paymentTermsEntity
                    );
                    paymentTermsDTO.push(convertedpaymentTermsDTO);
                });
                const response = new AllPaymentTermsResponseModel(true, 11108, "PaymentTerms retrieved Successfully", paymentTermsDTO);
                return response;
            } else {
                throw new PaymentTermsResponseModel(false,99998, 'Data not found'); paymentTermsDTO
            }
        } catch (err) {
            throw err;
        }
    }
    /**
     * It deactivates PaymentTerms 
     * @returns true or false
     */
    // @LogActions({isAsync: true})
    async activateOrDeactivatePaymentTerms(paymentTermsReq: any): Promise<PaymentTermsResponseModel> {

        console.log(paymentTermsReq,"activate")
      try {
          const paymentTermsExists = await this.getPaymentTermsById(paymentTermsReq.paymentTermsId);
          if (paymentTermsExists) {
              if (paymentTermsReq.versionFlag !== paymentTermsExists.versionFlag) {
                  throw new PaymentTermsResponseModel(false,10113, 'Someone updated the current PaymentTerms information.Refresh and try again');
              } else {
                  
                      const paymentTermsStatus =  await this.paymentTermsRepository.update(
                          { paymentTermsId: paymentTermsReq.paymentTermsId },
                          { isActive: paymentTermsReq.isActive,updatedUser: paymentTermsReq.updatedUser });
                      console.log(paymentTermsStatus,"pay////////")
                      if (paymentTermsExists.isActive) {
                          if (paymentTermsStatus.affected) {
                              const paymentTermsResponse: PaymentTermsResponseModel = new PaymentTermsResponseModel(true, 10115, 'PaymentTerm is Deactivated Successfully');
                              return paymentTermsResponse;
                          } else {
                              throw new PaymentTermsResponseModel(false,10111, 'PaymentTerm is already Deactivated');
                          }
                      } else {
                          if (paymentTermsStatus.affected) {
                              const paymentTermsResponse: PaymentTermsResponseModel = new PaymentTermsResponseModel(true, 10114, 'PaymentTerm is Activated Successfully');
                              return paymentTermsResponse;
                          } else {
                              throw new PaymentTermsResponseModel(false,10112, 'PaymentTerm is already Activated');
                          }
                      }
                  // }
              }
          } else {
              throw new PaymentTermsResponseModel(false,99998, 'No Records Found');
          }
      } catch (err) {
          throw err;
      }
  }
    async getPaymentById(paymentTermsReq: PaymentTermsRequest): Promise<PaymentTermsResponseModel> {
        try {
            //retrieves all companies
            const paymentTermsEntities: PaymentTerms = await this.paymentTermsRepository.findOne({
              where:{paymentTermsId:paymentTermsReq.paymentTermsId}
              });
              
              const paymentTermsData: PaymentTermsDTO = this.paymentTermsAdapter.convertEntityToDto(paymentTermsEntities);
              if (paymentTermsData) {
                  const response = new PaymentTermsResponseModel(true, 11101 , 'Payment Terms retrived Successfully',paymentTermsData);
                  return response;
              }
              else{
                  throw new PaymentTermsResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
         } catch (err) {
            throw err;
        }
  }
  /**
   * get paymentTerms while passing id
   * @param paymentTermsId 
   */
  async getPaymentTermsById(paymentTermsId: number): Promise<PaymentTerms> {
        const Response = await this.paymentTermsRepository.findOne({
        where: {paymentTermsId: paymentTermsId},
        });
        if (Response) {
        return Response;
        } else {
        return null;
        }
    }

    async getAllPaymentTermsDropDown(): Promise<PaymentTermsDropDownResponseModel> {
        try {
            const paymentTermsDTO: PaymentTermsDropDownDto[] = [];
            const paymentTermsEntities: PaymentTerms[] = await this.paymentTermsRepository.find({ select: ['paymentTermsId', 'paymentTermsName'], where: { isActive: true,paymentTermsCategory:PaymentTermsCategory.Vendor }, order: {paymentTermsName: 'ASC' } });
            if (paymentTermsEntities && paymentTermsEntities.length > 0) {
                paymentTermsEntities.forEach(paymentTermsEntity => {
                    paymentTermsDTO.push(new PaymentTermsDropDownDto(paymentTermsEntity.paymentTermsId, paymentTermsEntity.paymentTermsName));
                });
                const response = new PaymentTermsDropDownResponseModel(true, 11108, "PaymentTerms retrieved Successfully", paymentTermsDTO);
                return response;
            } else {
                throw new PaymentTermsResponseModel(false,99998, 'Data not found');
            }
        } catch (err) {
            throw err;
        }
    }


    async getAllVendorPaymentTermsDropDown(): Promise<PaymentTermsDropDownResponseModel> {
        try {
            const paymentTermsDTO: PaymentTermsDropDownDto[] = [];
            const paymentTermsEntities: PaymentTerms[] = await this.paymentTermsRepository.find({ select: ['paymentTermsId', 'paymentTermsName'], where: { isActive: true,paymentTermsCategory:PaymentTermsCategory.Vendor }, order: {paymentTermsName: 'ASC' } });
            if (paymentTermsEntities && paymentTermsEntities.length > 0) {
                paymentTermsEntities.forEach(paymentTermsEntity => {
                    paymentTermsDTO.push(new PaymentTermsDropDownDto(paymentTermsEntity.paymentTermsId, paymentTermsEntity.paymentTermsName));
                });
                const response = new PaymentTermsDropDownResponseModel(true, 11108, "PaymentTerms retrieved Successfully", paymentTermsDTO);
                return response;
            } else {
                throw new PaymentTermsResponseModel(false,99998, 'Data not found');
            }
        } catch (err) {
            throw err;
        }
    }

      
}


