import { EntityRepository, Repository } from "typeorm";
import { SupplierEntity } from "../supplier.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";

@Injectable()
@EntityRepository(SupplierEntity)
export class SupplierRepository extends Repository<SupplierEntity>{
    

    // constructor(@InjectRepository(SupplierEntity) private supplierRepository: Repository<SupplierEntity>
    // ) {
    //     super(supplierRepository.target, supplierRepository.manager, supplierRepository.queryRunner);
    // }

}