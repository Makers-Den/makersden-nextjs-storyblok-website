import { RiAlarmWarningFill } from '@react-icons/all-files/ri/RiAlarmWarningFill';

function NotFoundPage() {
  return (
    <html lang='en'>
      <head>
        <link
          rel='preload'
          href='/fonts/inter-var-latin.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/MD-Formula.woff2'
          as='font'
          type='font/woff'
          crossOrigin='anonymous'
        />
        <link
          rel='preload'
          href='/fonts/IBMPlexMono-Regular-Latin1.woff2'
          as='font'
          type='font/ttf'
          crossOrigin='anonymous'
        />
      </head>
      <body>
        <main>
          <section className='bg-white'>
            <div className='flex min-h-screen flex-col items-center justify-center text-center text-black'>
              <RiAlarmWarningFill
                size={60}
                className='drop-shadow-glow animate-flicker text-red-500'
              />
              <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
              <a className='mt-4 md:text-lg' href='/'>
                Back to Home
              </a>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
export default NotFoundPage;
