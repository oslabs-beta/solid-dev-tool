import { select, json, tree, hierarchy, linkHorizontal, zoom } from 'd3';
import { createSignal, onMount } from 'solid-js';
import data from './data.json';
import './Graph.css'


export default function Graph(props) {
  const graphData = props.graphData;
  console.log('graphData', props.graphData);

  let svg;
  onMount(() => {
    console.log('test');
    const newSvg = select(svg);
    const width = document.body.clientWidth;
    const height = document.body.clientHeight;

    const treeLayout = tree().size([height, width]);
    newSvg.attr('width', width).attr('height', height);

    const root = hierarchy(graphData);
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
      <svg ref={svg}>
      </svg>
    </div>
  );
}
