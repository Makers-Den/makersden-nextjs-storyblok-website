import { RiAlarmWarningFill } from '@react-icons/all-files/ri/RiAlarmWarningFill';
import { Link } from 'i18n.config';

function NotFoundPage() {
  return (
    <html lang='en'>
      <head></head>
      <body>
        <main>
          <section className='bg-white'>
            <div className='flex min-h-screen flex-col items-center justify-center text-center text-black'>
              <RiAlarmWarningFill
                size={60}
                className='drop-shadow-glow animate-flicker text-red-500'
              />
              <h1 className='mt-8 text-4xl md:text-6xl'>Page Not Found</h1>
              <Link className='mt-4 md:text-lg' href='/'>
                Back to Home
              </Link>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
export default NotFoundPage;
