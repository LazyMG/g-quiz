import { Database } from "types_db";

export type TitleCategory = Database["public"]["Enums"]["title_category"];

export type Quiz = {
  name: string;
  en_name: string;
  mode_code: string;
  aliases:
    | {
        alias: string;
        id: number;
      }[]
    | null;
  id: number;
  image_url: string;
  created_at: string;
};
