# Changelog

## 1.0.0 — 2026-03-01

Initial public release.

### Features

- **Self-learning MPC climate control** with Extended Kalman Filter thermal model and automatic bang-bang fallback
- **Proportional valve control** — TRVs receive calculated setpoints for smoother temperature regulation
- **Solar gain modeling** — learns per-room solar response from sun position, clear-sky model, and weather entity cloud coverage
- **Multi-scheduler** — multiple schedule entities per room with selector switching
- **Manual override** — boost, eco, and custom temperature with configurable duration
- **Presence-based scheduling** — eco temperature when all assigned persons are away
- **Vacation mode** — global setback temperature with end date
- **Window/door pause** — climate control pauses when sensors detect open windows, with configurable delays
- **Mold risk detection** — surface humidity estimation using DIN 4108-2 method with configurable notifications
- **Mold prevention** — automatic target temperature raise when mold risk is detected
- **Valve protection** — periodic cycling of idle TRV valves to prevent seizing
- **Analytics dashboard** — temperature charts with heating power, solar irradiance, and model predictions (24h–90d)
- **Two operating modes** — Full Control (with external temp sensor) and Managed Mode (device self-regulates)
- **Room display name aliases** — custom names for rooms independent of HA area names
- **Climate device auto-detection** — thermostat vs. AC detected from HVAC modes
- **Responsive UI** — mobile-ready with HA-native toolbar and companion app support
- **Multilingual** — English and German, auto-detected from HA language setting
- **HACS compatible** — install via HACS custom repository
