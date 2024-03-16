import { Route, Routes } from "react-router-dom";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import AuthProvider from "./hooks/useAuth";
import MyPage from "./pages/Mypage";
import ErrorPage from "./pages/Error";

export const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      throwOnError: true,
      // onError: handleError,
    },
    queries: {
      throwOnError: true,
    },
  },
  queryCache: new QueryCache({
    // onError: handleError,
  }),
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary FallbackComponent={ErrorPage} onReset={reset}>
            <AuthProvider>
              <Layout>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/mypage" element={<MyPage />} />
                  <Route path="/*" element={<ErrorPage />}></Route>
                </Routes>
              </Layout>
            </AuthProvider>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <ReactQueryDevtools client={queryClient}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
