CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(100) NOT NULL,
  "google_id" varchar(100),
  "first_name" varchar(100),
  "last_name" varchar(100),
  "address1" varchar(100),
  "address2" varchar(100),
  "postcode" varchar(10),
  "city" varchar(100),
  "country" varchar(100),
  "pwd_hash" varchar(100),
  "date_joined" timestamp DEFAULT (now()),
  "active" boolean DEFAULT true,
  "user_role" varchar(100)
);

CREATE TABLE "order_products" (
  "order_id" int,
  "product_id" int,
  "quantity" int DEFAULT 1,
  "price" decimal(10, 2)
);

CREATE TABLE "orders" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int,
  "status" varchar(100),
  "created_at" timestamp DEFAULT (now()),
  "order_price" decimal(10,2)
);

CREATE TABLE "products" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "price" decimal(10,2) NOT NULL,
  "description" varchar,
  "category" varchar(100),
  "image_url" varchar(255),
  "status" varchar(100)
);

CREATE TABLE "carts" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int UNIQUE NOT NULL
);

CREATE TABLE "cart_products" (
  "cart_id" int,
  "product_id" int,
  "quantity" int DEFAULT 1
);

ALTER TABLE "order_products" ADD FOREIGN KEY ("order_id") REFERENCES "orders" ("id");

ALTER TABLE "order_products" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE "orders" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "carts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "cart_products" ADD FOREIGN KEY ("cart_id") REFERENCES "carts" ("id");

ALTER TABLE "cart_products" ADD FOREIGN KEY ("product_id") REFERENCES "products" ("id");

ALTER TABLE cart_products ADD PRIMARY KEY (cart_id, product_id);

ALTER TABLE order_products ADD PRIMARY KEY (order_id, product_id);