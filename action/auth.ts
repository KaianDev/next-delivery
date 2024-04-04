"use server"
import { cookies } from "next/headers"

export const removeAuthCookie = () => {
  const cookieStore = cookies()
  cookieStore.delete(`delivery.token`)
}

export const addAuthCookie = (token: string) => {
  const cookieStore = cookies()
  cookieStore.set(`delivery.token`, token)
}
