import { CommonColumns } from "packages/services/common/common-columns.entity";
import { Column, Entity } from "typeorm";

@Entity('fob_price')
export class FobEntity extends CommonColumns {

  @Column('varchar',{
    name: "planning_season_code",
    length: 10,
  })
  planningSeasonCode: string;

  @Column('varchar',{
    name: "planning_season_year",
    length: 10,
  })
  planningSeasonYear: string;

  @Column('varchar',{
    name: "style_number",
    length: 10,
  })
  styleNumber: string;

  @Column('varchar',{
    name: "color_code",
    length: 10,
  })
  colorCode: string;

  @Column('varchar',{
    name: "size_description",
    length: 10,
  })
  sizeDescription: string;



  @Column('decimal', {
    name: "shahi_confirmed_gross_price",
    nullable: true,
    precision: 5,
    scale: 2
})
shahiConfirmedGrossPrice: number;

@Column('varchar', {
    name: "shahi_confirmed_gross_price_currency_code",
    nullable: true
})
shahiConfirmedGrossPriceCurrencyCode: string;  
}
