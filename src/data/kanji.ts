/**
 * ============================================================
 *  DATA KANJI JEPANG
 * ============================================================
 *
 *  CARA MENAMBAH / MENGEDIT DATA:
 *  --------------------------------
 *
 *  === JUKUGO (Komponen Kanji) ===
 *  Tambahkan object baru ke array JUKUGO_DATA:
 *     {
 *       id: "unik",
 *       kanji: "漢",
 *       meaning: "Cina / Han",
 *       onyomi: "カン",
 *       kunyomi: "かん",
 *       level: "N3",
 *       strokes: 13,
 *       examples: ["漢字", "漢語"],
 *       example_meanings: ["Aksara Cina", "Kata Cina"],
 *     }
 *
 *  === URUTAN PENULISAN (Stroke Order) ===
 *  Tambahkan object baru ke array STROKE_ORDER_DATA:
 *     {
 *       id: "unik",
 *       kanji: "漢",
 *       meaning: "Cina / Han",
 *       strokes: 13,
 *       level: "N3",
 *       stroke_descriptions: [
 *         "Mulai dari komponen 氵(3 stroke) - sisi kiri",
 *         "Lanjut ke komponen 口 di tengah",
 *         "Lanjut ke komponen 夫 di bawah",
 *         "Selesai",
 *       ],
 *       mnemonics: "Air (氵) di sungai Han (漢) mengalir ke Cina",
 *     }
 *
 * ============================================================
 */

// ===== TIPE DATA =====

export interface JukugoItem {
  id: string;
  kanji: string;
  meaning: string;
  onyomi: string;
  kunyomi: string;
  level: string;
  strokes: number;
  examples: string[];
  example_meanings: string[];
}

export interface StrokeOrderItem {
  id: string;
  kanji: string;
  meaning: string;
  strokes: number;
  level: string;
  stroke_descriptions: string[];
  mnemonics: string;
}

// ===== DATA JUKUGO (Komponen & GABUNGAN KANJI) =====

export const JUKUGO_DATA: JukugoItem[] = [
  {
    id: "jk-001",
    kanji: "食",
    meaning: "Makan",
    onyomi: "ショク / ジキ",
    kunyomi: "た(べる) / く(う)",
    level: "N5",
    strokes: 9,
    examples: ["食堂", "食べ物", "朝食"],
    example_meanings: ["Kantin / Restoran", "Makanan", "Sarapan"],
  },
  {
    id: "jk-002",
    kanji: "学",
    meaning: "Belajar / Ilmu",
    onyomi: "ガク",
    kunyomi: "まな(ぶ)",
    level: "N5",
    strokes: 8,
    examples: ["学校", "学生", "大学"],
    example_meanings: ["Sekolah", "Mahasiswa", "Universitas"],
  },
  {
    id: "jk-003",
    kanji: "日",
    meaning: "Hari / Matahari",
    onyomi: "ニチ / ジツ",
    kunyomi: "ひ / か",
    level: "N5",
    strokes: 4,
    examples: ["日本", "日曜日", "毎日"],
    example_meanings: ["Jepang", "Hari Minggu", "Setiap hari"],
  },
  {
    id: "jk-004",
    kanji: "本",
    meaning: "Buku / Asal",
    onyomi: "ホン",
    kunyomi: "もと",
    level: "N5",
    strokes: 5,
    examples: ["日本", "本棚", "本来"],
    example_meanings: ["Jepang", "Rak buku", "Semula"],
  },
  {
    id: "jk-005",
    kanji: "人",
    meaning: "Orang",
    onyomi: "ジン / ニン",
    kunyomi: "ひと",
    level: "N5",
    strokes: 2,
    examples: ["日本人", "友人", "人口"],
    example_meanings: ["Orang Jepang", "Teman", "Populasi"],
  },
  {
    id: "jk-006",
    kanji: "大",
    meaning: "Besar",
    onyomi: "ダイ / タイ",
    kunyomi: "おお(きい)",
    level: "N5",
    strokes: 3,
    examples: ["大学", "大丈夫", "大人"],
    example_meanings: ["Universitas", "Tidak apa-apa", "Orang dewasa"],
  },
  {
    id: "jk-007",
    kanji: "水",
    meaning: "Air",
    onyomi: "スイ",
    kunyomi: "みず",
    level: "N5",
    strokes: 4,
    examples: ["水曜日", "水泳", "水道"],
    example_meanings: ["Hari Rabu", "Renang", "Air ledeng"],
  },
  {
    id: "jk-008",
    kanji: "火",
    meaning: "Api",
    onyomi: "カ",
    kunyomi: "ひ",
    level: "N5",
    strokes: 4,
    examples: ["火曜日", "火山", "火事"],
    example_meanings: ["Hari Selasa", "Gunung berapi", "Kebakaran"],
  },
  {
    id: "jk-009",
    kanji: "山",
    meaning: "Gunung",
    onyomi: "サン / ザン",
    kunyomi: "やま",
    level: "N5",
    strokes: 3,
    examples: ["山登り", "富士山", "火山"],
    example_meanings: ["Mendaki gunung", "Gunung Fuji", "Gunung berapi"],
  },
  {
    id: "jk-010",
    kanji: "川",
    meaning: "Sungai",
    onyomi: "セン",
    kunyomi: "かわ",
    level: "N5",
    strokes: 3,
    examples: ["小川", "川辺", "河川"],
    example_meanings: ["Anak sungai", "Tepi sungai", "Sungai-sungai"],
  },
];

// ===== DATA URUTAN PENULISAN (STROKE ORDER) =====

export const STROKE_ORDER_DATA: StrokeOrderItem[] = [
  {
    id: "so-001",
    kanji: "一",
    meaning: "Satu",
    strokes: 1,
    level: "N5",
    stroke_descriptions: [
      "1 garis horizontal dari kiri ke kanan (一)",
    ],
    mnemonics: "Hanya satu garis horizontal — seperti angka 1!",
  },
  {
    id: "so-002",
    kanji: "二",
    meaning: "Dua",
    strokes: 2,
    level: "N5",
    stroke_descriptions: [
      "1 garis horizontal pendek di atas (一)",
      "2 garis horizontal panjang di bawah (二)",
    ],
    mnemonics: "Dua garis — garis atas lebih pendek, seperti angka 2 bertumpuk",
  },
  {
    id: "so-003",
    kanji: "三",
    meaning: "Tiga",
    strokes: 3,
    level: "N5",
    stroke_descriptions: [
      "1 garis horizontal paling pendek di atas (一)",
      "2 garis horizontal sedang di tengah (二)",
      "3 garis horizontal paling panjang di bawah (三)",
    ],
    mnemonics: "Tiga garis bertumpuk — makin ke bawah makin panjang",
  },
  {
    id: "so-004",
    kanji: "山",
    meaning: "Gunung",
    strokes: 3,
    level: "N5",
    stroke_descriptions: [
      "1 garis vertical di tengah paling panjang (│)",
      "2 garis vertical pendek di kiri dan kanan (│ │)",
      "3 garis horizontal menghubungkan di tengah (━)",
    ],
    mnemonics: "Seperti gambar gunung — 3 puncak dengan garis penghubung",
  },
  {
    id: "so-005",
    kanji: "川",
    meaning: "Sungai",
    strokes: 3,
    level: "N5",
    stroke_descriptions: [
      "1 garis vertical pendek di kiri (│)",
      "2 garis vertical sedang di tengah (│)",
      "3 garis vertical panjang di kanan (│)",
    ],
    mnemonics: "Tiga aliran air — makin ke kanan makin besar seperti sungai",
  },
  {
    id: "so-006",
    kanji: "人",
    meaning: "Orang",
    strokes: 2,
    level: "N5",
    stroke_descriptions: [
      "1 garis miring dari kiri ke kanan bawah (丿)",
      "2 garis melengkung dari tengah ke kanan bawah (㇏)",
    ],
    mnemonics: "Seperti orang berdiri dengan kaki terbuka",
  },
  {
    id: "so-007",
    kanji: "大",
    meaning: "Besar",
    strokes: 3,
    level: "N5",
    stroke_descriptions: [
      "1 garis horizontal di tengah (一)",
      "2 garis miring kiri dari tengah ke bawah (丿)",
      "3 garis miring kanan dari tengah ke bawah (㇏)",
    ],
    mnemonics: "Orang (人) dengan tangan terbuka lebar — BESAR!",
  },
  {
    id: "so-008",
    kanji: "火",
    meaning: "Api",
    strokes: 4,
    level: "N5",
    stroke_descriptions: [
      "1 titik di kiri atas (丶)",
      "2 garis miring ke kiri bawah (丿)",
      "3 garis kecil di tengah (丨)",
      "4 garis miring ke kanan bawah (㇏)",
    ],
    mnemonics: "Seperti lidah api yang menjulang ke atas dan ke samping",
  },
  {
    id: "so-009",
    kanji: "日",
    meaning: "Matahari / Hari",
    strokes: 4,
    level: "N5",
    stroke_descriptions: [
      "1 garis vertical di kiri (│)",
      "2 garis horizontal di atas (一)",
      "3 garis horizontal di tengah (一) — lebih pendek",
      "4 garis vertical di kanan (│) — menyambung ke garis atas",
    ],
    mnemonics: "Kotak persegi dengan garis horizontal di dalam — seperti jendela melihat matahari",
  },
  {
    id: "so-010",
    kanji: "水",
    meaning: "Air",
    strokes: 4,
    level: "N5",
    stroke_descriptions: [
      "1 garis vertical tengah panjang (丨)",
      "2 garis horizontal kecil kiri-tengah (丶)",
      "3 garis miring ke kiri bawah (丿)",
      "4 garis melengkung ke kanan bawah (㇏)",
    ],
    mnemonics: "Seperti air mengalir dari tengah ke segala arah",
  },
];
