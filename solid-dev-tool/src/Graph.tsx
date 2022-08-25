import { 
  select, 
  tree, 
  hierarchy, 
  linkHorizontal, 
  zoom } from 'd3';
import { onMount } from 'solid-js';

export default function Graph(props) {
  const graphData = props.graphData;

  let svg;
  onMount(() => {
    const newSvg = select(svg); 
    const width = document.body.offsetWidth;
    const height = document.body.offsetHeight;
    const margin = { top: 100, right: 100, bottom: 100, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const treeLayout = tree().size([innerHeight, innerWidth]).nodeSize([80, 150]);
    
    /*
      TODO: Show more information on hovering over nodes
    */
    const g = newSvg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const handleZoom = (e) => g.attr('transform', e.transform);
    newSvg.call(zoom().on('zoom', handleZoom));

    const root = hierarchy(graphData);
    const links = treeLayout(root).links();
 
    const linkPathGenerator = linkHorizontal()
      .x((d) => d.y)
      .y((d) => d.x);
    g.selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d', linkPathGenerator); 

    const node = g.selectAll('.node').data(root.descendants())
      .enter().append('g')
      .attr('class', function(d) { return 'node' + (d.children ? ' node--internal' : 'node--leaf')})
      .attr('transform', function(d) { return 'translate(' + d.y + ',' + d.x + ')'; })
    
    
    node.append('circle')
      .attr('r', 5)

    node.append('text')
      .attr('dy', -20)
      .attr('x', d => d.children ? 0 : 0 ) 
      .style('text-anchor', 'middle' )
      .text(d => d.data.name);
  });

  return <svg ref={svg}></svg>
}
