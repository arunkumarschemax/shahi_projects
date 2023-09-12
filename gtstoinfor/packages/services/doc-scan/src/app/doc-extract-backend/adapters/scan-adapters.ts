import { Injectable } from "@nestjs/common";
import { ScanDto } from "../dtos/typeo.dto";
import { ScanEntity } from "../entity/typeo-entity";

@Injectable()
export class ScanAdapter {
    convertEntityToDto(entity: ScanEntity): ScanDto {
        const dto = new ScanDto();
        dto.GST = entity.GST;
        dto.Vendor = entity.Vendor;
        dto.invoiceDate = entity.invoiceDate;
        dto.Cgst = entity.Cgst;
        dto.IGST = entity.IGST;
        dto.Sgst = entity.Sgst;
        dto.InnvoiceNumber = entity.InnvoiceNumber;
        dto.InnvoiceAmount = entity.InnvoiceAmount;
        dto.InnvoiceCurrency = entity.InnvoiceCurrency;
        dto.Routing=entity.Routing;
        dto. Comment=entity.Comment;
        dto. Financialyear=entity.Financialyear;
        dto. Timecreated=entity.Timecreated;
        dto.createdUser=entity.createdUser;
        dto.updatedUser=entity.updatedUser;
        
        
        return dto;
    }

    convertDtoToEntity(dto: ScanDto): ScanEntity {
        const entity = new ScanEntity();
        entity.GST = dto.GST;
        entity.Vendor = dto.Vendor;
        entity.invoiceDate = dto.invoiceDate;
        entity.Cgst = dto.Cgst;
        entity.IGST = dto.IGST;
        entity.Sgst = dto.Sgst;
        entity.InnvoiceNumber = dto.InnvoiceNumber;
        entity.InnvoiceAmount = dto.InnvoiceAmount;
        entity.InnvoiceCurrency = dto.InnvoiceCurrency;
        entity.Routing=dto.Routing;
        entity.Comment=dto.Comment;
        entity. Financialyear=dto.Financialyear;
        entity. Timecreated=dto.Timecreated;
        entity.createdUser=dto.createdUser;
        entity.updatedUser=dto.updatedUser;
       


        return entity;
    }
}