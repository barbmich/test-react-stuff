import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import "./App.css";
import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

let todoCounter = 1;
let todos = [{ id: 1, text: "Buy milk" }];

function simulateAsync(res: any) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(res);
    }, 1000);
  });
}

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryTest />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;

function ReactQueryTest() {
  const [state, setState] = useState("");
  const [num, setNum] = useState("");

  const queryClient = useQueryClient();

  console.log(queryClient.getQueryData(["todos"]));

  const query = useQuery({
    queryFn: async () => {
      await simulateAsync(todos);
      console.log("i ran");
      return todos;
    },
    queryKey: ["todos"],
  });

  const add = useMutation({
    mutationFn: async (text: string) => {
      await simulateAsync("a");
      todoCounter++;
      todos.push({ id: todoCounter, text } as { id: number; text: string });
    },
    mutationKey: ["todos"],
    // onSuccess: (_data, variables) => {
    //   queryClient.setQueryData(["todos"], (oldCache) => {
    //     return [...oldCache, { id: todoCounter, text: variables }];
    //   });
    // },
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      await simulateAsync("a");
    },
    onSuccess: (_data, variables) => {
      queryClient.setQueryData(["todos"], (oldCache) => {
        return oldCache.filter(
          (todo: { id: number }) => todo.id !== Number(variables)
        );
      });
    },
    mutationKey: ["todos"],
  });

  return (
    <div>
      {query.data ? JSON.stringify(query.data) : "nothing"}
      <br />
      <br />
      <input value={state} onChange={(w) => setState(w.target.value)} />
      <button onClick={() => add.mutate(state)}>add</button>
      <br />
      <input value={num} onChange={(w) => setNum(w.target.value)} />
      <button onClick={() => remove.mutate(num)}>remove</button>
    </div>
  );
}
