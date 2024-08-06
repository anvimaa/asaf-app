import { z } from 'zod';

export const asseguradoSchema = z.object({
    name: z.string().default('Hello world!'),
    email: z.string().email()
});