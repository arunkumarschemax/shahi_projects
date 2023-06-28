import { Injectable } from '@nestjs/common';
import { UsersAdaptor } from './adapters/users.adapter';
import { UsersRepository } from './repository/users.repository';
import { UsersDto } from './dto/users.dto';
import { UsersResponseModel } from '@project-management-system/shared-models';
import { UsersEntity } from './users.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';

@Injectable()
export class UsersService {
    constructor(
        private adaptor: UsersAdaptor,
        private userRepository: UsersRepository
    ) { }

    async createUser(req: UsersDto): Promise<UsersResponseModel> {
        let findAllRecords: UsersEntity[]
        if (!req.id) {
            findAllRecords = await this.userRepository.find();
            for (const records of findAllRecords) {
                if (records.username === req.username) {
                    throw new ErrorResponse(99999, 'User already existed');
                }
            }
            const adapterData = this.adaptor.convertDtoToEntity(req);
            await this.userRepository.save(adapterData)
            return new UsersResponseModel(true, 200, "User created succesufully")
        } else if (req.id) {
            findAllRecords = await this.userRepository.find();
            for (const records of findAllRecords) {
                if (records.username === req.username) {
                    throw new ErrorResponse(99999, 'User already existed');
                }
            }
            const adapterData = this.adaptor.convertDtoToEntity(req);
            await this.userRepository.save(adapterData)
            return new UsersResponseModel(true, 200, "User updated succesufully")
        }
    }

}
