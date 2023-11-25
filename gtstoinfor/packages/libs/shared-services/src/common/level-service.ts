import { CommonAxiosService } from "packages/libs/shared-services/src/common-axios-service-prs";
import { AllLevelResponseModel,LevelResponseModel,LevelsDto,LevelsRequestDto } from "@project-management-system/shared-models";
export class LevelService extends CommonAxiosService{

    URL ="/level_Name";

    async createLevel(fab: LevelsDto): Promise<LevelResponseModel> {
        // console.log('testss',fab)
        return this.axiosPostCall(this.URL + "/createLevel", fab)
    }
  
    async updateLevel(update: LevelsDto): Promise<LevelResponseModel> {
        return this.axiosPostCall(this.URL + "/updateLevel", update)
    }
    
    async getAllLevel(): Promise<LevelResponseModel> {
         return this.axiosPostCall(this.URL + '/getAllLevel')
          }

    async activateOrDeactivateLevel(  fabric: LevelsDto): Promise<LevelResponseModel> {
            return this.axiosPostCall(this.URL + '/activateOrDeactivateLevel', fabric)
        
          } 
      
     async getAllActiveLevel(): Promise<LevelResponseModel> {
            return this.axiosPostCall(this.URL + '/getAllActiveLevel')
          }

          async getActiveLevelById(): Promise<LevelResponseModel> {
            return this.axiosPostCall(this.URL + '/getActiveLevelById')
          }    

        //   async getActiveFabrics(): Promise<LevelResponseModel>{
        //     return this.axiosPostCall(this.URL + '/getActiveFabrics')
        //   }
}
