import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer className='bg-fiord-950 p-4 text-fiord-50'>
        <section className='mx-auto flex max-w-screen-xl flex-col justify-between p-4 md:flex-row md:align-middle'>
          <div className='md:w-1/3'>
            <div className='pb-4'></div>
            <div className='flex flex-col text-xs opacity-70'>
              <span className='pb-2'>
                &copy; {new Date().getFullYear()} Bernardo Forcillo
              </span>
              <div className='flex flex-row space-x-2 pb-2'>
                <Link className='hover:underline' href='#'>
                  Privacy Policy
                </Link>
                <Link className='hover:underline' href='#'>
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
          <div className='flex flex-col md:w-2/3 md:flex-row'>
            <div className='md:w-1/4'></div>
            <div className='md:w-1/4'></div>
            <div className='md:w-1/4'></div>
            <div className='md:w-1/4'>
              <span className='mb-3 font-bold sm:mb-3'>Social</span>
              <ol>
                <li>
                  <a
                    className='hover:underline hover:opacity-60'
                    href='https://www.linkedin.com/in/bernardoforcillo/'
                    target='_blank'
                    rel='referrer'
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    className='hover:underline hover:opacity-60'
                    href='https://www.youtube.com/@bernardoforcillo'
                    target='_blank'
                    rel='referrer'
                  >
                    Youtube
                  </a>
                </li>
                <li>
                  <a
                    className='hover:underline hover:opacity-60'
                    href='https://github.com/bernardoforcillo'
                    target='_blank'
                    rel='referrer'
                  >
                    Github
                  </a>
                </li>
              </ol>
            </div>
          </div>
        </section>
        <div className='mx-auto max-w-screen-xl p-4 text-center text-base text-white'>
          Fatto a mano con ❤️ in Italia
        </div>
      </footer>
    </>
  );
}
