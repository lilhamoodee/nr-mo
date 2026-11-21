# DESIGN.md — Nara

> Aturan ini mengikat. Kalau bertentangan dengan default, file ini yang menang.

## 1. Proyek

- **Nama:** Nara
- **Jenis:** Aplikasi keuangan keluarga, satu file HTML statis (PWA siap instal, lalu APK via Bubblewrap)
- **Audiens:** Keluarga Indonesia, orang non-teknis, HP Android/iPhone
- **Bahasa:** Indonesia + Inggris (dua-duanya, bisa diganti di aplikasi)
- **Mata uang:** Rupiah (IDR) saja

## 2. Visual Direction — Apple Liquid Glass / iOS Glassmorphism

- **Karakter visual:** frosted glass surfaces, translucent cards, subtle blur, soft reflections, floating interface elements, smooth transitions, generous whitespace, clean typography, minimalist iconography.
- **Kartu Saldo (ATM Card):** kartu kaca transparan interaktif berisi logo **Glass Ribbon N + NARA**, total saldo, nama pemilik (dinamis dari Pengaturan), efek refleksi cahaya halus, tilt 3D lembut, dan ketuk-untuk-membalik melihat ringkasan bulanan.
- **Hindari:** tampilan aplikasi kas konvensional, warna terlalu ramai, gradient berlebihan, efek glass yang mengganggu keterbacaan, dashboard terlalu padat, desain template admin panel generik.

## 3. Palet Warna & Tema

- **Tema Bawaan — Light Blue (Light Glass):**
  - Cloud White: `#F7F9FC`
  - Aurora Blue: `#A9CCF3`
  - Mist Gray: `#DCE3EC`
  - Slate: `#243449`
  - Silver: `#C5CED9`
- **Mode:** Terang (*Light Glass*, bawaan), Gelap (*Dark Glass*), dan Otomatis (mengikuti sistem).
- **Palet Pilihan di Pengaturan:**
  - **Light Blue** (bawaan)
  - **Burgundy** (`#7C2438`, `#F4F0EE`)
  - **Sage** (`#3F6B53`, `#EFF3F0`)
  - **Sunset** (`#A84E32`, `#F6F0EB`)
  - **GTA VI** (Vice Sunset Pink `#FF4F8B` / Violet `#7B3FE4` / Miami Cyan `#00C6D6` — mode Terang & Gelap)

## 4. Tipografi

- Prioritas: **SF Pro** (`-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text"`) dan **Inter** (Google Fonts).
- Angka memakai `font-variant-numeric: tabular-nums` agar rapi dan mudah dibaca sekilas.

## 5. Logo — Glass Ribbon N

- **Konsep:** monogram huruf **N** berbentuk pita kaca (*continuous glass ribbon*), melengkung dan saling terhubung, transparan dan dimensional, minimalis dan tetap terbaca pada ukuran app icon.
- **Versi aset di `assets/logo/`:**
  - Full logo light background: `logo-full-light.svg`
  - Full logo dark background: `logo-full-dark.svg`
  - App icon: `logo-icon.svg` (+ PNG 192 & 512 normal/maskable di `icons/`)
  - Monochrome dark (untuk latar terang): `logo-mono-dark.svg`
  - Monochrome light (untuk latar gelap): `logo-mono-light.svg`

## 6. Prinsip Produk

- Data 100% lokal di perangkat (`localStorage`), tanpa backend, tanpa akun, tanpa cicilan.
- Semua teknologi dan hosting harus gratis.
- Konfirmasi sebelum aksi berbahaya (impor menimpa data, hapus semua data 2 langkah).
- Animasi cepat dan halus, hormati `prefers-reduced-motion`.
