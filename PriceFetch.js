const ethers = require('ethers');
const {
    factoryAddress,
    routerAddress,
    fromAddress,
    toAddress
} = require("./AddressList")
const {erc20ABI, factoryABI, pairABI, routerABI}= require("./AbiInfo");

const provider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed1.binance.org/"
)

const factoryInstance = new ethers.Contract(
    factoryAddress,factoryABI,provider
)

const routerInstance=new ethers.Contract(
    routerAddress,routerABI,provider
)

// Now with the help of these instances we are going to comm with the blockchain


const priceFetch=async(amount)=>{
    const token1 = new ethers.Contract(
        fromAddress,erc20ABI,provider
      )
      const token2 = new ethers.Contract(
        toAddress,erc20ABI,provider
      )
      const decimal1= await token1.decimals() //fetching the decimal of the token from its contract
      const decimal2= await token2.decimals()
      
      const amountIn = ethers.utils.parseUnits(amount,decimal1).toString();

      const amountsOut = await routerInstance.getAmountsOut(amountIn,[
        fromAddress,
        toAddress
      ])

      const humanOutput = ethers.utils.formatUnits(
        amountsOut[1].toString(),
        decimal2
      )

      console.log(humanOutput);
}

priceFetch("100")