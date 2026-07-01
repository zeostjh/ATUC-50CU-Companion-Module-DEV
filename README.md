# Audio Technica Discussion System (DEV v1 AT)

Help: dev@gregorylandon.com

This is a heavily modified DEV fork of the original Audio-Technica Companion module.

- MIC ON
- MIC OFF
- Button color feedback for TALK ON/OFF status

The controller target is the ATUC-50CU. The unit-type selections in actions refer to microphone unit types behind the controller (DU/INT/IU/IRDU/DUa), not the controller itself.

## What's Different From The Original Module

- Most original actions were removed.
- Most original feedbacks were removed.
- Most original variables were removed.
- Polling is focused on talk-state data for reliable ON/OFF button feedback.

## Companion DEV Mode / Dev Version Workflow

Use these steps to ensure Companion is running this modified module build:

1. Open Companion and go to the modules page.
2. Refresh the modules list.
3. Add the module `DEV v1 AT: AT-UC50` or `DEV v1 AT: AT-UCIR`.
4. In the Add dialog, set `Module Version` to `Dev version`.
5. After updates to this module, refresh modules and re-open/re-add the module instance so Companion reloads the latest dev build.

If you do not select `Dev version`, Companion may run an installed/released version instead of this local modified one.

## Configuration

- Host/IP: IP address of the ATUC-50CU controller.
- TCP Port: default `17300`.
- Optional Polling: should normally remain enabled for status refresh.
- Optional UDP Listen: enable only if you use multicast status updates from your system.
- Optional Debug Logging: enable to trace command/response traffic in Companion logs.

## Logging

With debug logging enabled:

- `TCP TX` = outgoing commands
- `TCP RX` = incoming TCP responses
- `UDP RX` = incoming UDP status packets

## Available Actions

- MIC ON (Request + Permit)
- MIC OFF (Talk Off + Request Clear)

## Available Feedbacks

- DU Talk Active (ON state)
- DU Muted/Not Talking (OFF state)

## Available Variables

- gtalk_active_count
- gtalk_last_serial
- gtalk_last_talk_active

## Troubleshooting

If MIC ON/MIC OFF does not behave as expected, test the CU with raw TCP commands first. This verifies basic network reachability and protocol response independent of this module.

### Quick Raw TCP Test In Companion

1. Add the Generic TCP/UDP module in Companion.
2. Configure it to the ATUC-50CU IP, port 17300, protocol TCP.
3. Create a button action using Generic TCP/UDP Send.
4. Send this Talk On test command:

```text
prmit S 0000 00 NC 1,1\r
```

5. Create another button for Talk Off test:

```text
takof S 0000 00 NC 1\r
```

6. Press each test button and watch for response/behavior from the CU.

### Expected Outcome

- If raw commands work but this module does not, the issue is likely module configuration (serial, unit type, or instance/version selection).
- If raw commands do not work, the issue is likely network/path/device side (IP, port, ACL/firewall, or CU protocol settings).

### Checklist When Raw Test Fails

1. Confirm CU IP address is correct and reachable from the Companion host.
2. Confirm port 17300 is open and listening on the CU.
3. Confirm you are using TCP (not UDP) for raw command testing.
4. Confirm the CU and the target unit are online and in the expected conference mode.
5. Confirm Companion is loading Dev version for this module when testing module actions.

### Notes

- The raw commands above are intended as a connectivity/protocol sanity check.
- Use the module MIC ON and MIC OFF actions for normal operation and button feedback workflows.
