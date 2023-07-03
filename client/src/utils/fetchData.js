import axios from "axios";

export const getDataAPI = async (url, token) => {
  const res = await axios.get(`/api/deliship-express/v1/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`/api/deliship-express/v1/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataAPI = async (url, post, token, contentType) => {
  const res = await axios.put(`/api/deliship-express/v1/${url}`, post, {
    headers: { Authorization: token, "Content-Type": contentType },
  });
  return res;
};

export const patchDataAPI = async (url, post, token) => {
  const res = await axios.patch(`/api/deliship-express/v1/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};
export const deleteDataAPI = async (url, token) => {
  const res = await axios.delete(`/api/deliship-express/v1/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
