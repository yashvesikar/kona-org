import styles from "./Header.module.scss";
import Image from "next/image";
import useBreakpoint from "~/hooks/useBreakpoint";
import { Breakpoint } from "~/constants/global";

export const Header = () => {
  const handleSubmit = () => {};
  const searchTerm = "What are you looking for?";
  const handleChange = () => {};
  const randomFunPlaceholder = "What are you looking for?";

  const breakpoint = useBreakpoint();
  
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Image
          src="/assets/images/logo.png"
          alt="Kona Logo"
          width={220}
          height={55}
        />
      </div>
      {breakpoint && breakpoint >= Breakpoint.MD ? (
        <div className={styles.searchContainer}>
          <form onSubmit={handleSubmit} className={styles.searchBarForm}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleChange}
              className={styles.searchBar}
              placeholder={randomFunPlaceholder}
            />
            <div className={styles.searchIconContainer}>
              <Image
                src="/assets/images/search.svg"
                alt="Magnifying glass search icon"
                width={25}
                height={25}
              />
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.drowDownNav}>
          <Image
            src="/assets/images/menu.svg"
            alt="Menu icon"
            width={25}
            height={25}
          />
        </div>
      )}
    </div>
  );
};
