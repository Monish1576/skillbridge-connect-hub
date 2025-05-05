import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, Code, Search, MessageSquare, Globe, Briefcase, Shield, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Index() {
  const [userCount, setUserCount] = useState<number>(0);
  const [projectCount, setProjectCount] = useState<number>(0);
  
  useEffect(() => {
    async function fetchCounts() {
      try {
        // Fetch user count
        const { count: usersCount, error: userError } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (userError) {
          console.error('Error fetching user count:', userError);
        } else {
          setUserCount(usersCount || 0);
        }
        
        // Fetch project count
        const { count: projectsCount, error: projectError } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });
        
        if (projectError) {
          console.error('Error fetching project count:', projectError);
        } else {
          setProjectCount(projectsCount || 0);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    }
    
    fetchCounts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-[#0B101E]">
      <NavBar />
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="py-20 lg:py-32 bg-background dark:bg-[#0B101E] relative overflow-hidden"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <motion.h1 
                  variants={fadeIn}
                  className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary"
                >
                  Bridge Your Skills, Build Together
                </motion.h1>
                <motion.p 
                  variants={fadeIn}
                  className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed"
                >
                  SkillBridge connects students, faculty, and staff to collaborate on projects, 
                  fill skill gaps, and transform innovative ideas into reality.
                </motion.p>
                <motion.div 
                  variants={fadeIn}
                  className="flex flex-col sm:flex-row gap-3 pt-4"
                >
                  <Link to="/auth">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Get Started Free
                    </Button>
                  </Link>
                  <Link to="/explore">
                    <Button variant="outline" size="lg">
                      Learn How It Works
                    </Button>
                  </Link>
                </motion.div>
              </div>
              <motion.div 
                variants={fadeIn}
                className="mx-auto lg:mr-0 flex items-center justify-center p-4 bg-secondary/50 rounded-lg shadow-xl"
              >
                <img 
                  alt="SkillBridge Logo" 
                  className="rounded-lg shadow-lg object-contain w-full max-w-md"
                  src="/lovable-uploads/32cf22e0-973a-4e66-bd4d-4d29bc44a967.png"
                  width={500}
                  height={500}
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Stats Section */}
        <section className="py-16 bg-primary/10 dark:bg-primary/5">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="container px-4 md:px-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <motion.div variants={fadeIn} className="p-6 bg-card dark:bg-card/30 rounded-lg shadow-sm">
                <h3 className="text-3xl font-bold text-primary">{userCount}+</h3>
                <p className="text-muted-foreground">Users Registered</p>
              </motion.div>
              <motion.div variants={fadeIn} className="p-6 bg-card dark:bg-card/30 rounded-lg shadow-sm">
                <h3 className="text-3xl font-bold text-primary">{projectCount}+</h3>
                <p className="text-muted-foreground">Projects Submitted</p>
              </motion.div>
              <motion.div variants={fadeIn} className="p-6 bg-card dark:bg-card/30 rounded-lg shadow-sm">
                <h3 className="text-3xl font-bold text-primary">120+</h3>
                <p className="text-muted-foreground">Countries Connected</p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                How SkillBridge is Different
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Our unique approach to connecting talent
              </p>
            </motion.div>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <motion.div variants={fadeIn}>
                <Card className="bg-card/50 border-none shadow-sm hover:shadow-md transition-all h-full">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                      <Briefcase className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Flexible Roles</h3>
                    <p className="text-muted-foreground">
                      Browse a variety of unique and remote work roles based on your skills
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Card className="bg-card/50 border-none shadow-sm hover:shadow-md transition-all h-full">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                      <Globe className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Global Reach</h3>
                    <p className="text-muted-foreground">
                      Connect with talents worldwide and quickly find talent for your needs
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Card className="bg-card/50 border-none shadow-sm hover:shadow-md transition-all h-full">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                      <Code className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">All Skills Welcome</h3>
                    <p className="text-muted-foreground">
                      We welcome all expertise on our platform, all talents are valued on our platform
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div variants={fadeIn}>
                <Card className="bg-card/50 border-none shadow-sm hover:shadow-md transition-all h-full">
                  <CardContent className="p-6 text-center space-y-4">
                    <div className="mx-auto bg-primary/10 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                      <Heart className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Community Focus</h3>
                    <p className="text-muted-foreground">
                      Share knowledge, get help, and build relationships in our dedicated global community
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                How SkillBridge Works
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Our platform makes it easy to connect talent with opportunity through a simple process
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8 mt-12"
            >
              <motion.div variants={fadeIn} className="relative flex flex-col items-center text-center">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">1</div>
                <h3 className="text-xl font-semibold mb-2">Register & Create Profile</h3>
                <p className="text-muted-foreground">
                  Sign up and create your profile, showcasing your skills & experiences
                </p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative flex flex-col items-center text-center">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">2</div>
                <h3 className="text-xl font-semibold mb-2">Connect & Negotiate</h3>
                <p className="text-muted-foreground">
                  Find the perfect match, connect, and negotiate terms and work on both parties
                </p>
              </motion.div>
              
              <motion.div variants={fadeIn} className="relative flex flex-col items-center text-center">
                <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mb-4">3</div>
                <h3 className="text-xl font-semibold mb-2">Complete Work & Get Rated</h3>
                <p className="text-muted-foreground">
                  Deliver quality work and receive rating through our secure platform
                </p>
              </motion.div>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="mt-12 text-center"
            >
              <Link to="/auth">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Started Now
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-secondary/20">
          <div className="container px-4 md:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
                What Our Users Say
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Hear from professionals and users who have found success on our platform
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-6"
            >
              <motion.div variants={fadeIn}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                    <p className="mb-4">
                      "Finding engineering expertise on SkillBridge has been seamless. The flexible skill matching and intuitive project management tools allow me to focus on the work and not the platform."
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                      <Avatar>
                        <AvatarFallback>SR</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Suresh Reddy</p>
                        <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={fadeIn}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                    <p className="mb-4">
                      "I started as a part-time designer, but the platform's exposure to challenging work allowed me to go full-time in a freelance. The platform's simplicity is refreshing for creatives."
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                      <Avatar>
                        <AvatarFallback>PR</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Priya Rao</p>
                        <p className="text-sm text-muted-foreground">UX/UI Designer</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div variants={fadeIn}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="text-yellow-400 text-lg">★★★★★</div>
                    </div>
                    <p className="mb-4">
                      "The mentorship features on SkillBridge have been life-changing. I've connected with industry leaders who have helped me advance my skills. A must for any aspiring professional."
                    </p>
                    <div className="flex items-center gap-3 mt-6">
                      <Avatar>
                        <AvatarFallback>VK</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">Venkat Kumar</p>
                        <p className="text-sm text-muted-foreground">Marketing Specialist</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-white">
          <div className="container px-4 md:px-6">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="text-center"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Ready to Transform How You Work?
              </h2>
              <p className="max-w-[700px] mx-auto text-white/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mb-8">
                Join SkillBridge's innovative platform and be part of something that's redefining the future of work
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90">
                    Create Your Account
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="bg-primary-foreground/10 border-white/20 hover:bg-primary-foreground/20">
                    Contact Our Team
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
