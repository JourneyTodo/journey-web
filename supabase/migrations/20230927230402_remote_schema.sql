create table "public"."tasks" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "goal_id" uuid not null,
    "name" text,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone,
    "target_date" timestamp with time zone,
    "completed_at" timestamp with time zone,
    "completed" boolean default false,
    "description" text
);


alter table "public"."tasks" enable row level security;

CREATE UNIQUE INDEX tasks_pkey ON public.tasks USING btree (id);

alter table "public"."tasks" add constraint "tasks_pkey" PRIMARY KEY using index "tasks_pkey";

alter table "public"."tasks" add constraint "tasks_goal_id_fkey" FOREIGN KEY (goal_id) REFERENCES goals(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "tasks_goal_id_fkey";

alter table "public"."tasks" add constraint "tasks_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."tasks" validate constraint "tasks_user_id_fkey";


