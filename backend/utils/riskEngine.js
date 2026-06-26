/*******************************************/
function calculateDaysRemaining(deadline) {

    const today = new Date();
    today.setHours(0,0,0,0);

    const endDate = new Date(deadline);
    endDate.setHours(0,0,0,0);

    if(isNaN(endDate.getTime())){
        throw new Error("Invalid deadline format.");
    }

    const difference = endDate - today;

    const days = Math.ceil(
        difference / (1000*60*60*24)
    );

    return Math.max(days,0);
}
/*******************************************/



/*******************************************/
function calculateAvailableHours(daysRemaining, freeHoursPerDay) {

    // Validation
    if (typeof freeHoursPerDay !== "number") {
        throw new Error("Free hours must be a number.");
    }

    if (freeHoursPerDay < 0) {
        throw new Error("Free hours cannot be negative.");
    }

    // Nobody can realistically do more than 12 productive hours/day
    freeHoursPerDay = Math.min(freeHoursPerDay, 12);

    return daysRemaining * freeHoursPerDay;
}
/*******************************************/



/*******************************************/
function calculateDifficultyWeight(difficulty = "easy") {

    if (!difficulty) {
        return 1.0;
    }

    switch (difficulty.toLowerCase()) {

        case "easy":
            return 1.0;

        case "medium":
            return 1.2;

        case "hard":
            return 1.5;

        default:
            return 1.0;

    }

}
/*******************************************/



/*******************************************/
function calculateRiskScore(requiredHours, availableHours, difficultyWeight) {

    if (availableHours <= 0) {
        return 100;
    }

    // Time Pressure (0–60)
    const timePressure = Math.min(
        (requiredHours / availableHours) * 60,
        60
    );

    // Difficulty (0–20)
    const difficultyScore = (difficultyWeight - 1) * 40;

    // Total Score
    const score = Math.min(
        Math.round(timePressure + difficultyScore),
        100
    );

    return score;
}
/*******************************************/




/*******************************************/
function getRiskLevel(score) {

    if (score <= 30) {
        return "Low";
    }

    if (score <= 60) {
        return "Medium";
    }

    if (score <= 80) {
        return "High";
    }

    return "Critical";
}

function generateRecommendation(level) {

    switch (level) {

        case "Low":
            return "You're on track. Maintain your current pace.";

        case "Medium":
            return "Stay consistent. Avoid delaying high-priority tasks.";

        case "High":
            return "Start today. Break your work into smaller sessions.";

        case "Critical":
            return "Activate Panic Mode. Focus only on the highest priority tasks.";

        default:
            return "Keep making steady progress.";
    }

}
/*******************************************/




/*******************************************/
function calculateRisk({
          deadline,
    totalEstimatedHours,
    freeHoursPerDay,
    difficulty
}) {

    const daysRemaining = calculateDaysRemaining(deadline);

    const availableHours = calculateAvailableHours(
        daysRemaining,
        freeHoursPerDay
);

const difficultyWeight =
calculateDifficultyWeight(difficulty);

const score = calculateRiskScore(
          totalEstimatedHours,
          availableHours,
          difficultyWeight
);

const level = getRiskLevel(score);

const recommendation = generateRecommendation(level);

return {

    pri: score,

    level,

    recommendation,

    daysRemaining,

    availableHours,

    requiredHours: totalEstimatedHours,

    difficulty,

    generatedAt: new Date().toISOString()

};
}
/*******************************************/














module.exports = {

    calculateDaysRemaining,

    calculateAvailableHours,

    calculateDifficultyWeight,

    calculateRiskScore,

    getRiskLevel,

    generateRecommendation,

    calculateRisk

};