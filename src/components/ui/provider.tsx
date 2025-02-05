import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "next-themes"

import { ReactNode } from "react";

interface ProviderProps {
    value: any;
    children: ReactNode;
}

export function Provider(props: ProviderProps) {
    return (
        <ChakraProvider value={props.value}>
            <ThemeProvider>
                {props.children}
            </ThemeProvider>
        </ChakraProvider>
    )
}