create extension if not exists "pgcrypto";

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  category text not null,
  image_url text not null,
  price numeric not null,
  old_price numeric,
  description text,
  stock_status text default 'In Stock',
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  whatsapp text,
  city text not null,
  address text not null,
  items jsonb not null,
  total_amount numeric not null,
  note text,
  status text default 'Pending',
  created_at timestamptz default now()
);

alter table products enable row level security;
alter table orders enable row level security;

create policy "Public can view products" on products for select using (true);
create policy "Logged in admin can manage products" on products for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

create policy "Anyone can create orders" on orders for insert with check (true);
create policy "Logged in admin can view orders" on orders for select using (auth.role() = 'authenticated');
create policy "Logged in admin can update orders" on orders for update using (auth.role() = 'authenticated');
create policy "Logged in admin can delete orders" on orders for delete using (auth.role() = 'authenticated');

insert into products (name, slug, category, image_url, price, old_price, description, stock_status) values
('Premium Wireless Earbuds', 'premium-wireless-earbuds', 'Electronics', 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=900', 2499, 3499, 'High quality wireless earbuds with clear sound and long battery life.', 'In Stock'),
('Ladies Stylish Handbag', 'ladies-stylish-handbag', 'Fashion', 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900', 1899, 2599, 'Trendy handbag for daily use, office, college, and shopping.', 'In Stock'),
('Kitchen Vegetable Cutter', 'kitchen-vegetable-cutter', 'Kitchen', 'https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?w=900', 1299, 1999, 'Easy vegetable cutter for fast cooking and clean cutting.', 'In Stock')
on conflict (slug) do nothing;
