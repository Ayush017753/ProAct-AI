
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CalendarDays, Clock3, CheckCircle2 } from "lucide-react";

export default function ScheduleCard({ schedule }) {

    if (!schedule) {

        return (

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >

                <Card className="rounded-3xl shadow-2xl border-0">

                    <CardHeader>

                        <CardTitle className="flex items-center gap-2">

                            <CalendarDays className="text-blue-600" />

                            📅 AI Schedule

                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        <p className="text-gray-500">

                            Generate an AI plan to view your smart schedule.

                        </p>

                    </CardContent>

                </Card>

            </motion.div>

        );

    }

    const scheduleData = schedule.schedule || [];

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >

            <Card className="rounded-3xl shadow-2xl border-0">

                <CardHeader>

                    <CardTitle className="flex items-center gap-2">

                        <CalendarDays className="text-blue-600" />

                        📅 AI Generated Schedule

                    </CardTitle>

                </CardHeader>

                <CardContent className="space-y-6">

                    {scheduleData.map((day, index) => (

                        <motion.div

                            key={index}

                            initial={{ opacity: 0, x: -20 }}

                            animate={{ opacity: 1, x: 0 }}

                            transition={{
                                delay: index * 0.1
                            }}

                            className="relative border-l-4 border-blue-600 pl-6"

                        >

                            <div className="absolute -left-3 top-1 w-5 h-5 rounded-full bg-blue-600"></div>

                            <h3 className="text-xl font-bold text-blue-700 mb-4">

                                📅 {day.date}

                            </h3>

                            <div className="space-y-3">

                                {day.tasks.map((task, taskIndex) => (

                                    <div

                                        key={taskIndex}

                                        className="rounded-2xl bg-gradient-to-r from-slate-50 to-blue-50 shadow-md hover:shadow-xl transition-all p-5"

                                    >

                                        <div className="flex justify-between items-start">

                                            <div>

                                                <h4 className="font-bold text-lg">

                                                    {task.title}

                                                </h4>

                                                <p className="text-gray-600 mt-2">

                                                    {task.description}

                                                </p>

                                            </div>

                                            <CheckCircle2 className="text-green-500" />

                                        </div>

                                        <div className="flex gap-5 mt-4 flex-wrap">

                                            <div className="flex items-center gap-2">

                                                <Clock3
                                                    size={18}
                                                    className="text-blue-600"
                                                />

                                                <span>

                                                    {task.hours} hrs

                                                </span>

                                            </div>

                                            <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm font-semibold">

                                                {task.priority}

                                            </span>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </motion.div>

                    ))}

                    {schedule.unscheduledTasks?.length > 0 && (

                        <div className="rounded-2xl bg-red-50 border border-red-300 p-5">

                            <h3 className="text-red-700 font-bold text-lg mb-3">

                                ⚠️ Unscheduled Tasks

                            </h3>

                            <ul className="space-y-2">

                                {schedule.unscheduledTasks.map((task, index) => (

                                    <li
                                        key={index}
                                        className="text-red-700"
                                    >

                                        • {task.title} ({task.remainingHours} hrs)

                                    </li>

                                ))}

                            </ul>

                        </div>

                    )}

                </CardContent>

            </Card>

        </motion.div>

    );

}