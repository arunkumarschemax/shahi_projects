import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { M3ItemsEntity } from "./m3-items.entity";




@Injectable()
export class M3ItemsRepo extends Repository<M3ItemsEntity> {
    
}