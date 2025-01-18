import axios from 'axios';
import { TContact } from '../interface.ts';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const createItem = async (newItem: Omit<TContact, 'id'>) => {
  const response = await api.post('/contacts', newItem);
  return response.data;
};

export const fetchContacts = async () => {
  const response = await api.get('/contacts');
  return response.data;
};
export const editItem = async (contactToEdit: TContact) => {
  const response = await api.put(
    `/contacts/${contactToEdit.id}`,
    contactToEdit,
  );
  return response.data;
};

export const deleteItem = async (id: string) => {
  try {
    await api.delete(`/contacts/${id}`);
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};
