import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Factory, FileText, Settings, Users, TrendingUp, Briefcase } from "lucide-react";

const portfolioSections = [
  {
    id: 1,
    category: "ERP Implementation Projects",
    icon: Factory,
    items: [
      {
        title: "Manufacturing ERP Implementation",
        description: "End-to-end functional implementation covering BOM, routing, production planning, and cost tracking.",
      },
      {
        title: "Trading & Distribution ERP",
        description: "Streamlined local and export sales with inventory, procurement, and financial integration.",
      },
      {
        title: "Project-Based ERP (Contracting & Fabrication)",
        description: "Managed project budgets, WBS, milestone billing, and revenue recognition.",
      },
    ],
  },
  {
    id: 2,
    category: "Business Analysis & Process Design",
    icon: TrendingUp,
    items: [
      {
        title: "Sales & Order Management Workflow Design",
        description: "Requirement analysis and process mapping from RFQ to invoicing and collections.",
      },
      {
        title: "Procurement & Inventory Optimization",
        description: "Designed procure-to-pay workflows with approvals, GRN, and stock valuation controls.",
      },
      {
        title: "Finance & Accounting Integration",
        description: "Mapped GL, AP, AR, tax, and cost centers across ERP modules.",
      },
    ],
  },
  {
    id: 3,
    category: "Functional Documentation & SOPs",
    icon: FileText,
    items: [
      {
        title: "ERP Functional Specifications (FSD & BRD)",
        description: "Prepared detailed BRD, FSD, and gap-fit analysis for ERP customization.",
      },
      {
        title: "Standard Operating Procedures (SOPs)",
        description: "Created role-based SOPs for Sales, Purchase, Inventory, Manufacturing, and Finance teams.",
      },
      {
        title: "User Training & Manuals",
        description: "Developed end-user guides and conducted functional training sessions.",
      },
    ],
  },
  {
    id: 4,
    category: "ERP Customization & Integration",
    icon: Settings,
    items: [
      {
        title: "OFBiz Custom Module Design",
        description: "Defined functional logic for sales invoices, encumbrance orders, and helpdesk workflows.",
      },
      {
        title: "ERP Reports & Dashboards",
        description: "Functional design of MIS, operational, and statutory reports.",
      },
      {
        title: "Third-Party Integrations",
        description: "Payment gateways, e-Invoicing, LC & export documentation integration.",
      },
    ],
  },
  {
    id: 5,
    category: "Project & Delivery Leadership",
    icon: Users,
    items: [
      {
        title: "ERP Implementation Project Lead",
        description: "Led cross-functional teams, managed timelines, risks, and stakeholder communication.",
      },
      {
        title: "Gap Analysis & Change Management",
        description: "Handled change requests, UAT coordination, and go-live support.",
      },
      {
        title: "Post-Go-Live Support & Optimization",
        description: "Continuous improvement through process optimization and user feedback.",
      },
    ],
  },
];

const Projects = () => {
  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16 space-y-4 animate-fade-in">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold">
            Portfolio <span className="gradient-text">Sections</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            ERP Functional Consultant / Business Analyst expertise across implementation, analysis, and project delivery
          </p>
        </div>

        <div className="space-y-8 sm:space-y-12">
          {portfolioSections.map((section, sectionIndex) => (
            <div 
              key={section.id}
              className="animate-slide-up"
              style={{ animationDelay: `${sectionIndex * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <section.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">{section.category}</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {section.items.map((item, itemIndex) => (
                  <Card 
                    key={itemIndex}
                    className="group hover-lift border bg-card/50 backdrop-blur-sm hover:bg-card transition-all duration-300"
                  >
                    <CardContent className="p-5 sm:p-6 space-y-3">
                      <Badge variant="secondary" className="text-xs">
                        {section.category.split(' ')[0]}
                      </Badge>
                      <h4 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
