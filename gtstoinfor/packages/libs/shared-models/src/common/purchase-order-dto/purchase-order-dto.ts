import { GRNTypeEnum, PoItemDetailsDto, PurchaseOrderStatus } from "@project-management-system/shared-models"
import { PurchaseOrderFbricDto } from "./po-fabric-info"
import { PurchaseOrderTrimDto } from "./po-trim-info"

export class PurchaseOrderDto {
  purchaseOrderId: number
  poNumber: string
  vendorId: number
  styleId: number
  expectedDeliveryDate: Date
  purchaseOrderDate: Date
  createdAt: string;
  createdUser: string | null;
  updatedAt: string;
  updatedUser: string | null;
  versionFlag: number
  isActive: boolean
  status: PurchaseOrderStatus
  remarks: string
  poMaterialType: string
  indentId: number[]
  buyerId: number
  poAgainst?: GRNTypeEnum
  currencyId: number
  exchangeRate: number
  totalAmount: string
  deliveryAddress: string
  poItemInfo: PoItemDetailsDto[];
  constructor(
    poNumber: string,
    vendorId: number,
    styleId: number,
    expectedDeliveryDate: any,
    purchaseOrderDate: any,
    remarks: string,
    poMaterialType: string,
    indentId: number[],
    buyerId: number,
    poItemInfo: PoItemDetailsDto[],
    currencyId: number,
    exchangeRate: number,
    totalAmount: string,
    deliveryAddress: string,
    poAgainst?: GRNTypeEnum,

  ) {
    this.poNumber = poNumber
    this.vendorId = vendorId
    this.styleId = styleId
    this.expectedDeliveryDate = expectedDeliveryDate
    this.purchaseOrderDate = purchaseOrderDate
    this.remarks = remarks
    this.indentId = indentId
    this.poMaterialType = poMaterialType
    this.buyerId = buyerId
    this.poAgainst = poAgainst
    this.poItemInfo = poItemInfo;
    this.currencyId = currencyId;
    this.exchangeRate = exchangeRate;
    this.totalAmount = totalAmount ;
    this.deliveryAddress = deliveryAddress;
  }

}