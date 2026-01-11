import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, MessageCircle, Send, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import blogInventoryMismatch from "@/assets/blog-inventory-mismatch.png";
import blogDelayedApprovals from "@/assets/blog-delayed-approvals.png";
import blogManualSales from "@/assets/blog-manual-sales.png";
import blogCrmLeadTraceability from "@/assets/blog-crm-lead-traceability.png";
import blogProductionPlanning from "@/assets/blog-production-planning.png";
import blogCrmSlowFollowups from "@/assets/blog-crm-slow-followups-new.png";
import blogErpCashflow from "@/assets/blog-erp-cashflow-new.png";
import signature from "@/assets/signature.png";

const blogPostsData = [
  {
    id: "12",
    slug: "slow-followups-killing-deals-crm-automates-engagement",
    title: "Slow Follow-ups Are Killing Deals – CRM Automates Engagement",
    category: "ERP & Business",
    date: "Apr 08, 2025",
    readTime: "10 min read",
    image: blogCrmSlowFollowups,
    content: "In today's sales world, customers expect instant communication. The moment they enquire – they want a reply now. But in most organizations, follow-ups depend on sales team memory, manual reminders, busy working hours, scattered notes, and WhatsApp messages."
  },
  {
    id: "13",
    slug: "struggling-cashflow-erp-real-time-financial-control",
    title: "Struggling with Cashflow? ERP Gives Real-Time Financial Control",
    category: "ERP & Business",
    date: "Apr 10, 2025",
    readTime: "11 min read",
    image: blogErpCashflow,
    content: "Almost every business owner asks the same question every month: Why do we have profit on paper but no money in the bank? This happens because accounting works after transactions, but cash flow issues appear during operations."
  },
  {
    id: "10",
    slug: "losing-leads-crm-full-lead-traceability",
    title: "Losing Leads Every Week? CRM Brings Full Lead Traceability",
    category: "ERP & Business",
    date: "Apr 02, 2025",
    readTime: "10 min read",
    image: blogCrmLeadTraceability,
    content: "Every business claims 'we get enough leads', yet struggles with low conversion and inconsistent follow-ups. The shocking reality is — most companies lose 20% to 45% of leads every month simply because they are not tracked properly."
  },
  {
    id: "11",
    slug: "inaccurate-production-planning-erp-manufacturing-bottlenecks",
    title: "Inaccurate Production Planning — How ERP Solves Manufacturing Bottlenecks",
    category: "ERP & Business",
    date: "Apr 05, 2025",
    readTime: "11 min read",
    image: blogProductionPlanning,
    content: "Manufacturing businesses lose massive revenue every year because products are not produced on time, in correct quantity, or with accurate material availability. The primary reason behind this? Manual production planning."
  },
  {
    id: "7",
    slug: "inventory-mismatch-stock-losses-erp-stock-accuracy",
    title: "Inventory Mismatch & Stock Losses — How ERP Brings 100% Stock Accuracy",
    category: "ERP & Business",
    date: "Mar 20, 2025",
    readTime: "12 min read",
    image: blogInventoryMismatch,
    content: "Inventory mismatch is one of the most common and costly problems businesses face today. Whether you run a trading business, retail shop, manufacturing unit, or distribution company, stock inaccuracy directly impacts profit, customer satisfaction, and cash flow."
  },
  {
    id: "8",
    slug: "delayed-purchase-approvals-erp-workflow-automation",
    title: "Delayed Purchase Approvals — How ERP Workflow Automation Speeds Up Procurement",
    category: "ERP & Business",
    date: "Mar 25, 2025",
    readTime: "10 min read",
    image: blogDelayedApprovals,
    content: "In many organizations, purchase approvals take longer than the actual buying process. A request raised by a team member travels through multiple people, waits in inboxes, and often gets stuck due to simple human delays."
  },
  {
    id: "9",
    slug: "manual-sales-followups-erp-crm-conversion-rate",
    title: "Manual Sales Follow-ups — How ERP CRM Increases Conversion Rate by 40%",
    category: "ERP & Business",
    date: "Dec 12, 2025",
    readTime: "11 min read",
    image: blogManualSales,
    content: "Sales teams lose more business due to poor follow-ups than poor leads. Most companies focus on getting more enquiries but forget the most important part: Consistent follow-ups convert leads into revenue."
  }
];

// Helper function to check if a date is in the future
const isUpcoming = (dateStr: string): boolean => {
  const postDate = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return postDate > today;
};

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies: Comment[];
}

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Comments state
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  
  // Newsletter state
  const [email, setEmail] = useState("");
  const [newsletterName, setNewsletterName] = useState("");
  
  const currentPost = blogPostsData.find(post => post.slug === slug) || blogPostsData[0];
  
  // Check if post is upcoming
  const postIsUpcoming = isUpcoming(currentPost.date);
  
  const relatedPosts = blogPostsData
    .filter(post => post.slug !== slug)
    .slice(0, 2);
  
  // Redirect to blog page if post is upcoming
  if (postIsUpcoming) {
    return <Navigate to="/blog.html" replace />;
  }

  // Load comments from localStorage
  useEffect(() => {
    const savedComments = localStorage.getItem(`blog-comments-${slug}`);
    if (savedComments) {
      const parsed = JSON.parse(savedComments);
      setComments(parsed.map((c: any) => ({
        ...c,
        timestamp: new Date(c.timestamp)
      })));
    }
  }, [slug]);

  // Update Open Graph meta tags for social sharing
  useEffect(() => {
    const baseUrl = window.location.origin;
    const imageUrl = `${baseUrl}${currentPost.image}`;
    const pageUrl = `${baseUrl}/blog/${currentPost.slug}`;
    
    // Update title
    document.title = `${currentPost.title} | Ganapathyram Nandhagopal`;
    
    // Update or create meta tags
    const updateMetaTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    const updateMetaName = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };
    
    // Open Graph tags
    updateMetaTag('og:title', currentPost.title);
    updateMetaTag('og:description', currentPost.content);
    updateMetaTag('og:image', imageUrl);
    updateMetaTag('og:url', pageUrl);
    updateMetaTag('og:type', 'article');
    
    // Twitter Card tags
    updateMetaName('twitter:card', 'summary_large_image');
    updateMetaName('twitter:title', currentPost.title);
    updateMetaName('twitter:description', currentPost.content);
    updateMetaName('twitter:image', imageUrl);
    
    return () => {
      document.title = 'Ganapathyram Nandhagopal | ERPNext Freelancer & ERP Functional Consultant';
    };
  }, [currentPost]);

  useEffect(() => {
    setIsTransitioning(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    // Update Open Graph meta tags for social sharing
    const ogTags = [
      { property: 'og:title', content: currentPost.title },
      { property: 'og:description', content: currentPost.content },
      { property: 'og:image', content: `https://ganapathyram.vercel.app${currentPost.image}` },
      { property: 'og:url', content: `https://ganapathyram.vercel.app/blog/${slug}` },
      { property: 'og:type', content: 'article' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: currentPost.title },
      { name: 'twitter:description', content: currentPost.content },
      { name: 'twitter:image', content: `https://ganapathyram.vercel.app${currentPost.image}` }
    ];

    ogTags.forEach(tag => {
      const existingTag = document.querySelector(
        tag.property ? `meta[property="${tag.property}"]` : `meta[name="${tag.name}"]`
      );
      
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        if (tag.property) meta.setAttribute('property', tag.property);
        if (tag.name) meta.setAttribute('name', tag.name);
        meta.setAttribute('content', tag.content);
        document.head.appendChild(meta);
      }
    });

    document.title = `${currentPost.title} | Ganapathyram Nandhagopal`;
  }, [currentPost, slug]);

  const shareUrl = `https://ganapathyram.vercel.app/blog/${slug}`;
  const shareTitle = currentPost.title;

  const handleShare = (platform: string) => {
    let url = '';
    switch(platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
    }
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast({
        title: "Link copied!",
        description: "Blog post URL has been copied to clipboard.",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !newName.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your name and comment.",
        variant: "destructive",
      });
      return;
    }

    const comment: Comment = {
      id: Date.now().toString(),
      author: newName,
      content: newComment,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };

    const updatedComments = [...comments, comment];
    setComments(updatedComments);
    localStorage.setItem(`blog-comments-${slug}`, JSON.stringify(updatedComments));
    
    setNewComment("");
    setNewName("");
    toast({
      title: "Comment posted!",
      description: "Your comment has been added successfully.",
    });
  };

  const handleLikeComment = (commentId: string) => {
    const newLikedComments = new Set(likedComments);
    
    if (newLikedComments.has(commentId)) {
      newLikedComments.delete(commentId);
      setComments(comments.map(c => 
        c.id === commentId ? { ...c, likes: c.likes - 1 } : c
      ));
    } else {
      newLikedComments.add(commentId);
      setComments(comments.map(c => 
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      ));
    }
    
    setLikedComments(newLikedComments);
    localStorage.setItem(`blog-comments-${slug}`, JSON.stringify(comments));
  };

  const handleReply = (commentId: string) => {
    if (!replyContent.trim()) return;

    const reply: Comment = {
      id: Date.now().toString(),
      author: "Anonymous",
      content: replyContent,
      timestamp: new Date(),
      likes: 0,
      replies: []
    };

    const updatedComments = comments.map(c => {
      if (c.id === commentId) {
        return { ...c, replies: [...c.replies, reply] };
      }
      return c;
    });

    setComments(updatedComments);
    localStorage.setItem(`blog-comments-${slug}`, JSON.stringify(updatedComments));
    setReplyContent("");
    setReplyingTo(null);
    
    toast({
      title: "Reply posted!",
      description: "Your reply has been added.",
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !newsletterName.trim()) {
      toast({
        title: "Missing information",
        description: "Please enter your name and email.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would send to a backend
    toast({
      title: "Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    setEmail("");
    setNewsletterName("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-24">
        <article className="max-w-4xl mx-auto px-6 md:px-12">
          <Link to="/blog.html">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>

          <div className={`space-y-8 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100 animate-fade-in'}`}>
            <div className="space-y-4">
              <Badge variant="secondary">{currentPost.category}</Badge>
              <h1 className="font-sans text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {currentPost.title}
              </h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span>{currentPost.date}</span>
                <span>•</span>
                <span>{currentPost.readTime}</span>
              </div>
            </div>

            <div className="relative h-96 rounded-3xl overflow-hidden">
              <img 
                src={currentPost.image} 
                alt={currentPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="prose prose-lg max-w-none space-y-6 text-foreground">
              <p className="text-xl leading-relaxed text-muted-foreground">
                {currentPost.content}
              </p>

              {currentPost.slug === "inventory-mismatch-stock-losses-erp-stock-accuracy" ? (
                // ERP Blog Post Content
                <>
                  <p>
                    In this blog, let's understand: Why inventory mismatches happen, how much loss they create, 
                    live table-based ERP entry examples showing how ERP fixes the problem, and how businesses 
                    achieve near 100% stock accuracy with ERP.
                  </p>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ What Is Inventory Mismatch?</h2>
                  <p>
                    Inventory mismatch means the physical stock in your warehouse does not match the system 
                    stock recorded in your software/spreadsheet.
                  </p>
                  
                  <p className="font-semibold">Common causes:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Manual data entry errors</li>
                    <li>Missing GRN (Goods Receipt Note)</li>
                    <li>Unrecorded stock issues</li>
                    <li>Wrong packing / wrong bin</li>
                    <li>Theft or misplacement</li>
                    <li>Wrong UOM conversion (box vs piece)</li>
                    <li>Expired or damaged items not recorded</li>
                  </ul>
                  <p>Even a 5% mismatch affects profitability significantly.</p>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Live Example: How Inventory Mismatch Happens (Without ERP)</h2>
                  <p>Let's take an example item: <strong>Bluetooth Speaker</strong>.</p>
                  <p>
                    <strong>Scenario:</strong> Warehouse receives 100 units. Packing team takes 10 units 
                    urgently without updating Excel.
                  </p>

                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Step</th>
                          <th className="border border-border px-4 py-2 text-left">Activity</th>
                          <th className="border border-border px-4 py-2 text-left">Physical Stock</th>
                          <th className="border border-border px-4 py-2 text-left">System Stock</th>
                          <th className="border border-border px-4 py-2 text-left">Issue</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2">1</td>
                          <td className="border border-border px-4 py-2">Supplier delivers 100 units</td>
                          <td className="border border-border px-4 py-2">100</td>
                          <td className="border border-border px-4 py-2">0</td>
                          <td className="border border-border px-4 py-2">No entry made</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">2</td>
                          <td className="border border-border px-4 py-2">Storekeeper updates Excel</td>
                          <td className="border border-border px-4 py-2">100</td>
                          <td className="border border-border px-4 py-2">100</td>
                          <td className="border border-border px-4 py-2">OK</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">3</td>
                          <td className="border border-border px-4 py-2">Packing team takes 10 units, forgets to update Excel</td>
                          <td className="border border-border px-4 py-2">90</td>
                          <td className="border border-border px-4 py-2">100</td>
                          <td className="border border-border px-4 py-2 text-destructive font-semibold">Mismatch (10 units)</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">4</td>
                          <td className="border border-border px-4 py-2">Sales team books order for 100 units</td>
                          <td className="border border-border px-4 py-2">90</td>
                          <td className="border border-border px-4 py-2">100</td>
                          <td className="border border-border px-4 py-2">Wrong confirmation</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">5</td>
                          <td className="border border-border px-4 py-2">Warehouse finds only 90 units physically</td>
                          <td className="border border-border px-4 py-2">90</td>
                          <td className="border border-border px-4 py-2">100</td>
                          <td className="border border-border px-4 py-2 text-destructive font-semibold">Customer delay, business loss</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="font-semibold">📌 Direct Loss</p>
                  <p>If each unit costs ₹120:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Loss = 10 × 120 = ₹1,200 (immediate)</li>
                    <li>Plus: lost sales because stock was promised but not available</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ How ERP Eliminates Inventory Mismatch</h2>
                  <p>
                    ERP ensures that every movement of stock is recorded as a document, eliminating manual 
                    errors completely. Below is the same scenario inside an ERP system.
                  </p>

                  <h3 className="font-sans text-2xl font-bold mt-8">🔹 1. Purchase Receipt Entry (GRN)</h3>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">ERP Document</th>
                          <th className="border border-border px-4 py-2 text-left">Field</th>
                          <th className="border border-border px-4 py-2 text-left">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2" rowSpan={5}>Purchase Receipt</td>
                          <td className="border border-border px-4 py-2">Supplier</td>
                          <td className="border border-border px-4 py-2">ABC Electronics</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Item</td>
                          <td className="border border-border px-4 py-2">Bluetooth Speaker</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Quantity Received</td>
                          <td className="border border-border px-4 py-2">100 units</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Stock Location</td>
                          <td className="border border-border px-4 py-2">WH1-Rack-A</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">System Stock After Posting</td>
                          <td className="border border-border px-4 py-2 text-primary font-semibold">100 units</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <p className="font-semibold">ERP Advantage:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✔ No manual entry</li>
                    <li>✔ Instant stock update</li>
                    <li>✔ Valuation + Ledger updated automatically</li>
                  </ul>

                  <h3 className="font-sans text-2xl font-bold mt-8">🔹 2. Sales Order Entry</h3>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">ERP Document</th>
                          <th className="border border-border px-4 py-2 text-left">Field</th>
                          <th className="border border-border px-4 py-2 text-left">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2" rowSpan={4}>Sales Order</td>
                          <td className="border border-border px-4 py-2">Customer</td>
                          <td className="border border-border px-4 py-2">SmartX Retail</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Item</td>
                          <td className="border border-border px-4 py-2">Bluetooth Speaker</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Ordered Qty</td>
                          <td className="border border-border px-4 py-2">10 units</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Available Stock</td>
                          <td className="border border-border px-4 py-2 text-primary font-semibold">100 units</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p>ERP ensures the sales team only sees live real-time stock.</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">🔹 3. Delivery Note / Stock Issue Entry</h3>
                  <p>Warehouse cannot remove stock without a delivery entry.</p>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">ERP Document</th>
                          <th className="border border-border px-4 py-2 text-left">Field</th>
                          <th className="border border-border px-4 py-2 text-left">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2" rowSpan={4}>Delivery Note</td>
                          <td className="border border-border px-4 py-2">Item</td>
                          <td className="border border-border px-4 py-2">Bluetooth Speaker</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Quantity Issued</td>
                          <td className="border border-border px-4 py-2">10 units</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Picked By</td>
                          <td className="border border-border px-4 py-2">Warehouse Staff</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">System Stock After Posting</td>
                          <td className="border border-border px-4 py-2 text-primary font-semibold">90 units</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="font-semibold">ERP Advantage:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✔ No stock movement without approval</li>
                    <li>✔ Physical stock = System stock</li>
                    <li>✔ Eliminates mismatch</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ ERP Prevents Unauthorised Movement</h2>
                  <p>If packing team tries to take 10 units without entry:</p>
                  <p className="bg-destructive/10 border border-destructive p-4 rounded-lg text-destructive font-semibold">
                    ERP Alert: "Stock cannot be removed — no Delivery Note created."
                  </p>
                  <p>This completely eliminates loss due to informal stock movements.</p>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ What if a Mismatch Still Occurs? (Stock Reconciliation)</h2>
                  <p>Let's say during audit, actual stock is 89 units instead of 90.</p>
                  
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Field</th>
                          <th className="border border-border px-4 py-2 text-left">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2">Item</td>
                          <td className="border border-border px-4 py-2">Bluetooth Speaker</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">System Qty</td>
                          <td className="border border-border px-4 py-2">90</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Physical Qty</td>
                          <td className="border border-border px-4 py-2">89</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Difference</td>
                          <td className="border border-border px-4 py-2 text-destructive">-1 (Shortage)</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Reason</td>
                          <td className="border border-border px-4 py-2">Damage / Missing</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Adjusted By</td>
                          <td className="border border-border px-4 py-2">Warehouse Manager</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Updated System Stock</td>
                          <td className="border border-border px-4 py-2 text-primary font-semibold">89</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="font-semibold">ERP Advantage:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✔ Tracks shortage reason</li>
                    <li>✔ Updates stock + accounting</li>
                    <li>✔ Creates audit trail for investigation</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Manual System vs ERP — Clear Comparison</h2>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Process</th>
                          <th className="border border-border px-4 py-2 text-left">Manual System</th>
                          <th className="border border-border px-4 py-2 text-left">ERP System</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2">Stock Entry</td>
                          <td className="border border-border px-4 py-2">Entered in Excel</td>
                          <td className="border border-border px-4 py-2 text-primary font-semibold">Auto-updated through GRN</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Internal Movements</td>
                          <td className="border border-border px-4 py-2">Not tracked</td>
                          <td className="border border-border px-4 py-2 text-primary font-semibold">Stock Transfer document</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Sales Dispatch</td>
                          <td className="border border-border px-4 py-2">Taken informally</td>
                          <td className="border border-border px-4 py-2 text-primary font-semibold">Delivery Note required</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Accuracy</td>
                          <td className="border border-border px-4 py-2">Low (70–80%)</td>
                          <td className="border border-border px-4 py-2 text-primary font-semibold">High (98–100%)</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Accounting Impact</td>
                          <td className="border border-border px-4 py-2">Not updated</td>
                          <td className="border border-border px-4 py-2 text-primary font-semibold">Live valuation</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Audit Trail</td>
                          <td className="border border-border px-4 py-2">None</td>
                          <td className="border border-border px-4 py-2 text-primary font-semibold">Full history</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Theft/Damage</td>
                          <td className="border border-border px-4 py-2">Goes unnoticed</td>
                          <td className="border border-border px-4 py-2 text-primary font-semibold">Mandatory reason tracking</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">Mismatch Frequency</td>
                          <td className="border border-border px-4 py-2">Very high</td>
                          <td className="border border-border px-4 py-2 text-primary font-semibold">Almost zero</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Real Case Study Result</h2>
                  <p className="font-semibold">Company: FMCG Distributor – Tamil Nadu</p>
                  
                  <p className="font-semibold mt-4">Before ERP:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>❌ Mismatch 20–25%</li>
                    <li>❌ Repeated stock-outs</li>
                    <li>❌ Dead stock worth ₹1 lakh</li>
                  </ul>

                  <p className="font-semibold mt-4">After ERP:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✔ Mandatory GRN + Delivery Notes</li>
                    <li>✔ Barcode scanning</li>
                    <li>✔ FIFO picking</li>
                    <li>✔ Monthly stock audit via ERP</li>
                  </ul>

                  <p className="font-semibold mt-4">Final Result:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>📌 Mismatch dropped to 1–2%</li>
                    <li>📌 Savings approx ₹1.8 lakhs in 3 months</li>
                    <li>📌 100% customer order fulfillment</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Conclusion</h2>
                  <p>Inventory mismatch is a silent profit-killer. But with a structured ERP:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>✔ Every movement is tracked</li>
                    <li>✔ Real-time stock accuracy</li>
                    <li>✔ Zero manual errors</li>
                    <li>✔ Transparent warehouse operations</li>
                    <li>✔ Faster order processing</li>
                  </ul>
                  <p>This is how businesses achieve near 100% stock accuracy and drastically reduce losses.</p>
                </>
              ) : currentPost.slug === "delayed-purchase-approvals-erp-workflow-automation" ? (
                // ERP Procurement Blog Post Content
                <>
                  <p>
                    This blog explains how delayed purchase approvals impact your business and how an ERP's automated 
                    workflow eliminates bottlenecks and speeds up procurement — with real examples and workflow tables.
                  </p>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ The Problem: Slow Purchase Approvals</h2>
                  <p>In most companies, purchase requests move like this:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>User raises a requisition</li>
                    <li>Manager must approve</li>
                    <li>Finance must review budget</li>
                    <li>Procurement must verify vendor</li>
                    <li>Final authority must sign off</li>
                  </ul>
                  <p>Each step depends on people checking emails manually, causing delays.</p>

                  <p className="font-semibold mt-4">Common issues:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Request pending in someone's inbox</li>
                    <li>Manager traveling or busy</li>
                    <li>No visibility on who should approve next</li>
                    <li>Paper-based or Excel-based approvals</li>
                    <li>Mismatch between budget and actual needs</li>
                    <li>No reminders or escalation</li>
                    <li>Approvals happen only when people "find time"</li>
                  </ul>

                  <p className="font-semibold mt-4">The result?</p>
                  <ul className="space-y-2 text-destructive font-semibold">
                    <li>👉 Material delivery delays</li>
                    <li>👉 Production stoppage</li>
                    <li>👉 Project cost overruns</li>
                    <li>👉 Emergency purchases at higher price</li>
                    <li>👉 Vendor dissatisfaction</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Live Example: How Delayed Manual Approvals Slow Down Procurement</h2>
                  <p>Let's consider a company buying 50 units of <strong>Safety Gloves</strong> for a construction site.</p>

                  <div className="overflow-x-auto my-8">
                    <p className="font-semibold mb-4">📌 Manual Approval Process (No ERP)</p>
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Step</th>
                          <th className="border border-border px-4 py-2 text-left">Activity</th>
                          <th className="border border-border px-4 py-2 text-left">Person</th>
                          <th className="border border-border px-4 py-2 text-left">Time Taken</th>
                          <th className="border border-border px-4 py-2 text-left">Issue</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2">1</td>
                          <td className="border border-border px-4 py-2">User submits request on paper/WhatsApp</td>
                          <td className="border border-border px-4 py-2">Site Supervisor</td>
                          <td className="border border-border px-4 py-2">Day 1</td>
                          <td className="border border-border px-4 py-2">Informal, no record</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">2</td>
                          <td className="border border-border px-4 py-2">Manager reviews the request</td>
                          <td className="border border-border px-4 py-2">Project Manager</td>
                          <td className="border border-border px-4 py-2">Day 2</td>
                          <td className="border border-border px-4 py-2">Manager busy inspecting site</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">3</td>
                          <td className="border border-border px-4 py-2">Sent to Finance for budget approval</td>
                          <td className="border border-border px-4 py-2">Accounts Staff</td>
                          <td className="border border-border px-4 py-2">Day 4</td>
                          <td className="border border-border px-4 py-2 text-destructive">Email missed; no reminders</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">4</td>
                          <td className="border border-border px-4 py-2">Sent to Procurement</td>
                          <td className="border border-border px-4 py-2">Buyer</td>
                          <td className="border border-border px-4 py-2">Day 6</td>
                          <td className="border border-border px-4 py-2">Buyer unaware it was approved</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">5</td>
                          <td className="border border-border px-4 py-2">RFQ sent to vendor</td>
                          <td className="border border-border px-4 py-2">Buyer</td>
                          <td className="border border-border px-4 py-2">Day 7</td>
                          <td className="border border-border px-4 py-2">Vendor takes more time</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">6</td>
                          <td className="border border-border px-4 py-2">PO created</td>
                          <td className="border border-border px-4 py-2">Procurement Head</td>
                          <td className="border border-border px-4 py-2">Day 9</td>
                          <td className="border border-border px-4 py-2">Late approval</td>
                        </tr>
                        <tr>
                          <td className="border border-border px-4 py-2">7</td>
                          <td className="border border-border px-4 py-2">Material delivered</td>
                          <td className="border border-border px-4 py-2">Vendor</td>
                          <td className="border border-border px-4 py-2">Day 14</td>
                          <td className="border border-border px-4 py-2 text-destructive font-semibold">Project delayed 5–6 days</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="mt-4 font-semibold text-destructive">Total Time: 14 Days</p>
                    <p className="text-muted-foreground">Most of the delay happened between Step 2–5, due to missing visibility.</p>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ How ERP Workflow Automation Speeds Up Purchase Approvals</h2>
                  <p>An ERP automates the entire approval chain using:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>✔ Configurable approval rules</li>
                    <li>✔ Email + mobile app notifications</li>
                    <li>✔ Auto-reminders</li>
                    <li>✔ Auto-escalations</li>
                    <li>✔ On-the-go approvals</li>
                    <li>✔ Real-time tracking</li>
                    <li>✔ Role-based confirmation levels</li>
                    <li>✔ Integrated procurement & finance workflow</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ ERP-Based Automated Approval Workflow</h2>
                  <p><strong>Item:</strong> Safety Gloves (50 units) | <strong>Requester:</strong> Site Supervisor | <strong>Budget Limit:</strong> ₹5,000</p>

                  <div className="overflow-x-auto my-8">
                    <p className="font-semibold mb-4">1️⃣ User Creates Purchase Request (PR)</p>
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Field</th>
                          <th className="border border-border px-4 py-2 text-left">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Requested By</td><td className="border border-border px-4 py-2">Site Supervisor</td></tr>
                        <tr><td className="border border-border px-4 py-2">Item</td><td className="border border-border px-4 py-2">Safety Gloves</td></tr>
                        <tr><td className="border border-border px-4 py-2">Qty</td><td className="border border-border px-4 py-2">50</td></tr>
                        <tr><td className="border border-border px-4 py-2">Estimated Amount</td><td className="border border-border px-4 py-2">₹4,500</td></tr>
                        <tr><td className="border border-border px-4 py-2">Status</td><td className="border border-border px-4 py-2 text-primary">Pending Approval</td></tr>
                      </tbody>
                    </table>
                    <p className="mt-2 text-muted-foreground">➡ Automatically goes to Project Manager | ➡ Mobile notification sent instantly</p>
                  </div>

                  <div className="overflow-x-auto my-8">
                    <p className="font-semibold mb-4">2️⃣ Manager Approval (Instant)</p>
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Approver</th>
                          <th className="border border-border px-4 py-2 text-left">Action</th>
                          <th className="border border-border px-4 py-2 text-left">Time Taken</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-border px-4 py-2">Project Manager</td>
                          <td className="border border-border px-4 py-2 text-primary">Approved</td>
                          <td className="border border-border px-4 py-2">Same day (5 min)</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className="mt-2 text-muted-foreground">➡ Auto-routed to Finance</p>
                  </div>

                  <div className="overflow-x-auto my-8">
                    <p className="font-semibold mb-4">3️⃣ Finance Budget Check</p>
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Field</th>
                          <th className="border border-border px-4 py-2 text-left">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Budget Available</td><td className="border border-border px-4 py-2">₹25,000</td></tr>
                        <tr><td className="border border-border px-4 py-2">PR Amount</td><td className="border border-border px-4 py-2">₹4,500</td></tr>
                        <tr><td className="border border-border px-4 py-2">Status</td><td className="border border-border px-4 py-2 text-primary">Approved</td></tr>
                      </tbody>
                    </table>
                    <p className="mt-2 text-muted-foreground">➡ Auto-routed to Procurement Team | ➡ Notification sent immediately</p>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Before vs After Comparison</h2>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Process Step</th>
                          <th className="border border-border px-4 py-2 text-left">Manual System</th>
                          <th className="border border-border px-4 py-2 text-left">ERP Workflow</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Request creation</td><td className="border border-border px-4 py-2">Paper/Excel</td><td className="border border-border px-4 py-2 text-primary">Digital PR</td></tr>
                        <tr><td className="border border-border px-4 py-2">Approval movement</td><td className="border border-border px-4 py-2">Email/WhatsApp</td><td className="border border-border px-4 py-2 text-primary">Auto-routed</td></tr>
                        <tr><td className="border border-border px-4 py-2">Follow-up</td><td className="border border-border px-4 py-2">Manual calls</td><td className="border border-border px-4 py-2 text-primary">Auto-reminders</td></tr>
                        <tr><td className="border border-border px-4 py-2">Finance budget check</td><td className="border border-border px-4 py-2">Manual Excel</td><td className="border border-border px-4 py-2 text-primary">Auto-budget validation</td></tr>
                        <tr><td className="border border-border px-4 py-2">PO approval</td><td className="border border-border px-4 py-2">Manual signature</td><td className="border border-border px-4 py-2 text-primary">Mobile approval</td></tr>
                        <tr><td className="border border-border px-4 py-2">Tracking</td><td className="border border-border px-4 py-2">None</td><td className="border border-border px-4 py-2 text-primary">Real-time status</td></tr>
                        <tr><td className="border border-border px-4 py-2">Escalation</td><td className="border border-border px-4 py-2">Missing</td><td className="border border-border px-4 py-2 text-primary">Auto-escalation</td></tr>
                        <tr><td className="border border-border px-4 py-2 font-semibold">Lead time</td><td className="border border-border px-4 py-2 text-destructive font-semibold">10–14 days</td><td className="border border-border px-4 py-2 text-primary font-semibold">3–4 days</td></tr>
                      </tbody>
                    </table>
                    <p className="mt-4 text-primary font-semibold">➡ ERP reduces approval time by 70–80%</p>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Key ERP Features That Speed Up Procurement</h2>
                  <ul className="space-y-4 text-muted-foreground">
                    <li><strong className="text-foreground">✔ Multi-level approval workflow</strong> — Define rules like: Manager approval up to ₹25,000, Finance above ₹25,000, Director above ₹1,00,000</li>
                    <li><strong className="text-foreground">✔ Mobile approvals</strong> — Managers approve on the go — no delays</li>
                    <li><strong className="text-foreground">✔ Auto reminders & escalations</strong> — If an approver does not respond in X hours: Reminder sent → Escalated to next authority</li>
                    <li><strong className="text-foreground">✔ Budget control & validation</strong> — System blocks PRs exceeding allocated budget</li>
                    <li><strong className="text-foreground">✔ Vendor portal + automated RFQ</strong> — Vendors receive RFQ and quote online</li>
                    <li><strong className="text-foreground">✔ Complete audit trail</strong> — Every approval, change, comment is logged</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Real Business Impact</h2>
                  <p>After implementing ERP workflow automation, companies experience:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>✔ 50–80% faster procurement cycle</li>
                    <li>✔ Zero lost requests</li>
                    <li>✔ Zero email follow-up</li>
                    <li>✔ Avoid emergency purchases</li>
                    <li>✔ Better vendor relationships</li>
                    <li>✔ Lower material cost</li>
                    <li>✔ Faster project completion</li>
                    <li>✔ On-time production</li>
                  </ul>
                  <p>Procurement becomes smooth, transparent, and 100% trackable.</p>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Conclusion</h2>
                  <p>Delayed approvals are one of the biggest silent bottlenecks in procurement. ERP workflow automation eliminates these delays through smart routing, instant notifications, mobile approvals, and complete visibility.</p>
                  <ul className="space-y-2 text-primary font-semibold mt-4">
                    <li>✔ Faster approvals</li>
                    <li>✔ Faster procurement</li>
                    <li>✔ Faster delivery</li>
                    <li>✔ Higher productivity</li>
                    <li>✔ Lower cost</li>
                  </ul>
                  <p>Your entire supply chain becomes faster and more reliable.</p>
                </>
              ) : currentPost.slug === "manual-sales-followups-erp-crm-conversion-rate" ? (
                // CRM Sales Blog Post Content
                <>
                  <p>
                    But when follow-ups are done manually using WhatsApp, Excel sheets, notebooks, and memory — leads slip through the cracks. 
                    This is where an ERP-integrated CRM transforms the entire sales pipeline.
                  </p>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ The Problem: Manual Follow-ups = Lost Revenue</h2>
                  <p className="font-semibold">Salespeople struggle with:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Forgetting to call leads</li>
                    <li>No reminder system</li>
                    <li>No central place to see all leads</li>
                    <li>Follow-up dates written in notebooks</li>
                    <li>Leads scattered across WhatsApp, Gmail, Excel</li>
                    <li>Missed hot leads because salesperson is busy</li>
                    <li>No visibility for managers</li>
                    <li>No measurement of follow-up quality</li>
                  </ul>

                  <p className="font-semibold mt-4">Result?</p>
                  <ul className="space-y-2 text-destructive font-semibold">
                    <li>❌ Delayed responses</li>
                    <li>❌ Missed opportunities</li>
                    <li>❌ Competitors close first</li>
                    <li>❌ Drop in conversion rate</li>
                    <li>❌ No forecasting accuracy</li>
                  </ul>
                  <p className="font-semibold mt-4">Businesses lose 30–50% of potential sales only due to poor follow-ups.</p>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Live Example: How Manual Follow-ups Cause Lost Sales</h2>
                  <p>Let's take a company selling <strong>Industrial Air Compressors</strong>.</p>

                  <div className="overflow-x-auto my-8">
                    <p className="font-semibold mb-4">📌 Manual Follow-up Flow (No ERP CRM)</p>
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Step</th>
                          <th className="border border-border px-4 py-2 text-left">Activity</th>
                          <th className="border border-border px-4 py-2 text-left">Problem</th>
                          <th className="border border-border px-4 py-2 text-left">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">1</td><td className="border border-border px-4 py-2">Lead comes from website</td><td className="border border-border px-4 py-2">Entered manually in Excel</td><td className="border border-border px-4 py-2">Often delayed</td></tr>
                        <tr><td className="border border-border px-4 py-2">2</td><td className="border border-border px-4 py-2">Salesperson calls customer</td><td className="border border-border px-4 py-2">Notes saved on WhatsApp</td><td className="border border-border px-4 py-2">No central history</td></tr>
                        <tr><td className="border border-border px-4 py-2">3</td><td className="border border-border px-4 py-2">Follow-up date noted on paper</td><td className="border border-border px-4 py-2">Easy to forget</td><td className="border border-border px-4 py-2 text-destructive">Missed follow-up</td></tr>
                        <tr><td className="border border-border px-4 py-2">4</td><td className="border border-border px-4 py-2">Customer calls again asking for quote</td><td className="border border-border px-4 py-2">Salesperson busy</td><td className="border border-border px-4 py-2">Slow response</td></tr>
                        <tr><td className="border border-border px-4 py-2">5</td><td className="border border-border px-4 py-2">Manager checks status</td><td className="border border-border px-4 py-2">No visibility</td><td className="border border-border px-4 py-2">Cannot guide</td></tr>
                        <tr><td className="border border-border px-4 py-2">6</td><td className="border border-border px-4 py-2">Lead turns cold</td><td className="border border-border px-4 py-2">No reminders</td><td className="border border-border px-4 py-2 text-destructive font-semibold">Lost opportunity</td></tr>
                      </tbody>
                    </table>
                    <p className="mt-4 text-muted-foreground">Conversion rate: ~20–25% | The main reason: Follow-ups are inconsistent and depend on individual memory.</p>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ How ERP CRM Fixes the Problem — With Automation</h2>
                  <p>An ERP-integrated CRM centralizes customer interaction, automates reminders, and improves salesperson efficiency.</p>

                  <div className="overflow-x-auto my-8">
                    <p className="font-semibold mb-4">📌 Lead Enters the CRM Automatically</p>
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Source</th>
                          <th className="border border-border px-4 py-2 text-left">Action</th>
                          <th className="border border-border px-4 py-2 text-left">ERP CRM Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Website Form</td><td className="border border-border px-4 py-2">Auto-captured</td><td className="border border-border px-4 py-2 text-primary">Lead created instantly</td></tr>
                        <tr><td className="border border-border px-4 py-2">WhatsApp</td><td className="border border-border px-4 py-2">Integrated</td><td className="border border-border px-4 py-2 text-primary">Message logged in CRM</td></tr>
                        <tr><td className="border border-border px-4 py-2">Email</td><td className="border border-border px-4 py-2">Auto-sync</td><td className="border border-border px-4 py-2 text-primary">Lead auto-created</td></tr>
                        <tr><td className="border border-border px-4 py-2">Phone Call</td><td className="border border-border px-4 py-2">Click-to-call integration</td><td className="border border-border px-4 py-2 text-primary">Call history stored</td></tr>
                      </tbody>
                    </table>
                    <p className="mt-2 text-muted-foreground">CRM assigns the lead to a salesperson automatically based on rules.</p>
                  </div>

                  <div className="overflow-x-auto my-8">
                    <p className="font-semibold mb-4">1️⃣ CRM Follow-up Task Automatically Created</p>
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Field</th>
                          <th className="border border-border px-4 py-2 text-left">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Lead Name</td><td className="border border-border px-4 py-2">Mr. Arvind</td></tr>
                        <tr><td className="border border-border px-4 py-2">Product</td><td className="border border-border px-4 py-2">Industrial Air Compressor</td></tr>
                        <tr><td className="border border-border px-4 py-2">Lead Score</td><td className="border border-border px-4 py-2 text-primary font-semibold">Hot</td></tr>
                        <tr><td className="border border-border px-4 py-2">Next Follow-up</td><td className="border border-border px-4 py-2">Auto-set in 24 hours</td></tr>
                        <tr><td className="border border-border px-4 py-2">Assigned To</td><td className="border border-border px-4 py-2">Salesperson – Ravi</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="overflow-x-auto my-8">
                    <p className="font-semibold mb-4">5️⃣ Manager Dashboard — Real-Time Visibility</p>
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Metric</th>
                          <th className="border border-border px-4 py-2 text-left">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">New Leads Today</td><td className="border border-border px-4 py-2">18</td></tr>
                        <tr><td className="border border-border px-4 py-2">Follow-ups Pending</td><td className="border border-border px-4 py-2">3</td></tr>
                        <tr><td className="border border-border px-4 py-2">Hot Leads</td><td className="border border-border px-4 py-2 text-primary font-semibold">9</td></tr>
                        <tr><td className="border border-border px-4 py-2">Conversion Rate</td><td className="border border-border px-4 py-2 text-primary font-semibold">38%</td></tr>
                        <tr><td className="border border-border px-4 py-2">Sales Pipeline Value</td><td className="border border-border px-4 py-2">₹58,00,000</td></tr>
                      </tbody>
                    </table>
                    <p className="mt-2 text-muted-foreground">Manager can instantly see if a salesperson is missing follow-ups.</p>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Before vs After — Conversion Rate Improvement</h2>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Parameter</th>
                          <th className="border border-border px-4 py-2 text-left">Manual Follow-ups</th>
                          <th className="border border-border px-4 py-2 text-left">ERP CRM Follow-ups</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Response Time</td><td className="border border-border px-4 py-2">Slow</td><td className="border border-border px-4 py-2 text-primary">Instant</td></tr>
                        <tr><td className="border border-border px-4 py-2">Follow-up Tracking</td><td className="border border-border px-4 py-2">None</td><td className="border border-border px-4 py-2 text-primary">Automated</td></tr>
                        <tr><td className="border border-border px-4 py-2">Lead Assignment</td><td className="border border-border px-4 py-2">Manual</td><td className="border border-border px-4 py-2 text-primary">Rules-based auto-assign</td></tr>
                        <tr><td className="border border-border px-4 py-2">Reminder System</td><td className="border border-border px-4 py-2">None</td><td className="border border-border px-4 py-2 text-primary">Built-in</td></tr>
                        <tr><td className="border border-border px-4 py-2">Manager Visibility</td><td className="border border-border px-4 py-2">Zero</td><td className="border border-border px-4 py-2 text-primary">Full dashboard</td></tr>
                        <tr><td className="border border-border px-4 py-2">Lead Leakages</td><td className="border border-border px-4 py-2 text-destructive">High</td><td className="border border-border px-4 py-2 text-primary">Zero</td></tr>
                        <tr><td className="border border-border px-4 py-2 font-semibold">Conversion Rate</td><td className="border border-border px-4 py-2 text-destructive font-semibold">20–25%</td><td className="border border-border px-4 py-2 text-primary font-semibold">35–40%</td></tr>
                        <tr><td className="border border-border px-4 py-2">Salesperson Efficiency</td><td className="border border-border px-4 py-2">Low</td><td className="border border-border px-4 py-2 text-primary">High</td></tr>
                        <tr><td className="border border-border px-4 py-2">Customer Experience</td><td className="border border-border px-4 py-2">Poor</td><td className="border border-border px-4 py-2 text-primary">Professional</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Why ERP CRM Improves Conversions by 40%</h2>
                  <p>Because it ensures:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>✔ No follow-up is ever missed</li>
                    <li>✔ Real-time lead insights</li>
                    <li>✔ Proper qualification & scoring</li>
                    <li>✔ Faster proposals & responses</li>
                    <li>✔ Automatic nurturing</li>
                    <li>✔ Complete lead history</li>
                    <li>✔ Manager monitoring</li>
                    <li>✔ Standard communication templates</li>
                    <li>✔ Multiple touch-points (email/WhatsApp/SMS)</li>
                  </ul>
                  <p className="font-semibold mt-4">CRM = Automation + Visibility + Consistency</p>
                  <p>And consistency drives conversion.</p>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Real Case Study: CRM Success</h2>
                  <p className="font-semibold">Company: Industrial Equipment Supplier</p>
                  
                  <p className="font-semibold mt-4">Before CRM:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>❌ Leads stored in Excel</li>
                    <li>❌ Conversion rate: 22%</li>
                    <li>❌ Follow-ups inconsistent</li>
                  </ul>

                  <p className="font-semibold mt-4">After ERP CRM:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✔ Auto-captured leads</li>
                    <li>✔ Automated follow-ups</li>
                    <li>✔ Manager dashboard</li>
                    <li>✔ WhatsApp + Email integration</li>
                  </ul>

                  <p className="font-semibold mt-4">Final Result:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>🚀 Conversion rate increased to 41%</li>
                    <li>🚀 Lead leakage reduced to 0%</li>
                    <li>🚀 Faster response = happier customers</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">⭐ Conclusion</h2>
                  <p>Manual follow-ups are the biggest hidden reason for low sales performance. An ERP-integrated CRM transforms the process by:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>✔ Automating follow-ups</li>
                    <li>✔ Ensuring timely reminders</li>
                    <li>✔ Enabling mobile-based tracking</li>
                    <li>✔ Improving manager visibility</li>
                    <li>✔ Boosting salesperson productivity</li>
                  </ul>
                  <p>That's why companies using CRM report 40% higher conversion rates and far better customer experience.</p>
                </>
              ) : currentPost.slug === "losing-leads-crm-full-lead-traceability" ? (
                <>
                  <p>Think about this 👇</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>enquiry received</li>
                    <li>sales team busy</li>
                    <li>follow-up missed</li>
                    <li>customer goes silent</li>
                    <li>lost forever</li>
                  </ul>

                  <p>This happens mainly because businesses run sales using:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Excel</li>
                    <li>spreadsheets</li>
                    <li>WhatsApp notes</li>
                    <li>business cards</li>
                    <li>phone call memory</li>
                  </ul>
                  <p className="font-semibold">This is not sales pipeline management — this is chaos.</p>
                  <p>This is where CRM gives complete lead traceability.</p>

                  <h2 className="font-sans text-3xl font-bold mt-12">❗ What Actually Causes Lead Loss?</h2>
                  
                  <h3 className="font-sans text-2xl font-bold mt-8">1. No centralized record of incoming leads</h3>
                  <p>Leads come from multiple channels:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>website</li>
                    <li>WhatsApp</li>
                    <li>phone calls</li>
                    <li>LinkedIn</li>
                    <li>referrals</li>
                    <li>exhibitions</li>
                    <li>walk-in</li>
                  </ul>
                  <p>Without CRM, leads get scattered and forgotten.</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">2. No responsible owner</h3>
                  <p>A lead comes → no one knows who should follow up.</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>➡ nobody owns the lead</li>
                    <li>➡ nobody updates status</li>
                  </ul>

                  <h3 className="font-sans text-2xl font-bold mt-8">3. Manual follow-up reminders</h3>
                  <p>Sales team remembers follow-ups based on:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>notes</li>
                    <li>emails</li>
                    <li>memory</li>
                  </ul>
                  <p>That means high chance of missing follow-ups.</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">4. No visibility of pending deals</h3>
                  <p>Management has no idea:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>what stage leads are at</li>
                    <li>who followed-up</li>
                    <li>who didn't</li>
                    <li>what is the expected closing value</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">🎯 CRM Provides End-to-End Lead Traceability</h2>
                  <p>CRM ensures every enquiry becomes a trackable sales opportunity. Here's how:</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">1. All Leads in One System</h3>
                  <p>CRM captures leads automatically from:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>website forms</li>
                    <li>WhatsApp</li>
                    <li>email</li>
                    <li>chat</li>
                    <li>campaigns</li>
                    <li>ads</li>
                    <li>social media</li>
                  </ul>
                  <p className="text-primary font-semibold">➡ No manual entry ➡ No missed leads</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">2. Lead Assignment Rules</h3>
                  <p>Auto assign leads based on:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>location</li>
                    <li>product interest</li>
                    <li>sales region</li>
                    <li>source</li>
                    <li>sales availability</li>
                  </ul>
                  <p className="text-primary font-semibold">➡ Each lead has an owner</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">3. Automated Follow-up Reminders</h3>
                  <p>CRM sends:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>reminders</li>
                    <li>tasks</li>
                    <li>follow-up notifications</li>
                  </ul>
                  <p className="text-primary font-semibold">➡ No follow-up skipped ➡ No manual tracking</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">4. Real-Time Lead Status</h3>
                  <p>See every detail:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>contacted or not</li>
                    <li>proposal sent</li>
                    <li>follow-up done</li>
                    <li>next call date</li>
                    <li>probability of winning</li>
                  </ul>

                  <h3 className="font-sans text-2xl font-bold mt-8">5. Sales Pipeline Visibility</h3>
                  <p>CRM dashboard shows:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>open leads</li>
                    <li>lost leads</li>
                    <li>conversion %</li>
                    <li>deal stage</li>
                    <li>pending actions</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">🆚 Before CRM vs After CRM</h2>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Area</th>
                          <th className="border border-border px-4 py-2 text-left">Before CRM</th>
                          <th className="border border-border px-4 py-2 text-left">After CRM</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Lead visibility</td><td className="border border-border px-4 py-2 text-destructive">Unknown</td><td className="border border-border px-4 py-2 text-primary">Fully traceable</td></tr>
                        <tr><td className="border border-border px-4 py-2">Follow-ups</td><td className="border border-border px-4 py-2 text-destructive">Manual</td><td className="border border-border px-4 py-2 text-primary">Automated</td></tr>
                        <tr><td className="border border-border px-4 py-2">Ownership</td><td className="border border-border px-4 py-2 text-destructive">Missing</td><td className="border border-border px-4 py-2 text-primary">Assigned</td></tr>
                        <tr><td className="border border-border px-4 py-2">Pipeline status</td><td className="border border-border px-4 py-2 text-destructive">Not visible</td><td className="border border-border px-4 py-2 text-primary">Fully visible</td></tr>
                        <tr><td className="border border-border px-4 py-2">Customer data</td><td className="border border-border px-4 py-2 text-destructive">Scattered</td><td className="border border-border px-4 py-2 text-primary">Centralized</td></tr>
                        <tr><td className="border border-border px-4 py-2 font-semibold">Conversion Rate</td><td className="border border-border px-4 py-2 text-destructive font-semibold">Low</td><td className="border border-border px-4 py-2 text-primary font-semibold">30–45% higher</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">📦 Example CRM Sales Workflow</h2>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Stage</th>
                          <th className="border border-border px-4 py-2 text-left">CRM Action</th>
                          <th className="border border-border px-4 py-2 text-left">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Lead Capture</td><td className="border border-border px-4 py-2">Auto create in CRM</td><td className="border border-border px-4 py-2 text-primary">No missing leads</td></tr>
                        <tr><td className="border border-border px-4 py-2">Assignment</td><td className="border border-border px-4 py-2">Allocate owner</td><td className="border border-border px-4 py-2 text-primary">Responsibility fixed</td></tr>
                        <tr><td className="border border-border px-4 py-2">First Contact</td><td className="border border-border px-4 py-2">Call/email/WhatsApp</td><td className="border border-border px-4 py-2 text-primary">Instant action</td></tr>
                        <tr><td className="border border-border px-4 py-2">Follow-up Scheduling</td><td className="border border-border px-4 py-2">Auto reminders</td><td className="border border-border px-4 py-2 text-primary">No delay</td></tr>
                        <tr><td className="border border-border px-4 py-2">Requirement Analysis</td><td className="border border-border px-4 py-2">Capture needs</td><td className="border border-border px-4 py-2 text-primary">Personalized offer</td></tr>
                        <tr><td className="border border-border px-4 py-2">Proposal</td><td className="border border-border px-4 py-2">Auto generated</td><td className="border border-border px-4 py-2 text-primary">Faster quotation</td></tr>
                        <tr><td className="border border-border px-4 py-2">Negotiation</td><td className="border border-border px-4 py-2">Record notes</td><td className="border border-border px-4 py-2 text-primary">Better control</td></tr>
                        <tr><td className="border border-border px-4 py-2">Close Lost / Won</td><td className="border border-border px-4 py-2">Final update</td><td className="border border-border px-4 py-2 text-primary">Sales insight</td></tr>
                        <tr><td className="border border-border px-4 py-2">Reports & Analytics</td><td className="border border-border px-4 py-2">Pipeline dashboard</td><td className="border border-border px-4 py-2 text-primary">Management visibility</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">🔥 Real Business Benefits</h2>
                  <p>After implementing CRM businesses usually see:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>✔ 100% lead accountability</li>
                    <li>✔ 40% faster response time</li>
                    <li>✔ 30–45% increase in conversion rate</li>
                    <li>✔ 60% reduction in lost leads</li>
                    <li>✔ complete follow-up visibility</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">📌 Final Takeaway</h2>
                  <p>Most businesses don't need "more leads" — they need better tracking of existing leads.</p>
                  <p>CRM helps you:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>✔ track every enquiry</li>
                    <li>✔ follow-up on time</li>
                    <li>✔ manage sales pipeline</li>
                    <li>✔ increase conversions</li>
                    <li>✔ close deals faster</li>
                  </ul>
                  <p className="font-semibold mt-4">Your leads are valuable — don't lose them because of manual tracking.</p>
                </>
              ) : currentPost.slug === "inaccurate-production-planning-erp-manufacturing-bottlenecks" ? (
                <>
                  <p>When planning relies on Excel sheets, human judgment, and disconnected data, production managers have no real-time visibility into:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Raw material stock</li>
                    <li>Machine availability</li>
                    <li>WIP status</li>
                    <li>Production schedule</li>
                    <li>Customer demand</li>
                    <li>Supplier lead times</li>
                  </ul>
                  <p className="font-semibold">This results in bottlenecks throughout the manufacturing chain.</p>

                  <h2 className="font-sans text-3xl font-bold mt-12">❗ Pain Points of Manual Production Planning</h2>

                  <h3 className="font-sans text-2xl font-bold mt-8">1. Frequent Material Shortages</h3>
                  <p>Planners don't know what materials are available in real-time.</p>
                  <p className="text-destructive font-semibold">➡ Result: production stops midway.</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">2. Overproduction or Underproduction</h3>
                  <p>Demand forecasting + inventory mismatch leads to:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>unsold inventory piling up</li>
                    <li>delayed order deliveries</li>
                  </ul>

                  <h3 className="font-sans text-2xl font-bold mt-8">3. No Real-Time Visibility of Resources</h3>
                  <p>Machine & workforce allocation is guess-based.</p>
                  <ul className="space-y-2 text-destructive">
                    <li>➡ Idle machines</li>
                    <li>➡ Worker overload</li>
                    <li>➡ Bottlenecks in assembly line</li>
                  </ul>

                  <h3 className="font-sans text-2xl font-bold mt-8">4. Delayed Delivery Commitments</h3>
                  <p>Without accurate planning, delivery dates are decided blindly.</p>
                  <ul className="space-y-2 text-destructive">
                    <li>➡ customer dissatisfaction</li>
                    <li>➡ sales loss</li>
                    <li>➡ penalty charges (especially in B2B)</li>
                  </ul>

                  <h3 className="font-sans text-2xl font-bold mt-8">5. Too Much Firefighting</h3>
                  <p>Production managers keep reacting instead of planning:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>jumping urgent orders</li>
                    <li>last-minute purchase</li>
                    <li>rescheduling</li>
                    <li>labor reassignments</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">🎯 How ERP Eliminates Production Bottlenecks</h2>
                  <p>Modern ERP gives complete production visibility from end to end.</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">🔥 1. Material Requirement Planning (MRP)</h3>
                  <p>The ERP automatically checks:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✔ BOM</li>
                    <li>✔ Stock</li>
                    <li>✔ Lead time</li>
                    <li>✔ Demand</li>
                    <li>✔ Reorder level</li>
                  </ul>
                  <p>And tells you exactly:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>what material is needed</li>
                    <li>how much quantity</li>
                    <li>when to order</li>
                  </ul>

                  <h3 className="font-sans text-2xl font-bold mt-8">🔥 2. Automated Production Scheduling</h3>
                  <p>ERP auto-calculates:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>machine availability</li>
                    <li>job priority</li>
                    <li>routing workflow</li>
                    <li>resource capacity</li>
                    <li>expected completion time</li>
                  </ul>
                  <p className="text-primary font-semibold">➡ no manual scheduling ➡ removes production conflicts</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">🔥 3. Real-time Inventory Synchronization</h3>
                  <p>When inventory is synchronized with production:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>shortages reduce</li>
                    <li>excess stock reduces</li>
                    <li>minimum inventory maintained</li>
                  </ul>

                  <h3 className="font-sans text-2xl font-bold mt-8">🔥 4. Accurate Demand Forecasting</h3>
                  <p>ERP uses:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>historical demand</li>
                    <li>current orders</li>
                    <li>seasonal trends</li>
                    <li>reorder history</li>
                  </ul>
                  <p>to predict upcoming demand.</p>
                  <p className="text-primary font-semibold">➡ no overproduction ➡ optimum planning</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">🔥 5. Shop Floor Tracking</h3>
                  <p>ERP tracks live manufacturing status:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>WIP quantity</li>
                    <li>machine load</li>
                    <li>operator performance</li>
                    <li>scrap percentage</li>
                    <li>completion time</li>
                    <li>pending jobs</li>
                  </ul>
                  <p className="text-primary font-semibold">➡ Real-time delays are visible instantly</p>

                  <h2 className="font-sans text-3xl font-bold mt-12">📦 Example ERP Production Workflow</h2>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Stage</th>
                          <th className="border border-border px-4 py-2 text-left">ERP Process</th>
                          <th className="border border-border px-4 py-2 text-left">Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Sales Order</td><td className="border border-border px-4 py-2">Demand generated</td><td className="border border-border px-4 py-2 text-primary">Trigger MRP</td></tr>
                        <tr><td className="border border-border px-4 py-2">BOM Explosion</td><td className="border border-border px-4 py-2">ERP checks components</td><td className="border border-border px-4 py-2 text-primary">Calculates need</td></tr>
                        <tr><td className="border border-border px-4 py-2">Material Planning</td><td className="border border-border px-4 py-2">Purchase auto triggered</td><td className="border border-border px-4 py-2 text-primary">Avoid shortage</td></tr>
                        <tr><td className="border border-border px-4 py-2">Routing Setup</td><td className="border border-border px-4 py-2">Operation sequence created</td><td className="border border-border px-4 py-2 text-primary">Standard workflow</td></tr>
                        <tr><td className="border border-border px-4 py-2">Production Scheduling</td><td className="border border-border px-4 py-2">Machine & resource assigned</td><td className="border border-border px-4 py-2 text-primary">Zero conflicts</td></tr>
                        <tr><td className="border border-border px-4 py-2">Shop Floor Execution</td><td className="border border-border px-4 py-2">Job cards issued</td><td className="border border-border px-4 py-2 text-primary">Live tracking</td></tr>
                        <tr><td className="border border-border px-4 py-2">WIP Monitoring</td><td className="border border-border px-4 py-2">Material & labor tracked</td><td className="border border-border px-4 py-2 text-primary">Production accuracy</td></tr>
                        <tr><td className="border border-border px-4 py-2">QC & Inspection</td><td className="border border-border px-4 py-2">Quality checked</td><td className="border border-border px-4 py-2 text-primary">Less rework</td></tr>
                        <tr><td className="border border-border px-4 py-2">Finished Goods</td><td className="border border-border px-4 py-2">Stock updated</td><td className="border border-border px-4 py-2 text-primary">Ready for dispatch</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">📊 Example Before vs After ERP</h2>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Area</th>
                          <th className="border border-border px-4 py-2 text-left">Before ERP</th>
                          <th className="border border-border px-4 py-2 text-left">After ERP</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Material availability</td><td className="border border-border px-4 py-2 text-destructive">Uncertain</td><td className="border border-border px-4 py-2 text-primary">Real-time</td></tr>
                        <tr><td className="border border-border px-4 py-2">Production planning</td><td className="border border-border px-4 py-2 text-destructive">Manual</td><td className="border border-border px-4 py-2 text-primary">Automated</td></tr>
                        <tr><td className="border border-border px-4 py-2">Scheduling</td><td className="border border-border px-4 py-2 text-destructive">Excel</td><td className="border border-border px-4 py-2 text-primary">Smart</td></tr>
                        <tr><td className="border border-border px-4 py-2">Delivery estimation</td><td className="border border-border px-4 py-2 text-destructive">Blind</td><td className="border border-border px-4 py-2 text-primary">Accurate</td></tr>
                        <tr><td className="border border-border px-4 py-2">Machine utilization</td><td className="border border-border px-4 py-2 text-destructive">Low</td><td className="border border-border px-4 py-2 text-primary">Optimized</td></tr>
                        <tr><td className="border border-border px-4 py-2">Customer delivery</td><td className="border border-border px-4 py-2 text-destructive">Delayed</td><td className="border border-border px-4 py-2 text-primary">On-time</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">💡 Business Results after ERP Implementation</h2>
                  <p>Manufacturers usually report:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>✔ 35% improvement in production efficiency</li>
                    <li>✔ 25% faster order fulfillment</li>
                    <li>✔ 40% fewer stock-outs</li>
                    <li>✔ 30% reduction in overtime cost</li>
                    <li>✔ 20% reduction in inventory holding cost</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">🎯 Conclusion</h2>
                  <p>Inaccurate production planning is not a manufacturing problem—it is a visibility problem.</p>
                  <p>ERP gives your business the clarity it needs:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>✔ accurate BOM planning</li>
                    <li>✔ real-time material control</li>
                    <li>✔ automated scheduling</li>
                    <li>✔ visibility across all processes</li>
                  </ul>
                  <p className="font-semibold mt-4">Result → Faster production + on-time delivery + lower operational cost.</p>
                </>
              ) : currentPost.slug === "slow-followups-killing-deals-crm-automates-engagement" ? (
                <>
                  <p>
                    A delay of even 2 hours can make the customer select your competitor. 
                    Slow follow-ups are silent deal killers. This is where CRM becomes a revenue growth engine.
                  </p>

                  <h2 className="font-sans text-3xl font-bold mt-12">❗ What exactly causes slow follow-ups?</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>✔ Sales rep is travelling</strong> — Customer enquiries come, but nobody responds instantly.</li>
                    <li><strong>✔ Manual reminders</strong> — Salespeople forget follow-up dates.</li>
                    <li><strong>✔ Leads scattered in Excel/WhatsApp</strong> — No central notification.</li>
                    <li><strong>✔ No visibility of pending follow-ups</strong> — Sales manager assumes team is following-up – but actually not.</li>
                    <li><strong>✔ Too many leads at peak time</strong> — When 20–30 enquiries arrive daily, manual follow-ups become impossible.</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">🤖 CRM Automates Follow-ups End-to-End</h2>
                  <p>CRM doesn't just store leads; it continuously drives them.</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">1. Auto Capture</h3>
                  <p>Whenever a lead comes from Website, Google ads, WhatsApp, Email, or Social — CRM captures automatically.</p>
                  <p className="text-primary font-semibold">➡ No manual entry ➡ No lost leads</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">2. Auto Assign to Sales Executives</h3>
                  <p>Based on territory, product, region, workload — every lead gets an owner immediately.</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">3. Auto Follow-Up Alerts</h3>
                  <p>CRM sends: task reminders, emails, popups, calendar notifications</p>
                  <p className="text-primary font-semibold">➡ No follow-up missed</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">4. Auto Email & WhatsApp Messages</h3>
                  <p>Example messages:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>"Thanks for enquiry"</li>
                    <li>"We will get back shortly"</li>
                    <li>"Here is our brochure"</li>
                    <li>"Shall we schedule a call tomorrow?"</li>
                  </ul>
                  <p className="text-primary font-semibold">➡ Customer gets engaged instantly</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">5. Auto Next-Action Scheduling</h3>
                  <p>After every activity, CRM forces next step: call, meeting, quotation, negotiation</p>
                  <p className="text-primary font-semibold">➡ No idle leads</p>

                  <h2 className="font-sans text-3xl font-bold mt-12">🆚 Before CRM vs After CRM</h2>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Area</th>
                          <th className="border border-border px-4 py-2 text-left">Before CRM</th>
                          <th className="border border-border px-4 py-2 text-left">After CRM</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Lead capture</td><td className="border border-border px-4 py-2 text-destructive">Manual</td><td className="border border-border px-4 py-2 text-primary">Automatic</td></tr>
                        <tr><td className="border border-border px-4 py-2">Follow-up</td><td className="border border-border px-4 py-2 text-destructive">Depends on memory</td><td className="border border-border px-4 py-2 text-primary">System driven</td></tr>
                        <tr><td className="border border-border px-4 py-2">Response time</td><td className="border border-border px-4 py-2 text-destructive">Delays</td><td className="border border-border px-4 py-2 text-primary">Instant</td></tr>
                        <tr><td className="border border-border px-4 py-2">Communication</td><td className="border border-border px-4 py-2 text-destructive">Manual</td><td className="border border-border px-4 py-2 text-primary">Automated</td></tr>
                        <tr><td className="border border-border px-4 py-2">Lost leads</td><td className="border border-border px-4 py-2 text-destructive">Very high</td><td className="border border-border px-4 py-2 text-primary">Almost zero</td></tr>
                        <tr><td className="border border-border px-4 py-2">Customer interest</td><td className="border border-border px-4 py-2 text-destructive">Low</td><td className="border border-border px-4 py-2 text-primary">Active</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">⚙ Real CRM Follow-Up Automation Example</h2>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Trigger</th>
                          <th className="border border-border px-4 py-2 text-left">CRM Action</th>
                          <th className="border border-border px-4 py-2 text-left">Customer Experience</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">New enquiry received</td><td className="border border-border px-4 py-2">Send email + assign sales rep</td><td className="border border-border px-4 py-2 text-primary">Instant response</td></tr>
                        <tr><td className="border border-border px-4 py-2">After 1 hour</td><td className="border border-border px-4 py-2">Automated WhatsApp intro</td><td className="border border-border px-4 py-2 text-primary">Customers feel attended</td></tr>
                        <tr><td className="border border-border px-4 py-2">Sales rep free</td><td className="border border-border px-4 py-2">Call task auto assigned</td><td className="border border-border px-4 py-2 text-primary">Timely follow-up</td></tr>
                        <tr><td className="border border-border px-4 py-2">No reply from customer</td><td className="border border-border px-4 py-2">Auto reminder next day</td><td className="border border-border px-4 py-2 text-primary">No lost conversation</td></tr>
                        <tr><td className="border border-border px-4 py-2">Lead still cold</td><td className="border border-border px-4 py-2">Auto send product brochure</td><td className="border border-border px-4 py-2 text-primary">Engagement continues</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">🔥 Result</h2>
                  <p>Companies using CRM automation see:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>✔ 60% improvement in response time</li>
                    <li>✔ 35–50% more engaged leads</li>
                    <li>✔ 20–40% higher conversion</li>
                    <li>✔ 100% traceability</li>
                    <li>✔ Zero "forgot to follow-up" excuses</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">📋 Real Example With CRM Activity Table</h2>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Time</th>
                          <th className="border border-border px-4 py-2 text-left">CRM Action</th>
                          <th className="border border-border px-4 py-2 text-left">Message Sent</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">10:00 AM</td><td className="border border-border px-4 py-2">Lead comes</td><td className="border border-border px-4 py-2">Auto email: Welcome! We received your enquiry</td></tr>
                        <tr><td className="border border-border px-4 py-2">10:05 AM</td><td className="border border-border px-4 py-2">Auto assign</td><td className="border border-border px-4 py-2">"Assigned to Sales Executive Raj"</td></tr>
                        <tr><td className="border border-border px-4 py-2">10:10 AM</td><td className="border border-border px-4 py-2">Auto WhatsApp</td><td className="border border-border px-4 py-2">Our sales expert will call shortly</td></tr>
                        <tr><td className="border border-border px-4 py-2">12:00 PM</td><td className="border border-border px-4 py-2">Sales rep task</td><td className="border border-border px-4 py-2">Call scheduled</td></tr>
                        <tr><td className="border border-border px-4 py-2">Next day</td><td className="border border-border px-4 py-2">Auto reminder</td><td className="border border-border px-4 py-2">"Follow up with customer"</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-primary font-semibold">Every step is automated — customer never feels ignored.</p>

                  <h2 className="font-sans text-3xl font-bold mt-12">🎯 Conclusion</h2>
                  <p>In today's competitive market, speed wins. CRM automation ensures:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>✔ Instant lead capture</li>
                    <li>✔ Automated follow-ups</li>
                    <li>✔ No missed opportunities</li>
                    <li>✔ Higher conversion rates</li>
                  </ul>
                  <p className="font-semibold mt-4">Stop losing deals to slow follow-ups. Let CRM automate your engagement.</p>
                </>
              ) : currentPost.slug === "struggling-cashflow-erp-real-time-financial-control" ? (
                <>
                  <p>
                    You might be profitable—but still face cash shortage due to: delayed customer payments, 
                    uncontrolled purchases, sudden expenses, wrong credit terms, inventory blocking money, 
                    and pending vendor settlements. ERP fixes this by giving real-time visibility, not end-of-month reports.
                  </p>

                  <h2 className="font-sans text-3xl font-bold mt-12">❗ Why businesses lose cash without knowing?</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li><strong>1. No real-time receivable tracking</strong> — Customers delay payments for weeks and nobody actually follows-up.</li>
                    <li><strong>2. No visibility on vendor liabilities</strong> — Payments due suddenly appear when vendor calls.</li>
                    <li><strong>3. Sales team gives discounts without approval</strong> — Profit reduces silently.</li>
                    <li><strong>4. Inventory purchases done without stock insight</strong> — Money gets blocked in excess stock.</li>
                    <li><strong>5. Expenses are recorded late</strong> — By the time accounting sees it—money is already gone.</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">💡 ERP Brings Real-Time Cash Flow Awareness</h2>
                  <p>ERP brings financial control at each operational point, not after accounting.</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">1. Customer Overdue Alerts</h3>
                  <p>Automatically shows: which client owes money, how many days overdue, penalty/interest, total pending</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">2. Credit Limit Controls</h3>
                  <p>System blocks new orders if customer credit exceeds threshold.</p>
                  <p className="text-primary font-semibold">➡ No risky sales ➡ Less financial exposure</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">3. Purchase Approval Based on Budget</h3>
                  <p>Purchase request checks: budget available, stock available, expected sales</p>
                  <p className="text-primary font-semibold">➡ No unnecessary purchase ➡ No blocked inventory</p>

                  <h3 className="font-sans text-2xl font-bold mt-8">4. Automated AP & AR</h3>
                  <p>ERP maintains: receivable aging, vendor aging, outstanding reports, recurrences — Everything calculated LIVE.</p>

                  <h2 className="font-sans text-3xl font-bold mt-12">📊 Before ERP vs After ERP</h2>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Area</th>
                          <th className="border border-border px-4 py-2 text-left">Before ERP</th>
                          <th className="border border-border px-4 py-2 text-left">After ERP</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Receivables</td><td className="border border-border px-4 py-2 text-destructive">Unknown</td><td className="border border-border px-4 py-2 text-primary">Live visibility</td></tr>
                        <tr><td className="border border-border px-4 py-2">Vendor dues</td><td className="border border-border px-4 py-2 text-destructive">Surprise notification</td><td className="border border-border px-4 py-2 text-primary">Planned</td></tr>
                        <tr><td className="border border-border px-4 py-2">Expenses</td><td className="border border-border px-4 py-2 text-destructive">Late entry</td><td className="border border-border px-4 py-2 text-primary">Live capture</td></tr>
                        <tr><td className="border border-border px-4 py-2">Purchases</td><td className="border border-border px-4 py-2 text-destructive">Overspending</td><td className="border border-border px-4 py-2 text-primary">Controlled</td></tr>
                        <tr><td className="border border-border px-4 py-2">Cashflow</td><td className="border border-border px-4 py-2 text-destructive">Monthly view</td><td className="border border-border px-4 py-2 text-primary">Real-time</td></tr>
                        <tr><td className="border border-border px-4 py-2">Working capital</td><td className="border border-border px-4 py-2 text-destructive">Struggle</td><td className="border border-border px-4 py-2 text-primary">Predictable</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">🧠 Real Example</h2>
                  <p><strong>🎯 Problem:</strong> Company has ₹50 Lakh sales but only ₹10 Lakh bank balance.</p>
                  <p>Why? Because:</p>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Component</th>
                          <th className="border border-border px-4 py-2 text-left">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Receivables</td><td className="border border-border px-4 py-2">₹25 Lakh</td></tr>
                        <tr><td className="border border-border px-4 py-2">Inventory blocked</td><td className="border border-border px-4 py-2">₹10 Lakh</td></tr>
                        <tr><td className="border border-border px-4 py-2">Vendor Due</td><td className="border border-border px-4 py-2">₹5 Lakh</td></tr>
                        <tr><td className="border border-border px-4 py-2 font-semibold">Actual cash available</td><td className="border border-border px-4 py-2 font-semibold">Only ₹10 Lakh</td></tr>
                      </tbody>
                    </table>
                  </div>

                  <h2 className="font-sans text-3xl font-bold mt-12">🔧 ERP Live Dashboard Example</h2>
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-border">
                      <thead className="bg-muted">
                        <tr>
                          <th className="border border-border px-4 py-2 text-left">Area</th>
                          <th className="border border-border px-4 py-2 text-left">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr><td className="border border-border px-4 py-2">Sales this month</td><td className="border border-border px-4 py-2">₹50,00,000</td></tr>
                        <tr><td className="border border-border px-4 py-2">Customer Outstanding</td><td className="border border-border px-4 py-2">₹25,00,000</td></tr>
                        <tr><td className="border border-border px-4 py-2 text-destructive">Overdue {'>'} 30 days</td><td className="border border-border px-4 py-2 text-destructive">₹8,00,000</td></tr>
                        <tr><td className="border border-border px-4 py-2">Vendor Payment Due</td><td className="border border-border px-4 py-2">₹5,00,000</td></tr>
                        <tr><td className="border border-border px-4 py-2 text-primary">Available Bank Balance</td><td className="border border-border px-4 py-2 text-primary">₹10,00,000</td></tr>
                        <tr><td className="border border-border px-4 py-2">Purchase Budget Remaining</td><td className="border border-border px-4 py-2">₹6,50,000</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <p>So decision making becomes:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>→ Stop giving credit to overdue customers</li>
                    <li>→ Reduce purchases this month</li>
                    <li>→ Push follow-ups</li>
                    <li>→ Delay vendor payments strategically</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">💥 Final Takeaway</h2>
                  <p>Most businesses don't have cash flow issues—they simply lack real-time financial visibility.</p>
                  <p>ERP prevents cash blockage by:</p>
                  <ul className="space-y-2 text-primary font-semibold">
                    <li>✔ Controlling spending</li>
                    <li>✔ Monitoring receivables</li>
                    <li>✔ Aligning purchases</li>
                    <li>✔ Enforcing credit rules</li>
                    <li>✔ Giving live dashboards</li>
                  </ul>
                  <p className="font-semibold mt-4">Cashflow isn't accounting — it's operational control. And ERP gives you that control every minute.</p>
                </>
              ) : (
                <>
                  <h2 className="font-sans text-3xl font-bold mt-12">The Philosophy Behind Minimalism</h2>
                  <p>
                    At its core, minimalist design is about intentionality. Every element on the screen should 
                    serve a purpose, whether functional or aesthetic. This approach forces designers to make 
                    deliberate choices about what to include and, more importantly, what to leave out.
                  </p>

                  <h2 className="font-sans text-3xl font-bold mt-12">Less is More</h2>
                  <p>
                    This famous architectural principle applies perfectly to digital design. By reducing visual 
                    clutter and focusing on essential elements, we create interfaces that are easier to understand 
                    and more pleasant to use. White space becomes an active design element, not empty space to be filled.
                  </p>

                  <h2 className="font-sans text-3xl font-bold mt-12">Key Principles</h2>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>Start with content and build the design around it</li>
                    <li>Use white space strategically to create visual hierarchy</li>
                    <li>Limit your color palette to create cohesion</li>
                    <li>Choose typography that is both readable and beautiful</li>
                    <li>Remove decorative elements that don't add value</li>
                  </ul>

                  <h2 className="font-sans text-3xl font-bold mt-12">Real-World Application</h2>
                  <p>
                    Companies like Apple have mastered minimalist design, creating products that feel premium and 
                    accessible. Their interfaces guide users naturally through tasks without overwhelming them with 
                    options or unnecessary embellishments.
                  </p>

                  <p>
                    The challenge lies in knowing when enough is enough. Too much minimalism can make an interface 
                    feel cold or confusing. The goal is to find that sweet spot where simplicity enhances rather 
                    than hinders the user experience.
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Author Signature */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="flex flex-col items-end">
              <img 
                src={signature} 
                alt="Ganapathyram Signature" 
                className="h-8 md:h-10 object-contain dark:invert"
              />
              <p className="text-muted-foreground text-sm mt-1">Ganapathyram Nandhagopal</p>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <MessageCircle className="h-6 w-6" />
                <h3 className="font-sans text-2xl font-bold">Comments ({comments.length})</h3>
              </div>

              {/* Add Comment Form */}
              <Card className="p-6">
                <div className="space-y-4">
                  <Input
                    placeholder="Your name"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                  />
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={4}
                  />
                  <Button onClick={handleAddComment} className="w-full sm:w-auto">
                    <Send className="mr-2 h-4 w-4" />
                    Post Comment
                  </Button>
                </div>
              </Card>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <Card key={comment.id} className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-semibold">{comment.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {comment.timestamp.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground">{comment.content}</p>
                      
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikeComment(comment.id)}
                          className={likedComments.has(comment.id) ? "text-primary" : ""}
                        >
                          <Heart className={`mr-2 h-4 w-4 ${likedComments.has(comment.id) ? "fill-current" : ""}`} />
                          {comment.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyingTo(comment.id)}
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Reply
                        </Button>
                      </div>

                      {/* Reply Form */}
                      {replyingTo === comment.id && (
                        <div className="ml-8 mt-4 space-y-2">
                          <Textarea
                            placeholder="Write a reply..."
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button size="sm" onClick={() => handleReply(comment.id)}>
                              Post Reply
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setReplyingTo(null);
                                setReplyContent("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="ml-8 mt-4 space-y-4 border-l-2 border-border pl-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="space-y-2">
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-semibold text-sm">{reply.author}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {reply.timestamp.toLocaleDateString('en-US', { 
                                      month: 'short', 
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">{reply.content}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card>
                ))}

                {comments.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No comments yet. Be the first to share your thoughts!
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="mt-16 pt-8 border-t border-border">
            <Card className="p-8 bg-gradient-to-r from-primary/5 to-primary/10">
              <div className="max-w-2xl mx-auto text-center space-y-6">
                <div className="flex justify-center">
                  <Mail className="h-12 w-12 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans text-2xl font-bold">Subscribe to Our Newsletter</h3>
                  <p className="text-muted-foreground">
                    Get the latest insights on design, ERP, and business strategy delivered to your inbox.
                  </p>
                </div>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      placeholder="Your name"
                      value={newsletterName}
                      onChange={(e) => setNewsletterName(e.target.value)}
                      className="bg-background"
                    />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-background"
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    <Mail className="mr-2 h-4 w-4" />
                    Subscribe Now
                  </Button>
                </form>
                <p className="text-xs text-muted-foreground">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </Card>
          </div>

          <div className="mt-24 space-y-8">
            <h3 className="font-sans text-2xl font-bold">Related Articles</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`}>
                  <Card className="group cursor-pointer hover-lift border-0">
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6 space-y-2">
                      <Badge variant="secondary">{post.category}</Badge>
                      <h4 className="text-lg font-semibold group-hover:gradient-text transition-all">
                        {post.title}
                      </h4>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
