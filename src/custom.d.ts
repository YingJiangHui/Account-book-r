type Category ='-'|'+'

type TagItem = {
  id:number,
  icon: string,
  text: string,
  category:Category
}



type Record={
  category: Category,
  tagIndex: number,
  amount: number,
  note: string
}
