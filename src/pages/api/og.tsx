import { ImageResponse } from '@vercel/og';
import { type NextRequest } from 'next/server';

import { MakersDenFullLogo } from '@/components/icons/MakersDenFullLogo';
import { BackgroundGrid } from '@/components/images/BackgroundGridSVG';

export const config = {
  runtime: 'edge',
};

const font = fetch(
  new URL(
    '../../../public/fonts/PPFormula-CondensedBlack.ttf',
    import.meta.url,
  ),
).then((res) => res.arrayBuffer());

/**
 * If the page is not an article, and it has a title then this OG image will be used.
 */
const handler = async (req: NextRequest) => {
  const fontData = await font;
  const { searchParams } = req.nextUrl;
  const title = decodeURIComponent(searchParams.get('title') ?? 'No title');
  const image = decodeURIComponent(searchParams.get('imageUrl') ?? '');

  return new ImageResponse(
    (
      <div tw='flex h-full w-full bg-[#131825] text-white items-center justify-center'>
        <div tw='absolute w-full h-full flex'>
          <BackgroundGrid />
        </div>
        <div tw='flex flex-col p-10 w-full h-full items-center justify-center text-white p-24'>
          <MakersDenFullLogo width='1000' />

          <div tw='flex justify-between w-full mt-8'>
            <div tw='flex flex-col w-2/3 h-64 justify-center'>
              <p
                tw='text-6xl text-left leading-[1.09] text-[#6DDA84]'
                style={{ fontFamily: '"PPFormula"' }}
              >
                {title}
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt='' tw='h-64 mr-7' />
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ data: fontData, name: 'PPFormula', style: 'normal' }],
    },
  );
};

export default handler;
