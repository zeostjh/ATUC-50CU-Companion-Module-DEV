module.exports = {
  initPresets() {
    let presets = [];
    const duCount = 8;

    for (let i = 1; i <= duCount; i++) {
      const serial = String(i).padStart(8, "0");

      presets.push({
        type: "button",
        category: "Talk / Mute Grid",
        name: `DU ${i} Talk`,
        style: {
          text: `Talk\\nDU ${i}`,
          size: "14",
          color: 16777215,
          bgcolor: 0,
        },
        steps: [
          {
            down: [
              {
                actionId: "mic_on",
                options: {
                  serial: serial,
                  unit_type: "0",
                  second_speaker: "0",
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: "du_talk_active",
            options: {
              serial: serial,
              unit_type: "0",
              second_speaker: "0",
            },
            style: {
              bgcolor: 51200,
              color: 0,
            },
          },
        ],
      });

      presets.push({
        type: "button",
        category: "Talk / Mute Grid",
        name: `DU ${i} Mute`,
        style: {
          text: `Mute\\nDU ${i}`,
          size: "14",
          color: 16777215,
          bgcolor: 0,
        },
        steps: [
          {
            down: [
              {
                actionId: "mic_off",
                options: {
                  serial: serial,
                  unit_type: "0",
                  second_speaker: "0",
                },
              },
            ],
            up: [],
          },
        ],
        feedbacks: [
          {
            feedbackId: "du_muted",
            options: {
              serial: serial,
              unit_type: "0",
              second_speaker: "0",
            },
            style: {
              bgcolor: 13369344,
              color: 0,
            },
          },
        ],
      });
    }

    this.setPresetDefinitions(presets);
  },
};
