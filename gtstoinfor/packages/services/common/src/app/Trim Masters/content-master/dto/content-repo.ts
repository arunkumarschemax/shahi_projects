import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ContentEntity } from "./content-entity";
@Injectable()
export class ContentRepo extends Repository<ContentEntity> {
    constructor(@InjectRepository(ContentEntity) private contentrepo: Repository<ContentEntity>
    ) {
        super(contentrepo.target, contentrepo.manager, contentrepo.queryRunner);
    }
}