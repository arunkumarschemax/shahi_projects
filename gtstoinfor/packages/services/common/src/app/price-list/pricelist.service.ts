import { Injectable } from '@nestjs/common';
import { FactoryResponseModel } from 'packages/libs/shared-models/src/common/factory/factory-response-objects';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object'
import { DataSource, EntityManager, Not } from 'typeorm';
import { AllFactoriesResponseModel, CommonResponseModel, FactoryActivateDeactivateDto, FactoryDto as NewFactoriesDto, NewFilterDto, PriceListColumns, PriceListDto, PriceListModel, PriceListResponseModel, TrimOrderColumns } from '@project-management-system/shared-models';
import { PriceListAdapter } from './adapters/pricelist.adapter';
import { pricListRepository } from './repository/pricelist.repositiry';
import { PriceListEntity } from './entities/pricelist.entity';
import { priceListDto } from './dto/pricelist.dto';
import { GenericTransactionManager } from '../../typeorm-transactions';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { priceListExcelDto } from './dto/price-list-excel-dto';

@Injectable()
export class priceListService {
    constructor(
        private adaptor: PriceListAdapter,
        private priceRepository: pricListRepository,
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

    // async createPriceList(req: priceListDto, isUpdate: boolean): Promise<PriceListResponseModel> {
    //     try {
    //         let previousValue;
    //         console.log(isUpdate,"eee")

    
    //         if (!isUpdate) {
    //             const data = await this.priceRepository.findOne({
    //                 where: { style: req.style, destination: req.destination }
    //             });
    //             console.log(data,"reseee")
    //             if (data) {
    //                 throw new PriceListResponseModel(false, 11104, 'Price list for this style and destination already exists');
    //             }
    //         } else {
    //             const existingRecord = await this.priceRepository.findOne({ where: { id: req.id } });
    
    //             if (!existingRecord) {
    //                 throw new ErrorResponse(0, 'Given data does not exist');
    //             }
    
    //             existingRecord.destination = req.destination;
    //             existingRecord.year = req.year;
    //             existingRecord.seasonCode = req.seasonCode;
    //             existingRecord.currency = req.currency;
    
    //             await this.priceRepository.save(existingRecord);
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
    // } this is the new code working for preventing create for the new record 

    async createPriceList(req: priceListDto, isUpdate: boolean): Promise<PriceListResponseModel> {
        try {
            let previousValue;
    
            if (!isUpdate) {
                const existingRecord = await this.priceRepository.findOne({
                    where: { style: req.style, destination: req.destination }
                });
                if (existingRecord) {
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
                        style: req.style,
                        destination: req.destination
                    }
                });
    
                if (duplicateRecord) {
                    throw new PriceListResponseModel(false, 11104, 'Price list for this style and destination already exists');
                }
    
                existingRecord.destination = req.destination;
                existingRecord.year = req.year;
                existingRecord.seasonCode = req.seasonCode;
                existingRecord.currency = req.currency;
    
                await this.priceRepository.save(existingRecord);
            }
    
            return new PriceListResponseModel(true, 1, isUpdate ? 'Price List Updated Successfully' : 'Price List Created Successfully');
    
        } catch (error) {
            console.error(error);
            throw new ErrorResponse(500, 'An error occurred');
        }
    }
    

    async getAllPriceList(req?:NewFilterDto): Promise<PriceListResponseModel> {
        const details = await this.priceRepository.getPriceListData(req);
        let info =[];
        if (details.length > 0) {
            for(const rec of details){
                info.push(new PriceListModel(rec.id,rec.style,rec.YEAR,rec.destination,rec.season_code,rec.price,rec.currency,rec.created_user,rec.is_active,rec.version_flag,rec.updated_user))
            }
            return new PriceListResponseModel(true, 1, 'data retrived', info)
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
        const PriceEntities: PriceListEntity[] = await this.priceRepository.find({ order: { 'style': 'ASC' },where:{isActive:true}
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
            const details = await this.priceRepository.getStyle();
           
            if (details.length > 0) {
                
                return new CommonResponseModel(true, 1, 'data retrived', details)
            } else {
                return new CommonResponseModel(false, 0, 'data not found')
            }
        }
        async getAllPriceListDestination(): Promise<CommonResponseModel> {
            const details = await this.priceRepository.getDestination();
           
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

        // async savePriceListData(formData: any, id: number, month: number): Promise<CommonResponseModel> {
        //     const transactionManager = new GenericTransactionManager(this.dataSource)
        //     try {
        //         await transactionManager.startTransaction()
        //         const flag = new Set()
        //         const columnArray = [];
        //         const updatedArray = formData.map((obj) => {
        //             const updatedObj = {};
        //             for (const key in obj) {
        //                     const newKey = key.replace(/\s/g, '_').replace(/[\(\)\.]/g, '').replace(/-/g, '_');
        //                     columnArray.push(newKey)
        //                     updatedObj[newKey] = obj[key];
        //             }
        //             return updatedObj;
        //         });
    
        //         const convertedData = updatedArray.map((obj) => {
        //             const updatedObj = {};
        //             for (const key in obj) {
        //                 const value = obj[key];
        //                 if (value === "") {
        //                     updatedObj[key] = null;
        //                 } else {
        //                     updatedObj[key] = value;
        //                 }
        //             }
        //             return updatedObj;
        //         });
        //         const difference = columnArray.filter((element) => !PriceListColumns.includes(element));
        //         if(difference.length > 0){
        //             await transactionManager.releaseTransaction()
        //             return new CommonResponseModel(false,1110,'Please Upload Correct Excel')
        //         }
        //         for (const data of convertedData) {
        //             let dtoData
        //             if(data.style != null){
        //                 dtoData = new priceListExcelDto(data.year,data.seasonCode,data.item,data.style,data.destination,data.price,data.currency,'Bidhun',null,null,null,null)
        //             }else{
        //                 break;
        //             }
        //             if (dtoData.style != null) {
        //                 const details = await this.priceRepository.findOne({ where: { style: dtoData.style,seasonCode:dtoData.seasonCode,year:dtoData.year } })
        //                 const versionDetails = await this.priceRepository.getVersion(dtoData.orderNo,dtoData.sizeCode,dtoData.colorCode)
        //                 let version = 1;
        //                 if (versionDetails.length > 0) {
        //                     version = Number(versionDetails.length) + 1
        //                 }
        //                 dtoData.version = version
        //                 if (details) {
        //                     const updateOrder = await transactionManager.getRepository(TrimOrdersEntity).update({ orderNo: dtoData.orderNo,sizeCode:dtoData.sizeCode,colorCode:dtoData.colorCode }, {
        //                         year : dtoData.year,revisionNo : dtoData.revisionNo,planningSsn : dtoData.planningSsn,globalBusinessUnit : dtoData.globalBusinessUnit,businessUnit : dtoData.businessUnit,itemBrand : dtoData.itemBrand,Department : dtoData.Department,revisedDate : dtoData.revisedDate,DocumentStatus : dtoData.DocumentStatus,answeredStatus : dtoData.answeredStatus,vendorPersoninCharge : dtoData.vendorPersoninCharge,decisionDate : dtoData.decisionDate,paymentTerms : dtoData.paymentTerms,contractedETD : dtoData.contractedETD,ETAWH : dtoData.ETAWH,approver : dtoData.approver,approvalDate : dtoData.approvalDate,orderConditions : dtoData.orderConditions,remark : dtoData.remark,rawMaterialCode : dtoData.rawMaterialCode,supplierRawMaterialCode : dtoData.supplierRawMaterialCode,supplierRawMaterial : dtoData.supplierRawMaterial,vendorCode : dtoData.vendorCode,vendor : dtoData.vendor,managementFactoryCode : dtoData.managementFactoryCode,managementFactory : dtoData.managementFactory,branchFactoryCode : dtoData.branchFactoryCode,branchFactory : dtoData.branchFactory,orderPlanNumber : dtoData.orderPlanNumber,itemCode : dtoData.itemCode,item : dtoData.item,representativeSampleCode : dtoData.representativeSampleCode,sampleCode : dtoData.sampleCode,colorCode : dtoData.colorCode,color : dtoData.color,patternDimensionCode : dtoData.patternDimensionCode,sizeCode : dtoData.sizeCode,size : dtoData.size,arrangementBy : dtoData.arrangementBy,trimDescription : dtoData.trimDescription,trimItemNo : dtoData.trimItemNo,trimSupplier : dtoData.trimSupplier,createdUser : dtoData.createdUser,updatedUser : dtoData.updatedUser,version : dtoData.version,fileId : dtoData.fileId,month:dtoData.month,orderQtyPcs:dtoData.orderQtyPcs
        //                     })
        //                     if (!updateOrder.affected) {
        //                         await transactionManager.releaseTransaction();
        //                         return new CommonResponseModel(false, 0, 'Something went wrong in order update')
        //                     }
        //                     const convertedExcelEntity: Partial<TrimOrdersChildEntity> = this.trimordersChildAdapter.convertDtoToEntity(dtoData, id, month);
        //                     const saveExcelEntity: TrimOrdersChildEntity = await transactionManager.getRepository(TrimOrdersChildEntity).save(convertedExcelEntity);
        //                 } else {
    
        //                     dtoData.version = 1
        //                     const convertedExcelEntity: Partial<TrimOrdersEntity> = this.trimordersAdapter.convertDtoToEntity(dtoData, id, month);
        //                     const saveExcelEntity: TrimOrdersEntity = await transactionManager.getRepository(TrimOrdersEntity).save(convertedExcelEntity);
        //                     const convertedChildExcelEntity: Partial<TrimOrdersChildEntity> = this.trimordersChildAdapter.convertDtoToEntity(dtoData, id, month);
        //                     const saveChildExcelEntity: TrimOrdersChildEntity = await transactionManager.getRepository(TrimOrdersChildEntity).save(convertedChildExcelEntity);
        //                     // const saveChildExcelDto = this.ordersChildAdapter.convertEntityToDto(saveChildExcelEntity);
        //                     if (!saveExcelEntity || !saveChildExcelEntity) {
        //                         flag.add(false)
        //                         await transactionManager.releaseTransaction();
        //                         break;
        //                     }
        //                 }
        //             }else{
        //                 break;
        //             }
        //         }
    
        //         if (!flag.has(false)) {
        //             await transactionManager.completeTransaction()
        //             return new CommonResponseModel(true, 1, 'Data saved sucessfully')
        //         } else {
        //             await transactionManager.releaseTransaction()
        //             return new CommonResponseModel(false, 0, 'Something went wrong')
        //         }
        //     } catch (error) {
        //         await transactionManager.releaseTransaction()
        //         return new CommonResponseModel(false, 0, error)
        //     }
        // }

}
