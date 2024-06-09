"use client"

import * as React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"

const SwapCard = ()=> {
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
              <Input id="name" type = "number" placeholder="Sell" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">WBNB</Label>
              <Input id="name" type = "number" placeholder="Buy" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Connect Wallet</Button>
      </CardFooter>
    </Card>
  )
}

export default SwapCard
