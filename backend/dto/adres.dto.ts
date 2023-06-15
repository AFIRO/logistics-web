export class AdressDto {
  //@IsString()
  //@IsNotEmpty()
  straat: string;
  //@IsString()
  //@IsNotEmpty()
  nummer: string;
  //@IsString()
  //@IsNotEmpty()
  postcode: string;
  //@IsString()
  //@IsNotEmpty()
  land: string;

  public constructor(base?: Partial<AdressDto>) {
    this.straat = base.straat || this.straat;
    this.nummer = base.nummer || this.nummer;
    this.postcode = base.postcode || this.postcode;
    this.land = base.land || this.land;
  }
}