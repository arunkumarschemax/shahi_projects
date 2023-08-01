import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApplicationExceptionHandler } from '@project-management-system/backend-utils';
import { PackageTerms } from './package-terms.entity';
import { PackageTermsAdapter } from './dto/package-terms.adapter';
import { PackageTermsController } from './package-terms.controller';
import { PackageTermsService } from './package-terms.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PackageTerms]),
  ],
  controllers: [PackageTermsController],
  providers: [PackageTermsService,PackageTermsAdapter,ApplicationExceptionHandler]
})
export class PackageTermsModule {}
