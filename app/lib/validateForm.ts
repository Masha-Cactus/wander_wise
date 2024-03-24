import { z } from 'zod';

  type StringObject = {
    [key: string]: string | number;
  };


export async function validateForm<T>(
  formData: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formSchema: z.ZodType<T, any, any>,
) {
  try {
    const parsedData = await formSchema.parseAsync(formData);

    return { isValid: true, data: parsedData, formErrors: {} };
  } catch (err) {
    const formErrors: StringObject = {};

    (err as { errors: { path: string[]; message: string }[] }).errors.forEach(
      e => {
        const key = e.path[0];

        formErrors[key] = e.message;
      },
    );

    return { isValid: false, data: {}, formErrors };
  }
}
