import React, { useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import Icon, { DollarOutlined, ProjectOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import { Link, Outlet, HashRouter as Router, useNavigate } from 'react-router-dom';
import { CommonHeader } from '../header/header';
import { useRecoilState } from 'recoil';
import { get } from 'http';
const { Sider, Content } = Layout;
const { SubMenu } = Menu;
import * as antdIcons from '@ant-design/icons';
import { useIAMClientState } from '../../nike/iam-client-react';




export default function BasicLayout() {
    const [collapsed, setCollapsed] = useState(true);
    const [selectedMenu, setselectedMenu] = useState('/');
    const [subMenu, setSubmenu] = useState<string[]>([]);
    const navigate = useNavigate();
    type MenuItem = Required<MenuProps>['items'][number];

    const { IAMClientAuthContext, dispatch } = useIAMClientState();



    const toggle = () => {
        setCollapsed(prevCollapsed => !prevCollapsed);
    };

    const menu = (e: any) => {
        if (e.keyPath.length < 2) {
            setSubmenu([])
            setselectedMenu(e.key)
        } else {
            setSubmenu(e.keyPath)
            setselectedMenu(e.key)
        }
        navigate(e.key)
    }
    const onOpenChange = (openKeys: string[]) => {
        setSubmenu(openKeys)
    }
    function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group',): MenuItem {
        return { key, icon, children, label, type, } as MenuItem;
    }
    const authdata = JSON.parse(localStorage.getItem('currentUser'))



    function renderIcon(iconType, iconName) {
        // // if (iconType === "antd") { 
        //     const SpecificIcon = antdIcons["SolutionOutlined"]; 
        //     return <SpecificIcon /> 
        // }
        // else {
        const SpecificIcon = antdIcons[iconName];
        return <Icon component={SpecificIcon} style={{ fontSize: '20px' }} />
        // }
    }

    const getSubMenu = (route) => {
        console.log(route)

        if (route && route[0].subMenuId && route.length) {
            return (
                <Menu.Item key={route[0].subMenuId} ><Link to={route[0].path}><span><span> {renderIcon(route[0].subMenuIconType, route[0].subMenuIconName)} <span>{route[0].subMenuName}</span> </span></span></Link> </Menu.Item>

            )
        } else {
            return (
                <div style={{ backgroundColor: 'white', color: 'white' }}>

                </div>

            )
        }
    }

    const getAllSubMenus = () => {
        console.log(localStorage.getItem("currentUser"));
        const subMenus = [];
        const menu = IAMClientAuthContext.menuAccessObject ? IAMClientAuthContext.menuAccessObject : [];
        console.log(menu)
        // const menuAccess = localStorage.getItem("currentUser")? JSON.parse(localStorage.getItem("currentUser"))["menuAccessObject"]:[];
        menu?.forEach(eachRoutes => {
            console.log(eachRoutes)
            subMenus.push(getSubMenu(eachRoutes.subMenuData));
        });
        return subMenus;
    }

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
                        marginTop: '83px',
                        borderRadius: '5px'
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
    )
}
