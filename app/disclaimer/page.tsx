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
      <h1 className="mb-8 text-4xl font-bold">Disclaimer</h1>
      
      <div className="prose prose-blue dark:prose-invert max-w-none space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2 className="text-2xl font-bold">1. General Information</h2>
          <p>
            The information provided by SargamKeys ("we", "us", or "our") on https://sargamkeys.in (the "Site") is for general informational and educational purposes only. All information on the Site is provided in good faith, however we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the Site.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">2. Educational and Personal Use</h2>
          <p>
            The piano notes, music theory guides, and other resources provided on SargamKeys are intended for educational and personal use only. We do not claim ownership of the original musical compositions upon which the piano notes may be based. All trademarks and copyrights belong to their respective owners.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">3. External Links Disclaimer</h2>
          <p>
            The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability, or completeness by us.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">4. Professional Disclaimer</h2>
          <p>
            The Site cannot and does not contain professional music advice. The musical information is provided for general informational and educational purposes only and is not a substitute for professional advice. Accordingly, before taking any actions based upon such information, we encourage you to consult with the appropriate professionals. The use or reliance of any information contained on the Site is solely at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">5. Advertising Disclaimer</h2>
          <p>
            This Site may use Google AdSense and other third-party advertising to help support the site. These advertisers may use cookies to serve ads based on a user's prior visits to this or other websites. Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to this site and/or other sites on the Internet.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">6. Contact Us</h2>
          <p>
            If you have any questions or concerns regarding this disclaimer, please contact us at <strong>ksathvik485@gmail.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
