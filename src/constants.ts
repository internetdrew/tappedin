import {
  BarChart3,
  Briefcase,
  Building,
  Code,
  DollarSign,
  GraduationCap,
  LightbulbIcon,
  Palette,
  PenTool,
  Rocket,
  TrendingUp,
  UserCheck,
  Users,
  Zap,
} from "lucide-react";

export const toneOptions = [
  {
    label: "Professional",
    description: "Formal, authoritative tone for business content",
    icon: LightbulbIcon,
    value: "professional",
    color: "text-blue-600",
  },
  {
    label: "Conversational",
    description: "Friendly, approachable tone for engagement",
    icon: Users,
    value: "conversational",
    color: "text-green-600",
  },
  {
    label: "Energetic",
    description: "Enthusiastic, motivational tone",
    icon: Zap,
    value: "energetic",
    color: "text-orange-600",
  },
  {
    label: "Thoughtful",
    description: "Reflective, insightful tone for deeper content",
    icon: LightbulbIcon,
    value: "thoughtful",
    color: "text-purple-600",
  },
];

export const posterTypeOptions = [
  {
    id: "developer",
    name: "Developer",
    description: "Technical insights, coding tips, and dev experiences",
    icon: Code,
    color: "text-green-400",
  },
  {
    id: "founder",
    name: "Founder",
    description: "Startup journey, leadership, and business insights",
    icon: Rocket,
    color: "text-blue-400",
  },
  {
    id: "strategist",
    name: "Strategist",
    description: "Market analysis, planning, and strategic thinking",
    icon: TrendingUp,
    color: "text-purple-400",
  },
  {
    id: "designer",
    name: "Designer",
    description: "Design principles, creativity, and visual storytelling",
    icon: Palette,
    color: "text-pink-400",
  },
  {
    id: "marketer",
    name: "Marketer",
    description: "Growth tactics, campaigns, and audience insights",
    icon: BarChart3,
    color: "text-orange-400",
  },
  {
    id: "consultant",
    name: "Consultant",
    description: "Industry expertise, client stories, and professional advice",
    icon: UserCheck,
    color: "text-cyan-400",
  },
  {
    id: "creator",
    name: "Content Creator",
    description: "Creative process, storytelling, and audience building",
    icon: PenTool,
    color: "text-yellow-400",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Leadership insights, company vision, and industry trends",
    icon: Building,
    color: "text-indigo-400",
  },
];

export const audienceOptions = [
  {
    id: "developers",
    name: "Developers",
    description: "Software engineers, programmers, and tech professionals",
    icon: Code,
    color: "text-green-400",
  },
  {
    id: "entrepreneurs",
    name: "Entrepreneurs",
    description: "Startup founders, business owners, and innovators",
    icon: Building,
    color: "text-blue-400",
  },
  {
    id: "students",
    name: "Students",
    description: "University students, bootcamp learners, and career starters",
    icon: GraduationCap,
    color: "text-purple-400",
  },
  {
    id: "professionals",
    name: "Professionals",
    description: "Corporate employees, managers, and industry experts",
    icon: Briefcase,
    color: "text-orange-400",
  },
  {
    id: "creatives",
    name: "Creatives",
    description: "Designers, writers, artists, and creative professionals",
    icon: Palette,
    color: "text-pink-400",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Marketers, growth hackers, and marketing professionals",
    icon: BarChart3,
    color: "text-orange-400",
  },
  {
    id: "investors",
    name: "Investors",
    description:
      "Venture capitalists, angel investors, and private equity professionals",
    icon: DollarSign,
    color: "text-yellow-400",
  },
];
