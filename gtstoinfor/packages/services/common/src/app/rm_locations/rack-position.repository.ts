import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { RackPositionEntity } from "./rack-position.entity";

@Injectable()
export class StyleRepo extends Repository<RackPositionEntity> {
    
}