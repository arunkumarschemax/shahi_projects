import { Button, Layout, Menu, Tooltip, theme } from 'antd';
import Icon, { SolutionOutlined, LogoutOutlined, EnvironmentOutlined, AppstoreOutlined, UserOutlined, NodeIndexOutlined, CarOutlined, TeamOutlined, FullscreenOutlined, InfoCircleOutlined, ProjectOutlined, FormOutlined, CheckSquareOutlined, FileProtectOutlined, HddOutlined } from '@ant-design/icons';
import { Link, Outlet, Route, Routes } from 'react-router-dom';
import { SubMenu } from 'rc-menu';
import * as antdIcons from '@ant-design/icons';
import schemaxlogo from './xpparel-logo.jpeg'
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
    const loginUser = userData.user.userName
    const loginUserRole = userData.user.roles
    // console.log(userData.user.userName)
    
    function renderIcon(iconType, iconName) {
        // if (iconType === "antd") { 
            // const SpecificIcon = antdIcons["SolutionOutlined"]; 
            // return <SpecificIcon /> 
        // }
        // else {
        //     const SpecificIcon = icons[iconName];
        //     return <Icon component={SpecificIcon} style={{ fontSize: '20px' }} />
        const SpecificIcon = antdIcons[iconName];
        console.log(SpecificIcon)
            return <Icon component={SpecificIcon} style={{ fontSize: '20px' }} />
        // }
    }
    const getSubMenu = (route) => {
       
        if (route && route.subMenuData && route.subMenuData.length) {
            return (
                <SubMenu key={route.menuId} title={<span> {renderIcon(route.iconType, route.iconName)} <span>{route.menuName}</span> </span>}  >
                    <div style={{backgroundColor:'white',color:'white'}}>

                    {route.subMenuData.map(item => getSubMenu(item))}
                    </div>
                </SubMenu>
            )
        } else {
                return(
                    <div style={{backgroundColor:'white',color:'white'}}>
                        {route.subMenuName !== 'Vehicle Inspection Track' ? (<Menu.Item key={route.subMenuId} ><Link to={route.path}><span><span> {route.icon} <span>{route.subMenuName}</span> </span></span></Link> </Menu.Item>) : (<></>)}
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
        <Layout className="layout" style={{marginTop:'-8px', width:"104%", marginLeft:"-8px"}}>
            <Header style={{ alignItems: 'center', backgroundColor: '#001529', minHeight: "85px", }}>
                <div style={{ float: 'left', marginTop: '2px', marginLeft:'-46px' }}>
                    <img src={schemaxlogo} width={150} height={80}></img>
                </div>
                <h1 style={{color: '#f3bf13',textAlign: 'center',marginTop:'0.2px'}}>Scan Document Management</h1>
                <Tooltip title='Logout'><Button type="default" icon={<LogoutOutlined />} style={{ float: 'right', marginTop: '-5.4%' }} onClick={logOut}>{'Hi '+loginUser}<div style={{color:'#f3bf13',marginTop:'10px',fontStyle:'italic'}}>{loginUserRole}</div></Button></Tooltip>
                {/* <>{userData.user.roles}</> */}
                <Menu
                    theme="light"
                    mode="horizontal"
                    selectedKeys={[]}
                    style={{ backgroundColor: '#001529', width: '75%', height: '61%', marginLeft: '110px', marginTop: '-3.8%',color:'white' }}
                >
                    
                    {getAllSubMenus()}
                </Menu>
       
            </Header>
            <Content style={{ padding: '0 50px', minHeight: '490px', backgroundColor: 'white' }}>
                <br />
                {/* <IndentDashboard/> */}
                <Outlet />
            </Content >
            <Footer style={{ textAlign: 'center' }}>ⓒ2023 Design and Developed by SchemaX Tech</Footer>
        </Layout >
    );
};

export default BasicLayout;