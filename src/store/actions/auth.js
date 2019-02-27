import { Alert, AsyncStorage } from 'react-native';

import { TRY_AUTH, AUTH_SET_TOKEN } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import PasswordRecovery from '../../screens/Auth/PasswordRecovery';
import startHome from "../../screens/Home/startHome";

const API_KEY = 'AIzaSyDtgTGfwv31J2NLgy5mq0L19_XgbXsHBFs';

export const tryAuth = (authData, authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        switch (authMode) {
            case 'signup':
                var url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${ API_KEY }`;
                dispatch(authenticate(authData, url));
                break;
            case 'signin':
                var url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${ API_KEY }`;
                dispatch(authenticate(authData, url));
                break;
            case 'passwordRecovery':
                var url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getOobConfirmationCode?key=${ API_KEY }`;
                dispatch(recoverPassword(authData, url));
                break;
            default:
                break;
        }
    }
}

export const authenticate = (authData, url) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                password: authData.password,
                returnSecureToken: true
            }) 
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(uiStopLoading());
            if(!parsedRes.idToken) {
                Alert.alert('Authentication failed! Please try again.');
            } else {
                dispatch(authStoreToken(parsedRes.idToken, parsedRes.expiresIn, parsedRes.refreshToken));
                // Redirect user to main interface here.
                startHome();
            }
        })
        .catch(err => {
            dispatch(uiStopLoading());
            console.log(err);
        });
    }
}

export const recoverPassword = (authData, url) => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: authData.email,
                requestType: 'PASSWORD_RESET'
            })
        })
        .then(res => res.json())
        .then(parsedRes => {
            dispatch(uiStopLoading());
            Alert.alert('Please check your inbox to reset your password');
        })
        .catch(err => {
            dispatch(uiStopLoading());
            console.log(err);
        });
    }
}

export const authStoreToken = (token, expiresIn, refreshToken) => {
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000; 
        AsyncStorage.setItem('go:auth:token', token);
        AsyncStorage.setItem('go:auth:expiryDate', expiryDate.toString());
        AsyncStorage.setItem('go:auth:refreshToken', refreshToken);
        
    }
}

export const authSetToken = token => {
    return {
        type: AUTH_SET_TOKEN,
        token: token
    }
}

export const authGetToken = () => {
    return (dispatch, getState) => {
        const promise = new Promise((resolve, reject) => {
            const token = getState().auth.token;
            if(!token) {
                let fetchedToken;
                AsyncStorage.getItem('go:auth:token')
                .then(tokenFromStorage => {
                    fetchedToken = tokenFromStorage;
                    if(!tokenFromStorage) {
                        reject();
                        return;
                    }
                    return AsyncStorage.getItem('go:auth:expiryDate')
                })
                .then(expiryDate => {
                    const parsedExpiryDate = new Date(parseInt(expiryDate));
                    const now  = new Date();
                    if(parsedExpiryDate > now) {
                        dispatch(authSetToken(fetchedToken));
                        resolve(fetchedToken);
                    } else {
                        reject();
                    }
                })
                .catch(err => reject())
            } else {
                resolve(token);
            }
        });
        // Reset token
        return promise
        .catch(err => {
            return AsyncStorage.getItem('go:auth:refreshToken')
            .then(refreshToken => {
                return fetch(`https://securetoken.googleapis.com/v1/token?key=${ API_KEY }`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: `grant-type=refresh_token&refresh_token=${ refreshToken }`
                });
            })
            .then(res => res.json())
            .then(parsedRes => {
                if(parsedRes.id_token) {
                    dispatch(authStoreToken(parsedRes.id_toke, parsedRes.expires_in, parsedRes.refresh_token));
                    return parsedRes.id_token;
                } else {
                    dispatch(authClearStorage());
                }
            });
        })
        .then(token => {
            if(!token) {
                throw (new Error());
            } else {
                return token;
            }
        })
    }
}

export const authAutoSignin = () => {
    return dispatch => {
        dispatch(authGetToken())
        .then(token => {
            console.log(token);
            // Redirect user to main interface here.
            startHome();
        })
        .catch(err => console.log(err));
    }
}

export const authClearStorage = () => {
    AsyncStorage.removeItem('go:auth:token');
    AsyncStorage.removeItem('go:auth:expiryDate');
}
