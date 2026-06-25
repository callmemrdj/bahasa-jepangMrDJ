/**
 * ============================================================
 *  DATA KOSAKATA JEPANG
 * ============================================================
 *
 *  CARA MENAMBAH / MENGEDIT DATA:
 *  --------------------------------
 *  1. Setiap kategori adalah object dalam array VOCAB_DATA
 *  2. Setiap kategori punya array 'items' berisi kosakata
 *  3. Format setiap item kosakata:
 *     {
 *       id: "unik",              // ID unik (wajib, tidak boleh sama)
 *       kanji: "食べる",          // Penulisan Kanji/Kana (tampil utama)
 *       furigana: "たべる",       // Furigana (bacaan hiragana)
 *       romaji: "taberu",        // Romaji (bacaan latin, opsional)
 *       meaning: "Makan",        // Arti dalam Bahasa Indonesia
 *       example_jp: "...",       // Contoh kalimat (opsional)
 *       example_id: "...",       // Terjemahan contoh (opsional)
 *       type: "...",             // Jenis kata (opsional: v, n, adj, adv, dll)
 *     }
 *
 *  CONTOH MENAMBAH KATEGORI BARU:
 *     {
 *       id: "kata-benda",
 *       name: "Kata Benda (名詞)",
 *       icon: "📦",
 *       color: "text-blue-700",
 *       bgColor: "bg-blue-50 border-blue-200",
 *       description: "Kumpulan kata benda umum dalam bahasa Jepang",
 *       items: [
 *         {
 *           id: "kb-001",
 *           kanji: "学校",
 *           furigana: "がっこう",
 *           romaji: "gakkou",
 *           meaning: "Sekolah",
 *           type: "n",
 *         },
 *         // ... tambah item lainnya
 *       ],
 *     },
 *
 *  CONTOH MENAMBAH ITEM DI KATEGORI YANG SUDAH ADA:
 *     Cari kategori yang diinginkan, lalu tambahkan object baru ke
 *     array 'items'.
 * ============================================================
 */

export interface VocabItem {
  id: string;
  kanji: string;
  furigana: string;
  romaji: string;
  meaning: string;
  example_jp?: string;
  example_id?: string;
  type?: string; // v (verb), n (noun), adj (adjective), adv (adverb), dll
}

export interface VocabCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  items: VocabItem[];
}

export const VOCAB_DATA: VocabCategory[] = [
  // ==============================
  //  KATA KERJA (動詞)
  // ==============================
  {
    id: "kata-kerja",
    name: "Kata Kerja (動詞)",
    icon: "🏃",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
    description: "Kumpulan kata kerja umum dalam bahasa Jepang",
    items: [
      {
        id: "v-001",
        kanji: "食べる",
        furigana: "たべる",
        romaji: "taberu",
        meaning: "Makan",
        type: "v",
        example_jp: "朝ご飯を食べる。",
        example_id: "Sarapan.",
        example_furigana: "あさごはんをたべる。",
      } as VocabItem & { example_furigana: string },
      {
        id: "v-002",
        kanji: "飲む",
        furigana: "のむ",
        romaji: "nomu",
        meaning: "Minum",
        type: "v",
        example_jp: "お茶を飲む。",
        example_id: "Minum teh.",
      },
      {
        id: "v-003",
        kanji: "行く",
        furigana: "いく",
        romaji: "iku",
        meaning: "Pergi",
        type: "v",
        example_jp: "学校に行く。",
        example_id: "Pergi ke sekolah.",
      },
      {
        id: "v-004",
        kanji: "来る",
        furigana: "くる",
        romaji: "kuru",
        meaning: "Datang",
        type: "v",
        example_jp: "友達が来る。",
        example_id: "Teman datang.",
      },
      {
        id: "v-005",
        kanji: "見る",
        furigana: "みる",
        romaji: "miru",
        meaning: "Melihat / Menonton",
        type: "v",
        example_jp: "テレビを見る。",
        example_id: "Menonton TV.",
      },
      {
        id: "v-006",
        kanji: "聞く",
        furigana: "きく",
        romaji: "kiku",
        meaning: "Mendengar / Bertanya",
        type: "v",
        example_jp: "音楽を聞く。",
        example_id: "Mendengar musik.",
      },
      {
        id: "v-007",
        kanji: "話す",
        furigana: "はなす",
        romaji: "hanasu",
        meaning: "Berbicara",
        type: "v",
        example_jp: "日本語を話す。",
        example_id: "Berbicara bahasa Jepang.",
      },
      {
        id: "v-008",
        kanji: "書く",
        furigana: "かく",
        romaji: "kaku",
        meaning: "Menulis",
        type: "v",
        example_jp: "手紙を書く。",
        example_id: "Menulis surat.",
      },
      {
        id: "v-009",
        kanji: "読む",
        furigana: "よむ",
        romaji: "yomu",
        meaning: "Membaca",
        type: "v",
        example_jp: "本を読む。",
        example_id: "Membaca buku.",
      },
      {
        id: "v-010",
        kanji: "買う",
        furigana: "かう",
        romaji: "kau",
        meaning: "Membeli",
        type: "v",
        example_jp: "お土産を買う。",
        example_id: "Membeli oleh-oleh.",
      },
      {
        id: "v-011",
        kanji: "買う",
        furigana: "かう",
        romaji: "kau",
        meaning: "Membeli",
        type: "v",
        example_jp: "お土産を買う。",
        example_id: "Membeli oleh-oleh.",
      },
      {
        id: "v-012",
        kanji: "帰る",
        furigana: "かえる",
        romaji: "kaeru",
        meaning: "Pulang",
        type: "v",
        example_jp: "家に帰る。",
        example_id: "Pulang ke rumah.",
      },
    ],
  },

  // ==============================
  //  KATA SIFAT / KEADAAN (形容詞)
  // ==============================
  {
    id: "kata-sifat",
    name: "Kata Sifat (形容詞)",
    icon: "✨",
    color: "text-emerald-700",
    bgColor: "bg-emerald-50 border-emerald-200",
    description: "Kata sifat i-adj dan na-adj bahasa Jepang",
    items: [
      {
        id: "adj-001",
        kanji: "大きい",
        furigana: "おおきい",
        romaji: "ookii",
        meaning: "Besar",
        type: "i-adj",
      },
      {
        id: "adj-002",
        kanji: "小さい",
        furigana: "ちいさい",
        romaji: "chiisai",
        meaning: "Kecil",
        type: "i-adj",
      },
      {
        id: "adj-003",
        kanji: "新しい",
        furigana: "あたらしい",
        romaji: "atarashii",
        meaning: "Baru",
        type: "i-adj",
      },
      {
        id: "adj-004",
        kanji: "古い",
        furigana: "ふるい",
        romaji: "furui",
        meaning: "Lama / Tua",
        type: "i-adj",
      },
      {
        id: "adj-005",
        kanji: "美味しい",
        furigana: "おいしい",
        romaji: "oishii",
        meaning: "Enak / Lezat",
        type: "i-adj",
      },
      {
        id: "adj-006",
        kanji: "静か",
        furigana: "しずか",
        romaji: "shizuka",
        meaning: "Tenang / Sunyi",
        type: "na-adj",
      },
      {
        id: "adj-007",
        kanji: "元気",
        furigana: "げんき",
        romaji: "genki",
        meaning: "Sehat / Bersemangat",
        type: "na-adj",
      },
      {
        id: "adj-008",
        kanji: "有名",
        furigana: "ゆうめい",
        romaji: "yuumei",
        meaning: "Terkenal",
        type: "na-adj",
      },
      {
        id: "adj-009",
        kanji: "暇",
        furigana: "ひま",
        romaji: "hima",
        meaning: "Luang / Senggang",
        type: "na-adj",
      },
      {
        id: "adj-010",
        kanji: "便利",
        furigana: "べんり",
        romaji: "benri",
        meaning: "Praktis / Nyaman",
        type: "na-adj",
      },
    ],
  },

  // ==============================
  //  LEVEL N5 — KOSAKATA DASAR
  // ==============================
  {
    id: "level-n5",
    name: "Kosakata N5",
    icon: "🌱",
    color: "text-sky-700",
    bgColor: "bg-sky-50 border-sky-200",
    description: "Kosakata dasar untuk level JLPT N5",
    items: [
      {
        id: "n5v-001",
        kanji: "私",
        furigana: "わたし",
        romaji: "watashi",
        meaning: "Saya",
        type: "n",
      },
      {
        id: "n5v-002",
        kanji: "あなた",
        furigana: "あなた",
        romaji: "anata",
        meaning: "Anda",
        type: "n",
      },
      {
        id: "n5v-003",
        kanji: "先生",
        furigana: "せんせい",
        romaji: "sensei",
        meaning: "Guru / Dosen",
        type: "n",
      },
      {
        id: "n5v-004",
        kanji: "学生",
        furigana: "がくせい",
        romaji: "gakusei",
        meaning: "Mahasiswa / Pelajar",
        type: "n",
      },
      {
        id: "n5v-005",
        kanji: "友達",
        furigana: "ともだち",
        romaji: "tomodachi",
        meaning: "Teman",
        type: "n",
      },
      {
        id: "n5v-006",
        kanji: "家族",
        furigana: "かぞく",
        romaji: "kazoku",
        meaning: "Keluarga",
        type: "n",
      },
      {
        id: "n5v-007",
        kanji: "水",
        furigana: "みず",
        romaji: "mizu",
        meaning: "Air",
        type: "n",
      },
      {
        id: "n5v-008",
        kanji: "時間",
        furigana: "じかん",
        romaji: "jikan",
        meaning: "Waktu",
        type: "n",
      },
      {
        id: "n5v-009",
        kanji: "天気",
        furigana: "てんき",
        romaji: "tenki",
        meaning: "Cuaca",
        type: "n",
      },
      {
        id: "n5v-010",
        kanji: "駅",
        furigana: "えき",
        romaji: "eki",
        meaning: "Stasiun",
        type: "n",
      },
    ],
  },

  // ==============================
  //  ONOMATOPE (擬音語・擬態語)
  // ==============================
  {
    id: "onomatope",
    name: "Onomatope (擬音語)",
    icon: "🔔",
    color: "text-amber-700",
    bgColor: "bg-amber-50 border-amber-200",
    description: "Kata-kata bunyi dan ungkapan perasaan bahasa Jepang",
    items: [
      {
        id: "ono-001",
        kanji: "ザーザー",
        furigana: "ザーザー",
        romaji: "zaazaa",
        meaning: "Suara hujan deras",
        type: "giongo",
        example_jp: "雨がザーザー降っている。",
        example_id: "Hujan turun deras.",
      },
      {
        id: "ono-002",
        kanji: "ドキドキ",
        furigana: "ドキドキ",
        romaji: "dokidoki",
        meaning: "Jantung berdebar (deg-degan)",
        type: "gitaigo",
        example_jp: "試験の結果がドキドキする。",
        example_id: "Deg-degan dengan hasil ujian.",
      },
      {
        id: "ono-003",
        kanji: "ワクワク",
        furigana: "ワクワク",
        romaji: "wakuwaku",
        meaning: "Gembira / Bersemangat (excited)",
        type: "gitaigo",
        example_jp: "旅行がワクワクする。",
        example_id: "Excited dengan perjalanan.",
      },
      {
        id: "ono-004",
        kanji: "ぺらぺら",
        furigana: "ぺらぺら",
        romaji: "perapera",
        meaning: "Fasih (berbicara) / Tipis",
        type: "gitaigo",
        example_jp: "彼女は日本語がぺらぺらだ。",
        example_id: "Dia fasih berbahasa Jepang.",
      },
      {
        id: "ono-005",
        kanji: "ぎらぎら",
        furigana: "ぎらぎら",
        romaji: "giragira",
        meaning: "Silau / Menyilaukan (matahari terik)",
        type: "giongo",
        example_jp: "太陽がぎらぎらしている。",
        example_id: "Matahari bersinar silau.",
      },
      {
        id: "ono-006",
        kanji: "ぐっすり",
        furigana: "ぐっすり",
        romaji: "gussuri",
        meaning: "Tidur nyenyak",
        type: "gitaigo",
        example_jp: "昨夜ぐっすり眠った。",
        example_id: "Tadi malam tidur nyenyak.",
      },
      {
        id: "ono-007",
        kanji: "いらいら",
        furigana: "いらいら",
        romaji: "iraira",
        meaning: "Kesal / Jengkel",
        type: "gitaigo",
        example_jp: "渋滞でいらいらした。",
        example_id: "Kesal karena macet.",
      },
      {
        id: "ono-008",
        kanji: "のろのろ",
        furigana: "のろのろ",
        romaji: "noronoro",
        meaning: "Sangat lambat / Lembam",
        type: "gitaigo",
        example_jp: "カタツムリがのろのろ動く。",
        example_id: "Siput bergerak sangat lambat.",
      },
    ],
  },
];
