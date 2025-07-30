import styles from "./AnswerButton.module.css";
import { Answer } from "@/types";
import clsx from "clsx";

type Props = {
  answer: Answer;
  isSelected: boolean;
  onSelect: () => void;
};

export default function AnswerButton({ answer, isSelected, onSelect }: Props) {
  return (
    <button
      className={clsx(styles.button, { [styles.selected]: isSelected })}
      onClick={onSelect}
    >
      {answer.text}
    </button>
  );
}
