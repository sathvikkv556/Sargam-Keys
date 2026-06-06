import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | SargamKeys',
  description: 'Terms of Service and conditions for using the SargamKeys platform.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-black tracking-tighter md:text-6xl">Terms of Service</h1>
        <p className="text-muted-foreground font-medium">Last Updated: June 6, 2026</p>
      </div>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Agreement to Terms</h2>
          <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400">
            Upon using the SargamKeys website, you agree to abide by the following terms and conditions. Should you disagree with any terms and conditions, please refrain from using SargamKeys.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Introduction</h2>
          <p>
            SargamKeys is an educational website providing arrangements of piano and keyboard notes to help users study songs. The information published on this site has no other purpose than being an informative educational tool.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Copyrights & Usage</h2>
          <p>
            Except as noted below, SargamKeys' designs, content, and arrangement of piano keys are copyrighted and are property of SargamKeys.
          </p>
          
          <div className="grid gap-8 md:grid-cols-2 mt-6">
            <div className="space-y-4 p-6 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30">
              <h3 className="text-xl font-bold text-green-800 dark:text-green-300 flex items-center gap-2">
                Allowed Usage
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-green-700 dark:text-green-400">
                <li>Browse through the website</li>
                <li>Learn songs using note arrangement</li>
                <li>Distribute links to SargamKeys pages</li>
              </ul>
            </div>

            <div className="space-y-4 p-6 rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30">
              <h3 className="text-xl font-bold text-red-800 dark:text-red-300 flex items-center gap-2">
                Prohibited Actions
              </h3>
              <ul className="list-disc pl-5 space-y-2 text-red-700 dark:text-red-400">
                <li>Republish any copyrighted material</li>
                <li>Create a copy of SargamKeys webpages</li>
                <li>Profit from or sell copyrighted content</li>
                <li>Reproduce content to another platform</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Educational Purposes</h2>
          <p>
            The piano keys provided on SargamKeys are purely an educational aid, created to assist musicians in understanding song melodies. 
            SargamKeys is <strong>not</strong> in possession of any official song sheets, lyrics, or audio files for distribution.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Ownership of Songs</h2>
          <p>
            The copyright of songs, singer names, album names, film names, or trademarks belong to their respective owners. 
            Names are mentioned for learning purposes only. Musical arrangements belong to their respective writers except for those specifically arranged by SargamKeys.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Accuracy & Liability</h2>
          <div className="space-y-4">
            <p>
              While every effort is taken to provide accurate piano keys, no warranties are made concerning their accuracy, sufficiency, or usefulness. 
              SargamKeys does not assume responsibility for verification of information.
            </p>
            <p>
              In no way shall SargamKeys be held accountable for any losses arising due to the usage or non-availability of the site or content. 
              Content is published on an "as-is" basis without warranty.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Third-Party Websites</h2>
          <p>
            Links to external websites not under our control may be available. 
            No responsibility is taken regarding these sites' contents, policies, or procedures.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Policy Updates</h2>
          <p>
            Terms and conditions may be altered at any time without prior notice. 
            Revised terms will be published here, and continued use of SargamKeys signifies your acceptance of modified terms.
          </p>
        </section>

        <section className="rounded-3xl bg-slate-900 text-white p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-black tracking-tight">Questions?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Should you have any further questions about our terms of service, reach out to us at:
          </p>
          <div className="space-y-2">
            <p className="text-2xl font-black">Sathvik KV</p>
            <p className="text-blue-400">Founder, SargamKeys</p>
            <a href="mailto:ksathvik485@gmail.com" className="text-xl hover:text-white transition-colors">
              ksathvik485@gmail.com
            </a>
            <p className="text-sm text-slate-500 mt-4">https://sargamkeys.in</p>
          </div>
        </section>
      </div>
    </div>
  );
}
