const videoHosts = new Set(["youtube.com", "www.youtube.com", "youtube-nocookie.com", "www.youtube-nocookie.com", "youtu.be", "facebook.com", "www.facebook.com", "m.facebook.com", "fb.watch"]);

export function normalizeVideoEmbedUrl(value: string) {
  try {
    const source = new URL(value);
    if (source.protocol !== "https:" || !videoHosts.has(source.hostname.toLowerCase())) return null;
    const host = source.hostname.toLowerCase();
    if (host === "youtu.be") {
      const id = source.pathname.split("/").filter(Boolean)[0];
      return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (host.includes("youtube")) {
      const id = source.pathname.startsWith("/embed/") ? source.pathname.split("/")[2] : source.searchParams.get("v");
      return id && /^[\w-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (host === "fb.watch") return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(source.href)}&show_text=false`;
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(source.href)}&show_text=false`;
  } catch { return null; }
}

export function isAllowedVideoUrl(value: string) { return normalizeVideoEmbedUrl(value) !== null; }
