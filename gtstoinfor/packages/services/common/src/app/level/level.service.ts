import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Raw, Repository } from 'typeorm';
import {AllLevelResponseModel,LevelResponseModel} from '@project-management-system/shared-models';
import { FabricsResponseModel } from '@project-management-system/shared-models';
import { UserRequestDto } from '../currencies/dto/user-logs-dto';
import { LevelsAdapter } from './dto/level.adapter';
import { Levels } from './level.entity';
import { LevelsRequest } from './dto/level.req';
import { LevelsDTO } from './dto/level.dto';
import { Console } from 'console';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Levels)
    private levelRepository: Repository<Levels>,
    private levelAdapter: LevelsAdapter,
  ) { }
  async getLevelsWithoutRelations(level: string): Promise<Levels> {
    const levelResponse = await this.levelRepository.findOne({
      where: { levelName: Raw(alias => `level_Name = '${level}'`) },
    });
    if (levelResponse) {
      return levelResponse;
    }
    else {
      return null;
    }
  }


  async createLevel(leveldto: LevelsDTO, isUpdate: boolean): Promise<LevelResponseModel> {
    console.log('ertyudfghjk============', leveldto)
    // const response = new ProfitControlHeadResponseModel();

    try {
      let previousValue
      const levelDtos: LevelsDTO[] = [];

      if (!isUpdate) {

        const levelEntity = await this.getLevelsWithoutRelations(leveldto.levelName);
        if (levelEntity) {
          // console.log(fabricsEntity,'------')
          throw new FabricsResponseModel(false, 11104, 'Level already exists');
        }
      }
      else {
        // console.log('ertyudfghjk============')

        const certificatePrevious = await this.levelRepository.findOne({ where: { levelId: leveldto.levelId } })
        previousValue = (certificatePrevious.levelName)
        const levelsEntity = await this.getLevelsWithoutRelations(leveldto.levelName);
        // console.log('ertyudfghjk============',certificatePrevious)
        if (levelsEntity) {
          if (levelsEntity.levelId != leveldto.levelId) {
            throw new LevelResponseModel(false, 11104, 'Level already exists');
          }
        }
      }
      const convertedlevelsEntity: Levels = this.levelAdapter.convertDtoToEntity(leveldto, isUpdate);

      console.log(convertedlevelsEntity);
      const savedlevelEntity: Levels = await this.levelRepository.save(convertedlevelsEntity);
      const savedlevelDto:LevelsDTO = this.levelAdapter.convertEntityToDto(savedlevelEntity);
      levelDtos.push(savedlevelDto)
      //   console.log(savedlevelDto,'saved');
      if (savedlevelDto) {
        const presentValue = leveldto.levelName;
        //generating resposnse
        const response = new LevelResponseModel(true, 1, isUpdate ? 'Level Updated Successfully' : 'Level Created Successfully')
        const name = isUpdate ? 'updated' : 'created'
        const displayValue = isUpdate ? 'Level Updated Successfully' : 'Level Created Successfully'
        const userName = isUpdate ? savedlevelDto.updatedUser : savedlevelDto.createdUser;
        // const newLogDto = new LogsDto(1,name, 'Fabrics', savedProfitCenterDto.profitCenter, true, displayValue,userName,previousValue,presentValue)
        // let res = await this.logService.createLog(newLogDto);
        // console.log(response,'9999999999999999');
        // const response = new AllProfitCenterResponseModel(true,1000,isUpdate? 'Fabrics Updated Successfully': Fabrics Created Successfully');
        return response;
      } else {
        //return new InformationMessageError(11106, "State saved but issue while transforming into DTO");
        throw new LevelResponseModel(false, 11106, 'Level saved but issue while transforming into DTO');
      }
      // return response;
    } catch (error) {
      // when error occures while saving the data , the execution will come to catch block.
      // tslint:disable-next-line: typedef
      return error;
    }
  }

  async getAllLevel(): Promise<AllLevelResponseModel> {
    try {
      const levelDTO: LevelsDTO[] = [];
      const levelsEntity: Levels[] = await this.levelRepository.find({ order: { 'levelName': 'ASC' } });
      if (levelsEntity) {
        levelsEntity.forEach(levelsEntity => {
          const convertedLevelDto: LevelsDTO = this.levelAdapter.convertEntityToDto(
            levelsEntity
          );
          levelDTO.push(convertedLevelDto);
          // console.log(FabricssDTO,'kkkkkkkkkkkkk')
        });

        const response = new AllLevelResponseModel(true, 1, 'Level retrieved successfully', levelDTO);
        // console.log(response,'jkl');
        return response;
      } else {
        throw new LevelResponseModel(false, 99998, 'Data not found');
      }
    } catch (err) {
      return err;
    }
  }

  async getAllActiveLevel(): Promise<AllLevelResponseModel> {
    // const page: number = 1;
    // const response = new AllProfitCenterResponseModel();
    try {
      const LevDTO: LevelsDTO[] = [];
      //retrieves all companies
      const LevEntity: Levels[] = await this.levelRepository.find({ where: { "isActive": true }, order: { 'levelName': 'ASC' } });
      //console.log(statesEntities);

      if (LevEntity) {
        // converts the data fetched from the database which of type companies array to type StateDto array.
        LevEntity.forEach(LevEntity => {
          const convertedLevDto: LevelsDTO = this.levelAdapter.convertEntityToDto(
            LevEntity
          );
          LevDTO.push(convertedLevDto);
        });

        //generated response

        const response = new AllLevelResponseModel(true, 1, 'Level Retrieved successfully', LevDTO);
        return response;
      } else {
        throw new LevelResponseModel(false, 99998, 'Data not found');
      }
      // return response;
    } catch (err) {
      return err;
    }
  }

  async activateOrDeactivateLevel(LevReq: LevelsRequest): Promise<LevelResponseModel> {
    try {
      const levExists = await this.getLevelById(LevReq.levelId);
      if (levExists) {
        if (!levExists) {
          throw new LevelResponseModel(false, 10113, 'Someone updated the current Level information.Refresh and try again');
        } else {

          const LevStatus = await this.levelRepository.update(
            { levelId: LevReq.levelId },
            { isActive: LevReq.isActive, updatedUser: LevReq.updatedUser });

          if (levExists.isActive) {
            if (LevStatus.affected) {
              const levResponse: LevelResponseModel = new LevelResponseModel(true, 10115, 'Levels is de-activated successfully');
              return levResponse;
            } else {
              throw new LevelResponseModel(false, 10111, 'Level is already deactivated');
            }
          } else {
            if (LevStatus.affected) {
              const levResponse: LevelResponseModel = new LevelResponseModel(true, 10114, 'Level  is activated successfully');
              return levResponse;
            } else {
              throw new LevelResponseModel(false, 10112, 'Level  is already  activated');
            }
          }
          // }
        }
      } else {
        throw new LevelResponseModel(false, 99998, 'No Records Found');
      }
    } catch (err) {
      return err;
    }
  }

  async getActiveLevelById(profitReq: LevelsRequest): Promise<LevelResponseModel> {
    try {
      //retrieves all companies
      const levEntities: Levels = await this.levelRepository.findOne({
        where: { levelId: profitReq.levelId }
      });

      const level: LevelsDTO = this.levelAdapter.convertEntityToDto(levEntities)
      if (level) {
        const response = new LevelResponseModel(true, 11101, 'Level  retrived Successfully', [level]);
        return response;
      }
      else {
        throw new LevelResponseModel(false, 11106, 'Something went wrong');
      }
      // generating resposnse
    } catch (err) {
      return err;
    }
  }

  async getLevelById(levelId: number): Promise<Levels> {
    //  console.log(employeeId);
    const Response = await this.levelRepository.findOne({
      where: { levelId: levelId },
    });
    // console.log(employeeResponse);
    if (Response) {
      return Response;
    } else {
      return null;
    }
  }

  
}