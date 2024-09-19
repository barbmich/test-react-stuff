import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Link, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <nav>
        <Link to="/">root</Link>
        {" | "}
        <Link to="/about">about</Link>
        {" | "}
        <Link to="/contact">contact</Link>
        {" | "}
        <Link to="../inexistent-page">inexistent page</Link>
        {" | "}
        <Link to="../../other/basename/path">other basename path</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div>root page</div>} />
        <Route path="/about" element={<div>about page</div>} />
        <Route path="/contact" element={<div>contact page</div>} />
      </Routes>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>
  );
}
