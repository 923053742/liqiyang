import http from  "../utils/request"

export function getLogin(data){
    return http({
        url:"/adminapi/login",
        method:'post',
        data:data
    })
}