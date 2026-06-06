import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer | SargamKeys',
  description: 'Disclaimer and legal notice regarding the content provided on SargamKeys.',
  alternates: {
    canonical: '/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-black tracking-tighter md:text-6xl">Disclaimer</h1>
        <p className="text-muted-foreground font-medium">Date Last Modified: June 6, 2026</p>
      </div>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">General Disclaimer</h2>
          <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400">
            The information available on SargamKeys (collectively referred to as "we," "our," or "us") is for educational and informational purposes only.
          </p>
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
            <p>
              While we try our best to maintain the accuracy and currency of our content, we provide no guarantees as to the completeness, accuracy, reliability, or suitability of any information found on this website. Using the information provided on this site is completely at your discretion and is your sole responsibility.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Educational Purpose</h2>
          <p>
            SargamKeys is a platform meant to help people learn how to play their favorite songs on piano and keyboard via simplified notes arrangement. 
            All information is for educational purposes only. The piano notes and arrangements provided here are purely for educational purposes and cannot be regarded as official sheet music.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Copyright Policy</h2>
          <div className="space-y-4">
            <p>
              SargamKeys claims no copyright ownership of any original songs, compositions, artist names, album names, movie names, trademarks or any kind of intellectual property mentioned in our articles. 
              <strong>Copyrights, trademarks and other intellectual property rights belong exclusively to the copyright owners.</strong>
            </p>
            <p>
              Names of songs, artists, musicians, albums and movies mentioned are for identification and comment purposes only and SargamKeys does not hold any copyrighted material or sheet music.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Accuracy of Piano Notes</h2>
          <div className="flex gap-4 p-6 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30">
            <div className="space-y-3">
              <p>
                Our piano notes are arranged after interpreting the song ourselves. Even though every effort has been made to ensure accuracy, discrepancies may exist between our notes and the original versions of the song.
              </p>
              <p className="font-medium text-blue-700 dark:text-blue-300">
                Use the notes as a guide while learning the song but remember that some variations may be necessary according to your skills and playing style.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">External Links</h2>
          <p>
            External links are provided throughout the website to facilitate access to external web sites and/or materials. We have not reviewed the linked pages and are not responsible for the contents of any of these sites. 
            Our linking to these pages should not be interpreted as our endorsement or recommendation of the contents of any of the linked pages.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Limitation of Liability</h2>
          <p>
            We will under no circumstance whatsoever be held responsible for any loss or damage caused by accessing this website or using the information provided herein. 
            Your use of the website and its content is done completely at your discretion. Content is published on an "as-is" basis without warranty.
          </p>
        </section>

        <section className="rounded-3xl bg-slate-900 text-white p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-black tracking-tight">Contact</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            If you need assistance with any queries related to our Disclaimer policy, please feel free to contact us:
          </p>
          <div className="space-y-2">
            <p className="text-2xl font-black">Mr. Sathvik KV</p>
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
