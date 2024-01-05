import React from 'react'
import { Layout, Row, Col, Menu, Dropdown, Button, Avatar, MenuProps, Select, SelectProps, theme, Divider } from 'antd';
import xpperal from './xapp.png'


import {MenuUnfoldOutlined,MenuFoldOutlined,  SearchOutlined, UserOutlined} from '@ant-design/icons';
import './header.css';
import Search from 'antd/es/input/Search';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;
const { useToken } = theme

interface IProps {
  collapsed: boolean;
  toggle: () => void;
}
export const CommonHeader = (props: IProps) => {
  const navigate = useNavigate();
  const { token: { colorPrimary } } = useToken()
  const authdata = JSON.parse(localStorage.getItem('currentUser'))
  const loginUser = authdata?.user?.userName

  const logoutHandler = async () => {
    localStorage.clear()
    navigate('/login')
    // try {
    //   const saltRes = await service.logOut({ username: authContext.user.username, password: `SaiResources${Math.random()}` })
    //   if (saltRes.status) {
    //     logout(dispatch);
    //   } else {
    //     throw Error(saltRes.internalMessage);
    //   }
    // } catch (error: any) {
    //   AlertMessages.getErrorMessage(error.message);
    // }
  }


  const items: MenuProps['items'] = [
    {
      key: '1',
      label: `User Name : ${loginUser}`

    },
    // {
    //   key: '2',
    //   label: 'Role:'
    // },
    // {
    //   key: '3',
    //   label: 'Plant:'
    // },
    {
      key: '2',
      label: (
        <>
          <Button type='primary' onClick={() => logoutHandler()} >
            Log Out
          </Button>
        </>
      )
    },
  ];

  const options: SelectProps['options'] = [{ value: 'project-creation-page', label: 'Project Creation' }, { value: 'project-list-grid', label: 'Project View' }];



  return (
    <Header className='header-row' style={{ background: '#fff', padding: 0 }}>
      <Row justify='space-between' align='middle'>
        <Col span={4}>
        
         <div className="logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', maxWidth: '100%' }}>
          <img src={xpperal} width={90} height={55} style={{marginBottom:'10px', marginLeft: '20px' }}></img>
          <div style={{ fontSize: '30px', color: '#2b706d', paddingLeft: '8px', fontWeight: '620' }}>XPPAREL</div>
        </div>
  
          {/* <div style={{fontSize:'30px',float:'left',color:'#2b706d',paddingLeft:'11px',fontWeight:'600'}}> XPPAREL</div> */}

        </Col>
        <Col span={1} >
          {/* <span className='ant-pro-global-header-trigger'>
            {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: props.toggle,
            })}
          </span> */}
        </Col>
        <Col span={4}></Col>
        <Col span={8}>
          <span style={{ alignSelf: 'center', fontSize: 28, color: 'darkblue' }}><b>{'CENTRIC BUYER- ORDER MANAGEMENT & TRACKING'}</b></span>
          {/* <Select  onSelect={(e) => {navigate('/'+e)}} className='header-search' showSearch  allowClear style={{width:'100%',marginBottom:'60px'}}  placeholder='search for forms and views' options={options} suffixIcon={<SearchOutlined style={{color:colorPrimary}}/>} /> */}
        </Col>
        <Col span={7} style={{ textAlign: 'right' }}>
          <Dropdown menu={{ items }}>
            <Avatar style={{ marginBottom: '25px', cursor: 'pointer' }} size={42} shape="circle" icon={<UserOutlined style={{ fontSize: '25px' }} />} />
          </Dropdown>
        </Col>
        <Col></Col>
      </Row>
    </Header>
  )
}
