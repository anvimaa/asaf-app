import { z } from 'zod';

export const asseguradoSchema = z.object({
    name: z.string().min(3, 'Nome muito curto!'),
    email: z.string().email({ message: 'Email invalido!' }),
});
