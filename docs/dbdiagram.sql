CREATE TABLE "users" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "email" varchar,
  "password" varchar(255),
  "role" varchar,
  "gender" varchar
);

CREATE TABLE "movies" (
  "id" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  "title" varchar(150),
  "genres" varchar(59),
  "year" varchar(50)
);
