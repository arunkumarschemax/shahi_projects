import { Injectable } from '@nestjs/common';
import { FactoryAdapter } from './adapters/factory.adapter';
import { FactoryRepository } from './repository/factory.repository';
import { FactoryDto } from './dto/factory.dto';
import { FactoryResponseModel } from 'packages/libs/shared-models/src/common/factory/factory-response-objects';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object'
import { FactoriesEntity } from './factories.entity';
import { Not } from 'typeorm';
import { AllFactoriesResponseModel, FactoryActivateDeactivateDto, FactoryDto as NewFactoriesDto } from '@project-management-system/shared-models';
import axios from 'axios'
import { M3toCustomObj, construnctDataFromM3Result } from 'packages/libs/backend-utils/src/m3-utils';
const https = require('https');

const m3Connection = { USER_NAME: 'planmnb', PASSWORD: 'planmnb7' };
@Injectable()
export class FactoriesService {
    constructor(
        private adaptor: FactoryAdapter,
        private factoryRepository: FactoryRepository,
    ) { }

    async createFactory(req: FactoryDto): Promise<FactoryResponseModel> {
        let findAllRecords: FactoriesEntity[]
        if (!req.id) {
            findAllRecords = await this.factoryRepository.find();
            for (const records of findAllRecords) {
                if (records.name === req.name) {
                    throw new ErrorResponse(99999, 'Factory already existed');
                }
            }
            const adapterData = this.adaptor.convertDtoToEntity(req);
            await this.factoryRepository.save(adapterData);
            return new FactoryResponseModel(true, 200, "Created Succesufully")
        }
        else if (req.id) {
            findAllRecords = await this.factoryRepository.find({ where: { id: Not(req.id) } })
            for (const records of findAllRecords) {
                if (records.name === req.name) {
                    throw new ErrorResponse(99999, "Factory already existed")
                }
            }
            const adapterData = this.adaptor.convertDtoToEntity(req);
            await this.factoryRepository.save(adapterData);
            return new FactoryResponseModel(true, 200, "Updated Succesufully")
        }
    }

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

    async activateOrDeactivate(req: FactoryActivateDeactivateDto): Promise<FactoryResponseModel> {
        const factoryExists = await this.factoryRepository.findOne({ where: { id: req.id } })
        if (factoryExists) {
            if (factoryExists.versionFlag != req.versionFlag) {
                return new FactoryResponseModel(false, 10113, 'Someone updated the current user information.Refresh and try again')
            } else {
                const updateStatus = await this.factoryRepository.update({ id: req.id }, { isActive: req.isActive, updatedUser: req.updatedUser })
                if (updateStatus) {
                    return new FactoryResponseModel(true, 10115, `User is ${factoryExists.isActive ? 'de-activated' : 'activated'}-activated successfully `)
                } else {
                    return new FactoryResponseModel(false, 500, 'Error while updating');
                }
            }
        } else {
            new ErrorResponse(99999, 'No records found')
        }

    }

    async getFactoriesDataFromM3() {
        try {
          const auth =
            'Basic ' +
            Buffer.from(
              `${m3Connection.USER_NAME}:${m3Connection.PASSWORD}`
            ).toString('base64');
          const headersRequest = {
            Authorization: `${auth}`,
          };
          const agent = new https.Agent({
            rejectUnauthorized: false,
          });
          const url = 'https://172.17.3.115:23005/m3api-rest/execute/CRS008MI/ListFacility?CONO=111'
            const args = [{key :'CONO',value:'111'}]
          // const response = await this.m3GenericService.callM3Api('MNS100MI','LstDivisions',args)
        
          const response = await axios.get(url, { headers: headersRequest, httpsAgent: agent  })
          if (response) {
            if (response.data) {
              const options:M3toCustomObj[] = [{m3Key :'FACN' , yourKey :'name'}]
              const saveData = await construnctDataFromM3Result(options,response.data.MIRecord)
              console.log('---------',saveData)
              return saveData;
            } else {
              return 'No response Data';
            }
          } else {
            ('No response');
          }   
        } catch (error) {
          console.log(error, '************');
          throw error;
        }
      }

}
