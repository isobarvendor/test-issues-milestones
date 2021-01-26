import axios from 'axios';

import API from '@/api/ngps';

import {origin}  from "@/constants/index";
jest.mock('axios');

const setHeader = (token)=>{
  return {
    headers:{
              'Content-Type': 'application/json',
              'Authorization': 'Bearer '+ token
            }
  }
}

describe('getListPrize fetch data', () => {
  test('fetches successfully data from an API', async () => {
    const data = {prize:[{
      name:"tes",
      desc:"tes"
    }]};

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(API.getListPrize()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(
      `${origin}/api/campaign/public/list-prize`,
    );
  });

  test('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(API.getListPrize()).rejects.toThrow(errorMessage);
  });
});



describe('getListWallet fetch data', () => {
  const data = {wallet:[{
    name:"tes",
    desc:"tes"
  }]};
  const token= "121212121"
  test('fetches successfully data from an API', async () => {

    axios.get.mockImplementationOnce(() => Promise.resolve(data));

    await expect(API.getListWallet(token)).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith(
      `${origin}/api/campaign/auth/list-wallet`,
      setHeader(token)
    );
  });

  test('fetches erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(API.getListWallet()).rejects.toThrow(errorMessage);
  });
});


describe('redeem prize', () => {
  const data = {prize:[{
    name:"tes",
    desc:"tes"
  }]};
  const request = {prize:1112121};
  const token= "121212121"
  test('post successfully data from an API', async () => {


    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(API.redeemPrize(request,token)).resolves.toEqual(data);
    expect(axios.post).toHaveBeenCalledWith(
      `${origin}/api/campaign/auth/redeem-prize`,
      request,
      setHeader(token)
    );
  });

  test('post erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(API.redeemPrize(request,token)).rejects.toThrow(errorMessage);
  });
});



describe('submitLogin', () => {
  const data = {prize:[{
    name:"tes",
    desc:"tes"
  }]};
  const request = {name:"ronald",email:"ronald.pranata@dsad.com"};
  const token= "121212121"
  test('post successfully data from an API', async () => {


    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(API.submitLogin(request,token)).resolves.toEqual(data);
    expect(axios.post).toHaveBeenCalledWith(
      `${origin}/api/campaign/auth/submission`,
      request,
      setHeader(token)
    );
  });

  test('post erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(API.submitLogin(request,token)).rejects.toThrow(errorMessage);
  });
});


describe('submitNonLogin', () => {
  const data = {prize:[{
    name:"tes",
    desc:"tes"
  }]};
  const request = {name:"ronald",email:"ronald.pranata@dsad.com"};

  test('post successfully data from an API', async () => {


    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(API.submitNonLogin(request)).resolves.toEqual(data);
    expect(axios.post).toHaveBeenCalledWith(
      `${origin}/api/campaign/public/submission`,
      request
    );
  });

  test('post erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(API.submitNonLogin(request)).rejects.toThrow(errorMessage);
  });
});





describe('uploadFile', () => {
  const data = {success:true};
  let config = {
    headers: {
        'Content-Type': 'multipart/form-data',
    }
};
  var formData = new FormData();
  const file = new File([new ArrayBuffer(1)], 'file.jpg');
  formData.append("file", file);
    let upload={
    request:formData,
    type:'receipts'
  }

  test('post successfully data from an API', async () => {


    axios.post.mockImplementationOnce(() => Promise.resolve(data));

    await expect(API.uploadFile(upload.request,upload.type)).resolves.toEqual(data);
    expect(axios.post).toHaveBeenCalledWith(
      `${origin}/api/${upload.type}`,
      upload.request,config
    );
  });

  test('post erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.post.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(API.uploadFile(upload.request,upload.type)).rejects.toThrow(errorMessage);
  });
});

describe('deleteFile', () => {
  const data = {success:true};
  let config = {

};
  var formData = new FormData();
  const file = new File([new ArrayBuffer(1)], 'file.jpg');
  formData.append("file", file);
    let upload={
    request:formData,
    type:'receipts'
  }

  test('post successfully data from an API', async () => {


    axios.delete.mockImplementationOnce(() => Promise.resolve(data));

    await expect(API.deleteFile(upload.request,upload.type)).resolves.toEqual(data);
    expect(axios.delete).toHaveBeenCalledWith(
      `${origin}/api/${upload.type}`,
      upload.request,config
    );
  });

  test('post erroneously data from an API', async () => {
    const errorMessage = 'Network Error';

    axios.delete.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );

    await expect(API.deleteFile(upload.request,upload.type)).rejects.toThrow(errorMessage);
  });
});



