import { BuyersView, SchemaxAIDocx, DocView, LandingPageDashBoard, PriceView, VendorBranchInfoGrid, VendorGrid } from "../../components";
import ScanDetailView from "../../components/doc-extract/details-views";
import InvoiceReport from "../../components/reports/innvoice-reports";

export const components = {
    vendors: <VendorGrid />,
    PriceView: <PriceView />,
    BuyersView: <BuyersView />,
    DocumentScan: <SchemaxAIDocx />,
    DocView: <DocView />,
    VendorBranchInfoGrid: <VendorBranchInfoGrid />,
    LandingPageDashBoard: <LandingPageDashBoard />,
    ScanDetailView: <ScanDetailView />,
    InvoiceReport: <InvoiceReport/>
}
