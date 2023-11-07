import { Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Raw, Repository } from 'typeorm';
import { MasterBrandAdapter } from './dto/master-brands.adapter';
import { MasterBrandRequest } from './dto/master-brands.request';
import {  AllBrandsResponseModel, MasterBrandsResponseModel, UploadResponse } from '@project-management-system/shared-models';
import axios from 'axios';
import { truncate } from 'fs';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { Brands } from './master-brands.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { BrandsDTO } from './dto/master-brands.dto';
import { MasterBrandsDto } from 'packages/libs/shared-models/src/common/master-brands/master-request';



@Injectable()
export class MasterBrandsService {
    constructor(
      
        @InjectRepository(Brands)
        private masterBrandsRepository: Repository<Brands>,
        private masterBrandsAdapter: MasterBrandAdapter,
    ){}

    async getMasterBrandWithoutRelations(brandName: string): Promise<Brands> {
        //  console.log(employeeId);
        const response = await this.masterBrandsRepository.findOne({
            where: { brandId: Raw(alias => `brand_name = "${brandName}"`) },
        });
        // console.log(response);
        if (response) {
            return response;
        } else {
            return null;
        }
    }
    async createMasterBrand(dto: BrandsDTO, isUpdate: boolean): Promise<MasterBrandsResponseModel> {
      console.log(dto,'service');
      
      try {
        let previousValue;
          const entity = await this.masterBrandsRepository.findOne({ where: { brandName: dto.brandName } });
          if (entity) {
            throw new MasterBrandsResponseModel(false, 11104, 'Brand already exists');
          }
          if(isUpdate){
          const certificatePrevious = await this.masterBrandsRepository.findOne({ where: { brandId: dto.brandId } });
          if (!certificatePrevious) {
            throw new ErrorResponse(0, 'Given Brand does not exist');
          }
          previousValue = certificatePrevious.brandName;
        }
        const converted: Brands = this.masterBrandsAdapter.convertDtoToEntity(dto, isUpdate);
        const savedEntity: Brands = await this.masterBrandsRepository.save(converted);
        const savedDto: MasterBrandsDto = this.masterBrandsAdapter.convertEntityToDto(savedEntity);
        
        if (savedDto) {
          const response = new MasterBrandsResponseModel(true, 1, isUpdate ? 'Brand Updated Successfully' : 'Brand Created Successfully',[savedDto]);
          return response;
        } else {
          throw new MasterBrandsResponseModel(false, 11106, 'Brand saved but issue while transforming into DTO');
        }
      } catch (error) {
        return error;
      }
    }
    // async createMasterBrand(masterBrandsDto: BrandsDTO, isUpdate: boolean): Promise<MasterBrandsResponseModel> {
    //     console.log(masterBrandsDto,'nnnnnh');
        
    //     try {
    //       let previousValue
    //       // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
    //       if (!isUpdate) {
    //         const masterBrandsEntity = await this.getMasterBrandWithoutRelations(masterBrandsDto.brandName);
    //         if (masterBrandsEntity) {
    //           //return new InformationMessageError(11104, "State already exists");
    //           throw new MasterBrandsResponseModel(false,11104, 'Brand already exists');
    //         }
    //       }
    //       else{
    //         const certificatePrevious = await this.masterBrandsRepository.findOne({where:{brandId:masterBrandsDto.brandId}})
    //         previousValue = certificatePrevious.brandName
    //         const masterBrandsEntity = await this.getMasterBrandWithoutRelations(masterBrandsDto.brandName);
    //         if (masterBrandsEntity) {
    //           if(masterBrandsEntity.brandId!=masterBrandsDto.brandId) {
    //             throw new MasterBrandsResponseModel(false,11104, 'Brand already exists');      
    //           }
    //         }
    //       }
    //       const convertedBrandEntity: Brands = this.masterBrandsAdapter.convertDtoToEntity(masterBrandsDto,isUpdate);
    //       const savedCurrencyEntity: Brands = await this.masterBrandsRepository.save(
    //         convertedBrandEntity
    //       );
    //       const savedBrandsDto: BrandsDTO = this.masterBrandsAdapter.convertEntityToDto(convertedBrandEntity);
    //         // console.log(savedStateDto);
    //       if (savedBrandsDto) {
    //         const presentValue = savedBrandsDto.brandName;
    //        // generating resposnse
    //        const response = new MasterBrandsResponseModel(true,1,isUpdate? 'Brand Updated Successfully': 'Brand Created Successfully');
    //        const name=isUpdate?'updated':'created'
    //        const displayValue = isUpdate? 'Brand Updated Successfully': 'Brand Created Successfully'
    //        const userName = isUpdate? savedBrandsDto.updatedUser :savedBrandsDto.createdUser;
    //       //  const newLogDto = new LogsDto(1,name, 'Currencies', savedBrandsDto.currencyId, true, displayValue,userName,previousValue,presentValue)
    //       //  let res = await this.logService.createLog(newLogDto);
    //       //  console.log(res);
    //        return response
    //       } else {
    //         //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
    //         throw new MasterBrandsResponseModel(false,11106,'Brand saved but issue while transforming into DTO');
    //       }
    //     } catch (error) {
    //       // when error occures while saving the data , the execution will come to catch block.
    //       // tslint:disable-next-line: typedef
    //       return  new MasterBrandsResponseModel(false,11108,'Brand is not created due to invalid file');
    //     }
    //   }  
  
      async getAllBrands(req?:UserRequestDto): Promise<AllBrandsResponseModel> {
        // const page: number = 1;
        try {
          const BrandsDtos: BrandsDTO[] = [];
          //retrieves all companies
          const MasterBrandsEntities: Brands[] = await this.masterBrandsRepository.find({order :{'brandName':'ASC'}});
          //console.log(statesEntities);
          if (MasterBrandsEntities) {
            // converts the data fetched from the database which of type companies array to type StateDto array.
            MasterBrandsEntities.forEach(CurrencyEntity => {
              const convertedCurrenciesDto: BrandsDTO = this.masterBrandsAdapter.convertEntityToDto(
                CurrencyEntity
              );
              BrandsDtos.push(convertedCurrenciesDto);
            });
            const response = new AllBrandsResponseModel(true,1,'Brands retrieved successfully',BrandsDtos);
            // if(req?.createdUser){
            //   const newLogDto = new LogsDto(0,'view', 'Currencies', 0, true, 'Currencies retrieved successfully',req.createdUser,"","")
            //   let res = await this.logService.createLog(newLogDto);
            //   console.log(res);
            // }
            return response;
          } else {
            throw new MasterBrandsResponseModel(false,99998, 'Data not found');
          }
          
        } catch (err) {
          return err;
        }
      }

  
      async getAllActiveBrands(): Promise<AllBrandsResponseModel> {
        // const page: number = 1;
        try {
            const masterBrandsDto: BrandsDTO[] = [];
            //retrieves all companies
            const MasterBrandEntities: Brands[] = await this.masterBrandsRepository.find({ order: { 'brandName': 'ASC' },where:{isActive:true}
           });
         console.log(MasterBrandEntities)
            if (MasterBrandEntities) {
                // converts the data fetched from the database which of type companies array to type StateDto array.
                MasterBrandEntities.forEach(countriesEntity => {
                    const convertedBrandsDtos: BrandsDTO = this.masterBrandsAdapter.convertEntityToDto(
                      countriesEntity
                    );
                    masterBrandsDto.push(convertedBrandsDtos);
                });
                const response = new AllBrandsResponseModel(true, 11108, "Brands retrieved successfully", masterBrandsDto);
                return response;
            } else {
                throw new MasterBrandsResponseModel(false,99998, 'Data not found'); masterBrandsDto
            }
        } catch (err) {
            return err;
        }
    }

  async activateOrDeactivatebrand(brandReq: MasterBrandRequest): Promise<MasterBrandsResponseModel> {
    try {
      console.log(brandReq.isActive,'service-----------')
        const brandExists = await this.getBrandById(brandReq.brandId);
        if (brandExists) {
            if (!brandExists) {
                throw new ErrorResponse(10113, 'Someone updated the current brand information.Refresh and try again');
            } else {

                const brandStatus = await this.masterBrandsRepository.update(
                    { brandId: brandReq.brandId },
                    { isActive: brandReq.isActive, updatedUser: brandReq.updatedUser });
                if (brandExists.isActive) {
                    if (brandStatus.affected) {
                        const brandResponse: MasterBrandsResponseModel = new MasterBrandsResponseModel(true, 10115, 'Brand is de-activated successfully');
                        return brandResponse;
                    } else {
                        throw new MasterBrandsResponseModel(false,10111, 'Brand is already deactivated');
                    }
                } else {
                    if (brandStatus.affected) {
                        const brandResponse: MasterBrandsResponseModel = new MasterBrandsResponseModel(true, 10114, 'Brand is activated successfully');
                        return brandResponse;
                    } else {
                        throw new MasterBrandsResponseModel(false,10112, 'Brand is already  activated');
                    }
                }
                // }
            }
        } else {
            throw new MasterBrandsResponseModel(false,99998, 'No Records Found');
        }
    } catch (err) {
        return err;
    }
}
      async getActiveBrandsById(BrandReq: MasterBrandRequest): Promise<MasterBrandsResponseModel> {
        try {
            //retrieves all companies
            const masterBrandsEntities: Brands = await this.masterBrandsRepository.findOne({
              where:{brandId:BrandReq.brandId}
              });
              
              const BrandsData: BrandsDTO = this.masterBrandsAdapter.convertEntityToDto(masterBrandsEntities);
              if (BrandsData) {
                  const response = new MasterBrandsResponseModel(true, 11101 , 'Brands retrived Successfully',[BrandsData]);
                  return response;
              }
              else{
                  throw new MasterBrandsResponseModel(false,11106,'Something went wrong');
              }
              // generating resposnse
        } catch (err) {
            return err;
        }
    }

    async getBrandById(brandId: number): Promise<Brands> {
        //  console.log(employeeId);
            const Response = await this.masterBrandsRepository.findOne({
            where: {brandId: brandId},
            });
            // console.log(employeeResponse);
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }
        async updatePath(filePath: string, fileName: string, id: number): Promise<UploadResponse>{
          try {
            console.log("coming ra mawa")
            console.log(id)
            let imagePathUpdate;
            imagePathUpdate = await this.masterBrandsRepository.update(
              { brandId: id },
              { filePath: filePath, fileName: fileName },
            );
            const result = await this.masterBrandsRepository.findOne({ where: { brandId: id } })
            console.log('*****result*****', result)
            if (imagePathUpdate.affected > 0) {
                return new UploadResponse(true, 11, 'Uploaded successfully', filePath);
            }
            else {
                return new UploadResponse(false, 11, 'Uploaded failed', filePath);
            }
        }
        catch (error) {
            console.log(error);
        }
        }
        
 
}
