
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentEntity } from './entities/documents.entity';
import { DocumentDto } from './dto/document.dto';
import { DeleteDto } from './dto/delete-dto';
import {DocumentResponseModel} from '../../../../../libs/shared-models/src/document-management/document-response.model'
import { DocumentRepository } from './repository/documents.repository';

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(DocumentEntity)
        private repository:DocumentRepository ,
    ) { }

    async create(createDto: DocumentDto, entity: DocumentEntity): Promise<DocumentDto> {
        createDto.documentName = entity.documentName;

        const updatedDocument = await this.repository.save(createDto);

        return updatedDocument;
    }


    // async getAllDocuments(): Promise<DocumentResponseModel> {
    //     const data = await this.repository.find();
    //     let info = []
    //     if (data.length === 0) {
    //         console.log('oooo');
    //         for(const rec of data){
    //             info.push(new DocumentDto(rec.id,rec.documentName,rec.createdUser,rec.isActive,rec.updatedAt,rec.updatedUser,rec.updatedAt,rec.createdAt,rec.versionFlag))
    //         }
    //     }
    //     return new DocumentResponseModel(
    //         true,23333,`data retrieved successfully`
    //     )
    // }

    async getAllDocuments(): Promise<any> {
        const data = await this.repository.find();
        if (data.length === 0) {
          console.log('oooo');
        }
        return data;
      }

    async activateOrDeactivateDepartment(id: DeleteDto): Promise<DocumentResponseModel> {
        const finding = await this.repository.findOne({ where: { id: id.id }, });
        await this.repository.update(
            { id: id.id },
            { isActive: !finding.isActive }
        );
        return new DocumentResponseModel(
            true,
            6787,
            `${finding.isActive === true ? 'Deactivated' : 'Activated'} succesfully`,

        )
    }
}

