export interface TContact {
  id: string;
  fullName: string;
  preferredName: string;
  description: string;
  image: string;
}

export type TNewContact = Omit<TContact, 'id'>;
