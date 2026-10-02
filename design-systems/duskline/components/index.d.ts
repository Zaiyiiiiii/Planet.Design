import type * as React from 'react';
type Bilingual = React.ReactNode;
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; size?: 'sm' | 'md' | 'lg'; icon?: React.ReactNode }
export declare function Button(props: ButtonProps): React.ReactElement;
export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> { label: Bilingual; hint?: Bilingual; error?: string }
export declare function TextField(props: TextFieldProps): React.ReactElement;
export interface TabsProps { items: { id: string; label: Bilingual; content: React.ReactNode }[]; defaultId?: string; label?: string; className?: string }
export declare function Tabs(props: TabsProps): React.ReactElement;
export interface StampProps { tone?: 'brass' | 'neon' | 'signal' | 'moss' | 'ember' | 'survey'; tilt?: boolean; children?: React.ReactNode; className?: string }
export declare function Stamp(props: StampProps): React.ReactElement;
export interface CaseFileProps { title: Bilingual; caseNo?: string; meta?: Bilingual; stamp?: React.ReactNode; children?: React.ReactNode; className?: string }
export declare function CaseFile(props: CaseFileProps): React.ReactElement;
export interface HeadlineProps { title: Bilingual; kicker?: Bilingual; dateline?: Bilingual; deck?: Bilingual; size?: 'xl' | 'l'; as?: 'h1' | 'h2' | 'h3'; className?: string }
export declare function Headline(props: HeadlineProps): React.ReactElement;
export interface TickerItem { sym: string; name?: string; price: string; delta: number }
export interface TickerProps { items: TickerItem[]; label?: Bilingual; ariaLabel?: string; className?: string }
export declare function Ticker(props: TickerProps): React.ReactElement;
export interface OrbitGaugeProps { value: number; unit?: string; label?: Bilingual; tone?: 'signal' | 'ember' | 'moss'; className?: string }
export declare function OrbitGauge(props: OrbitGaugeProps): React.ReactElement;
export interface PosterProps { title: Bilingual; kicker?: Bilingual; subtitle?: Bilingual; action?: React.ReactNode; className?: string; reward?: React.ReactNode; rewardLabel?: React.ReactNode }
export declare function Poster(props: PosterProps): React.ReactElement;
export interface TopBarProps { links?: { label: Bilingual; href?: string; current?: boolean }[]; appName?: string; homeHref?: string; end?: React.ReactNode; className?: string }
export declare function TopBar(props: TopBarProps): React.ReactElement;
export declare function Mark(): React.ReactElement;
export type CastKey = 'locket' | 'eli' | 'zhaowu' | 'ophelia' | 'marge' | 'tally' | 'tide' | 'hattie' | 'kite' | 'august' | 'edna';
export interface AvatarProps { who: CastKey; size?: number; className?: string }
export declare function Avatar(props: AvatarProps): React.ReactElement | null;
export type IconName = 'search' | 'folder' | 'satellite' | 'key' | 'eye' | 'check' | 'close' | 'plus' | 'upload' | 'download' | 'alert' | 'sync' | 'lock' | 'sliders';
export interface IconProps { name: IconName; size?: number; title?: string; className?: string }
export declare function Icon(props: IconProps): React.ReactElement | null;
export type FactionKey = 'agency' | 'survey' | 'union' | 'sunward' | 'choir' | 'exchange' | 'couriers' | 'consulate';
export interface FactionProps { faction: FactionKey; lang?: 'zh' | 'en'; children?: React.ReactNode; className?: string }
export declare function Faction(props: FactionProps): React.ReactElement;
export type SpeakerKey = 'locket' | 'eli' | 'zhaowu' | 'tally' | 'tide' | 'kite' | 'ophelia' | 'edna' | 'hattie' | 'marge' | 'august';
export interface NoticeProps { speaker: SpeakerKey | { name: string; faction: FactionKey; org?: string }; children: React.ReactNode; actions?: React.ReactNode; urgent?: boolean; className?: string }
export declare function Notice(props: NoticeProps): React.ReactElement;
export interface SwitchProps { label: React.ReactNode; hint?: React.ReactNode; checked?: boolean; defaultChecked?: boolean; onChange?: (checked: boolean) => void; disabled?: boolean; onLabel?: React.ReactNode; offLabel?: React.ReactNode; name?: string; value?: string; className?: string }
export declare function Switch(props: SwitchProps): React.ReactElement;
export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> { label: React.ReactNode }
export declare function Checkbox(props: CheckboxProps): React.ReactElement;
export interface ProgressProps { value: number; label?: React.ReactNode; valueText?: string; showValue?: boolean; tone?: 'default' | 'good' | 'bad'; className?: string }
export declare function Progress(props: ProgressProps): React.ReactElement;
export interface DataTableColumn { key: string; label: React.ReactNode; align?: 'left' | 'right' | 'center'; mono?: boolean }
export interface DataTableProps { columns: DataTableColumn[]; rows: Record<string, React.ReactNode>[]; caption?: React.ReactNode; className?: string }
export declare function DataTable(props: DataTableProps): React.ReactElement;
export interface DialogProps { open: boolean; title: React.ReactNode; children?: React.ReactNode; actions?: React.ReactNode; onClose?: () => void; tone?: 'default' | 'danger'; inline?: boolean; className?: string }
export declare function Dialog(props: DialogProps): React.ReactElement | null;
export interface EmptyStateProps { title: React.ReactNode; who?: CastKey; size?: number; action?: React.ReactNode; children?: React.ReactNode; className?: string }
export declare function EmptyState(props: EmptyStateProps): React.ReactElement;
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> { label: React.ReactNode; options: { value: string; label: React.ReactNode; disabled?: boolean }[]; hint?: React.ReactNode; error?: string }
export declare function Select(props: SelectProps): React.ReactElement;
export interface SidebarItem { label: React.ReactNode; href?: string; icon?: IconName; current?: boolean; count?: React.ReactNode }
export interface SidebarProps { title?: React.ReactNode; sections: { label?: React.ReactNode; items: SidebarItem[] }[]; footer?: React.ReactNode; ariaLabel?: string; className?: string }
export declare function Sidebar(props: SidebarProps): React.ReactElement;
export interface PaginationProps { total: number; page?: number; defaultPage?: number; onChange?: (page: number) => void; ariaLabel?: string; className?: string }
export declare function Pagination(props: PaginationProps): React.ReactElement;
export interface TooltipProps { label: React.ReactNode; children: React.ReactElement; side?: 'top' | 'bottom'; open?: boolean; className?: string }
export declare function Tooltip(props: TooltipProps): React.ReactElement;
export interface TagInputProps { label: React.ReactNode; tags?: string[]; defaultTags?: string[]; onChange?: (tags: string[]) => void; placeholder?: string; hint?: React.ReactNode; className?: string }
export declare function TagInput(props: TagInputProps): React.ReactElement;
export type MenuItem = { label: React.ReactNode; icon?: IconName; shortcut?: string; danger?: boolean; disabled?: boolean; onSelect?: () => void } | { separator: true };
export interface MenuProps { label: React.ReactNode; items: MenuItem[]; icon?: React.ReactNode; variant?: 'primary' | 'secondary' | 'ghost'; size?: 'sm' | 'md' | 'lg'; align?: 'start' | 'end'; open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; className?: string }
export declare function Menu(props: MenuProps): React.ReactElement;
export interface ListItem { id?: string | number; title: React.ReactNode; subtitle?: React.ReactNode; avatar?: CastKey; icon?: IconName; leading?: React.ReactNode; meta?: React.ReactNode; trailing?: React.ReactNode; href?: string; onClick?: () => void; current?: boolean }
export interface ListProps { items: ListItem[]; ariaLabel?: string; className?: string }
export declare function List(props: ListProps): React.ReactElement;
export interface NeonSignProps { text: React.ReactNode; sub?: string; tone?: 'neon' | 'sign' | 'signal' | 'brass'; horizontal?: boolean; flicker?: boolean; className?: string }
export declare function NeonSign(props: NeonSignProps): React.ReactElement;
export interface StallProps { item: React.ReactNode; price: React.ReactNode; was?: React.ReactNode; note?: React.ReactNode; stamp?: React.ReactNode; tilt?: number; className?: string }
export declare function Stall(props: StallProps): React.ReactElement;
export interface MarqueeProps { title: React.ReactNode; kicker?: React.ReactNode; sub?: React.ReactNode; className?: string }
export declare function Marquee(props: MarqueeProps): React.ReactElement;
export interface RouteBadgeProps { line: string | number; label?: React.ReactNode; sub?: React.ReactNode; size?: 'sm' | 'md'; className?: string }
export declare function RouteBadge(props: RouteBadgeProps): React.ReactElement;
export type AssistantState = 'idle' | 'listening' | 'thinking' | 'success' | 'error' | 'sleep';
export interface AssistantSatellite { id?: string | number; name: string; status?: 'ok' | 'busy' | 'done' | 'error' | 'sleep'; onClick?: (s: AssistantSatellite) => void }
export interface AssistantProps { state?: AssistantState; satellites?: AssistantSatellite[]; level?: number; message?: React.ReactNode; aside?: React.ReactNode; footnote?: React.ReactNode; actions?: React.ReactNode; name?: string; size?: number; compact?: boolean; className?: string }
export declare function Assistant(props: AssistantProps): React.ReactElement;
export interface LogoProps { state?: AssistantState; satellites?: AssistantSatellite[]; size?: number; onSatelliteClick?: (s: AssistantSatellite) => void; className?: string }
export declare function Logo(props: LogoProps): React.ReactElement;
declare global { interface Window { Planet: { Logo: typeof Logo; Assistant: typeof Assistant; Marquee: typeof Marquee; RouteBadge: typeof RouteBadge; NeonSign: typeof NeonSign; Stall: typeof Stall; Menu: typeof Menu; List: typeof List; Select: typeof Select; Sidebar: typeof Sidebar; Pagination: typeof Pagination; Tooltip: typeof Tooltip; TagInput: typeof TagInput; Switch: typeof Switch; Checkbox: typeof Checkbox; Progress: typeof Progress; DataTable: typeof DataTable; Dialog: typeof Dialog; EmptyState: typeof EmptyState; Button: typeof Button; TextField: typeof TextField; Tabs: typeof Tabs; Stamp: typeof Stamp; CaseFile: typeof CaseFile; Headline: typeof Headline; Ticker: typeof Ticker; OrbitGauge: typeof OrbitGauge; Poster: typeof Poster; TopBar: typeof TopBar; Mark: typeof Mark; Avatar: typeof Avatar; Icon: typeof Icon; Faction: typeof Faction; Notice: typeof Notice } } }
