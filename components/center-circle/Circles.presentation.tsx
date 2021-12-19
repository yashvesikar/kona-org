import styles from "./CenterCircle.module.scss";
import { useWindowSize } from "~/hooks/useWindowSize";

interface ICirclesProps {
  radius: number;
  centerCircleContent: JSX.Element;
  subCircleContent: JSX.Element[];
  isPrimaryCircle: boolean;
}

export const Circles = (props: ICirclesProps): JSX.Element => {
  const { radius = 200, centerCircleContent, subCircleContent} = props;
  
  const { width, height } = useWindowSize();

  if (!width || !height) {
    return <div />;
  }
  
  const centerX = width / 4;
  const centerY = height / 4;

  const subCircleRatio = 0.7;
  console.log("SUB CIRCLE CONTENT: ", subCircleContent);
  return (
      <>
        <div className={styles.circle} style={{ top: centerY, left: centerX, width: radius * 2, height: radius * 2 }}>
          <div className={styles.centerCircleContent}>
            { centerCircleContent }
          </div>
        </div>
        {
          subCircleContent?.map((content: JSX.Element, index: number) => {
            
            const theta = 2 * Math.PI * (index / subCircleContent.length);
            const xCenterDistanceAwayFromEdge = (centerX - (subCircleRatio * radius/2) + radius)
            const yCenterDistanceAwayFromEdge = (centerY - (subCircleRatio * radius/2) + radius)
            const left = xCenterDistanceAwayFromEdge + ((1 + subCircleRatio/2) * (1 + Math.random() * 0.05)) * radius * Math.sin(theta);
            const top = yCenterDistanceAwayFromEdge - ((1 + subCircleRatio/2) * (1 + Math.random() * 0.05)) * radius * Math.cos(theta);

            return (
                <div key={index} className={styles.subCircle} style={{ left, top, width: subCircleRatio * radius, height: subCircleRatio * radius }}>
                  <div className={styles.subCircleContent}>
                    { content }
                  </div>
                </div>
            )
          })
        }
      </>
  ); 
}