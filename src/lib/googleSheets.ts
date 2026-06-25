/**
 * Integrasi Google Sheets sebagai database
 *
 * CARA SETUP GOOGLE SHEETS SEBAGAI DATABASE:
 * ==========================================
 *
 * 1. Buat Google Spreadsheet baru
 * 2. Siapkan 2 sheet/tab:
 *
 *    Sheet "Soal" dengan kolom:
 *    A: id, B: soal, C: pilihan_a, D: pilihan_b, E: pilihan_c, D: pilihan_d, E: jawaban_benar
 *    (jawaban_benar berisi: A, B, C, atau D)
 *
 *    Sheet "Hasil" dengan kolom (header di baris 1):
 *    A: timestamp, B: nama, C: benar, D: total_soal, E: nilai, F: persentase,
 *    G: durasi_detik, H: durasi_total_detik, I: sisa_waktu_detik, J: waktu_habis
 *
 * 3. Buka Extensions > Apps Script
 * 4. Buat script web app baru dan paste kode ini:
 *
 *    function doGet(e) {
 *      var action = e.parameter.action;
 *      var ss = SpreadsheetApp.getActiveSpreadsheet();
 *
 *      if (action === 'getQuestions') {
 *        var sheet = ss.getSheetByName('Soal');
 *        var data = sheet.getDataRange().getValues();
 *        var result = [];
 *        for (var i = 1; i < data.length; i++) {
 *          result.push({
 *            id: data[i][0],
 *            soal: data[i][1],
 *            pilihan_a: data[i][2],
 *            pilihan_b: data[i][3],
 *            pilihan_c: data[i][4],
 *            pilihan_d: data[i][5],
 *            jawaban: data[i][6]
 *          });
 *        }
 *        return ContentService.createTextOutput(JSON.stringify({questions: result}))
 *          .setMimeType(ContentService.MimeType.JSON);
 *      }
 *
 *      if (action === 'saveResult') {
 *        var sheet = ss.getSheetByName('Hasil');
 *        sheet.appendRow([
 *          e.parameter.timestamp,
 *          e.parameter.nama,
 *          e.parameter.benar,
 *          e.parameter.total_soal,
 *          e.parameter.nilai,
 *          e.parameter.persentase,
 *          e.parameter.durasi_detik,
 *          e.parameter.durasi_total_detik,
 *          e.parameter.sisa_waktu_detik,
 *          e.parameter.waktu_habis
 *        ]);
 *        return ContentService.createTextOutput(JSON.stringify({success: true}))
 *          .setMimeType(ContentService.MimeType.JSON);
 *      }
 *    }
 *
 *    function doPost(e) {
 *      return doGet(e);
 *    }
 *
 * 5. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Copy Web app URL dan paste ke GOOGLE_SCRIPT_URL di bawah
 *
 * Jika tidak ada URL yang di-set, aplikasi akan menggunakan sample data (mode demo).
 */

export const GOOGLE_SCRIPT_URL = ""; // <-- Paste URL Web App Google Script di sini

export interface Question {
  id: number;
  soal: string;
  pilihan_a: string;
  pilihan_b: string;
  pilihan_c: string;
  pilihan_d: string;
  jawaban: string;
}

export interface QuizResult {
  nama: string;
  benar: number;
  total_soal: number;
  nilai: number;
  persentase: number;
  /** Durasi yang sebenarnya dipakai user (detik) */
  durasi_detik: number;
  /** Total durasi tes yang dialokasikan (detik) */
  durasi_total_detik: number;
  /** Sisa waktu saat tes selesai (detik) */
  sisa_waktu_detik: number;
  /** Apakah waktu habis otomatis */
  waktu_habis: boolean;
}

// Sample data sebagai fallback / mode demo
const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    soal: "Apa ibu kota negara Indonesia?",
    pilihan_a: "Surabaya",
    pilihan_b: "Jakarta",
    pilihan_c: "Bandung",
    pilihan_d: "Yogyakarta",
    jawaban: "B",
  },
  {
    id: 2,
    soal: "Berapa hasil dari 15 + 27?",
    pilihan_a: "40",
    pilihan_b: "41",
    pilihan_c: "42",
    pilihan_d: "43",
    jawaban: "C",
  },
  {
    id: 3,
    soal: "Siapa presiden pertama Indonesia?",
    pilihan_a: "Soeharto",
    pilihan_b: "B.J. Habibie",
    pilihan_c: "Soekarno",
    pilihan_d: "Megawati",
    jawaban: "C",
  },
  {
    id: 4,
    soal: "Planet apa yang dijuluki Planet Merah?",
    pilihan_a: "Venus",
    pilihan_b: "Jupiter",
    pilihan_c: "Saturnus",
    pilihan_d: "Mars",
    jawaban: "D",
  },
  {
    id: 5,
    soal: "Hewan pemakan daun disebut juga dengan istilah?",
    pilihan_a: "Karnivora",
    pilihan_b: "Omnivora",
    pilihan_c: "Herbivora",
    pilihan_d: "Insektivora",
    jawaban: "C",
  },
  {
    id: 6,
    soal: "Bahasa pemrograman yang digunakan untuk styling halaman web adalah?",
    pilihan_a: "HTML",
    pilihan_b: "JavaScript",
    pilihan_c: "CSS",
    pilihan_d: "PHP",
    jawaban: "C",
  },
  {
    id: 7,
    soal: "Berapa jumlah provinsi di Indonesia saat ini?",
    pilihan_a: "34",
    pilihan_b: "37",
    pilihan_c: "38",
    pilihan_d: "39",
    jawaban: "C",
  },
  {
    id: 8,
    soal: "Simbol kimia untuk air adalah?",
    pilihan_a: "O2",
    pilihan_b: "CO2",
    pilihan_c: "H2O",
    pilihan_d: "NaCl",
    jawaban: "C",
  },
  {
    id: 9,
    soal: "Pulau terbesar di Indonesia adalah?",
    pilihan_a: "Jawa",
    pilihan_b: "Sumatera",
    pilihan_c: "Kalimantan",
    pilihan_d: "Papua",
    jawaban: "D",
  },
  {
    id: 10,
    soal: "Tahun berapa Indonesia merdeka?",
    pilihan_a: "1942",
    pilihan_b: "1945",
    pilihan_c: "1948",
    pilihan_d: "1950",
    jawaban: "B",
  },
  {
    id: 11,
    soal: "Siapa penemu lampu pijar?",
    pilihan_a: "Nikola Tesla",
    pilihan_b: "Alexander Graham Bell",
    pilihan_c: "Thomas Edison",
    pilihan_d: "Albert Einstein",
    jawaban: "C",
  },
  {
    id: 12,
    soal: "Mata uang negara Jepang adalah?",
    pilihan_a: "Won",
    pilihan_b: "Yuan",
    pilihan_c: "Yen",
    pilihan_d: "Ringgit",
    jawaban: "C",
  },
  {
    id: 13,
    soal: "Hewan tercepat di dunia adalah?",
    pilihan_a: "Singa",
    pilihan_b: "Cheetah",
    pilihan_c: "Kuda",
    pilihan_d: "Elang",
    jawaban: "B",
  },
  {
    id: 14,
    soal: "Berapakah akar kuadrat dari 144?",
    pilihan_a: "10",
    pilihan_b: "11",
    pilihan_c: "12",
    pilihan_d: "14",
    jawaban: "C",
  },
  {
    id: 15,
    soal: "Samudra terluas di dunia adalah?",
    pilihan_a: "Atlantik",
    pilihan_b: "Hindia",
    pilihan_c: "Pasifik",
    pilihan_d: "Arktik",
    jawaban: "C",
  },
  {
    id: 16,
    soal: "Alat musik tradisional dari Jawa Barat adalah?",
    pilihan_a: "Gamelan",
    pilihan_b: "Angklung",
    pilihan_c: "Sasando",
    pilihan_d: "Tifa",
    jawaban: "B",
  },
  {
    id: 17,
    soal: "Zat hijau daun pada tumbuhan disebut?",
    pilihan_a: "Kloroplas",
    pilihan_b: "Klorofil",
    pilihan_c: "Stomata",
    pilihan_d: "Xilem",
    jawaban: "B",
  },
  {
    id: 18,
    soal: "Berapa jumlah kaki pada serangga?",
    pilihan_a: "4",
    pilihan_b: "6",
    pilihan_c: "8",
    pilihan_d: "10",
    jawaban: "B",
  },
  {
    id: 19,
    soal: "Siapa penulis novel 'Laskar Pelangi'?",
    pilihan_a: "Tere Liye",
    pilihan_b: "Andrea Hirata",
    pilihan_c: "Dewi Lestari",
    pilihan_d: "Pramoedya Anung Toer",
    jawaban: "B",
  },
  {
    id: 20,
    soal: "Organ tubuh manusia yang berfungsi memompa darah adalah?",
    pilihan_a: "Paru-paru",
    pilihan_b: "Hati",
    pilihan_c: "Ginjal",
    pilihan_d: "Jantung",
    jawaban: "D",
  },
];

export async function fetchQuestions(): Promise<Question[]> {
  // Jika URL belum di-set, gunakan sample data
  if (!GOOGLE_SCRIPT_URL) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(SAMPLE_QUESTIONS), 500);
    });
  }

  try {
    const url = `${GOOGLE_SCRIPT_URL}?action=getQuestions&t=${Date.now()}`;
    const response = await fetch(url, {
      method: "GET",
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data && data.questions && Array.isArray(data.questions)) {
      return data.questions;
    }
    throw new Error("Format data tidak valid");
  } catch (err) {
    console.warn("Gagal mengambil soal dari Google Sheets, menggunakan sample data:", err);
    return SAMPLE_QUESTIONS;
  }
}

export async function saveResult(result: QuizResult): Promise<boolean> {
  // Jika URL belum di-set, simpan ke localStorage sebagai fallback
  if (!GOOGLE_SCRIPT_URL) {
    try {
      const existing = JSON.parse(localStorage.getItem("quiz_results") || "[]");
      existing.push({
        timestamp: new Date().toISOString(),
        ...result,
      });
      localStorage.setItem("quiz_results", JSON.stringify(existing));
      console.log("Hasil tersimpan di localStorage (mode demo):", result);
      return true;
    } catch (err) {
      console.error("Gagal menyimpan ke localStorage:", err);
      return false;
    }
  }

  try {
    const params = new URLSearchParams({
      action: "saveResult",
      timestamp: new Date().toISOString(),
      nama: result.nama,
      benar: String(result.benar),
      total_soal: String(result.total_soal),
      nilai: String(result.nilai),
      persentase: String(result.persentase),
      durasi_detik: String(result.durasi_detik),
      durasi_total_detik: String(result.durasi_total_detik),
      sisa_waktu_detik: String(result.sisa_waktu_detik),
      waktu_habis: String(result.waktu_habis),
    });

    const url = `${GOOGLE_SCRIPT_URL}?${params.toString()}`;

    // Gunakan mode no-cors agar request tetap terkirim
    // dan tambahkan timeout agar tidak menggantung UI
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    await fetch(url, {
      method: "GET",
      mode: "no-cors",
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    return true;
  } catch (err) {
    console.error("Gagal menyimpan hasil ke Google Sheets:", err);
    // Fallback: simpan ke localStorage
    try {
      const existing = JSON.parse(localStorage.getItem("quiz_results") || "[]");
      existing.push({
        timestamp: new Date().toISOString(),
        ...result,
      });
      localStorage.setItem("quiz_results", JSON.stringify(existing));
    } catch {}
    return false;
  }
}
