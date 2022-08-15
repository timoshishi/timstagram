select distinct(a.atttypid::regtype)
  from pg_class as c
    join pg_namespace as n
        on c.relnamespace = n.oid
    join pg_attribute as a
        on c.oid = a.attrelid
  where nspname = 'public'
    and a.atttypid::regtype::text like '"%"';

-- EXAMPLE RENAME ENUMS 
alter type "FlagReason" rename to FlagReason;