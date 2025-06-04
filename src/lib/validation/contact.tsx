import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Please enter your correct email address'),
  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      const cleaned = val.replace(/-/g, '');
      return /^(0[5-9]\d{8,9}|0[1-4]\d{8,9})$/.test(cleaned);
    }, 'Please enter your phone number in 10 or 11 digits'),
  subject: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === '') return true;
      return val.trim().length >= 1 && val.trim().length <= 100;
    }, 'Please enter a subject line between 1 and 100 characters'),
  message: z
    .string()
    .min(10, 'Please enter a message of at least 10 characters')
    .max(1000, 'Please enter your message in 1000 characters or less'),
});
