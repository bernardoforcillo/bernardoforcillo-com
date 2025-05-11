import Link from 'next/link';

type NavLink = {
  label: string;
  href: string;
};

const mainNavLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Project', href: '/projects' },
  { label: 'Notes', href: '/notes' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  return (
    <>
      <header className='fixed flex top-0 z-50 w-full'>
        <div className='flex mx-auto mt-8 rounded-lg w-fit px-3 bg-neutral-300/60 backdrop-blur-xl'>
          <ol className='flex gap-4'>
            {mainNavLinks.map((el, indx) => (
              <>
                <li key={`link-${indx * 10}`} className='py-3 px-2'>
                  <Link href={el.href}>{el.label}</Link>
                </li>
              </>
            ))}
          </ol>
        </div>
      </header>
    </>
  );
}
