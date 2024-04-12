import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ColorEntity } from "./color-entity";

@Injectable()
export class ColorRepository extends Repository<ColorEntity> {
    constructor(@InjectRepository(ColorEntity) private userRepository: Repository<ColorEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
}