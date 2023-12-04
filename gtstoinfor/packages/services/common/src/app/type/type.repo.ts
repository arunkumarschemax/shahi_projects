import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Type } from "./type.entity";

@Injectable()
export class TypeRepository extends Repository<Type> {

    constructor(@InjectRepository(Type) private Type: Repository<Type>
    ) {
        super(Type.target, Type.manager, Type.queryRunner);
    }
}