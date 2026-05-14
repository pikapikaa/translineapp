import { z } from 'zod';

export const phoneSchema = (withCountryCode: boolean) =>
  z.object({
    phone: z.string().refine(
      val => {
        const digits = val.replace(/\D/g, '');
        return withCountryCode ? digits.length === 11 : digits.length === 10;
      },
      { message: 'Неверный формат номера телефона' },
    ),
  });

export const codeSchema = z.object({
  code: z.string().min(4, 'Код должен быть не менее 4 символов'),
});
