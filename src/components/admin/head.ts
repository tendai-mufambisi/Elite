/** Head tags for every admin page: keep the dashboard out of search engines. */
export const adminHead = (title: string) => ({
  meta: [
    { title: `${title} | Owner dashboard` },
    { name: "robots", content: "noindex, nofollow, noarchive, nosnippet" },
    { name: "googlebot", content: "noindex, nofollow" },
  ],
});
