import ProLayout, { MenuDataItem } from '@ant-design/pro-layout'
import { ProConfigProvider } from '@ant-design/pro-provider'
import { Alert, Button, ConfigProvider, Space, Tooltip, theme, Input } from 'antd'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { DarkModeIcon } from '../../icons/darkmode.icon'
import { LightModeIcon } from '../../icons/lightmode.icon'
import { LogoutOutlined } from '@ant-design/icons'
import { useIAMClientState } from '../../nike/iam-client-react'
import Icon from '@ant-design/icons/lib/components/Icon'
import * as antdIcons from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom'


export default function LayoutTwo() {
    const [dark, setDark] = useState<boolean>(false)
    const { IAMClientAuthContext, dispatch } = useIAMClientState();
    const [pathname, setPathname] = useState(location.pathname);
    const [originalMenu, setOriginalMenu] = useState<any>(null);
    const [menuObj, setMenuObj] = useState<any>({
        path: '/', routes: undefined
    })
    const { token: { colorPrimary, colorPrimaryActive, colorPrimaryBg, colorBgBase } } = theme.useToken()

    useEffect(() => {
        generateMenu();
    }, [IAMClientAuthContext]);

    const renderIcon = useCallback((iconName) => {
        const SpecificIcon = antdIcons[iconName];
        return <SpecificIcon />;
    }, []);

    const memoizedRenderIcon = useMemo(() => renderIcon, []); // Memoize renderIcon function

    const generateMenu = () => {
        const menuAccessObject = IAMClientAuthContext.menuAccessObject || [];
        const routes = menuAccessObject.map((item) => ({
            path: '/',
            name: item.menuName,
            icon: <LogoutOutlined />,
            routes: item.subMenuData.map((subItem) => ({
                path: subItem.path,
                name: subItem.subMenuName,
                icon:  <LogoutOutlined />,
            })),
        }));
        setOriginalMenu(routes);
        setMenuObj({ path: '/', routes });
    };

    const filterMenu = useCallback((keyword: string) => {
        const filterRoutes = (routes: any[], keyword: string): any[] => {
            if (!keyword.trim()) {
                return originalMenu.routes;
            }

            const filteredRoutes = routes.filter(route => route.name.toLowerCase().includes(keyword.toLowerCase()));
            const nestedFilteredRoutes = routes.reduce((acc, route) => {
                if (route.routes) {
                    const filteredNestedRoutes = filterRoutes(route.routes, keyword);
                    if (filteredNestedRoutes.length > 0) {
                        acc.push({ ...route, routes: filteredNestedRoutes });
                    }
                }
                return acc;
            }, []);
            return [...filteredRoutes, ...nestedFilteredRoutes];
        };

        const filteredMenu = filterRoutes(menuObj.routes, keyword);
        setMenuObj({ path: '/', routes: filteredMenu });
    }, [menuObj]);



    console.log(menuObj)
    function handleLogout() {

    }

    function renderLayoutActions(props) {
        const switchMode = <Tooltip placement="bottom" title={'Switch mode'}>
            <Button
                size="large"
                onClick={() => {
                    setDark(!dark);
                }}
                icon={!dark ? <DarkModeIcon /> : <LightModeIcon />}
            ></Button>
        </Tooltip>
        const signOut = <Tooltip placement="bottom" title={"Sign Out"}>
            <Button
                size="large"
                icon={
                    <LogoutOutlined
                        onClick={async () => {
                            // await signOut(dispatch);
                            handleLogout()
                        }}
                    />
                }
            ></Button>
        </Tooltip>
        return [switchMode, signOut]
    }
    return (

        <ProConfigProvider dark={!dark}>
            <ConfigProvider
                locale={{ locale: 'en-US' }}
            // theme={{
            //     algorithm: theme.compactAlgorithm,
            //     token: {
            //         colorPrimary: 'plum',
            //     }
            // }}
            >
                <div
                    id="main-layout"
                    style={{
                        height: '100vh',
                    }}
                >
                    <ProLayout
                        // appList={[
                        //     {
                        //         icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                        //         title: 'Ant Design',
                        //         desc: '杭州市较知名的 UI 设计语言',
                        //         url: 'https://ant.design',
                        //     },]}
                        title={'Shahi - NIKE'}
                        layout='side'
                        locale='en-US'
                        siderWidth={250}
                        actionsRender={renderLayoutActions}
                        route={menuObj}
                        location={{
                            pathname,
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
                        menuExtraRender={({ collapsed }) =>
                            !collapsed && (
                                <Space
                                    style={{
                                        marginBlockStart: 16,
                                    }}
                                    align="center"
                                >
                                    <Input
                                        prefix={
                                            <antdIcons.SearchOutlined />
                                        }
                                        placeholder="Search for menu"
                                        onChange={(e) => filterMenu((e.target as HTMLInputElement).value)}
                                    />
                                    <antdIcons.PlusCircleFilled style={{ color: colorPrimary }} />
                                </Space>
                            )
                        }
                    >
                        <div>

                            <Outlet />
                        </div>
                    </ProLayout>
                </div>
            </ConfigProvider>
        </ProConfigProvider>
    )
}
