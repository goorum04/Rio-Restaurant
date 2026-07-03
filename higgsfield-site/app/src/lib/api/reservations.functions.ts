import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { bindings } from "../bindings.server";

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

export const createReservation = createServerFn({ method: "POST" })
  .inputValidator(reservationSchema)
  .handler(async ({ data }) => {
    const { DB } = bindings();
    if (!DB) {
      throw new Error("Reservations storage is not available");
    }
    await DB.prepare(
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
    return { ok: true as const };
  });
