import request from "../util/request";

export async function login(data: object) {
   
    // console.log(request.post)
   return await request.post('/auth/login', data)
}


export  function signup(data: object) {
    return request.post('/auth/signup', data)
}
