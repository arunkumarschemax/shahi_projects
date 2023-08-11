import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { DocumentRoleMappingEntity } from "../entities/document-role-entity";
@Injectable()
export class DocumentRoleMappingRepository extends Repository<DocumentRoleMappingEntity>{
    constructor(private dataSource: DataSource) {
        super(DocumentRoleMappingEntity, dataSource.createEntityManager());
    }
}