import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const About = () => {
  const experience = [
    { year: "2025-Present", title: "Business Analyst", company: "Xmplar Management Solutions Pvt. Ltd." },
    { year: "2024-Present", title: "Innovating for the Future (Co-Founder)", company: "Bude Global Enterprise" },
    { year: "2023-2024", title: "ERP Functional Consultant", company: "Frutter Software Labs" },
    { year: "2021-2023", title: "Freelancer", company: "Business Branding & Designing" },
  ];

  const skills = [
    "UI/UX Design",
    "Web Development",
    "ERP Implementation",
    "Business Consulting",
    "Figma",
    "ERPNext",
    "Odoo",
    "Frappe Framework",
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-24">
          {/* Hero Section */}
          <div className="mb-12 sm:mb-16 md:mb-20 animate-fade-in">
            <h1 className="font-sans text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6">
              About <span className="gradient-text">Me</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl">
              A passionate designer and developer crafting premium digital experiences with a focus on ERP solutions and modern web applications.
            </p>
          </div>

          {/* Story Section */}
          <div className="mb-12 sm:mb-16 md:mb-20">
            <div className="animate-slide-up">
              <h2 className="font-sans text-3xl font-bold mb-6">🎓 Professional Summary</h2>
              <p className="text-muted-foreground mb-4">
                I hold a Bachelor's degree in Commerce with a specialization in Computer Applications, which laid a strong foundation for my journey into the dynamic world of ERP solutions. I began my career as an ERPNext Functional Consultant, where I gained valuable hands-on experience and deep insights into the ERP landscape.
              </p>
              <p className="text-muted-foreground mb-4">
                With a proven background in ERPNext Implementation, Business Analysis, Project Management, and Consulting, I possess the expertise to deliver comprehensive, high-quality ERP solutions tailored to meet diverse business requirements.
              </p>
              <p className="text-muted-foreground mb-4">
                Currently, my focus is on driving business development initiatives across the Retail, Manufacturing, Service, and Healthcare sectors. My goal is to implement robust ERP systems that streamline operations, enhance productivity, and foster sustainable business growth.
              </p>
              <p className="text-muted-foreground">
                Leveraging my multidisciplinary expertise, I provide end-to-end ERP solutions — from project inception and strategic planning to seamless implementation and post-deployment support — ensuring measurable value and long-term success for every client.
              </p>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-20 animate-slide-up">
            <h2 className="font-sans text-3xl font-bold mb-8">Experience</h2>
            <div className="space-y-6">
              {experience.map((item, index) => (
                <div 
                  key={index}
                  className="border-l-2 border-primary pl-6 py-2 hover:border-[hsl(var(--gradient-pink))] transition-colors"
                >
                  <p className="text-sm text-muted-foreground mb-1">{item.year}</p>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground">{item.company}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          <div className="mb-20 animate-slide-up">
            <h2 className="font-sans text-3xl font-bold mb-8">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-secondary rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center py-16 bg-secondary/50 rounded-3xl animate-fade-in">
            <h2 className="font-sans text-4xl font-bold mb-6">
              Let's Work <span className="gradient-text">Together</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to transform your business with innovative solutions? Let's discuss your project.
            </p>
            <NavLink to="/contact.html">
              <Button variant="premium" size="lg">
                Get in Touch
              </Button>
            </NavLink>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;