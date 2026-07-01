## Audio Technica Discussion System (DEV v1 AT)

This is a heavily modified DEV fork of the original Audio-Technica Companion module.

It is intentionally stripped down to a focused workflow:
- MIC ON
- MIC OFF
- Button color feedback for TALK ON/OFF status

The controller target is the ATUC-50CU. The unit-type selections in actions refer to microphone unit types behind the controller (DU/INT/IU/IRDU/DUa), not the controller itself.

### What's Different From The Original Module

- Most original actions were removed.
- Most original feedbacks were removed.
- Most original variables were removed.
- Polling is focused on talk-state data for reliable ON/OFF button feedback.

### Companion DEV Mode / Dev Version Workflow

Use these steps to ensure Companion is running this modified module build:

1. Open Companion and go to the modules page.
2. Refresh the modules list.
3. Add the module `DEV v1 AT: AT-UC50` or `DEV v1 AT: AT-UCIR`.
4. In the Add dialog, set **Module Version** to **Dev version**.
5. After updates to this module, refresh modules and re-open/re-add the module instance so Companion reloads the latest dev build.

If you do not select **Dev version**, Companion may run an installed/released version instead of this local modified one.

### Configuration

- Host/IP: IP address of the ATUC-50CU controller.
- TCP Port: default `17300`.
- Optional Polling: should normally remain enabled for status refresh.
- Optional UDP Listen: enable only if you use multicast status updates from your system.
- Optional Debug Logging: enable to trace command/response traffic in Companion logs.

### Logging

With debug logging enabled:
- `TCP TX` = outgoing commands
- `TCP RX` = incoming TCP responses
- `UDP RX` = incoming UDP status packets

### Available Actions

- MIC ON (Request + Permit)
- MIC OFF (Talk Off + Request Clear)

### Available Feedbacks

- DU Talk Active (ON state)
- DU Muted/Not Talking (OFF state)

### Available Variables

- gtalk_active_count
- gtalk_last_serial
- gtalk_last_talk_active
