import { useEffect, useState } from 'react';
import { cursorManager } from '../lib/cursor';

export default function CursorAwareComponent() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Simulace přihlášení uživatele
    cursorManager.setAuthenticated(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorManager.updatePosition(e.clientX, e.clientY)) {
        setPosition(cursorManager.getPosition());
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="cursor-aware-container">
      <h2>Cursor Position</h2>
      <p>X: {position.x}, Y: {position.y}</p>
    </div>
  );
} 