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
import MasterBrandsForm from "./masters/master-brands/master-brands-form"
import MasterBrandsGrid from "./masters/master-brands/master.brands-gridt"
import OperationsForm from "./masters/operations/operations-form"
import OperationsGrid from "./masters/operations/operations-gridt"
import BuyersForm from "./masters/buyers/buyers-form"
import BuyersView from "./masters/buyers/buyers-view"
import VendorsForm from "./masters/vendors/vendors-form"
import VendorsView from "./masters/vendors/vendors-view"
import EmployeeDetsilsForm from "./masters/employee-details/employee-details-form"
import EmployeeDetailsGrid from "./masters/employee-details/employee-details-grid"
import OperationGroupForm from "./masters/operation-groups/operation-groups-form"
import OperationGroupsGrid from "./masters/operation-groups/operation-group-view"
import ItemsForm from "./masters/items/items-form"
import GarmentsForm from "./masters/garments/garments-form"
import GarmentsView from "./masters/garments/garments-view"
import DeliveryMethodForm from "./masters/delivery-methods/delivery-method-form"
import DeliveryMethodGrid from "./masters/delivery-methods/delivery-method-grid"
import ItemCategoriesGrid from "./masters/item-categories/item-categories-grid"
import ItemSubCategoriesGrid from "./masters/item-sub-categories/item-sub-categories-grid"
import ItemSubCategoriesForm from "./masters/item-sub-categories/item-sub-categories-form"
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
                    <Route path='factories/factories-form' key='/factories/factories-form' element={<FactoriesForm />} />
                    <Route path='currencies/currency-form' key='/currencies/currency-form' element={<CurrenciesForm currencyData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => {}}/>} />
                       <Route path='brands/brand-form' key='/brands/brand-form' element={<MasterBrandsForm masterBrandData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateMasterBrand={(undefined) => { }}/>} />
                  <Route path='operations/operation-form' key='/operations/operation-form' element={<OperationsForm operationData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateOperation={(undefined) => {}}/>} />
                <Route path='buyers/buyers-view' element={<BuyersView />} />
                <Route path='buyers/buyers-form' key='/buyers/buyers-form' element={<BuyersForm buyersData={undefined} updateDetails={(undefined) => {}} isUpdate={false} closeForm={() => {}}/>} />
                <Route path='vendors/vendors-form' key='/vendors/vendors-form' element={<VendorsForm vendorsData={undefined} updateDetails={(undefined) => {}} isUpdate={false} closeForm={() => {}}/>} />
                <Route path='vendors/vendors-view' element={<VendorsView />} />

                  <Route path="employee-details/employee-details-form" key='/employee-details/employee-details-form' element= {
                    <EmployeeDetsilsForm employeeData={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateItem={(undefined) => { }}/>
                } />
                <Route path='employee-details/employee-details-grid' element={<EmployeeDetailsGrid />} />
                <Route path="items/items-form" key='/items/items-form' element= {
                    <ItemsForm itemData={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateItem={(undefined) => { }}/>
                } />
                <Route path='items/item-grid' element={<ItemsGrid />} />

                </Route>
                <Route path="style-management">
                    <Route path='style/style-form' key='/style/style-form' element={<StyleForm styleData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateDetails={(undefined) => { }}/>} />
                        <Route path='style/style-grid' element={<StyleGrid />} />

                </Route>
              
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
                        <Route path='currencies/currency-form' element={<CurrenciesForm currencyData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />
                <Route path='items/item-grid' element={<ItemsGrid />} />
                        <Route path='currencies/currency-view' element={<CurrenciesGrid />} />
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
                <Route path='garments/garments-view' element={<GarmentsView />} />
                 <Route path="garments/garments-form" key='garments/garments-form' element= {
                    <GarmentsForm garmentData={undefined}
                    isUpdate={false}
                    closeForm={() => { }}
                    updateItem={(undefined) => { }}/>
                } />
                        <Route path='delivery-methods/delivery-method-form' element={<DeliveryMethodForm deliveryMethodData={undefined}
                        isUpdate={false}
                        closeForm={()=> {}}
                        updateDeliveryMethod={(undefined) => { }}/>}/>
                        <Route path='delivery-methods/delivery-method-view' element={<DeliveryMethodGrid/>}/>
                        <Route path="item-categories/item-categories-view" element = {<ItemCategoriesGrid/>}/>
                        <Route path='item-sub-categories/item-sub-categories-form' element={<ItemSubCategoriesForm subCategoryData={undefined}
                        isUpdate={false}
                        closeForm={()=> {}}
                        updateData={(undefined) => { }}/>}/>
                        <Route path='item-sub-categories/item-sub-categories-view' element={<ItemSubCategoriesGrid/>}/>
                        <Route path='payment-terms/payment-terms-form' element={<PaymentTermsForm paymentTermsData={undefined} updateDetails={(undefined) => { }} isUpdate={false}  closeForm={() => { }} />} />
                        <Route path='payment-terms/payment-terms-view' element={<PaymentTermsGrid />} />
                        <Route path='package-terms/package-terms-form' element={<PackageTermsForm  packageTermsData={undefined} updateDetails={(undefined) => { }} isUpdate={false}  closeForm={() => { }}/>} />
                        <Route path='package-terms/package-terms-view' element={<PackageTermsGrid/>} />
                        


                        <Route path='delivery-terms/delivery-terms-form' element={<DeliveryTermsForm deliverytermsData={undefined}
                        isUpdate={false}
                        closeForm={()=> {}}
                        updateDetails={(undefined) => { }}/>}/>
                        <Route path='delivery-terms/delivery-terms-view' element={<DeliveryTermsGrid/>}/>
                    </Route>

                    <Route path="style-management">
                    <Route path='style/style-form' key='/style/style-form' element={<StyleForm styleData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateDetails={(undefined) => { }}/>} />
                        <Route path='style/style-grid' element={<StyleGrid />} />

                </Route>

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