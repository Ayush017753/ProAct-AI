const {
    calculateDaysRemaining
} = require("./riskEngine");

function generateSchedule({
    subtasks,
    deadline,
    freeHoursPerDay,
    startDate = new Date()
}) {

    const totalDays = calculateDaysRemaining(deadline);

    const schedule = [];
    const unscheduledTasks = [];

    let currentDate = new Date(startDate);
    currentDate.setHours(0, 0, 0, 0);

    let remainingHoursToday = freeHoursPerDay;
    let daysUsed = 1;

    for (const task of subtasks) {

        let remainingTaskHours = task.estimated_hours;

        while (remainingTaskHours > 0) {

            // Deadline crossed
            if (daysUsed > totalDays) {

                unscheduledTasks.push({
                    title: task.title,
                    remainingHours: remainingTaskHours,
                    priority: task.priority
                });

                break;
            }

            const hoursToAssign = Math.min(
                remainingTaskHours,
                remainingHoursToday
            );

            const currentDateString =
                currentDate.toISOString().split("T")[0];

            let daySchedule = schedule.find(
                day => day.date === currentDateString
            );

            if (!daySchedule) {

                daySchedule = {
                    date: currentDateString,
                    tasks: []
                };

                schedule.push(daySchedule);

            }

            daySchedule.tasks.push({

                    title: task.title,

                    description: task.description,

                    hours: hoursToAssign,

                    priority: task.priority,

                    completed: false

            });

            remainingTaskHours -= hoursToAssign;

            remainingHoursToday -= hoursToAssign;

            // Move to next day if today's hours are finished
            if (remainingHoursToday === 0) {

                currentDate.setDate(
                    currentDate.getDate() + 1
                );

                remainingHoursToday = freeHoursPerDay;

                daysUsed++;

            }

        }

    }

    return {

        schedule,

        unscheduledTasks

    };

}

module.exports = {
    generateSchedule
};