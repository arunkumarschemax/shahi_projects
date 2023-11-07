import {  AllGroupTechClassResponse, BuyerIdReq, GroupTechClassDto, GroupTechClassRequest, GroupTechClassResponse } from '@project-management-system/shared-models';
import axios, { AxiosRequestConfig } from 'axios';
import { CommonAxiosService } from '../common-axios-service-prs';

export class GroupTechClassService extends CommonAxiosService{
    URL =  '/group-tech-class';

    async createGroupTechClass(dto: GroupTechClassDto): Promise<GroupTechClassResponse>{
        return this.axiosPostCall(this.URL + '/createGroupTechClass', dto)
    }   
    
    async updateGroupTechClass(dto: GroupTechClassDto): Promise<GroupTechClassResponse>{
        return this.axiosPostCall(this.URL + '/updateGroupTechClass', dto)
    }    

    async getAllActiveGroupTechClass(): Promise<AllGroupTechClassResponse> {
        return this.axiosPostCall(this.URL + '/getAllActiveGroupTechClass')
    }

    async getAllGroupTechClass(req?:BuyerIdReq): Promise<AllGroupTechClassResponse> {
        return this.axiosPostCall(this.URL + '/getAllGroupTechClass',req)
    }

    async getActivegetGroupTechClassById(Req: GroupTechClassRequest): Promise<AllGroupTechClassResponse> {
        return this.axiosPostCall(this.URL + '/getActivegetGroupTechClassById',Req)
    }

    async activateOrDeactivateGroupTechClass(Req: GroupTechClassRequest): Promise<AllGroupTechClassResponse> {
        return this.axiosPostCall(this.URL + '/activateOrDeactivateGroupTechClass',Req)
    }


    
}