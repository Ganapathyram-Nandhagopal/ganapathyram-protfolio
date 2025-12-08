import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import blogInventoryMismatch from "@/assets/blog-inventory-mismatch.png";
import blogDelayedApprovals from "@/assets/blog-delayed-approvals.png";
import blogManualSales from "@/assets/blog-manual-sales.png";
import blogCrmLeadTraceability from "@/assets/blog-crm-lead-traceability.png";
import blogProductionPlanning from "@/assets/blog-production-planning.png";

const blogPosts = [
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
    date: "Mar 28, 2025",
    readTime: "11 min read",
    image: blogManualSales,
  },
];

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
            {filteredPosts.map((post, index) => (
              <Link key={post.id} to={`/blog/${post.slug}`}>
                <Card 
                  className="group cursor-pointer hover-lift h-full border-0"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold group-hover:gradient-text transition-all">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
