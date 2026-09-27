interface Env {
  ASSETS: Fetcher;
}

const IMMUTABLE = "public, max-age=31536000, immutable";
const REVALIDATE = "no-cache";
const SHORT_LIVED = "public, max-age=3600";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), geolocation=(), microphone=()",
  "Strict-Transport-Security": "max-age=31536000",
};

function cacheControlFor(pathname: string, contentType: string | null): string {
  if (contentType?.includes("text/html")) return REVALIDATE;
  if (pathname.startsWith("/assets/")) return IMMUTABLE;
  return SHORT_LIVED;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await env.ASSETS.fetch(request);
    const { pathname } = new URL(request.url);

    const headers = new Headers(response.headers);
    headers.set(
      "Cache-Control",
      cacheControlFor(pathname, response.headers.get("Content-Type")),
    );
    for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
      headers.set(name, value);
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
} satisfies ExportedHandler<Env>;
