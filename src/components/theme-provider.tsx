"use client";

import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme,
} from "next-themes";
import { SessionProvider as AuthSessionProvider } from "next-auth/react";

const Provider = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <AuthSessionProvider>
      <NextThemesProvider enableSystem storageKey="justd-theme" {...props}>
        {children}
      </NextThemesProvider>
    </AuthSessionProvider>
  );
};

export { Provider as ThemeProvider, useTheme };
