export class SeasonWiseRequest {
  itemCode?: number;
  itemName?: string;
  year: number;
  season: string;
  qtyLocation: string;
  constructor(
    itemCode?: number,
    itemName?: string,
    year?: number,
    season?: string,
    qtyLocation?: string
  ) {
    this.itemCode = itemCode;
    this.itemName = itemName;
    this.year = year;
    this.season = season;
    this.qtyLocation = qtyLocation;
  }
}
