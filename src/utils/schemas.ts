import { z } from 'zod';

const validateIIN = (iin: string): boolean => {
  if (!/^\d{12}$/.test(iin)) return false;

  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += parseInt(iin[i]) * (i + 1);
  }
  let digit = sum % 11;

  if (digit === 10) {
    sum = 0;
    for (let i = 0; i < 11; i++) {
      let weight = (i + 3) % 11;
      if (weight === 0) weight = 11;
      sum += parseInt(iin[i]) * weight;
    }
    digit = sum % 11;
    if (digit === 10) digit = 0;
  }

  return digit === parseInt(iin);
};

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

export const profileSchema = z
  .object({
    fullName: z.string().min(1, 'ФИО обязательно для заполнения'),
    birthDate: z.date({ required_error: 'Укажите дату рождения' }),
    citizenship: z.string().min(1, 'Выберите гражданство'),
    iin: z.string().min(1, 'ИИН обязателен'),
    // .refine(validateIIN, { message: 'Некорректный ИИН' }),
    docNumber: z.string().min(1, 'Номер удостоверения обязателен'),
    docIssueDate: z.date({ required_error: 'Укажите дату выдачи документа' }),
    docIssuedBy: z.string().min(1, 'Укажите, кем выдано'),
    isCarrier: z.boolean().default(false),
    driverLicense: z.string().optional(),
    driverCategory: z.string().optional(),
    driverLicenseDate: z.date().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isCarrier) {
      if (!data.driverLicense) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['driverLicense'],
          message: 'Укажите номер ВУ',
        });
      }
      if (!data.driverCategory) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['driverCategory'],
          message: 'Укажите категорию ВУ',
        });
      }
      if (!data.driverLicenseDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['driverLicenseDate'],
          message: 'Укажите дату выдачи ВУ',
        });
      }
    }
  });

export const passwordStepSchema = z
  .object({
    password: z
      .string()
      .min(1, 'Пароль обязателен для заполнения')
      .min(8, 'Пароль должен быть не менее 8 символов')
      .regex(/[A-Z]/, 'Пароль должен содержать минимум 1 заглавную букву')
      .regex(/[a-z]/, 'Пароль должен содержать минимум 1 строчную букву')
      .regex(/[0-9]/, 'Пароль должен содержать минимум 1 цифру')
      .regex(
        /[!@#$%^&*(),.?":{}|<>_+\-[\]\\]/,
        'Пароль должен содержать минимум 1 специальный символ',
      ),
    confirmPassword: z.string().min(1, 'Подтверждение пароля обязательно'),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['confirmPassword'], // Ошибка подсветит поле повтора пароля
        message: 'Пароли не совпадают',
      });
    }
  });
