import { render } from 'solid-js/web';
import Panel from '../Panel';

describe('Panel component', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    render(() => <Panel />, div);
  });


});
