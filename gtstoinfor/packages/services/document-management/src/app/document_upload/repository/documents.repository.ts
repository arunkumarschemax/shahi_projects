import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { DocumentEntity } from "../entities/documents.entity";

@Injectable()
export class DocumentRepository extends Repository<DocumentEntity>{
    constructor(private dataSource: DataSource) {
        super(DocumentEntity, dataSource.createEntityManager());
    }
}