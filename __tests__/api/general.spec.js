import axios from 'axios';

import API from '@/api/general';

let origin ="";
jest.mock('axios');

describe('post login data', () => {
  const data = {
    token: 423432423
  };
  const request ={
    name:"Ronald",
    email:"ron@dsada.com"
  };
  test('fetches successfully data from an API', async () => {


    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(API.login(request)).resolves.toEqual(data);
    expect(axios.post).toHaveBeenCalledWith(
      `${origin}/api/login`,
      request
    );
  });

  test('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(API.login(request)).rejects.toThrow(errorMessage);
  });
});


describe('post sign up data', () => {
  const data = {
    name:"Ronald",
    email:"ron@dsada.com"
  };
  const request ={
    name:"Ronald",
    email:"ron@dsada.com"
  };
  test('fetches successfully data from an API', async () => {


    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(API.signup(request)).resolves.toEqual(data);
    expect(axios.post).toHaveBeenCalledWith(
      `${origin}/api/signup`,
      request
    );
  });

  test('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(API.signup(request)).rejects.toThrow(errorMessage);
  });
});


describe('getAccount data', () => {
  const data = {
    name:"Ronald",
    email:"ron@dsada.com"
  };
  const token ="432432432"

  var config = {
    method: 'get',
    url: `${origin}/api/account`,
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer '+ token
    }
  };


  test('fetches successfully data from an API', async () => {

    const mRes = { status: 200, data: data };
    axios.mockResolvedValueOnce(mRes);
    const actual = await API.getAccount(token);
    expect(actual).toEqual(mRes);
    expect(axios).toHaveBeenCalledWith(config);

  });

  test('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(API.getAccount(token)).rejects.toThrow(errorMessage);
  });
});
