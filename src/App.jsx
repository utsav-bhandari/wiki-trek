import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import Main from "./components/Main";

const queryClient = new QueryClient();

function WikiTrek() {
    console.log("RENDERING APP...");
    return (
        <>
            <Header />
            <QueryClientProvider client={queryClient}>
                <Main />
            </QueryClientProvider>
        </>
    );
}

export default WikiTrek;
