import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FabricRequestEntity } from "./fabric-request.entity";
import { Injectable } from "@nestjs/common";
import { FabricRequestRepository } from "./repository/fabric-request.repository";

@Injectable()
export class FabricDevelopmentService {
    constructor (
         private FabricRepo: FabricRequestRepository,
    ){}


    
}