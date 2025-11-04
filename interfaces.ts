
export interface User{
    id: number
    username: string
}


export interface Author{
    id: number
    name: string
    slug: string
}

export interface Book{
    id: number
    title: string
    slug: string
    authors: Author[]
}



export interface List{
    id: number
    name: string
    slug: string
    description: string | null | undefined
}


export interface ListWithBooks extends List{
    books: Book[]
}