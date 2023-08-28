
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FileUploadEntity } from "../entities/file-upload.entity";


@Injectable()
export class FileUploadRepository extends Repository<FileUploadEntity> {
    constructor(@InjectRepository(FileUploadEntity) private fileUpload: Repository<FileUploadEntity>
    ) {
        super(fileUpload.target, fileUpload.manager, fileUpload.queryRunner);
    }

    async getFilesData(): Promise<any[]> {
        const query = this.createQueryBuilder('fup')
            .select(`fup.id as fileId , fup.file_name as fileName , fup.file_path as filePath, fup.created_at as uploadedDate, fup.created_user as createdUser, fup.status as status, fup.updated_user as updatedUser`)
            .where(`fup.is_active = 1`)
            .orderBy(`fup.created_at`, 'DESC')
        return await query.getRawMany();
    }

    async deleteChildData(id: number): Promise<void> {
        const queryBuilder = this.createQueryBuilder('fup');
        queryBuilder.where(`id = '${id}'`);
        await queryBuilder.delete().execute();
    }
}