import React, { useState } from 'react'
import { Button, Tooltip, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { UserOutlined, DashboardOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link, Outlet, HashRouter as Router, useNavigate } from 'react-router-dom';
import { ProBreadcrumb, ProConfigProvider } from '@ant-design/pro-components';
import logo from './logo.png'
import ProLayout from '@ant-design/pro-layout';
import { treeRouter } from '../../utils/common';
import { DarkModeIcon } from '../../icons/darkmode.icon';
import { LightModeIcon } from '../../icons/lightmode.icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears, faGlobe, faHatCowboy, faLayerGroup, faPeopleRoof, faShirt, faShoppingCart} from '@fortawesome/free-solid-svg-icons';

const { useToken } = theme



export const baseRouterList = [
    // {
    //     label: "Dashboard",
    //     key: "dashboard",
    //     path: "dashboard",
    //     icon: <DashboardOutlined />,
    //     filepath: "/dashboard.tsx",
    // },
    {
        label: "User Management",
        key: "user-management",
        path: "user-management",
        icon:<div style={{fontSize:"13px",marginLeft:"-1px",fontWeight:"bold",marginTop:"-1px"}}>👨‍💻</div>,

        filepath: "../",
        children: [
            {
                label: "Add User",
                key: "users-from",
                path: "users-from",
                icon: <UserOutlined />,
                filepath: "users-form.tsx",
            },
            {
                label: "View User",
                key: "users-view",
                path: "users-view",
                icon: <UserOutlined />,
                filepath: "users-view.tsx",
            },
        ],
    },
    {
        label:'Global Configurations',
        key:'global',
        path:'global',
        filepath:'global',
        icon:<div style={{fontSize:"13px",marginLeft:"-1px",fontWeight:"bold",marginTop:"-1px"}}>🌎</div>,

        children:[
            {
                label: "Attributes",
                key: "attributes",
                path: "attributes/attributes-view",
                filepath: "attributes/attributes-view",
            },
            {
                label: "Buyers",
                key: "buyers",
                path: "buyers/buyers-view",
                filepath: "buyers/buyers-view",
            },
            {
                label: "Buyers Destination",
                key: "buyers-destination",
                path: "buyers-destination/buyers-destination-grid",
                filepath: "buyers-destination/buyers-destination-grid",
            },
            {
                label: "Company",
                key: "company",
                path: "company/company-grid",
                filepath: "company/company-grid",
            },
            {
                label: "Company-Division",
                key: "division",
                path: "company/division-grid",
                filepath: "company/division-grid",
            },
            {
                label: "Currency",
                key: "currencies",
                path: "currencies/currency-view",
                filepath: "currencies/currency-view",
            },

            {
                label: "Delivery Method",
                key: "delivery-methods",
                path: "delivery-methods/delivery-method-view",
                filepath: "delivery-methods/delivery-method-view",
            },
            {
                label: "Delivery Terms",
                key: "delivery-terms",
                path: "delivery-terms/delivery-terms-view",
                filepath: "delivery-terms/delivery-terms-view",
            },
            {
                label: "Destination",
                key: "destination",
                path: "destination/destination-grid",
                filepath: "destination/destination-grid",
            },
            {
                label: "Employees",
                key: "employee-details-grid",
                path: "employee-details/employee-details-grid",
                filepath: "employee-details/employee-details-grid",
            }, 
            {
                label: "Factories",
                key: "factories",
                path: "factories/factories-view",
                filepath: "factories/factories-view",
            }, 
            {
                label: "Locations",
                key: "locations",
                path: "locations/locations-view",
                filepath: "locations/locations-view",
            },
            {
                label: "Payment Method",
                key: "paymentmethod",
                path: "paymentmethod/paymentmethod-view",
                filepath: "paymentmethod/paymentmethod-view",
            },
            {
                label: "Payment Terms",
                key: "paymentTerms",
                path: "payment-terms/payment-terms-view",
                filepath: "payment-terms/payment-terms-view",
            },
            {
                label: "Package Terms",
                key: "packageTerms",
                path: "package-terms/package-terms-view",
                filepath: "package-terms/package-terms-view",
            },
            {
                label: "Taxes",
                key: "taxes",
                path: "taxes/taxes-grid",
                filepath: "taxes/taxes-grid",
            },
            {
                label: "UOM",
                key: "uom",
                path: "uom/uom-grid",
                filepath: "uom/uom-grid",
            },
            {
                label: "Vendors",
                key: "vendors",
                path: "vendors/vendors-view",
                filepath: "vendors/vendors-view",
            },
            {
                label: "Warehouse",
                key: "warehouse",
                path: "warehouse/warehouse-grid",
                filepath: "warehouse/warehouse-grid",
            },
        ]
    },
    {
        label: "Masters",
        key: "masters",
        path: "masters",
        icon:<div style={{fontSize:"13px",marginLeft:"-1px",fontWeight:"bold",marginTop:"-1px"}}>🎓</div>,
        filepath: "masters",
        children: [
            {
                label: "Account Control Object",
                key: "accountcontrolobjects",
                path: "accountcontrolobjects/accountcontrolobjects-view",
                filepath: "accountcontrolobjects/accountcontrolobjects-view",
            },
            {
                label: "Brands",
                key: "brands",
                path: "brands/brand-view",
                filepath: "brands/brand-view",
            },
            {
                label: "Buying House",
                key: "buying-house",
                path: "buying-house/buying-house-view",
                filepath: "buying-house/buying-house-view",
            },
            {
                label: "Business Area",
                key: "buisness-area-view",
                path: "business-area/business-area-view",
                filepath: "business-area/business-area-view",
            },
            {
                label: "Colors",
                key: "colours",
                path: "colour/colour-view",
                filepath: "colour/colour-view",
            }, 
            {
                label: "Commission",
                key: "commission",
                path: "commission/commission-view",
                filepath: "commission/commission-view",
            },
            {
                label: "Components",
                key: "components",
                path: "components/components-view",
                filepath: "components/components-view",
            },
            {
                label: "Co Type",
                key: "co-type",
                path: "co-type/co-type-view",
                filepath: "co-type/co-type-view",
            },
            {
                label: "Custom Groups",
                key: "custom-groups",
                path: "custom-groups/custom-groups-view",
                filepath: "custom-groups/custom-groups-view",
            },
            {
                label: "Department",
                key: "department",
                path: "department/department-view",
                filepath: "department/department-view",
            },
            {
                label: "Fabrics",
                key: "fabrics",
                path: "fabrics/fabrics-view",
                filepath: "fabrics/fabrics-view",
            },
            {
                label: "Fabric Type",
                key: "fabricType",
                path: "fabricType/fabric-type-view",
                filepath: "fabricType/fabric-type-view",
            },
            {
                label: "Fabric Sub-Type",
                key: "fabricSubType",
                path: "fabricSubType/fabric-sub-type-view",
                filepath: "fabricSubType/fabric-sub-type-view",
            },
            {
                label: "Fabric Finish Type",
                key: "fabric-finish-type",
                path: "fabric-finish-type/fabric-finish-type-grid",
                filepath: "fabric-finish-type/fabric-finish-type-grid",
            },
            {
                label: "Fabric Structure",
                key: "fabric-structure",
                path: "fabric-structure/fabric-structure-grid",
                filepath: "fabric-structure/fabric-structure-grid",
            },
            {
                label: "Fabric Weave",
                key: "fabric-weave",
                path: "fabric-weave/fabric-weave-view",
                filepath: "fabric-weave/fabric-weave-view",
            },
            {
                label: "Garment Categories",
                key: "Garment-categories",
                path: "/masters/garmentcategory/garmentcategory-view",
                filepath: "/masters/garmentcategory/garmentcategory-view",
            },
            {
                label: "Garments",
                key: "garments",
                path: "garments/garments-view",
                filepath: "garments/garments-view",
            },
            {
                label: "Item Categories",
                key: "item-categories",
                path: "item-categories/item-categories-view",
                filepath: "item-categories/item-categories-view",
            },
            {
                label: "Item Sub Categories",
                key: "item-sub-categories",
                path: "item-sub-categories/item-sub-categories-view",
                filepath: "item-sub-categories/item-sub-categories-view",
            },
            {
                label: "Items",
                key: "items",
                path: "items/item-grid",
                filepath:"items/item-grid",
            },
            {
                label: "License Type",
                key: "liscence-type",
                path: "liscence-type/liscence-type-grid",
                filepath: "liscence-type/liscence-type-grid",
            },
            {
                label: "Locations",
                key: "locations",
                path: "locations/locations-view",
                filepath: "locations/locations-view",
            },
            {
                label: "Operation Groups",
                key: "operation-groups",
                path: "operationgroups/operationgroups-view",
                filepath: "operationgroups/operationgroups-view",
            },
            {
                label: "Operations",
                key: "operations",
                path: "operations/operation-view",
                filepath: "operations/operation-view",
            },
            {
                label: "Profit Control Head",
                key: "profit-control-head",
                path: "profit-control-head/profit-control-head-view",
                filepath: "profit-control-head/profit-control-head-view",
            },
            {
                label: "ROSL Groups",
                key: "rosl-groups",
                path: "rosl-groups/rosl-groups-view",
                filepath: "rosl-groups/rosl-groups-view",
            },
            {
                label: "Sample Types",
                key: "sampleTypes",
                path: "sampleTypes/sampleTypes-grid",
                filepath: "sampleTypes/sampleTypes-grid",
            },
            {
                label: "Sample Sub Types",
                key: "sampleSubTypes",
                path: "sampleSubTypes/sampleSubTypes-grid",
                filepath: "sampleSubTypes/sampleSubTypes-grid",
            },
            {
                label: "Fabric Type",
                key: "fabricType",
                path: "fabricType/fabric-type-view",
                filepath: "fabricType/fabric-type-view",
            },
            {
                label: "Fabric Sub-Type",
                key: "fabricSubType",
                path: "fabric-sub-type-view/fabric-sub-type-view",
                filepath: "fabric-sub-type-view/fabric-sub-type-view",
            },
            {
                label: "Size",
                key: "Size",
                path: "size/size-view",
                filepath: "size/size-view",
            },
            {
                label: "Item Group",
                key: "itemgroup",
                path: "item-group/item-group-view",
                filepath: "item-group/item-group-view",
            },
            {
                label: "Division",
                key: "division",
                path: "division/division-view",
                filepath: "division/division-view",
            },
            {
                label: "Item Type",
                key: "itemtype",
                path: "item-Type/item-Type-view",
                filepath: "item-Type/item-Type-view",
            },
            {
                label: "Group Tech Class",
                key: "grouptechclass",
                path: "groupTechClass/groupTechClass-grid",
                filepath: "groupTechClass/groupTechClass-grid",
            },
            {
                label: "Search Group",
                key: "searchgroup",
                path: 'searchGroup/searchGroup-grid',
                filepath: 'searchGroup/searchGroup-grid',
                
            },
            {
                label: "Composition",
                key: "composition",
                path: 'composition/composition-grid',
                filepath: 'composition/composition-grid',
                
            },
            {
                label: "Range",
                key: "range",
                path: 'range/range-grid',
                filepath: 'range/range-grid',
                
            },
            {
                label: "Product Group",
                key: "productGroup",
                path: "productGroup/productGroup-view",
                filepath: "productGroup/productGroup-view",
            },
            {
                label: "Procurment Group",
                key: "procurmentGroup",
                path: "procurmentGroup/procurmentGroup-view",
                filepath: "procurmentGroup/procurmentGroup-view",
            },
            {
                label: "Hierarchy Level",
                key: "hierarchyLevel",
                path: "hierarchyLevel/hierarchyLevel-view",
                filepath: "hierarchyLevel/hierarchyLevel-view",
            },
        ],
    }, 
    {
        label: "Settings",
        key: "settings",
        icon:<div style={{fontSize:"13px",marginLeft:"-1px",fontWeight:"bold",marginTop:"-1px"}}>⚙️</div>,
        path: "settings/settings-view",
        filepath: "settings/settings-view",
        // children:[
        //     {
        //         label:'Settings',
        //         key:'settings',
        //         path:'settings/settings-form',
        //         filepath:'settings/settings-form'
        //     },
        //     {
        //         label:'Settings View',
        //         key:'settingsView',
        //         path:'settings/settings-view',
        //         filepath:'settings/settings-view'
        //     },
        // ]
    },
    // {
    //     label: "Style Management",
    //     key: "style-management",
    //     path: "style-management",
    //     icon:<div style={{fontSize:"13px",marginLeft:"-1px",fontWeight:"bold",marginTop:"-1px"}}>👗</div>,
    //      filepath: "style-management",
    //     children: [
    //         {
    //             label: "Style",
    //             key: "style-view",
    //             path: 'style/style-grid',
    //             filepath: 'style/style-grid',
    //         },
    //         {
    //             label: "Component Mapping",
    //             key: "component-mapping",
    //             path: 'component-mapping/component-mapping-form',
    //             filepath: 'component-mapping/component-mapping-form',
    //         },
            
    //     ]

    // },
    {
        label: "Fabric Development",
        key: "fabricdevelopment",
        icon:<div style={{fontSize:"13px",marginLeft:"-1px",fontWeight:"bold",marginTop:"-1px"}}>🥻</div>,
        path: "fabricdevelopment",
        filepath: "fabricdevelopment",
        children:[

            {
                label: "Fabric Development Request",
                key: "Fabricdevelopmentrequest",
                path: "FabricDevelopmentrequest/Fabric-Development-Request",
                filepath: "FabricDevelopmentrequest/Fabric-Development-Request",
            },
        ]
    },
    {
        label: "Sample Development",
        key: "sample-development",
        path: "sample-development",
        filepath: "sample-development",
        icon:<div style={{fontSize:"13px",marginLeft:"-1px",fontWeight:"bold",marginTop:"-1px"}}>👔</div>,
        children:[
            {
                label: "Sample Development",
                key: "sample-development",
                path: "sample-development-form",
                filepath: "sample-development-form"
            },
            {
                label: "Sample Development View",
                key: "sample-development",
                path: "sample-development-view",
                filepath: "sample-development-view"
            }
        ]
    },
   
    {
        label: "Material Creation",
        key: "materialCreation",
        icon:<div style={{fontSize:"13px",marginLeft:"-1px",fontWeight:"bold",marginTop:"-1px"}}>🧵</div>,
        path: "materialCreation",
        filepath: "materialCreation",
        children:[
            
            {
                label: "Item Creation",
                key: "item-creation",
                path: "item-creation",
                filepath: "item-creation",
            },
            {
                label: "Fabric Creation",
                key: "fabric-bom-creation",
                path: "fabric-bom-creation",
                // icon: <PicCenterOutlined />,
                filepath: "fabric-bom-creation",
            },
          
            {
                label: "Trim Creation",
                key: "bomtrimcreation",
                path: "bomtrimcreation/bom-trim-creation",
                filepath: "bomtrimcreation/bom-trim-creation",
            },
            {
                label: "SKU Generation",
                key: "sku-mapping",
                path: "sku-mapping",
                filepath: "sku-mapping",
            },
            {
                label: "SKU List",
                key: "sku-list",
                path: "sku-list",
                filepath: "sku-list",
            },
            {
                label: "Style Order Creation",
                key: "style-order-creation",
                path: "style-order-creation",
                filepath: "style-order-creation",
            },
            {
                label: "Style Order Grid",
                key: "style-order-view",
                path: "style-order-view",
                filepath: "style-order-view",
            },
           
        ]
    },
    {
        label: "Style Management",
        key: "style-management",
        path: "style-management",
        icon:<div style={{fontSize:"13px",marginLeft:"-1px",fontWeight:"bold",marginTop:"-1px"}}>👗</div>,
        filepath: "style-management",
        children: [
            {
                label: "Style",
                key: "style-view",
                path: 'style/style-grid',
                filepath: 'style/style-grid',
            },
            {
                label: "Component Mapping",
                key: "component-mapping",
                path: 'component-mapping/component-mapping-form',
                filepath: 'component-mapping/component-mapping-form',
            },
            {
                label: "Operation Sequence",
                key: "operation-sequence",
                path: "operation-sequence",
                filepath: "operation-sequence",
            },
            
        ]

    },
    {
        label: "Operation Tracking",
        key: "operationtracking",
        // icon:<FontAwesomeIcon icon={faShirt} />,
        path: "operation-tracking",
        filepath: "operation-tracking",
        children:[
            
            {
                label: "Issuing",
                key: "issuing",
                path: "operation-tracking/issuing",
                filepath: "operation-tracking/issuing",
            },
            {
                label: "Reporting",
                key: "operation-reporting",
                path: "operation-reporting",
                filepath: "operation-reporting",
            },
            
         
        ]
    },
    // {
    //     label: "Orders",
    //     key: "excel-import",
    //     path: "excel-import",
    //     icon: <FileExcelOutlined />,
    //     filepath: "excel-import",
    //     children: [
    //         {
    //             label: "Add Orders",
    //             key: "excel-import",
    //             path: "excel-import",
    //             filepath: "excel-import",
    //         },
    //         {
    //             label: "Compare Orders",
    //             key: "changes-view",
    //             path: "changes-view",
    //             filepath: "changes-view",
    //         },
    //         {
    //             label: "View Orders",
    //             key: "grid-view",
    //             path: "grid-view",
    //             filepath: "grid-view",
    //         },
    //         {
    //             label: "Uploaded Files",
    //             key: "revert-orders",
    //             path: "revert-orders",
    //             filepath: "revert-orders",
    //         },
    //         {
    //             label: "Versions Data",
    //             key: "version-grid",
    //             path: "version-grid",
    //             filepath: "version-grid",
    //         },
    //         // {
    //         //     label: "Phase Wise Data",
    //         //     key: "phase-wise-grid",
    //         //     path: "phase-wise-grid",
    //         //     filepath: "phase-wise-grid",
    //         // }
    //         {
    //             label: "Item Creation",
    //             key: "item-creation",
    //             path: "item-creation",
    //             filepath: "item-creation",
    //         },
    //         {
    //             label: "SKU List",
    //             key: "sku-list",
    //             path: "sku-list",
    //             filepath: "sku-list",
    //         },
    //         {
    //             label: "SKU Mapping",
    //             key: "sku-mapping",
    //             path: "sku-mapping",
    //             filepath: "sku-mapping",
    //         },
    //     ],
    // },

   
];

export default function BasicLayout() {
    const [pathname, setPathname] = useState(location.pathname);
    const [dark, setDark] = useState(false);
    const navigate = useNavigate();
    const [settings, setSettings] = useState<any>({ colorPrimary: '1890ff', fixedHeader: true })
    const { token: { colorPrimary, colorPrimaryActive, colorPrimaryBg } } = useToken()



    return (
        <ProConfigProvider dark={dark}  >

            <div
                id="main-layout"
                style={{
                    height: '100vh',
                }}
            >
                <ProLayout
                    title='SHAHI'
                    locale='en-US'
                    siderWidth={240}
                    colorPrimary='#29397d'
                    headerContentRender={(props) => props.layout !== 'side' && document.body.clientWidth > 1000 ? <ProBreadcrumb /> : undefined}
                    logo={<img src={logo} />}
                    fixSiderbar
                    layout='mix'
                    token={{ header: { colorBgHeader: 'transparent' }, sider: { colorBgMenuItemSelected: colorPrimaryBg } }}
                    route={{
                        path: '/',
                        routes: treeRouter(baseRouterList),
                    }}
                    location={{
                        pathname,
                    }}
                    avatarProps={{
                        src: 'https://hzdjs.cn/blog/logo.jpg',
                        size: 'small',
                        title: 'admin',
                    }}
                    contentStyle={{ paddingBlock: '10px', paddingInline: '10px' }}
                    actionsRender={(props) => {
                        // if (props.isMobile) return [];
                        return [

                            // <div
                            //     key="SearchOutlined"
                            //     aria-hidden
                            //     style={{
                            //         display: 'flex',
                            //         alignItems: 'center',
                            //         marginInlineEnd: 24,
                            //     }}
                            //     onMouseDown={(e) => {
                            //         e.stopPropagation();
                            //         e.preventDefault();
                            //     }}
                            // >
                            //     <Input
                            //         style={{
                            //             borderRadius: 4,
                            //             marginInlineEnd: 12,
                            //             backgroundColor: 'rgba(0,0,0,0.03)',
                            //         }}
                            //         prefix={
                            //             <SearchOutlined
                            //                 style={{
                            //                     color: 'rgba(0, 0, 0, 0.15)',
                            //                 }}
                            //             />
                            //         }
                            //         placeholder="Search"
                            //         bordered={false}
                            //     />
                            //     <PlusCircleFilled
                            //         style={{
                            //             color: 'var(--ant-primary-color)',
                            //             fontSize: 24,
                            //         }}
                            //     />
                            // </div>
                            <Tooltip placement="bottom" title={'Switch mode'}>
                                {/* <Switch
                                    checkedChildren="🌜"
                                    unCheckedChildren="🌞"
                                    checked={dark}
                                    onChange={(v) => setDark(v)}
                                /> */}
                                <Button
                                    size="middle"
                                    style={{ borderRadius: "5px" }}
                                    onClick={() => {
                                        setDark(!dark);
                                    }}
                                    icon={!dark ? <DarkModeIcon /> : <LightModeIcon />}
                                ></Button>
                            </Tooltip>,
                            <Tooltip placement="bottom" title={"Sign Out"}>
                                <Button
                                    size="middle"
                                    style={{ borderRadius: "5px" }}
                                    icon={
                                        <LogoutOutlined
                                            onClick={async () => {
                                                // await signOut(dispatch);
                                                navigate("/login");
                                            }}
                                        />
                                    }
                                ></Button>
                            </Tooltip>,
                        ];
                    }}
                    menuItemRender={(item, dom) => {
                        return (
                            <Link
                                to={item?.path || "/"}
                                onClick={() => {
                                    setPathname(item.path || "/");
                                }}
                            >
                                {dom}
                            </Link>
                        );
                    }}
                    onMenuHeaderClick={() => navigate("/")}
                >
                    <Outlet />
                </ProLayout>
            </div>
        </ProConfigProvider>
    );
}
