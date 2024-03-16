import { Route, Routes } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import AuthProvider from "./hooks/useAuth";
import MyPage from "./pages/Mypage";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
        </Layout>
      </AuthProvider>
      <ReactQueryDevtools client={queryClient}></ReactQueryDevtools>
    </QueryClientProvider>
  );
}

export default App;
