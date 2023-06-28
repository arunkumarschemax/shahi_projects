import { Injectable } from '@nestjs/common';
import { FactoryAdapter } from './adapters/factory.adapter';
import { FactoryRepository } from './repository/factory.repository';
import { FactoryDto } from './dto/factory.dto';
import { FactoryResponseModel } from 'packages/libs/shared-models/src/common/factory/factory-response-objects';
import { ErrorResponse } from 'packages/libs/backend-utils/src/models/global-res-object'
import { FactoriesEntity } from './factories.entity';
import { Not } from 'typeorm';

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

}
