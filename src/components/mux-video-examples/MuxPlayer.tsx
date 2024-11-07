import MuxPlayer, { type MuxPlayerProps } from '@mux/mux-player-react';

export type BasicVideoPlayerProps = MuxPlayerProps;

// This is just an example usage of the mux player

export const BasicVideoPlayer = (props: BasicVideoPlayerProps) => {
  return (
    <MuxPlayer
      streamType='on-demand'
      // Video playback id
      playbackId='ruXv835ilSoJuJoi5KgQQ8ktPyRnFw67pUWxsgvmDVM'
      // This data is used for analytics
      metadataVideoTitle='Placeholder (optional)'
      metadataViewerUserId='Placeholder (optional)'
      // Example theming
      primaryColor='#FFFFFF'
      secondaryColor='#000000'
      {...props}
    />
  );
};
