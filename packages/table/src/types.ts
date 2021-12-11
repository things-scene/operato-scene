import { WHERE } from './helper-functions'
import { Component, LAYOUT, Style } from '@hatiolab/things-scene'

export interface ITableCell {}

export interface ITable {
  get widths(): number[]
  get heights(): number[]
  get layout(): LAYOUT
  get rows(): number

  buildCells(newrows: number, newcolumns: number, oldrows: number, oldcolumns: number): void
  setCellsStyle(cells: ITableCell[], style: Style, where: WHERE): void
  setCellsData(): void

  getRowColumn(cell: ITableCell): { column: number; row: number }
  getCellsByRow(row: number): Component[]

  getCellsByColumn(column: number): Component[]

  // 한 개의 행을 매개변수로 받아서 첫 번째 셀부터 우측으로 이동하면서 병합된 셀이 있는지 검사한다.
  findMergedCellByX(row: number): Component[]

  // 한 개의 열을 매개변수로 받아서 첫 번째 셀부터 아래로 이동하면서 병합된 셀이 있는지 검사한다.
  findMergedCellByY(column: number): Component[]

  mergeCells(cells: ITableCell[]): void
  splitCells(cells: ITableCell[]): void
  deleteRows(cells: ITableCell[]): void

  deleteColumns(cells: ITableCell[]): void
  insertCellsAbove(cells: ITableCell[]): void
  insertCellsBelow(cells: ITableCell[]): void
  insertCellsLeft(cells: ITableCell[]): void
  insertCellsRight(cells: ITableCell[]): void
  distributeHorizontal(cells: ITableCell[]): void

  distributeVertical(cells: ITableCell[]): void
  toObjectArrayValue(array: any[]): void

  get columns(): number
  get lefts(): Component[]
  get centers(): Component[]

  get rights(): Component[]
  get tops(): Component[]
  get middles(): Component[]
  get bottoms(): Component[]
  get widths_sum(): number
  get heights_sum(): number
}
