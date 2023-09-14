import { CommonAxiosService } from "../common-axios-service-prs";

export class StockService extends CommonAxiosService {
  URL = "/source-requisition";

  async getAllStock(): Promise<any> {
    const data = [
      { itemCode: "FA0001", itemType: "Fabric", quantity: 50,  shahiItemCode:'SF0001',location:'Delhi',plant:'Unit-1' },
      { itemCode: "FA0002", itemType: "Fabric", quantity: 40,shahiItemCode:'SF0002' ,location:'Kolkata',plant:'Unit-2' },
      { itemCode: "TR0001", itemType: "Trim", quantity: 20,shahiItemCode:'ST0001' ,location:'Kerela',plant:'Unit-5' },
      { itemCode: "TR0009", itemType: "Trim", quantity: 45,shahiItemCode:'ST0009' ,location:'Mumbai',plant:'Unit-8' },
      { itemCode: "TR0003", itemType: "Trim", quantity: 38,shahiItemCode:'ST0003' ,location:'Chennai',plant:'Unit-4' },
      { itemCode: "TR0006", itemType: "Trim", quantity: 75,shahiItemCode:'ST0006' ,location:'Hyderabad',plant:'Unit-5' },
      { itemCode: "FA0005", itemType: "Fabric", quantity: 60 ,shahiItemCode:'SF0005',location:'Bangolore',plant:'Unit-3' },
      { itemCode: "FA0008", itemType: "Fabric", quantity: 45,shahiItemCode:'SF0008' ,location:'Jaipur',plant:'Unit-6' },
      { itemCode: "FA0004", itemType: "Fabric", quantity: 35,shahiItemCode:'SF0004' ,location:'Rajastan',plant:'Unit-7' },
      { itemCode: "TR0004", itemType: "Trim", quantity: 55,shahiItemCode:'ST0004' ,location:'Kerela',plant:'Unit-4' },
      { itemCode: "FA0003", itemType: "Fabric", quantity: 50,shahiItemCode:'SF0003' ,location:'Jaipur',plant:'Unit-2' },
    ];
    return data;
  }
}
