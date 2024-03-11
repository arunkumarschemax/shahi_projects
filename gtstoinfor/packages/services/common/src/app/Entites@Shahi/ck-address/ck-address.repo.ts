import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CkAddressEntity } from "./ck-address-entity";

@Injectable()
export class CkAddressRepository extends Repository<CkAddressEntity> {
    constructor(@InjectRepository(CkAddressEntity) private userRepository: Repository<CkAddressEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
}