import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import AuthProvider from "./hooks/useAuth";
import MyPage from "./pages/Mypage";
import ErrorPage from "./pages/Error";

export const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools client={queryClient}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
