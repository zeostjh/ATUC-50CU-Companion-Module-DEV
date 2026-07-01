// Audio Technica Digital Mixer

const {
  InstanceBase,
  InstanceStatus,
  runEntrypoint,
} = require("@companion-module/base");
const UpgradeScripts = require("./src/upgrades");

const config = require("./src/config");
const actions = require("./src/actions");
const feedbacks = require("./src/feedbacks");
const variables = require("./src/variables");
const presets = require("./src/presets");

const utils = require("./src/utils");

const models = require("./src/models");

class atucInstance extends InstanceBase {
  constructor(internal) {
    super(internal);

    // Assign the methods from the listed files to this class
    Object.assign(this, {
      ...config,
      ...actions,
      ...feedbacks,
      ...variables,
      ...presets,
      ...utils,
      ...models,
    });

    this.socket = undefined;
    this.udpSocket = undefined;

    this.cmdPipe = [];
    this.lastReturnedCommand = undefined;

    this.pollTimer = undefined;

    this.CONTROL_MODELID = "0000";
    this.CONTROL_UNITNUMBER = "00";
    this.CONTROL_CONTINUESELECT = "NC";
    this.CONTROL_ACK = "ACK";
    this.CONTROL_NAK = "NAK";
    this.CONTROL_END = "\r";

    this.DATA = {
      gcust: {},
      gminp: {},
      gxinp: {},
      giinp: {},
      gaout: {},
      ggpio: {},
      gintc: {},
      greco: {},
      gconf: {},
      gtalk: [],
      recst: {},
      glvmt: [],
    };
  }

  async destroy() {
    if (this.socket !== undefined) {
      this.socket.destroy();
    }

    if (this.udpSocket !== undefined) {
      this.udpSocket.close();
      delete this.udpSocket;
    }

    if (this.pollTimer !== undefined) {
      clearInterval(this.pollTimer);
      delete this.pollTimer;
    }
  }

  async init(config) {
    this.updateStatus(InstanceStatus.Connecting);
    this.configUpdated(config);
  }

  async configUpdated(config) {
    // polling is running and polling has been de-selected by config change
    if (this.pollTimer !== undefined) {
      clearInterval(this.pollTimer);
      delete this.pollTimer;
    }
    this.config = config;

    this.setUpInternalDataArrays();

    this.initActions();
    this.initFeedbacks();
    this.initVariables();
    this.initPresets();

    this.initTCP();
    this.initUDP();
  }
}

runEntrypoint(atucInstance, UpgradeScripts);
