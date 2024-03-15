import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ThreadsEntity } from "./threads.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { StyleEntity } from "../po-bom/entittes/style-entity";
import { ThreadSupplierEntity } from "../thread-supplier/thread-supplier.entity";

@Injectable()
export class ThreadsRepository extends Repository<ThreadsEntity> {
    constructor(@InjectRepository(ThreadsEntity) private userRepository: Repository<ThreadsEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
    async getThreadsData(): Promise<any[]> {
        const query = this.createQueryBuilder('t')
            .select(`s.style , tex ,quality ,color_combo  as colorCombo, color_code as colorCode ,shade_number as shadeNumber,ts.supplier_name`)
             .leftJoin(StyleEntity,"s",'s.id = t.style_id')
             .leftJoin(ThreadSupplierEntity,"ts",'ts.thread_supplier_id =t.supplierId')
        return await query.getRawMany()
    }
   
}