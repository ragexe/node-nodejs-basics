const VAR_PREFIX = "RSS_";

export const parseEnv = () => {
  const envVariables = Object.entries((process && process.env) || {});
  const prefixedEnvVariables = envVariables.filter(([key, _]) =>
    key.startsWith(VAR_PREFIX)
  );

  const result = prefixedEnvVariables
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  console.log(result);
};
