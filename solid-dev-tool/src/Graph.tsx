import {
  select,
  json,
  tree,
  hierarchy,
  linkHorizontal,
  zoom,
} from 'd3';
import {createSignal} from 'solid-js';
import data from './data.json'


// NEED TO CONVERT THIS JAVASCRIPT INTO JSX
export default function Graph() {
  console.log('were in the Graph component now');
  // dummy Data
  let treeData = [
    {
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
    },
  ];

let svg;
const newSvg = select(svg);
const width = document.body.clientWidth;
const height = document.body.clientHeight; 

const treeLayout = tree()
  .size([height, width]);

  newSvg
    .attr('width', width)
    .attr('height', height)

 
      const root = hierarchy(treeData);
      console.log('this is root', root);
      const links = treeLayout(root).links();
      console.log('this is links', links);
      const linkPathGenerator = linkHorizontal()
        .x(d => d.y)
        .y(d => d.x);
    
      svg.selectAll('path').data(links)
        .enter().append('path')
          .attr('d', linkPathGenerator);



  return (
    <div>
      <svg ref={svg}>
        {/* Structural Graph */}
      </svg>
    </div>
  )
}