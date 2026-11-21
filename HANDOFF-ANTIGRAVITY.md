# HANDOFF — Uangqita untuk Antigravity

> Baca file ini dulu sampai habis sebelum menyentuh kode.
> File awal: `aplikasi-keuangan.html` (satu file, ~75 KB, sudah dibersihkan —
> tidak ada URL atau PIN asli di dalamnya; ada 2 penanda `TODO(antigravity)`
> di baris 707 dan 711).

## Ringkasan

Uangqita = aplikasi keuangan keluarga, simpel, untuk orang non-teknis.
Pemiliknya mau aplikasi ini **publik dan bisa dijual ke orang-orang terdekat**,
jadi aplikasi harus generik (tanpa nama/brand pribadi yang hardcode),
gampang dipakai tanpa setup apa pun, dan **100% gratis dari sisi biaya**
(tanpa backend, tanpa API berbayar, tanpa hosting berbayar).

## Keputusan yang sudah final (jangan diubah)

- **Tanpa PocketBase, tanpa backend apa pun.** Data hanya di localStorage
  perangkat masing-masing. Konsekuensi yang disepakati: tidak ada sync
  antar-HP — tiap orang datanya ada di HP-nya sendiri. Jangan menambahkan
  sync/backend lagi tanpa diminta.
- **Tanpa fitur cicilan.** Pemilik secara eksplisit tidak mau pelacakan cicilan.
- **Satu file HTML** tetap dipertahankan sebisa mungkin (+ manifest.json dan
  service worker secukupnya untuk PWA/APK).
- **Bahasa Indonesia + Inggris** (sudah ada, pertahankan).
- **Mata uang Rupiah (IDR)** saja.

## Tugas 1 — Hapus PocketBase total

Hapus semua yang berhubungan dengan PocketBase/sync, antara lain:
`DEFAULT_PB_URL`, `pbUrlStored`, key localStorage `keuangan.pbUrl` dan
`keuangan.pbOff`, objek sync (`PB`), indikator sync di header, input URL
PocketBase di pengaturan, dan teks yang menyebut sync antar-HP.
Data transaksi/kategori sudah tersimpan lokal (`saveLocal`/`loadLocal`) —
itu yang dipakai, jangan diubah logikanya.

## Tugas 2 — PIN dibuat pengguna saat pertama buka

- Hapus PIN hardcode (`TODO` baris 707 — placeholder `000000` jangan dipakai
  sebagai PIN final).
- Saat pertama kali dibuka dan belum ada PIN: tampilkan layar "Buat PIN"
  (6 digit, konfirmasi 2x), simpan di localStorage perangkat itu.
- Tambahkan "Ubah PIN" di pengaturan (minta PIN lama dulu).
- Layar kunci, tombol gembok, dan pesan salah PIN yang sudah ada dipertahankan.

## Tugas 3 — Ganti tema (baru)

- Tambahkan pengalih tema manual di pengaturan: Terang / Gelap (saat ini tema
  gelap hanya ikut `prefers-color-scheme` — buat bisa dipilih manual).
- Tambahkan 2–3 palet tambahan selain bawaan (contoh: Sage, Ocean, Sunset —
  bebas asal tetap simpel dan elegan). Pilihan tema tersimpan di localStorage.
- Pakai variabel CSS yang sudah ada (`:root` di baris 13–37) sebagai dasar;
  jangan tulis ulang seluruh CSS.

## Tugas 4 — Fitur tambahan (baru, tetap simpel)

- **Nama anggota bisa diedit:** saat ini nama orang di transaksi hardcode
  Ahmad/Bahiyah (lihat migrasi `Mat`/`Istri` di `loadLocal`). Ganti jadi
  dua slot nama yang bisa diubah di pengaturan (default: "Anggota 1"/"Anggota 2").
  Jangan ubah struktur data transaksi selain nilai `who`.
- **Ekspor/Impor data (backup):** tombol di pengaturan untuk unduh semua data
  (transaksi + kategori) sebagai file JSON, dan tombol impor file JSON yang sama
  (minta konfirmasi sebelum menimpa). Ini penting karena data hanya lokal.
- **Hapus semua data:** tombol di pengaturan dengan konfirmasi 2 langkah.
- Jangan tambah fitur lain (anggaran, grafik, laporan, dsb.) — itu tahap
  berikutnya, bukan sekarang.

## Tugas 5 — Jadikan PWA yang bisa diinstal

- Buat `manifest.json` (nama Uangqita, `display: standalone`, warna tema
  sesuai palet, ikon 192 & 512 maskable — buat ikon sederhana dari huruf "U"
  dengan warna aksen kalau belum ada file gambar).
- Buat service worker sederhana (cache-first untuk file aplikasi, agar bisa
  dibuka offline).
- Daftarkan service worker + manifest di HTML. Target: lolos kriteria
  install PWA di Chrome Android (cek dengan Lighthouse, bagian PWA).

## Tugas 6 — APK (lebih baik kalau bisa)

- Bungkus PWA jadi APK memakai **Bubblewrap** (gratis, dari Google, Trusted
  Web Activity). Syarat: aplikasi sudah di-hosting HTTPS dan lolos kriteria
  PWA (Tugas 5).
- Hasil: file `.apk` (dan `.aab` kalau bisa) + cara instalnya.
- Kalau Bubblewrap/APK mentok: fallback = PWA yang bisa diinstal lewat
  "Add to Home Screen" — itu tetap diterima, tapi laporkan kenapa APK gagal.

## Tugas 7 — Siap hosting statis

- Hasil akhir harus file statis saja (HTML + manifest + service worker +
  ikon), siap di-hosting di GitHub Pages (gratis). Jangan ada proses build
  yang wajib dijalankan server.

## Aturan biaya (penting)

- Semua yang dipakai harus **gratis**: tanpa API berbayar, tanpa layanan
  berbayar, tanpa hosting berbayar.
- Kalau ada langkah yang ternyata butuh bayar/kartu kredit: **berhenti di
  langkah itu, jangan lanjut, laporkan ke pemilik**.

## Yang TIDAK boleh dilakukan

- Menambah backend, akun, login, atau sync.
- Menambah pelacakan cicilan.
- Mengubah logika hitung uang (saldo, total pemasukan/pengeluaran).
- Menyisipkan nama, URL, PIN, atau brand pribadi apa pun ke dalam kode.
- Menambah library/dependency berbayar atau berat tanpa alasan.

## Kriteria terima (cek satu per satu sebelum selesai)

- [ ] Buka file di browser: tidak ada teks "PocketBase"/"sync" di mana pun.
- [ ] Cari `pocketbase` dan `000000` di seluruh kode: nol hasil.
- [ ] Buka pertama kali: diminta buat PIN 6 digit; kunci dan buka lagi dengan PIN itu.
- [ ] Ubah PIN di pengaturan berhasil; PIN lama ditolak.
- [ ] Tambah pemasukan/pengeluaran, tutup browser, buka lagi: data tetap ada.
- [ ] Ganti tema (terang/gelap + palet): tampilannya berubah dan pilihannya tersimpan.
- [ ] Ubah nama anggota: transaksi baru memakai nama baru.
- [ ] Ekspor JSON lalu impor kembali: data pulih.
- [ ] Lighthouse PWA: bisa diinstal (manifest + service worker + ikon OK).
- [ ] APK terinstal di HP Android dan bisa dibuka, atau laporan jelas kenapa tidak.
- [ ] Semua teks tetap ID/EN, angka tetap Rupiah.
