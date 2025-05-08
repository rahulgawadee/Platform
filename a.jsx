import React, { useState, useEffect, useRef } from "react";
import {
  Book,
  Users,
  UserCheck,
  Briefcase,
  ChevronRight,
  Calendar,
  ArrowRight,
  Phone,
  Code,
  HelpCircle,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Sparkles,
  Star,
  Moon,
  Sun,
  Globe,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer.jsx";

export default function Dashboard() {
  const [activeUser, setActiveUser] = useState("admin");
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showStars, setShowStars] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [hoverEffect, setHoverEffect] = useState(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const waveRef = useRef([]);
  const nebulasRef = useRef([]);
  const mouseHoldRef = useRef(false);
  const mouseHoldTimerRef = useRef(null);

  // Canvas background animation
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Initialize particles
    const particleCount = 100;
    particlesRef.current = Array(particleCount).fill().map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      color: `rgba(${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 100) + 100}, 255, ${Math.random() * 0.5 + 0.2})`,
      vx: Math.random() * 0.2 - 0.1,
      vy: Math.random() * 0.2 - 0.1,
      originalRadius: Math.random() * 1.5 + 0.5,
      pulseSpeed: Math.random() * 0.03 + 0.01,
      pulseFactor: 0,
    }));
    
    // Initialize waves
    const waveCount = 3;
    waveRef.current = Array(waveCount).fill().map((_, i) => ({
      amplitude: 50 - i * 10,
      frequency: 0.002 + i * 0.001,
      speed: 0.03 - i * 0.005,
      phase: Math.random() * Math.PI * 2,
      color: `rgba(${80 + i * 20}, ${100 + i * 20}, ${180 + i * 20}, ${0.05 - i * 0.01})`,
    }));
    
    // Initialize nebulas
    const nebulaCount = 5;
    nebulasRef.current = Array(nebulaCount).fill().map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 200 + 100,
      hue: Math.random() * 60 + 220, // Blue-purple hues
      saturation: Math.random() * 40 + 60,
      lightness: Math.random() * 20 + 20,
      alpha: Math.random() * 0.1 + 0.05,
      vx: Math.random() * 0.2 - 0.1,
      vy: Math.random() * 0.2 - 0.1,
    }));
    
    const drawParticles = () => {
      particles: for (const particle of particlesRef.current) {
        // Update pulse animation
        particle.pulseFactor += particle.pulseSpeed;
        const pulseScale = Math.sin(particle.pulseFactor) * 0.5 + 1.5;
        const currentRadius = particle.originalRadius * pulseScale;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Check if particle is near mouse position for attraction/repulsion
        const dx = particle.x - mousePosition.x * window.innerWidth;
        const dy = particle.y - mousePosition.y * window.innerHeight;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If mouse is held down, create attraction effect
        if (mouseHoldRef.current && distance < 200) {
          const force = (200 - distance) / 200 * 0.5;
          particle.vx += (dx / distance) * force * -1;
          particle.vy += (dy / distance) * force * -1;
          
          // Cap velocity
          const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy);
          if (speed > 2) {
            particle.vx = (particle.vx / speed) * 2;
            particle.vy = (particle.vy / speed) * 2;
          }
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Connect close particles with lines
        for (const otherParticle of particlesRef.current) {
          if (particle === otherParticle) continue;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(100, 120, 255, ${(100 - distance) / 500})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };
    
    const drawWaves = () => {
      for (const wave of waveRef.current) {
        wave.phase += wave.speed;
        
        ctx.beginPath();
        for (let x = 0; x <= canvas.width; x += 5) {
          const y = Math.sin(x * wave.frequency + wave.phase) * wave.amplitude + canvas.height / 2;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 10;
        ctx.stroke();
      }
    };
    
    const drawNebulas = () => {
      for (const nebula of nebulasRef.current) {
        // Update position with very slow movement
        nebula.x += nebula.vx;
        nebula.y += nebula.vy;
        
        // Wrap around edges
        if (nebula.x < -nebula.radius) nebula.x = canvas.width + nebula.radius;
        if (nebula.x > canvas.width + nebula.radius) nebula.x = -nebula.radius;
        if (nebula.y < -nebula.radius) nebula.y = canvas.height + nebula.radius;
        if (nebula.y > canvas.height + nebula.radius) nebula.y = -nebula.radius;
        
        // Create radial gradient
        const gradient = ctx.createRadialGradient(
          nebula.x, nebula.y, 0,
          nebula.x, nebula.y, nebula.radius
        );
        
        gradient.addColorStop(0, `hsla(${nebula.hue}, ${nebula.saturation}%, ${nebula.lightness + 10}%, ${nebula.alpha})`);
        gradient.addColorStop(0.5, `hsla(${nebula.hue}, ${nebula.saturation}%, ${nebula.lightness}%, ${nebula.alpha * 0.6})`);
        gradient.addColorStop(1, `hsla(${nebula.hue}, ${nebula.saturation}%, ${nebula.lightness - 10}%, 0)`);
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    // Animate the canvas
    const animate = () => {
      if (!canvasRef.current) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw only in dark mode
      if (isDarkMode) {
        // Draw background - deep space
        ctx.fillStyle = "rgba(8, 8, 28, 0.2)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        drawNebulas();
        drawWaves();
        drawParticles();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [isDarkMode]);
  
  // Mouse position tracking for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Mouse hold tracking for particle attraction
  useEffect(() => {
    const handleMouseDown = () => {
      // Use a timer to prevent accidental clicks from triggering the effect
      mouseHoldTimerRef.current = setTimeout(() => {
        mouseHoldRef.current = true;
      }, 100);
    };
    
    const handleMouseUp = () => {
      if (mouseHoldTimerRef.current) {
        clearTimeout(mouseHoldTimerRef.current);
      }
      mouseHoldRef.current = false;
    };
    
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseleave", handleMouseUp);
    
    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseleave", handleMouseUp);
      if (mouseHoldTimerRef.current) {
        clearTimeout(mouseHoldTimerRef.current);
      }
    };
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Stars animation with varying frequencies
  useEffect(() => {
    setShowStars(true);
    const interval = setInterval(() => {
      setShowStars((prev) => !prev);
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  const userTypes = [
    {
      key: "admin",
      label: "Education Manager",
      info: "Oversee users and operations",
      bg: "bg-indigo-100",
      outline: "border-indigo-500",
      icon: <Briefcase className="text-indigo-500" size={20} />,
    },
    {
      key: "tutor",
      label: "Teacher",
      info: "Conduct classes and evaluate learning",
      bg: "bg-amber-100",
      outline: "border-amber-500",
      icon: <Book className="text-amber-500" size={20} />,
    },
    {
      key: "student",
      label: "Student",
      info: "Access sessions and study freely",
      bg: "bg-lime-100",
      outline: "border-lime-500",
      icon: <UserCheck className="text-lime-500" size={20} />,
    },
    {
      key: "employee",
      label: "Employee",
      info: "Monitor fees and student activities",
      bg: "bg-rose-100",
      outline: "border-rose-500",
      icon: <Users className="text-rose-500" size={20} />,
    },
  ];

  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const FloatingDots = ({
    count = 20,
    colors = ["bg-indigo-500", "bg-purple-500", "bg-blue-500"],
    containerClass = "",
  }) => {
    const [dots, setDots] = useState([]);

    useEffect(() => {
      const newDots = [];

      for (let i = 0; i < count; i++) {
        newDots.push({
          id: i,
          size: Math.random() * 6 + 3, // 3-9px
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 20 + 15, // 15-35s
          delay: Math.random() * 10,
        });
      }

      setDots(newDots);
    }, [count, colors]);

    return (
      <div
        className={`absolute inset-0 overflow-hidden pointer-events-none ${containerClass}`}
      >
        {dots.map((dot) => (
          <div
            key={dot.id}
            className={`absolute rounded-full opacity-20 animate-floating ${dot.color}`}
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              left: `${dot.x}%`,
              top: `${dot.y}%`,
              animationDuration: `${dot.duration}s`,
              animationDelay: `${dot.delay}s`,
              transform: `translate(
                ${mousePosition.x * -20}px, 
                ${mousePosition.y * -20}px
              )`,
            }}
          ></div>
        ))}
      </div>
    );
  };

  // StarField component for cosmic background animation
  const StarField = ({ active }) => {
    const [stars, setStars] = useState([]);

    useEffect(() => {
      const newStars = [];
      const count = 150;

      for (let i = 0; i < count; i++) {
        newStars.push({
          id: i,
          size: Math.random() * 2 + 1,
          x: Math.random() * 100,
          y: Math.random() * 100,
          animationDuration: Math.random() * 3 + 2,
          animationDelay: Math.random() * 5,
          pulseSpeed: Math.random() > 0.7, // Some stars pulse, others just twinkle
        });
      }

      setStars(newStars);
    }, []);

    if (!active) return null;

    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden animate-fadeIn">
        {stars.map((star) => (
          <div
            key={star.id}
            className={`absolute rounded-full bg-white ${star.pulseSpeed ? 'animate-pulse' : 'animate-twinkle'}`}
            style={{
              width: `${star.size}px`,
              height: `${star.size}px`,
              left: `${star.x}%`,
              top: `${star.y}%`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${star.animationDuration}s`,
              animationDelay: `${star.animationDelay}s`,
            }}
          ></div>
        ))}
      </div>
    );
  };

  // Shooting Star component
  const ShootingStar = () => {
    const [position, setPosition] = useState({
      top: Math.random() * 30 + 5,
      left: Math.random() * 30 + 60,
      size: Math.random() * 100 + 100,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 5,
    });

    useEffect(() => {
      const interval = setInterval(() => {
        setPosition({
          top: Math.random() * 30 + 5,
          left: Math.random() * 30 + 60,
          size: Math.random() * 100 + 100,
          duration: Math.random() * 2 + 1,
          delay: Math.random() * 5,
        });
      }, 6000);
      return () => clearInterval(interval);
    }, []);

    return (
      <div
        className="absolute bg-gradient-to-r from-white via-indigo-300 to-transparent rounded-full animate-shootingStar z-10"
        style={{
          top: `${position.top}%`,
          left: `${position.left}%`,
          width: `${position.size}px`,
          height: `2px`,
          boxShadow: "0 0 4px 1px rgba(255, 255, 255, 0.5)",
          animationDuration: `${position.duration}s`,
          animationDelay: `${position.delay}s`,
          opacity: 0,
        }}
      ></div>
    );
  };

  // Collection of multiple shooting stars
  const ShootingStars = () => {
    return (
      <>
        <ShootingStar />
        <ShootingStar />
        <ShootingStar />
      </>
    );
  };

  // Animated logo component with hover effects
  const AnimatedLogo = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <div
        className="relative w-10 h-10 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg
          className={`w-10 h-10 transition-transform duration-700 ${
            isHovered ? "animate-spinSlow" : ""
          }`}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 5L30 10V30L20 35L10 30V10L20 5Z"
            fill="#6366F1"
            className={`transition-all duration-500 ${
              isHovered ? "fill-indigo-400" : ""
            }`}
          />
          <path
            d="M20 5L30 10L20 15L10 10L20 5Z"
            fill="#818CF8"
            className={`transition-all duration-500 ${
              isHovered ? "fill-indigo-300 animate-pulse" : ""
            }`}
          />
          <path
            d="M20 15L30 10V30L20 35V15Z"
            fill="#4F46E5"
            className={`transition-all duration-500 ${
              isHovered ? "fill-indigo-600" : ""
            }`}
          />
          <path
            d="M20 15L10 10V30L20 35V15Z"
            fill="#A5B4FC"
            className={`transition-all duration-500 ${
              isHovered ? "fill-indigo-200" : ""
            }`}
          />
        </svg>
        {isHovered && (
          <>
            <div className="absolute -inset-1 bg-indigo-500 rounded-full filter blur-md opacity-30 animate-pulse"></div>
            <div className="absolute -inset-3 bg-indigo-500 rounded-full filter blur-lg opacity-10 animate-pulse animation-delay-500"></div>
          </>
        )}
      </div>
    );
  };

  // Animated card component
  const AnimatedCard = ({ children, className, delay = 0, id }) => {
    return (
      <div
        id={id}
        className={`animate-on-scroll ${className} ${
          isVisible[id]
            ? "opacity-100 translate-x-0 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
        style={{
          transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
        }}
      >
        {children}
      </div>
    );
  };

  // Mouse cursor follower
  const CursorFollower = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const [isClicking, setIsClicking] = useState(false);

    useEffect(() => {
      const handleMouseMove = (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
      };

      const handleMouseLeave = () => {
        setIsVisible(false);
      };
      
      const handleMouseDown = () => {
        setIsClicking(true);
      };
      
      const handleMouseUp = () => {
        setIsClicking(false);
      };

      window.addEventListener("mousemove", handleMouseMove);
      document.body.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.body.removeEventListener("mouseleave", handleMouseLeave);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, []);

    return (
      <div
        className={`fixed pointer-events-none z-50 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.3s ease-out, transform 0.15s ease-out",
        }}
      >
        <div 
          className={`rounded-full border-2 transition-all duration-200 ${
            isClicking 
              ? "w-4 h-4 border-indigo-300 bg-indigo-500 bg-opacity-30" 
              : "w-6 h-6 border-indigo-400"
          }`}
        ></div>
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-400 animate-ping transition-all duration-300 ${
            isClicking ? "w-12 h-12 opacity-30" : "w-10 h-10 opacity-20"
          }`}
        ></div>
      </div>
    );
  };

  // Interactive button with ripple effect
  const RippleButton = ({ children, onClick, className }) => {
    const [ripples, setRipples] = useState([]);

    const handleClick = (e) => {
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newRipple = {
        id: Date.now(),
        x,
        y,
      };

      setRipples([...ripples, newRipple]);

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 1000);

      if (onClick) onClick(e);
    };

    return (
      <button
        className={`relative overflow-hidden ${className}`}
        onClick={handleClick}
      >
        {ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="absolute bg-white bg-opacity-30 rounded-full animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        {children}
      </button>
    );
  };

  // Animated globe with rotating effect
  const AnimatedGlobe = () => {
    return (
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-indigo-300 border-dashed animate-spin-slow"></div>
        <div className="absolute inset-2 rounded-full border border-indigo-400 border-dotted animate-spin-reverse"></div>
        <Globe size={28} className="text-indigo-200" />
      </div>
    );
  };
  
  // Particles explosion effect
  const ParticlesExplosion = ({ active }) => {
    const [particles, setParticles] = useState([]);
    
    useEffect(() => {
      if (!active) return;
      
      const count = 30;
      const newParticles = [];
      
      for (let i = 0; i < count; i++) {
        newParticles.push({
          id: i,
          x: 50,
          y: 50,
          size: Math.random() * 6 + 2,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          color: `hsl(${220 + Math.random() * 40}, 80%, 60%)`,
        });
      }
      
      setParticles(newParticles);
      
      // Clean up
      return () => setParticles([]);
    }, [active]);
    
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-particleExplosion"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              transform: `translate(${p.vx * 10}vw, ${p.vy * 10}vh)`,
            }}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className={`min-h-screen font-sans overflow-hidden relative ${
      isDarkMode
        ? "bg-gradient-to-b from-gray-900 to-black text-gray-200"
        : "bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800"
    }`}>
      {/* Dynamic background canvas */}
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
      />
      
      {isDarkMode && (
        <>
          <StarField active={showStars} />
          <ShootingStars />
        </>
      )}
      
      <CursorFollower />

      {/* Header with improved navigation */}
      <header
        className={`sticky top-0 z-40 py-4 px-8 backdrop-filter backdrop-blur-lg shadow-xl transition-all duration-500 ${
          isDarkMode
            ? "bg-gray-900 bg-opacity-70 border-b border-gray-800"
            : "bg-white bg-opacity-70 border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Left side */}
          <div className="flex items-center gap-3 group">
            <AnimatedLogo />
            <div className="transition-all duration-300 group-hover:translate-x-1">
              <h1 className={`text-xl font-bold tracking-wide ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                NovaSuite
              </h1>
              <p className="text-xs overflow-hidden whitespace-nowrap">
                <span className="animate-typewriter inline-block">
                  Education Management Platform
                </span>
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-full transition-all duration-300 transform hover:scale-110 ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-gray-300 shadow-inner shadow-black/30"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700 shadow shadow-gray-300/30"
              }`}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="hidden md:flex items-center gap-3">
              <button className={`px-4 py-2 text-sm font-medium transition relative group ${
                isDarkMode ? "text-gray-200" : "text-gray-700"
              }`}>
                Login
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 transition-all duration-300 group-hover:w-full`}></span>
              </button>
              <button className={`px-5 py-2 text-sm font-medium rounded-lg ${
                isDarkMode 
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                  : "bg-indigo-500 hover:bg-indigo-600 text-white"
              } transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20`}>
                Get Started
              </button>
            </div>
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column with user role selection */}
          <div className="col-span-1">
            <AnimatedCard id="user-roles" className="mb-8">
              <div className={`p-6 rounded-2xl shadow-lg transition-all duration-300 ${
                isDarkMode 
                  ? "bg-gray-800 bg-opacity-70 border border-gray-700 hover:border-gray-600" 
                  : "bg-white hover:shadow-xl"
              }`}>
                <h2 className="text-xl font-semibold mb-6 flex items-center">
                  <span className="mr-2">Select User Role</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    Demo
                  </span>
                </h2>
                <div className="space-y-3">
                  {userTypes.map((type) => (
                    <button
                      key={type.key}
                      className={`w-full p-4 rounded-xl flex items-center transition-all duration-300 ${
                        activeUser === type.key
                          ? `border-2 ${type.outline} ${type.bg} shadow-md`
                          : `border border-gray-200 ${isDarkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`
                      }`}
                      onClick={() => setActiveUser(type.key)}
                    >
                      <div className={`p-2 rounded-lg ${
                        activeUser === type.key
                          ? type.bg
                          : isDarkMode ? "bg-gray-700" : "bg-gray-100"
                      }`}>
                        {type.icon}
                      </div>
                      <div className="ml-4 text-left">
                        <p className="font-medium">{type.label}</p>
                        <p className="text-sm opacity-70">{type.info}</p>
                      </div>
                      {activeUser === type.key && (
                        <ChevronRight size={18} className="ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </AnimatedCard>

            <AnimatedCard id="quick-stats" delay={200}>
              <div className={`p-6 rounded-2xl shadow-lg ${
                isDarkMode 
                  ? "bg-gray-800 bg-opacity-70 border border-gray-700" 
                  : "bg-white"
              }`}>
                <h2 className="text-xl font-semibold mb-6">Quick Stats</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-xl ${
                    isDarkMode ? "bg-gray-700" : "bg-indigo-50"
                  }`}>
                    <p className="text-xs uppercase font-medium opacity-70">Students</p>
                    <p className="text-2xl font-bold">2,453</p>
                    <p className="text-xs flex items-center text-green-500">
                      <ArrowRight size={12} className="transform rotate-45 mr-1" />
                      +5.2%
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl ${
                    isDarkMode ? "bg-gray-700" : "bg-amber-50"
                  }`}>
                    <p className="text-xs uppercase font-medium opacity-70">Courses</p>
                    <p className="text-2xl font-bold">128</p>
                    <p className="text-xs flex items-center text-green-500">
                      <ArrowRight size={12} className="transform rotate-45 mr-1" />
                      +2.4%
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl ${
                    isDarkMode ? "bg-gray-700" : "bg-rose-50"
                  }`}>
                    <p className="text-xs uppercase font-medium opacity-70">Teachers</p>
                    <p className="text-2xl font-bold">64</p>
                    <p className="text-xs flex items-center text-amber-500">
                      <ArrowRight size={12} className="transform rotate-90 mr-1" />
                      0%
                    </p>
                  </div>
                  <div className={`p-4 rounded-xl ${
                    isDarkMode ? "bg-gray-700" : "bg-lime-50"
                  }`}>
                    <p className="text-xs uppercase font-medium opacity-70">Revenue</p>
                    <p className="text-2xl font-bold">$45.2k</p>
                    <p className="text-xs flex items-center text-green-500">
                      <ArrowRight size={12} className="transform rotate-45 mr-1" />
                      +12.5%
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>

          {/* Center and right columns with main dashboard content */}
          <div className="col-span-1 lg:col-span-2 space-y-8">
            <AnimatedCard id="welcome-card">
              <div className={`relative overflow-hidden p-8 rounded-2xl shadow-lg ${
                isDarkMode 
                  ? "bg-gray-800 bg-opacity-70 border border-gray-700" 
                  : "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
              }`}>
                <FloatingDots count={30} containerClass="absolute inset-0" />
                <div className="relative z-10">
                  <div className="flex items-start justify-between">
                    <div>
                      <h1 className="text-3xl font-bold">
                        Welcome back, Admin
                      </h1>
                      <p className="mt-2 opacity-80 max-w-lg">
                        Your educational dashboard is ready. You have 5 new notifications and 3 pending reports to review this week.
                      </p>
                    </div>
                    <AnimatedGlobe />
                  </div>
                  
                  <div className="mt-8 flex flex-wrap gap-4">
                    <RippleButton 
                      className={`px-5 py-3 rounded-xl font-medium ${
                        isDarkMode 
                          ? "bg-indigo-600 hover:bg-indigo-700 text-white" 
                          : "bg-white hover:bg-gray-50 text-indigo-700"
                      }`}
                    >
                      <span className="flex items-center">
                        <Calendar size={18} className="mr-2" />
                        Schedule Session
                      </span>
                    </RippleButton>
                    <RippleButton 
                      className={`px-5 py-3 rounded-xl font-medium ${
                        isDarkMode 
                          ? "bg-gray-700 hover:bg-gray-600 text-white" 
                          : "bg-indigo-700 hover:bg-indigo-800 text-white"
                      }`}
                    >
                      <span className="flex items-center">
                        <Code size={18} className="mr-2" />
                        View Reports
                      </span>
                    </RippleButton>
                    <RippleButton 
                      className={`px-5 py-3 rounded-xl font-medium ${
                        isDarkMode 
                          ? "bg-gray-700 hover:bg-gray-600 text-white" 
                          : "bg-indigo-100 hover:bg-indigo-200 text-indigo-700"
                      }`}
                    >
                      <span className="flex items-center">
                        <HelpCircle size={18} className="mr-2" />
                        Get Help
                      </span>
                    </RippleButton>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AnimatedCard id="calendar-card" delay={100}>
                <div className={`p-6 rounded-2xl h-full shadow-lg ${
                  isDarkMode 
                    ? "bg-gray-800 bg-opacity-70 border border-gray-700" 
                    : "bg-white"
                }`}>
                  <h2 className="text-xl font-semibold mb-4">Upcoming Schedule</h2>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div 
                        key={item} 
                        className={`p-4 rounded-xl transition-all duration-300 hover:shadow-md ${
                          isDarkMode ? "bg-gray-700 hover:bg-gray-650" : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Mathematics Class {item}</p>
                            <p className="text-sm opacity-70">Room B{item}04</p>
                          </div>
                          <span className="px-2 py-1 rounded text-xs font-medium bg-indigo-100 text-indigo-800">
                            {item === 1 ? "Today" : item === 2 ? "Tomorrow" : "In 3 days"}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center text-sm opacity-70">
                          <Calendar size={14} className="mr-1" />
                          <span>10:0{item} AM - 11:3{item} AM</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className={`mt-4 text-sm font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-800"
                  }`}>
                    View full schedule &rarr;
                  </button>
                </div>
              </AnimatedCard>

              <AnimatedCard id="contacts-card" delay={200}>
                <div className={`p-6 rounded-2xl h-full shadow-lg ${
                  isDarkMode 
                    ? "bg-gray-800 bg-opacity-70 border border-gray-700" 
                    : "bg-white"
                }`}>
                  <h2 className="text-xl font-semibold mb-4">Quick Contacts</h2>
                  <div className="space-y-4">
                    {[
                      { name: "Sarah Johnson", role: "Head Teacher", icon: <Phone size={14} /> },
                      { name: "Michael Edwards", role: "IT Support", icon: <Code size={14} /> },
                      { name: "Emma Williams", role: "Administrator", icon: <Users size={14} /> },
                    ].map((contact, idx) => (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-xl flex items-center transition-all duration-300 hover:shadow-md ${
                          isDarkMode ? "bg-gray-700 hover:bg-gray-650" : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isDarkMode ? "bg-gray-600" : "bg-indigo-100"
                        }`}>
                          <span className={isDarkMode ? "text-indigo-300" : "text-indigo-600"}>
                            {contact.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-xs opacity-70">{contact.role}</p>
                        </div>
                        <button className={`p-2 rounded-full ${
                          isDarkMode ? "bg-gray-600 text-gray-300" : "bg-gray-100 text-gray-600"
                        } hover:bg-indigo-100 hover:text-indigo-600 transition-colors duration-300`}>
                          {contact.icon}
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className={`mt-4 text-sm font-medium transition-colors duration-300 ${
                    isDarkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-800"
                  }`}>
                    View all contacts &rarr;
                  </button>
                </div>
              </AnimatedCard>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with social links */}
      <Footer />
      
      {/* Particles explosion effect when changing themes */}
      <ParticlesExplosion active={hoverEffect} />
    </div>
  );
}