import {Repository } from "typeorm";
import { UsersEntity } from "../users.entity";
import { InjectRepository } from "@nestjs/typeorm";



export class UsersRepository extends Repository<UsersEntity>{

    constructor(@InjectRepository(UsersEntity) private userRepository: Repository<UsersEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }


    
   
}