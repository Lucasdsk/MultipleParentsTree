const ETAPAS = {
  MATURACAO: 4,
  FILTRACAO: 3,
  ASSEPSIA: 2,
  ADEGA: 1,
  FINAL: 0
};

const COLUNAS_ETAPAS = [
  {
    order: 4,
    description: "Maturação"
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

const linksData = [
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
];

const config = () => {
  const MARKER_CLASS_END = "_marker";
  const LINK_CLASS = "link";
  const NODE_CLASS = "node";
  const BOX_WIDTH = 500;
  const BOX_HEIGHT = 180;
  const COLUNA_WIDTH = BOX_WIDTH + BOX_WIDTH / 2;
  const SVG_WIDTH = Object.keys(ETAPAS).length * COLUNA_WIDTH + COLUNA_WIDTH / 2;
  const SVG_HEIGHT = 2000;
  const SPACE_BETWEEN_DEPTH_LEVELS = COLUNA_WIDTH;
  const TOP_DIRECTED_LINK_PATH_COORD = 0;
  const BOTTOM_DIRECTED_LINK_PATH_COORD = 500;

  return {
    UPSALE_TYPE: "upsale",
    renderOptions: {
      boxWidth: BOX_WIDTH,
      boxHeight: BOX_HEIGHT,
      svgWidth: SVG_WIDTH,
      svgHeight: SVG_HEIGHT,
      colunaWidth: COLUNA_WIDTH,
      classes: {
        linkClass: LINK_CLASS,
        nodeClass: NODE_CLASS
      },
      spaceBetweenDepthLevels: SPACE_BETWEEN_DEPTH_LEVELS,
      topDirectedLinkPathCoord: TOP_DIRECTED_LINK_PATH_COORD,
      bottomDirectedLinkPathCoord: BOTTOM_DIRECTED_LINK_PATH_COORD,
      markerClassEnd: MARKER_CLASS_END // possivelmente não está sendo usado, verificar...
    }
  }
}

/* 
export default ({
  ETAPAS,
  COLUNAS_ETAPAS,
  linksData,
  config,
});
 */