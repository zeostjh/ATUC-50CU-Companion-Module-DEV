module.exports = {
  initActions() {
    const actions = {};

    const model = this.MODELS.find((m) => m.id == this.config.model);

    if (model) {
      if (model.actions.includes("mic_on")) {
        actions["mic_on"] = {
          name: "MIC ON (Request + Permit)",
          options: [
            {
              type: "textinput",
              label: "Serial Number / Device ID",
              id: "serial",
              default: "00000000",
            },
            {
              type: "dropdown",
              label: "Unit Type",
              id: "unit_type",
              default: "0",
              choices: [
                { id: "0", label: "ATUC-50DU" },
                { id: "1", label: "ATUC-50INT" },
                { id: "2", label: "ATUC-50IU" },
                { id: "3", label: "ATUC-IRDU" },
                { id: "4", label: "ATUC-50DUa" },
              ],
            },
            {
              type: "dropdown",
              label: "2 Speaker",
              id: "second_speaker",
              default: "0",
              choices: [
                { id: "0", label: "First Talker" },
                { id: "1", label: "Second Talker" },
              ],
              isVisible: (opt) => opt.unit_type == "3",
            },
          ],
          callback: (action) => {
            const opt = action.options;

            let requestParams = "1," + opt.serial + "," + opt.unit_type + ",";
            let permitParams = "1," + opt.serial + "," + opt.unit_type + ",";

            if (opt.unit_type == "3") {
              requestParams += opt.second_speaker;
              permitParams += opt.second_speaker;
            }

            this.sendCommand("reqon", "S", requestParams);

            const delay = 10;
            setTimeout(() => {
              this.sendCommand("prmit", "S", permitParams);
            }, delay);
          },
        };
      }

      if (model.actions.includes("mic_off")) {
        actions["mic_off"] = {
          name: "MIC OFF (Talk Off + Request Clear)",
          options: [
            {
              type: "textinput",
              label: "Serial Number / Device ID",
              id: "serial",
              default: "00000000",
            },
            {
              type: "dropdown",
              label: "Unit Type",
              id: "unit_type",
              default: "0",
              choices: [
                { id: "0", label: "ATUC-50DU" },
                { id: "1", label: "ATUC-50INT" },
                { id: "2", label: "ATUC-50IU" },
                { id: "3", label: "ATUC-IRDU" },
                { id: "4", label: "ATUC-50DUa" },
              ],
            },
            {
              type: "dropdown",
              label: "2 Speaker",
              id: "second_speaker",
              default: "0",
              choices: [
                { id: "0", label: "First Talker" },
                { id: "1", label: "Second Talker" },
              ],
              isVisible: (opt) => opt.unit_type == "3",
            },
          ],
          callback: (action) => {
            const opt = action.options;

            let talkOffParams = "1," + opt.serial + "," + opt.unit_type + ",";
            let clearRequestParams = "1," + opt.serial + "," + opt.unit_type + ",";

            if (opt.unit_type == "3") {
              talkOffParams += opt.second_speaker;
              clearRequestParams += opt.second_speaker;
            }

            this.sendCommand("takof", "S", talkOffParams);

            const delay = 10;
            setTimeout(() => {
              this.sendCommand("reqof", "S", clearRequestParams);
            }, delay);
          },
        };
      }
    }

    this.setActionDefinitions(actions);
  },
};
