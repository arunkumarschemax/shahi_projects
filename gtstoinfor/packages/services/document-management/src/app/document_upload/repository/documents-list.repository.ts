import {  EntityRepository, Repository } from "typeorm";
import { DocumentsList } from "../entities/upload-document-entity";

@EntityRepository(DocumentsList)
export class DocumentsListRepository extends Repository<DocumentsList>{

}