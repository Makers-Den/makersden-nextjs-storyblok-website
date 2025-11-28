'use client';

import { useEffect, useRef } from 'react';

import clsxm from '@/lib/clsxm';

import { SvgIcon } from '@/components/icons/SvgIcon';

interface VideoOverlayProps {
  youtubeUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * VideoOverlay component for displaying YouTube videos in a modal overlay.
 * Automatically starts playing when opened and stops when closed.
 */
export function VideoOverlay({
  youtubeUrl,
  isOpen,
  onClose,
}: VideoOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string): string | null => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = regExp.exec(url);
    return match?.[2]?.length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeId(youtubeUrl);

  // Handle ESC key to close overlay
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when overlay is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Handle click outside to close
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) {
      onClose();
    }
  };

  if (!isOpen || !videoId) return null;

  return (
    <div
      ref={overlayRef}
      className={clsxm(
        'fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4',
        'animate-in fade-in duration-200',
      )}
      onClick={handleOverlayClick}
      aria-modal='true'
      role='dialog'
      aria-label='Video player'
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className={clsxm(
          'absolute top-4 right-4 z-10',
          'rounded-full bg-white/10 p-2',
          'transition-colors hover:bg-white/20',
          'focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none',
        )}
        aria-label='Close video'
      >
        <SvgIcon name='Close' className='size-6 text-white' />
      </button>

      {/* Video container */}
      <div className='relative w-full max-w-5xl'>
        <div className='relative aspect-video w-full overflow-hidden rounded-lg bg-black'>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='absolute inset-0 size-full'
          />
        </div>
      </div>
    </div>
  );
}
