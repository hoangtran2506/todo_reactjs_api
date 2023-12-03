import { TOKEN_KEY } from '../constans';
import { getLocalStorage } from './localstorage';

export const fetchCustom = async ({input, init}) => {
  const headers = {};

  if (init?.authorization) {
    headers['Authorization'] = getLocalStorage(TOKEN_KEY);
  }
  
  const rs = await fetch(input, {
    ...init,
    headers: {
      ...headers,
      ...init?.headers,
    },
  });

  if (!rs.status) {
    const json = await rs.json();
    throw new Error(json?.message || 'ERR_SYSTEM');
  }

  const json = await rs.json();
  return json;
}