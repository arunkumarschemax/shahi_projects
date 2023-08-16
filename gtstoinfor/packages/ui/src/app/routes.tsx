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
import SupplierForm from "./masters/supplier/supplier-form"
import SupplierView from "./masters/supplier/supplier-view"
import { FactoryDto, SupplierCreateDto } from "@project-management-system/shared-models"
import PoFileImport from "./nike/po-file-import"
import PPMReport from "./nike/ppm-report"
import FactoryPPMReport from "./nike/factory-ppm-report"


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
                    <Route path='factories/factories-form' key='/factories/factories-form' element={<FactoriesForm   Data={undefined} updateItem={function (Data: FactoryDto): void {
                            throw new Error("Function not implemented.")
                        } } isUpdate={false} closeForm={function (): void {
                            throw new Error("Function not implemented.")
                        } } />} />
                    <Route path='supplier/supplier-view' key='/supplier/supplier-view' element={<SupplierView />} />
                    <Route path='supplier/supplier-form' key='/supplier/supplier-form' element={<SupplierForm Data={undefined} updateItem={function (Data: SupplierCreateDto): void {
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
                <Route path='/nike'>
                        <Route path='file-import' element={<PoFileImport />} />
                        <Route path="ppm-report" element={<PPMReport/>}/>
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
                        <Route path='factories/factories-form' element={<FactoriesForm Data={undefined} updateItem={function (Data: FactoryDto): void {
                            throw new Error("Function not implemented.")
                        } } isUpdate={false} closeForm={function (): void {
                            throw new Error("Function not implemented.")
                        } }  />} />
                        <Route path='supplier/supplier-form' element={<SupplierForm Data={undefined} updateItem={function (Data: SupplierCreateDto): void {
                            throw new Error("Function not implemented.")
                        } } isUpdate={false} closeForm={function (): void {
                            throw new Error("Function not implemented.")
                        } } />} />
                        <Route path='supplier/supplier-view' element={<SupplierView />} />
                    </Route>
                    <Route path='/excel-import'>
                        <Route path='excel-import' element={<ExcelImport />} />
                        <Route path='changes-view' element={<ChangesGrid />} />
                        <Route path='grid-view' element={<AllOrdersGridView />} />
                        <Route path='revert-orders' element={<FileRevert />} />
                        <Route path='version-grid' element={<VersionChanges />} />
                        <Route path='phase-wise-grid' element={<PhaseWiseData />} />

                    </Route>
                    <Route path='/nike'>
                        <Route path='file-import' element={<PoFileImport />} />
                        <Route path='ppm-report' element={<PPMReport />} />
                        
                    </Route>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}