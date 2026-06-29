import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TaskList({ subtasks }) {

    if (!subtasks) {

        return (

            <Card>

                <CardHeader>

                    <CardTitle>
                        AI Task Breakdown
                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <p className="text-gray-500">
                        Generate a task to see subtasks.
                    </p>

                </CardContent>

            </Card>

        );

    }

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    🤖 AI Task Breakdown

                </CardTitle>

            </CardHeader>

            <CardContent>

                <div className="space-y-4">

                    {

                        subtasks.map((task, index) => (

                            <div
                                key={index}
                                className="border rounded-lg p-4"
                            >

                                <div className="flex justify-between">

                                    <h3 className="font-semibold">

                                        {task.title}

                                    </h3>

                                    <span className="text-blue-600 font-bold">

                                        {task.estimated_hours} hrs

                                    </span>

                                </div>

                                <p className="text-gray-600 mt-2">

                                    {task.description}

                                </p>

                                <span className={`inline-block mt-3 px-3 py-1 rounded-full text-white text-sm ${
                                    task.priority === "High"
                                        ? "bg-red-500"
                                        : task.priority === "Medium"
                                        ? "bg-yellow-500"
                                        : "bg-green-500"
                                }`}>

                                    {task.priority}

                                </span>

                            </div>

                        ))

                    }

                </div>

            </CardContent>

        </Card>

    );

}