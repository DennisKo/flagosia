export async function getFlags() {
  const res = await fetch('http://localhost:8080/flags');
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
