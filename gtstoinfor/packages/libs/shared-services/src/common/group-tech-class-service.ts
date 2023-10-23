import {  AllGroupTechClassResponse, GroupTechClassRequest } from '@project-management-system/shared-models';
import axios, { AxiosRequestConfig } from 'axios';
import { CommonAxiosService } from '../common-axios-service-prs';

export class GroupTechClassService extends CommonAxiosService{
    URL =  '/group-tech-class';
    

    async getAllActiveGroupTechClass(): Promise<AllGroupTechClassResponse> {
        return this.axiosPostCall(this.URL + '/getAllActiveGroupTechClass')
    }

    async getAllGroupTechClass(): Promise<AllGroupTechClassResponse> {
        return this.axiosPostCall(this.URL + '/getAllGroupTechClass')
    }

    async getActivegetGroupTechClassById(Req: GroupTechClassRequest): Promise<AllGroupTechClassResponse> {
        return this.axiosPostCall(this.URL + '/getActivegetGroupTechClassById',Req)
    }

    async activateOrDeactivateGroupTechClass(Req: GroupTechClassRequest): Promise<AllGroupTechClassResponse> {
        return this.axiosPostCall(this.URL + '/activateOrDeactivateGroupTechClass',Req)
    }


    
}