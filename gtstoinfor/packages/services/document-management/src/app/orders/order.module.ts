
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersEntity } from './entities/order.entity';
import { FileUploadEntity } from './entities/file-upload.entity';
import { OrdersController } from './order.controller';
import { OrdersService } from './order.service';
import { OrdersAdapter } from './adapters/order.adapter';
import { OrdersRepository } from './repositories/order.repository';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { FileUploadRepository } from './repositories/upload.repository';
import { DocumentsListService } from '../document_upload/upload_document.service';
import { DocumentsListRepository } from '../document_upload/repository/documents-list.repository';
import { DocumentUploadModule } from '../document_upload/document_upload.module';
import { DocumentService } from '../document_upload/document.service';
import { DocumentRoleMappingRepository } from '../document_upload/repository/document-role-repository';
import { DocumentsList } from '../document_upload/entities/upload-document-entity';
import { DocumentRepository } from '../document_upload/repository/documents.repository';
import { UploadDocumentListAdapter } from '../document_upload/repository/upload-document-adapter';
import { DocumentEntity } from '../document_upload/entities/documents.entity';
import { Repository } from 'typeorm';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersEntity, FileUploadEntity,DocumentsList
    ]),DocumentUploadModule],
  controllers: [OrdersController],
  providers: [OrdersService,DocumentsListService,OrdersRepository,DocumentsListRepository, OrdersAdapter, ApplicationExceptionHandler,FileUploadRepository,Repository,UploadDocumentListAdapter,DocumentRepository,DocumentRoleMappingRepository]
})
export class OrdersModule { }
