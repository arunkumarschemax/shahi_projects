import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Columns } from "./column.entity";

@Injectable()
export class ColumnRepository extends Repository<Columns> {

    constructor(@InjectRepository(Columns) private Columns: Repository<Columns>
    ) {
        super(Columns.target, Columns.manager, Columns.queryRunner);
    }
}