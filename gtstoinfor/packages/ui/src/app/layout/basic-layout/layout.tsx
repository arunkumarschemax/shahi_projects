import React, { useEffect, useState } from 'react'
import { Button, Layout, Menu, Tooltip, theme } from 'antd';
import { Content, Footer } from 'antd/es/layout/layout';
import Icon, { UserOutlined, DashboardOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link, Outlet, HashRouter as Router, useNavigate } from 'react-router-dom';
import { ProBreadcrumb, ProConfigProvider } from '@ant-design/pro-components';
import logo from './logo.png'
import xpperal from './xapp.png'
import ProLayout from '@ant-design/pro-layout';
import { treeRouter } from '../../utils/common';
import { DarkModeIcon } from '../../icons/darkmode.icon';
import { LightModeIcon } from '../../icons/lightmode.icon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGears, faGlobe, faHatCowboy, faLayerGroup, faPeopleRoof, faShirt, faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { logout, useIAMClientState } from '../../common/iam-client-react';
import SubMenu from 'antd/es/menu/SubMenu';
import * as antdIcons from '@ant-design/icons';
import Sider from 'antd/es/layout/Sider';
import { CommonHeader } from '../header/header';
import { icons } from 'antd/es/image/PreviewGroup';
import { color } from 'highcharts';
import { title } from 'process';

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
                key: "accountcontrolobject",
                path: "accountcontrolobject/accountcontrolobject-view",
                filepath: "accountcontrolobject/accountcontrolobject-view",
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
            },{
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
            {
                label: "Fabric Approval",
                key: "fabric-approval-request",
                path: "fabric-approval-request",
                filepath: "fabric-approval-request",
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
                label: "Feature Creation",
                key: "feature-creation",
                path: "feature-creation",
                filepath: "feature-creation",
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
            {
                label: "CO Amendment",
                key: "co-amendment",
                path: "co-amendment",
                filepath: "co-amendment",
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
    {
        label: "Product Structure(BOM)",
        key: "productstructure",
        path: "product-structure",
        filepath: "product-structure",
        children:[
            
            {
                label: "SMV Efficiency",
                key: "smvefficiency",
                path: "productstructure/smv-efficiency",
                filepath: "productstructure/smv-efficiency",
            },
            {
                label: "Fg-Rm Mapping",
                key: "fgrmmapping",
                path: "fg-rm-mapping",
                filepath: "fg-rm-mapping",
            },
          
         
        ]
    },
    {
        label: "RM Sku",
        key: "rmSkus",
        // icon:<div style={{fontSize:"13px",marginLeft:"-1px",fontWeight:"bold",marginTop:"-1px"}}>⚙️</div>,
        path: "rmskus/rm-skus",
        filepath: "rmskus/rm-skus"
    }
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
    const [collapsed, setCollapsed] = useState(true);
    const [menuData, setMenuData] = useState([]);
    const { IAMClientAuthContext, dispatch } = useIAMClientState();
    const userData = JSON.parse(localStorage.getItem('currentUser'))
    const loginUser = userData.user.userName
    const loginUserRole = userData.user.roles
    const [collapsedMenus, setCollapsedMenus] = useState({})   
    let menu
    function renderIcon(menuId, iconName) {
        const emojiCodePattern = /^&#\d+;$/;
    
        if (emojiCodePattern.test(iconName)) {
            const emojiCharacter = String.fromCodePoint(parseInt(iconName.slice(2, -1), 10));
            return <span key={menuId} dangerouslySetInnerHTML={{ __html: emojiCharacter }} />;
        } else {
            // Handle other icon types if needed
            return null; // Return null if the icon is not valid
        }
    
   
    //    return <p>{iconName}</p>
        }

        const toggle = () => {
            console.log("Toggling menu...");
            setCollapsed(prevCollapsed => !prevCollapsed);
        };
        
        const handleMenuHeaderClick = () => {
            console.log("Menu header clicked...");
            toggle();
        };
        
        
        const toggleMenu = (menuId) => {
            setCollapsedMenus((prevMenus) => {
                return {
                    ...prevMenus,
                    [menuId]: !prevMenus[menuId], // Toggle the collapse state for the specific menuId
                };
            });
        };

        const handleMenuClick = (e) => {
            if (e.domEvent) {
                e.domEvent.stopPropagation();
            }
        };
        // const handleMenuClick = (e) => {
        //     e.domEvent.stopPropagation();
        // }
   
    const getAllSubMenus = () => {
        menu =IAMClientAuthContext.user ? IAMClientAuthContext.user : '';
        const menuData = IAMClientAuthContext.menuAccessObject ? IAMClientAuthContext.menuAccessObject : [];
    //   console.log(menuData)
        const processedMenuData = menuData
        .filter(menuItem => menuItem.menuName !== "Sample Development")
        .map(menuItem => {
            
          const processedSubMenuItems =  menuItem.subMenuData?.map(subMenuItem => (
            {
                path: subMenuItem.path,
                label: subMenuItem.subMenuName,
                key: subMenuItem.subMenuId, 
            //  icon:renderIcon(subMenuItem.subMenuIconType,subMenuItem.subMenuIconName),
          }))
          return {
            key: menuItem.menuId, 
            label: menuItem.menuName,
            icon: renderIcon(menuItem.menuId,menuItem.menuIconName),
            path:menuItem.path?menuItem.path:'/',
            children: processedSubMenuItems.length > 0 ? processedSubMenuItems : null,

          };
        });
      
        return processedMenuData;
      };
      
    const logOut = () => {
        logout(dispatch);
    }
    
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const [key, setKey] = useState("");

    const handleClick = (e) => {
        setKey(e)
    }
  

    return (
        <ProConfigProvider dark={dark} >
       
        <ProLayout
                    title={'CRM'}
                    locale='en-US'
                    siderWidth={240}
                    colorPrimary='#29397d'
                    breakpoint={false}
                    selectedKeys={menu}
                    // collapsed={collapsed}
                    headerContentRender={(props) => props.layout !== 'side' && document.body.clientWidth > 1000 ? <ProBreadcrumb /> : undefined}
                    logo={
                    <img src={xpperal} style={{marginLeft:'20px',float:'left',height:'55px'}} 
                    />}
                    layout={'mix'}
                    token={{ header: { colorBgHeader: 'transparent' }, sider: { colorBgMenuItemSelected: colorPrimaryBg,colorMenuBackground:'azure' } }}
                    route={{
                        path: '/',
                        routes:treeRouter(getAllSubMenus()),
                    }}
                    location={{
                        pathname,
                    }}
                    avatarProps={{
                        src: 'https://hzdjs.cn/blog/logo.jpg',
                        size: 'small',
                        title: <div style={{color:'brown'}}><h3><b>{menu.userName}</b></h3></div>,
                    }}
                    
                    
                    contentStyle={{ paddingBlock: '10px', paddingInline: '10px' }}
                    actionsRender={(props) => {
                        // if (props.isMobile) return [];
                        return [

                           
                            <Tooltip placement="bottom" title={'Switch mode'}>
                               
                               
                                <Button
                                    size="middle"
                                    style={{ borderRadius: "5px",backgroundColor:"blanchedalmond" }}
                                    onClick={() => {
                                        setDark(!dark);
                                    }}
                                    icon={!dark ? <DarkModeIcon /> : <LightModeIcon />}
                                ></Button>
                            </Tooltip>,
                            <Tooltip placement="bottom" title={"Sign Out"}>
                                <Button
                                    size="middle"
                                    style={{ borderRadius: "5px",backgroundColor:"blanchedalmond"  }}
                                    icon={
                                        <LogoutOutlined
                                            onClick={logOut}
                                        />
                                    }
                                ></Button>
                            </Tooltip>,
                        ];
                    }}
                    
                    // menuItemRender={(item, dom) => {
                    //                             return (
                    //         <Link
                    //             to={item?.path || "/"}
                    //             onClick={(e) => {
                    //                 // e.preventDefault();
                    //                 // handleMenuClick(e)
                    //                 // e.stopPropagation();
                    //                 setPathname(item.path || "/");
                                    
                    //                                                 }}
                    //         >
                    //             {dom}
                    //         </Link>
                    //     );
                    // }}
                    menuItemRender={(item, dom) => {
                        // const navigate = useNavigate();
                    
                        return (
                            <div
                                onClick={() => {
                                    navigate(item?.path || "/");
                                }}
                                // style={{
                                //     backgroundColor: menu.includes(item.key) ? '#1890ff' : '',
                                //     color: menu.includes(item.key) ? '#fff' : '', // Adjust the text color
                                // }}
                            >
                                {dom}
                            </div>
                        //     <Link
                        //     to={item?.path || "/"}
                        //     onClick={(e) => {
                        //         setPathname(item.path || "/");
                                
                        //                                         }}
                        // >
                        //     {dom}
                        // </Link>
                        );
                    }}
                    
                    
                >
                  
                  
                        <Outlet />
                        <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>©2023 Design and Developed by SchemaX</Footer>

             </ProLayout> 
        

// {/* <div
//                 id="main-layout"
//                 style={{
//                     height: '100vh',
//                 }}
//             >
//                 <Layout
               
//                 className="site-layout" style={{ background: ' #f0f2f5' }}>
//                     <Sider
//                         className='layout'
//                         trigger={null}
//                         breakpoint='lg'
//                         collapsedWidth='60'
//                         style={{
//                             overflow: 'auto',
//                             height: '100vh',
//                             position: 'fixed',
//                             left: 0,
//                             background: '#fff',
//                             marginTop: '56px' ,
//                             borderRadius:'5px'
//                         }}
//                     >           
//                     <Menu
//                     theme="light"
//                     mode="inline"
//                     selectedKeys={[key]}
//                 >
//                   {getAllSubMenus()}
//                 </Menu>         
//                   </Sider>
//                     <CommonHeader key={Date.now()} collapsed={collapsed} toggle={toggle}/>
//                     <Content
//                         className="site-layout-background"
//                         style={{
//                             marginTop: '40px',
//                             padding: 14,
//                             height: '100%',
//                             marginLeft: 198
//                         }}
//                     >
//                         <Outlet />
//                     </Content>
//                     <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>©2023 Design and Developed by SchemaX</Footer>
//                 </Layout>

//             </div>  */}
                    </ProConfigProvider>

             );
}
