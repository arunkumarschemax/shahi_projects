// import { AllCurrencyResponseModel,  AllGarmentResponseModel,  CurrencyRequest, GarmentRequest, GarmentResponseModel, GarmentsDto } from '@project-management-system/shared-models';
// import { CommonAxiosService } from "../common-axios-service-prs";

// export class GarmentService extends CommonAxiosService{
//   URL = "/garments";

//   async createGarment(garment: GarmentsDto): Promise<GarmentResponseModel> {
//     console.log('testss',garment)
//     return this.axiosPostCall(this.URL + "/createGarment", garment)
// }

//   async updateGarment(garment: GarmentsDto): Promise<GarmentResponseModel> {
//     return this.axiosPostCall(this.URL + "/updateGarment", garment)
//   }
//   async getAllGarments(req?:any): Promise<AllGarmentResponseModel> {
//     return this.axiosPostCall(this.URL + '/getAllGarments',req)
//   }

//   async activateOrDeactivateGarment(
//     garment: GarmentsDto
//   ): Promise<GarmentResponseModel> {
//     return this.axiosPostCall(this.URL + '/activateOrDeactivateGarment', garment)

//   }
//   async getAllActiveGarments(): Promise<AllGarmentResponseModel> {
//     return this.axiosPostCall(this.URL + '/getAllActiveGarments')
//   }
//   async getGarmentById(garmentRequest:GarmentRequest): Promise<GarmentResponseModel> {
//     return this.axiosPostCall(this.URL + '/getGarmentById',garmentRequest)
//   }
// //   async getActiveCurrencysCount(): Promise<AllCurrencyResponseModel> {
// //     return this.axiosPostCall(this.URL + '/getActiveCurrencyCount')
// //   }
// }
