const USER_KEY = "csg_user";

export const saveUser = (user) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
};

export const removeUser = () => {
    localStorage.removeItem(USER_KEY);
};

// =======================
// Generic Storage
// =======================

export const setStorage = (key, value) => {

    localStorage.setItem(
        key,
        JSON.stringify(value)
    );

};

export const getStorage = (key, defaultValue = null) => {

    const value = localStorage.getItem(key);

    if (!value) {

        return defaultValue;

    }

    return JSON.parse(value);

};

export const removeStorage = (key) => {

    localStorage.removeItem(key);

};

export const hasStorage = (key) => {

    return localStorage.getItem(key) !== null;

};