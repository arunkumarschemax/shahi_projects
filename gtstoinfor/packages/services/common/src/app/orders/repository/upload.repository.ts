import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileUploadEntity } from "../entities/upload-file.entity";
import { FileIdReq } from "../models/file-id.req";

@Injectable()
export class FileUploadRepository extends Repository<FileUploadEntity> {
    constructor(@InjectRepository(FileUploadEntity) private fileUpload: Repository<FileUploadEntity>
    ) {
        super(fileUpload.target, fileUpload.manager, fileUpload.queryRunner);
    }

    async getLatestRecord (): Promise<any[]> {
        const query = this.createQueryBuilder('fup')
        .select(`fup.id as fileId`)
        .orderBy(`fup.created_at`, 'DESC')
        .limit(1)
        return await query.getRawMany();
    }

    async deleteChildData(id:number): Promise<void> {
        const queryBuilder = this.createQueryBuilder('fup');
        queryBuilder.where(`id = '${id}'`);
        await queryBuilder.delete().execute();
      }
}