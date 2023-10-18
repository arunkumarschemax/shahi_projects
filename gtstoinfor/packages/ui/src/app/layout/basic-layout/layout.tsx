import Icon, * as antdIcons from '@ant-design/icons';
import { Avatar, Button, Col, Dropdown, Layout, Menu, MenuProps, Row, Tooltip } from 'antd';
import React, { useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { logout, useIAMClientState } from '../../common';
import { ExceptionComponent } from '../../common/exception-handling';
import { IconType } from '../../common/iam-client-react/constants/icon-type';
import { SchemaxAIDocx, PriceForm, VendorBranchInfoGrid, BuyersView } from '../../components';
import { OnlineStatus } from '../header';
import { components } from './all-components';
import { svgIcons } from './all-svg-icons';
import './common.css';
import logoLight from './xpparel-logo.jpeg';
import InvoiceReport from '../../components/reports/innvoice-reports';

const { Header, Content } = Layout;



function renderIcon(iconType, iconName) {
    if (iconType === IconType.SYS_LIB) {
        const SpecificIcon = antdIcons[iconName];
        return <SpecificIcon />
    }
    else {
        const SpecificIcon = svgIcons[iconName];
        return <Icon component={SpecificIcon} style={{ fontSize: '20px' }} />
    }
}

const totalMenus = [];

const getSubMenu = (route) => {
    if (route && route.subMenuData && route.subMenuData.length) {
        return {
            key: `${route.menuName}`,
            icon: renderIcon(route.menuIconType, route.menuIconName),
            label: route.menuName,
            children: route.subMenuData.map(item => getSubMenu(item))
        }
    } else {
        return {
            key: `${route.menuName}$@${route.subMenuName}`,
            icon: renderIcon(route.subMenuIconType, route.subMenuIconName),
            label: (<Link to={`${route.path}`}><span>{route.subMenuName}</span></Link>),
        }
    }
}

const getRoute = (route) => {
    if (route && route.subMenuData && route.subMenuData.length) {
        return route.subMenuData.map(item => getRoute(item))
    } else {
        return <Route key={`${route.key}`} path={`/${route.path}`} element={components[route.component]} />
    }
}

export const BasicLayout: React.FC = () => {
    const { IAMClientAuthContext, dispatch } = useIAMClientState();
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const getAllRoutes = () => {
        const subMenus: any[] = [];
        const menus = IAMClientAuthContext.menuAccessObject ? IAMClientAuthContext.menuAccessObject : totalMenus;
        menus.forEach(eachRoutes => {
            const abc = getRoute(eachRoutes);
            subMenus.push(abc);
        });
        console.log(subMenus)
        return subMenus;
    }

    const getAllSubMenus = () => {
        const subMenus: MenuProps['items'] = [];
        const menus = IAMClientAuthContext.menuAccessObject ? IAMClientAuthContext.menuAccessObject : totalMenus;
        menus.forEach(eachRoutes => {
            subMenus.push(getSubMenu(eachRoutes));
        });
        return subMenus;
    }

    const logoutHandler = () => {
        logout(dispatch);
    }
    const uitems: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <>
                    Name: <b>{IAMClientAuthContext.user.userName}</b>
                </>
            ),
        },
        {
            key: '2',
            label: (
                <>
                    Roles: <b>{IAMClientAuthContext.user.roles}</b>
                </>
            ),
        },
        {
            key: '3',
            label: (
                <Button
                    onClick={() => logoutHandler()}
                >
                    logout
                </Button>
            ),
        },
    ];



    return (
        <Layout>
            <Header className='top-header' style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                height: '55px',
                background: '#FFFFFF',
                paddingInlineStart: '10px',
                paddingInlineEnd: '20px'
            }}>
                <Col flex={'auto'}>
                    <div className="logo" ><img src={logoLight} /><p style={{ color: '#ff00c8', fontSize: '25px', fontWeight: '700' }}>Schemax-AI-DocX</p></div>
                </Col>
                <Col flex={'auto'}>
                    <Menu theme="light" mode="horizontal" style={{ width: '100%', lineHeight: '3.1' }} defaultSelectedKeys={['3']} items={getAllSubMenus()} />
                </Col>
                <Row >
                    <Col></Col>
                    <Col>

                        <Dropdown menu={{ items: uitems }} placement="bottomLeft" arrow>
                            <div>
                                <OnlineStatus >
                                    <Tooltip title={IAMClientAuthContext.user.userName}>
                                        <Avatar style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} size="small" onClick={() => setCollapsed(!collapsed)}> {IAMClientAuthContext.user.userName.charAt(0)} </Avatar>
                                    </Tooltip>
                                </OnlineStatus>
                            </div>
                        </Dropdown>
                    </Col>
                </Row>
            </Header>
            <Layout style={{ minHeight: '100vh' }}>
                <Layout >

                    <Content
                        style={{
                            padding: 10,
                            margin: 0,
                            minHeight: 300,
                            backgroundColor: 'white'
                            //   background: colorBgContainer,
                        }}
                    >

                        <Routes>
                            {getAllRoutes().map(rec => rec)}
                            <Route path="/VendorBranchInfoGrid" element={<VendorBranchInfoGrid />} />
                            <Route path="/doc-extract-form" element={<SchemaxAIDocx />} />
                            <Route path="/BuyersView" element={<BuyersView />} />
                            <Route path="/invoice-report" element={<InvoiceReport/>} />
                            <Route path="/priceform" element={<PriceForm />} />
                            <Route path='/*' element={<ExceptionComponent statusCode={404} statusMessage='Sorry, the page you visited does not exist.' />} />
                            <Route path='/403' element={<ExceptionComponent statusCode={403} statusMessage='Sorry, you are not authorized to access this page.' />} />
                        </Routes>
                    </Content>
                </Layout>
            </Layout>
        </Layout >
    );
};

export default BasicLayout;