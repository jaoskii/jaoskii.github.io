'use client';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Twitter, User } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';

const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } });
const fadeIn = (delay = 0) => ({ initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } });

/* EVA-style corner mark */
function Corner({ className }: { className: string }) {
  return (
    <span className={`absolute w-4 h-4 ${className}`}>
      <span className="absolute top-0 left-0 w-full h-px bg-accent-green" />
      <span className="absolute top-0 left-0 w-px h-full bg-accent-green" />
    </span>
  );
}
function CornerBR({ className }: { className: string }) {
  return (
    <span className={`absolute w-4 h-4 ${className}`}>
      <span className="absolute bottom-0 right-0 w-full h-px bg-accent-orange" />
      <span className="absolute bottom-0 right-0 w-px h-full bg-accent-orange" />
    </span>
  );
}

export function HeroSection() {
  const initials = personalInfo.nickname.slice(0, 3).toUpperCase();

  return (
    <section id='hero' className='relative min-h-screen flex flex-col justify-center px-6 pt-20'>

      {/* EVA Unit-01 glow — violet + orange */}
      <div className='absolute top-1/3 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute top-1/2 right-1/4 w-72 h-72 bg-accent-orange/6 rounded-full blur-3xl pointer-events-none' />

      <div className='max-w-6xl mx-auto w-full relative z-10 grid md:grid-cols-2 gap-12 items-center'>

        {/* Left — text */}
        <div>
          <motion.p {...fadeUp(0.1)} className='font-mono text-accent text-sm tracking-widest mb-6 uppercase'>
            Hi, I&apos;m {personalInfo.nickname} ({personalInfo.name}) 👋
          </motion.p>

          <motion.h1 {...fadeUp(0.25)} className='text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary tracking-tight leading-none mb-6'>
            {personalInfo.tagline.split(' ').map((word, i) => (
              <span key={i} className={i === 2 ? 'text-accent' : ''}>
                {word}{' '}
              </span>
            ))}
          </motion.h1>

          <motion.p {...fadeUp(0.4)} className='text-text-secondary text-lg md:text-xl leading-relaxed mb-10'>
            {personalInfo.bio}
          </motion.p>

          <motion.div {...fadeUp(0.55)} className='flex flex-wrap items-center gap-4'>
            <a href='#projects' className='px-6 py-3 bg-accent text-bg-primary font-semibold rounded text-sm hover:bg-accent-dim transition-colors duration-200'>
              View my work
            </a>
            <a href='#contact' className='px-6 py-3 border border-border text-text-secondary rounded text-sm hover:border-border-light hover:text-text-primary transition-colors duration-200'>
              Get in touch
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div {...fadeUp(0.7)} className='flex items-center gap-5 mt-10'>
            {[
              { href: personalInfo.github, icon: Github, label: 'GitHub' },
              { href: personalInfo.linkedin, icon: Linkedin, label: 'LinkedIn' },
              { href: personalInfo.twitter, icon: Twitter, label: 'Twitter' },
            ].map(({ href, icon: Icon, label }) => (
              <a key={label} href={href} target='_blank' rel='noopener noreferrer' aria-label={label} className='text-text-muted hover:text-accent transition-colors duration-200'>
                <Icon size={20} />
              </a>
            ))}
            <div className='h-px w-8 bg-border' />
            {personalInfo.availableForWork && (
              <span className='flex items-center gap-2 text-xs font-mono text-accent-green'>
                <span className='w-2 h-2 rounded-full bg-accent-green animate-pulse' />
                Available for work
              </span>
            )}
          </motion.div>
        </div>

        {/* Right — photo placeholder */}
        <motion.div {...fadeIn(0.4)} className='hidden md:flex justify-center items-center'>
          <div className='relative w-72 h-80 lg:w-80 lg:h-96'>
            {/* Offset shadow card */}
            <div className='absolute inset-0 translate-x-3 translate-y-3 bg-accent/10 border border-accent/20' />

            {/* Main card */}
            <div className='relative w-full h-full bg-bg-card border border-border flex flex-col items-center justify-center gap-4 overflow-hidden'>
              {/* Scan line */}
              <div className='absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-green/40 to-transparent' />
              <div className='absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-orange/40 to-transparent' />

              {/* Placeholder content */}
              <div className='w-20 h-20 rounded-full bg-bg-hover border border-border flex items-center justify-center'>
                <User size={36} className='text-text-muted' />
              </div>
              <div className='text-center'>
                <p className='font-mono text-accent text-xs tracking-widest uppercase'>{initials}.jpg</p>
                <p className='text-text-muted text-[10px] font-mono mt-1'>// replace with your photo</p>
              </div>

              {/* EVA corner marks */}
              <Corner className='top-3 left-3' />
              <span className='absolute top-3 right-3 w-4 h-4'>
                <span className='absolute top-0 right-0 w-full h-px bg-accent-green' />
                <span className='absolute top-0 right-0 w-px h-full bg-accent-green' />
              </span>
              <CornerBR className='bottom-3 right-3' />
              <span className='absolute bottom-3 left-3 w-4 h-4'>
                <span className='absolute bottom-0 left-0 w-full h-px bg-accent-orange' />
                <span className='absolute bottom-0 left-0 w-px h-full bg-accent-orange' />
              </span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }} className='absolute bottom-10 left-1/2 -translate-x-1/2 text-text-muted animate-bounce'>
        <ArrowDown size={18} />
      </motion.div>
    </section>
  );
}
