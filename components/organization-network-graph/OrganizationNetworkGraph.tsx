import styles from "./OrganizationNetworkGraph.module.scss";
import { IUser } from "~/types/users"
import { useEffect, useRef } from "react";
import { useWindowSize } from "~/hooks/useWindowSize";
import * as d3 from "d3";

interface IOrgnizationNetworkGraphProps {
  users: IUser[][]
}

export const OrganizationNetworkGraph = (props: IOrgnizationNetworkGraphProps): JSX.Element => {

  const { users } = props;
  const svgRef = useRef(null);
  const { width, height } = useWindowSize();

  useEffect(() => {

    const svgEl = d3.select(svgRef.current);
    


  }, [users]);

  return (
    <svg ref={svgRef} width={width} height={height} />
  );

}