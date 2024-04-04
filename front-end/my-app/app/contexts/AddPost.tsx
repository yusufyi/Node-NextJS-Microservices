import { createContext, useContext, useState } from "react";

interface AddPostContext {
  isAddingPost: boolean;
  setIsAddingPost: (isAddingPost: boolean) => void;
}

const AddPostContext = createContext<AddPostContext | undefined>(undefined);

export const useAddPost = () => {
  const context = useContext(AddPostContext);
  if (!context) {
    throw new Error("useAddPost must be used within an AddPostProvider");
  }
  return context;
};

export const AddPostProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAddingPost, setIsAddingPost] = useState(false);

  return (
    <AddPostContext.Provider value={{ isAddingPost, setIsAddingPost }}>
      {children}
    </AddPostContext.Provider>
  );
};

export default AddPostProvider;
