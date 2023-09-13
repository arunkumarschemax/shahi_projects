import { CommonAxiosService } from "../common-axios-service-prs";

export class SourceRequisitionService extends CommonAxiosService{
    URL = '/source-requisition';
    
    
    
            
    async getAllStock(): Promise<any> {
        const data = [
          {itemCode:'FA0001',itemType:'fabric', itemQuantity:50},
          {itemCode:'FA0002',itemType:'fabric', itemQuantity:40},
          {itemCode:'TR0001',itemType:'Trim', itemQuantity:20},
          {itemCode:'TR0009',itemType:'Trim', itemQuantity:45},
          {itemCode:'TR0003',itemType:'Trim', itemQuantity:38},
          {itemCode:'TR0006',itemType:'Trim', itemQuantity:75},
          {itemCode:'FA0005',itemType:'fabric', itemQuantity:60},
          {itemCode:'FA0008',itemType:'fabric', itemQuantity:45},
          {itemCode:'FA0004',itemType:'fabric', itemQuantity:35},
          {itemCode:'TR0004',itemType:'Trim', itemQuantity:55},
          {itemCode:'FA0003',itemType:'fabric', itemQuantity:50},

          ];
          return data
        
    }
    
   
    
    
    
    
    
    
    
    
               
    
    }