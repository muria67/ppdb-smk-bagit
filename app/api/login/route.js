
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

const roleMap = {
  siswa: "calon_siswa",
  calon_siswa: "calon_siswa",
  admin: "admin",
  kepsek: "kepsek",
};

export async function POST(request) {
  try {
    const body = await request.json();
    const identifier = body.identifier?.trim();
    const password = body.password;
    const requestedRole = roleMap[body.role];

    if (
      !identifier ||
      typeof password !== "string" ||
      !requestedRole
    ) {
      return NextResponse.json(
        { message: "Data login tidak lengkap." },
        { status: 400 }
      );
    }

    const [rows] = await pool.execute(
      `SELECT id, nama, email, password, role
       FROM users
       WHERE email = ?
       LIMIT 1`,
      [identifier.toLowerCase()]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Email atau password salah." },
        { status: 401 }
      );
    }

    const user = rows[0];

    const passwordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordValid || user.role !== requestedRole) {
      return NextResponse.json(
        { message: "Email, password, atau role tidak sesuai." },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error("JWT_SECRET belum diatur di .env.local");
    }

    const token = await new SignJWT({
      id: user.id,
      nama: user.nama,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("8h")
      .sign(new TextEncoder().encode(secret));

    const response = NextResponse.json({
      message: "Login berhasil.",
      role: user.role,
    });

    response.cookies.set("spmb_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
