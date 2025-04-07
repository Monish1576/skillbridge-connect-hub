
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using SkillBridge, you agree to be bound by these Terms of Service. 
                If you do not agree to all of these terms, you may not access or use our services.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">2. Description of Service</h2>
              <p>
                SkillBridge is a platform designed to connect individuals within educational 
                institutions based on skills, interests, and project needs. We provide tools 
                for users to create profiles, showcase skills, post projects, and collaborate 
                with others.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">3. User Accounts</h2>
              <p>
                To use certain features of SkillBridge, you must register for an account. 
                You are responsible for maintaining the confidentiality of your account 
                information and for all activities that occur under your account.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">4. User Content</h2>
              <p>
                You retain ownership of any content you post on SkillBridge. By posting 
                content, you grant us a non-exclusive, royalty-free license to use, display, 
                and distribute your content in connection with the service.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">5. Prohibited Activities</h2>
              <p>
                You agree not to engage in any activity that interferes with or disrupts 
                the service, or use the service for any illegal purpose. Prohibited activities 
                include harassment, impersonation, and posting inappropriate content.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">6. Termination</h2>
              <p>
                We reserve the right to terminate or suspend your account at our discretion, 
                without notice, for conduct that we believe violates these Terms of Service 
                or is harmful to other users, us, or third parties.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">7. Changes to Terms</h2>
              <p>
                We may modify these Terms of Service at any time. Your continued use of 
                SkillBridge after any changes indicates your acceptance of the modified terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">8. Contact Information</h2>
              <p>
                If you have any questions about these Terms, please contact us at:
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
