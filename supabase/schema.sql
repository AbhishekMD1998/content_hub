-- Run this in Supabase SQL Editor (Dashboard → SQL → New query)
-- Creates tables for Content Hub auth, articles, and blogs.

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    google_id VARCHAR(255) UNIQUE,
    display_name VARCHAR(255),
    avatar_url TEXT,
    role VARCHAR(32) NOT NULL DEFAULT 'USER',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT users_auth_check CHECK (
        password_hash IS NOT NULL OR google_id IS NOT NULL
    )
);

CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT,
    author VARCHAR(255),
    category VARCHAR(100),
    read_time VARCHAR(50),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(255) NOT NULL UNIQUE,
    title TEXT NOT NULL,
    excerpt TEXT,
    author VARCHAR(255),
    category VARCHAR(100),
    read_time VARCHAR(50),
    cover_image TEXT,
    tags TEXT[],
    blocks JSONB,
    content TEXT,
    source VARCHAR(32) NOT NULL DEFAULT 'api',
    created_by UUID REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON blogs(slug);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_google_id ON users(google_id);

COMMENT ON TABLE users IS 'Email/password and Google OAuth accounts';
COMMENT ON TABLE articles IS 'Editorial articles served by the API';
COMMENT ON TABLE blogs IS 'Blog posts with optional JSON block content';
