
import { Button, Layout, Menu, Tooltip, theme } from 'antd';
import Icon, { SolutionOutlined, LogoutOutlined, EnvironmentOutlined, AppstoreOutlined, UserOutlined, NodeIndexOutlined, CarOutlined, TeamOutlined, FullscreenOutlined, InfoCircleOutlined, ProjectOutlined, FormOutlined, CheckSquareOutlined, FileProtectOutlined, HddOutlined } from '@ant-design/icons';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { SubMenu } from 'rc-menu';
import doclogo from './doclogo.jpg'
import * as antdIcons from '@ant-design/icons';
import { logout, useIAMClientState } from '../../common';
// const icons = {
//     TDSIcon: TDSIcon,
//     ApprovalIcon: ApprovalIcon
// }
// import { VendorGrid } from '@transport-management-system/ui/components/vendor-management';
const { Header, Content, Footer, Sider } = Layout;
const BasicLayout = () => {
    const { IAMClientAuthContext, dispatch } = useIAMClientState();
    const userData = JSON.parse(localStorage.getItem('currentUser'))
    const loginUser = userData?.user?.userName
    const loginUserRole = userData?.user?.roles
    // console.log(userData.user.userName)
    
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
                // <SubMenu key={route[0].subMenuId} title={<span> {renderIcon(route[0].subMenuIconType, route[0].subMenuIconName)} <span>{route[0].subMenuName}</span> </span>}  >
                //     {/* <div style={{backgroundColor:'white',color:'white'}}>

                //     {route.subMenuData.map(item => getSubMenu(item))}
                //     </div> */}
                // </SubMenu>
            )
        } else {
                return(
                    <div style={{backgroundColor:'white',color:'white'}}>
                       
                    </div>
    
                ) 
        }
    }

    const getAllSubMenus = () => {
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
    const logOut = () => {
        logout(dispatch);
    }

    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout className="layout" style={{width:'102%', paddingLeft:'0px'}}>
            <Header style={{ alignItems: 'center', backgroundColor: '#000', height: 83, marginTop:'-8px' }}>
                <div style={{ float: 'left', marginTop: '0%' }}>
                    {/* <img src={logo} width={200} height={52}></img> */}
                    <img src={doclogo} width={150} height={80}></img>
                </div>
                <h1 style={{color: 'white',textAlign: 'center',marginTop:'0.2px'}}>E-Document Management</h1>
                <Tooltip title='Logout'><Button type="default" icon={<LogoutOutlined />} style={{ float: 'right', marginTop: '-5.4%' }} onClick={logOut}>{'Hi '+loginUser}<div style={{color:'#f3bf13',marginTop:'10px',fontStyle:'italic'}}>{loginUserRole}</div></Button></Tooltip>
                {/* <>{userData.user.roles}</> */}
                <Menu
                    theme="light"
                    mode="horizontal"
                    // defaultSelectedKeys={['1']}
                    // style={{ marginTop: '20px' }}
                    // 230
                    selectedKeys={[]}
                    style={{ backgroundColor: '#000', width: '75%', height: '61%', marginLeft: '160px', marginTop: '-3.8%',color:'white' }}
                >
                    
                    {getAllSubMenus()}
                </Menu>
       
            </Header>
            <Content style={{ padding: '0 50px', minHeight: '615px', backgroundColor: 'beige' }}>
                <br />
                {/* <IndentDashboard/> */}
                <Outlet />
            </Content >
            <Footer style={{ textAlign: 'center',  height:'15px' }}>ⓒ2023 Design and Developed by SchemaX Tech</Footer>
        </Layout >
    );
};

export default BasicLayout;