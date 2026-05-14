import { z } from 'zod';

export const phoneSchema = (withCountryCode: boolean) =>
  z.object({
    phone: z
      .string()
      .nonempty('Телефон обязателен для заполнения')
      .refine(
        val => {
          const digits = val.replace(/\D/g, '');
          return withCountryCode ? digits.length === 11 : digits.length === 10;
        },
        { message: 'Неверный формат номера телефона' },
      ),
  });
