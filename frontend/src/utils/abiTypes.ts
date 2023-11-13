import algosdk from 'algosdk'

const poolAccountTuple = '(string,string)'
const poolInfoTuple = '(string,string,uint8,uint8)'
const poolFundsTuple = '(uint64,uint64,uint64)'

const poolAccountCodec = algosdk.ABIType.from(poolAccountTuple)
const poolInfoCodec = algosdk.ABIType.from(poolInfoTuple)
const poolFundsCodec = algosdk.ABIType.from(poolFundsTuple)

const poolCodec = algosdk.ABIType.from('(address,string,string,address,uint8,uint8,uint64,uint64,uint64)')
export { poolCodec, poolAccountCodec, poolInfoCodec, poolFundsCodec }
