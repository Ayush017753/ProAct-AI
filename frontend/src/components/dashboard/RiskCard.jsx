import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RiskCard({ risk }) {

    if (!risk) {

        return (

            <Card>

                <CardHeader>

                    <CardTitle>
                        Risk Analysis
                    </CardTitle>

                </CardHeader>

                <CardContent>

                    <p className="text-gray-500">
                        Generate a task to see risk analysis.
                    </p>

                </CardContent>

            </Card>

        );

    }

    const badgeColor =
        risk.level === "Low"
            ? "bg-green-500"
            : risk.level === "Medium"
            ? "bg-yellow-500"
            : "bg-red-500";

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    Risk Analysis

                </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

                <div>

                    <p className="text-sm text-gray-500">
                        Priority Risk Index
                    </p>

                    <h2 className="text-4xl font-bold">

                        {risk.pri}

                    </h2>

                </div>

                <div>

                    <span
                        className={`px-3 py-1 rounded-full text-white ${badgeColor}`}
                    >
                        {risk.level}
                    </span>

                </div>

                <div>

                    <p className="font-semibold">

                        Recommendation

                    </p>

                    <p className="text-gray-700">

                        {risk.recommendation}

                    </p>

                </div>

                <div className="border-t pt-4 space-y-1">

                    <p>

                        <strong>Days Remaining:</strong> {risk.daysRemaining}

                    </p>

                    <p>

                        <strong>Available Hours:</strong> {risk.availableHours}

                    </p>

                    <p>

                        <strong>Required Hours:</strong> {risk.requiredHours}

                    </p>

                    <p>

                        <strong>Difficulty:</strong> {risk.difficulty}

                    </p>

                </div>

            </CardContent>

        </Card>

    );

}