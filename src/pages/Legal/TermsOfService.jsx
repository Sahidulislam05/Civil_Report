import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TermsOfService = () => {
    return (
        <div className="bg-base-200 min-h-screen py-10 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto bg-base-100 shadow-xl rounded-2xl p-8 md:p-12"
            >
                <h1 className="text-3xl md:text-4xl font-bold mb-6 text-primary">Terms of Service</h1>
                <p className="text-base-content/70 mb-8">
                    Last Updated: {new Date().toLocaleDateString()}
                </p>

                <div className="prose max-w-none text-base-content/80">
                    <h3>1. Acceptance of Terms</h3>
                    <p>
                        By accessing or using CivilReport, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.
                    </p>

                    <h3>2. User Responsibilities</h3>
                    <p>
                        You are responsible for the accuracy of the information you report. You agree not to:
                    </p>
                    <ul>
                        <li>Submit false or misleading reports.</li>
                        <li>Use abusive or offensive language.</li>
                        <li>Upload content that violates the rights of others.</li>
                        <li>Attempt to disrupt the operation of the platform.</li>
                    </ul>

                    <h3>3. Content Ownership</h3>
                    <p>
                        You retain ownership of the content you submit, but you grant CivilReport a license to use, display, and share such content for the purpose of issue resolution and platform operation.
                    </p>

                    <h3>4. Termination</h3>
                    <p>
                        We reserve the right to suspend or terminate your account if you violate these terms.
                    </p>

                    <h3>5. Limitation of Liability</h3>
                    <p>
                        CivilReport is provided "as is" without warranties of any kind. We are not liable for any damages arising from your use of the platform.
                    </p>

                    <h3>6. Changes to Terms</h3>
                    <p>
                        We may update these terms from time to time. Your continued use of the platform constitutes acceptance of the new terms.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default TermsOfService;
