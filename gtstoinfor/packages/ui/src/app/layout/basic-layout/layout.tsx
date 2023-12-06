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
    const loginUser = userData?.user?.userName
    const loginUserRole = userData?.user?.roles
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
      console.log(IAMClientAuthContext.user)
    const menus = menuData.sort((a,b) => a.orderId - b.orderId);
    // console.log(menus)
        const processedMenuData = menus.map(menuItem => {
            const menuItems = menuItem.subMenuData.sort((a,b) => a.orderId - b.orderId);
          const processedSubMenuItems =  menuItems?.map(subMenuItem => (

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
                    title={'SAMPLING'}
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
                    token={{ header: { colorBgHeader: 'transparent' }, sider: { colorBgMenuItemSelected: colorPrimaryBg,colorMenuBackground:'#bae9ef42' } }}
                    route={{
                        key:menu,
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
                        // console.log(item)
                        return (
                            // <div
                            //     onClick={() => {
                            //         navigate(item?.path || "/");
                            //     }}
                            //     // style={{
                            //     //     backgroundColor: menu.includes(item.key) ? '#1890ff' : '',
                            //     //     color: menu.includes(item.key) ? '#fff' : '', // Adjust the text color
                            //     // }}
                            // >
                            //     {dom}
                            // </div>
                            <Link
                            to={item?.path || "/"}
                            onClick={(e) => {
                                navigate(item.path || "/");
                                                                }}
                        >
                            {dom}
                        </Link>
                        );
                    }}
                    
                    
                >
                  
                  
                        <Outlet />
                        <Footer style={{ textAlign: 'center', background: '#f0f2f5'}}>©2023 Design and Developed by SchemaX</Footer>

             </ProLayout> 
        
                    </ProConfigProvider>

             );
}
