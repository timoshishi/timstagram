create schema if not exists private authorization current_user;
create table if not exists private.other_schema (id serial primary key, body varchar);
insert into private.other_schema (id, body) values (2, 'thos os an issue');
select * from private.other_schema;
select * from private.other_schema;
select * from media  limit 1;