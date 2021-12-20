import { createContext, PropsWithChildren, useContext } from "react";
import { UserId } from "~/constants/global";

interface IUserContext {
  userId: string;
  channels: { name: string; channel_id: string }[];
}

const UserContext = createContext<IUserContext>({
  userId: UserId,
  channels: [],
});

export const UserContextProvider = (
  props: PropsWithChildren<{ channels: { name: string; channel_id: string }[] }>
) => {
  const { children, channels } = props;

  console.log("In UserContextProvider: ", channels);

  return (
    <UserContext.Provider value={{ userId: UserId, channels }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const { userId, channels } = useContext(UserContext);

  return { userId, channels };
};
