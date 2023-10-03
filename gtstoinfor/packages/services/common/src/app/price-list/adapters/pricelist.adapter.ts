import { Entity } from "typeorm";
import { priceListDto } from "../dto/pricelist.dto";
import { PriceListEntity } from "../entities/pricelist.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class PriceListAdapter {
   

    public convertDtoToEntity(  DTO: priceListDto,  isUpdate: boolean = false ): PriceListEntity {
        const price = new PriceListEntity();
        price.sampleCode= DTO.sampleCode;
        price.year = DTO.year;
        price.business = DTO.business;
        price.seasonCode = DTO.seasonCode;
        price.currency = DTO.currency;
        price.fobLocalCurrency = DTO.fobLocalCurrency;
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
        PriceListDto.sampleCode=dtoData.sampleCode;
        PriceListDto.year=dtoData.year;
        PriceListDto.business = dtoData.business;
        PriceListDto.seasonCode= dtoData.seasonCode;
        PriceListDto.currency = dtoData.currency;
        PriceListDto.fobLocalCurrency = dtoData.fobLocalCurrency;
        PriceListDto.item = dtoData.item;
        PriceListDto.isActive = dtoData.isActive;
        PriceListDto.createdUser = dtoData.createdUser;
        PriceListDto.updatedUser = dtoData.updatedUser
        return  PriceListDto;
      }
}