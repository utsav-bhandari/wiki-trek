import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WikiLinksBySections from "./components/WikiLinksBySections";

const queryClient = new QueryClient();

function WikiTrek() {
    console.log("RENDERING APP...");
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <WikiLinksBySections />
            </QueryClientProvider>
        </>
    );
}

export default WikiTrek;
