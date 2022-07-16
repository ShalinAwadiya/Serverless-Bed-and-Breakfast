export const setUserId = (user) => {
    localStorage.setItem('user_id', user);
}

export const getUserId = () => {
    return localStorage.getItem('user_id');
}

export const setSession = (session) => {
    return localStorage.setItem('session', JSON.stringify(session));
}

export const getSession = () => {
    return JSON.parse(localStorage.getItem('session'));
}

export const setAdmin = (admin) => {
    localStorage.setItem('admin', admin);
}

export const getAdmin = () => {
    return localStorage.getItem('admin');
}