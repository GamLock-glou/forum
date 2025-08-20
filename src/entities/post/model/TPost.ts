import type { TBaseId } from "@/shared/lib/types";

export type TPost = {
  userId: TBaseId;
  id: TBaseId;
  title: string;
  body: string;
  likes?: number;
  dislikes?: number;
  priority?: number;
  createdAt?: string;
};