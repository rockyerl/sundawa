"use client";

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Plus, X, ChevronDown, MessageCircle, Trash2, Users, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/src/i18n/navigation'
import { useTranslations } from 'next-intl'
import LangToggle from '@/components/LangToggle'


type City   = 'bandung' | 'jakarta'
type Mode   = 'remote' | 'hybrid' | 'onsite'
type Level  = 'Junior' | 'Mid' | 'Senior'

interface TalentEntry {
    cat:         string
    pos:         string
    level:       Level
    hybridMin:   number
    hybridMax:   number
    remoteSell20: number; remoteSell25: number
    hybridSell20: number; hybridSell25: number
    onsiteSell20: number; onsiteSell25: number
}

interface CartItem {
    id:      number
    city:    City
    pos:     string
    level:   Level
    cat:     string
    mode:    Mode
    qty:     number
    sell20:  number
    sell25:  number
    feeAvg:  number
}

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

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtJt(n: number): string {
    if (n <= 0) return 'Rp 0'
    if (n >= 1_000_000) return 'Rp ' + (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + ' jt'
    return 'Rp ' + n.toLocaleString('id-ID')
}

function fmtFull(n: number): string {
    return 'Rp ' + n.toLocaleString('id-ID')
}

function getSellPrice(entry: TalentEntry, mode: Mode): number {
    if (mode === 'remote') return entry.remoteSell20
    if (mode === 'hybrid') return entry.hybridSell20
    return entry.onsiteSell20
}

const LEVEL_ORDER: Level[] = ['Junior', 'Mid', 'Senior']

// ─── Sub-components ───────────────────────────────────────────────────────────

const ModeBadge = ({ mode }: { mode: Mode }) => {
    const styles: Record<Mode, React.CSSProperties> = {
        remote: { background: 'rgba(45,125,210,0.2)',  color: '#7BB8EE' },
        hybrid: { background: 'rgba(219,201,119,0.18)', color: '#DBC977' },
        onsite: { background: 'rgba(166,106,44,0.25)', color: '#E0A060' },
    }
    const labels: Record<Mode, string> = { remote: 'Remote', hybrid: 'Hybrid', onsite: 'Onsite' }
    return (
        <span style={{
            ...styles[mode],
            display: 'inline-block',
            padding: '2px 8px',
            borderRadius: 4,
            fontSize: '0.6rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
        }}>
            {labels[mode]}
        </span>
    )
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
            msg += `• ${i.qty}× ${i.pos} (${i.level}) — ${i.mode} — ${i.city === 'bandung' ? 'Bandung' : 'Jakarta'} → ${fmtJt(sell * i.qty)}/bln\n`
        })
        msg += `\n${t('totalTalent')} ${totCount}: ${fmtFull(totSell)}/bln`
        return msg
    }

    const selectStyle: React.CSSProperties = {
        width: '100%',
        background: 'rgba(29,52,81,0.7)',
        border: '1px solid rgba(219,201,119,0.2)',
        borderRadius: 8,
        color: '#F8F8F8',
        fontSize: '0.8rem',
        padding: '9px 36px 9px 12px',
        outline: 'none',
        fontFamily: 'inherit',
        appearance: 'none',
        WebkitAppearance: 'none',
        cursor: 'pointer',
    }

    const labelStyle: React.CSSProperties = {
        display: 'block',
        fontSize: '0.6rem',
        fontWeight: 700,
        color: 'rgba(248,248,248,0.4)',
        marginBottom: 5,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
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

    const modeStyle = (active: boolean): React.CSSProperties => ({
        flex: 1,
        padding: '8px 4px',
        border: `1px solid ${active ? 'rgba(219,201,119,0.5)' : 'rgba(219,201,119,0.15)'}`,
        background: active ? 'rgba(219,201,119,0.1)' : 'transparent',
        color: active ? '#DBC977' : 'rgba(248,248,248,0.4)',
        borderRadius: 7,
        fontSize: '0.7rem',
        fontWeight: 700,
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'center' as const,
        transition: 'all 0.15s',
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
                }}>
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

                        {/* ── Add panel ── */}
                        <div style={{ padding: '1.75rem', borderRight: '1px solid rgba(219,201,119,0.12)' }}>
                            <p style={{ ...labelStyle, marginBottom: '1.2rem', color: 'rgba(219,201,119,0.6)' }}>{t('addTitle')}</p>

                            {/* Category */}
                            <div style={{ marginBottom: '0.9rem', position: 'relative' }}>
                                <label style={labelStyle}>{t('labelCategory')}</label>
                                <div style={{ position: 'relative' }}>
                                    <select style={selectStyle} value={cat} onChange={e => handleCatChange(e.target.value)}>
                                        <option value="">{t('selectCategory')}</option>
                                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                    <ChevronDown size={14} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(219,201,119,0.5)', pointerEvents: 'none' }} />
                                </div>
                            </div>

                            {/* Position */}
                            <div style={{ marginBottom: '0.9rem', position: 'relative' }}>
                                <label style={labelStyle}>{t('labelPosition')}</label>
                                <div style={{ position: 'relative' }}>
                                    <select style={{ ...selectStyle, opacity: cat ? 1 : 0.5 }} value={pos} onChange={e => handlePosChange(e.target.value)} disabled={!cat}>
                                        <option value="">{t('selectPosition')}</option>
                                        {positions.map(p => <option key={p} value={p}>{p}</option>)}
                                    </select>
                                    <ChevronDown size={14} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(219,201,119,0.5)', pointerEvents: 'none' }} />
                                </div>
                            </div>

                            {/* Level + Qty */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.9rem' }}>
                                <div>
                                    <label style={labelStyle}>{t('labelLevel')}</label>
                                    <div style={{ position: 'relative' }}>
                                        <select style={{ ...selectStyle, opacity: pos ? 1 : 0.5 }} value={level} onChange={e => setLevel(e.target.value as Level)} disabled={!pos}>
                                            <option value="">{t('selectLevel')}</option>
                                            {levels.map(l => <option key={l} value={l}>{l}</option>)}
                                        </select>
                                        <ChevronDown size={14} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', color: 'rgba(219,201,119,0.5)', pointerEvents: 'none' }} />
                                    </div>
                                </div>
                                <div>
                                    <label style={labelStyle}>{t('labelQty')}</label>
                                    <input
                                        type="number" min={1} max={99} value={qty}
                                        onChange={e => setQty(Math.max(1, Math.min(99, parseInt(e.target.value) || 1)))}
                                        style={{ ...selectStyle, textAlign: 'center', padding: '9px 12px' }}
                                    />
                                </div>
                            </div>

                            {/* Mode kerja */}
                            <div style={{ marginBottom: '1.2rem' }}>
                                <label style={labelStyle}>{t('labelMode')}</label>
                                <div style={{ display: 'flex', gap: 6 }}>
                                    {(['remote', 'hybrid', 'onsite'] as Mode[]).map(m => (
                                        <button key={m} style={modeStyle(mode === m)} onClick={() => setMode(m)}>
                                            {m === 'remote' ? t('modeRemote') : m === 'hybrid' ? t('modeHybrid') : t('modeOnsite')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price preview */}
                            {activeEntry && (
                                <motion.div
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        background: 'rgba(219,201,119,0.07)',
                                        border: '1px solid rgba(219,201,119,0.22)',
                                        borderRadius: 10,
                                        padding: '12px 14px',
                                        marginBottom: '1.2rem',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 8,
                                        flexWrap: 'wrap',
                                    }}
                                >
                                    <div>
                                        <div style={{ fontSize: '0.6rem', color: 'rgba(248,248,248,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>
                                            {t('pricePerPerson')}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '1rem', fontWeight: 800, color: '#DBC977' }}>
                                            {fmtJt(previewSell)}
                                        </div>
                                        {qty > 1 && (
                                            <div style={{ fontSize: '0.65rem', color: 'rgba(248,248,248,0.35)' }}>
                                                {qty} org = {fmtJt(previewSell * qty)}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}

                            {/* Add button */}
                            <button
                                onClick={addTalent}
                                disabled={!activeEntry}
                                style={{
                                    width: '100%',
                                    background: activeEntry ? '#DBC977' : 'rgba(219,201,119,0.2)',
                                    color: activeEntry ? '#0E1E30' : 'rgba(248,248,248,0.3)',
                                    border: 'none',
                                    borderRadius: 8,
                                    padding: '11px',
                                    fontSize: '0.75rem',
                                    fontWeight: 800,
                                    cursor: activeEntry ? 'pointer' : 'not-allowed',
                                    fontFamily: 'inherit',
                                    letterSpacing: '0.06em',
                                    textTransform: 'uppercase',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: 6,
                                    transition: 'all 0.15s',
                                }}
                            >
                                <Plus size={15} />
                                {t('addButton')}
                            </button>

                            {/* Notes */}
                            <p style={{ fontSize: '0.62rem', color: 'rgba(248,248,248,0.2)', marginTop: '1rem', lineHeight: 1.7 }}>
                                {t('priceNote')}
                            </p>
                        </div>

                        {/* ── Summary panel ── */}
                        <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', minHeight: 480 }}>
                            <p style={{ ...labelStyle, marginBottom: '1.2rem', color: 'rgba(219,201,119,0.6)' }}>{t('summaryTitle')}</p>

                            {/* Cart list */}
                            <div style={{ flex: 1, overflowY: 'auto', marginBottom: '1rem', maxHeight: 320 }}>
                                {cart.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'rgba(248,248,248,0.2)' }}>
                                        <Users size={32} style={{ display: 'block', margin: '0 auto 10px', opacity: 0.3 }} />
                                        <p style={{ fontSize: '0.78rem' }}>{t('emptyCart')}</p>
                                    </div>
                                ) : (
                                    cart.map(item => {
                                        const sell = item.sell20
                                        return (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                style={{
                                                    background: 'rgba(29,52,81,0.5)',
                                                    border: '1px solid rgba(219,201,119,0.1)',
                                                    borderRadius: 10,
                                                    padding: '10px 12px',
                                                    marginBottom: 8,
                                                    display: 'grid',
                                                    gridTemplateColumns: '1fr auto',
                                                    alignItems: 'start',
                                                    gap: 8,
                                                }}
                                            >
                                                <div>
                                                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F8F8F8', marginBottom: 4 }}>
                                                        {item.qty}× {item.pos}
                                                    </div>
                                                    <div style={{ fontSize: '0.65rem', color: 'rgba(248,248,248,0.4)', display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                                                        <ModeBadge mode={item.mode} />
                                                        <span>{item.level} · {item.city === 'bandung' ? 'Bandung' : 'Jakarta'}</span>
                                                    </div>
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 6 }}>
                                                    <div style={{ textAlign: 'right' }}>
                                                        <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#DBC977', whiteSpace: 'nowrap' }}>
                                                            {fmtJt(sell * item.qty)}
                                                        </div>
                                                        <div style={{ fontSize: '0.6rem', color: 'rgba(219,201,119,0.5)' }}>
                                                            {fmtJt(sell)}/org
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        aria-label="remove"
                                                        style={{
                                                            background: 'none', border: 'none',
                                                            color: 'rgba(248,248,248,0.25)', cursor: 'pointer',
                                                            padding: 2, lineHeight: 1, marginTop: 2,
                                                        }}
                                                    >
                                                        <X size={13} />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )
                                    })
                                )}
                            </div>

                            {/* Totals */}
                            <div style={{
                                background: 'rgba(0,0,0,0.25)',
                                border: '1px solid rgba(219,201,119,0.18)',
                                borderRadius: 10,
                                padding: '14px 16px',
                                marginBottom: '0.9rem',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'rgba(248,248,248,0.5)', padding: '3px 0' }}>
                                    <span>{t('totalTalent')}</span><span>{totCount} orang</span>
                                </div>
                                <div style={{ borderTop: '1px solid rgba(219,201,119,0.18)', marginTop: 8, paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 800, color: '#DBC977' }}>
                                    <span>{t('totalPerMonth')}</span>
                                    <span>{fmtFull(totSell)}</span>
                                </div>
                            </div>

                            {/* CTAs */}
                            <div style={{ display: 'flex', gap: 8 }}>
                                <a
                                    href={cart.length > 0 ? `https://wa.me/6281234567890?text=${encodeURIComponent(buildWAMessage())}` : '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        flex: 1,
                                        background: cart.length > 0 ? '#25D366' : 'rgba(37,211,102,0.2)',
                                        color: cart.length > 0 ? 'white' : 'rgba(255,255,255,0.3)',
                                        border: 'none',
                                        borderRadius: 8,
                                        padding: '10px',
                                        fontSize: '0.72rem',
                                        fontWeight: 800,
                                        textDecoration: 'none',
                                        fontFamily: 'inherit',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 6,
                                        transition: 'opacity 0.15s',
                                        cursor: cart.length > 0 ? 'pointer' : 'not-allowed',
                                        pointerEvents: cart.length > 0 ? 'auto' : 'none',
                                    }}
                                >
                                    <MessageCircle size={14} />
                                    {t('waButton')}
                                </a>
                                {cart.length > 0 && (
                                    <button
                                        onClick={() => setCart([])}
                                        style={{
                                            background: 'rgba(226,75,74,0.12)',
                                            color: '#E24B4A',
                                            border: '1px solid rgba(226,75,74,0.25)',
                                            borderRadius: 8,
                                            padding: '10px 12px',
                                            fontSize: '0.72rem',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            fontFamily: 'inherit',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: 4,
                                        }}
                                    >
                                        <Trash2 size={13} />
                                        {t('reset')}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── Info strip ── */}
            <div style={{ background: 'rgba(29,52,81,0.3)', borderTop: '1px solid rgba(219,201,119,0.1)', padding: '2rem' }}>
                <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
                    {[
                        { icon: '🏠', title: t('infoTitleRemote'),  desc: t('infoRemote') },
                        { icon: '🔄', title: t('infoTitleHybrid'),  desc: t('infoHybrid') },
                        { icon: '🏢', title: t('infoTitleOnsite'),  desc: t('infoOnsite') },
                        { icon: '📋', title: t('infoTitleNote'),    desc: t('infoNote')   },
                    ].map(item => (
                        <div key={item.title}>
                            <div style={{ fontSize: '1.1rem', marginBottom: 6 }}>{item.icon}</div>
                            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#DBC977', marginBottom: 6, letterSpacing: '0.03em' }}>{item.title}</div>
                            <p style={{ fontSize: '0.7rem', color: 'rgba(248,248,248,0.35)', lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Contact CTA ── */}
            <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.72rem', color: 'rgba(248,248,248,0.35)', marginBottom: '1rem' }}>
                    {t('contactCta')}
                </p>
                <Link
                    href="/#contact"
                    style={{
                        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                        fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.15em',
                        textTransform: 'uppercase', color: '#DBC977',
                        padding: '0.6rem 1.5rem',
                        border: '1px solid rgba(219,201,119,0.35)',
                        background: 'rgba(219,201,119,0.06)',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                    }}
                >
                    {t('contactButton')} <ArrowUpRight size={12} />
                </Link>
            </div>

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