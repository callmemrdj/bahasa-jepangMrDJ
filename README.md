# 🇯🇵 日本語を学ぶ — Belajar Bahasa Jepang

Aplikasi web interaktif untuk belajar bahasa Jepang dengan tampilan elegan bernuansa biru. Kompatibel untuk desktop dan mobile phone.

## ✨ Fitur

| Fitur | Deskripsi |
|-------|-----------|
| 📖 **Tatabahasa** | Pola kalimat JLPT N5 → N1, lengkap penjelasan & contoh |
| 📚 **Kosakata** | Kata Kerja, Kata Sifat, Kosakata N5, Onomatope |
| 字 **Kanji** | Jukugo (onyomi/kunyomi + contoh) & Urutan Penulisan (stroke order interaktif) |
| 🃏 **Flashcard** | Cocokkan kanji/kosakata dengan 1 dari 9 opsi (grid 3×3) |
| 📝 **Quiz** | Campuran soal (kosakata+kanji+grammar), timer countdown, 4 pilihan jawaban |

## 🚀 Cara Menjalankan

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18 atau lebih baru
- npm (sudah termasuk saat install Node.js)

### Install & Jalankan
```bash
# 1. Clone repository
git clone https://github.com/USERNAME/nama-repo.git
cd nama-repo

# 2. Install dependencies
npm install

# 3. Jalankan di browser lokal
npm run dev

# 4. Buka http://localhost:5173
```

### Build untuk Produksi
```bash
npm run build
```
Hasil build ada di folder `dist/` — berisi satu file HTML yang sudah mengandung semua JS & CSS.

## 🌐 Deploy ke GitHub Pages (Gratis!)

### Langkah-langkah:

**1. Buka Repository Settings**
- Pergi ke tab `Settings` di repository GitHub Anda
- Klik `Pages` di sidebar kiri

**2. Setup GitHub Actions (Otomatis)**
- Pada bagian `Source`, pilih **GitHub Actions**
- Tambahkan file `.github/workflows/deploy.yml` (lihat di bawah)

**3. Buat Workflow File**

Buat file `.github/workflows/deploy.yml` dengan isi:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

**4. Push ke GitHub**
```bash
git add .
git commit -m "Deploy app"
git push origin main
```

**5. Selesai!**
- Tunggu 1-2 menit
- Buka: `https://USERNAME.github.io/nama-repo/`

## 📁 Struktur Folder

```
.
├── index.html              ← Entry point HTML
├── package.json            ← Dependencies & scripts
├── vite.config.ts          ← Konfigurasi Vite
├── tsconfig.json           ← Konfigurasi TypeScript
├── .gitignore              ← File yang diabaikan Git
├── README.md               ← Dokumentasi ini
│
├── public/                 ← (opsional) File statis
│
└── src/
    ├── main.tsx            ← Entry point React
    ├── App.tsx             ← Router & layout utama
    ├── index.css           ← Global styles & animasi
    │
    ├── data/               ← 📝 DATA BELAJAR (mudah diedit!)
    │   ├── grammar.ts      ← Pola tatabahasa N5-N1
    │   ├── vocabulary.ts   ← Kosakata per kategori
    │   └── kanji.ts        ← Data kanji (jukugo & stroke order)
    │
    ├── components/         ← Komponen UI
    │   ├── Dashboard.tsx
    │   ├── TopBar.tsx
    │   ├── GrammarSection.tsx
    │   ├── GrammarDetail.tsx
    │   ├── VocabSection.tsx
    │   ├── VocabDetail.tsx
    │   ├── KanjiSection.tsx
    │   ├── KanjiJukugo.tsx
    │   ├── KanjiStroke.tsx
    │   ├── FlashcardGame.tsx
    │   └── QuizPage.tsx
    │
    └── lib/                ← Utility functions
        └── shuffle.ts
```

## 📝 Cara Menambah Data

Semua data belajar ada di folder `src/data/` dan sangat mudah diedit:

### Tambah Kosakata Baru
Buka `src/data/vocabulary.ts`, cari kategori yang sesuai, tambahkan:
```typescript
{
  id: "v-baru",           // ID unik
  kanji: "走る",           // Penulisan kanji/kana
  furigana: "はしる",      // Bacaan hiragana
  romaji: "hashiru",       // Bacaan latin
  meaning: "Berlari",      // Arti Bahasa Indonesia
  type: "v",               // Jenis kata (v/n/adj/adv)
},
```

### Tambah Pola Tatabahasa Baru
Buka `src/data/grammar.ts`, cari level (N5/N4/N3/N2/N1):
```typescript
{
  id: "n5-baru",
  pattern: "〜が好きです",
  meaning: "Menyukai ~",
  explanation: "Penjelasan lengkap...",
  example_jp: "私は寿司が好きです。",
  example_id: "Saya suka sushi.",
  example_furigana: "わたしはすしがすきです。",
},
```

### Tambah Data Kanji Baru
Buka `src/data/kanji.ts`:
```typescript
// Untuk Jukugo:
{
  id: "jk-baru",
  kanji: "漢",
  meaning: "Cina / Han",
  onyomi: "カン",
  kunyomi: "かん",
  level: "N3",
  strokes: 13,
  examples: ["漢字", "漢語"],
  example_meanings: ["Aksara Cina", "Kata Cina"],
},
```

## 🛠️ Tech Stack

- **React 19** — UI library
- **Vite 7** — Build tool (sangat cepat!)
- **TypeScript** — Type safety
- **Tailwind CSS 4** — Utility-first CSS
- **vite-plugin-singlefile** — Output satu file HTML

## 📄 License

MIT — Silakan gunakan dan modifikasi sesuai kebutuhan.

---

<div align="center">

**Made with ❤️ for Japanese learners**

日本語を一緒に頑張りましょう！💪🇯🇵

</div>
