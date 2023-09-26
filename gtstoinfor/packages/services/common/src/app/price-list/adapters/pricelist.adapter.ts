import { Entity } from "typeorm";
import { priceListDto } from "../dto/pricelist.dto";
import { PriceListEntity } from "../entities/pricelist.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PriceListAdapter {
   

    public convertDtoToEntity(  DTO: priceListDto,  isUpdate: boolean = false ): PriceListEntity {
        const price = new PriceListEntity();
        price.style= DTO.style;
        price.year = DTO.year;
        price.destination = DTO.destination;
        price.seasonCode = DTO.seasonCode;
        price.currency = DTO.currency;
        price.price = DTO.price;
        price.item = DTO.item;
        price.isActive = DTO.isActive==undefined?true:DTO.isActive;
        if (isUpdate) {
            price.id=DTO.id;
             price.updatedUser = DTO.updatedUser;
        } else {
            price.isActive = true;
            price.createdUser = DTO.createdUser;
        }
       return price;
      }
      
      public convertEntityToDto(dtoData: PriceListEntity): priceListDto {
        const PriceListDto = new priceListDto;
        PriceListDto.style=dtoData.style;
        PriceListDto.year=dtoData.year;
        PriceListDto.destination = dtoData.destination;
        PriceListDto.seasonCode= dtoData.seasonCode;
        PriceListDto.currency = dtoData.currency;
        PriceListDto.price = dtoData.price;
        PriceListDto.item = dtoData.item;
        PriceListDto.isActive = dtoData.isActive;
        PriceListDto.createdUser = dtoData.createdUser;
        PriceListDto.updatedUser = dtoData.updatedUser
        return  PriceListDto;
      }
}