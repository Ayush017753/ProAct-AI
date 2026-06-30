"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    CheckCircle2,
    History,
    FolderKanban,
    CalendarDays,
    Clock3
} from "lucide-react";

export default function TaskList({ subtasks, tasks }) {

    return (

        <div className="space-y-8">

            {/* Latest AI Plan */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >

                <Card className="rounded-3xl shadow-2xl border-0">

                    <CardHeader>

                        <CardTitle className="flex items-center gap-2">

                            <CheckCircle2 className="text-green-600" />

                            Latest AI Plan

                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        {

                            !subtasks || subtasks.length === 0 ?

                            (

                                <p className="text-gray-500">

                                    Generate a task to view AI subtasks.

                                </p>

                            )

                            :

                            (

                                <div className="space-y-4">

                                    {

                                        subtasks.map((task, index) => (

                                            <motion.div

                                                key={index}

                                                whileHover={{
                                                    scale: 1.02
                                                }}

                                                className="rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 shadow-md p-5"

                                            >

                                                <div className="flex justify-between items-center">

                                                    <h3 className="font-bold text-lg">

                                                        {task.title}

                                                    </h3>

                                                    <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm">

                                                        {task.priority}

                                                    </span>

                                                </div>

                                                <p className="text-gray-600 mt-3">

                                                    {task.description}

                                                </p>

                                                <div className="flex items-center gap-2 mt-4 text-blue-700">

                                                    <Clock3 size={18} />

                                                    {task.estimated_hours} hrs

                                                </div>

                                            </motion.div>

                                        ))

                                    }

                                </div>

                            )

                        }

                    </CardContent>

                </Card>

            </motion.div>

            {/* Previous Tasks */}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >

                <Card className="rounded-3xl shadow-2xl border-0">

                    <CardHeader>

                        <CardTitle className="flex items-center gap-2">

                            <History className="text-blue-600" />

                            Previous Tasks

                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        {

                            !tasks || tasks.length === 0 ?

                            (

                                <p className="text-gray-500">

                                    No previous tasks found.

                                </p>

                            )

                            :

                            (

                                <div className="space-y-4">

                                    {

                                        tasks.map((task, index) => (

                                            <motion.div

                                                key={task.id || index}

                                                whileHover={{
                                                    scale: 1.01
                                                }}

                                                className="rounded-2xl border p-5 hover:shadow-lg transition"

                                            >

                                                <div className="flex justify-between items-start">

                                                    <div>

                                                        <div className="flex items-center gap-2">

                                                            <FolderKanban className="text-indigo-600" />

                                                            <h3 className="font-bold text-lg">

                                                                {task.task}

                                                            </h3>

                                                        </div>

                                                        <div className="flex items-center gap-2 text-gray-500 mt-2">

                                                            <CalendarDays size={16} />

                                                            {task.deadline}

                                                        </div>

                                                    </div>

                                                    <span
                                                        className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${
                                                            task.risk_level === "High"
                                                                ? "bg-red-500"
                                                                : task.risk_level === "Medium"
                                                                ? "bg-yellow-500"
                                                                : "bg-green-500"
                                                        }`}
                                                    >

                                                        {task.risk_level}

                                                    </span>

                                                </div>

                                                <div className="grid grid-cols-3 gap-4 mt-5">

                                                    <div>

                                                        <p className="text-gray-500 text-sm">

                                                            PRI

                                                        </p>

                                                        <h2 className="font-bold">

                                                            {task.pri_score}

                                                        </h2>

                                                    </div>

                                                    <div>

                                                        <p className="text-gray-500 text-sm">

                                                            Difficulty

                                                        </p>

                                                        <h2 className="font-bold capitalize">

                                                            {task.difficulty}

                                                        </h2>

                                                    </div>

                                                    <div>

                                                        <p className="text-gray-500 text-sm">

                                                            Hours

                                                        </p>

                                                        <h2 className="font-bold">

                                                            {task.total_estimated_hours}

                                                        </h2>

                                                    </div>

                                                </div>

                                            </motion.div>

                                        ))

                                    }

                                </div>

                            )

                        }

                    </CardContent>

                </Card>

            </motion.div>

        </div>

    );

}