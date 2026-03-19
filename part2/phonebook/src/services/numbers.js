import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    // Create a promise called request 
    const request = axios.get(baseUrl);
    // return the cleaned data after the request promise fulfills
    return request.then(response => response.data);
}

 const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
 }

 const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data)
 }

export default {getAll, create, deletePerson}