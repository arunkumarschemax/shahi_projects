import { Injectable, Response } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Not, Raw } from "typeorm";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { AllQualitysResponseModel, CommonResponseModel, QualityCreateRequest, QualitysCreateRequest, RacActiveDeactive, RackCreateRequest, qualitysResponseModel, } from "@project-management-system/shared-models";
import { QualitysAdapter } from "./qualitys.adapter";
import { QualitysEntity } from "./qualitys.entity";
import { QualitysDTO } from "./qualitys.dto";

@Injectable()
export class QualitysService {

   /**
     * create/update paymentTerms
     * @param qualitysDTO 
     * @param isUpdate 
     * @param request 
     */
  constructor(
    @InjectRepository(QualitysEntity)
    private repository: Repository<QualitysEntity>,
    private adapter: QualitysAdapter,

    
  ) { }

  async getqualitysWithoutRelations(quality: string): Promise<QualitysEntity> {
    // tslint:disable-next-line: typedef
    const PaymentTermsResponse = await this.repository.findOne({
    where: {qualityName: Raw(alias => `quality_name = '${quality}'`)},
    });
    if (PaymentTermsResponse) {
    return PaymentTermsResponse;
    } else {
    return null;
    }
  }
  async createQualitys(qualityDTO:QualitysDTO , isUpdate: boolean): Promise<qualitysResponseModel>{
    // const response = new PaymentMethodResponseModel();
    console.log(qualityDTO,'create');
    
    try{
      let previousValue
    const qualiDtos: QualitysDTO[] = [];

      if(!isUpdate){
        const qualitysEntity = await this.getqualitysWithoutRelations(qualityDTO.qualityName);
        if (qualitysEntity){
          throw new qualitysResponseModel(false,11104, 'Quality already exists'); 
        }
      }
      else{
        const certificatePrevious = await this.repository.findOne({where:{qualityId:qualityDTO.qualityId}})

        previousValue =(certificatePrevious.qualityName)
        const qualitysEntitys = await this.getqualitysWithoutRelations(qualityDTO.qualityName);
        if (qualitysEntitys){
          if(qualitysEntitys.qualityId != qualityDTO.qualityId ){
            throw new qualitysResponseModel(false,11104, 'Quality already exists'); 
          }
        }
      }
      const convertedqualityEntity: QualitysEntity = this.adapter.convertDtoToEntity(qualityDTO,isUpdate);

    const savedqualityEntity: QualitysEntity = await this.repository.save(convertedqualityEntity);
    const savedPaymentMethodDto: QualitysDTO = this.adapter.convertEntityToDto(savedqualityEntity);
    qualiDtos.push(savedPaymentMethodDto)

    if (savedPaymentMethodDto) {
      const presentValue = qualityDTO.qualityName;
      //generating resposnse

      const name=isUpdate?'updated':'created'
      const displayValue = isUpdate? 'Quality Updated Successfully': 'Quality Created Successfully'
      const userName = isUpdate? savedPaymentMethodDto.updatedUser :savedPaymentMethodDto.createdUser;
        // const newLogDto = new LogsDto(1,name, 'PaymentMethod', savedPaymentMethodDto.paymentMethodId, true, displayValue,userName,previousValue,presentValue)
        // let res = await this.logService.createLog(newLogDto);
        // /console.log(res);
        const response = new AllQualitysResponseModel(true,1000,isUpdate? 'Quality Updated Successfully': 'Quality Created Successfully');
      return response;
    } else {
      //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
      throw new qualitysResponseModel(false,11106,'Quality Method saved but issue while transforming into DTO');
    }
    // return response;
  } catch (error) {
    // when error occures while saving the data , the execution will come to catch block.
    // tslint:disable-next-line: typedef
    return error;
  }
}

async getAllQualitys(): Promise<AllQualitysResponseModel> {
  // const page: number = 1;
  // const response = new AllPaymentResponseModel();
  try {
    const qualityDTO: QualitysDTO[] = [];
    //retrieves all companies
    const quqlityEntity: QualitysEntity[] = await this.repository.find({ order :{'qualityName':'ASC'}});
    //console.log(statesEntities);
    if (quqlityEntity) {
      // converts the data fetched from the database which of type companies array to type StateDto array.
      quqlityEntity.forEach(quqlityEntity => {
        const convertedPaymentMethodDto: QualitysDTO = this.adapter.convertEntityToDto(
          quqlityEntity
        );
        qualityDTO .push(convertedPaymentMethodDto);
      });

      //generated response

      const response = new AllQualitysResponseModel(true,1,'Qualitys retrieved successfully',qualityDTO);
    //  if(req?.createdUser){
    // //   const newLogDto = new LogsDto(1,'view', 'PaymentMethod', 0, true, 'Payment mode retrieved successfully',req.createdUser,'','',)
    // //   let res = await this.logService.createLog(newLogDto);
    // //   console.log(res);
    //  }
      return response;
    } else {
      throw new qualitysResponseModel(false,99998, 'Data not found');
    }
    // return response;
  } catch (err) {
    return err;
  }
}  

async activateOrDeactivateQualitys(paymentreq: QualitysDTO): Promise<qualitysResponseModel> {
  try {
      const paymentExists = await this.repository.findOne({where:{qualityId:paymentreq.qualityId}});
      if (paymentExists) {
        if (!paymentExists) {
          
              throw new qualitysResponseModel (false,10113, 'Someone updated the current qualitys information.Refresh and try again');
          } else {
              
                  const PaymentStatus =  await this.repository.update(
                      { qualityId: paymentreq.qualityId },
                      { isActive: paymentreq.isActive,updatedUser: paymentreq.updatedUser });
                 
                  if (paymentExists.isActive) {
                      if (PaymentStatus.affected) {
                          const paymentResponse: qualitysResponseModel = new qualitysResponseModel(true, 10115, 'qualitys is de-activated successfully');
                          return paymentResponse;
                      } else {
                          throw new qualitysResponseModel(false,10111, 'qualitys is already deactivated');
                      }
                  } else {
                      if (PaymentStatus.affected) {
                          const paymentResponse: qualitysResponseModel = new qualitysResponseModel(true, 10114, 'qualitys is activated successfully');
                          return paymentResponse;
                      } else {
                          throw new qualitysResponseModel(false,10112, 'qualitys is already  activated');
                      }
                  }
              // }
          }
      } else {
          throw new qualitysResponseModel(false,99998, 'No Records Found');
      }
  } catch (err) {
      return err;
  }
}
// async getQualitysById(qualityId: number): Promise<> {
//    console.log(qualityId);
//       const Response = await this.repository.findOne({
//       where: {qualityId: qualityId},
//       });
//       // console.log(employeeResponse);
//       if (Response) {
//  const Response :qualitysResponseModel = new qualitysResponseModel(true, 10114, 'qualitys  successfully');
//       return Response;
//       } else {
//       return null;
//       }
//   }

}