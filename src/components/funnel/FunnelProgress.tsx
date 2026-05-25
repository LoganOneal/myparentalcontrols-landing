"use client";

export function FunnelProgress({
  current,
  total,
  brandColor,
}: {
  current: number;
  total: number;
  brandColor: string;
}) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-[320px]">
      <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: brandColor }}
        />
      </div>
    </div>
  );
}
