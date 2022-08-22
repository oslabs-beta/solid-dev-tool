import { select, json, tree, hierarchy, linkHorizontal, zoom } from 'd3';
import { createSignal, onMount } from 'solid-js';
import data from './data.json';
import './Graph.css'

// NEED TO CONVERT THIS JAVASCRIPT INTO JSX
export default function Graph(props) {
  console.log('were in the Graph component now');
  // dummy Data
  console.log('props', props.graphData);
  let treeData = {
    name: 'Root Node',
    children: [
      {
        name: 'L-1',
        children: [
          {
            name: 'L-1-1',
            children: [],
          },
          {
            name: 'L-1-2',
            children: [],
          },
          {
            name: 'L-1-3',
            children: [],
          },
          {
            name: 'L-1-4',
            children: [],
          },
        ],
      },
      {
        name: 'L-2',
        children: [
          {
            name: 'L-2-1',
            children: [
              {
                name: 'L-2-1-1',
                children: [],
              },
            ],
          },
          {
            name: 'L-2-2',
            children: [],
          },
          {
            name: 'L-2-3',
            children: [
              {
                name: 'L-2-3-1',
                children: [],
              },
            ],
          },
          {
            name: 'L-2-4',
            children: [],
          },
        ],
      },
      {
        name: 'L-3',
        children: [
          {
            name: 'L-3-1',
            children: [],
          },
          {
            name: 'L-3-2',
            children: [],
          },
          {
            name: 'L-3-3',
            children: [],
          },
          {
            name: 'L-3-4',
            children: [],
          },
          {
            name: 'L-3-5',
            children: [],
          },
        ],
      },
      {
        name: 'L-4',
        children: [
          {
            name: 'L-4-1',
            children: [],
          },
          {
            name: 'L-4-2',
            children: [],
          },
          {
            name: 'L-4-3',
            children: [],
          },
        ],
      },
      {
        name: 'L-5',
        children: [
          {
            name: 'L-5-1',
            children: [],
          },
          {
            name: 'L-5-2',
            children: [],
          },
          {
            name: 'L-5-3',
            children: [],
          },
        ],
      },
    ],
  };

  let svg;
  onMount(() => {
    console.log('test');
    const newSvg = select(svg);
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;

    const treeLayout = tree().size([height, width]);
    newSvg.attr('width', width).attr('height', height);

    const root = hierarchy(treeData);
    const links = treeLayout(root).links();
    const linkPathGenerator = linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    newSvg
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d', linkPathGenerator); 

    newSvg
      .selectAll('text').data(root.descendants())
        .enter().append('text')
          .attr('x', d => d.y)
          .attr('y', d=> d.x) 
          .attr('dy', '0.32em')
          .text(d => d.data.name)
          
  });

  return (
    <div>
      <svg ref={svg}>{/* Structural Graph */}</svg>
    </div>
  );
}
