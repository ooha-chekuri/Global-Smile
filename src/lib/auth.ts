import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { dentists, patients } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        userType: { label: "User Type", type: "hidden" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const userType = (credentials.userType as string) ?? "patient";

        if (userType === "dentist") {
          const user = await db
            .select()
            .from(dentists)
            .where(eq(dentists.email, credentials.email as string))
            .then((rows) => rows[0] ?? null);

          if (!user) return null;

          const bcrypt = await import("bcryptjs");
          const isValid = await bcrypt.compare(
            credentials.password as string,
            user.hashedPassword
          );

          if (!isValid) return null;

          return {
            id: String(user.id),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        }

        const user = await db
          .select()
          .from(patients)
          .where(eq(patients.email, credentials.email as string))
          .then((rows) => rows[0] ?? null);

        if (!user || !user.hashedPassword) return null;

        const bcrypt = await import("bcryptjs");
        const isValid = await bcrypt.compare(
          credentials.password as string,
          user.hashedPassword
        );

        if (!isValid) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: user.name,
          role: "patient",
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
