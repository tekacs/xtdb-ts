import XTDBClient from './client'

class XTDBPlayground {
    client: XTDBClient

    constructor(port: number, host: string = 'localhost', https: boolean = false) {
        this.client = new XTDBClient(host, port, https)
    }

    status() {
        return this.client.status()
    }

    entity() {
        return this.client.entity('ivan')
    }

    entityHistory() {
        return this.client.entityHistory('ivan', 'desc')
    }

    entityTx() {
        return this.client.entityTx('ivan')
    }

    query() {
        return this.client.query('{:find [(pull e [*])] :in [ivan] :where [[e :name ivan]]}', { inArgs: ["Ivan"] })
    }
    
    queryFailure() {
        return this.client.query('{:find [e f] :in [ivan] :where [e :name ivan]}', { inArgs: ["Ivan"] })
    }

    attributeStats() {
        return this.client.attributeStats()
    }

    sync() {
        return this.client.sync({ timeout: 123 })
    }

    awaitTx() {
        return this.client.awaitTx(10000000, { timeout: 10000 })
    }
    
    awaitTxTime() {
        return this.client.awaitTxTime('2024-10-16T14:29:35Z', { timeout: 10000 })
    }

    txLog() {
        return this.client.txLog({ withOps: true })
    }
    
    submitTx() {
        return this.client.submitTx([
            ["put", {"xt/id": "ivan", name: "Ivan", lastName: "Motyashov"}],
            ["put", {"xt/id": "vadim", name: "Vadim", lastName: "Kogan"}],
        ])
    }

    txCommitted() {
        return this.client.txCommitted(1)
    }

    latestCompletedTx() {
        return this.client.latestCompletedTx()
    }
    
    latestSubmittedTx() {
        return this.client.latestSubmittedTx()
    }
    
    activeQueries() {
        return this.client.activeQueries()
    }

    recentQueries() {
        return this.client.recentQueries()
    }

    slowestQueries() {
        return this.client.slowestQueries()
    }
}

// const playground = new XTDBPlayground(3030)
// playground.txLog().then(v => console.log('success', v)).catch(e => console.error('failure', e))

export { default as XTDBClient } from './client'
