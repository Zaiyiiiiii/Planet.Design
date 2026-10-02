import type * as React from 'react';
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: 'primary' | 'secondary' | 'danger' | 'ghost'; size?: 'sm' | 'md' | 'lg'; icon?: React.ReactNode }
export declare function Button(props: ButtonProps): React.ReactElement;
export interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> { label: React.ReactNode; hint?: React.ReactNode; error?: string }
export declare function TextField(props: TextFieldProps): React.ReactElement;
export interface TabsProps { items: { id: string; label: React.ReactNode; content: React.ReactNode }[]; defaultId?: string; label?: string }
export declare function Tabs(props: TabsProps): React.ReactElement;
export interface BulkheadProps { title: React.ReactNode; code?: string; status?: React.ReactNode; children?: React.ReactNode; className?: string }
export declare function Bulkhead(props: BulkheadProps): React.ReactElement;
export interface LampProps { tone?: 'off' | 'patina' | 'copper' | 'alarm' | 'frost'; children?: React.ReactNode }
export declare function Lamp(props: LampProps): React.ReactElement;
export interface HazardProps { title: React.ReactNode; level?: 'warning' | 'critical'; levelLabel?: React.ReactNode; actions?: React.ReactNode; children?: React.ReactNode }
export declare function Hazard(props: HazardProps): React.ReactElement;
export interface ThermalGaugeProps { value: number; reading?: number | string; unit?: string; label?: React.ReactNode }
export declare function ThermalGauge(props: ThermalGaugeProps): React.ReactElement;
export type FactionKey = 'agency' | 'survey' | 'union' | 'sunward' | 'choir' | 'exchange' | 'couriers' | 'consulate';
export type SpeakerKey = 'locket' | 'eli' | 'zhaowu' | 'tally' | 'tide' | 'kite' | 'ophelia' | 'edna' | 'hattie' | 'marge' | 'august';
export interface NoticeProps { speaker: SpeakerKey | { name: string; faction: FactionKey; org?: string }; children: React.ReactNode; actions?: React.ReactNode; urgent?: boolean }
export declare function Notice(props: NoticeProps): React.ReactElement;
export declare function Mark(): React.ReactElement;
export type CastKey = 'locket' | 'eli' | 'zhaowu' | 'ophelia' | 'marge' | 'tally' | 'tide' | 'hattie' | 'kite' | 'august' | 'edna';
export interface AvatarProps { who: CastKey; size?: number; className?: string }
export declare function Avatar(props: AvatarProps): React.ReactElement | null;
export type IconName = 'search' | 'folder' | 'satellite' | 'key' | 'eye' | 'check' | 'close' | 'plus' | 'upload' | 'download' | 'alert' | 'sync' | 'lock' | 'sliders';
export interface IconProps { name: IconName; size?: number; title?: string; className?: string }
export declare function Icon(props: IconProps): React.ReactElement | null;
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
export interface TopBarProps { links?: { label: React.ReactNode; href?: string; current?: boolean }[]; appName?: string; homeHref?: string; end?: React.ReactNode; className?: string }
export declare function TopBar(props: TopBarProps): React.ReactElement;
export interface FactionProps { faction: FactionKey; lang?: 'zh' | 'en'; children?: React.ReactNode; className?: string }
export declare function Faction(props: FactionProps): React.ReactElement;
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
export interface PressureGaugeProps { value: number; reading?: number | string; readoutUnit?: string; unit?: string; max?: number; redline?: number; label?: React.ReactNode; className?: string }
export declare function PressureGauge(props: PressureGaugeProps): React.ReactElement;
export interface SkyPortProps { title?: React.ReactNode; sub?: React.ReactNode; note?: React.ReactNode; seed?: number; showHome?: boolean; homeX?: number; homeY?: number; ariaLabel?: string; className?: string }
export declare function SkyPort(props: SkyPortProps): React.ReactElement;
export interface OrreryProps { nodes: { name: React.ReactNode; online?: boolean; note?: React.ReactNode }[]; label?: string; className?: string }
export declare function Orrery(props: OrreryProps): React.ReactElement;
export interface ExLibrisProps { name: React.ReactNode; head?: React.ReactNode; role?: React.ReactNode; motto?: React.ReactNode; year?: React.ReactNode; className?: string }
export declare function ExLibris(props: ExLibrisProps): React.ReactElement;
export interface MarginaliaProps { children: React.ReactNode; by?: React.ReactNode; mark?: string; className?: string }
export declare function Marginalia(props: MarginaliaProps): React.ReactElement;
export interface ReadingProps { children: React.ReactNode; className?: string }
export declare function Reading(props: ReadingProps): React.ReactElement;
export type AssistantState = 'idle' | 'listening' | 'thinking' | 'success' | 'error' | 'sleep';
export interface AssistantSatellite { id?: string | number; name: string; status?: 'ok' | 'busy' | 'done' | 'error' | 'sleep'; onClick?: (s: AssistantSatellite) => void }
export interface AssistantProps { state?: AssistantState; satellites?: AssistantSatellite[]; level?: number; message?: React.ReactNode; aside?: React.ReactNode; footnote?: React.ReactNode; actions?: React.ReactNode; name?: string; size?: number; compact?: boolean; className?: string }
export declare function Assistant(props: AssistantProps): React.ReactElement;
export interface LogoProps { state?: AssistantState; satellites?: AssistantSatellite[]; size?: number; onSatelliteClick?: (s: AssistantSatellite) => void; className?: string }
export declare function Logo(props: LogoProps): React.ReactElement;
declare global { interface Window { PlanetDeepwell: { Logo: typeof Logo; Assistant: typeof Assistant; Orrery: typeof Orrery; ExLibris: typeof ExLibris; Marginalia: typeof Marginalia; Reading: typeof Reading; PressureGauge: typeof PressureGauge; SkyPort: typeof SkyPort; Menu: typeof Menu; List: typeof List; Select: typeof Select; Sidebar: typeof Sidebar; Pagination: typeof Pagination; Tooltip: typeof Tooltip; TagInput: typeof TagInput; Switch: typeof Switch; Checkbox: typeof Checkbox; Progress: typeof Progress; DataTable: typeof DataTable; Dialog: typeof Dialog; EmptyState: typeof EmptyState; TopBar: typeof TopBar; Faction: typeof Faction; Button: typeof Button; TextField: typeof TextField; Tabs: typeof Tabs; Bulkhead: typeof Bulkhead; Lamp: typeof Lamp; Hazard: typeof Hazard; ThermalGauge: typeof ThermalGauge; Notice: typeof Notice; Mark: typeof Mark; Avatar: typeof Avatar; Icon: typeof Icon } } }
