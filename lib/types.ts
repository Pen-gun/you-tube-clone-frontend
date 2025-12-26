export interface User {
  _id: string
  username: string
  email: string
  fullName: string
  avatar: string
  coverImage?: string
  watchHistory: string[]
  createdAt: string
  updatedAt: string
}

export interface Video {
  _id: string
  videoFile: string
  thumbnail: string
  title: string
  description: string
  duration: number
  views: number
  isPublished: boolean
  owner: User | string
  createdAt: string
  updatedAt: string
}

export interface Comment {
  _id: string
  content: string
  video: string
  owner: User
  createdAt: string
  updatedAt: string
}

export interface Like {
  _id: string
  comment?: string
  video?: string
  tweet?: string
  likedBy: User
  createdAt: string
}

export interface Subscription {
  _id: string
  subscriber: User | string
  channel: User | string
  createdAt: string
}

export interface Playlist {
  _id: string
  name: string
  description: string
  videos: Video[]
  owner: User | string
  createdAt: string
  updatedAt: string
}

export interface Tweet {
  _id: string
  content: string
  owner: User
  createdAt: string
  updatedAt: string
}
