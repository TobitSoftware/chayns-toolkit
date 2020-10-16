import type { JsonObject } from "type-fest"

export interface BuildStatsJSON {
	hash: string
	version: string
	time: number
	builtAt: number
	publicPath: string
	outputPath: string
	assetsByChunkName: BuildStatsJSONAssetsByChunkName
	assets: BuildStatsJSONAsset[]
	chunks: BuildStatsJSONChunk[]
	modules: BuildStatsJSONModule[]
	entrypoints: BuildStatsJSONEntrypoints
	namedChunkGroups: BuildStatsJSONEntrypoints
	errors: []
	errorsCount: number
	warnings: []
	warningsCount: number
	children: Child[]
}

export interface BuildStatsJSONAsset {
	type: string
	name: string
	size: number
	chunkNames: string[]
	chunkIdHints: string[]
	auxiliaryChunkNames: string[]
	auxiliaryChunkIdHints: []
	emitted: boolean
	comparedForEmit: boolean
	cached: boolean
	info: AssetInfo
	filteredRelated?: number
	related: RelatedElement[] | ChildrenByOrder
	chunks: number[]
	auxiliaryChunks: number[]
	isOverSizeLimit: boolean
}

export interface AssetInfo {
	immutable?: boolean
	contenthash?: string
	minimized?: boolean
	related?: InfoRelated
	size: number
}

export interface InfoRelated {
	license: string
}

export interface RelatedElement {
	type: string
	name: string
	size: number
	chunkNames: []
	chunkIdHints: []
	auxiliaryChunkNames: []
	auxiliaryChunkIdHints: []
	emitted: boolean
	comparedForEmit: boolean
	cached: boolean
	info: RelatedInfo
	related: ChildrenByOrder
	chunks: []
	auxiliaryChunks: []
	isOverSizeLimit: boolean
}

export interface RelatedInfo {
	size: number
}

export type ChildrenByOrder = JsonObject

export interface BuildStatsJSONAssetsByChunkName {
	main: string[]
}

export interface Child {
	name: string
	hash: string
	version: string
	time: number
	builtAt: number
	publicPath: string
	outputPath: string
	assetsByChunkName: ChildAssetsByChunkName
	assets: ChildAsset[]
	chunks: ChildChunk[]
	modules: ChildModule[]
	entrypoints: ChildEntrypoints
	namedChunkGroups: ChildEntrypoints
	errors: []
	errorsCount: number
	warnings: []
	warningsCount: number
	children: []
}

export interface ChildAsset {
	type: string
	name: string
	size: number
	chunkNames: string[]
	chunkIdHints: []
	auxiliaryChunkNames: []
	auxiliaryChunkIdHints: []
	emitted: boolean
	comparedForEmit: boolean
	cached: boolean
	info: ChildrenByOrder
	related: ChildrenByOrder
	chunks: number[]
	auxiliaryChunks: []
	isOverSizeLimit: boolean
}

export interface ChildAssetsByChunkName {
	HtmlWebpackPlugin_0?: string[]
}

export interface ChildChunk {
	rendered: boolean
	initial: boolean
	entry: boolean
	recorded: boolean
	size: number
	sizes: PurpleSizes
	names: string[]
	idHints: []
	runtime: string[]
	files: string[]
	auxiliaryFiles: []
	hash: string
	childrenByOrder: ChildrenByOrder
	id: number
	siblings: []
	parents: []
	children: []
	modules: ChildModule[]
	origins: Origin[]
}

export interface ChildModule {
	type: ModuleTypeEnum
	moduleType: ModuleType
	identifier: string
	name: string
	nameForCondition: null | string
	index: number | null
	preOrderIndex: number | null
	index2: number | null
	postOrderIndex: number | null
	size: number
	sizes: PurpleSizes
	cacheable?: boolean
	built: boolean
	codeGenerated: boolean
	cached: boolean
	optional: boolean
	orphan: boolean
	dependent?: boolean
	issuer?: null | string
	issuerName?: null | string
	issuerPath?: IssuerPath[] | null
	failed: boolean
	errors: number
	warnings: number
	id: number | string
	issuerId?: number | null
	chunks: number[]
	assets: []
	reasons: Reason[]
	usedExports: boolean | null
	providedExports: string[] | null
	optimizationBailout: string[]
	depth: number | null
}

export interface IssuerPath {
	identifier: string
	name: string
	id: number | null
}

export enum ModuleType {
	CSSMiniExtract = "css/mini-extract",
	JavascriptAuto = "javascript/auto",
	JavascriptEsm = "javascript/esm",
	Runtime = "runtime",
}

export interface Reason {
	moduleIdentifier: null | string
	module: null | string
	moduleName: null | string
	resolvedModuleIdentifier: null | string
	resolvedModule: null | string
	type: ReasonType | null
	active: boolean
	explanation: Explanation
	userRequest: null | string
	loc?: string
	moduleId: number | null
	resolvedModuleId: number | null
}

export enum Explanation {
	Empty = "",
	UsedAsLibraryExport = "used as library export",
}

export enum ReasonType {
	CjsExportRequire = "cjs export require",
	CjsFullRequire = "cjs full require",
	CjsRequire = "cjs require",
	CjsSelfExportsReference = "cjs self exports reference",
	Entry = "entry",
	HarmonyImportSpecifier = "harmony import specifier",
	HarmonySideEffectEvaluation = "harmony side effect evaluation",
	Unknown = "unknown",
}

export interface PurpleSizes {
	javascript?: number
	runtime?: number
}

export enum ModuleTypeEnum {
	Module = "module",
}

export interface Origin {
	module: string
	moduleIdentifier: string
	moduleName: string
	loc: string
	request: string
}

export interface ChildEntrypoints {
	HtmlWebpackPlugin_0?: Main
	"mini-css-extract-plugin"?: Main
}

export interface Main {
	name: string
	chunks: number[]
	assets: AuxiliaryAssetElement[]
	filteredAssets: number
	assetsSize: number | null
	auxiliaryAssets: AuxiliaryAssetElement[]
	filteredAuxiliaryAssets: number
	auxiliaryAssetsSize: number
	children: ChildrenByOrder
	childAssets: ChildrenByOrder
	isOverSizeLimit: boolean
}

export interface AuxiliaryAssetElement {
	name: string
	size?: number
}

export interface BuildStatsJSONChunk {
	rendered: boolean
	initial: boolean
	entry: boolean
	recorded: boolean
	size: number
	sizes: TentacledSizes
	names: string[]
	idHints: string[]
	runtime: string[]
	files: string[]
	auxiliaryFiles: string[]
	hash: string
	childrenByOrder: ChildrenByOrder
	id: number
	siblings: number[]
	parents: []
	children: []
	modules: PurpleModule[]
	origins: Origin[]
	reason?: string
}

export interface PurpleModule {
	type: ModuleTypeEnum
	moduleType: ModuleType
	identifier: string
	name: string
	nameForCondition: null | string
	index: number | null
	preOrderIndex: number | null
	index2: number | null
	postOrderIndex: number | null
	size: number
	sizes: TentacledSizes
	cacheable?: boolean
	built: boolean
	codeGenerated: boolean
	cached: boolean
	optional: boolean
	orphan: boolean
	dependent: boolean
	failed: boolean
	errors: number
	warnings: number
	id: number | null | string
	chunks: number[]
	assets: string[]
	reasons: Reason[]
	usedExports: string[] | boolean | null
	providedExports: string[] | null
	optimizationBailout: string[]
	depth: number | null
	modules?: ModuleModule[]
	issuer?: string
	issuerName?: string
	issuerPath?: IssuerPath[]
	issuerId?: number | null
}

export interface ModuleModule {
	type: ModuleTypeEnum
	moduleType: ModuleType
	identifier: string
	name: string
	nameForCondition: string
	index: number
	preOrderIndex: number
	index2: number
	postOrderIndex: number
	size: number
	sizes: FluffySizes
	cacheable: boolean
	built: boolean
	codeGenerated: boolean
	cached: boolean
	optional: boolean
	orphan: boolean
	dependent?: boolean
	issuer: null | string
	issuerName: null | string
	issuerPath: IssuerPath[] | null
	failed: boolean
	errors: number
	warnings: number
	id: null
	issuerId: null
	chunks: []
	assets: string[]
	reasons: Reason[]
	usedExports: string[]
	providedExports: string[]
	optimizationBailout: []
	depth: number
}

export interface FluffySizes {
	javascript: number
}

export interface TentacledSizes {
	javascript?: number
	"css/mini-extract"?: number
	runtime?: number
}

export interface BuildStatsJSONEntrypoints {
	main: Main
}

export interface BuildStatsJSONModule {
	type: ModuleTypeEnum
	moduleType: ModuleType
	identifier: string
	name: string
	nameForCondition: null | string
	index: number | null
	preOrderIndex: number | null
	index2: number | null
	postOrderIndex: number | null
	size: number
	sizes: TentacledSizes
	cacheable?: boolean
	built: boolean
	codeGenerated: boolean
	cached: boolean
	optional: boolean
	orphan: boolean
	failed: boolean
	errors: number
	warnings: number
	id: number | null | string
	chunks: number[]
	assets: string[]
	reasons: Reason[]
	usedExports: string[] | boolean | null
	providedExports: string[] | null
	optimizationBailout: string[]
	depth: number | null
	modules?: ModuleModule[]
	issuer?: string
	issuerName?: string
	issuerPath?: IssuerPath[]
	issuerId?: number | null
}
