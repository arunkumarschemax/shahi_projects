import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { M3StyleEntity } from "./m3-style.entity";



@Injectable()
export class M3StyleRepo extends Repository<M3StyleEntity> {
    
}