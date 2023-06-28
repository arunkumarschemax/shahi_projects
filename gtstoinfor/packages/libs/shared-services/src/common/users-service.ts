import { CommonAxiosServicePrs } from "../user-management/common-axios-service-prs";
import { UsersDto, } from '../../../shared-models/src/common/users/users.dto'
import {UsersResponseModel} from '../../../shared-models/src/common/users/users-response-objects'

export class UsersService extends CommonAxiosServicePrs {
    private UsersController = "/users"

    async createUser(payload: UsersDto):Promise<UsersResponseModel> {
        return this.axiosPostCall(this.UsersController + "/createUser", payload)
    }

}