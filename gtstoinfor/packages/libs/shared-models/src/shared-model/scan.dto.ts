export class AllScanDto {
    typedId: number;
    Gst: string;
    Ifsc: string;
    Innvoice: string;
    Customer: string;
    Volume: string;
    Weight: string;
    Chargeable: string;
    Packages: string;
    Date: string;
    Cartons: string;
    Console: string;
    PO: string;
    Payref: string;

    Quantity: string;
    InnvoiceNumber: string;
    Currency: string;
    Origin: string;
    Destination: string;

    createdUser: string;
    isActive?: boolean;
    versionFlag?: number;
    constructor(
        typedId: number,
        Gst: string,
        Ifsc: string,
        Innvoice: string,
        Customer: string,
        Volume: string,
        Weight: string,
        Chargeable: string,
        Packages: string,
        Date: string,
        Cartons: string,
        Console: string,
        PO: string,
        Payref: string,

        Quantity: string,
        InnvoiceNumber: string,
        Currency: string,
        Origin: string,
        Destination: string,

        createdUser: string,
        isActive?: boolean,
        versionFlag?: number) {
        this.typedId = typedId;
        this.Gst = Gst;
        this.Ifsc = Ifsc;
        this.Innvoice = Innvoice;
        this.Customer = Customer;
        this.Volume = Volume;
        this.Weight = Weight;
        this.Chargeable = Chargeable;
        this.Packages = Packages;
        this.Date = Date;
        this.Cartons = Cartons;
        this.Console = Console;
        this.PO = PO;
        this.Payref = Payref;
        
        this.Quantity = Quantity;
        this.InnvoiceNumber = InnvoiceNumber;
        this.Currency = Currency;
        this.Origin = Origin;
        this.Destination = Destination;

        this.createdUser = createdUser;
        this.isActive = isActive;
        this.versionFlag = versionFlag;
    }
}