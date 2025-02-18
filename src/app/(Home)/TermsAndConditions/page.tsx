"use client";

import Link from "next/link";

const TermsConditionsPage = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16">
      <div className="container mx-auto px-6 xl:px-0">
        <h2 className="text-3xl font-bold text-center text-orange-500">
          Terms and Conditions
        </h2>
        <p className="mt-6 text-base sm:text-lg text-center">
          Please read these Terms and Conditions carefully before using our
          service.
        </p>

        <div className="mt-12 max-w-4xl text-justify container mx-auto text-lg space-y-6">
          <section>
            <h3 className="text-xl font-semibold">1. Introduction</h3>
            <p>
              Welcome to Wattpad! These Terms and Conditions outline the rules
              and regulations for the use of our platform. By accessing or using
              the Wattpad platform, you agree to comply with and be bound by
              these terms. If you disagree with any part of these terms, please
              refrain from using the platform.
            </p>
            <p>
              These Terms apply to all users of Wattpad, including users who
              contribute content, who browse or read content, or who use any
              other services offered by Wattpad.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold">2. Account Registration</h3>
            <p>
              In order to access certain features of Wattpad, including the
              ability to upload, read, and interact with content, you must
              create an account. You are responsible for ensuring that the
              information you provide during registration is accurate and
              up-to-date.
            </p>
            <p>
              You agree to keep your account information secure, including your
              username and password. Wattpad is not responsible for any loss or
              damage resulting from your failure to maintain the security of
              your account.
            </p>
            <p>
              You must be at least 13 years old to use Wattpad. If you are under
              18, you must obtain parental or guardian consent to use our
              services.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold">3. Use of Content</h3>
            <p>
              As a user, you may upload content, such as stories, articles, or
              media, to Wattpad. By uploading content, you grant Wattpad a
              worldwide, royalty-free, and non-exclusive license to use,
              display, and distribute your content. You retain full ownership of
              the content you upload.
            </p>
            <p>
              Wattpad may use your content for promotional purposes, including
              showcasing your stories or content on various platforms such as
              social media or newsletters. However, Wattpad will always credit
              you as the creator.
            </p>
            <p>
              You are responsible for the content you upload. You may not upload
              content that is offensive, harmful, infringing, or violates any
              third-party rights. Wattpad reserves the right to remove content
              that violates these terms.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold">
              4. Privacy and Data Collection
            </h3>
            <p>
              Wattpad is committed to protecting your privacy. When you use the
              service, we collect personal information such as your name, email
              address, and other details you provide when registering. This
              information will be used in accordance with our Privacy Policy,
              which is part of these Terms and Conditions.
            </p>
            <p>
              Wattpad uses cookies to improve the user experience and for
              analytics purposes. By using the platform, you consent to the use
              of cookies.
            </p>
            <p>
              We will never sell your personal data to third parties. However,
              we may share your information with trusted partners to provide
              services or if required by law.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold">5. User Responsibilities</h3>
            <p>
              You are responsible for your interactions with other users on the
              platform. You agree not to engage in harmful or illegal behavior,
              including, but not limited to:
            </p>
            <ul className="list-inside list-disc">
              <li>Harassing or threatening other users.</li>
              <li>Uploading malicious or unlawful content.</li>
              <li>Impersonating other users or individuals.</li>
              <li>Engaging in spamming or phishing activities.</li>
              <li>Violating any intellectual property rights.</li>
            </ul>
            <p>
              If you encounter any inappropriate behavior or content, please
              report it to Wattpad immediately. We are committed to maintaining
              a safe and positive environment for all users.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold">6. Termination of Account</h3>
            <p>
              Wattpad reserves the right to suspend or terminate your account if
              you violate any of these Terms and Conditions. We may also remove
              any content that violates our guidelines or intellectual property
              rights.
            </p>
            <p>
              If your account is suspended or terminated, you will no longer
              have access to your uploaded content and other services. You may
              request to recover your account by contacting Wattpad support, but
              recovery is not guaranteed.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold">
              7. Limitation of Liability
            </h3>
            <p>
              Wattpad will not be liable for any damages arising from your use
              or inability to use the platform, including any content provided
              through the platform. This includes, but is not limited to, any
              errors, omissions, or interruptions in the service.
            </p>
            <p>
              In no event will Wattpad be liable for any indirect, incidental,
              or consequential damages. You agree to use the platform at your
              own risk.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold">8. Changes to Terms</h3>
            <p>
              Wattpad reserves the right to modify these Terms and Conditions at
              any time. If there are significant changes, we will notify users
              via email or through the platform. Continued use of the service
              after such changes constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold">9. Governing Law</h3>
            <p>
              These Terms and Conditions will be governed by and construed in
              accordance with the laws of the country where Wattpad operates,
              without regard to its conflict of law principles.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold">10. Dispute Resolution</h3>
            <p>
              Any disputes arising from these Terms and Conditions will be
              resolved through binding arbitration, rather than in court. By
              using the Wattpad platform, you agree to resolve disputes in this
              manner.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold">11. Contact Us</h3>
            <p>
              If you have any questions about these Terms and Conditions or need
              assistance, please contact us at:
            </p>
            <Link
              href="mailto:support@wattpad.com"
              className="text-primary font-semibold"
            >
              support@wattpad.com
            </Link>
          </section>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-4 w-16 h-16 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 focus:outline-none"
        >
          ↑
        </button>
      </div>
    </div>
  );
};

export default TermsConditionsPage;
