import { message, notification } from "antd"
import { NotificationPlacement } from "antd/es/notification/interface";
notification.config({ maxCount: 3, duration: 2, placement: 'top' });

export class AlertMessages {
    static getInfoMessage(arg0: string) {
        throw new Error('Method not implemented.');
    }
    static getErrorMessage = (content?: string) => {
        message.error({content}, 10);
        return false;
    }

    static getSuccessMessage = (content?: string) => {
        message.success({content}, 10);
        return false;
    }
    static getCustomIconMessage = (key:string,message: string, icon: React.ReactNode,duration = 0, placement: NotificationPlacement = 'topRight',) => {
        notification.open({
            key,
            icon,
            message,
            placement,
            duration
        });
        return false;
    }
}