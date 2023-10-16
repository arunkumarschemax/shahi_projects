import { Injectable } from "@nestjs/common";
import { ScanDto } from "../dtos/typeo.dto";
import { ScanEntity } from "../entity/typeo-entity";
import { HsnDto } from "../dtos/hsn.dto";
import { HSNEntity } from "../entity/hsn-entity";

@Injectable()
export class ScanAdapter {
    convertEntityToDto(entity: ScanEntity): ScanDto {
        const dto = new ScanDto();
        dto.gstNumber = entity.gstNumber;
        dto.venName = entity.venName;
        dto.venCod = entity.venCod;
        dto.invoiceDate = entity.invoiceDate;
        dto.cgst = entity.cgst;
        dto.igst = entity.igst;
        dto.sgst = entity.sgst;
        dto.invoiceNumber = entity.invoiceNumber;
        dto.invoiceAmount = entity.invoiceAmount;
        dto.invoiceCurrency = entity.invoiceCurrency;
        dto. financialYear=entity.financialYear;
        dto. status=entity.status;
        dto.createdUser=entity.createdUser;
        return dto;
    }

    convertDtoToEntity(dto: ScanDto): ScanEntity {
        console.log(dto,'----')
        const entity = new ScanEntity();
        entity.gstNumber = dto.gstNumber;
        entity.venName = dto.venName;
        entity.venCod = dto.venCod;
        entity.invoiceDate = dto.invoiceDate;
        entity.cgst = dto.cgst;
        entity.igst = dto.igst;
        entity.sgst = dto.sgst;
        entity.invoiceNumber = dto.invoiceNumber;
        entity.invoiceAmount = dto.invoiceAmount;
        entity.invoiceCurrency = dto.invoiceCurrency;
        entity. financialYear=dto.financialYear;
        entity. status=dto.status;
        entity.createdUser=dto.createdUser;
        const hsnDetails: HSNEntity[] = []
        for (const record of dto.Hsninfo  ){
                const entity2 = new HSNEntity()
                entity2.charge = record. charge
                entity2.taxAmount = record.taxAmount
                entity2.taxPercentage = record.taxPercentage
                entity2.taxType = record.taxType
                entity2.HSN = record.HSN
                entity2.variance = record.variance
                entity2.unitPrice = record.unitPrice
                entity2.quotation = record.quotation
                // entity2.status = record.status;
                entity2.unitQuantity = record.unitQuantity;
                entity2.description = record.description;
                entity2.createdUser = dto.createdUser;
                hsnDetails.push(entity2)
            }
        
        entity.scanentity = hsnDetails

        return entity;
    }
}