export class LocationMappingReq {
    m3_item_code: number;
    location_id: number;
    quantity: number;
    grn_item_id: number;
    shahi_item_code: number;
    item_type_id: number;
    plant_id: number;
    m3_style_id: number;
    item_id: number;
    style_id: number;
    buyer_id:number;

    constructor(m3_item_code: number, location_id: number, quantity: number, grn_item_id: number, shahi_item_code: number, item_type_id: number, plant_id: number, m3_style_id: number, item_id: number, style_id: number,buyer_id:number) {
        this.m3_item_code = m3_item_code;
        this.location_id = location_id;
        this.quantity = quantity;
        this.grn_item_id = grn_item_id;
        this.shahi_item_code = shahi_item_code;
        this.item_type_id = item_type_id;
        this.plant_id = plant_id;

        this.m3_style_id = m3_style_id;
        this.item_id = item_id;
        this.style_id = style_id;
        this.buyer_id = buyer_id
    }

}