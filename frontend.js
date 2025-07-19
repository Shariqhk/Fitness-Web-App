// === FRONTEND (React.js) ===
// File: src/App.js
import React, { useState } from "react";

const App = () => {
    const [inputs, setInputs] = useState({
        mass: 70,
        level: "Beginner",
        goal: "Fat Loss",
        equipment: "Home",
        frequency: 3
    });

    const [plan, setPlan] = useState("");
    const [loading, setLoading] = useState(false);

    const updateInput = (key, value) => {
        setInputs({ ...inputs, [key]: value });
    };

    const generatePlan = async () => {
        setLoading(true);
        const res = await fetch("https://shariqhk.pythonanywhere.com/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(inputs)
        });
        const data = await res.json();
        setPlan(data.plan);
        setLoading(false);
    };

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h1 className="text-xl font-bold mb-4">AI Workout Plan Generator</h1>

            <div className="mb-2">
                <p className="font-semibold">Mass:</p>
                {[50, 60, 70, 80, 90].map(m => (
                    <button className="m-1" onClick={() => updateInput("mass", m)}>{m} kg</button>
                ))}
            </div>

            <div className="mb-2">
                <p className="font-semibold">Level:</p>
                {["Beginner", "Intermediate", "Advanced"].map(l => (
                    <button className="m-1" onClick={() => updateInput("level", l)}>{l}</button>
                ))}
            </div>

            <div className="mb-2">
                <p className="font-semibold">Goal:</p>
                {["Fat Loss", "Strength", "Both"].map(g => (
                    <button className="m-1" onClick={() => updateInput("goal", g)}>{g}</button>
                ))}
            </div>

            <div className="mb-2">
                <p className="font-semibold">Equipment:</p>
                {["Home", "Gym", "Dumbbells Only"].map(e => (
                    <button className="m-1" onClick={() => updateInput("equipment", e)}>{e}</button>
                ))}
            </div>

            <div className="mb-2">
                <p className="font-semibold">Frequency (days/week):</p>
                {[1, 2, 3, 4, 5, 6, 7].map(f => (
                    <button className="m-1" onClick={() => updateInput("frequency", f)}>{f}</button>
                ))}
            </div>

            <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={generatePlan}>
                Generate Plan
            </button>

            {loading && <p className="mt-4">Generating...</p>}
            {plan && <div className="mt-4 p-4 border rounded bg-gray-100">{plan}</div>}
        </div>
    );
};

export default App;
