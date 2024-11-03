import NextAuth from "next-auth"
import config from "./postcss.config.mjs"
import GitHub from "next-auth/providers/github"
export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [GitHub]
})