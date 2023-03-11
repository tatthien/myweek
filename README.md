# MyWeek

MyWeek is a weekly planner & to-do list app. It aims to enhance your productivity, manage your stuff in a week calendar view.

<img width="871" alt="Screenshot 2023-03-11 at 15 32 35" src="https://user-images.githubusercontent.com/72242664/224474214-845071e0-f948-4870-8076-3c784e426cf9.png">
<img width="871" alt="Screenshot 2023-03-11 at 15 33 15" src="https://user-images.githubusercontent.com/72242664/224474213-6ea0e0d6-c6d4-4dfc-93ba-30900e5592c2.png">
<img width="871" alt="Screenshot 2023-03-11 at 15 34 14" src="https://user-images.githubusercontent.com/72242664/224474209-e3fbd1a4-fd52-495a-8d3a-4f8ac26c47ae.png">
<img width="871" alt="Screenshot 2023-03-11 at 15 33 32" src="https://user-images.githubusercontent.com/72242664/224474212-a5945ff5-cb2d-44c3-a2a1-18c205aedc88.png">



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
