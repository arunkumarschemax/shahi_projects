import axios from 'axios';
import { DeliveryMethodDto, DeliveryMethodRequest } from 'packages/libs/shared-models/src/common/delivery-method';
import { CommonAxiosService } from "../common-axios-service-prs";
import { AllROSLGroupsResponseModel, CommonResponseModel, ProductDto, ProductReq, ROSLGroupRequest, ROSLGroupsDto, ROSLGroupsResponseModel } from '@project-management-system/shared-models';


export class ProductService extends CommonAxiosService{
URL = '/product';

        async createProduct(req: ProductDto): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL +  '/createProduct',req)
        }

        async  updateProduct(req: ProductDto): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL + '/updateProduct', req)
        }
        
        async getAllProducts(): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL + "/getAllProducts")
        }
        
        async  activateOrDeactivateProduct(req: ProductReq): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL + '/activateOrDeactivateProduct', req)
        }
        
        async  getAllActiveProducts(): Promise<CommonResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveProducts')
        }        

}