export function publicBusinessPath(slug: string) {
  return `/business/${slug}`;
}

export function chatPath(slug: string) {
  return `/chat/${slug}`;
}

export function dashboardPath(slug: string) {
  return `/dashboard/${slug}`;
}

export function dashboardRoute(slug: string, child: string) {
  return `/dashboard/${slug}/${child}`;
}
