import { Badge } from "@/components/ui/badge";

const skills = [
  "ERP Implementation", "Business Analyst", "ERPNext", "Odoo", 
  "OFBiz", "Frappe Framework"
];

const About = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24 bg-muted/30">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold">
              About <span className="gradient-text">Me</span>
            </h2>
            <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <h3 className="text-xl font-semibold text-foreground">🎓 Professional Summary</h3>
              <p>
                I hold a Bachelor's degree in Commerce with a specialization in Computer Applications, which laid a strong foundation for my journey into the dynamic world of ERP solutions. I began my career as an ERPNext Functional Consultant, where I gained valuable hands-on experience and deep insights into the ERP landscape.
              </p>
              <p>
                With a proven background in ERPNext Implementation, Business Analysis, Project Management, and Consulting, I possess the expertise to deliver comprehensive, high-quality ERP solutions tailored to meet diverse business requirements.
              </p>
              <p>
                Currently, my focus is on driving business development initiatives across the Retail, Manufacturing, Service, and Healthcare sectors. My goal is to implement robust ERP systems that streamline operations, enhance productivity, and foster sustainable business growth.
              </p>
              <p>
                Leveraging my multidisciplinary expertise, I provide end-to-end ERP solutions — from project inception and strategic planning to seamless implementation and post-deployment support — ensuring measurable value and long-term success for every client.
              </p>
            </div>
          </div>

          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "200ms" }}>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Tools & Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="px-4 py-2 text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
