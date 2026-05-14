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
      <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
      
      <div className="prose prose-blue dark:prose-invert max-w-none space-y-6">
        <p>Last updated: {new Date().toLocaleDateString()}</p>

        <section>
          <h2 className="text-2xl font-bold">1. Introduction</h2>
          <p>
            Welcome to SargamKeys. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at ksathvik485@gmail.com.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">2. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, or otherwise contact us.
          </p>
          <p>
            The personal information that we collect depends on the context of your interactions with us and the choices you make. The personal information we collect can include:
          </p>
          <ul className="list-disc pl-6">
            <li>Names</li>
            <li>Email addresses</li>
            <li>Comments and feedback</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">3. How We Use Your Information</h2>
          <p>
            We use personal information collected via our website for a variety of business purposes described below:
          </p>
          <ul className="list-disc pl-6">
            <li>To facilitate account creation and logon process.</li>
            <li>To post testimonials or comments.</li>
            <li>To respond to user inquiries and offer support.</li>
            <li>To improve our website and services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold">4. Cookies and Web Beacons</h2>
          <p>
            Like any other website, SargamKeys uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">5. Google DoubleClick DART Cookie</h2>
          <p>
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline">https://policies.google.com/technologies/ads</a>
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">6. Our Advertising Partners</h2>
          <p>
            We do not currently use third-party advertising services that collect user data.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">7. Third Party Privacy Policies</h2>
          <p>
            SargamKeys's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">8. Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <strong>ksathvik485@gmail.com</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
