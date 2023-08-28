import { Route, Routes } from "react-router-dom"
import { Dashboard } from "./common/dashboards/dashboard"
import { ExceptionComponent } from "./common/exception-handling/exception-component"
import { ChildProtectionWrapper } from "./common/protected-child-wrapper"
import DocumentListupload from "./components/document-management/document-file-upload"
import DocumentForm from "./components/masters/document-form"
import DocumentGrid from "./components/masters/document-grid"
import RoleMappingForm from "./components/masters/document-role-form"
import DocumentRoleGrid from "./components/masters/document-role-grid"
import ChangesGrid from "./excel-import/changes-grid"
import ExcelImport from "./excel-import/excel-import"
import { FileRevert } from "./excel-import/file-revert"
import AllOrdersGridView from "./excel-import/orders-view-grid"
import VersionChanges from "./excel-import/version-wise-table"
import BasicLayout from "./layout/basic-layout/layout"
import Login from "./layout/login/login"
import UserCreationForm from "./user-management/users/users-form"
import UsersView from "./user-management/users/users-view"
import UploadFileGrid from "./components/document-management/upload-file-view"
import VendorGrid from "./components/masters/vendor-view"


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
                {/* <Route path='/masters'> */}
                <Route path='document-form' key='/document-form' element={<DocumentForm data={undefined
                } updateDetails={(undefined => { })} isUpdate={false} closeForm={() => { }} />} />
                <Route path='document-grid' key='/document-grid' element={<DocumentGrid />} />
                <Route path='role-mapping-form' key='/role-mapping-form' element={<RoleMappingForm />} />
                <Route path='role-mapping-grid' key='/role-mapping-grid' element={<DocumentRoleGrid />} />


                {/* </Route> */}
                <Route path='/excel-import'>
                    <Route path='excel-import' element={<ExcelImport />} />
                    <Route path='changes-view' element={<ChangesGrid />} />
                    <Route path='grid-view' element={<AllOrdersGridView />} />
                    <Route path='revert-orders' element={<FileRevert />} />
                    <Route path='version-grid' element={<VersionChanges />} />
                    {/* <Route path='phase-wise-grid' element={<PhaseWiseData />} /> */}

                </Route>
                <Route path="/document-management" >
                    <Route path="document-file-upload" element={<DocumentListupload />} />
                    <Route path="upload-file-view" key='/upload-file-view' element={<UploadFileGrid />} />

                </Route>



                <Route path='/vendorgrid' element={<VendorGrid />} />

                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
            </Route>

            <Route path="/login" element={<Login />} />
        </Routes>
    )
}