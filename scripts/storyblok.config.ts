/**
 * Project-specific Storyblok configuration.
 * This is the ONLY file you need to edit when reusing these scripts on another project.
 */

import ruMessages from '../i18n/locales/ru.ts'
import kzMessages from '../i18n/locales/kz.ts'

const config = {
  // ── Auth ──────────────────────────────────────────────────────────────────
  pat: process.env.STORYBLOK_MANAGEMENT_TOKEN
    ?? 'sb_pat_fsFb2QcEYZWihLU67UTaeaUL7-SzOo6_1mOUoOxpbB8',

  // ── Site public URL (used for asset preview in Storyblok editor) ──────────
  siteUrl: 'https://dobroe-serdce.kz',

  // ── Stories (one per locale) ──────────────────────────────────────────────
  stories: [
    { slug: 'kz', name: 'Home (KZ)', path: '/kz', messages: kzMessages as Record<string, any> },
    { slug: 'ru', name: 'Home (RU)', path: '/ru', messages: ruMessages as Record<string, any> },
  ],

  // ── Images to upload from public/ to Storyblok asset library ─────────────
  images: [
    '/about/care.webp',
    '/about/hugs.webp',
    '/about/heart.webp',
    '/gallery/img.webp',
    '/gallery/img1.webp',
    '/gallery/img2.webp',
    '/gallery/img3.webp',
    '/gallery/img4.webp',
    '/gallery/img5.webp',
    '/gallery/img6.webp',
    '/gallery/img7.webp',
  ],
}

export default config
export type StoryblokConfig = typeof config
