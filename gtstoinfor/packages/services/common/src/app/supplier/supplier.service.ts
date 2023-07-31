import { Injectable } from "@nestjs/common";
import { SupplierAdapter } from "./adapters/adapters/supplier.adapter";
import { SupplierRepository } from "./repository/supplier.repository";
import { SupplierDto } from "./dto/supplier-dto";
import { SupplierEntity } from './supplier.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CommonResponseModel, SupplierActivateDeactivateDto, SupplierCreateDto, SupplierResponse } from "@project-management-system/shared-models";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { SupplierCreatDto } from "./dto/supplier-create-dto";

@Injectable()
export class SupplierService {
    constructor(
        private supplierAdapter: SupplierAdapter,
        @InjectRepository(SupplierEntity)
        private supplierRepository: Repository<SupplierEntity>,
    ) { }

    async createSupplier( supplierDto: any): Promise<CommonResponseModel> {
        const entity= await this.supplierAdapter.convertDtoToEntity(supplierDto);
        console.log(entity,'@@@@@@')
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

    // async activateOrDeactivate(req: SupplierCreatDto): Promise<SupplierResponse> {
    //     const supllierExists = await this.supplierRepository.findOne({ where: { id: req.id } })
    //     if (supllierExists) {
    //         if (supllierExists.versionFlag != req.versionFlag) {
    //             return new SupplierResponse(false, 10113, 'Someone updated the current user information.Refresh and try again')
    //         } else {
    //             const updateStatus = await this.supplierRepository.update({ id: req.id }, { isActive: req.isActive, updatedUser: req.updatedUser })
    //             if (updateStatus) {
    //                 return new SupplierResponse(true, 10115, `User is ${supllierExists.isActive ? 'de-activated' : 'activated'}-activated successfully `)
    //             } else {
    //                 return new SupplierResponse(false, 500, 'Error while updating');
    //             }
    //         }
    //     } else {
    //         new ErrorResponse(99999, 'No records found')
    //     }
    // }
    

    

    async ActivateOrDeactivate(req: SupplierActivateDeactivateDto): Promise<SupplierResponse> {
        const supllierDetails = await this.supplierRepository.findOne({ where: { id: req.id } })
        if (supllierDetails) {
            if (req.versionFlag != supllierDetails.versionFlag) {
                throw new SupplierResponse(false, 1, 'SomeOne updated. Referesh and try again', undefined)
            } else {
                const supplierUpdate = await this.supplierRepository.update({ id: req.id }, { isActive: req.isActive})
                if (supllierDetails.isActive) {
                    console.log(supplierUpdate,'activeeeee')
                    if (supplierUpdate.affected) {
                        return new SupplierResponse(true, 0, 'Employee is de-activated successfully', undefined)
                    } else {
                        throw new SupplierResponse(false, 1, 'Employee already deactivated', undefined)
                    }
                } else {
                    if (supplierUpdate.affected) {
                        return new SupplierResponse(true, 0, 'Employee is activated successfully', undefined)
                    } else {
                        throw new SupplierResponse(false, 1, 'Employee already activated', undefined)
                    }
                }
            }
        }
        else {
            throw new SupplierResponse(false, 1, 'No record found', undefined)

        }

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
