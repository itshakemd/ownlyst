import type { Note 
  /**
   * Generates a bulk export formatted Markdown containing multiple notes.
   */
  static generateBulkExport(notes: Note[]): string {
    let output = `# Notes Export\n\n`;

    // Group by status
    const statusGroups: Record<string, Note[]> = {
      todo: [],
      in_progress: [],
      done: [],
    };

    notes.forEach((note) => {
      if (statusGroups[note.status]) {
        statusGroups[note.status].push(note);
      } else {
        statusGroups[note.status] = [note];
      }
    });

    const statusLabels: Record<string, string> = {
      todo: 'To Do',
      in_progress: 'In Progress',
      done: 'Done',
    };

    // Table of contents grouped by status
    Object.keys(statusGroups).forEach((status) => {
      const groupNotes = statusGroups[status];
      if (groupNotes.length === 0) return;

      const label = statusLabels[status] || status;
      output += `## ${label}\n`;
      groupNotes.forEach((note) => {
        const anchor = note.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        output += `- [${note.title}](#${anchor})\n`;
      });
      output += `\n`;
    });

    output += `---\n\n`;

    // Actual note contents
    notes.forEach((note) => {
      output += `## ${note.title}\n`;
      output += `**Status:** ${note.status} | **Priority:** ${note.priority}\n\n`;
      output += `${note.content || 'No content'}\n\n`;
      output += `---\n\n`;
    });

    return output;
  }
}
 from '../models/note.model';

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
