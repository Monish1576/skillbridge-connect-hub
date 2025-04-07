
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
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Collaborate & Innovate
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find the perfect collaborators for your projects based on skills and expertise within your college community.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link to="/signup">
                    <Button size="lg">
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
              <div className="mx-auto lg:mr-0 flex items-center justify-center p-4 bg-secondary rounded-lg shadow-xl">
                <img 
                  alt="Students collaborating" 
                  className="rounded shadow-lg"
                  src="public/lovable-uploads/1a6dea47-e932-40e4-b0c2-422fcfd2b862.png"
                  width={500}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Key Features
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Everything you need to build amazing projects together
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-card/50 border-none shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                    <Users className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Find Collaborators</h3>
                  <p className="text-muted-foreground">
                    Connect with students and lecturers based on skills you need
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card/50 border-none shadow">
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
              <Card className="bg-card/50 border-none shadow">
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
              <Card className="bg-card/50 border-none shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                    <MessageSquare className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Real-time Chat</h3>
                  <p className="text-muted-foreground">
                    Communicate seamlessly with your project team
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Join Community Section */}
        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
              Join Our Growing Community
            </h2>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed mb-8">
              Connect with talented individuals across your college and collaborate on amazing projects.
            </p>
            <Link to="/signup">
              <Button size="lg" className="mx-auto">
                Sign Up Now
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
