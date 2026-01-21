import { Service } from "./types";

export const DHARSHANS: Service[] = [
  {
    id: "d1",
    name: "Suprabhatham",
    time: "05:00 AM - 05:30 AM (Seva entry only; general entry starts ~05:30 AM)",
    price: 500,
    kind: "dharshans",
    notes:
      "Early morning awakening ritual with Vedic hymns; exclusive entry for seva ticket holders. Includes special darshan benefits.",
  },
  {
    id: "d2",
    name: "Dakshina Queue / Special Entry (Seegra Darshan)",
    time: "Available during general darshan hours (e.g., after 05:30 AM morning slot, and post-break afternoon/evening)",
    price: 50,
    kind: "dharshans",
    notes:
      "Fast-track paid queue for quicker darshan. General/free darshan is also available (no fixed price, often longer wait).",
  },
  {
    id: "d3",
    name: "Srivari Donor Darshan",
    time: "During general darshan slots",
    price: 300,
    kind: "dharshans",
    notes: "Special donor entry; often includes perks like prasadam.",
  },
  // Add more if needed, e.g., higher special entries (~₹500 or more for some premium slots)
];

export const SEVAS: Service[] = [
  {
    id: "s1",
    name: "Vastralankara Seva",
    time: "Typically post-Abhishekam in morning (around 06:00 AM–07:00 AM or Fridays/special days)",
    price: 10000, // Your original; actual may vary (some sources show similar high-value alankara sevas, but confirm on site for exact)
    kind: "sevas",
    notes:
      "Adorning the deity with new clothes/jewels; often on specific days like Fridays. High-value seva similar to Tirumala tradition.",
  },
  {
    id: "s2",
    name: "Archana Seva",
    time: "During darshan hours (e.g., 09:00 AM onwards or any valid slot)",
    price: 100,
    kind: "sevas",
    notes:
      "Basic archana; entry not always included—combine with darshan ticket.",
  },
  {
    id: "s3",
    name: "Kumkuma Archana Seva",
    time: "Reporting 15 min before slot; during darshan hours",
    price: 300,
    kind: "sevas",
    notes: "Includes kumkuma, laddu prasadam.",
  },
  {
    id: "s4",
    name: "Sahasra Deepaalankarana Seva",
    time: "Evening/special (e.g., around lamp-lighting ritual)",
    price: 500,
    kind: "sevas",
    notes: "Thousand-lamp illumination seva.",
  },
  // Morning Abhishekam/Bhoopali is often part of early rituals (around 05:00–06:30 AM), but may not have separate public ticket price listed (included in some sevas or free for observers)
];
