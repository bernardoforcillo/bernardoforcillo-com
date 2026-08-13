import { Outlet, createFileRoute } from '@tanstack/react-router';
import { SiteShell } from '~/features/navigation/organisms/site-shell';

export const Route = createFileRoute('/_default')({
  component: DefaultLayout,
});

function DefaultLayout() {
  return (
    <SiteShell>
      <Outlet />
    </SiteShell>
  );
}
