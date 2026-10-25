
const mysql = require("mysql2/promise");

async function setupDatabase() {
  let connection;

  try {
    // Sesuaikan dengan konfigurasi MySQL di Laragon
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: ""
    });

    await connection.query(
      "CREATE DATABASE IF NOT EXISTS spmbb"
    );

    await connection.query("USE spmbb");

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nama VARCHAR(100) NOT NULL,
        email VARCHAR(150) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('calon_siswa', 'admin', 'kepsek')
          NOT NULL DEFAULT 'calon_siswa',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Pastikan pilihan role sesuai kebutuhan
    await connection.query(`
      ALTER TABLE users
      MODIFY COLUMN role
      ENUM('calon_siswa', 'admin', 'kepsek')
      NOT NULL DEFAULT 'calon_siswa'
    `);

    const [columns] = await connection.query(
      "SHOW COLUMNS FROM users"
    );

    console.log("Setup database berhasil!");
    console.log("Database: spmbb");
    console.log("Struktur tabel users:");

    console.table(
      columns.map((column) => ({
        Field: column.Field,
        Type: column.Type,
        Null: column.Null,
        Key: column.Key,
        Default: column.Default
      }))
    );
  } catch (error) {
    console.error("Setup database gagal:", error.message);
    process.exitCode = 1;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
