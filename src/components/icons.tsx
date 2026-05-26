import * as React from "react";

type SVGProps = React.SVGProps<SVGSVGElement>;

const KODA_LOGO_SRC = "/seo/logo.svg";

export function AppStoreBadge({
  width = 135,
  height = 41,
  className = "",
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/images/appstore.svg"
      alt="Download on the App Store"
      width={width}
      height={height}
      className={className}
    />
  );
}

export function GooglePlayBadge(props: React.HTMLAttributes<HTMLImageElement>) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src="/images/googleplay.png"
      alt="Get it on Google Play"
      width={135}
      height={41}
      {...props}
    />
  );
}

export function KodaLogo({
  height = 32,
  markSize = height,
  className,
  color = "var(--koda-bear-blue)",
  textFirst = false,
}: {
  height?: number;
  markSize?: number;
  className?: string;
  color?: string;
  textFirst?: boolean;
}) {
  const fontSize = Math.round(height * 0.8);
  const logoHeight = Math.max(height, markSize);
  const mark = (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={KODA_LOGO_SRC}
      alt=""
      aria-hidden
      width={markSize}
      height={markSize}
      className="block shrink-0 object-contain"
      style={{ width: markSize, height: markSize }}
    />
  );
  const wordmark = (
    <span
      aria-hidden
      className="inline-flex items-center font-extrabold leading-none"
      style={{
        color,
        fontFamily:
          'var(--font-koda-title, "Manrope"), ui-sans-serif, system-ui, sans-serif',
        fontSize,
        fontWeight: 800,
        height: logoHeight,
      }}
    >
      koda
    </span>
  );

  return (
    <span
      role="img"
      aria-label="Koda"
      className={`inline-flex items-center gap-[0.22em] align-middle leading-none ${className ?? ""}`}
      style={{ color, height: logoHeight }}
    >
      {textFirst ? (
        <>
          {wordmark}
          {mark}
        </>
      ) : (
        <>
          {mark}
          {wordmark}
        </>
      )}
    </span>
  );
}

export function HamburgerIcon(props: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
}

export function CloseIcon(props: SVGProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AppleLogoIcon(props: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={19}
      height={23}
      viewBox="0 0 19 23"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.721 0c.105 1.361-.314 2.618-1.152 3.665-.838 1.047-1.99 1.675-3.351 1.675-.105-1.36.314-2.618 1.152-3.56C11.208.733 12.465.105 13.72 0Zm4.294 7.749c-1.572.942-2.514 2.618-2.514 4.398 0 1.99 1.152 3.875 3.036 4.503-.314 1.152-.838 2.304-1.571 3.36-1.047 1.466-2.094 2.93-3.79 2.93s-2.094-.942-4.084-.942c-1.886 0-2.618.97-4.084.97-1.676 0-2.828-1.36-3.875-2.93C-.314 17.65-1.047 13.881.105 11.367c.733-1.78 2.304-2.932 4.084-2.932 1.676 0 3.142.942 4.084.942.942 0 2.723-1.047 4.503-.94.733.034 2.828.314 4.188 2.198l-.314.105L18.015 7.749Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function GoogleLogoIcon(props: SVGProps) {
  return (
    <svg viewBox="0 0 24 24" width={20} height={20} {...props}>
      <path
        fill="#EA4335"
        d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
      />
      <path
        fill="#34A853"
        d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
      />
      <path
        fill="#4A90E2"
        d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
      />
      <path
        fill="#FBBC05"
        d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
      />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      {...props}
    >
      <path
        d="M6.5 8C7.328 8 8 7.328 8 6.5S7.328 5 6.5 5 5 5.672 5 6.5 5.672 8 6.5 8ZM5 10c0-.552.448-1 1-1h1c.552 0 1 .448 1 1v8c0 .552-.448 1-1 1H6c-.552 0-1-.448-1-1v-8ZM11 19h1c.552 0 1-.448 1-1v-4.5c0-1.5 3-2.5 3 0V18c0 .552.447 1 1 1h1.013c.554 0 1-.448 1-1l-.013-5c0-2-1-4-3.5-4-1.5 0-2.5.668-3 1.5V11c0-.552-.448-1-1-1h-.5c-.552 0-1 .448-1 1v7c0 .552.448 1 1 1Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps) {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0-2a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        fill="currentColor"
      />
      <path
        d="M18 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.654 4.276C1 5.563 1 7.248 1 10.62v2.762c0 3.37 0 5.056.654 6.342a6 6 0 0 0 2.622 2.622C5.563 23 7.248 23 10.62 23h2.762c3.37 0 5.056 0 6.342-.654a6 6 0 0 0 2.622-2.622C23 18.437 23 16.752 23 13.38v-2.76c0-3.371 0-5.057-.654-6.343a6 6 0 0 0-2.622-2.622C18.437 1 16.752 1 13.38 1h-2.76c-3.371 0-5.057 0-6.343.654a6 6 0 0 0-2.622 2.622ZM13.38 3h-2.76c-1.718 0-2.886.002-3.788.076-.88.072-1.318.203-1.62.357a4 4 0 0 0-1.749 1.748c-.154.303-.285.74-.357 1.62C3.002 7.704 3 8.872 3 10.59v2.82c0 1.718.002 2.886.076 3.788.072.88.203 1.318.357 1.62a4 4 0 0 0 1.748 1.749c.303.154.74.285 1.62.357.902.074 2.07.076 3.788.076h2.821c1.718 0 2.886-.002 3.788-.076.88-.072 1.318-.203 1.62-.357a4 4 0 0 0 1.749-1.748c.154-.303.285-.74.357-1.62.074-.903.076-2.07.076-3.788v-2.821c0-1.718-.002-2.886-.076-3.788-.072-.88-.203-1.318-.357-1.62a4 4 0 0 0-1.748-1.749c-.303-.154-.74-.285-1.62-.357C16.295 3.002 15.128 3 13.41 3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 32 32"
      width={24}
      height={24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M16.656 1.029c1.637-.025 3.262-.012 4.886-.025.054 2.031.878 3.859 2.189 5.213a8.378 8.378 0 0 0 5.271 2.235v5.036c-1.912-.048-3.71-.489-5.331-1.255-.692-.349-1.358-.737-2.001-1.169.013 3.636.013 7.272-.012 10.895a9.42 9.42 0 0 1-1.561 4.821 9.247 9.247 0 0 1-7.34 3.982 9.018 9.018 0 0 1-5.18-1.32A9.314 9.314 0 0 1 3.066 22.45c-.025-.617-.038-1.234-.012-1.838a9.408 9.408 0 0 1 10.93-8.397c.025 1.851-.05 3.703-.05 5.553a4.297 4.297 0 0 0-5.494 2.622c-.31.81-.221 1.762-.038 2.609.49 2.103 2.51 3.879 4.675 3.688 1.437-.015 2.815-.851 3.563-2.071a4.18 4.18 0 0 0 .6-1.965c.158-2.806.094-5.599.107-8.404.013-6.31-.013-12.604.025-18.901l.025-.025z" />
    </svg>
  );
}

export function StarIcon(props: SVGProps) {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="#FFC107"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="m12 17.27 6.18 3.73-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
}

export function WhyChooseTimeIcon(props: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={101}
      height={100}
      viewBox="0 0 101 100"
      fill="none"
      {...props}
    >
      <rect x={0.5} width={100} height={100} rx={16} fill="#F8F8FD" />
      <path
        d="M50.6 24C36.233 24 24.586 35.506 24.586 49.7 24.586 63.892 36.233 75.398 50.6 75.398"
        stroke="#B7AEC3"
        strokeOpacity={0.1}
        strokeWidth={4}
      />
      <path
        d="M50.6 75.398c1.657 0 3.278-.16 4.847-.466 11.736-2.286 20.6-12.714 20.6-25.233C76.047 35.506 64.654 24 50.6 24"
        stroke="#1E1A24"
        strokeWidth={4}
        strokeLinecap="square"
      />
      <path
        d="M61.753 50.27c0-6.309-5.12-11.423-11.436-11.423-6.316 0-11.436 5.114-11.436 11.423s5.12 11.422 11.436 11.422c6.316 0 11.436-5.113 11.436-11.422Z"
        fill="#2D2934"
      />
      <path
        d="M47 50.81c0-.702.155-1.334.465-1.896.31-.562.661-1.047 1.054-1.454.392-.408.769-.736 1.13-.983.36-.248.59-.407.687-.477v1.144c0 .367.124.657.371.87.248.214.525.32.832.32.144 0 .281-.026.412-.078.131-.053.254-.135.37-.246l.21-.212c.49.32.881.747 1.176 1.276.294.53.441 1.108.441 1.736 0 .713-.188 1.355-.567 1.923-.378.569-.868.993-1.47 1.271.154-.169.274-.36.36-.577.087-.215.13-.444.13-.69 0-.265-.05-.518-.151-.758-.102-.24-.246-.456-.435-.644L50.574 49.928l-1.427 1.407a1.81 1.81 0 0 0-.445.644 1.87 1.87 0 0 0-.153.758c0 .245.043.475.13.69.085.215.205.408.359.577-.602-.278-1.092-.702-1.47-1.27-.378-.57-.567-1.21-.567-1.924ZM50.574 50.926l.93.91c.123.123.217.26.283.411a1.013 1.013 0 0 1-.097.99c-.255.25-.564.376-.928.376-.363 0-.673-.126-.928-.376a1.265 1.265 0 0 1-.376-.91c0-.167.032-.327.095-.481.064-.154.158-.294.284-.42l.928-.91Z"
        fill="#fff"
      />
    </svg>
  );
}

export function WhyChooseIntegrateIcon(props: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={101}
      height={100}
      viewBox="0 0 101 100"
      fill="none"
      {...props}
    >
      <rect x={0.5} width={100} height={100} rx={16} fill="#F8F8FD" />
      <path
        d="M41.329 15.5h19.342c6.417 0 9.535.004 12.93 1.042 3.617 1.301 6.483 4.17 7.785 7.786 1.108 3.394 1.113 6.578 1.113 13.002v19.34c0 6.417-.005 9.535-1.043 12.93-1.301 3.617-4.168 6.484-7.783 7.786-3.467 1.109-6.582 1.114-13.003 1.114H41.329c-6.417 0-9.535-.005-12.93-1.043-3.688-1.372-6.486-4.169-7.858-7.857-1.037-3.323-1.041-6.439-1.041-12.929v-19.34c0-6.416.004-9.534 1.041-12.929 1.375-3.626 4.18-6.49 7.862-7.788C31.723 15.506 34.833 15.5 41.329 15.5Z"
        fill="#fff"
        stroke="#F9F9F9"
      />
      <path
        d="M72.838 34.2c0-4.836-3.697-8.534-7.964-8.534-2.987 0-5.405.996-6.898 3.2-1.493-2.204-3.911-3.2-6.4-3.2-4.835 0-8.533 3.698-8.533 8.534 0 7.182 6.898 14.435 14.933 17.564 6.258-2.062 14.862-10.382 14.862-17.564Z"
        fill="#1E1A24"
      />
    </svg>
  );
}

export function WhyChooseWeightIcon(props: SVGProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={101}
      height={100}
      viewBox="0 0 101 100"
      fill="none"
      {...props}
    >
      <rect x={0.5} width={100} height={100} rx={16} fill="#F8F8FD" />
      <path
        d="M44.598 47.339 41.713 44.996v1.546H40.31c-.433 0-.784.351-.784.784 0 .432.35.783.784.783h1.404V49.683l2.885-2.344Z"
        fill="#1E1A24"
      />
      <path
        d="M50.629 29.791c2.703 0 4.91 2.205 4.91 4.91 0 2.703-2.207 4.908-4.91 4.908-2.704 0-4.909-2.205-4.909-4.909 0-2.704 2.205-4.909 4.909-4.909Z"
        fill="#1E1A24"
      />
      <path
        d="M65 50.5c0-7.9-6.4-14.3-14.3-14.3S36.4 42.6 36.4 50.5c0 4 1.6 7.6 4.2 10.2L34.2 67 36 68.8l6.4-6.4c2.3 1.7 5.2 2.7 8.3 2.7 7.9 0 14.3-6.4 14.3-14.6Z"
        stroke="#1E1A24"
        strokeWidth={3}
        fill="none"
      />
    </svg>
  );
}
