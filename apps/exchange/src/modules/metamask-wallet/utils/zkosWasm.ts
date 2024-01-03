async function getTradingHexAddressFromAccountHex(zkosAccountHex: string) {
  const zkos = await import('zkos-wasm');
  return zkos.getHexAddressFromTradingAccountHex(zkosAccountHex);
}

export { getTradingHexAddressFromAccountHex };
