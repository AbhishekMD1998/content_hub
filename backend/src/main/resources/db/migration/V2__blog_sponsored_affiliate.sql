ALTER TABLE blogs
    ADD COLUMN sponsored BOOLEAN NOT NULL DEFAULT FALSE,
    ADD COLUMN affiliate_label VARCHAR(255),
    ADD COLUMN affiliate_url TEXT;
