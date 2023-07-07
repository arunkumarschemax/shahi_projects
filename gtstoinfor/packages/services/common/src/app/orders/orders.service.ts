import { Injectable } from '@nestjs/common';
import { CommonResponseModel, orderColumnValues } from '@project-management-system/shared-models';
import { SaveOrderDto } from './models/save-order-dto';
import { OrdersRepository } from './repository/orders.repository';
import { OrdersEntity } from './orders.entity';
import { OrdersAdapter } from './adapters/orders.adapter';
import { OrdersChildRepository } from './repository/orders-child.repository';
import { OrdersChildEntity } from './orders-child.entity';
import { OrdersChildAdapter } from './adapters/orders-child.adapter';
import { AppDataSource } from '../app-datasource';
import { OrdersDifferenceEntity } from './orders-difference-info.entity';
import { OrderDifferenceRepository } from './repository/order-difference.repository';

@Injectable()
export class OrdersService {
    ordersChildRepository: any;

    constructor(
        private ordersAdapter: OrdersAdapter,
        private ordersRepository: OrdersRepository,
        private ordersChildRepo: OrdersChildRepository,
        private ordersChildAdapter: OrdersChildAdapter,
        private orderDiffRepo: OrderDifferenceRepository
    ) { }

    async saveOrdersData(dto: SaveOrderDto[]): Promise<CommonResponseModel> {
        const flag = new Set()
        for (const data of dto) {
            const details = await this.ordersRepository.findOne({ where: { productionPlanId: data.productionPlanId } })
            console.log(details)
            if (details) {

                // const updatedData: Partial<OrdersEntity> = this.ordersAdapter.convertDtoToEntity(data);
                // const updateOrder = await this.ordersRepository.save(updatedData)
                // if(!updateOrder){
                //     return new CommonResponseModel(false, 0, 'Something went wrong in order update')
                // }
                const versionDetails = await this.ordersChildRepo.getVersion(data.productionPlanId)
                let version;
                if (versionDetails.length > 0) {
                    version = Number(versionDetails.length) + 1
                } else {
                    version = 1
                }
                data.version = version
                const convertedExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(data);
                const saveExcelEntity: OrdersChildEntity = await this.ordersChildRepo.save(convertedExcelEntity);
                const saveExcelDto = this.ordersChildAdapter.convertEntityToDto(saveExcelEntity);
                if (!saveExcelDto) {
                    flag.add(false)
                }
                if(saveExcelDto){

                    //difference insertion to order diff table
                    const existingDataKeys = Object.keys(details)
                    const currentDataKeys = Object.keys(dto)
                    for(const existingDataKey of existingDataKeys){
                        if(details[existingDataKey] != data[existingDataKey] && existingDataKey!='createdAt'){
                            console.log(existingDataKey,'existingDataKey')
                            console.log(data[existingDataKey],'dataujiu')

                            console.log(details[existingDataKey],'ppppppp')
                            console.log(details[existingDataKey],'ppppppp')
                            const orderDiffObj = new OrdersDifferenceEntity();
                            orderDiffObj.columnName = orderColumnValues[existingDataKey] 
                            orderDiffObj.oldValue = details[existingDataKey]
                            orderDiffObj.newValue = data[existingDataKey]
                            orderDiffObj.displayName = existingDataKey
                            orderDiffObj.productionPlanId = data.productionPlanId
                            const orderDiffSave = await this.orderDiffRepo.save(orderDiffObj);
                        }
                    }
                    // for(const [key,value] of [details].entries()){
                    //     console.log(key,'44444')
                    //     const keydata = Object.keys(value)
                    //     console.log(keydata)
                    // }
                    // existingDataKeys.map(exkeyitem => exkeyitem == (currentDataKeys.filter(ckeyItem => ckeyItem)))

                //     let result = [details].map((e,val) => e.label.toLowerCase())
                //    .map(s => dto.map(n => n[s]))
                //     const existingData = details;
                //     const currentdata = dto;
                //     const diff = details.diff(dto)

                }
            } else {
                const convertedExcelEntity: Partial<OrdersEntity> = this.ordersAdapter.convertDtoToEntity(data);
                const saveExcelEntity: OrdersEntity = await this.ordersRepository.save(convertedExcelEntity);
                const saveExcelDto = this.ordersAdapter.convertEntityToDto(saveExcelEntity);
                data.version = 1
                const convertedChildExcelEntity: Partial<OrdersChildEntity> = this.ordersChildAdapter.convertDtoToEntity(data);
                const saveChildExcelEntity: OrdersChildEntity = await this.ordersChildRepo.save(convertedChildExcelEntity);
                const saveChildExcelDto = this.ordersChildAdapter.convertEntityToDto(saveChildExcelEntity);
                if (!saveExcelDto) {
                    flag.add(false)
                }
            }
        }
        if (!flag.has(false)) {
            return new CommonResponseModel(true, 1, 'Data saved sucessfully')
        } else {
            return new CommonResponseModel(false, 0, 'Something went wrong')
        }
    }

    // async getSavedData(): Promise<CommonResponseModel> {
    //     const details = await this.ordersChildRepo.getData()
    //     return new CommonResponseModel(true, 1, 'data retrived', details)
    // }

    async getQtyChangeData(): Promise<CommonResponseModel> {
        const details = await this.ordersRepository.find()
        const totalData: any[] = [];
        for (const detail of details) {
            const data = await this.ordersChildRepo.getQtyChangeData(detail.productionPlanId)
            totalData.push(data)
        }
        return new CommonResponseModel(true, 1, 'data retrived', totalData)
    }

    async getContractDateChangeData(): Promise<CommonResponseModel> {
        const details = await AppDataSource.query('SELECT production_plan_id FROM orders_child   ORDER BY date(created_at) DESC LIMIT 2 ')
        const totalData: any[] = [];
        for (const detail of details) {
            const data = await this.ordersChildRepo.getContractDateChangeData(detail.productionPlanId)
            totalData.push(data)
        }
        return new CommonResponseModel(true, 1, 'data retrived', totalData)
    }

    async getWharehouseDateChangeData(): Promise<CommonResponseModel> {
        const details = await this.ordersRepository.find()
        const totalData: any[] = [];
        for (const detail of details) {
            const data = await this.ordersChildRepo.getWharehouseDateChangeData(detail.productionPlanId)
            totalData.push(data)
        }
        return new CommonResponseModel(true, 1, 'data retrived', totalData)
    }
}
