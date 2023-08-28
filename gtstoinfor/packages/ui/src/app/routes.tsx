import { Route, Routes } from "react-router-dom"
import { Dashboard } from "./common/dashboards/dashboard"
import { ExceptionComponent } from "./common/exception-handling/exception-component"
import { ChildProtectionWrapper } from "./common/protected-child-wrapper"
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
import View from "./components/doc-extract/doc-extract-view"
import Form from "./components/doc-extract/doc-extract-form"


export const AppRoutes = () => {


    return (
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
                </Route>
                <Route path='/excel-import'>
                    <Route path='excel-import' element={<ExcelImport />} />
                    <Route path='changes-view' element={<ChangesGrid />} />
                    <Route path='grid-view' element={<AllOrdersGridView />} />
                    <Route path='revert-orders' element={<FileRevert />} />
                    <Route path='version-grid' element={<VersionChanges />} />
                    {/* <Route path='phase-wise-grid' element={<PhaseWiseData />} /> */}
                <Route path="doc-extract-view" element={<View />}/>


                </Route>

                <Route path="/doc-extract" >
                <Route path="doc-extract-view" element={<View />}/>
                <Route path="doc-extract-view" key='/doc-extract-view'  element={<View />}/>
                
            </Route>

            <Route path="/doc-extract-form" element={<Form/>}/>

                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}