import { SaveOrderDto } from "../models/save-order-dto";
import { OrdersEntity } from "../entities/orders.entity";

export class OrdersAdapter {

    public convertDtoToEntity(dto: SaveOrderDto , id:number): OrdersEntity {
        const entity = new OrdersEntity()
        entity.id  = dto.id;
        entity.buyer = dto.buyer;
        entity.challanNo = dto.challanNo;
        entity.createdAt = dto.createdAt;
        entity.createdUser = dto.createdUser;
        entity.ctns = dto.ctns;
        entity.date = dto.date;
        entity.dest = dto.dest;
        // entity.fileId = dto.fileId;
        entity.invoiceNo = dto.invoiceNo;
        entity.poNo = dto.poNo;
        entity.shipQty = dto.shipQty;
        entity.style = dto.style;
        entity.tcStatus = dto.tcStatus;
        entity.updatedAt = dto.updatedAt;
        entity.updatedUser = dto.updatedUser
        entity.createdUser = dto.createdUser
        entity.version = dto.version ? dto.version : 1
        entity.fileId = id
        return entity
    }
}