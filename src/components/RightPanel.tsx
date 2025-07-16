import styles from '../app/page.module.css';

type RightPanelProps = {
  score: number;
  onPass: () => void;
  onRestart: () => void;
};

export const RightPanel = ({ score, onPass, onRestart }: RightPanelProps) => {
  return (
    <div className={styles.boxR}>
      <div className={styles.scoreBoard2}>
        <div className={styles.score2} />
        <div className={styles.count}>{score}</div>
      </div>
      <div className={styles.scoreBoard3} onClick={onPass}>
        <p style={{ color: 'purple', fontSize: 100 }}>パス</p>
      </div>
      <div className={styles.scoreBoard5} onClick={onRestart}>
        <p style={{ color: 'purple', fontSize: 60 }}>リスタート</p>
      </div>
    </div>
  );
};
