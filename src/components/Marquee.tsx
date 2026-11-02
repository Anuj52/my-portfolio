import { SKILLS } from '../constants';

const ITEMS = SKILLS.flatMap((group) => group.skills);

/**
 * Decorative, slowly scrolling strip of every skill.
 * It is hidden from screen readers because the Skills section already lists the same content.
 */
export default function Marquee() {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-line bg-surface/50 py-6 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
        {/* The list is rendered twice so the loop is seamless (the track moves -50%). */}
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 gap-4 pr-4">
            {ITEMS.map((skill) => (
              <li key={skill} className="chip chip-hover whitespace-nowrap">
                {skill}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
