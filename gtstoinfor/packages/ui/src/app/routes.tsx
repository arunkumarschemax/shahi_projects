import { Route, HashRouter as Router, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { ChildProtectionWrapper } from "./common/protected-child-wrapper"
import { ExceptionComponent } from "./common/exception-handling/exception-component"
import BasicLayout from "./layout/basic-layout/layout"
import Login from "./layout/login/login"
const UserCreationForm = lazy(() => import("./user-management/users/users-form"));
import UsersView from "./user-management/users/users-view"
import FactoriesView from "./masters/factories/factories-view"
import FactoriesForm from "./masters/factories/factories-form"
import { FabricContentdto, FactoryDto, Fobdto, ItemsDto, SupplierCreateDto, ThreadsDto } from "@project-management-system/shared-models"
import PdfUpload from "./nike/pdf-reader/pdf-upload"
import OrdersCompareGrid from "./nike/nike-orders-compare"
import PoFileImport from "./nike/reports/po-file-import"
// import PPMReport from "./nike/ppm-report"
// import FactoryPPMReport from "./nike/reports/factory-ppm-report"
const FactoryPPMReport = lazy(() => import("./nike/reports/factory-ppm-report"))
const PPMReport = lazy(() => import("./nike/ppm-report"))
import FabricTrackerReport from "./nike/reports/fabric-tracker-report"
import { NikeDashboard } from "./nike/nike-dash-components/nike-dashboard"
import { OrderAcceptance } from "./nike/components/order-acceptance"
import ShipmentPlanningChart from "./nike/shipment-planning-chart"
import NikeFileRevert from "./nike/components/file-revert"
import DivertReport from "./nike/reports/divert-report"
import ShipmentTrackerReport from "./nike/reports/shipment-tracker-report"
import ShipmentChangesCompareGrid from "./nike/shipment-compare-po"
import VASChangesCompareGrid from "./nike/vas-compare-report"
import DPOMSyncManually from "./nike/components/dpom-manual-sync"
import { FOBPriceVariationReport } from "./nike/reports/fob-price-variation-report"
import FabricTrackerReport1 from "./nike/reports/fabric-tracker-report1"
import FabricTrackerReport2 from "./nike/reports/fabric-tracker-report2"
import POPDFInfoGrid from "./nike/pdf-reader/pdf-file-info-grid"
import PoPdfTable from "./nike/pdf-reader/po-pdf-table"
import FobPriceListGrid from "./masters/fob-pricelist/fob-price-list-grid"
import FobPriceListForm from "./masters/fob-pricelist/fob-price-list-form"
import ChangeComparision from "./nike/pdf-reader/change-detail-view"
import PoDetailedview from "./nike/reports/po-detailed-view"
import ColineView from "./nike/components/co-line-view"
import FabricContenGrid from "./masters/fabric-content/fabric-conten-grid"
import FabricContentGrid from "./masters/fabric-content/fabric-conten-grid"
import FabricContentForm from "./masters/fabric-content/fabric-content-form"
import { Suspense, lazy } from "react"
import AddressView from "./masters/address/address-view"
import AddressUpload from "./masters/address/address-excel-upload"
import BomPdfUpload from "./bom-automation/bom-details-upload/pdf-upload"
import BackingPaper from "./trims/trim-prints/backing-paper"
import BomView from "./bom-automation/bom-details/bom-view"
import BomPdfInfoDetailView from "./bom-automation/bom-pdf-extraction/deatiled-view"
// import Button3Print from "./trims/trim-prints/button"
import TrimsGrid from "./trims/trims-grid"
import TrimColumns from "./trims/trim-columns"
import BomCreation from "./trims/bom-creation"
import TrimList from "./trims/trims-cardview"
import JokerTagPrint from "./trims/trim-prints/joker-tag"
import WasCarelabel from "./trims/trim-prints/wash-care-label"
import { HangTag } from "./trims/trim-prints/hang-tag"
import ItemInfo from "./trims/item-info"
import ProLayout from "@ant-design/pro-layout"
import LayoutTwo from "./layout/basic-layout/pro-layout"
import PoItemNoUpdate from "./nike/components/po-update"
import PPMReportUpload from "./bom-automation/ppm-report-upload/ppm-report-upload"
import BomGeneration from "./bom-automation/bom-generation/bom-generation"
import BomGenerationSteps from "./bom-automation/bom-generation/bom-generation-steps"
import BomExcelUpload from "./bom-automation/bom-details-upload/bom-excel-upload"
import { BomExcelDownload } from "./bom-automation/bom-excel-download/bom-excel-download"
import BomOrderAcceptance from "./bom-automation/bom-details/bom-order-acceptance"
import NecKType from "./trims/trim-prints/neck-tape"
import Interlining from "./trims/trim-prints/interlining"
import Drawcord from "./trims/trim-prints/drawcord"
import SwooshHtLable from "./trims/trim-prints/swoosh-ht-label"
import Elastic from "./trims/trim-prints/elastic"
import Mobilontape from "./trims/trim-prints/mobilion-tape"
import Twilltape from "./trims/trim-prints/twill-tape"
import CountryStickerPrint from "./trims/trim-prints/country-sticker"
import ItemMappingGrid from "./bom-automation/bom-details/item-mapping"
import ItemsGrid from "./items/items-grid"
import ItemsForm from "./items/items-form"
import ThreadView from "./masters/thread/thread-view"
import ThreadForm from "./masters/thread/thread-form"
import Grommets from "./trims/trim-prints/grommets"
import { Button3Print } from "./trims/trim-prints/button"


// import BasicLayout  from '@ant-design/pro-layout';
export const AppRoutes = () => {
    const router = createBrowserRouter(createRoutesFromElements(
        <Route  >
            <Route path='/' key='/' element={
                <ChildProtectionWrapper>
                    <>
                        <BasicLayout />
                    </>
                </ChildProtectionWrapper>
            } >
                <Route path="/user-management/users-from" element={<Suspense fallback={<div>Loading...</div>}><UserCreationForm /></Suspense>} />
                <Route path='/user-management/users-view' key='/user-management/users-view' element={<UsersView />} />
                <Route path='/masters'>
                    <Route path='factories/factories-view' key='/factories/factories-view' element={<FactoriesView />} />
                    <Route path='factories/factories-form' key='/factories/factories-form' element={<FactoriesForm Data={undefined} updateItem={function (Data: FactoryDto): void {
                        throw new Error("Function not implemented.")
                    }} isUpdate={false} closeForm={function (): void {
                        throw new Error("Function not implemented.")
                    }} />} />
                    {/* <Route path='supplier/supplier-view' key='supplier/supplier-view' element={<SupplierView />} />
                    <Route path='supplier/supplier-form' key='/supplier/supplier-form' element={<SupplierForm Data={undefined} updateItem={function (Data: SupplierCreateDto): void {
                        throw new Error("Function not implemented.")
                    }} isUpdate={false} closeForm={function (): void {
                        throw new Error("Function not implemented.")
                    }} />} /> */}
                </Route>
                <Route path='/nike'>
                    <Route path='file-import' element={<PoFileImport />} />
                    <Route path='dpom-sync' element={<DPOMSyncManually />} />
                    <Route path='file-revert' element={<NikeFileRevert />} />
                    <Route path='pdf-upload' element={<PdfUpload />} />
                    <Route path='co-line-view' element={<ColineView />} />
                    <Route path='pdf-upload-change-compare' element={<ChangeComparision data={undefined} />} />

                </Route>
                <Route path='/reports'>
                    <Route path='compare-orders' key='/compare-orders' element={<OrdersCompareGrid />} />
                    <Route path='shipment-compare' key='/shipment-compare' element={<ShipmentChangesCompareGrid />} />
                    <Route path='vas-compare' key='/vas-compare' element={<VASChangesCompareGrid />} />
                    <Route path='divert-report' element={<DivertReport />} />
                    <Route path='factory-report' element={<FactoryPPMReport />} />
                    <Route path="ppm-report" element={<PPMReport />} />
                    <Route path='fabrick-tracker-report' element={<FabricTrackerReport />} />
                    <Route path='fabrick-tracker-report1' element={<FabricTrackerReport1 />} />
                    <Route path='fabrick-tracker-report2' element={<FabricTrackerReport2 />} />
                    <Route path='order-acceptance' element={<OrderAcceptance />} />
                    <Route path='update-po-item-no' element={<PoItemNoUpdate />} />
                    <Route path='shipment-planning-chart' element={<ShipmentPlanningChart />} />
                    <Route path='shipment-report' element={<ShipmentTrackerReport />} />


                </Route>
                <Route path='/nike-dashboard' element={<NikeDashboard />} />
                <Route path='/403' key='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
            </Route>
            <Route path="/login" key='/login' element={<Login />} />
        </Route>
    ))

    return (

        <Routes>
            <Route path='/' element={<LayoutTwo />} >
                <Route path="/user-management/users-from" element={<Suspense fallback={<div>Loading...</div>}><UserCreationForm /></Suspense>} />
                <Route path='/user-management/users-view' element={<UsersView />} />
                <Route path='/masters'>
                    <Route path='factories/factories-view' element={<FactoriesView />} />
                    <Route path='factories/factories-form' element={<FactoriesForm Data={undefined} updateItem={function (Data: FactoryDto): void {
                        throw new Error("Function not implemented.")
                    }} isUpdate={false} closeForm={function (): void {
                        throw new Error("Function not implemented.")
                    }} />} />
                    <Route path='fob-price-list-view' element={<FobPriceListGrid />} />
                    <Route path='fob-price-list-form' element={<FobPriceListForm Data={undefined} updateItem={function (Data: Fobdto): void {
                        throw new Error("Function not implemented.")
                    }} isUpdate={false} closeForm={function (): void {
                        throw new Error("Function not implemented.")
                    }} />} />
                    <Route path='fabric-content-view' element={<FabricContentGrid />} />
                    <Route path='fabric-content-form' element={<FabricContentForm Data={undefined} updateItem={function (Data: FabricContentdto): void {
                        throw new Error("Function not implemented.")
                    }} isUpdate={false} closeForm={function (): void {
                        throw new Error("Function not implemented.")
                    }} />} />
                    {/* <Route path='supplier/supplier-view' element={<SupplierView />} />
                                <Route path='supplier/supplier-form' element={<SupplierForm Data={undefined} updateItem={function (Data: SupplierCreateDto): void {
                            throw new Error("Function not implemented.")
                        }} isUpdate={false} closeForm={function (): void {
                            throw new Error("Function not implemented.")
                        }} />} /> */}

                    <Route path='address-upload' element={<AddressUpload />} />
                    <Route path='address-view' element={<AddressView />} />
                 


                </Route>
                <Route path='/nike'>
                    <Route path='nike-dashboard' element={<NikeDashboard />} />
                    <Route path='dpom-sync' element={<DPOMSyncManually />} />
                    <Route path='file-import' element={<PoFileImport />} />
                    <Route path='file-revert' element={<NikeFileRevert />} />
                    <Route path='order-acceptance' element={<OrderAcceptance />} />
                    <Route path='pdf-upload' element={<PdfUpload />} />
                    <Route path='pdf-file-info-grid' element={<POPDFInfoGrid />} />
                    <Route path='po-pdf-table' element={<PoPdfTable data={undefined} />} />
                    <Route path='pdf-upload-change-compare' element={<ChangeComparision data={undefined} />} />
                    <Route path='co-line-view' element={<ColineView />} />
                    {/* <Route path='backing-paper' element={<BackingPaper bomInfo={undefined} />} /> */}
                    {/* <Route path='trim-grid' element={<TrimsGrid/>} /> */}
                    <Route path='trim-columns' element={<TrimColumns />} />
                    {/* <Route path='hang-tag' element={<HangTag />} /> */}


                </Route>

                <Route path='/bom'>
                    <Route path='bom-pdf-upload' key='bom-pdf-upload' element={<BomPdfUpload />} />
                    <Route path='bom-view' key={'bom-view'} element={<BomView />} />
                    <Route path='bom-pdf-info-detail-view/:styleId' key={'bom-pdf-info-detail-view'} element={<BomPdfInfoDetailView />} />
                    <Route path='bom-creation' key='/bom-creation' element={<BomGenerationSteps />} />
                    <Route path='bom-download' key='/bom-download' element={<BomExcelDownload />} />
                    <Route path='joker-tag' key='/joker-tag' element={<JokerTagPrint info={[]} />} />
                    <Route path='trim-grid' element={<TrimsGrid />} />
                    <Route path='trim-List' element={<TrimList />} />
                    <Route path='washcare-label' element={<WasCarelabel itemId={null} poLines={[]} />} />
                    <Route path='hang-tag' element={<HangTag info={[]} />} />
                    <Route path='item-info' element={<ItemInfo />} />
                    {/* <Route path='country-sticker' element={<CountryStickerPrint  />} /> */}
                    <Route path='ppm-report-upload' element={<PPMReportUpload />} />
                    <Route path='bom-excel-upload' element={<BomExcelUpload />} />
                    <Route path='bom-order-acceptance' element={<BomOrderAcceptance />} />
                    
                    {/* <Route path='neck-type' element={<NecKType bomInfo={[]} />} /> */}
                    {/* <Route path='interlining' element={<Interlining bomInfo={[]} />} /> */}
                    {/* <Route path='drawcord' element={<Drawcord bomInfo={[]} />} /> */}
                    {/* <Route path='SwooshHtLable' element={<SwooshHtLable bomInfo={[]} />} /> */}
                    {/* <Route path='elastic' element={<Elastic bomInfo={[]} />} /> */}
                    {/* <Route path='mobilontape' element={<Mobilontape bomInfo={[]} />} /> */}
                    {/* <Route path='twilltape' element={<Twilltape bomInfo={[]} />} /> */}
                   {/* < Route path='grommets' element={<Grommets bomInfo={[]}/>} /> */}
                   < Route path='itemMapping' element={<ItemMappingGrid />} />

                   <Route path='items-view'   element={<ItemsGrid />} />
                   {/* <Route path='items-form' element={<ItemsForm itemData={undefined} updateItem={function (itemData: ItemsDto): void {
                       throw new Error("Function not implemented.")
                   } } isUpdate={false} closeForm={function (): void {
                       throw new Error("Function not implemented.")
                   } } />} />           */}
                   <Route path="items-form" element={<ItemsForm itemData={[]} />}></Route>

                             <Route path='thread-view' element={<ThreadView />} />
                             <Route path="thread-form" element={<ThreadForm Data={[]} />}></Route>

                </Route>

                <Route path='/reports'>
                    {/* <Route path='factory-report' element={<FactoryPPMReport />} /> */}
                    <Route path='shipment-compare' key='/shipment-compare' element={<ShipmentChangesCompareGrid />} />
                    <Route path='vas-compare' key='/vas-compare' element={<VASChangesCompareGrid />} />
                    <Route path='compare-orders' key='/compare-orders' element={<OrdersCompareGrid />} />
                    <Route path='divert-report' element={<DivertReport />} />
                    <Route path='factory-report' element={<Suspense fallback={<div>Loading...</div>} ><FactoryPPMReport /></Suspense>} />
                    <Route path='ppm-report' element={<Suspense fallback={<div>Loading...</div>} ><PPMReport /></Suspense>} />
                    <Route path='fabrick-tracker-report' element={<FabricTrackerReport />} />
                    <Route path='fabrick-tracker-report1' element={<FabricTrackerReport1 />} />
                    <Route path='fabrick-tracker-report2' element={<FabricTrackerReport2 />} />
                    <Route path='shipment-planning-chart' element={<ShipmentPlanningChart />} />
                    <Route path='shipment-report' element={<ShipmentTrackerReport />} />
                    <Route path='fob-price-variation-report' element={<FOBPriceVariationReport />} />
                    <Route path='po-detailed-view' element={<PoDetailedview data={undefined} />} />
                    <Route path='button3' element={<Button3Print bomInfo={''} itemId={0} poLines={[]}/>} />
                    {/* <Route path='button3' element={<Button3Print itemId = {null} poLines={[""]} />} /> */}
                    {/* <Route path='backing-paper' element={<BackingPaper bomInfo={undefined} />} /> */}
                </Route>
                <Route path='nike-dashboard' element={<NikeDashboard />} />
                <Route path='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>

    )
}