import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  try {
    const result = await sql`
      SELECT NOW() AS time
    `;

    res.status(200).json({
      success: true,
      message: "DersTakip + Neon PostgreSQL çalışıyor 🚀",
      database: "connected",
      time: result[0].time
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Neon veritabanına bağlanılamadı."
    });
  }
}
