import { CommonAxiosService } from "../common-axios-service-prs";

export class StockService extends CommonAxiosService {
  URL = "/source-requisition";

  async getAllStock(): Promise<any> {
    const data = [
      { itemCode: "FA0001", itemType: "Fabric", quantity: 50 },
      { itemCode: "FA0002", itemType: "Fabric", quantity: 40 },
      { itemCode: "TR0001", itemType: "Trim", quantity: 20 },
      { itemCode: "TR0009", itemType: "Trim", quantity: 45 },
      { itemCode: "TR0003", itemType: "Trim", quantity: 38 },
      { itemCode: "TR0006", itemType: "Trim", quantity: 75 },
      { itemCode: "FA0005", itemType: "Fabric", quantity: 60 },
      { itemCode: "FA0008", itemType: "Fabric", quantity: 45 },
      { itemCode: "FA0004", itemType: "Fabric", quantity: 35 },
      { itemCode: "TR0004", itemType: "Trim", quantity: 55 },
      { itemCode: "FA0003", itemType: "Fabric", quantity: 50 },
    ];
    return data;
  }
}
