import { CommonAxiosServicePrs } from "../user-management/common-axios-service-prs";
import { UsersDto, } from '../../../shared-models/src/common/users/users.dto'
import {UsersResponseModel} from '../../../shared-models/src/common/users/users-response-objects'
import { AllUsersResponseModel, UsersActivateDeactivateDto } from "@project-management-system/shared-models";

export class UsersService extends CommonAxiosServicePrs {
    private UsersController = "/users"

    async createUser(payload: UsersDto):Promise<UsersResponseModel> {
        return this.axiosPostCall(this.UsersController + "/createUser", payload)
    }

    async getAllUsers():Promise<AllUsersResponseModel>{
        return this.axiosPostCall(this.UsersController+"/getAllUsers")
    }

    async activateOrDeactivate(payload:UsersActivateDeactivateDto):Promise<AllUsersResponseModel>{
        return this.axiosPostCall(this.UsersController + "/activateOrDeactivate",payload)
    }

}