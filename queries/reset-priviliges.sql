CREATE SCHEMA IF NOT EXISTS "auth";
CREATE SCHEMA IF NOT EXISTS "extensions";
create extension if not exists "uuid-ossp"      with schema extensions;
create extension if not exists pgcrypto         with schema extensions;
create extension if not exists pgjwt            with schema extensions;

grant usage on schema public to postgres, anon, authenticated, service_role;
grant usage on schema extensions to postgres, anon, authenticated, service_role;
alter user supabase_admin SET search_path TO public, extensions; -- don't include the "auth" schema

grant all privileges on all tables in schema public to postgres, anon, authenticated, service_role, supabase_admin;
grant all privileges on all functions in schema public to postgres, anon, authenticated, service_role, supabase_admin;
grant all privileges on all sequences in schema public to postgres, anon, authenticated, service_role, supabase_admin;

alter default privileges in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to postgres, anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to postgres, anon, authenticated, service_role;

alter default privileges for user supabase_admin in schema public grant all on sequences to postgres, anon, authenticated, service_role;
alter default privileges for user supabase_admin in schema public grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges for user supabase_admin in schema public grant all on functions to postgres, anon, authenticated, service_role;

alter role anon set statement_timeout = '3s';
alter role authenticated set statement_timeout = '8s';
