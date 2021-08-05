import '@testing-library/jest-dom';
import nock from 'nock';

beforeAll(() => nock.disableNetConnect());

// Nock uses it in abortPendingRequests, Jest removed it (see https://github.com/facebook/jest/pull/11222) for jsdom env
global.clearImmediate = () => { };

// Setup process.env variables for Jest
process.env.REACT_APP__API_URL = 'http://localhost';
