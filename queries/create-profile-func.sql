
-- https://supabase.com/docs/guides/auth/managing-user-data
-- inserts a row into public.profile

-- https://supabase.com/docs/guides/auth/managing-user-data
-- inserts a row into public.profile


create or replace function public.handle_new_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public.profile (id)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_email_confirmed
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
