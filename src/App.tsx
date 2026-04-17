/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  GraduationCap, 
  ChevronRight,
  Send,
  Cpu,
  Smartphone,
  Globe,
  Database,
  Menu,
  X,
  Sun,
  Moon
} from 'lucide-react';
import { ReactLenis, useLenis } from 'lenis/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { cn } from './lib/utils';

// --- Types & Schemas ---

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

// --- Constants ---

const ACADEMIC_JOURNEY = [
  {
    period: '2009 - 2019',
    institution: 'J.B. & KARP Vidya Sankul',
    degree: 'Std. Jr.Kg to 8th',
    icon: <GraduationCap className="w-5 h-5" />,
    link: "https://www.google.com/search?q=j+b+and+karp+vidya+sankul&oq=&gs_lcrp=EgZjaHJvbWUqBggBEEUYOzIOCAAQRRgnGDsYgAQYigUyBggBEEUYOzIGCAIQRRg5MgYIAxBFGDsyBggEEEUYPDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYPdIBCDIwMzRqMGo5qAIGsAIB8QWxTaL7I67wIA&sourceid=chrome&ie=UTF-8"
  },
  {
    period: '2019 - 2021',
    institution: "Vallabh Ashram's MGM Amin & V N Savani School",
    degree: 'Std. 9th, 10th',
    icon: <GraduationCap className="w-5 h-5" />,
    link: "https://www.google.com/search?q=vallabh+ashram%27s+mgm+amin+%26+vn+savani+school&oq=vallabh+ashram+mgm+amin+&gs_lcrp=EgZjaHJvbWUqCAgBEAAYFhgeMgoIABBFGBYYHhg5MggIARAAGBYYHjIICAIQABgWGB4yCAgDEAAYFhgeMg0IBBAAGIYDGIAEGIoFMg0IBRAAGIYDGIAEGIoFMg0IBhAAGIYDGIAEGIoFMg0IBxAAGIYDGIAEGIoFMg0ICBAAGIYDGIAEGIoF0gEJMTQ0OTdqMGo0qAIBsAIB8QXEUBphINaDifEFxFAaYSDWg4k&sourceid=chrome&ie=UTF-8"
  },
  {
    period: '2021 - 2023',
    institution: 'P. P. Savani Chaitanya Vidya Sankul',
    degree: 'Std. 11th, 12th',
    icon: <GraduationCap className="w-5 h-5" />,
    link: "#"
  },
  {
    period: '2023 - Present',
    institution: 'Uka Tarsadia University (AMTICS)',
    degree: 'Bachelor of Technology (CSE)',
    icon: <GraduationCap className="w-5 h-5" />,
    current: true,
    link: "https://www.google.com/search?q=uka+tarsadia+university+amtics&sca_esv=ab78fc3432efc4ca&sxsrf=ANbL-n72KqkrnN5g0fyp2zuTN8vC4M-cHg%3A1776425515463&ei=KxriadT6G9-H4-EP2rviuQs&biw=1536&bih=695&ved=0ahUKEwiUvMbe5PSTAxXfwzgGHdqdOLcQ4dUDCBE&uact=5&oq=uka+tarsadia+university+amtics&gs_lp=Egxnd3Mtd2l6LXNlcnAiHnVrYSB0YXJzYWRpYSB1bml2ZXJzaXR5IGFtdGljczIGEAAYFhgeMgsQABiABBiKBRiGAzIFEAAY7wUyBRAAGO8FMgUQABjvBTIFEAAY7wVI7Q5QZljxDHABeAGQAQCYAbIBoAH4CKoBAzAuN7gBA8gBAPgBAZgCCKACpAnCAgoQABhHGNYEGLADwgINEAAYgAQYigUYQxiwA8ICDhAAGOQCGNYEGLAD2AEBwgIXEC4Y3AYYuAYY2gYY2AIYyAMYsAPYAQHCAgoQLhhDGIAEGIoFwgIKEAAYgAQYigUYQ8ICBRAAGIAEwgIZEC4YQxiABBiKBRiXBRjcBBjeBBjgBNgBAcICBRAuGIAEwgICECbCAggQABiABBiiBMICCBAAGIkFGKIEmAMAiAYBkAYTugYGCAEQARgJkgcDMS43oAe1J7IHAzAuN7gHnQnCBwcwLjUuMi4xyAcggAgB&sclient=gws-wiz-serp"
  }
];

const SKILLS = [
  { name: 'HTML', class: 'devicon-html5-plain' },
  { name: 'CSS', class: 'devicon-css3-plain' },
  { name: 'JavaScript', class: 'devicon-javascript-plain' },
  { name: 'MySQL', class: 'devicon-mysql-plain' },
  { name: 'Java', class: 'devicon-java-plain' },
  { name: 'C', class: 'devicon-c-plain' },
  { name: 'PHP', class: 'devicon-php-plain' },
  { name: '.NET', class: 'devicon-dotnetcore-plain' },
  { name: 'Flutter', class: 'devicon-flutter-plain' },
  { name: 'Python', class: 'devicon-python-plain' }
];

const PROJECTS = [
  {
    title: 'AeroDex',
    description: 'A cutting-edge platform for aeronautical data management and exploration.',
    github: 'https://github.com/DivyLathiya/AeroDex.git',
    category: 'Web App'
  },
  {
    title: 'DriveEase',
    description: 'A comprehensive vehicle rental and management solution with a focus on user experience.',
    github: 'https://github.com/DivyLathiya/DriveEase.git',
    category: 'Mobile App'
  }
];

// --- Components ---

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => (
  <div className="mb-12 space-y-2">
    <motion.h2 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="text-4xl md:text-5xl font-syne font-bold tracking-tight"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-zinc-400 text-lg max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: '4rem' }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="h-1 bg-accent rounded-full"
    />
  </div>
);

export default function App() {
  const lenis = useLenis();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return (saved as 'dark' | 'light') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const navItems = ['About', 'Journey', 'Skills', 'Projects', 'Contact'];

  const onSubmit = async (data: ContactFormValues) => {
    setFormStatus('idle');
    try {
      // Send the data to Web3Forms API
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c8834f3f-dd3c-4c81-955a-2153a71ee05f", 
          name: data.name,
          email: data.email,
          message: data.message,
          subject: "New Contact Form Submission from Portfolio",
          from_name: "Portfolio Website",
        }),
      });
  
      const result = await response.json();
  
      if (result.success) {
        setFormStatus('success');
        reset(); 
      } else {
        console.error("Submission failed:", result);
        setFormStatus('error');
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setFormStatus('error');
    }
  };

  return (
    <ReactLenis root options={{ lerp: 0.05, duration: 1.5, smoothTouch: true }}>
      <div className="min-h-screen bg-bg text-primary selection:bg-accent/30 transition-colors duration-500" data-theme={theme}>
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-[0%]"
          style={{ scaleX }}
        />

        {/* Navigation */}
        <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 md:px-12 pointer-events-none">
          <nav className="max-w-7xl mx-auto flex justify-between items-center bg-bg/50 backdrop-blur-xl border border-secondary/10 rounded-full px-6 py-3 pointer-events-auto relative">
            <div className="text-xl font-syne font-bold tracking-tighter text-accent">DL</div>
            
            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
              {navItems.map((item) => (
                <button 
                  key={item} 
                  onClick={() => {
                    lenis?.scrollTo(`#${item.toLowerCase()}`, {
                      offset: -100,
                      duration: 1.5,
                      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                    });
                  }}
                  className="text-sm font-medium text-secondary hover:text-primary transition-colors cursor-pointer"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 hover:bg-primary/10 rounded-full transition-colors text-secondary hover:text-primary"
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Desktop Socials */}
              <div className="hidden md:flex items-center gap-4">
                <div className="h-4 w-px bg-secondary/10 mr-2" />
                <a href="https://github.com/DivyLathiya" target="_blank" rel="noreferrer" className="p-2 hover:bg-primary/10 rounded-full transition-colors text-secondary hover:text-primary">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/divy-lathiya-01b8032aa/" target="_blank" rel="noreferrer" className="p-2 hover:bg-primary/10 rounded-full transition-colors text-secondary hover:text-primary">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-primary hover:bg-primary/10 rounded-full transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="absolute top-full left-0 right-0 mt-4 bg-surface/80 backdrop-blur-2xl border border-secondary/10 rounded-3xl p-6 flex flex-col items-center gap-6 md:hidden overflow-hidden"
                >
                  <div className="flex flex-col items-center gap-6 w-full">
                    {navItems.map((item) => (
                      <button 
                        key={item} 
                        onClick={() => {
                          setIsMenuOpen(false);
                          setTimeout(() => {
                            lenis?.scrollTo(`#${item.toLowerCase()}`, {
                              offset: -100,
                              duration: 1.5,
                            });
                          }, 100);
                        }}
                        className="text-lg font-medium text-secondary hover:text-primary transition-colors w-full py-2"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  
                  <div className="w-full h-px bg-secondary/10" />
                  
                  <div className="flex gap-8">
                    <a href="https://github.com/DivyLathiya" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
                      <Github className="w-6 h-6" />
                      <span className="text-sm font-medium">GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/divy-lathiya-01b8032aa/" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
                      <Linkedin className="w-6 h-6" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>
        </header>

        <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 md:px-12">
          {/* Hero Section */}
          <section id="about" className="min-h-[90vh] flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="grid lg:grid-cols-[1fr_auto] items-center gap-12 md:gap-24"
            >
              <div className="order-2 lg:order-1 space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left">
                <div className="space-y-4 flex flex-col items-center lg:items-start">
                  <div className="flex items-center gap-2 px-3 py-1 bg-accent/10 border border-accent/20 rounded-full w-fit">
                    <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_#a78bfa]" />
                    <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] font-bold">Available For Opportunities</span>
                  </div>
                  <h1 className="name-text text-[4rem] md:text-[8rem] tracking-tightest leading-[0.85]">
                    Divy<br />
                    <span className="text-accent">Lathiya</span>
                  </h1>
                  <h2 className="text-2xl md:text-3xl font-sans text-secondary font-light">
                    Computer Science Engineering Student
                  </h2>
                </div>
                
                <p className="text-lg md:text-xl text-secondary max-w-xl leading-relaxed mx-auto lg:mx-0">
                  19-year-old CSE student passionate about technology and innovation. I build real-world solutions through clean code and logical thinking. Gaming and aviation fuel my curiosity — I love understanding how systems work from the inside out.
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-10 py-4 bg-accent text-white font-bold rounded-xl flex items-center gap-2 hover:bg-accent/80 transition-all shadow-[0_0_20px_rgba(167,139,250,0.3)]"
                  >
                    View Projects
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-10 py-4 border border-border text-primary font-bold rounded-xl hover:bg-primary/5 transition-all"
                  >
                    Get in Touch
                  </motion.button>
                </div>
              </div>

              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative group">
                  <div className="absolute inset-0 bg-accent/30 blur-3xl rounded-full group-hover:bg-accent/50 transition-all duration-700" />
                  <div className="relative w-64 h-64 md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-[12px] border-surface shadow-2xl">
                    <img 
                      src="/profile.jpeg" 
                      alt="Divy Lathiya" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Purple halo ring */}
                  <div className="absolute inset-[-4px] border-2 border-accent/40 rounded-full pointer-events-none" />
                </div>
              </div>
            </motion.div>
          </section>

          {/* Academic Journey */}
          <section id="journey" className="py-24">
            <SectionHeading subtitle="My educational background and the path I've taken so far.">
              Academic Journey
            </SectionHeading>

            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-border/20 before:via-border before:to-accent">
              {ACADEMIC_JOURNEY.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-bg group-hover:border-accent group-hover:bg-accent/10 transition-all duration-500 z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    {item.current ? <div className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" /> : item.icon}
                  </div>
                  
                  <a 
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 group-hover:border-accent/30 transition-all duration-500 block hover:bg-primary/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-mono text-accent uppercase tracking-wider">{item.period}</span>
                      {item.current && <span className="text-[10px] bg-accent/20 text-accent px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">Active</span>}
                    </div>
                    <h3 className="text-xl font-bold font-sans text-primary mb-1 tracking-tight">{item.institution}</h3>
                    <p className="text-secondary text-sm">{item.degree}</p>
                  </a>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="py-24">
            <SectionHeading subtitle="The technologies and tools I excel at and use daily.">
              Stack
            </SectionHeading>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {SKILLS.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="skill-pill h-24 flex flex-col justify-center items-center text-center gap-2 group"
                >
                  <i className={cn(skill.class, "text-3xl text-secondary group-hover:text-accent transition-colors")}></i>
                  <span className="text-sm font-medium">{skill.name}</span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="py-24">
            <SectionHeading subtitle="A selection of my recent works ranging from web apps to mobile solutions.">
              Projects
            </SectionHeading>

            <div className="grid md:grid-cols-2 gap-8">
              {PROJECTS.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-accent/10 rounded-2xl blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-card overflow-hidden h-full flex flex-col group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 block"
                  >
                    <div className="aspect-video bg-surface flex items-center justify-center border-b border-border relative">
                      <div className="p-12 opacity-50 group-hover:scale-110 transition-transform duration-700">
                        {project.category === 'Web App' ? <Globe className="w-20 h-20" /> : <Smartphone className="w-20 h-20" />}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/80 to-transparent" />
                    </div>
                    
                    <div className="p-8 space-y-4 flex-grow flex flex-col">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-bold font-syne group-hover:text-accent transition-colors text-primary">{project.title}</h3>
                        <div className="flex gap-2">
                          <div className="p-2 bg-primary/5 group-hover:bg-primary text-primary group-hover:text-bg rounded-full transition-all duration-300">
                            <Github className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                      <p className="text-secondary flex-grow">{project.description}</p>
                      <div className="pt-4 flex items-center text-xs font-bold text-accent uppercase tracking-widest gap-2">
                        View Project on GitHub
                        <div className="h-px flex-grow bg-accent/20" />
                        <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </a>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <a 
                href="https://github.com/DivyLathiya" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-surface border border-border rounded-full hover:bg-primary hover:text-bg transition-all duration-300 font-bold"
              >
                More on GitHub
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-24">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <SectionHeading subtitle="Open for collaborations and interesting projects. Feel free to reach out!">
                  Get in touch
                </SectionHeading>

                <div className="space-y-8 mt-12">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-surface border border-border rounded-2xl flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-mono text-secondary uppercase tracking-widest">Email Me</p>
                      <a href="mailto:contact@divylathiya.page" className="text-lg font-bold hover:text-accent transition-colors text-primary">contact@divylathiya.page</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 bg-surface border border-border rounded-2xl flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-colors">
                      <Linkedin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-mono text-secondary uppercase tracking-widest">LinkedIn</p>
                      <a href="https://www.linkedin.com/in/divy-lathiya-01b8032aa/" target="_blank" rel="noreferrer" className="text-lg font-bold hover:text-accent transition-colors text-primary">Profile</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 md:p-12">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-mono text-secondary uppercase tracking-widest">Name</label>
                    <input 
                      {...register('name')}
                      className={cn(
                        "w-full bg-bg border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors text-primary",
                        errors.name && "border-red-500"
                      )}
                      placeholder="Your Name"
                    />
                    {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-mono text-secondary uppercase tracking-widest">Email</label>
                    <input 
                      {...register('email')}
                      className={cn(
                        "w-full bg-bg border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors text-primary",
                        errors.email && "border-red-500"
                      )}
                      placeholder="Your Email Address"
                    />
                    {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-mono text-secondary uppercase tracking-widest">Message</label>
                    <textarea 
                      {...register('message')}
                      rows={5}
                      className={cn(
                        "w-full bg-bg border border-border rounded-xl px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none text-primary",
                        errors.message && "border-red-500"
                      )}
                      placeholder="Hi Divy, I'd like to talk about..."
                    />
                    {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-accent hover:bg-accent/80 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {formStatus === 'success' && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="text-center text-green-500 font-medium"
                      >
                        Message sent successfully!
                      </motion.p>
                    )}
                    {formStatus === 'error' && (
                      <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center text-red-500 font-medium"
                      >
                        Something went wrong. Please try again.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-border py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-2xl font-syne font-bold tracking-tighter text-accent">DL</h2>
              <p className="text-secondary text-sm">© {new Date().getFullYear()} Divy Lathiya. All rights reserved.</p>
            </div>
            
            <div className="flex gap-6">
              <a href="https://github.com/DivyLathiya" className="text-secondary hover:text-primary transition-colors"><Github className="w-6 h-6" /></a>
              <a href="https://www.linkedin.com/in/divy-lathiya-01b8032aa/" className="text-secondary hover:text-primary transition-colors"><Linkedin className="w-6 h-6" /></a>
              <a href="mailto:contact@divylathiya.page" className="text-secondary hover:text-primary transition-colors"><Mail className="w-6 h-6" /></a>
            </div>
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
}
