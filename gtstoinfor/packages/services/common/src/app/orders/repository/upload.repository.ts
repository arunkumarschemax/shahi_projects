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

    async getFilesData(): Promise<any[]> {
        const query = this.createQueryBuilder('fup')
            .select(`fup.id as fileId , fup.file_name as fileName , fup.file_path as filePath, fup.created_at as uploadedDate, fup.created_user as createdUser, fup.status as status,fup.file_type as fileType`)
            .where(`fup.is_active = 1`)
            .orderBy(`fup.created_at`, 'DESC')
        return await query.getRawMany();
    }

    async getlatestFileIdAgainstMonth(): Promise<any[]> {
        const query = `SELECT id, created_at, month, file_name
        FROM (
            SELECT id, created_at, month, file_name,
                   ROW_NUMBER() OVER (PARTITION BY month ORDER BY created_at DESC) AS rn
            FROM file_upload
            WHERE is_active = 1
        ) AS ranked
        WHERE rn = 1
        ORDER BY month ASC`
        const result = await this.query(query)
        return result
    }

    async deleteChildData(id: number): Promise<void> {
        const queryBuilder = this.createQueryBuilder('fup');
        queryBuilder.where(`id = '${id}'`);
        await queryBuilder.delete().execute();
    }
}