import { Metadata } from 'next';
import { ShieldAlert, Mail, Info, Scale, Clock, Copyright } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'DMCA Copyright Policy | SargamKeys',
  description: 'SargamKeys respects intellectual property rights. Learn about our DMCA copyright policy, how to file an infringement notice, and our educational purpose.',
  alternates: {
    canonical: '/dmca',
  },
};

export default function DMCAPage() {
  const lastUpdated = "June 2026";

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <Breadcrumbs className="mb-8" />
        
        <div className="space-y-6 mb-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg mb-4">
            <ShieldAlert className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">DMCA Copyright Policy</h1>
          <div className="flex items-center gap-2 text-muted-foreground font-bold uppercase tracking-widest text-xs">
            <Clock className="h-4 w-4" />
            <span>Last Updated: {lastUpdated}</span>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <section className="bg-slate-50 dark:bg-slate-900/50 p-8 rounded-3xl border border-slate-200 dark:border-white/5 shadow-sm">
            <p className="text-lg leading-relaxed ">
              At SargamKeys ("we", "our", or "us"), we respect the intellectual property rights of others and expect our users to do the same. We are committed to complying with applicable copyright laws and responding promptly to valid copyright infringement notices.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              If you believe that any content available on <strong>https://sargamkeys.in</strong> infringes your copyright, you may submit a copyright infringement notification as described below.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <Info className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-black m-0">Educational Purpose</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              SargamKeys provides piano notes, keyboard notations, music-learning resources, and educational content intended to help users learn and practice music. We do not claim ownership of any copyrighted songs, lyrics, sound recordings, trademarks, or other intellectual property belonging to their respective owners.
            </p>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              All trademarks, song titles, artist names, album names, and related intellectual property remain the property of their respective owners.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <Scale className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-black m-0">Filing a Copyright Infringement Notice</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              If you are a copyright owner or an authorized representative and believe that content on SargamKeys infringes your copyright, please send a written notice containing the following information:
            </p>
            <div className="bg-white dark:bg-slate-950 border rounded-2xl p-8 shadow-sm">
              <ol className="space-y-4 list-decimal pl-6 text-slate-600 dark:text-slate-400">
                <li>Your full name and contact information.</li>
                <li>Identification of the copyrighted work claimed to have been infringed.</li>
                <li>The exact URL(s) of the allegedly infringing material on our website.</li>
                <li>A statement that you have a good-faith belief that the use of the material is not authorized by the copyright owner, its agent, or the law.</li>
                <li>A statement that the information in the notice is accurate and that you are authorized to act on behalf of the copyright owner.</li>
                <li>Your physical or electronic signature.</li>
              </ol>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Please send copyright notices to:
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-center">
                <p className="font-bold text-sm uppercase tracking-widest text-slate-500 mb-2">Email</p>
                <a href="mailto:ksathvik485@gmail.com" className="text-blue-600 dark:text-blue-400 font-black text-xl hover:underline">ksathvik485@gmail.com</a>
              </div>
              <div className="flex-1 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-center">
                <p className="font-bold text-sm uppercase tracking-widest text-slate-500 mb-2">Subject Line</p>
                <p className="text-slate-900 dark:text-white font-black text-xl">DMCA Takedown Request</p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                <Copyright className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-black m-0">Response to Notices</h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Upon receiving a valid copyright complaint, we will:
            </p>
            <ul className="space-y-3 list-none pl-0">
              {["Review the reported material.", "Investigate the claim in good faith.", "Remove or disable access to the content if appropriate.", "Take reasonable steps to prevent repeated infringement where necessary."].map((item, i) => (
                <li key={i} className="flex gap-3 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              We aim to respond to legitimate copyright complaints as quickly as possible.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black">Counter-Notification</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              If you believe that content was removed or disabled as a result of a mistake or misidentification, you may submit a counter-notification containing:
            </p>
            <div className="bg-white dark:bg-slate-950 border rounded-2xl p-8 shadow-sm">
              <ol className="space-y-4 list-decimal pl-6 text-slate-600 dark:text-slate-400">
                <li>Identification of the removed content.</li>
                <li>The URL where the content previously appeared.</li>
                <li>A statement under penalty of perjury that you have a good-faith belief the content was removed by mistake or misidentification.</li>
                <li>Your contact information.</li>
                <li>Your physical or electronic signature.</li>
              </ol>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              Counter-notifications may be sent to: <strong>ksathvik485@gmail.com</strong>
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black">Repeat Infringer Policy</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              SargamKeys reserves the right to remove content and restrict access to users or contributors who repeatedly infringe the intellectual property rights of others.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-3xl font-black">Limitation of Liability</h2>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              SargamKeys acts as an educational content platform and does not knowingly host content that infringes the intellectual property rights of others. We will cooperate with copyright owners and comply with applicable laws regarding copyright infringement claims.
            </p>
          </section>

          <section className="bg-blue-600 text-white p-10 rounded-3xl space-y-6 shadow-2xl shadow-blue-600/20">
            <h2 className="text-3xl font-black m-0">Contact Information</h2>
            <p className="text-blue-100 text-lg">
              If you have any questions regarding this DMCA Copyright Policy, please contact:
            </p>
            <div className="space-y-2">
              <p className="text-2xl font-black">SargamKeys</p>
              <p className="text-blue-100">Website: https://sargamkeys.in</p>
              <p className="text-blue-100">Email: ksathvik485@gmail.com</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
