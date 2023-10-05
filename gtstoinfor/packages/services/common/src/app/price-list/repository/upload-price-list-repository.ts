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
       
        const query = this.createQueryBuilder()
            .select(`id as fileId , file_name as fileName , file_path as filePath, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') AS uploadedDate, created_user as createdUser, status as status`)
            .where(`is_active = 1`)
            query.orderBy(`created_at`, 'DESC')

        return await query.getRawMany();
    }

    async getUploadedTime(): Promise<any[]> {
        const query = this.createQueryBuilder()
            .select(`file_name AS fileName, DATE_FORMAT(created_at, '%Y-%m-%d %H:%i') AS createdAt`)
            .where(`status = 'Success'`)
            .orderBy(`created_at`, 'DESC')
            .limit(2)
        return await query.getRawMany();
    }
}