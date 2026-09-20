import { AMAZON_AFFILIATE_URL } from '@/lib/affiliates';

export function AmazonRecommendation() {
  return (
    <aside
      className="no-print advertisement rounded-2xl border border-blue-100 bg-blue-50/40 p-5 dark:border-blue-900/30 dark:bg-blue-900/10 sm:p-6"
      aria-labelledby="amazon-recommendation-heading"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="space-y-2">
          <h2
            id="amazon-recommendation-heading"
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-white"
          >
            🎹 Recommended for practicing piano
          </h2>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Looking for a keyboard or piano to practice these songs? Check out
            musical instruments and accessories on Amazon.
          </p>
        </div>
        <a
          href={AMAZON_AFFILIATE_URL}
          target="_blank"
          rel="nofollow sponsored noopener"
          className="inline-flex h-10 w-full shrink-0 items-center justify-center rounded-md bg-blue-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 sm:w-auto"
        >
          Shop on Amazon →
        </a>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        As an Amazon Associate, I earn from qualifying purchases.
      </p>
    </aside>
  );
}
