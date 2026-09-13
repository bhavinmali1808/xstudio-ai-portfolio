/**
 * Simple AI Response Generator
 * Uses rule-based responses from knowledge base when free API is unavailable
 */

import { SYSTEM_PROMPT } from './HD GraphicsKnowledge';

export function generateSimpleResponse(userMessage: string, conversationHistory: any[]): string {
  const lowerMessage = userMessage.toLowerCase();

  // Services
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer')) {
    return `HD Graphics offers 8 core services:

1. **AI Marketing & Automation** - Automated campaigns that optimize in real-time
2. **Brand Strategy & Identity** - Complete brand identity redesign
3. **Graphic Design & Content** - Engaging visuals and multimedia
4. **Social Media Management** - Comprehensive social media strategies
5. **Website & App Development** - Modern, scalable digital products
6. **CRM & Custom Software** - Tailored software solutions
7. **SEO & Performance Marketing** - Data-driven SEO strategies
8. **AI Chatbots & Voice Assistants** - 24/7 conversational AI

Which service interests you most?`;
  }

  // Pricing/Quote
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('quote')) {
    return `I'd be happy to help you get a quote! Our pricing varies based on project scope, timeline, and services needed.

To get an accurate quote, I'll need a few details:
- What services are you interested in?
- What's your project timeline?
- What's your budget range?

Would you like to provide these details so I can generate a quote summary for you?`;
  }

  // Contact
  if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('call') || lowerMessage.includes('email')) {
    return `You can reach HD Graphics through:

📧 **Email:** office@HD Graphics.blog
📱 **Phone/WhatsApp:** 
   - +91 9998739029 (Primary)
   - +91 7043633667
📍 **Location:** Bangalore, India (Remote)

We usually respond within 2 hours! Would you like me to help you get started with a quote?`;
  }

  // Case Studies/Portfolio
  if (lowerMessage.includes('portfolio') || lowerMessage.includes('case study') || lowerMessage.includes('work') || lowerMessage.includes('project')) {
    return `Here are some of our featured case studies:

1. **NeoBank Rebrand** (Branding)
   - Complete brand identity redesign for a digital-first banking startup
   - Modern, trustworthy, and innovative visual system

2. **Our Creative** (Branding)
   - Showcasing creative excellence through innovative design solutions

3. **SaaS Growth Engine** (Marketing)
   - Scaled MRR from $10K to $100K
   - Full-funnel SEO and content marketing solution

For the complete portfolio deck with detailed case studies, please contact us at office@HD Graphics.blog or +91 9998739029.`;
  }

  // About HD Graphics
  if (lowerMessage.includes('about') || lowerMessage.includes('who are you') || lowerMessage.includes('HD Graphics')) {
    return `HD Graphics is a next-generation creative agency that fuses artistic vision with artificial intelligence.

**Our Story:**
We bridge the gap between creativity and AI to help startups, enterprises, and visionary founders build brands that resonate, marketing campaigns that convert, and digital products that scale.

**Key Metrics:**
- 50+ Projects Delivered
- 98% Client Satisfaction
- 3x Average Growth Rate

**Our Vision:**
To become the leading AI-first creative agency, transforming how brands connect with their audiences.

What would you like to know more about?`;
  }

  // Process
  if (lowerMessage.includes('process') || lowerMessage.includes('how it works') || lowerMessage.includes('workflow')) {
    return `Our process has 6 clear steps:

1. **Discover** - We delve deep into your business, target audience, and competitive landscape
2. **Strategize** - Our team crafts a custom design strategy
3. **Design** - We develop beautiful and functional designs
4. **Build** - We develop your products using best practices
5. **Launch** - We ensure smooth deployment
6. **Scale** - We help you scale with AI-powered solutions

Average turnaround: 2 weeks. Would you like to discuss your project?`;
  }

  // Default helpful response
  return `I'm here to help with HD Graphics services, process, and getting a quote! 

I can help you with:
- Our services and capabilities
- Getting a quote for your project
- Contact information
- Case studies and portfolio
- Our process and timeline

What would you like to know? You can ask me about our services, pricing, how to contact us, or our case studies.`;
}

