import { Route, Routes } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

import "./App.css";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<div>test</div>}></Route>
        <Route path="/example" element={<Example />} />
      </Routes>
      <ReactQueryDevtools client={queryClient}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;

function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/TanStack/query").then((res) =>
        res.json()
      ),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{" "}
      <strong>✨ {data.stargazers_count}</strong>{" "}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
}
