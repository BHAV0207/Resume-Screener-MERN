const stringSimilarity = require("string-similarity");

const calculateResumeScore = (job, resume) => {
  let skillMatches = 0;
  let experienceScore = 0;

  console.log(skillMatches , experienceScore)
  // -------- Skills scoring --------
  if (Array.isArray(resume.skills) && resume.skills.length > 0) {
    job.requiredSkills.forEach((jobSkill) => {
      const match = stringSimilarity.findBestMatch(
        jobSkill,
        resume.skills
      );
      if (match.bestMatch.rating > 0.7) {
        skillMatches++;
      }
    });
  }


  const skillScore =
    job.requiredSkills.length > 0
      ? (skillMatches / job.requiredSkills.length) * 70
      : 0;

  console.log(skillScore)
  // -------- Experience scoring --------
  if (job.minExperience > 0) {
    experienceScore =
      Math.min(resume.experience / job.minExperience, 1) * 10;
  } else {
    experienceScore = 10;
  }

  console.log(experienceScore);

  // -------- Final score --------
  const finalScore = Math.round(skillScore + experienceScore * 3);
  console.log(finalScore)

  return {
    finalScore,
    skillMatches,
    experienceScore,
    skillScore,
  };
};

module.exports = calculateResumeScore;
