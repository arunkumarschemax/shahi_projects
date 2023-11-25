export class LocationMappingReq {
    m3_item: number;
    location_id: number;
    quantity: number;
    grn_item_id: number;
    item_type: string;
    style_id: number;
    buyer_id:number;
    uom_id:number;
    description?:string;
    uomName?:string
    // stock_bar_code?:string

    constructor( m3_item: number, location_id: number, quantity: number, grn_item_id: number,style_id: number,buyer_id:number,uom_id:number, item_type: string,description?:string,uomName?:string
        // stock_bar_code?:string
        ) {
        this.m3_item = m3_item
        this.location_id = location_id;
        this.quantity = quantity;
        this.grn_item_id = grn_item_id;
        this.style_id = style_id;
        this.buyer_id = buyer_id
        this.uom_id = uom_id
        this.item_type = item_type
        this.description = description
        this.uomName = uomName
        // this.stock_bar_code = stock_bar_code
    }

}