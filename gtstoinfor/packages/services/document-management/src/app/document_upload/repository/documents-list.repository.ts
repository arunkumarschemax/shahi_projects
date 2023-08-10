
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { DocumentsList } from '../entities/upload-document-entity';

@Injectable()
export class DocumentsListRepository extends Repository<DocumentsList> {

    // constructor(@InjectRepository(DocumentsList) private DocumentsListRepository: Repository<DocumentsList>
    // ) {
    //     super(DocumentsListRepository.target, DocumentsListRepository.manager, DocumentsListRepository.queryRunner);
    // }

}