// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  return (
    <div className="bg-base-200 min-h-screen mt-16 py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-2xl p-8 md:p-12"
      >
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">
          Privacy Policy
        </h1>
        <p className="text-base-content/70 mb-8">
          Last Updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose max-w-none text-base-content/80">
          <h3>1. Introduction</h3>
          <p>
            Welcome to CivilReport. We value your privacy and are committed to
            protecting your personal information. This Privacy Policy explains
            how we collect, use, and share information when you use our
            platform.
          </p>

          <h3>2. Information We Collect</h3>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              <strong>Account Information:</strong> Name, email address, and
              profile picture provided during registration or social login.
            </li>
            <li>
              <strong>Report Data:</strong> Information about issues you report,
              including location, description, and images.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact
              with our website.
            </li>
          </ul>

          <h3>3. How We Use Your Information</h3>
          <p>We use your information to:</p>
          <ul>
            <li>Facilitate the reporting and resolution of public issues.</li>
            <li>
              Communicate with you regarding the status of your reported issues.
            </li>
            <li>Improve our platform and user experience.</li>
          </ul>

          <h3>4. Data Sharing</h3>
          <p>
            We do not sell your personal data. We may share public issue reports
            with relevant municipal authorities to facilitate resolution. Your
            name may be visible on public reports unless you choose to remain
            anonymous (if applicable).
          </p>

          <h3>5. Security</h3>
          <p>
            We implement reasonable security measures to protect your data.
            However, no method of transmission over the internet is 100% secure.
          </p>

          <h3>6. Contact Us</h3>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us at support@civilreport.com.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
