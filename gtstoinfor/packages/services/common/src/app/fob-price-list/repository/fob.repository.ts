import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FobEntity } from "../fob.entity";

@Injectable()
export class FobRepository extends Repository<FobEntity> {
    constructor(@InjectRepository(FobEntity) private userRepository: Repository<FobEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
}