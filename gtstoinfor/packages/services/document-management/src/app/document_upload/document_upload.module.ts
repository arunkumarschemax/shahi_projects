import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { DocumentsListService } from './upload_document.service';
import { DocumentsList } from './entities/upload-document-entity';
import { UploadDocumentListAdapter } from './repository/upload-document-adapter';
import { DocumentEntity } from './entities/documents.entity';
import { DocumentService } from './document.service';
import { DocumentRepository } from './repository/documents.repository';
import { DocumentRoleMapping } from './models/document-role-mapping.dto';
import { DocumentRoleMappingEntity } from './entities/document-role-entity';
import { DocumentRoleMappingRepository } from './repository/document-role-repository';
import { DocumentRoleMappingService } from './document_role_mapping.service';
import { OrdersRepository } from 'packages/services/common/src/app/orders/repository/orders.repository';
import { DocumentUploadController } from './document_upload.controller';
import { OrdersEntity } from 'packages/services/common/src/app/orders/entities/orders.entity';
import { OrdersChildEntity } from 'packages/services/common/src/app/orders/entities/orders-child.entity';
import { OrdersModule } from '../orders/order.module';
import { DocumentsListRepository } from './repository/documents-list.repository';
import { UploadFilesRepository } from './repository/upload-files.repository';
import { UploadFilesEntity } from './entities/upload-files.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      DocumentsList,
      DocumentEntity,
      DocumentRoleMappingEntity,
      UploadFilesEntity
    ])],
  controllers: [DocumentUploadController],
  providers: [DocumentRoleMappingRepository, DocumentsListService, DocumentService, UploadDocumentListAdapter, ApplicationExceptionHandler, DocumentRepository, DocumentRoleMappingService, DocumentsListRepository, UploadFilesRepository],
  exports: [DocumentsListService, TypeOrmModule]
})
export class DocumentUploadModule { }

