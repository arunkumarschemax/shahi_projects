import { Injectable } from "@nestjs/common";
import { SupplierAdapter } from "./adapters/adapters/supplier.adapter";
import { SupplierRepository } from "./repository/supplier.repository";
import { SupplierDto } from "./dto/supplier-dto";
import { SupplierEntity } from './supplier.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Raw, Repository } from "typeorm";
import { CommonResponseModel, SupplierActivateDeactivateDto, SupplierCreateDto, SupplierResponse} from "@project-management-system/shared-models";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { SupplierCreatDto } from "./dto/supplier-creat-dto";

// @Injectable()
// export class SupplierService {
//     constructor(
//         private supplierAdapter: SupplierAdapter,
//         @InjectRepository(SupplierEntity)
//         private supplierRepository: Repository<SupplierEntity>,
//     ) { }

    // async createSupplier( supplierDto: any): Promise<CommonResponseModel> {
    //     const entity= await this.supplierAdapter.convertDtoToEntity(supplierDto);
    //     console.log(entity,'@@@@@@')
    //     const savedEntity = await this.supplierRepository.save(entity);
    //     const saveDto: SupplierDto = this.supplierAdapter.convertEntityToDto(savedEntity);
    //     return new CommonResponseModel(true, 1, 'data saved successfully', saveDto);
    // }
    @Injectable()
    export class SupplierService {
      
        constructor(
          
            @InjectRepository(SupplierEntity)
            private supplierRepository: Repository<SupplierEntity>,
            private SupplierAdapter: SupplierAdapter,
        ){}

        async getSupllierWithoutRelations(supplierName: string): Promise<SupplierEntity> {
            // tslint:disable-next-line: typedef
            const CommonResponseModel = await this.supplierRepository.findOne({
              where: {id: Raw(alias => `supplier_name = '${supplierName}'`)},
            });
            if (CommonResponseModel) {
              return CommonResponseModel;
            } else {
              return null;
            }
          }

    async createSupplier(supplierDto: SupplierDto, isUpdate: boolean): Promise<CommonResponseModel> {
        console.log(supplierDto, 'fffffffffffff');
        try {
          let previousValue
          console.log(isUpdate,"isUpdate");
          //   console.log(res);
          if (!isUpdate) {
            const SupplierEntity = await this.getSupllierWithoutRelations(supplierDto.supplierName);
            if (SupplierEntity) {
              //return new InformationMessageError(11104, "State already exists");
              throw new CommonResponseModel(false,11104, 'Certificate Name already exists');
            }
          }
          else{
            const supplierPrevious = await this.supplierRepository.findOne({where:{id:supplierDto.id}})
            previousValue = supplierPrevious.supplierName
            console.log(previousValue)
            const SupplierEntity = await this.getSupllierWithoutRelations(supplierDto.supplierName);
            if (SupplierEntity) {
              if(SupplierEntity.id!=supplierDto.id) {
                throw new CommonResponseModel(false,11104, 'Supplier already exists');      
              }
            }
          }
          const convertedSupplierEntity: SupplierEntity = this.SupplierAdapter.convertDtoToEntity(supplierDto,isUpdate);
          const savedSupplierEntity: SupplierEntity = await this.supplierRepository.save(
            convertedSupplierEntity
          );
          const savedsupplierDto: SupplierDto = this.SupplierAdapter.convertEntityToDto(savedSupplierEntity);
            // console.log(savedStateDto);
          if (savedsupplierDto) {
            const supplierPresent = savedsupplierDto.supplierName;
            console.log(supplierPresent)
            // generating response
            const response = new CommonResponseModel(true,1,isUpdate? 'Suppliers Updated Successfully': 'Supplier Created Successfully')
            //  const name =isUpdate ? 'update':'create'
            //  const userName = isUpdate ? savedsupplierDto.updatedUser : savedsupplierDto.createdUser
            //  const displayValue = isUpdate? 'Suppliers Updated Successfully': 'Supplier Created Successfully'
            // const newLogDto = new LoDto(1,name, 'Suppliers', savedsupplierDto.id, true, displayValue,userName,previousValue,supplierPresent)
            // let res = await this.logService.createLog(newLogDto);
            // console.log(res);
            // await this.logService.createLog(1,'create', 'Suppliers', savedsupplierDto.certificateId, true, '');

            return response
          } else {
            //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
            throw new CommonResponseModel(false,11106,'Supplier saved but issue while transforming into DTO');
          }
        } catch (error) {
          // when error occures while saving the data , the execution will come to catch block.
          // tslint:disable-next-line: typedef
          return error;
        }

      }
    async getAllSuppliers(): Promise<CommonResponseModel> {
        const details = await this.supplierRepository.find();
        const data: SupplierDto[] = [];
        for (const entity of details) {
            const conversion = this.SupplierAdapter.convertEntityToDto(entity);;
            data.push(conversion)
        }
        return new CommonResponseModel(true, 1, 'data retrived', data)
    }
    async getActiveSuppliers(): Promise<CommonResponseModel> {
        const data = await this.supplierRepository.find({ where: { isActive: true } })
        const activeSuppliersData:SupplierCreateDto[] = []
        for (const record of data) {
            const adapterData:any = this.SupplierAdapter.convertEntityToDto(record)
            activeSuppliersData.push(adapterData)
        }
        return new CommonResponseModel(true, 1111, 'Data retreived', activeSuppliersData)
    }

    
    // async ActivateOrDeactivate(req: SupplierActivateDeactivateDto): Promise<CommonResponseModel> {
    //     const supllierDetails = await this.supplierRepository.findOne({ where: { id: req.id } })
    //     console.log(supllierDetails,'supllierDetails')
    //     if (supllierDetails) {
    //         if (req.versionFlag != supllierDetails.versionFlag) {
    //           console.log('---------')
    //             return new CommonResponseModel(false, 1, 'SomeOne updated. Referesh and try again')
    //         } else {
    //             const supplierUpdate = await this.supplierRepository.update({ id: req.id }, { isActive: req.isActive})
    //             if (supllierDetails.isActive) {
    //                 console.log(supplierUpdate,'activeeeee')
    //                 if (supplierUpdate.affected) {
    //                     return new CommonResponseModel(true, 0, 'Supplier is de-activated successfully')
    //                 } else {
    //                     throw new CommonResponseModel(false, 1, 'Supplier already deactivated')
    //                 }
    //             } else {
    //                 if (supplierUpdate.affected) {
    //                     return new CommonResponseModel(true, 0, 'Supplier is activated successfully')
    //                 } else {
    //                     throw new CommonResponseModel(false, 1, 'Supplier already activated')
    //                 }
    //             }
    //         }
    //     }
    //     else {
    //         throw new CommonResponseModel(false, 1, 'No record found', undefined)

    //     }

    // }

     
    // async updateSuppliers(createsupplierDto: SupplierDto): Promise<any> {
    //     const records = await this.supplierRepository.findOne({
    //         where: { id: createsupplierDto.id },
    //     });
    //     if (records) {
    //         const entity: SupplierEntity = this.SupplierAdapter.convertDtoToEntity(createsupplierDto);
    //         const savedData = await this.supplierRepository.save(entity);
    //         return savedData;
    //     } else {
    //         return 'record not found';
    //     }
    // }


    async ActivateOrDeactivate(
      Req: SupplierDto
    ): Promise<CommonResponseModel> {
      try {
        const roleExists = await this.getsupplierById(
          Req.id
        );
        if (roleExists) {
          const roleStatus = await this.supplierRepository.update(
            { id: Req.id },
            {
              isActive: !roleExists.isActive,
              updatedUser: Req.supplierName,
            }
          );
          const internalMessage: string = !roleExists.isActive
            ? "Activated Successfully"
            : "Daectivated Successfully";
          return new CommonResponseModel(true, 54654, internalMessage);
        } else {
          return new CommonResponseModel(false, 654695, "Data Not Found");
        }
      } catch (err) {
        return err;
      }
    }
  
    async LocationActivateDeactivateUnitDto(
      Req: SupplierDto
    ): Promise<CommonResponseModel> {
      const record = await this.supplierRepository.findOne({
        where: { id: Req.id },
      });
  
      await this.supplierRepository.update(
        { id: Req.id },
        { isActive: !record.isActive }
      );
      const internalMessage: string = !record.isActive
        ? "Activated Sucessfully"
        : "Deactivated Successfully";
      return new CommonResponseModel(true, 6876, internalMessage);
    }
  
    async getsupplierById(
      id: number
    ): Promise<SupplierEntity> {
      const Response = await this.supplierRepository.findOne({
        where: { id: id },
      });
      if (Response) {
        return Response;
      } else {
        return null;
      }
    }
}
