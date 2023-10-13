import { Layout, Row, Col, Dropdown, Button, Avatar, MenuProps, SelectProps, theme } from 'antd';

import { UserOutlined } from '@ant-design/icons';
import './header.css';
import { useNavigate } from 'react-router-dom';
// import logo from '../basic-layout/logo.png';
import shahinew from './shahinew.png'
// import xpperal from './xpparel-logo.jpeg'
import xpperal from './xapp.png'

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
          <div className="logo" >
            {/* <img src={xpperal} style={{ width: '20%', marginTop: '5px',marginLeft:'20px' }} /> */}
            <img src={xpperal} width={78} height={'auto'} style={{marginLeft:'20px',float:'left'}}></img>     
            <div style={{fontSize:'30px',float:'left',color:'#2b706d',paddingLeft:'11px',fontWeight:'600'}}> XPPAREL</div>
                 </div>
        </Col>
        <Col span={1} >
          {/* <span className='ant-pro-global-header-trigger'>
            {React.createElement(props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: props.toggle,
            })}
          </span> */}
        </Col>
        <Col span={1}></Col>
        <Col span={6}>
          <span style={{ alignSelf: 'center',fontFamily:'sans-serif', fontSize: 24, color: '#0d89b0' }}><b>{'ORDER MANAGEMENT'}</b></span>
          {/* <Select  onSelect={(e) => {navigate('/'+e)}} className='header-search' showSearch  allowClear style={{width:'100%',marginBottom:'60px'}}  placeholder='search for forms and views' options={options} suffixIcon={<SearchOutlined style={{color:colorPrimary}}/>} /> */}
        </Col>
        {/* <Col span={4} style={{ textAlign: 'right' }}>
          <b>UNIQLO(Unit12)</b>
        </Col> */}
        <Col span={7} style={{ textAlign: 'right' }}>
        <b style={{marginRight:'20px'}}>UNIQLO(Unit12)</b>
          <Dropdown menu={{ items }}>
            <Avatar style={{ marginBottom: '20px', cursor: 'pointer' }} size={45} shape="circle" icon={<UserOutlined style={{ fontSize: '25px' }} />} />
          </Dropdown>
        </Col>
        <Col></Col>
      </Row>
    </Header>
  )
}


