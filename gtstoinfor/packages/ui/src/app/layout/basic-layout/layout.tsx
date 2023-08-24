import React, { useState } from 'react'
import { Button, Input, Layout, Menu, MenuProps, Switch, Tooltip, theme } from 'antd';
import { Footer, Header } from 'antd/es/layout/layout';
import { DollarOutlined, ProjectOutlined, SolutionOutlined, UserOutlined, DashboardOutlined, LoginOutlined, GithubFilled, PlusCircleFilled, SearchOutlined, PicCenterOutlined, PoweroffOutlined, LogoutOutlined, FileExcelOutlined } from '@ant-design/icons'
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
import { logout, useIAMClientState } from '../../iam-client-react';
const { useToken } = theme
import * as antdIcons from '@ant-design/icons';



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
        ],
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
    const [collapsed, setCollapsed] = useState(true);
    const [pathname, setPathname] = useState(location.pathname);
    const [dark, setDark] = useState(false);
    const navigate = useNavigate();
    const [settings, setSettings] = useState<any>({ colorPrimary: '1890ff', fixedHeader: true })
    const { token: { colorPrimary, colorPrimaryActive, colorPrimaryBg } } = useToken()


    const { IAMClientAuthContext, dispatch } = useIAMClientState();
    const userData = JSON.parse(localStorage.getItem('currentUser'))
    const loginUser = userData.user.userName
    const loginUserRole = userData.user.roles
    console.log(userData.user.userName)

    const toggle = () => {
        setCollapsed(prevCollapsed => !prevCollapsed);
    };
    
    function renderIcon(iconType, iconName) {
        // if (iconType === "antd") { 
            const SpecificIcon = antdIcons["SolutionOutlined"]; 
            return <SpecificIcon /> 
        // }
        // else {
        //     const SpecificIcon = icons[iconName];
        //     return <Icon component={SpecificIcon} style={{ fontSize: '20px' }} /

    }

    const getSubMenu = (route) => {
       
        if (route && route.subMenuData && route.subMenuData.length) {
            return (
                <SubMenu key={route.menuId} title={<span> {renderIcon(route.iconType, route.iconName)} <span>{route.menuName}</span> </span>}  >
                    <div style={{backgroundColor:'white',color:'black'}}>

                    {route.subMenuData.map(item => getSubMenu(item))}
                    </div>
                </SubMenu>
            )
        } else {
                return(
                    <div style={{backgroundColor:'white',color:'black'}}>
                        <Menu.Item key={route.subMenuId} ><Link to={route.path}><span><span> {route.icon} <span>{route.subMenuName}</span> </span></span></Link> </Menu.Item> 
                    </div>
    
                ) 
        }
    }
    const getAllSubMenus = () => {
        // console.log(localStorage.getItem("currentUser"));
        const subMenus = [];
        const menu = IAMClientAuthContext.menuAccessObject ? IAMClientAuthContext.menuAccessObject : [];
        // const menuAccess = localStorage.getItem("currentUser")? JSON.parse(localStorage.getItem("currentUser"))["menuAccessObject"]:[];
        menu?.forEach(eachRoutes => {
            subMenus.push(getSubMenu(eachRoutes));
        });
        return subMenus;
    }
    const logOut = () => {
        logout(dispatch);
    }
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout style={{ minHeight: '100vh' }}>
            {/* <Router> */}
                <Layout className="site-layout" style={{ background: ' #f0f2f5' }}>
                    <Sider
                        className='layout'
                        trigger={null}
                        breakpoint='lg'
                        collapsedWidth='60'
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            background: '#fff',
                            marginTop: '83px' ,
                            borderRadius:'5px'
                        }}
                    >           
                    <Menu
                    theme="light"
                    mode="inline"
                    // defaultSelectedKeys={['1']}
                    // style={{ marginTop: '20px' }}
                    // 230
                    selectedKeys={[]}
                    // style={{ backgroundColor: '#000', width: '75%', height: '61%', marginLeft: '160px', marginTop: '-3.8%',color:'white' }}
                >
                    
                    {getAllSubMenus()}
                </Menu>         
                        {/* <Menu mode="inline"
                            items={items}
                            onClick={menu}
                            openKeys={subMenu}
                            defaultOpenKeys={[]}
                            selectedKeys={[selectedMenu]}
                            onOpenChange={onOpenChange}
                            defaultSelectedKeys={['/']}
                            // style={{ paddingTop: '83px' }}
                        /> */}
                        {/* <Menu mode="inline"
                            defaultSelectedKeys={['/']}
                            style={{ paddingTop: '20px' }}
                        >
                            <Menu.Item >
                                <span>
                                    <Link to='/project-user-creation-page' />
                                </span>
                                <span><UserOutlined /></span>
                                <span>User Creation</span>
                            </Menu.Item>
                            <Menu.Item >
                            <span>
                                <Link to='/project-Dashboard' />
                            </span>
                            <span><ProjectOutlined /></span>
                            <span>Projects Dashboard</span>
                        </Menu.Item>
                        </Menu> */}

                        {/* <Menu mode="inline"
                            defaultSelectedKeys={['/']}
                            style={{ paddingTop: '20px' }}
                        >
                            <Menu.Item >
                                <span>
                                    <Link to='/project-creation-reports' />
                                </span>
                                <span><UserOutlined /></span>
                                <span>Project Creation Reports</span>
                            </Menu.Item>
                        </Menu> */}


                    </Sider>
                    <CommonHeader key={Date.now()} toggle={toggle} collapsed={collapsed} />
                    <Content
                        className="site-layout-background"
                        style={{
                            marginTop: '70px',
                            padding: 14,
                            height: '100%',
                            marginLeft: 198
                        }}
                    >
                        <Outlet />
                    </Content>
                    {/* <Footer style={{ textAlign: 'center', background: '#f0f2f5' }}>©2023 Design and Developed by SchemaX</Footer> */}
                </Layout>
            {/* </Router> */}
        </Layout>
    );
        
    // return (
    //     <ProConfigProvider dark={dark}  >

    //         <div
    //             id="main-layout"
    //             style={{
    //                 height: '100vh',
    //             }}
    //         >
    //             <ProLayout
    //                 title='SHAHI'
    //                 locale='en-US'
    //                 siderWidth={240}
    //                 colorPrimary='#29397d'
    //                 headerContentRender={(props) => props.layout !== 'side' && document.body.clientWidth > 1000 ? <ProBreadcrumb /> : undefined}
    //                 logo={<img src={logo} />}
    //                 fixSiderbar
    //                 layout='mix'
    //                 token={{ header: { colorBgHeader: 'transparent' }, sider: { colorBgMenuItemSelected: colorPrimaryBg } }}
    //                 route={{
    //                     path: '/',
    //                     routes: treeRouter(baseRouterList),
    //                 }}
    //                 location={{
    //                     pathname,
    //                 }}
    //                 avatarProps={{
    //                     src: 'https://hzdjs.cn/blog/logo.jpg',
    //                     size: 'small',
    //                     title: 'admin',
    //                 }}
    //                 contentStyle={{ paddingBlock: '10px', paddingInline: '10px' }}
    //                 actionsRender={(props) => {
    //                     // if (props.isMobile) return [];
    //                     return [

    //                         // <div
    //                         //     key="SearchOutlined"
    //                         //     aria-hidden
    //                         //     style={{
    //                         //         display: 'flex',
    //                         //         alignItems: 'center',
    //                         //         marginInlineEnd: 24,
    //                         //     }}
    //                         //     onMouseDown={(e) => {
    //                         //         e.stopPropagation();
    //                         //         e.preventDefault();
    //                         //     }}
    //                         // >
    //                         //     <Input
    //                         //         style={{
    //                         //             borderRadius: 4,
    //                         //             marginInlineEnd: 12,
    //                         //             backgroundColor: 'rgba(0,0,0,0.03)',
    //                         //         }}
    //                         //         prefix={
    //                         //             <SearchOutlined
    //                         //                 style={{
    //                         //                     color: 'rgba(0, 0, 0, 0.15)',
    //                         //                 }}
    //                         //             />
    //                         //         }
    //                         //         placeholder="Search"
    //                         //         bordered={false}
    //                         //     />
    //                         //     <PlusCircleFilled
    //                         //         style={{
    //                         //             color: 'var(--ant-primary-color)',
    //                         //             fontSize: 24,
    //                         //         }}
    //                         //     />
    //                         // </div>
    //                         <Tooltip placement="bottom" title={'Switch mode'}>
    //                             {/* <Switch
    //                                 checkedChildren="🌜"
    //                                 unCheckedChildren="🌞"
    //                                 checked={dark}
    //                                 onChange={(v) => setDark(v)}
    //                             /> */}
    //                             <Button
    //                                 size="middle"
    //                                 style={{ borderRadius: "5px" }}
    //                                 onClick={() => {
    //                                     setDark(!dark);
    //                                 }}
    //                                 icon={!dark ? <DarkModeIcon /> : <LightModeIcon />}
    //                             ></Button>
    //                         </Tooltip>,
    //                         <Tooltip placement="bottom" title={"Sign Out"}>
    //                             <Button
    //                                 size="middle"
    //                                 style={{ borderRadius: "5px" }}
    //                                 icon={
    //                                     <LogoutOutlined
    //                                         onClick={async () => {
    //                                             // await signOut(dispatch);
    //                                             navigate("/login");
    //                                         }}
    //                                     />
    //                                 }
    //                             ></Button>
    //                         </Tooltip>,
    //                     ];
    //                 }}
    //                 menuItemRender={(item, dom) => {
    //                     return (
    //                         <Link
    //                             to={item?.path || "/"}
    //                             onClick={() => {
    //                                 setPathname(item.path || "/");
    //                             }}
    //                         >
    //                             {dom}
    //                         </Link>
    //                     );
    //                 }}
    //                 onMenuHeaderClick={() => navigate("/")}
    //             >
    //                 <Outlet />
    //             </ProLayout>
    //         </div>
    //     </ProConfigProvider>
    // );
}
