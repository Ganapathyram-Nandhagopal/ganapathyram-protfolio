import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 pt-20">
      <div className="max-w-5xl w-full text-center space-y-6 sm:space-y-8 animate-fade-in">
        <div className="space-y-2">
          <h1 className="font-sans text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-tight">
            Shaping{" "}
            <span className="gradient-text">Business</span>
            <br />
            Strategy
          </h1>
        </div>
        
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
          A business minded ERP Consultant and Analyst passionate about transforming complex business challenges into seamless, technology-driven solutions that improve performance and profitability.
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <a href="mailto:your.email@example.com" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full" asChild>
            <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
          </Button>
        </div>
        
        <div className="pt-4">
          <Button 
            size="lg" 
            variant="premium"
            className="group"
            onClick={() => document.getElementById('portfolio-sections')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Portfolio Sections
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
