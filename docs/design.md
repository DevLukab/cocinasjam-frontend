# Kitchen Installation Website Design

## 1. Understanding Summary
*   **What is being built:** A multi-page website (Home, Our Process, Kitchen Styles, Gallery, Contact, Book Now) for a high-end kitchen installation business. The frontend will be built for high performance and SEO using Next.js and Tailwind CSS.
*   **Why it exists:** To generate leads, allow online booking, showcase a high-end portfolio, and establish credibility and trust.
*   **Who it is for:** Potential customers looking for premium/luxury kitchen installations.
*   **Key Constraints:** It must have a bold, premium, and luxurious aesthetic (dark mode, gold/copper accents, large high-quality imagery). It needs to be extremely fast and SEO-optimized.
*   **Explicit Non-goals:** We are *not* building a complex CMS-driven site for all pages right now. Only the Gallery will be managed via the existing Strapi backend initially. We are avoiding overly complex or slow traditional CMS setups for the frontend architecture.

## 2. Assumptions
1. The "Book Now" feature will integrate with a third-party service (like Calendly or Cal.com).
2. The "Contact" form will send an email or integrate with a simple CRM/webhook.
3. High-quality placeholder imagery will be used for the design phase.
4. The site will be responsive (mobile-first).
5. The Strapi backend has (or will have) a way to categorize/tag gallery images.

## 3. Decision Log
*   **Architecture:** Next.js (App Router) with Tailwind CSS. Chosen for speed, SEO, and developer experience.
*   **Aesthetic:** Bold, premium, luxurious (dark mode, gold/copper accents). Chosen to appeal to high-end clientele.

## 4. Final Design Structure

### Global Elements
*   **Navigation Bar:** Transparent at the top, becoming solid black/dark gray on scroll. Simple links: Home, Our Process, Kitchen Styles, Gallery, Contact. A prominent, gold/copper "Book Consultation" button.
*   **Footer:** Dark background. Includes contact info, business hours, social links, links to legal pages, and a newsletter signup or a final "Get in Touch" call to action.

### Home Page
*   **Hero Section:** Full-screen, high-quality video or image of a stunning kitchen. Large, clean typography: "Masterpiece Kitchens, Installed Perfectly." Primary CTA: "View Our Work". Secondary CTA: "Book a Consultation."
*   **Value Proposition / Trust Bar:** A sleek bar below the hero with 3 key pillars (e.g., "10+ Years Experience", "Premium Materials", "White-glove Service").
*   **Featured Kitchen Styles:** A 3-column grid showing distinct styles (e.g., Modern minimalist, Classic Wood, Industrial). Hovering over them slightly dims the others. 
*   **The Process (Brief):** A clean, horizontal timeline showing 3 steps (Consultation -> Design -> Installation).
*   **Testimonial Slider:** 1-2 powerful quotes from high-end clients. Dark background, elegant serif font for the quotes.
*   **Final Call to Action:** "Ready to start your project?" -> "Get in Touch" button.

### Gallery Page (CMS Driven)
*   **Hero Section:** A simple, elegant header: "Our Portfolio". Dark background, perhaps a subtle pattern.
*   **Filter Bar:** A sleek horizontal set of tags to filter projects (e.g., "All", "Modern", "Classic", "Islands", "Lighting"). These categories would correspond to tags/categories in your Strapi CMS.
*   **The Grid:** A dynamic, masonry-style grid (where images can be different heights) to showcase the before/after or final results. High-quality images that zoom slightly on hover. 
*   **Lightbox:** Clicking an image opens a full-screen, immersive lightbox with left/right arrows to browse the gallery, preventing the user from needing to click "back" to the grid.

### Our Process Page
*   **Hero Section:** "From Vision to Reality."
*   **Steps:** Detailed breakdown of the Consultation, Design, Permitting (if applicable), Installation, and Final Walkthrough phases. Use alternating left/right image and text blocks.

### Kitchen Styles Page
*   **Hero Section:** "Find Your Inspiration."
*   **Style Profiles:** Deep dives into 3-4 distinct aesthetics the installer specializes in, with representative images for each.

### Contact / Book Now Page
*   **Hero Section:** "Let's Talk About Your New Kitchen."
*   **Split Layout:**
    *   *Left:* Contact information (Phone, Email, Address), opening hours, and a direct contact form (Name, Email, Phone, Project Details, Budget Range dropdown).
    *   *Right:* An embedded calendar widget (Calendly/Cal.com) for direct consultation booking.
