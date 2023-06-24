import React, { useState } from 'react'
import { Input, Layout, Menu, MenuProps, Switch, Tooltip } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { DollarOutlined, ProjectOutlined, SolutionOutlined, UserOutlined, DashboardOutlined, LoginOutlined, GithubFilled, PlusCircleFilled, SearchOutlined } from '@ant-design/icons'
import { Link, Outlet, HashRouter as Router, useNavigate } from 'react-router-dom';
import { CommonHeader } from '../header/header';
import { ProBreadcrumb, ProConfigProvider, ProSettings } from '@ant-design/pro-components';
import logo from './logo.png'
const { Sider, Content } = Layout;
const { SubMenu } = Menu;
import ProLayout, { DefaultFooter, MenuDataItem } from '@ant-design/pro-layout';
import { getOperatingSystem, treeRouter } from '../../utils/common';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
import { useToken } from 'antd/es/theme/internal';

export const baseRouterList = [
    {
        label: 'Dashboard',
        key: 'dashboard',
        path: 'dashboard',
        icon: <DashboardOutlined />,
        filepath: 'pages/dashboard/index.tsx',
    },
    {
        label: 'User Management',
        key: 'user-management',
        path: 'user-management',
        icon: <UserOutlined />,
        filepath: '../',
        children: [{
            label: 'Add User',
            key: 'users-from',
            path: 'users-from',
            icon: <UserOutlined />,
            filepath: 'users-form.tsx',
        },
        {
            label: 'View User',
            key: 'users-view',
            path: 'users-view',
            icon: <UserOutlined />,
            filepath: 'users-view.tsx',
        }
        ]
    },
];


export default function BasicLayout() {
    const [pathname, setPathname] = useState(location.pathname);
    const [dark, setDark] = useState(false);
    const navigate = useNavigate();
    return (
        <ProConfigProvider dark={dark}  >
            <div
                id="main-layout"
                style={{
                    height: '100vh',
                }}
            >
                <ProLayout
                    title='Shahi'
                    locale='en-US'
                    siderWidth={200}
                    colorPrimary='#29397d'
                    headerContentRender={() => <ProBreadcrumb />}
                    logo={<img src={logo} />}
                    fixSiderbar
                    layout='mix'
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
                    actionsRender={(props) => {
                        if (props.isMobile) return [];
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
                                <Switch
                                    checkedChildren="🌜"
                                    unCheckedChildren="🌞"
                                    checked={dark}
                                    onChange={(v) => setDark(v)}
                                />
                            </Tooltip>
                            ,
                            <Tooltip placement="bottom" title={'Sign Out'}>
                                <a>
                                    <LoginOutlined
                                        onClick={async () => {
                                            // await signOut(dispatch);
                                            navigate('/login');
                                        }}
                                    />
                                </a>
                            </Tooltip>,
                        ];
                    }}
                    menuItemRender={(item, dom) => (
                        <Link
                            to={item?.path || '/'}
                            onClick={() => {
                                setPathname(item.path || '/');
                            }}
                        >
                            {dom}
                        </Link>
                    )}
                    onMenuHeaderClick={() => navigate('/')}

                >
                    <Outlet />
                </ProLayout>
            </div>
        </ProConfigProvider >
    )
}
