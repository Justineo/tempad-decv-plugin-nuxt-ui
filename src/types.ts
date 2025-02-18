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
import type {
  AuthFormProps,
  BannerProps,
  BlogPostProps,
  BlogPostsProps,
  DashboardGroupProps,
  DashboardNavbarProps,
  DashboardPanelProps,
  DashboardResizeHandleProps,
  DashboardSearchButtonProps,
  DashboardSearchProps,
  DashboardSidebarCollapseProps,
  DashboardSidebarProps,
  DashboardSidebarToggleProps,
  DashboardToolbarProps,
  ErrorProps,
  FooterColumnsProps,
  FooterProps,
  HeaderProps,
  MainProps,
  PageAccordionProps,
  PageAnchor,
  PageAnchorsProps,
  PageAsideProps,
  PageBodyProps,
  PageCardProps,
  PageColumnsProps,
  PageCTAProps,
  PageFeatureProps,
  PageGridProps,
  PageHeaderProps,
  PageHeroProps,
  PageLink,
  PageLinksProps,
  PageListProps,
  PageLogosProps,
  PageMarqueeProps,
  PageProps,
  PageSectionProps,
  PricingPlanProps,
  PricingPlansProps,
  UserProps,
} from '@nuxt/ui-pro'
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

type AuthFormField = FormFieldProps & {
  name: string
  type?: 'checkbox' | 'select' | 'password' | 'text'
  defaultValue?: any
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

  UAuthForm: AuthFormProps<object, AuthFormField>
  UBanner: BannerProps
  UBlogPost: BlogPostProps
  UBlogPosts: BlogPostsProps
  // UColorModeAvatar: ColorModeAvatarProps
  // UColorModeButton: ColorModeButtonProps
  // UColorModeImage: ColorModeImageProps
  // UColorModeSelect: ColorModeSelectProps
  // UColorModeSwitch: ColorModeSwitchProps
  // UContentNavigation: ContentNavigationProp
  // UContentSearch: ContentSearchProps
  // UContentSearchButton: ContentSearchButtonProps
  // UContentSurround: ContentSurroundProps
  // UContentToc: ContentTocProps
  UDashboardGroup: DashboardGroupProps
  UDashboardNavbar: DashboardNavbarProps
  UDashboardPanel: DashboardPanelProps
  UDashboardResizeHandle: DashboardResizeHandleProps
  UDashboardSearch: DashboardSearchProps
  UDashboardSearchButton: DashboardSearchButtonProps
  UDashboardSidebar: DashboardSidebarProps<object>
  UDashboardSidebarCollapse: DashboardSidebarCollapseProps
  UDashboardSidebarToggle: DashboardSidebarToggleProps
  UDashboardToolbar: DashboardToolbarProps
  UError: ErrorProps
  UFooter: FooterProps
  UFooterColumns: FooterColumnsProps<object>
  UHeader: HeaderProps<'modal' | 'slideover' | 'drawer'>
  // ULocaleSelect: LocaleSelectProps
  UMain: MainProps
  UPage: PageProps
  UPageAccordion: PageAccordionProps<AccordionItem>
  UPageAnchors: PageAnchorsProps<PageAnchor>
  UPageAside: PageAsideProps
  UPageBody: PageBodyProps
  UPageCard: PageCardProps
  UPageColumns: PageColumnsProps
  UPageCTA: PageCTAProps
  UPageFeature: PageFeatureProps
  UPageGrid: PageGridProps
  UPageHeader: PageHeaderProps
  UPageHero: PageHeroProps
  UPageLinks: PageLinksProps<PageLink>
  UPageList: PageListProps
  UPageLogos: PageLogosProps
  UPageMarquee: PageMarqueeProps
  UPageSection: PageSectionProps
  UPricingPlan: PricingPlanProps
  UPricingPlans: PricingPlansProps
  UUser: UserProps
}
