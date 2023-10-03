import { Injectable } from '@nestjs/common';
import { FactoryResponseModel } from 'packages/libs/shared-models/src/common/factory/factory-response-objects';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object'
import { DataSource, EntityManager, Not } from 'typeorm';
import { AllFactoriesResponseModel, CommonResponseModel, FactoryActivateDeactivateDto, FileStatusReq, FileTypeDto, FactoryDto as NewFactoriesDto, NewFilterDto, PriceListColumns, PriceListDto, PriceListModel, PriceListResponseModel, TrimOrderColumns } from '@project-management-system/shared-models';
import { PriceListAdapter } from './adapters/pricelist.adapter';
import { pricListRepository } from './repository/pricelist.repositiry';
import { PriceListEntity } from './entities/pricelist.entity';
import { priceListDto } from './dto/pricelist.dto';
import { GenericTransactionManager } from '../../typeorm-transactions';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { priceListExcelDto } from './dto/price-list-excel-dto';
import { FileUploadRepository } from '../orders/repository/upload.repository';
import { FileUploadEntity } from '../orders/entities/upload-file.entity';
import { UploadPriceListEntity } from './entities/upload-price-list-entity';
import { UploadPriceListRepository } from './repository/upload-price-list-repository';
import { PriceListExcelAdapter } from './adapters/excel-price-list.adapter';
import { PriceListChildRepository } from './repository/price-list-child-repo';
import { PriceListChildEntity } from './entities/price-list-child-entity';
import { PriceListChildExcelAdapter } from './adapters/excel-price-list-child.adapter';

@Injectable()
export class priceListService {
    constructor(
        private adaptor: PriceListAdapter,
        private priceListAdapter : PriceListExcelAdapter,
        private priceRepository: pricListRepository,
        private uploadPriceRepo: UploadPriceListRepository,
        private priceListChildRepo : PriceListChildRepository,
        private priceListChildAdapter : PriceListChildExcelAdapter,
        @InjectDataSource()
        private dataSource: DataSource,
        @InjectEntityManager() private readonly entityManager: EntityManager
    ) { }

    // async createPriceList(req: priceListDto,isUpdate: boolean): Promise<PriceListResponseModel> {
    //     try {
            
    //         let previousValue
    //         if (!isUpdate) {
    //             const data = await this.priceRepository.findOne({
    //                 where:{style : req.style}})
    //                 if (data) {
    //                     throw new PriceListResponseModel(false,11104, 'details already exists');
    //                   }
    //         }
    //         else{
    //             const previous = await this.priceRepository.findOne({where:{style:req.style}})
    //             previousValue = previous.style
    //              console.log(previousValue,"new dataa")
    //             if(!previous){
    //                 throw new ErrorResponse(0,'Given data not exist')
    //             }
    //         }
    //         const converteddata : PriceListEntity = this.adaptor.convertDtoToEntity(req,isUpdate)
    //         const saveStyle :PriceListEntity = await this.priceRepository.save(converteddata)
    //         const savepricedto: priceListDto = this.adaptor.convertEntityToDto(converteddata)

    //         if (savepricedto){
    //             const presentvalue = savepricedto.style;
    //             const response = new PriceListResponseModel(true,1,isUpdate? 'Price List Updated Successfully': 'Price List Created Successfully');
    //             const name = isUpdate?'updated':'created'
    //             const displayValue = isUpdate? 'Price List Updated Successfully': 'Price List Created Successfully'
    //             const userName = isUpdate?savepricedto.updatedUser:savepricedto.createdUser;
    //             return response
    //         }else {
    //             throw new PriceListResponseModel(false,11106,'Price List saved but issue while transforming into DTO');
    //           }
    //     } catch (error) {
    //         console.error(error);
    //         throw new ErrorResponse(500, 'An error occurred');
    //     }
    // }
    
    // async createPriceList(req: priceListDto, isUpdate: boolean): Promise<PriceListResponseModel> {
    //     try {
    //         let previousValue;
    
    //         if (!isUpdate) {
    //             const data = await this.priceRepository.findOne({
    //                 where: { style: req.style, destination: req.destination }
    //             });
    
    //             if (data) {
    //                 throw new PriceListResponseModel(false, 11104, 'Price list for this style and destination already exists');
    //             }
    //         } else {
    //             const previous = await this.priceRepository.findOne({ where: { style: req.style } });
    //             previousValue = previous.style;
    
    //             if (!previous) {
    //                 throw new ErrorResponse(0, 'Given data does not exist');
    //             }
    //         }
    
    //         const converteddata: PriceListEntity = this.adaptor.convertDtoToEntity(req, isUpdate);
    //         const saveStyle: PriceListEntity = await this.priceRepository.save(converteddata);
    //         const savepricedto: priceListDto = this.adaptor.convertEntityToDto(converteddata);
    
    //         if (savepricedto) {
    //             const presentvalue = savepricedto.style;
    //             const response = new PriceListResponseModel(true, 1, isUpdate ? 'Price List Updated Successfully' : 'Price List Created Successfully');
    //             const name = isUpdate ? 'updated' : 'created';
    //             const displayValue = isUpdate ? 'Price List Updated Successfully' : 'Price List Created Successfully';
    //             const userName = isUpdate ? savepricedto.updatedUser : savepricedto.createdUser;
    //             return response;
    //         } else {
    //             throw new PriceListResponseModel(false, 11106, 'Price List saved but there was an issue while transforming it into DTO');
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         throw new ErrorResponse(500, 'An error occurred');
    //     }
    // }

    async createPriceList(req: priceListDto, isUpdate: boolean): Promise<PriceListResponseModel> {
        try {
            let previousValue;

    
            if (!isUpdate) {
                const data = await this.priceRepository.findOne({
                    where: { sampleCode: req.sampleCode, business: req.business }
                });
                if (data) {
                    throw new PriceListResponseModel(false, 11104, 'Price list for this style and destination already exists');
                }
            } else {
                const existingRecord = await this.priceRepository.findOne({ where: { id: req.id } });
    
                if (!existingRecord) {
                    throw new ErrorResponse(0, 'Given data does not exist');
                }
                const duplicateRecord = await this.priceRepository.findOne({
                    where: {
                        id: Not(req.id), 
                        sampleCode: req.sampleCode,
                        business: req.business
                    }
                });
    
                if (duplicateRecord) {
                    throw new PriceListResponseModel(false, 11104, 'Price list for this style and destination already exists');
                }
    
                existingRecord.business = req.business;
                existingRecord.year = req.year;
                existingRecord.seasonCode = req.seasonCode;
                existingRecord.currency = req.currency;
                existingRecord.fobLocalCurrency = req.fobLocalCurrency;
                existingRecord.item = req.item;

    
                await this.priceRepository.save(existingRecord);
            }
    
    
            const converteddata: PriceListEntity = this.adaptor.convertDtoToEntity(req, isUpdate);
            const saveStyle: PriceListEntity = await this.priceRepository.save(converteddata);
            const savepricedto: priceListDto = this.adaptor.convertEntityToDto(converteddata);
    
            if (savepricedto) {
                const presentvalue = savepricedto.sampleCode;
                const response = new PriceListResponseModel(true, 1, isUpdate ? 'Price List Updated Successfully' : 'Price List Created Successfully');
                const name = isUpdate ? 'updated' : 'created';
                const displayValue = isUpdate ? 'Price List Updated Successfully' : 'Price List Created Successfully';
                const userName = isUpdate ? savepricedto.updatedUser : savepricedto.createdUser;
                return response;
            } else {
                throw new PriceListResponseModel(false, 11106, 'Price List saved but there was an issue while transforming it into DTO');
            }
        } catch (error) {
            throw new ErrorResponse(500, 'An error occurred');
        }
    } 
    //this is the new code working for preventing create for the new record  but updating already existed data

    // async createPriceList(req: priceListDto, isUpdate: boolean): Promise<PriceListResponseModel> {
    //     try {
    //         let previousValue;
    //         if (!isUpdate) {
    //             const existingRecord = await this.priceRepository.findOne({
    //                 where: { style: req.style, destination: req.destination }
    //             });
    //             if (existingRecord) {
    //                 throw new PriceListResponseModel(false, 11104, 'Price list for this style and destination already exists');
    //             }
    //         } else {
    //             const existingRecord = await this.priceRepository.findOne({ where: { id: req.id } });
    
    //             if (!existingRecord) {
    //                 throw new ErrorResponse(0, 'Given data does not exist');
    //             }
    
    //             const duplicateRecord = await this.priceRepository.findOne({
    //                 where: {
    //                     id: Not(req.id), 
    //                     style: req.style,
    //                     destination: req.destination
    //                 }
    //             });
    
    //             if (duplicateRecord) {
    //                 throw new PriceListResponseModel(false, 11104, 'Price list for this style and destination already exists');
    //             }
    
    //             existingRecord.destination = req.destination;
    //             existingRecord.year = req.year;
    //             existingRecord.seasonCode = req.seasonCode;
    //             existingRecord.currency = req.currency;
    //            existingRecord.price = req.price;
    //            existingRecord.item = req.item;
    //            console.log(existingRecord,'--existingRecord')
    
    //             await this.priceRepository.save(existingRecord);
    //             if(existingRecord){
    //                 return new PriceListResponseModel(true, 1, isUpdate ? 'Price List Updated Successfully' : 'Price List Created Successfully');

    //             } else{
    //                 return new PriceListResponseModel(false, 1, 'Something went wrong');

    //             }
    //         }
    
    
    //     } catch (error) {
    //         console.error(error);
    //         throw new ErrorResponse(500, 'An error occurred');
    //     }
    // }
    

    async getAllPriceList(req?:NewFilterDto): Promise<PriceListResponseModel> {
        const details = await this.priceRepository.getPriceListData(req);
        let info =[];
        if (details.length > 0) {
            for(const rec of details){
                info.push(new PriceListModel(rec.id,rec.sampleCode,rec.year,rec.business,rec.seasonCode,rec.fobLocalCurrency,rec.currency,rec.item,rec.created_user,rec.is_active,rec.version_flag,rec.updated_user))
            }
            return new PriceListResponseModel(true, 1, 'data retrieved', info)
        } else {
            return new PriceListResponseModel(false, 0, 'data not found')
        }
    }
    

    async ActivateOrDeactivatePriceList(req: priceListDto): Promise<PriceListResponseModel> {
        try {
            const operationExists = await this.getPriceListById(req.id);
            if (operationExists) {
                if (!operationExists) {
                    throw new ErrorResponse(10113, 'Someone updated the current PriceList information.Refresh and try again');
                } else {
    
                    const operationStatus = await this.priceRepository.update(
                        { id: req.id },
                        { isActive: req.isActive, updatedUser: req.updatedUser });
                    if (operationExists.isActive) {
                        if (operationStatus.affected) {
                            console.log(operationStatus.affected,"effected")

                            const operationResponse: PriceListResponseModel = new PriceListResponseModel(true, 10115, 'PriceList is de-activated successfully');
                            return operationResponse;
                        } else {
                            throw new PriceListResponseModel(false,10111, 'PriceList is already deactivated');
                        }
                    } else {
                        if (operationStatus.affected) {
                            const brandResponse: PriceListResponseModel = new PriceListResponseModel(true, 10114, 'PriceList is activated successfully');
                            return brandResponse;
                        } else {
                            throw new PriceListResponseModel(false,10112, 'PriceList is already  activated');
                        }
                    }
                    // }
                }
            } else {
                throw new PriceListResponseModel(false,99998, 'No Records Found');
            }
        } catch (err) {
            return err;
        }
    }





async getActivePriceListId(req: priceListDto): Promise<PriceListResponseModel> {
    try {
        const PriceEntities: PriceListEntity = await this.priceRepository.findOne({
          where:{id:req.id}
          });
          
          const Data: priceListDto = this.adaptor.convertEntityToDto(PriceEntities);
          if (Data) {
              const response = new PriceListResponseModel(true, 11101 , 'Brands retrived Successfully',);
              return response;
          }
          else{
              throw new PriceListResponseModel(false,11106,'Something went wrong');
          }
          
    } catch (err) {
        return err;
    }
}
   


async getAllActivePriceList(): Promise<PriceListResponseModel> {
   
    try {
        const PriceListDto: PriceListModel[] = [];
        const PriceEntities: PriceListEntity[] = await this.priceRepository.find({ order: { 'sampleCode': 'ASC' },where:{isActive:true}
       });
        if (PriceEntities) {
          
            PriceEntities.forEach((Entity) => {
              
                const convertedBrandsDtos: priceListDto = this.adaptor.convertEntityToDto(
                  Entity
                );
                PriceListDto.push(convertedBrandsDtos);
            });
            const response = new PriceListResponseModel(true, 11108, "Brands retrieved successfully",PriceListDto);
            return response;
        } else {
            throw new PriceListResponseModel(false,99998, 'Data not found'); 
        }
    } catch (err) {
        return err;
    }
}

   

    async getPriceListById(id: number): Promise<PriceListEntity> {
            const Response = await this.priceRepository.findOne({
            where: {id: id},
            });
            if (Response) {
            return Response;
            } else {
            return null;
            }
        }

        async getAllPriceListStyles(): Promise<CommonResponseModel> {
            const details = await this.priceRepository.getSampleCode();
           
            if (details.length > 0) {
                
                return new CommonResponseModel(true, 1, 'data retrived', details)
            } else {
                return new CommonResponseModel(false, 0, 'data not found')
            }
        }
        async getAllPriceListDestination(): Promise<CommonResponseModel> {
            const details = await this.priceRepository.getBusiness();
           
            if (details.length > 0) {
                
                return new CommonResponseModel(true, 1, 'data retrived', details)
            } else {
                return new CommonResponseModel(false, 0, 'data not found')
            }
        }
        async getAllPriceListYear(): Promise<CommonResponseModel> {
            const details = await this.priceRepository.getYear();
           
            if (details.length > 0) {
                
                return new CommonResponseModel(true, 1, 'data retrived', details)
            } else {
                return new CommonResponseModel(false, 0, 'data not found')
            }
        }
        async getAllPriceListCurrency(): Promise<CommonResponseModel> {
            const details = await this.priceRepository.getCurrency();
           
            if (details.length > 0) {
                
                return new CommonResponseModel(true, 1, 'data retrived', details)
            } else {
                return new CommonResponseModel(false, 0, 'data not found')
            }
        }

        async getAllPriceListSeasonCode(): Promise<CommonResponseModel> {
            const details = await this.priceRepository.getAllPriceListSeasonCode();
           
            if (details.length > 0) {
                
                return new CommonResponseModel(true, 1, 'data retrived', details)
            } else {
                return new CommonResponseModel(false, 0, 'data not found')
            }
        }

        async savePriceListData(formData: any,id: number): Promise<CommonResponseModel> {
            const transactionManager = new GenericTransactionManager(this.dataSource);
            try {
                await transactionManager.startTransaction();
                const flag = new Set();
                const columnArray = [];
                const updatedArray = formData.map((obj) => {
                    const updatedObj = {};
                    for (const key in obj) {
                        const newKey = key.replace(/\s/g, '_').replace(/[\(\)\.]/g, '').replace(/-/g, '_');
                        columnArray.push(newKey);
                        updatedObj[newKey] = obj[key];
                    }
                    return updatedObj;
                });
                const difference = columnArray.filter((element) => !PriceListColumns.includes(element));
                if (difference.length > 0) {
                    await transactionManager.releaseTransaction();
                    return new CommonResponseModel(false, 1110, `Excel columns doesn't match. Please attach the correct file.`);
                }
                const convertedData = updatedArray.map((obj) => {
                    const updatedObj = {};
                    for (const key in obj) {
                        const value = obj[key];
                        if (value === "") {
                            updatedObj[key] = null;
                        } else {
                            updatedObj[key] = value;
                        }
                    }
                    return updatedObj;
                });
                for (const data of convertedData) {
                    let dtoData;
                    if (data.Sample_Code != null) {
                        dtoData = new priceListExcelDto(null,data.Year, data.Season, data.Item, data.Sample_Code, data.Business, data.FOBLocal_Currency, data.Currency, 'Bidhun', null, null,id);
                    } else {
                        break;
                    }
                    if (dtoData.sampleCode != null) {
                        const details = await this.priceRepository.findOne({
                            where: { sampleCode: dtoData.sampleCode, seasonCode: dtoData.seasonCode, year: dtoData.year }
                        });
                        const versionDetails = await this.priceListChildRepo.getVersion(dtoData.sampleCode, dtoData.seasonCode,dtoData.year);
                        let version = 1;
                        if (versionDetails.length > 0) {
                            version = Number(versionDetails.length) + 1;
                        }
                        dtoData.version = version;
                        if (details) {
                            const updatePriceList = await transactionManager.getRepository(PriceListEntity).update({sampleCode: dtoData.sampleCode,seasonCode: dtoData.seasonCode,year: dtoData.year}, 
                                {
                                year: dtoData.year,
                                seasonCode: dtoData.seasonCode,
                                item: dtoData.item,
                                business: dtoData.business,
                                fobLocalCurrency: dtoData.fobLocalCurrency,
                                currency: dtoData.currency,
                                createdUser: dtoData.createdUser,
                                updatedUser: dtoData.updatedUser,
                                version: dtoData.version, fileId: dtoData.fileId
                            });
                            if (!updatePriceList.affected) {
                                await transactionManager.releaseTransaction();
                                return new CommonResponseModel(false, 0, 'Something went wrong in Price List update');
                            }
                            const convertedExcelEntity: Partial<PriceListChildEntity> = this.priceListChildAdapter.convertDtoToEntity(dtoData, id);
                        const saveExcelEntity: PriceListChildEntity = await transactionManager.getRepository(PriceListChildEntity).save(convertedExcelEntity);
                        } else {
                            dtoData.version = 1;
                            const convertedExcelEntity: Partial<PriceListEntity> = this.priceListAdapter.convertDtoToEntity(dtoData,id);
                            const saveExcelEntity: PriceListEntity = await transactionManager.getRepository(PriceListEntity).save(convertedExcelEntity);
                            const convertedChildExcelEntity: Partial<PriceListChildEntity> = this.priceListChildAdapter.convertDtoToEntity(dtoData, id);
                        const saveChildExcelEntity: PriceListChildEntity = await transactionManager.getRepository(PriceListChildEntity).save(convertedChildExcelEntity);
                            if (!saveExcelEntity || !saveChildExcelEntity) {
                                flag.add(false);
                                await transactionManager.releaseTransaction();
                                break;
                            }
                        }
                    } else {
                        break;
                    }
                }
        
                if (!flag.has(false)) {
                    await transactionManager.completeTransaction();
                    return new CommonResponseModel(true, 1, 'Data saved successfully');
                } else {
                    await transactionManager.releaseTransaction();
                    return new CommonResponseModel(false, 0, 'Something went wrong');
                }
            } catch (error) {
                await transactionManager.releaseTransaction();
                return new CommonResponseModel(false, 0, error);
            }
        }


        async updatePath(filePath: string, filename: string): Promise<CommonResponseModel> {
            const entity = new UploadPriceListEntity()
            entity.fileName = filename;
            entity.filePath = filePath;
            entity.status = 'uploading';
            const file = await this.uploadPriceRepo.findOne({ where: { fileName: filename, isActive: true } })
            if (file) {
                return new CommonResponseModel(false, 0, 'File with same name already uploaded');
            } else {
                const save = await this.uploadPriceRepo.save(entity)
                if (save) {
                    return new CommonResponseModel(true, 1, 'uploaded successfully', save);
                }
                else {
                    return new CommonResponseModel(false, 0, 'uploaded failed', save);
                }
            }
        }

        async updateFileStatus(req: FileStatusReq): Promise<CommonResponseModel> {
            let update
            if (req.status === 'Failed') {
                update = await this.uploadPriceRepo.update({ id: req.fileId }, { status: req.status, isActive: false, createdUser: req.userName });
            } else {
                update = await this.uploadPriceRepo.update({ id: req.fileId }, { status: req.status, createdUser: req.userName })
            }
            if (update.affected) {
                return new CommonResponseModel(true, 1, 'updated successfully');
            } else {
                return new CommonResponseModel(false, 0, 'update failed');
    
            }
        }


        async getUploadFilesData(): Promise<CommonResponseModel> {
            try {
                const data = await this.uploadPriceRepo.getFilesData();
                if (data.length > 0) {
                    return new CommonResponseModel(true, 1, 'Uploaded files data retrieved successfully', data);
                } else {
                    return new CommonResponseModel(false, 0, 'No data found', data);
                }
            } catch (error) {
                return new CommonResponseModel(false, 0, 'An error occurred while retrieving data', null);
            }
        }

        async getPriceHistory(): Promise<CommonResponseModel> {
            try {
                const data = await this.priceListChildRepo.getPriceHistory();
                if (data.length > 0) {
                    return new CommonResponseModel(true, 1, 'Data retrieved successfully', data);
                } else {
                    return new CommonResponseModel(false, 0, 'No data found', data);
                }
            } catch (error) {
                return new CommonResponseModel(false, 0, 'An error occurred while retrieving data', null);
            }
        }
        
        

}
