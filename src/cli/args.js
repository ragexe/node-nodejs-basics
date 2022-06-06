const PROP_PREFIX = "--";

export const parseArgs = () => {
  const myArgsMap = process.argv
    .slice(2)
    .reduce((result, value, index, array) => {
      if (!value.startsWith(PROP_PREFIX)) return result;

      result[value.substring(PROP_PREFIX.length)] = array[index + 1];
      return result;
    }, []);

  const result = Object.entries(myArgsMap)
    .map(([key, value]) => `${key} is ${value}`)
    .join(", ");

  console.log(result);
};
