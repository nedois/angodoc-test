export default function matchPath(pathname: string, path: string | undefined, exact = true): boolean {
  if (!path) return false;

  if (exact) return pathname === path;

  return pathname.includes(path);
}
