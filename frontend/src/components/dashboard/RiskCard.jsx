"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { AlertTriangle, CalendarDays, Clock3, Brain } from "lucide-react";
import RiskChart from "./RiskChart";

export default function RiskCard({ risk }) {

    if (!risk) {

        return (

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
            >

                <Card className="rounded-3xl shadow-2xl border-0">

                    <CardHeader>

                        <CardTitle className="flex items-center gap-2">

                            <AlertTriangle className="text-orange-500" />

                            AI Risk Analysis

                        </CardTitle>

                    </CardHeader>

                    <CardContent className="space-y-5">

                        <RiskChart risk={risk} />

                        <div className="bg-slate-100 rounded-2xl p-4">

                            <p className="text-gray-500 text-center">

                                Generate an AI Plan to view risk prediction.

                            </p>

                        </div>

                    </CardContent>

                </Card>

            </motion.div>

        );

    }

    const badgeColor =
        risk.level === "Low"
            ? "bg-green-500"
            : risk.level === "Medium"
            ? "bg-yellow-500"
            : "bg-red-500";

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >

            <Card className="rounded-3xl shadow-2xl border-0">

                <CardHeader>

                    <CardTitle className="flex items-center gap-2">

                        <AlertTriangle className="text-red-500" />

                        AI Risk Analysis

                    </CardTitle>

                </CardHeader>

                <CardContent className="space-y-6">

                    <RiskChart risk={risk} />

                    <div className="text-center">

                        <h1 className="text-5xl font-black text-indigo-700">

                            {risk.pri}

                        </h1>

                        <p className="text-gray-500">

                            Priority Risk Index

                        </p>

                    </div>

                    <div className="flex justify-center">

                        <span
                            className={`px-5 py-2 rounded-full text-white font-bold shadow-lg ${badgeColor}`}
                        >

                            {
                                risk.level === "High"
                                    ? "🔥 HIGH RISK"
                                    : risk.level === "Medium"
                                    ? "🟡 MEDIUM RISK"
                                    : "🟢 LOW RISK"
                            }

                        </span>

                    </div>

                    <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 p-5">

                        <h3 className="font-bold text-lg mb-2">

                            🤖 AI Recommendation

                        </h3>

                        <p className="text-gray-700 leading-7">

                            {risk.recommendation}

                        </p>

                    </div>

                    <div className="grid grid-cols-2 gap-4">

                        <div className="rounded-xl bg-slate-100 p-4">

                            <CalendarDays className="mb-2 text-blue-600" />

                            <p className="text-sm text-gray-500">

                                Days Remaining

                            </p>

                            <h2 className="text-2xl font-bold">

                                {risk.daysRemaining}

                            </h2>

                        </div>

                        <div className="rounded-xl bg-slate-100 p-4">

                            <Clock3 className="mb-2 text-green-600" />

                            <p className="text-sm text-gray-500">

                                Available Hours

                            </p>

                            <h2 className="text-2xl font-bold">

                                {risk.availableHours}

                            </h2>

                        </div>

                        <div className="rounded-xl bg-slate-100 p-4">

                            <Clock3 className="mb-2 text-orange-600" />

                            <p className="text-sm text-gray-500">

                                Required Hours

                            </p>

                            <h2 className="text-2xl font-bold">

                                {risk.requiredHours}

                            </h2>

                        </div>

                        <div className="rounded-xl bg-slate-100 p-4">

                            <Brain className="mb-2 text-purple-600" />

                            <p className="text-sm text-gray-500">

                                Difficulty

                            </p>

                            <h2 className="text-2xl font-bold capitalize">

                                {risk.difficulty}

                            </h2>

                        </div>

                    </div>

                </CardContent>

            </Card>

        </motion.div>

    );

}