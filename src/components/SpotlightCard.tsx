import type { ElementType, MouseEvent, ReactNode } from 'react';

interface SpotlightCardProps {
  /** HTML tag to render (use "article" / "li" for better semantics). */
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/**
 * A card with a soft glow that follows the cursor.
 * It only writes two CSS variables (no React re-render), the glow itself lives in index.css (.spotlight).
 */
export default function SpotlightCard({ as: Tag = 'div', className = '', children }: SpotlightCardProps) {
  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
  };

  return (
    <Tag onMouseMove={handleMove} className={`card spotlight ${className}`}>
      {children}
    </Tag>
  );
}
