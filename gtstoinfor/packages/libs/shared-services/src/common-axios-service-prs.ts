import { AxiosRequestConfig } from 'axios';
import { config as configs } from '../config';
import { AxiosInstance } from './axios-instance';

export class CommonAxiosService {
    async axiosPostCall(urlEndPoint: string | { urlEndPoint: string, serviceUrl: string }, data?: any, config?: AxiosRequestConfig) {
        let hostIp = '';
        let queryString = '';
        // if only query string(urlEndPoint) is specified, then the default connection host is assigned
        if (typeof urlEndPoint == 'string') {
            hostIp = configs.doc_management_url;
            queryString = urlEndPoint;
        } else {
            // if a specific sub-service is specified then the connection host is dynamic based on the service name
            hostIp = urlEndPoint.serviceUrl;
            queryString = urlEndPoint.urlEndPoint;
        }
        return await AxiosInstance.post(hostIp + '' + queryString, data, config)
            .then(res => {
                return res.data;
            }).catch(err => {
                throw new Error(err.message);
            })
    }



    async getvendorpostcall(urlEndPoint: string | { urlEndPoint: string, serviceUrl: string }, data?: any, config?: AxiosRequestConfig) {

        let queryString = '';
        if (typeof urlEndPoint == 'string') {
            queryString = urlEndPoint;
            
        } else {

            queryString = urlEndPoint.urlEndPoint;
        }
        return await AxiosInstance.post(queryString, data, config)
            .then(res => {
                return res.data;
            }).catch(err => {
                throw new Error(err.message);
            })
    }
}