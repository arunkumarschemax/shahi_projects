import { Body, Controller, Get, Post, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { UsersDto } from "./dto/users.dto";
import {
  AllUsersResponseModel,
  UsersActivateDeactivateDto,
  UsersResponseModel,
} from "@project-management-system/shared-models";

@Controller("users")
export class UsersController {
  constructor(
    private usersService: UsersService,
    private readonly applicationExceptionhandler: ApplicationExceptionHandler
  ) { }

  @Post("/createUser")
  async createUser(@Body() usersDto: any): Promise<UsersResponseModel> {
    try {
      return await this.usersService.createUser(usersDto);
    } catch (error) {
      return this.applicationExceptionhandler.returnException(
        UsersResponseModel,
        error
      );
    }
  }

  @Post("/getAllUsers")
  async getAllUsers(): Promise<AllUsersResponseModel> {
    try {
      return this.usersService.getAllUsers();
    } catch (error) {
      return this.applicationExceptionhandler.returnException(
        AllUsersResponseModel,
        error
      );
    }
  }

  @Post("/activateOrDeactivate")
  async activateOrDeactivate(@Body() activateDeactivateReq:any): Promise<UsersResponseModel> {
    try {
      return this.usersService.activateOrDeactivate(activateDeactivateReq);
    } catch (error) {
      return this.applicationExceptionhandler.returnException(
        UsersResponseModel,
        error
      );
    }
  }
}

