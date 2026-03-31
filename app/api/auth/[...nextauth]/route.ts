import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: { username: {}, password: {} },
      async authorize(credentials) {
        // 👇 simple username/password
        if (
          credentials?.username === "client" &&
          credentials?.password === "password"
        ) {
          return { id: "1", name: "client" };
        }
        return null; // login échoué
      },
    }),
  ],
  pages: { signIn: "/login" }, // page de login personnalisée
  secret: process.env.NEXTAUTH_SECRET, // obligatoire
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };