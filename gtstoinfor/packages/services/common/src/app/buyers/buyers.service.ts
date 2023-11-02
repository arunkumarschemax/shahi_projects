import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { Buyers } from './buyers.entity';
import { BuyersRequest } from './dto/buyers.request';
import { BuyersAdapter } from './dto/buyers.adapter';
import { BuyersDTO } from './dto/buyers.dto';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { AllBuyersResponseModel, BuyerIdReq, BuyersDto, BuyersResponseModel, CommonResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { Address } from './address.entity';
import { BuyerRepository } from './buyers.repository';
import { AddressDto } from 'packages/libs/shared-models/src/common/buyers/address-dto';

@Injectable()
export class BuyersService {
    constructor(
        // @InjectRepository(Buyers)
        // private buyersRepository: Repository<Buyers>,
        private buyersAdapter: BuyersAdapter,
        @InjectRepository(Address)
        private addressRepo: Repository<Address>,
        private buyersRepository : BuyerRepository
    ) { }
    /**
     * create or update Buyer
     * @param buyersDTO 
     * @param isUpdate 
     * @param request 
     */
    async createBuyer(buyersDTO: BuyersDTO, isUpdate: boolean): Promise<BuyersResponseModel> {
        try {
            // to check whether Customer exists with the passed  Customer  or not. if isUpdate is false, a check will be done whether a record with the passed Customer is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed Customer  then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          let previousValue
            if (!isUpdate) {
                const BuyerEntity = await this.getBuyerDetailsWithoutRelations(buyersDTO.buyerCode);
                if (BuyerEntity !== null) {
                    return new BuyersResponseModel(false,11104, 'Buyer already exists');
                }
            
                // var notificationStatus='Created';
            }else{
                const buyerPrevious = await this.buyersRepository.findOne({where:{buyerId:buyersDTO.buyerId}})
                previousValue = buyerPrevious.buyerName
            }
            const convertedBuyerEntity: Buyers = this.buyersAdapter.convertDtoToEntity(buyersDTO, isUpdate);
            const savedBuyerEntity: Buyers = await this.buyersRepository.save(
                convertedBuyerEntity
            );
            const savedBuyerDto: BuyersDTO = this.buyersAdapter.convertEntityToDto(savedBuyerEntity);
            if (savedBuyerDto) {
                const certificatePresent = savedBuyerDto.buyerName;
                // generating resposnse
                const response = new BuyersResponseModel(true, isUpdate ? 11101 : 11100, isUpdate ? 'Buyer Updated Successfully' : 'Buyer Created Successfully', savedBuyerDto);
                const name=isUpdate?'updated':'created'
                const displayValue = isUpdate? 'Buyer Updated Successfully': 'Buyer Created Successfully'
            const userName = isUpdate? savedBuyerDto.updatedUser :savedBuyerDto.createdUser;
            // const newLogDto = new LogsDto(1,name, 'Customers', savedCustomerDto.buyerId, true, displayValue,userName,previousValue,certificatePresent)
            // let res = await this.logService.createLog(newLogDto);
            
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
     * @param buyerCode 
     */
    // @LogActions({isAsync: true})
    async getBuyerDetailsWithoutRelations(buyerCode: string): Promise<Buyers> {
        // tslint:disable-next-line: typedef
        const BuyersResponse = await this.buyersRepository.findOne({
            where: { buyerCode: Raw(alias => `buyer_code = '${buyerCode}'`) },
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
            const buyersEntities: Buyers[] = await this.buyersRepository.find({ order: { 'buyerName': 'ASC' },relations:['paymentTermsInfo','paymentMethodInfo','adressInfo']});
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
                // }
             
                return response;
            } else {
                throw new ErrorResponse(99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }
    // async getAllActiveBuyers(): Promise<AllBuyersResponseModel> {
    //     // const page: number = 1;
    //     try {
    //         const buyersDTO: BuyersDTO[] = [];
    //         //retrieves all companies
    //         const buyersEntities: Buyers[] = await this.buyersRepository.find({ order: { 'buyerName': 'ASC' },
    //           where:{isActive:true},
    //      });

    //         if (buyersEntities) {
    //             // converts the data fetched from the database which of type companies array to type StateDto array.
    //             buyersEntities.forEach(buyerEntity => {
    //                 const convertedbuyersDto: BuyersDTO = this.buyersAdapter.convertEntityToDto(
    //                     buyerEntity
    //                 );
    //                 buyersDTO.push(convertedbuyersDto);
    //             });
    //             const response = new AllBuyersResponseModel(true, 11108, "Buyers retrieved successfully", buyersDTO);
    //             return response;
    //         } else {
    //             throw new ErrorResponse(99998, 'Data not found'); 
    //         }
    //     } catch (err) {
    //         return err;
    //     }
    // }
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

          const buyersDTO: BuyersDTO[] = [];
          //retrieves all companies
          const buyersEntities: Buyers = await this.buyersRepository.findOne({
              relations:["cusAddressInfo"],
            where:{buyerId:buyerRequest.buyerId}
            });
            const buyersData: BuyersDTO = this.buyersAdapter.convertEntityToDto(buyersEntities);
            if (buyersData) {
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

    async getAddressByBuyerId(req:BuyerIdReq):Promise<CommonResponseModel>{
        try{
            const addressInfo = await this.addressRepo.find({where:{buyerInfo:{buyerId:req.buyerId}},relations:['countryInfo']})
            if(addressInfo){
                return new CommonResponseModel(true,1,'Data retrieved',addressInfo)
            } else{
                return new CommonResponseModel(true,1,'No data found',[])
            }
        }catch(err){
            throw err
        }
    }

    async getAllBuyersInfo(): Promise<CommonResponseModel>{
        try{
            const buyerInfo = await this.buyersRepository.getBuyerInfo()
            const buyerMap = new Map<number,BuyersDto>()
            if(buyerInfo.length == 0){
                return new CommonResponseModel(false,1,'No buyers found',[])
            } else {
                for(const rec of buyerInfo){
                    if(!buyerMap.has(rec.buyer_id)){
                        buyerMap.set(rec.buyer_id,new BuyersDto(rec.buyer_id,rec.buyer_code,rec.buyer_name,rec.gst_number,rec.contact_person,rec.phone_no,rec.email,rec.currency_name,rec.public_note,rec.private_note,rec.payment_terms,null,rec.payment_method_id,rec.is_active,null,null,rec.version_flag,rec.payment_terms_id,rec.payment_method,[],rec.fg_item_code_length,rec.rm_item_code_length,rec.external_ref_number))
                    }
                    buyerMap.get(rec.buyer_id).addressInfo.push(new AddressDto(rec.address_id,rec.country_id,rec.state,rec.district,rec.city,rec.landmark,rec.lane1,rec.lane2,rec.pincode,null,null,null,null,rec.country_name))
                }
                const buyerModel: BuyersDto[] = [];
                buyerMap.forEach((buyer => buyerModel.push(buyer)))
                return new CommonResponseModel(true,1,'Data retrieved',buyerModel)
            }

        } catch(err){
            throw err
        }
    }

    // async getVbsBranchByVendorId(vendorIdReq: VendorIdRequest): Promise<VendorBranchResponse> {
    //     try {
    //         const records = await this.vbsBranchRepo.getBranchDetailsbyVendorId(vendorIdReq.vendorId);
    //         const vendorBranchResponseMap = new Map<number, VendorBranchModel>();
    //         if (records.length == 0) {
    //             return new VendorBranchResponse(false, 1, 'No branches found', [])
    //         } else {
    //             for (const record of records) {
    //                 if (!vendorBranchResponseMap.has(record.id)) {
    //                     vendorBranchResponseMap.set(record.id, new VendorBranchModel(record.vbs_id, record.name, record.address, record.contact, record.email, record.country, record.state, record.district,record.city, record.area, record.latitude, record.longitude, record.zipcode, record.username, [],record.id,record.vehiclesCount));

    //                 }
    //                 vendorBranchResponseMap.get(record.id).vbsBranchAttributes.push(new VbsBranchAttributesModel(record.vbs_id, record.vbs_branch_id, record.attribute_name, record.attribute_value, record.vbsBranchAttributeId))
    //             }
    //             const vendorBranchModel: VendorBranchModel[] = [];
    //             vendorBranchResponseMap.forEach((branch => vendorBranchModel.push(branch)))

    //             return new VendorBranchResponse(true, 0, 'Branch details retrived successfully', vendorBranchModel)
    //         }
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    async getAllActiveBuyersInfo(): Promise<CommonResponseModel>{
        try{
            const buyerInfo = await this.buyersRepository.getBuyerInfo()
            const buyerMap = new Map<number,BuyersDto>()
            if(buyerInfo.length == 0){
                return new CommonResponseModel(false,1,'No buyers found',[])
            } else {
                for(const rec of buyerInfo){
                    if(!buyerMap.has(rec.id)){
                        buyerMap.set(rec.buyer_id,new BuyersDto(rec.buyer_id,rec.buyer_code,rec.buyer_name,rec.gst_number,rec.contact_person,rec.phone_no,rec.email,rec.currency_name,rec.public_note,rec.private_note,rec.payment_terms,null,rec.payment_method_id,rec.is_active,null,null,rec.version_flag,rec.payment_terms_id,rec.payment_method,[],rec.fg_item_code_length,rec.rm_item_code_length,rec.external_ref_number))
                    }
                    buyerMap.get(rec.buyer_id).addressInfo.push(new AddressDto(rec.address_id,rec.country_id,rec.state,rec.district,rec.city,rec.landmark,rec.lane1,rec.lane2,rec.pincode,null,null,null,null,rec.country_name))
                }
                const buyerModel: BuyersDto[] = [];
                buyerMap.forEach((buyer => buyerModel.push(buyer)))
                return new CommonResponseModel(true,1,'Data retrieved',buyerModel)
            }

        } catch(err){
            throw err
        }
    }

    async getAllAddress():Promise<CommonResponseModel>{
        try{
            const buyerAddress = await this.addressRepo.find({where:{isActive:true},relations:['countryInfo','buyerInfo']})
            if(buyerAddress){
                return new CommonResponseModel(true,1,'Data retrieved',buyerAddress)
            }  else{
                return new CommonResponseModel(false,1,'No buyers found',[])
            }

        }catch(err){
            throw err
        }
    }

}
