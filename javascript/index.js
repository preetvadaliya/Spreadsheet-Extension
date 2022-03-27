function getBlock(type, id) {
  let workspace = Blockly.inject(id, {scrollbars: false, readOnly: true}); //zoom:{startScale: 1.2}
  let block = workspace.newBlock(type);
  block.initComponent(id);
  block.initSvg();
  block.render();
  if ('gen' in BLOCK_INFO[id])  {
    if (type === 'd_component_method')  {
      let componentBlock = workspace.newBlock('d_component_component_block');
      componentBlock.initComponent(document.querySelector('div[quantonium][block-type = component]').id);
      componentBlock.initSvg();
      componentBlock.render();
      let parentConnection = block.getInput('ARG0').connection;
      let childConnection = componentBlock.outputConnection;
      parentConnection.connect(childConnection);
    }
    if (type === 'd_component_set_get')  {
      let componentBlock = workspace.newBlock('d_component_component_block');
      componentBlock.initComponent(document.querySelector('div[quantonium][block-type = component]').id);
      componentBlock.initSvg();
      componentBlock.render();
      let parentConnection = block.getInput('COMPONENT').connection;
      let childConnection = componentBlock.outputConnection;
      parentConnection.connect(childConnection);
    }
  }
  if (block.outputConnection != null) {
    block.moveBy(16, 8);
  } else {
    block.moveBy(8, 8);
  }
  document.getElementById(id).style.height = block.getHeightWidth()["height"] + 16 + "px";
  document.getElementById(id).style.width = block.getHeightWidth()["width"] + 16 + "px";
  document.getElementById(id).setAttribute('render', 'true');
}

document.querySelectorAll('[block-type = vg-get]').forEach(b => {
  b.setAttribute('render', 'false');
  b.setAttribute('gen', 'true');
})
document.querySelectorAll('[block-type = vg-set]').forEach(b => {
  b.setAttribute('gen', 'true');
  b.setAttribute('render', 'false');
})

Array.from(document.querySelectorAll('div[quantonium]')).forEach(element => {
  let blockType = element.getAttribute('block-type');
  if (!('gen' in BLOCK_INFO[element.id]) && blockType === 'event') {
    getBlock('d_component_event', element.id);
  }
  if (!('gen' in BLOCK_INFO[element.id]) && blockType === 'method') {
    getBlock('d_component_method', element.id);
  }
  if (!('gen' in BLOCK_INFO[element.id]) && blockType === 'property') {
    getBlock('d_component_set_get', element.id);
  }
  if (blockType === 'helper') {
    getBlock('d_helper', element.id);
  }
  if (blockType === 'component') {
    getBlock('d_component_component_block', element.id);
  }
  if (('gen' in BLOCK_INFO[element.id]) && (blockType === 'event' || blockType === 'method' || blockType === 'property')) {
    element.setAttribute('gen', 'true');
    element.setAttribute('render', 'false');
  }
  if (blockType === 'v-get') {
    getBlock('d_getter', element.id);
  }
  if (blockType === 'v-set') {
    getBlock('d_setter', element.id);
  }
})

Array.from(document.querySelectorAll(".tabbed-set.tabbed-alternate")).forEach(element => {
  let tabs = element.querySelectorAll('label[for^="__tabbed"]');
  let tab1 = tabs[0];
  let tab2 = tabs[1];
  let tabContents = element.querySelectorAll('div.tabbed-block');
  let tabContent1 = tabContents[0];
  let tabContent2 = tabContents[1];
  tab1.addEventListener("click", function () {
    tabContent2.style.display = "none";
    tabContent1.style.display = "block";
  });
  tab2.addEventListener("click", function () {
    tabContent1.style.display = "none";
    tabContent2.style.display = "block";
    let genElements = element.querySelectorAll('div[quantonium][gen = true][render = false]');
    genElements.forEach(element => {
      if (element.getAttribute('block-type') === 'event') {
        getBlock('d_component_event', element.id);
      }
      if (element.getAttribute('block-type') === 'method') {
        getBlock('d_component_method', element.id);
      }
      if (element.getAttribute('block-type') === 'property') {
        getBlock('d_component_set_get', element.id);
      }
      if (element.getAttribute('block-type') === 'vg-set') {
        getBlock('d_setter', element.id);
      }
      if (element.getAttribute('block-type') === 'vg-get') {
        getBlock('d_getter', element.id);
      }
    })
  });
});

function renderBlock(block, workspaceElement) {
  block.initSvg();
  block.render();
  if (block.outputConnection != null) {
    block.moveBy(16, 8);
  } else {
    block.moveBy(8, 8);
  }
  workspaceElement.style.height = block.getHeightWidth()["height"] + 16 + "px";
  workspaceElement.style.width = block.getHeightWidth()["width"] + 16 + "px";
}

// Render default blocks.
Array.from(document.querySelectorAll("[type = ai-2-block]")).forEach(element => {
  let workspace = Blockly.inject(element.id, {scrollbars: false, readOnly: true});
  let block = workspace.newBlock(element.id);
  renderBlock(block, element);
});

Array.from(document.querySelectorAll("[type = ai-2-default-block]")).forEach(element => {
  let workspace = Blockly.inject(element.id, {scrollbars: false, readOnly: true});
  let blockXML = Blockly.Xml.textToDom(DEFAULT_BLOCKS[element.id]);
  blockXML = blockXML.firstElementChild;
  let block = Blockly.Xml.domToBlock(blockXML, workspace);
  renderBlock(block, element);
});