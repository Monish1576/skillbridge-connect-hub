
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, Code, Search, MessageSquare } from "lucide-react";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                  Bridge Your Skills, Build Together
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  SkillBridge connects students, faculty, and staff to collaborate on projects, 
                  fill skill gaps, and transform innovative ideas into reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link to="/signup">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/explore">
                    <Button variant="outline" size="lg">
                      Explore Skills
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="mx-auto lg:mr-0 flex items-center justify-center p-4 bg-secondary/50 rounded-lg shadow-xl">
                <img 
                  alt="Students collaborating" 
                  className="rounded-lg shadow-lg object-cover"
                  src="public/lovable-uploads/1a6dea47-e932-40e4-b0c2-422fcfd2b862.png"
                  width={500}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                How SkillBridge Works
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Connect, Collaborate, Create
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-card/50 border-none shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Find Collaborators</h3>
                  <p className="text-muted-foreground">
                    Discover peers with complementary skills for your projects
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-none shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                    <Code className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Showcase Projects</h3>
                  <p className="text-muted-foreground">
                    Display your work and attract talented collaborators
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-none shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                    <Search className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Skill Matching</h3>
                  <p className="text-muted-foreground">
                    AI-powered recommendations for perfect project teams
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-none shadow-sm hover:shadow-md transition-all">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                    <MessageSquare className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Real-time Collaboration</h3>
                  <p className="text-muted-foreground">
                    Communicate seamlessly with your project team
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary mb-4">
              Join Our Growing Community
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed mb-8">
              Whether you're a student with a groundbreaking idea or a faculty member seeking innovative talent, 
              SkillBridge is your platform to connect, collaborate, and create.
            </p>
            <Link to="/signup">
              <Button size="lg" className="mx-auto bg-primary hover:bg-primary/90">
                Create Your Profile
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
