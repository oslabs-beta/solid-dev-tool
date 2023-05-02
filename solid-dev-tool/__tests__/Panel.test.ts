import { render } from 'solid-js/web';
import Panel from '../src/Panel';

describe('Panel component', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    render(() => <Panel />, div);
  });

  test('displays the correct title', () => {
    const div = document.createElement('div');
    const title = 'Test Panel';
    render(() => <Panel title={title} />, div);
    expect(div.textContent).toContain(title);
  });

  test('applies custom class name', () => {
    const div = document.createElement('div');
    const className = 'custom-class';
    render(() => <Panel className={className} />, div);
    expect(div.firstChild).toHaveClass(className);
  });
});
