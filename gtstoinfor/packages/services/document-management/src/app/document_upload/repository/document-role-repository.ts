import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { RoleEntity } from "../entities/document-role-entity";

@Injectable()
export class RoleRepository extends Repository<RoleEntity>{
    constructor(private dataSource: DataSource) {
        super(RoleEntity, dataSource.createEntityManager());
    }
}