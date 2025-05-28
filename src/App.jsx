import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Header from "./components/Header";
import WikiLinksBySections from "./components/Test";

const queryClient = new QueryClient();

function WikiTrek() {
    console.log("RENDERING APP...");
    return (
        <>
            <Header />
            <QueryClientProvider client={queryClient}>
                <WikiLinksBySections />
            </QueryClientProvider>
        </>
    );
}

export default WikiTrek;
