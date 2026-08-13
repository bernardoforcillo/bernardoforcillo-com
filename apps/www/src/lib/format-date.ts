const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

export const formatDate = (value: string) =>
  dateFormatter.format(new Date(value));
