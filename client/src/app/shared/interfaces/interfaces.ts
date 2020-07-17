export interface IToken {
  token: string
}

export interface IUser {
  email: string
  password: string
}

export interface ILink {
  url: string
  name: string
}

export interface ICategory {
  name: string
  imageSrc?: string
  _id?: string
}
