/* eslint-disable */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create some users
  const user1 = await prisma.user.create({
    data: {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: 2,
      username: 'jane_doe',
      email: 'jane@example.com',
    },
  });

  // Create some skills
  const skill1 = await prisma.skill.create({
    data: {
      id: 3,
      skill_name: 'JavaScript',
      skill_type: 'Programming',
      image_url: 'js.png',
    },
  });

  const skill2 = await prisma.skill.create({
    data: {
      skill_name: 'Python',
      skill_type: 'Programming',
      image_url: 'python.png',
    },
  });

  const skill3 = await prisma.skill.create({
    data: {
      skill_name: 'UI/UX Design',
      skill_type: 'Design',
      image_url: 'uiux.png',
    },
  });

  // Create characters
  await prisma.character.create({
    data: {
      userId: user1.id,
      level: 5,
      exp: 150,
      coin: 100,
      ticket: 20,
    },
  });

  await prisma.character.create({
    data: {
      userId: user2.id,
      level: 3,
      exp: 100,
      coin: 50,
      ticket: 10,
    },
  });

  // Create topics
  const topic1 = await prisma.topic.create({
    data: {
      skillId: skill3.id,
      topic: 'Variables and Data Types',
    },
  });

  const topic2 = await prisma.topic.create({
    data: {
      skillId: skill1.id,
      topic: 'Data Structures',
    },
  });

  // Create lessons
  const lesson1 = await prisma.lesson.create({
    data: {
      topicId: topic1.id,
      name: 'Introduction to JavaScript',
      description: 'A basic introduction to JavaScript',
      coin: 50,
      exp: 100,
      ticket: 10,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      topicId: topic2.id,
      name: 'Introduction to Python',
      description: 'Learn Python programming from scratch.',
      coin: 50,
      exp: 100,
      ticket: 10,
    },
  });

  // Create some quizzes
  const quiz1 = await prisma.quiz.create({
    data: {
      lessonId: lesson1.id,
      name: 'JavaScript Basics Quiz',
      passScore: 80,
    },
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      lessonId: lesson2.id,
      name: 'Python Basics Quiz',
      passScore: 70,
    },
  });

  // Create quiz questions
  const quizQuestion1 = await prisma.quizQuestion.create({
    data: {
      quizId: quiz1.id,
      question: 'What is the output of console.log(2 + 2)?',
      answer: 'A: Correct answer',
    },
  });

  const quizQuestion2 = await prisma.quizQuestion.create({
    data: {
      quizId: quiz2.id,
      question: 'What is the correct way to define a function in Python?',
      answer: 'B: Incorrect answer',
    },
  });

  // Create quiz choices
  await prisma.quizChoice.createMany({
    data: [
      {
        questionId: quizQuestion1.id,
        choice: 'A: Correct answer',
      },
      {
        questionId: quizQuestion1.id,
        choice: 'B: Incorrect answer',
      },
      {
        questionId: quizQuestion2.id,
        choice: 'A: Incorrect answer',
      },
      {
        questionId: quizQuestion2.id,
        choice: 'B: Correct answer',
      },
    ],
  });

  // Create lesson progress for users
  await prisma.lessonProgress.createMany({
    data: [
      {
        userId: user1.id,
        lessonId: lesson1.id,
      },
      {
        userId: user2.id,
        lessonId: lesson2.id,
      },
    ],
  });

  // Create quiz progress for users
  await prisma.quizProgress.createMany({
    data: [
      {
        userId: user1.id,
        quizId: quiz1.id,
        score: 90,
      },
      {
        userId: user2.id,
        quizId: quiz2.id,
        score: 60,
      },
    ],
  });

  console.log('Database seeding completed.');

  //new
  // Create some appearances
  const appearance1 = await prisma.appearance.create({
    data: {
      description: 'Red Helmet',
      imgUrl: 'red_helmet.png',
      rate: 5,
      type: 'Helmet',
    },
  });

  const appearance2 = await prisma.appearance.create({
    data: {
      description: 'Blue Armor',
      imgUrl: 'blue_armor.png',
      rate: 8,
      type: 'Armor',
    },
  });

  // Create AppearanceOwn for users
  await prisma.appearanceOwn.create({
    data: {
      userId: user1.id,
      appearanceId: appearance1.id,
    },
  });

  await prisma.appearanceOwn.create({
    data: {
      userId: user2.id,
      appearanceId: appearance2.id,
    },
  });

  // Create AppearanceWear for users
  await prisma.appearanceWear.create({
    data: {
      userId: user1.id,
      appearanceId: appearance1.id,
    },
  });

  await prisma.appearanceWear.create({
    data: {
      userId: user2.id,
      appearanceId: appearance2.id,
    },
  });

  // Create Career and SkillCareer
  const career1 = await prisma.career.create({
    data: {
      name: 'Software Engineer',
      role: 'rolerole',
      lifestyle: 'lifestylelifestyle',
      imageUrl: 'software_engineer.png',
    },
  });

  const career2 = await prisma.career.create({
    data: {
      name: 'UI/UX Designer',
      role: 'rolerole',
      lifestyle: 'lifestylelifestyle',
      imageUrl: 'uiux_designer.png',
    },
  });

  await prisma.skillCareer.create({
    data: {
      skillId: skill1.id,
      careerId: career1.id,
    },
  });

  await prisma.skillCareer.create({
    data: {
      skillId: skill2.id,
      careerId: career2.id,
    },
  });

  // Create IntroQuestion and IntroAnswer
  const introQuestion1 = await prisma.introQuestion.create({
    data: {
      question: 'What is your favorite programming language?',
    },
  });

  const introQuestion2 = await prisma.introQuestion.create({
    data: {
      question: 'Do you prefer working on interfaces?',
    },
  });

  await prisma.introAnswer.create({
    data: {
      questionId: introQuestion1.id,
      answer: 'JavaScript',
      skillId: skill1.id,
    },
  });

  await prisma.introAnswer.create({
    data: {
      questionId: introQuestion2.id,
      answer: 'Yes',
      skillId: skill2.id,
    },
  });

  // Create Rewards
  const reward1 = await prisma.reward.create({
    data: {
      name: 'Discount Coupon',
      description: '10% off on courses',
      amount: 1,
      cost: 50,
    },
  });

  const reward2 = await prisma.reward.create({
    data: {
      name: 'Exclusive Badge',
      description: 'A special badge for top users',
      amount: 1,
      cost: 100,
    },
  });

  // Create RewardRedeemed for users
  await prisma.rewardRedeemed.create({
    data: {
      userId: user1.id,
      rewardId: reward1.id,
    },
  });

  await prisma.rewardRedeemed.create({
    data: {
      userId: user2.id,
      rewardId: reward2.id,
    },
  });

  // Create Gachapong for users
  await prisma.gachapong.create({
    data: {
      userId: user1.id,
      appearanceId: appearance1.id,
    },
  });

  await prisma.gachapong.create({
    data: {
      userId: user2.id,
      appearanceId: appearance2.id,
    },
  });
  //
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
