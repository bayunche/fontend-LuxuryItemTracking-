import request from "../util/request";

export async function login(data: object) {
    return request.post("/api/login", data)
}