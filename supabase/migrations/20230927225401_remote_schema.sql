create table "public"."goals" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid,
    "name" text not null,
    "index" numeric,
    "created_at" timestamp with time zone not null,
    "updated_at" timestamp with time zone,
    "target_date" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "completed" boolean not null default false,
    "description" text,
    "parent_id" uuid
);


alter table "public"."goals" enable row level security;

CREATE UNIQUE INDEX goals_pkey ON public.goals USING btree (id);

alter table "public"."goals" add constraint "goals_pkey" PRIMARY KEY using index "goals_pkey";

alter table "public"."goals" add constraint "goals_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES goals(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."goals" validate constraint "goals_parent_id_fkey";

alter table "public"."goals" add constraint "goals_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."goals" validate constraint "goals_user_id_fkey";


