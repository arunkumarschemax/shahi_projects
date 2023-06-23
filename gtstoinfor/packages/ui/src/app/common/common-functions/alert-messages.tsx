import React from 'react';
import { message, Button } from 'antd';
// This method is used to display multiple Alert messages with maximum number of 3 
message.config({ maxCount: 3});
// This method is used to close All Alert messages
message.destroy();
export class AlertMessages {

  static getErrorMessage = (content?: string) => {   
    message.error({content}, 10);
    return false;
  }

  static getSuccessMessage = (content?: string) => {
    message.success({content},10);
    return false;
  }

  static getWarningMessage = (content?: string) => {
    message.warning({content},10);
    return false;
  }

  static getInfoMessage = (content?: string) => {
    message.info({content}, 10);
    return false;
  }

  render() {
    return;
  }
}

export default AlertMessages;
