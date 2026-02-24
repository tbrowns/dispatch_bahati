import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDxKJrNT1LC91VsLsWoWwthvpEGXMxEn4Q",
  authDomain: "bahati-ab97e.firebaseapp.com",
  projectId: "bahati-ab97e",
  storageBucket: "bahati-ab97e.firebasestorage.app",
  messagingSenderId: "219837231308",
  appId: "1:219837231308:web:c6fbb90d5bf67d8bacd269",
  measurementId: "G-MXGCCS9BTH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Content document reference
export const contentRef = doc(db, "website", "content");

// Default content
export const defaultContent = {
  hero: {
    tagline: "With you Every mile of the way",
    title: "Grow Your Trucking Business. We'll handle the logistics.",
    description:
      "We are a full-service Truck Dispatching company dedicated to helping owner-operators and fleets maximize revenue, reduce downtime, and stay compliant.",
    ctaText: "Start Dispatching Now",
  },
  trustBar: {
    items: [
      {
        title: "Experienced Dispatchers",
        description: "Professional team with years of industry expertise",
      },
      {
        title: "Nationwide Load Coverage",
        description: "Access to freight opportunities across all 48 states",
      },
      {
        title: "Dedicated Dispatcher",
        description: "Personal dispatcher assigned to your account",
      },
      {
        title: "Transparent Pricing",
        description: "No hidden fees, clear commission structure",
      },
    ],
  },
  howItWorks: {
    title: "How It Works",
    steps: [
      {
        number: "01",
        title: "Tell Us About Your Truck",
        description:
          "We learn your equipment type, lanes, rate goals, and schedule.",
      },
      {
        number: "02",
        title: "We Find & Negotiate Loads",
        description:
          "We book high-paying freight and negotiate top market rates.",
      },
      {
        number: "03",
        title: "You Drive. We Manage the Rest.",
        description:
          "From dispatch to delivery, we handle communication and paperwork.",
      },
    ],
  },
  services: {
    title: "Our Services",
    subtitle: "What We Offer",
    description:
      "We keep your trucks moving with high-paying loads and smart routing dispatch support.",
    items: [
      {
        title: "Load & Dispatch Management",
        features: [
          "Load sourcing and booking from load boards",
          "Rate Negotiation for best freight rates",
          "Dispatch coordination & scheduling",
          "Efficient route planning",
        ],
      },
      {
        title: "Broker & Shipper Communication",
        features: [
          "Handling all calls, emails, follow-ups",
          "Load confirmations and updates",
          "Managing check calls",
          "Issue resolution during transit",
        ],
      },
      {
        title: "Billing & Documentation",
        features: [
          "Rate confirmation review",
          "Paperwork management (BOLs, PODs)",
          "Invoice submission",
          "Payment follow-ups",
        ],
      },
      {
        title: "Compliance & Administrative",
        features: [
          "MC/DOT compliance assistance",
          "Carrier packets setup",
          "Highway and RMIS maintenance",
          "Safety management support",
        ],
      },
      {
        title: "Fleet & Performance Support",
        features: [
          "Daily/Weekly/Monthly reports",
          "Deadhead reduction strategies",
          "Performance analytics",
          "Business insights",
        ],
      },
      {
        title: "Value-Added Services",
        features: [
          "24/7 dispatch support",
          "Market rate Analysis",
          "Multilingual dispatcher support",
          "Dedicated account manager",
        ],
      },
    ],
  },
  whyChooseUs: {
    title: "We're more than just dispatchers—we're dedicated partners",
    subtitle: "Why Choose Us",
    description:
      "Committed to your success with a focus on high-paying loads, seamless communication, and personalized support. We help truckers drive smarter, reduce downtime, and grow their business with confidence.",
    features: [
      {
        title: "No forced dispatch",
        description: "You have full control and approve every load we book.",
      },
      {
        title: "Transparent pricing",
        description: "Clear commission rates with no hidden fees or surprises.",
      },
      {
        title: "Experienced dispatch professionals",
        description:
          "Our team knows the industry and negotiates the best rates.",
      },
      {
        title: "Personalized support for every truck",
        description: "Dedicated attention to your specific needs and goals.",
      },
    ],
  },
  whoWeServe: {
    title: "Who We Serve",
    subtitle: "Our Clients",
    description:
      "We provide tailored dispatching solutions for various types of trucking businesses.",
    clients: [
      {
        title: "Owner-Operators",
        description:
          "Independent drivers looking to maximize their earnings without the hassle of finding loads and managing paperwork.",
        benefits: [
          "Higher revenue per mile",
          "Less time on load boards",
          "More time driving",
        ],
      },
      {
        title: "Small & Mid-Size Fleets",
        description:
          "Fleet owners who need professional dispatch support to keep their trucks moving and operations running smoothly.",
        benefits: [
          "Fleet optimization",
          "Reduced deadhead",
          "Streamlined operations",
        ],
      },
      {
        title: "New Authority Carriers",
        description:
          "New trucking businesses that need guidance with compliance, setup, and building relationships with brokers.",
        benefits: [
          "Setup assistance",
          "Compliance support",
          "Broker relationships",
        ],
      },
    ],
  },
  reviews: {
    title: "What Our Clients Say",
    subtitle: "Testimonials",
    items: [
      {
        text: "Since working with this dispatch team, my weekly revenue increased and I stopped chasing brokers. They handle everything professionally.",
        author: "James M.",
        role: "Owner-Operator",
        rating: 5,
      },
      {
        text: "Professional, reliable, and always fighting for better rates. My fleet has never been more profitable since partnering with Bahati.",
        author: "Sarah K.",
        role: "Fleet Owner",
        rating: 5,
      },
      {
        text: "As a new authority, I was lost. Bahati helped me with setup, compliance, and getting my first loads. Couldn't have done it without them.",
        author: "Michael T.",
        role: "New Authority Carrier",
        rating: 5,
      },
      {
        text: "The 24/7 support is a game changer. No matter what time I call, someone is there to help. That's the kind of service every trucker needs.",
        author: "David R.",
        role: "Owner-Operator",
        rating: 5,
      },
    ],
  },
  faq: {
    title: "Frequently Asked Questions",
    subtitle: "Got Questions?",
    items: [
      {
        question: "Do you force dispatch?",
        answer:
          "No. You approve every load. We present you with the best options based on your preferences, and you have the final say on every dispatch.",
      },
      {
        question: "Do you work with new authorities?",
        answer:
          "Yes. We help with setup and compliance. Our team guides new carriers through the process of establishing broker relationships and building their business.",
      },
      {
        question: "What equipment types do you dispatch?",
        answer:
          "We dispatch Dry Van, Reefer, Flatbed, and Power Only. Our team has experience with all major equipment types and knows the best lanes for each.",
      },
      {
        question: "What are your dispatch rates?",
        answer:
          "Our rates are competitive and transparent, typically ranging from 5-8% depending on fleet size and services needed. We have no hidden fees.",
      },
      {
        question: "How quickly can you get me loads?",
        answer:
          "Once onboarded, we can start dispatching within 24 hours. Our extensive broker network means we can keep your trucks moving consistently.",
      },
      {
        question: "What areas do you cover?",
        answer:
          "We provide nationwide coverage across all 48 contiguous states. Whether you prefer regional, OTR, or dedicated lanes, we have options for you.",
      },
    ],
  },
  cta: {
    title: "Ready to Keep Your Truck Moving?",
    subtitle: "Ready to Get Started?",
    description:
      "Request a Free Dispatch Consultation and start dispatching within 24 hours. Our team is ready to help you maximize your earnings.",
    primaryCta: "Start Dispatching in 24 Hours",
    secondaryCta: "Call Us Today",
  },
  contact: {
    phone: "+1 (555) 123-4567",
    email: "info@bahatidispatch.com",
    address: "123 Logistics Way, Suite 100, Dallas, TX 75201",
    hours: "24/7 Support",
  },
  footer: {
    description:
      "With a driver-first mindset and reliable communication, we act as an extension of your business—working to reduce downtime, increase revenue, and build long-term partnerships based on trust and results.",
  },
  blog: {
    title: "Blog & Resources",
    subtitle: "Industry Insights & Tips",
    description:
      "Stay updated with the latest in trucking, dispatching best practices, and industry trends.",
    items: [
      {
        id: "1",
        title: "Top 5 Tips to Maximize Your Trucking Revenue",
        excerpt:
          "Learn proven strategies to increase your earnings and reduce downtime.",
        content:
          "Maximizing your trucking revenue requires a combination of smart dispatch decisions, efficient route planning, and effective time management...",
        author: "Bahati Team",
        date: "February 20, 2026",
        category: "Tips",
        image: "/images/blog-1.jpg",
        comments: [],
      },
      {
        id: "2",
        title: "Understanding DOT Compliance: A Complete Guide",
        excerpt:
          "Essential compliance information every trucker needs to know.",
        content:
          "DOT compliance is critical for all trucking operations. This guide covers the essential requirements, deadlines, and best practices...",
        author: "Bahati Team",
        date: "February 15, 2026",
        category: "Compliance",
        image: "/images/blog-2.jpg",
        comments: [],
      },
      {
        id: "3",
        title: "How to Choose the Right Dispatch Service",
        excerpt:
          "What to look for when selecting a dispatch company for your fleet.",
        content:
          "Choosing the right dispatch service can significantly impact your business. Here are the key factors to consider...",
        author: "Bahati Team",
        date: "February 10, 2026",
        category: "Business",
        image: "/images/blog-3.jpg",
        comments: [],
      },
    ],
  },
};

// Fetch content from Firestore
export const fetchContent = async () => {
  try {
    const docSnap = await getDoc(contentRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    // // Initialize with default content if document doesn't exist
    // await setDoc(contentRef, defaultContent);
    // return defaultContent;
  } catch (error) {
    console.error("Error fetching content:", error);
    return defaultContent;
  }
};

// Save content to Firestore
export const saveContent = async (content: any) => {
  try {
    await setDoc(contentRef, content);
    return true;
  } catch (error) {
    console.error("Error saving content:", error);
    return false;
  }
};

// Subscribe to content changes
export const subscribeToContent = (callback: (content: any) => void) => {
  return onSnapshot(contentRef, (doc) => {
    if (doc.exists()) {
      callback(doc.data());
    } else {
      callback(defaultContent);
    }
  });
};

// Add comment to blog post
export const addCommentToBlog = async (
  blogPostId: string,
  comment: {
    name: string;
    email: string;
    rating: number;
    text: string;
    timestamp: number;
  },
) => {
  try {
    const content = await getDoc(contentRef);
    if (content.exists()) {
      const data = content.data();
      const blogItems = data.blog.items;
      const postIndex = blogItems.findIndex(
        (post: any) => post.id === blogPostId,
      );

      if (postIndex !== -1) {
        blogItems[postIndex].comments = blogItems[postIndex].comments || [];
        blogItems[postIndex].comments.push(comment);

        await updateDoc(contentRef, {
          "blog.items": blogItems,
        });
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error("Error adding comment:", error);
    return false;
  }
};

// Upload blog image to Firebase Storage and return the gs:// path (and download URL)
export const uploadBlogImage = async (
  file: File,
  blogPostId: string,
  onProgress?: (progressPercent: number) => void,
) => {
  try {
    const filename = `${Date.now()}_${file.name}`;
    const path = `blog/${blogPostId}/${filename}`;
    const storageReference = storageRef(storage, path);

    const uploadTask = uploadBytesResumable(storageReference, file as any);

    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          if (onProgress) {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            onProgress(Math.round(progress));
          }
        },
        (error) => reject(error),
        () => resolve(),
      );
    });

    const downloadURL = await getDownloadURL(storageReference);
    const gsPath = `gs://${firebaseConfig.storageBucket}/${path}`;

    return { gsPath, downloadURL };
  } catch (error) {
    console.error("Error uploading blog image:", error);
    return null;
  }
};
