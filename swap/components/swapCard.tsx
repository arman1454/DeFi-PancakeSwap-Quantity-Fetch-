"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from "./ui/button"

import { useState, useEffect } from "react";
import axios from "axios"

const SwapCard = () => {
  const [sellAmount, setSellAmount] = useState("");
  const [buyAmount, setBuyAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "sellAmount") {
      setSellAmount(value);
    } else if (name === "buyAmount") {
      setBuyAmount(value); // Update buyAmount if user manually edits it
    }
  };

  const handleApiCall = async () => {
    if (!sellAmount) {
      return; // Prevent unnecessary API calls if sellAmount is empty
    }

    setIsLoading(true);

    try {

      const values = {
        amnt: sellAmount
      }

      const {data} = await axios.post("/api/fetchPrice", values)

      console.log(data);

      if (data) {
        setBuyAmount(data.message);
      } else {
        setApiError(data.error || "API error occurred"); // Handle API errors with more informative messages
      }
    } catch (error) {
      console.error("API error:", error);
    } finally {
      setIsLoading(false);
    }

  }

  // useEffect(() => {
  //   if (sellAmount) {
  //     handleApiCall(); // Trigger API call when sellAmount changes
  //   }
  // }, [sellAmount]);

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Swap</CardTitle>
        <CardDescription>Trade Tokens in an Instant</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-9">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">BUSD</Label>
              <Input id="sellAmount"
                type="number"
                placeholder="Sell"
                name="sellAmount"
                value={sellAmount}
                onChange={handleInputChange} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">WBNB</Label>
              <Input id="buyAmount"
                type="number"
                placeholder="Buy"
                name="buyAmount"
                value={buyAmount} // Display fetched WBNB value
                onChange={handleInputChange} // Allow manual edit
                disabled={!sellAmount} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={()=>handleApiCall()}>Get Price</Button>
      </CardFooter>
    </Card>
  )
}

export default SwapCard
