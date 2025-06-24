import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Main from "./components/Main";

const queryClient = new QueryClient();

function WikiTrek() {
    return (
        <QueryClientProvider client={queryClient}>
            <Main />
        </QueryClientProvider>
    );
}

export default WikiTrek;
