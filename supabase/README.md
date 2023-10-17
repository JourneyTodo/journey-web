# JourneyTodo — Supabase Database

This directory contains the database schema, migrations, and documentation for the Supabase database. Supabase is a Postgres database with a REST API and realtime subscriptions built in.

More on Supabase: https://supabase.io/

## Tables

### `profiles`

For storing basic user profile information such as name and avatar

| Column           | Type         | Description                                                      |
| ---------------- | ------------ | ---------------------------------------------------------------- |
| `id`             | `uuid`       | Unique identifier for the user `from auth.users.id`. Primary Key |
| `email`          | `text`       | The user's email address. Nullable                               |
| `created_at`     | `timestampz` | Timestamp of when the user was created. Nullable                 |
| `updated_at`     | `timestampz` | Timestamp of when the user was last updated. Nullable            |
| `full_name`      | `text`       | The user's full name. Nullable                                   |
| `preferred_name` | `text`       | The user's preferred name to display. Nullable                   |
| `avatar_url`     | `text`       | The user's avatar URL. Nullable                                  |

### `goals`

For storing user goals

| Column         | Type         | Description                                                                                            |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------ |
| `id`           | `uuid`       | Unique identifier for the goal. Primary Key                                                            |
| `parent_id`    | `uuid`       | The goal's parent goal ID, for goals that sit inside another goal. Foreign Key to `goals.id`. Nullable |
| `user_id`      | `uuid`       | The user's ID. Foreign Key to `profiles.id`                                                            |
| `user_goal_id` | `numeric`    | identifier for a goal that is unique to the user.                                                      |
| `name`         | `text`       | The goal's name.                                                                                       |
| `index`        | `numeric`    | The goal's index for ordering. Nullable                                                                |
| `created_at`   | `timestampz` | Timestamp of when the goal was created. Nullable                                                       |
| `updated_at`   | `timestampz` | Timestamp of when the goal was last updated. Nullable                                                  |
| `target_date`  | `timestampz` | The goal's target end date. Nullable                                                                   |
| `completed_at` | `timestampz` | Timestamp of when the goal was completed. Nullable                                                     |
| `completed`    | `boolean`    | Whether the goal is completed. Defaults to false                                                       |
| `description`  | `text`       | The goal's description. Nullable                                                                       |
| `path`         | `uuid[]`     | Materialized path for the goal.                                                                        |

### `tasks`

For storing user tasks

| Column         | Type         | Description                                                                    |
| -------------- | ------------ | ------------------------------------------------------------------------------ |
| `id`           | `uuid`       | Unique identifier for the task. Primary Key                                    |
| `goal_id`      | `uuid`       | The task's goal ID. Foreign Key to `goals.id`. Nullable                        |
| `user_id`      | `uuid`       | The user's ID. Foreign Key to `profiles.id`                                    |
| `user_task_id` | `numeric`    | identifier for a task that is unique to the user.                              |
| `name`         | `text`       | The task's name.                                                               |
| `description`  | `text`       | The task's description. Nullable                                               |
| `created_at`   | `timestampz` | Timestamp of when the task was created. Nullable                               |
| `updated_at`   | `timestampz` | Timestamp of when the task was last updated. Nullable                          |
| `target_date`  | `timestampz` | The goal's target end date. Nullable                                           |
| `completed_at` | `timestampz` | Timestamp of when the task was completed. Nullable                             |
| `completed`    | `boolean`    | Whether the task is completed. Defaults to false. Nullable                     |
| `index`        | `numeric`    | The task's index for ordering. Nullable                                        |
| `bucket`       | `int2`       | A category aka 'bucket' that the task may belong. 0 represents Inbox. Nullable |
