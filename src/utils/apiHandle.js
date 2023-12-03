import { APIS, TOKEN_KEY } from '../constans'
import { fetchCustom } from './fetch'
import { getLocalStorage } from './localstorage';
import axios from 'axios';

export const register = async ({ formValue }) => {
  const response = await fetchCustom({
    input: `${APIS.REGISTER}`,
    init: {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValue)
    },
  })

  return response;
}

export const login = async ({ formValue }) => {
  const response = await fetchCustom({
    input: `${APIS.LOGIN}`,
    init: {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formValue)
    },
  })

  return response;
}


export const getProfile = async (token) => {
  const response = await fetchCustom({
    input: `${APIS.GETPROFILE}`,
    init: {
      method: "GET",
      headers: {
        'Authorization': token
      },
    },
  })

  return response;
}

export const getAllTodo = async () => {
  const token = getLocalStorage(TOKEN_KEY);
  const response = await fetchCustom({
    input: `${APIS.GETTODOS}`,
    init: {
      method: "GET",
      headers: {
        'Authorization': token,
      },
    },
  })

  return response;
}

export const addTodo = async ({formValue}) => {
  const token = getLocalStorage(TOKEN_KEY);
  formValue.description = 'test';
  const response = await fetchCustom({
    input: `${APIS.GETTODOS}`,
    init: {
      method: "POST",
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValue)
    },
  })

  return response;
}

export const removeTodo = async ({id}) => {
  const token = getLocalStorage(TOKEN_KEY);
  const response = await fetchCustom({
    input: `${APIS.GETTODOS}${id}`,
    init: {
      method: "DELETE",
      headers: {
        'Authorization': token,
      },
    },
  })

  return response;
}

export const editTodo = async ({id, formValue}) => {
  const token = getLocalStorage(TOKEN_KEY);
  const response = await fetchCustom({
    input: `${APIS.GETTODOS}${id}`,
    init: {
      method: "PUT",
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValue)
    },
  })

  return response;
}