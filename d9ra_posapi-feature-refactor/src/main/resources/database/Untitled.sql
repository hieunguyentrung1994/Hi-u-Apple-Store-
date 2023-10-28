create database intern_project;

use intern_project;
create table role(
id int auto_increment primary key,
name varchar(10)
);

create table users(
user_id int auto_increment primary key,
email varchar(255) unique,
full_name varchar(255),
password varchar(255) not null,
phone varchar(11),
role int default 1,
status bit default 0,
foreign key (role) references role(id)
);

create table categories(
category_id int primary key auto_increment,
name varchar(20) not null,
status bit default 1
);
insert into categories(name) values
("Phone"),("Tablet"),("Accessory");

create table suppliers(
supplier_id int primary key auto_increment,
name varchar(50) not null
);
insert into suppliers(name) values
("Apple"),("SamSung"),("Other");

create table products (
product_id int primary key auto_increment,
product_name varchar(30) not null,
image varchar(255),
description varchar(255),
stock int check(stock>=0),
sell_price double,
import_price double,
status bit default 0,
category_id int,
supplier_id int,
foreign key (category_id) references categories(category_id),
foreign key (supplier_id ) references suppliers(supplier_id)
);

INSERT INTO products (product_name, image, description, stock, sell_price, import_price, category_id, supplier_id)
VALUES ('Iphone 15 512GB Blue', 'product1.jpg', 'Iphone 15', 100, 599, 590, 1, 1),
 ('Iphone 15 1TB Pink', 'product1.jpg', 'Iphone 15', 20, 799, 790, 1, 1),
 ('Samsung Galaxy S23 Ultra', 'product1.jpg', 'SamSung Galaxy', 100, 550, 550, 1, 2),
 ('IPad Pro 11', 'Chip M2 2022', 100, 499, 450, 2, 1);


create table discount(
discount_id int auto_increment primary key,
discount_code varchar(20),
discount_percent double,
stock int,
status bit default 0
);
create table promotion_event(
event_id int auto_increment primary key,
event_name varchar(20),
start_date datetime,
expired_date datetime,
status bit default 0
);
create table order_status(
id int auto_increment primary key,
status_name varchar(10)
);
create table orders(
order_id int auto_increment primary key,
user_id int,
order_at datetime default now(),
total_price double,
price_after_discount double,
status_id int,
note text,
discount_id int,
event_id int,
foreign key (user_id) references users(user_id),
foreign key (discount_id) references discount(discount_id),
foreign key (event_id) references promotion_event(event_id),
foreign key (status_id) references order_status(id)
);
create table orders_detail(
detail_id int auto_increment primary key,
order_id int,
product_id int,
unit_price double,
quantity int,
sub_total_price double,
foreign key (product_id) references products(product_id),
foreign key (order_id) references orders(order_id)
);
create table favorite_list(
list_id int auto_increment primary key,
user_id int,
product_id int,
foreign key (product_id) references products(product_id),
foreign key (user_id) references users(user_id)
);
