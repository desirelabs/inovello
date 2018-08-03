export type Card = {
  id: string | number,
  text: string,
  colId: string | number
}

export type Column = {
  id: string | number,
  name: string,
  cards?: Array<Card>
}
