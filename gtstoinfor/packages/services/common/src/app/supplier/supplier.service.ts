import { Injectable } from "@nestjs/common";
import { SupplierAdapter } from "./adapters/adapters/supplier.adapter";
import { SupplierRepository } from "./repository/supplier.repository";
import { SupplierDto } from "./dto/supplier-dto";
import { SupplierEntity } from './supplier.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel, SupplierActivateDeactivateDto, SupplierCreateDto, SupplierResponse } from "@project-management-system/shared-models";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";

@Injectable()
export class SupplierService {
    constructor(
        private supplierAdapter: SupplierAdapter,
        @InjectRepository(SupplierEntity)
        private supplierRepository: Repository<SupplierEntity>,
    ) { }

    async createSupplier(supplierDto: any): Promise<CommonResponseModel> {
        const entity= await this.supplierAdapter.convertDtoToEntity(supplierDto);
        const savedEntity = await this.supplierRepository.save(entity);
        const saveDto: SupplierDto = this.supplierAdapter.convertEntityToDto(savedEntity);
        return new CommonResponseModel(true, 1, 'data saved successfully', saveDto);
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
    async getActiveSuppliers(): Promise<CommonResponseModel> {
        const data = await this.supplierRepository.find({ where: { isActive: true } })
        const activeSuppliersData:SupplierCreateDto[] = []
        for (const record of data) {
            const adapterData:any = this.supplierAdapter.convertEntityToDto(record)
            activeSuppliersData.push(adapterData)
        }
        return new CommonResponseModel(true, 1111, 'Data retreived', activeSuppliersData)
    }

    async activateOrDeactivate(req: SupplierActivateDeactivateDto): Promise<SupplierResponse> {
        const factoryExists = await this.supplierRepository.findOne({ where: { id: req.id } })
        if (factoryExists) {
            if (factoryExists.versionFlag != req.versionFlag) {
                return new SupplierResponse(false, 10113, 'Someone updated the current user information.Refresh and try again')
            } else {
                const updateStatus = await this.supplierRepository.update({ id: req.id }, { isActive: req.isActive, updatedUser: req.updatedUser })
                if (updateStatus) {
                    return new SupplierResponse(true, 10115, `User is ${factoryExists.isActive ? 'de-activated' : 'activated'}-activated successfully `)
                } else {
                    return new SupplierResponse(false, 500, 'Error while updating');
                }
            }
        } else {
            new ErrorResponse(99999, 'No records found')
        }
    }
    // async getAllSuppliers(): Promise<any> {
    //     const data = await this.supplierRepository.find();
    //     console.log(data,'dataaaaa')
    //     return data
    //     // const data: SupplierCreateDto = [];
    //     // for (const entity of details) {
    //     //     const conversion = this.supplierAdapter.convertEntityToDto(entity);
    //     //     data.push(conversion);
    //     // }
    //     // return new SupplierResponse(true, 1, 'data retrived',details);
    // } 

    // async activateOrDeactivateSuppliers( supplierReq: SupplierDto ): Promise<SupplierResponse> {
    //     const record = await this.supplierRepository.findOne({  where: { id: supplierReq.id },  });
    //     await this.supplierRepository.update(
    //         { id: supplierReq.id },
    //         { isActive: !record.isActive }
    //     );

    // }
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
