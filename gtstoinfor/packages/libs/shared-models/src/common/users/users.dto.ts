export class UsersDto {
    id: number;
    username: string;
    password: string;
    factory: string;
    role: string;
    createdUser: string;
    isActive?: boolean;
    versionFlag?: number;

    constructor(
        id: number,
        username: string,
        password: string,
        factory: string,
        role: string,
        createdUser: string,
        isActive?: boolean,
        versionFlag?: number
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.factory = factory;
        this.role = role;
        this.createdUser = createdUser
        this.isActive = isActive;
        this.versionFlag = versionFlag;
    }

}