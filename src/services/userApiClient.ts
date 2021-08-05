import api from './api';

const ROOT_URI = '/api/v1/users';

export interface PagedResult<T> {
  items: T[];
  total: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
  address?: string;
  city?: string;
  zip?: string;
}

export interface PagingOptions {
  page: number;
  pageSize: number;
}

export async function getById(id: string): Promise<User> {
  const { data } = await api.get(`${ROOT_URI}/${id}`);
  return data;
}

export async function list(options?: PagingOptions): Promise<PagedResult<User>> {
  const { data } = await api.get(ROOT_URI, {
    params: options,
  });
  return data;
}

const omitId = ({ id, ...rest }: User) => rest;

export async function save(user: Omit<User, 'id'> | User): Promise<User> {
  const { data } = await ('id' in user ? api.put(`${ROOT_URI}/${user.id}`, omitId(user)) : api.post(ROOT_URI, user));
  return data;
}
