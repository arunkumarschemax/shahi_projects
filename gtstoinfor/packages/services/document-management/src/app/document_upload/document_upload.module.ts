import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DocumentService } from './document.service';
import { DocumentEntity } from './entities/documents.entity';
import { DocumentController } from './document_upload.controller';
@Module({

  imports: [TypeOrmModule.forFeature([DocumentEntity])],
  controllers: [DocumentController],
  providers: [DocumentService,],
})
export class DocumentModule {}