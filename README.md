# Nara

Aplikasi keuangan keluarga bergaya **Apple Liquid Glass** yang simpel, tenang, privat, dan **100% gratis** (tanpa backend, tanpa langganan, tanpa server berbayar). Semua data tersimpan langsung di perangkat masing-masing (`localStorage`).

## Fitur Utama

- **Kartu Saldo Nara (Liquid Glass ATM Card):** proporsi kartu bank standar (`1,586 : 1`) dengan efek kaca timbul 3D, menampilkan total saldo dan nama pemilik secara dinamis, tilt 3D halus, serta ketuk untuk membalik melihat ringkasan bulan ini.
- **Animasi Logo Nara:** pembuka *splash* animasi **Glass Ribbon N** + tagline saat aplikasi dibuka (dapat diputar ulang dengan mengetuk ikon logo N di pojok kiri atas).
- **Catat Pintar AI (100% Lokal & Offline):** ketik bebas seperti `"beli rokok 30rb sama makan 20rb"` atau `"nabung 500rb"` — Nara otomatis memecah item, membaca nominal (`rb`, `ribu`, `k`, `jt`, `gocap`, `noban`, dll.), menentukan kategori, dan menampilkan pratinjau sebelum disimpan.
- **Dompet Tabungan (Savings):** kantong tabungan terpisah dari saldo harian (mis. *Dana Darurat*, *Liburan*) lengkap dengan target, bar progres, `+ Nabung`, dan `− Tarik`.
- **Tampilan & Tema:** bawaan **Light Blue (Light Glass)**, lengkap dengan mode **Terang / Gelap / Otomatis** dan 5 palet: **Light Blue**, **Burgundy**, **Sage**, **Sunset**, dan **GTA VI** (*Vice Sunset Pink / Violet / Miami Cyan*).
- **Logo Glass Ribbon N:** tersedia dalam versi Full Logo (Light & Dark), App Icon, dan Monochrome (Light & Dark) di `assets/logo/`.
- **Nama Anggota yang Bisa Diedit:** dua slot anggota (bawaan `Anggota 1` & `Anggota 2`) yang otomatis tampil pada kartu saldo, header, riwayat, dan laporan.
- **Backup & Pulihkan (JSON):** ekspor seluruh data ke `nara-backup-YYYY-MM-DD.json` dan impor kembali dengan konfirmasi sebelum menimpa.
- **Hapus Semua Data:** dilengkapi konfirmasi 2 langkah.
- **Dua Bahasa & Rupiah:** Bahasa Indonesia & Inggris, mata uang Rupiah (IDR).
- **PWA Siap Instal & Offline:** dilengkapi `manifest.json`, Service Worker (`sw.js`), dan ikon 192 & 512 (normal + maskable).

## Struktur File Statis

```text
nara/
├── index.html
├── manifest.json
├── sw.js
├── assets/
│   └── logo/
│       ├── logo-icon.svg
│       ├── logo-full-light.svg
│       ├── logo-full-dark.svg
│       ├── logo-mono-dark.svg
│       └── logo-mono-light.svg
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    ├── icon-maskable-192.png
    └── icon-maskable-512.png
```

## Hosting Gratis di GitHub Pages

1. Buat repository baru di GitHub (mis. `nara`).
2. Unggah seluruh file statis (`index.html`, `manifest.json`, `sw.js`, folder `icons/`, dan folder `assets/`).
3. Buka **Settings → Pages → Source: Deploy from a branch**, pilih branch `main` dan folder `/ (root)`, lalu klik **Save**.
4. Tunggu 1–2 menit hingga URL HTTPS aktif, misalnya:
   `https://<username>.github.io/nara/`

## Membungkus Menjadi APK (Bubblewrap — Gratis)

Setelah URL HTTPS GitHub Pages aktif:

1. Pastikan **Node.js (LTS)** sudah terpasang.
2. Pasang Bubblewrap CLI:
   ```bash
   npm install -g @bubblewrap/cli
   ```
3. Inisialisasi dan bangun APK:
   ```bash
   mkdir nara-twa && cd nara-twa
   bubblewrap init --manifest=https://<username>.github.io/nara/manifest.json
   bubblewrap build
   ```
4. File `.apk` dan `.aab` siap dipasang di HP Android.
