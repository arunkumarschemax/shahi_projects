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
import BuyersForm from "./masters/buyers/buyers-form"
import BuyersView from "./masters/buyers/buyers-view"
import VendorsForm from "./masters/vendors/vendors-form"
import VendorsView from "./masters/vendors/vendors-view"
import EmployeeDetsilsForm from "./masters/employee-details/employee-details-form"
import EmployeeDetailsGrid from "./masters/employee-details/employee-details-grid"
import ItemsForm from "./masters/items/items-form"
import DeliveryMethodForm from "./masters/delivery-methods/delivery-method-form"
import DeliveryMethodGrid from "./masters/delivery-methods/delivery-method-grid"
import ItemCategoriesGrid from "./masters/item-categories/item-categories-grid"
import ItemSubCategoriesGrid from "./masters/item-sub-categories/item-sub-categories-grid"
import ItemSubCategoriesForm from "./masters/item-sub-categories/item-sub-categories-form"
import GarmentGrid, { GarmentsGrid } from "./masters/garments/garments-grid"
import GarmentsForm from "./masters/garments/garments-form"


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
                updateItem={(undefined) => { }}/>} />
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
                </Route>
              
                <Route path='/excel-import' key='/excel-import'>
                    <Route path='excel-import' key='/excel-import' element={<ExcelImport />} />
                    <Route path='changes-view' key='/changes-view' element={<ChangesGrid />} />
                    <Route path='grid-view' key='/grid-view' element={<AllOrdersGridView />} />
                    <Route path='revert-orders' key='/revert-orders' element={<FileRevert />} />
                    <Route path='version-grid' key='/version-grid' element={<VersionChanges />} />
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
                        <Route path='currencies/currency-view' element={<CurrenciesGrid />} />
                        <Route path='buyers/buyers-view' element={<BuyersView />} />
                        <Route path='buyers/buyers-form' key='/buyers/buyers-form' element={<BuyersForm buyersData={undefined} updateDetails={(undefined) => {}} isUpdate={false} closeForm={() => {}}/>} />
                        <Route path='vendors/vendors-form' key='/vendors/vendors-form' element={<VendorsForm vendorsData={undefined} updateDetails={(undefined) => {}} isUpdate={false} closeForm={() => {}}/>} />
                        <Route path='vendors/vendors-view' element={<VendorsView />} />
                        <Route path='employee-details/employee-details-form' element={<EmployeeDetsilsForm employeeData={undefined}
                isUpdate={false}
                closeForm={() => { }}
                updateItem={(undefined) => { }}/>} />
                    <Route path='employee-details/employee-details-grid' element={<EmployeeDetailsGrid />} />
                    <Route path="items/items-form" key='/items/items-form' element= {
                    <ItemsForm itemData={undefined}
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
                        <Route path='garments/garments-view' element={<GarmentsGrid/>}/>
                        <Route path='garments/garments-form' element={<GarmentsForm 
                        garmentData={undefined}
                        isUpdate={false}
                        closeForm={()=>{}}
                        updateData={(undefined)=>{}}/>}/>
                    </Route>

                    

                    <Route path='/excel-import'>
                        <Route path='excel-import' element={<ExcelImport />} />
                        <Route path='changes-view' element={<ChangesGrid />} />
                        <Route path='grid-view' element={<AllOrdersGridView />} />
                        <Route path='revert-orders' element={<FileRevert />} />
                        <Route path='version-grid' element={<VersionChanges />} />

                    </Route>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}