import { InjectRepository } from "@nestjs/typeorm";
import { BomTrimCreationEntity } from "./bom-trim.entity";
import { Repository } from "typeorm";
import { BomTrimAdapter } from "./dto/bom-trim.adaptor";

export class BomService{

    constructor(
        @InjectRepository(BomTrimCreationEntity)
        private bomRepository: Repository<BomTrimCreationEntity>,
        private bomAdapter: BomTrimAdapter,
    ){}
     

    
    

}