//Code Reference: https://www.youtube.com/watch?v=R-3uXlTudSQ
import React, { createContext } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from './UserPool'
import { setUserId } from '../../localStorage'

const AuthContext = createContext();

const Authentication = props => {
    const authenticate = async (Username, Password) => {
        return new Promise((resolve, reject) => {
            const user = new CognitoUser({ Username, Pool: UserPool });
            const authDetails = new AuthenticationDetails({
                Username,
                Password
            });
            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess: ", data)
                    resolve(data)
                },
                onFailure: (err) => {
                    console.error("onFailure: ", err)
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired: ", data)
                },
            });
        });
    };

    const getSession = async () => {
        return new Promise((resolve, reject) => {
            const user = UserPool.getCurrentUser();
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        console.log('Error is: ', err)
                        reject(err);
                    } else {
                        setUserId(session.idToken.payload.sub);
                        resolve(session);
                    }
                })
            } else {
                reject('Session does not exist');
            }
        });
    };

    const logout = () => {
        const user = UserPool.getCurrentUser();
        if (user) {
            user.signOut();
            localStorage.removeItem('user_id');
            localStorage.removeItem('session');
            localStorage.removeItem('email');
        }
    }

    return (
        <AuthContext.Provider value={{
            authenticate,
            getSession,
            logout
        }}>
            {props.children}
        </AuthContext.Provider>
    );
};

export { Authentication, AuthContext };