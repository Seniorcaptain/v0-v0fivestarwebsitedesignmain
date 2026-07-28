import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Privacy Policy - FIVE ST★R Driving School Kenya',
  description: 'Privacy policy and GDPR/Kenya DPA compliance information. Learn how we protect your personal data at FIVE ST★R Driving School.',
  keywords: 'privacy policy, data protection, GDPR compliance, Kenya data protection',
  openGraph: {
    title: 'Privacy Policy - FIVE ST★R Driving School',
    description: 'Our commitment to protecting your personal information and data privacy.',
    url: 'https://fivestardrivingschools.com/privacy-policy',
  },
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: May 2026</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                We collect information you provide directly through our booking forms and contact pages:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Full name</li>
                <li>Phone number (Kenyan mobile numbers)</li>
                <li>Email address (optional)</li>
                <li>Course of interest</li>
                <li>Any messages or special requests you provide</li>
              </ul>
              <p className="text-gray-700 text-sm mt-4">
                <strong>Data Minimisation:</strong> We only collect information necessary to process your inquiry. We do not collect ID numbers, dates of birth, or addresses unless you voluntarily provide them.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Your information is used exclusively for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Processing your driving lesson inquiry or booking</li>
                <li>Contacting you regarding your course preference</li>
                <li>Sending course confirmations and schedules</li>
                <li>Responding to your inquiries and providing customer support</li>
              </ul>
              <p className="text-gray-700 text-sm mt-4">
                We do not sell, rent, or share your personal data with third parties for marketing purposes.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Data Retention</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                We retain your inquiry data for a period of 12 months from the date of submission. After this period, your data is securely deleted from our systems.
              </p>
              <p>
                If you complete a course with us, we may retain enrollment records for longer as required by NTSA regulations and educational records requirements.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Your Rights Under Kenya's Data Protection Act 2019</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700">
                Under Kenya's Data Protection Act 2019, you have the following rights:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Right of Access:</strong> Request a copy of the personal data we hold about you</li>
                <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data</li>
                <li><strong>Right to Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
                <li><strong>Right to Data Portability:</strong> Request your data in a portable format</li>
              </ul>
              <p className="text-gray-700 text-sm mt-4">
                To exercise any of these rights, please contact us at <a href="mailto:privacy@fivestardrivingschools.com" className="text-blue-600 hover:underline">privacy@fivestardrivingschools.com</a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Security Measures</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                We implement industry-standard security measures to protect your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>All data transmissions use HTTPS encryption</li>
                <li>Access to personal data is restricted to authorized personnel only</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Secure deletion of data after retention periods expire</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Cookies & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                Our website uses minimal cookies:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Essential cookies for site functionality</li>
                <li>Google Analytics for anonymized traffic analysis (optional, can be opted out)</li>
              </ul>
              <p className="text-sm mt-4">
                We do not use third-party tracking pixels or behavioral targeting advertising.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Third-Party Links</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>
                Our website may contain links to external websites (WhatsApp, Google Maps, etc.). We are not responsible for the privacy practices of external sites. Please review their privacy policies before providing any information.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>8. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700 space-y-4">
              <p>
                If you have questions about this privacy policy or wish to exercise your data rights, please contact:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>FIVE ST★R Driving School</strong></p>
                <p>Email: <a href="mailto:privacy@fivestardrivingschools.com" className="text-blue-600 hover:underline">privacy@fivestardrivingschools.com</a></p>
                <p>Phone: <a href="tel:+254794478773" className="text-blue-600 hover:underline">+254 794 478 773</a></p>
                <p className="text-sm text-gray-600 mt-4">
                  Data Protection Officer: privacy@fivestardrivingschools.com
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>9. Policy Changes</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>
                We may update this privacy policy from time to time. Changes will be effective immediately upon posting to the website. Your continued use of our services constitutes your acceptance of the updated privacy policy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
