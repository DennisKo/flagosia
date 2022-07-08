export async function getFlags(query) {
  console.log('query', query);
  const res = await fetch(`${process.env.FLAGS_API}?country=${query.country}`);
  const json = await res.json();
  return json;
}

export function isFlagEnabled(flagName, flags) {
  const flag = flags.find((flag) => flag.Name === flagName);

  if (!flag) {
    return { isEnabled: false, value: '' };
  }
  return { isEnabled: flag.Enabled, value: flag.Value };
}
