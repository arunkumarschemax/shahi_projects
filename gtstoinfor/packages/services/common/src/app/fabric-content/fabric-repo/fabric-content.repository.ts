import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FabricContent } from "../fabric-content.entity";

@Injectable()
export class FabricContentRepository extends Repository<FabricContent> {
    constructor(@InjectRepository(FabricContent) private userRepository: Repository<FabricContent>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
}