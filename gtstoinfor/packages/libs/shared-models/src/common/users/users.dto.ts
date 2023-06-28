export class UsersDto {
    id: number;
    username: string;
    password: string;
    factory: string;
    role: string;
    createdUser: string;

    constructor(
        id: number,
        username: string,
        password: string,
        factory: string,
        role: string,
        createdUser: string,
    ) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.factory = factory;
        this.role = role;
        this.createdUser = createdUser
    }

}