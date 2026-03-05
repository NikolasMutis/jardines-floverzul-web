-- Tabla profiles
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  nombre text not null,
  rol text default 'cliente',
  created_at timestamp with time zone default now()
);

-- Tabla pqrs
create table pqrs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  tipo text not null,
  asunto text not null,
  descripcion text not null,
  estado text default 'pendiente',
  created_at timestamp with time zone default now()
);

-- Activar RLS
alter table profiles enable row level security;
alter table pqrs enable row level security;

-- Policies profiles
create policy "Users can view own profile"
on profiles
for select
using (auth.uid() = id);

create policy "Users can insert own profile"
on profiles
for insert
with check (auth.uid() = id);

-- Policies pqrs
create policy "Users can view own pqrs"
on pqrs
for select
using (auth.uid() = user_id);

create policy "Users can insert own pqrs"
on pqrs
for insert
with check (auth.uid() = user_id);