export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      mobile_suit_aliases: {
        Row: {
          alias: string;
          created_at: string;
          id: number;
          mobile_suit_id: number;
        };
        Insert: {
          alias: string;
          created_at?: string;
          id?: number;
          mobile_suit_id: number;
        };
        Update: {
          alias?: string;
          created_at?: string;
          id?: number;
          mobile_suit_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "mobile_suit_aliases_mobile_suit_id_fkey";
            columns: ["mobile_suit_id"];
            isOneToOne: false;
            referencedRelation: "mobile_suits";
            referencedColumns: ["id"];
          }
        ];
      };
      mobile_suit_titles: {
        Row: {
          created_at: string;
          id: number;
          mobile_suit_id: number;
          title_id: number;
        };
        Insert: {
          created_at?: string;
          id?: number;
          mobile_suit_id: number;
          title_id: number;
        };
        Update: {
          created_at?: string;
          id?: number;
          mobile_suit_id?: number;
          title_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "mobile_suit_titles_mobile_suit_id_fkey";
            columns: ["mobile_suit_id"];
            isOneToOne: false;
            referencedRelation: "mobile_suits";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "mobile_suit_titles_title_id_fkey";
            columns: ["title_id"];
            isOneToOne: false;
            referencedRelation: "titles";
            referencedColumns: ["id"];
          }
        ];
      };
      mobile_suits: {
        Row: {
          created_at: string;
          en_name: string;
          id: number;
          image_url: string | null;
          mode_code: string;
          name: string;
        };
        Insert: {
          created_at?: string;
          en_name: string;
          id?: number;
          image_url?: string | null;
          mode_code: string;
          name: string;
        };
        Update: {
          created_at?: string;
          en_name?: string;
          id?: number;
          image_url?: string | null;
          mode_code?: string;
          name?: string;
        };
        Relationships: [];
      };
      titles: {
        Row: {
          category: Database["public"]["Enums"]["title_category"];
          created_at: string;
          id: number;
          name: string;
          released_at: string;
        };
        Insert: {
          category: Database["public"]["Enums"]["title_category"];
          created_at?: string;
          id?: number;
          name: string;
          released_at: string;
        };
        Update: {
          category?: Database["public"]["Enums"]["title_category"];
          created_at?: string;
          id?: number;
          name?: string;
          released_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_random_mobile_suits_multiple: {
        Args: { title_ids: number[]; limit_count: number };
        Returns: {
          id: number;
          name: string;
          en_name: string;
          mode_code: string;
          image_url: string;
          created_at: string;
          aliases: { id: number; alias: string }[] | null;
        }[];
      };
    };
    Enums: {
      title_category: "ANIMATION" | "COMICS" | "NOVEL" | "GAME" | "ETC";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
      DefaultSchema["Views"])
  ? (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
  ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
  ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
  ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      title_category: ["ANIMATION", "COMICS", "NOVEL", "GAME", "ETC"],
    },
  },
} as const;
