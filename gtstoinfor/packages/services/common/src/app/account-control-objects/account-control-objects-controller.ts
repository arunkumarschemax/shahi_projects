import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AccountControlObjectDto } from './dto/account-control-object-dto';
import { AccountControlObjectService } from './account-control-object-service';
import { AccountControlObjectRequest } from './dto/account-control-object-request';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import {AccountControlObjectDetailsResponse, AllAccountControlObjectResponse,AccountControlObjectDropDownResponseModel,AccountControlObjectDropDownDto,AccountControlObjectResponse, AccountControlObjectResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';


@Controller ('account_control_objects')
@ApiTags('account_control_objects')
export  class AccountControlObjectController {
    constructor (
        private accountControlservice: AccountControlObjectService,
        private readonly applicationExceptionHandler: ApplicationExceptionHandler,

    ){}

    
      /**
     * creates  a AccountControlObject
     * @param AccountControlObject AccountControlObject DTO
     * @returns FAccountControlObjectResponse
     */

      @Post('/createAccountControlObject')
       @ApiBody({type:AccountControlObjectDto})
       async createAccountControlObject(@Body() Accountcontrol:any,isUpdate:boolean=false,@Req() request:Request): Promise<AccountControlObjectResponseModel> {
           try {
            console.log(Accountcontrol,"-----------")
            return await this.accountControlservice.createAccountControlObject(Accountcontrol,false);
          } catch (error) {
               return this.applicationExceptionHandler.returnException(AccountControlObjectResponseModel, error);
          }
        }

        @Post('/getAllAccountControlObject')
        async getAllAccountControlObject(): Promise<AllAccountControlObjectResponse> {
          console.log("hurrrrr")
            try {
                return await this.accountControlservice.getAllaccounts();
            } catch (error) {
                return this.applicationExceptionHandler.returnException(AllAccountControlObjectResponse, error);
            }
        }

        
        @Post('/updateAccountControlObject')
        @ApiBody({type:AccountControlObjectDto})
        async updateAccountControlObject(@Body() accountdto: any,@Req() request:Request): Promise<AccountControlObjectResponseModel> {
          try {
            return await this.accountControlservice.createAccountControlObject(accountdto, true);
          } catch (error) {
            return this.applicationExceptionHandler.returnException(AccountControlObjectResponseModel, error);
          }
        }

         @Post('/getAllAccountControlObjectDropDown')
         async getAllAccountControlObjectDropDown(): Promise<AccountControlObjectDropDownResponseModel> {
             try {
              return await this.accountControlservice.getAllAccountControlObjectDropDown();
            } catch (error) {
                 return this.applicationExceptionHandler.returnException(AccountControlObjectDropDownResponseModel, error);
            }
          }

          @Post('/getAccountControlObjectForPcdDropDown')
    async getAccountControlObjectForPcdDropDown(@Body() req:any): Promise<AccountControlObjectDropDownResponseModel> {
        try {
         return await this.accountControlservice.getAccountControlObjectforpcdDropDown(req);
       } catch (error) {
            return this.applicationExceptionHandler.returnException(AccountControlObjectDropDownResponseModel, error);
       }
     }
     
     @Post('/getAccountControlObjectForId')
     async getAccountControlObjectForId(@Body() req:AccountControlObjectRequest): Promise<AccountControlObjectDropDownDto> {
         try {
          return await this.accountControlservice.getAccountControlObjectForId(req.accountControlObjectsId);
        } catch (error) {
             return error;
        }
      }

      @Post('/activateOrDeactivateAccountControlObject')
      @ApiBody({type:AccountControlObjectRequest})
      async activateOrDeactivateAccountControlObject(@Body()itemReq: any): Promise<AccountControlObjectResponse> {
          try {
           return await this.accountControlservice.activateOrDeactivateAccountControlObject(itemReq);
         } catch (error) {
              return error;
         }
       }
       @Post('/getAllActiveAccountControlObject')
       async getAllActiveAccountControlObject(): Promise<AllAccountControlObjectResponse> {
           try {
               return await this.accountControlservice.getAllActiveAccountControlObjecte();
           } catch (error) {
              return this.applicationExceptionHandler.returnException(AllAccountControlObjectResponse, error);
           }
       }
}