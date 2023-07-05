import { ConnectWallet, Web3Button, useContract } from '@thirdweb-dev/react'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

const Home: NextPage = () => {
  const contractAddress = `0x653e3c757a93Ec9238257fAb72ad1aeb3FE77dC5`
  const { contract } = useContract(contractAddress)
  const [counter, setCounter] = useState<undefined>(undefined)

  async function getCounter() {
    if (!contract) return

    const counter = await contract.call(`getCounter`)
    setCounter(counter.toString())
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <ConnectWallet />
        <h1>Fx1 Counter daPP</h1>
        <h3>{counter}</h3>

        <div className={styles.grid}>
          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.call(`incrementCounter`)}
            >
              +Increment
            </Web3Button>
          </div>

          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={() => getCounter()}
            >
              Refresh Counter
            </Web3Button>
          </div>

          <div className={styles.card}>
            <Web3Button
              contractAddress={contractAddress}
              action={(contract) => contract.call(`deincrementCounter`)}
            >
              -Decrement
            </Web3Button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
