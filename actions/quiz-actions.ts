"use server";

import { TitleCategory } from "type";
import { encrypt } from "utils/encryption";
import { createServerSupabaseClient } from "utils/supabase/server";

export async function getTitles(categoryList: TitleCategory[]) {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("titles")
    .select("*")
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

  const { data, error } = await supabase
    .from("mobile_suits")
    .select("*")
    .eq("title_id", Number(titleList[0]));

  if (error) {
    console.error(error.message);
    return null;
  }

  if (data) {
    const encrypted = data.map((item) => ({
      ...item,
      name: encrypt(item.name, key.toString()),
    }));
    return encrypted;
  }

  return data;
}
