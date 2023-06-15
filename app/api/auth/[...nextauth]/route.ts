import { prisma } from "../../../../db/prisma";

import { compare } from "bcrypt";

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth/next";

export const authOptions: NextAuthOptions = {
    session: {
        strategy:"jwt"
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials.password){
                    return null
                }

                const user = await prisma.application_user.findFirst({
                    where: {
                        email: credentials.email

                    }
                })

                if(!user){
                    return null
                }

                const isPasswordValid = await compare(credentials.password, user.password)
                if(!isPasswordValid){
                    return null
                }
                
                return {
                    id: user.user_id + '',
                    email: user.email,
                    name: user.email,
                }
            }
        })
    ],
    pages: {
        signIn: "/login",
    },
    callbacks: {

        session: ({ session, token }) => {
          console.log('Session Callback', { session, token })
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
            }
          }
        },
        jwt: ({ token, user }) => {
          console.log('JWT Callback', { token, user })
          if (user) {
            const u = user as unknown as any
            return {
              ...token,
              id: u.id,
            }
          }
          return token
        },
        
      }
}


const handler=NextAuth(authOptions)
export {handler as GET, handler as POST}