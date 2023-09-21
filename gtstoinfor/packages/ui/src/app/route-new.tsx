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
import PhaseWiseData from "./excel-import/phase-wise-data"
import WarehouseReport from "./common/reports/ware-house-report"
import { ExFactoryReport } from "./common/reports/ex-factory-report"
import TrimOrders from "./excel-import/trim-orders"
import TrimOrderReport from "./excel-import/trim-orders"
import TrimOrder from "./excel-import/trim-orders"
import PriceListView from "./masters/pricelist/price-list-view"
import PriceListForm from "./masters/pricelist/price-list-form"
import { PriceListDto } from "@project-management-system/shared-models"
import SeasonWiseReport from "./common/reports/season-wise"
// import ExcelImport from "./excel-import/excel-import"


export const AppRoutesNew = () => {
    return(
        <Routes>
        <Route path='/' key='/' element={
              <>
                  <>
                      <BasicLayout />
                  </>
              </>
          } >
            <Route>
                </Route>
              <Route path='/user-management/users-from' key='/user-management/users-from' element={<UserCreationForm />} />
              <Route path='/user-management/users-view' key='/user-management/users-view' element={<UsersView />} />
              <Route path='/masters'>
                  <Route path='factories/factories-view' key='/factories/factories-view' element={<FactoriesView />} />
                  <Route path='factories/factories-form' key='/factories/factories-form' element={<FactoriesForm />} />
                  <Route path='pricelist/price-list-view' key='/pricelist/price-list-view' element={<PriceListView />} />
                    <Route path='pricelist/price-list-form' key='/pricelist/price-list-form' element={<PriceListForm Data={undefined} updateData={function (PriceList: PriceListDto): void {
                        throw new Error("Function not implemented.")
                    } } isUpdate={false} closeForm={function (): void {
                        throw new Error("Function not implemented.")
                    } } />} />
              </Route>
              <Route path='/excel-import' key='/excel-import'>
                  <Route path='excel-import' key='/excel-import' element={<ExcelImport />} />
                  <Route path='changes-view' key='/changes-view' element={<ChangesGrid />} />
                  <Route path='grid-view' key='/grid-view' element={<AllOrdersGridView />} />
                  <Route path='revert-orders' key='/revert-orders' element={<FileRevert />} />
                  <Route path='version-grid' key='/version-grid' element={<VersionChanges />} />
                  {/* <Route path='phase-wise-grid' key='/phase-wise-grid' element={<PhaseWiseData />} /> */}
              </Route>
              <Route>
                <Route path='/ware-house-report' key='/ware-house-report' element={<WarehouseReport />} />
                    <Route path='trim-order' key='/trim-order' element={<TrimOrder />} />

              </Route>
              <Route path='/dashboard' key='/dashboard' element={<Dashboard />} />
              <Route path='/ex-factory-report' key='/ex-factory-report' element={<ExFactoryReport />} />
              <Route path='/season-wise-report' key='/season-wise-report' element={<SeasonWiseReport />} />

              <Route path='/403' key='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
          </Route>
          <Route path="/login" key='/login' element={<Login />} />
  </Routes>
    )
  
   }
