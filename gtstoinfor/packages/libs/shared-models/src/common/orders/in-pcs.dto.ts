export class PcsDataDto {
  name?: string;
  janPcs?: number;
  febPcs?: number;
  marPcs?: number;
  aprPcs?: number;
  mayPcs?: number;
  junPcs?: number;
  julPcs?: number;
  augPcs?: number;
  sepPcs?: number;
  octPcs?: number;
  novPcs?: number;
  decPcs?: number;

  constructor(
    name?: string,
    janPcs?: number,
    febPcs?: number,
    marPcs?: number,
    aprPcs?: number,
    mayPcs?: number,
    junPcs?: number,
    julPcs?: number,
    augPcs?: number,
    sepPcs?: number,
    octPcs?: number,
    novPcs?: number,
    decPcs?: number
  ) {
    this.name = name;
    this.janPcs = janPcs;
    this.febPcs = febPcs;
    this.marPcs = marPcs;
    this.aprPcs = aprPcs;
    this.mayPcs = mayPcs;
    this.junPcs = junPcs;
    this.julPcs = julPcs;
    this.augPcs = augPcs;
    this.sepPcs = sepPcs;
    this.octPcs = octPcs;
    this.novPcs = novPcs;
    this.decPcs = decPcs;
  }
}
