export async function getExchangeRates(from: string, to: string): Promise<number> {
  const exchange = await fetch(
    `https://api.coingate.com/api/v2/rates/merchant/${from}/${to}`,
    { method: "GET", headers: { accept: "text/plain" }, mode: "no-cors" }
  )
  .then(res => res.json()).then(json => json as number)
  .catch(err => console.error(err))

  return exchange as number
}
