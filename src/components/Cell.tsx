import styles from '../app/page.module.css';

type CellProps = {
  color: number;
  onClick: () => void;
};

export const Cell = ({ color, onClick }: CellProps) => {
  const stoneColor =
    color === 1 ? '#000' : color === 2 ? '#fff' : color === 3 ? '#00f' : 'transparent';

  return (
    <div className={styles.cell} onClick={onClick}>
      {color !== 0 && (
        <div
          className={styles.stone}
          style={{
            background: stoneColor,
          }}
        />
      )}
    </div>
  );
};
