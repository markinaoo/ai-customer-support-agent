create extension if not exists pgcrypto;

create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  industry text not null,
  city text,
  address text not null,
  opening_hours text not null,
  phone text not null,
  wechat text not null,
  brand_tone text not null,
  tagline text,
  description text not null,
  handoff_message text,
  hero_image text default '/images/hero-ai-growth-link.jpg',
  cover_image text default '/images/hero-ai-growth-link.jpg',
  demo_label text default '示例门店，仅用于功能演示',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  name text not null,
  price text not null,
  description text default '',
  duration text default '',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  session_id text not null,
  customer_name text,
  channel text not null default 'web_chat',
  status text not null default 'AI Active',
  summary text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (business_id, session_id)
);

create table if not exists public.conversation_messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  role text not null check (role in ('customer', 'ai', 'owner')),
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  conversation_id uuid references public.conversations(id) on delete set null,
  name text,
  phone text,
  wechat text,
  service_needed text,
  preferred_time text,
  customer_message text,
  ai_summary text,
  status text not null default 'New' check (status in ('New', 'Contacted', 'Booked', 'Not interested')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.marketing_drafts (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  channel text not null,
  service_name text,
  campaign_goal text,
  title text not null,
  body text not null,
  cta text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.landing_pages (
  id uuid primary key default gen_random_uuid(),
  business_id uuid not null unique references public.businesses(id) on delete cascade,
  template_key text not null default 'local_service_direct',
  theme_key text not null default 'clean_pro',
  hero_image text,
  draft_content jsonb not null default '{}'::jsonb,
  published_content jsonb not null default '{}'::jsonb,
  qr_target text not null default 'landing' check (qr_target in ('landing', 'chat')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published_at timestamptz
);

alter table public.businesses enable row level security;
alter table public.services enable row level security;
alter table public.faqs enable row level security;
alter table public.conversations enable row level security;
alter table public.conversation_messages enable row level security;
alter table public.leads enable row level security;
alter table public.marketing_drafts enable row level security;
alter table public.landing_pages enable row level security;

drop policy if exists "Allow public read businesses" on public.businesses;
drop policy if exists "Allow public read services" on public.services;
drop policy if exists "Allow public read faqs" on public.faqs;

create policy "Allow public read businesses" on public.businesses for select using (true);
create policy "Allow public read services" on public.services for select using (true);
create policy "Allow public read faqs" on public.faqs for select using (true);
