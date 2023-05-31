import { render } from 'solid-js/web';
import Graph from '../src/Graph';

describe('Graph component', () => {
  test('renders without crashing', () => {
    const div = document.createElement('div');
    render(() => <Graph graphData={{ name: 'Root', children: [] }} />, div);
    // No error thrown means the component rendered successfully
  });

  test('displays correct graph data', () => {
    const graphData = {
      name: 'Root',
      children: [
        { name: 'Child 1', children: [] },
        { name: 'Child 2', children: [] },
      ],
    };
    const div = document.createElement('div');
    render(() => <Graph graphData={graphData} />, div);

    const graphElements = div.querySelectorAll('.node');
    expect(graphElements.length).toBe(3); // Root node + 2 children

    const rootNode = div.querySelector('.node.node--internal');
    expect(rootNode).toHaveTextContent('Root');

    const childNodes = div.querySelectorAll('.node--leaf');
    expect(childNodes[0]).toHaveTextContent('Child 1');
    expect(childNodes[1]).toHaveTextContent('Child 2');
  });
});
