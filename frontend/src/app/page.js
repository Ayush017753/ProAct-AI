"use client";

import { useState } from "react";

import TaskForm from "@/components/dashboard/TaskForm";
import RiskCard from "@/components/dashboard/RiskCard";
import ScheduleCard from "@/components/dashboard/ScheduleCard";
import CoachCard from "@/components/dashboard/CoachCard";
import TaskList from "@/components/dashboard/TaskList";

export default function Home() {

    const [result, setResult] = useState(null);

    return (

        <main className="min-h-screen bg-slate-100">

            <div className="max-w-7xl mx-auto p-8">

                <h1 className="text-4xl font-bold mb-8">

                    🚀 ProAct AI

                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2">

                        <TaskForm
                            setResult={setResult}
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
                        />

                    </div>

                </div>

            </div>

        </main>

    );

}