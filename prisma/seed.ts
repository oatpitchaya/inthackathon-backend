/* eslint-disable */
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Skills with classification
  const skill1 = await prisma.skill.create({
    data: {
      skill_name: 'JavaScript',
      skill_type: 'Hard Skill',
      image_url: 'js.png',
    },
  });

  const skill2 = await prisma.skill.create({
    data: {
      skill_name: 'Business Communication',
      skill_type: 'Soft Skill',
      image_url: 'business_communication.png',
    },
  });

  const skill3 = await prisma.skill.create({
    data: {
      skill_name: 'UI/UX Design',
      skill_type: 'Hard Skill',
      image_url: 'uiux.png',
    },
  });

  // 2. Random Character Creation
  const user1 = await prisma.user.create({
    data: {
      username: 'tle',
      email: 'tle123@gmail.com',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'poom',
      email: 'poon555@gmail.com',
    },
  });

  const character1 = await prisma.character.create({
    data: {
      userId: user1.id,
      level: Math.floor(Math.random() * 10) + 1,
      exp: Math.floor(Math.random() * 500),
      coin: Math.floor(Math.random() * 100),
      ticket: Math.floor(Math.random() * 30),
    },
  });

  const character2 = await prisma.character.create({
    data: {
      userId: user2.id,
      level: Math.floor(Math.random() * 10) + 1,
      exp: Math.floor(Math.random() * 500),
      coin: Math.floor(Math.random() * 100),
      ticket: Math.floor(Math.random() * 30),
    },
  });

  // 3. Topic corresponding with each skill
  const topic1 = await prisma.topic.create({
    data: {
      skillId: skill1.id,
      topic: 'Data Structures and Algorithms',
    },
  });

  const topic2 = await prisma.topic.create({
    data: {
      skillId: skill2.id,
      topic: 'Effective Business Communication',
    },
  });

  const topic3 = await prisma.topic.create({
    data: {
      skillId: skill3.id,
      topic: 'UI/UX Design Principles',
    },
  });

  // 4. Lessons for each topic
  const lesson1 = await prisma.lesson.create({
    data: {
      topicId: topic1.id,
      name: 'Introduction to Data Structures',
      description:
        'Learn the basics of data structures such as arrays, stacks, and queues.',
      coin: 50,
      exp: 100,
      ticket: 10,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      topicId: topic2.id,
      name: 'Mastering Business Communication',
      description:
        'A deep dive into business communication strategies and best practices.',
      coin: 50,
      exp: 100,
      ticket: 10,
    },
  });

  const lesson3 = await prisma.lesson.create({
    data: {
      topicId: topic3.id,
      name: 'UI/UX Design for Beginners',
      description:
        'Learn the fundamental concepts of user interface and user experience design.',
      coin: 50,
      exp: 100,
      ticket: 10,
    },
  });

  // 5. Quizzes for lessons
  const quiz1 = await prisma.quiz.create({
    data: {
      lessonId: lesson1.id,
      name: 'Data Structures Quiz',
      passScore: 80,
    },
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      lessonId: lesson2.id,
      name: 'Business Communication Quiz',
      passScore: 70,
    },
  });

  const quiz3 = await prisma.quiz.create({
    data: {
      lessonId: lesson3.id,
      name: 'UI/UX Design Quiz',
      passScore: 75,
    },
  });

  // 6. Quiz questions for each quiz
  const quizQuestion1 = await prisma.quizQuestion.create({
    data: {
      quizId: quiz1.id,
      question: 'What is an array?',
      answer: 'An array is a collection of elements.',
    },
  });

  const quizQuestion2 = await prisma.quizQuestion.create({
    data: {
      quizId: quiz2.id,
      question: 'What is the importance of tone in business communication?',
      answer:
        'Tone helps establish the message’s intent and the relationship with the audience.',
    },
  });

  const quizQuestion3 = await prisma.quizQuestion.create({
    data: {
      quizId: quiz3.id,
      question: 'What is the primary goal of UX design?',
      answer: 'To create a seamless and enjoyable experience for users.',
    },
  });

  // 7. Quiz choices for each question
  await prisma.quizChoice.createMany({
    data: [
      {
        questionId: quizQuestion1.id,
        choice: 'A: A type of function',
      },
      {
        questionId: quizQuestion1.id,
        choice: 'B: A collection of elements',
      },
      {
        questionId: quizQuestion2.id,
        choice: 'A: To make communication more efficient',
      },
      {
        questionId: quizQuestion2.id,
        choice: 'B: To create a formal tone',
      },
      {
        questionId: quizQuestion3.id,
        choice: 'A: To make products visually appealing',
      },
      {
        questionId: quizQuestion3.id,
        choice: 'B: To enhance the user experience',
      },
    ],
  });

  // 8. Lesson progress for users
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

  // 9. Quiz progress for users
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

  // 10. Appearances
  const appearance1 = await prisma.appearance.create({
    data: {
      description: 'Golden Sword',
      imgUrl: 'golden_sword.png',
      rate: 8,
      type: 'Weapon',
    },
  });

  const appearance2 = await prisma.appearance.create({
    data: {
      description: 'Silver Shield',
      imgUrl: 'silver_shield.png',
      rate: 7,
      type: 'Armor',
    },
  });

  // 11. Appearance Own by users
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

  // 12. SkillCareer
  const career1 = await prisma.career.create({
    data: {
      name: 'Software Engineer',
      role: 'Develop, maintain, and enhance software systems.',
      lifestyle:
        'Work in agile teams, deliver scalable solutions, often remote work.',
      imageUrl: 'software_engineer.png',
    },
  });

  const career2 = await prisma.career.create({
    data: {
      name: 'Business Analyst',
      role: 'Analyze business needs and provide solutions.',
      lifestyle:
        'Work with clients, requires good communication skills, desk-based job.',
      imageUrl: 'business_analyst.png',
    },
  });

  const career3 = await prisma.career.create({
    data: {
      name: 'UI/UX Designer',
      role: 'Design user interfaces and improve user experience.',
      lifestyle:
        'Work closely with developers, collaborate on product design, creative work.',
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

  await prisma.skillCareer.create({
    data: {
      skillId: skill3.id,
      careerId: career3.id,
    },
  });

  // 13. Intro questions and answers
  const introQuestion1 = await prisma.introQuestion.create({
    data: {
      question: 'What is your favorite skill to work on?',
    },
  });

  const introQuestion2 = await prisma.introQuestion.create({
    data: {
      question: 'Do you enjoy working in a team?',
    },
  });

  await prisma.introAnswer.create({
    data: {
      questionId: introQuestion1.id,
      answer: 'Programming',
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

  // 14. Rewards
  const reward1 = await prisma.reward.create({
    data: {
      name: 'LinkedIn Premium',
      description: 'Premium subscription for LinkedIn.',
      amount: 1,
      cost: 100,
    },
  });

  const reward2 = await prisma.reward.create({
    data: {
      name: 'Skooldio Course',
      description: 'Free access to an online course.',
      amount: 1,
      cost: 200,
    },
  });

  // 15. Reward redeemed by users
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

  // 16. Gachapong
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

  console.log('Database seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
