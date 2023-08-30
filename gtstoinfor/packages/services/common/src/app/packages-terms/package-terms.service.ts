import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { PackageTerms } from './package-terms.entity';
import { PackageTermsAdapter } from './dto/package-terms.adapter';
import { AllPackageTermsResponseModel, PackageTermsDropDownDto, PackageTermsDropDownResponseModel, PackageTermsRequest, PackageTermsResponseModel } from '@project-management-system/shared-models';
import { PackageTermsDTO } from './dto/package-terms.dto';


@Injectable()
export class PackageTermsService {
    constructor(

        @InjectRepository(PackageTerms)
        private packageTermsRepository: Repository<PackageTerms>,
        private packageTermsAdapter: PackageTermsAdapter,
      ) {}
   
    async createPackageTerms(packageTermsDTO: any, isUpdate: boolean): Promise<PackageTermsResponseModel> {
        console.log(packageTermsDTO,"dto88880")
        try {
          let previousValue
            // to check whether PackageTerms exists with the passed  PackageTerms  or not. if isUpdate is false, a check will be done whether a record with the passed PackageTerms is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed PackageTerms  then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
            if (!isUpdate) {
            const PackageTermsEntity = await this.getPackageTermsDetailsWithoutRelations(packageTermsDTO.packageTermsName);
            if (PackageTermsEntity) {
                throw new PackageTermsResponseModel(false,11104, 'PackageTerm already exists');         
            } 
            // var notificationStatus='Created';
            }
            else{
                const certificatePrevious = await this.packageTermsRepository.findOne({where:{packageTermsId:packageTermsDTO.packageTermsId}})
                previousValue =(certificatePrevious.packageTermsName)
                const PackageTermsEntity = await this.getPackageTermsDetailsWithoutRelations(packageTermsDTO.packageTermsName);
                if (PackageTermsEntity) {
                    if(PackageTermsEntity.packageTermsId != packageTermsDTO.packageTermsId ){
                        throw new PackageTermsResponseModel(false,11104, 'PackageTerm already exists');
                    }         
                } 
              }
            // else{
            // var notificationStatus='Updated';
            // }
            const convertedPackageTermsEntity: PackageTerms = this.packageTermsAdapter.convertDtoToEntity(packageTermsDTO,isUpdate);
            const savedPackageTermsEntity: PackageTerms = await this.packageTermsRepository.save(
            convertedPackageTermsEntity
            );
            const savedPackageTermsDto: PackageTermsDTO = this.packageTermsAdapter.convertEntityToDto(savedPackageTermsEntity);
            if (savedPackageTermsDto) {
                const presentValue = savedPackageTermsDto.packageTermsName;
            // generating resposnse
            const response = new PackageTermsResponseModel(true,isUpdate ? 11101 : 11100,isUpdate? 'PackageTerm Updated Successfully': 'PackageTerm Created Successfully',savedPackageTermsDto);
            const name=isUpdate?'updated':'created'
            const displayValue = isUpdate? 'PackageTerms Updated Successfully': 'PackageTerm Created Successfully'
            const userName = isUpdate? savedPackageTermsDto.updatedUser :savedPackageTermsDto.createdUser;
            return response;
            } else {
            throw new PackageTermsResponseModel(false,11106,'PackageTerms saved but issue while transforming into DTO');
            }
        } catch (error) {
            // when error occures while saving the data , the execution will come to catch block.
            // tslint:disable-next-line: typedef
            return error;
        }
    }
    
    async getPackageTermsDetailsWithoutRelations(packageTermsName: string): Promise<PackageTerms> {
        // tslint:disable-next-line: typedef
        const PackageTermsResponse = await this.packageTermsRepository.findOne({
        where: {packageTermsId: Raw(alias => `package_terms_name = '${packageTermsName}'`)},
        });
        if (PackageTermsResponse) {
        return PackageTermsResponse;
        } else {
        return null;
        }
    }

    
    async getAllPackageTerms(req?:UserRequestDto): Promise<AllPackageTermsResponseModel> {
        // const page: number = 1;
        try {
          const packageTermsDTO: PackageTermsDTO[] = [];
          //retrieves all companies
          const packageTermsEntities: PackageTerms[] = await this.packageTermsRepository.find({order :{packageTermsName:'ASC'}});
          //console.log(paymentTermsEntities);
          if (packageTermsEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            packageTermsEntities.forEach(packageTermsEntity => {
              const convertedstatesDto: PackageTermsDTO = this.packageTermsAdapter.convertEntityToDto(
                packageTermsEntity
              );
              packageTermsDTO.push(convertedstatesDto);
            });
            const response = new AllPackageTermsResponseModel(true,11108,"PackageTerms retrieved successfully",packageTermsDTO);
           
            
            return response;
          } else {
            throw new PackageTermsResponseModel(false,99998, 'Data not found');
          }
        } catch (err) {
          throw err;PackageTerms
        }
      }
      async getAllActivePackageTerms(): Promise<AllPackageTermsResponseModel> {
        // const page: number = 1;
        try {
            const packageTermsDTO: PackageTermsDTO[] = [];
            //retrieves all companies
            const PackageTermsEntities: PackageTerms[] = await this.packageTermsRepository.find({ order: {packageTermsName: 'ASC' },where:{isActive:true},
           });
         console.log(PackageTermsEntities)
            if (PackageTermsEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                PackageTermsEntities.forEach(packageTermsEntity => {
                    const convertedpackageTermsDTO: PackageTermsDTO = this.packageTermsAdapter.convertEntityToDto(
                      packageTermsEntity
                    );
                    packageTermsDTO.push(convertedpackageTermsDTO);
                });
                const response = new AllPackageTermsResponseModel(true, 11108, "PackageTerms retrieved successfully", packageTermsDTO);
                return response;
            } else {
                throw new PackageTermsResponseModel(false,99998, 'Data not found'); packageTermsDTO
            }
        } catch (err) {
            throw err;
        }
    }
    /**
     * It deactivates PaymentTerms 
     * @returns true or false
     */
    // @LogActions({isAsync: true})
    async activateOrDeactivatePackageTerms(packageTermsReq: any): Promise<PackageTermsResponseModel> {

        console.log(packageTermsReq,"activate")
      try {
          const packageTermsExists = await this.getPackageTermsById(packageTermsReq.packageTermsId);
          if (packageTermsExists) {
              if (packageTermsReq.versionFlag !== packageTermsExists.versionFlag) {
                  throw new PackageTermsResponseModel(false, 10113, 'Someone updated the current PackageTerm information.Refresh and try again');
              } else {
                  
                      const packageTermsStatus =  await this.packageTermsRepository.update(
                          { packageTermsId: packageTermsReq.packageTermsId },
                          { isActive: packageTermsReq.isActive,updatedUser:packageTermsReq.updatedUser });
                      console.log(packageTermsStatus,"pay////////")
                      if (packageTermsExists.isActive) {
                          if (packageTermsStatus.affected) {
                              const packageTermsResponse: PackageTermsResponseModel = new PackageTermsResponseModel(true, 10115, 'PackageTerm is deactivated successfully');
                              return packageTermsResponse;
                          } else {
                              throw new PackageTermsResponseModel(false,10111, 'PackageTerm is already deactivated');
                          }
                      } else {
                          if (packageTermsStatus.affected) {
                              const packageTermsResponse: PackageTermsResponseModel = new PackageTermsResponseModel(true, 10114, 'PackageTerm is activated successfully');
                              return packageTermsResponse;
                          } else {
                              throw new PackageTermsResponseModel(false,10112, 'PackageTerm is already activated');
                          }
                      }
                  // }
              }
          } else {
              throw new PackageTermsResponseModel(false,99998, 'No Records Found');
          }
      } catch (err) {
          throw err;
      }
  }
    async getPackageById(packageTermsReq: PackageTermsRequest): Promise<PackageTermsResponseModel> {
        try {
            //retrieves all companies
            const packageTermsEntities: PackageTerms = await this.packageTermsRepository.findOne({
              where:{packageTermsId:packageTermsReq.packageTermsId}
              });
              
              const packageTermsData: PackageTermsDTO = this.packageTermsAdapter.convertEntityToDto(packageTermsEntities);
              if (packageTermsData) {
                  const response = new PackageTermsResponseModel(true, 11101 , 'Package Terms retrived Successfully',packageTermsData);
                  return response;
              }
              else{
                  throw new PackageTermsResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
         } catch (err) {
            throw err;
        }
  }

  async getPackageTermsById(packageTermsId: number): Promise<PackageTerms> {
        const Response = await this.packageTermsRepository.findOne({
        where: {packageTermsId: packageTermsId},
        });
        if (Response) {
        return Response;
        } else {
        return null;
        }
    }

    async getAllPackageTermsDropDown(): Promise<PackageTermsDropDownResponseModel> {
        try {
            const packageTermsDTO: PackageTermsDropDownDto[] = [];
            const packageTermsEntities: PackageTerms[] = await this.packageTermsRepository.find({ select: ['packageTermsId', 'packageTermsName'], where: { isActive: true }, order: {packageTermsName: 'ASC' } });
            if (packageTermsEntities && packageTermsEntities.length > 0) {
                packageTermsEntities.forEach(packageTermsEntity => {
                    packageTermsDTO.push(new PackageTermsDropDownDto(packageTermsEntity.packageTermsId, packageTermsEntity.packageTermsName));
                });
                const response = new PackageTermsDropDownResponseModel(true, 11108, "packageTerms retrieved successfully", packageTermsDTO);
                return response;
            } else {
                throw new PackageTermsResponseModel(false,99998, 'Data not found');
            }
        } catch (err) {
            throw err;
        }
    }


    async getAllVendorPackageTermsDropDown(): Promise<PackageTermsDropDownResponseModel> {
        try {
            const packageTermsDTO: PackageTermsDropDownDto[] = [];
            const packageTermsEntities: PackageTerms[] = await this.packageTermsRepository.find({ select: ['packageTermsId', 'packageTermsName'], where: { isActive: true }, order: {packageTermsName: 'ASC' } });
            if (packageTermsEntities && packageTermsEntities.length > 0) {
                packageTermsEntities.forEach(packageTermsEntity => {
                    packageTermsDTO.push(new PackageTermsDropDownDto(packageTermsEntity.packageTermsId, packageTermsEntity.packageTermsName));
                });
                const response = new PackageTermsDropDownResponseModel(true, 11108, "packageTerms retrieved successfully", packageTermsDTO);
                return response;
            } else {
                throw new PackageTermsResponseModel(false,99998, 'Data not found');
            }
        } catch (err) {
            throw err;
        }
    }

      
}


