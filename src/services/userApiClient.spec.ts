import nock from 'nock';
import { getById, list, save, User } from './userApiClient';

const USERS_URI = '/api/v1/users';

const createLocalHostScope = () => nock(process.env.REACT_APP__API_URL!);

const createUser = (): User => ({
  id: '6108e0c2b83b522ebd8c7eca',
  firstName: 'Tom',
  lastName: 'Marien',
  email: 'tommarien@gmail.com',
  age: 42,
  address: 'Edith Cavelllaan 16',
  city: 'Brecht',
  zip: 'BE2960',
});

afterEach(() => {
  nock.abortPendingRequests();
  nock.cleanAll();
});

describe('getById', () => {
  test('it returns the user', async () => {
    const resource = createUser();

    const scope = createLocalHostScope();
    scope.get(`${USERS_URI}/${resource.id}`).reply(200, resource);

    const reply = await getById(resource.id);

    scope.done();
    expect(reply).toStrictEqual(resource);
  });
});

describe('list', () => {
  test('it returns the pagedresult with the users', async () => {
    const resource = createUser();

    const scope = createLocalHostScope();
    scope.get(USERS_URI).reply(200, { items: [resource], total: 1 });

    const reply = await list();

    scope.done();
    expect(reply).toStrictEqual({ items: [resource], total: 1 });
  });

  test('it supports paging', async () => {
    const resource = createUser();

    const scope = createLocalHostScope();
    scope
      .get(USERS_URI)
      .query({ page: 2, pageSize: 20 })
      .reply(200, { items: [resource], total: 1 });

    const reply = await list({ page: 2, pageSize: 20 });

    scope.done();
    expect(reply).toStrictEqual({ items: [resource], total: 1 });
  });
});

describe('save', () => {
  test('it creates a new user when no id is specified', async () => {
    const id = '6108e0c2b83b522ebd8c7eca';

    const resource: Omit<User, 'id'> = {
      firstName: 'John',
      lastName: 'Do',
      email: 'john.do@gmail.com',
    };

    const scope = createLocalHostScope();
    scope.post(USERS_URI, resource).reply(200, { ...resource, id });

    const reply = await save(resource);

    scope.done();
    expect(reply).toStrictEqual({ ...resource, id });
  });

  test('it updates the user when id is specified', async () => {
    const resource: User = {
      id: '6108e0c2b83b522ebd8c7eca',
      firstName: 'John',
      lastName: 'Do',
      email: 'john.do@gmail.com',
    };

    const scope = createLocalHostScope();
    const { id, ...rest } = resource;
    scope.put(`${USERS_URI}/${resource.id}`, { ...rest }).reply(200, resource);

    const reply = await save(resource);

    scope.done();
    expect(reply).toStrictEqual(resource);
  });
});
