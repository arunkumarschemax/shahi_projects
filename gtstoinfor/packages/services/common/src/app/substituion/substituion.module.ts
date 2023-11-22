import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Substitution } from "./substituion.entity";
import { SubstituionController } from "./substituion.controller";
import { SubstituionService } from "./substituion.service";
import { ApplicationExceptionHandler } from "@project-management-system/backend-utils";
import { SubstitutionRepository } from "./substitution-repo";
import { FGItemBomRepository } from "./fg-item-bom-repo";
import { FgItemBom } from "./fg-item-bom.entity";
import { FeatureSubstitution } from "./feature-substituion.entity";
import { FeatureSubstitutionRepository } from "./feature-substitution-repo";
import { ItemSkus } from "../sku-generation/sku-generation.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Substitution,FgItemBom,FeatureSubstitution,ItemSkus]),
      ],
      controllers: [SubstituionController],
      providers: [SubstituionService,ApplicationExceptionHandler,SubstitutionRepository,FGItemBomRepository,FeatureSubstitutionRepository],
      exports: []
})
export class SubstituionModule { }