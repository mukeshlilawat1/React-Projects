import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);


  const calculateScoreFromNames = (a, b) => {
    const combined = (a + b).toLowerCase();
    let score = 0;

    for (let char of combined) {
      score += char.charCodeAt(0);
    }

    return (score % 100) + 1;
  };

  const calculateLove = () => {
    if (!name1 || !name2) {
      alert("Please enter both names");
      return;
    }

    const percentage = calculateScoreFromNames(name1, name2);
    setResult(percentage);

    const entry = {
      id: Date.now(),
      name1,
      name2,
      percentage,
      time: new Date().toLocaleDateString(),
    };

    setHistory((prev) => {
      const updated = [entry, ...prev];
      return updated.slice(0, 5);
    });
  };

  const resetAll = () => {
    setName1("");
    setName2("");
    setResult(null);
  };


  const getMessage = () => {
    if (result >= 85) { return "Perfect Match ❤️"; }

    else if (result >= 70) { return "Strong Chemistry 💕"; }
    else if (result >= 60) { return "Good Bond 🙂"; }
    else if (result >= 50) {
      return "Average compatibility. Requires patience and effort.";
    }
    else {
      return "Needs More Effort 😅";
    }
  };

  const getTip = () => {
    if (result >= 85) return "Focus on long-term goals together.";
    else  if (result >= 70) return "Honest communication will help.";
    else if (result >= 60) return "Understand expectations clearly.";
    return "Build trust slowly before commitment.";
  };

  const getTheme = () => {
    if (result >= 75) return "from-green-400 to-emerald-500";
   else if (result >= 50) return "from-yellow-400 to-orange-500";
   else return "from-pink-500 to-red-500";
  };


  useEffect(() => {
    const saved = localStorage.getItem("loveHistory");

    if (!saved) return;

    try {
      const parsed = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        setHistory(parsed);
      } else {
        throw new Error("Invalid history format");
      }
    } catch (err) {
      console.error("Corrupted localStorage data, resetting.");
      localStorage.removeItem("loveHistory");
      setHistory([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("loveHistory", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    setResult(null);
  }, [name1, name2]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-r ${result ? getTheme() : "from-pink-500 to-red-500"
        }`}
    >
      <div className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          ❤️ Love Calculator ❤️
        </h1>

        <input
          className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          type="text"
          placeholder="Your Name"
          value={name1}
          onChange={(e) => setName1(e.target.value)}
        />

        <input
          className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
          type="text"
          placeholder="Partner Name"
          value={name2}
          onChange={(e) => setName2(e.target.value)}
        />

        <button
          className="text-sm text-blue-500 underline mb-4"
          onClick={() => {
            const temp = name1;
            setName1(name2);
            setName2(temp);
          }}
        >
          Swap Names
        </button>

        <button
          onClick={calculateLove}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
        >
          Calculate Love
        </button>

        <button
          onClick={resetAll}
          className="w-full mt-2 border border-red-400 text-red-500 py-2 rounded hover:bg-red-50 transition"
        >
          Reset
        </button>

        {result !== null && (
          <div className="mt-6">
            <p className="text-3xl font-bold">{result}% ❤️</p>

            <div className="w-full bg-gray-200 rounded-full h-3 mt-2 overflow-hidden">
              <div
                className="h-full transition-all duration-700"
                style={{
                  width: `${result}%`,
                  backgroundColor:
                    result >= 75
                      ? "#16a34a"
                      : result >= 50
                        ? "#facc15"
                        : "#dc2626",
                }}
              />
            </div>

            <p className="mt-3 text-gray-700 text-sm">{getMessage()}</p>
            <p className="mt-1 text-xs text-gray-500">{getTip()}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6 text-left">
            <h3 className="font-semibold text-sm mb-2">Recent Matches</h3>

            {history.map((item) => (
              <div
                key={item.id}
                className="text-xs text-gray-600 flex justify-between"
              >
                <span>
                  {item.name1} & {item.name2}
                </span>
                <span>{item.percentage}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
