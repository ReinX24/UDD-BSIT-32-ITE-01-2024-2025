import ThreadComposer from "@/components/ThreadComposer";
import { StatusBar } from "expo-status-bar";

const create = () => {
  return (
    <>
      <StatusBar hidden />
      <ThreadComposer></ThreadComposer>
    </>
  );
};

export default create;
