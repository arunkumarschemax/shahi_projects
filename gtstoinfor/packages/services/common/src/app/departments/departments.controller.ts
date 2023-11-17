import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DepartmentService } from './departments.service';
import { DepartmentsDTO } from './dto/departments.dto';
import { DepartmentResponseModel,AllDepartmentsResponseModel } from '@project-management-system/shared-models';
import { DepartmentRequest } from './dto/departments.request';

@ApiTags('departments')
@Controller('departments')
export class DepartmentsController {
    constructor(
        private departmentsService: DepartmentService,
        private readonly applicationExceptionhandler: ApplicationExceptionHandler,

      ){}
   /**
     * creates or updates a value of department
     * @param departmentDto department DTO
     * @returns departmentResponse
     */
    // @Post('/createDepartment')
    // async createDepartment(@Body() departmentsDTO:DepartmentsDTO,isUpdate:boolean=false): Promise<DepartmentResponseModel> {
    //     try {
    //         // console.log(departmentsDTO);
    //         return await this.departmentsService.createDepartment(departmentsDTO, false);
    //     } catch (error) {
    //         return this.applicationExceptionhandler.returnException(DepartmentResponseModel, error)
    //     }
    // }
    @Post('/createDepartment')
    @ApiBody({type: DepartmentsDTO})
    async createsize(@Body() sizeDTO:any,isUpdate:boolean=false): Promise<DepartmentResponseModel> {
        // console.log(sizeDTO,'---------------dhdhdhdh----------------------')
    try {
        return await this.departmentsService.createDepartment(sizeDTO, false);
    } catch (error) {
        // return errorHandler(SizeResponseModel,error);
        return this.applicationExceptionhandler.returnException(DepartmentResponseModel, error);
    }
    }

    /**
     * creates or updates a value of department
     * @param departmentDto department DTO
     * @returns departmentResponse
     */
    @Post('/updateDepartment')
    @ApiBody({type:DepartmentsDTO})
    async updateDepartment(@Body() departmentsDTO: any): Promise<DepartmentResponseModel> {
        try {
        return await this.departmentsService.createDepartment(departmentsDTO, true);
        } catch (error) {
            return this.applicationExceptionhandler.returnException(DepartmentResponseModel, error)
        }
    }

      /**
     * gets all the Value of departments
     * @returns AllValue departmentsResponseModel which returns all the Value Addition Types  along with status (true/false), errortype, errorCode, internal message which provides message to the calling function.
     */
    
    @Post('/getAllActiveDepartments')
  async getAllActiveDepartments(@Req() request: Request): Promise<AllDepartmentsResponseModel> {
      try {
          return await this.departmentsService.getAllActiveDepartments();
      } catch (error) {
          return this.applicationExceptionhandler.returnException(AllDepartmentsResponseModel, error)
      }
  }
  @Post('/getAllDepartments')
  async getAllDepartments(): Promise<AllDepartmentsResponseModel> {
    try {
      return await this.departmentsService.getAllDepartments();
    } catch (error) {
      // return errorHandler(AllSizeResponseModel, error);
      return this.applicationExceptionhandler.returnException(AllDepartmentsResponseModel, error);
    }
  }
     /**
     * Activate Or De-Activate Value Department
     * @param getSingleDepartment DepartmentResponseModel 
     * @returns Value Department
     */
    @Post('/ActivateorDeactivateDepartment')
    async ActivateorDeactivateDepartment(@Body() departmentReq: DepartmentRequest): Promise<DepartmentResponseModel> {
        try {
            return await this.departmentsService.activateOrDeactivateDepartment(departmentReq);
        } catch (err) {
            return this.applicationExceptionhandler.returnException(DepartmentResponseModel, err);
        }
    }

//     @Post('/getActiveDepartmentById')
//   async getActiveColourById(deptreq:DepartmentRequest): Promise<AllDepartmentsResponseModel> {
//     try {
//       return await this.departmentsService.getDepartmentById(deptreq);
//     } catch (error) {
//       // return errorHandler(AllProfitControlHeadResponseModel, error);
//       return this.applicationExceptionhandler.returnException(DepartmentResponseModel, error);
//     }
    
// }
    
}
