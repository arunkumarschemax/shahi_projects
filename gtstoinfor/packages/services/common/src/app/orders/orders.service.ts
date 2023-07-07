import { Injectable } from '@nestjs/common';
import { CommonResponseModel } from '@project-management-system/shared-models';
import { SaveOrderDto } from './models/save-order-dto';
import { OrdersRepository } from './repository/orders.repository';
import { OrdersEntity } from './orders.entity';
import { OrdersAdapter } from './adapters/orders.adapter';
import { OrdersChildRepository } from './repository/orders-child.repository';
import { OrdersChildEntity } from './orders-child.entity';
import { OrdersChildAdapter } from './adapters/orders-child.adapter';

@Injectable()
export class OrdersService {
    ordersChildRepository: any;

    constructor(
        private ordersAdapter: OrdersAdapter,
        private ordersRepository: OrdersRepository,
        private ordersChildRepo: OrdersChildRepository,
        private ordersChildAdapter: OrdersChildAdapter
    ) { }

    async saveOrdersData(dto: SaveOrderDto[]): Promise<CommonResponseModel> {
        const flag = new Set()
        for (const data of dto) {
            const details = await this.ordersRepository.findOne({ where: { productionPlanId: data.productionPlanId } })
            if (details) {
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
        const data = await this.ordersChildRepo.getQtyChangeData()
        return new CommonResponseModel(true, 1, 'data retrived', data)
    }

    async getContractDateChangeData(): Promise<CommonResponseModel> {
        const details = await this.ordersRepository.find()
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
