
-- https://supabase.com/docs/guides/auth/managing-user-data
-- inserts a row into public.profile


create or replace function public.handle_confirmed_user() 
returns trigger 
language plpgsql 
security definer set search_path = public
as $$
begin
  insert into public.profile (id, username)
  values (NEW.id, NEW.raw_user_meta_data::json->>'username');
  return new;
end;
$$;

-- trigger the function every time a user is created
CREATE TRIGGER on_auth_email_confirmed
  AFTER UPDATE OF confirmed_at ON auth.users
  FOR EACH ROW 
  EXECUTE PROCEDURE public.handle_confirmed_user();