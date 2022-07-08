import fetch from './fetch';

export const getFlags = async () => {
  const flags = await fetch(`http://localhost:8080/flags`);
  return flags;
};

export const createFlag = async (input) => {
  const flags = await fetch(`http://localhost:8080/flags`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  return flags;
};

export const updateFlag = async (input) => {
  const flags = await fetch(`http://localhost:8080/flags`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  return flags;
};

export const deleteFlag = async (input) => {
  const flags = await fetch(`http://localhost:8080/flags`, {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });
  return flags;
};
