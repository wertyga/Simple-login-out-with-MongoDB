import axios from 'axios';
import setTokenHeader from '../../server/common/setTokenHeader';
import jwtDecode from 'jwt-decode';

export const REDIRECT = 'REDIRECT';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';



export function fetchUser(user) {
    return dispatch => {
        return axios.post('/new-user', user).then(res => {
            let token = res.data.token;
            setTokenHeader(token);
            localStorage.setItem('jwtToken', token);
            dispatch(loginUser(jwtDecode(token)));
        });
    };
};

export function login(data) {
    return dispatch => {
        return axios.post('/login', data).then(res => {
            let token = res.data.token;
            setTokenHeader(token);
            localStorage.setItem('jwtToken', token);
            dispatch(loginUser(jwtDecode(token)));
        })
    }
};
export function loginUser(user) {
    return {
        type: SET_CURRENT_USER,
        user
    }
};

export function logout() {
    return dispatch => {
        localStorage.removeItem('jwtToken');
        setTokenHeader(false);
        dispatch(loginUser({}));
    }
};