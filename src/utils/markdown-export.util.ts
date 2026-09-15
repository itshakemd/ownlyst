import type { Note } from '../models/note.model';

/**
 * Utility to convert Note objects to formatted Markdown.
 */
export class MarkdownUtil {
  /**
   * Generates a single note Markdown string with YAML frontmatter.
   */
  static generateSingleNote(note: Note): string {
    const createdDate = note.createdAt instanceof Date ? note.createdAt.toISOString().split('T')[0] : String(note.createdAt);
    const updatedDate = createdDate;

    let frontmatter = `---\ntitle: ${note.title}\nstatus: ${note.status}\npriority: ${note.priority}\ncreated: ${createdDate}\nupdated: ${updatedDate}\n`;
    if (note.tags && note.tags.length > 0) {
      frontmatter += `tags: [${note.tags.join(', ')}]\n`;
    }
    frontmatter += `---\n\n`;

    const content = note.content || '';
    return `${frontmatter}# ${note.title}\n\n${content}`;
  }
}
