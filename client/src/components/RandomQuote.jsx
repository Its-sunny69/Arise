import React, { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import { Stack } from "@mui/material";

const RandomQuote = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchQuote = async () => {
    try {
      const response = await fetch(
        "https://quoteslate.vercel.app/api/quotes/random?tags=inspiration"
      );
      const data = await response.json();
      setQuote(data.quote);
      setAuthor(data.author);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching the quote:", error);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="sm:p-4 p-2 text-center flex flex-col justify-center items-center min-h-[8rem]">
      {loading ? (
        <div className="w-full flex flex-col justify-center items-center">
          <Stack
            spacing={-1}
            sx={{
              display: "flex",
              width: "100%",
              flexFlow: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem", width: "80%", marginY: "0px" }}
            />
            <Skeleton
              variant="text"
              sx={{ fontSize: "1.5rem", width: "60%", marginY: "0px" }}
            />
          </Stack>

          <Skeleton
            variant="text"
            sx={{ fontSize: "1rem", width: "30%", marginTop: "0.5rem" }}
          />
        </div>
      ) : (
        <>
          <p className="text-xl font-semibold italic">"{quote}"</p>
          <p className=" mt-2 font-medium">
            - by {author}
          </p>
        </>
      )}
    </div>
  );
};

export default RandomQuote;
