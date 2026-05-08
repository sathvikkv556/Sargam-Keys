import Link from 'next/link';
import { Note } from '@/types';
import { truncateText } from '@/lib/utils';

interface NoteCardProps {
  note: Note;
}

/**
 * Reusable card component for displaying a piano note
 */
export function NoteCard({ note }: NoteCardProps) {
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    intermediate:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  return (
    <article className="overflow-hidden rounded-lg border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-800">
      <div className="p-6">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <Link href={`/theory/${note._id}`} className="group">
              <h3 className="mb-1 text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                {note.title}
              </h3>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {note.category}
            </p>
          </div>
          <span
            className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-medium ${
              difficultyColors[note.difficulty]
            }`}
          >
            {note.difficulty}
          </span>
        </div>

        {/* Description */}
        <p className="mb-4 text-gray-600 dark:text-gray-300">
          {truncateText(note.description, 150)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {note.updatedAt
              ? new Date(note.updatedAt).toLocaleDateString()
              : 'No date'}
          </span>
          <Link
            href={`/theory/${note._id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Read More →
          </Link>
        </div>
      </div>
    </article>
  );
}
