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
import { faShirt} from '@fortawesome/free-solid-svg-icons';

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
        label: "Masters",
        key: "masters",
        path: "masters",
        icon: <PicCenterOutlined />,
        filepath: "masters",
        children: [
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
                label: "Delivery Method",
                key: "delivery-methods",
                path: "delivery-methods/delivery-method-view",
                filepath: "delivery-methods/delivery-method-view",
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
            }
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
            }
        ],
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
                key: "style",
                path: "style/style-form",
                filepath: "style/style-form",
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
        ],
    },
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
