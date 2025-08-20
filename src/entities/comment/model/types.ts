import type { TBaseId } from "@/shared/lib/types";

export type TComment = {
  postId: TBaseId;
  id: TBaseId;
  name: string;
  email: string;
  body: string;
};
