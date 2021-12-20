import clsx from "clsx";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./SideNav.module.scss";
import { useUser } from "~/context/UserContextProvider";
import Link from "next/link";

export const SideNav = (props: {}) => {
  const { channels } = useUser();
  const { src, alt } = {
    src: "/assets/images/channel.png",
    alt: "Channel icon",
  };

  return (
    <div className={styles.container}>
      <div className={styles.currentUser}>Andrew Zhou</div>
      <div className={clsx(styles.navLink, styles.active)}>
        {src && alt ? (
          <div className={clsx(styles.icon, styles.active)}>
            <Image src={src} alt={alt} width={30} height={30} />
          </div>
        ) : null}
        <div className={styles.primaryText}>Channels</div>
      </div>
      <div className={styles.secondaryLinkSection}>
        {channels.map(({ name, channel_id }) => (
          <Link key={channel_id} passHref href={`/channels/${channel_id}`}>
            <a className={styles.secondaryLink}>{name}</a>
          </Link>
        ))}
      </div>
    </div>
  );
};
