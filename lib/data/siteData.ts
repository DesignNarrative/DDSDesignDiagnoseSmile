export interface Service {
  id: string;
  title: string;
  description: string;
  slug: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  image: string;
  excerpt: string;
  content: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  image: string;
}

export const services: Service[] = [
  {
    id: "general-dentistry",
    title: "General & Family Dentistry",
    description: "Our general dentistry services focus on the prevention, diagnosis, and treatment of a wide range of oral health issues.",
    slug: "general-dentistry",
    image: "/images/74143.jpg"
  },
  {
    id: "cosmetic-dentistry",
    title: "Cosmetic Dentistry",
    description: "Our cosmetic dentistry services are designed to improve the appearance of your teeth, gums, and overall smile.",
    slug: "cosmetic-dentistry",
    image: "/images/15279.jpg"
  },
  {
    id: "orthodontic-treatment",
    title: "Orthodontics",
    description: "Our braces are designed to straighten and align teeth, enhancing both the aesthetics and functionality of your smile.",
    slug: "orthodontic-treatment",
    image: "/images/54356.jpg"
  },
  {
    id: "dental-implants",
    title: "Dental Implants",
    description: "Dental implants are titanium posts that are surgically placed into the jawbone to replace missing tooth roots.",
    slug: "dental-implants",
    image: "/images/9350.jpg"
  },
  {
    id: "micro-endodontics",
    title: "Micro-Endodontics (Root Canal Treatment)",
    description: "Advanced retreatment techniques to preserve previously treated teeth and restore long-term oral health.",
    slug: "micro-endodontics",
    image: "/images/3124.jpg"
  },
  {
    id: "oral-surgery",
    title: "Oral Surgery",
    description: "A range of procedures designed to treat conditions that cannot always be addressed through routine dental treatment.",
    slug: "oral-surgery",
    image: "/images/Oral Surgery.jpg"
  },
  {
    id: "pediatric-dentistry",
    title: "Pediatric Dentistry",
    description: "Our goal is to ensure healthy teeth while building lifelong positive dental habits of Infants and teenagers.",
    slug: "pediatric-dentistry",
    image: "/images/2151686836.jpg"
  },
  {
    id: "gum-aesthetic-gum-care",
    title: "Gum & Aesthetic Gum Care",
    description: "Protect your oral health with expert gum care while enhancing the harmony of your smile.",
    slug: "gum-aesthetic-gum-care",
    image: "/images/74182.jpg"
  },
  {
    id: "additional-specialized-care",
    title: "Additional Specialized Care",
    description: "Safe and comfortable sedation options to ensure a relaxed, anxiety-free dental experience.",
    slug: "additional-specialized-care",
    image: "/images/182891.jpg"
  }
];

export const team: TeamMember[] = [
  {
    id: "dr-priti",
    name: "Dr. Priti Munde",
    role: "BDS, PGDMLS (Reg No: A-17135) | Certified Implantologist & Cosmetic Dental Surgeon",
    image: "/images/dr_priti_munde.png"
  },
  {
    id: "dr-neha-1",
    name: "Dr. Neha",
    role: "Orthodontist",
    image: "/images/dr_neha.png"
  },
  {
    id: "dr-neha-2",
    name: "Dr. Neha",
    role: "Pediatric Dentist",
    image: "/images/dr_neha.png"
  },
  {
    id: "dr-neha-3",
    name: "Dr. Neha",
    role: "Endodontist",
    image: "/images/dr_neha.png"
  },
  {
    id: "dr-neha-4",
    name: "Dr. Neha",
    role: "Periodontist",
    image: "/images/dr_neha.png"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Nayan Sonawane",
    rating: 5,
    text: "Its my first time at the clinic. DR. Priti was extremely patient and did a thorough cleaning and consultation.",
    image: "/images/testimonial_avatar.png"
  },
  {
    id: "t2",
    name: "Nayan Sonawane",
    rating: 5,
    text: "Its my first time at the clinic. DR. Priti was extremely patient and did a thorough cleaning and consultation.",
    image: "/images/testimonial_avatar.png"
  },
  {
    id: "t3",
    name: "Nayan Sonawane",
    rating: 5,
    text: "Its my first time at the clinic. DR. Priti was extremely patient and did a thorough cleaning and consultation.",
    image: "/images/testimonial_avatar.png"
  }
];

export const faqs = [
  {
    q: "What is the step-by-step process for getting dental implants at DDS Dentistry?",
    a: "First, a comprehensive consultation and 3D scan are performed to assess bone structure. Next, the implant post is surgically placed. After a healing period (osseointegration), an abutment and custom crown are attached."
  },
  {
    q: "How often should I visit the dentist?",
    a: "It is generally recommended to visit the dentist every six months for a routine checkup and professional cleaning to maintain optimal oral health."
  },
  {
    q: "What are my options for replacing missing teeth?",
    a: "Options include dental implants for a permanent solution, dental bridges to span the gap, or complete/partial dentures."
  },
  {
    q: "How can I book an appointment at DDS?",
    a: "You can easily book an appointment by clicking the 'Book an Appointment' button on our website, calling our clinic directly, or filling out the contact form."
  },
  {
    q: "Do you offer emergency dental services?",
    a: "Yes, we offer prompt emergency care for severe toothaches, dental trauma, knocked-out teeth, and other urgent dental issues."
  },
  {
    q: "Can Invisalign treat gaps and crowded teeth?",
    a: "Yes. Invisalign can treat many cases involving crowded teeth, gaps, overbite, underbite, crossbite, and open bite. Your orthodontist will determine whether it is suitable for your specific case."
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Is teeth whitening safe and effective? Here's what you need to know.",
    slug: "teeth-whitening-safe-effective",
    date: "09/05/2026",
    image: "/images/blog_1.png",
    excerpt: "Discover the truths, benefits, and safety guidelines about teeth whitening procedures to get the brighter smile you want without harming your teeth.",
    content: [
      "Teeth whitening is one of the most popular cosmetic dental procedures, offering a quick and noticeable way to enhance your smile. However, many patients ask: is it safe and effective? The short answer is yes, when done correctly under professional supervision.",
      "Professional teeth whitening treatments use peroxide-based bleaching agents that break down stains into smaller particles, making the color less concentrated and your teeth brighter. Unlike store-bought kits, dentist-supervised whitening is customized to fit your mouth, protecting your gums from irritation.",
      "While minor sensitivity is common immediately after the treatment, it is temporary and resolves within a few days. We recommend consulting with our specialists before any treatment to ensure your teeth are healthy enough for bleaching."
    ]
  },
  {
    id: "blog-2",
    title: "Braces vs. Clear Aligners: Which Orthodontic Option Fits You Best?",
    slug: "braces-vs-clear-aligners",
    date: "09/05/2026",
    image: "/images/blog_2.png",
    excerpt: "Compare traditional metal braces and clear aligners to see which orthodontic system fits your lifestyle, budget, and dental correction needs.",
    content: [
      "Straightening your teeth not only improves your appearance but also enhances function and prevents future dental issues. If you are considering orthodontic treatment, you are likely deciding between traditional braces and clear aligners.",
      "Braces are fixed metal or ceramic brackets connected by wires. They are highly effective for complex movements and do not require patient compliance to stay in place. However, they are visible and require dietary adjustments.",
      "Clear aligners are custom-made plastic trays that are virtually invisible. They can be removed for eating and cleaning, making oral hygiene much easier. However, they must be worn for at least 22 hours a day to be effective.",
      "The best choice depends on your specific dental alignment needs, lifestyle, and preferences. Schedule a consult with Dr. Neha to find the perfect plan for you."
    ]
  },
  {
    id: "blog-3",
    title: "How to Protect Your Child's Teeth and Prevent Cavities Early On?",
    slug: "protect-child-teeth-prevent-cavities",
    date: "09/05/2026",
    image: "/images/blog_3.png",
    excerpt: "Establish a lifetime of healthy smiles with these essential tips on pediatric dental care, early brushing habits, and preventative checkups.",
    content: [
      "Establishing healthy dental habits early in life is critical to preventing cavities and ensuring proper oral development. Cavities in baby teeth can affect the alignment and health of permanent teeth underneath.",
      "Brushing should begin as soon as the first tooth emerges, using a tiny smear of fluoride toothpaste. As children grow, they need supervision to ensure they brush for a full two minutes twice a day.",
      "Diet plays an equally important role. Limit sugary snacks and drinks, and encourage water after meals. Regular preventative visits to the dentist starting around their first birthday will help keep their smile bright and build positive associations with dental care."
    ]
  }
];

export const galleryImages = [
  { src: "/images/carousel_1.png", alt: "Dental Facility 1" },
  { src: "/images/carousel_2.png", alt: "Dental Facility 2" },
  { src: "/images/carousel_3.png", alt: "Dental Facility 3" },
  { src: "/images/carousel_4.png", alt: "Dental Facility 4" },
  { src: "/images/cosmetic_before_after_1.png", alt: "Before/After Case 1" },
  { src: "/images/cosmetic_before_after_2.png", alt: "Before/After Case 2" },
  { src: "/images/cosmetic_before_after_3.png", alt: "Before/After Case 3" }
];
