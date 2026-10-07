import { Address } from 'viem';
import abiCeloLoan from './ABI/CeloLoan.json';
export const CusdAddress =
  (process.env.NEXT_PUBLIC_CUSD_ADDRESS as `0x${string}`) ||
  '0x765DE816845861e75A25fCA122bb6898B8B1282a';
export const celoLoanAbi = abiCeloLoan;
// Deployed contract, schema and EAS addresses. These are public onchain
// values, so they live here as defaults. An env var with the same name
// still overrides each one.
import RMLABI from './ABI/ReFiMedLend.json';
export const ReFiMedLendABI = RMLABI;

export const schemaUIDSepolia = (process.env.NEXT_PUBLIC_REFIMED_LEND_SCHEMA_SEPOLIA ||
  '0x43bc8603aa505ded49513924a33595cc85302506a4dd358815c5f967423df721') as Address;

export const easAddressSepolia = (process.env.NEXT_PUBLIC_EAS_ADDRESS_SEPOLIA ||
  '0xC2679fBD37d54388Ce493F1DB75320D236e1815e') as Address;

export const ReFiMedLendAddressSepolia = process.env
  .NEXT_PUBLIC_REFIMED_LEND_ADDRESS_SEPOLIA as Address;

export const ReFiMedLendAddressCelo = (process.env.NEXT_PUBLIC_REFIMED_LEND_ADDRESS_CELO ||
  '0x505E65f7D854d4a564b5486d59c91E1DfE627579') as Address;

export const ReFiMedLendAddressCeloV2 = (process.env.NEXT_PUBLIC_REFIMED_LEND_ADDRESS_CELO_V2 ||
  '0x563456095a3a16f86885ED0CB22fE8Af14e700B7') as Address;

export const schemaUIDCelo = (process.env.NEXT_PUBLIC_REFIMED_LEND_SCHEMA_CELO ||
  '0x6045917787ba08a0c5fb2184bce0097316171c2b34db2d142a1971f7d4b1f117') as Address;
export const schemaUIDCeloV2 = (process.env.NEXT_PUBLIC_REFIMED_LEND_SCHEMA_CELO_V2 ||
  '0xb2d0af6d59f6fdabb4e84f4239a1a6448fe5bcea7cae3362fce14c7473a0ad18') as Address;

export const easAddressCelo = (process.env.NEXT_PUBLIC_EAS_ADDRESS_CELO ||
  '0x72E1d8ccf5299fb36fEfD8CC4394B8ef7e98Af92') as Address;

export const ReFiMedLendAddressOptimism = (process.env.NEXT_PUBLIC_REFIMED_LEND_ADDRESS_OPTIMISM ||
  '0x32bb8Fe3DBFe95b5005628f312588eCDc037F75f') as Address;

export const schemaUIDOptimism = (process.env.NEXT_PUBLIC_REFIMED_LEND_SCHEMA_OPTIMISM ||
  '0x6045917787ba08a0c5fb2184bce0097316171c2b34db2d142a1971f7d4b1f117') as Address;

export const easAddressOptimism = (process.env.NEXT_PUBLIC_EAS_ADDRESS_OPTIMISM ||
  '0x4200000000000000000000000000000000000021') as Address;

export const ReFiMedLendAddressPolygon = (process.env.NEXT_PUBLIC_REFIMED_LEND_ADDRESS_POLYGON ||
  '0xA527d8478dA1688541E93b87Cbe790539fb4c285') as Address;

export const schemaUIDPolygon = (process.env.NEXT_PUBLIC_REFIMED_LEND_SCHEMA_POLYGON ||
  '0xc28631171366301e8cc9fa92e9776c2583896c9624f54546454f65aef51ac4b2') as Address;

export const easAddressPolygon = (process.env.NEXT_PUBLIC_EAS_ADDRESS_POLYGON ||
  '0x5E634ef5355f45A855d02D66eCD687b1502AF790') as Address;


export const ReFiMedLendAddressArbitrum = (process.env.NEXT_PUBLIC_REFIMED_LEND_ADDRESS_ARBITRUM ||
  '0x4eD266bD1260544163732f02e4121bAA615A5C55') as Address;

export const schemaUIDArbitrum = (process.env.NEXT_PUBLIC_REFIMED_LEND_SCHEMA_ARBITRUM ||
  '0xa6f4c0561310b5ffad23df8ff1929340ef123cb151db5d880f536789eb480dea') as Address;

export const easAddressArbitrum = (process.env.NEXT_PUBLIC_EAS_ADDRESS_ARBITRUM ||
  '0xbD75f629A22Dc1ceD33dDA0b68c546A1c035c458') as Address;


  