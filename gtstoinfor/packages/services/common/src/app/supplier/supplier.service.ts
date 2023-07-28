import { Injectable } from "@nestjs/common";
import { SupplierAdapter } from "./adapters/adapters/supplier.adapter";
import { SupplierRepository } from "./repository/supplier.repository";
import { SupplierDto } from "./dto/supplier-dto";
import { SupplierEntity } from './supplier.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel } from "@project-management-system/shared-models";

@Injectable()
export class SupplierService {
    constructor(
        private supplierAdapter: SupplierAdapter,
        @InjectRepository(SupplierEntity)
        private supplierRepository: Repository<SupplierEntity>,
    ) { }

    async createSupplier(supplierDto: SupplierDto): Promise<CommonResponseModel> {
        const entity= await this.supplierAdapter.convertDtoToEntity(supplierDto);
        const savedEntity = await this.supplierRepository.save(entity);
        const saveDto: SupplierDto = this.supplierAdapter.convertEntityToDto(savedEntity);
        return new CommonResponseModel(true,1, 'data saved successfully', saveDto);
    }


    async getAllSuppliers(): Promise<CommonResponseModel> {
        const details = await this.supplierRepository.find();
        const data: SupplierDto[] = [];
        for (const entity of details) {
            const conversion = this.supplierAdapter.convertEntityToDto(entity);;
            data.push(conversion)
        }
        return new CommonResponseModel(true, 1, 'data retrived', data)
    }

    async activateOrDeactivateSuppliers(
        supplierReq: SupplierDto
    ): Promise<any> {
        const record = await this.supplierRepository.findOne({
            where: { id: supplierReq.id },
        });
        await this.supplierRepository.update(
            { id: supplierReq.id },
            { isActive: !record.isActive }
        );

        return 
        // new SupplierResponse(true, 1,`${record.isActive === true ? 'Deactivated' : 'Activated'} Successfully`)
    }

    async updateSuppliers(createsupplierDto: any): Promise<any> {
        const records = await this.supplierRepository.findOne({
            where: { id: createsupplierDto.id },
        });
        if (records) {
            const entity: SupplierEntity = this.supplierAdapter.convertDtoToEntity(createsupplierDto);
            const savedData = await this.supplierRepository.save(entity);
            return savedData;
        } else {
            return 'record not found';
        }
    }
}
