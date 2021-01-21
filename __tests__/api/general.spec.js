import axios from 'axios';

import API from '@/api/general';

let origin ="";
jest.mock('axios');

describe('post login data', () => {
  const data = {
    name:"Ronald",
    email:"ron@dsada.com"
  };
  const request ={
    token:'dsadsadsa'
  }
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
