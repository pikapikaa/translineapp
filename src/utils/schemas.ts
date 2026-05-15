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

const dateSchema = z.preprocess(val => {
  if (typeof val === 'string') {
    if (val.trim().length === 0) return undefined;
    return new Date(val);
  }
  return val;
}, z.date({ required_error: 'Укажите дату рождения' }));

const docIssueDateSchema = z.preprocess(val => {
  if (typeof val === 'string') {
    if (val.trim().length === 0) return undefined;
    return new Date(val);
  }
  return val;
}, z.date({ required_error: 'Укажите дату выдачи документа' }));

const driverLicenseDateSchema = z.preprocess(val => {
  if (typeof val === 'string') {
    if (val.trim().length === 0) return undefined;
    return new Date(val);
  }
  return val;
}, z.date({ required_error: 'Укажите дату выдачи ВУ' }).optional());

export const loginSchema = (withCountryCode: boolean) =>
  z.object({
    phone: z.string().refine(
      val => {
        const digits = val.replace(/\D/g, '');
        return withCountryCode ? digits.length === 11 : digits.length === 10;
      },
      { message: 'Неверный формат номера телефона' },
    ),
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
  });

export const profileSchema = z
  .object({
    fullName: z.string().min(1, 'ФИО обязательно для заполнения'),
    birthDate: dateSchema,
    citizenship: z.string().min(1, 'Выберите гражданство'),
    iin: z.string().length(12, 'ИИН обязателен, должен содержать 12 цифр'),
    docNumber: z.string().min(1, 'Номер удостоверения обязателен'),
    docIssueDate: docIssueDateSchema,
    docIssuedBy: z.string().min(1, 'Укажите, кем выдано'),
    isCarrier: z.boolean().default(false),
    driverLicense: z.string().optional(),
    driverCategory: z.string().optional(),
    driverLicenseDate: driverLicenseDateSchema,
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
        path: ['confirmPassword'],
        message: 'Пароли не совпадают',
      });
    }
  });
