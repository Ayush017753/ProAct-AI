"use client";

import { useEffect, useState } from "react";

import TaskForm from "@/components/dashboard/TaskForm";
import RiskCard from "@/components/dashboard/RiskCard";
import ScheduleCard from "@/components/dashboard/ScheduleCard";
import CoachCard from "@/components/dashboard/CoachCard";
import TaskList from "@/components/dashboard/TaskList";
import StatsCards from "@/components/dashboard/StatsCards";

import api from "@/services/api";

export default function Home() {

    const [result, setResult] = useState(null);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {

    fetchTasks();

}, []);

async function fetchTasks() {

    try {

        const response = await api.get("/tasks");

        setTasks(response.data.data);

    }

    catch (error) {

        console.error(error);

    }

}

    return (

        <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">

            <div className="max-w-7xl mx-auto px-8 py-10">

                <div className="mb-12 rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-10 shadow-2xl">

                    <h1 className="text-6xl font-black tracking-tight">

                        🚀 ProAct AI

                    </h1>

                    <p className="mt-4 text-xl text-blue-100">

                        AI-powered Productivity Companion

                    </p>

                    <p className="mt-2 text-blue-200">

                        Break tasks • Predict risk • Build smart schedules • Beat every deadline

                    </p>

                </div>

                <StatsCards result={result} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2">

                        <TaskForm
                            setResult={setResult}
                            refreshTasks={fetchTasks}
                        />

                    </div>

                    <RiskCard
                        risk={result?.riskAnalysis}
                    />

                    <div className="lg:col-span-2">

                        <ScheduleCard
                            schedule={result?.scheduleAnalysis}
                        />

                    </div>

                    <CoachCard
                        risk={result?.riskAnalysis}
                    />

                    <div className="lg:col-span-3">

                        <TaskList
                            subtasks={result?.taskAnalysis?.subtasks}
                            tasks={tasks}
                        />

                    </div>

                </div>

            </div>

        </main>

    );

}




// export default function Home() {
//   return (
//     <h1>Hello ProAct AI</h1>
//   );
// }