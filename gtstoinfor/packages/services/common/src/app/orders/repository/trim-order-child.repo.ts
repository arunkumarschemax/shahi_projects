import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TrimOrdersChildEntity } from "../entities/trim-orders-child.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FileIdReq } from "../models/file-id.req";

@Injectable()
export class TrimOrdersChildRepository extends Repository<TrimOrdersChildEntity> {
    constructor(@InjectRepository(TrimOrdersChildEntity)
    private trimorderChildRepository: Repository<TrimOrdersChildEntity>
        // @InjectConnection() private readonly connection: Connection
    ) {
        super(trimorderChildRepository.target, trimorderChildRepository.manager, trimorderChildRepository.queryRunner);
    }

    async getVersion(orderNo: string,sizeCode:string,colorCode:string): Promise<any[]> {
        const query = this.createQueryBuilder('oc')
            .select(`id,order_no,color_code,size_code,version`)
            .where(` order_no = '${orderNo}' and size_code='${sizeCode}' and color_code='${colorCode}'`)
            .orderBy(` version`, 'DESC')
        return await query.getRawMany();
    }

    async deleteTrimChildData(req: FileIdReq): Promise<void> {
        const queryBuilder = this.createQueryBuilder('oc');
        queryBuilder.where(`file_id = '${req.fileId}'`);
        await queryBuilder.delete().execute();
    }
    async getUpdatedTrimData(): Promise<any[]> {
        const query = this.createQueryBuilder('oc')
            .select(`oc.file_id as fileId`)
            .orderBy(` oc.id`, 'DESC')
            .limit(1)
        return await query.getRawMany();
    }
}