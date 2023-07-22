import {Repository } from "typeorm";
import { UsersEntity } from "../users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { FactoriesEntity } from "../../factories/factories.entity";



export class UsersRepository extends Repository<UsersEntity>{

    constructor(@InjectRepository(UsersEntity) private userRepository: Repository<UsersEntity>
    ) {
        super(userRepository.target, userRepository.manager, userRepository.queryRunner);
    }

async getdata(id:string):Promise<any>{
    const query = this.userRepository.createQueryBuilder('u')
      .select(`u.factory ,f.name, f.address`)
      .leftJoin(FactoriesEntity,'f',`u.factory=f.id`)
      .where(`u.factory=${id}`)
      return query.getRawOne()

}
    
   
}