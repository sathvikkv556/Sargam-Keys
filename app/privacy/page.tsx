import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | SargamKeys',
  description: 'Our Privacy Policy outlines how we collect, use, and protect your personal information at SargamKeys.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-black tracking-tighter md:text-6xl">Privacy Policy</h1>
        <p className="text-muted-foreground font-medium">Updated On: June 6, 2026</p>
      </div>
      
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
        <p className="text-xl leading-relaxed text-slate-600 dark:text-slate-400">
          This Privacy Policy governs the manner in which your information will be treated at SargamKeys. It applies to all information shared voluntarily with SargamKeys upon visiting and using the website.
        </p>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Information Collection</h2>
          
          <div className="grid gap-8 md:grid-cols-2 mt-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-sm">01</span>
                Provided Information
              </h3>
              <p>The information shared voluntarily includes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Information shared while contacting by email</li>
                <li>Information provided during feedback or song requests</li>
                <li>Name and email address</li>
                <li>Any details shared within your communication</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white text-sm">02</span>
                Automatically Generated
              </h3>
              <p>Information that might be collected during your visit:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP Address and browser details</li>
                <li>Type of device and referring website</li>
                <li>Pages visited, date, and time of visit</li>
              </ul>
              <p className="text-sm text-muted-foreground italic">Used for analytical purposes to improve usability.</p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Information Usage</h2>
          <p>We use your information to:</p>
          <ul className="grid gap-3 sm:grid-cols-2 list-none pl-0">
            {[
              "Process your requests and feedback",
              "Fulfill song requests",
              "Improve content and user experience",
              "Analyze website performance",
              "Evaluate and improve security"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                {item}
              </li>
            ))}
          </ul>
          <p className="font-bold text-blue-600 dark:text-blue-400 mt-4">
            We do not sell, rent, or share your personal information with third parties for marketing purposes.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Cookies</h2>
          <p>
            SargamKeys uses cookies to enhance your browsing experience, remember preferences, and analyze visit data. 
            You can turn off cookies in your browser, but note that some features may not function properly.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Analytics & Advertising</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Analytics</h3>
              <p>
                We use tools like Google Analytics to evaluate performance (pages visited, device types, etc.). 
                This data is stored in an <strong>anonymous form</strong>; no identifiable personal data is collected by these services.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Advertisement</h3>
              <p>
                SargamKeys uses <strong>Google AdSense</strong> to display advertisements. 
                Google, as a third-party vendor, uses cookies to serve ads on our site. 
                Google's use of advertising cookies enables it and its partners to serve ads to our users based on their visit to our site and/or other sites on the Internet. 
                Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Google Ads Settings</a>.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Third Party & External Links</h2>
          <p>
            We use services like Google Search Console. We do not control these third-party services or external websites linked from our pages. 
            Please review their respective privacy policies.
          </p>
        </section>

        <section className="space-y-4 bg-amber-50 dark:bg-amber-900/10 p-6 rounded-2xl border border-amber-100 dark:border-amber-900/30">
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            Children's Privacy
          </h2>
          <p>
            SargamKeys does not seek information from children under 13. If a parent discovers their child has provided info, please contact us for immediate removal.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-3xl font-black tracking-tight border-b pb-2">Data Security</h2>
          <p>
            We take reasonable security measures to protect your info, but no method of electronic storage or transmission is 100% secure.
          </p>
        </section>

        <section className="rounded-3xl bg-slate-900 text-white p-8 md:p-12 text-center space-y-6">
          <h2 className="text-3xl font-black tracking-tight">Contact & Updates</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            We reserve the right to update this policy at any time. Updates will be posted here. 
            For questions or concerns, please contact:
          </p>
          <div className="space-y-2">
            <p className="text-2xl font-black">Sathvik KV</p>
            <p className="text-blue-400">Founder, SargamKeys</p>
            <a href="mailto:ksathvik485@gmail.com" className="text-xl hover:text-white transition-colors">
              ksathvik485@gmail.com
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
