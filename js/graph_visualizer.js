(function () {
  var ETAPAS = {
    MATURACAO: 4,
    FILTRACAO: 3,
    ASSEPSIA: 2,
    ADEGA: 1,
    FINAL: 0,
  }
  var COLUNAS_ETAPAS = [
    {
      order: 4,
      description: "Maturação",
    },
    {
      order: 3,
      description: "Filtração"
    },
    {
      order: 2,
      description: "Assepsia"
    },
    {
      order: 1,
      description: "Adega"
    },
    {
      order: 0,
      description: "Packaging"
    }
  ];
  var linksData = [
    { "product_id": 1, "name": "A - FINAL", "etapa": ETAPAS.FINAL, "parents_id": null},
    { "product_id": 2, "name": "B - ADEGA", "etapa": ETAPAS.ADEGA, "parents_id": [{id: 1, "type": "upsale"}]},
    { "product_id": 3, "name": "C - ADEGA", "etapa": ETAPAS.ADEGA, "alert": true, "parents_id": [{id: 1, "type": "upsale"}] },
    { "product_id": 4, "name": "D - ADEGA", "etapa": ETAPAS.ADEGA, "parents_id": [{id: 1, "type": "downsale"}]},
    { "product_id": 5, "name": "E - ADEGA", "etapa": ETAPAS.ADEGA, "parents_id": [{id: 1, "type": "downsale"}]},
    { "product_id": 6, "name": "F - ASSEPSIA", "etapa": ETAPAS.ASSEPSIA, "parents_id": [{id: 2, "type": "downsale"}]},
    { "product_id": 7, "name": "G - ASSEPSIA", "etapa": ETAPAS.ASSEPSIA, "parents_id": [{id: 3, "type": "downsale"}]},
    { "product_id": 8, "name": "H - FILTRACAO", "etapa": ETAPAS.FILTRACAO, "parents_id": [{id: 2, "type": "upsale"}, {id: 3, "type": "downsale"}]},
    { "product_id": 9, "name": "I - MATURACAO", "etapa": ETAPAS.MATURACAO, "parents_id": [{id: 8, "type": "downsale"}]},
    { "product_id": 10, "name": "J - MATURACAO","etapa": ETAPAS.MATURACAO, "parents_id": [{id: 8, "type": "downsale"}]},
    { "product_id": 11, "name": "K - MATURACAO","etapa": ETAPAS.MATURACAO, "parents_id": [{id: 7, "type": "upsale"}]}
  ],
    $productsSelect = $('select.products-select'),
    svg,
    DOWNSALE_TYPE = 'downsale',
    UPSALE_TYPE = 'upsale',
    SVG_WIDTH = 1500,
    SVG_HEIGHT = 600,
    SVG_MARGIN = {top: 20, right: 120, bottom: 20, left: 120},
    MARKER_CLASS_END = '_marker',
    UPSALE_MARKER_CLASS = "upsale",
    DOWNSALE_MARKER_CLASS =  "downsale",
    CLASS_TO_HIDE_ELEMENT = 'hidden',
    LINK_CLASS = 'link',
    NODE_CLASS = 'node',
    SPACE_BETWEEN_DEPTH_LEVELS = 300,
    TOP_DIRECTED_LINK_PATH_COORD = 0,
    BOTTOM_DIRECTED_LINK_PATH_COORD = 500,
    BOX_WIDTH = 150,
    BOX_HEIGHT = 60,
    COLUNA_WIDTH = 300,
    MARKER_CSS_STYLES = {
      viewBox: '0 -5 10 10',
      refX: 18,
      refY: 0,
      markerWidth: 6,
      markerHeight: 6,
      orient: 'auto'
    },
    CIRCLE_CSS_STYLES = {
      r: 10,
      fill: '#fff',
      fillOpacity: 1,
      text: {
        dy: '-1em',
        dx: {
          left: '13px',
          right: '-13px;'
        }
      }
    },
    renderOptions = {
      svgWidth: SVG_WIDTH,
      svgHeight: SVG_HEIGHT,
      svgMargin: SVG_MARGIN,
      classes: {
        classToHideElement: CLASS_TO_HIDE_ELEMENT,
        linkClass: LINK_CLASS,
        nodeClass: NODE_CLASS
      },
      spaceBetweenDepthLevels: SPACE_BETWEEN_DEPTH_LEVELS,
      topDirectedLinkPathCoord: TOP_DIRECTED_LINK_PATH_COORD,
      bottomDirectedLinkPathCoord: BOTTOM_DIRECTED_LINK_PATH_COORD,

      markerClassEnd: MARKER_CLASS_END,
      upsaleMarkerClass: UPSALE_MARKER_CLASS + MARKER_CLASS_END,
      downsaleMarkerClass: DOWNSALE_MARKER_CLASS + MARKER_CLASS_END,
      markerCssStyles: MARKER_CSS_STYLES,

      circleCssStyles: CIRCLE_CSS_STYLES
    };

  function GraphLink(params) {
    return {
      name: params.name || '--',
      parents_id: params.parents_id || null,
      type: params.type || undefined,
      product_id: params.product_id
    };
  }

  function Node(params) {
    return {
      name: params.name || '--',
      parent: params.parent || null,
      type: params.type || UPSALE_TYPE
    };
  }
  function reduceArray(arr) {
    return arr.reduce(function (map, item) {
      map[item.product_id] =  item;
      return map;
    }, {});
  }
  function reduceArrayNode(arr) {
    return arr.reduce(function (map, item) {
      map[item.data.product_id] =  item;
      return map;
    }, {});
  }

  function generateTree(realData) {
    var data = JSON.parse(JSON.stringify(realData)),
      dataMap = reduceArray(data),
      treeData = [];

    //Adding data-target attribute with id's of targets of every node
    data.forEach(function (node, index) {
      node.index = index;
      if (node.parents_id) {
        var parentLength = node.parents_id.length;
        node.parents_id.forEach(function (parentItem, index) {
          var parent = dataMap[parentItem.id];
          if (parentLength > 1) {
            if (index !== parentLength - 1) {
              if (!parent.data_targets_id) {
                parent.data_targets_id = [{id: node.product_id, type: parentItem.type}];
              } else {
                parent.data_targets_id.push({id: node.product_id, type: parentItem.type});
              }
              return;
            }
          }
          parent.children =  parent.children || [];
          node.type = parentItem.type;
          parent.children.push(node);
        });
      } else {
        treeData.push(node);
      }

    });
    
    return treeData[0];
  }

  function drawNodes(nodes) {
    var i = 0,
      node = svg.selectAll("g.node")
        .data(nodes, function (d) {
          if (!d.id) {
            i += 1;
            d.id = i;
          }
          return d.id;
        });
    return node.enter().append("g")
      .attr("class", function (d) {
        var nodeClasses = renderOptions.classes.nodeClass;
        if (d.hidden) {
          nodeClasses += ' ' + renderOptions.classes.classToHideElement;
        }
        return nodeClasses;
      })
      .attr("data-index", function (d) {
        return d.data.index;
      })
      .attr("data-parent-index", function (d) {
        if (d.parent) {
          return d.parent.data.index;
        }
      })
      .attr("data-type", function (d) {
        return d.data.type;
      })
      .attr("transform", function (d) {
        return "translate(" + (/* renderOptions.svgHeight -  */d.y + ( COLUNA_WIDTH * 0.25 )) + "," + d.x + ")";
      });
  }

  function drawLinks(links, nodes) {
    var diagonal = function(d) {
      console.log('diagonal', d)
      return "M" + (d.source.y + BOX_WIDTH + ( COLUNA_WIDTH * 0.25 )) + "," + (d.source.x + (BOX_HEIGHT / 2))
        + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
        + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
        + " " + (d.target.y + ( COLUNA_WIDTH * 0.25 )) + "," + (d.target.x + (BOX_HEIGHT / 2));
    };

    var diagonal2 = function(d) {
      console.log('diagonal', d)
      return "M" + (d.source.y + BOX_WIDTH + ( COLUNA_WIDTH * 0.25 )) + "," + (d.source.x + (BOX_HEIGHT / 2))
        + "Q" + (((d.source.y + d.target.y) / 2) + BOX_WIDTH / 2) + " " + d.source.x
        + ", " + (d.target.y + ( COLUNA_WIDTH * 0.25 )) + "," + (d.target.x + (BOX_HEIGHT / 2));
    };

    var link,
    nodesMap,
    targets,
    maxTargetsCount;
    //Drawing links for one parent
    nodesMap = reduceArrayNode(nodes);
    link = svg.selectAll("path.link")
      .data(links, function (d) {
        return d.target.id;
      });
    link.enter().insert("path", "g")
      .attr("class", function (d) {
        var linkClasses = renderOptions.classes.linkClass + " " + d.target.data.type;
        if (d.source.data_targets_id) {
          targets = d.source.data_targets_id;
          targets.forEach(function (currentTarget) {
            if (currentTarget.data.type === d.target.data.type) {
              linkClasses += ' ' + renderOptions.classes.classToHideElement;
            }
          });
        }
        return linkClasses;
      })
      .attr("d", function (d) {
        return diagonal2(d);
      })
      .attr("marker-end", function (d) {
        return "url(#" + d.target.data.type + renderOptions.markerClassEnd + ")";
      });


    maxTargetsCount = 0;

    //Adding links in case when it is several parents for one node
    function addSpecialParent(position) {
      link.enter().insert("path", "g")
        .attr("d", function (d) {
          if (d.source.data.data_targets_id) {
            targets = d.source.data.data_targets_id;
            var length = targets.length,
              sep = ',',
              newPath = '',
              path,
              pathDigitsMas,
              pathDigitsAndSpacesMas,
              spaceCoord;
            if (length > maxTargetsCount) {
              maxTargetsCount = length;
            }
            if (position < length) {
              d.target = nodesMap[targets[position].id];
            } else {
              return;
            }

            //Conputing to which direction will be directed bezier link: top or bottom
            path = diagonal(d);
            pathDigitsMas = path.match(/([0-9\.])+/g);
            pathDigitsAndSpacesMas = path.match(/([A-Za-z0-9_ \.])+/g);

            pathDigitsAndSpacesMas.forEach(function (word, index) {
              if (index !== 3) {
                newPath += word;
              } else {
                if (targets[position].type === UPSALE_TYPE) {
                  spaceCoord = renderOptions.topDirectedLinkPathCoord;
                } else {
                  spaceCoord = renderOptions.bottomDirectedLinkPathCoord;
                }
                newPath += spaceCoord + ' ' + pathDigitsMas[6];
              }
              if (index !== 4) {
                newPath += sep;
              }
            });

            return newPath;
          }
        })
        .attr("class", function (d) {
          if (d.source.data.data_targets_id) {
            targets = d.source.data.data_targets_id;
            if (position < targets.length) {
              return renderOptions.classes.linkClass + ' ' + targets[position].type+' dd';
            }
          }
        })
        .attr("marker-end", function (d) {
          if (d.source.data.data_targets_id) {
            targets = d.source.data.data_targets_id;
            if (position < targets.length) {
              return "url(#" + targets[position].type + renderOptions.markerClassEnd + ")";
            }
          }
        });

    }
    addSpecialParent(0);
    if (maxTargetsCount === 2) {
      addSpecialParent(1);
    }
  }

  function renderSVG() {
    var margin = renderOptions.svgMargin,
      width = renderOptions.svgWidth - margin.right - margin.left,
      height = renderOptions.svgHeight - margin.top - margin.bottom;

    window.d3.select(".graph-container").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", SVG_HEIGHT + margin.top)
    .attr("transform", "translate(0, 25)")
  }
  
  function renderAreas() {
    const colunas = window.d3.select("svg")
      .append("g").selectAll("g.area")
      .data(COLUNAS_ETAPAS)
      .enter()
      .append("g").attr("class", "area")
      .attr("transform", (d) => {
        return `translate(${d.order * COLUNA_WIDTH}, ${0})`;
      });

    colunas.append("rect")
      .attr("width", COLUNA_WIDTH)
      .attr("height", SVG_HEIGHT + SVG_MARGIN.top)
      .attr("fill", "transparent")
      .attr("stroke", "#000")
      .attr("stroke-width", 1);

    const tituloColuna = colunas.append("g")
    
    tituloColuna.append("rect")
      .attr("width", COLUNA_WIDTH - 1)
      .attr("height", 25)
      .attr("fill", "#6ba4dc");

    tituloColuna.append("text")
      .attr("class", "column-title")
      .attr("x", 10)
      .attr("y", 18)
      .text((d) => d.description);
  }

  function renderTree(root, nodeClickHandler) {
    var margin = renderOptions.svgMargin,
      width = renderOptions.svgWidth - margin.right - margin.left,
      height = renderOptions.svgHeight - margin.top - margin.bottom,
      tree,
      nodes,
      nodeGroup,
      links,
      nodesMap,
      isBackRelations;

    tree = window.d3.tree()
      .size([height, width]);

    svg = window.d3.select("svg")
      .append("g")
      .attr("transform", "translate(0," + margin.top + ")");

    /* svg.append("svg:defs").selectAll("marker")
      .data([renderOptions.upsaleMarkerClass, renderOptions.downsaleMarkerClass])
        .enter().append("svg:marker")
        .attr("id", String)
        .attr("class", String)
        .attr("viewBox", renderOptions.markerCssStyles.viewBox)
        .attr("refX", renderOptions.markerCssStyles.refX)
        .attr("refY", renderOptions.markerCssStyles.refY)
        .attr("markerWidth", renderOptions.markerCssStyles.markerWidth)
        .attr("markerHeight", renderOptions.markerCssStyles.markerHeight)
        .attr("orient", renderOptions.markerCssStyles.orient)
        .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5"); */

    // Compute the new tree layout.
    var layout = d3.hierarchy(root);
    tree(layout);
    nodes = layout.descendants().reverse();
    links = layout.links();
    nodesMap = reduceArray(nodes);

    function replaceNodeAndChildren(node, root, distance) {
      if (node.children) {
        node.children.forEach(function (child) {
          replaceNodeAndChildren(child, root, distance);
        });
      }
      node.y = (distance  + (node.depth - root.depth)) * renderOptions.spaceBetweenDepthLevels;
      node.depth = (distance  + (node.depth - root.depth));
    }

    // Normalize for fixed-depth.
    isBackRelations = false;

    nodes.forEach(function (d) {
      d.depth = d.data.etapa;
      d.y = d.depth * renderOptions.spaceBetweenDepthLevels;
    });

    function addFixedDepth() {
      nodes.forEach(function (d) {
        if (d.data_targets_id) {
          var targets = d.data_targets_id;
          targets.forEach(function (currentTarget) {
            var target = nodesMap[currentTarget.id],
              source = d;
            if (source.y >= target.y) {
              isBackRelations = true;
              replaceNodeAndChildren(target, target, source.depth + 1);
              target.depth = source.depth + 1;
            }
          });
        }
      });
      if (isBackRelations) {
        isBackRelations = false;
        addFixedDepth();
      }
    }

    // addFixedDepth();

    nodeGroup = drawNodes(nodes);

    nodeGroup.append("rect")
      .attr("width", BOX_WIDTH)
      .attr("height", BOX_HEIGHT)
      .attr("fill", "#fff")
      .attr("stroke", (d) => {
        if (d.data.alert) return "#f00"
        return "#000"
      })
      .attr("stroke-width", 1);

    nodeGroup.append("text")
      .attr("x", function (d) {
        /*jslint nomen: true*/
        return d.children || d._children ? renderOptions.circleCssStyles.text.right : renderOptions.circleCssStyles.text.left;
      })
      .attr("dy", renderOptions.circleCssStyles.text.dy)
      .attr("text-anchor", "start")
      .text(function (d) { return d.data.name; })
      .style("fill-opacity", renderOptions.circleCssStyles.fillOpacity);

    drawLinks(links, nodes);

    $('.' + renderOptions.classes.nodeClass).on('click', nodeClickHandler);
  }

  function changeGraphLink(param) {
    var removedProductId,
      productIsDuplicated,
      newGraphLink;
    if (param.index !== undefined) {
      removedProductId = linksData[param.index].product_id;
      linksData[param.index].name = param.productToPaste.name;
      linksData[param.index].product_id = param.productToPaste.product_id;
      //Save previous product relations
      linksData.forEach(function (item) {
        if (item.parents_id) {
          item.parents_id.forEach(function (parentItem, index) {
            if (parentItem.id === removedProductId) {
              item.parents_id[index].id = param.productToPaste.product_id;
            }
          });
        }
      });
    } else {
      productIsDuplicated = false;
      linksData.forEach(function (item) {
        if (item.product_id === param.productToPaste.product_id) {
          item.parents_id.push({id: linksData[param.parentIndex].product_id, type: param.type});
          productIsDuplicated = true;
        }
      });
      if (!productIsDuplicated) {
        newGraphLink = new GraphLink({
          parents_id: [{id: linksData[param.parentIndex].product_id, type: param.type}],
          name: param.productToPaste.name,
          product_id: param.productToPaste.product_id
        });
        linksData.push(newGraphLink);
      }
    }
  }

  function nodeClickHandler() {
    var $target = $(this),
      template = app.productsSelectOptions,
      clickedNodeIndex = $target.data('index'),
      clickedNodeParentIndex = $target.data('parent-index'),
      clickedNodeType = $target.data('type'),
      productsFromSelect;
    //if (clickedNodeIndex) {
    //  dataToRender[clickedNodeIndex].selected = true;
    //}
    productsFromSelect = [{"name": "NewProduct1", product_id: 101},
      {"name": "NewProduct2", product_id: 102},
      {"name": "NewProduct3", product_id: 103},
      {"name": "NewProduct4", product_id: 104},
      {"name": "NewProduct5", product_id: 105},
      {"name": "NewProduct6", product_id: 106},
      {"name": "NewProduct7", product_id: 107},
      {"name": "NewProduct8", product_id: 108}];
    productsFromSelect.forEach(function (item, index) {
      item.index = index;
    });

    $productsSelect.html(Mustache.to_html(template, {data: productsFromSelect}));
    $productsSelect.select2();
    $('.funnel-modal').modal('toggle');

    function redrawGraph() {
      $('svg').remove();
      svg = null;
      renderTree(generateTree(linksData), nodeClickHandler);
    }

    $('.save-selected-product').off('click').on('click', function () {
      $('.funnel-modal').modal('toggle');
      var selectedProductIndex = +$productsSelect.val();
      changeGraphLink({
        index: clickedNodeIndex,
        parentIndex: clickedNodeParentIndex,
        type: clickedNodeType,
        productToPaste: productsFromSelect[selectedProductIndex]
      });
      redrawGraph();
    });
  }

  renderSVG();
  renderAreas();
  renderTree(generateTree(linksData), nodeClickHandler);

}());