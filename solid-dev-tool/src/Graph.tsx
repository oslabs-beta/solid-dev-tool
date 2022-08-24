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
    const margin = { top: 100, right: 100, bottom: 100, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const treeLayout = tree().size([innerHeight, innerWidth]);
    
    const g = newSvg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    function handleZoom(e) {
      select('newSvg')
        .attr('transform', e.transform);
    }
      
    const graphZoom = zoom()
      .on('zoom', handleZoom);

    select('newSvg')
      .call(zoom);

    const root = hierarchy(graphData);
    const links = treeLayout(root).links();
    const linkPathGenerator = linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);

    g
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d', linkPathGenerator); 

    
    const node = g
      .selectAll('.node').data(root.descendants())
      .enter().append('g')
        .attr('class', function(d) { return 'node' + (d.children ? ' node--internal' : 'node--leaf')})
        .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; })
    
    node.append('circle')
      .attr('r', 12.5);

      //TODO: style text in relation to nodes
    node
      .append('text')
          .attr('dy', 50)
          .attr('x', d => d.children ? -20 : 20 ) 
          .style('text-anchor', d => d.children ? 'end' : 'start' )
          .text(d => d.data.name)
    
  });

  return (
    <div>
      <svg ref={svg}>
      </svg>
    </div>
  );
}
