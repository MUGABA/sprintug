import http from "./httpService";

export const addRestaurant = async (restData) => {
  const { data } = await http.post("/rest/add", restData);

  return data;
};

export const getRestaurants = async () => {
  const { data } = await http.get("/rest");

  return data;
};

export const getDetailsById = async (id) => {
  const { data } = await http.get(`/rest/get-rest/${id}`);

  return data;
};

export const deleteRestById = async (id) => {
  const { data } = await http.delete(`/rest/delete-rest/${id}`);

  return data;
};
