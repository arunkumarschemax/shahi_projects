import { Injectable } from '@nestjs/common';
import { UsersAdaptor } from './adapters/users.adapter';
import { UsersRepository } from './repository/users.repository';
import { UsersDto } from './dto/users.dto';
import { UsersResponseModel } from '@project-management-system/shared-models';
import { UsersEntity } from './users.entity';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object';
import { InjectRepository } from '@nestjs/typeorm';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    private adaptor: UsersAdaptor,
    private userRepository: UsersRepository
  ) { }
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }



  async createUser(req: UsersDto): Promise<UsersResponseModel> {
    let findAllRecords: UsersEntity[]
    if (!req.id) {
      console.log('before');
      findAllRecords = await this.userRepository.find();
      console.log('after');
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
