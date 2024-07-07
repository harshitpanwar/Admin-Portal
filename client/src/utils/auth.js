export const getJwt = () => localStorage.getItem('jwt');
export const setJwt = (token) => localStorage.setItem('jwt', token);
export const removeJwt = () => localStorage.removeItem('jwt');
