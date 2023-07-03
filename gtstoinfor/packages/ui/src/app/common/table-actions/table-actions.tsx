import { EditOutlined } from '@ant-design/icons';
import { Divider, Popconfirm, Switch } from 'antd'
import React from 'react';

type TableActionsType = {
    isActive : boolean,
    onEditClick : (value:any) => void,
    onSwitchClick : (value:any) => void
}

export default function TableActions(props : TableActionsType) {
  return (
   <span>
        <Popconfirm title={`Are you sure to ${props.isActive ? 'Deactivate' : 'Activate'}`} onConfirm={props.onSwitchClick} >
            <Switch size='small' checked={props.isActive}/>
        </Popconfirm>
        <Divider type='vertical'/>
        <EditOutlined  onClick={props.onEditClick} />
   </span>
  )
}
