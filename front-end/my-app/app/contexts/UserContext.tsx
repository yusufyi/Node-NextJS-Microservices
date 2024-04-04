import { createContext, useState, useEffect, useContext } from "react";

interface UserType {
  id: number;
  username: string;
  avatar: string;
}

interface UserContextType {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
const DummyUser: UserType[] = [
  {
    id: 1,
    username: "Cloé Westhuis",
    avatar: "https://randomuser.me/api/portraits/women/90.jpg",
  },
  {
    id: 2,
    username: "Aayushi Kulkarni",
    avatar: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    id: 3,
    username: "Alan Harper",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
  },
];

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchRandomUser = async () => {
      try {
        // const response = await fetch("https://randomuser.me/api/");
        // const data = await response.json();
        // const randomUser = data.results[0];

        const RandomUser =
          DummyUser[Math.floor(Math.random() * DummyUser.length)];
        const formattedUser: UserType = {
          id: RandomUser.id,
          username: RandomUser.username,
          avatar: RandomUser.avatar,
        };

        // const formattedUser: UserType = {
        //   id: randomUser.login.uuid,
        //   username: `${randomUser.name.first} ${randomUser.name.last}`,
        //   avatar: randomUser.picture.large,
        // };
        console.log("Random user:", formattedUser);
        setUser(formattedUser);
      } catch (error) {
        console.error("Error fetching random user:", error);
      }
    };

    fetchRandomUser();

    // Clean up function not needed in this case
  }, []); // Empty dependency array ensures the effect runs only once when component mounts

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
