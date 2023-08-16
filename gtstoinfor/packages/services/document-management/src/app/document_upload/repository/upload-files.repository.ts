
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UploadFilesEntity } from '../entities/upload-files.entity';

// @Injectable()
// export class UploadFilesRepository extends Repository<UploadFilesEntity> {

//     // constructor(@InjectRepository(DocumentsList) private DocumentsListRepository: Repository<DocumentsList>
//     // ) {
//     //     super(DocumentsListRepository.target, DocumentsListRepository.manager, DocumentsListRepository.queryRunner);
//     // }

// }


@Injectable()
export class UploadFilesRepository extends Repository<UploadFilesEntity>{
    constructor(private dataSource: DataSource) {
        super(UploadFilesEntity, dataSource.createEntityManager());
    }
}