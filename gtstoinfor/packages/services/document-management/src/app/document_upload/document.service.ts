
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentEntity } from './entities/documents.entity';
import { DocumentDto } from './dto/document.dto';
import { DeleteDto } from './dto/delete-dto';
import { DocumentResponseModel } from '../../../../../libs/shared-models/src/document-management/document-response.model'
import { DocumentRepository } from './repository/documents.repository';
import { CommonResponseModel } from '@project-management-system/shared-models';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    private repository: DocumentRepository,
  ) { }

  async create(createDto: DocumentDto): Promise<any> {
    console.log('----------------')
    console.log(createDto)
    console.log('----------------')

    const entity = new DocumentEntity()
    entity.documentName = createDto.documentName;

    const updatedDocument = await this.repository.save(entity);
    console.log(updatedDocument, '---------updatedDocument')
    // const Document = new DocumentDto(updatedDocument.id,updatedDocument.documentName,updatedDocument.createdAt,updatedDocument.createdUser,updatedDocument.isActive,updatedDocument.updatedAt,updatedDocument.updatedUser,updatedDocument.versionFlag)
    return new DocumentResponseModel(true,3333,"created successfully")
  }




  async getAllDocuments(): Promise<any> {
    const data = await this.repository.find();
    if (data.length === 0) {
      console.log('oooo');
    }
    return data;
  }

  async activateOrDeactivateDocument(deleteDto: DeleteDto): Promise<CommonResponseModel> {
    const record = await this.repository.findOne({ where: { id: deleteDto.id } });

    await this.repository.update({ id: deleteDto.id }, { isActive: !record.isActive });
    const internalMessage: string = !record.isActive ? "Activated Sucessfully" : "Deactivated Successfully"
    return new CommonResponseModel(true, 6876, internalMessage)
  }
  async getById(id: number): Promise<DocumentEntity> {
    const Response = await this.repository.findOne({
      where: { id: id },
    });
    if (Response) {
      return Response;
    } else {
      return null;
    }
  }

}
