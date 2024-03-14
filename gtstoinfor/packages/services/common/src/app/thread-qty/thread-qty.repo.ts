import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ThreadQtyEntity } from "./thread-qty.entity";


@Injectable()
export class ThreadQtyRepo extends Repository<ThreadQtyEntity> {
    constructor(@InjectRepository(ThreadQtyEntity) private threadQtyRepo: Repository<ThreadQtyEntity>
    ) {
        super(threadQtyRepo.target, threadQtyRepo.manager, threadQtyRepo.queryRunner);
    }

   
}