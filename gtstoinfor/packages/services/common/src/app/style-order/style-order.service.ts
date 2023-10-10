import { Injectable } from "@nestjs/common";
import { StyleOrderReq, StyleOrderResponseModel } from "@project-management-system/shared-models";
import { StyleOrder } from "./style-order.entity";
import { Item } from "../items/item-entity";
import { Warehouse } from "../warehouse/warehouse.entity";
import { FactoriesEntity } from "../factories/factories.entity";
import { Style } from "../style/dto/style-entity";
import { PackageTerms } from "../packages-terms/package-terms.entity";
import { DeliveryTerms } from "../delivery-terms/delivery-terms.entity";
import { DeliveryMethod } from "../delivery-method/delivery-method.entity";
import { Currencies } from "../currencies/currencies.entity";
import { PaymentTerms } from "../payment-terms/payment-terms.entity";
import { PaymentMethod } from "../payment-methods/payment-method-entity";
import { Buyers } from "../buyers/buyers.entity";
import { CoLine } from "./co-line.entity";
import { Colour } from "../colours/colour.entity";
import { Size } from "../sizes/sizes-entity";
import { Destination } from "../destination/destination.entity";
import { UomEntity } from "../uom/uom-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { StyleOrderRepository } from "./style-order-repo";

@Injectable()

export class StyleOrderService{
    constructor(
        private repo:StyleOrderRepository,
        // @InjectRepository(StyleOrder)
        // private repo : Repository<StyleOrder>,
        private readonly dataSource: DataSource,

    ){}

    async createCustomerOrder(req:StyleOrderReq):Promise<StyleOrderResponseModel>{
        const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
        try{
            await transactionalEntityManager.startTransaction();
            const getCOLineCount = await this.repo.getAllCOCount()
            const maxId = getCOLineCount.id
            const entity = new StyleOrder()
            entity.itemCode = req.itemCode;
            entity.orderDate = req.orderDate;
            entity.buyerPoNumber = req.buyerPoNumber;
            entity.shipmentType = req.shipmentType;
            entity.buyerStyle = req.buyerStyle;
            entity.agent = req.agent;
            entity.buyerAddress = req.buyerAddress;
            entity.exFactoryDate = req.exFactoryDate;
            entity.deliveryDate = req.deliveryDate;
            entity.instoreDate = req.instoreDate;
            entity.salePrice = req.salePrice;
            entity.priceQuantity = req.priceQuantity;
            entity.discountAmount = req.discountAmount;
            entity.status = req.status;
            entity.remarks = req.remarks;
            const item = new Item()
            item.itemId = req.itemId
            entity.itemInfo = item;
            const warehouse = new Warehouse()
            warehouse.warehouseId = req.warehouseId
            entity.warehouseInfo = warehouse;
            const factory = new FactoriesEntity()
            factory.id = req.facilityId
            entity.factoryInfo = factory;
            const style = new Style()
            style.styleId = req.styleId
            entity.styleInfo = style
            const packageTerms = new PackageTerms()
            packageTerms.packageTermsId = req.packageTermsId
            entity.packageTermsInfo = packageTerms
            const deliveryTerms = new DeliveryTerms()
            deliveryTerms.deliveryTermsId = req.deliverytermId
            entity.deliveryTermsInfo = deliveryTerms
            const deliveryMethod = new DeliveryMethod()
            deliveryMethod.deliveryMethodId = req.deliveryMethodId
            entity.deliveryMethodInfo = deliveryMethod
            const currency = new Currencies()
            currency.currencyId = req.currencyId
            entity.currenciesInfo = currency
            const paymentTerms = new PaymentTerms()
            paymentTerms.paymentTermsId = req.paymentTermId
            entity.paymentTermsInfo = paymentTerms
            const paymentMethod = new PaymentMethod()
            paymentMethod.paymentMethodId = req.paymentMethodId
            entity.paymentMethodInfo = paymentMethod
            const buyer = new Buyers()
            buyer.buyerId = req.buyerId
            entity.buyerInfo = buyer
            let coLineItem  = []
            let val = 0
            for(const rec of req.styleOrderItems){
                val = val+1
                const itemsEntity = new CoLine()
                itemsEntity.deliveryAddress = rec.deliveryAddress
                itemsEntity.orderQuantity = rec.orderQuantity
                itemsEntity.color = rec.color
                itemsEntity.size = rec.size
                itemsEntity.destination = rec.destination
                itemsEntity.uom = rec.uom
                itemsEntity.status = rec.status
                itemsEntity.salePrice = rec.salePrice
                itemsEntity.coPercentage = rec.coPercentage
                const color = new Colour()
                color.colourId = rec.colorId
                itemsEntity.colorInfo = color
                const size = new Size()
                size.sizeId = rec.sizeId
                itemsEntity.sizeInfo = size
                const destination = new Destination()
                destination.destinationId = rec.destinationId
                itemsEntity.destinationInfo = destination
                const uom = new UomEntity()
                uom.id = rec.uomId
                itemsEntity.uomInfo = uom
                if(rec.styleOrderItemId){
                    itemsEntity.id = rec.styleOrderItemId
                    const styleOrderEntity = new StyleOrder()
                    styleOrderEntity.id = req.styleOrderId
                    itemsEntity.styleOrderInfo = styleOrderEntity
                    itemsEntity.updatedUser = req.createdUser

                } else{
                    itemsEntity.coLineNumber = `Line-${val}`
                    itemsEntity.createdUser = req.createdUser
                }
                coLineItem.push(itemsEntity)
            }
            entity.coLineInfo = coLineItem
            if(req.styleOrderId){
                entity.id = req.styleOrderId
                entity.updatedUser = req.createdUser
            } else{
                entity.coNumber = `CO-${Number(maxId)+1}`
                entity.createdUser = req.createdUser
            }
            const save = await transactionalEntityManager.getRepository(StyleOrder).save(entity)
            if(!save){
                await transactionalEntityManager.releaseTransaction()
                return new StyleOrderResponseModel(false,0,'Something went wrong in customer order creation',[])
            } else{
                await transactionalEntityManager.completeTransaction()
                return new StyleOrderResponseModel(true,1,'Created successfully',[])
            }

        } catch(err){
            await transactionalEntityManager.releaseTransaction()
            throw err
        }
    }

}