
import { Injectable } from '@nestjs/common';
import { CommonResponseModel, FileIdReq, FileStatusReq, OrdersReq, PoRoleRequest, RoleReq, docRequest, orderColumnValues } from '@project-management-system/shared-models';
import { DataSource, EntityManager, QueryResult, getConnection } from 'typeorm';
import { InjectDataSource, InjectEntityManager } from '@nestjs/typeorm';
import { OrdersAdapter } from './adapters/order.adapter';
import { OrdersRepository } from './repositories/order.repository';
import { FileUploadRepository } from './repositories/upload.repository';
import { GenericTransactionManager } from '../../../../common/src/typeorm-transactions/generic-transaction-manager';
import { OrdersEntity } from './entities/order.entity';
import { FileUploadEntity } from './entities/file-upload.entity';
import { SaveOrderDto } from './models/order.dto';
import { DocumentService } from '../document_upload/document.service';
import { DocumentsListService } from '../document_upload/upload_document.service';
import { DocumentsListRequest } from '../document_upload/requests/document-list.request';
import { appConfig } from 'packages/services/document-management/config';
import { error } from 'console';
import { config } from 'packages/libs/shared-services/config';

let moment = require('moment');
moment().format();
import { req } from '../document_upload/requests/importedPoReq';
import { UploadFilesRepository } from '../document_upload/repository/upload-files.repository';
import { FileUpdateStatusReq } from './models/file-request.dto';
@Injectable()
export class OrdersService {

    constructor(
        private ordersAdapter: OrdersAdapter,
        private ordersRepository: OrdersRepository,
        private fileUploadRepo: FileUploadRepository,
        @InjectDataSource()
        private dataSource: DataSource,
        @InjectEntityManager() private readonly entityManager: EntityManager,
        private documentService: DocumentsListService,
        private uploadFilesRepository:UploadFilesRepository,

    ) { }

    async saveOrdersData(formData: any, id: number): Promise<CommonResponseModel> {
        const transactionManager = new GenericTransactionManager(this.dataSource)
        try {
            await transactionManager.startTransaction()
            const flag = new Set()
            const poNumbers = new Map<string, string[]>()
            const updatedArray = formData.map((obj) => {
                poNumbers.set(obj.po_no, obj.po_no)
                const updatedObj = {};
                for (const key in obj) {
                    const newKey = key.replace(/\s/g, '_').replace(/[\(\)]/g, '').replace(/-/g, '_');
                    updatedObj[newKey] = obj[key];
                }
                return updatedObj;
            });
           
            const poRequest : req[] =[];
            for(const res of poNumbers){
                if(res[0] === undefined || res[0] === ""){
                }
                else{
                    poRequest.push(new req(res[0]));
                }
            }

            const convertedData = updatedArray.map((obj) => {
                const updatedObj = {};
                for (const key in obj) {
                    const value = obj[key];
                    if (value === "") {
                        updatedObj[key] = null;
                    } else {
                        // updatedObj[key] = value;
                        var regexPattern = /[^A-Za-z0-9 -;:/.,()[]&_']/g;
                        updatedObj[key] = value.replace(regexPattern, null);
                        updatedObj[key] = Buffer.from(value, 'utf-8').toString()
                    }
                }
                return updatedObj;
            });
            let requestData = [];
            let orderDetails:OrdersEntity[] = [];
            for (const data of convertedData) {
                let dtoData:SaveOrderDto;
                console.log(data)
                // if(data.challa_no != null && data.invoice_no != null && data.po_no != null)
                if(data.po_no != null)

                {
                    dtoData = new SaveOrderDto(data.id, data.buyer, data.challa_no, data.invoice_no, data.style, data.po_no, data.date, data.dest, data.tc_status, data.ship_qty, data.ctns, data.created_user, data.updated_user, data.created_at, data.updated_at, 1, id)
                    console.log(dtoData)
                    dtoData.version = 1

                    let checkChallanExist = await transactionManager.getRepository(OrdersEntity).findOne({where:{
                       poNo:dtoData.poNo
                    }})
                  if(!checkChallanExist){
                        const convertedExcelEntity: Partial<OrdersEntity> = this.ordersAdapter.convertDtoToEntity(dtoData, id);
                        const saveExcelEntity: OrdersEntity = await transactionManager.getRepository(OrdersEntity).save(convertedExcelEntity);
                      
                        orderDetails.push(saveExcelEntity);
                        // for(const po of data.po_no){
                        const uniquePoNos = {};                
                            const poNo = data.po_no;

                            if (!uniquePoNos[poNo]) {
                                uniquePoNos[poNo] = []; 

                                requestData = [
                                    {
                                        ...data,
                                        poNumber: poNo
                                    }
                                ];                           
                            }
                    
                        if (!saveExcelEntity) {
                            flag.add(false)
                            await transactionManager.releaseTransaction();
                            break;
                        }
                    }
                }
            }
            if (!flag.has(false)) {
                const documentSave = await this.documentService.createDocList(orderDetails);
                if(!documentSave.status){
                    flag.add(false)
                    await transactionManager.releaseTransaction();
                }
                else{

                    await transactionManager.completeTransaction()
                    return new CommonResponseModel(true, 1, 'Data saved sucessfully')
                }
            } else {
                await transactionManager.releaseTransaction()
                return new CommonResponseModel(false, 0, 'Something went wrong')
            }
        } catch (error) {
            await transactionManager.releaseTransaction()
            return new CommonResponseModel(false, 0, error)
        }
    }

    async getOrdersData(): Promise<CommonResponseModel> {
        const details = await this.ordersRepository.find()
        if (details)
            return new CommonResponseModel(true, 1, 'data retrived', details)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    // async getQtyChangeData(): Promise<CommonResponseModel> {
    //     const data = await this.ordersRepository.getQtyChangeData()
    //     if (data)
    //         return new CommonResponseModel(true, 1, 'data retrived', data)
    //     else
    //         return new CommonResponseModel(false, 0, 'No data found');
    // }

    async getQtyDifChangeData(): Promise<CommonResponseModel> {
        const files = await this.fileUploadRepo.getFilesData()
        let data;
        if (files.length == 0) {
            return new CommonResponseModel(false, 0, 'No data found');
        } else if (files.length == 1) {
            // data = await this.ordersChildRepo.getItemQtyChangeData1(files[0]?.fileId)
        } else {
            // data = await this.ordersChildRepo.getItemQtyChangeData(files[1]?.fileId, files[0]?.fileId)
        }
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    // async getContractDateChangeData(): Promise<CommonResponseModel> {
    //     const data = await this.ordersRepository.getContractDateChangeData()
    //     if (data)
    //         return new CommonResponseModel(true, 1, 'data retrived', data)
    //     else
    //         return new CommonResponseModel(false, 0, 'No data found');
    // }

    // async getWharehouseDateChangeData(): Promise<CommonResponseModel> {
    //     const data = await this.ordersRepository.getWharehouseDateChangeData()
    //     if (data)
    //         return new CommonResponseModel(true, 1, 'data retrived', data)
    //     else
    //         return new CommonResponseModel(false, 0, 'No data found');
    // }

    async getUnitWiseOrders(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getUnitCount()
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    async getDivisionWiseOrders(): Promise<CommonResponseModel> {
        const data = await this.ordersRepository.getDivisionCount()
        if (data)
            return new CommonResponseModel(true, 1, 'data retrived', data)
        else
            return new CommonResponseModel(false, 0, 'No data found');
    }

    // async getMaximumChangedOrders(): Promise<CommonResponseModel> {
    //     const data = await this.ordersChildRepo.getNoOfChangedItem()
    //     if (data)
    //         return new CommonResponseModel(true, 1, 'data retrived', data)
    //     else
    //         return new CommonResponseModel(false, 0, 'No data found');
    // }

    // async revertFileData(req: FileIdReq): Promise<CommonResponseModel> {
    //     if (req) {
    //         const latestFileId = await this.fileUploadRepo.update({ id: req.fileId }, { isActive: false })
    //     }
    //     if (req) {
    //         const deleteChildData = await this.ordersChildRepo.deleteChildData(req)
    //     }
    //     if (req) {
    //         const deleteDiffData = await this.orderDiffRepo.deleteDiffData(req)
    //     }
    //     if(req){
    //         const deleteOrdersData = await this.ordersRepository.deleteData(req)
    //     }
    //     const updatedData = await this.ordersChildRepo.getUpdatedData()
    //     const data = await this.ordersChildRepo.find({
    //         where: { fileId: updatedData[0]?.fileId },
    //         relations: ['orders']
    //     })
    //     const flag = new Set()
    //     for (const dtoData of data) {
    //         const prodPlanId = new OrdersEntity();
    //         prodPlanId.id = dtoData.orders.productionPlanId
    //         const updateOrder = await this.ordersRepository.update({ productionPlanId: prodPlanId.productionPlanId }, {
    //             year: dtoData.year, planningSeason: dtoData.planningSeason, season: dtoData.season, itemBrand: dtoData.itemBrand, businessUnit: dtoData.businessUnit, itemCode: dtoData.itemCode, itemName: dtoData.itemName, mainSampleCode: dtoData.mainSampleCode, mainSampleName: dtoData.mainSampleName, supplierRMCode: dtoData.supplierRMCode, supplierRMName: dtoData.supplierRMName, vendorCode: dtoData.vendorCode, vendorName: dtoData.vendorName, managementFactoryCode: dtoData.managementFactoryCode, managementFactoryName: dtoData.managementFactoryName, branchFactoryCode: dtoData.branchFactoryCode,
    //             branchFactoryName: dtoData.branchFactoryName, rmSupplierCode: dtoData.rmSupplierCode, rmSupplierName: dtoData.rmSupplierName, sewingDifficulty: dtoData.sewingDifficulty, departmentCode: dtoData.departmentCode, departmentName: dtoData.departmentName, class1Code: dtoData.class1Code, Class1Name: dtoData.Class1Name, productionPlanTypeName: dtoData.productionPlanTypeName, monthWeekFlag: dtoData.monthWeekFlag, lastUpdateDate: dtoData.lastUpdateDate, requestedWhDate: dtoData.requestedWhDate, contractedDate: dtoData.contractedDate, transportMethodName: dtoData.transportMethodName,
    //             logisticsTypeName: dtoData.logisticsTypeName, orderQtyPcs: dtoData.orderQtyPcs, yarnOrderAcceptance: dtoData.yarnOrderAcceptance, yarnOrderRequestDate: dtoData.yarnOrderRequestDate, yarnOrderAnswerDate: dtoData.yarnOrderActualDate, yarnOrderActualDate: dtoData.yarnOrderActualDate, yarnOrderNO: dtoData.yarnOrderNO, yarnActualOrderQtyPcs: dtoData.yarnActualOrderQtyPcs, yarnUpdateDate: dtoData.yarnUpdateDate, fabricOrderAcceptance: dtoData.fabricOrderAcceptance, fabricOrderRequestDate: dtoData.fabricOrderRequestDate, fabricOrderAnswerDate: dtoData.fabricOrderAnswerDate,
    //             fabricOrderActualDate: dtoData.fabricOrderActualDate, fabricOrderNO: dtoData.fabricOrderNO, fabricActualOrderQtyPcs: dtoData.fabricActualOrderQtyPcs, fabricUpdateDate: dtoData.fabricUpdateDate, colorOrderAcceptance: dtoData.colorOrderAcceptance, colorOrderRequestDate: dtoData.colorOrderRequestDate, colorOrderAnswerDate: dtoData.colorOrderAnswerDate, colorOrderActualDate: dtoData.colorOrderActualDate, colorOrderNO: dtoData.colorOrderNO, colorActualOrderQtyPcs: dtoData.colorActualOrderQtyPcs, colorUpdateDate: dtoData.colorUpdateDate, trimOrderAcceptance: dtoData.trimOrderAcceptance,
    //             trimOrderRequestDate: dtoData.trimOrderRequestDate, trimOrderAnswerDate: dtoData.trimOrderAnswerDate, trimOrderActualDate: dtoData.trimOrderActualDate, trimOrderNO: dtoData.trimOrderNO, trimActualOrderQtyPcs: dtoData.trimActualOrderQtyPcs, trimUpdateDate: dtoData.trimUpdateDate, POOrderAcceptance: dtoData.POOrderAcceptance, POOrderRequestDate: dtoData.POOrderRequestDate, POOrderAnswerDate: dtoData.POOrderAnswerDate, POOrderActualDate: dtoData.POOrderActualDate, POOrderNO: dtoData.POOrderNO, POActualOrderQtyPcs: dtoData.POActualOrderQtyPcs, POUpdateDate: dtoData.POUpdateDate,
    //             orderQtyPcsOld: dtoData.orderQtyPcsOld, transportMethodNameOld: dtoData.transportMethodNameOld, logisticsTypeNameOld: dtoData.logisticsTypeNameOld, yarnOrderRequestDateOld: dtoData.yarnOrderRequestDateOld, fabricOrderRequestDateOld: dtoData.fabricOrderRequestDateOld, colorOrderRequestDateOld: dtoData.colorOrderRequestDateOld, trimOrderRequestDateOld: dtoData.trimOrderRequestDateOld, POOrderRequestDateOld: dtoData.POOrderRequestDateOld, status: dtoData.status, displayMonthWK: dtoData.displayMonthWK, displayMonthWKColumn: dtoData.displayMonthWKColumn, groupCd: dtoData.groupCd,
    //             showColorFlag: dtoData.showColorFlag, orderQtyCoeff: dtoData.orderQtyCoeff, factoryComment: dtoData.factoryComment, factoryCommentUpdateDate: dtoData.factoryCommentUpdateDate, FRFabricCode: dtoData.FRFabricCode, FRFabricName: dtoData.FRFabricName, Ph1FirstDiscriminationFlagOld: dtoData.Ph1FirstDiscriminationFlagOld, Ph1FirstDiscriminationFlag: dtoData.Ph1FirstDiscriminationFlag, orderTimingDisplayValueOld: dtoData.orderTimingDisplayValueOld, orderTimingDisplayValue: dtoData.orderTimingDisplayValue, expressLineFlagOld: dtoData.expressLineFlagOld, expressLineFlag: dtoData.expressLineFlag,
    //             manualLockFlagOld: dtoData.manualLockFlagOld, manualLockFlag: dtoData.manualLockFlag, Ph1FirstDiscriminationFlagNow: dtoData.Ph1FirstDiscriminationFlagNow, orderTimingDisplayValueNow: dtoData.orderTimingDisplayValueNow, expressLineFlagNow: dtoData.expressLineFlagNow, ManualLockFlagNow: dtoData.ManualLockFlagNow, requestedWhDateOld: dtoData.requestedWhDateOld, EXF: dtoData.EXF, colorRecommend: dtoData.colorRecommend, trimRecommend: dtoData.trimRecommend, PORecommend: dtoData.PORecommend, BD_EXF_DLSettingLTBeforeCal: dtoData.BD_EXF_DLSettingLTBeforeCal,
    //             PO_EXF_DLSettingLTBeforeCal: dtoData.PO_EXF_DLSettingLTBeforeCal, materialSupplierHolidayExcluding: dtoData.materialSupplierHolidayExcluding, sewingFTYHolidayExcluding: dtoData.sewingFTYHolidayExcluding, BD_EXF_DLSettingLT: dtoData.BD_EXF_DLSettingLT, PO_EXF_DLSettingLT: dtoData.PO_EXF_DLSettingLT, BD_EXFRegisteredLT: dtoData.BD_EXFRegisteredLT, PO_EXFRegisteredLT: dtoData.PO_EXFRegisteredLT, BD_EXFtotalAbnormalLT: dtoData.BD_EXFtotalAbnormalLT, PO_EXFtotalAbnormalLT: dtoData.PO_EXFtotalAbnormalLT, abnormalLTReasonBD1: dtoData.abnormalLTReasonBD1,
    //             abnormalLTReasonBD2: dtoData.abnormalLTReasonBD2, abnormalLTReasonBD3: dtoData.abnormalLTReasonBD3, abnormalLTReasonBD4: dtoData.abnormalLTReasonBD4, abnormalLTReasonBD5: dtoData.abnormalLTReasonBD5, abnormalLTBD1: dtoData.abnormalLTBD1, abnormalLTBD2: dtoData.abnormalLTBD2, abnormalLTBD3: dtoData.abnormalLTBD3, abnormalLTBD4: dtoData.abnormalLTBD4, abnormalLTBD5: dtoData.abnormalLTBD5, abnormalLTReasonPO1: dtoData.abnormalLTReasonPO1, abnormalLTReasonPO2: dtoData.abnormalLTReasonPO2, abnormalLTReasonPO3: dtoData.abnormalLTReasonPO3, abnormalLTReasonPO4: dtoData.abnormalLTReasonPO4,
    //             abnormalLTReasonPO5: dtoData.abnormalLTReasonPO5, abnormalLTPO1: dtoData.abnormalLTPO1, abnormalLTPO2: dtoData.abnormalLTPO2, abnormalLTPO3: dtoData.abnormalLTPO3, abnormalLTPO4: dtoData.abnormalLTPO4, abnormalLTPO5: dtoData.abnormalLTPO5, version: dtoData.version, updatedUser: dtoData.updatedUser, orderStatus: 'UNACCEPTED', fileId: dtoData.fileId
    //         })
    //         if (!updateOrder.affected) {
    //             return new CommonResponseModel(false, 0, 'Something went wrong in order update', updateOrder)
    //         }
    //         if (!updateOrder.affected) {
    //             flag.add(false)
    //         } else {
    //             flag.add(true)
    //         }
    //     }
    //     if (flag.has(true)) {
    //         return new CommonResponseModel(true, 1, 'File Reverted Successfully')
    //     } else {
    //         return new CommonResponseModel(false, 0, 'failed to revert file data')
    //     }
    // }

    async updatePath(filePath: string, filename: string): Promise<CommonResponseModel> {
        const entity = new FileUploadEntity()
        entity.fileName = filename;
        entity.filePath = filePath;
        entity.status = 'uploading';
        const file = await this.fileUploadRepo.findOne({ where: { fileName: filename } })
        if (file) {
            return new CommonResponseModel(false, 0, 'File with same name already uploaded');
        } else {
            const save = await this.fileUploadRepo.save(entity)
            if (save) {
                return new CommonResponseModel(true, 1, 'uploaded successfully', save);
            }
            else {
                return new CommonResponseModel(false, 0, 'uploaded failed', save);
            }
        }
    }

    async updateFileStatus(req: FileUpdateStatusReq): Promise<CommonResponseModel> {
        console.log(req);
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        let update
        if (req.status === 'Failed') {
            update = await this.fileUploadRepo.update({ id: req.fileId }, { status: req.status, isActive: false, updatedUser: req.updatedUser, createdUser:req.updatedUser });
        } else {
            update = await this.fileUploadRepo.update({ id: req.fileId }, { status: req.status, updatedUser: req.updatedUser, createdUser:req.updatedUser })
        }
        if (update.affected) {
            return new CommonResponseModel(true, 1, 'updated successfully');
        } else {
            return new CommonResponseModel(false, 0, 'update failed');

        }
    }

    async getUploadFilesData(): Promise<CommonResponseModel> {
        const data = await this.fileUploadRepo.getFilesData()
        if (data.length > 0) {
            return new CommonResponseModel(true, 1, 'uploaded files data retrived successfully', data);
        }
        else {
            return new CommonResponseModel(false, 0, 'No data found', data);
        }
    }

    // async getVersionWiseData(): Promise<CommonResponseModel> {
    //     const records = await this.ordersChildRepo.getVersionWiseQty()
    //     const versionDataMap = new Map<number, VersionDataModel>();
    //     if (records.length == 0) {
    //         return new CommonResponseModel(false, 0, 'No data found');
    //     }
    //     for (const record of records) {
    //         if (!versionDataMap.has(record.production_plan_id)) {
    //             versionDataMap.set(record.production_plan_id, new VersionDataModel(record.production_plan_id, record.prod_plan_type_name, record.item_code, record.itemName, []));
    //         }
    //         versionDataMap.get(record.production_plan_id).versionWiseData.push(new VersionAndQtyModel(record.version, record.order_qty_pcs));
    //     }
    //     const versionDataModelArray: VersionDataModel[] = [];
    //     versionDataMap.forEach(version => versionDataModelArray.push(version));
    //     return new CommonResponseModel(true, 1, 'Data retrived successfully', versionDataModelArray);
    // }

    // async getPhaseWiseData(): Promise<CommonResponseModel> {
    //     const files = await this.fileUploadRepo.getFilesData();
    //     let records;
    //     if (files.length == 0) {
    //         return new CommonResponseModel(false, 0, 'No data found');
    //     } else if (files.length == 1) {
    //         records = await this.ordersChildRepo.getPhaseWiseData1(files[0].fileId)
    //     } else {
    //         records = await this.ordersChildRepo.getPhaseWiseData(files[1].fileId, files[0].fileId)
    //     }
    //     const phaseWiseDataMap = new Map<number, PhaseWiseDataModel>();
    //     if (records.length == 0) {
    //         return new CommonResponseModel(false, 0, 'No data found');
    //     }
    //     for (const record of records) {
    //         if (!phaseWiseDataMap.has(record.item_code)) {
    //             phaseWiseDataMap.set(record.item_code, new PhaseWiseDataModel(record.item_code, record.itemName, []));
    //         }
    //         phaseWiseDataMap.get(record.item_code).phaseWiseData.push(new PhaseAndQtyModel(record.prod_plan_type_name, record.old_qty_value, record.new_qty_value));
    //     }
    //     const phaseDataModelArray: PhaseWiseDataModel[] = [];
    //     phaseWiseDataMap.forEach(phase => phaseDataModelArray.push(phase));
    //     return new CommonResponseModel(true, 1, 'Data retrived successfully', phaseDataModelArray);
    // }

    // async getPhaseWiseExcelData(): Promise<CommonResponseModel> {
    //     const files = await this.fileUploadRepo.getFilesData();
    //     let records;
    //     if (files.length == 0) {
    //         return new CommonResponseModel(false, 0, 'No data found');
    //     } else if (files.length == 1) {
    //         records = await this.ordersChildRepo.getPhaseWiseData1(files[0].fileId)
    //     } else {
    //         records = await this.ordersChildRepo.getPhaseWiseData(files[1].fileId, files[0].fileId)
    //     }
    //     const phaseDataModelArray: PhaseWiseExcelDataModel[] = [];
    //     if (records.length == 0) {
    //         return new CommonResponseModel(false, 0, 'No data found');
    //     }
    //     for (const record of records) {

    //         phaseDataModelArray.push(new PhaseWiseExcelDataModel(record.item_code, record.itemName, record.prod_plan_type_name, record.old_qty_value, record.new_qty_value, record.new_qty_value - record.old_qty_value));
    //     }
    //     return new CommonResponseModel(true, 1, 'Data retrived successfully', phaseDataModelArray);
    // }

    async getRoleWiseOrders(): Promise<CommonResponseModel> {
        let query = `SELECT  dl.role_name , SUM( IF(dl.is_uploaded=1, 1 , 0)) AS Completed,SUM( IF(dl.is_uploaded=0, 1 , 0)) AS Pending FROM documents_list dl LEFT JOIN document_role_mapping dr ON dr.role_id = dl.role_id GROUP BY dl.role_name`;
        const data = await this.dataSource.query(query);
        return new CommonResponseModel(true, 0, 'Data Retrived Successfully', data)
    }

    async getDocumentWiseDoc(): Promise<CommonResponseModel> {
        let query = `SELECT d.document_name , SUM( IF(dl.is_uploaded=1, 1 , 0)) AS Completed,SUM( IF(dl.is_uploaded=0, 1 , 0)) AS Pending FROM documents_list dl LEFT JOIN document d ON d.id = dl.document_category_id GROUP BY d.document_name`;
        const data = await this.dataSource.query(query);
        return new CommonResponseModel(true, 0, 'Data Retrived Successfully', data)
    }

    async getDynamicData(): Promise<CommonResponseModel> {
        const query = `SELECT DISTINCT document_name FROM document`;
        const documentNames = await this.dataSource.query(query)
        const dynamicSQL = `SELECT dl.customer_po AS PO, ${documentNames.map(name => `MAX(CASE WHEN dl.document_category_id = d.id AND d.document_name = '${name.document_name}' THEN CASE WHEN dl.is_uploaded = 1 THEN 'Yes' ELSE 'No' END END) AS '${name.document_name}'
        `).join(',')}
      FROM
        documents_list dl
      LEFT JOIN
        document d ON d.id = dl.document_category_id
      GROUP BY
        dl.customer_po
    `;
        const data = await this.dataSource.query(dynamicSQL)
        return new CommonResponseModel(true, 0, 'Data Retrived Successfully', data)
    }

    async getDynamicDataForDocList(req?:RoleReq): Promise<CommonResponseModel> {
        let query
         query = `SELECT DISTINCT document_name FROM document d LEFT JOIN documents_list dl ON d.id=dl.document_category_id where d.is_active=1`;
         if(req.role == 'Admin' || req.role =='consolidator'){
            query=query+' order by priority ASC'
         }else{
            query=query+' and dl.role_name="'+req.role+'"  order by priority ASC'
         }
        const documentNames = await this.dataSource.query(query)
        const dynamicSQL = `SELECT o.challan_no AS challanNo, o.invoice_no AS invoiceNo,"" AS url, dl.customer_po AS PO , ${documentNames.map(name => `MAX(CASE WHEN dl.document_category_id = d.id AND d.document_name = '${name.document_name}' THEN CASE WHEN dl.is_uploaded = 1 THEN 'Yes' ELSE 'No' END ELSE '-' END) AS '${name.document_name}'
        `).join(',')},dl.documents_list_id as docListId,dl.file_path as filePath,dl.status,dl.po_status as poStatus,o.order_po_status as orderPoStatus
      FROM
        documents_list dl
      LEFT JOIN
        document d ON d.id = dl.document_category_id
        LEFT JOIN orders o on o.id = dl.order_id
        GROUP BY  dl.customer_po ORDER BY o.po_no,o.invoice_no,o.challan_no ASC
    `;
        const data = await this.dataSource.query(dynamicSQL)
        let urls:any[] = [];
        let docinfo: any[] = [];
        for (const res of data){
            // console.log(res)
            const doctlistQuery = 'SELECT d.is_download AS downloadStatus,uid,u.file_name AS name, concat("'+config.download_path+'/PO-",dl.customer_po,"/",u.file_name) AS url, "application/pdf" AS "type", d.document_name AS documentName FROM upload_files u  LEFT JOIN documents_list dl ON u.document_list_id=dl.documents_list_id left join document d on d.id = dl.document_category_id where dl.customer_po ="'+res.PO+'"';
            const docres = await this.uploadFilesRepository.query(doctlistQuery)
            console.log(docres)
            console.log('#################################')

            const docReq:docRequest[] =[];
            for(const res1 of docres){
                // console.log(res);
                urls.push(res1.url);
                let data = new docRequest(res1.uid,res1.name,res1.status,res1.type,res1.url,res1.documentName,res1.downloadStatus);
                // console.log(data);
                // console.log("*^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

                docReq.push(data);
            }
            res.url = docReq;
            docinfo.push(res)
        }
        if(docinfo.length > 0){
            return new CommonResponseModel(true, 0, 'Data Retrived Successfully', docinfo)
        }
        else{
            return new CommonResponseModel(false, 0, 'No data found', docinfo)
        }
    }

    async getuploadeOrdersdata(req?:OrdersReq):Promise<CommonResponseModel>{
        try{
            let query
             query='select updated_user AS uploadedUser,file_name as fileName,file_path as filePath,status,(created_at) as createdAt,DATE_FORMAT(created_at, "%Y-%m-%d %H-%m") AS DateAndHours from file_upload where id>0 and status="Success"'
            if(req.status){
                query=query+' and status="'+req.status+'"'    
            }
            if(req.fromDate){
                query =query+' and date(created_at)="'+req.fromDate+'"'
                // query =query+' and DATE_FORMAT(created_at, "%Y-%m-%d %H")="'+req.fromDate+'"'

            }
            query = query+ ' order by date(created_at) desc'
            const result = await this.fileUploadRepo.query(query)
            if(result){
                return new CommonResponseModel(true,1,'files retrived sucessfully...',result)
            }else{
                return new CommonResponseModel(false,0,'no data foun',[])
            }
        }
        catch(err){
            throw err
        }
    }
}
