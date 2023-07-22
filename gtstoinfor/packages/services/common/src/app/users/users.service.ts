import { Injectable } from "@nestjs/common";
import { UsersAdaptor } from "./adapters/users.adapter";
import { UsersRepository } from "./repository/users.repository";
import { UsersDto } from "./dto/users.dto";
import {
  UsersResponseModel,
  AllUsersResponseModel,
  UsersActivateDeactivateDto,
  LoginDto,
  AuthResponseModel,
  AuthModel,
} from "@project-management-system/shared-models";
import { UsersEntity } from "./users.entity";
import { ErrorResponse } from "packages/libs/backend-utils/src/models/global-res-object";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderDataSource } from "./app-data-source";
import { useLocation } from 'react-router-dom';
import { FactoriesEntity } from "../factories/factories.entity";

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
      username: "john",
      password: "changeme",
    },
    {
      userId: 2,
      username: "maria",
      password: "guess",
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  async createUser(req: UsersDto): Promise<UsersResponseModel> {
    let findAllRecords: UsersEntity[];
    if (!req.id) {
      console.log("before");
      findAllRecords = await this.userRepository.find();
      console.log("after");
      for (const records of findAllRecords) {
        if (records.username === req.username) {
          throw new ErrorResponse(99999, "User already existed");
        }
      }
      const adapterData = this.adaptor.convertDtoToEntity(req);
      const addstatus = await this.userRepository.save(adapterData);
      if (addstatus) {
        return new UsersResponseModel(true, 200, "User created succesufully");
      } else {
        throw new ErrorResponse(99999, "Error while creating user");
      }
    } else if (req.id) {
      findAllRecords = await this.userRepository.find();
      for (const records of findAllRecords) {
        if (records.username === req.username) {
          throw new ErrorResponse(99999, "User already existed");
        }
      }
      const adapterData = this.adaptor.convertDtoToEntity(req);
      await this.userRepository.save(adapterData);
      return new UsersResponseModel(true, 200, "User updated succesufully");
    }
  }

  async getAllUsers(): Promise<AllUsersResponseModel> {
    const data = await this.userRepository.find();
    const UsersData: UsersDto[] = [];
    for (const record of data) {
      const adapterData = this.adaptor.convertEntityToDto(record);
      UsersData.push(adapterData);
    }
    return new AllUsersResponseModel(
      true,
      200,
      "Data retreived succesufully",
      UsersData
    );
  }

  async activateOrDeactivate(req: UsersActivateDeactivateDto): Promise<UsersResponseModel> {
    try {
      const userExists = await this.userRepository.findOne({ where: { id: req.id } })
      if (userExists) {
        if (userExists.versionFlag != req.versionFlag) {
          throw new ErrorResponse(10113, 'Someone updated the current user information.Refresh and try again');
        } else {
          const updateStatus = await this.userRepository.update({ id: req.id }, { isActive: req.isActive, updatedUser: req.updatedUser });
          if (updateStatus.affected) {
            return new UsersResponseModel(true, 10115, `User is ${userExists.isActive ? 'de-activated' : 'activated'}-activated successfully `)
          } else {
            return new UsersResponseModel(false, 500, 'Error while updating');
          }
          // else{
          //   if(userStatus.affected){
          //     return new UsersResponseModel(true, 10115, 'User is activated successfully');
          //   }else{
          //     return new UsersResponseModel(false, 500, 'Error while activating');
          //   }
          // }
        }
      } else {
        throw new ErrorResponse(99998, 'No Records Found');
      }
    } catch (error) {
      return error;
    }
  }

  async login(dto:LoginDto):Promise<AuthResponseModel>{
    console.log(dto)
      const validateUser = await OrderDataSource.manager.findOneBy(UsersEntity,{username:dto.userName,password:dto.password})
      console.log(validateUser,'user data')
      // if(!validateUser) return new AuthResponseModel(false,1111,'Please check your credentials')
      // const rolesQuery = `select  urp.role_id as roleId,r.role,r.company_id as companyId  from user_role_mapping urp left join role r on  r.id= urp.role_id where urp.user_id = ${validateUser.id}` 
      // const rolesData = await OrderDataSource.query(rolesQuery);
      // console.log(rolesData)
      const user = await this.userRepository.getdata(validateUser.factory)
      const rolesData = [{role:'', roleId:1, companyId:1}]
      const authModel = new AuthModel( validateUser.username,rolesData[0]?.role, validateUser.factory, rolesData[0]?.companyId, validateUser.id,rolesData[0]?.roleId);
      const state={selectedFactoryName:user.name};

      // const location = useLocation();
      // const selectedFactory = location.state?.selectedFactory 
      
      return new AuthResponseModel(true,1111,`Sucessfully logined with`+ ' ' + user.address , authModel )
  }
  

  
}
