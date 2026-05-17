export default function PrivacyPage() {
  return (
    <div className="flex-1 max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
      <div className="prose prose-sm text-gray-600 space-y-4">
        <p>
          Global Smile is committed to protecting your privacy. This policy
          explains how we collect, use, and safeguard your personal data.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">Data We Collect</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Name, email, and phone number (for consultation purposes)</li>
          <li>Photos you upload for the AI Treatment Visualizer</li>
          <li>Dental concern descriptions you provide</li>
          <li>Referral information (for GP portal users)</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">How We Use Your Data</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>To generate educational treatment reports</li>
          <li>To calculate dental tourism cost comparisons</li>
          <li>To facilitate GP-to-specialist referrals</li>
          <li>Never for AI model training without separate consent</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">Data Retention</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Photos: automatically deleted after 90 days</li>
          <li>Reports: retained for 1 year</li>
          <li>Referral records: retained for 3 years per regulatory requirements</li>
        </ul>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">Your Rights</h2>
        <p>
          You may request access to, correction of, or deletion of your personal
          data at any time by contacting us. We comply with the India DPDP Act
          and applicable data protection laws.
        </p>

        <h2 className="text-lg font-semibold text-gray-800 mt-6">Contact</h2>
        <p>
          For privacy-related inquiries, please contact the practice directly.
        </p>

        <p className="text-xs text-gray-400 mt-8">
          Last updated: May 2026
        </p>
      </div>
    </div>
  );
}
