"use client";

import { Card, CardContent } from "@/components/ui/card";

import {
    ClipboardList,
    AlertTriangle,
    Clock3,
    Brain
} from "lucide-react";

import { motion } from "framer-motion";

export default function StatsCards({ result }) {

    const totalTasks =
        result?.taskAnalysis?.subtasks?.length || 0;

    const totalHours =
        result?.taskAnalysis?.total_estimated_hours || 0;

    const risk =
        result?.riskAnalysis?.pri || 0;

    const difficulty =
        result?.taskAnalysis?.difficulty || "-";

    const cards = [

        {
            title: "AI Tasks",
            value: totalTasks,
            icon: ClipboardList,
            color: "from-blue-500 to-cyan-500"
        },

        {
            title: "Risk Score",
            value: risk,
            icon: AlertTriangle,
            color: "from-red-500 to-orange-500"
        },

        {
            title: "Hours",
            value: totalHours,
            icon: Clock3,
            color: "from-green-500 to-emerald-500"
        },

        {
            title: "Difficulty",
            value: difficulty,
            icon: Brain,
            color: "from-purple-500 to-indigo-500"
        }

    ];

    return (

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

            {

                cards.map((card, index) => {

                    const Icon = card.icon;

                    return (

                        <motion.div

                            key={index}

                            initial={{ opacity: 0, y: 20 }}

                            animate={{ opacity: 1, y: 0 }}

                            transition={{
                                delay: index * 0.1
                            }}

                        >

                            <Card className="rounded-2xl shadow-xl border-0 hover:scale-105 transition-all">

                                <CardContent className="p-6">

                                    <div className="flex justify-between">

                                        <div>

                                            <p className="text-gray-500">

                                                {card.title}

                                            </p>

                                            <h2 className="text-4xl font-bold mt-3">

                                                {card.value}

                                            </h2>

                                        </div>

                                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${card.color} flex items-center justify-center`}>

                                            <Icon

                                                className="text-white"

                                                size={30}

                                            />

                                        </div>

                                    </div>

                                </CardContent>

                            </Card>

                        </motion.div>

                    );

                })

            }

        </div>

    );

}