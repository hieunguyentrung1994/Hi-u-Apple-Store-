create database d9_traning_project;

use d9_traning_project;

insert into role(role_name)
values ('ROLE_ADMIN'),
       ('ROLE_USER');

insert into category(name, status)
values ('Điện thoại', true),
       ('Máy tính bảng', true),
       ('Máy tính', true),
       ('Đồng hồ', true),
       ('Âm thanh', true),
       ('Phụ kiện', true);

insert into suppliers(supplier_name, status)
values ('SamSung', true),
       ('Apple', true);


insert into product(description, img_url_main, price, product_name, product_status, stock, category_id,
                    supplier_supplier_id)
values ('Thương hiệu nổi tiếng', 'https://giangdt.s3.us-east-2.amazonaws.com/iphone14plus-blue.png', 20000000,
        'Iphone 14 Pro max', true, 1000, 1, 1),
       ('Iphone 14 giá rẻ nhất thị trường cạnh tranh về giá',
        'https://giangdt.s3.us-east-2.amazonaws.com/iphone14-black.png', 20000000, 'Iphone 14', true, 1000, 2, 2),
       ('sản phẩm thương hiệu bán chạy nhất', 'https://giangdt.s3.us-east-2.amazonaws.com/iphone14plus-purple.png',
        25000000, 'Iphone 14 Pro', true, 1000, 1, 2),
       ('sản phẩm thương hiệu bán chạy nhất', 'https://giangdt.s3.us-east-2.amazonaws.com/ipad-air4-silver.png',
        23000000, 'Ipad air14', true, 1000, 2, 2),
       ('sản phẩm thương hiệu bán chạy nhất', 'https://giangdt.s3.us-east-2.amazonaws.com/ipad-gen10-blue.png',
        17000000, 'Ipad gen10', true, 1000, 2, 2),
       ('sản phẩm thương hiệu bán chạy nhất', 'https://giangdt.s3.us-east-2.amazonaws.com/ipad-proM1-gray11inch.png',
        20000000, 'Ipad proM1', true, 1000, 2, 2),
       ('máy tính Imac Thương hiệu lớn', 'https://giangdt.s3.us-east-2.amazonaws.com/macbook-airM2-gold.png', 40000000,
        'MacBook AirM2', true, 1000, 3, 2),
       ('máy tính Imac Thương hiệu lớn', 'https://giangdt.s3.us-east-2.amazonaws.com/imac-M1-xanh.png', 50000000,
        'Imac M1', true, 1000, 3, 2),
       ('máy tinh Studio nổi tiếng', 'https://giangdt.s3.us-east-2.amazonaws.com/mac-studio.png', 30000000,
        'Mac Studio', true, 1000, 3, 2),
       ('đồng hồ chống nước', 'https://giangdt.s3.us-east-2.amazonaws.com/Watch-S3-42mm-trang.png', 1200000,
        'Watch S3 42mm', true, 1000, 4, 2),
       ('đồng hồ chống nước  thương hiệu mới nhất',
        'https://giangdt.s3.us-east-2.amazonaws.com/Watch-S7-41mm-nikewhite.png', 1500000, 'watch S7 41mm', true, 1000,
        4, 1),
       ('đồng hồ chống nước  thương hiệu mới nhất',
        'https://giangdt.s3.us-east-2.amazonaws.com/Watch-S8-45mm-white.png', 1430000, 'watch S8 45mm', true, 1000, 4,
        1),
       ('tai nghe mới nhất thế giới', 'https://giangdt.s3.us-east-2.amazonaws.com/AirPods Max.png', 24000000,
        'Airpods Max', true, 1000, 5, 2),
       ('tai nghe không dây mới nhất thế giới', 'https://giangdt.s3.us-east-2.amazonaws.com/AirPods Pro 2.png', 3000000,
        'Airpods Pro2', true, 1000, 5, 2),
       ('tai nghe micro cmm 3', 'https://giangdt.s3.us-east-2.amazonaws.com/earpod-remote.png', 180000, 'tai nghe dây',
        true, 1000, 5, 1),
       ('cường kực chính hãng ', 'https://giangdt.s3.us-east-2.amazonaws.com/cuongluc-4.png', 280000,
        'cường lực Iphone 14', true, 1000, 6, 1),
       ('dây đông hồ thay thế', 'https://giangdt.s3.us-east-2.amazonaws.com/daywatch-1.png', 350000, 'dây đồng hồ',
        true, 1000, 6, 2),
       ('cục sạc magsafe dung lượng lớn sản phẩm hcinhs hãng', 'https://giangdt.s3.us-east-2.amazonaws.com/Magsafe.png',
        3500000, 'Magsafe ', true, 1000, 6, 2);

insert into advertisement(img_url_slider, name) values ('https://giangdt.s3.us-east-2.amazonaws.com/slider-Dichvu-1.jpg','Điện thoại'),
                                                       ('https://giangdt.s3.us-east-2.amazonaws.com/slider-iPad-1.jpg','Máy Tính Bảng'),
                                                       ('https://giangdt.s3.us-east-2.amazonaws.com/slider-3.jpg','Máy tính'),
                                                        ('https://giangdt.s3.us-east-2.amazonaws.com/slider-Watch-1.jpg','Đồng hồ'),
                                                        ('https://giangdt.s3.us-east-2.amazonaws.com/banner-1.png','Âm thanh'),
                                                        ('https://giangdt.s3.us-east-2.amazonaws.com/slider-1.jpg','Phụ kiện')