import { NextResponse } from "next/server";
import {factoryAddress,
    routerAddress,
    fromAddress,
    toAddress} from "../extras/AddressList";

import {erc20ABI, factoryABI, pairABI, routerABI} from "../extras/AbiInfo"
import {ethers}  from "ethers";


export async function POST(request: Request) {
    const body = await request.json();
    const {amnt} = body;

    const amount = String(amnt)

    // console.log(amount);
    const provider = new ethers.JsonRpcProvider(
        "https://bsc-dataseed1.binance.org/"
    )
    
    const factoryInstance = new ethers.Contract(
        factoryAddress,factoryABI,provider
    )
    
    const routerInstance=new ethers.Contract(
        routerAddress,routerABI,provider
    )
    
    
    const token1 = new ethers.Contract(
        fromAddress,erc20ABI,provider
      )
      const token2 = new ethers.Contract(
        toAddress,erc20ABI,provider
      )
      const decimal1= await token1.decimals() //fetching the decimal of the token from its contract
      const decimal2= await token2.decimals()
      
      const amountIn = ethers.parseUnits(amount,decimal1).toString(); // converting the human format in terms of wei for 100 busd its wei value is 100x10^18

      const amountsOut = await routerInstance.getAmountsOut(amountIn,[
        fromAddress,
        toAddress
      ])
      console.log(amountsOut);
      const humanOutput = ethers.formatUnits(
        amountsOut[1].toString(),
        decimal2
      )

      console.log(humanOutput); 
    
    return NextResponse.json({message:humanOutput})

}