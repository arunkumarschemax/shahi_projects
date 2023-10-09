import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UploadPriceListEntity } from "../entities/upload-price-list-entity";
import { PriceListChildEntity } from "../entities/price-list-child-entity";

@Injectable()
export class UploadPriceListRepository extends Repository<UploadPriceListEntity> {
    constructor(@InjectRepository(UploadPriceListEntity) private uploadPriceFile: Repository<UploadPriceListEntity>
    ) {
        super(uploadPriceFile.target, uploadPriceFile.manager, uploadPriceFile.queryRunner);
    }

    async getFilesData(): Promise<any[]> {
       
        const query = this.createQueryBuilder('up')
            .select(`up.id as fileId , up.file_name as fileName , up.file_path as filePath, DATE_FORMAT(up.created_at, '%Y-%m-%d %h:%i %p') AS uploadedDate, 
            up.created_user as createdUser, up.status as status, COUNT(pc.sample_code) as records`)
            .leftJoin(PriceListChildEntity,'pc','up.id = pc.file_id')
            .where(`up.is_active = 1`)
            .groupBy(`up.id`)
            query.orderBy(`up.created_at`, 'DESC')

        return await query.getRawMany();
    }

    async getUploadedTime(): Promise<any[]> {
        const query = this.createQueryBuilder()
            .select(`file_name AS fileName, DATE_FORMAT(created_at, '%Y-%m-%d %h:%i %p') AS createdAt`)
            .where(`status = 'Success'`)
            .orderBy(`created_at`, 'DESC')
            .limit(2)
        return await query.getRawMany();
    }
}