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
      <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
      
      <div className="prose prose-blue dark:prose-invert max-w-none space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2 className="text-2xl font-bold">1. Agreement to Terms</h2>
          <p>
            By accessing or using SargamKeys, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">2. Intellectual Property</h2>
          <p>
            The Service and its original content (excluding piano notes provided for educational purposes that may be based on existing compositions), features, and functionality are and will remain the exclusive property of SargamKeys and its licensors.
          </p>
          <p>
            Piano notes and music theory guides provided on this site are for educational and personal use only. Redistribution or commercial use without permission is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">3. User Accounts</h2>
          <p>
            When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">4. Links To Other Web Sites</h2>
          <p>
            Our Service may contain links to third-party web sites or services that are not owned or controlled by SargamKeys.
          </p>
          <p>
            SargamKeys has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that SargamKeys shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such web sites or services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">5. Termination</h2>
          <p>
            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">6. Limitation of Liability</h2>
          <p>
            In no event shall SargamKeys, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">7. Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">8. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at <strong>ksathvik485@gmail.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
