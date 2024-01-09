

export interface USER {
    userId: string|null;  // 假设 userId 是一个字符串
    authToken: string | null;  // authToken 是一个字符串或 null
}

export interface State{
    userId:string|null,
    authToken:string|null,
}
