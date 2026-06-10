import { headers } from "next/headers";

const PLACEHOLDER_HOSTS = new Set(["yourdomain.com", "your-domain.com", "example.com"]);

export async function getAppBaseUrl() {
  const configuredUrl = normalizeConfiguredAppUrl(process.env.NEXT_PUBLIC_APP_URL);

  if (configuredUrl) {
    return configuredUrl;
  }

  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host");
  const host = (forwardedHost ?? requestHeaders.get("host") ?? "").split(",")[0].trim();

  if (!host) {
    return "http://localhost:3000";
  }

  const forwardedProto = requestHeaders.get("x-forwarded-proto")?.split(",")[0].trim();
  const protocol = forwardedProto || (host.startsWith("localhost") || host.startsWith("127.0.0.1") ? "http" : "https");

  return `${protocol}://${host}`;
}

function normalizeConfiguredAppUrl(value: string | undefined) {
  const trimmed = value?.trim().replace(/\/$/, "");

  if (!trimmed) {
    return "";
  }

  try {
    const url = new URL(trimmed);

    if (PLACEHOLDER_HOSTS.has(url.hostname.toLowerCase())) {
      return "";
    }

    return trimmed;
  } catch {
    return "";
  }
}
