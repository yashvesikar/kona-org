import styles from "./StandardLayout.module.scss";

import React from "react";
import { Header } from "~/components/header/Header";
import { SideNav } from "~/components/side-nav/SideNav";
import useBreakpoint from "~/hooks/useBreakpoint";
import { Breakpoint } from "~/constants/global";

export const StandardLayout = ({ children }: { children: JSX.Element }) => {
  const breakpoint = useBreakpoint();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Header />
        <div className={styles.content}>
          {breakpoint && breakpoint >= Breakpoint.MD ? <SideNav /> : null}
          <div className={styles.mainContent}>{children}</div>
        </div>
      </main>
    </div>
  );
};
