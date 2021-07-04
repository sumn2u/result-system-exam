import config from 'config';
import { handleResponse, requestOptions } from '@/_helpers';

export const teacherService = {
    getAll,
    getById,
    deleteById,
    create,
    update
};

function getAll() {
    return fetch(`${config.apiUrl}/teacher`, requestOptions.get())
        .then(handleResponse);
}

function getById(id) {
    return fetch(`${config.apiUrl}/teacher/${id}`, requestOptions.get())
        .then(handleResponse);
}

function deleteById(id) {
    return fetch(`${config.apiUrl}/teacher/${id}`, requestOptions.delete())
      .then(handleResponse);
}

function create(body) {
    return fetch(`${config.apiUrl}/teacher/`, requestOptions.post(body))
      .then(handleResponse);
}
function update(body) {
    return fetch(`${config.apiUrl}/teacher/`, requestOptions.put(body))
      .then(handleResponse);
}