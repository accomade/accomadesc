export const format = (formatString: string, subst: Record<string, string>): string => {
  let result = formatString;

  for (const [key, value] of Object.entries(subst)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, value);
  }

  return result;
};
