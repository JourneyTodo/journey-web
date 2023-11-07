alter table "public"."goals" drop constraint "goals_user_id_fkey";

alter table "public"."goals" drop constraint "goals_parent_id_fkey";

alter table "public"."tasks" drop constraint "tasks_pkey";

drop index if exists "public"."tasks_pkey";

alter table "public"."goals" add column "path" bit varying
(128000);

alter table "public"."goals" add column "user_goal_id" integer not null;

alter table "public"."goals" alter column "completed" drop not null;

alter table "public"."goals" alter column "created_at"
set
default
(now
() AT TIME ZONE 'utc'::text);

alter table "public"."goals" alter column "index"
set data type
integer using "index"::integer;

alter table "public"."profiles" add column "email" text;

alter table "public"."profiles" alter column "id" drop default;

alter table "public"."tasks" add column "bucket" smallint;

alter table "public"."tasks" add column "index" numeric;

alter table "public"."tasks" add column "user_task_id" numeric not null;

alter table "public"."tasks" alter column "goal_id" drop not null;

alter table "public"."tasks" alter column "user_id" drop not null;

CREATE INDEX goals_index_idx ON public.goals USING btree
(index);

CREATE INDEX goals_parent_id_path_user_goal_id_idx ON public.goals USING btree
(parent_id, path, user_goal_id);

CREATE INDEX goals_path_idx ON public.goals USING btree
(path);

CREATE INDEX goals_path_parent_id_idx ON public.goals USING btree
(path, parent_id);

CREATE INDEX goals_user_goal_id_idx ON public.goals USING btree
(user_goal_id);

CREATE UNIQUE INDEX todos_pkey ON public.tasks USING btree
(id);

alter table "public"."tasks" add constraint "todos_pkey" PRIMARY KEY
using index "todos_pkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE
not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."goals" add constraint "goals_parent_id_fkey" FOREIGN KEY (parent_id) REFERENCES goals(id) ON UPDATE CASCADE ON DELETE CASCADE
not valid;

alter table "public"."goals" validate constraint "goals_parent_id_fkey";

set check_function_bodies
= off;

CREATE OR REPLACE FUNCTION public.decrement_goal_indices
(exclude_id uuid, new_pid uuid, new_index integer, old_index integer)
 RETURNS SETOF goals
 LANGUAGE plpgsql
AS $function$
DECLARE result goals%rowtype;
BEGIN
  IF new_pid IS NULL THEN
    FOR result IN
  UPDATE goals
      SET index = index - 1
      WHERE parent_id IS NULL AND id != exclude_id AND index >= old_index AND index <= new_index
  RETURNING * LOOP
  RETURN next
  result;
END LOOP;
  ELSE
    FOR result IN
UPDATE goals
      SET index = index - 1
      WHERE parent_id = new_pid AND id != exclude_id AND index >= old_index AND index <= new_index
RETURNING * LOOP
RETURN next
result;
END LOOP;
END
IF;
  RETURN;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.decrement_goal_indices
(new_id uuid, new_pid uuid, new_index integer)
 RETURNS SETOF goals
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF new_pid IS NULL THEN
  UPDATE goals
    SET index = index - 1
    WHERE parent_id IS NULL AND id != new_id AND index <= new_index;
  RETURN QUERY
  SELECT *
  FROM goals
  WHERE parent_id IS NULL AND id != new_id AND index <= new_index;
  ELSE
  UPDATE goals
    SET index = index - 1
    WHERE parent_id = new_pid AND id != new_id AND index <= new_index;
  RETURN QUERY
  SELECT *
  FROM goals
  WHERE parent_id = new_pid AND id != new_id AND index <= new_index;
END
IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.gen_goal_path
()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE basePath bit varying
(128000);
BEGIN
  -- SET index
  IF (TG_OP = 'INSERT') THEN
    NEW.index = gen_index
  (NEW.parent_id);
END
IF;

  -- Calculate the materialized path
  basePath :=
(SELECT path
FROM goals
WHERE id = NEW.parent_id);
IF basePath IS NOT NULL then
    NEW.path =
(basePath || NEW.index::bit
(32) || NEW.user_goal_id::bit
(32))::bit varying
(128000);
    ELSE NEW.path =
(NEW.index::bit
(32) || NEW.user_goal_id::bit
(32))::bit varying
(128000);
END
IF;
  RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.gen_index
(p_id uuid)
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    new_idx numeric;
BEGIN
  IF p_id IS NOT NULL then
  SELECT (COUNT(id))
  INTO new_idx
  FROM goals
  WHERE parent_id = p_id;
  ELSE
  SELECT (COUNT(id))
  INTO new_idx
  FROM goals
  WHERE parent_id IS null;
END
IF;
    RETURN new_idx;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.gen_path
()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE current_id uuid;
BEGIN
  NEW.path := ARRAY[NEW.id]; -- Initialize the path with the current id
  current_id := NEW.parent_id;  

  -- Loop to build the path from parent to child
  LOOP EXIT WHEN current_id IS NULL;
SELECT parent_id
INTO current_id
FROM goals
WHERE id = current_id;
-- Get parent's id
NEW.path := NEW.path || current_id;
-- Append the parent_id to the path
END LOOP;

RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.gen_user_goal_id
()
 RETURNS numeric
 LANGUAGE plpgsql
AS $function$
DECLARE
    new_id int4;
BEGIN
  -- Start at 1 to make things slightly more user friendly
  SELECT COALESCE(max(user_goal_id), 0) + 1
  INTO new_id
  FROM goals
  WHERE user_id = auth.uid();
  RETURN new_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.gen_user_task_id
()
 RETURNS numeric
 LANGUAGE plpgsql
AS $function$
DECLARE
    new_id numeric;
BEGIN
  -- Start at 1 to make things slightly more user friendly
  SELECT COALESCE(max(user_task_id), 0) + 1
  INTO new_id
  FROM tasks
  WHERE user_id = auth.uid();
  RETURN new_id;
END;
$function$
;

alter table "public"."goals" alter column "user_goal_id"
set
default gen_user_goal_id
();
alter table "public"."tasks" alter column "user_task_id"
set
default gen_user_task_id
();

CREATE OR REPLACE FUNCTION public.generate_numeric_id
()
 RETURNS integer
 LANGUAGE plpgsql
AS $function$
DECLARE
    new_id numeric;
BEGIN
  SELECT max(id) + 1
  INTO new_id
  FROM goals;
  IF new_id IS NULL THEN
        new_id := 1;
END
IF;
    RETURN new_id;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.get_goals_tree
()
 RETURNS SETOF goals
 LANGUAGE plpgsql
AS $function$
DECLARE
    result_record goals;
BEGIN
  RETURN QUERY
  WITH RECURSIVE tree AS
  (
       SELECT g.*, 0 AS level, ARRAY[id]
  AS path_info
       FROM goals g
       WHERE g.parent_id IS null
       UNION ALL
  SELECT g.*, t.level + 1, t.path_info || g.id
  FROM goals g
    JOIN tree t ON g.parent_id = t.id
  )
  SELECT *
  FROM tree
  ORDER BY path_info;
END;
$function$
;

create type "public"."goals_with_level" as
("parent_id" uuid, "id" uuid, "user_id" uuid, "index" numeric, "created_at" timestamp
with time zone, "updated_at" timestamp
with time zone, "target_date" timestamp
with time zone, "completed_at" timestamp
with time zone, "completed" boolean, "user_goal_id" numeric, "name" text, "description" text, "level" integer, "path" uuid[]);

CREATE OR REPLACE FUNCTION public.handle_new_user
()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  insert into public.profiles
    (id, email, full_name, avatar_url)
  values
    (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.increment_goal_indices
(exclude_id uuid, new_pid uuid, new_index integer, old_index integer)
 RETURNS SETOF goals
 LANGUAGE plpgsql
AS $function$
DECLARE result goals%rowtype;
BEGIN
  IF new_pid IS NULL THEN
    FOR result IN
  UPDATE goals
        SET index = index + 1
        WHERE parent_id IS NULL AND id != exclude_id AND index <= old_index AND index >= new_index
  RETURNING * LOOP
  RETURN next
  result;
END LOOP;
  ELSE
    FOR result IN
UPDATE goals
      SET index = index + 1
      WHERE parent_id = new_pid AND id != exclude_id AND index <= old_index AND index >= new_index
RETURNING * LOOP
RETURN next
result;
END LOOP;
END
IF;
  RETURN;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.materialize_path
(id integer)
 RETURNS bit varying
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN ($1
  ::bit
  (32))::bit varying
  (128000);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.materialize_path
(user_goal_id integer, parent_id uuid)
 RETURNS bit varying
 LANGUAGE plpgsql
AS $function$
BEGIN
  RETURN ((SELECT path
  FROM goals
  WHERE id = $2) || $1
  ::bit
  (32))::bit varying
  (128000);
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_goal_descendants
()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE goals
  SET path = (NEW.path || index::bit(32) || user_goal_id::bit(32)
  )::bit varying
  (128000)
  WHERE parent_id = NEW.id;
RETURN NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_goal_indices
()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE goals
  SET index = index + 1
  WHERE parent_id = NEW.parent_id AND id != NEW.id;
  RETURN NULL;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_goal_indices
(new_id uuid, new_pid uuid, new_index integer, old_index integer)
 RETURNS SETOF goals
 LANGUAGE plpgsql
AS $function$
BEGIN
  IF new_pid IS NULL THEN
  UPDATE goals
    SET index = index + 1
    WHERE parent_id IS NULL AND id != new_id AND index <= old_index AND index >= new_index;
  RETURN QUERY
  SELECT *
  FROM goals
  WHERE parent_id IS NULL AND id != new_id AND index <= old_index AND index >= new_index;
  ELSE
  UPDATE goals
    SET index = index + 1
    WHERE parent_id = new_pid AND id != new_id AND index <= old_index AND index >= new_index;
  RETURN QUERY
  SELECT *
  FROM goals
  WHERE parent_id = new_pid AND id != new_id AND index <= old_index AND index >= new_index;
END
IF;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_goal_indices_null_parent
(new_id uuid, new_index integer)
 RETURNS SETOF goals
 LANGUAGE plpgsql
AS $function$
BEGIN
  UPDATE goals
  SET index = index + 1
  WHERE parent_id IS NULL AND id != new_id AND index >= new_index;
  RETURN QUERY
  SELECT *
  FROM goals
  WHERE parent_id = new_pid AND id != new_id AND index >= new_index;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.update_path
()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE current_id uuid;
BEGIN
  NEW.path := ARRAY[NEW.id]; -- Initialize the path with the current id
  current_id := NEW.parent_id;  

  -- Loop to build the path from parent to child
  LOOP EXIT WHEN current_id IS NULL;
SELECT parent_id
INTO current_id
FROM goals
WHERE id = current_id;
-- Get parent's id
NEW.path := NEW.path || current_id;
-- Append the parent_id to the path
END LOOP;

RETURN NEW;
END;
$function$
;

create policy "Enable delete for authenticated users based on user_id"
on "public"."goals"
as permissive
for
delete
to authenticated
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."goals"
as permissive
for
insert
to authenticated
with check (
true);


create policy "Enable read for authenticated users based on user_id"
on "public"."goals"
as permissive
for
select
  to authenticated
using
((auth.uid
() = user_id));


create policy "Enable update for authenticated users based on user_id"
on "public"."goals"
as permissive
for
update
to authenticated
using ((auth.uid() = user_id))
with check
(true);


create policy "Enable delete for authenticated users based on id"
on "public"."profiles"
as permissive
for
delete
to authenticated
using ((auth.uid() = id));


create policy "Enable insert for authenticated users only"
on "public"."profiles"
as permissive
for
insert
to authenticated
with check (
true);


create policy "Enable read access for authenticated users based on id"
on "public"."profiles"
as permissive
for
select
  to authenticated
using
((auth.uid
() = id));


create policy "Enable update for authenticated users based on id"
on "public"."profiles"
as permissive
for
update
to authenticated
using ((auth.uid() = id))
with check
(true);


create policy "Enable delete for authenticated users based on user_id"
on "public"."tasks"
as permissive
for
delete
to authenticated
using ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."tasks"
as permissive
for
insert
to authenticated
with check (
true);


create policy "Enable read for authenticated users based on user_id"
on "public"."tasks"
as permissive
for
select
  to authenticated
using
((auth.uid
() = user_id));


create policy "Enable update for authenticated users based on user_id"
on "public"."tasks"
as permissive
for
update
to public
using ((auth.uid()
= user_id))
with check
(true);


CREATE TRIGGER gen_goal_path BEFORE
INSERT OR
UPDATE ON public.goals FOR EACH ROW
EXECUTE FUNCTION gen_goal_path
();

CREATE TRIGGER update_descendant_goal_paths AFTER
UPDATE ON public.goals FOR EACH ROW
EXECUTE FUNCTION update_goal_descendants
();

CREATE TRIGGER update_path BEFORE
UPDATE ON public.profiles FOR EACH ROW
EXECUTE FUNCTION update_path
();


