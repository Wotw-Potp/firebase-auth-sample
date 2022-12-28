type MemoId = string

export type Memo = {
  title: string
  content: string
  createdAt: number
}

export type MemoList = {
  [key: MemoId]: Memo
}
