import axios, { type AxiosResponse } from 'axios';
import { type IUser } from '../models';

const api = axios.create({
  baseURL: 'https://65a7b87994c2c5762da76352.mockapi.io/api/users',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default {
  getAll(): Promise<AxiosResponse<IUser[]>> {
    return api.get('/');
  },

  get(id: string): Promise<AxiosResponse<IUser>> {
    return api.get(`/${id}`);
  },

  create(body: Partial<IUser>): Promise<AxiosResponse<IUser>> {
    return api.post('/', body);
  },

  update(id: string, body: Partial<IUser>): Promise<AxiosResponse<IUser>> {
    return api.put(`/${id}`, body);
  },

  delete(id: string): Promise<AxiosResponse<void>> {
    return api.delete(`/${id}`);
  },
};
