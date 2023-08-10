import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Buyers } from './buyers.entity';
import { BuyersRequest } from './dto/buyers.request';
import { BuyersAdapter } from './dto/buyers.adapter';
import { BuyersDTO } from './dto/buyers.dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { AllBuyersResponseModel, BuyersResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';

@Injectable()
export class BuyersService {
    constructor(
        @InjectRepository(Buyers)
        private buyersRepository: Repository<Buyers>,
        private buyersAdapter: BuyersAdapter,
    ) { }
    /**
     * create or update Buyer
     * @param buyersDTO 
     * @param isUpdate 
     * @param request 
     */
    async createBuyer(buyersDTO: BuyersDTO, isUpdate: boolean): Promise<BuyersResponseModel> {
        console.log(buyersDTO,'---------------')
        try {
            // to check whether Customer exists with the passed  Customer  or not. if isUpdate is false, a check will be done whether a record with the passed Customer is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed Customer  then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          let previousValue
            console.log(isUpdate);
            if (!isUpdate) {
                const BuyerEntity = await this.getBuyerDetailsWithoutRelations(buyersDTO.clientCode);
                if (BuyerEntity !== null) {
                    return new BuyersResponseModel(false,11104, 'Buyer already exists');
                }
            
                // var notificationStatus='Created';
            }else{
                const buyerPrevious = await this.buyersRepository.findOne({where:{buyerId:buyersDTO.buyerId}})
                previousValue = buyerPrevious.clientName
            }
            const convertedBuyerEntity: Buyers = this.buyersAdapter.convertDtoToEntity(buyersDTO, isUpdate);
            const savedBuyerEntity: Buyers = await this.buyersRepository.save(
                convertedBuyerEntity
            );
            const savedBuyerDto: BuyersDTO = this.buyersAdapter.convertEntityToDto(savedBuyerEntity);
            if (savedBuyerDto) {
                const certificatePresent = savedBuyerDto.clientName;
                // generating resposnse
                const response = new BuyersResponseModel(true, isUpdate ? 11101 : 11100, isUpdate ? 'Customer Updated Successfully' : 'Customer Created Successfully', savedBuyerDto);
                const name=isUpdate?'updated':'created'
                const displayValue = isUpdate? 'Customer Updated Successfully': 'Customer Created Successfully'
            const userName = isUpdate? savedBuyerDto.updatedUser :savedBuyerDto.createdUser;
            // const newLogDto = new LogsDto(1,name, 'Customers', savedCustomerDto.buyerId, true, displayValue,userName,previousValue,certificatePresent)
            // let res = await this.logService.createLog(newLogDto);
            // console.log(res);
            
                return response;
            } else {
                throw new ErrorResponse(11106, 'Buyer saved but issue while transforming into DTO');
            }
        } catch (error) {
            // when error occures while saving the data , the execution will come to catch block.
            // tslint:disable-next-line: typedef
            return error;
        }
    }
    /**
     * get buyer by id
     * @param clientCode 
     */
    // @LogActions({isAsync: true})
    async getBuyerDetailsWithoutRelations(clientCode: string): Promise<Buyers> {
        // tslint:disable-next-line: typedef
        const BuyersResponse = await this.buyersRepository.findOne({
            where: { clientCode: Raw(alias => `client_code = '${clientCode}'`) },
        });
        if (BuyersResponse) {
            return BuyersResponse;
        } else {
            return null;
        }
    }
    /**
     * get All Customers Details
     */
    async getAllBuyers(): Promise<AllBuyersResponseModel> {
        try {
            const buyersDTO: BuyersDTO[] = [];
            const buyersEntities: Buyers[] = await this.buyersRepository.find({ order: { 'clientName': 'ASC' },relations:['countryInfo','paymentTermsInfo','paymentMethodInfo']});
            if (buyersEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                buyersEntities.forEach(buyerEntity => {
                    const convertedbuyersDto: BuyersDTO = this.buyersAdapter.convertEntityToDto(
                        buyerEntity
                    );
                    buyersDTO.push(convertedbuyersDto);
                });
                const response = new AllBuyersResponseModel(true, 11108, "Buyers retrieved successfully", buyersDTO);
                // if(req?.createdUser){
                //     const newLogDto = new LogsDto(1,'view', 'Customers', 0, true, 'Customers retrieved successfully',req.createdUser,'','')
                //     let res = await this.logService.createLog(newLogDto);
                //     console.log(res);
                // }
             
                return response;
            } else {
                throw new ErrorResponse(99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }
    async getAllActiveBuyers(): Promise<AllBuyersResponseModel> {
        // const page: number = 1;
        try {
            const buyersDTO: BuyersDTO[] = [];
            //retrieves all companies
            const buyersEntities: Buyers[] = await this.buyersRepository.find({ order: { 'clientName': 'ASC' },
            relations: [
                "cusAddressInfo",
              ],
              where:{isActive:true},
         });
         console.log(buyersEntities)
            if (buyersEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                buyersEntities.forEach(buyerEntity => {
                    const convertedbuyersDto: BuyersDTO = this.buyersAdapter.convertEntityToDto(
                        buyerEntity
                    );
                    buyersDTO.push(convertedbuyersDto);
                });
                const response = new AllBuyersResponseModel(true, 11108, "Buyers retrieved successfully", buyersDTO);
                return response;
            } else {
                throw new ErrorResponse(99998, 'Data not found'); 
            }
        } catch (err) {
            return err;
        }
    }
    /**
     * Activate or Deactivate Customer
     * @param buyerReq 
     */
    async activateOrDeactivateBuyer(buyerReq: BuyersRequest): Promise<BuyersResponseModel> {
        try {
            const buyerExists = await this.getBuyerById(buyerReq.buyerId);
            if (buyerExists) {
                if (buyerReq.versionFlag !== buyerExists.versionFlag) {
                    throw new ErrorResponse(10113, 'Someone updated the current buyer information.Refresh and try again');
                } else {

                    const buyerStatus = await this.buyersRepository.update(
                        { buyerId: buyerReq.buyerId },
                        { isActive: buyerReq.isActive, updatedUser: buyerReq.updatedUser });

                    if (buyerExists.isActive) {
                        if (buyerStatus.affected) {
                            const buyerResponse: BuyersResponseModel = new BuyersResponseModel(true, 10115, 'Buyer is de-activated successfully');
                            return buyerResponse;
                        } else {
                            throw new ErrorResponse(10111, 'Buyer is already deactivated');
                        }
                    } else {
                        if (buyerStatus.affected) {
                            const buyerResponse: BuyersResponseModel = new BuyersResponseModel(true, 10114, 'Buyer is activated successfully');
                            return buyerResponse;
                        } else {
                            throw new ErrorResponse(10112, 'Buyer is already activated');
                        }
                    }
                    // }
                }
            } else {
                throw new ErrorResponse(99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
    /**
     * get Buyer while passing id
     * @param buyerId 
     */
    async getBuyerById(buyerId: number): Promise<Buyers> {
          const Response = await this.buyersRepository.findOne({
          where: {buyerId: buyerId},
          });
          if (Response) {
          return Response;
          } else {
          return null;
          }
      }

      async getBuyerDataById(@Body() buyerRequest:BuyersRequest): Promise<BuyersResponseModel> {
        // const page: number = 1;
        try {
//   console.log('hhhhhhhhhhhhhhhhhh Controller '+BuyerRequest.buyerId);  

          const buyersDTO: BuyersDTO[] = [];
          //retrieves all companies
          const buyersEntities: Buyers = await this.buyersRepository.findOne({
              relations:["cusAddressInfo"],
            where:{buyerId:buyerRequest.buyerId}
            });
            const buyersData: BuyersDTO = this.buyersAdapter.convertEntityToDto(buyersEntities);
            if (buyersData) {
            console.log(buyersData);

                const response = new BuyersResponseModel(true, 11101 , 'Buyer retrived Successfully',buyersData);
                return response;
            }
            else{
                throw new ErrorResponse(11106,'Something went wrong');
            }
            // generating resposnse
            
        } catch (err) {
            return err;
        }
      }
}
