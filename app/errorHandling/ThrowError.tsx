export function ThrowError({ msg }: { msg: string }) {
  throw new Error(msg);

  return null;
}
