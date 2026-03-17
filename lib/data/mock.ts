// Mock data for development - replace with Supabase queries in production

export const UPCOMING_EVENTS = [
  {
    id: "1",
    title: "Sri Rama Navami Celebrations",
    category: "Festival",
    date: "2026-04-06",
    time: "09:00",
    endTime: "20:00",
    description:
      "Celebrate the divine birth of Lord Rama with special poojas, cultural programs, and prasadam distribution. Join us for an entire day of devotion and celebration.",
    location: "Main Hall",
    capacity: 500,
    registered: 342,
    fee: 0,
    sponsorshipAvailable: true,
    image: "/images/rama-navami.jpg",
    tags: ["Festival", "Pooja", "Cultural"],
  },
  {
    id: "2",
    title: "Hanuman Jayanti – Special Archana",
    category: "Pooja",
    date: "2026-04-12",
    time: "08:00",
    endTime: "13:00",
    description:
      "Special Hanuman Sahasranama Archana and Sundara Kanda Parayana on the occasion of Hanuman Jayanti.",
    location: "Main Sanctum",
    capacity: 200,
    registered: 89,
    fee: 21,
    sponsorshipAvailable: true,
    image: "/images/hanuman-jayanti.jpg",
    tags: ["Pooja", "Festival"],
  },
  {
    id: "3",
    title: "Bhagavad Gita Study Circle",
    category: "Cultural",
    date: "2026-03-22",
    time: "10:00",
    endTime: "12:00",
    description:
      "Weekly study circle exploring the wisdom of the Bhagavad Gita. All chapters covered over a 6-month program. Open to all devotees.",
    location: "Community Room",
    capacity: 50,
    registered: 28,
    fee: 0,
    sponsorshipAvailable: false,
    image: "/images/gita-study.jpg",
    tags: ["Cultural", "Educational"],
  },
  {
    id: "4",
    title: "Ugadi – Telugu New Year",
    category: "Festival",
    date: "2026-03-29",
    time: "08:00",
    endTime: "21:00",
    description:
      "Welcome the Telugu New Year with special poojas, Panchanga Sravanam (reading of the new almanac), cultural programs and traditional prasadam.",
    location: "Main Hall",
    capacity: 600,
    registered: 410,
    fee: 0,
    sponsorshipAvailable: true,
    image: "/images/ugadi.jpg",
    tags: ["Festival", "Cultural"],
  },
  {
    id: "5",
    title: "Satyanarayana Vratha Pooja",
    category: "Pooja",
    date: "2026-04-05",
    time: "10:00",
    endTime: "13:00",
    description:
      "Monthly Satyanarayana Vratha Pooja. Devotees may sponsor this pooja for blessings for their family.",
    location: "Pooja Hall",
    capacity: 100,
    registered: 45,
    fee: 51,
    sponsorshipAvailable: true,
    image: "/images/satyanarayana.jpg",
    tags: ["Pooja"],
  },
  {
    id: "6",
    title: "Yoga & Meditation Session",
    category: "Community Service",
    date: "2026-03-21",
    time: "07:00",
    endTime: "09:00",
    description:
      "Free yoga and meditation session for the community. Conducted by certified instructors in the temple courtyard.",
    location: "Courtyard",
    capacity: 80,
    registered: 52,
    fee: 0,
    sponsorshipAvailable: false,
    image: "/images/yoga.jpg",
    tags: ["Community Service", "Wellness"],
  },
]

export const SERVICES = [
  {
    id: "archana",
    title: "Archana",
    description:
      "Personal flower offering to the deity with recitation of 108 names. Available for all presiding deities.",
    duration: "15–20 min",
    suggestedDonation: 21,
    availability: "Daily 8AM – 8PM",
    image: "/images/archana.jpg",
  },
  {
    id: "abhishekam",
    title: "Abhishekam",
    description:
      "Sacred bath ceremony for the deity with milk, curd, honey, and other sacred substances accompanied by Vedic chanting.",
    duration: "45–60 min",
    suggestedDonation: 108,
    availability: "Daily 7AM – 12PM",
    image: "/images/abhishekam.jpg",
  },
  {
    id: "homam",
    title: "Homam (Havan)",
    description:
      "Sacred fire ritual conducted for specific blessings — health, prosperity, marriage, children. Includes special archana and prasadam.",
    duration: "2–3 hours",
    suggestedDonation: 501,
    availability: "Weekends & Special Days",
    image: "/images/homam.jpg",
  },
  {
    id: "wedding",
    title: "Hindu Wedding Ceremony",
    description:
      "Complete Vedic wedding ceremony officiated by our priests. Includes pre-booking consultation, muhurtha selection, and all rituals.",
    duration: "3–4 hours",
    suggestedDonation: 1001,
    availability: "By Appointment",
    image: "/images/wedding.jpg",
  },
  {
    id: "gruhapravesam",
    title: "Gruhapravesam (Home Blessing)",
    description:
      "Vedic housewarming ceremony to bless your new home. Conducted at your residence or temple.",
    duration: "2–3 hours",
    suggestedDonation: 351,
    availability: "By Appointment",
    image: "/images/gruhapravesam.jpg",
  },
  {
    id: "epuja",
    title: "E-Puja (Virtual Archana)",
    description:
      "Can't visit the temple? Book an E-Puja — our priests perform archana on your behalf and send you a video recording and prasadam by mail.",
    duration: "Online",
    suggestedDonation: 51,
    availability: "Daily",
    image: "/images/epuja.jpg",
  },
]

export const DONATION_CAMPAIGNS = [
  {
    id: "new-building",
    title: "New Temple Building Fund",
    description:
      "Help us build a permanent, larger temple to serve our growing community. We have secured the land and received architectural plans.",
    goal: 2000000,
    raised: 1247830,
    category: "Infrastructure",
    urgent: true,
  },
  {
    id: "facility",
    title: "Facility Maintenance Fund",
    description:
      "Contribute to the ongoing maintenance, utilities, and operations of our temple facilities.",
    goal: 150000,
    raised: 98450,
    category: "Operations",
    urgent: false,
  },
  {
    id: "food-service",
    title: "Prasadam & Food Service",
    description:
      "Support our weekly free meal (Annadanam) program that feeds hundreds of devotees every Sunday.",
    goal: 50000,
    raised: 31200,
    category: "Community",
    urgent: false,
  },
  {
    id: "education",
    title: "Youth Education & Cultural Programs",
    description:
      "Fund Sanskrit classes, classical dance, music programs, and cultural camps for our youth.",
    goal: 75000,
    raised: 42100,
    category: "Education",
    urgent: false,
  },
]

export const MEMBERSHIP_TIERS = [
  {
    id: "basic",
    name: "Devotee Member",
    price: 108,
    period: "year",
    benefits: [
      "Priority event registration",
      "Monthly newsletter",
      "10% discount on sponsored poojas",
      "Member directory access",
    ],
  },
  {
    id: "silver",
    name: "Silver Patron",
    price: 501,
    period: "year",
    benefits: [
      "All Devotee Member benefits",
      "Reserved seating at major festivals",
      "Free monthly archana",
      "Name in annual sponsor booklet",
      "Invite to exclusive member events",
    ],
    featured: true,
  },
  {
    id: "gold",
    name: "Gold Patron",
    price: 1001,
    period: "year",
    benefits: [
      "All Silver Patron benefits",
      "Free abhishekam quarterly",
      "Complimentary E-Puja annually",
      "Personal priest consultation",
      "VIP event access",
      "Recognition plaque in temple",
    ],
  },
]

export const DEITIES = [
  {
    name: "Sri Venkateswara (Balaji)",
    title: "The Presiding Deity",
    description:
      "Lord Venkateswara, also known as Balaji or Tirupati Balaji, is a form of Vishnu. He is the presiding deity of our temple, revered as the Lord of Seven Hills.",
    image: "/images/venkateswara.jpg",
  },
  {
    name: "Sri Lakshmi Devi",
    title: "Goddess of Prosperity",
    description:
      "Sri Lakshmi, the consort of Lord Vishnu, is the goddess of wealth, prosperity, and auspiciousness. She blesses devotees with material and spiritual abundance.",
    image: "/images/lakshmi.jpg",
  },
  {
    name: "Sri Andal (Bhudevi)",
    title: "The Divine Consort",
    description:
      "Sri Andal is worshipped alongside Lord Venkateswara as Bhudevi, the Earth goddess and divine consort. She represents devotion and surrender to the Lord.",
    image: "/images/andal.jpg",
  },
]

export const VOLUNTEER_GROUPS = [
  { id: "kitchen", name: "Kitchen & Prasadam", icon: "ChefHat", color: "orange" },
  { id: "pooja-prep", name: "Pooja Preparation", icon: "Flower2", color: "purple" },
  { id: "priest-assist", name: "Priest Assistance", icon: "BookOpen", color: "blue" },
  { id: "prasadam-stock", name: "Prasadam Stock Mgmt", icon: "Package", color: "green" },
  { id: "events", name: "Events & Hospitality", icon: "Users", color: "yellow" },
  { id: "it", name: "IT & Media", icon: "Monitor", color: "gray" },
]

export const FAQ_DATA = [
  {
    question: "What are the temple hours?",
    answer:
      "The temple is open Monday–Friday 8 AM to 12 PM and 6 PM to 8:30 PM. On weekends and holidays, we are open 8 AM to 8:30 PM.",
  },
  {
    question: "How do I book a pooja or service?",
    answer:
      "Visit our Services & Bookings page, choose the service, select your preferred date and time, fill in the details and make the suggested donation payment. You will receive a confirmation email with a QR code.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes, we have a parking lot with approximately 150 spaces. During major festivals, overflow parking is available at the neighboring community center.",
  },
  {
    question: "How do I volunteer?",
    answer:
      "Create an account, then visit the Volunteer Portal to express your interest. Our volunteer coordinator will assign you to a group based on your availability and skills.",
  },
  {
    question: "Are donations tax-deductible?",
    answer:
      "Yes! LV Temple is a registered 501(c)(3) non-profit organization. All donations are tax-deductible to the extent permitted by law. You will receive an official tax receipt via email.",
  },
  {
    question: "Can I watch temple live streams?",
    answer:
      "Yes! We stream all major festivals on our YouTube channel. You can also find the live stream link on our Community & Media page.",
  },
  {
    question: "How do I cancel or reschedule a booking?",
    answer:
      "Log into your account, go to My Bookings, and select the booking you wish to modify. Cancellations made 48+ hours in advance are fully refunded. Contact us at info@lvtemple.org for assistance.",
  },
  {
    question: "Do you offer E-Puja for devotees outside Redmond?",
    answer:
      "Absolutely! Book an E-Puja on our Services page. Our priests will conduct the archana on your behalf and send you a video recording along with prasadam by mail.",
  },
]
