import { Body, Controller, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { UsersDto } from './dto/users.dto';
import {UsersResponseModel} from '@project-management-system/shared-models'

@Controller('users')
export class UsersController {
    constructor(
        private usersService:UsersService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,
    ){}

    @Post('/createUser')
    async createUser(@Body() usersDto:any):Promise<UsersResponseModel> {
        console.log(usersDto,'uesr dto--');        
       try{
        return await this.usersService.createUser(usersDto)
       }catch(error){
        console.log(error);
        return this.applicationExceptionhandler.returnException(UsersResponseModel,error)
       }
    }

}
