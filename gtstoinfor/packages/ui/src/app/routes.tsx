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
import { Dashboard } from "./common/dashboards/dashboard"
import { FileRevert } from "./excel-import/file-revert"
import VersionChanges from "./excel-import/version-wise-table"
import CurrenciesForm from "./masters/currencies/currency-form"
import CurrenciesGrid from "./masters/currencies/currencies-grid"
import CompanyForm from "./masters/company/company-form"
import CompanyGrid from "./masters/company/company-grid"
import { CurrencyDto, FabricFinishTypesDTO, FabricStructuresDTO, FabricSubTypeDto } from "@project-management-system/shared-models"
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
import SampleRequestView, { SampleDevView } from "./sample-development/sample-management-view"
import SampleDevForm from "./sample-development/sample-management-form"
import FabricsGrid from "./masters/fabrics/fabrics-view"
import { FabricsForm } from "./masters/fabrics/fabrics-form"
import SettingsView from "./masters/settings/settings-view"
import TrimsBomCreation from "./BOM/trims-bom-creation"
import SkuList from "./orders/sku-list"
import SKUGeneration from "./orders/sku-generation"
import UomGrid from "./masters/uom/uom-grid"
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
import StoreIssue, { SampleRequests } from "./sample-development/source-issue"
import StoreIssueDetailed, { SourceIssueDetailed } from "./sample-development/source-issue-detailed-view"


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
              
                <Route path='/excel-import' key='/excel-import'>
                    <Route path='excel-import' key='/excel-import' element={<ExcelImport />} />
                    <Route path='changes-view' key='/changes-view' element={<ChangesGrid />} />
                    <Route path='grid-view' key='/grid-view' element={<AllOrdersGridView />} />
                    <Route path='revert-orders' key='/revert-orders' element={<FileRevert />} />
                    <Route path='version-grid' key='/version-grid' element={<VersionChanges />} />
                    {/* <Route path='phase-wise-grid' key='/phase-wise-grid' element={<PhaseWiseData />} /> */}
                </Route>
                <Route path='/dashboard' key='/dashboard' element={<Dashboard />} />
                <Route path='/403' key='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
            </Route>
            <Route path="/login" key='/login' element={<Login />} />
        </Route>
    ))

    return (
        <Router>
            <Routes>
                <Route path='/' element={
                    <ChildProtectionWrapper>
                        <>
                            <BasicLayout />
                        </>
                    </ChildProtectionWrapper>
                } >
                    <Route path='/user-management/users-from' element={<UserCreationForm />} />
                    <Route path='/user-management/users-view' element={<UsersView />} />

                    <Route path='/masters'>
                        <Route path='factories/factories-view' element={<FactoriesView />} />
                        <Route path='factories/factories-form' element={<FactoriesForm />} />
                        <Route path='items/item-grid' element={<ItemsGrid />} />

                        <Route path='currencies/currency-form' element={<CurrenciesForm currencyData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />
                
                        <Route path='currencies/currency-view' element={<CurrenciesGrid />} />
                        <Route path='company/company-form' element={<CompanyForm Data={undefined} updateItem={function (companyData:undefined ): void {
                        } } isUpdate={false} closeForm={function (): void {
                            
                        } } />} />
                        <Route path='company/company-grid' element={<CompanyGrid />} />
                        <Route path='company/division-grid' element={<DivisionGrid />} />
                        <Route path='warehouse/warehouse-form' element={<WarehouseForm Data={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />
                        <Route path='warehouse/warehouse-grid' element={<WarehouseGrid />} />

                        <Route path='destination/destination-form' element={<DestinationForm Data={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />
                        <Route path='destination/destination-grid' element={<DestinationGrid />} />

                        <Route path='brands/brand-form' element={<MasterBrandsForm masterBrandData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateMasterBrand={(undefined) => { }}/>} />
                        <Route path='brands/brand-view' element={<MasterBrandsGrid />} />
                        <Route path='operations/operation-form' element={<OperationsForm operationData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateOperation={(undefined) => { }}/>} />
                        <Route path='operations/operation-view' element={<OperationsGrid />} />

                    <Route path='paymentmethod/paymentmethod-form' element={<PaymentMethodForm paymentMethodData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />

                 <Route path='paymentmethod/paymentmethod-view' element={<PaymentMethodGrid/>} />
                 <Route path='fabrics/fabrics-form' element={<FabricsForm fabricData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />

                 <Route path='fabrics/fabrics-view' element={<FabricsGrid/>} />
                  <Route path='taxes/taxes-form' element={<TaxesForm taxesData={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateTax={(undefined) => { }}/>} />
                    <Route path='taxes/taxes-grid' element={<TaxesGrid />} />


                    

                        <Route path='buyers/buyers-view' element={<BuyersView />} />
                        <Route path='buyers/buyers-form' key='/buyers/buyers-form' element={<BuyersForm buyersData={undefined} updateDetails={(undefined) => {}} isUpdate={false} closeForm={() => {}}/>} />
                        <Route path='vendors/vendors-form' key='/vendors/vendors-form' element={<VendorsForm vendorsData={undefined} updateDetails={(undefined) => {}} isUpdate={false} closeForm={() => {}}/>} />
                        <Route path='vendors/vendors-view' element={<VendorsView />} />
                        <Route path='employee-details/employee-details-form' element={<EmployeeDetsilsForm employeeData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />
                    <Route path='employee-details/employee-details-grid' element={<EmployeeDetailsGrid />} />
                    <Route path='operationgroups/operationgroups-form' key='/operationgroups/operationgroups-form' element={<OperationGroupForm operationGroupData={undefined} updateDetails={(undefined) => {}} isUpdate={false} closeForm={() => {}}/>} />
                    <Route path='operationgroups/operationgroups-view' element={<OperationGroupsGrid />} />
                    <Route path="items/items-form" key='/items/items-form' element= {
                    <ItemsForm itemData={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateItem={(undefined) => { }}/>
                    } />
                    <Route path='garmentcategory/garmentcategory-form' key ='garmentcategory/garmentcategory-form' element={< GarmentCategoryForm GarmentCategoryData={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateItem={(undefined) => { }}/>} />
                    <Route path='garmentcategory/garmentcategory-view' element={<GarmentCategoryGrid/>} />
                    <Route path="item-categories/item-categories-view" element = {<ItemCategoriesGrid/>}/>
                    <Route path='item-sub-categories/item-sub-categories-form' element={<ItemSubCategoriesForm subCategoryData={undefined}
                    isUpdate={false}
                    closeForm={()=> {}}
                    updateData={(undefined) => { }}/>}/>
                    <Route path='item-sub-categories/item-sub-categories-view' element={<ItemSubCategoriesGrid/>}/>
                    <Route path='garments/garments-view' element={<GarmentsGrid/>}/>
                    <Route path='garments/garments-form' element={<GarmentsForm 
                    garmentData={undefined}
                    isUpdate={false}
                    closeForm={()=>{}}
                    updateData={(undefined)=>{}}/>}/>

                    <Route path='profit-control-head/profit-control-head-view' element={<ProfitControlHeadGrid/>} />
                    <Route path='profit-control-head/profit-control-head-form' key ='profit-control-head/profit-control-head-form' element={< ProfitControlHeadForm profitCenterData={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateItem={(undefined) => { }}/>} />
                    <Route path="components/components-view" element ={<ComponentsGrid/>}/>
                    <Route path='components/components-form' element={<ComponentsForm
                    componentsData={undefined}
                    isUpdate={false}
                    closeForm={()=>{}}
                    updateComponent={(undefined)=>{}}/>}/>
                    <Route path="custom-groups/custom-groups-view" element ={<CustomGroupsGrid/>}/>
                    <Route path='custom-groups/custom-groups-form' element={<CustomGroupsForm
                    data={undefined}
                    isUpdate={false}
                    closeForm={()=>{}}
                    updateCustomGroups={(undefined)=>{}}/>}/>
                    <Route path="rosl-groups/rosl-groups-view" element ={<ROSLGroupsGrid/>}/>
                    <Route path='rosl-groups/rosl-groups-form' element={<ROSLGroupsForm
                    data={undefined}
                    isUpdate={false}
                    closeForm={()=>{}}
                    updateROSLGroups={(undefined)=>{}}/>}/>
                    <Route path="buying-house/buying-house-view" element ={<BuyingHouseGrid/>}/>
                    <Route path='buying-house/buying-house-form' element={<BuyingHouseForm
                    data={undefined}
                    isUpdate={false}
                    closeForm={()=>{}}
                    updateBuyingHouse={(undefined)=>{}}/>}/>
                    <Route path="commission/commission-view" element ={<CommissionGrid/>}/>
                    <Route path='commission/commission-form' element={<CommissionForm
                    data={undefined}
                    isUpdate={false}
                    closeForm={()=>{}}
                    updateCommission={(undefined)=>{}}/>}/>


                    <Route path='liscence-type/liscence-type-grid' element={<LiscenceTypesGrid/>}/>
                    <Route path='liscence-type/liscence-type-form' element={<LiscenceTypesForm liscenceData={undefined}
                    isUpdate={false}
                    closeForm={()=> {}}
                    updateData={(undefined) => { }}/>}/>

                    <Route path='fabricType/fabric-type-view' element={<FabricTypeGrid/>} />
                    <Route path='fabricType/fabric-type-form' key ='fabricType/fabric-type-form' element={<FabricTypeForm  fabricTypeData={undefined}

                    isUpdate={false}
                    closeForm={() => { }}
                    updateItem={(undefined) => { }}/>} />
                    <Route path='fabricSubType/fabric-sub-type-view' element={<FabricSubTypeGrid/>} />
                    <Route path='fabric-sub-type/fabric-sub-type-form' key ='fabric-sub-type/fabric-sub-type-form' element={<FabricSubTypeForm  fabricsubtypeData={undefined}

                    isUpdate={false}
                    closeForm={() => { }}
                    updateData={(undefined) => { }}/>} />
                    <Route path='size/size-view' element={<SizeGrid/>} />
                    <Route path='size/size-form' key ='size/size-form' element={<SizeForm  sizeData={undefined}

                    isUpdate={false}
                    closeForm={() => { }}
                    updateItem={(undefined) => { }}/>} />
                   <Route path='colour/colour-view' element={<ColourGrid/>} />
                         <Route path='colour/colour-form' key ='colour/colour-form' element={<ColourForm  colourData={undefined}

                 isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />
                
                  <Route path='department/department-view' element={<DepartmentGrid/>} />
                         <Route path='department/department-form' key ='department/department-form' element={<DepartmentForm  DepartmentData={undefined}

                 isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />
                 <Route path='accountcontrolobjects/accountcontrolobjects-view' element={<AccountControlObjectGrid/>} />
                         <Route path='accountcontrolobjects/accountcontrolobjects-form' key ='accountcontrolobjects/accountcontrolobjects-form' element={<AccountControlObjectForm  accountControlData={undefined}

                 isUpdate={false}
                closeForm={() => { }}
                updateDetails={(undefined) => { }}/>} />

                <Route path="fabric-weave/fabric-weave-form" element={<FabricWeaveForm
                data={undefined}
                isUpdate={false}
                closeForm={()=>{}}
                updateFabricWeave={(undefined)=>{}}/>}/>
                <Route path="fabric-weave/fabric-weave-view" element={<FabricWeaveGrid/>}/>

            </Route>
                    <Route path='/global'>
                    <Route path='buyers-destination/buyers-destination-form' element={<BuyersDestinationForm />} />
                        <Route path='buyers-destination/buyers-destination-grid' element={<BuyersDestinationGrid/>}/>

                    <Route path="attributes/attributes-view" element ={<AttributesGrid/>}/>
                    <Route path='attributes/attributes-form' element={<AttributesForm
                    attributesData={undefined}
                    isUpdate={false}
                    closeForm={()=>{}}
                    updateAttribute={(undefined)=>{}}/>}/>
                    <Route path='factories/factories-view' element={<FactoriesView />} />
                        <Route path='factories/factories-form' element={<FactoriesForm />} />
                        <Route path='currencies/currency-form' element={<CurrenciesForm currencyData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />
                        <Route path='currencies/currency-view' element={<CurrenciesGrid />} />
                        <Route path='company/company-form' element={<CompanyForm Data={undefined} updateItem={function (companyData:undefined ): void {
                        } } isUpdate={false} closeForm={function (): void {
                            
                        } } />} />
                        <Route path='company/company-grid' element={<CompanyGrid />} />
                        <Route path='company/division-grid' element={<DivisionGrid />} />
                        <Route path='warehouse/warehouse-form' element={<WarehouseForm Data={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />
                        <Route path='warehouse/warehouse-grid' element={<WarehouseGrid />} />

                        <Route path='destination/destination-form' element={<DestinationForm Data={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />
                        <Route path='destination/destination-grid' element={<DestinationGrid />} />
                        <Route path='paymentmethod/paymentmethod-form' element={<PaymentMethodForm paymentMethodData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />

                 <Route path='paymentmethod/paymentmethod-view' element={<PaymentMethodGrid/>} />
                 <Route path='taxes/taxes-form' element={<TaxesForm taxesData={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateTax={(undefined) => { }}/>} />
                    <Route path='taxes/taxes-grid' element={<TaxesGrid />} />
                    <Route path='buyers/buyers-view' element={<BuyersView />} />
                        <Route path='buyers/buyers-form' key='/buyers/buyers-form' element={<BuyersForm buyersData={undefined} updateDetails={(undefined) => {}} isUpdate={false} closeForm={() => {}}/>} />
                        <Route path='vendors/vendors-form' key='/vendors/vendors-form' element={<VendorsForm vendorsData={undefined} updateDetails={(undefined) => {}} isUpdate={false} closeForm={() => {}}/>} />
                        <Route path='vendors/vendors-view' element={<VendorsView />} />
                        <Route path='employee-details/employee-details-form' element={<EmployeeDetsilsForm employeeData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />
                    <Route path='employee-details/employee-details-grid' element={<EmployeeDetailsGrid />} />
                    <Route path='delivery-methods/delivery-method-form' element={<DeliveryMethodForm deliveryMethodData={undefined}
                        isUpdate={false}
                        closeForm={()=> {}}
                        updateDeliveryMethod={(undefined) => { }}/>}/>
                        <Route path='delivery-methods/delivery-method-view' element={<DeliveryMethodGrid/>}/>
                        <Route path='payment-terms/payment-terms-form' element={<PaymentTermsForm paymentTermsData={undefined} updateDetails={(undefined) => { }} isUpdate={false}  closeForm={() => { }} />} />
                        <Route path='payment-terms/payment-terms-view' element={<PaymentTermsGrid />} />
                        <Route path='package-terms/package-terms-form' element={<PackageTermsForm  packageTermsData={undefined} updateDetails={(undefined) => { }} isUpdate={false}  closeForm={() => { }}/>} />
                        <Route path='package-terms/package-terms-view' element={<PackageTermsGrid/>} />
                        <Route path='delivery-terms/delivery-terms-form' element={<DeliveryTermsForm deliverytermsData={undefined}
                        isUpdate={false}
                        closeForm={()=> {}}
                        updateDetails={(undefined) => { }}/>}/>
                <Route path='locations/locations-view' element={<LocationsGrid/>}/>
                         <Route path='sampleTypes/sampleTypes-grid' element={<SampleTypesGrid/>}/>
                        <Route path='sampleTypes/sampleTypes-form' element={<SampleTypeForm sampleTypeData={undefined}
                        isUpdate={false}
                        closeForm={()=> {}}
                        updateDetails={(undefined) => { }}/>}/>
                            <Route path='sampleSubTypes/sampleSubTypes-grid' element={<SampleSubTypesGrid/>}/>
                        <Route path='sampleSubTypes/sampleSubTypes-form' element={<SampleSubTypesForm SampleSubTypesData={undefined}
                        isUpdate={false}
                        closeForm={()=> {}}
                        updateSampleSubTypes={(undefined) => { }}/>}/>                         
               <Route path='buyers/buyers-general-attributes-form' key='buyers/buyers-general-attributes-form' element={<BuyersGeneralAttributeForm/>} />
                        <Route path='buyers/buyers-order-attributes-form' key='buyers/buyers-order-attributes-form' element={<BuyersOrderAttributeForm/>} />

                        <Route path='locations/locations-form' element={<LocationsForm locationsData={undefined}
                        isUpdate={false}
                        closeForm={()=> {}}
                        updateDetails={(undefined) => { }}/>}/>
               <Route path='delivery-terms/delivery-terms-view' element={<DeliveryTermsGrid/>}/>
                        <Route path='fabric-structure/fabric-structure-form'element={<FabricStructuresForm FabriStructuresData={undefined} updateDetails={function (fabricStructureDto: FabricStructuresDTO): void {
                            throw new Error("Function not implemented.")
                        } } isUpdate={false} closeForm={function (): void {
                            throw new Error("Function not implemented.")
                        } }/>}/>
                        <Route path='fabric-structure/fabric-structure-grid' element={<FabricStructuresGrid />}/>
                        <Route path='fabric-finish-type/fabric-finish-type-form'element={<FabricFinishTypesForm FabriFinishTypesData={undefined} updateDetails={function (fabricFinishTypeDto: FabricFinishTypesDTO): void {
                            throw new Error("Function not implemented.")
                        } } isUpdate={false} closeForm={function (): void {
                            throw new Error("Function not implemented.")
                        } }/>}/>
                        <Route path='fabric-finish-type/fabric-finish-type-grid' element={<FabricFinishTypesGrid />}/>
                        <Route path='uom/uom-grid' element={<UomGrid />}/>
                                              
                 </Route>

                    <Route path="style-management">
                    <Route path='style/style-form' key='/style/style-form' element={<StyleForm styleData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateDetails={(undefined) => { }}/>} />
                        <Route path='style/style-grid' element={<StyleGrid />} />
                        <Route path='component-mapping/component-mapping-form' element={<ComponentsMappingForm />} />
                        <Route path='component-mapping/component-mapping-view' element={<ComponentMappingView/>}/>
                                               
                        </Route>
                <Route path='fabricdevelopment'>
                <Route path='FabricDevelopmentrequest/Fabric-Development-Request' element={<FabricDevelopmentRequest/>}/>

                </Route>
                <Route path='settings'>
                <Route path='settings/settings-form' element={<SettingsForm/>}/>
                <Route path='settings/settings-view' element={<SettingsView/>}/>
                </Route>

                <Route path='sample-development' >
                    <Route path="sample-development-form" element={<SampleDevForm />}/>
                    <Route path="sample-development-view" element={<SampleDevView />}/>
                    <Route path="sample-development-detail" element={<SampleDevDetail />}/>
                    <Route path="sample-requests" element={<SampleRequests/>}/>
                    <Route path="source-issue-detail" element={<SourceIssueDetailed/>}/>
                </Route>
                <Route path='/materialCreation'>
                <Route path='sku-list' element={<SkuList/>}/>
                <Route path='sku-mapping' element={<SKUGeneration/>}/>
                <Route path='item-creation' element={<ItemCreation/>}/>
                <Route path="fabric-bom-creation" element={<FabricBomCreation/>}/>
                <Route path='bomtrimcreation/bom-trim-creation' element={<TrimsBomCreation/>} />
                <Route path='operation-sequence' element={<OperationSequenceForm/>} />
                <Route path='operation-reporting' element={<OperationReportingView/>} />

                


                </Route>
                <Route path="marketing-requisition-form" element={<MarketingReqForm 
                data={undefined}
                isUpdate={false}
                closeForm={() => { }}
                update={(undefined) => { }}
                />}/>
                <Route path='marketing-requisition-view' element={<MarketingReqGrid/>} />
                <Route path='marketing-requisition-report' element={<MarketingReqReport/>} />
                    <Route path='/sourcing-requisition' element={<SourcingRequisitionForm/>}/>
                    <Route path='/sourcing-requisition-view' element={<SourcingRequisitionView/>}/>
                    <Route path='/sourcing-requisition-report' element={<SourcingRequisitionReport/>}/>
                    <Route path='/sourcing-requisition-form' element={<SourcingRequisitionDynamicForm/>}/>
                    <Route path='/sourcing-requisition-dynamic-view' element={<SourcingRequisitionDynamicView/>}/>




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
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}