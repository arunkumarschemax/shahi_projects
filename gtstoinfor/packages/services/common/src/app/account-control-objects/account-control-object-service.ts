import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { AccountControlObjectRequest } from './dto/account-control-object-request';
import { AccountControlObjectAdapter } from './dto/account-control-object-adapter';
import { AccountControlObjectDto } from './dto/account-control-object-dto';
import { ProfitControlHeadRequest } from '../profit-control-head/dto/profit-control-head-request';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { AccountControlObject } from './account-control-objects-entity';
import { AccountControlObjectResponse,AllAccountControlObjectResponse,AccountControlObjectDropDownDto,AccountControlObjectResponseModel } from '@project-management-system/shared-models';
import { AccountControlObjectDropDownResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '@project-management-system/shared-services';
@Injectable()
export class AccountControlObjectService {
    constructor(
        @InjectRepository(AccountControlObject) private accountControlObjectRepository: Repository<AccountControlObject>,
        private accountControlObjectAdapter: AccountControlObjectAdapter,
    ) { }

    
    async getAccountsWithoutRelations(accountControlObjectsName: string): Promise<AccountControlObject> {
        //  console.log(employeeId);
        const response = await this.accountControlObjectRepository.findOne({
            where: { accountControlObjectsId: Raw(alias => `account_control_objects_name = "${accountControlObjectsName}"`) },
        });
        // console.log(response);
        if (response) {
            return response;
        } else {
            return null;
        }
    }
   
    async createAccountControlObject(operationsDto: AccountControlObjectDto, isUpdate: boolean): Promise<AccountControlObjectResponseModel> {
        // console.log(operationsDto,'>>>>>>>>>')
        try {
          let previousValue
          // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
          if (!isUpdate) {
            const AccountEntity = await this.accountControlObjectRepository.findOne({where :{ accountControlObjectsName:operationsDto.accountControlObjectsName}});
            // console.log(operationsDto,"hiiiiiiiiiiiiiiii")
            if (AccountEntity) {
              //return new InformationMessageError(11104, "State already exists");
              throw new AccountControlObjectResponseModel(false,11104, 'operation already exists');
            }
          }
          else{
            const certificatePrevious = await this.accountControlObjectRepository.findOne({where:{accountControlObjectsId:operationsDto.accountControlObjectsId}})
            previousValue = certificatePrevious.accountControlObjectsName

            const AccountcontrolEntity = await this.accountControlObjectRepository.findOne({where :{ accountControlObjectsName:operationsDto.accountControlObjectsName}})

            if (AccountcontrolEntity) {
              if(AccountcontrolEntity.accountControlObjectsId!=operationsDto.accountControlObjectsId) {
                throw new AccountControlObjectResponseModel(false,11104, 'AccountControlObject already exists');      
              }
            }
          }
          const convertedOperationEntity: AccountControlObject = this.accountControlObjectAdapter.convertDtoToEntity(operationsDto,isUpdate);
          const savedOperationEntity: AccountControlObject = await this.accountControlObjectRepository.save(convertedOperationEntity);
          const savedOperationsDto: AccountControlObjectDto = this.accountControlObjectAdapter.convertEntityToDto(savedOperationEntity);
            // console.log(savedStateDto);
          if (savedOperationsDto) {
            const presentValue = savedOperationsDto.accountControlObjectsName;
           // generating resposnse
           const response = new AccountControlObjectResponseModel(true,1,isUpdate? 'AccountControlObject Updated Successfully': 'AccountControlObject Created Successfully');
           const name=isUpdate?'updated':'created'
           const displayValue = isUpdate? 'AccountControlObject Updated Successfully': 'AccountControlObject Created Successfully'
           const userName = isUpdate? savedOperationsDto.updatedUser :savedOperationsDto.createdUser;
          //  const newLogDto = new LogsDto(1,name, 'Currencies', savedBrandsDto.currencyId, true, displayValue,userName,previousValue,presentValue)
          //  let res = await this.logService.createLog(newLogDto);
          //  console.log(res);
           return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new AccountControlObjectResponseModel(false,11106,'AccountControlObject saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }
      }  
  
      
 async getAllaccounts(): Promise<AllAccountControlObjectResponse> {
        try {
            const garmentDto: AccountControlObjectDto[] = [];
            console.log(garmentDto,"aaaaaaaaaa")
            const garmentEntities: AccountControlObject[] = await this.accountControlObjectRepository.find({
                order: { accountControlObjectsName: "ASC" },
                relations: ['pch']
                
            });
            console.log("dooock")

            if (garmentEntities.length > 0) {
                garmentEntities.forEach(garmentEntity => {
                    const convertedGarmentDto: AccountControlObjectDto = this.accountControlObjectAdapter.convertEntityToDto(garmentEntity);
                    garmentDto.push(convertedGarmentDto);
                });
                console.log(garmentDto);
                const response = new AllAccountControlObjectResponse(true, 11208, "Garments retrieved successfully", garmentDto);
                return response;
            } else {
                throw new ErrorResponse(99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }

    async getAccountControlObject(account: string): Promise<AccountControlObject> {
        //  console.log(employeeId);
        const response = await this.accountControlObjectRepository.findOne({
            where: { accountControlObjectsName: account },
        });
        // console.log(response);
        if (response) {
            return response;
        } else {
            return null;
        }
    }
    async getAllActiveAccountControlObjecte(): Promise<AllAccountControlObjectResponse> {
        // const page: number = 1;
        // const response = new AllDeliveryResponseModel();
        try {
          const accountDTO: AccountControlObjectDto[] = [];
          //retrieves all companies
          const accountEntity: AccountControlObject[] = await this.accountControlObjectRepository.find({where:{"isActive":true},order :{accountControlObjectsName:'ASC'}});
          //console.log(statesEntities);
          
          if (accountEntity) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            accountEntity.forEach(itemCategoryEntity => {
              const convertedDeliveryMethodDto: AccountControlObjectDto = this.accountControlObjectAdapter.convertEntityToDto(
                itemCategoryEntity
              );
              accountDTO.push(convertedDeliveryMethodDto);
            });
    
            //generated response
  
            const response = new AllAccountControlObjectResponse(true,1,'AccountControlObject retrieved successfully',accountDTO);
            return response;
          } else {
            throw new ErrorResponse(99998, 'Data not found');
          }
          // return response;
        } catch (err) {
          return err;
        }
      } 
    async getAllAccountControlObjectDropDown(): Promise<AccountControlObjectDropDownResponseModel> {
        try {
            const accountcontrolDTO: AccountControlObjectDropDownDto[] = [];
            const accountEntities: AccountControlObject[] = await this.accountControlObjectRepository.find({ select: ['accountControlObjectsId', 'accountControlObjectsName'], where: { isActive: true }, order: { accountControlObjectsName: 'ASC' } });
            if (accountEntities && accountEntities.length > 0) {
                accountEntities.forEach(accountcontrolEntity => {
                    accountcontrolDTO.push(new AccountControlObjectDropDownDto(accountcontrolEntity.accountControlObjectsId, accountcontrolEntity.accountControlObjectsName));
                });
                const response = new AccountControlObjectDropDownResponseModel(true, 11108, "AccountControlObject retrieved successfully",accountcontrolDTO );
                return response;
            } else {
                throw new ErrorResponse(99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }
    async getActiveAccountControlObjectById(Req: AccountControlObjectRequest): Promise<AccountControlObjectResponseModel> {
        try {
            //retrieves all companies
            const OperationsEntities: AccountControlObject = await this.accountControlObjectRepository.findOne({
              where:{accountControlObjectsId:Req.accountControlObjectsId}
              });
              
              const OperationData: AccountControlObjectDto = this.accountControlObjectAdapter.convertEntityToDto(OperationsEntities);
              if (OperationData) {
                  const response = new AccountControlObjectResponseModel(true, 11101 , 'AccountControlObject retrived Successfully',);
                  return response;
              }
              else{
                  throw new AccountControlObjectResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getAccountControlObjectForId(accountControlObjectsId: number): Promise<AccountControlObjectDropDownDto> {
        const response = await this.accountControlObjectRepository.findOne({
            select: ['accountControlObjectsId', 'accountControlObjectsName'],
            where: { accountControlObjectsId: accountControlObjectsId },
        });
        if (response) {
            return new AccountControlObjectDropDownDto(response.accountControlObjectsId, response.accountControlObjectsName);
        } else {
            return null;
        }
    }

    async getAccountControlObjectforpcdDropDown(req: AccountControlObjectRequest): Promise<AccountControlObjectDropDownResponseModel> {
        try {
            const accountEntities: AccountControlObjectDropDownDto[] = await this.accountControlObjectRepository
                .createQueryBuilder('account_control_objects_name')
                .select('account_control_objects_id as accountControlObjectsId, account_control_objects_name as accountControlObjectsName')
                .where(`is_active=1 and account_control_objects_id='${req.accountControlObjectsId}'`)
                .orderBy('account_control_objects_name')
                .getRawMany();

            if (accountEntities && accountEntities.length > 0) {
                const response = new AccountControlObjectDropDownResponseModel(true, 11108, "ACcountControlObject retrieved successfully", accountEntities);
                return response;
            } else {
                throw new ErrorResponse(99998, 'Data not found');
            }
        } catch (err) {
            return err;
        }
    }

    async activateOrDeactivateAccountControlObject(accountReq: AccountControlObjectRequest): Promise<AccountControlObjectResponse> {
        try {
            const controlExists = await this.getAccountControlObjectById(accountReq.accountControlObjectsId);
            if (controlExists) {
                if (!controlExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current AccountControlObject information.Refresh and try again');
                } else {
                    
                        const controlSatatus =  await this.accountControlObjectRepository.update(
                            { accountControlObjectsId: accountReq.accountControlObjectsId },
                            { isActive: accountReq.isActive,updatedUser: accountReq.updatedUser });
                       
                        if (controlExists.isActive) {
                            if (controlSatatus.affected) {
                                const accountResponse: AccountControlObjectResponse = new AccountControlObjectResponse (true, 10115, ' AccountControlObject is de-activated successfully');
                                return accountResponse;
                            } else {
                                throw new ErrorResponse(10111, ' AccountControlObject is already deactivated');
                            }
                        } else {
                            if (controlSatatus.affected) {
                                const accountResponse: AccountControlObjectResponse = new AccountControlObjectResponse(true, 10114, ' AccountControlObject is activated successfully');
                                return accountResponse;
                            } else {
                                throw new ErrorResponse(10112, ' AccountControlObject is already  activated');
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
    async getAccountControlObjectById(accountControlObjectsId: number): Promise<AccountControlObject> {
        //  console.log(employeeId);
            const response = await this.accountControlObjectRepository.findOne({
            where: {accountControlObjectsId:accountControlObjectsId},
            });
            // console.log(employeeresponse);
            if (response) {
            return response;
            } else {
            return null;
            }
        }

}