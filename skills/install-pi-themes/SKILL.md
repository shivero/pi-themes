---
name: install-pi-themes
description: Install the @grzechoo/pi-themes package for Pi and switch the active theme to tokyo-night, tokyo-night-storm or catppuccin-mocha. Use when the user asks to install, update or select a Tokyo Night or Catppuccin theme in Pi.
license: MIT
---

# Install pi-themes

`@grzechoo/pi-themes` is a themes-only Pi package (no extension code). It ships
three themes: `tokyo-night`, `tokyo-night-storm`, `catppuccin-mocha`.

## 1. Check what is there

```sh
pi list
```

If the package is already listed, skip to step 3. If it is listed under an old
name or a local path, remove that entry first:

```sh
pi remove <the source shown by pi list>
```

## 2. Install

```sh
pi install npm:@grzechoo/pi-themes
```

Pin a version when the user wants a fixed one: `pi install npm:@grzechoo/pi-themes@0.1.0`.
Add `--local` only if the theme should be declared for this project instead of
for the user; project declarations need project trust.

Verify the install before touching any theme setting:

```sh
pi list
```

Themes load at startup. In a running session, `/reload` picks up the new
package.

## 3. Select the theme

The theme choice is a user preference, so let the user make it:

- Interactive: `/settings` → **Theme** → pick `tokyo-night`, `tokyo-night-storm` or `catppuccin-mocha`. Pi stores it as `"theme": "<name>"` in `~/.pi/agent/settings.json`.
- One run only, without changing the saved setting: `pi --use-theme tokyo-night`.
- Only edit `theme` in `~/.pi/agent/settings.json` if the user asked for a specific theme in words; never switch their theme silently.

## 4. Tell the user about the terminal background

Pi themes do not paint the terminal background — the TUI draws on the terminal's
own background color. For the intended look the terminal background must match
the theme:

| Theme | Terminal background |
| --- | --- |
| `tokyo-night` | `#1a1b26` |
| `tokyo-night-storm` | `#24283b` |
| `catppuccin-mocha` | `#1e1e2e` |

## 5. Update and remove

```sh
pi update npm:@grzechoo/pi-themes   # or: pi update --extensions
pi remove npm:@grzechoo/pi-themes
```

## Troubleshooting

- A theme is missing from `/settings`: run `/reload`, or restart Pi if the package was installed just now.
- A theme name appears twice or is ignored: a standalone theme with the same name exists in `~/.pi/agent/themes/` or `.pi/themes/`. Pi reports the duplicate as a resource collision — remove the standalone file and keep the package copy.
- Colors look flat or colorless: the terminal is not in truecolor mode. Pi falls back to 256-color approximations.
- Edits to the package's JSON do not show up: the installed copy under `~/.pi/agent/npm/node_modules/@grzechoo/pi-themes` (or `~/.pi/agent/git/…`) is what Pi loads — patch the source repository and reinstall instead.
