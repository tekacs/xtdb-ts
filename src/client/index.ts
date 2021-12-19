import fetch from 'node-fetch'
import { URL, URLSearchParams } from 'whatwg-url'
import { toEDNStringFromSimpleObject } from 'edn-data'
import * as types from '../types'

type Method = 'GET' | 'POST'

// TODO: Add the POST version of /_xtdb/query (which only accepts EDN in-parameters, using the edn-data npm library)
//       https://github.com/jorinvo/edn-data
export default class XTDBClient {
    port: number
    baseUrl: URL

    constructor(host: string, port: number, https: boolean) {
        this.port = port
        this.baseUrl = new URL('http' + (https ? 's': '') + '://' + host + ':' + port.toString())
}

    private async request(
        endpoint: string,
        method: Method,
        query: {[name: string]: any},
        body?: {[name: string]: any},
        contentType?: 'json' | 'edn'
    ): Promise<any> {
        let url = new URL(this.baseUrl.toString())
        url.pathname = '/_xtdb/' + endpoint
        let params: Object = {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': contentType === 'edn' ? 'application/edn' : (contentType === 'json' ? 'application/json' : undefined)
            },
        }
        url.search = new URLSearchParams(query).toString()
        if (method === 'POST' && body) {
            const uppercaseKeys = Object.keys(body).filter(k => k.toLowerCase() !== k)
            if (uppercaseKeys.length !== 0) {
                throw new Error("POST endpoints only accept kebab-case parameters, but received: " + JSON.stringify(uppercaseKeys))
            }
            params = {
                ...params,
                body: contentType === 'edn' ? toEDNStringFromSimpleObject(body) : (contentType === 'json' ? JSON.stringify(body) : undefined)
            }
        }
        const response = await fetch(url.toString(), params)
        const json = await response.json()
        if (Object.keys((json as any)).some(k => k.startsWith('xtdb.error'))) {
            return Promise.reject(json)
        } else {
            return Promise.resolve(json)
        }
    }

    private asEIDParameter(eid: types.EIDSpec): types.EIDParameter {
     if (typeof eid === 'string') {
            return { eid }
        } else {
            return { "eid-json": JSON.stringify(eid) }
        }
    }

    status(): Promise<types.Status> {
        return this.request(
            'status',
            'GET',
            {},
        )
    }

    entity(eid: types.EIDSpec, asOf?: types.AsOf): Promise<types.Entity> {
        return this.request(
            'entity',
            'GET',
            { ...this.asEIDParameter(eid), ...asOf },
        )
    }

    entityHistory(eid: types.EIDSpec, sortOrder: types.SortOrder, options?: types.EntityHistoryOptions): Promise<types.EntityHistory> {
        return this.request(
            'entity',
            'GET',
            { history: true, ...this.asEIDParameter(eid), ...{ sortOrder }, ...options },
        )
    }

    entityTx(eid: types.EIDSpec, asOf?: types.AsOf): Promise<types.EntityTx> {
        return this.request(
            'entity-tx',
            'GET',
            { ...this.asEIDParameter(eid), ...asOf },
        )
    }

    query(queryEdn: string, options?: types.QueryOptions): Promise<types.Query> {
        return this.request(
            'query',
            'GET',
            {
                queryEdn,
                ...options?.asOf,
                ...(options?.inArgs ? { inArgsJson: JSON.stringify(options.inArgs) } : {})
            },
        )
    }

    attributeStats(): Promise<types.AttributeStats> {
        return this.request(
            'attribute-stats',
            'GET',
            {},
        )
    }

    sync(options?: types.SyncOptions): Promise<types.Sync> {
        return this.request(
            'sync',
            'GET',
            { ...options }
        )
    }

    awaitTx(txId: number, options?: types.AwaitTxOptions): Promise<types.AwaitTx> {
        return this.request(
            'await-tx',
            'GET',
            { txId, ...options }
        )
    }

    awaitTxTime(txTime: string, options?: types.AwaitTxTimeOptions): Promise<types.AwaitTxTime> {
        return this.request(
            'await-tx-time',
            'GET',
            { txTime, ...options }
        )
    }

    txLog(options?: types.TxLogOptions): Promise<types.TxLog> {
        return this.request(
            'tx-log',
            'GET',
            { ...options },
        )
    }
    
    submitTx(txOps: types.TxOps): Promise<types.SubmitTx> {
        return this.request(
            'submit-tx',
            'POST',
            {},
            { "tx-ops": txOps },
            'json',
        )
    }

    txCommitted(txId: number): Promise<types.TxCommitted> {
        return this.request(
            'tx-committed',
            'GET',
            { txId },
        )
    }

    latestCompletedTx(): Promise<types.LatestCompletedTx> {
        return this.request(
            'latest-completed-tx',
            'GET',
            {},
        )
    }

    latestSubmittedTx(): Promise<types.LatestSubmittedTx> {
        return this.request(
            'latest-submitted-tx',
            'GET',
            {},
        )
    }

    activeQueries(): Promise<types.ActiveQueries> {
        return this.request(
            'active-queries',
            'GET',
            {},
        )
    }
    
    recentQueries(): Promise<types.RecentQueries> {
        return this.request(
            'recent-queries',
            'GET',
            {},
        )
    }
    
    slowestQueries(): Promise<types.SlowestQueries> {
        return this.request(
            'slowest-queries',
            'GET',
            {},
        )
    }
}