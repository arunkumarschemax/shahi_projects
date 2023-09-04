import { Injectable } from "@nestjs/common";
import { ScanDto } from "../dtos/typeo.dto";
import { ScanEntity } from "../entity/typeo-entity";

@Injectable()
export class ScanAdapter {
    convertEntityToDto(entity: ScanEntity): ScanDto {
        const dto = new ScanDto();
        dto.typeId = entity.typeId;
        dto.Gst = entity.Gst;
        dto.Ifsc = entity.Ifsc;
        dto.Innvoice = entity.Innvoice;

        dto.Customer = entity.Customer;
        dto.Volume = entity.Volume;
        dto.Weight = entity.Weight;
        dto.Chargeable = entity.Chargeable;
        dto.Packages = entity.Packages;
        dto.Date = entity.Date;
        dto.Cartons = entity.Cartons;
        dto.Console = entity.Console;
        dto.PO = entity.PO;
        dto.Payref = entity.Payref;

        dto.Quantity = entity.Quantity;
        dto.InnvoiceNumber = entity.InnvoiceNumber;
        dto.Currency = entity.Currency;
        dto.Origin = entity.Origin;
        dto.Destination = entity.Destination;
        dto.isActive = entity.isActive;
        return dto;
    }

    convertDtoToEntity(dto: ScanDto): ScanEntity {
        const entity = new ScanEntity();
        entity.typeId = dto.typeId;
        entity.Gst = dto.Gst;
        entity.Ifsc = dto.Ifsc;
        entity.Innvoice = dto.Innvoice;

        entity.Customer = dto.Customer;
        entity.Volume = dto.Volume;
        entity.Weight = dto.Weight;
        entity.Chargeable = dto.Chargeable;
        entity.Packages = dto.Packages;
        entity.Date = dto.Date;
        entity.Cartons = dto.Cartons;
        entity.Console = dto.Console;
        entity.PO = dto.PO;
        entity.Payref = dto.Payref;

        entity.Quantity = dto.Quantity;
        entity.InnvoiceNumber = dto.InnvoiceNumber;
        entity.Currency = dto.Currency;
        entity.Origin = dto.Origin;
        entity.Destination = dto.Destination;
        if (dto.typeId) {
            entity.typeId = dto.typeId;
        }
        return entity;
    }
}