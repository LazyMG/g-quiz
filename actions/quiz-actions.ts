"use server";

import { TitleCategory } from "type";
import { encrypt } from "utils/encryption";
import { createServerSupabaseClient } from "utils/supabase/server";

export async function getTitles(categoryList: TitleCategory[]) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("titles")
    .select("*,mobile_suit_titles(count)")
    .in("category", categoryList);

  if (error) {
    console.error(error.message);
    return [];
  }

  if (!data) {
    return [];
  }
  return data;
}

export async function getQuestions(
  titleList: string[],
  count = 0,
  key: number
) {
  const supabase = await createServerSupabaseClient();

  const titleIds = titleList.map(Number);

  const { data, error } = await supabase.rpc(
    "get_random_mobile_suits_multiple",
    {
      title_ids: titleIds,
      limit_count: count,
    }
  );

  if (error) {
    console.error(error.message);
    return null;
  }

  if (data) {
    const encrypted = data.map((item) => ({
      ...item,
      name: encrypt(item.name, key.toString()),
      en_name: encrypt(item.en_name, key.toString()),
      mode_code: encrypt(item.mode_code, key.toString()),
      aliases: Array.isArray(item.aliases)
        ? (item.aliases as { id: number; alias: string }[]).map((alias) => ({
            ...alias,
            alias: encrypt(alias.alias, key.toString()),
          }))
        : null,
    }));
    return encrypted;
  }

  return data;
}
