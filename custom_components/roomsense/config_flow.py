"""Config flow for RoomSense integration."""

from __future__ import annotations

from homeassistant.config_entries import ConfigFlow

from .const import DOMAIN


class RoomSenseConfigFlow(ConfigFlow, domain=DOMAIN):
    """Handle the config flow for RoomSense."""

    VERSION = 1

    async def async_step_user(self, user_input=None):
        """Handle the initial step – just confirm setup."""
        if user_input is not None:
            # Prevent multiple instances
            await self.async_set_unique_id(DOMAIN)
            self._abort_if_unique_id_configured()
            return self.async_create_entry(title="RoomSense", data={})

        return self.async_show_form(step_id="user")
