import type { DesignComponent } from '@tempad-dev/plugins'
import type { CommandPaletteProperties } from '../components/command-palette'
import { findChild } from '@tempad-dev/plugins'
import { CommandPalette } from '../components/command-palette'
import { h } from '../utils'

// eslint-disable-next-line ts/no-empty-object-type
export type ContentSearchProperties = {}

export function ContentSearch(component: DesignComponent<ContentSearchProperties>) {
  const commandPalette = findChild<DesignComponent<CommandPaletteProperties>>(component, {
    type: 'INSTANCE',
    name: 'CommandPalette',
  })

  const props = commandPalette ? CommandPalette(commandPalette).props : {}

  return h(
    'UContentSearch',
    {
      ...props,
    },
    {},
  )
}
