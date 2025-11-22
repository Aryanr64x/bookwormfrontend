
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
    avg_review: number
    review_count: number
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



export interface Review{
    id: number
    rating: number
    review_text: string | null
    user_id: number
    book_id: number
}


export interface ReviewWithUser extends Review{
    user: User
}