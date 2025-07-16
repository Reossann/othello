import styles from '../app/page.module.css';

type LeftPanelProps = {
  score: number;
  resultText: string;
  onBack: () => void;
};

export const LeftPanel = ({ score, resultText, onBack }: LeftPanelProps) => {
  return (
    <div className={styles.boxL}>
      <div className={styles.scoreBoard}>
        <div className={styles.score} />
        <div className={styles.count}>{score}</div>
      </div>
      <div className={styles.scoreBoard6} onClick={onBack}>
        <p style={{ color: 'purple', fontSize: 60 }}>時を戻そう。。。</p>
      </div>
      <div className={styles.scoreBoard4}>
        <p style={{ color: 'purple', fontSize: 50 }}>{resultText}</p>
      </div>
    </div>
  );
};
