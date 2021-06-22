import http from "../http-common";

const getAll = () => {
  return http.get("/jobs");
};

const get = id => {
  return http.get(`/jobs/${id}`);
};

const create = data => {
  return http.post("/jobs", data);
};

const update = (id, data) => {
  return http.put(`/jobs/${id}`, data);
};

const remove = id => {
  return http.delete(`/jobs/${id}`);
};

const findByCompany = company => {
  return http.get(`/jobs?company=${company}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  findByCompany
};