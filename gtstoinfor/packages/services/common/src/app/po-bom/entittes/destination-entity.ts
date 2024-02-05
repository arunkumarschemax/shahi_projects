import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('destination')
export class DestinationEntity {
    @PrimaryGeneratedColumn('increment', {
        name: 'destination_id'
    })
    destinationId: number;

    @Column('varchar',{
        name:'country_code',
        nullable:false,
        length:100,
    })
    countryCode:string

    @Column('varchar',{
        name:'geo_code',
        nullable:false,
        length:100,

    })
    geoCode:string

    
    
}