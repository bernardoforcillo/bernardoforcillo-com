import { Outlet, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_default')({
  component: DefaultLayout,
});

function DefaultLayout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <main className='flex-1'>
        <Outlet />
      </main>
    </div>
  );
}
