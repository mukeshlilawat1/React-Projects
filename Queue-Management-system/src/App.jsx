import { useState } from "react";
import QueueForm from "./components/QueueForm";
import QueueDisplay from "./components/QueueDisplay";

function App() {
  const [queue, setQueue] = useState([]);

  const addToQueue = (customer) => {
    setQueue([
      ...queue,
      { ...customer, id: Date.now(), status: "waiting" }
    ]);
  };

  const updateStatus = (id, newStatus) => {
    setQueue(
      queue.map(customer =>
        customer.id === id
          ? { ...customer, status: newStatus }
          : customer
      )
    );
  };

  const removeFromQueue = (id) => {
    setQueue(queue.filter(customer => customer.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Queue Management Application
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your customers efficiently
        </p>
      </header>

      <main className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        <QueueForm onAdd={addToQueue} />
        <QueueDisplay
          queue={queue}
          onUpdateStatus={updateStatus}
          onRemove={removeFromQueue}
        />
      </main>
    </div>
  );
}

export default App;
