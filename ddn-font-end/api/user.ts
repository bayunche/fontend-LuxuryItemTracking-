import request from "../util/request";

export async function createUserKey() {
    return request.get("/user/signupUser");
}

export async function editUserInfo(data: any) {
    
    return request.post("/user/editUserInfo", data);
}
export async function editPassword(data:object) {
    return request.post('/user/editPassword', data)
}
export async function getUserInfos() {
    return await request.get('/user/getUserInfo')
}