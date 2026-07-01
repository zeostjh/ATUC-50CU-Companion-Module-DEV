const { combineRgb } = require("@companion-module/base");

module.exports = {
  getTalkEntry(options) {
    const serial = String(options.serial || "").trim();
    const unitType = String(options.unit_type || "0");
    const secondSpeaker = String(options.second_speaker || "0");

    if (!serial) {
      return undefined;
    }

    return this.DATA.gtalk.find(
      (entry) =>
        entry.serial === serial &&
        entry.unit_type === unitType &&
        (entry.second_speaker || "0") === secondSpeaker,
    );
  },

  initFeedbacks() {
    const feedbacks = {};

    const model = this.MODELS.find((m) => m.id == this.config.model);

    if (model) {
      if (model.feedbacks.includes("talkstate")) {
        feedbacks["du_talk_active"] = {
          type: "boolean",
          name: "DU Talk Active",
          description: "True when the selected DU is currently talking",
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
          defaultStyle: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(0, 200, 0),
          },
          callback: (event) => {
            const entry = this.getTalkEntry(event.options);
            return entry ? entry.talk_active : false;
          },
        };
      }

      if (model.feedbacks.includes("mutestate")) {
        feedbacks["du_muted"] = {
          type: "boolean",
          name: "DU Muted/Not Talking",
          description: "True when the selected DU is not currently talking",
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
          defaultStyle: {
            color: combineRgb(0, 0, 0),
            bgcolor: combineRgb(200, 0, 0),
          },
          callback: (event) => {
            const entry = this.getTalkEntry(event.options);
            return entry ? !entry.talk_active : false;
          },
        };
      }
    }

    this.setFeedbackDefinitions(feedbacks);
  },
};
