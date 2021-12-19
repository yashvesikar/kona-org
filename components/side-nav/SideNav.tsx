import { useRouter } from "next/router";
import { SideNavLink } from "~/components/side-nav-link/SideNavLink";
import styles from "./SideNav.module.scss";

export const SideNav = () => {
  const router = useRouter();
  console.log("PATHNAME: ", router.pathname);
  return (
    <div className={styles.container}>
      <div className={styles.currentUser}>Andrew Zhou</div>
      <SideNavLink
        icon={{ src: "/assets/images/home.png", alt: "Home icon" }}
        text="Home"
        pathname="/"
        path="/"
      />
      <SideNavLink
        icon={{ src: "/assets/images/channel.png", alt: "Channel icon" }}
        text="Channels"
        pathname="/channels/[id]"
        path="/channels/CQ6151GPQ"
      />
    </div>
  );
};
