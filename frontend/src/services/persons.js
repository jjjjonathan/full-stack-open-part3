import axios from "axios";
const url = "/api/persons";

const getAll = () => {
  return axios.get(url);
};

const create = (newObject) => {
  return axios.post(url, newObject);
};

const deleteEntry = (id) => {
  return axios.delete(`${url}/${id}`);
};

const put = (objectToUpdate) => {
  return axios.put(`${url}/${objectToUpdate.id}`, objectToUpdate);
};

// eslint-disable-next-line
export default { getAll, create, deleteEntry, put };
