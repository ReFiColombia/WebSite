import { parseEther } from 'viem'
import { useSendTransaction } from 'wagmi'
import { getDonationRecipient } from '@/lib/donations'

function useNativeTxn (amount: number, chain:'Ethereum' | 'Polygon' | 'Celo' | 'OP Mainnet' | 'Arbitrum One') {

  const recipient = getDonationRecipient(chain)

  const {
    data: txnData,
    isLoading: txnLoading,
    isSuccess: txnSuccess,
    isError: txnError,
    error: txnErrorData,
    sendTransactionAsync: sendTransaction
  } = useSendTransaction({
    to: recipient,
    value: amount ? parseEther(amount.toString()) : parseEther('0')
  })
  return {
    txnData,
    txnLoading,
    txnSuccess,
    txnError,
    txnErrorData,
    sendTransaction: recipient ? sendTransaction : undefined
  }
}

export { useNativeTxn }
