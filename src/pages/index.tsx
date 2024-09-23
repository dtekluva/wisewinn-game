// import { useRouter } from 'next/router';
import * as React from 'react';
import { motion } from 'framer-motion'

import { NotificationModal } from '@/components/elements';
import { useNotificationModalControl } from '@/hooks';

import { MarqueeContainer } from '@/features/ask_ai_by_glo/component';

// Type inspired by https://github.com/vercel/next.js/issues/4515#issuecomment-485236368
// Lazy load this component to avoid pulling in huge JS bundles when not necessary
// const WebsiteMobileMenu = dynamic<WebsiteMobileMenuProps>(() =>
//   import('./WebsiteMobileMenu').then(mod => mod.WebsiteMobileMenu),
// );

interface WebsiteHeaderProps {
  sample?: string;
}


// Define types
type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

type Answer = {
  questionId: number;
  answerId: number;
  user: string;
  time: number;
  isCorrect: boolean;
}

type GameState = {
  currentQuestionIndex: number;
  answers: Answer[];
  score: number;
}

// Sample questions (you can expand this to 30)
const questions: Question[] = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  },
  // ... add more questions here
]

// Sound effects
const correctSound = typeof Audio !== 'undefined' ? new Audio('/correct.mp3') : null
const incorrectSound = typeof Audio !== 'undefined' ? new Audio('/incorrect.mp3') : null



const AskAI: React.FunctionComponent<WebsiteHeaderProps> = () => {
  // const { isModalOpen, closeModal, openModal } = useModalControl();
  const {
    message: errorModalMessage,
    isModalOpen: isErrorModalOpen,
    closeModal: closeErrorModal,
    openModal: _openErrorModal,
  } = useNotificationModalControl();



  const phoneNumberList = [
    'Answer questions win. ₦50,000.00)',
    '- Answer questions 2 more . ₦20,000.00)',
    '- Answer questions win 3 more . ₦25,000.00)',
    '- Answer questions win 4 more . ₦50,000.00)',
    '- Answer questions win everyone is a winner . ₦20,000.00)',
    '- Answer questions win omoo otilo!!. ₦20,000.00)',
  ];
  const [gameState, setGameState] = React.useState<GameState>(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('millionaireGameState')
      return savedState ? JSON.parse(savedState) : {
        currentQuestionIndex: 0,
        answers: [],
        score: 0
      }
    }
    return {
      currentQuestionIndex: 0,
      answers: [],
      score: 0
    }
  })
  const [gameStartTime, setGameStartTime] = React.useState(Date.now())
  const [isAnswered, setIsAnswered] = React.useState(false)

  React.useEffect(() => {
    setGameStartTime(Date.now())
  }, [gameState.currentQuestionIndex])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('millionaireGameState', JSON.stringify(gameState))
    }
  }, [gameState])

  const calculateScore = React.useCallback((isCorrect: boolean, time: number) => {
    const baseScore = isCorrect ? 1000 : 0
    const timeBonus = Math.max(0, 10000 - time) // Max 10 seconds for full time bonus
    return baseScore + Math.floor(timeBonus / 100)
  }, [])

  const handleAnswer = React.useCallback((answerId: number) => {
    if (isAnswered) return

    const currentQuestion = questions[gameState.currentQuestionIndex]
    if (!currentQuestion) return

    const isCorrect = answerId === currentQuestion.correctAnswer
    const answerTime = Date.now() - gameStartTime

    // Play sound effect
    if (isCorrect && correctSound) {
      correctSound.play().catch(e => console.error("Error playing sound:", e))
    } else if (!isCorrect && incorrectSound) {
      incorrectSound.play().catch(e => console.error("Error playing sound:", e))
    }

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      answerId,
      user: "Player 1", // In a real app, you'd get this from authentication
      time: answerTime,
      isCorrect
    }

    const newScore = gameState.score + calculateScore(isCorrect, answerTime)

    setGameState(prevState => ({
      ...prevState,
      answers: [...prevState.answers, newAnswer],
      score: newScore
    }))
    setIsAnswered(true)

    // Move to next question after a delay
    setTimeout(() => {
      if (gameState.currentQuestionIndex < questions.length - 1) {
        setGameState(prevState => ({
          ...prevState,
          currentQuestionIndex: prevState.currentQuestionIndex + 1
        }))
        setIsAnswered(false)
      } else {
        alert(`Game Over! Your final score is ${newScore}. Check console for results.`)
        console.log("Final Answers:", gameState.answers)
        // Reset game state
        setGameState({
          currentQuestionIndex: 0,
          answers: [],
          score: 0
        })
      }
    }, 2000)
  }, [gameState, gameStartTime, isAnswered, calculateScore])

  const currentQuestion = questions[gameState.currentQuestionIndex]

  if (!currentQuestion) {
    return <div>Loading...</div>
  }


  return (
    <div className="ask__ai__bg min-h-[100vh]">

      <NotificationModal
        headingText={errorModalMessage}
        label={errorModalMessage}
        type="error"
        allowDismiss
        closeModal={closeErrorModal}
        isModalOpen={isErrorModalOpen}
      />

      <section className="container mt-0 ">
        <div className="left__section relative top-8 col-span-12 lg:col-span-6">
          <button className="button__bg flex items-center rounded-full py-1 px-2 lg:py-2">
            <span className="inline-block">
              <svg
                width="28"
                height="29"
                viewBox="0 0 28 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.5414 3.35854C13.3464 2.6702 14.6647 2.6702 15.4814 3.35854L17.3247 4.9452C17.6747 5.24854 18.328 5.49354 18.7947 5.49354H20.778C22.0147 5.49354 23.0297 6.50854 23.0297 7.7452V9.72854C23.0297 10.1835 23.2747 10.8485 23.578 11.1985L25.1647 13.0419C25.853 13.8469 25.853 15.1652 25.1647 15.9819L23.578 17.8252C23.2747 18.1752 23.0297 18.8285 23.0297 19.2952V21.2785C23.0297 22.5152 22.0147 23.5302 20.778 23.5302H18.7947C18.3397 23.5302 17.6747 23.7752 17.3247 24.0785L15.4814 25.6652C14.6764 26.3535 13.358 26.3535 12.5414 25.6652L10.698 24.0785C10.348 23.7752 9.6947 23.5302 9.22803 23.5302H7.2097C5.97303 23.5302 4.95803 22.5152 4.95803 21.2785V19.2835C4.95803 18.8285 4.71303 18.1752 4.42137 17.8252L2.84637 15.9702C2.1697 15.1652 2.1697 13.8585 2.84637 13.0535L4.42137 11.1985C4.71303 10.8485 4.95803 10.1952 4.95803 9.7402V7.73354C4.95803 6.49687 5.97303 5.48187 7.2097 5.48187H9.22803C9.68303 5.48187 10.348 5.23687 10.698 4.93354L12.5414 3.35854Z"
                  fill="#50B651"
                />
                <path
                  d="M12.588 18.1985C12.3547 18.1985 12.133 18.1052 11.9697 17.9418L9.14633 15.1185C8.80799 14.7802 8.80799 14.2202 9.14633 13.8818C9.48466 13.5435 10.0447 13.5435 10.383 13.8818L12.588 16.0868L17.6047 11.0702C17.943 10.7318 18.503 10.7318 18.8413 11.0702C19.1797 11.4085 19.1797 11.9685 18.8413 12.3068L13.2063 17.9418C13.043 18.1052 12.8213 18.1985 12.588 18.1985Z"
                  fill="white"
                />
              </svg>
            </span>
            <span className="clipped__text ml-2 inline-block text-xs font-[600] lg:text-sm">
              Whyze Games
            </span>
          </button>


        </div>
        <div className="flex flex-col items-center justify-center bg-[#00041068] text-white p-4 rounded-xl border border-[#00E2C6] h-[600px] mt-16">
          <div className="w-full max-w-2xl bg-blue-900 rounded-lg p-6 shadow-lg">
            <h2 className="text-2xl mb-4">{currentQuestion.text}</h2>
            <div className="grid grid-cols-2 gap-4">
              {currentQuestion.options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <button
                    className={`w-full p-4 text-lg space-x-2 rounded-lg transition duration-500 ease-in-out hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-wise-purple-light focus:ring-opacity-30 focus:ring-offset-2 focus:ring-offset-white active:scale-[0.95] disabled:scale-100 disabled:cursor-not-allowed disabled:opacity-60 ${isAnswered && index === currentQuestion.correctAnswer
                      ? "bg-green-500"
                      : isAnswered && gameState.answers[gameState.answers.length - 1]?.answerId === index
                        ? "bg-red-500"
                        : "bg-blue-700 hover:bg-blue-600"
                      }`}
                    onClick={() => handleAnswer(index)}
                    disabled={isAnswered}
                  >
                    {option}
                  </button>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 text-xl">
              Score: {gameState.score}
            </div>
          </div>
        </div>
        {/* 
        <div className="mt-10 w-[350px] lg:hidden">
          <Image
            alt="right side image"
            src={'/images/ask-ai-by-glo/landingpage_mobile.svg'}
            width={500}
            height={500}
            quality={100}
            className="relative object-contain"
            sizes="100vw"
            //
          />
        </div> */}

        {/* <div className="relative left-5 mt-12 min-w-[300px] lg:hidden">
          <Image
            src={'/images/ask-ai-by-glo/landing_page_mobile.png'}
            alt="mobile image"
            width={300}
            height={500}
            layout="responsive"
            sizes="100vw"
          />
        </div> */}

      </section>
      <div className="fixed bottom-0 ">
        {' '}
        <MarqueeContainer phoneNumberList={phoneNumberList} />
      </div>
    </div>
  );
};

export default AskAI;

{
  /*  */
}
