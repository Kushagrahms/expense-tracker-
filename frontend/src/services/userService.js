import API from "./api.js"

//updating username
export const updateProfile=(data)=>{
    return API.put("/user/update",data);
};
//upating passwrod
export const changePassword=(data)=>{
    return API.put("/user/change-password",data);
};
//deleting an account
export const deleteAccount=()=>{
    return API.put("user/delete");
};