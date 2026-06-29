import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ScheduleCard({ schedule }) {

    if (!schedule) {

        return (

            <Card>

                <CardHeader>

                    <CardTitle>
                        📅 AI Generated Schedule
                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <p className="text-gray-500">
                        Generate a task to see your schedule.
                    </p>

                </CardContent>

            </Card>

        );

    }

    const scheduleData = schedule.schedule;

    const unscheduledTasks = schedule.unscheduledTasks;

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    📅 AI Generated Schedule

                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

                {scheduleData.map((day, index) => (

                    <div
                        key={index}
                        className="border rounded-lg p-4"
                    >

                        <h3 className="font-bold text-lg mb-3">

                            {day.date}

                        </h3>

                        <div className="space-y-2">

                            {day.tasks.map((task, taskIndex) => (

                                <div
                                    key={taskIndex}
                                    className="flex justify-between items-center bg-slate-100 rounded-md p-3"
                                >

                                    <div>

                                        <p className="font-medium">

                                            {task.title}

                                        </p>

                                        <p className="text-sm text-gray-500">

                                            {task.priority}

                                        </p>

                                    </div>

                                    <span className="font-bold text-blue-600">

                                        {task.hours} hrs

                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                ))}

                {unscheduledTasks.length > 0 && (

                    <div className="border-2 border-red-500 rounded-lg p-4">

                        <h3 className="text-red-600 font-bold mb-3">

                            ⚠ Couldn't Fit Before Deadline

                        </h3>

                        {unscheduledTasks.map((task, index) => (

                            <div
                                key={index}
                                className="mb-2"
                            >

                                {task.title} ({task.remainingHours} hrs)

                            </div>

                        ))}

                    </div>

                )}

            </CardContent>

        </Card>

    );

}