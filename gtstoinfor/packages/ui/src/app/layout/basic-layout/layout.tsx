import React, { useState } from 'react'
import { Layout, Menu, MenuProps } from 'antd';
import { Footer } from 'antd/es/layout/layout';
import { DollarOutlined, ProjectOutlined, SolutionOutlined, UserOutlined } from '@ant-design/icons'
import { Link, Outlet, HashRouter as Router, useNavigate } from 'react-router-dom';
import { CommonHeader } from '../header/header';
const { Sider, Content } = Layout;
const { SubMenu } = Menu;



export default function BasicLayout() {
    const [collapsed, setCollapsed] = useState(true);
    const [selectedMenu, setselectedMenu] = useState('/');
    const [subMenu, setSubmenu] = useState<string[]>([]);
    const navigate = useNavigate();
    type MenuItem = Required<MenuProps>['items'][number];


    const toggle = () => {
        setCollapsed(prevCollapsed => !prevCollapsed);
    };

    const menu = (e: any) => {
        console.log(e)
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
    const authdata: any = { roleId: 0 }

    const items: MenuProps['items'] = [
        getItem('Projects Dashboard', 'project-Dashboard', <ProjectOutlined />),
        getItem('Master', 'masters', <UserOutlined />, [
            getItem('Department', 'Departmentgrid'),
            // getItem('Plant', 'plant'),
        ]),

        getItem('Project Creation', 'project-creation-page', <ProjectOutlined />,),
        getItem('Projects View', 'project-list-grid', <UserOutlined />),
        authdata.roleId === 7 ?
            getItem('Projects Streamline', 'project-status-info-form', <ProjectOutlined />) : null,
        authdata.roleId === 7 ?
            getItem('Approved Projects', 'project-status-info-grid', <ProjectOutlined />) : null,
        getItem('Projects report', 'project-creation-reports', <ProjectOutlined />),
        authdata.roleId === 7 ?
            getItem('Project Action Items', 'project-action-items-form', <DollarOutlined />) : null,
        // getItem('CEO Approval', 'ceo-approval-form', <SolutionOutlined />),
    ];



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
                    <Menu mode="inline"
                        items={items}
                        onClick={menu}
                        openKeys={subMenu}
                        defaultOpenKeys={[]}
                        selectedKeys={[selectedMenu]}
                        onOpenChange={onOpenChange}
                        defaultSelectedKeys={['/']}
                    // style={{ paddingTop: '83px' }}
                    />
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
    )
}
