import ProLayout, { MenuDataItem } from '@ant-design/pro-layout'
import { ProConfigProvider } from '@ant-design/pro-provider'
import { Alert, Button, ConfigProvider, Tooltip } from 'antd'
import React, { useState } from 'react'
import { DarkModeIcon } from '../../icons/darkmode.icon'
import { LightModeIcon } from '../../icons/lightmode.icon'
import { LogoutOutlined } from '@ant-design/icons'
import { useIAMClientState } from '../../nike/iam-client-react'
import Icon from '@ant-design/icons/lib/components/Icon'
import * as antdIcons from '@ant-design/icons';
import type { ProSettings } from '@ant-design/pro-components';


export default function LayoutTwo() {
    const [dark, setDark] = useState<boolean>(false)
    const { IAMClientAuthContext, dispatch } = useIAMClientState();

    const renderIcon = (iconType, iconName) => {
        // if (iconType === "antd") {
        const SpecificIcon = antdIcons[iconName] ? antdIcons[iconName] : antdIcons["SolutionOutlined"];
        return <SpecificIcon />
        // }
        // else {
        //   const SpecificIcon = svgIcons[iconName];
        //   return <Icon component={SpecificIcon} style={{ fontSize: '20px' }} />
        // }
    }

    function generateMenu(): MenuDataItem {
        const menuAccessObject = IAMClientAuthContext.menuAccessObject ? IAMClientAuthContext.menuAccessObject : [];
        const menuDataItem: MenuDataItem = {
            path: '/',
            children: [
                {
                    path: '/welcome',
                    name: 'Welcome',
                    icon: <antdIcons.SmileFilled />,
                    component: './Welcome',
                },
            ]
        }
        return menuDataItem
    }

    console.log(IAMClientAuthContext.menuAccessObject)

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
                getTargetContainer={() => {
                    return document.getElementById('test-pro-layout') || document.body;
                }}
            >
                <div
                    id="main-layout"
                    style={{
                        height: '100vh',
                    }}

                >
                    <ProLayout
                        appList={[
                            {
                                icon: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
                                title: 'Ant Design',
                                desc: '杭州市较知名的 UI 设计语言',
                                url: 'https://ant.design',
                            },]}
                        title={'Bom Genaration'}
                        layout='side'
                        actionsRender={renderLayoutActions}
                        route={generateMenu}
                    >

                    </ProLayout>
                </div>
            </ConfigProvider>
        </ProConfigProvider>
    )
}
