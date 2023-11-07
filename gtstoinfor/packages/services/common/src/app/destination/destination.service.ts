import { Injectable } from '@nestjs/common';
import { Repository, Raw, getConnection } from 'typeorm';
import { DestinationDTO } from '../destination/dto/destination.dto';
import { Destination } from '../destination/destination.entity';
import { DestinationAdapter } from '../destination/dto/destination.adapter';
import { AllDestinationResponseModel, DestinationDropDownDto, DestinationDropDownResponse, DestinationResponseModel, DivisionRequest } from '@project-management-system/shared-models';
import { InjectRepository } from '@nestjs/typeorm';
import { DestinationRequest } from './dto/destination.request';
import { UserRequestDto } from './dto/user-log-dto';


@Injectable()
export class DestinationService {

  constructor(

    @InjectRepository(Destination)
    private Repository: Repository<Destination>,
    private Adapter: DestinationAdapter,
  ) { }

  async getDestinationDetailsWithoutRelations(Name: string): Promise<Destination> {
    // tslint:disable-next-line: typedef
    const Response = await this.Repository.findOne({
      where: { destinationId: Raw(alias => `destination = '${Destination}'`) },
    });
    if (Response) {
      return Response;
    } else {
      return null;
    }
  }

  async createDestination(Dto: DestinationDTO, isUpdate: boolean): Promise<DestinationResponseModel> {
    try {
      let previousValue
      // to check whether State exists with the passed  State code or not. if isUpdate is false, a check will be done whether a record with the passed Statecode is existing or not. if a record exists then a return message wil be send with out saving the data.  if record is not existing with the passed State code then a new record will be created. if isUpdate is true, then no check will be performed and  record will be updated(if record exists with the passed cluster code) or created.
      if (!isUpdate) {
        const Entity = await this.getDestinationDetailsWithoutRelations(Dto.destination);
        if (Entity) {
          //return new InformationMessageError(11104, "State already exists");
          throw new DestinationResponseModel(false, 11104, 'Destination already exists');
        }
      }
      else {
        const certificatePrevious = await this.Repository.findOne({ where: { destinationId: Dto.destinationId } })
        previousValue = certificatePrevious.destination
        const Entity = await this.getDestinationDetailsWithoutRelations(Dto.destination);
        if (Entity) {
          if (Entity.destinationId != Dto.destinationId) {
            throw new DestinationResponseModel(false, 11104, 'Destination already exists');
          }
        }
      }
      const convertedEntity: Destination = this.Adapter.convertDtoToEntity(Dto, isUpdate);
      const savedEntity: Destination = await this.Repository.save(
        convertedEntity
      );
      const savedDto: DestinationDTO = this.Adapter.convertEntityToDto(convertedEntity);
      // console.log(savedStateDto);
      if (savedDto) {
        const presentValue = savedDto.destination;
        // generating resposnse
        const response = new DestinationResponseModel(true, 1, isUpdate ? 'Destination Updated Successfully' : 'Destination Created Successfully');
        const name = isUpdate ? 'updated' : 'created'
        const displayValue = isUpdate ? 'Destination Updated Successfully' : 'Destination Created Successfully'
        const userName = isUpdate ? savedDto.updatedUser : savedDto.createdUser;
        return response
      } else {
        throw new DestinationResponseModel(false, 11106, 'Destination saved but issue while transforming into DTO');
      }
    } catch (error) {
      return error;
    }
  }

  async getAllDestination(): Promise<AllDestinationResponseModel> {
    // const page: number = 1;
    try {
      const Dtos: DestinationDTO[] = [];
      //retrieves all companies
      const Entities: Destination[] = await this.Repository.find({ order: { 'destination': 'ASC' },relations:['division'] });
      //console.log(statesEntities);
      if (Entities.length>0) {
        // converts the data fetched from the database which of type companies array to type StateDto array.
        Entities.forEach(DestinationEntity => {
          const convertedDto: DestinationDTO = this.Adapter.convertEntityToDto(
            DestinationEntity
          );
          Dtos.push(convertedDto);
        });
        const response = new AllDestinationResponseModel(true, 1, 'Destination retrieved successfully', Dtos);
      //  console.log(response,'--------------')

        return response;
      } else {
        throw new DestinationResponseModel(false, 99998, 'Data not found');
      }

    } catch (err) {
      return err;
    }
  }
  async getAllActiveDestination(): Promise<AllDestinationResponseModel> {
    // const page: number = 1;
    try {
      const DestinationDtos: DestinationDTO[] = [];
      //retrieves all companies
      const DestinationEntities: Destination[] = await this.Repository.find({
        order: { 'destination': 'ASC' }, where: { isActive: true }
      });
     // console.log(DestinationEntities)
      if (DestinationEntities) {
        // converts the data fetched from the database which of type companies array to type StateDto array.
        DestinationEntities.forEach(destinationEntity => {
          const convertedDtos: DestinationDTO = this.Adapter.convertEntityToDto(
            destinationEntity
          );
          DestinationDtos.push(convertedDtos);
        });
        const response = new AllDestinationResponseModel(true, 11108, "Destination retrieved successfully", DestinationDtos);
        return response;
      } else {
        throw new DestinationResponseModel(false, 99998, 'Data not found'); DestinationDtos
      }
    } catch (err) {
      return err;
    }
  }
  async activateOrDeactivateDestination(Req: any): Promise<DestinationResponseModel> {
    try {
      const Exists = await this.getDestinationById(Req.destinationId);
      if (Exists) {
        if (Req.versionFlag !== Exists.versionFlag) {
          throw new DestinationResponseModel(false, 10113, 'Someone updated the current destination information.Refresh and try again');
        } else {

          const Status = await this.Repository.update(
            { destinationId: Req.destinationId },
            { isActive: Req.isActive, updatedUser: Req.updatedUser });

          if (Exists.isActive) {
            if (Status.affected) {
              const DestinationResponse: DestinationResponseModel = new DestinationResponseModel(true, 10115, 'Destination is de-activated successfully');
              return DestinationResponse;
            } else {
              throw new DestinationResponseModel(false, 10111, 'Destination is already deactivated');
            }
          } else {
            if (Status.affected) {
              const DestinationResponse: DestinationResponseModel = new DestinationResponseModel(true, 10114, 'Destination is activated successfully');
              return DestinationResponse;
            } else {
              throw new DestinationResponseModel(false, 10112, 'Destination is already  activated');
            }
          }
          // }
        }
      } else {
        throw new DestinationResponseModel(false, 99998, 'No Records Found');
      }
    } catch (err) {
      return err;
    }
  }
  async getActiveDestinationById(Req: DestinationRequest): Promise<DestinationResponseModel> {
    try {
      //retrieves all companies
      const destinationEntities: Destination = await this.Repository.findOne({
        where: { destinationId: Req.destinationId }
      });

      const destinationData: DestinationDTO = this.Adapter.convertEntityToDto(destinationEntities);
      if (destinationData) {
        const response = new DestinationResponseModel(true, 11101, 'Destination retrived Successfully', destinationData);
        return response;
      }
      else {
        throw new DestinationResponseModel(false, 11106, 'Something went wrong');
      }
      // generating resposnse
    } catch (err) {
      return err;
    }
  }

  async getDestinationById(destinationId: number): Promise<Destination> {
    //  console.log(employeeId);
    const Response = await this.Repository.findOne({
      where: { destinationId: destinationId },
    });
    // console.log(employeeResponse);
    if (Response) {
      return Response;
    } else {
      return null;
    }
  }

  async getDestinationForDivisionDropDown(req:DivisionRequest ): Promise<DestinationDropDownResponse> {
    try {
        const colourEntities: DestinationDropDownDto[] = await this.Repository
            .createQueryBuilder('destination')
            .select('destination_id   as destinationId,  destination as  destination, ')
            .where(`is_active=1 and division_id='${req.divisionId}'`)
            .orderBy('destination')
            .getRawMany();

        if (colourEntities && colourEntities.length > 0) {
            const response = new DestinationDropDownResponse(true, 11108, "Destination  retrieved successfully", colourEntities);
            return response;
        } else {
            throw new DestinationDropDownResponse(false,99998, 'Data not found');
        }
    } catch (err) {
        return err;
    }
}
}
