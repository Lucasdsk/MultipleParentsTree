/*
import config from "./config";
import GraphLink from "./GraphLink";
import Node from "./Node";
*/

class GraphVisualizer {
  constructor(config, columns) {
    this.config = config;
    this.columns = columns;
    this.svg = null;
  }

  init() {
    console.log("init");
    this.renderSVG();
    this.renderAreas();
    this.renderTree(this.generateTree(linksData));
  }

  reduceArray(arr) {
    return arr.reduce((map, item) => {
      if (item.product_id) {
        map[item.product_id] = item;
      } else {
        map[item.data.product_id] = item;
      }

      return map;
    }, {});
  }

  generateTree(realData) {
    const data = JSON.parse(JSON.stringify(realData));
    const dataMap = this.reduceArray(data);
    const treeData = [];

    //Adding data-target attribute with id's of targets of every node
    data.forEach((node, index) => {
      node.index = index;
      if (node.parents_id) {
        const parentLength = node.parents_id.length;
        node.parents_id.forEach((parentItem, index) => {
          let parent = dataMap[parentItem.id];
          if (parentLength > 1) {
            if (index !== parentLength - 1) {
              if (!parent.data_targets_id) {
                parent.data_targets_id = [
                  { id: node.product_id, type: parentItem.type }
                ];
              } else {
                parent.data_targets_id.push({
                  id: node.product_id,
                  type: parentItem.type
                });
              }
              return;
            }
          }
          parent.children = parent.children || [];
          node.type = parentItem.type;
          parent.children.push(node);
        });
      } else {
        treeData.push(node);
      }
    });

    return treeData[0];
  }

  drawNodes(nodes) {
    let i = 0;
    const node = this.svg.selectAll("g.node").data(nodes, d => {
      if (!d.id) {
        i += 1;
        d.id = i;
      }
      return d.id;
    });

    return node
      .enter()
      .append("g")
      .attr("class", this.config.renderOptions.classes.nodeClass)
      .attr("data-index", d => d.data.index)
      .attr("data-parent-index", d => {
        if (d.parent) {
          return d.parent.data.index;
        }
      })
      .attr("data-type", d => d.data.type)
      .attr("transform", d => `translate(${d.y + this.config.renderOptions.boxWidth * 0.25}, ${d.x})`);
  }

  drawLinks(links, nodes) {
    const { boxWidth, boxHeight } = this.config.renderOptions;

    const diagonal = d =>
      `M${d.source.y + boxWidth + boxWidth * 0.25}, ${d.source.x + boxHeight / 2}` +
      `C${(d.source.y + d.target.y) / 2},${d.source.x} ` +
      `${(d.source.y + d.target.y) / 2},${d.target.x} ` +
      `${d.target.y + boxWidth * 0.25},${d.target.x + boxHeight / 2}`;

    const diagonal2 = d =>
      `M${d.source.y + boxHeight + boxHeight * 0.25},${d.source.x + boxHeight / 2}` +
      `Q${(d.source.y + d.target.y) / 2 + boxHeight / 2} ${d.source.x}, ` +
      `${d.target.y + boxWidth * 0.25},${d.target.x + boxHeight / 2}`;

    let targets;
    let maxTargetsCount = 0;
    // Drawing links for one parent
    const nodesMap = this.reduceArray(nodes);
    const link = this.svg.selectAll("path.link").data(links, d => d.target.id);
    link
      .enter()
      .insert("path", "g")
      .attr(
        "class",
        d => `${this.config.renderOptions.classes.linkClass} ${d.target.data.type}`
      )
      .attr("d", diagonal2)
      .attr(
        "marker-end",
        d => `url(#${d.target.data.type}${this.config.renderOptions.markerClassEnd})`
      );

    //Adding links in case when it is several parents for one node
    const addSpecialParent = position => {
      link
        .enter()
        .insert("path", "g")
        .attr("d", d => {
          if (d.source.data.data_targets_id) {
            targets = d.source.data.data_targets_id;
            const length = targets.length;
            const sep = ",";
            let newPath = "";
            let spaceCoord;
            if (length > maxTargetsCount) {
              maxTargetsCount = length;
            }
            if (position < length) {
              d.target = nodesMap[targets[position].id];
            } else {
              return;
            }

            //Conputing to which direction will be directed bezier link: top or bottom
            const path = diagonal(d);
            const pathDigitsMas = path.match(/([0-9\.])+/g);
            const pathDigitsAndSpacesMas = path.match(/([A-Za-z0-9_ \.])+/g);

            pathDigitsAndSpacesMas.forEach((word, index) => {
              if (index !== 3) {
                newPath += word;
              } else {
                if (targets[position].type === this.config.UPSALE_TYPE) {
                  spaceCoord = this.config.renderOptions.topDirectedLinkPathCoord;
                } else {
                  spaceCoord = this.config.renderOptions.bottomDirectedLinkPathCoord;
                }
                newPath += spaceCoord + " " + pathDigitsMas[6];
              }
              if (index !== 4) {
                newPath += sep;
              }
            });

            return newPath;
          }
        })
        .attr("class", d => {
          if (d.source.data.data_targets_id) {
            targets = d.source.data.data_targets_id;
            if (position < targets.length) {
              return `${this.config.renderOptions.classes.linkClass} ${
                targets[position].type
              } dd`;
            }
          }
        })
        .attr("marker-end", d => {
          if (d.source.data.data_targets_id) {
            targets = d.source.data.data_targets_id;
            if (position < targets.length) {
              return `url(#${targets[position].type +
                this.config.renderOptions.markerClassEnd})`;
            }
          }
        });
    };

    addSpecialParent(0);
    if (maxTargetsCount === 2) {
      addSpecialParent(1);
    }
  }

  renderSVG() {    
    const zoomed = d => {
      const zoomContainer = window.d3.select(".svg-container");
      zoomContainer.attr("transform", d3.event.transform);
    };

    window.d3
      .select(".graph-container")
      .append("svg")
      .attr("width", this.config.renderOptions.svgWidth)
      .attr("height", this.config.renderOptions.svgHeight)
      .append("g")
      .attr("class", "zoom-container")
      .call(
        d3
          .zoom()
          .scaleExtent([1 / 4, 4])
          .on("zoom", zoomed)
      )
      .append("g")
      .attr("class", "svg-container");
  }

  renderAreas() {
    const colunas = window.d3
      .select(".svg-container")
      .append("g")
      .selectAll("g.area")
      .data(this.columns)
      .enter()
      .append("g")
      .attr("class", "area")
      .attr(
        "transform",
        d => `translate(${d.order * this.config.renderOptions.colunaWidth}, 0)`
      );

    colunas
      .append("rect")
      .attr("width", this.config.renderOptions.colunaWidth)
      .attr("height", this.config.renderOptions.svgHeight)
      .attr("fill", "transparent")
      .attr("stroke", "#000")
      .attr("stroke-width", 1);

    const tituloColuna = colunas.append("g");

    tituloColuna
      .append("rect")
      .attr("width", this.config.renderOptions.colunaWidth - 1)
      .attr("height", 40)
      .attr("fill", "#6ba4dc");

    tituloColuna
      .append("text")
      .attr("class", "column-title")
      .attr("x", 10)
      .attr("y", 25)
      .attr("style", "font-size: 1.5em")
      .text(d => d.description);
  }

  renderTree(root) {
    const width = this.config.renderOptions.svgWidth,
      height = this.config.renderOptions.svgHeight;

    const tree = window.d3.tree().size([height, width]);
    this.svg = window.d3.select(".svg-container").append("g");

    // Compute the new tree layout.
    const layout = d3.hierarchy(root);
    const nodes = layout.descendants().reverse();
    const links = layout.links();
    const nodesMap = this.reduceArray(nodes);
    tree(layout);
    
    const replaceNodeAndChildren = (node, root, distance) => {
      if (node.children) {
        node.children.forEach(child =>
          replaceNodeAndChildren(child, root, distance)
        );
      }
      node.y =
        (distance + (node.depth - root.depth)) *
        this.config.renderOptions.spaceBetweenDepthLevels;
      node.depth = distance + (node.depth - root.depth);
    };

    nodes.forEach(d => {
      d.depth = d.data.etapa;
      d.y = d.depth * this.config.renderOptions.spaceBetweenDepthLevels;
    });

    const nodeGroup = this.drawNodes(nodes);

    nodeGroup
      .append("rect")
      .attr("width", this.config.renderOptions.boxWidth)
      .attr("height", this.config.renderOptions.boxHeight)
      .attr("fill", "#fff")
      .attr("stroke", d => (d.data.alert ? "#f00" : "#000"))
      .attr("stroke-width", 1);

    const text = nodeGroup
      .append("g")
      .selectAll("text")
      .data(d => d.data.lot_information)
      .enter()
      .append("text")
      .attr("x", 10)
      .attr("y", (d, i) => 30 + 25 * i)
      .attr("style", "font-size: 1.5em");

    text
      .append("tspan")
      .attr("style", "font-weight: bold")
      .text(d => `${d.label}:`);

    text
      .append("tspan")
      .attr("dx", 5)
      .text(d => d.info);

    this.drawLinks(links, nodes);
  }
}

const treeConfig = config();
const treeView = new GraphVisualizer(treeConfig, COLUNAS_ETAPAS);
treeView.init();
