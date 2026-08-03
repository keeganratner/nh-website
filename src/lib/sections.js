/**
 * Split rendered Markdown into the intro and one block per `##` heading.
 *
 * Everything before the first `<h2>` is the intro; each `<h2>` starts a new
 * section that runs until the next one. This is what lets an audience page be
 * written as ordinary prose while still rendering as separate panels.
 */
export function splitSections(html = '') {
  const chunks = html.split(/(?=<h2[\s>])/);
  const intro = (chunks[0] ?? '').trim();

  const sections = chunks.slice(1).map((chunk) => {
    const heading = chunk.match(/^<h2[^>]*>([\s\S]*?)<\/h2>/);
    return {
      heading: heading ? heading[1].replace(/<[^>]+>/g, '').trim() : '',
      html: chunk.replace(/^<h2[^>]*>[\s\S]*?<\/h2>/, '').trim(),
    };
  });

  return { intro, sections };
}
