import request from "../util/request";

export async function login(data: object) {
    return request.post("/login", data)
}

export async function signup(data: object) {
    return request.post('/signup', data)
}