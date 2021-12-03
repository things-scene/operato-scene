type GristConfig = {
  columns: ColumnConfig[]
  rows: RowsConfig
  list: ListConfig
  pagination?: PaginationConfig
  sorters?: SortersConfig
}

type SorterConfig = { name: string; desc?: boolean }
type SortersConfig = SorterConfig[]

type PaginationConfig = {
  page?: number
  limit?: number
  pages: number[]
  infinite?: boolean
}

type GristEventHandler = (
  columns: ColumnConfig[],
  data?: GristData,
  column?: ColumnConfig,
  record?: GristRecord,
  rowIndex?: number,
  target?: any
) => void

type ColumnConfig = {
  type: string
  name: string
  gutterName?: string
  header: HeaderConfig
  record: RecordConfig
  handlers: GristEventHandlerSet
  label: LabelConfig
  hidden?: boolean
  sortable?: boolean
  resizable?: boolean
  width?: number | string | ColumnWidthCallback
  forList?: boolean
  validation?: ValidationCallback
  imex?: ImexConfig
  multiple?: boolean
}

type ValidationCallback = (after: any, before: any, record: GristRecord, column: ColumnConfig) => boolean

type LabelConfig =
  | string
  | boolean
  | {
      renderer: LabelRenderer
    }

type LabelRenderer = () => void

type ColumnWidthCallback = (column: ColumnConfig) => string

type HeaderConfig = {
  renderer: HeaderRenderer
}
type HeaderRenderer = (column: ColumnConfig) => any

type RecordConfig = {
  renderer: FieldRenderer
  editor?: FieldEditor
  editable?: boolean
  classifier: GristClassifier
  align?: 'left' | 'right' | 'center'
  options: { [key: string]: any }
  rowOptionField?: string
}

type FieldRenderer = (value: any, column: ColumnConfig, record: GristRecord, rowIndex: number, owner: any) => any
type FieldEditor = (value: any, column: ColumnConfig, record: GristRecord, rowIndex: number, owner: any) => any
type FieldThumbnailRenderer = (record: GristRecord, rowIndex: number) => any

type GristEventHandlerSet = {
  click?: GristEventHandler
  dblclick?: GristEventHandler
}

type ListConfig = {
  thumbnail: FieldThumbnailRenderer
  fields: string[]
  details: string[]
}

type ImexConfig = {
  header: string
  key: string
  width: number
  type: string
}

type RowsConfig = {
  appendable: boolean
  insertable: boolean
  selectable?: RowSelectableConfig
  groups: GroupConfig[]
  totals: string[]
  classifier: GristClassifier
  handlers: GristEventHandlerSet
}

type GristClassifier = (
  record: GristRecord,
  rowIndex: number
) => { emphasized?: boolean | string | string[]; [key: string]: any } | void

type GroupConfig = {
  align: string
  titleColumn?: ColumnConfig
  title: string
  value?: string
  groupName?: string
  row?: number
  column: string | number
  rowspan: number
  colspan?: number
}

type RowSelectableConfig = {
  multiple?: boolean
}

type GristRecord = {
  id?: string
  name?: string
  __seq__?: number
  __dirty__?: string
  __selected__?: boolean
  __changes__?: object[]
  __dirtyfields__?: { [key: string]: any }
  __origin__?: any
  [key: string]: any
}

type GristData = {
  page?: number
  total?: number
  limit?: number
  records: GristRecord[]
}
