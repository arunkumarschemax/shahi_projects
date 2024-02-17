import { Route, HashRouter as Router, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { ChildProtectionWrapper } from "./common/protected-child-wrapper"
import { ExceptionComponent } from "./common/exception-handling/exception-component"
import BasicLayout from "./layout/basic-layout/layout"
import Login from "./layout/login/login"
import UserCreationForm from "./user-management/users/users-form"
import UsersView from "./user-management/users/users-view"
import FactoriesView from "./masters/factories/factories-view"
import FactoriesForm from "./masters/factories/factories-form"
import { FabricContentdto, FactoryDto, Fobdto } from "@project-management-system/shared-models"
import OrdersCompareGrid from "./nike/nike-orders-compare"
import PoFileImport from "./nike/reports/po-file-import"
import PPMReport from "./nike/ppm-report"
import FactoryPPMReport from "./nike/reports/factory-ppm-report"
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
import POPDFInfoGrid from "./ralph-lauren/pdf-reader/pdf-file-info-grid"
import PoPdfTable from "./ralph-lauren/pdf-reader/po-pdf-table"
import FobPriceListGrid from "./masters/fob-pricelist/fob-price-list-grid"
import FobPriceListForm from "./masters/fob-pricelist/fob-price-list-form"
import ChangeComparision from "./ralph-lauren/pdf-reader/change-detail-view"
import PoDetailedview from "./nike/reports/po-detailed-view"
import FabricContenGrid from "./masters/fabric-content/fabric-conten-grid"
import FabricContentGrid from "./masters/fabric-content/fabric-conten-grid"
import FabricContentForm from "./masters/fabric-content/fabric-content-form"
import PdFInfoGrid from "./ralph-lauren/pdf-file-info-grid"
import RLOrdersGrid from "./ralph-lauren/orders-data-grid-view"
import RLOrdersDetailView from "./ralph-lauren/orders-data-detail-view"
import OrderAcceptanceGrid from "./ralph-lauren/order-acceptance-view"
// import PdfUpload from "./ralph-lauren/pdf-reader/pdf-upload"
import ColineView from "./ralph-lauren/co-line-view"
import AddressView from "./masters/address/address-view"
import AddressUpload from "./masters/address/address-excel-upload"
import PdfUpload from "./centric/pdf-upload"
import PPKPOReport from "./centric/ppk-po-report"
import CentricPdFInfoGrid from "./centric/pdf-file-grid"
import CentricOrdersGrid from "./centric/order-data-grid"
import CentricOrdersDetailView from "./centric/order-data-details-view"
import CentricOrderAcceptanceGrid from "./centric/centric-order-acceptance-view"
import CentricPdfUpload from "./centric/pdf-upload"
import CentriColineView from "./centric/centric-co-line-view"
import SolidPOReport from "./centric/solid-pack-po-report"
import PdfInfoDetailView from "./centric/pdf-info-detail-view"
import HbPdfUpload from "./hb-athletics/hb-pdf-upload"
import HbPdFInfoGrid from "./hb-athletics/hb-pdf-grid"
import HbPdfInfoDetailView from "./hb-athletics/hb-pdf-info-detail-view"
import HbOrderAcceptanceGrid from "./hb-athletics/hb-order-acceptance-view"
import HBOrdersGrid from "./hb-athletics/hb-order-data-grid"
import HBOrdersDetailView from "./hb-athletics/hb-order-data-details-view"
import HbColineView from "./hb-athletics/hb-co-line-view"
import OrderComparisionReport from "./hb-athletics/hb-order-comparsion-report"
import SanmarPdfUpload from "./sanmar/sanmar-pdf-upload"
import SanmarOrdersDetailView from "./sanmar/sanmar-order-data-details-view"
import SanmarOrdersGrid from "./sanmar/sanmar-order-data-grid"
import SanmarPdFInfoGrid from "./sanmar/sanmar-pdf-grid"
import SanmarPdfTable from "./sanmar/sanmar-pdf-detail-view"
import SanmarOrderAcceptanceGrid from "./sanmar/sanmar-order-acceptance-view"
import SanmarColineView from "./sanmar/sanmar-co-line-view"
import SanmarOrderComparisionReport from "./sanmar/sanmar-order-comparsion-report"
import EddieOrdersGrid from "./eddiebauer/eddie-order-data-grid"
import EddiePdfUpload from "./eddiebauer/pdf-upload"
import EddiePdFInfoGrid from "./eddiebauer/eddie-pdf-grid"
import EddieOrderAcceptanceGrid from "./eddiebauer/eddie-order-acceptance-view"
import EddieColineView from "./eddiebauer/eddie-co-line-view"
import EddiePdfTable from "./eddiebauer/eddie-pdf-detail-view"
import EddieOrdersDetailView from "./eddiebauer/eedie-order-detail-view"
import EddieComparisionReport from "./eddiebauer/eedie-comparision-report"
import ColorUpload from "./masters/color/color-excel-upload"
import ColorView from "./masters/color/color-view"


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
                <Route path='/user-management/users-from' key='/user-management/users-from' element={<UserCreationForm />} />
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
            <Route path='/' element={
                <>
                    <>
                        <BasicLayout />
                    </>
                </>
            } >
                <Route path='/user-management/users-from' element={<UserCreationForm />} />
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



                </Route>
                <Route path='/reports'>
                    <Route path='factory-report' element={<FactoryPPMReport />} />
                    <Route path='shipment-compare' key='/shipment-compare' element={<ShipmentChangesCompareGrid />} />
                    <Route path='vas-compare' key='/vas-compare' element={<VASChangesCompareGrid />} />
                    <Route path='compare-orders' key='/compare-orders' element={<OrdersCompareGrid />} />
                    <Route path='divert-report' element={<DivertReport />} />
                    <Route path='factory-report' element={<FactoryPPMReport />} />
                    <Route path='ppm-report' element={<PPMReport />} />
                    <Route path='fabrick-tracker-report' element={<FabricTrackerReport />} />
                    <Route path='fabrick-tracker-report1' element={<FabricTrackerReport1 />} />
                    <Route path='fabrick-tracker-report2' element={<FabricTrackerReport2 />} />
                    <Route path='shipment-planning-chart' element={<ShipmentPlanningChart />} />
                    <Route path='shipment-report' element={<ShipmentTrackerReport />} />
                    <Route path='fob-price-variation-report' element={<FOBPriceVariationReport />} />
                    <Route path='po-detailed-view' element={<PoDetailedview data={undefined} />} />

                </Route>
                <Route path='/ralph-lauren'>
                    <Route path='pdf-info' element={<PdFInfoGrid />} />
                    <Route path='order-data-info-grid' element={<RLOrdersGrid />} />
                    <Route path='order-data-detail-view' element={<RLOrdersDetailView />} />
                    <Route path='order-acceptance-view' element={<OrderAcceptanceGrid />} />
                    <Route path='pdf-upload' element={<PdfUpload />} />
                    <Route path='co-line-view' element={<ColineView />} />
                    <Route path='masters/address/address-excel-upload' key='/address/address-excel-upload' element={<AddressUpload/>} />
                   <Route path='masters/address/address-view' key='/address/address-view' element={<AddressView/>} />

                </Route>

                <Route path='/centric'>
                    <Route path='pdf-info' element={<CentricPdFInfoGrid />} />
                    <Route path='ppk-po-report' element={<PPKPOReport />} />
                    {/* <Route path='masters/address/address-excel-upload' key='/address/address-excel-upload' element={<AddressUpload/>} />
                   <Route path='masters/address/address-view' key='/address/address-view' element={<AddressView/>} /> */}
                   <Route path='order-data-info-grid' element={<CentricOrdersGrid />} />
                   <Route path='order-data-detail-view' element={<CentricOrdersDetailView />} />
                   
                   <Route path='centric-order-acceptance' element={<CentricOrderAcceptanceGrid />} />
                   <Route path='centric-pdf-upload' element={<CentricPdfUpload />} />

                   <Route path='centric-co-line-view' element={<CentriColineView />} />
                   <Route path='solid-pack-po-report' element={<SolidPOReport />} />
                   <Route path='pdf-info-detail-view' element={<PdfInfoDetailView />} />


                    

                </Route>

                <Route path='/hb-athletics'>
                   <Route path='hb-pdf-upload' element={<HbPdfUpload />} />
                   <Route path='masters/address/address-excel-upload' key='/address/address-excel-upload' element={<AddressUpload/>} />
                   <Route path='masters/address/address-view' key='/address/address-view' element={<AddressView/>} />
                   <Route path='pdf-info' element={<HbPdFInfoGrid />} />
                   <Route path='pdf-info-detail-view' element={<HbPdfInfoDetailView />} />

                   <Route path='hb-order-acceptance' element={<HbOrderAcceptanceGrid />} />
                   <Route path='hb-order-data-info-grid' element={<HBOrdersGrid />} />
                   <Route path='hb-order-data-detail-view' element={<HBOrdersDetailView />} />


                   <Route path='hb-co-line-view' element={<HbColineView />} />
                   <Route path='hb-order-comparision-report' element={<OrderComparisionReport />} />

                </Route>
                <Route path='/sanmar'>
                   <Route path='sanmar-pdf-upload' element={<SanmarPdfUpload />} />
                   <Route path='sanmar-order-data-info-grid' element={<SanmarOrdersGrid />} />
                   <Route path='sanmar-order-data-detail-view' element={<SanmarOrdersDetailView />} />
                   <Route path='pdf-info' element={<SanmarPdFInfoGrid />} />
                   <Route path='pdf-info-detail-view' element={<SanmarPdfTable />} />
                   <Route path="sanmar-order-acceptance" element={<SanmarOrderAcceptanceGrid/>}/>
                   <Route path="sanmar-co-line-view" element={<SanmarColineView/>}/>
                   <Route path='sanmar-order-comparision-report' element={<SanmarOrderComparisionReport />} />
                   <Route path='masters/address/address-excel-upload' key='/address/address-excel-upload' element={<AddressUpload/>} />
                   <Route path='masters/address/address-view' key='/address/address-view' element={<AddressView/>} />
              
                </Route>
                <Route path='/eddiebauer'>
                   
                   <Route path='eddiebauer-order-data-info-grid' element={<EddieOrdersGrid />} />
                   <Route path='eddiebauer-pdf-upload' element={<EddiePdfUpload />} />
                   <Route path='pdf-info' element={<EddiePdFInfoGrid />} />
                   <Route path="eddiebauer-order-acceptance" element={<EddieOrderAcceptanceGrid/>}/>
                   <Route path="eddiebauer-co-line-view" element={<EddieColineView/>}/>
                   <Route path='pdf-info-detail-view' element={<EddiePdfTable />} />
                   <Route path='eddiebauer-order-data-detail-view' element={<EddieOrdersDetailView />} />
                   <Route path='masters/address/address-excel-upload' key='/address/address-excel-upload' element={<AddressUpload/>} />
                   <Route path='masters/address/address-view' key='/address/address-view' element={<AddressView/>} />
                   <Route path="eddiebauer-comparision-report" element={<EddieComparisionReport/>}/>

                   <Route path='masters/color/color-excel-upload' key='/color/color-excel-upload' element={<ColorUpload/>} />
                   <Route path='masters/color/color-view' key='/color/color-view' element={<ColorView/>} />



                  
              
                </Route>

                <Route path='nike-dashboard' element={<NikeDashboard />} />
                <Route path='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>

    )
}