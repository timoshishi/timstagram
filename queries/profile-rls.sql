-- https://supabase.com/docs/guides/auth/managing-user-data

create policy "Public profiles are viewable by everyone."
  on profile for select
  using ( true );

create policy "Users can insert their own profile."
  on profile for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profile for update
  using ( auth.uid() = id );