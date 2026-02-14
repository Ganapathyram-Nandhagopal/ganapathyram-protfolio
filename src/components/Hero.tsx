import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Linkedin, Instagram, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 pt-20">
      <div className="max-w-5xl w-full text-center space-y-6 sm:space-y-8 animate-fade-in">
        <div className="space-y-2">
          <h1 className="font-sans text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Shaping{" "}
            <span className="gradient-text">Business</span>{" "}
            Strategy
          </h1>
        </div>
        
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4">
          A business minded ERP Consultant and Analyst passionate about transforming complex business challenges into seamless, technology-driven solutions that improve performance and profitability.
        </p>

        <div className="flex justify-center pt-2">
          <div className="social-btn-wrap group">
            <span className="social-btn-label">Social</span>
            <div className="social-btn-icons">
              <a href="mailto:ganapathyram.n@gmail.com" aria-label="Email" className="social-icon-item" style={{ transitionDelay: '1.1s' }}>
                <Mail className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/ganapathyramnandhagopal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon-item" style={{ transitionDelay: '0.9s' }}>
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="https://www.instagram.com/kavin.117/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon-item" style={{ transitionDelay: '0.7s' }}>
                <Instagram className="h-6 w-6" />
              </a>
              <a href="tel:+916383236424" aria-label="Phone" className="social-icon-item" style={{ transitionDelay: '0.4s' }}>
                <Phone className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button 
            size="lg" 
            variant="premium"
            className="group"
            onClick={() => document.getElementById('portfolio-sections')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Portfolio Sections
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="group"
            asChild
          >
            <Link to="/services.html">
              View My Services
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
