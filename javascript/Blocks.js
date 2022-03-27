Blockly.Blocks['d_component_event'] = {
  componentType: "Component",
  eventName: "Event",
  isGeneric: false,
  instanceName: "Component1",
  eventParams: [],
  isHorizontalParameters: true,
  initComponent: function (id) {
    this.componentType = BLOCK_INFO[id]['component-name'];
    this.eventName = BLOCK_INFO[id]['event-name'];
    this.isGeneric = BLOCK_INFO[id]['gen'];
    this.instanceName = this.componentType + '1';
    this.eventParams = BLOCK_INFO[id]['params'];
    this.isHorizontalParameters = true;
    this.getBlock();
  },
  getBlock: function () {
    this.componentDropDown = new Blockly.FieldDropdown([[this.instanceName, this.instanceName]]);
    this.setColour(Blockly.ComponentBlock.COLOUR_EVENT);
    if (!this.isGeneric) {
      this.appendDummyInput('WHENTITLE').appendField('when').appendField(this.componentDropDown, 'COMPONENT_SELECTOR').appendField(this.eventName);
    } else {
      this.appendDummyInput('WHENTITLE').appendField('when any ' + this.componentType + "." + this.eventName);
    }
    if (this.isHorizontalParameters) {
      if (this.eventParams.length > 0) {
        let paramsInput = this.appendDummyInput('PARAMETERS').appendField(' ').setAlign(Blockly.ALIGN_LEFT);
        for (let i = 0, param; param = this.eventParams[i]; i++) {
          let field = new Blockly.FieldTextInput(param);
          paramsInput.appendField(field).appendField(' ');
        }
      }
    } else {
      if (this.eventParams.length > 0) {
        for (let i = 0, param; param = this.eventParams[i]; i++) {
          this.appendDummyInput().appendField(new Blockly.FieldTextInput(param)).setAlign(Blockly.ALIGN_RIGHT);
        }
      }
    }
    this.appendStatementInput("DO").setCheck(null).appendField("do");
  }
}

Blockly.Blocks['d_component_method'] = {
  componentType: "Component",
  methodName: "Method",
  isGeneric: false,
  instanceName: "Component1",
  methodParams: [],
  isVoid: true,
  timeUnit: "",
  initComponent: function (id) {
    this.componentType = BLOCK_INFO[id]['component-name'];
    this.methodName = BLOCK_INFO[id]['method-name'];
    this.isGeneric = BLOCK_INFO[id]['gen'];
    this.instanceName = this.componentType + '1';
    this.methodParams = BLOCK_INFO[id]['params'];
    if (!this.isGeneric && this.componentType === "Clock" && this.methodName.startsWith('Add')) {
      this.timeUnit = this.methodName.slice(3);
    }
    this.isVoid = BLOCK_INFO[id]['void'];
    this.getBlock();
  },
  getBlock: function () {
    this.componentDropDown = new Blockly.FieldDropdown([[this.instanceName, this.instanceName]]);
    this.setColour(Blockly.ComponentBlock.COLOUR_METHOD);
    if (this.componentType === "Clock" && this.methodName.startsWith("Add")) {
      if (!this.isGeneric) {
        this.unitDropDown = new Blockly.FieldDropdown([[this.timeUnit, this.timeUnit]]);
        this.appendDummyInput().appendField("call").appendField(this.componentDropDown, "COMPONENT_SELECTOR").appendField("." + "Add").appendField(this.unitDropDown, "TIME_UNIT");
      } else {
        this.appendDummyInput().appendField("call").appendField(this.componentType + "." + this.methodName);
      }
    } else {
      if (!this.isGeneric) {
        this.appendDummyInput().appendField("call").appendField(this.componentDropDown, "COMPONENT_SELECTOR").appendField("." + this.methodName);
      } else {
        this.appendDummyInput().appendField("call").appendField(this.componentType + "." + this.methodName);
      }
    }

    if (this.methodParams.length > 0) {
      for (let i = 0, param; param = this.methodParams[i]; i++) {
        let newInput = this.appendValueInput("ARG" + i).appendField(param);
        newInput.setAlign(Blockly.ALIGN_RIGHT);
      }
    }
    if (this.isVoid) {
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
    } else {
      this.setOutput(true, null);
    }
  }
};

Blockly.Blocks['d_component_set_get'] = {
  componentType: "Component",
  setOrGet: "get",
  isGeneric: false,
  propertyName: "PropertyName",
  instanceName: "Component1",
  initComponent: function (id) {
    this.componentType = BLOCK_INFO[id]['component-name'];
    this.setOrGet = BLOCK_INFO[id]['get-set'];
    this.isGeneric = BLOCK_INFO[id]['gen'];
    this.propertyName = BLOCK_INFO[id]['property-name'];
    this.instanceName = this.componentType + '1';
    this.getBlock();
  },
  getBlock: function () {
    this.componentDropDown = new Blockly.FieldDropdown([[this.instanceName, this.instanceName]]);
    this.propertyDropDown = new Blockly.FieldDropdown([[this.propertyName, this.propertyName]]);
    if (this.setOrGet === "get") {
      this.setColour(Blockly.ComponentBlock.COLOUR_GET);
      this.setOutput(true, null);
      if (!this.isGeneric) {
        this.appendDummyInput().appendField(this.componentDropDown, "COMPONENT_SELECTOR").appendField(".").appendField(this.propertyDropDown, "PROP");
      } else {
        this.appendDummyInput().appendField(this.componentType + ".").appendField(this.propertyDropDown, "PROP");
        this.appendValueInput("COMPONENT").setCheck(null).appendField('of component').setAlign(Blockly.ALIGN_RIGHT);
      }
    }
    if (this.setOrGet === "set") {
      this.setColour(Blockly.ComponentBlock.COLOUR_SET);
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      if (!this.isGeneric) {
        this.appendValueInput("VALUE").appendField("set").appendField(this.componentDropDown, "COMPONENT_SELECTOR").appendField(".").appendField(this.propertyDropDown, "PROP").appendField("to");
      } else {
        this.appendDummyInput().appendField("set " + this.componentType + '.').appendField(this.propertyDropDown, "PROP");
        this.appendValueInput("COMPONENT").setCheck(null).appendField('of component').setAlign(Blockly.ALIGN_RIGHT);
        this.appendValueInput("VALUE").appendField('to').setAlign(Blockly.ALIGN_RIGHT);
      }
    }
  }
};

Blockly.Blocks['d_component_component_block'] = {
  componentType: "Component",
  instanceName: "Component1",
  initComponent: function (id) {
    this.componentType = BLOCK_INFO[id]['name'];
    this.instanceName = this.componentType + '1';
    this.getBlock();
  },
  getBlock: function () {
    this.setColour(Blockly.ComponentBlock.COLOUR_COMPONENT);
    this.componentDropDown = new Blockly.FieldDropdown([[this.instanceName, this.instanceName]]);
    this.appendDummyInput().appendField(this.componentDropDown, "COMPONENT_SELECTOR");
    this.setOutput(true, null);
  }
}

Blockly.Blocks['d_helper'] = {
  helperKey: "",
  initComponent: function (id) {
    this.helperKey = BLOCK_INFO[id]['name'];
    this.getBlock();
  },
  getBlock: function () {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([[this.helperKey, "NAME1"], [this.helperKey + "q", "NAME2"]]), "OP");
    this.setOutput(true, null);
    this.setColour(Blockly.COLOUR_HELPERS);
  }
};

Blockly.Blocks['d_getter'] = {
  variableName: "",
  initComponent: function (id) {
    this.variableName = BLOCK_INFO[id]['name'];
    this.getBlock();
  },
  getBlock: function () {
    this.appendDummyInput()
      .appendField("get")
      .appendField(new Blockly.FieldTextInput(this.variableName), "VN");
    this.setOutput(true, null);
    this.setColour(Blockly.VARIABLE_CATEGORY_HUE);
  }
};

Blockly.Blocks['d_setter'] = {
  variableName: "",
  initComponent: function (id) {
    this.variableName = BLOCK_INFO[id]['name'];
    this.getBlock();
  },
  getBlock: function () {
    this.appendValueInput("NAME")
      .setCheck(null)
      .appendField("set")
      .appendField(new Blockly.FieldTextInput(this.variableName), "VN");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(Blockly.VARIABLE_CATEGORY_HUE);
  }
};