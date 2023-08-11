import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { DocumentsListService } from './upload_document.service';
import { DocumentsListController } from './document_upload.controller';
import { DocumentsList } from './entities/upload-document-entity';
import { UploadDocumentListAdapter } from './repository/upload-document-adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([
        DocumentsList,
    ])],
  controllers: [DocumentsListController],
  providers: [DocumentsListService,UploadDocumentListAdapter, ApplicationExceptionHandler]
})
export class DocumentListModule { }

