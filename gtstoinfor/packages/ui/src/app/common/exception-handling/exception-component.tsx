

import {Button, Result } from 'antd';
import { ResultStatusType } from 'antd/lib/result';
import { useNavigate } from 'react-router-dom';
interface PropForException {
  statusCode:ResultStatusType,
  statusMessage:string,
}
export const ExceptionComponent = (props:PropForException) => {
  let navigate = useNavigate();
  return (
    <Result
      status={props.statusCode}
      title={props.statusCode}
      subTitle={props.statusMessage}
      extra={<Button type='primary' onClick={() => navigate('/')}>Back Home</Button>}
    />
  );
}
// export default LogOut;