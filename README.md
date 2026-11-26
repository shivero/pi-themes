# pi-theme-tokyo-night

Two dark themes for the [Pi](https://pi.dev) coding agent: **Tokyo Night** and
**Tokyo Night Storm**. Colors are mapped from
[tokyonight.nvim](https://github.com/folke/tokyonight.nvim) v4.14.1: palette
colors, syntax roles (`@keyword`, `@operator`, `@type`, …), markdown roles and
selection/search backgrounds.

## Install

Not published to npm yet, so install straight from this repository:

```sh
pi install git:ssh://git@forgejo/grzes/pi-theme-tokyo-night.git
```

Then open `/settings` → **Theme** and pick `tokyo-night` or
`tokyo-night-storm`.

To uninstall:

```sh
pi remove git:ssh://git@forgejo/grzes/pi-theme-tokyo-night.git
```

## Themes

| Theme | Appearance | Background |
| --- | --- | --- |
| `tokyo-night` | dark | `#1a1b26` |
| `tokyo-night-storm` | dark | `#24283b` |

Both use the same syntax and markdown palette; only the background-derived
colors differ (panels, selection, borders, HTML export backgrounds).

### About the background

Pi themes do not set the terminal background: the TUI draws on the terminal's
own background color, and a theme only supplies foreground colors and the
backgrounds of panels, selection and search matches. To get the intended look,
set your terminal background to the theme's background color — `#1a1b26` for
`tokyo-night`, `#24283b` for `tokyo-night-storm`. Panel colors are computed from
that background, so Storm's panels are lighter than Night's.

## Palette

| Role | Color |
| --- | --- |
| text / variables | `#c0caf5` |
| secondary text | `#9aa5ce` (muted), `#a9b1d6` (quoted) |
| comments, dim text | `#565f89` |
| keyword | `#9d7cd8` |
| operator | `#89ddff` |
| function | `#7aa2f7` |
| type | `#2ac3de` |
| string | `#9ece6a` |
| number / constant | `#ff9e64` |
| error / removed | `#f7768e` |
| warning | `#e0af68` |
| success / added | `#9ece6a` |
| markdown heading, inline code | `#7aa2f7` |
| markdown link | `#1abc9c` |
| markdown list bullet | `#ff9e64` |

`oklch`/`okhsl` are not used; every value is an sRGB hex color so the themes
render identically on truecolor and 256-color terminals (Pi approximates the
latter).

## Development

Themes are plain Pi theme JSON files, validated against
`https://pi.dev/schemas/theme.schema.json`:

```text
themes/tokyo-night.json
themes/tokyo-night-storm.json
```

`tokyo-night-theme.md` is the palette reference the themes were mapped from.

The quickest way to iterate is a local install, which reads this directory
directly:

```sh
pi install /path/to/pi-theme-tokyo-night
```

Edit `themes/*.json`, run `/reload`, and the change appears. A `git:` install
instead clones the repository into `~/.pi/agent/git/…`, so edits made here are
not the copy Pi loads.

## Credits

Palette and role mapping follow [tokyonight.nvim](https://github.com/folke/tokyonight.nvim)
by folke (MIT). This package is not affiliated with that project.

## License

MIT — see [LICENSE](LICENSE).
