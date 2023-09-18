const convertBigNumberToString = (value: any) => {
  if (value._isBigNumber) {
    return value.toString();
  }
  return value;
};

export const printResult = (result: any) => {
  if (!result) return;
  if (typeof result === "object" && !result._isBigNumber) {
    if (Array.isArray(result)) {
      console.table(result.map(convertBigNumberToString));
    } else {
      const convertedObject: Record<string, any> = {};
      for (const key of Object.keys(result)) {
        convertedObject[key] = convertBigNumberToString(result[key]);
      }
      console.table(convertedObject);
    }
  } else {
    console.table(convertBigNumberToString(result));
  }
};

export const camelToKebab = (camel: string) =>
  camel
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();

export const camelToFlat = (camel: string) => {
  const camelCase = camel.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

  let flat = "";

  camelCase.forEach((word) => {
    flat += word.charAt(0).toUpperCase() + word.slice(1) + " ";
  });
  return flat.trim();
};

export const kebabToCamelCase = (kebabCaseString: string) => {
  return kebabCaseString.replace(/-./g, (match) =>
    match.charAt(1).toUpperCase()
  );
};
