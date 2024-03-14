import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { ThreadsEntity } from "./threads.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ThreadsRepository extends Repository<ThreadsEntity> {
    constructor(@InjectRepository(ThreadsEntity) private userRepository: Repository<ThreadsEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }
}