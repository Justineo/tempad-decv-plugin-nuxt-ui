import type {
  AccordionItem,
  AccordionProps,
  AlertProps,
  AvatarGroupProps,
  AvatarProps,
  BadgeProps,
  BreadcrumbItem,
  BreadcrumbProps,
  ButtonProps,
  CalendarProps,
  CardProps,
  CarouselProps,
  CheckboxProps,
  ChipProps,
  CollapsibleProps,
  ColorPickerProps,
  CommandPaletteProps,
  ContainerProps,
  ContextMenuItem,
  ContextMenuProps,
  DrawerProps,
  DropdownMenuItem,
  DropdownMenuProps,
  FormFieldProps,
  FormProps,
  InputMenuItem,
  InputMenuProps,
  InputNumberProps,
  InputProps,
  KbdProps,
  LinkProps,
  ModalProps,
  NavigationMenuItem,
  NavigationMenuProps,
  PaginationProps,
  PinInputProps,
  PopoverProps,
  ProgressProps,
  RadioGroupItem,
  RadioGroupProps,
  SelectItem,
  SelectMenuItem,
  SelectMenuProps,
  SelectProps,
  SeparatorProps,
  SkeletonProps,
  SlideoverProps,
  SliderProps,
  StepperItem,
  StepperProps,
  SwitchProps,
  TableProps,
  TabsItem,
  TabsProps,
  TextareaProps,
  ToastProps,
  TooltipProps,
} from '@nuxt/ui'
import type { DesignComponent, DevComponent } from '@tempad-dev/plugins'

type TrimEmoji<S extends string> = S extends `${infer _Emoji} ${infer Name}`
  ? Name
  : S

type Camelize<S extends string> =
  S extends `${infer Head}${' ' | '/'}${infer Rest}`
    ? `${Head}${Camelize<Capitalize<Rest>>}`
    : S

type LowerFirst<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${Lowercase<First>}${Rest}`
  : T

export type CleanPropName<
  T,
  // eslint-disable-next-line ts/no-empty-object-type
  M extends Partial<Record<keyof T, string>> = {},
> = {
  [K in keyof T as K extends keyof M
    ? Extract<M[K], string>
    : LowerFirst<Camelize<TrimEmoji<K & string>>>]: T[K]
}
interface ButtonGroupProps {
  size?: 'md' | 'xs' | 'sm' | 'lg' | 'xl'
  orientation?: 'vertical' | 'horizontal'
}
interface IconProps {
  name: string
}

export type RenderFn = (component: DesignComponent<any>) => DevComponent<any>

export interface ComponentPropsMap {
  UAccordion: AccordionProps<AccordionItem>
  UAlert: AlertProps
  UAvatarGroup: AvatarGroupProps
  UAvatar: AvatarProps | ChipProps
  UBadge: BadgeProps
  UBreadcrumb: BreadcrumbProps<BreadcrumbItem>
  UButton: ButtonProps
  UButtonGroup: ButtonGroupProps
  UCalendar: CalendarProps<boolean, boolean>
  UCard: CardProps
  UCarousel: CarouselProps<unknown>
  UCheckbox: CheckboxProps
  UChip: ChipProps
  UCollapsible: CollapsibleProps
  UColorPicker: ColorPickerProps
  UCommandPalette: CommandPaletteProps<unknown, unknown>
  UContainer: ContainerProps
  UContextMenu: ContextMenuProps<ContextMenuItem>
  UDrawer: DrawerProps
  UDropdownMenu: DropdownMenuProps<DropdownMenuItem>
  UForm: FormProps<object>
  UFormField: FormFieldProps
  UIcon: IconProps
  UInput: InputProps
  UInputMenu: InputMenuProps<InputMenuItem>
  UInputNumber: InputNumberProps
  UKbd: KbdProps
  ULink: LinkProps
  UModal: ModalProps
  UNavigationMenu: NavigationMenuProps<NavigationMenuItem>
  UPagination: PaginationProps
  UPinInput: PinInputProps
  UPopover: PopoverProps
  UProgress: ProgressProps
  URadioGroup: RadioGroupProps<RadioGroupItem>
  USelect: SelectProps<SelectItem>
  USelectMenu: SelectMenuProps<SelectMenuItem>
  USeparator: SeparatorProps
  USkeleton: SkeletonProps
  USlideover: SlideoverProps
  USlider: SliderProps
  UStepper: StepperProps<StepperItem>
  USwitch: SwitchProps
  UTable: TableProps<unknown>
  UTabs: TabsProps<TabsItem>
  UTextarea: TextareaProps
  UToast: ToastProps
  UTooltip: TooltipProps
}
