import { z } from "zod";

export const prayerRequestSchema = z.object({
  name: z.string().trim().max(80, "Máximo 80 caracteres").optional().default(""),
  contact: z.string().trim().max(120, "Máximo 120 caracteres").optional().default(""),
  request: z
    .string()
    .trim()
    .min(10, "Cuéntanos un poco más (mínimo 10 caracteres)")
    .max(2000, "Máximo 2000 caracteres"),
});

export type PrayerRequestInput = z.infer<typeof prayerRequestSchema>;
