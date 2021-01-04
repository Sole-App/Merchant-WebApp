import jwtDecode from "jwt-decode";
import { jwtHelpers } from "../helpers";

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

export function isInRole(role) {
    try {
        if (localStorage.getItem(tokenKey) !== null) {
            const jwt = localStorage.getItem(tokenKey);
            const jwtDecoded = jwtDecode(jwt);
            let roleValue = jwtHelpers.getValue(jwtDecoded, "role");
            return roleValue === role ? true : false;
        }
        return false;
    } catch (ex) {
        return false;
    }
}

export function getRoles() {
    try {
        if (localStorage.getItem(tokenKey) !== null) {
            const jwt = localStorage.getItem(tokenKey);
            const jwtDecoded = jwtDecode(jwt);
            let role = jwtHelpers.getValue(jwtDecoded, "role");
            return role;
        }
        return "";
    } catch (ex) {
        return "";;
    }
}

export default {
    saveToken,
    getToken,
    isInRole,
    getRoles,
};