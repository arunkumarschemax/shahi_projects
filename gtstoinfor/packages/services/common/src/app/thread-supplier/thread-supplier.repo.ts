import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ThreadSupplierEntity } from "./thread-supplier.entity";


@Injectable()
export class ThreadSupplierRepo extends Repository<ThreadSupplierEntity> {
    constructor(@InjectRepository(ThreadSupplierEntity) private threadSupplierRepo: Repository<ThreadSupplierEntity>
    ) {
        super(threadSupplierRepo.target, threadSupplierRepo.manager, threadSupplierRepo.queryRunner);
    }

   
}