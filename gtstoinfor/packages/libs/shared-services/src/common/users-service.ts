import { UsersDto, } from '../../../shared-models/src/common/users/users.dto'
import {UsersResponseModel} from '../../../shared-models/src/common/users/users-response-objects'
import { AllUsersResponseModel, UsersActivateDeactivateDto } from "@project-management-system/shared-models";
import { CommonAxiosService } from '../common-axios-service-prs';

export class UsersService extends CommonAxiosService {
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