import { render, screen } from '@testing-library/react';
import {DevTool} from '../src/Root';

test('renders the landing page', () => {
  render(<DevTool />);
});