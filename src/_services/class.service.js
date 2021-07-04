import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const classService = {
    getAll,
    getById,
    deleteById,
    create,
    update
};

function getAll() {
    return fetch(`${config.apiUrl}/classes`, requestOptions.get())
        .then(handleResponse);
}

function getById(id) {
    return fetch(`${config.apiUrl}/classes/${id}`, requestOptions.get())
        .then(handleResponse);
}

function deleteById(id) {
    return fetch(`${config.apiUrl}/classes/${id}`, requestOptions.delete())
      .then(handleResponse);
}

function create(body) {
    return fetch(`${config.apiUrl}/classes/`, requestOptions.post(body))
      .then(handleResponse);
}
function update(body) {
    return fetch(`${config.apiUrl}/classes/`, requestOptions.put(body))
      .then(handleResponse);
}