import request from "../util/request";

export async function createUserKey() {
    return request.get("/user/signupUser");
}