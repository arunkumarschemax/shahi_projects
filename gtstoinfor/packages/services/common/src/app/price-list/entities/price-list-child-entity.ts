import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, Entity } from "typeorm";

@Entity('price_list-child') 
export class PriceListChildEntity extends CommonColumns  {

    @Column('varchar', {
        name: "year",
    })
    year: string;

    @Column('varchar', {
        name: "season_code",
        
    })
    seasonCode: string;

    @Column('varchar', {
        name: "item",
        
    })
    item: string;

    @Column('varchar', {
        name: "style",
       
    })
    style: string;

    @Column('varchar', {
        name: "destination",
       
    })
    destination: string;

    @Column('varchar', {
        name: "price",
       
    })
    price: string;

    @Column('varchar', {
        name: "currency",  
    })
    currency: string;

   


   
}