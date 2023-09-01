import { Route, Routes } from "react-router-dom"
import { ExceptionComponent } from "./common/exception-handling/exception-component"
import { ChildProtectionWrapper } from "./common/protected-child-wrapper"
import BasicLayout from "./layout/basic-layout/layout"
import Login from "./layout/login/login"
import View from "./components/doc-extract/doc-extract-view"
import Form from "./components/doc-extract/doc-extract-form"
import DocExtractForm from "./components/doc-extract/doc-extract-new-form"
import VendorGrid from "./components/vendor-view/vendor-view"


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
                <Route path="doc-extract-view" element={<View />}/>
                <Route path="/doc-extract" >
                <Route path="doc-extract-view" element={<View />}/>
                <Route path="doc-extract-view" key='/doc-extract-view'  element={<View />}/>
            </Route>
            {/* <Route path="/vendors" /> */}
            <Route path="/scan-document" />
            <Route path="/invoices"/>
            <Route path="/pending-approvals"/>
            <Route path="/dashboard"/>
            <Route path="/invoice-report"/>

            <Route path="/vendors" element={<VendorGrid/>}/>

            <Route path="/doc-extract-form" element={<Form/>}/>
            

            <Route path="/doc-extract-new-form" element={<DocExtractForm invoiceData={undefined} type="" file={undefined}/>}/>

                <Route path='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}