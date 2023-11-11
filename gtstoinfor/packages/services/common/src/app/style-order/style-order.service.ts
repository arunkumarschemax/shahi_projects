import { Injectable } from "@nestjs/common";
import { CoRequest, CoUpdateReq, CoUpdateResponseModel, CommonResponseModel, CustomerOrderStatusEnum, StyleOrderIdReq, StyleOrderItemsModel, StyleOrderModel, StyleOrderReq, StyleOrderResponseModel, styleOrderReq } from "@project-management-system/shared-models";
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
import { OrderLine } from "./order-line.entity";
import { Colour } from "../colours/colour.entity";
import { Size } from "../sizes/sizes-entity";
import { Destination } from "../destination/destination.entity";
import { UomEntity } from "../uom/uom-entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { GenericTransactionManager } from "../../typeorm-transactions";
import { StyleOrderRepository } from "./style-order-repo";
import { OrderLineRepository } from "./order-line.repo";
import { ItemCreation } from "../fg-item/item_creation.entity";
import { StyleOrderId } from "./style-order-id.request";
import { VariantIdReq } from "./variant-id.req";
import { Raw } from 'typeorm';
import { CoTypes } from "../co-type/co-type.entity";
import { CoUpdateDto } from "./dto/co-update.dto";
import { CoUpdateRepository } from "./co-updates.repo";
import { CoUpdateEntity } from "./co-updates.entity";
import { CoLine } from "./co-line.entity";
import { StyleOrderColineIdReq } from "./style-order.colineId.request";

@Injectable()

export class StyleOrderService{
    constructor(
        private repo:StyleOrderRepository,
        // @InjectRepository(StyleOrder)
      
         private orderLineRepo : OrderLineRepository,
         private styleorderRepo:StyleOrderRepository,
         private Coupdate: CoUpdateRepository,
        private readonly dataSource: DataSource,
        @InjectRepository(CoLine)
        private CoLineRepo : Repository<CoLine>

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
            // entity.exFactoryDate = req.exFactoryDate;
            // entity.deliveryDate = req.deliveryDate;
            entity.instoreDate = req.instoreDate;
            entity.salePrice = req.salePrice;
            entity.priceQuantity = req.priceQuantity;
            entity.discountAmount = req.discountAmount;
            entity.status = req.styleOrderItems.length > 0 ? CustomerOrderStatusEnum.CONFIRMED : CustomerOrderStatusEnum.OPEN;
            entity.remarks = req.remarks;
            const item = new ItemCreation()
            item.fgitemId = req.itemId
            entity.fgitemInfo = item;
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
            const coType = new CoTypes()
            coType.coTypeId = req.coTypeId
            entity.coTypeInfo = coType
            entity.merchandiser = req.merchandiser
            entity.planner = req.planner
            const uom = new UomEntity()
            uom.id = req.uomId
            entity.uomInfo = uom
            // entity.season = req.season
            entity.itemSalePriceQty = req.itemSalePriceQty
            let ordreLineItem:OrderLine[]  = []
            let val = 0
            if(req.coId){
                entity.coId = req.coId
                entity.updatedUser = req.createdUser
                entity.orderNumber = req.orderNumber
            } else{
                entity.orderNumber = `CO-${Number(maxId)+1}`
                entity.createdUser = req.createdUser
            }
            for(const rec of req.styleOrderItems){
                val = val+1
                const itemsEntity = new OrderLine()
                itemsEntity.deliveryAddress = rec.deliveryAddress
                itemsEntity.orderQuantity = rec.orderQuantity
                itemsEntity.color = rec.color
                itemsEntity.size = rec.size
                itemsEntity.destination = rec.destination
                itemsEntity.uom = rec.uom
                // itemsEntity.status = rec.status
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
                itemsEntity.skuCode = rec.skuCode
                itemsEntity.salePrice = rec.salePrice

                if(rec.orderLineId){
                    itemsEntity.orderLineId = rec.orderLineId
                    const styleOrderEntity = new StyleOrder();
                    styleOrderEntity.coId = rec.coId;
                    itemsEntity.styleOrderInfo = styleOrderEntity;
                    itemsEntity.updatedUser = req.createdUser
                    // itemsEntity.coLineNumber = rec.coLineNumber

                } else{
                    // itemsEntity.coLineNumber = `Line-${val}`
                    itemsEntity.createdUser = req.createdUser
                }
                ordreLineItem.push(itemsEntity)
            }

            entity.orderLineInfo = ordreLineItem
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
   async getAllStyleOrders(req:styleOrderReq):Promise<CommonResponseModel>{
        try{
        const data = await this.repo.getAllStyleOrders(req)
        
        return new CommonResponseModel(true,1,'',data)

    } catch(err){
        throw err
    }
   } 
   async getAllCoLinesById(req:styleOrderReq):Promise<CommonResponseModel>{
    try{
        const data = await this.orderLineRepo.getAllOrderLines(req)
        
        return new CommonResponseModel(true,1,'',data)

    } catch(err){
        throw err
    }
   }
   async cancelOrder(req:StyleOrderId):Promise<CommonResponseModel>{
    const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
    try{
        await transactionalEntityManager.startTransaction();
        const updateStatus = await transactionalEntityManager.getRepository(StyleOrder).update({coId:req.styleOrderId},{status:CustomerOrderStatusEnum.CLOSED});
        if(updateStatus.affected > 0){
            const updateCoLineStatus = await transactionalEntityManager.getRepository(CoLine).update({styleOrderInfo:{coId:req.styleOrderId}},{status:CustomerOrderStatusEnum.CLOSED});
            if(updateCoLineStatus.affected > 0){
                await transactionalEntityManager.completeTransaction();
                return new CommonResponseModel(true,1,'Order Cancelled Successfully. ',)
            }
            else{
                await transactionalEntityManager.releaseTransaction();
                return new CommonResponseModel(false,0,'Cancel Order failed. ',)
            }
        }
        else{
            await transactionalEntityManager.releaseTransaction();
            return new CommonResponseModel(false,0,'Cancel Order failed. ',)
        }
    } catch(err){
        throw err
    }
   }

   async cancelVariantOrder(req:VariantIdReq):Promise<CommonResponseModel>{
    const transactionalEntityManager = new GenericTransactionManager(this.dataSource);
    try{
        await transactionalEntityManager.startTransaction();
        const styleOrderDetails = await transactionalEntityManager.getRepository(CoLine).findOne({relations:["styleOrderInfo"],where:{coLineId:req.variantId}});
        const updateCoLineStatus = await transactionalEntityManager.getRepository(CoLine).update({coLineId:req.variantId},{status:CustomerOrderStatusEnum.CLOSED});
        if(updateCoLineStatus.affected > 0){
            const getCoLines = await transactionalEntityManager.getRepository(CoLine).find({where:{status:Raw(alias => `status !=  '${CustomerOrderStatusEnum.CLOSED}'`), coLineId:Raw(alias => `id !=  '${req.variantId}'`)}});
            if(getCoLines.length > 0){
                await transactionalEntityManager.completeTransaction();
                return new CommonResponseModel(true,1,'Order Cancelled Successfully. ',)
            }
            else{
                const cancelOrder = await transactionalEntityManager.getRepository(StyleOrder).update({coId:styleOrderDetails.styleOrderInfo.coId},{status:CustomerOrderStatusEnum.CLOSED});
                if(cancelOrder.affected > 0){
                    await transactionalEntityManager.completeTransaction();
                    return new CommonResponseModel(true,1,'Order Cancelled Successfully. ',)
                }
                else{
                    await transactionalEntityManager.releaseTransaction();
                    return new CommonResponseModel(false,0,'Cancel Order failed. ',)
                }
            }
        }
        else{
            await transactionalEntityManager.releaseTransaction();
            return new CommonResponseModel(false,0,'Cancel Order failed. ',)
        }
    } catch(err){
        throw err
    }
   }

   async getCOInfoById(req:StyleOrderIdReq):Promise<StyleOrderResponseModel>{
    try{
        const data = await this.repo.getInfoById(req)
        const COMap = new Map<number,StyleOrderModel>()
        if(data.length == 0){
            return new StyleOrderResponseModel(false,0,'No data found',[])
        } else{
            for(const rec of data){
                if(!COMap.has(rec.co_id)){
                    COMap.set(rec.co_id,new StyleOrderModel(rec.co_id,rec.item_code,rec.order_date,rec.buyer_po_number,rec.shipment_type,rec.buyer_style,rec.agent,rec.buyer_address,rec.exfactory_date,rec.delivery_date,rec.instore_date,rec.sale_price,rec.price_quantity,rec.discount_per,rec.discount_amount,rec.status,rec.remarks,rec.fg_item_id,rec.warehouse_id,rec.facility_id,rec.style_id,rec.package_terms_id,rec.delivery_method_id,rec.delivery_terms_id,rec.currency_id,rec.Payment_method_id,rec.Payment_terms_id,[],rec.buyer_id,rec.item_name,rec.buyer_code,rec.buyer_name,rec.factoryName,rec.warehouse_name,rec.agentName,rec.agentCode,rec.buyerLandmark,rec.buyerCity,rec.buyerState,rec.package_terms_name,rec.delivery_method,rec.delivery_terms_name,rec.currency_name,rec.payment_method,rec.payment_terms_name,rec.co_id,rec.order_number,rec.season,rec.merchandiser,rec.merchandiserName,rec.merchandiserCode,rec.planner,rec.plannerName,rec.plannerCode,rec.uomId,rec.uom,rec.coTypeId,rec.coType,rec.item_sale_price_qty))
                }
                COMap.get(rec.co_id).styleOrderItems.push(new StyleOrderItemsModel(rec.coLineId,rec.delivery_address,rec.order_quantity,rec.color,rec.size,rec.destination,rec.uom,rec.status,rec.discount,rec.SalePrice,rec.coPercentage,rec.color_id,rec.size_id,rec.destination_id,rec.uom_id,rec.delLandmark,rec.delCity,rec.delState,rec.sku_code,rec.coline_number,rec.co_id,"",rec.co_number))
            }
            const styleOrderModel: StyleOrderModel[] = [];
            COMap.forEach((e) => styleOrderModel.push(e))
            return new StyleOrderResponseModel(true,1,'Data retrieved',styleOrderModel)
        }
    } catch(err){
        throw err
    }
   }

   async getCoLineItemsByDestination(req:StyleOrderIdReq):Promise<CommonResponseModel>{
    try{
        const info = await this.orderLineRepo.find({where:{styleOrderInfo:{coId:req.styleOrderId},destinationInfo:{destinationId:req.destinationId}},relations:['colorInfo','sizeInfo','destinationInfo','uomInfo','styleOrderInfo']})
        let data = []
        if(info.length > 0){
            for(const rec of info){
                data.push(new StyleOrderItemsModel(rec.orderLineId,rec.deliveryAddress,rec.orderQuantity,rec.color,rec.size,rec.destination,rec.uom,null,rec.discount,rec.salePrice,rec.coPercentage,Number(rec.colorInfo.colourId),Number(rec.sizeInfo.sizeId),Number(rec.destinationInfo.destinationId),Number(rec.uomInfo?.id),null,null,null,rec.skuCode,null,req.styleOrderId))
            }
            return new CommonResponseModel(true,1,'Data retrieved',info)
        } else{
            return new CommonResponseModel(false,0,'No data found')
        }
 
    } catch(err){
        throw err
    }
   }

   async getCoNumber(): Promise<CommonResponseModel> {
    try {
   const data = await this.styleorderRepo.find()
   console.log(data,'-----------')
   return new CommonResponseModel(true, 0, "CO Number Data retrieved  successfully", data);

      } catch (err) {
        throw err;
      }
    }

    async getCoLineDataById(req:StyleOrderIdReq): Promise<CommonResponseModel> {
        try {
        const data = await this.repo.getCoLineInfoById(req)
        let data1 = []
        
        for(const rec of data){
            data1.push(new StyleOrderItemsModel(rec.coLineId,rec.delivery_address,rec.order_quantity,rec.color,rec.size,rec.destination,rec.uom,rec.status,rec.discount,rec.SalePrice,rec.coPercentage,rec.color_id,rec.size_id,rec.destination_id,rec.uom_id,rec.delLandmark,rec.delCity,rec.delState,rec.sku_code,rec.coline_number,rec.co_id,"",rec.co_number))
        }

       console.log(data1,'-----------')
       return new CommonResponseModel(true, 0, "CO LineData retrieved  successfully", data1);
    
          } catch (err) {
            throw err;
          }
        }
  

        async updateCoData(req:CoUpdateDto):Promise<CoUpdateResponseModel>{
            try{
                console.log(req,"serv")
               const entity = new  CoUpdateEntity()
               entity.coId = req.coId
               entity.coLineId = req.coLineId
               entity.coNumber = req.coNumber 
               entity.oldValue = req.oldValue
               entity.updatedValue = req.updateValue
               entity.parameter = req.parameter
               entity.createdUser =  req.createdUser
               entity.updatedUser = req.updatedUser
               entity.coUpdateId = req.coUpdateId

            const save = await this.Coupdate.save(entity)


             
            if (save){
               
                if (req.parameter === "orderline"){
                   
                    const Update = await this.CoLineRepo.update(
                        { coLineId: req.coLineId, styleOrderInfo: { coId: req.coId  } },
                        { coLineNumber: req.updateValue }
                      );
                } else if (req.parameter === "fob"){

                    const Update = await this.CoLineRepo.update(
                        { coLineId: req.coLineId, styleOrderInfo: { coId: req.coId  } },
                        { salePrice: Number(req.updateValue) }
                      );
                } else if (req.parameter === "deliverydate"){

                    const Update = await this.CoLineRepo.update(
                        { coLineId: req.coLineId, styleOrderInfo: { coId: req.coId  } },
                        { coLineNumber: req.updateValue }
                      );
                } else if (req.parameter === "quantity"){
                    const orderQuantity = parseInt(req.updateValue, 10);
                    const Update = await this.CoLineRepo.update(
                        { coLineId: req.coLineId, styleOrderInfo: { coId: req.coId  } },
                        { orderQuantity: Number(req.updateValue) }
                      );

                } else if (req.parameter === "vponumber"){

                    const Update = await this.CoLineRepo.update(
                        { coLineId: req.coLineId, styleOrderInfo: { coId: req.coId  } },
                        { coLineNumber: req.updateValue }
                      );

                } else if (req.parameter === "destinationaddress") {
                    
                    const Update = await this.CoLineRepo.update(
                        { coLineId: req.coLineId, styleOrderInfo: { coId: req.coId  } },
                        { deliveryAddress: req.updateValue }
     

                      );

                }
                

                return new CoUpdateResponseModel(true, 0, "CO Updated Sucessfully",);
    
              } else {
    
                return new CoUpdateResponseModel(false, 0, "Something went Wrong");
               
              }
          
              } catch (err) {
                throw err;
              }
            }

    
            async getCoamendment():Promise<CommonResponseModel>{
                try{
                    const data= await this.Coupdate.getCoamendment()
                    return new CommonResponseModel(true,1,'',data)
                }catch(err){
                    throw err
                }
            }

            async getConumber(req:CoRequest):Promise<CommonResponseModel>{
                try{
                    const data= await this.Coupdate.getconumber(req)
                    return new CommonResponseModel(true,1,'',data)
                }catch(err){
                    throw err
                }
            }
    
    async getDestinationInOrderLines():Promise<CommonResponseModel>{
        try{
            const data = await this.orderLineRepo.getDestinationsInOrderLine()
            if(data.length > 0){
                return new CommonResponseModel(true,1,'Data retrieved',data)
            } else{
                return new CommonResponseModel(false,1,'No data found')
            }

        }catch(err){
            throw err
        }
    }

            
            
}