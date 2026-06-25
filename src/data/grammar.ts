/**
 * ============================================================
 *  DATA TATABAHASA (GRAMMAR) JEPANG
 * ============================================================
 *
 *  CARA MENAMBAH / MENGEDIT DATA:
 *  --------------------------------
 *  1. Setiap level (N5, N4, N3, N2, N1) adalah array of object
 *  2. Tambahkan object baru ke array untuk menambah pola kalimat
 *  3. Format setiap object:
 *     {
 *       id: "unik",              // ID unik (wajib, tidak boleh sama)
 *       pattern: "〜は〜です",    // Pola kalimat / grammar pattern
 *       meaning: "... adalah ...", // Arti dalam Bahasa Indonesia
 *       explanation: "...",       // Penjelasan lengkap
 *       example_jp: "...",       // Contoh kalimat bahasa Jepang
 *       example_id: "...",       // Terjemahan contoh kalimat
 *       example_furigana: "...", // Furigana (opsional, bisa kosong "")
 *     }
 *
 *  CONTOH MENAMBAH DATA BARU:
 *  Tambahkan di akhir array level yang sesuai, misal N5:
 *     {
 *       id: "n5-new",
 *       pattern: "〜が好きです",
 *       meaning: "Menyukai ~",
 *       explanation: "Digunakan untuk menyatakan suka terhadap sesuatu",
 *       example_jp: "私は寿司が好きです。",
 *       example_id: "Saya suka sushi.",
 *       example_furigana: "わたしはすしがすきです。",
 *     },
 * ============================================================
 */

export interface GrammarItem {
  id: string;
  pattern: string;
  meaning: string;
  explanation: string;
  example_jp: string;
  example_id: string;
  example_furigana: string;
}

export interface GrammarLevel {
  level: string;         // "N5", "N4", dst
  label: string;         // "JLPT N5 — Pemula"
  color: string;         // Warna tema (tailwind class)
  bgColor: string;       // Warna background
  items: GrammarItem[];
}

export const GRAMMAR_DATA: GrammarLevel[] = [
  // ==============================
  //  JLPT N5 — PEMULA
  // ==============================
  {
    level: "N5",
    label: "JLPT N5 — Pemula",
    color: "text-sky-700",
    bgColor: "bg-sky-50 border-sky-200",
    items: [
      {
        id: "n5-001",
        pattern: "〜は〜です",
        meaning: "... adalah ...",
        explanation: "Pola dasar kalimat positif dalam bahasa Jepang. 「は」(wa) adalah partikel penanda topik, 「です」(desu) adalah kopula (kata kerja penghubung) yang setara dengan 'adalah'.",
        example_jp: "私は学生です。",
        example_id: "Saya adalah mahasiswa.",
        example_furigana: "わたしはがくせいです。",
      },
      {
        id: "n5-002",
        pattern: "〜は〜ではありません",
        meaning: "... bukanlah ...",
        explanation: "Bentuk negatif formal dari 「〜は〜です」. Digunakan untuk menyangkal atau menyatakan bukan sesuatu.",
        example_jp: "私は先生ではありません。",
        example_id: "Saya bukanlah guru.",
        example_furigana: "わたしはせんせいではありません。",
      },
      {
        id: "n5-003",
        pattern: "〜か",
        meaning: "... ? (tanda tanya)",
        explanation: "Partikel 「か」(ka) diletakkan di akhir kalimat untuk membentuk pertanyaan. Dalam bahasa Jepang tertulis, tanda tanya (?) tidak wajib.",
        example_jp: "学生ですか。",
        example_id: "Apakah (Anda) mahasiswa?",
        example_furigana: "がくせいですか。",
      },
      {
        id: "n5-004",
        pattern: "〜の〜",
        meaning: "... milik / dari ...",
        explanation: "Partikel 「の」(no) digunakan untuk menunjukkan kepemilikan atau hubungan antara dua kata benda. Mirip dengan apostrof-s ('s) dalam bahasa Inggris.",
        example_jp: "これは私の本です。",
        example_id: "Ini adalah buku saya.",
        example_furigana: "これはわたしのほんです。",
      },
      {
        id: "n5-005",
        pattern: "〜に〜があります",
        meaning: "Di ... ada ...",
        explanation: "Digunakan untuk menyatakan keberadaan benda/matik di suatu tempat. 「に」menandakan lokasi, 「が」menandakan subjek.",
        example_jp: "机の上に本があります。",
        example_id: "Di atas meja ada buku.",
        example_furigana: "つくえのうえにほんがあります。",
      },
      {
        id: "n5-006",
        pattern: "〜に〜がいます",
        meaning: "Di ... ada ... (makhluk hidup)",
        explanation: "Sama seperti 「〜があります」tapi khusus untuk makhluk hidup (orang, hewan).",
        example_jp: "公園に猫がいます。",
        example_id: "Di taman ada kucing.",
        example_furigana: "こうえんにねこがいます。",
      },
      {
        id: "n5-007",
        pattern: "〜を〜ます",
        meaning: "Melakukan ~ (kepada ~)",
        explanation: "Partikel 「を」(wo/o) menandakan objek langsung dari kata kerja. 「〜ます」adalah bentuk sopan dari kata kerja.",
        example_jp: "毎日日本語を勉強します。",
        example_id: "Setiap hari saya belajar bahasa Jepang.",
        example_furigana: "まいにちにほんごをべんきょうします。",
      },
      {
        id: "n5-008",
        pattern: "〜で〜ます",
        meaning: "Melakukan ~ di/dengan ~",
        explanation: "Partikel 「で」(de) menandakan tempat tindakan dilakukan atau alat/medium yang digunakan.",
        example_jp: "図書館で勉強します。",
        example_id: "Belajar di perpustakaan.",
        example_furigana: "としょかんでべんきょうします。",
      },
      {
        id: "n5-009",
        pattern: "〜から〜まで",
        meaning: "Dari ~ sampai ~",
        explanation: "Digunakan untuk menyatakan rentang waktu atau tempat. 「から」dari, 「まで」sampai.",
        example_jp: "九時から五時まで働きます。",
        example_id: "Bekerja dari jam 9 sampai jam 5.",
        example_furigana: "くじからごじまではたらきます。",
      },
      {
        id: "n5-010",
        pattern: "〜たいです",
        meaning: "Ingin melakukan ~",
        explanation: "Dilekatkan pada bentuk masu (mash) kata kerja untuk menyatakan keinginan. Bentuk: kata kerja masu-stem + たいです.",
        example_jp: "日本に行きたいです。",
        example_id: "Saya ingin pergi ke Jepang.",
        example_furigana: "にほんにいきたいです。",
      },
    ],
  },

  // ==============================
  //  JLPT N4 — DASAR
  // ==============================
  {
    level: "N4",
    label: "JLPT N4 — Dasar",
    color: "text-blue-700",
    bgColor: "bg-blue-50 border-blue-200",
    items: [
      {
        id: "n4-001",
        pattern: "〜ている",
        meaning: "Sedang melakukan ~ / Telah melakukan ~",
        explanation: "Bentuk progressive/continuative. Menyatakan tindakan yang sedang berlangsung atau keadaan yang sudah terjadi.",
        example_jp: "今、本を読んでいます。",
        example_id: "Sekarang saya sedang membaca buku.",
        example_furigana: "いま、ほんをよんでいます。",
      },
      {
        id: "n4-002",
        pattern: "〜たことがある",
        meaning: "Pernah melakukan ~",
        explanation: "Digunakan untuk menyatakan pengalaman. 「た」adalah bentuk lampau, 「ことがある」berarti 'ada hal/momen'.",
        example_jp: "富士山に登ったことがあります。",
        example_id: "Saya pernah mendaki Gunung Fuji.",
        example_furigana: "ふじさんにのぼったことがあります。",
      },
      {
        id: "n4-003",
        pattern: "〜なければならない",
        meaning: "Harus melakukan ~",
        explanation: "Menyatakan kewajiban atau keharusan. Bisa dipersingkat menjadi 「〜なきゃ」dalam bahasa lisan.",
        example_jp: "明日早く起きなければならない。",
        example_id: "Besok saya harus bangun pagi.",
        example_furigana: "あしたはやくおきなければならない。",
      },
      {
        id: "n4-004",
        pattern: "〜と",
        meaning: "Jika / Ketika ~",
        explanation: "Partikel kondisional. Digunakan untuk menyatakan kondisi umum/kebenaran alamiah atau urutan kejadian.",
        example_jp: "春になると桜が咲きます。",
        example_id: "Ketika musim semi tiba, sakura mekar.",
        example_furigana: "はるになるとさくらがさきます。",
      },
      {
        id: "n4-005",
        pattern: "〜たら",
        meaning: "Kalau / Jika ~ (maka)",
        explanation: "Bentuk kondisional yang lebih fleksibel. Bisa digunakan untuk situasi nyata maupun hipotetis.",
        example_jp: "雨が降ったら、行きません。",
        example_id: "Kalau hujan, saya tidak akan pergi.",
        example_furigana: "あめがふったら、いきません。",
      },
      {
        id: "n4-006",
        pattern: "〜ようにする",
        meaning: "Berusaha untuk ~",
        explanation: "Menyatakan usaha atau kebiasaan yang sengaja dilakukan.",
        example_jp: "毎日運動するようにしています。",
        example_id: "Saya berusaha berolahraga setiap hari.",
        example_furigana: "まいにちうんどうするようにしています。",
      },
      {
        id: "n4-007",
        pattern: "〜そうだ（様態）",
        meaning: "Kelihatan / Tampaknya ~",
        explanation: "Digunakan untuk menyatakan kesan atau penampilan luar. Berbeda dengan そうだ (伝聞) yang berarti 'katanya'.",
        example_jp: "このケーキは美味しそうです。",
        example_id: "Kue ini kelihatan enak.",
        example_furigana: "このケーキはおいしそうです。",
      },
      {
        id: "n4-008",
        pattern: "〜はずです",
        meaning: "Seharusnya ~",
        explanation: "Menyatakan ekspektasi atau keyakinan berdasarkan informasi yang dimiliki.",
        example_jp: "彼はもう来るはずです。",
        example_id: "Dia seharusnya sudah datang.",
        example_furigana: "かれはもうくるはずです。",
      },
    ],
  },

  // ==============================
  //  JLPT N3 — MENENGAH
  // ==============================
  {
    level: "N3",
    label: "JLPT N3 — Menengah",
    color: "text-indigo-700",
    bgColor: "bg-indigo-50 border-indigo-200",
    items: [
      {
        id: "n3-001",
        pattern: "〜ように",
        meaning: "Supaya / Agar ~",
        explanation: "Digunakan untuk menyatakan tujuan atau harapan. Sering digunakan dengan 「祈る」(berdoa) atau 「努力する」(berusaha).",
        example_jp: "日本語が話せるように毎日練習しています。",
        example_id: "Setiap hari berlatih supaya bisa berbicara bahasa Jepang.",
        example_furigana: "にほんごがはなせるようにまいにちれんしゅうしています。",
      },
      {
        id: "n3-002",
        pattern: "〜にとって",
        meaning: "Bagi / Menurut ~",
        explanation: "Digunakan untuk menyatakan sudut pandang atau perspektif seseorang.",
        example_jp: "私にとって家族が一番大切です。",
        example_id: "Bagi saya, keluarga adalah yang paling penting.",
        example_furigana: "わたしにとっていかぞくがいちばんたいせつです。",
      },
      {
        id: "n3-003",
        pattern: "〜に関して",
        meaning: "Mengenai / Tentang ~",
        explanation: "Bentuk formal untuk menyatakan topik yang lebih spesifik dari 「について」.",
        example_jp: "この問題に関して意見があります。",
        example_id: "Mengenai masalah ini, saya punya pendapat.",
        example_furigana: "このもんだいにかんしていけんがあります。",
      },
      {
        id: "n3-004",
        pattern: "〜ば〜ほど",
        meaning: "Semakin ~ semakin ~",
        explanation: "Menyatakan korelasi proporsional. Semakin A maka semakin B.",
        example_jp: "勉強すればするほど上手になります。",
        example_id: "Semakin belajar, semakin mahir.",
        example_furigana: "べんきょうすればするほどじょうずになります。",
      },
      {
        id: "n3-005",
        pattern: "〜わけがない",
        meaning: "Mustahil / Tidak mungkin ~",
        explanation: "Menyatakan keyakinan kuat bahwa sesuatu tidak mungkin terjadi.",
        example_jp: "彼がそんなことをするわけがない。",
        example_id: "Mustahil dia melakukan hal seperti itu.",
        example_furigana: "かれがそんなことをするわけがない。",
      },
      {
        id: "n3-006",
        pattern: "〜ても仕方がない",
        meaning: "~ juga tidak ada gunanya",
        explanation: "Menyatakan bahwa melakukan sesuatu tidak akan mengubah apa pun.",
        example_jp: "過去を後悔しても仕方がない。",
        example_id: "Menyesali masa lalu juga tidak ada gunanya.",
        example_furigana: "かこをこうかいしてもしかたがない。",
      },
    ],
  },

  // ==============================
  //  JLPT N2 — MENENGAH ATAS
  // ==============================
  {
    level: "N2",
    label: "JLPT N2 — Menengah Atas",
    color: "text-violet-700",
    bgColor: "bg-violet-50 border-violet-200",
    items: [
      {
        id: "n2-001",
        pattern: "〜にすぎない",
        meaning: "Hanya / Tidak lebih dari ~",
        explanation: "Menyatakan bahwa sesuatu hanya sebatas itu saja, tidak lebih. Sering digunakan untuk merendahkan atau mengecilkan sesuatu.",
        example_jp: "それは一時的な解決にすぎない。",
        example_id: "Itu hanya solusi sementara saja.",
        example_furigana: "それはいちじてきなかいけつにすぎない。",
      },
      {
        id: "n2-002",
        pattern: "〜一方で",
        meaning: "Di satu sisi ~ (namun di sisi lain)",
        explanation: "Digunakan untuk menyatakan dua sisi yang berbeda atau berlawanan dari suatu hal.",
        example_jp: "彼は厳しい一方で、優しい。",
        example_id: "Di satu sisi dia tegas, di sisi lain dia lembut.",
        example_furigana: "かれはきびしいいっぽうで、やさしい。",
      },
      {
        id: "n2-003",
        pattern: "〜上で",
        meaning: "Dalam hal ~ / Setelah ~",
        explanation: "Bisa berarti 'dalam konteks' atau 'setelah melakukan'. Tergantung konteks kalimat.",
        example_jp: "留学する上で、準備が大切です。",
        example_id: "Dalam hal studi ke luar negeri, persiapan itu penting.",
        example_furigana: "りゅうがくするうえで、じゅんびがたいせつです。",
      },
      {
        id: "n2-004",
        pattern: "〜に違いない",
        meaning: "Pasti / Tentu ~",
        explanation: "Menyatakan keyakinan kuat hampir mendekati 100%. Mirip dengan 「〜に決まっている」.",
        example_jp: "彼女は天才に違いない。",
        example_id: "Dia pasti seorang jenius.",
        example_furigana: "かのじょはてんさいにちがいない。",
      },
      {
        id: "n2-005",
        pattern: "〜たびに",
        meaning: "Setiap kali ~",
        explanation: "Digunakan untuk menyatakan bahwa setiap kali sesuatu terjadi, hal lain juga terjadi.",
        example_jp: "会うたびに成長している。",
        example_id: "Setiap kali bertemu, dia terus berkembang.",
        example_furigana: "あうたびにせいちょうしている。",
      },
    ],
  },

  // ==============================
  //  JLPT N1 — LANJUTAN
  // ==============================
  {
    level: "N1",
    label: "JLPT N1 — Lanjutan",
    color: "text-rose-700",
    bgColor: "bg-rose-50 border-rose-200",
    items: [
      {
        id: "n1-001",
        pattern: "〜を余儀なくされる",
        meaning: "Terpaksa ~ / Dipaksa untuk ~",
        explanation: "Ekspresi formal yang menyatakan seseorang terpaksa melakukan sesuatu karena keadaan. Sering digunakan dalam berita dan penulisan formal.",
        example_jp: "会社は倒産を余儀なくされた。",
        example_id: "Perusahaan terpaksa gulung tikar.",
        example_furigana: "かいしゃはとうさんをよぎなくされた。",
      },
      {
        id: "n1-002",
        pattern: "〜ずにはすまない",
        meaning: "Tidak bisa tidak ~ / Pasti akan ~",
        explanation: "Menyatakan bahwa seseorang tidak bisa menghindari melakukan sesuatu. Bentuk negatif tidak terelakkan.",
        example_jp: "この問題については言及せずにはすまない。",
        example_id: "Mengenai masalah ini, tidak bisa tidak harus disinggung.",
        example_furigana: "このもんだいについてはげんきょうせずにはすまない。",
      },
      {
        id: "n1-003",
        pattern: "〜にもかかわらず",
        meaning: "Meskipun ~ / Walaupun ~",
        explanation: "Bentuk kontrafaktual formal. Menyatakan sesuatu terjadi meskipun ada halangan atau berlawanan dengan ekspektasi.",
        example_jp: "大雨にもかかわらず、試合は行われた。",
        example_id: "Meskipun hujan lebat, pertandingan tetap dilaksanakan.",
        example_furigana: "おおあめにもかかわらず、しあいはおこなわれた。",
      },
      {
        id: "n1-004",
        pattern: "〜をものともせず",
        meaning: "Tidak peduli dengan ~ / Mengabaikan ~",
        explanation: "Menyatakan seseorang tidak gentar atau tidak terpengaruh oleh sesuatu yang seharusnya menjadi halangan.",
        example_jp: "批判をものともせず、彼は信念を貫いた。",
        example_id: "Tidak peduli dengan kritik, dia tetap teguh pada pendiriannya.",
        example_furigana: "ひはんをものともせず、かれはしんねんをつらぬいた。",
      },
      {
        id: "n1-005",
        pattern: "〜たりとも",
        meaning: "Sekalipun / Se ~ pun",
        explanation: "Digunakan untuk menekankan 'bahkan sedikitpun tidak'. Sering berpasangan dengan 「ない」.",
        example_jp: "一日たりともサボらない。",
        example_id: "Sekalipun sehari pun tidak pernah bolos.",
        example_furigana: "いちにちたりともサボらない。",
      },
    ],
  },
];
