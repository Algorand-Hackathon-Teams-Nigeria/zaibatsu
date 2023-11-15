import algosdk from 'algosdk'

const poolAccountTuple = '(string,string)'
const poolInfoTuple = '(string,string,uint8,uint8)'
const poolFundsTuple = '(uint64,uint64,uint64)'

const poolAccountCodec = algosdk.ABIType.from(poolAccountTuple)
const poolInfoCodec = algosdk.ABIType.from(poolInfoTuple)
const poolFundsCodec = algosdk.ABIType.from(poolFundsTuple)

const poolCodec = algosdk.ABITupleType.from('(address,string,string,address,string,string,string,string,string,string)');
export { poolCodec, poolAccountCodec, poolInfoCodec, poolFundsCodec }
