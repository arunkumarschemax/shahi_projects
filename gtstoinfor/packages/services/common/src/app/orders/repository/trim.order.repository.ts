import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { AppDataSource } from "../../app-datasource";
import { FileIdReq } from "../models/file-id.req";
import { Injectable } from "@nestjs/common";
import { TrimOrdersEntity } from "../entities/trim-orders.entity";

@Injectable()
export class TrimOrdersRepository extends Repository<TrimOrdersEntity> {
    constructor(@InjectRepository(TrimOrdersEntity)
    private trimOrdersRepository: Repository<TrimOrdersEntity>
        // @InjectConnection() private readonly connection: Connection
    ) {
        super(trimOrdersRepository.target, trimOrdersRepository.manager, trimOrdersRepository.queryRunner);
    }


 
    async getTrimOders(): Promise<any[]> {
        const query = this.createQueryBuilder('to')
            .select('*')
        return await query.getRawMany();
    }

    
}