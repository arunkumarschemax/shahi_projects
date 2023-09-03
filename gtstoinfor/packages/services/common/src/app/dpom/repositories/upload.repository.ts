import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { NikeFileUploadEntity } from "../entites/upload-file.entity";


@Injectable()
export class NikeFileUploadRepository extends Repository<NikeFileUploadEntity> {
    constructor(@InjectRepository(NikeFileUploadEntity) private fileUpload: Repository<NikeFileUploadEntity>
    ) {
        super(fileUpload.target, fileUpload.manager, fileUpload.queryRunner);
    }

    async getFilesData(): Promise<any[]> {
        const query = this.createQueryBuilder('fup')
            .select(`fup.id as fileId , fup.file_name as fileName , fup.file_path as filePath, fup.created_at as uploadedDate, fup.created_user as createdUser, fup.status as status`)
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