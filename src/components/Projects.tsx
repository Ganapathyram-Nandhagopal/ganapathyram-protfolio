import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Factory, FileText, Settings, Users, TrendingUp, Check, ArrowRight } from "lucide-react";

const portfolioSections = [
  {
    id: 1,
    icon: Factory,
    label: "Implementation",
    title: "ERP Implementation Projects",
    items: [
      "Manufacturing ERP Implementation — BOM, routing, production planning, and cost tracking",
      "Trading & Distribution ERP — Local and export sales with inventory, procurement, and financial integration",
      "Project-Based ERP (Contracting & Fabrication) — Project budgets, WBS, milestone billing, and revenue recognition",
    ],
  },
  {
    id: 2,
    icon: TrendingUp,
    label: "Analysis",
    title: "Business Analysis & Process Design",
    items: [
      "Sales & Order Management Workflow Design — RFQ to invoicing and collections process mapping",
      "Procurement & Inventory Optimization — Procure-to-pay workflows with approvals, GRN, and stock valuation",
      "Finance & Accounting Integration — GL, AP, AR, tax, and cost centers across ERP modules",
    ],
  },
  {
    id: 3,
    icon: FileText,
    label: "Documentation",
    title: "Functional Documentation & SOPs",
    items: [
      "ERP Functional Specifications (FSD & BRD) — Detailed BRD, FSD, and gap-fit analysis for customization",
      "Standard Operating Procedures (SOPs) — Role-based SOPs for Sales, Purchase, Inventory, Manufacturing, Finance",
      "User Training & Manuals — End-user guides and functional training sessions",
    ],
  },
  {
    id: 4,
    icon: Settings,
    label: "Customization",
    title: "ERP Customization & Integration",
    items: [
      "OFBiz Custom Module Design — Functional logic for sales invoices, encumbrance orders, helpdesk workflows",
      "ERP Reports & Dashboards — MIS, operational, and statutory reports design",
      "Third-Party Integrations — Payment gateways, e-Invoicing, LC & export documentation",
    ],
  },
  {
    id: 5,
    icon: Users,
    label: "Leadership",
    title: "Project & Delivery Leadership",
    items: [
      "ERP Implementation Project Lead — Cross-functional teams, timelines, risks, stakeholder communication",
      "Gap Analysis & Change Management — Change requests, UAT coordination, and go-live support",
      "Post-Go-Live Support & Optimization — Process optimization and user feedback implementation",
    ],
  },
];

const Projects = () => {
  const [activeSection, setActiveSection] = useState(0);
  const currentSection = portfolioSections[activeSection];

  return (
    <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Portfolio <span className="gradient-text">Sections</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            ERP Functional Consultant / Business Analyst expertise across implementation, analysis, and project delivery
          </p>
        </div>

        {/* Icon Selector */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 p-2 rounded-full border border-border bg-card shadow-sm">
            {portfolioSections.map((section, index) => {
              const Icon = section.icon;
              const isActive = activeSection === index;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(index)}
                  className={`relative flex flex-col items-center transition-all duration-300 ${
                    isActive ? "scale-105" : ""
                  }`}
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-foreground text-background"
                        : "bg-transparent text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Label */}
        <div className="text-center mb-8">
          <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {currentSection.label}
          </span>
        </div>

        {/* Portfolio Card */}
        <Card className="border border-border bg-card shadow-lg animate-fade-in">
          <CardContent className="p-6 sm:p-8 md:p-10">
            {/* Title with Arrow */}
            <div className="flex items-center gap-3 mb-8">
              <h3 className="font-sans text-2xl sm:text-3xl font-bold text-foreground">
                {currentSection.title}
              </h3>
              <ArrowRight className="w-6 h-6 text-muted-foreground" />
            </div>

            {/* Items List */}
            <div className="space-y-4">
              {currentSection.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                >
                  <div className="w-5 h-5 rounded-full bg-foreground flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-background" />
                  </div>
                  <span className="text-sm sm:text-base text-foreground leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Projects;
