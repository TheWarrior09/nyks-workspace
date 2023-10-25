import { getAccountValueFromOutput, getUtxoHex } from '../accountManagement';
import { queryUtxoForAddress, queryUtxoOutput } from '../zkosApi';

const getAddressUtxoDetails = async (address: string) => {
  const utxoResponse = await queryUtxoForAddress(address);
  const utxo = JSON.stringify(utxoResponse.result[0]);
  const utxoHex = await getUtxoHex(utxo);

  return { utxoJson: utxo, utxoHex };
};

const getAddressOutputDetails = async (address: string) => {
  const utxoDetails = await getAddressUtxoDetails(address);
  const outputResponse = await queryUtxoOutput(utxoDetails.utxoHex);
  const output = JSON.stringify(outputResponse.result);

  return { output, ...utxoDetails };
};

export const getAddressDetails = async (signature: string, address: string) => {
  const addressOutputDetails = await getAddressOutputDetails(address);

  const value = await getAccountValueFromOutput(
    signature,
    addressOutputDetails.output
  );

  return { value, ...addressOutputDetails };
};
