module.exports = {
  initVariables() {
    const variables = [
      { variableId: "model", name: "Model" },
      { variableId: "gtalk_active_count", name: "Active Talking Units" },
      { variableId: "gtalk_last_serial", name: "Last Talk Status Serial" },
      {
        variableId: "gtalk_last_talk_active",
        name: "Last Talk Status Active",
      },
    ];

    if (this.DATA.gtalk) {
      for (let i = 0; i < this.DATA.gtalk.length; i++) {
        const du = this.DATA.gtalk[i];
        const suffix = `${du.serial}_${du.unit_type}_${du.second_speaker || "0"}`;

        variables.push({
          variableId: `gtalk_${suffix}_talk_active`,
          name: `DU ${suffix} Talk Active`,
        });
        variables.push({
          variableId: `gtalk_${suffix}_talk_raw`,
          name: `DU ${suffix} Talk Raw`,
        });
      }
    }

    const model = this.MODELS.find((m) => m.id == this.config.model);

    this.setVariableDefinitions(variables);
    this.setVariableValues({
      model: model ? model.label : "",
    });
  },

  checkVariables() {
    try {
      const model = this.MODELS.find((m) => m.id == this.config.model);
      if (!model) {
        return;
      }

      const variableObj = {
        model: model.label,
      };

      let activeCount = 0;

      if (this.DATA.gtalk) {
        for (let i = 0; i < this.DATA.gtalk.length; i++) {
          const du = this.DATA.gtalk[i];
          const suffix = `${du.serial}_${du.unit_type}_${du.second_speaker || "0"}`;
          const talkRaw = String(du.talk || "");
          const talkActive = du.talk_active ? "1" : "0";

          if (du.talk_active) {
            activeCount++;
          }

          variableObj[`gtalk_${suffix}_talk_active`] = talkActive;
          variableObj[`gtalk_${suffix}_talk_raw`] = talkRaw;
        }
      }

      variableObj["gtalk_active_count"] = String(activeCount);

      const last = this.DATA.gtalk_last || {};
      variableObj["gtalk_last_serial"] = last.serial || "";
      variableObj["gtalk_last_talk_active"] = last.talk_active ? "1" : "0";

      this.setVariableValues(variableObj);
    } catch (error) {
      this.log("error", `Error checking variables: ${error.toString()}`);
    }
  },
};
