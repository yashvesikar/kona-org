import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./SideNavLinks.module.scss";

interface ISideNavLinkProps {
  path: string;
  pathname: string;
  subLinks?: {
    text: string;
    path: string;
    icon?: {};
  };
  icon?: {
    src: string;
    alt: string;
  };
  text: string;
}

export const SideNavLink = (props: ISideNavLinkProps) => {
  const { path, pathname, icon, text } = props;
  const router = useRouter();
  const isActive = router.pathname === pathname;
  console.log("SIDE NAV LINK: ", props);
  const { src, alt } = icon ?? { src: null, alt: null };

  return (
    <Link href={path}>
      <div className={clsx(styles.container, isActive && styles.active)}>
        {src && alt ? (
          <div className={clsx(styles.icon, isActive && styles.active)}>
            <Image src={src} alt={alt} width={30} height={30} />
          </div>
        ) : null}
        <div className={styles.primaryText}>{text}</div>
      </div>
    </Link>
  );
};
