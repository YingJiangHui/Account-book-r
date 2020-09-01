type Category ='-'|'+'

type TagItem = {
  id:number,
  icon: string,
  text: string,
  category:Category
}

type RecordItem = {
  category: Category,
  tagIndex: number,
  amount: number,
  note: string
  createAt: string
}
