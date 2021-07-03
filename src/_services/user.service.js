import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const userService = {
    getAll,
    getById,
    deleteById,
    create,
    update
};

function getAll() {
    return fetch(`${config.apiUrl}/users`, requestOptions.get())
        .then(handleResponse);
}

function getById(id) {
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions.get())
        .then(handleResponse);
}

function deleteById(id) {
    return fetch(`${config.apiUrl}/users/${id}`, requestOptions.delete())
      .then(handleResponse);
}

function create(body) {
    return fetch(`${config.apiUrl}/users/`, requestOptions.post(body))
      .then(handleResponse);
}
function update(body) {
    return fetch(`${config.apiUrl}/users/`, requestOptions.put(body))
      .then(handleResponse);
}