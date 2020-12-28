const tokenKey = "token";

function getCurrentUser() {
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
    getCurrentUser,
};