import { HTTPService } from "./common";

const apiEndpoint = process.env.REACT_APP_IDENTITY_API_URL + "/auth";

async function Login(data) {
    //HTTPService.addHeader('Access-Control-Allow-Origin', 'https://localhost:3000');
    return await HTTPService.post(apiEndpoint + "/login", data);
}

async function Logout() {
    //HTTPService.addBearerAuthorization();    
    return await HTTPService.post(apiEndpoint + "/logout");
}

export default {
    Login,
    Logout,
};