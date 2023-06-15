import { useFetch, post } from "./infra";

export type LoginSubmitData = {
    userName: string;
    password: string;
}

export function postLogin(data: LoginSubmitData) {
    return post("/users/login", JSON.stringify(data));
}

export function postLogout(){
    return post("/users/logout")
}

export type UserAuthInfo = {
    userId: number;
    userName: string;
    userType: number;
}

export type UserInfo = {
    userId: number;
    userName: string;
    password: string;
    userType: number;
}

export function useUser(): {
    user: UserAuthInfo | undefined, 
    isLoading: boolean, 
    error: any
}{
    const res = useFetch<UserAuthInfo>("/users/auth");
    console.log("useUser: ", res);
    return {
        user: res.data,
        isLoading: !res.data && !res.error,
        error: res.error
    }
}

export type UsersDict = Record<string, UserInfo>;

export function useUsers(): {
    users: UsersDict | undefined, 
    isLoading: boolean, 
    error: any
}{
    const res = useFetch<UsersDict>("/users/");
    console.log("useUsers: ", res);
    return {
        users: res.data,
        isLoading: !res.data && !res.error,
        error: res.error
    }
}
