import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { AddressEntity } from "./address.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class AddressRepository extends Repository<AddressEntity> {
    constructor(@InjectRepository(AddressEntity) private userRepository: Repository<AddressEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
}