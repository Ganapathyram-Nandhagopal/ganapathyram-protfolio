import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import blogInventoryMismatch from "@/assets/blog-inventory-mismatch.png";
import blogDelayedApprovals from "@/assets/blog-delayed-approvals.png";
import blogManualSales from "@/assets/blog-manual-sales.png";
import blogCrmLeadTraceability from "@/assets/blog-crm-lead-traceability.png";
import blogProductionPlanning from "@/assets/blog-production-planning.png";
import blogCrmSlowFollowups from "@/assets/blog-crm-slow-followups.png";
import blogErpCashflow from "@/assets/blog-erp-cashflow.png";

const blogPosts = [
  {
    id: 12,
    slug: "slow-followups-killing-deals-crm-automates-engagement",
    title: "Slow Follow-ups Are Killing Deals – CRM Automates Engagement",
    excerpt: "In today's sales world, customers expect instant communication. A delay of even 2 hours can make the customer select your competitor. Discover how CRM becomes a revenue growth engine.",
    category: "ERP & Business",
    date: "Apr 08, 2025",
    readTime: "10 min read",
    image: blogCrmSlowFollowups,
  },
  {
    id: 13,
    slug: "struggling-cashflow-erp-real-time-financial-control",
    title: "Struggling with Cashflow? ERP Gives Real-Time Financial Control",
    excerpt: "Almost every business owner asks: Why do we have profit on paper but no money in the bank? ERP fixes this by giving real-time visibility, not end-of-month reports.",
    category: "ERP & Business",
    date: "Apr 10, 2025",
    readTime: "11 min read",
    image: blogErpCashflow,
  },
  {
    id: 10,
    slug: "losing-leads-crm-full-lead-traceability",
    title: "Losing Leads Every Week? CRM Brings Full Lead Traceability",
    excerpt: "Most companies lose 20% to 45% of leads every month simply because they are not tracked properly. Discover how CRM provides end-to-end lead traceability.",
    category: "ERP & Business",
    date: "Apr 02, 2025",
    readTime: "10 min read",
    image: blogCrmLeadTraceability,
  },
  {
    id: 11,
    slug: "inaccurate-production-planning-erp-manufacturing-bottlenecks",
    title: "Inaccurate Production Planning — How ERP Solves Manufacturing Bottlenecks",
    excerpt: "Manufacturing businesses lose massive revenue every year because products are not produced on time. Learn how ERP eliminates production bottlenecks.",
    category: "ERP & Business",
    date: "Apr 05, 2025",
    readTime: "11 min read",
    image: blogProductionPlanning,
  },
  {
    id: 7,
    slug: "inventory-mismatch-stock-losses-erp-stock-accuracy",
    title: "Inventory Mismatch & Stock Losses — How ERP Brings 100% Stock Accuracy",
    excerpt: "Discover how ERP systems eliminate inventory mismatches and achieve near-perfect stock accuracy with real-world examples.",
    category: "ERP & Business",
    date: "Mar 20, 2025",
    readTime: "12 min read",
    image: blogInventoryMismatch,
  },
  {
    id: 8,
    slug: "delayed-purchase-approvals-erp-workflow-automation",
    title: "Delayed Purchase Approvals — How ERP Workflow Automation Speeds Up Procurement",
    excerpt: "Learn how ERP workflow automation eliminates approval bottlenecks and reduces procurement time by 70-80%.",
    category: "ERP & Business",
    date: "Mar 25, 2025",
    readTime: "10 min read",
    image: blogDelayedApprovals,
  },
  {
    id: 9,
    slug: "manual-sales-followups-erp-crm-conversion-rate",
    title: "Manual Sales Follow-ups — How ERP CRM Increases Conversion Rate by 40%",
    excerpt: "Discover how ERP-integrated CRM transforms sales follow-ups and dramatically improves conversion rates.",
    category: "ERP & Business",
    date: "Dec 12, 2025",
    readTime: "11 min read",
    image: blogManualSales,
  },
];

// Helper function to check if a date is in the future
const isUpcoming = (dateStr: string): boolean => {
  const postDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return postDate > today;
};

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const categories = ["All", ...Array.from(new Set(blogPosts.map(post => post.category)))];
  
  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 space-y-4 animate-fade-in">
            <h1 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
              Business <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Practical insights on ERP implementation and business process optimization
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="transition-all"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post, index) => {
              const upcoming = isUpcoming(post.date);
              const CardWrapper = upcoming ? 'div' : Link;
              const cardProps = upcoming ? {} : { to: `/blog/${post.slug}` };
              
              return (
                <CardWrapper key={post.id} {...cardProps as any}>
                  <Card 
                    className={`group h-full border-0 ${upcoming ? 'opacity-75' : 'cursor-pointer hover-lift'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className={`w-full h-full object-cover transition-transform duration-500 ${upcoming ? 'grayscale' : 'group-hover:scale-105'}`}
                      />
                      {upcoming && (
                        <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                          <Badge variant="outline" className="bg-background/90 text-foreground border-primary gap-2">
                            <Clock className="h-4 w-4" />
                            Upcoming
                          </Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span className="text-xs text-muted-foreground">{post.readTime}</span>
                      </div>
                      <h3 className={`text-xl font-semibold ${upcoming ? '' : 'group-hover:gradient-text'} transition-all`}>
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      <p className="text-sm text-muted-foreground">{post.date}</p>
                    </CardContent>
                  </Card>
                </CardWrapper>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
