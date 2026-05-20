import type { Platform } from "@/data/platforms";

/**
 * Renders a platform's brand mark inside a colored, rounded tile.
 *
 * Simple-icons sources come from `cdn.simpleicons.org/<slug>/white` so we
 * paint the official brand logo in white over the brand color. Custom and
 * monogram fallbacks keep the listing dense without missing tiles.
 */
export function PlatformLogo({
  platform,
  size = 40,
  rounded = "rounded-xl",
  className,
}: {
  platform: Platform;
  size?: number;
  rounded?: string;
  className?: string;
}) {
  const inner = size <= 32 ? size * 0.55 : size * 0.6;
  const fontSize = Math.max(10, size * (platform.logo.kind === "monogram" && platform.logo.letters.length > 1 ? 0.32 : 0.46));
  const textColor = platform.logoOnDark === false ? "#111" : "#fff";

  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center shrink-0 overflow-hidden shadow-sm ring-1 ring-black/5 ${rounded} ${className ?? ""}`}
      style={{ background: platform.brandColor, width: size, height: size }}
    >
      {platform.logo.kind === "simple-icons" ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`https://cdn.simpleicons.org/${platform.logo.slug}/${platform.logoOnDark === false ? "111111" : "ffffff"}`}
          alt=""
          width={inner}
          height={inner}
          style={{ width: inner, height: inner }}
        />
      ) : platform.logo.kind === "custom" ? (
        <svg
          viewBox="0 0 24 24"
          width={inner}
          height={inner}
          fill={textColor}
          aria-hidden
        >
          <path d={platform.logo.path} />
        </svg>
      ) : (
        <span
          style={{
            color: textColor,
            fontSize,
            fontWeight: 800,
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          {platform.logo.letters}
        </span>
      )}
    </span>
  );
}
