// comparable to sql TableColumn config
export interface IndexedDbStoreColumnConfig {
	key: string;
	name: string;
	options: { unique: boolean };
}

// comparable to sql Table config
export interface IndexedDbStoreConfig {
	name: string; // comparable to sql table name
	keyPath: string; // comparable to PK (Primary Key) utilized in the sql table
	columns: IndexedDbStoreColumnConfig[];
}

export interface IndexedDbConfig {
	name: string; // comparable to sql db name
	version: number; // db version
	stores: Record<string, IndexedDbStoreConfig>;
}
