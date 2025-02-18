import type {
  DesignNode,
  DevComponent,
  TransformOptions,
} from '@tempad-dev/plugins'

import type { CleanPropName, ComponentPropsMap, RenderFn } from './types'

import { mapKeys } from '@s-libs/micro-dash'
import { h as createComponent } from '@tempad-dev/plugins'
import { Icon } from './components/icon'

export function cleanPropNames<
  T extends Record<string, unknown>,
  // eslint-disable-next-line ts/no-empty-object-type
  M extends Partial<Record<keyof T, string>> = {},
>(props: T, mapping?: M): CleanPropName<T, M> {
  return mapKeys(props, (_, key) => {
    if (mapping && key in mapping) {
      const mapped = mapping[key as keyof T]
      return mapped ?? key
    }
    const trimmedKey = (key as string).replace(/^[^ ]+ /, '')
    const camelizedKey = trimmedKey.replace(/[ /]+(.)/g, (_, c) =>
      c.toUpperCase(),
    )
    return camelizedKey.charAt(0).toLowerCase() + camelizedKey.slice(1)
  }) as CleanPropName<T, M>
}

export function renderSlot(
  name: string,
  children: DevComponent['children'],
): DevComponent
export function renderSlot(
  name: string,
  props: string,
  children: DevComponent['children'],
): DevComponent
export function renderSlot(
  name: string,
  propsOrChildren: string | DevComponent['children'],
  children?: DevComponent['children'],
): DevComponent {
  const props = children ? (propsOrChildren as string) : null
  const slotChildren = children ?? (propsOrChildren as DevComponent['children'])

  return createComponent(
    'template',
    {
      [`#${name}`]: props ?? true,
    },
    slotChildren,
  )
}

export function toUpperFirst(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1)
}

export function toCamelCase(input: string): string {
  return input.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

export function toKebabCase(input: string): string {
  return input
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/(\d)([a-z])/gi, '$1-$2')
    .replace(/([a-z])(\d)/gi, '$1-$2')
    .replace(/[_\s]/g, '-')
    .toLowerCase()
}

export function toPascalCase(input: string): string {
  return toUpperFirst(toCamelCase(input))
}

export function toConstantCase(input: string): string {
  return input.toUpperCase().replace(/-/g, '_')
}

export function toLowerCase<T extends string>(input: T): Lowercase<T> {
  return input.toLowerCase() as Lowercase<T>
}

export function pick<T extends object>(
  obj: T,
  defaults: Partial<T>,
): Partial<T> {
  const result: Partial<T> = {}

  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== defaults[key]) {
      result[key] = obj[key]
    }
  }

  return result
}

export const LOREM_IPSUM_TITLE = 'Lorem ipsum'
export const LOREM_IPSUM_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'

export function h<K extends keyof ComponentPropsMap>(
  name: K,
  props: Partial<ComponentPropsMap[K]>,
  defaultProps: Partial<ComponentPropsMap[K]>,
  children?: (DevComponent | string)[],
): DevComponent<Partial<ComponentPropsMap[K]>> {
  return createComponent(name, pick(props, defaultProps), children)
}

// Fisher–Yates shuffle
export function shuffle<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j]!, array[i]!]
  }
  return array
}

export function getFirst<T extends object, K extends keyof T>(
  items: T[],
  key: K,
): T[K] | undefined {
  return items.find((item) => item[key] != null)?.[key]
}

export function mapComponentNames(
  names: readonly string[],
  component: RenderFn,
) {
  return names.reduce((acc, name) => ({ ...acc, [name]: component }), {})
}

export function isIcon(node: DesignNode): boolean {
  return (
    node.type === 'INSTANCE' &&
    node.children.length === 1 &&
    node.children[0]!.type === 'VECTOR' &&
    node.children[0]!.name === 'Vector'
  )
}

export function createTransformComponent(
  componentMap: Record<string, RenderFn>,
): TransformOptions['transformComponent'] {
  return ({ component }) => {
    try {
      if (isIcon(component)) {
        // only child is a vector, assume it's an icon
        return Icon(component)
      }

      const render = componentMap[component.name.replaceAll(' ', '')]
      return render ? render(component) : ''
    } catch (e: unknown) {
      console.error(e)
      return ''
    }
  }
}

export function isInteger(input: string | number): boolean {
  return /^\d+$/.test(String(input))
}
