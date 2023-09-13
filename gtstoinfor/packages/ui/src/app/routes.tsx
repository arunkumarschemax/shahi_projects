import { Route, Routes } from "react-router-dom"
import { ExceptionComponent } from "./common/exception-handling/exception-component"
import { ChildProtectionWrapper } from "./common/protected-child-wrapper"
import BasicLayout from "./layout/basic-layout/layout"
import Login from "./layout/login/login"
import View from "./components/doc-extract/doc-extract-view"
// import Form, { DocExtractForm } from "./components/doc-extract/doc-extract-form"
import VendorGrid from "./components/vendor-view/vendor-view"
import VendorBranchInfoGrid from "./components/vendor-view/detail-view"
import DocumentUploadForm from "./components/doc-extract/document-upload-form"
import ScanDetailView from "./components/doc-extract/details-views"
import PriceView from "./components/vendor-price/price-view"
import PriceForm from "./components/vendor-price/price-form"
import BuyersView from "./components/buyer-grid/buyer-grid-view"


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
                <Route path="doc-extract-view" element={<View />} />
                <Route path="/doc-extract" >
                    <Route path="doc-extract-view" element={<View />} />
                    <Route path="doc-extract-view" key='/doc-extract-view' element={<View />} />
                </Route>

                <Route path="/scan-document" element={<View />} />
                <Route path="scan-document" element={<View />} />
                <Route path="/vendors" element={<VendorGrid />} />
                <Route path="/invoices" />
                <Route path="/pending-approvals" />
                <Route path="/dashboard" />
                <Route path="/invoice-report" />

                <Route path="/vendors" element={<VendorGrid />} />



                <Route path="/BuyersView" element={<BuyersView />} />

                <Route path="/VendorBranchInfoGrid" element={<VendorBranchInfoGrid />} />

                <Route path="/priceview" element={<PriceView />} />
                <Route path="/priceform" element={<PriceForm />} />
                {/* <Route path="/VendorBranchInfoGrid" element={<VendorBranchInfoGrid />} /> */}




                <Route path="/doc-extract-form" element={<DocumentUploadForm />} />

                <Route path="/ScanDetailView" element={<ScanDetailView />} />


                {/* <Route path="/doc-extract-form" element={<DocForm/>}/> */}

                <Route path="/doc-extract-form" element={<DocumentUploadForm />} />


                {/* <Route path="/doc-extract-new-form" element={<DocExtractForm invoiceData={undefined} type="" file={undefined}/>}/> */}

                <Route path='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}