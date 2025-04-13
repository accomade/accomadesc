export const format = (formatString: string, subst: Record<string, string>): string => {
  let result = formatString;

  for (const [key, value] of Object.entries(subst)) {
    result = result.replace(`{{${key}}}`, value);
  }

  return result;
};
