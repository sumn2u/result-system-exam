import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { requestOptions, handleResponse } from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    return fetch(`${config.apiUrl}/login/`, requestOptions.post({ username, password }))
        .then(handleResponse)
        .then(user => {
          if(user.usertype == 1){
            user.role = 'Admin'
          }else if(user.usertype == 2){
            user.role = 'Teacher'
          }else {
            user.role = 'Pupil'
          }
          console.log(user)
          user.token = `fake-jwt-token.${user.role}`;
          // if
          //  role: user.role,
          //               token: `fake-jwt-token.${user.role}`
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
