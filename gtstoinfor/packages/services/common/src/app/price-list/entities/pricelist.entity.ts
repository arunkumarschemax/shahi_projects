import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, Entity,  PrimaryGeneratedColumn } from "typeorm";

@Entity('price_list') 
export class PriceListEntity extends CommonColumns  {



    @Column('varchar', {
        name: "style",
       
    })
    style: string;

    @Column('varchar', {
        name: "year",
       
    })
    year: string;

    @Column('varchar', {
        name: "destination",
       
    })
    destination: string;

    @Column('varchar', {
        name: "season_code",
        
    })
    seasonCode: string;

    @Column('varchar', {
        name: "currency",  
    })
    currency: string;

   


   
}