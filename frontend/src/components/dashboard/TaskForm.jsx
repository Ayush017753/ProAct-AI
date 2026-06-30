"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import api from "../../services/api";

export default function TaskForm({ setResult , refreshTasks }) {

    const [task, setTask] = useState("");
    const [deadline, setDeadline] = useState("");
    const [freeHoursPerDay, setFreeHoursPerDay] = useState("");

    const [loading, setLoading] = useState(false);

    async function handleSubmit() {

        if (!task || !deadline || !freeHoursPerDay) {

            alert("Please fill all fields.");

            return;
        }

        try {

            setLoading(true);

            const response = await api.post(
                "/breakdown-task",
                {
                    task,
                    deadline,
                    freeHoursPerDay
                }
            );

            console.log(response.data);

            setResult(response.data.data);
            refreshTasks();
            toast.success("🎉 AI Plan Generated Successfully!");

            console.log("FULL RESULT");
            console.log(response.data.data);
            console.log("Schedule Analysis:");
            console.log(response.data.data.scheduleAnalysis);
             

            // Clear form after success
            setTask("");
            setDeadline("");
            setFreeHoursPerDay("");

        } catch (error) {

            console.error(error);

            if (error.response) {

                toast.error(error.response?.data?.message || "Something went wrong." );

            } else {

               toast.error("Gemini AI is currently experiencing high demand. Please try again in a minute.");

            }

        } finally {

            setLoading(false);

        }

    }

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <Card>

                <CardHeader>

                    <CardTitle>

                        Create New Task

                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <div className="space-y-4">

                        <Input
                            placeholder="Enter Your Task"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />

                        <Input
                            type="date"
                            value={deadline}
                            onChange={(e) => setDeadline(e.target.value)}
                        />

                        <Input
                            type="number"
                            placeholder="Free hours per day"
                            value={freeHoursPerDay}
                            onChange={(e) => setFreeHoursPerDay(e.target.value)}
                        />

                        <Button
                            className="w-full h-12 text-lg"
                            onClick={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                    AI is Planning...
                                </>
                            ) : (
                                "🚀 Generate AI Plan"
                            )}
                        </Button>

                    </div>

                </CardContent>

            </Card>
        </motion.div>


    );

}