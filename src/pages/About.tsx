
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

export default function About() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 container py-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">About SkillBridge</h1>
            <p className="text-lg text-muted-foreground">
              Bridging the gap between ideas and skills in educational institutions.
            </p>
          </div>
          
          <div className="space-y-4">
            <p>
              SkillBridge was created to solve a common problem in educational institutions across 
              Andhra Pradesh and Telangana: connecting people with ideas to those with the skills 
              to bring them to life. Our platform enables students, faculty, and staff to collaborate 
              on projects by matching skills, interests, and expertise.
            </p>
            
            <p>
              Whether you're a student with technical skills looking to apply them to real-world 
              projects, or someone with a brilliant idea who needs collaborators with specific 
              technical expertise, SkillBridge provides the tools and community to make it happen. 
              Our mission is to foster innovation, learning, and collaboration within the academic 
              community of Andhra Pradesh and Telangana.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p>
              We envision a future where the gap between ideas and implementation is bridged 
              by meaningful connections. Where students can build portfolios through real projects, 
              faculty can find technical support for research initiatives, and staff can leverage 
              the collective talents of the community to improve campus life and operations.
            </p>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
            <ul className="space-y-2">
              <li><strong>Email:</strong> info@skillbridge.edu</li>
              <li><strong>Phone:</strong> +91 6303636530</li>
              <li><strong>Address:</strong> Skill Development Center, Hyderabad, Telangana</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
