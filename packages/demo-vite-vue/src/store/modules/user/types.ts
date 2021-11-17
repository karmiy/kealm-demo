export interface LoginInfo {
    authenticationToken: string;
    userId: number;
    userName: string;
}

export interface UserState {
    loginInfo: LoginInfo;
}
