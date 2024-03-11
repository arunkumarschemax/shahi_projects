import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { GapAddressEntity } from "./gap-address-entity";

@Injectable()
export class GapAddressRepository extends Repository<GapAddressEntity> {
    constructor(@InjectRepository(GapAddressEntity) private userRepository: Repository<GapAddressEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
}