import MuxPlayer, { type MuxPlayerProps } from '@mux/mux-player-react';

export type BackgroundMuxVideoProps = MuxPlayerProps;

export const BackgroundMuxVideo = (props: BackgroundMuxVideoProps) => {
  return (
    <MuxPlayer
      muted={true}
      autoPlay={true}
      loop={true}
      playsInline={true}
      style={{
        // @ts-expect-error css vars
        '--controls': 'none',
        '--media-object-fit': 'cover',
        '--media-object-position': 'center',
      }}
      streamType='on-demand'
      // Video playback id
      playbackId='ruXv835ilSoJuJoi5KgQQ8ktPyRnFw67pUWxsgvmDVM'
      // I think this data is used for analytics
      metadataVideoTitle='Placeholder (optional)'
      metadataViewerUserId='Placeholder (optional)'
      {...props}
    />
  );
};
