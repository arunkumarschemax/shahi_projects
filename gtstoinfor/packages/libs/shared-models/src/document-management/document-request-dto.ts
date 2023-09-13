import { DocumentDownloadEnum } from "./document-download-enum"

export class DocumentDto{
  documentName: string
  isActive: boolean
  versionFlag: number
  id:number
  createdUser?: string
  updatedUser?: string | null
  updatedAt?: Date
  createdAt?: Date
  priority?: number
  isDownload : DocumentDownloadEnum;


  constructor(
    documentName: string,
    isActive: boolean,
    versionFlag: number,
    id:number,
    createdUser?: string,
    updatedUser?: string | null,
    updatedAt?: Date,
    createdAt?: Date,
    priority?: number,
  isDownload? : DocumentDownloadEnum

    )
  {
    this.documentName=documentName
    this.createdUser=createdUser
    this.isActive=isActive
    this.updatedUser=updatedUser
    this.updatedAt=updatedAt
    this.createdAt=createdAt
    this.versionFlag=versionFlag
    this.id=id
    this.priority=priority
    this.isDownload=isDownload

  }
  }