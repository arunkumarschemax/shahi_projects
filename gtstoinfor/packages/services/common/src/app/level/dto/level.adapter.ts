import { Injectable } from "@nestjs/common";
import { LevelsDTO } from "./level.dto";
import { Levels } from "../level.entity";

@Injectable()
export class LevelsAdapter {
    /**
   * 
   * @param currenciesDto 
   * @param isUpdate 
   * @returns 
   */
  public convertDtoToEntity( levDto: LevelsDTO, isUpdate: boolean = false): Levels {
    const Level = new Levels();
    Level.levelId = levDto.levelId;
    Level.levelName = levDto.levelName;
   
    Level.isActive = levDto.isActive == undefined?true:levDto.isActive;
    if(isUpdate){
        Level.updatedUser = Level.updatedUser;
    } else {
        Level.isActive = true;
        Level.createdUser = levDto.createdUser;
    }
    return Level;
  }
  public convertEntityToDto(levelObject: Levels): LevelsDTO {
    const levDto = new LevelsDTO;
    levDto.levelId = levelObject.levelId;
    levDto.levelName = levelObject.levelName;
    levDto.isActive = levelObject.isActive;
    levDto.createdAt = levelObject.createdAt;
    levDto.createdUser = levelObject.createdUser;
    levDto.updatedAt = levelObject.updatedAt;
    levDto.updatedUser = levelObject.updatedUser;
    levDto.versionFlag = levelObject.versionFlag;
    return levDto;
  }
}