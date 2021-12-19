// PARAMETER UTILITIES

export type AsOf =
  { validTime: string } |
  { txTime: string } |
  { txId: string }

export type EIDSpec =
  string |
  any

export type SortOrder =
  'asc' | 'desc'

export type EIDParameter =
  { eid: string } |
  { ["eid-json"]: string }

export interface Timeout {
    timeout?: number
}

// END PARAMETER UTILITIES

// status
export interface Status {
    version: string,
    revision: string,
    indexVersion: number,
    consumerState: any, // FIXME
    kvStore: string,
    estimateNumKeys: string,
    size: number,
}

// entity
export type Entity = {[name: string]: any}

// entityHistory
export interface EntityHistoryOptions {
    withCorrections?: boolean
    withDocs?: boolean

    startValidTime?: string
    startTxTime?: string
    startTxId?: string

    endValidTime?: string
    endTxTime?: string
    endTxId?: string
}

export interface HistoryEntity {
    txTime: string
    txId: number
    validTime: string
    contentHash: string
}

export type EntityHistory = HistoryEntity[]

// entityTx
export interface EntityTx {
    id: string
    contentHash: string
    validTime: string
    txTime: string
    txId: number
}

// query
export interface QueryOptions {
    asOf?: AsOf
    inArgs?: any[]
}

export type Query = any[]

// attributeStats
export type AttributeStats = {
    [ attribute: string ]: number
}

// sync
export type SyncOptions = Timeout
export interface Sync {
    txTime: string
}

// awaitTx
export type AwaitTxOptions = Timeout
export interface AwaitTx {
    txId: number
    txTime: string
}

// awaitTxTime
export type AwaitTxTimeOptions = Timeout
export interface AwaitTxTime {
    txTime: string
}

// txLog
export interface TxLogOptions {
    afterTxId?: number
    withOps?: Boolean
}

export type TxEvent = [ TxOperation, ...any ]

export interface TxLogEntry {
    txId: number
txTime: string
    txEvents: TxEvent[]
}

export type TxLog = TxLogEntry[]

// submitTx
export type TxOperation = 'put' | 'update' | 'delete'
export type TxOp =
  [ 'put', Object ] |
  [ 'put', Object, string ] |
  [ 'put', Object, string, string ] |
  [ 'delete', EIDSpec ] |
  [ 'delete', EIDSpec, string ]
export type TxOps = TxOp[]

export interface SubmitTx {
    txId: number
    txTime: string
}

// txCommitted
export interface TxCommitted {
    ["txCommitted?"]: boolean
}

// latestCompletedTx
export interface LatestCompletedTx {
    txId: number
    txTime: string
}

// latestSubmittedTx
export interface LatestSubmittedTx {
    txId: number
}

// activeQueries
export interface ActiveQuery {
    status: string
    queryId: string
    query: string
    startedAt: string
    finishedAt: null
    error: string
}
export type ActiveQueries = ActiveQuery[]

// recentQueries
export interface RecentQuery {
    status: string
    queryId: string
    query: string
    startedAt: string
    finishedAt: string | null
    error: string
}
export type RecentQueries = RecentQuery[]

// recentQueries
export interface SlowestQuery {
    status: string
    queryId: string
    query: string
    startedAt: string
    finishedAt: string | null
    error: string
}
export type SlowestQueries = SlowestQuery[]
