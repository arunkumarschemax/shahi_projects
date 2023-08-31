import React, { useState } from 'react'
import { Button, Tooltip, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { UserOutlined, DashboardOutlined, PicCenterOutlined, LogoutOutlined, FileExcelOutlined } from '@ant-design/icons'
import { Link, Outlet, HashRouter as Router, useNavigate } from 'react-router-dom';
import { ProBreadcrumb, ProConfigProvider } from '@ant-design/pro-components';
import logo from './logo.png'
import ProLayout from '@ant-design/pro-layout';
import { treeRouter } from '../../utils/common';
import { DarkModeIcon } from '../../icons/darkmode.icon';
import { LightModeIcon } from '../../icons/lightmode.icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faShirt} from '@fortawesome/free-solid-svg-icons';

const { useToken } = theme



export const baseRouterList = [
    {
        label: "Dashboard",
        key: "dashboard",
        path: "dashboard",
        icon: <DashboardOutlined />,
        filepath: "/dashboard.tsx",
    },
    {
        label: "User Management",
        key: "user-management",
        path: "user-management",
        icon: <UserOutlined />,
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
        icon: <PicCenterOutlined />,
        children:[
            {
                label: "Factories",
                key: "factories",
                path: "factories/factories-view",
                filepath: "factories/factories-view",
            },
            {
                label: "Currency",
                key: "currencies",
                path: "currencies/currency-view",
                filepath: "currencies/currency-view",
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
            },  {
                label: "Warehouse",
                key: "warehouse",
                path: "warehouse/warehouse-grid",
                filepath: "warehouse/warehouse-grid",
            },
            {
                label: "Destination",
                key: "destination",
                path: "destination/destination-grid",
                filepath: "destination/destination-grid",
            },
            {
                label: "Buyers",
                key: "buyers",
                path: "buyers/buyers-view",
                filepath: "buyers/buyers-view",
            },
            {
                label: "Vendors",
                key: "vendors",
                path: "vendors/vendors-view",
                filepath: "vendors/vendors-view",
            },
            {
                label: "Employees",
                key: "employee-details-grid",
                path: "employee-details/employee-details-grid",
                filepath: "employee-details/employee-details-grid",
            },
            {
                label: "PaymentMethod",
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
                label: "Delivery Terms",
                key: "delivery-terms",
                path: "delivery-terms/delivery-terms-view",
                filepath: "delivery-terms/delivery-terms-view",
            },
            {
                label: "Delivery Method",
                key: "delivery-methods",
                path: "delivery-methods/delivery-method-view",
                filepath: "delivery-methods/delivery-method-view",
            },
            {
                label: "Locations",
                key: "locations",
                path: "locations/locations-view",
                filepath: "locations/locations-view",
            },
            {
                label: "Taxes",
                key: "taxes",
                path: "taxes/taxes-grid",
                filepath: "taxes/taxes-grid",
            },
            {
                label: "Attributes",
                key: "attributes",
                path: "attributes/attributes-view",
                filepath: "attributes/attributes-view",
            },
            {
                label: "Buyers Destination",
                key: "buyers-destination",
                path: "buyers-destination/buyers-destination-grid",
                filepath: "buyers-destination/buyers-destination-grid",
            },
            {
                label: "UOM",
                key: "uom",
                path: "uom/uom-grid",
                filepath: "uom/uom-grid",
            },
        ]
    },
    {
        label: "Masters",
        key: "masters",
        path: "masters",
        icon: <PicCenterOutlined />,
        filepath: "masters",
        children: [
            {
                label: "Brands",
                key: "brands",
                path: "brands/brand-view",
                filepath: "brands/brand-view",
            },
            {
                label: "Operations",
                key: "operations",
                path: "operations/operation-view",
                filepath: "operations/operation-view",
            },
            {
                label: "Operation Groups",
                key: "operation-groups",
                path: "operationgroups/operationgroups-view",
                filepath: "operationgroups/operationgroups-view",
            },
            {
                label: "Items",
                key: "items",
                path: "items/item-grid",
                filepath:"items/item-grid",
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
                label: "Components",
                key: "components",
                path: "components/components-view",
                filepath: "components/components-view",
            },
            {
                label: "Garments",
                key: "garments",
                path: "garments/garments-view",
                filepath: "garments/garments-view",
            },
            {
                label: "Garment Categories",
                key: "Garment-categories",
                path: "/masters/garmentcategory/garmentcategory-view",
                filepath: "/masters/garmentcategory/garmentcategory-view",
            },
            
            {
                label: "Locations",
                key: "locations",
                path: "locations/locations-view",
                filepath: "locations/locations-view",
            },
            
            {
                label: "Profit Control Head",
                key: "profit-control-head",
                path: "profit-control-head/profit-control-head-view",
                filepath: "profit-control-head/profit-control-head-view",
            },
            {
                label: "Liscence Type",
                key: "liscence-type",
                path: "liscence-type/liscence-type-grid",
                filepath: "liscence-type/liscence-type-grid",
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
                path: "fabricSubType/fabric-sub-type-view",
                filepath: "fabricSubType/fabric-sub-type-view",
            },
            {
                label: "Size",
                key: "Size",
                path: "size/size-view",
                filepath: "size/size-view",
            },
            {
                label: "Custom Groups",
                key: "custom-groups",
                path: "custom-groups/custom-groups-view",
                filepath: "custom-groups/custom-groups-view",
            },
            {
                label: "ROSL Groups",
                key: "rosl-groups",
                path: "rosl-groups/rosl-groups-view",
                filepath: "rosl-groups/rosl-groups-view",
            },
            {
                label: "Buying House",
                key: "buying-house",
                path: "buying-house/buying-house-view",
                filepath: "buying-house/buying-house-view",
            },
            {
                label: "Commission",
                key: "commission",
                path: "commission/commission-view",
                filepath: "commission/commission-view",
            },
            {
                label: "Fabric Structure",
                key: "fabric-structure",
                path: "fabric-structure/fabric-structure-grid",
                filepath: "fabric-structure/fabric-structure-grid",
            },
            {
                label: "Fabric Finish Type",
                key: "fabric-finish-type",
                path: "fabric-finish-type/fabric-finish-type-grid",
                filepath: "fabric-finish-type/fabric-finish-type-grid",
            },
         
            {
                label: "Colours",
                key: "colours",
                path: "colour/colour-view",
                filepath: "colour/colour-view",
            },
            {
                label: "Department",
                key: "department",
                path: "department/department-view",
                filepath: "department/department-view",
            },
            {
                label: "Account Control Object",
                key: "accountcontrolobjects",
                path: "accountcontrolobjects/accountcontrolobjects-view",
                filepath: "accountcontrolobjects/accountcontrolobjects-view",
            },
          
        ],
    }, 
    {
        label: "Settings",
        key: "settings",
        icon:<FontAwesomeIcon icon={faCog} />,
        path: "settings",
        filepath: "settings",
        children:[
            {
                label:'Settings',
                key:'settings',
                path:'settings/settings-form',
                filepath:'settings/settings-form'
            },
            {
                label:'Settings View',
                key:'settingsView',
                path:'settings/settings-view',
                filepath:'settings/settings-view'
            },
        ]
    },
    {
        label: "Style Management",
        key: "style-management",
        path: "style-management",
        icon:<FontAwesomeIcon icon={faShirt} />,
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
            
        ]

    },
    {
        label: "Fabric Development",
        key: "fabricdevelopment",
        icon:<FontAwesomeIcon icon={faShirt} />,
        path: "fabricdevelopment",
        filepath: "fabricdevelopment",
        children:[
            {
                label: "BOM TRIM CREATION",
                key: "bomtrimcreation",
                path: "bomtrimcreation/bom-trim-creation",
                filepath: "bomtrimcreation/bom-trim-creation",
            },

            {
                label: "Fabic Development Request",
                key: "Fabricdevelopmentrequest",
                path: "FabricDevelopmentrequest/Fabric-Development-Request",
                filepath: "FabricDevelopmentrequest/Fabric-Development-Request",
            },
        ]
    },
    {
        label: "Orders",
        key: "excel-import",
        path: "excel-import",
        icon: <FileExcelOutlined />,
        filepath: "excel-import",
        children: [
            {
                label: "Add Orders",
                key: "excel-import",
                path: "excel-import",
                filepath: "excel-import",
            },
            {
                label: "Compare Orders",
                key: "changes-view",
                path: "changes-view",
                filepath: "changes-view",
            },
            {
                label: "View Orders",
                key: "grid-view",
                path: "grid-view",
                filepath: "grid-view",
            },
            {
                label: "Uploaded Files",
                key: "revert-orders",
                path: "revert-orders",
                filepath: "revert-orders",
            },
            {
                label: "Versions Data",
                key: "version-grid",
                path: "version-grid",
                filepath: "version-grid",
            },
            // {
            //     label: "Phase Wise Data",
            //     key: "phase-wise-grid",
            //     path: "phase-wise-grid",
            //     filepath: "phase-wise-grid",
            // }
            {
                label: "Item Creation",
                key: "item-creation",
                path: "item-creation",
                filepath: "item-creation",
            },
        ],
    },
    {
        label: "Sample Development",
        key: "sample-development",
        path: "sample-development",
        filepath: "sample-development"
    }
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
