import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ArticleLinksContainer from "./components/ArticleLinksContainer";

const queryClient = new QueryClient();

function WikiTrek() {
    console.log("RENDERING APP...");
    return (
        <QueryClientProvider client={queryClient}>
            <ArticleLinksContainer />
        </QueryClientProvider>
    );
}

export default WikiTrek;
