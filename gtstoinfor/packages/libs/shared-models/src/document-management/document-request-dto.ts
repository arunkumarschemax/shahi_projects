
export class DocumentDto{
  documentName: string
  isActive: boolean
  versionFlag: number
  id:number
  createdUser?: string
  updatedUser?: string | null
  updatedAt?: Date
  createdAt?: Date
  constructor(
    documentName: string,
    isActive: boolean,
    versionFlag: number,
    id:number,
    createdUser?: string,
    updatedUser?: string | null,
    updatedAt?: Date,
    createdAt?: Date,
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
  }
  }