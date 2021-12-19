import { useWindowSize } from "~/hooks/useWindowSize";
import { IUser } from "~/types/users";
import styles from "./CenterCircle.module.scss";

interface ICircleProps {
  radius?: number;
  users: IUser[][]
}

export function CenterCircle(props: ICircleProps): JSX.Element {
  const { radius = 200, users } = props;
  
  const topLevelUsers = users[0];
  const { width, height } = useWindowSize();

  console.log("Page dimensions: ", width, height);

  if (!width || !height) {
    return <div />;
  }
  
  const centerX = width / 4;
  const centerY = height / 4;

  const subCircleRatio = 0.7;

  return (
      <>
        <div className={styles.circle} style={{ top: centerY, left: centerX, width: radius * 2, height: radius * 2 }}>
          <div className={styles.centerCircleContent}>
            <h3> Manager Name </h3>
            <h4> Percentage reporting </h4>
          </div>
        </div>
        {
          topLevelUsers.map((user: IUser, index: number) => {
            
            const theta = 2 * Math.PI * (index / topLevelUsers.length);
            const xCenterDistanceAwayFromEdge = (centerX - (subCircleRatio * radius/2) + radius)
            const yCenterDistanceAwayFromEdge = (centerY - (subCircleRatio * radius/2) + radius)
            const left = xCenterDistanceAwayFromEdge + ((1 + subCircleRatio/2) * (1 + Math.random() * 0.05)) * radius * Math.sin(theta);
            const top = yCenterDistanceAwayFromEdge - ((1 + subCircleRatio/2) * (1 + Math.random() * 0.05)) * radius * Math.cos(theta);

            return (
                <div key={index} className={styles.subCircle} style={{ left, top, width: subCircleRatio * radius, height: subCircleRatio * radius }}>
                  <div className={styles.subCircleContent}>
                    <h4> {user.realName} </h4>
                  </div>
                </div>
            )
          })
        }
      </>
  );
}