# Journey – A goal-based app for achieving more with less clutter

**[Visit the demo site](https://journeytodo.com)**

This is the repo for Journey for the web. Journey is a todo-app focused on two things: 1. Encourage users to create specific, actionable tasks, and 2. Remove as much clutter as possible through automatic maintenance, so users have more time to focus on their tasks.

## Reasons for Journey

If you're like me at all, a todo-list is essential to get things done each day. It's extremely helpful to start each day with a game plan, and it's rewarding to see items get crossed off the list.

But sometimes things, don't get done. Maybe it's because we were over ambitious with the sheer quantity of tasks, or maybe we wrote something down that was too vague to be tied to a specific part of our life. It happens! But how do we adjust? For me, I frequently pushed uncompleted items to tomorrow, then the next day, then the next day, then... before long, a month had passed and I had built up dozens of tasks that I very clearly had no intention of ever completing! This what Journey aims to solve.

Journey's goal-first approach, paired with its automatic de-clutter functionality, means that users are encouraged to create tasks with meaning. And if some things don't get done for longer than a week, Journey will automatically archive uncompleted tasks, so you don't have to be constantly reminded of what you have yet to complete. Instead, you can focus on what you _are_ completing.

## Quick Start

**[Visit the demo site and create an account to try out Journey!](https://journeytodo.com)**

## Running the project locally

### Prerequisite

To run the project locally, you'll need a Supabase database that mimics the schemas the `supabase` folder. Then, add the `PUBLIC_SUPABASE_URL`
and `PUBLIC_SUPABASE_ANON_KEY` to a `.env.local` file.

Run `bun install && bun dev` to install and run the project.

### Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
