import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { BusinessArea } from "./business-area.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class BusinessAreaRepository extends Repository<BusinessArea> {

    constructor(@InjectRepository(BusinessArea) private businessArea: Repository<BusinessArea>
    ) {
        super(businessArea.target, businessArea.manager, businessArea.queryRunner);
    }
}