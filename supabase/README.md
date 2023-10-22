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

| Column         | Type                  | Description                                                                                                                                                                            |
| -------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`           | `uuid`                | Unique identifier for the goal. Primary Key                                                                                                                                            |
| `parent_id`    | `uuid`                | The goal's parent goal ID, for goals that sit inside another goal. Foreign Key to `goals.id`. Nullable                                                                                 |
| `user_id`      | `uuid`                | The user's ID. Foreign Key to `profiles.id`                                                                                                                                            |
| `user_goal_id` | `numeric`             | identifier for a goal that is unique to the user.                                                                                                                                      |
| `name`         | `text`                | The goal's name.                                                                                                                                                                       |
| `index`        | `numeric`             | The goal's index for ordering. 0-based index & relative to a hierarchical level.                                                                                                       |
| `created_at`   | `timestampz`          | Timestamp of when the goal was created. Nullable                                                                                                                                       |
| `updated_at`   | `timestampz`          | Timestamp of when the goal was last updated. Nullable                                                                                                                                  |
| `target_date`  | `timestampz`          | The goal's target end date. Nullable                                                                                                                                                   |
| `completed_at` | `timestampz`          | Timestamp of when the goal was completed. Nullable                                                                                                                                     |
| `completed`    | `boolean`             | Whether the goal is completed. Defaults to false                                                                                                                                       |
| `description`  | `text`                | The goal's description. Nullable                                                                                                                                                       |
| `path`         | `bit varying(128000)` | Materialized path for the goal, sorted by index. Every 8 bytes is the goal's index concatenated by it's id for for easy sorting. Maximum size allowed is 128,000 bits, or 16,000 bytes |

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

### The Path Column

This thing deserves it's own section since it's probably the most complex part of what's otherwise a relatively simple database.

The design of this column was in part thanks to the learnings from [this article by Jeff Moden](https://www.sqlservercentral.com/articles/hierarchies-on-steroids-1-convert-an-adjacency-list-to-nested-sets).

`path` follows the principles of a materialized path. The idea is that a goal's entire 'path' from the root to the child can be represented in a single value

Let's say we have the following goals `A`, `B`, `C`, and `D`.

- `B` is a child of `A`
- `D` is a child of `C`

In this case the paths would look something like this:

1. A: `A`
1. B: `A/B`
1. C: `C`
1. D: `C/D`

This gives us the power to sort the `path` column and receive all the goals in the correct hierarchical order. Super neat! We can improve this though. The next step is to represent the paths as a numerical value.
More specifically, we need to concatenate together some numerical identifiers. Let's go back to our alphabetical goals and give them intger based ids:
| Name | Id | Path |
| ---- | -- | ---- |
| `A` |`0`| `0` |
| `B` |`1`| `01` |
| `C` |`2`| `2` |
| `D` | `3` | `23` |

This sort of works, but we'll lose valuable path information if we just use an integer value; technically `B`'s path is going to be just 1. So we need to represent these in binary instead.
| Name | Id | Path |
| ---- | -- | ---- |
| `A` |`0`| `00` |
| `B` |`1`| `0001` |
| `C` |`2`| `10` |
| `D` | `3` | `1011` |

Bam! Now we're preserving all the id's information, and the `path` column can be used to properly arrange the parent/child relationships.

Now, what if we want to also sort by an arbitrary, user-based index? For example, a user may create a brand new goal and have the desire to display it at the top of their sidenav. How can we sort by both the hierarchical path and this arbitrary index? Well, we can change our `path` values to contain both the index _and_ the id! Check this out:

(make sure you read the definition of the `index` column above)
| Name | Id | Index | Parent Id | Path |
| ---- | -- | ----- | --------- | ---- |
| `A` |`0`| `1` | NULL | `00` |
| `B` |`1`| `1` | 0 | `0001` |
| `C` |`2`| `0` | 0 | `0010` |
| `D` | `3` | `0` | NULL | `11` |

In this example, `D` is first, followed by `A`. `B` and `C` are children of `A`, and their order is `C` then `B`. So the expected hierarchy is as follows:

```txt
- D
- A
  - C
  - B
```

Unfortunately, if we were to sort by the `paths` columns, while the hierarchy would be correct, the order would be totally off due to the order of the ids:

```txt
- A
  - B
  - C
- D
```

But fret not! We can fix this by _combining_ the `index` and `id` together when forming our path. We'll stick to our 2 bit binary to represent our integers for now:
| Name | Id | Index | Parent Id | Path |
| ---- | -- | ----- | --------- | ---- |
| `A` |`0`| `1` | `NULL` | `0100` |
| `B` |`1`| `1` | `0` | `01000101` |
| `C` |`2`| `0` | `0` | `01000010` |
| `D` | `3` | `0` | `NULL` | `0011` |

Note that the index comes _before_ the id. This is necessary to properly sort. Now we have binary values that represent both our index and our ids!

In Journey's database, we use 32 bits (4 bytes) to represent the integers in our paths for effectively 2^32 or 4,294,967,296 unique ids. Since we store 2 integers for each goal, that means each level in a path takes up 64 bits. On top of that, the `paths` column is set to cap out at 128,000 bits, which means a maximum hierarchy depth of 2,000 is allowed. This should be more than enough space!!!
