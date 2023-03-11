# MyWeek

MyWeek is a weekly planner & to-do list app. It aims to enhance your productivity, manage your stuff in a week calendar view.

## Features

- Active calendars
- Manage tasks
- Notes
- Drag & drop items
- Dark theme (coming soon)
- Recurring tasks (comming soon)
- Checklists (comming soon)
- Labels (comming soon)

## Development

### Prerequisites

These tools must be installed on your local machine.

- `pnpm`
- `node` v16+

### Installation

```
pnpm install
```

### Create Supabase project

MyWeek uses database & authentication services from [Supabase](https://supabase.com/). You have to create a project in Supabase to get the `URL` and `ANON_KEY`.

<img width="1422" alt="supabase project settings" src="https://user-images.githubusercontent.com/72242664/224473452-7be4cb62-bbf2-4aaf-9d06-f2b64b1766c4.png">

### Start locally

Create a new .env file and add the environment variables which you can get from the Supabase project's settings that you already created in the step above.

```
VITE_SP_URL='supabase_url'
VITE_SP_ANON_KEY='supabase_anon_key'
```

After that, run the following command.

```
pnpm dev
```

## License

MyWeek is released under MIT license. See LICENSE for more information.
