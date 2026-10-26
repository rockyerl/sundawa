"use client";

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/src/i18n/navigation'
import { useTranslations } from 'next-intl'
import LangToggle from '@/src/shared/ui/LangToggle'
import {
    formatFullPrice,
    formatMillions,
    getSellPrice,
    LEVEL_ORDER,
    type CartItem,
    type City,
    type Level,
    type Mode,
    type TalentEntry,
} from '../domain'
import TalentSelector from './TalentSelector'
import EstimateCart from './EstimateCart'
import InfoStrip from './InfoStrip'
import ContactCta from './ContactCta'

// ─── Pricing Data ─────────────────────────────────────────────────────────────

const PRICING: Record<City, TalentEntry[]> = {
    bandung: [
        // Software Development
        { cat:'Software Development', pos:'Frontend Developer',         level:'Junior', hybridMin:5000000,  hybridMax:8000000,  remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:6000000,  hybridSell25:6000000,  onsiteSell20:7000000,  onsiteSell25:7500000  },
        { cat:'Software Development', pos:'Frontend Developer',         level:'Mid',    hybridMin:8000000,  hybridMax:13000000, remoteSell20:8500000,  remoteSell25:9000000,  hybridSell20:9500000,  hybridSell25:10000000, onsiteSell20:11500000, onsiteSell25:12000000 },
        { cat:'Software Development', pos:'Frontend Developer',         level:'Senior', hybridMin:13000000, hybridMax:22000000, remoteSell20:14000000, remoteSell25:14500000, hybridSell20:15500000, hybridSell25:16000000, onsiteSell20:18500000, onsiteSell25:19500000 },
        { cat:'Software Development', pos:'Backend Developer',          level:'Junior', hybridMin:5500000,  hybridMax:9000000,  remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:6500000,  hybridSell25:7000000,  onsiteSell20:8000000,  onsiteSell25:8000000  },
        { cat:'Software Development', pos:'Backend Developer',          level:'Mid',    hybridMin:9000000,  hybridMax:15000000, remoteSell20:9500000,  remoteSell25:10000000, hybridSell20:11000000, hybridSell25:11000000, onsiteSell20:12500000, onsiteSell25:13000000 },
        { cat:'Software Development', pos:'Backend Developer',          level:'Senior', hybridMin:15000000, hybridMax:25000000, remoteSell20:15500000, remoteSell25:16000000, hybridSell20:18000000, hybridSell25:19000000, onsiteSell20:21000000, onsiteSell25:22000000 },
        { cat:'Software Development', pos:'Fullstack Developer',        level:'Junior', hybridMin:6000000,  hybridMax:10000000, remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:7000000,  hybridSell25:7500000,  onsiteSell20:8500000,  onsiteSell25:9000000  },
        { cat:'Software Development', pos:'Fullstack Developer',        level:'Mid',    hybridMin:10000000, hybridMax:17000000, remoteSell20:10000000, remoteSell25:10500000, hybridSell20:12000000, hybridSell25:12500000, onsiteSell20:14500000, onsiteSell25:15000000 },
        { cat:'Software Development', pos:'Fullstack Developer',        level:'Senior', hybridMin:17000000, hybridMax:28000000, remoteSell20:18000000, remoteSell25:19000000, hybridSell20:20500000, hybridSell25:21000000, onsiteSell20:24000000, onsiteSell25:25000000 },
        { cat:'Software Development', pos:'Mobile Developer (Android/iOS)', level:'Junior', hybridMin:6000000,  hybridMax:10000000, remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:7000000,  hybridSell25:7500000,  onsiteSell20:8500000,  onsiteSell25:9000000  },
        { cat:'Software Development', pos:'Mobile Developer (Android/iOS)', level:'Mid',    hybridMin:10000000, hybridMax:17000000, remoteSell20:10000000, remoteSell25:10500000, hybridSell20:12000000, hybridSell25:12500000, onsiteSell20:14500000, onsiteSell25:15000000 },
        { cat:'Software Development', pos:'Mobile Developer (Android/iOS)', level:'Senior', hybridMin:17000000, hybridMax:28000000, remoteSell20:18000000, remoteSell25:19000000, hybridSell20:20500000, hybridSell25:21000000, onsiteSell20:24000000, onsiteSell25:25000000 },
        // Infrastructure & Cloud
        { cat:'Infrastructure & Cloud', pos:'System Administrator', level:'Junior', hybridMin:5000000,  hybridMax:8000000,  remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:6000000,  hybridSell25:6000000,  onsiteSell20:7000000,  onsiteSell25:7500000  },
        { cat:'Infrastructure & Cloud', pos:'System Administrator', level:'Mid',    hybridMin:8000000,  hybridMax:13000000, remoteSell20:8500000,  remoteSell25:9000000,  hybridSell20:9500000,  hybridSell25:10000000, onsiteSell20:11500000, onsiteSell25:12000000 },
        { cat:'Infrastructure & Cloud', pos:'System Administrator', level:'Senior', hybridMin:13000000, hybridMax:20000000, remoteSell20:14000000, remoteSell25:14500000, hybridSell20:15500000, hybridSell25:16000000, onsiteSell20:18500000, onsiteSell25:19500000 },
        { cat:'Infrastructure & Cloud', pos:'DevOps / SRE',         level:'Junior', hybridMin:6000000,  hybridMax:10000000, remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:7000000,  hybridSell25:7500000,  onsiteSell20:8500000,  onsiteSell25:9000000  },
        { cat:'Infrastructure & Cloud', pos:'DevOps / SRE',         level:'Mid',    hybridMin:10000000, hybridMax:18000000, remoteSell20:10000000, remoteSell25:10500000, hybridSell20:12000000, hybridSell25:12500000, onsiteSell20:14500000, onsiteSell25:15000000 },
        { cat:'Infrastructure & Cloud', pos:'DevOps / SRE',         level:'Senior', hybridMin:18000000, hybridMax:32000000, remoteSell20:18500000, remoteSell25:19500000, hybridSell20:21500000, hybridSell25:22500000, onsiteSell20:25000000, onsiteSell25:26000000 },
        { cat:'Infrastructure & Cloud', pos:'Cloud Engineer',       level:'Junior', hybridMin:6500000,  hybridMax:11000000, remoteSell20:6500000,  remoteSell25:7000000,  hybridSell20:8000000,  hybridSell25:8000000,  onsiteSell20:9000000,  onsiteSell25:9500000  },
        { cat:'Infrastructure & Cloud', pos:'Cloud Engineer',       level:'Mid',    hybridMin:11000000, hybridMax:20000000, remoteSell20:11500000, remoteSell25:12000000, hybridSell20:13000000, hybridSell25:14000000, onsiteSell20:15500000, onsiteSell25:16000000 },
        { cat:'Infrastructure & Cloud', pos:'Cloud Engineer',       level:'Senior', hybridMin:20000000, hybridMax:35000000, remoteSell20:21000000, remoteSell25:22000000, hybridSell20:24000000, hybridSell25:25000000, onsiteSell20:28000000, onsiteSell25:29500000 },
        { cat:'Infrastructure & Cloud', pos:'Network Engineer',     level:'Junior', hybridMin:5000000,  hybridMax:8500000,  remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:6000000,  hybridSell25:6000000,  onsiteSell20:7000000,  onsiteSell25:7500000  },
        { cat:'Infrastructure & Cloud', pos:'Network Engineer',     level:'Mid',    hybridMin:8500000,  hybridMax:15000000, remoteSell20:9000000,  remoteSell25:9500000,  hybridSell20:10000000, hybridSell25:10500000, onsiteSell20:12000000, onsiteSell25:12500000 },
        { cat:'Infrastructure & Cloud', pos:'Network Engineer',     level:'Senior', hybridMin:15000000, hybridMax:25000000, remoteSell20:15500000, remoteSell25:16000000, hybridSell20:18000000, hybridSell25:19000000, onsiteSell20:21000000, onsiteSell25:22000000 },
        // Data & Analytics
        { cat:'Data & Analytics', pos:'Data Analyst',    level:'Junior', hybridMin:5000000,  hybridMax:8500000,  remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:6000000,  hybridSell25:6000000,  onsiteSell20:7000000,  onsiteSell25:7500000  },
        { cat:'Data & Analytics', pos:'Data Analyst',    level:'Mid',    hybridMin:8500000,  hybridMax:15000000, remoteSell20:10000000, remoteSell25:10500000, hybridSell20:12000000, hybridSell25:12500000, onsiteSell20:14500000, onsiteSell25:15000000 },
        { cat:'Data & Analytics', pos:'Data Analyst',    level:'Senior', hybridMin:15000000, hybridMax:26000000, remoteSell20:18500000, remoteSell25:19500000, hybridSell20:21500000, hybridSell25:22500000, onsiteSell20:25000000, onsiteSell25:26000000 },
        { cat:'Data & Analytics', pos:'Data Engineer',   level:'Mid',    hybridMin:11000000, hybridMax:20000000, remoteSell20:13000000, remoteSell25:14000000, hybridSell20:15500000, hybridSell25:16000000, onsiteSell20:18500000, onsiteSell25:19500000 },
        { cat:'Data & Analytics', pos:'Data Engineer',   level:'Senior', hybridMin:20000000, hybridMax:35000000, remoteSell20:24000000, remoteSell25:25000000, hybridSell20:28000000, hybridSell25:29500000, onsiteSell20:33500000, onsiteSell25:35000000 },
        { cat:'Data & Analytics', pos:'Data Scientist',  level:'Mid',    hybridMin:13000000, hybridMax:24000000, remoteSell20:15500000, remoteSell25:16500000, hybridSell20:18500000, hybridSell25:19500000, onsiteSell20:22000000, onsiteSell25:23000000 },
        { cat:'Data & Analytics', pos:'Data Scientist',  level:'Senior', hybridMin:24000000, hybridMax:42000000, remoteSell20:29000000, remoteSell25:30000000, hybridSell20:33500000, hybridSell25:35000000, onsiteSell20:40000000, onsiteSell25:41500000 },
        { cat:'Data & Analytics', pos:'ML / AI Engineer',level:'Mid',    hybridMin:17000000, hybridMax:30000000, remoteSell20:20000000, remoteSell25:21000000, hybridSell20:23500000, hybridSell25:24500000, onsiteSell20:28000000, onsiteSell25:29500000 },
        { cat:'Data & Analytics', pos:'ML / AI Engineer',level:'Senior', hybridMin:30000000, hybridMax:52000000, remoteSell20:36000000, remoteSell25:37500000, hybridSell20:42000000, hybridSell25:44000000, onsiteSell20:50000000, onsiteSell25:52000000 },
        // QA & Testing
        { cat:'QA & Testing', pos:'QA Engineer (Manual)',     level:'Junior', hybridMin:5000000,  hybridMax:7500000,  remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:6000000,  hybridSell25:6000000,  onsiteSell20:7000000,  onsiteSell25:7500000  },
        { cat:'QA & Testing', pos:'QA Engineer (Manual)',     level:'Mid',    hybridMin:7500000,  hybridMax:13000000, remoteSell20:9000000,  remoteSell25:9500000,  hybridSell20:10500000, hybridSell25:11000000, onsiteSell20:12500000, onsiteSell25:13000000 },
        { cat:'QA & Testing', pos:'QA Engineer (Manual)',     level:'Senior', hybridMin:13000000, hybridMax:22000000, remoteSell20:15500000, remoteSell25:16000000, hybridSell20:18000000, hybridSell25:19000000, onsiteSell20:21000000, onsiteSell25:22000000 },
        { cat:'QA & Testing', pos:'QA Engineer (Automation)', level:'Mid',    hybridMin:10000000, hybridMax:17000000, remoteSell20:12000000, remoteSell25:12500000, hybridSell20:14000000, hybridSell25:14500000, onsiteSell20:16500000, onsiteSell25:17500000 },
        { cat:'QA & Testing', pos:'QA Engineer (Automation)', level:'Senior', hybridMin:17000000, hybridMax:29000000, remoteSell20:20500000, remoteSell25:21500000, hybridSell20:24000000, hybridSell25:25000000, onsiteSell20:28000000, onsiteSell25:29500000 },
        // Cybersecurity
        { cat:'Cybersecurity', pos:'Penetration Tester', level:'Junior', hybridMin:8000000,  hybridMax:15000000, remoteSell20:9500000,  remoteSell25:10000000, hybridSell20:11000000, hybridSell25:11500000, onsiteSell20:13000000, onsiteSell25:13500000 },
        { cat:'Cybersecurity', pos:'Penetration Tester', level:'Mid',    hybridMin:15000000, hybridMax:26000000, remoteSell20:18000000, remoteSell25:19000000, hybridSell20:21000000, hybridSell25:22000000, onsiteSell20:25000000, onsiteSell25:26000000 },
        { cat:'Cybersecurity', pos:'Penetration Tester', level:'Senior', hybridMin:24000000, hybridMax:42000000, remoteSell20:25000000, remoteSell25:26000000, hybridSell20:29000000, hybridSell25:30000000, onsiteSell20:34000000, onsiteSell25:35500000 },
        { cat:'Cybersecurity', pos:'Security Engineer',  level:'Mid',    hybridMin:16000000, hybridMax:28000000, remoteSell20:17000000, remoteSell25:17500000, hybridSell20:19000000, hybridSell25:20000000, onsiteSell20:23000000, onsiteSell25:24000000 },
        { cat:'Cybersecurity', pos:'Security Engineer',  level:'Senior', hybridMin:28000000, hybridMax:48000000, remoteSell20:29500000, remoteSell25:30500000, hybridSell20:33500000, hybridSell25:35000000, onsiteSell20:39500000, onsiteSell25:41000000 },
        // IT Management & Consulting
        { cat:'IT Management & Consulting', pos:'IT Project Manager', level:'Mid',    hybridMin:14000000, hybridMax:25000000, remoteSell20:14500000, remoteSell25:15000000, hybridSell20:17000000, hybridSell25:17500000, onsiteSell20:20000000, onsiteSell25:20500000 },
        { cat:'IT Management & Consulting', pos:'IT Project Manager', level:'Senior', hybridMin:25000000, hybridMax:42000000, remoteSell20:26500000, remoteSell25:27500000, hybridSell20:30000000, hybridSell25:31000000, onsiteSell20:35500000, onsiteSell25:37000000 },
        { cat:'IT Management & Consulting', pos:'Scrum Master',       level:'Mid',    hybridMin:12000000, hybridMax:20000000, remoteSell20:12500000, remoteSell25:13000000, hybridSell20:14500000, hybridSell25:15000000, onsiteSell20:17000000, onsiteSell25:17500000 },
        { cat:'IT Management & Consulting', pos:'Scrum Master',       level:'Senior', hybridMin:20000000, hybridMax:35000000, remoteSell20:21000000, remoteSell25:22000000, hybridSell20:24000000, hybridSell25:25000000, onsiteSell20:28000000, onsiteSell25:29500000 },
        { cat:'IT Management & Consulting', pos:'IT Business Analyst',level:'Junior', hybridMin:6000000,  hybridMax:10000000, remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:7000000,  hybridSell25:7500000,  onsiteSell20:8500000,  onsiteSell25:9000000  },
        { cat:'IT Management & Consulting', pos:'IT Business Analyst',level:'Mid',    hybridMin:10000000, hybridMax:18000000, remoteSell20:10000000, remoteSell25:10500000, hybridSell20:12000000, hybridSell25:12500000, onsiteSell20:14500000, onsiteSell25:15000000 },
        { cat:'IT Management & Consulting', pos:'IT Business Analyst',level:'Senior', hybridMin:18000000, hybridMax:32000000, remoteSell20:18500000, remoteSell25:19500000, hybridSell20:21500000, hybridSell25:22500000, onsiteSell20:25000000, onsiteSell25:26000000 },
        { cat:'IT Management & Consulting', pos:'IT Consultant',      level:'Mid',    hybridMin:16000000, hybridMax:28000000, remoteSell20:17000000, remoteSell25:17500000, hybridSell20:19000000, hybridSell25:20000000, onsiteSell20:23000000, onsiteSell25:24000000 },
        { cat:'IT Management & Consulting', pos:'IT Consultant',      level:'Senior', hybridMin:28000000, hybridMax:48000000, remoteSell20:29500000, remoteSell25:30500000, hybridSell20:33500000, hybridSell25:35000000, onsiteSell20:39500000, onsiteSell25:41000000 },
        { cat:'IT Management & Consulting', pos:'IT Director / CTO',  level:'Senior', hybridMin:45000000, hybridMax:90000000, remoteSell20:47000000, remoteSell25:49000000, hybridSell20:54000000, hybridSell25:56000000, onsiteSell20:63500000, onsiteSell25:66000000 },
        // Design & UX
        { cat:'Design & UX', pos:'UI Designer',   level:'Junior', hybridMin:5000000,  hybridMax:8500000,  remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:6000000,  hybridSell25:6000000,  onsiteSell20:7000000,  onsiteSell25:7500000  },
        { cat:'Design & UX', pos:'UI Designer',   level:'Mid',    hybridMin:8500000,  hybridMax:14000000, remoteSell20:9000000,  remoteSell25:9500000,  hybridSell20:10000000, hybridSell25:10500000, onsiteSell20:12000000, onsiteSell25:12500000 },
        { cat:'Design & UX', pos:'UI Designer',   level:'Senior', hybridMin:14000000, hybridMax:24000000, remoteSell20:14500000, remoteSell25:15000000, hybridSell20:17000000, hybridSell25:17500000, onsiteSell20:20000000, onsiteSell25:20500000 },
        { cat:'Design & UX', pos:'UX Researcher', level:'Junior', hybridMin:5500000,  hybridMax:9000000,  remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:6500000,  hybridSell25:7000000,  onsiteSell20:8000000,  onsiteSell25:8000000  },
        { cat:'Design & UX', pos:'UX Researcher', level:'Mid',    hybridMin:9000000,  hybridMax:16000000, remoteSell20:9500000,  remoteSell25:10000000, hybridSell20:11000000, hybridSell25:11000000, onsiteSell20:12500000, onsiteSell25:13000000 },
        { cat:'Design & UX', pos:'UX Researcher', level:'Senior', hybridMin:16000000, hybridMax:28000000, remoteSell20:17000000, remoteSell25:17500000, hybridSell20:19000000, hybridSell25:20000000, onsiteSell20:23000000, onsiteSell25:24000000 },
        { cat:'Design & UX', pos:'UI/UX Designer',level:'Junior', hybridMin:5500000,  hybridMax:9500000,  remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:6500000,  hybridSell25:7000000,  onsiteSell20:8000000,  onsiteSell25:8000000  },
        { cat:'Design & UX', pos:'UI/UX Designer',level:'Mid',    hybridMin:9500000,  hybridMax:16000000, remoteSell20:10000000, remoteSell25:10500000, hybridSell20:11500000, hybridSell25:12000000, onsiteSell20:13000000, onsiteSell25:14000000 },
        { cat:'Design & UX', pos:'UI/UX Designer',level:'Senior', hybridMin:16000000, hybridMax:28000000, remoteSell20:17000000, remoteSell25:17500000, hybridSell20:19000000, hybridSell25:20000000, onsiteSell20:23000000, onsiteSell25:24000000 },
        // IT Support & Operations
        { cat:'IT Support & Operations', pos:'Help Desk / Technical Support', level:'Junior', hybridMin:5000000,  hybridMax:7500000,  remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:6000000,  hybridSell25:6000000,  onsiteSell20:7000000,  onsiteSell25:7500000  },
        { cat:'IT Support & Operations', pos:'Help Desk / Technical Support', level:'Mid',    hybridMin:7500000,  hybridMax:12000000, remoteSell20:8000000,  remoteSell25:8000000,  hybridSell20:9000000,  hybridSell25:9500000,  onsiteSell20:11000000, onsiteSell25:11000000 },
        { cat:'IT Support & Operations', pos:'IT Support Engineer',           level:'Junior', hybridMin:5200000,  hybridMax:8500000,  remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:6000000,  hybridSell25:6500000,  onsiteSell20:7000000,  onsiteSell25:7500000  },
        { cat:'IT Support & Operations', pos:'IT Support Engineer',           level:'Mid',    hybridMin:8500000,  hybridMax:14000000, remoteSell20:9000000,  remoteSell25:9500000,  hybridSell20:10000000, hybridSell25:10500000, onsiteSell20:12000000, onsiteSell25:12500000 },
        { cat:'IT Support & Operations', pos:'IT Support Engineer',           level:'Senior', hybridMin:14000000, hybridMax:24000000, remoteSell20:14500000, remoteSell25:15000000, hybridSell20:17000000, hybridSell25:17500000, onsiteSell20:20000000, onsiteSell25:20500000 },
        { cat:'IT Support & Operations', pos:'Database Administrator (DBA)',  level:'Junior', hybridMin:6000000,  hybridMax:10000000, remoteSell20:6000000,  remoteSell25:6000000,  hybridSell20:7000000,  hybridSell25:7500000,  onsiteSell20:8500000,  onsiteSell25:9000000  },
        { cat:'IT Support & Operations', pos:'Database Administrator (DBA)',  level:'Mid',    hybridMin:10000000, hybridMax:18000000, remoteSell20:10000000, remoteSell25:10500000, hybridSell20:12000000, hybridSell25:12500000, onsiteSell20:14500000, onsiteSell25:15000000 },
        { cat:'IT Support & Operations', pos:'Database Administrator (DBA)',  level:'Senior', hybridMin:18000000, hybridMax:30000000, remoteSell20:18500000, remoteSell25:19500000, hybridSell20:21500000, hybridSell25:22500000, onsiteSell20:25000000, onsiteSell25:26000000 },
    ],
    jakarta: [
        // Software Development
        { cat:'Software Development', pos:'Frontend Developer',         level:'Junior', hybridMin:7000000,  hybridMax:11000000, remoteSell20:7000000,  remoteSell25:7500000,  hybridSell20:8500000,  hybridSell25:9000000,  onsiteSell20:10000000, onsiteSell25:10500000 },
        { cat:'Software Development', pos:'Frontend Developer',         level:'Mid',    hybridMin:11000000, hybridMax:18000000, remoteSell20:11500000, remoteSell25:12000000, hybridSell20:13000000, hybridSell25:14000000, onsiteSell20:15500000, onsiteSell25:16000000 },
        { cat:'Software Development', pos:'Frontend Developer',         level:'Senior', hybridMin:20000000, hybridMax:32000000, remoteSell20:21000000, remoteSell25:22000000, hybridSell20:24000000, hybridSell25:25000000, onsiteSell20:28000000, onsiteSell25:29500000 },
        { cat:'Software Development', pos:'Backend Developer',          level:'Junior', hybridMin:8000000,  hybridMax:13000000, remoteSell20:8500000,  remoteSell25:9000000,  hybridSell20:9500000,  hybridSell25:10000000, onsiteSell20:11500000, onsiteSell25:12000000 },
        { cat:'Software Development', pos:'Backend Developer',          level:'Mid',    hybridMin:13000000, hybridMax:22000000, remoteSell20:14000000, remoteSell25:14500000, hybridSell20:15500000, hybridSell25:16000000, onsiteSell20:18500000, onsiteSell25:19500000 },
        { cat:'Software Development', pos:'Backend Developer',          level:'Senior', hybridMin:22000000, hybridMax:38000000, remoteSell20:23000000, remoteSell25:24000000, hybridSell20:26500000, hybridSell25:27500000, onsiteSell20:31000000, onsiteSell25:32500000 },
        { cat:'Software Development', pos:'Fullstack Developer',        level:'Junior', hybridMin:8500000,  hybridMax:14000000, remoteSell20:9000000,  remoteSell25:9500000,  hybridSell20:10000000, hybridSell25:10500000, onsiteSell20:12000000, onsiteSell25:12500000 },
        { cat:'Software Development', pos:'Fullstack Developer',        level:'Mid',    hybridMin:14000000, hybridMax:24000000, remoteSell20:14500000, remoteSell25:15000000, hybridSell20:17000000, hybridSell25:17500000, onsiteSell20:20000000, onsiteSell25:20500000 },
        { cat:'Software Development', pos:'Fullstack Developer',        level:'Senior', hybridMin:24000000, hybridMax:42000000, remoteSell20:25000000, remoteSell25:26000000, hybridSell20:29000000, hybridSell25:30000000, onsiteSell20:34000000, onsiteSell25:35500000 },
        { cat:'Software Development', pos:'Mobile Developer (Android/iOS)', level:'Junior', hybridMin:8500000,  hybridMax:14000000, remoteSell20:9000000,  remoteSell25:9500000,  hybridSell20:10000000, hybridSell25:10500000, onsiteSell20:12000000, onsiteSell25:12500000 },
        { cat:'Software Development', pos:'Mobile Developer (Android/iOS)', level:'Mid',    hybridMin:14000000, hybridMax:24000000, remoteSell20:14500000, remoteSell25:15000000, hybridSell20:17000000, hybridSell25:17500000, onsiteSell20:20000000, onsiteSell25:20500000 },
        { cat:'Software Development', pos:'Mobile Developer (Android/iOS)', level:'Senior', hybridMin:24000000, hybridMax:42000000, remoteSell20:25000000, remoteSell25:26000000, hybridSell20:29000000, hybridSell25:30000000, onsiteSell20:34000000, onsiteSell25:35500000 },
        // Infrastructure & Cloud
        { cat:'Infrastructure & Cloud', pos:'DevOps / SRE',   level:'Junior', hybridMin:9000000,  hybridMax:14000000, remoteSell20:9500000,  remoteSell25:10000000, hybridSell20:11000000, hybridSell25:11000000, onsiteSell20:12500000, onsiteSell25:13000000 },
        { cat:'Infrastructure & Cloud', pos:'DevOps / SRE',   level:'Mid',    hybridMin:14000000, hybridMax:25000000, remoteSell20:14500000, remoteSell25:15000000, hybridSell20:17000000, hybridSell25:17500000, onsiteSell20:20000000, onsiteSell25:20500000 },
        { cat:'Infrastructure & Cloud', pos:'DevOps / SRE',   level:'Senior', hybridMin:25000000, hybridMax:45000000, remoteSell20:26500000, remoteSell25:27500000, hybridSell20:30000000, hybridSell25:31000000, onsiteSell20:35500000, onsiteSell25:37000000 },
        { cat:'Infrastructure & Cloud', pos:'Cloud Engineer',  level:'Junior', hybridMin:9500000,  hybridMax:15000000, remoteSell20:10000000, remoteSell25:10500000, hybridSell20:11500000, hybridSell25:12000000, onsiteSell20:13000000, onsiteSell25:14000000 },
        { cat:'Infrastructure & Cloud', pos:'Cloud Engineer',  level:'Mid',    hybridMin:15000000, hybridMax:28000000, remoteSell20:15500000, remoteSell25:16000000, hybridSell20:18000000, hybridSell25:19000000, onsiteSell20:21000000, onsiteSell25:22000000 },
        { cat:'Infrastructure & Cloud', pos:'Cloud Engineer',  level:'Senior', hybridMin:28000000, hybridMax:50000000, remoteSell20:29500000, remoteSell25:30500000, hybridSell20:33500000, hybridSell25:35000000, onsiteSell20:39500000, onsiteSell25:41000000 },
        // Data & Analytics
        { cat:'Data & Analytics', pos:'Data Analyst',   level:'Mid',    hybridMin:12000000, hybridMax:20000000, remoteSell20:14000000, remoteSell25:14500000, hybridSell20:16500000, hybridSell25:17000000, onsiteSell20:19500000, onsiteSell25:20500000 },
        { cat:'Data & Analytics', pos:'Data Analyst',   level:'Senior', hybridMin:20000000, hybridMax:35000000, remoteSell20:24000000, remoteSell25:25000000, hybridSell20:28000000, hybridSell25:29500000, onsiteSell20:33500000, onsiteSell25:35000000 },
        // QA & Testing
        { cat:'QA & Testing', pos:'QA Engineer (Manual)', level:'Junior', hybridMin:6000000,  hybridMax:10000000, remoteSell20:7000000,  remoteSell25:7500000,  hybridSell20:8000000,  hybridSell25:8500000,  onsiteSell20:9500000,  onsiteSell25:10000000 },
        { cat:'QA & Testing', pos:'QA Engineer (Manual)', level:'Mid',    hybridMin:10000000, hybridMax:17000000, remoteSell20:12000000, remoteSell25:12500000, hybridSell20:14000000, hybridSell25:14500000, onsiteSell20:16500000, onsiteSell25:17500000 },
        // IT Management & Consulting
        { cat:'IT Management & Consulting', pos:'IT Project Manager', level:'Mid',    hybridMin:20000000, hybridMax:35000000, remoteSell20:21000000, remoteSell25:22000000, hybridSell20:24000000, hybridSell25:25000000, onsiteSell20:28000000, onsiteSell25:29500000 },
        { cat:'IT Management & Consulting', pos:'IT Project Manager', level:'Senior', hybridMin:35000000, hybridMax:60000000, remoteSell20:36500000, remoteSell25:38000000, hybridSell20:42000000, hybridSell25:44000000, onsiteSell20:50000000, onsiteSell25:52000000 },
        { cat:'IT Management & Consulting', pos:'IT Consultant',      level:'Mid',    hybridMin:22000000, hybridMax:38000000, remoteSell20:23000000, remoteSell25:24000000, hybridSell20:26500000, hybridSell25:27500000, onsiteSell20:31000000, onsiteSell25:32500000 },
        { cat:'IT Management & Consulting', pos:'IT Consultant',      level:'Senior', hybridMin:38000000, hybridMax:65000000, remoteSell20:39500000, remoteSell25:41000000, hybridSell20:45500000, hybridSell25:47500000, onsiteSell20:54000000, onsiteSell25:56000000 },
        // Design & UX
        { cat:'Design & UX', pos:'UI Designer',   level:'Junior', hybridMin:7000000,  hybridMax:12000000, remoteSell20:7000000,  remoteSell25:7500000,  hybridSell20:8500000,  hybridSell25:9000000,  onsiteSell20:10000000, onsiteSell25:10500000 },
        { cat:'Design & UX', pos:'UI Designer',   level:'Mid',    hybridMin:12000000, hybridMax:20000000, remoteSell20:12500000, remoteSell25:13000000, hybridSell20:14500000, hybridSell25:15000000, onsiteSell20:17000000, onsiteSell25:17500000 },
        { cat:'Design & UX', pos:'UI/UX Designer',level:'Mid',    hybridMin:13000000, hybridMax:22000000, remoteSell20:14000000, remoteSell25:14500000, hybridSell20:16000000, hybridSell25:17000000, onsiteSell20:19000000, onsiteSell25:19500000 },
        { cat:'Design & UX', pos:'UI/UX Designer',level:'Senior', hybridMin:22000000, hybridMax:38000000, remoteSell20:23000000, remoteSell25:24000000, hybridSell20:26500000, hybridSell25:27500000, onsiteSell20:31000000, onsiteSell25:32500000 },
    ],
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OutsourcePage() {
    const t = useTranslations('outsource')

    const [city,   setCity]   = useState<City>('bandung')
    const margin = 20 as const
    const [mode,   setMode]   = useState<Mode>('remote')
    const [cat,    setCat]    = useState('')
    const [pos,    setPos]    = useState('')
    const [level,  setLevel]  = useState<Level | ''>('')
    const [qty,    setQty]    = useState(1)
    const [cart,   setCart]   = useState<CartItem[]>([])
    const [idSeq,  setIdSeq]  = useState(0)

    const data       = PRICING[city]
    const categories = [...new Set(data.map(d => d.cat))]
    const positions  = cat ? [...new Set(data.filter(d => d.cat === cat).map(d => d.pos))] : []
    const levels     = (cat && pos)
        ? [...new Set(data.filter(d => d.cat === cat && d.pos === pos).map(d => d.level))]
            .sort((a, b) => LEVEL_ORDER.indexOf(a) - LEVEL_ORDER.indexOf(b))
        : []

    const activeEntry = (cat && pos && level)
        ? data.find(d => d.cat === cat && d.pos === pos && d.level === level) ?? null
        : null

    const previewSell = activeEntry ? getSellPrice(activeEntry, mode) : 0

    const handleCityChange = (c: City) => {
        setCity(c)
        setCat(''); setPos(''); setLevel('')
    }

    const handleCatChange = (c: string) => {
        setCat(c); setPos(''); setLevel('')
    }

    const handlePosChange = (p: string) => {
        setPos(p); setLevel('')
    }

    const addTalent = () => {
        if (!activeEntry || !level) return
        const sellPrice = getSellPrice(activeEntry, mode)
        setCart(prev => [...prev, {
            id:     idSeq,
            city,
            pos:    activeEntry.pos,
            level:  activeEntry.level,
            cat:    activeEntry.cat,
            mode,
            qty,
            sell20:  sellPrice,
            sell25:  sellPrice,
            feeAvg: Math.round((activeEntry.hybridMin + activeEntry.hybridMax) / 2),
        }])
        setIdSeq(s => s + 1)
    }
    const removeItem = (id: number) => setCart(prev => prev.filter(i => i.id !== id))

    const totCount = cart.reduce((s, i) => s + i.qty, 0)
    const totSell  = cart.reduce((s, i) => s + i.sell20 * i.qty, 0)

    const buildWAMessage = () => {
        if (cart.length === 0) return ''
        let msg = t('waButton') + '\n\n' + t('summaryTitle') + ':\n'
        cart.forEach(i => {
            const sell = margin === 20 ? i.sell20 : i.sell25
            msg += `• ${i.qty}× ${i.pos} (${i.level}) — ${i.mode} — ${i.city === 'bandung' ? 'Bandung' : 'Jakarta'} → ${formatMillions(sell * i.qty)}/bln\n`
        })
        msg += `\n${t('totalTalent')} ${totCount}: ${formatFullPrice(totSell)}/bln`
        return msg
    }

    const tabBtnStyle = (active: boolean): React.CSSProperties => ({
        padding: '6px 18px',
        borderRadius: 6,
        fontSize: '0.7rem',
        fontWeight: 700,
        cursor: 'pointer',
        border: 'none',
        background: active ? '#DBC977' : 'transparent',
        color: active ? '#0E1E30' : 'rgba(248,248,248,0.45)',
        transition: 'all 0.18s',
        letterSpacing: '0.03em',
        fontFamily: 'inherit',
    })

    // ── Render ──────────────────────────────────────────────────────────────

    return (
        <main style={{ background: '#0E1E30', minHeight: '100vh', color: '#F8F8F8' }}>

            {/* ── Top bar ── */}
            <nav style={{
                borderBottom: '1px solid rgba(219,201,119,0.15)',
                padding: '1rem 2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1rem',
                background: 'rgba(14,30,48,0.95)',
                backdropFilter: 'blur(20px)',
                position: 'sticky',
                top: 0,
                zIndex: 50,
            }}>
                <Link href="/" style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'rgba(248,248,248,0.5)',
                    textDecoration: 'none', transition: 'color 0.2s',
                }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#DBC977')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(248,248,248,0.5)')}
                >
                    <ArrowLeft size={14} />
                    {t('navBack')}
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <LangToggle />
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
                        <div style={{ position: 'relative', width: 32, height: 32, flexShrink: 0 }}>
                            <Image src="/assets/logo2.png" alt="Sundawa Teknologi" fill style={{ objectFit: 'contain', padding: 2 }} priority sizes="32px" />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.72rem', fontWeight: 900, letterSpacing: '0.25em', color: '#F8F8F8', lineHeight: 1 }}>
                                SUNDAWA
                            </div>
                            <div style={{ fontSize: '0.55rem', fontWeight: 300, letterSpacing: '0.4em', color: 'rgba(219,201,119,0.5)', textTransform: 'uppercase', marginTop: 1 }}>
                                Teknologi
                            </div>
                        </div>
                    </Link>
                </div>

                <span style={{
                    fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: 'rgba(248,248,248,0.3)',
                }} className="nav-title-hidden">
                    {t('navTitle')}
                </span>
            </nav>

            {/* ── Hero strip ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ padding: '3rem 2rem 2rem', maxWidth: 1100, margin: '0 auto' }}
            >
                <div style={{
                    fontSize: '0.6rem', fontWeight: 800, letterSpacing: '0.3em',
                    textTransform: 'uppercase', color: '#DBC977', marginBottom: '0.75rem',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                }}>
                    <span>— {t('label')}</span>
                    <div style={{ height: 1, width: 60, background: 'linear-gradient(to right, rgba(219,201,119,0.4), transparent)' }} />
                </div>
                <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '0.75rem' }}>
                    {t('heading1')}<br />
                    <span className="gold-gradient">{t('heading2')}</span>
                </h1>
                <p style={{ fontSize: '0.82rem', color: 'rgba(248,248,248,0.4)', fontWeight: 300, lineHeight: 1.8, maxWidth: 520 }}>
                    {t('sub')}
                </p>
            </motion.div>

            {/* ── Calculator container ── */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 4rem' }}
            >
                <div style={{ border: '1px solid rgba(219,201,119,0.2)', borderRadius: 16, overflow: 'hidden' }}>

                    {/* ── Calculator header ── */}
                    <div style={{
                        background: 'rgba(29,52,81,0.5)',
                        borderBottom: '1px solid rgba(219,201,119,0.2)',
                        padding: '1.2rem 1.75rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '1rem',
                    }}>
                        <div style={{ display: 'flex', gap: 4, background: 'rgba(0,0,0,0.3)', borderRadius: 8, padding: 4 }}>
                            {(['bandung', 'jakarta'] as City[]).map(c => (
                                <button key={c} style={tabBtnStyle(city === c)} onClick={() => handleCityChange(c)}>
                                    {c.charAt(0).toUpperCase() + c.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Calculator body ── */}
                    <div className="calc-body-grid">

                        <TalentSelector
                            categories={categories}
                            positions={positions}
                            levels={levels}
                            category={cat}
                            position={pos}
                            level={level}
                            quantity={qty}
                            mode={mode}
                            activeEntry={activeEntry}
                            previewPrice={previewSell}
                            onCategoryChange={handleCatChange}
                            onPositionChange={handlePosChange}
                            onLevelChange={setLevel}
                            onQuantityChange={setQty}
                            onModeChange={setMode}
                            onAdd={addTalent}
                        />

                        <EstimateCart
                            cart={cart}
                            totalCount={totCount}
                            totalPrice={totSell}
                            onRemove={removeItem}
                            onClear={() => setCart([])}
                            buildMessage={buildWAMessage}
                        />

                    </div>
                </div>
            </motion.div>

            <InfoStrip />
            <ContactCta />

            <style>{`
                .gold-gradient {
                    background: linear-gradient(135deg, #DBC977, #A66A2C, #DBC977);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .calc-body-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                }
                @media (min-width: 768px) {
                    .calc-body-grid {
                        grid-template-columns: 1.2fr 0.8fr;
                    }
                }
                @media (max-width: 480px) {
                    .nav-title-hidden { display: none !important; }
                }
                select option {
                    background: #1D3451;
                    color: #F8F8F8;
                }
                ::-webkit-scrollbar { width: 4px; }
                ::-webkit-scrollbar-track { background: transparent; }
                ::-webkit-scrollbar-thumb { background: rgba(219,201,119,0.3); border-radius: 2px; }
            `}</style>
        </main>
    )
}