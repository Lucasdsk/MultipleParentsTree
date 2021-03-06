(function () {

  /* 
    Dados Lote:

    -------------------------------------------------------------------------------------------------
    |   Tipo: Adega de Pressão                              Ponto Produtivo: Tanque de Pressão 08   |
    |   Lote: 2017 - 2906                                   Resultante: ADP - Skol RET              |
    |   Linha: Adega de Pressão TP - L 1                    Situação: Fechado                       |
    |   Período: 12/10/2017 05:34 até 12/10/2017 11:59                                              |
    -------------------------------------------------------------------------------------------------

    TODO: Deixar a árvore com atura dinâmica, de acordo com a quantidade de nós
    TODO: Fazer a altura das colunas se adaptarem à altura da árvore
  */

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
    {
      product_id: 1,
      name: "A - FINAL",
      etapa: ETAPAS.FINAL,
      parents_id: null,
      lot_information: [
        {
          label: "Tipo",
          info: "Adega de Pressão - A"
        },
        {
          label: "Lote",
          info: "2017 - 2906"
        },
        {
          label: "Resultante",
          info: "ADP - Skol RET"
        },
        {
          label: "Linha",
          info: "Adega de Pressão TP - L 1"
        },
        {
          label: "Situação",
          info: "Fechado"
        },
        {
          label: "Período",
          info: "12/10/2017 05:34 até 12/10/2017 11:59"
        }
      ]
    },
    {
      product_id: 2,
      name: "B - ADEGA",
      etapa: ETAPAS.ADEGA,
      parents_id: [{ id: 1, type: "upsale" }],
      lot_information: [
        {
          label: "Tipo",
          info: "Adega de Pressão - B"
        },
        {
          label: "Lote",
          info: "2017 - 2906"
        },
        {
          label: "Resultante",
          info: "ADP - Skol RET"
        },
        {
          label: "Linha",
          info: "Adega de Pressão TP - L 1"
        },
        {
          label: "Situação",
          info: "Fechado"
        },
        {
          label: "Período",
          info: "12/10/2017 05:34 até 12/10/2017 11:59"
        }
      ]
    },
    {
      product_id: 3,
      name: "C - ADEGA",
      etapa: ETAPAS.ADEGA,
      alert: true,
      parents_id: [{ id: 1, type: "upsale" }],
      lot_information: [
        {
          label: "Tipo",
          info: "Adega de Pressão - C"
        },
        {
          label: "Lote",
          info: "2017 - 2906"
        },
        {
          label: "Resultante",
          info: "ADP - Skol RET"
        },
        {
          label: "Linha",
          info: "Adega de Pressão TP - L 1"
        },
        {
          label: "Situação",
          info: "Fechado"
        },
        {
          label: "Período",
          info: "12/10/2017 05:34 até 12/10/2017 11:59"
        }
      ]
    },
    {
      product_id: 4,
      name: "D - ADEGA",
      etapa: ETAPAS.ADEGA,
      parents_id: [{ id: 1, type: "downsale" }],
      lot_information: [
        {
          label: "Tipo",
          info: "Adega de Pressão - D"
        },
        {
          label: "Lote",
          info: "2017 - 2906"
        },
        {
          label: "Resultante",
          info: "ADP - Skol RET"
        },
        {
          label: "Linha",
          info: "Adega de Pressão TP - L 1"
        },
        {
          label: "Situação",
          info: "Fechado"
        },
        {
          label: "Período",
          info: "12/10/2017 05:34 até 12/10/2017 11:59"
        }
      ]
    },
    {
      product_id: 5,
      name: "E - ADEGA",
      etapa: ETAPAS.ADEGA,
      parents_id: [{ id: 1, type: "downsale" }],
      lot_information: [
        {
          label: "Tipo",
          info: "Adega de Pressão - E"
        },
        {
          label: "Lote",
          info: "2017 - 2906"
        },
        {
          label: "Resultante",
          info: "ADP - Skol RET"
        },
        {
          label: "Linha",
          info: "Adega de Pressão TP - L 1"
        },
        {
          label: "Situação",
          info: "Fechado"
        },
        {
          label: "Período",
          info: "12/10/2017 05:34 até 12/10/2017 11:59"
        }
      ]
    },
    {
      product_id: 6,
      name: "F - ASSEPSIA",
      etapa: ETAPAS.ASSEPSIA,
      parents_id: [{ id: 2, type: "downsale" }],
      lot_information: [
        {
          label: "Tipo",
          info: "Adega de Pressão - F"
        },
        {
          label: "Lote",
          info: "2017 - 2906"
        },
        {
          label: "Resultante",
          info: "ADP - Skol RET"
        },
        {
          label: "Linha",
          info: "Adega de Pressão TP - L 1"
        },
        {
          label: "Situação",
          info: "Fechado"
        },
        {
          label: "Período",
          info: "12/10/2017 05:34 até 12/10/2017 11:59"
        }
      ]
    },
    {
      product_id: 7,
      name: "G - ASSEPSIA",
      etapa: ETAPAS.ASSEPSIA,
      parents_id: [{ id: 3, type: "downsale" }],
      lot_information: [
        {
          label: "Tipo",
          info: "Adega de Pressão - G"
        },
        {
          label: "Lote",
          info: "2017 - 2906"
        },
        {
          label: "Resultante",
          info: "ADP - Skol RET"
        },
        {
          label: "Linha",
          info: "Adega de Pressão TP - L 1"
        },
        {
          label: "Situação",
          info: "Fechado"
        },
        {
          label: "Período",
          info: "12/10/2017 05:34 até 12/10/2017 11:59"
        }
      ]
    },
    {
      product_id: 8,
      name: "H - FILTRACAO",
      etapa: ETAPAS.FILTRACAO,
      parents_id: [{ id: 2, type: "upsale" }, { id: 3, type: "downsale" }],
      lot_information: [
        {
          label: "Tipo",
          info: "Adega de Pressão - H"
        },
        {
          label: "Lote",
          info: "2017 - 2906"
        },
        {
          label: "Resultante",
          info: "ADP - Skol RET"
        },
        {
          label: "Linha",
          info: "Adega de Pressão TP - L 1"
        },
        {
          label: "Situação",
          info: "Fechado"
        },
        {
          label: "Período",
          info: "12/10/2017 05:34 até 12/10/2017 11:59"
        }
      ]
    },
    {
      product_id: 9,
      name: "I - MATURACAO",
      etapa: ETAPAS.MATURACAO,
      parents_id: [{ id: 8, type: "downsale" }],
      lot_information: [
        {
          label: "Tipo",
          info: "Adega de Pressão - I"
        },
        {
          label: "Lote",
          info: "2017 - 2906"
        },
        {
          label: "Resultante",
          info: "ADP - Skol RET"
        },
        {
          label: "Linha",
          info: "Adega de Pressão TP - L 1"
        },
        {
          label: "Situação",
          info: "Fechado"
        },
        {
          label: "Período",
          info: "12/10/2017 05:34 até 12/10/2017 11:59"
        }
      ]
    },
    {
      product_id: 10,
      name: "J - MATURACAO",
      etapa: ETAPAS.MATURACAO,
      parents_id: [{ id: 8, type: "downsale" }],
      lot_information: [
        {
          label: "Tipo",
          info: "Adega de Pressão - J"
        },
        {
          label: "Lote",
          info: "2017 - 2906"
        },
        {
          label: "Resultante",
          info: "ADP - Skol RET"
        },
        {
          label: "Linha",
          info: "Adega de Pressão TP - L 1"
        },
        {
          label: "Situação",
          info: "Fechado"
        },
        {
          label: "Período",
          info: "12/10/2017 05:34 até 12/10/2017 11:59"
        }
      ]
    },
    {
      product_id: 11,
      name: "K - MATURACAO",
      etapa: ETAPAS.MATURACAO,
      parents_id: [{ id: 7, type: "upsale" }],
      lot_information: [
        {
          label: "Tipo",
          info: "Adega de Pressão - K"
        },
        {
          label: "Lote",
          info: "2017 - 2906"
        },
        {
          label: "Resultante",
          info: "ADP - Skol RET"
        },
        {
          label: "Linha",
          info: "Adega de Pressão TP - L 1"
        },
        {
          label: "Situação",
          info: "Fechado"
        },
        {
          label: "Período",
          info: "12/10/2017 05:34 até 12/10/2017 11:59"
        }
      ]
    }
  ],  
    svg,
    DOWNSALE_TYPE = 'downsale',
    UPSALE_TYPE = 'upsale',
    // SVG_MARGIN = {top: 20, right: 120, bottom: 20, left: 120},
    MARKER_CLASS_END = '_marker',
    UPSALE_MARKER_CLASS = "upsale",
    DOWNSALE_MARKER_CLASS =  "downsale",
    LINK_CLASS = 'link',
    NODE_CLASS = 'node',
    BOX_WIDTH = 500,
    BOX_HEIGHT = 180,
    COLUNA_WIDTH = BOX_WIDTH + (BOX_WIDTH / 2), // BOX_WIDTH + (BOX_WIDTH / 2)
    SVG_WIDTH = (Object.keys(ETAPAS).length * COLUNA_WIDTH) + COLUNA_WIDTH / 2, // (ETAPAS * COLUNA_WIDTH) + COLUNA_WIDTH / 2
    SVG_HEIGHT = 2000,
    SPACE_BETWEEN_DEPTH_LEVELS = COLUNA_WIDTH,
    TOP_DIRECTED_LINK_PATH_COORD = 0,
    BOTTOM_DIRECTED_LINK_PATH_COORD = 500,
    renderOptions = {
      svgWidth: SVG_WIDTH,
      svgHeight: SVG_HEIGHT,
      // svgMargin: SVG_MARGIN,
      classes: {
        linkClass: LINK_CLASS,
        nodeClass: NODE_CLASS
      },
      spaceBetweenDepthLevels: SPACE_BETWEEN_DEPTH_LEVELS,
      topDirectedLinkPathCoord: TOP_DIRECTED_LINK_PATH_COORD,
      bottomDirectedLinkPathCoord: BOTTOM_DIRECTED_LINK_PATH_COORD,
      markerClassEnd: MARKER_CLASS_END,
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
      .attr("class", renderOptions.classes.nodeClass)
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
        return "translate(" + (/* renderOptions.svgHeight -  */d.y + ( BOX_WIDTH * 0.25 )) + "," + d.x + ")";
      });
  }

  function drawLinks(links, nodes) {
    var diagonal = function(d) {
      return "M" + (d.source.y + BOX_WIDTH + ( BOX_WIDTH * 0.25 )) + "," + (d.source.x + (BOX_HEIGHT / 2))
        + "C" + (d.source.y + d.target.y) / 2 + "," + d.source.x
        + " " + (d.source.y + d.target.y) / 2 + "," + d.target.x
        + " " + (d.target.y + ( BOX_WIDTH * 0.25 )) + "," + (d.target.x + (BOX_HEIGHT / 2));
    };

    var diagonal2 = function(d) {
      return "M" + (d.source.y + BOX_WIDTH + ( BOX_WIDTH * 0.25 )) + "," + (d.source.x + (BOX_HEIGHT / 2))
        + "Q" + (((d.source.y + d.target.y) / 2) + BOX_WIDTH / 2) + " " + d.source.x
        + ", " + (d.target.y + ( BOX_WIDTH * 0.25 )) + "," + (d.target.x + (BOX_HEIGHT / 2));
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
      .attr("class", (d) => `${renderOptions.classes.linkClass} ${d.target.data.type}`)
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
    /* const margin = renderOptions.svgMargin,
      width = renderOptions.svgWidth - margin.right - margin.left,
      height = renderOptions.svgHeight - margin.top - margin.bottom; */

    const zoomed = (d) => {
      const zoomContainer = window.d3.select(".svg-container");
      zoomContainer.attr("transform", d3.event.transform);
    }

    window.d3.select(".graph-container").append("svg")
      .attr("width", renderOptions.svgWidth)
      .attr("height", renderOptions.svgHeight)
      .append("g")
        .attr("class", "zoom-container")
        .call(d3.zoom().scaleExtent([1 / 4, 4]).on("zoom", zoomed))
      .append("g")
        .attr("class", "svg-container");
  }

  function renderAreas() {
    const colunas = window.d3.select(".svg-container")
      .append("g").selectAll("g.area")
      .data(COLUNAS_ETAPAS)
      .enter()
      .append("g").attr("class", "area")
      .attr("transform", (d) => {
        return `translate(${d.order * COLUNA_WIDTH}, 0)`;
      });

    colunas.append("rect")
      .attr("width", COLUNA_WIDTH)
      .attr("height", SVG_HEIGHT)
      .attr("fill", "transparent")
      .attr("stroke", "#000")
      .attr("stroke-width", 1);

    const tituloColuna = colunas.append("g")
    
    tituloColuna.append("rect")
      .attr("width", COLUNA_WIDTH - 1)
      .attr("height", 40)
      .attr("fill", "#6ba4dc");

    tituloColuna.append("text")
      .attr("class", "column-title")
      .attr("x", 10)
      .attr("y", 25)
      .attr("style", "font-size: 1.5em")
      .text((d) => d.description);
  }

  function renderTree(root) {
    var width = renderOptions.svgWidth,
      height = renderOptions.svgHeight,
      tree,
      nodes,
      nodeGroup,
      links,
      nodesMap,
      isBackRelations;

    tree = window.d3.tree()
      .size([height, width]);
      //.nodeSize([BOX_HEIGHT, BOX_WIDTH]);

    svg = window.d3.select(".svg-container").append("g");

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
        if (d.data.data_targets_id) {
          var targets = d.data.data_targets_id;
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

    const text = nodeGroup
      .append("g")
      .selectAll("text")
        .data((d) => d.data.lot_information)
        .enter()
        .append("text")
          .attr("x", 10)
          .attr("y", (d,i) => 30 + 25 * i)
          .attr("style", "font-size: 1.5em");

    text.append("tspan")
      .attr("style", "font-weight: bold")
      .text(d => `${d.label}:`);

    text.append("tspan")
      .attr("dx", 5)
      .text(d => d.info);

    drawLinks(links, nodes);

  }

  //renderTest();
  renderSVG();
  renderAreas();
  renderTree(generateTree(linksData));
}());