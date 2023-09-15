import { CommonAxiosService } from "../common-axios-service-prs";

export class StockService extends CommonAxiosService {
  URL = "/source-requisition";

  async getAllStock(): Promise<any> {
    const data = [
      { itemCode: "FA0001", itemType: "Fabric", quantity: '50m',  shahiItemCode:'SF0001',location:'A1F1',plant:'Unit-1' },
      { itemCode: "FA0002", itemType: "Fabric", quantity: '40m',shahiItemCode:'SF0002' ,location:'A2F1',plant:'Unit-2' },
      { itemCode: "TR0001", itemType: "Trim", quantity: '20',shahiItemCode:'ST0001' ,location:'A1R1',plant:'Unit-5' },
      { itemCode: "TR0009", itemType: "Trim", quantity: '45',shahiItemCode:'ST0009' ,location:'A2R1',plant:'Unit-8' },
      { itemCode: "TR0003", itemType: "Trim", quantity: '38',shahiItemCode:'ST0003' ,location:'A3F1',plant:'Unit-4' },
      { itemCode: "TR0006", itemType: "Trim", quantity: '75',shahiItemCode:'ST0006' ,location:'A3R1',plant:'Unit-5' },
      { itemCode: "FA0005", itemType: "Fabric", quantity: '60m' ,shahiItemCode:'SF0005',location:'A4F1',plant:'Unit-3' },
      { itemCode: "FA0008", itemType: "Fabric", quantity: '45m',shahiItemCode:'SF0008' ,location:'A4F2',plant:'Unit-6' },
      { itemCode: "FA0004", itemType: "Fabric", quantity: '35m',shahiItemCode:'SF0004' ,location:'A4R1',plant:'Unit-7' },
      { itemCode: "TR0004", itemType: "Trim", quantity: '55',shahiItemCode:'ST0004' ,location:'A4R2',plant:'Unit-4' },
      { itemCode: "FA0003", itemType: "Fabric", quantity: '50m',shahiItemCode:'SF0003' ,location:'A5F1',plant:'Unit-2' },
    ];
    return data;
  }
}
