/* Insights / news articles.
 *
 * INTENTIONALLY EMPTY. What used to live here (as blogPosts.js) was three
 * template placeholders — "How Consultation Is Affecting Ventures in 2024",
 * "Project Concepts or Related Queries Should Be" — dated Jun 2024, illustrated
 * with hotlinked Unsplash photos and linking to "#". Publishing that under a
 * firm's name is worse than having no insights page at all, so the route is
 * not registered in App.jsx while this array is empty.
 *
 * To switch the page on: add entries below, then register an /insights route
 * in App.jsx, a nav entry in navigation.js and a metadata entry in seo.js
 * (which also puts it in the sitemap). The section component already renders
 * nothing while this array is empty, so it is safe to mount early.
 *
 * Each entry:
 *   slug     string   url segment, kebab-case
 *   title    string   the headline
 *   date     string   ISO "YYYY-MM-DD" — rendered as e.g. "27 Aug 2026"
 *   summary  string   ~30 words; shown on the index card
 *   href     string   where "Read more" goes
 *   img      string   imported asset, NOT a remote URL
 */
export const insights = [];
