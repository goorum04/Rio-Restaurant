import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { bindings } from "../bindings.server";

// Supabase fallback for hosts without a D1 binding (Vercel). The publishable
// key is safe to ship (it is the same key a browser client would use); the
// reservations table only grants INSERT to the anon role via RLS.
const SUPABASE_URL = "https://qnuzcmdjpafbqnofpzfp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_kIsUEkhtxqL8Ye1DkkBHhQ_kpKjx1Rp";

const reservationSchema = z.object({
  name: z.string().trim().min(2).max(120),
  phone: z.string().trim().min(6).max(40),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().regex(/^\d{2}:\d{2}$/),
  guests: z.string().trim().min(1).max(20),
  email: z.union([z.string().trim().email().max(200), z.literal("")]).optional(),
  notes: z.string().trim().max(1000).optional(),
  lang: z.enum(["ca", "es", "fr", "en"]).default("ca"),
});

export type ReservationInput = z.infer<typeof reservationSchema>;

type D1 = NonNullable<Awaited<ReturnType<typeof bindings>>["DB"]>;

async function insertIntoD1(db: D1, data: ReservationInput) {
  await db
    .prepare(
      `INSERT INTO reservations (name, phone, date, time, guests, email, notes, lang)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`,
    )
    .bind(
      data.name,
      data.phone,
      data.date,
      data.time,
      data.guests,
      data.email || null,
      data.notes || null,
      data.lang,
    )
    .run();
}

async function insertIntoSupabase(data: ReservationInput) {
  const env = typeof process !== "undefined" ? process.env : undefined;
  const url = env?.SUPABASE_URL || SUPABASE_URL;
  const key = env?.SUPABASE_KEY || SUPABASE_PUBLISHABLE_KEY;
  const response = await fetch(`${url}/rest/v1/reservations`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: data.name,
      phone: data.phone,
      date: data.date,
      time: data.time,
      guests: data.guests,
      email: data.email || null,
      notes: data.notes || null,
      lang: data.lang,
    }),
  });
  if (!response.ok) {
    throw new Error(`Supabase insert failed: ${response.status}`);
  }
}

export const createReservation = createServerFn({ method: "POST" })
  .inputValidator(reservationSchema)
  .handler(async ({ data }) => {
    const { DB } = await bindings();
    if (DB) {
      await insertIntoD1(DB, data);
    } else {
      await insertIntoSupabase(data);
    }
    return { ok: true as const };
  });
