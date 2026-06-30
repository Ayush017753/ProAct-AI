"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    Bot,
    Sparkles,
    Target,
    CheckCircle2,
    Lightbulb
} from "lucide-react";

export default function CoachCard({ risk }) {

    let message =
        "Generate an AI plan to receive personalized productivity coaching.";

    let bg =
        "from-slate-100 to-slate-50";

    let badge =
        "AI Waiting";

    if (risk) {

        if (risk.level === "High") {

            message =
                "Your workload is very tight. Start today, focus on high-priority tasks first, and avoid delaying difficult work.";

            bg =
                "from-red-100 to-red-50";

            badge =
                "🔥 Critical";

        }

        else if (risk.level === "Medium") {

            message =
                "You're on track, but consistency matters. Follow your daily schedule and don't skip planned sessions.";

            bg =
                "from-yellow-100 to-yellow-50";

            badge =
                "⚡ Stay Consistent";

        }

        else {

            message =
                "Excellent! You're ahead of schedule. Finish important tasks early and use the remaining time for revision and improvements.";

            bg =
                "from-green-100 to-green-50";

            badge =
                "✅ Great Progress";

        }

    }

    return (

        <motion.div

            initial={{ opacity: 0, y: 20 }}

            animate={{ opacity: 1, y: 0 }}

            transition={{ duration: 0.4 }}

        >

            <Card className="rounded-3xl shadow-2xl border-0">

                <CardHeader>

                    <CardTitle className="flex items-center gap-2">

                        <Bot className="text-indigo-600" />

                        AI Productivity Coach

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <div className={`rounded-2xl bg-gradient-to-r ${bg} p-5`}>

                        <div className="flex justify-between items-center">

                            <div className="flex items-center gap-2">

                                <Sparkles className="text-yellow-500" />

                                <span className="font-semibold">

                                    Daily AI Insight

                                </span>

                            </div>

                            <span className="px-3 py-1 rounded-full bg-indigo-600 text-white text-sm">

                                {badge}

                            </span>

                        </div>

                        <p className="mt-4 text-gray-700 leading-7">

                            {message}

                        </p>

                    </div>

                    <div className="mt-6 space-y-3">

                        <div className="flex items-center gap-3">

                            <Target className="text-blue-600" />

                            <span>

                                Complete today's planned tasks first.

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <CheckCircle2 className="text-green-600" />

                            <span>

                                Track your progress every day.

                            </span>

                        </div>

                        <div className="flex items-center gap-3">

                            <Lightbulb className="text-yellow-500" />

                            <span>

                                Small daily progress beats last-minute stress.

                            </span>

                        </div>

                    </div>

                </CardContent>

            </Card>

        </motion.div>

    );

}