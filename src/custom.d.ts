type Category ='-'|'+'

type TagItem = {
  id:number,
  icon: string,
  text: string,
  category:Category
}

type RecordItem = {
  id:number,
  category: Category,
  tagIndex: number,
  amount: number,
  note: string
  createAt: string
}

type CategoryRecord={'+':{[key:string]:number},'-':{[key:string]:number}}