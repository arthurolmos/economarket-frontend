export function validate(data: {}) {
  const fields = Object.keys(data) as Array<keyof typeof data>;

  let valid = true;
  fields.forEach((field) => {
    if (!!!data[field] || data[field] === "") valid = false;
  });

  return valid;
}
