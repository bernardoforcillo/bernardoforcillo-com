import { execFileSync } from 'node:child_process';
import { containerEngine } from './engine';

const globalTeardown = () => {
  try {
    execFileSync(containerEngine, ['rm', '-f', 'www-smoke'], {
      stdio: 'ignore',
    });
  } catch {
    // The container is already gone; nothing to clean up.
  }
};

export default globalTeardown;
