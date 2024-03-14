import { Route, HashRouter as Router, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { ChildProtectionWrapper } from "./common/protected-child-wrapper"
import { ExceptionComponent } from "./common/exception-handling/exception-component"
import BasicLayout from "./layout/basic-layout/layout"
import Login from "./layout/login/login"
import UserCreationForm from "./user-management/users/users-form"
import UsersView from "./user-management/users/users-view"
import FactoriesView from "./masters/factories/factories-view"
import FactoriesForm from "./masters/factories/factories-form"
import ExcelImport from "./excel-import/excel-import"
import ChangesGrid from "./excel-import/changes-grid"
import AllOrdersGridView from "./excel-import/orders-view-grid"
import { FileRevert } from "./excel-import/file-revert"
import VersionChanges from "./excel-import/version-wise-table"
import CurrenciesForm from "./masters/currencies/currency-form"
import CurrenciesGrid from "./masters/currencies/currencies-grid"
import CompanyForm from "./masters/company/company-form"
import CompanyGrid from "./masters/company/company-grid"
import { ColourDto, ContentDtos, CurrencyDto, FabricFinishTypesDTO, FabricStructuresDTO, FabricSubTypeDto, M3KnittedFabricsDTO, PurchaseViewDto, TrimDtos, TrimParamsMappingRequestDto, VarietyDtos } from "@project-management-system/shared-models"
import MasterBrandsForm from "./masters/master-brands/master-brands-form"
import MasterBrandsGrid from "./masters/master-brands/master.brands-gridt"
import OperationsForm from "./masters/operations/operations-form"
import OperationsGrid from "./masters/operations/operations-gridt"
import { PaymentMethodForm } from "./masters/payment-method/payment-method-form"
import { PaymentMethodGrid } from "./masters/payment-method/payment-method-grid"
import BuyersForm from "./masters/buyers/buyers-form"
import BuyersView from "./masters/buyers/buyers-view"
import VendorsForm from "./masters/vendors/vendors-form"
import VendorsView from "./masters/vendors/vendors-view"
import EmployeeDetsilsForm from "./masters/employee-details/employee-details-form"
import EmployeeDetailsGrid from "./masters/employee-details/employee-details-grid"
import OperationGroupForm from "./masters/operation-groups/operation-groups-form"
import OperationGroupsGrid from "./masters/operation-groups/operation-group-view"
import ItemsForm from "./masters/items/items-form"
import DeliveryMethodForm from "./masters/delivery-methods/delivery-method-form"
import DeliveryMethodGrid from "./masters/delivery-methods/delivery-method-grid"
import ItemCategoriesGrid from "./masters/item-categories/item-categories-grid"
import ItemSubCategoriesGrid from "./masters/item-sub-categories/item-sub-categories-grid"
import ItemSubCategoriesForm from "./masters/item-sub-categories/item-sub-categories-form"
import DivisionGrid from "./masters/company/division-grid"
import DeliveryTermsForm from "./masters/delivery-terms/delivery-terms-form"
import DeliveryTermsGrid from "./masters/delivery-terms/delivery-terms-grid"
import ItemsGrid from "./masters/items/item-grid"
import PhaseWiseData from "./excel-import/phase-wise-data"
import StyleForm from "./style-management/style/style-form"
import { PaymentTermsForm } from "./masters/payments-terms/payment-terms-form"
import PaymentTermsGrid from "./masters/payments-terms/payment-terms-grid"
import { PackageTermsGrid } from "./masters/packages-terms/package-terms-grid"
import PackageTermsForm from "./masters/packages-terms/package-terms-form"
import StyleGrid from "./style-management/style/style-grid"
import LiscenceTypesGrid from "./masters/Liscence Types/liscence_types_grid"
import LiscenceTypesForm from "./masters/Liscence Types/liscence_types_form"
import { GarmentCategoryForm } from "./masters/garment category/garment-category-form"
import { GarmentCategoryGrid } from "./masters/garment category/garment-category-grid"
import ComponentsMappingForm from "./components-mapping/components-mapping-form"
import { GarmentsGrid } from "./masters/garments/garments-grid"
import GarmentsForm from "./masters/garments/garments-form"
import BuyersGeneralAttributeForm from "./masters/buyers/buyers-general-attribute-form"
import ComponentsForm from "./masters/Components/components-form"
import ComponentsGrid from "./masters/Components/components-grid"
import AttributesGrid from "./masters/attributes/attributes-grid"
import AttributesForm from "./masters/attributes/attributes-form"
import BuyersOrderAttributeForm from "./masters/buyers/buyers-order-attribute-form"
import WarehouseGrid from "./masters/warehouse/warehouse-grid"
import WarehouseForm from "./masters/warehouse/warehouse-form"
import ComponentMappingView from "./components-mapping/components-mapping-view"
import ProfitControlHeadGrid from "./masters/profit-control-head/profit-control-head-grid"
import { ProfitControlHeadForm } from "./masters/profit-control-head/profit-control-head-form"
import LocationsForm from "./masters/locations/locations-form"
import LocationsGrid from "./masters/locations/locations-grid"
import TaxesForm from "./masters/taxes/taxes-form"
import TaxesGrid from "./masters/taxes/taxes-grid"
import SampleTypesGrid from "./masters/sample-types/sample-type-grid"
import SampleTypeForm from "./masters/sample-types/sample-type-form"
import SampleSubTypesForm from "./masters/sample sub types/sample-sub-types-form"
import SampleSubTypesGrid from "./masters/sample sub types/sample-sub-types-grid"
import DestinationForm from "./masters/destination/destination-form"
import DestinationGrid from "./masters/destination/destination-grid"
import FabricTypeForm from "./masters/fabric-type/fabric-type-form"
import FabricTypeGrid from "./masters/fabric-type/fabric-type-grid"
import FabricSubTypeGrid from "./masters/fabric-sub-types/fabric-sub-types-view"
import FabricSubTypeForm from "./masters/fabric-sub-types/fabric-sub-type-form"
import SettingsForm from "./masters/settings/settings-form"
import SizeGrid from "./masters/sizes/size.view"
import SizeForm from "./masters/sizes/size.form"
import CustomGroupsGrid from "./masters/custom-groups/custom-groups-grid"
import CustomGroupsForm from "./masters/custom-groups/custom-groups-form"
import ROSLGroupsForm from "./masters/rosl-groups/rosl-groups-form"
import ROSLGroupsGrid from "./masters/rosl-groups/rosl-groups-grid"
import BuyingHouseForm from "./masters/buying-house/buying-house-form"
import BuyingHouseGrid from "./masters/buying-house/buying-house-grid"
import CommissionForm from "./masters/commission/commission-form"
import CommissionGrid from "./masters/commission/commission-grid"
import FabricStructuresGrid from "./masters/fabric-structure/fabric-structure.grid"
import FabricStructuresForm from "./masters/fabric-structure/fabric-structure.form"
import FabricFinishTypesForm from "./masters/fabric-finish-types/fabric-finish-types.form"
import FabricFinishTypesGrid from "./masters/fabric-finish-types/fabric-finish-types.grid"
import BuyersDestinationForm from "./common/buyers-destination/buyer-destination.form"
import BuyersDestinationGrid from "./common/buyers-destination/buyer-destination.grid"
import ColourGrid from "./masters/colours/colour-grid"
import { ColourForm } from "./masters/colours/colour-form"
import DepartmentGrid from "./masters/departments/department-grid"
import DepartmentForm from "./masters/departments/department-form"
import AccountControlObjectGrid from "./masters/account-control-objects/account-control-objects-view"
import AccountControlObjectForm from "./masters/account-control-objects/account-control-objects-form"
import ItemCreation from "./orders/item-creation"
import SampleRequestView, { SampleDevView } from "./sample-development/sample-dev-req-view"
import SampleDevForm from "./sample-development/sample-dev-req-form"
import FabricsGrid from "./masters/fabrics/fabrics-view"
import { FabricsForm } from "./masters/fabrics/fabrics-form"
import SettingsView from "./masters/settings/settings-view"
import TrimsBomCreation from "./BOM/trims-bom-creation"
import SkuList from "./orders/sku-list"
import SKUGeneration from "./orders/sku-generation"
import UomGrid from "./masters/uom/uom-grid"
import FabricDevelopmentView from "./fabric development/fabric-development-view"
import { QualityTabsView } from "./fabric development/quality-tabs-view"
import SampleDevDetail from "./sample-development/sample-request-detailed-view"
import FabricBomCreation from "./BOM/fabric-creation"
import FabricWeaveForm from "./masters/fabric-weave/fabric-weave-form"
import FabricWeaveGrid from "./masters/fabric-weave/fabric-weave-grid"
import FabricDevelopmentRequest from "./fabric development/fabric-development-request"
import OperationSequenceForm from "./orders/operations-squence-form"
import OperationReportingView from "./orders/operation-reporting-view"
import MarketingReqForm from "./marketing-requisition/marketing-requisition-form"
import MarketingReqGrid from "./marketing-requisition/marketing-requisition-view"
import SourcingRequisitionForm from "./sourcing-requisition/sourcing-requisition-form"
import SourcingRequisitionView from "./sourcing-requisition/sourcing-requisition-view"
import SourcingRequisitionReport from "./sourcing-requisition/sourcing-requisition-report"
import MarketingReqReport from "./marketing-requisition/marketing-report"
import SourcingRequisitionDynamicForm from "./sourcing-requisition/sourcing-requisition-dynamic-form"
import SourcingRequisitionDynamicView from "./sourcing-requisition/sourcing-requisition-dynamic-view"
import StoreIssue, { SampleRequests } from "./sample-development/sample-requests"
import StoreIssueDetailed from "./sample-development/store-issue-detailed-view"
import SourceIssuesDetailView from "./sample-development/source-issues-detail-view"
import M3Masters from "./m3Masters/m3-masters"
import M3MastersView from "./m3Masters/m3-masters-view"
import { StockView } from "./sourcing-requisition/stock-view"
import SourceIssuesView from "./sample-development/source-issues-view"
import MaterialIssueView from "./sample-development/material-issue"
import MarketIssueDetail from "./sample-development/market-detail"
import IssueScreen from "./operation-tracking/issue"
import { InventoryView } from "./operation-tracking/inventory"
import StyleOrderCreation from "./style-orders/style-order-form"
import MaterialIssueReport from "./sample-development/material-issue-report"
import StockReport from "./Reports/stock-report"
import SampleRequestReport from "./Reports/sample-request-report"
import RackPosition from "./rm_locations/rack-positions"
import PositionGrid from "./rm_locations/rack-positions grid"
import PurchaseOrderForm from "./purchase-order2/purchase-order-form"
import SampleInventory from "./sample-development/sample-inventory-grid"
import RackForm from "./masters/Racks/Racks-form"
import RackView from "./masters/Racks/Racks-view"
import QualityView from "./masters/quality/quality-view"
import QualityForm from "./masters/quality/quality-form"
import PurchaseOrderDetailsView from "./purchase-order2/purchase-order-details-view"
import { GrnPendingInfoGrid } from "./sample-development/grn-pending-info-grid"
import { LocationMapping } from "./sample-development/location-mapping"
import M3StyleCode from "./masters/m3-style-codes/m3-styleCode-form"
import M3StyleCodeView from "./masters/m3-style-codes/m3-styleCode-view"
import IndentReport from "./sourcing-requisition/indent-report"
import GRNForm from "./grn/grn-form"
import M3Items from "./masters/m3-items/m3-items-form"
import M3ItemsView from "./masters/m3-items/m3-items-view"
import OperationInventoryView from "./operation-tracking/operation-inventory-view"
import OperationMapping from "./operation-tracking/operation-mapping"
import { PurchaseOrderView } from "./purchase-order2/purchase-order-view"
import UomForm from "./masters/uom/uom-form"
import BomIndentView from "./sourcing-requisition/bom-indent-view"
import GRNView from "./grn/grn-view"
import GRNDetailView from "./grn/grn-detail-view"
import { Reclassification } from "./sourcing-requisition/reclassification"
import SampleDevNewView from "./sample-development/sampling-develop-req-view"
import LevelForm from "./common/level/level.form"
import LevelGrid from "./common/level/level.view"
import { MaterialAllocationGrid } from "./sample-development/material-allocation"
import CommonForm from "./masters/column/column-form"
import CommonView from "./masters/column/column-view"
import ColumnForm from "./masters/column/column-form"
import ColumnView from "./masters/column/column-view"
import { MaterialAllocationView } from "./sample-development/material-allocation-view"
import SampleOperationReporting from "./orders/sample-operation-reporting"
import { MaterialAllocationDetailView } from "./sample-development/material-allocation-detail.view"
import WarehouseDashboard from "./common/dashboards/warehouse-dashboard"
import { ReclassificationApprovalGrid } from "./sourcing-requisition/reclassification-approval-grid"
import AllocatedStockApproval from "./sample-development/allocated-stock-approval"
import QualityGrid from "./common/qualitys/qualitys-view"
import QualitysForm from "./common/qualitys/qualitys-form"
import StoreIssues from "./sample-development/store-issues"
import ThicknessForm from "./masters/thickness/thickness-form"
import ThicknessView from "./masters/thickness/thickness-view"
import TypeView from "./masters/type/type-view"
import { TypeForm } from "./masters/type/type-form"
import { VarietyForm } from "./trim-master/variety/variety-form"
import VarietyGrid from "./trim-master/variety/variety-view"
import { TrimForm } from "./trim-master/trim/trim-form"
import TrimGrid from "./trim-master/trim/trim-view"
import CategoryForm from "./common/category/category-form"
import CategoryView from "./common/category/category-view"
import path from "path"
import { ContentForm } from "./trim-master/content/content-form"
import ContentGrid from "./trim-master/content/content-view"
import StructureForm, { StructureView } from "./common/structure/structure.view"
import FinishForm from "./trim-master/finish/finish"
import FinishGrid from "./trim-master/finish/finish-view"
import HoleForm from "./trim-master/hole/hole"
import HoleGrid from "./trim-master/hole/hole-view"
import M3TrimItemsForm from "./trim-master/m3-trim-items/m3-trim-items"
import { RmTrimsView } from "./sourcing-requisition/rm-trims-view"
import { M3TrimsView } from "./trim-master/m3-trim-items/m3-trims-view"
import { Dashboard } from "./common/dashboards/dashboard"
import MaterialIssuedView from "./sample-development/material-issued-view"
import MaterialIssuesDetailsView from "./sample-development/material-issued-detail-view"
import PickListPrint from "./sample-development/pick-list-print"
import LocationQrCodePrint from "./rm_locations/location-barcode-print"
import PurchaseOrderQrCodePrint from "./purchase-order2/po-qrcode-print"
import WeightForm from "./common/weight/weight-form"
import WeightView from "./common/weight/weight-view"
import SampleReqDetailView from "./sample-development/sample-dev-req-detail-view"
import GrnReport from "./Reports/grn-report"
import PurchaseOrderReport from "./Reports/purchase-order-report"
import FabricRequestCodeView from "./item-request-code/fabric-request-code-view"
import { TrimReqCodeView } from "./item-request-code/trim-request-code-view"
import ProductGrid from "./masters/product/product-grid"
import ProductForm from "./masters/product/product-form"
import TrimParamsMapping from "./trim-master/m3-trim-items/trims-mapping-form"
import TrimsParamsMappingView from "./trim-master/m3-trim-items/trim-mapping-view"
import PatternForm from "./masters/pattern/pattern-form"
import PatternView from "./masters/pattern/pattern-view"
import StockReceivedApproval from "./sample-development/stock-received-approval"
import ReceiveSampleOrders from "./sample-development/receive-sample-orders"
import M3KnittedView from "./masters/m3-items/m3-knitted-view"
import TrimUomForm from "./trim-master/trim-uom/trim-uom"
import TrimUomGrid from "./trim-master/trim-uom/trim-uom-view"
import FunctionForm from "./trim-master/function/function-form"
import FunctionGrid from "./trim-master/function/function-view"
import InnerDiaForm from "./trim-master/innerdia/innerdia-form"
import InnerDiaGrid from "./trim-master/innerdia/innerdia-view"
import GaugeForm from "./trim-master/gauge/gauge-form"
import GaugeGrid from "./trim-master/gauge/gauge-view"



export const AppRoutes = () => {
    // const router = createBrowserRouter(createRoutesFromElements(
    //     <Route  >
    //         <Route path='/' key='/' element={
    //             <ChildProtectionWrapper>
    //                 <>
    //                     <BasicLayout />
    //                 </>
    //             </ChildProtectionWrapper>
    //         } >
    //             <Route path='/user-management/users-from' key='/user-management/users-from' element={<UserCreationForm />} />
    //             <Route path='/user-management/users-view' key='/user-management/users-view' element={<UsersView />} />

    //             <Route path='/excel-import' key='/excel-import'>
    //                 <Route path='excel-import' key='/excel-import' element={<ExcelImport />} />
    //                 <Route path='changes-view' key='/changes-view' element={<ChangesGrid />} />
    //                 <Route path='grid-view' key='/grid-view' element={<AllOrdersGridView />} />
    //                 <Route path='revert-orders' key='/revert-orders' element={<FileRevert />} />
    //                 <Route path='version-grid' key='/version-grid' element={<VersionChanges />} />
    //                 {/* <Route path='phase-wise-grid' key='/phase-wise-grid' element={<PhaseWiseData />} /> */}
    //             </Route>
    //             <Route path='/dashboard' key='/dashboard' element={<Dashboard />} />
    //             <Route path='/403' key='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
    //         </Route>
    //         <Route path="/login" key='/login' element={<Login />} />
    //     </Route>
    // ))

    return (
        <Routes>
            <Route path='/' key='/' element={<BasicLayout />} >
                <Route path='/user-management/users-from' element={<UserCreationForm />} />
                <Route path='/user-management/users-view' element={<UsersView />} />

                <Route path='/stock-report' element={<StockReport />} />
                <Route path='/sample-request-report' element={<SampleRequestReport />} />

                {/* <Route path='/stack-report' element={<StockReport/>}/> */}
                {/* <Route path='/stack-report' element={<StockReport />} /> */}
                <Route path='/material-requisition' element={<SampleRequestReport />} />


                <Route path='/uom-form' element={<UomForm />} />


                <Route path='/m3-items' element={<M3Items props={undefined}/>} />
                <Route path='/m3-items-view' element={<M3ItemsView />} />
                <Route path='/m3-knitted-items-view' element={<M3KnittedView />} />

                <Route path='/wh-dashboard' element={<WarehouseDashboard />} />
                {/* <Route path='/masters'> */}
                <Route path='quality-form' element={<QualityForm />} />
                <Route path='reclassification' element={<Reclassification data={undefined} buyer={undefined} type="" status={undefined} />} />

                <Route path='quality-view' element={<QualityView />} />
                <Route path='rack-form' element={<RackForm />} />
                <Route path='rack-view' element={<RackView />} />
                <Route path='rack-position-form' element={<RackPosition />} />
                <Route path='rackPosition-view' element={<PositionGrid />} />
                <Route path='m3-itemcodes' element={<M3Masters
                    isUpdate={false}
                    closeForm={() => { }}
                    updateDetails={(undefined) => { }} m3MasterData={undefined} />} />
                <Route path='m3-itemcodes-view' element={<M3MastersView />} />


                {/* <Route path='/stack-report' element={<StockReport/>}/> */}
                <Route path='/masters'>
               
                    <Route path="pattern-form" element={<PatternForm 
                    isUpdate={false}
                    closeForm={()=>{}}
                    updatePattern={(undefined)=>{}}
                    data={undefined}/>}/>
                    <Route path="pattern-view" element={<PatternView/>}/>
                    <Route path='quality-form' element={<QualityForm />} />
                    <Route path='quality-view' element={<QualityView />} />
                    <Route path='rack-form' element={<RackForm />} />
                    <Route path='rack-view' element={<RackView />} />
                    <Route path='rack-position-form' element={<RackPosition />} />
                    <Route path='rackPosition-view' element={<PositionGrid />} />
                    <Route path='m3-styleCodes-form' element={<M3StyleCode />} />
                    <Route path='m3-styleCodes-view' element={<M3StyleCodeView />} />

                    <Route path='m3-itemcodes' element={<M3Masters
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} m3MasterData={undefined} />} />
                    <Route path='m3-itemcodes-view' element={<M3MastersView />} />
                    <Route path='factories/factories-view' element={<FactoriesView />} />
                    <Route path='factories/factories-form' element={<FactoriesForm factoryData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateFactory={(undefined) => { }} />} />
                    <Route path='items/item-grid' element={<ItemsGrid />} />

                    <Route path='currencies/currency-form' element={<CurrenciesForm currencyData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />

                    <Route path='currencies/currency-view' element={<CurrenciesGrid />} />
                    <Route path='company/company-form' element={<CompanyForm Data={undefined} updateItem={function (companyData: undefined): void {
                    }} isUpdate={false} closeForm={function (): void {

                    }} />} />
                    <Route path='company/company-grid' element={<CompanyGrid />} />
                    <Route path='Level/Level-view' element={<LevelGrid />} />
                    <Route path='Level/Level-form' element={<LevelForm levelData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} />} />
                    <Route path='company/division-grid' element={<DivisionGrid />} />
                    <Route path='warehouse/warehouse-form' element={<WarehouseForm Data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='warehouse/warehouse-grid' element={<WarehouseGrid />} />

                    <Route path='destination/destination-form' element={<DestinationForm Data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='destination/destination-grid' element={<DestinationGrid />} />

                    <Route path='brands/brand-form' element={<MasterBrandsForm masterBrandData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateMasterBrand={(undefined) => { }} />} />
                    <Route path='brands/brand-view' element={<MasterBrandsGrid />} />
                    <Route path='operations/operation-form' element={<OperationsForm operationData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateOperation={(undefined) => { }} />} />
                    <Route path='operations/operation-view' element={<OperationsGrid />} />

                    <Route path='paymentmethod/paymentmethod-form' element={<PaymentMethodForm paymentMethodData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />

                    <Route path='paymentmethod/paymentmethod-view' element={<PaymentMethodGrid />} />
                    <Route path='fabrics/fabrics-form' element={<FabricsForm fabricData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />

                    <Route path='fabrics/fabrics-view' element={<FabricsGrid />} />
                    <Route path='taxes/taxes-form' element={<TaxesForm taxesData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateTax={(undefined) => { }} />} />
                    <Route path='taxes/taxes-grid' element={<TaxesGrid />} />




                    <Route path='buyers/buyers-view' element={<BuyersView />} />
                    <Route path='buyers/buyers-form' key='/buyers/buyers-form' element={<BuyersForm buyersData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='vendors/vendors-form' key='/vendors/vendors-form' element={<VendorsForm vendorsData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='vendors/vendors-view' element={<VendorsView />} />
                    <Route path='employee-details/employee-details-form' element={<EmployeeDetsilsForm employeeData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='employee-details/employee-details-grid' element={<EmployeeDetailsGrid />} />
                    <Route path='operationgroups/operationgroups-form' key='/operationgroups/operationgroups-form' element={<OperationGroupForm operationGroupData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='operationgroups/operationgroups-view' element={<OperationGroupsGrid />} />
                    <Route path="items/items-form" key='/items/items-form' element={
                        <ItemsForm itemData={undefined}
                            isUpdate={false}
                            closeForm={() => { }}
                            updateItem={(undefined) => { }} />
                    } />
                    <Route path='garmentcategory/garmentcategory-form' key='garmentcategory/garmentcategory-form' element={< GarmentCategoryForm GarmentCategoryData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='garmentcategory/garmentcategory-view' element={<GarmentCategoryGrid />} />
                    <Route path="item-categories/item-categories-view" element={<ItemCategoriesGrid />} />
                    <Route path='item-sub-categories/item-sub-categories-form' element={<ItemSubCategoriesForm subCategoryData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateData={(undefined) => { }} />} />
                    <Route path='item-sub-categories/item-sub-categories-view' element={<ItemSubCategoriesGrid />} />
                    <Route path='garments/garments-view' element={<GarmentsGrid />} />
                    <Route path='garments/garments-form' element={<GarmentsForm
                        garmentData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateData={(undefined) => { }} />} />
                      
                    <Route path='currencies/currency-form' element={<CurrenciesForm currencyData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />

                    <Route path='currencies/currency-view' element={<CurrenciesGrid />} />
                    <Route path='company/company-form' element={<CompanyForm Data={undefined} updateItem={function (companyData: undefined): void {
                    }} isUpdate={false} closeForm={function (): void {

                    }} />} />
                    <Route path='company/company-grid' element={<CompanyGrid />} />
                    <Route path='company/division-grid' element={<DivisionGrid />} />
                    <Route path='warehouse/warehouse-form' element={<WarehouseForm Data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='warehouse/warehouse-grid' element={<WarehouseGrid />} />

                    <Route path='destination/destination-form' element={<DestinationForm Data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='destination/destination-grid' element={<DestinationGrid />} />

                    <Route path='brands/brand-form' element={<MasterBrandsForm masterBrandData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateMasterBrand={(undefined) => { }} />} />
                    <Route path='brands/brand-view' element={<MasterBrandsGrid />} />
                    <Route path='operations/operation-form' element={<OperationsForm operationData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateOperation={(undefined) => { }} />} />
                    <Route path='operations/operation-view' element={<OperationsGrid />} />

                    <Route path='paymentmethod/paymentmethod-form' element={<PaymentMethodForm paymentMethodData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />

                    <Route path='paymentmethod/paymentmethod-view' element={<PaymentMethodGrid />} />
                    <Route path='fabrics/fabrics-form' element={<FabricsForm fabricData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />

                    <Route path='fabrics/fabrics-view' element={<FabricsGrid />} />
                    <Route path='taxes/taxes-form' element={<TaxesForm taxesData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateTax={(undefined) => { }} />} />
                    <Route path='taxes/taxes-grid' element={<TaxesGrid />} />




                    <Route path='buyers/buyers-view' element={<BuyersView />} />
                    <Route path='buyers/buyers-form' key='/buyers/buyers-form' element={<BuyersForm buyersData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='vendors/vendors-form' key='/vendors/vendors-form' element={<VendorsForm vendorsData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='vendors/vendors-view' element={<VendorsView />} />
                    <Route path='employee-details/employee-details-form' element={<EmployeeDetsilsForm employeeData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='employee-details/employee-details-grid' element={<EmployeeDetailsGrid />} />
                    <Route path='operationgroups/operationgroups-form' key='/operationgroups/operationgroups-form' element={<OperationGroupForm operationGroupData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='operationgroups/operationgroups-view' element={<OperationGroupsGrid />} />
                    <Route path="items/items-form" key='/items/items-form' element={
                        <ItemsForm itemData={undefined}
                            isUpdate={false}
                            closeForm={() => { }}
                            updateItem={(undefined) => { }} />
                    } />
                    <Route path='garmentcategory/garmentcategory-form' key='garmentcategory/garmentcategory-form' element={< GarmentCategoryForm GarmentCategoryData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='garmentcategory/garmentcategory-view' element={<GarmentCategoryGrid />} />
                    <Route path="item-categories/item-categories-view" element={<ItemCategoriesGrid />} />
                    <Route path='item-sub-categories/item-sub-categories-form' element={<ItemSubCategoriesForm subCategoryData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateData={(undefined) => { }} />} />
                    <Route path='item-sub-categories/item-sub-categories-view' element={<ItemSubCategoriesGrid />} />
                    <Route path='garments/garments-view' element={<GarmentsGrid />} />
                    <Route path='garments/garments-form' element={<GarmentsForm
                        garmentData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateData={(undefined) => { }} />} />

                    <Route path='profit-control-head/profit-control-head-view' element={<ProfitControlHeadGrid />} />
                    <Route path='profit-control-head/profit-control-head-form' key='profit-control-head/profit-control-head-form' element={< ProfitControlHeadForm profitCenterData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path="components/components-view" element={<ComponentsGrid />} />
                    <Route path='components/components-form' element={<ComponentsForm
                        componentsData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateComponent={(undefined) => { }} />} />
                    <Route path="custom-groups/custom-groups-view" element={<CustomGroupsGrid />} />
                    <Route path='custom-groups/custom-groups-form' element={<CustomGroupsForm
                        data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateCustomGroups={(undefined) => { }} />} />
                    <Route path="rosl-groups/rosl-groups-view" element={<ROSLGroupsGrid />} />
                    <Route path='rosl-groups/rosl-groups-form' element={<ROSLGroupsForm
                        data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateROSLGroups={(undefined) => { }} />} />
                    <Route path="product/product-view" element={<ProductGrid />} />
                    <Route path='product/product-form' element={<ProductForm
                        data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateProduct={(undefined) => { }} />} />
                    <Route path="buying-house/buying-house-view" element={<BuyingHouseGrid />} />
                    <Route path='buying-house/buying-house-form' element={<BuyingHouseForm
                        data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateBuyingHouse={(undefined) => { }} />} />
                    <Route path="commission/commission-view" element={<CommissionGrid />} />
                    <Route path='commission/commission-form' element={<CommissionForm
                        data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateCommission={(undefined) => { }} />} />


                    <Route path='liscence-type/liscence-type-grid' element={<LiscenceTypesGrid />} />
                    <Route path='liscence-type/liscence-type-form' element={<LiscenceTypesForm liscenceData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateData={(undefined) => { }} />} />

                    <Route path='fabricType/fabric-type-view' element={<FabricTypeGrid />} />
                    <Route path='fabricType/fabric-type-form' key='fabricType/fabric-type-form' element={<FabricTypeForm fabricTypeData={undefined}

                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='fabric-sub-type-view/fabric-sub-type-view' element={<FabricSubTypeGrid />} />
                    <Route path='fabric-sub-type-form/fabric-sub-type-form' key='fabric-sub-type-form/fabric-sub-type-form' element={<FabricSubTypeForm fabricsubtypeData={undefined}

                        isUpdate={false}
                        closeForm={() => { }}
                        updateData={(undefined) => { }} />} />
                    <Route path='size/size-view' element={<SizeGrid />} />
                    <Route path='size/size-form' key='size/size-form' element={<SizeForm sizeData={undefined}

                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} closeModal={() => { }} mapBuyerDest={false} />} />
                    <Route path='colour/colour-view' element={<ColourGrid />} />
                    <Route path='colour/colour-form' key='colour/colour-form' element={<ColourForm colourData={undefined}

                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} closeModal={() => { }} mapBuyerDest={false} buyerId={undefined} /> } />

                    <Route path='department/department-view' element={<DepartmentGrid />} />
                    <Route path='department/department-form' key='department/department-form' element={<DepartmentForm DepartmentData={undefined}

                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='accountcontrolobjects/accountcontrolobjects-view' element={<AccountControlObjectGrid />} />
                    <Route path='accountcontrolobjects/accountcontrolobjects-form' key='accountcontrolobjects/accountcontrolobjects-form' element={<AccountControlObjectForm accountControlData={undefined}

                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} />} />

                    <Route path="fabric-weave/fabric-weave-form" element={<FabricWeaveForm
                        data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateFabricWeave={(undefined) => { }} />} />
                    <Route path="fabric-weave/fabric-weave-view" element={<FabricWeaveGrid />} />
                    <Route path='sampleTypes/sampleTypes-grid' element={<SampleTypesGrid />} />
                    <Route path='sampleTypes/sampleTypes-form' element={<SampleTypeForm sampleTypeData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} />} />
                    <Route path='sampleSubTypes/sampleSubTypes-grid' element={<SampleSubTypesGrid />} />
                    <Route path='sampleSubTypes/sampleSubTypes-form' element={<SampleSubTypesForm SampleSubTypesData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateSampleSubTypes={(undefined) => { }} />} />
                    <Route path='fabric-finish-type/fabric-finish-type-grid' element={<FabricFinishTypesGrid />} />
                    <Route path='fabric-structure/fabric-structure-form' element={<FabricStructuresForm FabriStructuresData={undefined} updateDetails={function (fabricStructureDto: FabricStructuresDTO): void {
                        throw new Error("Function not implemented.")
                    }} isUpdate={false} closeForm={function (): void {
                        throw new Error("Function not implemented.")
                    }} />} />
                    <Route path='fabric-structure/fabric-structure-grid' element={<FabricStructuresGrid />} />
                    <Route path='fabric-finish-type/fabric-finish-type-form' element={<FabricFinishTypesForm FabriFinishTypesData={undefined} updateDetails={function (fabricFinishTypeDto: FabricFinishTypesDTO): void {
                        throw new Error("Function not implemented.")
                    }} isUpdate={false} closeForm={function (): void {
                        throw new Error("Function not implemented.")
                    }} />} />
                    <Route path='column/column-form' element={<ColumnForm
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} columnData={undefined} />} />
                    <Route path='column/column-view' element={<ColumnView />} />
                 
                </Route>
                <Route path='/global'>
                    <Route path='buyers-destination/buyers-destination-form' element={<BuyersDestinationForm />} />
                    <Route path='buyers-destination/buyers-destination-grid' element={<BuyersDestinationGrid />} />

                    <Route path="attributes/attributes-view" element={<AttributesGrid />} />
                    <Route path='attributes/attributes-form' element={<AttributesForm
                        attributesData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateAttribute={(undefined) => { }} />} />
                    <Route path='factories/factories-view' element={<FactoriesView />} />
                    <Route path='factories/factories-form' element={<FactoriesForm factoryData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateFactory={(undefined) => { }} />} />
                    <Route path='currencies/currency-form' element={<CurrenciesForm currencyData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='currencies/currency-view' element={<CurrenciesGrid />} />
                    <Route path='company/company-form' element={<CompanyForm Data={undefined} updateItem={function (companyData: undefined): void {
                    }} isUpdate={false} closeForm={function (): void {

                    }} />} />
                    <Route path='company/company-grid' element={<CompanyGrid />} />
                    <Route path='company/division-grid' element={<DivisionGrid />} />
                    <Route path='warehouse/warehouse-form' element={<WarehouseForm Data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='warehouse/warehouse-grid' element={<WarehouseGrid />} />

                    <Route path='destination/destination-form' element={<DestinationForm Data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='destination/destination-grid' element={<DestinationGrid />} />
                    <Route path='paymentmethod/paymentmethod-form' element={<PaymentMethodForm paymentMethodData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />

                    <Route path='paymentmethod/paymentmethod-view' element={<PaymentMethodGrid />} />
                    <Route path='taxes/taxes-form' element={<TaxesForm taxesData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateTax={(undefined) => { }} />} />
                    <Route path='taxes/taxes-grid' element={<TaxesGrid />} />
                    <Route path='buyers/buyers-view' element={<BuyersView />} />
                    <Route path='buyers/buyers-form' key='/buyers/buyers-form' element={<BuyersForm buyersData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='vendors/vendors-form' key='/vendors/vendors-form' element={<VendorsForm vendorsData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='vendors/vendors-view' element={<VendorsView />} />
                    <Route path='employee-details/employee-details-form' element={<EmployeeDetsilsForm employeeData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='employee-details/employee-details-grid' element={<EmployeeDetailsGrid />} />
                    <Route path='delivery-methods/delivery-method-form' element={<DeliveryMethodForm deliveryMethodData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDeliveryMethod={(undefined) => { }} />} />
                    <Route path='delivery-methods/delivery-method-view' element={<DeliveryMethodGrid />} />
                    <Route path='payment-terms/payment-terms-form' element={<PaymentTermsForm paymentTermsData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='payment-terms/payment-terms-view' element={<PaymentTermsGrid />} />
                    <Route path='package-terms/package-terms-form' element={<PackageTermsForm packageTermsData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='package-terms/package-terms-view' element={<PackageTermsGrid />} />
                    <Route path='delivery-terms/delivery-terms-form' element={<DeliveryTermsForm deliverytermsData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} />} />
                    <Route path='locations/locations-view' element={<LocationsGrid />} />
                    <Route path='buyers/buyers-general-attributes-form' key='buyers/buyers-general-attributes-form' element={<BuyersGeneralAttributeForm />} />
                    <Route path='buyers/buyers-order-attributes-form' key='buyers/buyers-order-attributes-form' element={<BuyersOrderAttributeForm />} />

                    <Route path='locations/locations-form' element={<LocationsForm locationsData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} />} />
                    <Route path='delivery-terms/delivery-terms-view' element={<DeliveryTermsGrid />} />


                    <Route path='uom/uom-grid' element={<UomGrid />} />

                </Route>

                <Route  path='/trim-master'>
                <Route path='trim-params-mapping' element={<TrimParamsMapping mappingData={undefined} updateDetails={function (column: TrimParamsMappingRequestDto): void {
                        throw new Error("Function not implemented.")
                    } } isUpdate={false} closeForm={function (): void {
                        throw new Error("Function not implemented.")
                    } } />} />
                <Route path='/trim-master/trim-params-mapping-view' element={<TrimsParamsMappingView/>}/>
                    <Route path='variety/variety-form' element ={<VarietyForm varietyData={new VarietyDtos} updateItem={function (VarietyDto: VarietyDtos): void {
                        throw new Error("Function not implemented.")
                    } } isUpdate={false} closeForm={function (): void {
                        throw new Error("Function not implemented.")
                    } } />} />
                    <Route path='variety/variety-view' element ={<VarietyGrid />} />

                    <Route path='trim/trim-form' element ={<TrimForm TrimData={new TrimDtos} updateItem={function (Dto: TrimDtos): void {
                        throw new Error("Function not implemented.")
                    } } isUpdate={false} closeForm={function (): void {
                        throw new Error("Function not implemented.")
                    } } />} />
                    <Route path='trim/trim-view' element ={<TrimGrid />} />
                    <Route path='hole/hole-form' element={<HoleForm
                        isUpdate={false}
                        closeForm={() => { }}
                        updateHole={(undefined) => {}}
                        data={undefined} />} />
                    <Route path='hole/hole-view' element={<HoleGrid />}/>
                    <Route path='trim-uom/trim-uom-form' element={<TrimUomForm
                        isUpdate={false}
                        closeForm={() => { }}
                        updateTrimUom={(undefined) => {}}
                        data={undefined} />} />
                    <Route path='trim-uom/trim-uom-view' element={<TrimUomGrid />}/>

                    <Route path='function/function-form' element={<FunctionForm
                        isUpdate={false}
                        closeForm={() => { }}
                        updateFunction={(undefined) => {}}
                        data={undefined} />} />
                    <Route path='function/function-view' element={<FunctionGrid />}/>

                    <Route path='innerdia/innerdia-form' element={<InnerDiaForm
                        isUpdate={false}
                        closeForm={() => { }}
                        updateInnerDia={(undefined) => {}}
                        data={undefined} />} />
                    <Route path='innerdia/innerdia-view' element={<InnerDiaGrid />}/>

                    <Route path='gauge/gauge-form' element={<GaugeForm
                        isUpdate={false}
                        closeForm={() => { }}
                        updateGauge={(undefined) => {}}
                        data={undefined} />} />
                    <Route path='gauge/gauge-view' element={<GaugeGrid />}/>

                    <Route path='finish/finish-form' element={<FinishForm
                        isUpdate={false}
                        closeForm={() => { }}
                        updateFinish={(undefined) => { }} 
                        data={undefined} />} />
                    <Route path='finish/finish-view' element={<FinishGrid />} />
                    <Route path='content/content-form' element={<ContentForm Data={new ContentDtos} updateItem={function (Dto: ContentDtos): void {
                        throw new Error("Function not implemented.")
                    } } isUpdate={false} closeForm={function (): void {
                        throw new Error("Function not implemented.")
                    } } /> } />
                    <Route path='content/content-view' element={<ContentGrid />} />


                    <Route path="qualitys/qualitys-view" element={<QualityGrid />} />
                    <Route path='qualitys/qualitys-form' element={<QualitysForm qualitysData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                    updateItem={(undefined) => { }} />} />
                   <Route path="category/category-view" element={<CategoryView />} />
                    <Route path='category/category-form' element={<CategoryForm columnData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} />} />
                        <Route path="weight/weight-view" element={<WeightView />} />
                    <Route path='weight/weight-form' element={<WeightForm columnData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} />} />
                        <Route path="structure/structure-view" element={<StructureView />} />
                    <Route path='structure/structure-form' element={<StructureForm structureData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} />} />
   <Route path='thickness/thickness-form' element={<ThicknessForm
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} ThicknessData={undefined} />} />
                    <Route path='thickness/thickness-view' element={<ThicknessView />} />
                    <Route path='Type/Type-form' element={<TypeForm
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} TypeData={undefined} />} />
                    <Route path='Type/Type-view' element={<TypeView />} />                    
                    <Route path='m3-trim-items/m3-trim-items-form' element={<M3TrimItemsForm props={undefined}/>} />
                    <Route path='m3-trim-items/m3-trim-items-view' element={<M3TrimsView />} />

                    
                </Route>

                <Route path="style-management">
                    <Route path='style/style-form' key='/style/style-form' element={<StyleForm styleData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} />} />
                    <Route path='style/style-grid' element={<StyleGrid />} />
                    <Route path='component-mapping/component-mapping-form' element={<ComponentsMappingForm />} />
                    <Route path='component-mapping/component-mapping-view' element={<ComponentMappingView />} />

                </Route>
                <Route path='fabricdevelopment'>
                    <Route path='FabricDevelopmentrequest/Fabric-Development-Request' element={<FabricDevelopmentRequest />} />
                    <Route path='fabric-development-request/fabric-development-request-view' element={<FabricDevelopmentView />} />
                    <Route path='fabric-development-request-quality/fabric-development-request-quality-view' element={<QualityTabsView />} />

                </Route>
                {/* <Route path='settings'> */}
                <Route path='settings/settings-form' element={<SettingsForm />} />
                <Route path='settings/settings-view' element={<SettingsView />} />
                {/* </Route> */}
                <Route path = '/locations-QrCodes-print' element={<LocationQrCodePrint/>}/>
                <Route path = '/po-QrCodes-print' element={<PurchaseOrderQrCodePrint/>}/>
                <Route path='sample-development' >
                    <Route path="sample-development-form" element={<SampleDevForm />} />
                    {/* <Route path="sample-development-view" element={<SampleDevView />} /> */}
                    <Route path="sample-development-view" element={<SampleDevNewView />} />

                    <Route path="sample-development-detail" element={<SampleDevDetail />} />
                    {/* <Route path="sample-requests" element={<SampleRequests />} /> */}
                    <Route path="sample-requests" element={<SampleDevNewView />} />
                    <Route path="store-issue-detail" element={<StoreIssueDetailed />} />
                    <Route path="market-issue-detailview" element={<MarketIssueDetail />} />
                    <Route path="sample-inventory-grid" element={<SampleInventory />} />
                    <Route path='fabric-request-code-view' element={<FabricRequestCodeView/>}/>
                    <Route path='trim-request-code-view' element={<TrimReqCodeView/>}/>
                </Route>


                <Route path='store-issues'>
                    <Route path="store-issues-view" element={<SourceIssuesView />} />
                    <Route path="store-issues-detail-view" element={<SourceIssuesDetailView MaterialIssueID={0} />} />
                    {/* <Route path="material-issue-view" element={<MaterialIssueView />} /> */}
                    <Route path="material-issue-view" element={<AllocatedStockApproval screen={"Issued"} />} />
                    <Route path="stock-receive-approval" element={<StockReceivedApproval/>} />


                </Route>

                <Route path='/materialCreation'>
                    <Route path='sku-list' element={<SkuList />} />
                    <Route path='sku-mapping' element={<SKUGeneration />} />
                    <Route path='item-creation' element={<ItemCreation />} />
                    <Route path="fabric-bom-creation" element={<FabricBomCreation />} />
                    <Route path='bomtrimcreation/bom-trim-creation' element={<TrimsBomCreation />} />
                    <Route path='style-order-creation' element={<StyleOrderCreation />} />


                </Route>
                <Route path='/operation-tracking'>
                    <Route path='operation-tracking/issuing' element={<IssueScreen />} />
                    <Route path='operation-reporting' element={<SampleOperationReporting />} />
                    <Route path='operation-sequence' element={<OperationSequenceForm />} />
                    <Route path='inventory' element={<InventoryView />} />
                    <Route path='operation-inventory-view' element={<OperationInventoryView />} />
                    <Route path='operation-mapping' element={<OperationMapping />} />






                </Route>
                {/* <Route path='/report'> */}
                <Route path='material-issued-view' element={<MaterialIssuedView />} />
                <Route path='material-issued-detail-view' element={<MaterialIssuesDetailsView requestId={0} />} />

                <Route path='material-issue-report' element={<MaterialIssueReport />} />
                <Route path='indent-report' element={<IndentReport />} />
                <Route path='purchase-order-report' element={<PurchaseOrderReport />} />


                {/* </Route> */}
                <Route path='/stock-view' element={<StockView />} />
                <Route path='/rm-trims-view' element={<RmTrimsView />} />

                <Route path="/grn-pending-info-grid" element={<GrnPendingInfoGrid />} />
                <Route path="/location-mapping" element={<LocationMapping />} />

                <Route path="marketing-requisition-form" element={<MarketingReqForm
                    data={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateCustomGroups={(undefined) => { }} />} />
                <Route path="rosl-groups/rosl-groups-view" element={<ROSLGroupsGrid />} />
                <Route path='rosl-groups/rosl-groups-form' element={<ROSLGroupsForm
                    data={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateROSLGroups={(undefined) => { }} />} />
                <Route path="buying-house/buying-house-view" element={<BuyingHouseGrid />} />
                <Route path='buying-house/buying-house-form' element={<BuyingHouseForm
                    data={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateBuyingHouse={(undefined) => { }} />} />
                <Route path="commission/commission-view" element={<CommissionGrid />} />
                <Route path='commission/commission-form' element={<CommissionForm
                    data={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateCommission={(undefined) => { }} />} />


                <Route path='liscence-type/liscence-type-grid' element={<LiscenceTypesGrid />} />
                <Route path='liscence-type/liscence-type-form' element={<LiscenceTypesForm liscenceData={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateData={(undefined) => { }} />} />



                <Route path='fabricType/fabric-type-view' element={<FabricTypeGrid />} />
                <Route path='fabricType/fabric-type-form' key='fabricType/fabric-type-form' element={<FabricTypeForm fabricTypeData={undefined}

                    isUpdate={false}
                    closeForm={() => { }}
                    updateItem={(undefined) => { }} />} />
                <Route path='fabricSubType/fabric-sub-type-view' element={<FabricSubTypeGrid />} />
                <Route path='fabric-sub-type-form/fabric-sub-type-form' key='fabric-sub-type-form/fabric-sub-type-form' element={<FabricSubTypeForm fabricsubtypeData={undefined}

                    isUpdate={false}
                    closeForm={() => { }}
                    updateData={(undefined) => { }} />} />
                <Route path='size/size-view' element={<SizeGrid />} />
                <Route path='size/size-form' key='size/size-form' element={<SizeForm sizeData={undefined}

                    isUpdate={false}
                    closeForm={() => { }}
                    updateItem={(undefined) => { }} closeModal={() => { }} mapBuyerDest={false} />} />
                <Route path='colour/colour-view' element={<ColourGrid />} />
                <Route path='colour/colour-form' key='colour/colour-form' element={<ColourForm colourData={undefined}

                    isUpdate={false}
                    closeForm={() => { }}
                    updateItem={(undefined) => { }} closeModal={() => { }} mapBuyerDest={false} buyerId={undefined}/>} />

                <Route path='department/department-view' element={<DepartmentGrid />} />
                <Route path='department/department-form' key='department/department-form' element={<DepartmentForm DepartmentData={undefined}

                    isUpdate={false}
                    closeForm={() => { }}
                    updateItem={(undefined) => { }} />} />
                <Route path='accountcontrolobjects/accountcontrolobjects-view' element={<AccountControlObjectGrid />} />
                <Route path='accountcontrolobjects/accountcontrolobjects-form' key='accountcontrolobjects/accountcontrolobjects-form' element={<AccountControlObjectForm accountControlData={undefined}

                    isUpdate={false}
                    closeForm={() => { }}
                    updateDetails={(undefined) => { }} />} />

                <Route path="fabric-weave/fabric-weave-form" element={<FabricWeaveForm
                    data={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateFabricWeave={(undefined) => { }} />} />
                <Route path="fabric-weave/fabric-weave-view" element={<FabricWeaveGrid />} />
                <Route path='sampleTypes/sampleTypes-grid' element={<SampleTypesGrid />} />
                <Route path='sampleTypes/sampleTypes-form' element={<SampleTypeForm sampleTypeData={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateDetails={(undefined) => { }} />} />
                <Route path='sampleSubTypes/sampleSubTypes-grid' element={<SampleSubTypesGrid />} />
                <Route path='sampleSubTypes/sampleSubTypes-form' element={<SampleSubTypesForm SampleSubTypesData={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateSampleSubTypes={(undefined) => { }} />} />
                <Route path='fabric-finish-type/fabric-finish-type-grid' element={<FabricFinishTypesGrid />} />
                <Route path='fabric-structure/fabric-structure-form' element={<FabricStructuresForm FabriStructuresData={undefined} updateDetails={function (fabricStructureDto: FabricStructuresDTO): void {
                    throw new Error("Function not implemented.")
                }} isUpdate={false} closeForm={function (): void {
                    throw new Error("Function not implemented.")
                }} />} />
                <Route path='fabric-structure/fabric-structure-grid' element={<FabricStructuresGrid />} />
                <Route path='fabric-finish-type/fabric-finish-type-form' element={<FabricFinishTypesForm FabriFinishTypesData={undefined} updateDetails={function (fabricFinishTypeDto: FabricFinishTypesDTO): void {
                    throw new Error("Function not implemented.")
                }} isUpdate={false} closeForm={function (): void {
                    throw new Error("Function not implemented.")
                }} />} />
                <Route path='/global'>
                    <Route path='buyers-destination/buyers-destination-form' element={<BuyersDestinationForm />} />
                    <Route path='buyers-destination/buyers-destination-grid' element={<BuyersDestinationGrid />} />

                    <Route path="attributes/attributes-view" element={<AttributesGrid />} />
                    <Route path='attributes/attributes-form' element={<AttributesForm
                        attributesData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateAttribute={(undefined) => { }} />} />
                    <Route path='factories/factories-view' element={<FactoriesView />} />
                    <Route path='factories/factories-form' element={<FactoriesForm factoryData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateFactory={(undefined) => { }} />} />
                    <Route path='currencies/currency-form' element={<CurrenciesForm currencyData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='currencies/currency-view' element={<CurrenciesGrid />} />
                    <Route path='company/company-form' element={<CompanyForm Data={undefined} updateItem={function (companyData: undefined): void {
                    }} isUpdate={false} closeForm={function (): void {

                    }} />} />
                    <Route path='company/company-grid' element={<CompanyGrid />} />
                    <Route path='company/division-grid' element={<DivisionGrid />} />
                    <Route path='warehouse/warehouse-form' element={<WarehouseForm Data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='warehouse/warehouse-grid' element={<WarehouseGrid />} />

                    <Route path='destination/destination-form' element={<DestinationForm Data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='destination/destination-grid' element={<DestinationGrid />} />
                    <Route path='paymentmethod/paymentmethod-form' element={<PaymentMethodForm paymentMethodData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />

                    <Route path='paymentmethod/paymentmethod-view' element={<PaymentMethodGrid />} />
                    <Route path='taxes/taxes-form' element={<TaxesForm taxesData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateTax={(undefined) => { }} />} />
                    <Route path='taxes/taxes-grid' element={<TaxesGrid />} />
                    <Route path='buyers/buyers-view' element={<BuyersView />} />
                    <Route path='buyers/buyers-form' key='/buyers/buyers-form' element={<BuyersForm buyersData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='vendors/vendors-form' key='/vendors/vendors-form' element={<VendorsForm vendorsData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='vendors/vendors-view' element={<VendorsView />} />
                    <Route path='employee-details/employee-details-form' element={<EmployeeDetsilsForm employeeData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateItem={(undefined) => { }} />} />
                    <Route path='employee-details/employee-details-grid' element={<EmployeeDetailsGrid />} />
                    <Route path='delivery-methods/delivery-method-form' element={<DeliveryMethodForm deliveryMethodData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDeliveryMethod={(undefined) => { }} />} />
                    <Route path='delivery-methods/delivery-method-view' element={<DeliveryMethodGrid />} />
                    <Route path='payment-terms/payment-terms-form' element={<PaymentTermsForm paymentTermsData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='payment-terms/payment-terms-view' element={<PaymentTermsGrid />} />
                    <Route path='package-terms/package-terms-form' element={<PackageTermsForm packageTermsData={undefined} updateDetails={(undefined) => { }} isUpdate={false} closeForm={() => { }} />} />
                    <Route path='package-terms/package-terms-view' element={<PackageTermsGrid />} />
                    <Route path='delivery-terms/delivery-terms-form' element={<DeliveryTermsForm deliverytermsData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} />} />
                    <Route path='locations/locations-view' element={<LocationsGrid />} />
                    <Route path='buyers/buyers-general-attributes-form' key='buyers/buyers-general-attributes-form' element={<BuyersGeneralAttributeForm />} />
                    <Route path='buyers/buyers-order-attributes-form' key='buyers/buyers-order-attributes-form' element={<BuyersOrderAttributeForm />} />

                    <Route path='locations/locations-form' element={<LocationsForm locationsData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} />} />
                    <Route path='delivery-terms/delivery-terms-view' element={<DeliveryTermsGrid />} />


                    <Route path='uom/uom-grid' element={<UomGrid />} />

                </Route>

                <Route path="style-management">
                    <Route path='style/style-form' key='/style/style-form' element={<StyleForm styleData={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        updateDetails={(undefined) => { }} />} />
                    <Route path='style/style-grid' element={<StyleGrid />} />
                    <Route path='component-mapping/component-mapping-form' element={<ComponentsMappingForm />} />
                    <Route path='component-mapping/component-mapping-view' element={<ComponentMappingView />} />

                </Route>
                <Route path='fabricdevelopment'>
                    <Route path='FabricDevelopmentrequest/Fabric-Development-Request' element={<FabricDevelopmentRequest />} />
                    <Route path='fabric-development-request/fabric-development-request-view' element={<FabricDevelopmentView />} />
                    <Route path='fabric-development-request-quality/fabric-development-request-quality-view' element={<QualityTabsView />} />

                </Route>
                {/* <Route path='settings'> */}
                <Route path='settings/settings-form' element={<SettingsForm />} />
                <Route path='settings/settings-view' element={<SettingsView />} />
                {/* </Route> */}

                <Route path='sample-development' >
                    <Route path="sample-development-form" element={<SampleDevForm />} />
                    <Route path="sample-development-view" element={<SampleDevView />} />
                    <Route path="sample-development-detail" element={<SampleDevDetail />} />
                    {/* <Route path="sample-requests" element={<SampleRequests />} /> */}
                    <Route path="store-issue-detail" element={<StoreIssueDetailed />} />
                    <Route path="market-issue-detailview" element={<MarketIssueDetail />} />
                    <Route path="sample-inventory-grid" element={<SampleInventory />} />
                    <Route path="material-allocation" element={<MaterialAllocationGrid />} />
                    <Route path="material-allocation-view" element={<MaterialAllocationView />} />
                    <Route path="material-allocation-detail-view" element={<MaterialAllocationDetailView />} />
                    <Route path='allocation-approval' element={<AllocatedStockApproval screen={"Allocated"}/>} />

                </Route>


                <Route path='store-issues'>
                    <Route path="store-issues-view" element={<SourceIssuesView />} />
                    <Route path="store-issues-detail-view" element={<SourceIssuesDetailView MaterialIssueID={0} />} />
                    <Route path="material-issue-view" element={<MaterialIssueView />} />
                </Route>

                <Route path='/materialCreation'>
                    <Route path='sku-list' element={<SkuList />} />
                    <Route path='sku-mapping' element={<SKUGeneration />} />
                    <Route path='item-creation' element={<ItemCreation />} />
                    <Route path="fabric-bom-creation" element={<FabricBomCreation />} />
                    <Route path='bomtrimcreation/bom-trim-creation' element={<TrimsBomCreation />} />
                    <Route path='style-order-creation' element={<StyleOrderCreation />} />


            </Route>
            <Route path='/operation-tracking'>
                <Route path='operation-tracking/issuing' element={<IssueScreen />} />
                {/* <Route path='operation-reporting' element={<OperationReportingView />} /> */}
                <Route path='operation-reporting' element={<SampleOperationReporting />} />
                <Route path='operation-sequence' element={<OperationSequenceForm />} />
                <Route path='inventory' element={<InventoryView />} />
                </Route>
                <Route path='/operation-tracking'>
                    <Route path='operation-tracking/issuing' element={<IssueScreen />} />
                    <Route path='operation-reporting' element={<OperationReportingView />} />
                    <Route path='operation-sequence' element={<OperationSequenceForm />} />
                    <Route path='inventory' element={<InventoryView />} />



                </Route>
                <Route path='/report'>
                    <Route path='material-issue-report' element={<MaterialIssueReport />} />
                    <Route path='indent-report' element={<IndentReport />} />
                    <Route path='grn-report' element={<GrnReport />} />

                    <Route path='bom-view' element={<BomIndentView />} />


                </Route>
                <Route path='/stock-view' element={<StockView />} />
                <Route path='/reclassification-approval-grid' element={<ReclassificationApprovalGrid />} />

                <Route path="/grn-pending-info-grid" element={<GrnPendingInfoGrid />} />
                <Route path="/location-mapping" element={<LocationMapping />} />

                <Route path="marketing-requisition-form" element={<MarketingReqForm
                    data={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    update={(undefined) => { }}
                />} />
                <Route path='marketing-requisition-view' element={<MarketingReqGrid />} />
                <Route path='marketing-requisition-report' element={<MarketingReqReport />} />
                <Route path='/sourcing-requisition' element={<SourcingRequisitionForm />} />
                <Route path='/sourcing-requisition-view' element={<SourcingRequisitionView />} />
                <Route path='/sourcing-requisition-report' element={<SourcingRequisitionReport />} />
                <Route path='/indent-form' element={<SourcingRequisitionDynamicForm />} />
                <Route path='/requisition-view' element={<SourcingRequisitionDynamicView />} />
                <Route path='/purchase-order' element={<PurchaseOrderForm />} />
                <Route path="marketing-requisition-form"
                    element={<MarketingReqForm
                        data={undefined}
                        isUpdate={false}
                        closeForm={() => { }}
                        update={(undefined) => { }}
                    />} />
                <Route path='marketing-requisition-view' element={<MarketingReqGrid />} />
                <Route path='marketing-requisition-report' element={<MarketingReqReport />} />
                <Route path='/sourcing-requisition' element={<SourcingRequisitionForm />} />
                <Route path='/sourcing-requisition-view' element={<SourcingRequisitionView />} />
                <Route path='/sourcing-requisition-report' element={<SourcingRequisitionReport />} />
                <Route path='/indent-form' element={<SourcingRequisitionDynamicForm />} />
                <Route path='/requisition-view' element={<SourcingRequisitionDynamicView />} />
                <Route path='/purchase-order' element={<PurchaseOrderForm />} />
                <Route path='/purchase-view' element={<PurchaseOrderView />} />
                <Route path='/purchase-detali-view' element={<PurchaseOrderDetailsView purchaseOrderId={undefined} />} />
                <Route path='/grn-form' element={<GRNForm />} />
                <Route path='/grn-view' element={<GRNView />} />
                <Route path='/grn-detail-view' element={<GRNDetailView />} />
                <Route path='/sample-req-detail-view' element={<SampleReqDetailView/>} />
                <Route path='/receive-sample-orders' element={<ReceiveSampleOrders/>} />
                <Route path='/excel-import'>
                    <Route path='excel-import' element={<ExcelImport />} />
                    <Route path='changes-view' element={<ChangesGrid />} />
                    <Route path='grid-view' element={<AllOrdersGridView />} />
                    <Route path='revert-orders' element={<FileRevert />} />
                    <Route path='version-grid' element={<VersionChanges />} />
                    


                    {/* <Route path='phase-wise-grid' element={<PhaseWiseData />} /> */}

                </Route>
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
                {/* </Route> */}
                <Route path="/login" element={<Login />} />
            </Route>

        </Routes >
    );
};