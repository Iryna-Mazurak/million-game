import styles from "./Sidebar.module.css";
import { Question } from "@/types";

type SidebarProps = {
  questions: Question[];
  currentIndex: number;
  correctQuestions: Question[];
};

export default function Sidebar({
  questions,
  currentIndex,
  correctQuestions,
}: SidebarProps) {
  const reversedQuestions = [...questions].slice().reverse();
  const currentQuestion = questions[currentIndex];
  const currentReward = currentQuestion ? currentQuestion.reward : 0;

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.list}>
        {reversedQuestions.map((q) => {
          const isCurrent = q.reward === currentReward;
          const isCorrect = correctQuestions.some((cq) => cq.id === q.id);
          return (
            <li
              key={q.id}
              className={`${styles.item} ${
                isCurrent ? styles.current : isCorrect ? styles.correct : ""
              }`}
            >
              ${q.reward.toLocaleString()}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
