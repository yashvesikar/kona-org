import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";
import styles from "./SideNavLinks.module.scss";

interface ISubNavLink {
  icon?: {};
  text: string;
  path: string;
}

interface ISideNavLinkProps {
  path: string;
  pathname: string;
  subLinks?: ISubNavLink[];
  icon?: {
    src: string;
    alt: string;
  };
  text: string;
}

const LinkContainer = (
  props: PropsWithChildren<{
    path: string;
    subLinks: ISubNavLink[] | undefined;
  }>
) => {
  const { subLinks, path, children } = props;

  // If there are sublinks then render fragment, otherwise render link
  return subLinks ? <>{children}</> : <Link href={path}>{children}</Link>;
};

const SubNavLinks = (props: PropsWithChildren<{ subLinks: ISubNavLink[] }>) => {
  const { subLinks } = props;

  return (
    <ul className={styles.subNavLinks}>
      {subLinks.map((subLink) => (
        <li key={subLink.text}>
          <Link href={subLink.path}>
            <a>{subLink.text}</a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const SideNavLink = (props: ISideNavLinkProps) => {
  const { path, pathname, subLinks, icon, text } = props;
  const router = useRouter();
  const isActive = router.pathname === pathname;
  const { src, alt } = icon ?? { src: null, alt: null };

  return (
    <div>
      <LinkContainer path={path} subLinks={subLinks}>
        <div className={clsx(styles.container, isActive && styles.active)}>
          {src && alt ? (
            <div className={clsx(styles.icon, isActive && styles.active)}>
              <Image src={src} alt={alt} width={30} height={30} />
            </div>
          ) : null}
          <div className={styles.primaryText}>{text}</div>
        </div>
      </LinkContainer>
      {subLinks ? <SubNavLinks subLinks={subLinks} /> : null}
    </div>
  );
};
