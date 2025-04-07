
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us when you create an account, 
                complete your profile, communicate with other users, or otherwise interact with 
                our services. This information may include:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Personal information (name, email address, phone number)</li>
                <li>Academic information (department, role in institution)</li>
                <li>Professional information (skills, certifications)</li>
                <li>Content you post (project descriptions, messages, comments)</li>
                <li>Social media profiles and links</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Provide, maintain, and improve our services</li>
                <li>Connect users with complementary skills and interests</li>
                <li>Facilitate communication between users</li>
                <li>Monitor and analyze trends and usage of our services</li>
                <li>Detect and prevent fraudulent or abusive activity</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. Information Sharing</h2>
              <p>
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>With other users as part of the core functionality of the service</li>
                <li>With service providers who perform services on our behalf</li>
                <li>In response to legal process or government request</li>
                <li>When we believe disclosure is necessary to protect rights, safety, or property</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. Your Choices</h2>
              <p>
                You can access and update certain information in your account settings. 
                You may also request deletion of your account, though we may retain certain 
                information as required by law or for legitimate business purposes.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Security</h2>
              <p>
                We take reasonable measures to help protect your personal information from 
                loss, theft, misuse, and unauthorized access. However, no security system is 
                impenetrable, and we cannot guarantee the security of our systems.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any 
                changes by posting the new policy on our platform. Your continued use of SkillBridge 
                after any changes indicates your acceptance of the updated policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Contact Information</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="list-disc pl-5 mt-2">
                <li>Email: moturimonish@gmail.com</li>
                <li>Phone: 6303636530</li>
              </ul>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
