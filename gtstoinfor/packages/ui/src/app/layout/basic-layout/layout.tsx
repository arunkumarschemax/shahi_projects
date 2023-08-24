import React, { useState } from 'react'
import { Button, Input, Layout, Menu, MenuProps, Switch, Tooltip, theme } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { DollarOutlined, ProjectOutlined, SolutionOutlined, UserOutlined, DashboardOutlined, LoginOutlined, GithubFilled, PlusCircleFilled, SearchOutlined, PicCenterOutlined, PoweroffOutlined, LogoutOutlined, FileExcelOutlined, CheckOutlined } from '@ant-design/icons'
import { Link, Outlet, HashRouter as Router, useNavigate } from 'react-router-dom';
import { CommonHeader } from '../header/header';
import { ProBreadcrumb, ProConfigProvider, ProSettings } from '@ant-design/pro-components';
import logo from './logo.png'
const { Sider, Content } = Layout;
const { SubMenu } = Menu;
import ProLayout, { DefaultFooter, MenuDataItem, SettingDrawer } from '@ant-design/pro-layout';
import { getOperatingSystem, treeRouter } from '../../utils/common';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { DarkModeIcon } from '../../icons/darkmode.icon';
import { LightModeIcon } from '../../icons/lightmode.icon';
const { useToken } = theme



export const baseRouterList = [
    {
        label: "Dashboard",
        key: "dashboard",
        path: "nike-dashboard",
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
            // {
            //     label: "Supplier",
            //     key: "supplier",
            //     path: "supplier/supplier-view",
            //     filepath: "supplier/supplier-view",
            // },
        ],
    },
    {
        label: "Nike",
        key: "nike",
        path: "nike",
        icon: <CheckOutlined />,
        filepath: "nike",
        children: [
            {
                label: "PO Data Upload",
                key: "file-import",
                path: "file-import",
                filepath: "file-import",
            },
            {
                label: "DPOM Data Sync",
                key: "dpom-sync",
                path: "dpom-sync",
                filepath: "dpom-sync",
            },
            {
                label: "Revert File",
                key: "file-revert",
                path: "file-revert",
                filepath: "file-revert",
            },
            {
                label: "Upload PDF",
                key: "pdf-upload",
                path: "pdf-upload",
                filepath: "pdf-upload",
            },
            {
                label: "Nike Orders Register",
                key: "order-acceptance",
                path: "order-acceptance",
                filepath: "order-acceptance",
            }
        ],
    },
    {
        label: "Reports",
        key: "Reports",
        path: "Reports",
        // icon: < />,
        filepath: "Reports",
        children: [
            {
                label: "PO Changes (PO Mgmt)",
                key: "compare-orders",
                path: "compare-orders",
                filepath: "compare-orders",
            },
            {
                label: "PO Changes (Shipment)",
                key: "shipment-compare",
                path: "shipment-compare",
                filepath: "shipment-compare",
            },
            {
                label: "PO Changes (VAS)",
                key: "vas-compare",
                path: "vas-compare",
                filepath: "vas-compare",
            },
            {
                label: "Factory PPM Report",
                key: "factory-report",
                path: "factory-report",
                filepath: "factory-report",
            },
            {
                label: "Upload PDF",
                key: "pdf-upload",
                path: "pdf-upload",
                filepath: "pdf-upload",
            }, {
                label: "PPM Marketing Report",
                key: "ppm-report",
                path: "ppm-report",
                filepath: "ppm-report",
            },
            {
                label: "Divert Report",
                key: "divert-report",
                path: "divert-report",
                filepath: "divert-report",
            },
            {
                label: "Fabric Tracker Report",
                key: "fabrick-tracker-report",
                path: "fabrick-tracker-report",
                filepath: "fabrick-tracker-report",
            },
            {
                label: "Shipment Planning",
                key: "shipment-planning-chart",
                path: "shipment-planning-chart",
                filepath: "shipment-planning-chart",
            },

            {
                label: "Shipment Tracker",
                key: "shipment-report",
                path: "shipment-report",
                filepath: "shipment-report",
            }
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
        <ProConfigProvider dark={dark}>
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


                            <Tooltip placement="bottom" title={'Switch mode'}>

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
