import { useEffect, useState, useCallback, useRef } from 'react';

interface CustomCursorProps {
  mousePosition: { x: number; y: number };
}

const CustomCursor = ({ mousePosition }: CustomCursorProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>(0);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const trailRef = useRef<Array<{ x: number; y: number; id: number }>>([]);
  const [trails, setTrails] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  useEffect(() => {
    // Add event listeners for hover states
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .cursor-pointer');
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      
      // Clean up animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseEnter, handleMouseLeave]);

  // Optimize trail effect with throttling
  useEffect(() => {
    // Throttle trail updates to prevent excessive re-renders
    const now = Date.now();
    const lastTrail = trailRef.current[0];
    
    // Only update if position changed significantly or enough time has passed
    if (!lastTrail || 
        Math.abs(lastTrail.x - mousePosition.x) > 3 || 
        Math.abs(lastTrail.y - mousePosition.y) > 3 ||
        (now - lastTrail.id) > 16) { // ~60fps limit
      
      const newTrail = {
        x: mousePosition.x,
        y: mousePosition.y,
        id: now
      };
      
      // Update ref immediately
      trailRef.current = [newTrail, ...trailRef.current.slice(0, 2)]; // Keep only 3 trails
      
      // Update state with throttling
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setTrails(trailRef.current);
      });
    }
    
    // Update last position
    lastPositionRef.current = { x: mousePosition.x, y: mousePosition.y };
  }, [mousePosition.x, mousePosition.y]);

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          transform: 'translate3d(0, 0, 0)',
          willChange: 'transform',
          transition: isHovering ? 'transform 0.15s ease-out, scale 0.15s ease-out' : 'transform 0.15s ease-out, scale 0.15s ease-out'
        }}
      >
        <div className={`w-3 h-3 rounded-full transition-all duration-150 ${
          isHovering 
            ? 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-400/50 scale-125' 
            : 'bg-gradient-to-r from-blue-400 to-purple-500 shadow-md shadow-blue-400/30 scale-100'
        }`} />
      </div>

      {/* Cursor trails */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: trail.x - 1,
            top: trail.y - 1,
            opacity: Math.max(0.1, 0.6 - (index * 0.25)),
            transform: `scale(${Math.max(0.3, 1 - (index * 0.25))})`,
            willChange: 'transform, opacity',
            transition: 'opacity 0.2s ease-out'
          }}
        >
          <div className={`w-2 h-2 rounded-full ${
            isHovering ? 'bg-amber-400/40' : 'bg-blue-400/40'
          }`} />
        </div>
      ))}

      {/* Outer ring */}
      <div
        className="fixed pointer-events-none z-[9997] transition-all duration-200 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          willChange: 'transform',
          transition: isHovering ? 'transform 0.2s ease-out, scale 0.2s ease-out' : 'transform 0.2s ease-out, scale 0.2s ease-out'
        }}
      >
        <div className={`w-8 h-8 rounded-full border-2 ${
          isHovering 
            ? 'border-amber-400/60 scale-150' 
            : 'border-blue-400/30 scale-100'
        }`} />
      </div>
    </>
  );
};

export default CustomCursor;