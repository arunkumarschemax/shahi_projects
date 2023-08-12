import { Route, HashRouter as Router, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom"
import { ChildProtectionWrapper } from "./common/protected-child-wrapper"
import { ExceptionComponent } from "./common/exception-handling/exception-component"
import BasicLayout from "./layout/basic-layout/layout"
import Login from "./layout/login/login"
import UserCreationForm from "./user-management/users/users-form"
import UsersView from "./user-management/users/users-view"
import ExcelImport from "./excel-import/excel-import"
import ChangesGrid from "./excel-import/changes-grid"
import AllOrdersGridView from "./excel-import/orders-view-grid"
import { Dashboard } from "./common/dashboards/dashboard"
import { FileRevert } from "./excel-import/file-revert"
import VersionChanges from "./excel-import/version-wise-table"
import DocumentListupload from "./components/document-management/document-file-upload"
import DocumentForm from "./components/masters/document-form"
import DocumentGrid from "./components/masters/document-grid"
import RoleMappingForm from "./components/masters/document-role-form"
import DocumentRoleGrid from "./components/masters/document-role-grid"


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
                </Route>
                    
                <Route path="/document-management" key='/document-management'>
                    <Route path="document-file-upload" key='/document-file-upload'  element={<DocumentListupload />}/>
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
                        {/* <Route path='factories/factories-view' element={<FactoriesView />} />
                        <Route path='factories/factories-form' element={<FactoriesForm />} /> */}
                        <Route path='document-form' key='/document-form' element={<DocumentForm />} />
                        <Route path='document-grid' key='/document-grid' element={<DocumentGrid />} />
                        <Route path='role-mapping-form' key='/role-mapping-form' element={<RoleMappingForm />} />
                        <Route path='role-mapping-grid' key='/role-mapping-grid' element={<DocumentRoleGrid />} />


                    </Route>
                    <Route path='/orders'>
                        <Route path='excel-import' element={<ExcelImport />} />

                    </Route>
                    <Route path="/document-management" >
                    <Route path="document-file-upload" element={<DocumentListupload />}/>
                </Route>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
                </Route>
                
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}