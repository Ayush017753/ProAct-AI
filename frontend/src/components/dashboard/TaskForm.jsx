"use client";

import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import api from "../../services/api";

export default function TaskForm({ setResult }) {

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

                alert(error.response.data.message);

            } else {

                alert("Something went wrong.");

            }

        } finally {

            setLoading(false);

        }

    }

    return (

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
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={loading}
                    >

                        {

                            loading
                                ?
                                "🤖 Generating AI Plan..."
                                :
                                "🚀 Generate AI Plan"

                        }

                    </Button>

                </div>

            </CardContent>

        </Card>

    );

}