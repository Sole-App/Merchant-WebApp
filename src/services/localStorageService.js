import jwtDecode from "jwt-decode";

const tokenKey = "token";

function saveToken(value) {
    localStorage.setItem(tokenKey, value);
}

function getToken() {
    try {
        if (localStorage.getItem(tokenKey) !== null) {
            const jwt = localStorage.getItem(tokenKey);
            return jwtDecode(jwt);
        }

        return null;
    } catch (ex) {
        return null;
    }
}

export default {
    saveToken,
    getToken
};