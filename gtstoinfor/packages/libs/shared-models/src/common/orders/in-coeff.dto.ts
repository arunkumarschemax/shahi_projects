export class CoeffDataDto {
  name?: string;
  janCoeff?: number;
  febCoeff?: number;
  marCoeff?: number;
  aprCoeff?: number;
  mayCoeff?: number;
  junCoeff?: number;
  julCoeff?: number;
  augCoeff?: number;
  sepCoeff?: number;
  octCoeff?: number;
  novCoeff?: number;
  decCoeff?: number;

  constructor(
    name?: string,
    janCoeff?: number,
    febCoeff?: number,
    marCoeff?: number,
    aprCoeff?: number,
    mayCoeff?: number,
    junCoeff?: number,
    julCoeff?: number,
    augCoeff?: number,
    sepCoeff?: number,
    octCoeff?: number,
    novCoeff?: number,
    decCoeff?: number
  ) {
    this.name = name;
    this.janCoeff = janCoeff;
    this.febCoeff = febCoeff;
    this.marCoeff = marCoeff;
    this.aprCoeff = aprCoeff;
    this.mayCoeff = mayCoeff;
    this.junCoeff = junCoeff;
    this.julCoeff = julCoeff;
    this.augCoeff = augCoeff;
    this.sepCoeff = sepCoeff;
    this.octCoeff = octCoeff;
    this.novCoeff = novCoeff;
    this.decCoeff = decCoeff;
  }
}
