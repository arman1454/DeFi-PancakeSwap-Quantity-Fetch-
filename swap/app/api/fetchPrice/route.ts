import { NextResponse } from "next/server";
import {factoryAddress,
    routerAddress,
    fromAddress,
    toAddress} from "./AddressList";

export async function POST(request: Request) {
    const body = await request.json();
    const {amount} = body;
    
    return NextResponse.json({message:"got the data"})

}