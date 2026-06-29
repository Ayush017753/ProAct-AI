import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CoachCard({ risk }) {

    let message =
        "Let's build your productivity plan!";

    if (risk) {

        if (risk.level === "High") {

            message =
                "🔥 High Risk! Start immediately. Every hour matters.";

        }

        else if (risk.level === "Medium") {

            message =
                "⚡ You're on track, but don't delay. Stay consistent.";

        }

        else {

            message =
                "🎉 Great! You're well ahead of schedule. Keep it up.";

        }

    }

    return (

        <Card>

            <CardHeader>

                <CardTitle>

                    AI Coach

                </CardTitle>

            </CardHeader>

            <CardContent>

                <p className="text-gray-700 leading-7">

                    {message}

                </p>

            </CardContent>

        </Card>

    );

}