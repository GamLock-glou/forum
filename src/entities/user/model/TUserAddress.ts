import type { TUserAddressGeo } from './TUserAddressGeo';

export type TUserAddress = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo?: TUserAddressGeo;
};