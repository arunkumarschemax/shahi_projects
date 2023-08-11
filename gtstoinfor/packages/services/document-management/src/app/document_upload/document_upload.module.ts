import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { DocumentsListService } from './upload_document.service';
import { DocumentsListController } from './document_upload.controller';
import { DocumentsList } from './entities/upload-document-entity';
import { UploadDocumentListAdapter } from './repository/upload-document-adapter';
import { DocumentEntity } from './entities/documents.entity';
import { DocumentService } from './document.service';
import { DocumentRepository } from './repository/documents.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        DocumentsList,
        DocumentEntity
    ])],
  controllers: [DocumentsListController],
  providers: [DocumentsListService,DocumentService,UploadDocumentListAdapter, ApplicationExceptionHandler,DocumentRepository]
})
export class DocumentListModule { }

