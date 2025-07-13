import axios from 'axios';

const API = axios.create({
  baseURL: "https://6870b1117ca4d06b34b79518.mockapi.io/waweb/api",
});

export type UserData = {
  nama: string;
  lagu: string;
  pekerjaan?: string;
  foto?: string;
  addedAt?: string; 
};

export const getRandomPhoto = async (): Promise<string> => {
  try {
    const res = await API.get("/users");
    const users = res.data;
    const photos = users.map((user: any) => user.foto).filter(Boolean);
    return photos[Math.floor(Math.random() * photos.length)] || "";
  } catch {
    return "";
  }
};

export const addUsers = async (data: UserData) => {
  const res = await API.post("/users", data);
  return res.data;
};

export const deleteUser = async (id: string) => {
  const res = await API.delete(`/users/${id}`);
  return res.data;
};

export default API;
