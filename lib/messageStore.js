import { useEffect, useRef, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export const useMessageStore = (props) => {
  const [channels, setChannels] = useState([]);

  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) {
      // Get Channels
      fetchChannels(setChannels);

      const channelListener = supabase
        .channel("public:conversations")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "conversations" },
          (payload) => setChannels((prevValue) => [...prevValue, payload.new])
        )
        .subscribe();
    }

    return () => {
      if (mountedRef.current) {
        supabase.removeChannel("public:conversations");
      } else {
        mountedRef.current = true;
      }
    };
  }, []);

  return {
    channels,
  };
};

/**
 * Fetch all channels
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchChannels = async (setState) => {
  try {
    let { data } = await supabase.from("conversations").select("*");
    console.log(data);
    if (setState) setState(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
};
