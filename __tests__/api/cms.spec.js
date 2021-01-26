import axios from 'axios';

import CMSAPI from '@/api/cms';

import origin from "@/constants";

jest.mock('axios');

describe('getCMSContent fetch data', () => {
  test('fetches successfully data from an API', async () => {
    const data = null;

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(CMSAPI.getCMSContent()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(
      `${origin}/cms-api/campaigns`,
    );
  });

  test('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(CMSAPI.getCMSContent()).rejects.toThrow(errorMessage);
  });
});


describe('getCMSConfig fetch data', () => {
  test('fetches successfully data from an API', async () => {
    const data = null;

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(CMSAPI.getCMSConfig()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(
      `${origin}/cms-api/campaign-configurations`,
    );
  });

  test('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(CMSAPI.getCMSConfig()).rejects.toThrow(errorMessage);
  });
});



describe('getWinners fetch data', () => {
  test('fetches successfully data from an API', async () => {
    const data = null;

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(CMSAPI.getWinners()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(
      `${origin}/cms-api/winners`,
    );
  });

  test('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(CMSAPI.getWinners()).rejects.toThrow(errorMessage);
  });
});


