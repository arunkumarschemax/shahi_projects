import { Injectable } from '@nestjs/common';
import { FactoryAdapter } from './adapters/factory.adapter';
import { FactoryRepository } from './repository/factory.repository';
import { FactoryDto } from './dto/factory.dto';
import { FactoryResponseModel } from 'packages/libs/shared-models/src/common/factory/factory-response-objects';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object'
import { FactoriesEntity } from './factories.entity';
import { Not, Raw } from 'typeorm';
import { AllFactoriesResponseModel, FactoryActivateDeactivateDto, FactoryDto as NewFactoriesDto } from '@project-management-system/shared-models';

@Injectable()
export class FactoriesService {
  constructor(
    private adaptor: FactoryAdapter,
    private factoryRepository: FactoryRepository,
  ) { }

  async getFactoryWithoutRelations(name: string): Promise<FactoriesEntity> {
    // tslint:disable-next-line: typedef
    const FactoryResponseModel = await this.factoryRepository.findOne({
      where: { name: Raw(alias => `name = '${name}'`) },
    });
    if (FactoryResponseModel) {
      return FactoryResponseModel;
    } else {
      return null;
    }
  }

  async createFactory(factoryDto: FactoryDto, isUpdate: boolean): Promise<FactoryResponseModel> {
    console.log(factoryDto, 'fffffffffffff');
    try {
      let previousValue
      // console.log(isUpdate,"isUpdate");
      const factoryDtos: FactoryDto[] = [];
      //   console.log(res);
      if (!isUpdate) {
        const FactoryEntity = await this.getFactoryWithoutRelations(factoryDto.name);
        if (FactoryEntity) {
          //return new InformationMessageError(11104, "State already exists");
          throw new FactoryResponseModel(false, 11104, 'Factory Name already exists');
        }
      }
      else {
        const factoryPrevious = await this.factoryRepository.findOne({ where: { id: factoryDto.id } })
        previousValue = (factoryPrevious.name)
        const FactoryEntity = await this.getFactoryWithoutRelations(factoryDto.name);
        if (FactoryEntity) {
          if (FactoryEntity.id != factoryDto.id) {
            throw new FactoryResponseModel(false, 11104, 'Factory already exists');
          }
        }
      }


      const convertedFactoryEntity: FactoriesEntity = this.adaptor.convertDtoToEntity(factoryDto, isUpdate);
      const savedFactoryEntity: FactoriesEntity = await this.factoryRepository.save(convertedFactoryEntity);
      const savedfactoryDto: FactoryDto = this.adaptor.convertEntityToDto(savedFactoryEntity);

      if (savedfactoryDto) {
        const factoryPresent = savedfactoryDto.name;
        const name = isUpdate ? 'updated' : 'created'
        const displayValue = isUpdate ? 'Factory Updated Successfully' : 'Factory Created Successfully'
        const userName = isUpdate ? savedfactoryDto.updatedUser : savedfactoryDto.createdUser;
        const response = new FactoryResponseModel(true, 1, isUpdate ? 'Factory Updated Successfully' : 'Factory Created Successfully')
        return response
      } else {
        //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
        throw new FactoryResponseModel(false, 11106, 'Factory saved but issue while transforming into DTO');
      }
    } catch (error) {
      // when error occures while saving the data , the execution will come to catch block.
      // tslint:disable-next-line: typedef
      return error;
    }

  }


  // async createFactory(req: FactoryDto): Promise<FactoryResponseModel> {
  //     let findAllRecords: FactoriesEntity[]
  //     if (!req.id) {
  //         findAllRecords = await this.factoryRepository.find();
  //         for (const records of findAllRecords) {
  //             if (records.name === req.name) {
  //                 throw new ErrorResponse(99999, 'Factory already existed');
  //             }
  //         }
  //         const adapterData = this.adaptor.convertDtoToEntity(req);
  //         await this.factoryRepository.save(adapterData);
  //         return new FactoryResponseModel(true, 200, "Created Succesufully")
  //     }
  //     else if (req.id) {
  //         findAllRecords = await this.factoryRepository.find({ where: { id: Not(req.id) } })
  //         for (const records of findAllRecords) {
  //             if (records.name === req.name) {
  //                 throw new ErrorResponse(99999, "Factory already existed")
  //             }
  //         }
  //         const adapterData = this.adaptor.convertDtoToEntity(req);
  //         await this.factoryRepository.save(adapterData);
  //         return new FactoryResponseModel(true, 200, "Updated Succesufully")
  //     }
  // }

  async getFactories(): Promise<AllFactoriesResponseModel> {
    const data = await this.factoryRepository.find()
    const factoriesData: NewFactoriesDto[] = []
    for (const record of data) {
      const adapterData = this.adaptor.convertEntityToDto(record)
      factoriesData.push(adapterData)
    }
    return new AllFactoriesResponseModel(true, 1111, 'Data retreived', factoriesData)
  }


  async getActiveFactories(): Promise<AllFactoriesResponseModel> {
    const data = await this.factoryRepository.find({ where: { isActive: true } })
    const activeFactoriesData: NewFactoriesDto[] = []
    for (const record of data) {
      const adapterData = this.adaptor.convertEntityToDto(record)
      activeFactoriesData.push(adapterData)
    }
    return new AllFactoriesResponseModel(true, 1111, 'Data retreived', activeFactoriesData)
  }

  async ActivateOrDeactivate(
    Req: FactoryDto
  ): Promise<AllFactoriesResponseModel> {
    try {
      const roleExists = await this.getfactoryById(
        Req.id
      );
      if (roleExists) {
        const roleStatus = await this.factoryRepository.update(
          { id: Req.id },
          {
            isActive: !roleExists.isActive,
            updatedUser: Req.name,
          }
        );
        const internalMessage: string = !roleExists.isActive
          ? "Activated Successfully"
          : "Daectivated Successfully";
        return new AllFactoriesResponseModel(true, 54654, internalMessage);
      } else {
        return new AllFactoriesResponseModel(false, 654695, "Data Not Found");
      }
    } catch (err) {
      return err;
    }
  }

  async LocationActivateDeactivateUnitDto(
    Req: FactoryDto
  ): Promise<AllFactoriesResponseModel> {
    const record = await this.factoryRepository.findOne({
      where: { id: Req.id },
    });

    await this.factoryRepository.update(
      { id: Req.id },
      { isActive: !record.isActive }
    );
    const internalMessage: string = !record.isActive
      ? "Activated Sucessfully"
      : "Deactivated Successfully";
    return new AllFactoriesResponseModel(true, 6876, internalMessage);
  }

  async getfactoryById(
    id: number
  ): Promise<FactoriesEntity> {
    const Response = await this.factoryRepository.findOne({
      where: { id: id },
    });
    if (Response) {
      return Response;
    } else {
      return null;
    }
  }
}










//     async activateOrDeactivate(req: FactoryActivateDeactivateDto): Promise<FactoryResponseModel> {
//         const factoryExists = await this.factoryRepository.findOne({ where: { id: req.id } })
//         if (factoryExists) {
//             if (factoryExists.versionFlag != req.versionFlag) {
//                 return new FactoryResponseModel(false, 10113, 'Someone updated the current user information.Refresh and try again')
//             } else {
//                 const updateStatus = await this.factoryRepository.update({ id: req.id }, { isActive: req.isActive })
//                 if (updateStatus) {
//                     return new FactoryResponseModel(true, 10115, `User is ${factoryExists.isActive ? 'de-activated' : 'activated'}-activated successfully `)
//                 } else {
//                     return new FactoryResponseModel(false, 500, 'Error while updating');
//                 }
//             }
//         } else {
//             new ErrorResponse(99999, 'No records found')
//         }

//     }


