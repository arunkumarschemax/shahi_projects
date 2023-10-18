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
import PdfUpload from "./nike/pdf-reader/pdf-upload"
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
                    <Route path='po-pdf-table' element={<PoPdfTable data={undefined}/>} />
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
                    <Route path='po-detailed-view' element={<PoDetailedview data={undefined}/>} />
                    
                </Route>
                <Route path='nike-dashboard' element={<NikeDashboard />} />
                <Route path='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>

    )
}