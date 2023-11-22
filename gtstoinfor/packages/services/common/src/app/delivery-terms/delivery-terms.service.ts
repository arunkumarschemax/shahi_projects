import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { DeliveryTerms } from './delivery-terms.entity';
import { DeliveryTermsAdapter } from './dto/delivery-terms.adapter';
import { DeliveryTermsDTO } from './dto/delivery-terms.dto';
import { DeliveryTermsRequest } from './dto/delivery-terms.request';
import { UserRequestDto } from './dto/user-logs-dto';
import { DeliveryTermsResponseModel, AllDeliveryTermsResponseModel, DeliveryTermsDropDownResponseModel, DeliveryTermsDropDownDto } from '@project-management-system/shared-models';
// import { UserRequestDto } from '../currencies/dto/user-logs-dto';
@Injectable()
export class DeliveryTermsService {
    constructor(
    //   private logService:LogsService,
        @InjectRepository(DeliveryTerms)
        private deliveryTermsRepository: Repository<DeliveryTerms>,
        private deliveryTermsAdapter: DeliveryTermsAdapter,
    ) { }
    /**
     * create/update deliveryTerms
     * @param deliveryTermsDTO 
     * @param isUpdate 
     * @param request 
     */
    async createDeliveryTerms(deliveryTermsDTO: DeliveryTermsDTO, isUpdate: boolean, request: Request): Promise<DeliveryTermsResponseModel> {
        // console.log(deliveryTermsDTO);
        try {
          let previousValue
            // to check whether DeliveryTerms exists with the passed  DeliveryTerms  or not. if isUpdate is false, a check will be done whether a record with the passed DeliveryTerms is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed DeliveryTerms  then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
            if (!isUpdate) {
                const DeliveryTermsEntity = await this.getDeliveryTermsDetailsWithoutRelations(deliveryTermsDTO.deliveryTermsName);
                if (DeliveryTermsEntity) {
                    throw new DeliveryTermsResponseModel(false,11104, 'Delivery Term already exists');
                }
                // var notificationStatus='Created';
            }
            else{
                const certificatePrevious = await this.deliveryTermsRepository.findOne({where:{deliveryTermsId:deliveryTermsDTO.deliveryTermsId}})
                previousValue = certificatePrevious.deliveryTermsName
                const DeliveryTermsEntity = await this.getDeliveryTermsDetailsWithoutRelations(deliveryTermsDTO.deliveryTermsName);
                if (DeliveryTermsEntity) {
                    if(DeliveryTermsEntity.deliveryTermsId!=deliveryTermsDTO.deliveryTermsId) {
                        throw new DeliveryTermsResponseModel(false,11104, 'Delivery Term already exists');      
                    }
                }
            }
            // else{
            // var notificationStatus='Updated';
            // }
            const convertedDeliveryTermsEntity: DeliveryTerms = this.deliveryTermsAdapter.convertDtoToEntity(deliveryTermsDTO, isUpdate);
            const savedDeliveryTermsEntity: DeliveryTerms = await this.deliveryTermsRepository.save(
                convertedDeliveryTermsEntity
            );
            const savedDeliveryTermsDto: DeliveryTermsDTO = this.deliveryTermsAdapter.convertEntityToDto(savedDeliveryTermsEntity);
            if (savedDeliveryTermsDto) {
            const presentValue = deliveryTermsDTO.deliveryTermsName;
                // generating resposnse
                const response = new DeliveryTermsResponseModel(true, isUpdate ? 11101 : 11100, isUpdate ? 'Delivery Term Updated Successfully' : 'DeliveryTerms Created Successfully', [savedDeliveryTermsDto]);
                const name=isUpdate?'updated':'created'
                const displayValue = isUpdate? 'Delivery Term Updated Successfully': 'Delivery Term Created Successfully'
            const userName = isUpdate? savedDeliveryTermsDto.updatedUser :savedDeliveryTermsDto.createdUser;
                // const newLogDto = new LogsDto(1,name, 'DeliveryTerms', savedDeliveryTermsDto.deliveryTermsId, true, displayValue,userName,previousValue,presentValue)
                // let res = await this.logService.createLog(newLogDto);
                // console.log(res);
                return response;
            } else {
                throw new DeliveryTermsResponseModel(false,11106, 'Delivery Term saved but issue while transforming into DTO');
            }
        } catch (error) {
            // when error occures while saving the data , the execution will come to catch block.
            // tslint:disable-next-line: typedef
            return error;
        }
    }
    /**
     * get deliveryTerms details
     * @param deliveryTermsName 
     */
    // @LogActions({isAsync: true})
    async getDeliveryTermsDetailsWithoutRelations(deliveryTermsName: string): Promise<DeliveryTerms> {
        // tslint:disable-next-line: typedef
        const DeliveryTermsResponse = await this.deliveryTermsRepository.findOne({
            where: { deliveryTermsName: Raw(alias => `delivery_terms_name = '${deliveryTermsName}'`) },
        });
        if (DeliveryTermsResponse) {
            return DeliveryTermsResponse;
        } else {
            return null;
        }
    }

    /**
    * gets all deliveryTerms details  
    * @returns all deliveryTerms details .
    */
    async getAllDeliveryTerms(): Promise<AllDeliveryTermsResponseModel> {
        // const page: number = 1;
        try {
            const deliveryTermsDTO: DeliveryTermsDTO[] = [];
            //retrieves all companies
            const deliveryTermsEntities: DeliveryTerms[] = await this.deliveryTermsRepository.find({ order: { 'deliveryTermsName': 'ASC' } });
            //console.log(deliveryTermsEntities);
            if (deliveryTermsEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                deliveryTermsEntities.forEach(deliveryTermsEntity => {
                    const convertedstatesDto: DeliveryTermsDTO = this.deliveryTermsAdapter.convertEntityToDto(
                        deliveryTermsEntity
                    );
                    deliveryTermsDTO.push(convertedstatesDto);
                });
                const response = new AllDeliveryTermsResponseModel(true, 11108, "Delivery Term retrieved successfully", deliveryTermsDTO);
                // if(req?.createdUser){
                //     const newLogDto = new LogsDto(1,'view', 'DeliveryTerms', 0, true, 'Delivery Term retrieved successfully',req.createdUser,"",'')
                //     let res = await this.logService.createLog(newLogDto);
                //     console.log(res);
                // }
               
                return response;
            } else {
                throw new DeliveryTermsResponseModel(false,99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }

    /**
     * It deactivates DeliveryTerms 
     * @returns true or false
     */
    // @LogActions({isAsync: true})
    async activateOrDeactivateDeliveryTerms(deliveryTermsReq: DeliveryTermsRequest): Promise<DeliveryTermsResponseModel> {
        try {
            const deliveryTermsExists = await this.getDeliveryTermsById(deliveryTermsReq.deliveryTermsId);
            if (deliveryTermsExists) {
                if (deliveryTermsReq.versionFlag !== deliveryTermsExists.versionFlag) {
                    throw new DeliveryTermsResponseModel(false,10113, 'Someone updated the current DeliveryTerms information.Refresh and try again');
                } else {

                    const deliveryTermsStatus = await this.deliveryTermsRepository.update(
                        { deliveryTermsId: deliveryTermsReq.deliveryTermsId },
                        { isActive: deliveryTermsReq.isActive, updatedUser: deliveryTermsReq.updatedUser });

                    if (deliveryTermsExists.isActive) {
                        if (deliveryTermsStatus.affected) {
                            const deliveryTermsResponse: DeliveryTermsResponseModel = new DeliveryTermsResponseModel(true, 10115, 'Delivery Term is Deactivated successfully');
                            return deliveryTermsResponse;
                        } else {
                            throw new DeliveryTermsResponseModel(false,10111, 'Delivery Term is already deactivated');
                        }
                    } else {
                        if (deliveryTermsStatus.affected) {
                            const deliveryTermsResponse: DeliveryTermsResponseModel = new DeliveryTermsResponseModel(true, 10114, 'Delivery Term is activated successfully');
                            return deliveryTermsResponse;
                        } else {
                            throw new DeliveryTermsResponseModel(false,10112, 'Delivery Term is already activated');
                        }
                    }
                    // }
                }
            } else {
                throw new DeliveryTermsResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }
    async getActiveDeliveryTermsById(deliveryTermsReq: DeliveryTermsRequest): Promise<DeliveryTermsResponseModel> {
        try {
            //retrieves all companies
            const deliveryTermsEntities: DeliveryTerms = await this.deliveryTermsRepository.findOne({
                where:{deliveryTermsId:deliveryTermsReq.deliveryTermsId}
                });
                
                const deliveryTermsData: DeliveryTermsDTO = this.deliveryTermsAdapter.convertEntityToDto(deliveryTermsEntities);
                if (deliveryTermsData) {
                    const response = new DeliveryTermsResponseModel(true, 11101 , 'Delivery Terms retrived Successfully',[deliveryTermsData]);
                    return response;
                }
                else{
                    throw new DeliveryTermsResponseModel(false,11106,'Something went wrong');
                }
                // generating resposnse
        } catch (err) {
            return err;
        }
    }
    async getAllActiveDeliveryTerms(): Promise<AllDeliveryTermsResponseModel> {
        // const page: number = 1;
        try {
            const deliveryTermsDTO: DeliveryTermsDTO[] = [];
            //retrieves all companies
            const DeliveryTermsEntities: DeliveryTerms[] = await this.deliveryTermsRepository.find({ order: { 'deliveryTermsName': 'ASC' },where:{isActive:true},
           });
         console.log(DeliveryTermsEntities)
            if (DeliveryTermsEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                DeliveryTermsEntities.forEach(deliveryTermsEntity => {
                    const converteddeliveryTermsDTO: DeliveryTermsDTO = this.deliveryTermsAdapter.convertEntityToDto(
                      deliveryTermsEntity
                    );
                    deliveryTermsDTO.push(converteddeliveryTermsDTO);
                });
                const response = new AllDeliveryTermsResponseModel(true, 11108, "Delivery Terms retrieved successfully", deliveryTermsDTO);
                return response;
            } else {
                throw new DeliveryTermsResponseModel(false,99998, 'Data not found'); deliveryTermsDTO
            }
        } catch (err) {
            throw err;
        }
    }





    /**
     * get deliveryTerms while passing id
     * @param deliveryTermsId 
     */
    async getDeliveryTermsById(deliveryTermsId: number): Promise<DeliveryTerms> {
        const Response = await this.deliveryTermsRepository.findOne({
            where: { deliveryTermsId: deliveryTermsId },
        });
        if (Response) {
            return Response;
        } else {
            return null;
        }
    }

    /**
     * gets all deliveryTerms details  
     * @returns all deliveryTerms details .
     */
    async getAllDeliveryTermsDropDown(): Promise<DeliveryTermsDropDownResponseModel> {
        try {
            const deliveryTermsDTO: DeliveryTermsDropDownDto[] = [];
            const deliveryTermsEntities: DeliveryTerms[] = await this.deliveryTermsRepository.find({ select: ['deliveryTermsId', 'deliveryTermsName'], where: { isActive: true }, order: { 'deliveryTermsName': 'ASC' } });
            if (deliveryTermsEntities && deliveryTermsEntities.length > 0) {
                deliveryTermsEntities.forEach(deliveryTermsEntity => {
                    deliveryTermsDTO.push(new DeliveryTermsDropDownDto(deliveryTermsEntity.deliveryTermsId, deliveryTermsEntity.deliveryTermsName));
                });
                const response = new DeliveryTermsDropDownResponseModel(true, 11108, "Delivery Terms retrieved successfully", deliveryTermsDTO);
                return response;
            } else {
                throw new DeliveryTermsResponseModel(false,99998, 'Data not found');
            }
        } catch (err) {
            throw err;
        }
    }

}

