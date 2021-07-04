import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const subjectService = {
    getAll,
    getById,
    deleteById,
    create,
    update
};

function getAll() {
    return fetch(`${config.apiUrl}/subject/`, requestOptions.get())
        .then(handleResponse);
}

function getById(id) {
    return fetch(`${config.apiUrl}/subjects/${id}`, requestOptions.get())
        .then(handleResponse);
}

function deleteById(id) {
    return fetch(`${config.apiUrl}/subjects/${id}`, requestOptions.delete())
      .then(handleResponse);
}

function create(body) {
    return fetch(`${config.apiUrl}/subjects/`, requestOptions.post(body))
      .then(handleResponse);
}
function update(body) {
    return fetch(`${config.apiUrl}/subjects/`, requestOptions.put(body))
      .then(handleResponse);
}