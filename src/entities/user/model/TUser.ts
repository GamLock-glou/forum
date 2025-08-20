import type { TBaseId } from "@/shared/lib/types";
import type { TUserAddress } from "./TUserAddress";
import type { TUserCompany } from "./TUserCompany";

export type TUser = {
  id: TBaseId;
  name: string;
  username: string;
  email: string;
  address?: TUserAddress;
  phone: string;
  website: string;
  company?: TUserCompany;
  isAdmin?: boolean;
};