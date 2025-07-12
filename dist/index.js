import { createRequire as __WEBPACK_EXTERNAL_createRequire } from "module";
/******/ var __webpack_modules__ = ({

/***/ 4001:
/***/ ((module, exports) => {


/// <reference lib="es2018"/>
/// <reference lib="dom"/>
/// <reference types="node"/>
Object.defineProperty(exports, "__esModule", ({ value: true }));
const typedArrayTypeNames = [
    'Int8Array',
    'Uint8Array',
    'Uint8ClampedArray',
    'Int16Array',
    'Uint16Array',
    'Int32Array',
    'Uint32Array',
    'Float32Array',
    'Float64Array',
    'BigInt64Array',
    'BigUint64Array'
];
function isTypedArrayName(name) {
    return typedArrayTypeNames.includes(name);
}
const objectTypeNames = [
    'Function',
    'Generator',
    'AsyncGenerator',
    'GeneratorFunction',
    'AsyncGeneratorFunction',
    'AsyncFunction',
    'Observable',
    'Array',
    'Buffer',
    'Blob',
    'Object',
    'RegExp',
    'Date',
    'Error',
    'Map',
    'Set',
    'WeakMap',
    'WeakSet',
    'ArrayBuffer',
    'SharedArrayBuffer',
    'DataView',
    'Promise',
    'URL',
    'FormData',
    'URLSearchParams',
    'HTMLElement',
    ...typedArrayTypeNames
];
function isObjectTypeName(name) {
    return objectTypeNames.includes(name);
}
const primitiveTypeNames = [
    'null',
    'undefined',
    'string',
    'number',
    'bigint',
    'boolean',
    'symbol'
];
function isPrimitiveTypeName(name) {
    return primitiveTypeNames.includes(name);
}
// eslint-disable-next-line @typescript-eslint/ban-types
function isOfType(type) {
    return (value) => typeof value === type;
}
const { toString } = Object.prototype;
const getObjectType = (value) => {
    const objectTypeName = toString.call(value).slice(8, -1);
    if (/HTML\w+Element/.test(objectTypeName) && is.domElement(value)) {
        return 'HTMLElement';
    }
    if (isObjectTypeName(objectTypeName)) {
        return objectTypeName;
    }
    return undefined;
};
const isObjectOfType = (type) => (value) => getObjectType(value) === type;
function is(value) {
    if (value === null) {
        return 'null';
    }
    switch (typeof value) {
        case 'undefined':
            return 'undefined';
        case 'string':
            return 'string';
        case 'number':
            return 'number';
        case 'boolean':
            return 'boolean';
        case 'function':
            return 'Function';
        case 'bigint':
            return 'bigint';
        case 'symbol':
            return 'symbol';
        default:
    }
    if (is.observable(value)) {
        return 'Observable';
    }
    if (is.array(value)) {
        return 'Array';
    }
    if (is.buffer(value)) {
        return 'Buffer';
    }
    const tagType = getObjectType(value);
    if (tagType) {
        return tagType;
    }
    if (value instanceof String || value instanceof Boolean || value instanceof Number) {
        throw new TypeError('Please don\'t use object wrappers for primitive types');
    }
    return 'Object';
}
is.undefined = isOfType('undefined');
is.string = isOfType('string');
const isNumberType = isOfType('number');
is.number = (value) => isNumberType(value) && !is.nan(value);
is.bigint = isOfType('bigint');
// eslint-disable-next-line @typescript-eslint/ban-types
is.function_ = isOfType('function');
is.null_ = (value) => value === null;
is.class_ = (value) => is.function_(value) && value.toString().startsWith('class ');
is.boolean = (value) => value === true || value === false;
is.symbol = isOfType('symbol');
is.numericString = (value) => is.string(value) && !is.emptyStringOrWhitespace(value) && !Number.isNaN(Number(value));
is.array = (value, assertion) => {
    if (!Array.isArray(value)) {
        return false;
    }
    if (!is.function_(assertion)) {
        return true;
    }
    return value.every(assertion);
};
is.buffer = (value) => { var _a, _b, _c, _d; return (_d = (_c = (_b = (_a = value) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.isBuffer) === null || _c === void 0 ? void 0 : _c.call(_b, value)) !== null && _d !== void 0 ? _d : false; };
is.blob = (value) => isObjectOfType('Blob')(value);
is.nullOrUndefined = (value) => is.null_(value) || is.undefined(value);
is.object = (value) => !is.null_(value) && (typeof value === 'object' || is.function_(value));
is.iterable = (value) => { var _a; return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.iterator]); };
is.asyncIterable = (value) => { var _a; return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.asyncIterator]); };
is.generator = (value) => { var _a, _b; return is.iterable(value) && is.function_((_a = value) === null || _a === void 0 ? void 0 : _a.next) && is.function_((_b = value) === null || _b === void 0 ? void 0 : _b.throw); };
is.asyncGenerator = (value) => is.asyncIterable(value) && is.function_(value.next) && is.function_(value.throw);
is.nativePromise = (value) => isObjectOfType('Promise')(value);
const hasPromiseAPI = (value) => {
    var _a, _b;
    return is.function_((_a = value) === null || _a === void 0 ? void 0 : _a.then) &&
        is.function_((_b = value) === null || _b === void 0 ? void 0 : _b.catch);
};
is.promise = (value) => is.nativePromise(value) || hasPromiseAPI(value);
is.generatorFunction = isObjectOfType('GeneratorFunction');
is.asyncGeneratorFunction = (value) => getObjectType(value) === 'AsyncGeneratorFunction';
is.asyncFunction = (value) => getObjectType(value) === 'AsyncFunction';
// eslint-disable-next-line no-prototype-builtins, @typescript-eslint/ban-types
is.boundFunction = (value) => is.function_(value) && !value.hasOwnProperty('prototype');
is.regExp = isObjectOfType('RegExp');
is.date = isObjectOfType('Date');
is.error = isObjectOfType('Error');
is.map = (value) => isObjectOfType('Map')(value);
is.set = (value) => isObjectOfType('Set')(value);
is.weakMap = (value) => isObjectOfType('WeakMap')(value);
is.weakSet = (value) => isObjectOfType('WeakSet')(value);
is.int8Array = isObjectOfType('Int8Array');
is.uint8Array = isObjectOfType('Uint8Array');
is.uint8ClampedArray = isObjectOfType('Uint8ClampedArray');
is.int16Array = isObjectOfType('Int16Array');
is.uint16Array = isObjectOfType('Uint16Array');
is.int32Array = isObjectOfType('Int32Array');
is.uint32Array = isObjectOfType('Uint32Array');
is.float32Array = isObjectOfType('Float32Array');
is.float64Array = isObjectOfType('Float64Array');
is.bigInt64Array = isObjectOfType('BigInt64Array');
is.bigUint64Array = isObjectOfType('BigUint64Array');
is.arrayBuffer = isObjectOfType('ArrayBuffer');
is.sharedArrayBuffer = isObjectOfType('SharedArrayBuffer');
is.dataView = isObjectOfType('DataView');
is.enumCase = (value, targetEnum) => Object.values(targetEnum).includes(value);
is.directInstanceOf = (instance, class_) => Object.getPrototypeOf(instance) === class_.prototype;
is.urlInstance = (value) => isObjectOfType('URL')(value);
is.urlString = (value) => {
    if (!is.string(value)) {
        return false;
    }
    try {
        new URL(value); // eslint-disable-line no-new
        return true;
    }
    catch (_a) {
        return false;
    }
};
// Example: `is.truthy = (value: unknown): value is (not false | not 0 | not '' | not undefined | not null) => Boolean(value);`
is.truthy = (value) => Boolean(value);
// Example: `is.falsy = (value: unknown): value is (not true | 0 | '' | undefined | null) => Boolean(value);`
is.falsy = (value) => !value;
is.nan = (value) => Number.isNaN(value);
is.primitive = (value) => is.null_(value) || isPrimitiveTypeName(typeof value);
is.integer = (value) => Number.isInteger(value);
is.safeInteger = (value) => Number.isSafeInteger(value);
is.plainObject = (value) => {
    // From: https://github.com/sindresorhus/is-plain-obj/blob/main/index.js
    if (toString.call(value) !== '[object Object]') {
        return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return prototype === null || prototype === Object.getPrototypeOf({});
};
is.typedArray = (value) => isTypedArrayName(getObjectType(value));
const isValidLength = (value) => is.safeInteger(value) && value >= 0;
is.arrayLike = (value) => !is.nullOrUndefined(value) && !is.function_(value) && isValidLength(value.length);
is.inRange = (value, range) => {
    if (is.number(range)) {
        return value >= Math.min(0, range) && value <= Math.max(range, 0);
    }
    if (is.array(range) && range.length === 2) {
        return value >= Math.min(...range) && value <= Math.max(...range);
    }
    throw new TypeError(`Invalid range: ${JSON.stringify(range)}`);
};
const NODE_TYPE_ELEMENT = 1;
const DOM_PROPERTIES_TO_CHECK = [
    'innerHTML',
    'ownerDocument',
    'style',
    'attributes',
    'nodeValue'
];
is.domElement = (value) => {
    return is.object(value) &&
        value.nodeType === NODE_TYPE_ELEMENT &&
        is.string(value.nodeName) &&
        !is.plainObject(value) &&
        DOM_PROPERTIES_TO_CHECK.every(property => property in value);
};
is.observable = (value) => {
    var _a, _b, _c, _d;
    if (!value) {
        return false;
    }
    // eslint-disable-next-line no-use-extend-native/no-use-extend-native
    if (value === ((_b = (_a = value)[Symbol.observable]) === null || _b === void 0 ? void 0 : _b.call(_a))) {
        return true;
    }
    if (value === ((_d = (_c = value)['@@observable']) === null || _d === void 0 ? void 0 : _d.call(_c))) {
        return true;
    }
    return false;
};
is.nodeStream = (value) => is.object(value) && is.function_(value.pipe) && !is.observable(value);
is.infinite = (value) => value === Infinity || value === -Infinity;
const isAbsoluteMod2 = (remainder) => (value) => is.integer(value) && Math.abs(value % 2) === remainder;
is.evenInteger = isAbsoluteMod2(0);
is.oddInteger = isAbsoluteMod2(1);
is.emptyArray = (value) => is.array(value) && value.length === 0;
is.nonEmptyArray = (value) => is.array(value) && value.length > 0;
is.emptyString = (value) => is.string(value) && value.length === 0;
const isWhiteSpaceString = (value) => is.string(value) && !/\S/.test(value);
is.emptyStringOrWhitespace = (value) => is.emptyString(value) || isWhiteSpaceString(value);
// TODO: Use `not ''` when the `not` operator is available.
is.nonEmptyString = (value) => is.string(value) && value.length > 0;
// TODO: Use `not ''` when the `not` operator is available.
is.nonEmptyStringAndNotWhitespace = (value) => is.string(value) && !is.emptyStringOrWhitespace(value);
is.emptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length === 0;
// TODO: Use `not` operator here to remove `Map` and `Set` from type guard:
// - https://github.com/Microsoft/TypeScript/pull/29317
is.nonEmptyObject = (value) => is.object(value) && !is.map(value) && !is.set(value) && Object.keys(value).length > 0;
is.emptySet = (value) => is.set(value) && value.size === 0;
is.nonEmptySet = (value) => is.set(value) && value.size > 0;
is.emptyMap = (value) => is.map(value) && value.size === 0;
is.nonEmptyMap = (value) => is.map(value) && value.size > 0;
// `PropertyKey` is any value that can be used as an object key (string, number, or symbol)
is.propertyKey = (value) => is.any([is.string, is.number, is.symbol], value);
is.formData = (value) => isObjectOfType('FormData')(value);
is.urlSearchParams = (value) => isObjectOfType('URLSearchParams')(value);
const predicateOnArray = (method, predicate, values) => {
    if (!is.function_(predicate)) {
        throw new TypeError(`Invalid predicate: ${JSON.stringify(predicate)}`);
    }
    if (values.length === 0) {
        throw new TypeError('Invalid number of values');
    }
    return method.call(values, predicate);
};
is.any = (predicate, ...values) => {
    const predicates = is.array(predicate) ? predicate : [predicate];
    return predicates.some(singlePredicate => predicateOnArray(Array.prototype.some, singlePredicate, values));
};
is.all = (predicate, ...values) => predicateOnArray(Array.prototype.every, predicate, values);
const assertType = (condition, description, value, options = {}) => {
    if (!condition) {
        const { multipleValues } = options;
        const valuesMessage = multipleValues ?
            `received values of types ${[
                ...new Set(value.map(singleValue => `\`${is(singleValue)}\``))
            ].join(', ')}` :
            `received value of type \`${is(value)}\``;
        throw new TypeError(`Expected value which is \`${description}\`, ${valuesMessage}.`);
    }
};
exports.assert = {
    // Unknowns.
    undefined: (value) => assertType(is.undefined(value), 'undefined', value),
    string: (value) => assertType(is.string(value), 'string', value),
    number: (value) => assertType(is.number(value), 'number', value),
    bigint: (value) => assertType(is.bigint(value), 'bigint', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    function_: (value) => assertType(is.function_(value), 'Function', value),
    null_: (value) => assertType(is.null_(value), 'null', value),
    class_: (value) => assertType(is.class_(value), "Class" /* class_ */, value),
    boolean: (value) => assertType(is.boolean(value), 'boolean', value),
    symbol: (value) => assertType(is.symbol(value), 'symbol', value),
    numericString: (value) => assertType(is.numericString(value), "string with a number" /* numericString */, value),
    array: (value, assertion) => {
        const assert = assertType;
        assert(is.array(value), 'Array', value);
        if (assertion) {
            value.forEach(assertion);
        }
    },
    buffer: (value) => assertType(is.buffer(value), 'Buffer', value),
    blob: (value) => assertType(is.blob(value), 'Blob', value),
    nullOrUndefined: (value) => assertType(is.nullOrUndefined(value), "null or undefined" /* nullOrUndefined */, value),
    object: (value) => assertType(is.object(value), 'Object', value),
    iterable: (value) => assertType(is.iterable(value), "Iterable" /* iterable */, value),
    asyncIterable: (value) => assertType(is.asyncIterable(value), "AsyncIterable" /* asyncIterable */, value),
    generator: (value) => assertType(is.generator(value), 'Generator', value),
    asyncGenerator: (value) => assertType(is.asyncGenerator(value), 'AsyncGenerator', value),
    nativePromise: (value) => assertType(is.nativePromise(value), "native Promise" /* nativePromise */, value),
    promise: (value) => assertType(is.promise(value), 'Promise', value),
    generatorFunction: (value) => assertType(is.generatorFunction(value), 'GeneratorFunction', value),
    asyncGeneratorFunction: (value) => assertType(is.asyncGeneratorFunction(value), 'AsyncGeneratorFunction', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    asyncFunction: (value) => assertType(is.asyncFunction(value), 'AsyncFunction', value),
    // eslint-disable-next-line @typescript-eslint/ban-types
    boundFunction: (value) => assertType(is.boundFunction(value), 'Function', value),
    regExp: (value) => assertType(is.regExp(value), 'RegExp', value),
    date: (value) => assertType(is.date(value), 'Date', value),
    error: (value) => assertType(is.error(value), 'Error', value),
    map: (value) => assertType(is.map(value), 'Map', value),
    set: (value) => assertType(is.set(value), 'Set', value),
    weakMap: (value) => assertType(is.weakMap(value), 'WeakMap', value),
    weakSet: (value) => assertType(is.weakSet(value), 'WeakSet', value),
    int8Array: (value) => assertType(is.int8Array(value), 'Int8Array', value),
    uint8Array: (value) => assertType(is.uint8Array(value), 'Uint8Array', value),
    uint8ClampedArray: (value) => assertType(is.uint8ClampedArray(value), 'Uint8ClampedArray', value),
    int16Array: (value) => assertType(is.int16Array(value), 'Int16Array', value),
    uint16Array: (value) => assertType(is.uint16Array(value), 'Uint16Array', value),
    int32Array: (value) => assertType(is.int32Array(value), 'Int32Array', value),
    uint32Array: (value) => assertType(is.uint32Array(value), 'Uint32Array', value),
    float32Array: (value) => assertType(is.float32Array(value), 'Float32Array', value),
    float64Array: (value) => assertType(is.float64Array(value), 'Float64Array', value),
    bigInt64Array: (value) => assertType(is.bigInt64Array(value), 'BigInt64Array', value),
    bigUint64Array: (value) => assertType(is.bigUint64Array(value), 'BigUint64Array', value),
    arrayBuffer: (value) => assertType(is.arrayBuffer(value), 'ArrayBuffer', value),
    sharedArrayBuffer: (value) => assertType(is.sharedArrayBuffer(value), 'SharedArrayBuffer', value),
    dataView: (value) => assertType(is.dataView(value), 'DataView', value),
    enumCase: (value, targetEnum) => assertType(is.enumCase(value, targetEnum), 'EnumCase', value),
    urlInstance: (value) => assertType(is.urlInstance(value), 'URL', value),
    urlString: (value) => assertType(is.urlString(value), "string with a URL" /* urlString */, value),
    truthy: (value) => assertType(is.truthy(value), "truthy" /* truthy */, value),
    falsy: (value) => assertType(is.falsy(value), "falsy" /* falsy */, value),
    nan: (value) => assertType(is.nan(value), "NaN" /* nan */, value),
    primitive: (value) => assertType(is.primitive(value), "primitive" /* primitive */, value),
    integer: (value) => assertType(is.integer(value), "integer" /* integer */, value),
    safeInteger: (value) => assertType(is.safeInteger(value), "integer" /* safeInteger */, value),
    plainObject: (value) => assertType(is.plainObject(value), "plain object" /* plainObject */, value),
    typedArray: (value) => assertType(is.typedArray(value), "TypedArray" /* typedArray */, value),
    arrayLike: (value) => assertType(is.arrayLike(value), "array-like" /* arrayLike */, value),
    domElement: (value) => assertType(is.domElement(value), "HTMLElement" /* domElement */, value),
    observable: (value) => assertType(is.observable(value), 'Observable', value),
    nodeStream: (value) => assertType(is.nodeStream(value), "Node.js Stream" /* nodeStream */, value),
    infinite: (value) => assertType(is.infinite(value), "infinite number" /* infinite */, value),
    emptyArray: (value) => assertType(is.emptyArray(value), "empty array" /* emptyArray */, value),
    nonEmptyArray: (value) => assertType(is.nonEmptyArray(value), "non-empty array" /* nonEmptyArray */, value),
    emptyString: (value) => assertType(is.emptyString(value), "empty string" /* emptyString */, value),
    emptyStringOrWhitespace: (value) => assertType(is.emptyStringOrWhitespace(value), "empty string or whitespace" /* emptyStringOrWhitespace */, value),
    nonEmptyString: (value) => assertType(is.nonEmptyString(value), "non-empty string" /* nonEmptyString */, value),
    nonEmptyStringAndNotWhitespace: (value) => assertType(is.nonEmptyStringAndNotWhitespace(value), "non-empty string and not whitespace" /* nonEmptyStringAndNotWhitespace */, value),
    emptyObject: (value) => assertType(is.emptyObject(value), "empty object" /* emptyObject */, value),
    nonEmptyObject: (value) => assertType(is.nonEmptyObject(value), "non-empty object" /* nonEmptyObject */, value),
    emptySet: (value) => assertType(is.emptySet(value), "empty set" /* emptySet */, value),
    nonEmptySet: (value) => assertType(is.nonEmptySet(value), "non-empty set" /* nonEmptySet */, value),
    emptyMap: (value) => assertType(is.emptyMap(value), "empty map" /* emptyMap */, value),
    nonEmptyMap: (value) => assertType(is.nonEmptyMap(value), "non-empty map" /* nonEmptyMap */, value),
    propertyKey: (value) => assertType(is.propertyKey(value), 'PropertyKey', value),
    formData: (value) => assertType(is.formData(value), 'FormData', value),
    urlSearchParams: (value) => assertType(is.urlSearchParams(value), 'URLSearchParams', value),
    // Numbers.
    evenInteger: (value) => assertType(is.evenInteger(value), "even integer" /* evenInteger */, value),
    oddInteger: (value) => assertType(is.oddInteger(value), "odd integer" /* oddInteger */, value),
    // Two arguments.
    directInstanceOf: (instance, class_) => assertType(is.directInstanceOf(instance, class_), "T" /* directInstanceOf */, instance),
    inRange: (value, range) => assertType(is.inRange(value, range), "in range" /* inRange */, value),
    // Variadic functions.
    any: (predicate, ...values) => {
        return assertType(is.any(predicate, ...values), "predicate returns truthy for any value" /* any */, values, { multipleValues: true });
    },
    all: (predicate, ...values) => assertType(is.all(predicate, ...values), "predicate returns truthy for all values" /* all */, values, { multipleValues: true })
};
// Some few keywords are reserved, but we'll populate them for Node.js users
// See https://github.com/Microsoft/TypeScript/issues/2536
Object.defineProperties(is, {
    class: {
        value: is.class_
    },
    function: {
        value: is.function_
    },
    null: {
        value: is.null_
    }
});
Object.defineProperties(exports.assert, {
    class: {
        value: exports.assert.class_
    },
    function: {
        value: exports.assert.function_
    },
    null: {
        value: exports.assert.null_
    }
});
exports["default"] = is;
// For CommonJS default export support
module.exports = is;
module.exports["default"] = is;
module.exports.assert = exports.assert;


/***/ }),

/***/ 3873:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {



module.exports = __nccwpck_require__(2532);
module.exports.HttpsAgent = __nccwpck_require__(414);
module.exports.constants = __nccwpck_require__(6160);


/***/ }),

/***/ 2532:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {



const OriginalAgent = (__nccwpck_require__(8611).Agent);
const ms = __nccwpck_require__(3724);
const debug = (__nccwpck_require__(9023).debuglog)('agentkeepalive');
const {
  INIT_SOCKET,
  CURRENT_ID,
  CREATE_ID,
  SOCKET_CREATED_TIME,
  SOCKET_NAME,
  SOCKET_REQUEST_COUNT,
  SOCKET_REQUEST_FINISHED_COUNT,
} = __nccwpck_require__(6160);

// OriginalAgent come from
// - https://github.com/nodejs/node/blob/v8.12.0/lib/_http_agent.js
// - https://github.com/nodejs/node/blob/v10.12.0/lib/_http_agent.js

// node <= 10
let defaultTimeoutListenerCount = 1;
const majorVersion = parseInt(process.version.split('.', 1)[0].substring(1));
if (majorVersion >= 11 && majorVersion <= 12) {
  defaultTimeoutListenerCount = 2;
} else if (majorVersion >= 13) {
  defaultTimeoutListenerCount = 3;
}

function deprecate(message) {
  console.log('[agentkeepalive:deprecated] %s', message);
}

class Agent extends OriginalAgent {
  constructor(options) {
    options = options || {};
    options.keepAlive = options.keepAlive !== false;
    // default is keep-alive and 4s free socket timeout
    // see https://medium.com/ssense-tech/reduce-networking-errors-in-nodejs-23b4eb9f2d83
    if (options.freeSocketTimeout === undefined) {
      options.freeSocketTimeout = 4000;
    }
    // Legacy API: keepAliveTimeout should be rename to `freeSocketTimeout`
    if (options.keepAliveTimeout) {
      deprecate('options.keepAliveTimeout is deprecated, please use options.freeSocketTimeout instead');
      options.freeSocketTimeout = options.keepAliveTimeout;
      delete options.keepAliveTimeout;
    }
    // Legacy API: freeSocketKeepAliveTimeout should be rename to `freeSocketTimeout`
    if (options.freeSocketKeepAliveTimeout) {
      deprecate('options.freeSocketKeepAliveTimeout is deprecated, please use options.freeSocketTimeout instead');
      options.freeSocketTimeout = options.freeSocketKeepAliveTimeout;
      delete options.freeSocketKeepAliveTimeout;
    }

    // Sets the socket to timeout after timeout milliseconds of inactivity on the socket.
    // By default is double free socket timeout.
    if (options.timeout === undefined) {
      // make sure socket default inactivity timeout >= 8s
      options.timeout = Math.max(options.freeSocketTimeout * 2, 8000);
    }

    // support humanize format
    options.timeout = ms(options.timeout);
    options.freeSocketTimeout = ms(options.freeSocketTimeout);
    options.socketActiveTTL = options.socketActiveTTL ? ms(options.socketActiveTTL) : 0;

    super(options);

    this[CURRENT_ID] = 0;

    // create socket success counter
    this.createSocketCount = 0;
    this.createSocketCountLastCheck = 0;

    this.createSocketErrorCount = 0;
    this.createSocketErrorCountLastCheck = 0;

    this.closeSocketCount = 0;
    this.closeSocketCountLastCheck = 0;

    // socket error event count
    this.errorSocketCount = 0;
    this.errorSocketCountLastCheck = 0;

    // request finished counter
    this.requestCount = 0;
    this.requestCountLastCheck = 0;

    // including free socket timeout counter
    this.timeoutSocketCount = 0;
    this.timeoutSocketCountLastCheck = 0;

    this.on('free', socket => {
      // https://github.com/nodejs/node/pull/32000
      // Node.js native agent will check socket timeout eqs agent.options.timeout.
      // Use the ttl or freeSocketTimeout to overwrite.
      const timeout = this.calcSocketTimeout(socket);
      if (timeout > 0 && socket.timeout !== timeout) {
        socket.setTimeout(timeout);
      }
    });
  }

  get freeSocketKeepAliveTimeout() {
    deprecate('agent.freeSocketKeepAliveTimeout is deprecated, please use agent.options.freeSocketTimeout instead');
    return this.options.freeSocketTimeout;
  }

  get timeout() {
    deprecate('agent.timeout is deprecated, please use agent.options.timeout instead');
    return this.options.timeout;
  }

  get socketActiveTTL() {
    deprecate('agent.socketActiveTTL is deprecated, please use agent.options.socketActiveTTL instead');
    return this.options.socketActiveTTL;
  }

  calcSocketTimeout(socket) {
    /**
     * return <= 0: should free socket
     * return > 0: should update socket timeout
     * return undefined: not find custom timeout
     */
    let freeSocketTimeout = this.options.freeSocketTimeout;
    const socketActiveTTL = this.options.socketActiveTTL;
    if (socketActiveTTL) {
      // check socketActiveTTL
      const aliveTime = Date.now() - socket[SOCKET_CREATED_TIME];
      const diff = socketActiveTTL - aliveTime;
      if (diff <= 0) {
        return diff;
      }
      if (freeSocketTimeout && diff < freeSocketTimeout) {
        freeSocketTimeout = diff;
      }
    }
    // set freeSocketTimeout
    if (freeSocketTimeout) {
      // set free keepalive timer
      // try to use socket custom freeSocketTimeout first, support headers['keep-alive']
      // https://github.com/node-modules/urllib/blob/b76053020923f4d99a1c93cf2e16e0c5ba10bacf/lib/urllib.js#L498
      const customFreeSocketTimeout = socket.freeSocketTimeout || socket.freeSocketKeepAliveTimeout;
      return customFreeSocketTimeout || freeSocketTimeout;
    }
  }

  keepSocketAlive(socket) {
    const result = super.keepSocketAlive(socket);
    // should not keepAlive, do nothing
    if (!result) return result;

    const customTimeout = this.calcSocketTimeout(socket);
    if (typeof customTimeout === 'undefined') {
      return true;
    }
    if (customTimeout <= 0) {
      debug('%s(requests: %s, finished: %s) free but need to destroy by TTL, request count %s, diff is %s',
        socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT], customTimeout);
      return false;
    }
    if (socket.timeout !== customTimeout) {
      socket.setTimeout(customTimeout);
    }
    return true;
  }

  // only call on addRequest
  reuseSocket(...args) {
    // reuseSocket(socket, req)
    super.reuseSocket(...args);
    const socket = args[0];
    const req = args[1];
    req.reusedSocket = true;
    const agentTimeout = this.options.timeout;
    if (getSocketTimeout(socket) !== agentTimeout) {
      // reset timeout before use
      socket.setTimeout(agentTimeout);
      debug('%s reset timeout to %sms', socket[SOCKET_NAME], agentTimeout);
    }
    socket[SOCKET_REQUEST_COUNT]++;
    debug('%s(requests: %s, finished: %s) reuse on addRequest, timeout %sms',
      socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT],
      getSocketTimeout(socket));
  }

  [CREATE_ID]() {
    const id = this[CURRENT_ID]++;
    if (this[CURRENT_ID] === Number.MAX_SAFE_INTEGER) this[CURRENT_ID] = 0;
    return id;
  }

  [INIT_SOCKET](socket, options) {
    // bugfix here.
    // https on node 8, 10 won't set agent.options.timeout by default
    // TODO: need to fix on node itself
    if (options.timeout) {
      const timeout = getSocketTimeout(socket);
      if (!timeout) {
        socket.setTimeout(options.timeout);
      }
    }

    if (this.options.keepAlive) {
      // Disable Nagle's algorithm: http://blog.caustik.com/2012/04/08/scaling-node-js-to-100k-concurrent-connections/
      // https://fengmk2.com/benchmark/nagle-algorithm-delayed-ack-mock.html
      socket.setNoDelay(true);
    }
    this.createSocketCount++;
    if (this.options.socketActiveTTL) {
      socket[SOCKET_CREATED_TIME] = Date.now();
    }
    // don't show the hole '-----BEGIN CERTIFICATE----' key string
    socket[SOCKET_NAME] = `sock[${this[CREATE_ID]()}#${options._agentKey}]`.split('-----BEGIN', 1)[0];
    socket[SOCKET_REQUEST_COUNT] = 1;
    socket[SOCKET_REQUEST_FINISHED_COUNT] = 0;
    installListeners(this, socket, options);
  }

  createConnection(options, oncreate) {
    let called = false;
    const onNewCreate = (err, socket) => {
      if (called) return;
      called = true;

      if (err) {
        this.createSocketErrorCount++;
        return oncreate(err);
      }
      this[INIT_SOCKET](socket, options);
      oncreate(err, socket);
    };

    const newSocket = super.createConnection(options, onNewCreate);
    if (newSocket) onNewCreate(null, newSocket);
    return newSocket;
  }

  get statusChanged() {
    const changed = this.createSocketCount !== this.createSocketCountLastCheck ||
      this.createSocketErrorCount !== this.createSocketErrorCountLastCheck ||
      this.closeSocketCount !== this.closeSocketCountLastCheck ||
      this.errorSocketCount !== this.errorSocketCountLastCheck ||
      this.timeoutSocketCount !== this.timeoutSocketCountLastCheck ||
      this.requestCount !== this.requestCountLastCheck;
    if (changed) {
      this.createSocketCountLastCheck = this.createSocketCount;
      this.createSocketErrorCountLastCheck = this.createSocketErrorCount;
      this.closeSocketCountLastCheck = this.closeSocketCount;
      this.errorSocketCountLastCheck = this.errorSocketCount;
      this.timeoutSocketCountLastCheck = this.timeoutSocketCount;
      this.requestCountLastCheck = this.requestCount;
    }
    return changed;
  }

  getCurrentStatus() {
    return {
      createSocketCount: this.createSocketCount,
      createSocketErrorCount: this.createSocketErrorCount,
      closeSocketCount: this.closeSocketCount,
      errorSocketCount: this.errorSocketCount,
      timeoutSocketCount: this.timeoutSocketCount,
      requestCount: this.requestCount,
      freeSockets: inspect(this.freeSockets),
      sockets: inspect(this.sockets),
      requests: inspect(this.requests),
    };
  }
}

// node 8 don't has timeout attribute on socket
// https://github.com/nodejs/node/pull/21204/files#diff-e6ef024c3775d787c38487a6309e491dR408
function getSocketTimeout(socket) {
  return socket.timeout || socket._idleTimeout;
}

function installListeners(agent, socket, options) {
  debug('%s create, timeout %sms', socket[SOCKET_NAME], getSocketTimeout(socket));

  // listener socket events: close, timeout, error, free
  function onFree() {
    // create and socket.emit('free') logic
    // https://github.com/nodejs/node/blob/master/lib/_http_agent.js#L311
    // no req on the socket, it should be the new socket
    if (!socket._httpMessage && socket[SOCKET_REQUEST_COUNT] === 1) return;

    socket[SOCKET_REQUEST_FINISHED_COUNT]++;
    agent.requestCount++;
    debug('%s(requests: %s, finished: %s) free',
      socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT]);

    // should reuse on pedding requests?
    const name = agent.getName(options);
    if (socket.writable && agent.requests[name] && agent.requests[name].length) {
      // will be reuse on agent free listener
      socket[SOCKET_REQUEST_COUNT]++;
      debug('%s(requests: %s, finished: %s) will be reuse on agent free event',
        socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT]);
    }
  }
  socket.on('free', onFree);

  function onClose(isError) {
    debug('%s(requests: %s, finished: %s) close, isError: %s',
      socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT], isError);
    agent.closeSocketCount++;
  }
  socket.on('close', onClose);

  // start socket timeout handler
  function onTimeout() {
    // onTimeout and emitRequestTimeout(_http_client.js)
    // https://github.com/nodejs/node/blob/v12.x/lib/_http_client.js#L711
    const listenerCount = socket.listeners('timeout').length;
    // node <= 10, default listenerCount is 1, onTimeout
    // 11 < node <= 12, default listenerCount is 2, onTimeout and emitRequestTimeout
    // node >= 13, default listenerCount is 3, onTimeout,
    //   onTimeout(https://github.com/nodejs/node/pull/32000/files#diff-5f7fb0850412c6be189faeddea6c5359R333)
    //   and emitRequestTimeout
    const timeout = getSocketTimeout(socket);
    const req = socket._httpMessage;
    const reqTimeoutListenerCount = req && req.listeners('timeout').length || 0;
    debug('%s(requests: %s, finished: %s) timeout after %sms, listeners %s, defaultTimeoutListenerCount %s, hasHttpRequest %s, HttpRequest timeoutListenerCount %s',
      socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT],
      timeout, listenerCount, defaultTimeoutListenerCount, !!req, reqTimeoutListenerCount);
    if (debug.enabled) {
      debug('timeout listeners: %s', socket.listeners('timeout').map(f => f.name).join(', '));
    }
    agent.timeoutSocketCount++;
    const name = agent.getName(options);
    if (agent.freeSockets[name] && agent.freeSockets[name].indexOf(socket) !== -1) {
      // free socket timeout, destroy quietly
      socket.destroy();
      // Remove it from freeSockets list immediately to prevent new requests
      // from being sent through this socket.
      agent.removeSocket(socket, options);
      debug('%s is free, destroy quietly', socket[SOCKET_NAME]);
    } else {
      // if there is no any request socket timeout handler,
      // agent need to handle socket timeout itself.
      //
      // custom request socket timeout handle logic must follow these rules:
      //  1. Destroy socket first
      //  2. Must emit socket 'agentRemove' event tell agent remove socket
      //     from freeSockets list immediately.
      //     Otherise you may be get 'socket hang up' error when reuse
      //     free socket and timeout happen in the same time.
      if (reqTimeoutListenerCount === 0) {
        const error = new Error('Socket timeout');
        error.code = 'ERR_SOCKET_TIMEOUT';
        error.timeout = timeout;
        // must manually call socket.end() or socket.destroy() to end the connection.
        // https://nodejs.org/dist/latest-v10.x/docs/api/net.html#net_socket_settimeout_timeout_callback
        socket.destroy(error);
        agent.removeSocket(socket, options);
        debug('%s destroy with timeout error', socket[SOCKET_NAME]);
      }
    }
  }
  socket.on('timeout', onTimeout);

  function onError(err) {
    const listenerCount = socket.listeners('error').length;
    debug('%s(requests: %s, finished: %s) error: %s, listenerCount: %s',
      socket[SOCKET_NAME], socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT],
      err, listenerCount);
    agent.errorSocketCount++;
    if (listenerCount === 1) {
      // if socket don't contain error event handler, don't catch it, emit it again
      debug('%s emit uncaught error event', socket[SOCKET_NAME]);
      socket.removeListener('error', onError);
      socket.emit('error', err);
    }
  }
  socket.on('error', onError);

  function onRemove() {
    debug('%s(requests: %s, finished: %s) agentRemove',
      socket[SOCKET_NAME],
      socket[SOCKET_REQUEST_COUNT], socket[SOCKET_REQUEST_FINISHED_COUNT]);
    // We need this function for cases like HTTP 'upgrade'
    // (defined by WebSockets) where we need to remove a socket from the
    // pool because it'll be locked up indefinitely
    socket.removeListener('close', onClose);
    socket.removeListener('error', onError);
    socket.removeListener('free', onFree);
    socket.removeListener('timeout', onTimeout);
    socket.removeListener('agentRemove', onRemove);
  }
  socket.on('agentRemove', onRemove);
}

module.exports = Agent;

function inspect(obj) {
  const res = {};
  for (const key in obj) {
    res[key] = obj[key].length;
  }
  return res;
}


/***/ }),

/***/ 6160:
/***/ ((module) => {



module.exports = {
  // agent
  CURRENT_ID: Symbol('agentkeepalive#currentId'),
  CREATE_ID: Symbol('agentkeepalive#createId'),
  INIT_SOCKET: Symbol('agentkeepalive#initSocket'),
  CREATE_HTTPS_CONNECTION: Symbol('agentkeepalive#createHttpsConnection'),
  // socket
  SOCKET_CREATED_TIME: Symbol('agentkeepalive#socketCreatedTime'),
  SOCKET_NAME: Symbol('agentkeepalive#socketName'),
  SOCKET_REQUEST_COUNT: Symbol('agentkeepalive#socketRequestCount'),
  SOCKET_REQUEST_FINISHED_COUNT: Symbol('agentkeepalive#socketRequestFinishedCount'),
};


/***/ }),

/***/ 414:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {



const OriginalHttpsAgent = (__nccwpck_require__(5692).Agent);
const HttpAgent = __nccwpck_require__(2532);
const {
  INIT_SOCKET,
  CREATE_HTTPS_CONNECTION,
} = __nccwpck_require__(6160);

class HttpsAgent extends HttpAgent {
  constructor(options) {
    super(options);

    this.defaultPort = 443;
    this.protocol = 'https:';
    this.maxCachedSessions = this.options.maxCachedSessions;
    /* istanbul ignore next */
    if (this.maxCachedSessions === undefined) {
      this.maxCachedSessions = 100;
    }

    this._sessionCache = {
      map: {},
      list: [],
    };
  }

  createConnection(options, oncreate) {
    const socket = this[CREATE_HTTPS_CONNECTION](options, oncreate);
    this[INIT_SOCKET](socket, options);
    return socket;
  }
}

// https://github.com/nodejs/node/blob/master/lib/https.js#L89
HttpsAgent.prototype[CREATE_HTTPS_CONNECTION] = OriginalHttpsAgent.prototype.createConnection;

[
  'getName',
  '_getSession',
  '_cacheSession',
  // https://github.com/nodejs/node/pull/4982
  '_evictSession',
].forEach(function(method) {
  /* istanbul ignore next */
  if (typeof OriginalHttpsAgent.prototype[method] === 'function') {
    HttpsAgent.prototype[method] = OriginalHttpsAgent.prototype[method];
  }
});

module.exports = HttpsAgent;


/***/ }),

/***/ 7182:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {



const isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);

/* eslint-disable no-control-regex */
// this is a modified version of https://github.com/chalk/ansi-regex (MIT License)
const ANSI_REGEX = /[\u001b\u009b][[\]#;?()]*(?:(?:(?:[^\W_]*;?[^\W_]*)\u0007)|(?:(?:[0-9]{1,4}(;[0-9]{0,4})*)?[~0-9=<>cf-nqrtyA-PRZ]))/g;

const hasColor = () => {
  if (typeof process !== 'undefined') {
    return process.env.FORCE_COLOR !== '0';
  }
  return false;
};

const create = () => {
  const colors = {
    enabled: hasColor(),
    visible: true,
    styles: {},
    keys: {}
  };

  const ansi = style => {
    let open = style.open = `\u001b[${style.codes[0]}m`;
    let close = style.close = `\u001b[${style.codes[1]}m`;
    let regex = style.regex = new RegExp(`\\u001b\\[${style.codes[1]}m`, 'g');
    style.wrap = (input, newline) => {
      if (input.includes(close)) input = input.replace(regex, close + open);
      let output = open + input + close;
      // see https://github.com/chalk/chalk/pull/92, thanks to the
      // chalk contributors for this fix. However, we've confirmed that
      // this issue is also present in Windows terminals
      return newline ? output.replace(/\r*\n/g, `${close}$&${open}`) : output;
    };
    return style;
  };

  const wrap = (style, input, newline) => {
    return typeof style === 'function' ? style(input) : style.wrap(input, newline);
  };

  const style = (input, stack) => {
    if (input === '' || input == null) return '';
    if (colors.enabled === false) return input;
    if (colors.visible === false) return '';
    let str = '' + input;
    let nl = str.includes('\n');
    let n = stack.length;
    if (n > 0 && stack.includes('unstyle')) {
      stack = [...new Set(['unstyle', ...stack])].reverse();
    }
    while (n-- > 0) str = wrap(colors.styles[stack[n]], str, nl);
    return str;
  };

  const define = (name, codes, type) => {
    colors.styles[name] = ansi({ name, codes });
    let keys = colors.keys[type] || (colors.keys[type] = []);
    keys.push(name);

    Reflect.defineProperty(colors, name, {
      configurable: true,
      enumerable: true,
      set(value) {
        colors.alias(name, value);
      },
      get() {
        let color = input => style(input, color.stack);
        Reflect.setPrototypeOf(color, colors);
        color.stack = this.stack ? this.stack.concat(name) : [name];
        return color;
      }
    });
  };

  define('reset', [0, 0], 'modifier');
  define('bold', [1, 22], 'modifier');
  define('dim', [2, 22], 'modifier');
  define('italic', [3, 23], 'modifier');
  define('underline', [4, 24], 'modifier');
  define('inverse', [7, 27], 'modifier');
  define('hidden', [8, 28], 'modifier');
  define('strikethrough', [9, 29], 'modifier');

  define('black', [30, 39], 'color');
  define('red', [31, 39], 'color');
  define('green', [32, 39], 'color');
  define('yellow', [33, 39], 'color');
  define('blue', [34, 39], 'color');
  define('magenta', [35, 39], 'color');
  define('cyan', [36, 39], 'color');
  define('white', [37, 39], 'color');
  define('gray', [90, 39], 'color');
  define('grey', [90, 39], 'color');

  define('bgBlack', [40, 49], 'bg');
  define('bgRed', [41, 49], 'bg');
  define('bgGreen', [42, 49], 'bg');
  define('bgYellow', [43, 49], 'bg');
  define('bgBlue', [44, 49], 'bg');
  define('bgMagenta', [45, 49], 'bg');
  define('bgCyan', [46, 49], 'bg');
  define('bgWhite', [47, 49], 'bg');

  define('blackBright', [90, 39], 'bright');
  define('redBright', [91, 39], 'bright');
  define('greenBright', [92, 39], 'bright');
  define('yellowBright', [93, 39], 'bright');
  define('blueBright', [94, 39], 'bright');
  define('magentaBright', [95, 39], 'bright');
  define('cyanBright', [96, 39], 'bright');
  define('whiteBright', [97, 39], 'bright');

  define('bgBlackBright', [100, 49], 'bgBright');
  define('bgRedBright', [101, 49], 'bgBright');
  define('bgGreenBright', [102, 49], 'bgBright');
  define('bgYellowBright', [103, 49], 'bgBright');
  define('bgBlueBright', [104, 49], 'bgBright');
  define('bgMagentaBright', [105, 49], 'bgBright');
  define('bgCyanBright', [106, 49], 'bgBright');
  define('bgWhiteBright', [107, 49], 'bgBright');

  colors.ansiRegex = ANSI_REGEX;
  colors.hasColor = colors.hasAnsi = str => {
    colors.ansiRegex.lastIndex = 0;
    return typeof str === 'string' && str !== '' && colors.ansiRegex.test(str);
  };

  colors.alias = (name, color) => {
    let fn = typeof color === 'string' ? colors[color] : color;

    if (typeof fn !== 'function') {
      throw new TypeError('Expected alias to be the name of an existing color (string) or a function');
    }

    if (!fn.stack) {
      Reflect.defineProperty(fn, 'name', { value: name });
      colors.styles[name] = fn;
      fn.stack = [name];
    }

    Reflect.defineProperty(colors, name, {
      configurable: true,
      enumerable: true,
      set(value) {
        colors.alias(name, value);
      },
      get() {
        let color = input => style(input, color.stack);
        Reflect.setPrototypeOf(color, colors);
        color.stack = this.stack ? this.stack.concat(fn.stack) : fn.stack;
        return color;
      }
    });
  };

  colors.theme = custom => {
    if (!isObject(custom)) throw new TypeError('Expected theme to be an object');
    for (let name of Object.keys(custom)) {
      colors.alias(name, custom[name]);
    }
    return colors;
  };

  colors.alias('unstyle', str => {
    if (typeof str === 'string' && str !== '') {
      colors.ansiRegex.lastIndex = 0;
      return str.replace(colors.ansiRegex, '');
    }
    return '';
  });

  colors.alias('noop', str => str);
  colors.none = colors.clear = colors.noop;

  colors.stripColor = colors.unstyle;
  colors.symbols = __nccwpck_require__(4763);
  colors.define = define;
  return colors;
};

module.exports = create();
module.exports.create = create;


/***/ }),

/***/ 4763:
/***/ ((module) => {



const isHyper = typeof process !== 'undefined' && process.env.TERM_PROGRAM === 'Hyper';
const isWindows = typeof process !== 'undefined' && process.platform === 'win32';
const isLinux = typeof process !== 'undefined' && process.platform === 'linux';

const common = {
  ballotDisabled: '☒',
  ballotOff: '☐',
  ballotOn: '☑',
  bullet: '•',
  bulletWhite: '◦',
  fullBlock: '█',
  heart: '❤',
  identicalTo: '≡',
  line: '─',
  mark: '※',
  middot: '·',
  minus: '－',
  multiplication: '×',
  obelus: '÷',
  pencilDownRight: '✎',
  pencilRight: '✏',
  pencilUpRight: '✐',
  percent: '%',
  pilcrow2: '❡',
  pilcrow: '¶',
  plusMinus: '±',
  question: '?',
  section: '§',
  starsOff: '☆',
  starsOn: '★',
  upDownArrow: '↕'
};

const windows = Object.assign({}, common, {
  check: '√',
  cross: '×',
  ellipsisLarge: '...',
  ellipsis: '...',
  info: 'i',
  questionSmall: '?',
  pointer: '>',
  pointerSmall: '»',
  radioOff: '( )',
  radioOn: '(*)',
  warning: '‼'
});

const other = Object.assign({}, common, {
  ballotCross: '✘',
  check: '✔',
  cross: '✖',
  ellipsisLarge: '⋯',
  ellipsis: '…',
  info: 'ℹ',
  questionFull: '？',
  questionSmall: '﹖',
  pointer: isLinux ? '▸' : '❯',
  pointerSmall: isLinux ? '‣' : '›',
  radioOff: '◯',
  radioOn: '◉',
  warning: '⚠'
});

module.exports = (isWindows && !isHyper) ? windows : other;
Reflect.defineProperty(module.exports, 'common', { enumerable: false, value: common });
Reflect.defineProperty(module.exports, 'windows', { enumerable: false, value: windows });
Reflect.defineProperty(module.exports, 'other', { enumerable: false, value: other });


/***/ }),

/***/ 5475:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApifyApiError = void 0;
const body_parser_1 = __nccwpck_require__(570);
const utils_1 = __nccwpck_require__(8681);
/**
 * Examples of capturing groups for "...at ActorCollectionClient._list (/Users/..."
 * 0: "at ActorCollectionClient._list ("
 * 1: undefined
 * 2: "ActorCollectionClient"
 * 3: undefined
 * 4: "list"
 * @private
 */
const CLIENT_METHOD_REGEX = /at( async)? ([A-Za-z]+(Collection)?Client)\._?([A-Za-z]+) \(/;
/**
 * An `ApifyApiError` is thrown for successful HTTP requests that reach the API,
 * but the API responds with an error response. Typically, those are rate limit
 * errors and internal errors, which are automatically retried, or validation
 * errors, which are thrown immediately, because a correction by the user is
 * needed.
 */
class ApifyApiError extends Error {
    /**
     * @hidden
     */
    constructor(response, attempt) {
        var _a;
        let message;
        let type;
        let responseData = response.data;
        // Some methods (e.g. downloadItems) set up forceBuffer on request response. If this request failed
        // the body buffer needs to parse to get the correct error.
        if ((0, utils_1.isBuffer)(responseData)) {
            try {
                responseData = JSON.parse((0, body_parser_1.isomorphicBufferToString)(response.data, 'utf-8'));
            }
            catch (e) {
                // This can happen. The data in the response body are malformed.
            }
        }
        if (responseData && responseData.error) {
            const { error } = responseData;
            message = error.message;
            type = error.type;
        }
        else if (responseData) {
            let dataString;
            try {
                dataString = JSON.stringify(responseData, null, 2);
            }
            catch (err) {
                dataString = `${responseData}`;
            }
            message = `Unexpected error: ${dataString}`;
        }
        super(message);
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The invoked resource client and the method. Known issue: Sometimes it displays
         * as `unknown` because it can't be parsed from a stack trace.
         */
        Object.defineProperty(this, "clientMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * HTTP status code of the error.
         */
        Object.defineProperty(this, "statusCode", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * The type of the error, as returned by the API.
         */
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Number of the API call attempt.
         */
        Object.defineProperty(this, "attempt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * HTTP method of the API call.
         */
        Object.defineProperty(this, "httpMethod", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Full path of the API endpoint (URL excluding origin).
         */
        Object.defineProperty(this, "path", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * Original stack trace of the exception. It is replaced
         * by a more informative stack with API call information.
         */
        Object.defineProperty(this, "originalStack", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = this.constructor.name;
        this.clientMethod = this._extractClientAndMethodFromStack();
        this.statusCode = response.status;
        this.type = type;
        this.attempt = attempt;
        this.httpMethod = (_a = response.config) === null || _a === void 0 ? void 0 : _a.method;
        this.path = this._safelyParsePathFromResponse(response);
        const stack = this.stack;
        this.originalStack = stack.slice(stack.indexOf('\n'));
        this.stack = this._createApiStack();
    }
    _safelyParsePathFromResponse(response) {
        var _a;
        const urlString = (_a = response.config) === null || _a === void 0 ? void 0 : _a.url;
        let url;
        try {
            url = new URL(urlString);
        }
        catch {
            return urlString;
        }
        return url.pathname + url.search;
    }
    _extractClientAndMethodFromStack() {
        const match = this.stack.match(CLIENT_METHOD_REGEX);
        if (match)
            return `${match[2]}.${match[4]}`;
        return 'unknown';
    }
    /**
     * Creates a better looking and more informative stack that will be printed
     * out when API errors are thrown.
     *
     * Example:
     *
     * ApifyApiError: Actor task was not found
     *   clientMethod: TaskClient.start
     *   statusCode: 404
     *   type: record-not-found
     *   attempt: 1
     *   httpMethod: post
     *   path: /v2/actor-tasks/user~my-task/runs
     */
    _createApiStack() {
        const { name, ...props } = this;
        const stack = Object.entries(props)
            .map(([k, v]) => {
            // Rename originalStack to stack in the stack itself.
            // This is for better readability of errors in log.
            if (k === 'originalStack')
                k = 'stack';
            return `  ${k}: ${v}`;
        })
            .join('\n');
        return `${name}: ${this.message}\n${stack}`;
    }
}
exports.ApifyApiError = ApifyApiError;
//# sourceMappingURL=apify_api_error.js.map

/***/ }),

/***/ 1963:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApifyClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const consts_1 = __nccwpck_require__(9582);
const log_1 = tslib_1.__importDefault(__nccwpck_require__(8180));
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const http_client_1 = __nccwpck_require__(2398);
const actor_1 = __nccwpck_require__(6643);
const actor_collection_1 = __nccwpck_require__(7350);
const build_1 = __nccwpck_require__(7630);
const build_collection_1 = __nccwpck_require__(449);
const dataset_1 = __nccwpck_require__(3918);
const dataset_collection_1 = __nccwpck_require__(3185);
const key_value_store_1 = __nccwpck_require__(5081);
const key_value_store_collection_1 = __nccwpck_require__(3624);
const log_2 = __nccwpck_require__(740);
const request_queue_1 = __nccwpck_require__(6695);
const request_queue_collection_1 = __nccwpck_require__(898);
const run_1 = __nccwpck_require__(4375);
const run_collection_1 = __nccwpck_require__(9074);
const schedule_1 = __nccwpck_require__(8953);
const schedule_collection_1 = __nccwpck_require__(3896);
const store_collection_1 = __nccwpck_require__(6378);
const task_1 = __nccwpck_require__(3169);
const task_collection_1 = __nccwpck_require__(2160);
const user_1 = __nccwpck_require__(5227);
const webhook_1 = __nccwpck_require__(3991);
const webhook_collection_1 = __nccwpck_require__(9010);
const webhook_dispatch_1 = __nccwpck_require__(3552);
const webhook_dispatch_collection_1 = __nccwpck_require__(135);
const statistics_1 = __nccwpck_require__(7509);
/**
 * ApifyClient is the official library to access [Apify API](https://docs.apify.com/api/v2) from your
 * JavaScript applications. It runs both in Node.js and browser.
 */
class ApifyClient {
    constructor(options = {}) {
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "token", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "stats", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "httpClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            baseUrl: ow_1.default.optional.string,
            maxRetries: ow_1.default.optional.number,
            minDelayBetweenRetriesMillis: ow_1.default.optional.number,
            requestInterceptors: ow_1.default.optional.array,
            timeoutSecs: ow_1.default.optional.number,
            token: ow_1.default.optional.string,
        }));
        const { baseUrl = 'https://api.apify.com', maxRetries = 8, minDelayBetweenRetriesMillis = 500, requestInterceptors = [], timeoutSecs = 360, token, } = options;
        const tempBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, baseUrl.length - 1) : baseUrl;
        this.baseUrl = `${tempBaseUrl}/v2`;
        this.token = token;
        this.stats = new statistics_1.Statistics();
        this.logger = log_1.default.child({ prefix: 'ApifyClient' });
        this.httpClient = new http_client_1.HttpClient({
            apifyClientStats: this.stats,
            maxRetries,
            minDelayBetweenRetriesMillis,
            requestInterceptors,
            timeoutSecs,
            logger: this.logger,
            token: this.token,
        });
    }
    _options() {
        return {
            baseUrl: this.baseUrl,
            apifyClient: this,
            httpClient: this.httpClient,
        };
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-collection
     */
    actors() {
        return new actor_collection_1.ActorCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-object
     */
    actor(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new actor_1.ActorClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/build-collection
     */
    builds() {
        return new build_collection_1.BuildCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/build-object
     */
    build(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new build_1.BuildClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset-collection
     */
    datasets() {
        return new dataset_collection_1.DatasetCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset
     */
    dataset(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new dataset_1.DatasetClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-collection
     */
    keyValueStores() {
        return new key_value_store_collection_1.KeyValueStoreCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-object
     */
    keyValueStore(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new key_value_store_1.KeyValueStoreClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/logs
     */
    log(buildOrRunId) {
        (0, ow_1.default)(buildOrRunId, ow_1.default.string.nonEmpty);
        return new log_2.LogClient({
            id: buildOrRunId,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-collection
     */
    requestQueues() {
        return new request_queue_collection_1.RequestQueueCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue
     */
    requestQueue(id, options = {}) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            clientKey: ow_1.default.optional.string.nonEmpty,
            timeoutSecs: ow_1.default.optional.number,
        }));
        const apiClientOptions = {
            id,
            ...this._options(),
        };
        return new request_queue_1.RequestQueueClient(apiClientOptions, options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-collection
     */
    runs() {
        return new run_collection_1.RunCollectionClient({
            ...this._options(),
            resourcePath: 'actor-runs',
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     */
    run(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new run_1.RunClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-collection
     */
    tasks() {
        return new task_collection_1.TaskCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-object
     */
    task(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new task_1.TaskClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedules-collection
     */
    schedules() {
        return new schedule_collection_1.ScheduleCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-object
     */
    schedule(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new schedule_1.ScheduleClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/users
     */
    user(id = consts_1.ME_USER_NAME_PLACEHOLDER) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new user_1.UserClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-collection
     */
    webhooks() {
        return new webhook_collection_1.WebhookCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-object
     */
    webhook(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new webhook_1.WebhookClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhook-dispatches
     */
    webhookDispatches() {
        return new webhook_dispatch_collection_1.WebhookDispatchCollectionClient(this._options());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhook-dispatches/webhook-dispatch-object
     */
    webhookDispatch(id) {
        (0, ow_1.default)(id, ow_1.default.string.nonEmpty);
        return new webhook_dispatch_1.WebhookDispatchClient({
            id,
            ...this._options(),
        });
    }
    /**
     * https://docs.apify.com/api/v2/#/reference/store
     */
    store() {
        return new store_collection_1.StoreCollectionClient(this._options());
    }
    async setStatusMessage(message, options) {
        const runId = process.env[consts_1.ACTOR_ENV_VARS.RUN_ID];
        if (!runId) {
            throw new Error(`Environment variable ${consts_1.ACTOR_ENV_VARS.RUN_ID} is not set!`);
        }
        await this.run(runId).update({
            statusMessage: message,
            ...options,
        });
    }
}
exports.ApifyClient = ApifyClient;
//# sourceMappingURL=apify_client.js.map

/***/ }),

/***/ 516:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiClient = void 0;
/** @private */
class ApiClient {
    constructor(options) {
        Object.defineProperty(this, "id", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "safeId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "baseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "resourcePath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "apifyClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "httpClient", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { baseUrl, apifyClient, httpClient, resourcePath, id, params = {}, } = options;
        this.id = id;
        this.safeId = id && this._toSafeId(id);
        this.baseUrl = baseUrl;
        this.resourcePath = resourcePath;
        this.url = id
            ? `${baseUrl}/${resourcePath}/${this.safeId}`
            : `${baseUrl}/${resourcePath}`;
        this.apifyClient = apifyClient;
        this.httpClient = httpClient;
        this.params = params;
    }
    _subResourceOptions(moreOptions) {
        const baseOptions = {
            baseUrl: this._url(),
            apifyClient: this.apifyClient,
            httpClient: this.httpClient,
            params: this._params(),
        };
        return { ...baseOptions, ...moreOptions };
    }
    _url(path) {
        return path ? `${this.url}/${path}` : this.url;
    }
    _params(endpointParams) {
        return { ...this.params, ...endpointParams };
    }
    _toSafeId(id) {
        // The id has the format `username/actor-name`, so we only need to replace the first `/`.
        return id.replace('/', '~');
    }
}
exports.ApiClient = ApiClient;
//# sourceMappingURL=api_client.js.map

/***/ }),

/***/ 6150:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceClient = void 0;
const consts_1 = __nccwpck_require__(9582);
const api_client_1 = __nccwpck_require__(516);
const utils_1 = __nccwpck_require__(8681);
/**
 * We need to supply some number for the API,
 * because it would not accept "Infinity".
 * 999999 seconds is more than 10 days.
 */
const MAX_WAIT_FOR_FINISH = 999999;
/**
 * Resource client.
 * @private
 */
class ResourceClient extends api_client_1.ApiClient {
    async _get(options = {}) {
        const requestOpts = {
            url: this._url(),
            method: 'GET',
            params: this._params(options),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    async _update(newFields) {
        const response = await this.httpClient.call({
            url: this._url(),
            method: 'PUT',
            params: this._params(),
            data: newFields,
        });
        return (0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data));
    }
    async _delete() {
        try {
            await this.httpClient.call({
                url: this._url(),
                method: 'DELETE',
                params: this._params(),
            });
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
    }
    /**
     * This function is used in Build and Run endpoints so it's kept
     * here to stay DRY.
     */
    async _waitForFinish(options = {}) {
        const { waitSecs = MAX_WAIT_FOR_FINISH, } = options;
        const waitMillis = waitSecs * 1000;
        let job;
        const startedAt = Date.now();
        const shouldRepeat = () => {
            const millisSinceStart = Date.now() - startedAt;
            if (millisSinceStart >= waitMillis)
                return false;
            const hasJobEnded = job && consts_1.ACT_JOB_TERMINAL_STATUSES.includes(job.status);
            return !hasJobEnded;
        };
        do {
            const millisSinceStart = Date.now() - startedAt;
            const remainingWaitSeconds = Math.round((waitMillis - millisSinceStart) / 1000);
            const waitForFinish = Math.max(0, remainingWaitSeconds);
            const requestOpts = {
                url: this._url(),
                method: 'GET',
                params: this._params({ waitForFinish }),
            };
            try {
                const response = await this.httpClient.call(requestOpts);
                job = (0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data));
            }
            catch (err) {
                (0, utils_1.catchNotFoundOrThrow)(err);
                job = undefined;
            }
            // It might take some time for database replicas to get up-to-date,
            // so getRun() might return null. Wait a little bit and try it again.
            if (!job)
                await new Promise((resolve) => setTimeout(resolve, 250));
        } while (shouldRepeat());
        if (!job) {
            const constructorName = this.constructor.name;
            const jobName = constructorName.match(/(\w+)Client/)[1].toLowerCase();
            throw new Error(`Waiting for ${jobName} to finish failed. Cannot fetch actor ${jobName} details from the server.`);
        }
        return job;
    }
}
exports.ResourceClient = ResourceClient;
//# sourceMappingURL=resource_client.js.map

/***/ }),

/***/ 8755:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResourceCollectionClient = void 0;
const api_client_1 = __nccwpck_require__(516);
const utils_1 = __nccwpck_require__(8681);
/**
 * Resource collection client.
 * @private
 */
class ResourceCollectionClient extends api_client_1.ApiClient {
    /**
     * @private
     */
    async _list(options = {}) {
        const response = await this.httpClient.call({
            url: this._url(),
            method: 'GET',
            params: this._params(options),
        });
        return (0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data));
    }
    async _create(resource) {
        const response = await this.httpClient.call({
            url: this._url(),
            method: 'POST',
            params: this._params(),
            data: resource,
        });
        return (0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data));
    }
    async _getOrCreate(name, resource) {
        const response = await this.httpClient.call({
            url: this._url(),
            method: 'POST',
            params: this._params({ name }),
            data: resource,
        });
        return (0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data));
    }
}
exports.ResourceCollectionClient = ResourceCollectionClient;
//# sourceMappingURL=resource_collection_client.js.map

/***/ }),

/***/ 570:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isomorphicBufferToString = exports.maybeParseBody = void 0;
const tslib_1 = __nccwpck_require__(1860);
const content_type_1 = tslib_1.__importDefault(__nccwpck_require__(756));
const utils_1 = __nccwpck_require__(8681);
const CONTENT_TYPE_JSON = 'application/json';
const STRINGIFIABLE_CONTENT_TYPE_RXS = [
    new RegExp(`^${CONTENT_TYPE_JSON}`, 'i'),
    /^application\/.*xml$/i,
    /^text\//i,
];
/**
 * Parses a Buffer or ArrayBuffer using the provided content type header.
 *
 * - application/json is returned as a parsed object.
 * - application/*xml and text/* are returned as strings.
 * - everything else is returned as original body.
 *
 * If the header includes a charset, the body will be stringified only
 * if the charset represents a known encoding to Node.js or Browser.
 */
function maybeParseBody(body, contentTypeHeader) {
    let contentType;
    let charset;
    try {
        const result = content_type_1.default.parse(contentTypeHeader);
        contentType = result.type;
        charset = result.parameters.charset;
    }
    catch {
        // can't parse, keep original body
        return body;
    }
    // If we can't successfully parse it, we return
    // the original buffer rather than a mangled string.
    if (!areDataStringifiable(contentType, charset))
        return body;
    const dataString = isomorphicBufferToString(body, charset);
    return contentType === CONTENT_TYPE_JSON
        ? JSON.parse(dataString)
        : dataString;
}
exports.maybeParseBody = maybeParseBody;
function isomorphicBufferToString(buffer, encoding) {
    if (buffer.constructor.name !== ArrayBuffer.name) {
        return buffer.toString(encoding);
    }
    // Browser decoding only works with UTF-8.
    const utf8decoder = new TextDecoder();
    return utf8decoder.decode(new Uint8Array(buffer));
}
exports.isomorphicBufferToString = isomorphicBufferToString;
function isCharsetStringifiable(charset) {
    if (!charset)
        return true; // hope that it's utf-8
    if ((0, utils_1.isNode)())
        return Buffer.isEncoding(charset);
    const normalizedCharset = charset.toLowerCase().replace('-', '');
    // Browsers only support decoding utf-8 buffers.
    return normalizedCharset === 'utf8';
}
function isContentTypeStringifiable(contentType) {
    if (!contentType)
        return false; // keep buffer
    return STRINGIFIABLE_CONTENT_TYPE_RXS.some((rx) => rx.test(contentType));
}
function areDataStringifiable(contentType, charset) {
    return isContentTypeStringifiable(contentType) && isCharsetStringifiable(charset);
}
//# sourceMappingURL=body_parser.js.map

/***/ }),

/***/ 2398:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HttpClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const os_1 = tslib_1.__importDefault(__nccwpck_require__(857));
const consts_1 = __nccwpck_require__(9582);
const agentkeepalive_1 = tslib_1.__importDefault(__nccwpck_require__(3873));
const async_retry_1 = tslib_1.__importDefault(__nccwpck_require__(5195));
const axios_1 = tslib_1.__importStar(__nccwpck_require__(7269));
const apify_api_error_1 = __nccwpck_require__(5475);
const interceptors_1 = __nccwpck_require__(3526);
const utils_1 = __nccwpck_require__(8681);
const { version } = (0, utils_1.getVersionData)();
const RATE_LIMIT_EXCEEDED_STATUS_CODE = 429;
class HttpClient {
    constructor(options) {
        Object.defineProperty(this, "stats", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "maxRetries", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "minDelayBetweenRetriesMillis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "userProvidedRequestInterceptors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "logger", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeoutMillis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "httpAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "httpsAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "axios", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "workflowKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { token } = options;
        this.stats = options.apifyClientStats;
        this.maxRetries = options.maxRetries;
        this.minDelayBetweenRetriesMillis = options.minDelayBetweenRetriesMillis;
        this.userProvidedRequestInterceptors = options.requestInterceptors;
        this.timeoutMillis = options.timeoutSecs * 1000;
        this.logger = options.logger;
        this.workflowKey = options.workflowKey || process.env[consts_1.APIFY_ENV_VARS.WORKFLOW_KEY];
        this._onRequestRetry = this._onRequestRetry.bind(this);
        if ((0, utils_1.isNode)()) {
            // We want to keep sockets alive for better performance.
            // It's important to set the user's timeout also here and not only
            // on the axios instance, because even though this timeout
            // is for inactive sockets, sometimes the platform would take
            // long to process requests and the socket would time-out
            // while waiting for the response.
            const agentOpts = {
                timeout: this.timeoutMillis,
            };
            this.httpAgent = new agentkeepalive_1.default(agentOpts);
            this.httpsAgent = new agentkeepalive_1.default.HttpsAgent(agentOpts);
        }
        this.axios = axios_1.default.create({
            httpAgent: this.httpAgent,
            httpsAgent: this.httpsAgent,
            paramsSerializer: (params) => {
                const formattedParams = Object.entries(params)
                    .filter(([, value]) => value !== undefined)
                    .map(([key, value]) => {
                    const updatedValue = typeof value === 'boolean' ? Number(value) : value;
                    return [key, String(updatedValue)];
                });
                return new URLSearchParams(formattedParams).toString();
            },
            validateStatus: null,
            // Using interceptors for this functionality.
            transformRequest: undefined,
            transformResponse: undefined,
            responseType: 'arraybuffer',
            timeout: this.timeoutMillis,
            // maxBodyLength needs to be Infinity, because -1 falls back to a 10 MB default
            // from an axios subdependency - 'follow-redirects'
            maxBodyLength: Infinity,
            // maxContentLength must be -1, because Infinity will cause axios to run super slow
            // thanks to a bug that's now fixed, but not released yet https://github.com/axios/axios/pull/3738
            maxContentLength: -1,
        });
        // Clean all default headers because they only make a mess and their merging is difficult to understand and buggy.
        this.axios.defaults.headers = new axios_1.AxiosHeaders();
        // If workflow key is available, pass it as a header
        if (this.workflowKey) {
            this.axios.defaults.headers['X-Apify-Workflow-Key'] = this.workflowKey;
        }
        if ((0, utils_1.isNode)()) {
            // Works only in Node. Cannot be set in browser
            const isAtHome = !!process.env[consts_1.APIFY_ENV_VARS.IS_AT_HOME];
            const userAgent = `ApifyClient/${version} (${os_1.default.type()}; Node/${process.version}); isAtHome/${isAtHome}`;
            this.axios.defaults.headers['User-Agent'] = userAgent;
        }
        // Attach Authorization header for all requests if token was provided
        if (token) {
            this.axios.defaults.headers.Authorization = `Bearer ${token}`;
        }
        interceptors_1.requestInterceptors.forEach((i) => this.axios.interceptors.request.use(i));
        this.userProvidedRequestInterceptors.forEach((i) => this.axios.interceptors.request.use(i));
        interceptors_1.responseInterceptors.forEach((i) => this.axios.interceptors.response.use(i));
    }
    async call(config) {
        this.stats.calls++;
        const makeRequest = this._createRequestHandler(config);
        return (0, async_retry_1.default)(makeRequest, {
            retries: this.maxRetries,
            minTimeout: this.minDelayBetweenRetriesMillis,
            onRetry: this._onRequestRetry,
        });
    }
    _informAboutStreamNoRetry() {
        this.logger.warningOnce('Request body was a stream - retrying will not work, as part of it was already consumed.');
        this.logger.warningOnce('If you want Apify client to handle retries for you, collect the stream into a buffer before sending it.');
    }
    /**
     * Successful responses are returned, errors and unsuccessful
     * status codes are retried. See the following functions for the
     * retrying logic.
     */
    _createRequestHandler(config) {
        const makeRequest = async (stopTrying, attempt) => {
            this.stats.requests++;
            let response;
            const requestIsStream = (0, utils_1.isStream)(config.data);
            try {
                if (requestIsStream) {
                    // Handling redirects is not possible without buffering - part of the stream has already been sent and can't be recovered
                    // when server sends the redirect. Therefore we need to override this in Axios config to prevent it from buffering the body.
                    // see also axios/axios#1045
                    config = { ...config, maxRedirects: 0 };
                }
                response = await this.axios.request(config);
                if (this._isStatusOk(response.status))
                    return response;
            }
            catch (err) {
                return (0, utils_1.cast)(this._handleRequestError(err, config, stopTrying));
            }
            if (response.status === RATE_LIMIT_EXCEEDED_STATUS_CODE) {
                this.stats.addRateLimitError(attempt);
            }
            const apiError = new apify_api_error_1.ApifyApiError(response, attempt);
            if (this._isStatusCodeRetryable(response.status)) {
                if (requestIsStream) {
                    this._informAboutStreamNoRetry();
                }
                else {
                    // allow a retry
                    throw apiError;
                }
            }
            stopTrying(apiError);
            return response;
        };
        return makeRequest;
    }
    _isStatusOk(statusCode) {
        return statusCode < 300;
    }
    /**
     * Handles all unexpected errors that can happen, but are not
     * Apify API typed errors. E.g. network errors, timeouts and so on.
     */
    _handleRequestError(err, config, stopTrying) {
        if (this._isTimeoutError(err) && config.doNotRetryTimeouts) {
            return stopTrying(err);
        }
        if (this._isRetryableError(err)) {
            if ((0, utils_1.isStream)(config.data)) {
                this._informAboutStreamNoRetry();
            }
            else {
                throw err;
            }
        }
        return stopTrying(err);
    }
    /**
     * Axios calls req.abort() on timeouts so timeout errors will
     * have a code ECONNABORTED.
     */
    _isTimeoutError(err) {
        return err.code === 'ECONNABORTED';
    }
    /**
     * We don't want to retry every exception thrown from Axios.
     * The common denominator for retryable errors are network issues.
     * @param {Error} err
     * @private
     */
    _isRetryableError(err) {
        return this._isNetworkError(err) || this._isResponseBodyInvalid(err);
    }
    /**
     * When a network connection to our API is interrupted in the middle of streaming
     * a response, the request often does not fail, but simply contains
     * an incomplete response. This can often be fixed by retrying.
     */
    _isResponseBodyInvalid(err) {
        return err instanceof interceptors_1.InvalidResponseBodyError;
    }
    /**
     * When a network request is attempted by axios and fails,
     * it throws an AxiosError, which will have the request
     * and config (and other) properties.
     */
    _isNetworkError(err) {
        const hasRequest = err.request && typeof err.request === 'object';
        const hasConfig = err.config && typeof err.config === 'object';
        return hasRequest && hasConfig;
    }
    /**
     * We retry 429 (rate limit) and 500+.
     * For status codes 300-499 (except 429) we do not retry the request,
     * because it's probably caused by invalid url (redirect 3xx) or invalid user input (4xx).
     */
    _isStatusCodeRetryable(statusCode) {
        const isRateLimitError = statusCode === RATE_LIMIT_EXCEEDED_STATUS_CODE;
        const isInternalError = statusCode >= 500;
        return isRateLimitError || isInternalError;
    }
    _onRequestRetry(error, attempt) {
        if (attempt === Math.round(this.maxRetries / 2)) {
            this.logger.warning(`API request failed ${attempt} times. Max attempts: ${this.maxRetries + 1}.\nCause:${error.stack}`);
        }
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=http_client.js.map

/***/ }),

/***/ 720:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.InvalidResponseBodyError = exports.ApifyApiError = void 0;
const tslib_1 = __nccwpck_require__(1860);
tslib_1.__exportStar(__nccwpck_require__(1963), exports);
tslib_1.__exportStar(__nccwpck_require__(6643), exports);
tslib_1.__exportStar(__nccwpck_require__(7350), exports);
tslib_1.__exportStar(__nccwpck_require__(7630), exports);
tslib_1.__exportStar(__nccwpck_require__(449), exports);
tslib_1.__exportStar(__nccwpck_require__(3918), exports);
tslib_1.__exportStar(__nccwpck_require__(3185), exports);
tslib_1.__exportStar(__nccwpck_require__(5081), exports);
tslib_1.__exportStar(__nccwpck_require__(3624), exports);
tslib_1.__exportStar(__nccwpck_require__(740), exports);
tslib_1.__exportStar(__nccwpck_require__(6695), exports);
tslib_1.__exportStar(__nccwpck_require__(898), exports);
tslib_1.__exportStar(__nccwpck_require__(4375), exports);
tslib_1.__exportStar(__nccwpck_require__(9074), exports);
tslib_1.__exportStar(__nccwpck_require__(8953), exports);
tslib_1.__exportStar(__nccwpck_require__(3896), exports);
tslib_1.__exportStar(__nccwpck_require__(3169), exports);
tslib_1.__exportStar(__nccwpck_require__(2160), exports);
tslib_1.__exportStar(__nccwpck_require__(5227), exports);
tslib_1.__exportStar(__nccwpck_require__(3991), exports);
tslib_1.__exportStar(__nccwpck_require__(9010), exports);
tslib_1.__exportStar(__nccwpck_require__(3552), exports);
tslib_1.__exportStar(__nccwpck_require__(135), exports);
tslib_1.__exportStar(__nccwpck_require__(6378), exports);
var apify_api_error_1 = __nccwpck_require__(5475);
Object.defineProperty(exports, "ApifyApiError", ({ enumerable: true, get: function () { return apify_api_error_1.ApifyApiError; } }));
var interceptors_1 = __nccwpck_require__(3526);
Object.defineProperty(exports, "InvalidResponseBodyError", ({ enumerable: true, get: function () { return interceptors_1.InvalidResponseBodyError; } }));
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 3526:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.responseInterceptors = exports.requestInterceptors = exports.InvalidResponseBodyError = void 0;
const tslib_1 = __nccwpck_require__(1860);
const axios_1 = tslib_1.__importStar(__nccwpck_require__(7269));
const content_type_1 = tslib_1.__importDefault(__nccwpck_require__(756));
const body_parser_1 = __nccwpck_require__(570);
const utils_1 = __nccwpck_require__(8681);
/**
 * This error exists for the quite common situation, where only a partial JSON response is received and
 * an attempt to parse the JSON throws an error. In most cases this can be resolved by retrying the
 * request. We do that by identifying this error in HttpClient.
 *
 * The properties mimic AxiosError for easier integration in HttpClient error handling.
 */
class InvalidResponseBodyError extends Error {
    constructor(response, cause) {
        super(`Response body could not be parsed.\nCause:${cause.message}`);
        Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "response", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = this.constructor.name;
        this.code = 'invalid-response-body';
        this.response = response;
        this.cause = cause;
    }
}
exports.InvalidResponseBodyError = InvalidResponseBodyError;
function serializeRequest(config) {
    var _a, _b;
    const [defaultTransform] = axios_1.default.defaults.transformRequest;
    // The function not only serializes data, but it also adds correct headers.
    const data = defaultTransform(config.data, config.headers);
    // Actor inputs can include functions and we don't want to omit those,
    // because it's convenient for users. JSON.stringify removes them.
    // It's a bit inefficient that we serialize the JSON twice, but I feel
    // it's a small price to pay. The axios default transform does a lot
    // of body type checks and we would have to copy all of them to the resource clients.
    if (config.stringifyFunctions) {
        const contentTypeHeader = ((_a = config.headers) === null || _a === void 0 ? void 0 : _a['Content-Type']) || ((_b = config.headers) === null || _b === void 0 ? void 0 : _b['content-type']);
        try {
            const { type } = content_type_1.default.parse(contentTypeHeader);
            if (type === 'application/json' && typeof config.data === 'object') {
                config.data = stringifyWithFunctions(config.data);
            }
            else {
                config.data = data;
            }
        }
        catch {
            config.data = data;
        }
    }
    else {
        config.data = data;
    }
    return config;
}
function ensureHeadersPrototype(config) {
    if (config.headers && !(config.headers instanceof axios_1.AxiosHeaders)) {
        Object.setPrototypeOf(config.headers, axios_1.AxiosHeaders.prototype);
    }
    return config;
}
/**
 * JSON.stringify() that serializes functions to string instead
 * of replacing them with null or removing them.
 */
function stringifyWithFunctions(obj) {
    return JSON.stringify(obj, (_key, value) => {
        return typeof value === 'function' ? value.toString() : value;
    });
}
async function maybeGzipRequest(config) {
    var _a, _b;
    if ((_a = config.headers) === null || _a === void 0 ? void 0 : _a['content-encoding'])
        return config;
    const maybeZippedData = await (0, utils_1.maybeGzipValue)(config.data);
    if (maybeZippedData) {
        (_b = config.headers) !== null && _b !== void 0 ? _b : (config.headers = {});
        config.headers['content-encoding'] = 'gzip';
        config.data = maybeZippedData;
    }
    return config;
}
function parseResponseData(response) {
    if (!response.data // Nothing to do here.
        || response.config.responseType !== 'arraybuffer' // We don't want to parse custom response types.
        || response.config.forceBuffer // Apify custom property to prevent parsing of buffer.
    ) {
        return response;
    }
    const isBufferEmpty = (0, utils_1.isNode)() ? !response.data.length : !response.data.byteLength;
    if (isBufferEmpty) {
        // undefined is better than an empty buffer
        response.data = undefined;
        return response;
    }
    const contentTypeHeader = response.headers['content-type'];
    try {
        response.data = (0, body_parser_1.maybeParseBody)(response.data, contentTypeHeader);
    }
    catch (err) {
        throw new InvalidResponseBodyError(response, err);
    }
    return response;
}
exports.requestInterceptors = [maybeGzipRequest, serializeRequest, ensureHeadersPrototype];
exports.responseInterceptors = [parseResponseData];
//# sourceMappingURL=interceptors.js.map

/***/ }),

/***/ 6643:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActorClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const consts_1 = __nccwpck_require__(9582);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const actor_version_1 = __nccwpck_require__(9856);
const actor_version_collection_1 = __nccwpck_require__(3159);
const build_collection_1 = __nccwpck_require__(449);
const run_1 = __nccwpck_require__(4375);
const run_collection_1 = __nccwpck_require__(9074);
const webhook_collection_1 = __nccwpck_require__(9010);
const resource_client_1 = __nccwpck_require__(6150);
const utils_1 = __nccwpck_require__(8681);
class ActorClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'acts',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-object/get-actor
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-object/update-actor
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-object/delete-actor
     */
    async delete() {
        return this._delete();
    }
    /**
     * Starts an actor and immediately returns the Run object.
     * https://docs.apify.com/api/v2#/reference/actors/run-collection/run-actor
     */
    async start(input, options = {}) {
        // input can be anything, so no point in validating it. E.g. if you set content-type to application/pdf
        // then it will process input as a buffer.
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            contentType: ow_1.default.optional.string,
            memory: ow_1.default.optional.number,
            timeout: ow_1.default.optional.number,
            waitForFinish: ow_1.default.optional.number,
            webhooks: ow_1.default.optional.array.ofType(ow_1.default.object),
            maxItems: ow_1.default.optional.number.not.negative,
        }));
        const { waitForFinish, timeout, memory, build, maxItems } = options;
        const params = {
            waitForFinish,
            timeout,
            memory,
            build,
            webhooks: (0, utils_1.stringifyWebhooksToBase64)(options.webhooks),
            maxItems,
        };
        const request = {
            url: this._url('runs'),
            method: 'POST',
            data: input,
            params: this._params(params),
            // Apify internal property. Tells the request serialization interceptor
            // to stringify functions to JSON, instead of omitting them.
            // TODO: remove this ts-expect-error once we migrate HttpClient to TS and define Apify
            // extension of Axios configs
            // @ts-expect-error Apify extension
            stringifyFunctions: true,
        };
        if (options.contentType) {
            request.headers = {
                'content-type': options.contentType,
            };
        }
        const response = await this.httpClient.call(request);
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Starts an actor and waits for it to finish before returning the Run object.
     * It waits indefinitely, unless the `waitSecs` option is provided.
     * https://docs.apify.com/api/v2#/reference/actors/run-collection/run-actor
     */
    async call(input, options = {}) {
        // input can be anything, so no point in validating it. E.g. if you set content-type to application/pdf
        // then it will process input as a buffer.
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            contentType: ow_1.default.optional.string,
            memory: ow_1.default.optional.number,
            timeout: ow_1.default.optional.number.not.negative,
            waitSecs: ow_1.default.optional.number.not.negative,
            webhooks: ow_1.default.optional.array.ofType(ow_1.default.object),
            maxItems: ow_1.default.optional.number.not.negative,
        }));
        const { waitSecs, ...startOptions } = options;
        const { id } = await this.start(input, startOptions);
        // Calling root client because we need access to top level API.
        // Creating a new instance of RunClient here would only allow
        // setting it up as a nested route under actor API.
        return this.apifyClient.run(id).waitForFinish({ waitSecs });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/build-collection/build-actor
     * @return {Promise<Build>}
     */
    async build(versionNumber, options = {}) {
        (0, ow_1.default)(versionNumber, ow_1.default.string);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            betaPackages: ow_1.default.optional.boolean,
            tag: ow_1.default.optional.string,
            useCache: ow_1.default.optional.boolean,
            waitForFinish: ow_1.default.optional.number,
        }));
        const response = await this.httpClient.call({
            url: this._url('builds'),
            method: 'POST',
            params: this._params({
                version: versionNumber,
                ...options,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
     */
    lastRun(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            status: ow_1.default.optional.string.oneOf(Object.values(consts_1.ACT_JOB_STATUSES)),
            origin: ow_1.default.optional.string.oneOf(Object.values(consts_1.META_ORIGINS)),
        }));
        return new run_1.RunClient(this._subResourceOptions({
            id: 'last',
            params: this._params(options),
            resourcePath: 'runs',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/build-collection
     */
    builds() {
        return new build_collection_1.BuildCollectionClient(this._subResourceOptions({
            resourcePath: 'builds',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/run-collection
     */
    runs() {
        return new run_collection_1.RunCollectionClient(this._subResourceOptions({
            resourcePath: 'runs',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-object
     */
    version(versionNumber) {
        (0, ow_1.default)(versionNumber, ow_1.default.string);
        return new actor_version_1.ActorVersionClient(this._subResourceOptions({
            id: versionNumber,
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-collection
     * @return {ActorVersionCollectionClient}
     */
    versions() {
        return new actor_version_collection_1.ActorVersionCollectionClient(this._subResourceOptions());
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/webhook-collection
     * @return {WebhookCollectionClient}
     */
    webhooks() {
        return new webhook_collection_1.WebhookCollectionClient(this._subResourceOptions());
    }
}
exports.ActorClient = ActorClient;
//# sourceMappingURL=actor.js.map

/***/ }),

/***/ 7350:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActorCollectionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_collection_client_1 = __nccwpck_require__(8755);
class ActorCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'acts',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-collection/get-list-of-actors
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            my: ow_1.default.optional.boolean,
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/actor-collection/create-actor
     */
    async create(actor) {
        (0, ow_1.default)(actor, ow_1.default.optional.object);
        return this._create(actor);
    }
}
exports.ActorCollectionClient = ActorCollectionClient;
//# sourceMappingURL=actor_collection.js.map

/***/ }),

/***/ 8601:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActorEnvVarClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_client_1 = __nccwpck_require__(6150);
class ActorEnvVarClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'env-vars',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-object/get-environment-variable
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-object/update-environment-variable
     */
    async update(actorEnvVar) {
        (0, ow_1.default)(actorEnvVar, ow_1.default.object);
        return this._update(actorEnvVar);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-object/delete-environment-variable
     */
    async delete() {
        return this._delete();
    }
}
exports.ActorEnvVarClient = ActorEnvVarClient;
//# sourceMappingURL=actor_env_var.js.map

/***/ }),

/***/ 2536:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActorEnvVarCollectionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_collection_client_1 = __nccwpck_require__(8755);
class ActorEnvVarCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'env-vars',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-collection/get-list-of-environment-variables
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/environment-variable-collection/create-environment-variable
     */
    async create(actorEnvVar) {
        (0, ow_1.default)(actorEnvVar, ow_1.default.optional.object);
        return this._create(actorEnvVar);
    }
}
exports.ActorEnvVarCollectionClient = ActorEnvVarCollectionClient;
//# sourceMappingURL=actor_env_var_collection.js.map

/***/ }),

/***/ 9856:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActorSourceType = exports.ActorVersionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const actor_env_var_1 = __nccwpck_require__(8601);
const actor_env_var_collection_1 = __nccwpck_require__(2536);
const resource_client_1 = __nccwpck_require__(6150);
class ActorVersionClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'versions',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-object/get-version
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-object/update-version
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-object/delete-version
     */
    async delete() {
        return this._delete();
    }
    /**
     * TODO: https://docs.apify.com/api/v2#/reference/actors/env-var-object
     */
    envVar(envVarName) {
        (0, ow_1.default)(envVarName, ow_1.default.string);
        return new actor_env_var_1.ActorEnvVarClient(this._subResourceOptions({
            id: envVarName,
        }));
    }
    /**
     * TODO: https://docs.apify.com/api/v2#/reference/actors/env-var-collection
     * @return {ActorVersionCollectionClient}
     */
    envVars() {
        return new actor_env_var_collection_1.ActorEnvVarCollectionClient(this._subResourceOptions());
    }
}
exports.ActorVersionClient = ActorVersionClient;
var ActorSourceType;
(function (ActorSourceType) {
    ActorSourceType["SourceFiles"] = "SOURCE_FILES";
    ActorSourceType["GitRepo"] = "GIT_REPO";
    ActorSourceType["Tarball"] = "TARBALL";
    ActorSourceType["GitHubGist"] = "GITHUB_GIST";
})(ActorSourceType || (exports.ActorSourceType = ActorSourceType = {}));
//# sourceMappingURL=actor_version.js.map

/***/ }),

/***/ 3159:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActorVersionCollectionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_collection_client_1 = __nccwpck_require__(8755);
class ActorVersionCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'versions',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-collection/get-list-of-versions
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/version-collection/create-version
     */
    async create(actorVersion) {
        (0, ow_1.default)(actorVersion, ow_1.default.optional.object);
        return this._create(actorVersion);
    }
}
exports.ActorVersionCollectionClient = ActorVersionCollectionClient;
//# sourceMappingURL=actor_version_collection.js.map

/***/ }),

/***/ 7630:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BuildClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const log_1 = __nccwpck_require__(740);
const resource_client_1 = __nccwpck_require__(6150);
const utils_1 = __nccwpck_require__(8681);
class BuildClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'actor-builds',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/build-object/get-build
     */
    async get(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            waitForFinish: ow_1.default.optional.number,
        }));
        return this._get(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/abort-build/abort-build
     */
    async abort() {
        const response = await this.httpClient.call({
            url: this._url('abort'),
            method: 'POST',
            params: this._params(),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/delete-build/delete-build
     */
    async delete() {
        return this._delete();
    }
    /**
     * Returns a promise that resolves with the finished Build object when the provided actor build finishes
     * or with the unfinished Build object when the `waitSecs` timeout lapses. The promise is NOT rejected
     * based on run status. You can inspect the `status` property of the Build object to find out its status.
     *
     * The difference between this function and the `waitForFinish` parameter of the `get` method
     * is the fact that this function can wait indefinitely. Its use is preferable to the
     * `waitForFinish` parameter alone, which it uses internally.
     *
     * This is useful when you need to immediately start a run after a build finishes.
     */
    async waitForFinish(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            waitSecs: ow_1.default.optional.number,
        }));
        return this._waitForFinish(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-builds/build-log
     */
    log() {
        return new log_1.LogClient(this._subResourceOptions({
            resourcePath: 'log',
        }));
    }
}
exports.BuildClient = BuildClient;
//# sourceMappingURL=build.js.map

/***/ }),

/***/ 449:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BuildCollectionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_collection_client_1 = __nccwpck_require__(8755);
class BuildCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            ...options,
            resourcePath: options.resourcePath || 'actor-builds',
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/build-collection/get-list-of-builds
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
}
exports.BuildCollectionClient = BuildCollectionClient;
//# sourceMappingURL=build_collection.js.map

/***/ }),

/***/ 3918:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DownloadItemsFormat = exports.DatasetClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_client_1 = __nccwpck_require__(6150);
const utils_1 = __nccwpck_require__(8681);
class DatasetClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'datasets',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset/get-dataset
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset/update-dataset
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset/delete-dataset
     */
    async delete() {
        return this._delete();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/item-collection/get-items
     */
    async listItems(options = {}) {
        var _a;
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            clean: ow_1.default.optional.boolean,
            desc: ow_1.default.optional.boolean,
            flatten: ow_1.default.optional.array.ofType(ow_1.default.string),
            fields: ow_1.default.optional.array.ofType(ow_1.default.string),
            omit: ow_1.default.optional.array.ofType(ow_1.default.string),
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            skipEmpty: ow_1.default.optional.boolean,
            skipHidden: ow_1.default.optional.boolean,
            unwind: ow_1.default.optional.string,
            view: ow_1.default.optional.string,
        }));
        const response = await this.httpClient.call({
            url: this._url('items'),
            method: 'GET',
            params: this._params(options),
        });
        return this._createPaginationList(response, (_a = options.desc) !== null && _a !== void 0 ? _a : false);
    }
    /**
     * Unlike `listItems` which returns a {@link PaginationList} with an array of individual
     * dataset items, `downloadItems` returns the items serialized to the provided format.
     * https://docs.apify.com/api/v2#/reference/datasets/item-collection/get-items
     */
    async downloadItems(format, options = {}) {
        (0, ow_1.default)(format, ow_1.default.string.oneOf(validItemFormats));
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            attachment: ow_1.default.optional.boolean,
            bom: ow_1.default.optional.boolean,
            clean: ow_1.default.optional.boolean,
            delimiter: ow_1.default.optional.string,
            desc: ow_1.default.optional.boolean,
            flatten: ow_1.default.optional.array.ofType(ow_1.default.string),
            fields: ow_1.default.optional.array.ofType(ow_1.default.string),
            omit: ow_1.default.optional.array.ofType(ow_1.default.string),
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            skipEmpty: ow_1.default.optional.boolean,
            skipHeaderRow: ow_1.default.optional.boolean,
            skipHidden: ow_1.default.optional.boolean,
            unwind: ow_1.default.optional.string,
            view: ow_1.default.optional.string,
            xmlRoot: ow_1.default.optional.string,
            xmlRow: ow_1.default.optional.string,
        }));
        const { data } = await this.httpClient.call({
            url: this._url('items'),
            method: 'GET',
            params: this._params({
                format,
                ...options,
            }),
            forceBuffer: true,
        });
        return (0, utils_1.cast)(data);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/item-collection/put-items
     */
    async pushItems(items) {
        (0, ow_1.default)(items, ow_1.default.any(ow_1.default.object, ow_1.default.string, ow_1.default.array.ofType(ow_1.default.any(ow_1.default.object, ow_1.default.string))));
        await this.httpClient.call({
            url: this._url('items'),
            method: 'POST',
            headers: {
                'content-type': 'application/json; charset=utf-8',
            },
            data: items,
            params: this._params(),
            doNotRetryTimeouts: true, // see timeout handling in http-client
        });
    }
    _createPaginationList(response, userProvidedDesc) {
        var _a;
        return {
            items: response.data,
            total: Number(response.headers['x-apify-pagination-total']),
            offset: Number(response.headers['x-apify-pagination-offset']),
            count: response.data.length, // because x-apify-pagination-count returns invalid values when hidden/empty items are skipped
            limit: Number(response.headers['x-apify-pagination-limit']), // API returns 999999999999 when no limit is used
            // TODO: Replace this once https://github.com/apify/apify-core/issues/3503 is solved
            desc: JSON.parse((_a = response.headers['x-apify-pagination-desc']) !== null && _a !== void 0 ? _a : userProvidedDesc),
        };
    }
}
exports.DatasetClient = DatasetClient;
var DownloadItemsFormat;
(function (DownloadItemsFormat) {
    DownloadItemsFormat["JSON"] = "json";
    DownloadItemsFormat["JSONL"] = "jsonl";
    DownloadItemsFormat["XML"] = "xml";
    DownloadItemsFormat["HTML"] = "html";
    DownloadItemsFormat["CSV"] = "csv";
    DownloadItemsFormat["XLSX"] = "xlsx";
    DownloadItemsFormat["RSS"] = "rss";
})(DownloadItemsFormat || (exports.DownloadItemsFormat = DownloadItemsFormat = {}));
const validItemFormats = [
    ...new Set(Object.values(DownloadItemsFormat)
        .map((item) => item.toLowerCase())),
];
//# sourceMappingURL=dataset.js.map

/***/ }),

/***/ 3185:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatasetCollectionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_collection_client_1 = __nccwpck_require__(8755);
class DatasetCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'datasets',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset-collection/get-list-of-datasets
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            unnamed: ow_1.default.optional.boolean,
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/datasets/dataset-collection/create-dataset
     */
    async getOrCreate(name, options) {
        (0, ow_1.default)(name, ow_1.default.optional.string);
        (0, ow_1.default)(options === null || options === void 0 ? void 0 : options.schema, ow_1.default.optional.object); // TODO: Add schema validatioon
        return this._getOrCreate(name, options);
    }
}
exports.DatasetCollectionClient = DatasetCollectionClient;
//# sourceMappingURL=dataset_collection.js.map

/***/ }),

/***/ 5081:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeyValueStoreClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const log_1 = tslib_1.__importDefault(__nccwpck_require__(8180));
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_client_1 = __nccwpck_require__(6150);
const utils_1 = __nccwpck_require__(8681);
class KeyValueStoreClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'key-value-stores',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-object/get-store
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-object/update-store
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-object/delete-store
     */
    async delete() {
        return this._delete();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/key-collection/get-list-of-keys
     */
    async listKeys(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            exclusiveStartKey: ow_1.default.optional.string,
        }));
        const response = await this.httpClient.call({
            url: this._url('keys'),
            method: 'GET',
            params: this._params(options),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Tests whether a record with the given key exists in the key-value store without retrieving its value.
     *
     * https://docs.apify.com/api/v2#/reference/key-value-stores/record/get-record
     * @param key The queried record key.
     * @returns `true` if the record exists, `false` if it does not.
     */
    async recordExists(key) {
        const requestOpts = {
            url: this._url(`records/${key}`),
            method: 'HEAD',
            params: this._params(),
        };
        try {
            await this.httpClient.call(requestOpts);
            return true;
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return false;
    }
    async getRecord(key, options = {}) {
        (0, ow_1.default)(key, ow_1.default.string);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            buffer: ow_1.default.optional.boolean,
            stream: ow_1.default.optional.boolean,
            disableRedirect: ow_1.default.optional.boolean,
        }));
        if (options.stream && !(0, utils_1.isNode)()) {
            throw new Error('The stream option can only be used in Node.js environment.');
        }
        if ('disableRedirect' in options) {
            log_1.default.deprecated('The disableRedirect option for getRecord() is deprecated. '
                + 'It has no effect and will be removed in the following major release.');
        }
        const requestOpts = {
            url: this._url(`records/${key}`),
            method: 'GET',
            params: this._params(),
        };
        if (options.buffer)
            requestOpts.forceBuffer = true;
        if (options.stream)
            requestOpts.responseType = 'stream';
        try {
            const response = await this.httpClient.call(requestOpts);
            return {
                key,
                value: response.data,
                contentType: response.headers['content-type'],
            };
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * The value in the record can be a stream object (detected by having the `.pipe`
     * and `.on` methods). However, note that in that case following redirects or
     * retrying the request if it fails (for example due to rate limiting) isn't
     * possible. If you want to keep that behavior, you need to collect the whole
     * stream contents into a Buffer and then send the full buffer. See [this
     * StackOverflow answer](https://stackoverflow.com/a/14269536/7292139) for
     * an example how to do that.
     *
     * https://docs.apify.com/api/v2#/reference/key-value-stores/record/put-record
     */
    async setRecord(record) {
        (0, ow_1.default)(record, ow_1.default.object.exactShape({
            key: ow_1.default.string,
            value: ow_1.default.any(ow_1.default.null, ow_1.default.string, ow_1.default.number, ow_1.default.object, ow_1.default.boolean),
            contentType: ow_1.default.optional.string.nonEmpty,
        }));
        const { key } = record;
        let { value, contentType } = record;
        const isValueStreamOrBuffer = (0, utils_1.isStream)(value) || (0, utils_1.isBuffer)(value);
        // To allow saving Objects to JSON without providing content type
        if (!contentType) {
            if (isValueStreamOrBuffer)
                contentType = 'application/octet-stream';
            else if (typeof value === 'string')
                contentType = 'text/plain; charset=utf-8';
            else
                contentType = 'application/json; charset=utf-8';
        }
        const isContentTypeJson = /^application\/json/.test(contentType);
        if (isContentTypeJson && !isValueStreamOrBuffer && typeof value !== 'string') {
            try {
                value = JSON.stringify(value, null, 2);
            }
            catch (err) {
                const msg = `The record value cannot be stringified to JSON. Please provide other content type.\nCause: ${err.message}`;
                throw new Error(msg);
            }
        }
        const uploadOpts = {
            url: this._url(`records/${key}`),
            method: 'PUT',
            params: this._params(),
            data: value,
            headers: contentType ? { 'content-type': contentType } : undefined,
        };
        await this.httpClient.call(uploadOpts);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/record/delete-record
     */
    async deleteRecord(key) {
        (0, ow_1.default)(key, ow_1.default.string);
        await this.httpClient.call({
            url: this._url(`records/${key}`),
            method: 'DELETE',
            params: this._params(),
        });
    }
}
exports.KeyValueStoreClient = KeyValueStoreClient;
//# sourceMappingURL=key_value_store.js.map

/***/ }),

/***/ 3624:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.KeyValueStoreCollectionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_collection_client_1 = __nccwpck_require__(8755);
class KeyValueStoreCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'key-value-stores',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-collection/get-list-of-key-value-stores
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            unnamed: ow_1.default.optional.boolean,
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/key-value-stores/store-collection/create-key-value-store
     */
    async getOrCreate(name, options) {
        (0, ow_1.default)(name, ow_1.default.optional.string);
        (0, ow_1.default)(options === null || options === void 0 ? void 0 : options.schema, ow_1.default.optional.object); // TODO: Add schema validatioon
        return this._getOrCreate(name, options);
    }
}
exports.KeyValueStoreCollectionClient = KeyValueStoreCollectionClient;
//# sourceMappingURL=key_value_store_collection.js.map

/***/ }),

/***/ 740:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogClient = void 0;
const resource_client_1 = __nccwpck_require__(6150);
const utils_1 = __nccwpck_require__(8681);
class LogClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'logs',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/logs/log/get-log
     */
    async get() {
        const requestOpts = {
            url: this._url(),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)(response.data);
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * Gets the log in a Readable stream format. Only works in Node.js.
     * https://docs.apify.com/api/v2#/reference/logs/log/get-log
     */
    async stream() {
        const params = {
            stream: true,
        };
        const requestOpts = {
            url: this._url(),
            method: 'GET',
            params: this._params(params),
            responseType: 'stream',
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)(response.data);
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
}
exports.LogClient = LogClient;
//# sourceMappingURL=log.js.map

/***/ }),

/***/ 6695:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestQueueClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const consts_1 = __nccwpck_require__(9582);
const log_1 = tslib_1.__importDefault(__nccwpck_require__(8180));
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_client_1 = __nccwpck_require__(6150);
const utils_1 = __nccwpck_require__(8681);
const DEFAULT_PARALLEL_BATCH_ADD_REQUESTS = 5;
const DEFAULT_UNPROCESSED_RETRIES_BATCH_ADD_REQUESTS = 3;
const DEFAULT_MIN_DELAY_BETWEEN_UNPROCESSED_REQUESTS_RETRIES_MILLIS = 500;
const DEFAULT_REQUEST_QUEUE_REQUEST_PAGE_LIMIT = 1000;
const SAFETY_BUFFER_PERCENT = 0.01 / 100; // 0.01%
class RequestQueueClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options, userOptions = {}) {
        super({
            resourcePath: 'request-queues',
            ...options,
        });
        Object.defineProperty(this, "clientKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "timeoutMillis", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.clientKey = userOptions.clientKey;
        this.timeoutMillis = userOptions.timeoutSecs ? userOptions.timeoutSecs * 1e3 : undefined;
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue/get-request-queue
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue/update-request-queue
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue/delete-request-queue
     */
    async delete() {
        return this._delete();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-head/get-head
     */
    async listHead(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
        }));
        const response = await this.httpClient.call({
            url: this._url('head'),
            method: 'GET',
            timeout: this.timeoutMillis,
            params: this._params({
                limit: options.limit,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-head-with-locks/get-head-and-lock
     */
    async listAndLockHead(options) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            lockSecs: ow_1.default.number,
            limit: ow_1.default.optional.number,
        }));
        const response = await this.httpClient.call({
            url: this._url('head/lock'),
            method: 'POST',
            timeout: this.timeoutMillis,
            params: this._params({
                limit: options.limit,
                lockSecs: options.lockSecs,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-collection/add-request
     */
    async addRequest(request, options = {}) {
        (0, ow_1.default)(request, ow_1.default.object.partialShape({
            id: ow_1.default.undefined,
        }));
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            forefront: ow_1.default.optional.boolean,
        }));
        const response = await this.httpClient.call({
            url: this._url('requests'),
            method: 'POST',
            timeout: this.timeoutMillis,
            data: request,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Writes requests to request queue in batch.
     *
     * @private
     */
    async _batchAddRequests(requests, options = {}) {
        (0, ow_1.default)(requests, ow_1.default.array.ofType(ow_1.default.object.partialShape({
            id: ow_1.default.undefined,
        })).minLength(1).maxLength(consts_1.REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION));
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            forefront: ow_1.default.optional.boolean,
        }));
        const { data } = await this.httpClient.call({
            url: this._url('requests/batch'),
            method: 'POST',
            timeout: this.timeoutMillis,
            data: requests,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(data)));
    }
    async _batchAddRequestsWithRetries(requests, options = {}) {
        const { forefront, maxUnprocessedRequestsRetries = DEFAULT_UNPROCESSED_RETRIES_BATCH_ADD_REQUESTS, minDelayBetweenUnprocessedRequestsRetriesMillis = DEFAULT_MIN_DELAY_BETWEEN_UNPROCESSED_REQUESTS_RETRIES_MILLIS, } = options;
        // Keep track of the requests that remain to be processed (in parameter format)
        let remainingRequests = requests;
        // Keep track of the requests that have been processed (in api format)
        const processedRequests = [];
        // The requests we have not been able to process in the last call
        // ie. those we have not been able to process at all
        let unprocessedRequests = [];
        for (let i = 0; i < 1 + maxUnprocessedRequestsRetries; i++) {
            try {
                const response = await this._batchAddRequests(remainingRequests, {
                    forefront,
                });
                processedRequests.push(...response.processedRequests);
                unprocessedRequests = response.unprocessedRequests;
                // Consider request with unprocessed requests as rate limited.
                // NOTE: This is important for SDK, the rate limit errors are read by AutoScalePool and used to potentially downscale.
                if (unprocessedRequests.length !== 0) {
                    this.httpClient.stats.addRateLimitError(i + 1);
                }
                // Get unique keys of all requests processed so far
                const processedRequestsUniqueKeys = processedRequests.map(({ uniqueKey }) => uniqueKey);
                // Requests remaining to be processed are the all that remain
                remainingRequests = requests.filter(({ uniqueKey }) => !processedRequestsUniqueKeys.includes(uniqueKey));
                // Stop if all requests have been processed
                if (remainingRequests.length === 0) {
                    break;
                }
            }
            catch (err) {
                log_1.default.exception(err, 'Request batch insert failed');
                // When something fails and http client does not retry, the remaining requests are treated as unprocessed.
                // This ensures that this method does not throw and keeps the signature.
                const processedRequestsUniqueKeys = processedRequests.map(({ uniqueKey }) => uniqueKey);
                unprocessedRequests = requests
                    .filter(({ uniqueKey }) => !processedRequestsUniqueKeys.includes(uniqueKey))
                    .map(({ method, uniqueKey, url }) => ({ method, uniqueKey, url }));
                break;
            }
            // Exponential backoff
            const delayMillis = Math.floor((1 + Math.random()) * (2 ** i) * minDelayBetweenUnprocessedRequestsRetriesMillis);
            await new Promise((resolve) => setTimeout(resolve, delayMillis));
        }
        const result = { processedRequests, unprocessedRequests };
        return (0, utils_1.cast)((0, utils_1.parseDateFields)(result));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/batch-request-operations/add-requests
     */
    async batchAddRequests(requests, options = {}) {
        const { forefront, maxUnprocessedRequestsRetries = DEFAULT_UNPROCESSED_RETRIES_BATCH_ADD_REQUESTS, maxParallel = DEFAULT_PARALLEL_BATCH_ADD_REQUESTS, minDelayBetweenUnprocessedRequestsRetriesMillis = DEFAULT_MIN_DELAY_BETWEEN_UNPROCESSED_REQUESTS_RETRIES_MILLIS, } = options;
        (0, ow_1.default)(requests, ow_1.default.array.ofType(ow_1.default.object.partialShape({
            id: ow_1.default.undefined,
        })).minLength(1));
        (0, ow_1.default)(forefront, ow_1.default.optional.boolean);
        (0, ow_1.default)(maxUnprocessedRequestsRetries, ow_1.default.optional.number);
        (0, ow_1.default)(maxParallel, ow_1.default.optional.number);
        (0, ow_1.default)(minDelayBetweenUnprocessedRequestsRetriesMillis, ow_1.default.optional.number);
        const executingRequests = new Set();
        const individualResults = [];
        const payloadSizeLimitBytes = consts_1.MAX_PAYLOAD_SIZE_BYTES - Math.ceil(consts_1.MAX_PAYLOAD_SIZE_BYTES * SAFETY_BUFFER_PERCENT);
        // Keep a pool of up to `maxParallel` requests running at once
        let i = 0;
        while (i < requests.length) {
            const slicedRequests = requests.slice(i, i + consts_1.REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION);
            const requestsInBatch = (0, utils_1.sliceArrayByByteLength)(slicedRequests, payloadSizeLimitBytes, i);
            const requestPromise = this._batchAddRequestsWithRetries(requestsInBatch, options);
            executingRequests.add(requestPromise);
            void requestPromise.then((batchAddResult) => {
                executingRequests.delete(requestPromise);
                individualResults.push(batchAddResult);
            });
            if (executingRequests.size >= maxParallel) {
                await Promise.race(executingRequests);
            }
            i += requestsInBatch.length;
        }
        // Get results from remaining operations
        await Promise.all(executingRequests);
        // Combine individual results together
        const result = {
            processedRequests: [],
            unprocessedRequests: [],
        };
        individualResults.forEach(({ processedRequests, unprocessedRequests }) => {
            result.processedRequests.push(...processedRequests);
            result.unprocessedRequests.push(...unprocessedRequests);
        });
        return result;
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/batch-request-operations/delete-requests
     */
    async batchDeleteRequests(requests) {
        (0, ow_1.default)(requests, ow_1.default.array.ofType(ow_1.default.any(ow_1.default.object.partialShape({ id: ow_1.default.string }), ow_1.default.object.partialShape({ uniqueKey: ow_1.default.string }))).minLength(1).maxLength(consts_1.REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION));
        const { data } = await this.httpClient.call({
            url: this._url('requests/batch'),
            method: 'DELETE',
            timeout: this.timeoutMillis,
            data: requests,
            params: this._params({
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request/get-request
     */
    async getRequest(id) {
        (0, ow_1.default)(id, ow_1.default.string);
        const requestOpts = {
            url: this._url(`requests/${id}`),
            method: 'GET',
            timeout: this.timeoutMillis,
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request/update-request
     */
    async updateRequest(request, options = {}) {
        (0, ow_1.default)(request, ow_1.default.object.partialShape({
            id: ow_1.default.string,
        }));
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            forefront: ow_1.default.optional.boolean,
        }));
        const response = await this.httpClient.call({
            url: this._url(`requests/${request.id}`),
            method: 'PUT',
            timeout: this.timeoutMillis,
            data: request,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    async deleteRequest(id) {
        (0, ow_1.default)(id, ow_1.default.string);
        await this.httpClient.call({
            url: this._url(`requests/${id}`),
            method: 'DELETE',
            timeout: this.timeoutMillis,
            params: this._params({
                clientKey: this.clientKey,
            }),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-lock/prolong-request-lock
     */
    async prolongRequestLock(id, options) {
        (0, ow_1.default)(id, ow_1.default.string);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            lockSecs: ow_1.default.number,
            forefront: ow_1.default.optional.boolean,
        }));
        const response = await this.httpClient.call({
            url: this._url(`requests/${id}/lock`),
            method: 'PUT',
            timeout: this.timeoutMillis,
            params: this._params({
                forefront: options.forefront,
                lockSecs: options.lockSecs,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-lock/delete-request-lock
     */
    async deleteRequestLock(id, options = {}) {
        (0, ow_1.default)(id, ow_1.default.string);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            forefront: ow_1.default.optional.boolean,
        }));
        await this.httpClient.call({
            url: this._url(`requests/${id}/lock`),
            method: 'DELETE',
            timeout: this.timeoutMillis,
            params: this._params({
                forefront: options.forefront,
                clientKey: this.clientKey,
            }),
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-collection/list-requests
     */
    async listRequests(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            exclusiveStartId: ow_1.default.optional.string,
        }));
        const response = await this.httpClient.call({
            url: this._url('requests'),
            method: 'GET',
            timeout: this.timeoutMillis,
            params: this._params({
                limit: options.limit,
                exclusiveStartId: options.exclusiveStartId,
                clientKey: this.clientKey,
            }),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/request-collection/list-requests
     *
     * Usage:
     * for await (const { items } of client.paginateRequests({ limit: 10 })) {
     *   items.forEach((request) => console.log(request));
     * }
     */
    paginateRequests(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            maxPageLimit: ow_1.default.optional.number,
            exclusiveStartId: ow_1.default.optional.string,
        }));
        const { limit, exclusiveStartId, maxPageLimit = DEFAULT_REQUEST_QUEUE_REQUEST_PAGE_LIMIT } = options;
        return new utils_1.PaginationIterator({
            getPage: this.listRequests.bind(this),
            limit,
            exclusiveStartId,
            maxPageLimit,
        });
    }
}
exports.RequestQueueClient = RequestQueueClient;
//# sourceMappingURL=request_queue.js.map

/***/ }),

/***/ 898:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RequestQueueCollectionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_collection_client_1 = __nccwpck_require__(8755);
class RequestQueueCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'request-queues',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-collection/get-list-of-request-queues
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            unnamed: ow_1.default.optional.boolean,
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/request-queues/queue-collection/create-request-queue
     */
    async getOrCreate(name) {
        (0, ow_1.default)(name, ow_1.default.optional.string);
        return this._getOrCreate(name);
    }
}
exports.RequestQueueCollectionClient = RequestQueueCollectionClient;
//# sourceMappingURL=request_queue_collection.js.map

/***/ }),

/***/ 4375:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RunClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const dataset_1 = __nccwpck_require__(3918);
const key_value_store_1 = __nccwpck_require__(5081);
const log_1 = __nccwpck_require__(740);
const request_queue_1 = __nccwpck_require__(6695);
const resource_client_1 = __nccwpck_require__(6150);
const utils_1 = __nccwpck_require__(8681);
class RunClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            ...options,
            resourcePath: options.resourcePath || 'actor-runs',
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object/get-run
     */
    async get(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            waitForFinish: ow_1.default.optional.number,
        }));
        return this._get(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/abort-run/abort-run
     */
    async abort(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            gracefully: ow_1.default.optional.boolean,
        }));
        const response = await this.httpClient.call({
            url: this._url('abort'),
            method: 'POST',
            params: this._params(options),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/delete-run/delete-run
     */
    async delete() {
        return this._delete();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/metamorph-run/metamorph-run
     */
    async metamorph(targetActorId, input, options = {}) {
        (0, ow_1.default)(targetActorId, ow_1.default.string);
        // input can be anything, pointless to validate
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            contentType: ow_1.default.optional.string,
            build: ow_1.default.optional.string,
        }));
        const safeTargetActorId = this._toSafeId(targetActorId);
        const params = {
            targetActorId: safeTargetActorId,
            build: options.build,
        };
        const request = {
            url: this._url('metamorph'),
            method: 'POST',
            data: input,
            params: this._params(params),
            // Apify internal property. Tells the request serialization interceptor
            // to stringify functions to JSON, instead of omitting them.
            // TODO: remove this ts-expect-error once we have defined custom Apify axios configs
            // @ts-expect-error Custom Apify property
            stringifyFunctions: true,
        };
        if (options.contentType) {
            request.headers = {
                'content-type': options.contentType,
            };
        }
        const response = await this.httpClient.call(request);
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/reboot-run/reboot-run
     */
    async reboot() {
        const request = {
            url: this._url('reboot'),
            method: 'POST',
        };
        const response = await this.httpClient.call(request);
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/resurrect-run/resurrect-run
     */
    async resurrect(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            memory: ow_1.default.optional.number,
            timeout: ow_1.default.optional.number,
        }));
        const response = await this.httpClient.call({
            url: this._url('resurrect'),
            method: 'POST',
            params: this._params(options),
        });
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Returns a promise that resolves with the finished Run object when the provided actor run finishes
     * or with the unfinished Run object when the `waitSecs` timeout lapses. The promise is NOT rejected
     * based on run status. You can inspect the `status` property of the Run object to find out its status.
     *
     * The difference between this function and the `waitForFinish` parameter of the `get` method
     * is the fact that this function can wait indefinitely. Its use is preferable to the
     * `waitForFinish` parameter alone, which it uses internally.
     *
     * This is useful when you need to chain actor executions. Similar effect can be achieved
     * by using webhooks, so be sure to review which technique fits your use-case better.
     */
    async waitForFinish(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            waitSecs: ow_1.default.optional.number,
        }));
        return this._waitForFinish(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     *
     * This also works through `actorClient.lastRun().dataset()`.
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
     */
    dataset() {
        return new dataset_1.DatasetClient(this._subResourceOptions({
            resourcePath: 'dataset',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     *
     * This also works through `actorClient.lastRun().keyValueStore()`.
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
     */
    keyValueStore() {
        return new key_value_store_1.KeyValueStoreClient(this._subResourceOptions({
            resourcePath: 'key-value-store',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     *
     * This also works through `actorClient.lastRun().requestQueue()`.
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
     */
    requestQueue() {
        return new request_queue_1.RequestQueueClient(this._subResourceOptions({
            resourcePath: 'request-queue',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-runs/run-object-and-its-storages
     *
     * This also works through `actorClient.lastRun().log()`.
     * https://docs.apify.com/api/v2#/reference/actors/last-run-object-and-its-storages
     */
    log() {
        return new log_1.LogClient(this._subResourceOptions({
            resourcePath: 'log',
        }));
    }
}
exports.RunClient = RunClient;
//# sourceMappingURL=run.js.map

/***/ }),

/***/ 9074:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RunCollectionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const consts_1 = __nccwpck_require__(9582);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_collection_client_1 = __nccwpck_require__(8755);
class RunCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'runs',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actors/run-collection/get-list-of-runs
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
            status: ow_1.default.optional.string.oneOf(Object.values(consts_1.ACT_JOB_STATUSES)),
        }));
        return this._list(options);
    }
}
exports.RunCollectionClient = RunCollectionClient;
//# sourceMappingURL=run_collection.js.map

/***/ }),

/***/ 8953:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScheduleActions = exports.ScheduleClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_client_1 = __nccwpck_require__(6150);
const utils_1 = __nccwpck_require__(8681);
class ScheduleClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'schedules',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-object/get-schedule
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-object/update-schedule
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-object/delete-schedule
     */
    async delete() {
        return this._delete();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedule-log/get-schedule-log
     */
    async getLog() {
        const requestOpts = {
            url: this._url('log'),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
}
exports.ScheduleClient = ScheduleClient;
var ScheduleActions;
(function (ScheduleActions) {
    ScheduleActions["RunActor"] = "RUN_ACTOR";
    ScheduleActions["RunActorTask"] = "RUN_ACTOR_TASK";
})(ScheduleActions || (exports.ScheduleActions = ScheduleActions = {}));
//# sourceMappingURL=schedule.js.map

/***/ }),

/***/ 3896:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ScheduleCollectionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_collection_client_1 = __nccwpck_require__(8755);
class ScheduleCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'schedules',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedules-collection/get-list-of-schedules
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/schedules/schedules-collection/create-schedule
     */
    async create(schedule) {
        (0, ow_1.default)(schedule, ow_1.default.optional.object);
        return this._create(schedule);
    }
}
exports.ScheduleCollectionClient = ScheduleCollectionClient;
//# sourceMappingURL=schedule_collection.js.map

/***/ }),

/***/ 6378:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StoreCollectionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_collection_client_1 = __nccwpck_require__(8755);
class StoreCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'store',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2/#/reference/store/store-actors-collection/get-list-of-actors-in-store
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            search: ow_1.default.optional.string,
            sortBy: ow_1.default.optional.string,
            category: ow_1.default.optional.string,
            username: ow_1.default.optional.string,
            pricingModel: ow_1.default.optional.string,
        }));
        return this._list(options);
    }
}
exports.StoreCollectionClient = StoreCollectionClient;
//# sourceMappingURL=store_collection.js.map

/***/ }),

/***/ 3169:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const consts_1 = __nccwpck_require__(9582);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const run_1 = __nccwpck_require__(4375);
const run_collection_1 = __nccwpck_require__(9074);
const webhook_collection_1 = __nccwpck_require__(9010);
const resource_client_1 = __nccwpck_require__(6150);
const utils_1 = __nccwpck_require__(8681);
class TaskClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'actor-tasks',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-object/get-task
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-object/update-task
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-object/delete-task
     */
    async delete() {
        return this._delete();
    }
    /**
     * Starts a task and immediately returns the Run object.
     * https://docs.apify.com/api/v2#/reference/actor-tasks/run-collection/run-task
     */
    async start(input, options = {}) {
        (0, ow_1.default)(input, ow_1.default.optional.object);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            memory: ow_1.default.optional.number,
            timeout: ow_1.default.optional.number,
            waitForFinish: ow_1.default.optional.number,
            webhooks: ow_1.default.optional.array.ofType(ow_1.default.object),
            maxItems: ow_1.default.optional.number.not.negative,
        }));
        const { waitForFinish, timeout, memory, build, maxItems } = options;
        const params = {
            waitForFinish,
            timeout,
            memory,
            build,
            webhooks: (0, utils_1.stringifyWebhooksToBase64)(options.webhooks),
            maxItems,
        };
        const request = {
            url: this._url('runs'),
            method: 'POST',
            data: input,
            params: this._params(params),
            // Apify internal property. Tells the request serialization interceptor
            // to stringify functions to JSON, instead of omitting them.
            stringifyFunctions: true,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await this.httpClient.call(request);
        return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
    }
    /**
     * Starts a task and waits for it to finish before returning the Run object.
     * It waits indefinitely, unless the `waitSecs` option is provided.
     * https://docs.apify.com/api/v2#/reference/actor-tasks/run-collection/run-task
     */
    async call(input, options = {}) {
        (0, ow_1.default)(input, ow_1.default.optional.object);
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            build: ow_1.default.optional.string,
            memory: ow_1.default.optional.number,
            timeout: ow_1.default.optional.number.not.negative,
            waitSecs: ow_1.default.optional.number.not.negative,
            webhooks: ow_1.default.optional.array.ofType(ow_1.default.object),
            maxItems: ow_1.default.optional.number.not.negative,
        }));
        const { waitSecs, ...startOptions } = options;
        const { id } = await this.start(input, startOptions);
        // Calling root client because we need access to top level API.
        // Creating a new instance of RunClient here would only allow
        // setting it up as a nested route under task API.
        return this.apifyClient.run(id).waitForFinish({ waitSecs });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-input-object/get-task-input
     */
    async getInput() {
        const requestOpts = {
            url: this._url('input'),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)(response.data);
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-input-object/update-task-input
     */
    async updateInput(newFields) {
        const response = await this.httpClient.call({
            url: this._url('input'),
            method: 'PUT',
            params: this._params(),
            data: newFields,
        });
        return (0, utils_1.cast)(response.data);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/last-run-object-and-its-storages
     */
    lastRun(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            status: ow_1.default.optional.string.oneOf(Object.values(consts_1.ACT_JOB_STATUSES)),
            origin: ow_1.default.optional.string.oneOf(Object.values(consts_1.META_ORIGINS)),
        }));
        return new run_1.RunClient(this._subResourceOptions({
            id: 'last',
            params: this._params(options),
            resourcePath: 'runs',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/run-collection
     */
    runs() {
        return new run_collection_1.RunCollectionClient(this._subResourceOptions({
            resourcePath: 'runs',
        }));
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/webhook-collection
     */
    webhooks() {
        return new webhook_collection_1.WebhookCollectionClient(this._subResourceOptions());
    }
}
exports.TaskClient = TaskClient;
//# sourceMappingURL=task.js.map

/***/ }),

/***/ 2160:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaskCollectionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_collection_client_1 = __nccwpck_require__(8755);
class TaskCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'actor-tasks',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-collection/get-list-of-tasks
     * @param {object} [options]
     * @param {number} [options.limit]
     * @param {number} [options.offset]
     * @param {boolean} [options.desc]
     * @return {Promise<PaginationList>}
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/actor-tasks/task-collection/create-task
     */
    async create(task) {
        (0, ow_1.default)(task, ow_1.default.object);
        return this._create(task);
    }
}
exports.TaskCollectionClient = TaskCollectionClient;
//# sourceMappingURL=task_collection.js.map

/***/ }),

/***/ 5227:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PlatformFeature = exports.UserClient = void 0;
const resource_client_1 = __nccwpck_require__(6150);
const utils_1 = __nccwpck_require__(8681);
class UserClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'users',
            ...options,
        });
    }
    /**
     * Depending on whether ApifyClient was created with a token,
     * the method will either return public or private user data.
     * https://docs.apify.com/api/v2#/reference/users
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2/#/reference/users/monthly-usage
     */
    async monthlyUsage() {
        const requestOpts = {
            url: this._url('usage/monthly'),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data), 
            // Convert  monthlyUsage.dailyServiceUsages[].date to Date (by default it's ignored by parseDateFields)
            /* shouldParseField = */ (key) => key === 'date'));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * https://docs.apify.com/api/v2/#/reference/users/account-and-usage-limits
     */
    async limits() {
        const requestOpts = {
            url: this._url('limits'),
            method: 'GET',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(requestOpts);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
}
exports.UserClient = UserClient;
var PlatformFeature;
(function (PlatformFeature) {
    PlatformFeature["Actors"] = "ACTORS";
    PlatformFeature["Storage"] = "STORAGE";
    PlatformFeature["ProxySERPS"] = "PROXY_SERPS";
    PlatformFeature["Scheduler"] = "SCHEDULER";
    PlatformFeature["Webhooks"] = "WEBHOOKS";
    PlatformFeature["Proxy"] = "PROXY";
    PlatformFeature["ProxyExternalAccess"] = "PROXY_EXTERNAL_ACCESS";
})(PlatformFeature || (exports.PlatformFeature = PlatformFeature = {}));
//# sourceMappingURL=user.js.map

/***/ }),

/***/ 3991:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const webhook_dispatch_collection_1 = __nccwpck_require__(135);
const resource_client_1 = __nccwpck_require__(6150);
const utils_1 = __nccwpck_require__(8681);
class WebhookClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'webhooks',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-object/get-webhook
     */
    async get() {
        return this._get();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-object/update-webhook
     */
    async update(newFields) {
        (0, ow_1.default)(newFields, ow_1.default.object);
        return this._update(newFields);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-object/delete-webhook
     */
    async delete() {
        return this._delete();
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-test/test-webhook
     */
    async test() {
        const request = {
            url: this._url('test'),
            method: 'POST',
            params: this._params(),
        };
        try {
            const response = await this.httpClient.call(request);
            return (0, utils_1.cast)((0, utils_1.parseDateFields)((0, utils_1.pluckData)(response.data)));
        }
        catch (err) {
            (0, utils_1.catchNotFoundOrThrow)(err);
        }
        return undefined;
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/dispatches-collection
     */
    dispatches() {
        return new webhook_dispatch_collection_1.WebhookDispatchCollectionClient(this._subResourceOptions({
            resourcePath: 'dispatches',
        }));
    }
}
exports.WebhookClient = WebhookClient;
//# sourceMappingURL=webhook.js.map

/***/ }),

/***/ 9010:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookCollectionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_collection_client_1 = __nccwpck_require__(8755);
class WebhookCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'webhooks',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-collection/get-list-of-webhooks
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhooks/webhook-collection/create-webhook
     */
    async create(webhook) {
        (0, ow_1.default)(webhook, ow_1.default.optional.object);
        return this._create(webhook);
    }
}
exports.WebhookCollectionClient = WebhookCollectionClient;
//# sourceMappingURL=webhook_collection.js.map

/***/ }),

/***/ 3552:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookDispatchStatus = exports.WebhookDispatchClient = void 0;
const resource_client_1 = __nccwpck_require__(6150);
class WebhookDispatchClient extends resource_client_1.ResourceClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'webhook-dispatches',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhook-dispatches/webhook-dispatch-object/get-webhook-dispatch
     */
    async get() {
        return this._get();
    }
}
exports.WebhookDispatchClient = WebhookDispatchClient;
var WebhookDispatchStatus;
(function (WebhookDispatchStatus) {
    WebhookDispatchStatus["Active"] = "ACTIVE";
    WebhookDispatchStatus["Succeeded"] = "SUCCEEDED";
    WebhookDispatchStatus["Failed"] = "FAILED";
})(WebhookDispatchStatus || (exports.WebhookDispatchStatus = WebhookDispatchStatus = {}));
//# sourceMappingURL=webhook_dispatch.js.map

/***/ }),

/***/ 135:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WebhookDispatchCollectionClient = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const resource_collection_client_1 = __nccwpck_require__(8755);
class WebhookDispatchCollectionClient extends resource_collection_client_1.ResourceCollectionClient {
    /**
     * @hidden
     */
    constructor(options) {
        super({
            resourcePath: 'webhook-dispatches',
            ...options,
        });
    }
    /**
     * https://docs.apify.com/api/v2#/reference/webhook-dispatches/webhook-dispatches-collection/get-list-of-webhook-dispatches
     */
    async list(options = {}) {
        (0, ow_1.default)(options, ow_1.default.object.exactShape({
            limit: ow_1.default.optional.number,
            offset: ow_1.default.optional.number,
            desc: ow_1.default.optional.boolean,
        }));
        return this._list(options);
    }
}
exports.WebhookDispatchCollectionClient = WebhookDispatchCollectionClient;
//# sourceMappingURL=webhook_dispatch_collection.js.map

/***/ }),

/***/ 7509:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Statistics = void 0;
const tslib_1 = __nccwpck_require__(1860);
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
class Statistics {
    constructor() {
        /**
         * Number of Apify client function calls
         */
        Object.defineProperty(this, "calls", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        /**
         * Number of Apify API requests
         */
        Object.defineProperty(this, "requests", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        /**
         * Number of times the API returned 429 error. Errors on first attempt are
         * counted at index 0. First retry error counts are on index 1 and so on.
         */
        Object.defineProperty(this, "rateLimitErrors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
    }
    addRateLimitError(attempt) {
        (0, ow_1.default)(attempt, ow_1.default.number.greaterThan(0));
        // attempt is never 0,
        // but we don't want index 0 empty
        const index = attempt - 1;
        this._fillBlanksWithZeroes(index);
        this.rateLimitErrors[index]++;
    }
    /**
     * Removes the necessity to pre-initialize array with correct
     * number of zeroes by dynamically filling the empty indexes
     * when necessary.
     */
    _fillBlanksWithZeroes(inclusiveIndex) {
        if (this.rateLimitErrors.length <= inclusiveIndex) {
            for (let k = 0; k <= inclusiveIndex; k++) {
                if (typeof this.rateLimitErrors[k] !== 'number') {
                    this.rateLimitErrors[k] = 0;
                }
            }
        }
    }
}
exports.Statistics = Statistics;
//# sourceMappingURL=statistics.js.map

/***/ }),

/***/ 8681:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.cast = exports.PaginationIterator = exports.getVersionData = exports.isStream = exports.isBuffer = exports.isNode = exports.sliceArrayByByteLength = exports.maybeGzipValue = exports.stringifyWebhooksToBase64 = exports.parseDateFields = exports.catchNotFoundOrThrow = exports.pluckData = void 0;
const tslib_1 = __nccwpck_require__(1860);
const util_1 = tslib_1.__importDefault(__nccwpck_require__(9023));
const zlib_1 = tslib_1.__importDefault(__nccwpck_require__(3106));
const ow_1 = tslib_1.__importDefault(__nccwpck_require__(9819));
const NOT_FOUND_STATUS_CODE = 404;
const RECORD_NOT_FOUND_TYPE = 'record-not-found';
const RECORD_OR_TOKEN_NOT_FOUND_TYPE = 'record-or-token-not-found';
const MIN_GZIP_BYTES = 1024;
/**
 * Returns object's 'data' property or throws if parameter is not an object,
 * or an object without a 'data' property.
 */
function pluckData(obj) {
    if (typeof obj === 'object' && obj) {
        if (typeof obj.data !== 'undefined')
            return obj.data;
    }
    throw new Error(`Expected response object with a "data" property, but received: ${obj}`);
}
exports.pluckData = pluckData;
/**
 * If given HTTP error has NOT_FOUND_STATUS_CODE status code then returns undefined.
 * Otherwise rethrows error.
 */
function catchNotFoundOrThrow(err) {
    const isNotFoundStatus = err.statusCode === NOT_FOUND_STATUS_CODE;
    const isNotFoundMessage = err.type === RECORD_NOT_FOUND_TYPE || err.type === RECORD_OR_TOKEN_NOT_FOUND_TYPE || err.httpMethod === 'head';
    const isNotFoundError = isNotFoundStatus && isNotFoundMessage;
    if (!isNotFoundError)
        throw err;
}
exports.catchNotFoundOrThrow = catchNotFoundOrThrow;
/**
 * Traverses JSON structure and converts fields that end with "At" to a Date object (fields such as "modifiedAt" or
 * "createdAt").
 *
 * If you want parse other fields as well, you can provide a custom matcher function shouldParseField(). This
 * admittedly awkward approach allows this function to be reused for various purposes without introducing potential
 * breaking changes.
 *
 * If the field cannot be converted to Date, it is left as is.
 */
function parseDateFields(input, shouldParseField = null, depth = 0) {
    // Don't go too deep to avoid stack overflows (especially if there is a circular reference). The depth of 3
    // corresponds to obj.data.someArrayField.[x].field and should be generally enough.
    // TODO: Consider removing this limitation. It might came across as an annoying surprise as it's not communicated.
    if (depth > 3) {
        return input;
    }
    if (Array.isArray(input))
        return input.map((child) => parseDateFields(child, shouldParseField, depth + 1));
    if (!input || typeof input !== 'object')
        return input;
    return Object.entries(input).reduce((output, [k, v]) => {
        const isValObject = !!v && typeof v === 'object';
        if (k.endsWith('At') || (shouldParseField && shouldParseField(k))) {
            if (v) {
                const d = new Date(v);
                output[k] = Number.isNaN(d.getTime()) ? v : d;
            }
            else {
                output[k] = v;
            }
        }
        else if (isValObject || Array.isArray(v)) {
            output[k] = parseDateFields(v, shouldParseField, depth + 1);
        }
        else {
            output[k] = v;
        }
        return output;
    }, {});
}
exports.parseDateFields = parseDateFields;
/**
 * Helper function that converts array of webhooks to base64 string
 */
function stringifyWebhooksToBase64(webhooks) {
    if (!webhooks)
        return;
    const webhooksJson = JSON.stringify(webhooks);
    if (isNode()) {
        return Buffer.from(webhooksJson, 'utf8').toString('base64');
    }
    const encoder = new TextEncoder();
    const uint8Array = encoder.encode(webhooksJson);
    return btoa(String.fromCharCode(...uint8Array));
}
exports.stringifyWebhooksToBase64 = stringifyWebhooksToBase64;
let gzipPromise;
if (isNode())
    gzipPromise = util_1.default.promisify(zlib_1.default.gzip);
/**
 * Gzip provided value, otherwise returns undefined.
 */
async function maybeGzipValue(value) {
    if (!isNode())
        return;
    if (typeof value !== 'string' && !Buffer.isBuffer(value))
        return;
    // Request compression is not that important so let's
    // skip it instead of throwing for unsupported types.
    const areDataLargeEnough = Buffer.byteLength(value) >= MIN_GZIP_BYTES;
    if (areDataLargeEnough) {
        return gzipPromise(value);
    }
    return undefined;
}
exports.maybeGzipValue = maybeGzipValue;
/**
 * Helper function slice the items from array to fit the max byte length.
 */
function sliceArrayByByteLength(array, maxByteLength, startIndex) {
    const stringByteLength = (str) => (isNode() ? Buffer.byteLength(str) : new Blob([str]).size);
    const arrayByteLength = stringByteLength(JSON.stringify(array));
    if (arrayByteLength < maxByteLength)
        return array;
    const slicedArray = [];
    let byteLength = 2; // 2 bytes for the empty array []
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        const itemByteSize = stringByteLength(JSON.stringify(item));
        if (itemByteSize > maxByteLength) {
            throw new Error(`RequestQueueClient.batchAddRequests: The size of the request with index: ${startIndex + i} `
                + `exceeds the maximum allowed size (${maxByteLength} bytes).`);
        }
        if (byteLength + itemByteSize >= maxByteLength)
            break;
        byteLength += itemByteSize;
        slicedArray.push(item);
    }
    return slicedArray;
}
exports.sliceArrayByByteLength = sliceArrayByByteLength;
function isNode() {
    return !!(typeof process !== 'undefined' && process.versions && process.versions.node);
}
exports.isNode = isNode;
function isBuffer(value) {
    return ow_1.default.isValid(value, ow_1.default.any(ow_1.default.buffer, ow_1.default.arrayBuffer, ow_1.default.typedArray));
}
exports.isBuffer = isBuffer;
function isStream(value) {
    return ow_1.default.isValid(value, ow_1.default.object.hasKeys('on', 'pipe'));
}
exports.isStream = isStream;
function getVersionData() {
    if (typeof BROWSER_BUILD !== 'undefined') {
        return { version: VERSION };
    }
    // eslint-disable-next-line
    return __nccwpck_require__(3009);
}
exports.getVersionData = getVersionData;
/**
 * Helper class to create async iterators from paginated list endpoints with exclusive start key.
 */
class PaginationIterator {
    constructor(options) {
        Object.defineProperty(this, "maxPageLimit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getPage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "limit", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "exclusiveStartId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.maxPageLimit = options.maxPageLimit;
        this.limit = options.limit;
        this.exclusiveStartId = options.exclusiveStartId;
        this.getPage = options.getPage;
    }
    async *[Symbol.asyncIterator]() {
        let nextPageExclusiveStartId;
        let iterateItemCount = 0;
        while (true) {
            const pageLimit = this.limit ? Math.min(this.maxPageLimit, this.limit - iterateItemCount) : this.maxPageLimit;
            const pageExclusiveStartId = nextPageExclusiveStartId || this.exclusiveStartId;
            const page = await this.getPage({
                limit: pageLimit,
                exclusiveStartId: pageExclusiveStartId,
            });
            // There are no more pages to iterate
            if (page.items.length === 0)
                return;
            yield page;
            iterateItemCount += page.items.length;
            // Limit reached stopping to iterate
            if (this.limit && iterateItemCount >= this.limit)
                return;
            nextPageExclusiveStartId = page.items[page.items.length - 1].id;
        }
    }
}
exports.PaginationIterator = PaginationIterator;
function cast(input) {
    return input;
}
exports.cast = cast;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 5195:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Packages
var retrier = __nccwpck_require__(5546);

function retry(fn, opts) {
  function run(resolve, reject) {
    var options = opts || {};
    var op;

    // Default `randomize` to true
    if (!('randomize' in options)) {
      options.randomize = true;
    }

    op = retrier.operation(options);

    // We allow the user to abort retrying
    // this makes sense in the cases where
    // knowledge is obtained that retrying
    // would be futile (e.g.: auth errors)

    function bail(err) {
      reject(err || new Error('Aborted'));
    }

    function onError(err, num) {
      if (err.bail) {
        bail(err);
        return;
      }

      if (!op.retry(err)) {
        reject(op.mainError());
      } else if (options.onRetry) {
        options.onRetry(err, num);
      }
    }

    function runAttempt(num) {
      var val;

      try {
        val = fn(bail, num);
      } catch (err) {
        onError(err, num);
        return;
      }

      Promise.resolve(val)
        .then(resolve)
        .catch(function catchIt(err) {
          onError(err, num);
        });
    }

    op.attempt(runAttempt);
  }

  return new Promise(run);
}

module.exports = retry;


/***/ }),

/***/ 1324:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports =
{
  parallel      : __nccwpck_require__(3857),
  serial        : __nccwpck_require__(1054),
  serialOrdered : __nccwpck_require__(3961)
};


/***/ }),

/***/ 4818:
/***/ ((module) => {

// API
module.exports = abort;

/**
 * Aborts leftover active jobs
 *
 * @param {object} state - current state object
 */
function abort(state)
{
  Object.keys(state.jobs).forEach(clean.bind(state));

  // reset leftover jobs
  state.jobs = {};
}

/**
 * Cleans up leftover job by invoking abort function for the provided job id
 *
 * @this  state
 * @param {string|number} key - job id to abort
 */
function clean(key)
{
  if (typeof this.jobs[key] == 'function')
  {
    this.jobs[key]();
  }
}


/***/ }),

/***/ 8452:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var defer = __nccwpck_require__(9200);

// API
module.exports = async;

/**
 * Runs provided callback asynchronously
 * even if callback itself is not
 *
 * @param   {function} callback - callback to invoke
 * @returns {function} - augmented callback
 */
function async(callback)
{
  var isAsync = false;

  // check if async happened
  defer(function() { isAsync = true; });

  return function async_callback(err, result)
  {
    if (isAsync)
    {
      callback(err, result);
    }
    else
    {
      defer(function nextTick_callback()
      {
        callback(err, result);
      });
    }
  };
}


/***/ }),

/***/ 9200:
/***/ ((module) => {

module.exports = defer;

/**
 * Runs provided function on next iteration of the event loop
 *
 * @param {function} fn - function to run
 */
function defer(fn)
{
  var nextTick = typeof setImmediate == 'function'
    ? setImmediate
    : (
      typeof process == 'object' && typeof process.nextTick == 'function'
      ? process.nextTick
      : null
    );

  if (nextTick)
  {
    nextTick(fn);
  }
  else
  {
    setTimeout(fn, 0);
  }
}


/***/ }),

/***/ 4902:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var async = __nccwpck_require__(8452)
  , abort = __nccwpck_require__(4818)
  ;

// API
module.exports = iterate;

/**
 * Iterates over each job object
 *
 * @param {array|object} list - array or object (named list) to iterate over
 * @param {function} iterator - iterator to run
 * @param {object} state - current job status
 * @param {function} callback - invoked when all elements processed
 */
function iterate(list, iterator, state, callback)
{
  // store current index
  var key = state['keyedList'] ? state['keyedList'][state.index] : state.index;

  state.jobs[key] = runJob(iterator, key, list[key], function(error, output)
  {
    // don't repeat yourself
    // skip secondary callbacks
    if (!(key in state.jobs))
    {
      return;
    }

    // clean up jobs
    delete state.jobs[key];

    if (error)
    {
      // don't process rest of the results
      // stop still active jobs
      // and reset the list
      abort(state);
    }
    else
    {
      state.results[key] = output;
    }

    // return salvaged results
    callback(error, state.results);
  });
}

/**
 * Runs iterator over provided job element
 *
 * @param   {function} iterator - iterator to invoke
 * @param   {string|number} key - key/index of the element in the list of jobs
 * @param   {mixed} item - job description
 * @param   {function} callback - invoked after iterator is done with the job
 * @returns {function|mixed} - job abort function or something else
 */
function runJob(iterator, key, item, callback)
{
  var aborter;

  // allow shortcut if iterator expects only two arguments
  if (iterator.length == 2)
  {
    aborter = iterator(item, async(callback));
  }
  // otherwise go with full three arguments
  else
  {
    aborter = iterator(item, key, async(callback));
  }

  return aborter;
}


/***/ }),

/***/ 1721:
/***/ ((module) => {

// API
module.exports = state;

/**
 * Creates initial state object
 * for iteration over list
 *
 * @param   {array|object} list - list to iterate over
 * @param   {function|null} sortMethod - function to use for keys sort,
 *                                     or `null` to keep them as is
 * @returns {object} - initial state object
 */
function state(list, sortMethod)
{
  var isNamedList = !Array.isArray(list)
    , initState =
    {
      index    : 0,
      keyedList: isNamedList || sortMethod ? Object.keys(list) : null,
      jobs     : {},
      results  : isNamedList ? {} : [],
      size     : isNamedList ? Object.keys(list).length : list.length
    }
    ;

  if (sortMethod)
  {
    // sort array keys based on it's values
    // sort object's keys just on own merit
    initState.keyedList.sort(isNamedList ? sortMethod : function(a, b)
    {
      return sortMethod(list[a], list[b]);
    });
  }

  return initState;
}


/***/ }),

/***/ 3351:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var abort = __nccwpck_require__(4818)
  , async = __nccwpck_require__(8452)
  ;

// API
module.exports = terminator;

/**
 * Terminates jobs in the attached state context
 *
 * @this  AsyncKitState#
 * @param {function} callback - final callback to invoke after termination
 */
function terminator(callback)
{
  if (!Object.keys(this.jobs).length)
  {
    return;
  }

  // fast forward iteration index
  this.index = this.size;

  // abort jobs
  abort(this);

  // send back results we have so far
  async(callback)(null, this.results);
}


/***/ }),

/***/ 3857:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var iterate    = __nccwpck_require__(4902)
  , initState  = __nccwpck_require__(1721)
  , terminator = __nccwpck_require__(3351)
  ;

// Public API
module.exports = parallel;

/**
 * Runs iterator over provided array elements in parallel
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function parallel(list, iterator, callback)
{
  var state = initState(list);

  while (state.index < (state['keyedList'] || list).length)
  {
    iterate(list, iterator, state, function(error, result)
    {
      if (error)
      {
        callback(error, result);
        return;
      }

      // looks like it's the last one
      if (Object.keys(state.jobs).length === 0)
      {
        callback(null, state.results);
        return;
      }
    });

    state.index++;
  }

  return terminator.bind(state, callback);
}


/***/ }),

/***/ 1054:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var serialOrdered = __nccwpck_require__(3961);

// Public API
module.exports = serial;

/**
 * Runs iterator over provided array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function serial(list, iterator, callback)
{
  return serialOrdered(list, iterator, null, callback);
}


/***/ }),

/***/ 3961:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var iterate    = __nccwpck_require__(4902)
  , initState  = __nccwpck_require__(1721)
  , terminator = __nccwpck_require__(3351)
  ;

// Public API
module.exports = serialOrdered;
// sorting helpers
module.exports.ascending  = ascending;
module.exports.descending = descending;

/**
 * Runs iterator over provided sorted array elements in series
 *
 * @param   {array|object} list - array or object (named list) to iterate over
 * @param   {function} iterator - iterator to run
 * @param   {function} sortMethod - custom sort function
 * @param   {function} callback - invoked when all elements processed
 * @returns {function} - jobs terminator
 */
function serialOrdered(list, iterator, sortMethod, callback)
{
  var state = initState(list, sortMethod);

  iterate(list, iterator, state, function iteratorHandler(error, result)
  {
    if (error)
    {
      callback(error, result);
      return;
    }

    state.index++;

    // are we there yet?
    if (state.index < (state['keyedList'] || list).length)
    {
      iterate(list, iterator, state, iteratorHandler);
      return;
    }

    // done here
    callback(null, state.results);
  });

  return terminator.bind(state, callback);
}

/*
 * -- Sort methods
 */

/**
 * sort helper to sort array elements in ascending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */
function ascending(a, b)
{
  return a < b ? -1 : a > b ? 1 : 0;
}

/**
 * sort helper to sort array elements in descending order
 *
 * @param   {mixed} a - an item to compare
 * @param   {mixed} b - an item to compare
 * @returns {number} - comparison result
 */
function descending(a, b)
{
  return -1 * ascending(a, b);
}


/***/ }),

/***/ 4060:
/***/ ((module) => {



const callsites = () => {
	const _prepareStackTrace = Error.prepareStackTrace;
	Error.prepareStackTrace = (_, stack) => stack;
	const stack = new Error().stack.slice(1);
	Error.prepareStackTrace = _prepareStackTrace;
	return stack;
};

module.exports = callsites;
// TODO: Remove this for the next major release
module.exports["default"] = callsites;


/***/ }),

/***/ 5630:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var util = __nccwpck_require__(9023);
var Stream = (__nccwpck_require__(2203).Stream);
var DelayedStream = __nccwpck_require__(2710);

module.exports = CombinedStream;
function CombinedStream() {
  this.writable = false;
  this.readable = true;
  this.dataSize = 0;
  this.maxDataSize = 2 * 1024 * 1024;
  this.pauseStreams = true;

  this._released = false;
  this._streams = [];
  this._currentStream = null;
  this._insideLoop = false;
  this._pendingNext = false;
}
util.inherits(CombinedStream, Stream);

CombinedStream.create = function(options) {
  var combinedStream = new this();

  options = options || {};
  for (var option in options) {
    combinedStream[option] = options[option];
  }

  return combinedStream;
};

CombinedStream.isStreamLike = function(stream) {
  return (typeof stream !== 'function')
    && (typeof stream !== 'string')
    && (typeof stream !== 'boolean')
    && (typeof stream !== 'number')
    && (!Buffer.isBuffer(stream));
};

CombinedStream.prototype.append = function(stream) {
  var isStreamLike = CombinedStream.isStreamLike(stream);

  if (isStreamLike) {
    if (!(stream instanceof DelayedStream)) {
      var newStream = DelayedStream.create(stream, {
        maxDataSize: Infinity,
        pauseStream: this.pauseStreams,
      });
      stream.on('data', this._checkDataSize.bind(this));
      stream = newStream;
    }

    this._handleErrors(stream);

    if (this.pauseStreams) {
      stream.pause();
    }
  }

  this._streams.push(stream);
  return this;
};

CombinedStream.prototype.pipe = function(dest, options) {
  Stream.prototype.pipe.call(this, dest, options);
  this.resume();
  return dest;
};

CombinedStream.prototype._getNext = function() {
  this._currentStream = null;

  if (this._insideLoop) {
    this._pendingNext = true;
    return; // defer call
  }

  this._insideLoop = true;
  try {
    do {
      this._pendingNext = false;
      this._realGetNext();
    } while (this._pendingNext);
  } finally {
    this._insideLoop = false;
  }
};

CombinedStream.prototype._realGetNext = function() {
  var stream = this._streams.shift();


  if (typeof stream == 'undefined') {
    this.end();
    return;
  }

  if (typeof stream !== 'function') {
    this._pipeNext(stream);
    return;
  }

  var getStream = stream;
  getStream(function(stream) {
    var isStreamLike = CombinedStream.isStreamLike(stream);
    if (isStreamLike) {
      stream.on('data', this._checkDataSize.bind(this));
      this._handleErrors(stream);
    }

    this._pipeNext(stream);
  }.bind(this));
};

CombinedStream.prototype._pipeNext = function(stream) {
  this._currentStream = stream;

  var isStreamLike = CombinedStream.isStreamLike(stream);
  if (isStreamLike) {
    stream.on('end', this._getNext.bind(this));
    stream.pipe(this, {end: false});
    return;
  }

  var value = stream;
  this.write(value);
  this._getNext();
};

CombinedStream.prototype._handleErrors = function(stream) {
  var self = this;
  stream.on('error', function(err) {
    self._emitError(err);
  });
};

CombinedStream.prototype.write = function(data) {
  this.emit('data', data);
};

CombinedStream.prototype.pause = function() {
  if (!this.pauseStreams) {
    return;
  }

  if(this.pauseStreams && this._currentStream && typeof(this._currentStream.pause) == 'function') this._currentStream.pause();
  this.emit('pause');
};

CombinedStream.prototype.resume = function() {
  if (!this._released) {
    this._released = true;
    this.writable = true;
    this._getNext();
  }

  if(this.pauseStreams && this._currentStream && typeof(this._currentStream.resume) == 'function') this._currentStream.resume();
  this.emit('resume');
};

CombinedStream.prototype.end = function() {
  this._reset();
  this.emit('end');
};

CombinedStream.prototype.destroy = function() {
  this._reset();
  this.emit('close');
};

CombinedStream.prototype._reset = function() {
  this.writable = false;
  this._streams = [];
  this._currentStream = null;
};

CombinedStream.prototype._checkDataSize = function() {
  this._updateDataSize();
  if (this.dataSize <= this.maxDataSize) {
    return;
  }

  var message =
    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.';
  this._emitError(new Error(message));
};

CombinedStream.prototype._updateDataSize = function() {
  this.dataSize = 0;

  var self = this;
  this._streams.forEach(function(stream) {
    if (!stream.dataSize) {
      return;
    }

    self.dataSize += stream.dataSize;
  });

  if (this._currentStream && this._currentStream.dataSize) {
    this.dataSize += this._currentStream.dataSize;
  }
};

CombinedStream.prototype._emitError = function(err) {
  this._reset();
  this.emit('error', err);
};


/***/ }),

/***/ 756:
/***/ ((__unused_webpack_module, exports) => {

/*!
 * content-type
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * RegExp to match *( ";" parameter ) in RFC 7231 sec 3.1.1.1
 *
 * parameter     = token "=" ( token / quoted-string )
 * token         = 1*tchar
 * tchar         = "!" / "#" / "$" / "%" / "&" / "'" / "*"
 *               / "+" / "-" / "." / "^" / "_" / "`" / "|" / "~"
 *               / DIGIT / ALPHA
 *               ; any VCHAR, except delimiters
 * quoted-string = DQUOTE *( qdtext / quoted-pair ) DQUOTE
 * qdtext        = HTAB / SP / %x21 / %x23-5B / %x5D-7E / obs-text
 * obs-text      = %x80-FF
 * quoted-pair   = "\" ( HTAB / SP / VCHAR / obs-text )
 */
var PARAM_REGEXP = /; *([!#$%&'*+.^_`|~0-9A-Za-z-]+) *= *("(?:[\u000b\u0020\u0021\u0023-\u005b\u005d-\u007e\u0080-\u00ff]|\\[\u000b\u0020-\u00ff])*"|[!#$%&'*+.^_`|~0-9A-Za-z-]+) */g // eslint-disable-line no-control-regex
var TEXT_REGEXP = /^[\u000b\u0020-\u007e\u0080-\u00ff]+$/ // eslint-disable-line no-control-regex
var TOKEN_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+$/

/**
 * RegExp to match quoted-pair in RFC 7230 sec 3.2.6
 *
 * quoted-pair = "\" ( HTAB / SP / VCHAR / obs-text )
 * obs-text    = %x80-FF
 */
var QESC_REGEXP = /\\([\u000b\u0020-\u00ff])/g // eslint-disable-line no-control-regex

/**
 * RegExp to match chars that must be quoted-pair in RFC 7230 sec 3.2.6
 */
var QUOTE_REGEXP = /([\\"])/g

/**
 * RegExp to match type in RFC 7231 sec 3.1.1.1
 *
 * media-type = type "/" subtype
 * type       = token
 * subtype    = token
 */
var TYPE_REGEXP = /^[!#$%&'*+.^_`|~0-9A-Za-z-]+\/[!#$%&'*+.^_`|~0-9A-Za-z-]+$/

/**
 * Module exports.
 * @public
 */

exports.format = format
exports.parse = parse

/**
 * Format object to media type.
 *
 * @param {object} obj
 * @return {string}
 * @public
 */

function format (obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('argument obj is required')
  }

  var parameters = obj.parameters
  var type = obj.type

  if (!type || !TYPE_REGEXP.test(type)) {
    throw new TypeError('invalid type')
  }

  var string = type

  // append parameters
  if (parameters && typeof parameters === 'object') {
    var param
    var params = Object.keys(parameters).sort()

    for (var i = 0; i < params.length; i++) {
      param = params[i]

      if (!TOKEN_REGEXP.test(param)) {
        throw new TypeError('invalid parameter name')
      }

      string += '; ' + param + '=' + qstring(parameters[param])
    }
  }

  return string
}

/**
 * Parse media type to object.
 *
 * @param {string|object} string
 * @return {Object}
 * @public
 */

function parse (string) {
  if (!string) {
    throw new TypeError('argument string is required')
  }

  // support req/res-like objects as argument
  var header = typeof string === 'object'
    ? getcontenttype(string)
    : string

  if (typeof header !== 'string') {
    throw new TypeError('argument string is required to be a string')
  }

  var index = header.indexOf(';')
  var type = index !== -1
    ? header.slice(0, index).trim()
    : header.trim()

  if (!TYPE_REGEXP.test(type)) {
    throw new TypeError('invalid media type')
  }

  var obj = new ContentType(type.toLowerCase())

  // parse parameters
  if (index !== -1) {
    var key
    var match
    var value

    PARAM_REGEXP.lastIndex = index

    while ((match = PARAM_REGEXP.exec(header))) {
      if (match.index !== index) {
        throw new TypeError('invalid parameter format')
      }

      index += match[0].length
      key = match[1].toLowerCase()
      value = match[2]

      if (value.charCodeAt(0) === 0x22 /* " */) {
        // remove quotes
        value = value.slice(1, -1)

        // remove escapes
        if (value.indexOf('\\') !== -1) {
          value = value.replace(QESC_REGEXP, '$1')
        }
      }

      obj.parameters[key] = value
    }

    if (index !== header.length) {
      throw new TypeError('invalid parameter format')
    }
  }

  return obj
}

/**
 * Get content-type from req/res objects.
 *
 * @param {object}
 * @return {Object}
 * @private
 */

function getcontenttype (obj) {
  var header

  if (typeof obj.getHeader === 'function') {
    // res-like
    header = obj.getHeader('content-type')
  } else if (typeof obj.headers === 'object') {
    // req-like
    header = obj.headers && obj.headers['content-type']
  }

  if (typeof header !== 'string') {
    throw new TypeError('content-type header is missing from object')
  }

  return header
}

/**
 * Quote a string if necessary.
 *
 * @param {string} val
 * @return {string}
 * @private
 */

function qstring (val) {
  var str = String(val)

  // no need to quote tokens
  if (TOKEN_REGEXP.test(str)) {
    return str
  }

  if (str.length > 0 && !TEXT_REGEXP.test(str)) {
    throw new TypeError('invalid parameter value')
  }

  return '"' + str.replace(QUOTE_REGEXP, '\\$1') + '"'
}

/**
 * Class to represent a content type.
 * @private
 */
function ContentType (type) {
  this.parameters = Object.create(null)
  this.type = type
}


/***/ }),

/***/ 6110:
/***/ ((module, exports, __nccwpck_require__) => {

/* eslint-env browser */

/**
 * This is the web browser implementation of `debug()`.
 */

exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = localstorage();
exports.destroy = (() => {
	let warned = false;

	return () => {
		if (!warned) {
			warned = true;
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}
	};
})();

/**
 * Colors.
 */

exports.colors = [
	'#0000CC',
	'#0000FF',
	'#0033CC',
	'#0033FF',
	'#0066CC',
	'#0066FF',
	'#0099CC',
	'#0099FF',
	'#00CC00',
	'#00CC33',
	'#00CC66',
	'#00CC99',
	'#00CCCC',
	'#00CCFF',
	'#3300CC',
	'#3300FF',
	'#3333CC',
	'#3333FF',
	'#3366CC',
	'#3366FF',
	'#3399CC',
	'#3399FF',
	'#33CC00',
	'#33CC33',
	'#33CC66',
	'#33CC99',
	'#33CCCC',
	'#33CCFF',
	'#6600CC',
	'#6600FF',
	'#6633CC',
	'#6633FF',
	'#66CC00',
	'#66CC33',
	'#9900CC',
	'#9900FF',
	'#9933CC',
	'#9933FF',
	'#99CC00',
	'#99CC33',
	'#CC0000',
	'#CC0033',
	'#CC0066',
	'#CC0099',
	'#CC00CC',
	'#CC00FF',
	'#CC3300',
	'#CC3333',
	'#CC3366',
	'#CC3399',
	'#CC33CC',
	'#CC33FF',
	'#CC6600',
	'#CC6633',
	'#CC9900',
	'#CC9933',
	'#CCCC00',
	'#CCCC33',
	'#FF0000',
	'#FF0033',
	'#FF0066',
	'#FF0099',
	'#FF00CC',
	'#FF00FF',
	'#FF3300',
	'#FF3333',
	'#FF3366',
	'#FF3399',
	'#FF33CC',
	'#FF33FF',
	'#FF6600',
	'#FF6633',
	'#FF9900',
	'#FF9933',
	'#FFCC00',
	'#FFCC33'
];

/**
 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
 * and the Firebug extension (any Firefox version) are known
 * to support "%c" CSS customizations.
 *
 * TODO: add a `localStorage` variable to explicitly enable/disable colors
 */

// eslint-disable-next-line complexity
function useColors() {
	// NB: In an Electron preload script, document will be defined but not fully
	// initialized. Since we know we're in Chrome, we'll just detect this case
	// explicitly
	if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
		return true;
	}

	// Internet Explorer and Edge do not support colors.
	if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
		return false;
	}

	let m;

	// Is webkit? http://stackoverflow.com/a/16459606/376773
	// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
		// Is firebug? http://stackoverflow.com/a/398120/376773
		(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
		// Is firefox >= v31?
		// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
		(typeof navigator !== 'undefined' && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31) ||
		// Double check webkit in userAgent just in case we are in a worker
		(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
}

/**
 * Colorize log arguments if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	args[0] = (this.useColors ? '%c' : '') +
		this.namespace +
		(this.useColors ? ' %c' : ' ') +
		args[0] +
		(this.useColors ? '%c ' : ' ') +
		'+' + module.exports.humanize(this.diff);

	if (!this.useColors) {
		return;
	}

	const c = 'color: ' + this.color;
	args.splice(1, 0, c, 'color: inherit');

	// The final "%c" is somewhat tricky, because there could be other
	// arguments passed either before or after the %c, so we need to
	// figure out the correct index to insert the CSS into
	let index = 0;
	let lastC = 0;
	args[0].replace(/%[a-zA-Z%]/g, match => {
		if (match === '%%') {
			return;
		}
		index++;
		if (match === '%c') {
			// We only are interested in the *last* %c
			// (the user may have provided their own)
			lastC = index;
		}
	});

	args.splice(lastC, 0, c);
}

/**
 * Invokes `console.debug()` when available.
 * No-op when `console.debug` is not a "function".
 * If `console.debug` is not available, falls back
 * to `console.log`.
 *
 * @api public
 */
exports.log = console.debug || console.log || (() => {});

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	try {
		if (namespaces) {
			exports.storage.setItem('debug', namespaces);
		} else {
			exports.storage.removeItem('debug');
		}
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */
function load() {
	let r;
	try {
		r = exports.storage.getItem('debug');
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}

	// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	if (!r && typeof process !== 'undefined' && 'env' in process) {
		r = process.env.DEBUG;
	}

	return r;
}

/**
 * Localstorage attempts to return the localstorage.
 *
 * This is necessary because safari throws
 * when a user disables cookies/localstorage
 * and you attempt to access it.
 *
 * @return {LocalStorage}
 * @api private
 */

function localstorage() {
	try {
		// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
		// The Browser also has localStorage in the global context.
		return localStorage;
	} catch (error) {
		// Swallow
		// XXX (@Qix-) should we be logging these?
	}
}

module.exports = __nccwpck_require__(897)(exports);

const {formatters} = module.exports;

/**
 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
 */

formatters.j = function (v) {
	try {
		return JSON.stringify(v);
	} catch (error) {
		return '[UnexpectedJSONParseError]: ' + error.message;
	}
};


/***/ }),

/***/ 897:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 */

function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = __nccwpck_require__(744);
	createDebug.destroy = destroy;

	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});

	/**
	* The currently active debug mode names, and names to skip.
	*/

	createDebug.names = [];
	createDebug.skips = [];

	/**
	* Map of special "%n" handling functions, for the debug "format" argument.
	*
	* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	*/
	createDebug.formatters = {};

	/**
	* Selects a color for a debug namespace
	* @param {String} namespace The namespace string for the debug instance to be colored
	* @return {Number|String} An ANSI color code for the given namespace
	* @api private
	*/
	function selectColor(namespace) {
		let hash = 0;

		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}

		return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
	}
	createDebug.selectColor = selectColor;

	/**
	* Create a debugger with the given `namespace`.
	*
	* @param {String} namespace
	* @return {Function}
	* @api public
	*/
	function createDebug(namespace) {
		let prevTime;
		let enableOverride = null;
		let namespacesCache;
		let enabledCache;

		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}

			const self = debug;

			// Set `diff` timestamp
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;

			args[0] = createDebug.coerce(args[0]);

			if (typeof args[0] !== 'string') {
				// Anything else let's inspect with %O
				args.unshift('%O');
			}

			// Apply any `formatters` transformations
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				// If we encounter an escaped % then don't increase the array index
				if (match === '%%') {
					return '%';
				}
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);

					// Now we need to remove `args[index]` since it's inlined in the `format`
					args.splice(index, 1);
					index--;
				}
				return match;
			});

			// Apply env-specific formatting (colors, etc.)
			createDebug.formatArgs.call(self, args);

			const logFn = self.log || createDebug.log;
			logFn.apply(self, args);
		}

		debug.namespace = namespace;
		debug.useColors = createDebug.useColors();
		debug.color = createDebug.selectColor(namespace);
		debug.extend = extend;
		debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

		Object.defineProperty(debug, 'enabled', {
			enumerable: true,
			configurable: false,
			get: () => {
				if (enableOverride !== null) {
					return enableOverride;
				}
				if (namespacesCache !== createDebug.namespaces) {
					namespacesCache = createDebug.namespaces;
					enabledCache = createDebug.enabled(namespace);
				}

				return enabledCache;
			},
			set: v => {
				enableOverride = v;
			}
		});

		// Env-specific initialization logic for debug instances
		if (typeof createDebug.init === 'function') {
			createDebug.init(debug);
		}

		return debug;
	}

	function extend(namespace, delimiter) {
		const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
		newDebug.log = this.log;
		return newDebug;
	}

	/**
	* Enables a debug mode by namespaces. This can include modes
	* separated by a colon and wildcards.
	*
	* @param {String} namespaces
	* @api public
	*/
	function enable(namespaces) {
		createDebug.save(namespaces);
		createDebug.namespaces = namespaces;

		createDebug.names = [];
		createDebug.skips = [];

		let i;
		const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
		const len = split.length;

		for (i = 0; i < len; i++) {
			if (!split[i]) {
				// ignore empty strings
				continue;
			}

			namespaces = split[i].replace(/\*/g, '.*?');

			if (namespaces[0] === '-') {
				createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
			} else {
				createDebug.names.push(new RegExp('^' + namespaces + '$'));
			}
		}
	}

	/**
	* Disable debug output.
	*
	* @return {String} namespaces
	* @api public
	*/
	function disable() {
		const namespaces = [
			...createDebug.names.map(toNamespace),
			...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
		].join(',');
		createDebug.enable('');
		return namespaces;
	}

	/**
	* Returns true if the given mode name is enabled, false otherwise.
	*
	* @param {String} name
	* @return {Boolean}
	* @api public
	*/
	function enabled(name) {
		if (name[name.length - 1] === '*') {
			return true;
		}

		let i;
		let len;

		for (i = 0, len = createDebug.skips.length; i < len; i++) {
			if (createDebug.skips[i].test(name)) {
				return false;
			}
		}

		for (i = 0, len = createDebug.names.length; i < len; i++) {
			if (createDebug.names[i].test(name)) {
				return true;
			}
		}

		return false;
	}

	/**
	* Convert regexp to namespace
	*
	* @param {RegExp} regxep
	* @return {String} namespace
	* @api private
	*/
	function toNamespace(regexp) {
		return regexp.toString()
			.substring(2, regexp.toString().length - 2)
			.replace(/\.\*\?$/, '*');
	}

	/**
	* Coerce `val`.
	*
	* @param {Mixed} val
	* @return {Mixed}
	* @api private
	*/
	function coerce(val) {
		if (val instanceof Error) {
			return val.stack || val.message;
		}
		return val;
	}

	/**
	* XXX DO NOT USE. This is a temporary stub function.
	* XXX It WILL be removed in the next major release.
	*/
	function destroy() {
		console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
	}

	createDebug.enable(createDebug.load());

	return createDebug;
}

module.exports = setup;


/***/ }),

/***/ 2830:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/**
 * Detect Electron renderer / nwjs process, which is node, but we should
 * treat as a browser.
 */

if (typeof process === 'undefined' || process.type === 'renderer' || process.browser === true || process.__nwjs) {
	module.exports = __nccwpck_require__(6110);
} else {
	module.exports = __nccwpck_require__(5108);
}


/***/ }),

/***/ 5108:
/***/ ((module, exports, __nccwpck_require__) => {

/**
 * Module dependencies.
 */

const tty = __nccwpck_require__(2018);
const util = __nccwpck_require__(9023);

/**
 * This is the Node.js implementation of `debug()`.
 */

exports.init = init;
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.destroy = util.deprecate(
	() => {},
	'Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.'
);

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

try {
	// Optional dependency (as in, doesn't need to be installed, NOT like optionalDependencies in package.json)
	// eslint-disable-next-line import/no-extraneous-dependencies
	const supportsColor = __nccwpck_require__(1450);

	if (supportsColor && (supportsColor.stderr || supportsColor).level >= 2) {
		exports.colors = [
			20,
			21,
			26,
			27,
			32,
			33,
			38,
			39,
			40,
			41,
			42,
			43,
			44,
			45,
			56,
			57,
			62,
			63,
			68,
			69,
			74,
			75,
			76,
			77,
			78,
			79,
			80,
			81,
			92,
			93,
			98,
			99,
			112,
			113,
			128,
			129,
			134,
			135,
			148,
			149,
			160,
			161,
			162,
			163,
			164,
			165,
			166,
			167,
			168,
			169,
			170,
			171,
			172,
			173,
			178,
			179,
			184,
			185,
			196,
			197,
			198,
			199,
			200,
			201,
			202,
			203,
			204,
			205,
			206,
			207,
			208,
			209,
			214,
			215,
			220,
			221
		];
	}
} catch (error) {
	// Swallow - we only care if `supports-color` is available; it doesn't have to be.
}

/**
 * Build up the default `inspectOpts` object from the environment variables.
 *
 *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
 */

exports.inspectOpts = Object.keys(process.env).filter(key => {
	return /^debug_/i.test(key);
}).reduce((obj, key) => {
	// Camel-case
	const prop = key
		.substring(6)
		.toLowerCase()
		.replace(/_([a-z])/g, (_, k) => {
			return k.toUpperCase();
		});

	// Coerce string value into JS value
	let val = process.env[key];
	if (/^(yes|on|true|enabled)$/i.test(val)) {
		val = true;
	} else if (/^(no|off|false|disabled)$/i.test(val)) {
		val = false;
	} else if (val === 'null') {
		val = null;
	} else {
		val = Number(val);
	}

	obj[prop] = val;
	return obj;
}, {});

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
	return 'colors' in exports.inspectOpts ?
		Boolean(exports.inspectOpts.colors) :
		tty.isatty(process.stderr.fd);
}

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs(args) {
	const {namespace: name, useColors} = this;

	if (useColors) {
		const c = this.color;
		const colorCode = '\u001B[3' + (c < 8 ? c : '8;5;' + c);
		const prefix = `  ${colorCode};1m${name} \u001B[0m`;

		args[0] = prefix + args[0].split('\n').join('\n' + prefix);
		args.push(colorCode + 'm+' + module.exports.humanize(this.diff) + '\u001B[0m');
	} else {
		args[0] = getDate() + name + ' ' + args[0];
	}
}

function getDate() {
	if (exports.inspectOpts.hideDate) {
		return '';
	}
	return new Date().toISOString() + ' ';
}

/**
 * Invokes `util.formatWithOptions()` with the specified arguments and writes to stderr.
 */

function log(...args) {
	return process.stderr.write(util.formatWithOptions(exports.inspectOpts, ...args) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */
function save(namespaces) {
	if (namespaces) {
		process.env.DEBUG = namespaces;
	} else {
		// If you set a process.env field to null or undefined, it gets cast to the
		// string 'null' or 'undefined'. Just delete instead.
		delete process.env.DEBUG;
	}
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
	return process.env.DEBUG;
}

/**
 * Init logic for `debug` instances.
 *
 * Create a new `inspectOpts` object in case `useColors` is set
 * differently for a particular `debug` instance.
 */

function init(debug) {
	debug.inspectOpts = {};

	const keys = Object.keys(exports.inspectOpts);
	for (let i = 0; i < keys.length; i++) {
		debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
	}
}

module.exports = __nccwpck_require__(897)(exports);

const {formatters} = module.exports;

/**
 * Map %o to `util.inspect()`, all on a single line.
 */

formatters.o = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts)
		.split('\n')
		.map(str => str.trim())
		.join(' ');
};

/**
 * Map %O to `util.inspect()`, allowing multiple lines if needed.
 */

formatters.O = function (v) {
	this.inspectOpts.colors = this.useColors;
	return util.inspect(v, this.inspectOpts);
};


/***/ }),

/***/ 2710:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var Stream = (__nccwpck_require__(2203).Stream);
var util = __nccwpck_require__(9023);

module.exports = DelayedStream;
function DelayedStream() {
  this.source = null;
  this.dataSize = 0;
  this.maxDataSize = 1024 * 1024;
  this.pauseStream = true;

  this._maxDataSizeExceeded = false;
  this._released = false;
  this._bufferedEvents = [];
}
util.inherits(DelayedStream, Stream);

DelayedStream.create = function(source, options) {
  var delayedStream = new this();

  options = options || {};
  for (var option in options) {
    delayedStream[option] = options[option];
  }

  delayedStream.source = source;

  var realEmit = source.emit;
  source.emit = function() {
    delayedStream._handleEmit(arguments);
    return realEmit.apply(source, arguments);
  };

  source.on('error', function() {});
  if (delayedStream.pauseStream) {
    source.pause();
  }

  return delayedStream;
};

Object.defineProperty(DelayedStream.prototype, 'readable', {
  configurable: true,
  enumerable: true,
  get: function() {
    return this.source.readable;
  }
});

DelayedStream.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
};

DelayedStream.prototype.resume = function() {
  if (!this._released) {
    this.release();
  }

  this.source.resume();
};

DelayedStream.prototype.pause = function() {
  this.source.pause();
};

DelayedStream.prototype.release = function() {
  this._released = true;

  this._bufferedEvents.forEach(function(args) {
    this.emit.apply(this, args);
  }.bind(this));
  this._bufferedEvents = [];
};

DelayedStream.prototype.pipe = function() {
  var r = Stream.prototype.pipe.apply(this, arguments);
  this.resume();
  return r;
};

DelayedStream.prototype._handleEmit = function(args) {
  if (this._released) {
    this.emit.apply(this, args);
    return;
  }

  if (args[0] === 'data') {
    this.dataSize += args[1].length;
    this._checkIfMaxDataSizeExceeded();
  }

  this._bufferedEvents.push(args);
};

DelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {
  if (this._maxDataSizeExceeded) {
    return;
  }

  if (this.dataSize <= this.maxDataSize) {
    return;
  }

  this._maxDataSizeExceeded = true;
  var message =
    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.'
  this.emit('error', new Error(message));
};


/***/ }),

/***/ 8399:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {


const isObj = __nccwpck_require__(5200);

const disallowedKeys = new Set([
	'__proto__',
	'prototype',
	'constructor'
]);

const isValidPath = pathSegments => !pathSegments.some(segment => disallowedKeys.has(segment));

function getPathSegments(path) {
	const pathArray = path.split('.');
	const parts = [];

	for (let i = 0; i < pathArray.length; i++) {
		let p = pathArray[i];

		while (p[p.length - 1] === '\\' && pathArray[i + 1] !== undefined) {
			p = p.slice(0, -1) + '.';
			p += pathArray[++i];
		}

		parts.push(p);
	}

	if (!isValidPath(parts)) {
		return [];
	}

	return parts;
}

module.exports = {
	get(object, path, value) {
		if (!isObj(object) || typeof path !== 'string') {
			return value === undefined ? object : value;
		}

		const pathArray = getPathSegments(path);
		if (pathArray.length === 0) {
			return;
		}

		for (let i = 0; i < pathArray.length; i++) {
			object = object[pathArray[i]];

			if (object === undefined || object === null) {
				// `object` is either `undefined` or `null` so we want to stop the loop, and
				// if this is not the last bit of the path, and
				// if it did't return `undefined`
				// it would return `null` if `object` is `null`
				// but we want `get({foo: null}, 'foo.bar')` to equal `undefined`, or the supplied value, not `null`
				if (i !== pathArray.length - 1) {
					return value;
				}

				break;
			}
		}

		return object === undefined ? value : object;
	},

	set(object, path, value) {
		if (!isObj(object) || typeof path !== 'string') {
			return object;
		}

		const root = object;
		const pathArray = getPathSegments(path);

		for (let i = 0; i < pathArray.length; i++) {
			const p = pathArray[i];

			if (!isObj(object[p])) {
				object[p] = {};
			}

			if (i === pathArray.length - 1) {
				object[p] = value;
			}

			object = object[p];
		}

		return root;
	},

	delete(object, path) {
		if (!isObj(object) || typeof path !== 'string') {
			return false;
		}

		const pathArray = getPathSegments(path);

		for (let i = 0; i < pathArray.length; i++) {
			const p = pathArray[i];

			if (i === pathArray.length - 1) {
				delete object[p];
				return true;
			}

			object = object[p];

			if (!isObj(object)) {
				return false;
			}
		}
	},

	has(object, path) {
		if (!isObj(object) || typeof path !== 'string') {
			return false;
		}

		const pathArray = getPathSegments(path);
		if (pathArray.length === 0) {
			return false;
		}

		// eslint-disable-next-line unicorn/no-for-loop
		for (let i = 0; i < pathArray.length; i++) {
			if (isObj(object)) {
				if (!(pathArray[i] in object)) {
					return false;
				}

				object = object[pathArray[i]];
			} else {
				return false;
			}
		}

		return true;
	}
};


/***/ }),

/***/ 4778:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var debug;

module.exports = function () {
  if (!debug) {
    try {
      /* eslint global-require: off */
      debug = __nccwpck_require__(2830)("follow-redirects");
    }
    catch (error) { /* */ }
    if (typeof debug !== "function") {
      debug = function () { /* */ };
    }
  }
  debug.apply(null, arguments);
};


/***/ }),

/***/ 1573:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var url = __nccwpck_require__(7016);
var URL = url.URL;
var http = __nccwpck_require__(8611);
var https = __nccwpck_require__(5692);
var Writable = (__nccwpck_require__(2203).Writable);
var assert = __nccwpck_require__(2613);
var debug = __nccwpck_require__(4778);

// Whether to use the native URL object or the legacy url module
var useNativeURL = false;
try {
  assert(new URL());
}
catch (error) {
  useNativeURL = error.code === "ERR_INVALID_URL";
}

// URL fields to preserve in copy operations
var preservedUrlFields = [
  "auth",
  "host",
  "hostname",
  "href",
  "path",
  "pathname",
  "port",
  "protocol",
  "query",
  "search",
  "hash",
];

// Create handlers that pass events from native requests
var events = ["abort", "aborted", "connect", "error", "socket", "timeout"];
var eventHandlers = Object.create(null);
events.forEach(function (event) {
  eventHandlers[event] = function (arg1, arg2, arg3) {
    this._redirectable.emit(event, arg1, arg2, arg3);
  };
});

// Error types with codes
var InvalidUrlError = createErrorType(
  "ERR_INVALID_URL",
  "Invalid URL",
  TypeError
);
var RedirectionError = createErrorType(
  "ERR_FR_REDIRECTION_FAILURE",
  "Redirected request failed"
);
var TooManyRedirectsError = createErrorType(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded",
  RedirectionError
);
var MaxBodyLengthExceededError = createErrorType(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
);
var WriteAfterEndError = createErrorType(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
);

// istanbul ignore next
var destroy = Writable.prototype.destroy || noop;

// An HTTP(S) request that can be redirected
function RedirectableRequest(options, responseCallback) {
  // Initialize the request
  Writable.call(this);
  this._sanitizeOptions(options);
  this._options = options;
  this._ended = false;
  this._ending = false;
  this._redirectCount = 0;
  this._redirects = [];
  this._requestBodyLength = 0;
  this._requestBodyBuffers = [];

  // Attach a callback if passed
  if (responseCallback) {
    this.on("response", responseCallback);
  }

  // React to responses of native requests
  var self = this;
  this._onNativeResponse = function (response) {
    try {
      self._processResponse(response);
    }
    catch (cause) {
      self.emit("error", cause instanceof RedirectionError ?
        cause : new RedirectionError({ cause: cause }));
    }
  };

  // Perform the first request
  this._performRequest();
}
RedirectableRequest.prototype = Object.create(Writable.prototype);

RedirectableRequest.prototype.abort = function () {
  destroyRequest(this._currentRequest);
  this._currentRequest.abort();
  this.emit("abort");
};

RedirectableRequest.prototype.destroy = function (error) {
  destroyRequest(this._currentRequest, error);
  destroy.call(this, error);
  return this;
};

// Writes buffered data to the current native request
RedirectableRequest.prototype.write = function (data, encoding, callback) {
  // Writing is not allowed if end has been called
  if (this._ending) {
    throw new WriteAfterEndError();
  }

  // Validate input and shift parameters if necessary
  if (!isString(data) && !isBuffer(data)) {
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  }
  if (isFunction(encoding)) {
    callback = encoding;
    encoding = null;
  }

  // Ignore empty buffers, since writing them doesn't invoke the callback
  // https://github.com/nodejs/node/issues/22066
  if (data.length === 0) {
    if (callback) {
      callback();
    }
    return;
  }
  // Only write when we don't exceed the maximum body length
  if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
    this._requestBodyLength += data.length;
    this._requestBodyBuffers.push({ data: data, encoding: encoding });
    this._currentRequest.write(data, encoding, callback);
  }
  // Error when we exceed the maximum body length
  else {
    this.emit("error", new MaxBodyLengthExceededError());
    this.abort();
  }
};

// Ends the current native request
RedirectableRequest.prototype.end = function (data, encoding, callback) {
  // Shift parameters if necessary
  if (isFunction(data)) {
    callback = data;
    data = encoding = null;
  }
  else if (isFunction(encoding)) {
    callback = encoding;
    encoding = null;
  }

  // Write data if needed and end
  if (!data) {
    this._ended = this._ending = true;
    this._currentRequest.end(null, null, callback);
  }
  else {
    var self = this;
    var currentRequest = this._currentRequest;
    this.write(data, encoding, function () {
      self._ended = true;
      currentRequest.end(null, null, callback);
    });
    this._ending = true;
  }
};

// Sets a header value on the current native request
RedirectableRequest.prototype.setHeader = function (name, value) {
  this._options.headers[name] = value;
  this._currentRequest.setHeader(name, value);
};

// Clears a header value on the current native request
RedirectableRequest.prototype.removeHeader = function (name) {
  delete this._options.headers[name];
  this._currentRequest.removeHeader(name);
};

// Global timeout for all underlying requests
RedirectableRequest.prototype.setTimeout = function (msecs, callback) {
  var self = this;

  // Destroys the socket on timeout
  function destroyOnTimeout(socket) {
    socket.setTimeout(msecs);
    socket.removeListener("timeout", socket.destroy);
    socket.addListener("timeout", socket.destroy);
  }

  // Sets up a timer to trigger a timeout event
  function startTimer(socket) {
    if (self._timeout) {
      clearTimeout(self._timeout);
    }
    self._timeout = setTimeout(function () {
      self.emit("timeout");
      clearTimer();
    }, msecs);
    destroyOnTimeout(socket);
  }

  // Stops a timeout from triggering
  function clearTimer() {
    // Clear the timeout
    if (self._timeout) {
      clearTimeout(self._timeout);
      self._timeout = null;
    }

    // Clean up all attached listeners
    self.removeListener("abort", clearTimer);
    self.removeListener("error", clearTimer);
    self.removeListener("response", clearTimer);
    self.removeListener("close", clearTimer);
    if (callback) {
      self.removeListener("timeout", callback);
    }
    if (!self.socket) {
      self._currentRequest.removeListener("socket", startTimer);
    }
  }

  // Attach callback if passed
  if (callback) {
    this.on("timeout", callback);
  }

  // Start the timer if or when the socket is opened
  if (this.socket) {
    startTimer(this.socket);
  }
  else {
    this._currentRequest.once("socket", startTimer);
  }

  // Clean up on events
  this.on("socket", destroyOnTimeout);
  this.on("abort", clearTimer);
  this.on("error", clearTimer);
  this.on("response", clearTimer);
  this.on("close", clearTimer);

  return this;
};

// Proxy all other public ClientRequest methods
[
  "flushHeaders", "getHeader",
  "setNoDelay", "setSocketKeepAlive",
].forEach(function (method) {
  RedirectableRequest.prototype[method] = function (a, b) {
    return this._currentRequest[method](a, b);
  };
});

// Proxy all public ClientRequest properties
["aborted", "connection", "socket"].forEach(function (property) {
  Object.defineProperty(RedirectableRequest.prototype, property, {
    get: function () { return this._currentRequest[property]; },
  });
});

RedirectableRequest.prototype._sanitizeOptions = function (options) {
  // Ensure headers are always present
  if (!options.headers) {
    options.headers = {};
  }

  // Since http.request treats host as an alias of hostname,
  // but the url module interprets host as hostname plus port,
  // eliminate the host property to avoid confusion.
  if (options.host) {
    // Use hostname if set, because it has precedence
    if (!options.hostname) {
      options.hostname = options.host;
    }
    delete options.host;
  }

  // Complete the URL object when necessary
  if (!options.pathname && options.path) {
    var searchPos = options.path.indexOf("?");
    if (searchPos < 0) {
      options.pathname = options.path;
    }
    else {
      options.pathname = options.path.substring(0, searchPos);
      options.search = options.path.substring(searchPos);
    }
  }
};


// Executes the next native request (initial or redirect)
RedirectableRequest.prototype._performRequest = function () {
  // Load the native protocol
  var protocol = this._options.protocol;
  var nativeProtocol = this._options.nativeProtocols[protocol];
  if (!nativeProtocol) {
    throw new TypeError("Unsupported protocol " + protocol);
  }

  // If specified, use the agent corresponding to the protocol
  // (HTTP and HTTPS use different types of agents)
  if (this._options.agents) {
    var scheme = protocol.slice(0, -1);
    this._options.agent = this._options.agents[scheme];
  }

  // Create the native request and set up its event handlers
  var request = this._currentRequest =
        nativeProtocol.request(this._options, this._onNativeResponse);
  request._redirectable = this;
  for (var event of events) {
    request.on(event, eventHandlers[event]);
  }

  // RFC7230§5.3.1: When making a request directly to an origin server, […]
  // a client MUST send only the absolute path […] as the request-target.
  this._currentUrl = /^\//.test(this._options.path) ?
    url.format(this._options) :
    // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path;

  // End a redirected request
  // (The first request must be ended explicitly with RedirectableRequest#end)
  if (this._isRedirect) {
    // Write the request entity and end
    var i = 0;
    var self = this;
    var buffers = this._requestBodyBuffers;
    (function writeNext(error) {
      // Only write if this request has not been redirected yet
      /* istanbul ignore else */
      if (request === self._currentRequest) {
        // Report any write errors
        /* istanbul ignore if */
        if (error) {
          self.emit("error", error);
        }
        // Write the next buffer if there are still left
        else if (i < buffers.length) {
          var buffer = buffers[i++];
          /* istanbul ignore else */
          if (!request.finished) {
            request.write(buffer.data, buffer.encoding, writeNext);
          }
        }
        // End the request if `end` has been called on us
        else if (self._ended) {
          request.end();
        }
      }
    }());
  }
};

// Processes a response from the current native request
RedirectableRequest.prototype._processResponse = function (response) {
  // Store the redirected response
  var statusCode = response.statusCode;
  if (this._options.trackRedirects) {
    this._redirects.push({
      url: this._currentUrl,
      headers: response.headers,
      statusCode: statusCode,
    });
  }

  // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
  // that further action needs to be taken by the user agent in order to
  // fulfill the request. If a Location header field is provided,
  // the user agent MAY automatically redirect its request to the URI
  // referenced by the Location field value,
  // even if the specific status code is not understood.

  // If the response is not a redirect; return it as-is
  var location = response.headers.location;
  if (!location || this._options.followRedirects === false ||
      statusCode < 300 || statusCode >= 400) {
    response.responseUrl = this._currentUrl;
    response.redirects = this._redirects;
    this.emit("response", response);

    // Clean up
    this._requestBodyBuffers = [];
    return;
  }

  // The response is a redirect, so abort the current request
  destroyRequest(this._currentRequest);
  // Discard the remainder of the response to avoid waiting for data
  response.destroy();

  // RFC7231§6.4: A client SHOULD detect and intervene
  // in cyclical redirections (i.e., "infinite" redirection loops).
  if (++this._redirectCount > this._options.maxRedirects) {
    throw new TooManyRedirectsError();
  }

  // Store the request headers if applicable
  var requestHeaders;
  var beforeRedirect = this._options.beforeRedirect;
  if (beforeRedirect) {
    requestHeaders = Object.assign({
      // The Host header was set by nativeProtocol.request
      Host: response.req.getHeader("host"),
    }, this._options.headers);
  }

  // RFC7231§6.4: Automatic redirection needs to done with
  // care for methods not known to be safe, […]
  // RFC7231§6.4.2–3: For historical reasons, a user agent MAY change
  // the request method from POST to GET for the subsequent request.
  var method = this._options.method;
  if ((statusCode === 301 || statusCode === 302) && this._options.method === "POST" ||
      // RFC7231§6.4.4: The 303 (See Other) status code indicates that
      // the server is redirecting the user agent to a different resource […]
      // A user agent can perform a retrieval request targeting that URI
      // (a GET or HEAD request if using HTTP) […]
      (statusCode === 303) && !/^(?:GET|HEAD)$/.test(this._options.method)) {
    this._options.method = "GET";
    // Drop a possible entity and headers related to it
    this._requestBodyBuffers = [];
    removeMatchingHeaders(/^content-/i, this._options.headers);
  }

  // Drop the Host header, as the redirect might lead to a different host
  var currentHostHeader = removeMatchingHeaders(/^host$/i, this._options.headers);

  // If the redirect is relative, carry over the host of the last request
  var currentUrlParts = parseUrl(this._currentUrl);
  var currentHost = currentHostHeader || currentUrlParts.host;
  var currentUrl = /^\w+:/.test(location) ? this._currentUrl :
    url.format(Object.assign(currentUrlParts, { host: currentHost }));

  // Create the redirected request
  var redirectUrl = resolveUrl(location, currentUrl);
  debug("redirecting to", redirectUrl.href);
  this._isRedirect = true;
  spreadUrlObject(redirectUrl, this._options);

  // Drop confidential headers when redirecting to a less secure protocol
  // or to a different domain that is not a superdomain
  if (redirectUrl.protocol !== currentUrlParts.protocol &&
     redirectUrl.protocol !== "https:" ||
     redirectUrl.host !== currentHost &&
     !isSubdomain(redirectUrl.host, currentHost)) {
    removeMatchingHeaders(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers);
  }

  // Evaluate the beforeRedirect callback
  if (isFunction(beforeRedirect)) {
    var responseDetails = {
      headers: response.headers,
      statusCode: statusCode,
    };
    var requestDetails = {
      url: currentUrl,
      method: method,
      headers: requestHeaders,
    };
    beforeRedirect(this._options, responseDetails, requestDetails);
    this._sanitizeOptions(this._options);
  }

  // Perform the redirected request
  this._performRequest();
};

// Wraps the key/value object of protocols with redirect functionality
function wrap(protocols) {
  // Default settings
  var exports = {
    maxRedirects: 21,
    maxBodyLength: 10 * 1024 * 1024,
  };

  // Wrap each protocol
  var nativeProtocols = {};
  Object.keys(protocols).forEach(function (scheme) {
    var protocol = scheme + ":";
    var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
    var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

    // Executes a request, following redirects
    function request(input, options, callback) {
      // Parse parameters, ensuring that input is an object
      if (isURL(input)) {
        input = spreadUrlObject(input);
      }
      else if (isString(input)) {
        input = spreadUrlObject(parseUrl(input));
      }
      else {
        callback = options;
        options = validateUrl(input);
        input = { protocol: protocol };
      }
      if (isFunction(options)) {
        callback = options;
        options = null;
      }

      // Set defaults
      options = Object.assign({
        maxRedirects: exports.maxRedirects,
        maxBodyLength: exports.maxBodyLength,
      }, input, options);
      options.nativeProtocols = nativeProtocols;
      if (!isString(options.host) && !isString(options.hostname)) {
        options.hostname = "::1";
      }

      assert.equal(options.protocol, protocol, "protocol mismatch");
      debug("options", options);
      return new RedirectableRequest(options, callback);
    }

    // Executes a GET request, following redirects
    function get(input, options, callback) {
      var wrappedRequest = wrappedProtocol.request(input, options, callback);
      wrappedRequest.end();
      return wrappedRequest;
    }

    // Expose the properties on the wrapped protocol
    Object.defineProperties(wrappedProtocol, {
      request: { value: request, configurable: true, enumerable: true, writable: true },
      get: { value: get, configurable: true, enumerable: true, writable: true },
    });
  });
  return exports;
}

function noop() { /* empty */ }

function parseUrl(input) {
  var parsed;
  /* istanbul ignore else */
  if (useNativeURL) {
    parsed = new URL(input);
  }
  else {
    // Ensure the URL is valid and absolute
    parsed = validateUrl(url.parse(input));
    if (!isString(parsed.protocol)) {
      throw new InvalidUrlError({ input });
    }
  }
  return parsed;
}

function resolveUrl(relative, base) {
  /* istanbul ignore next */
  return useNativeURL ? new URL(relative, base) : parseUrl(url.resolve(base, relative));
}

function validateUrl(input) {
  if (/^\[/.test(input.hostname) && !/^\[[:0-9a-f]+\]$/i.test(input.hostname)) {
    throw new InvalidUrlError({ input: input.href || input });
  }
  if (/^\[/.test(input.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(input.host)) {
    throw new InvalidUrlError({ input: input.href || input });
  }
  return input;
}

function spreadUrlObject(urlObject, target) {
  var spread = target || {};
  for (var key of preservedUrlFields) {
    spread[key] = urlObject[key];
  }

  // Fix IPv6 hostname
  if (spread.hostname.startsWith("[")) {
    spread.hostname = spread.hostname.slice(1, -1);
  }
  // Ensure port is a number
  if (spread.port !== "") {
    spread.port = Number(spread.port);
  }
  // Concatenate path
  spread.path = spread.search ? spread.pathname + spread.search : spread.pathname;

  return spread;
}

function removeMatchingHeaders(regex, headers) {
  var lastValue;
  for (var header in headers) {
    if (regex.test(header)) {
      lastValue = headers[header];
      delete headers[header];
    }
  }
  return (lastValue === null || typeof lastValue === "undefined") ?
    undefined : String(lastValue).trim();
}

function createErrorType(code, message, baseClass) {
  // Create constructor
  function CustomError(properties) {
    Error.captureStackTrace(this, this.constructor);
    Object.assign(this, properties || {});
    this.code = code;
    this.message = this.cause ? message + ": " + this.cause.message : message;
  }

  // Attach constructor and set default properties
  CustomError.prototype = new (baseClass || Error)();
  Object.defineProperties(CustomError.prototype, {
    constructor: {
      value: CustomError,
      enumerable: false,
    },
    name: {
      value: "Error [" + code + "]",
      enumerable: false,
    },
  });
  return CustomError;
}

function destroyRequest(request, error) {
  for (var event of events) {
    request.removeListener(event, eventHandlers[event]);
  }
  request.on("error", noop);
  request.destroy(error);
}

function isSubdomain(subdomain, domain) {
  assert(isString(subdomain) && isString(domain));
  var dot = subdomain.length - domain.length - 1;
  return dot > 0 && subdomain[dot] === "." && subdomain.endsWith(domain);
}

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

function isFunction(value) {
  return typeof value === "function";
}

function isBuffer(value) {
  return typeof value === "object" && ("length" in value);
}

function isURL(value) {
  return URL && value instanceof URL;
}

// Exports
module.exports = wrap({ http: http, https: https });
module.exports.wrap = wrap;


/***/ }),

/***/ 6454:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

var CombinedStream = __nccwpck_require__(5630);
var util = __nccwpck_require__(9023);
var path = __nccwpck_require__(6928);
var http = __nccwpck_require__(8611);
var https = __nccwpck_require__(5692);
var parseUrl = (__nccwpck_require__(7016).parse);
var fs = __nccwpck_require__(9896);
var Stream = (__nccwpck_require__(2203).Stream);
var mime = __nccwpck_require__(4096);
var asynckit = __nccwpck_require__(1324);
var populate = __nccwpck_require__(1835);

// Public API
module.exports = FormData;

// make it a Stream
util.inherits(FormData, CombinedStream);

/**
 * Create readable "multipart/form-data" streams.
 * Can be used to submit forms
 * and file uploads to other web applications.
 *
 * @constructor
 * @param {Object} options - Properties to be added/overriden for FormData and CombinedStream
 */
function FormData(options) {
  if (!(this instanceof FormData)) {
    return new FormData(options);
  }

  this._overheadLength = 0;
  this._valueLength = 0;
  this._valuesToMeasure = [];

  CombinedStream.call(this);

  options = options || {};
  for (var option in options) {
    this[option] = options[option];
  }
}

FormData.LINE_BREAK = '\r\n';
FormData.DEFAULT_CONTENT_TYPE = 'application/octet-stream';

FormData.prototype.append = function(field, value, options) {

  options = options || {};

  // allow filename as single option
  if (typeof options == 'string') {
    options = {filename: options};
  }

  var append = CombinedStream.prototype.append.bind(this);

  // all that streamy business can't handle numbers
  if (typeof value == 'number') {
    value = '' + value;
  }

  // https://github.com/felixge/node-form-data/issues/38
  if (util.isArray(value)) {
    // Please convert your array into string
    // the way web server expects it
    this._error(new Error('Arrays are not supported.'));
    return;
  }

  var header = this._multiPartHeader(field, value, options);
  var footer = this._multiPartFooter();

  append(header);
  append(value);
  append(footer);

  // pass along options.knownLength
  this._trackLength(header, value, options);
};

FormData.prototype._trackLength = function(header, value, options) {
  var valueLength = 0;

  // used w/ getLengthSync(), when length is known.
  // e.g. for streaming directly from a remote server,
  // w/ a known file a size, and not wanting to wait for
  // incoming file to finish to get its size.
  if (options.knownLength != null) {
    valueLength += +options.knownLength;
  } else if (Buffer.isBuffer(value)) {
    valueLength = value.length;
  } else if (typeof value === 'string') {
    valueLength = Buffer.byteLength(value);
  }

  this._valueLength += valueLength;

  // @check why add CRLF? does this account for custom/multiple CRLFs?
  this._overheadLength +=
    Buffer.byteLength(header) +
    FormData.LINE_BREAK.length;

  // empty or either doesn't have path or not an http response or not a stream
  if (!value || ( !value.path && !(value.readable && value.hasOwnProperty('httpVersion')) && !(value instanceof Stream))) {
    return;
  }

  // no need to bother with the length
  if (!options.knownLength) {
    this._valuesToMeasure.push(value);
  }
};

FormData.prototype._lengthRetriever = function(value, callback) {

  if (value.hasOwnProperty('fd')) {

    // take read range into a account
    // `end` = Infinity –> read file till the end
    //
    // TODO: Looks like there is bug in Node fs.createReadStream
    // it doesn't respect `end` options without `start` options
    // Fix it when node fixes it.
    // https://github.com/joyent/node/issues/7819
    if (value.end != undefined && value.end != Infinity && value.start != undefined) {

      // when end specified
      // no need to calculate range
      // inclusive, starts with 0
      callback(null, value.end + 1 - (value.start ? value.start : 0));

    // not that fast snoopy
    } else {
      // still need to fetch file size from fs
      fs.stat(value.path, function(err, stat) {

        var fileSize;

        if (err) {
          callback(err);
          return;
        }

        // update final size based on the range options
        fileSize = stat.size - (value.start ? value.start : 0);
        callback(null, fileSize);
      });
    }

  // or http response
  } else if (value.hasOwnProperty('httpVersion')) {
    callback(null, +value.headers['content-length']);

  // or request stream http://github.com/mikeal/request
  } else if (value.hasOwnProperty('httpModule')) {
    // wait till response come back
    value.on('response', function(response) {
      value.pause();
      callback(null, +response.headers['content-length']);
    });
    value.resume();

  // something else
  } else {
    callback('Unknown stream');
  }
};

FormData.prototype._multiPartHeader = function(field, value, options) {
  // custom header specified (as string)?
  // it becomes responsible for boundary
  // (e.g. to handle extra CRLFs on .NET servers)
  if (typeof options.header == 'string') {
    return options.header;
  }

  var contentDisposition = this._getContentDisposition(value, options);
  var contentType = this._getContentType(value, options);

  var contents = '';
  var headers  = {
    // add custom disposition as third element or keep it two elements if not
    'Content-Disposition': ['form-data', 'name="' + field + '"'].concat(contentDisposition || []),
    // if no content type. allow it to be empty array
    'Content-Type': [].concat(contentType || [])
  };

  // allow custom headers.
  if (typeof options.header == 'object') {
    populate(headers, options.header);
  }

  var header;
  for (var prop in headers) {
    if (!headers.hasOwnProperty(prop)) continue;
    header = headers[prop];

    // skip nullish headers.
    if (header == null) {
      continue;
    }

    // convert all headers to arrays.
    if (!Array.isArray(header)) {
      header = [header];
    }

    // add non-empty headers.
    if (header.length) {
      contents += prop + ': ' + header.join('; ') + FormData.LINE_BREAK;
    }
  }

  return '--' + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;
};

FormData.prototype._getContentDisposition = function(value, options) {

  var filename
    , contentDisposition
    ;

  if (typeof options.filepath === 'string') {
    // custom filepath for relative paths
    filename = path.normalize(options.filepath).replace(/\\/g, '/');
  } else if (options.filename || value.name || value.path) {
    // custom filename take precedence
    // formidable and the browser add a name property
    // fs- and request- streams have path property
    filename = path.basename(options.filename || value.name || value.path);
  } else if (value.readable && value.hasOwnProperty('httpVersion')) {
    // or try http response
    filename = path.basename(value.client._httpMessage.path || '');
  }

  if (filename) {
    contentDisposition = 'filename="' + filename + '"';
  }

  return contentDisposition;
};

FormData.prototype._getContentType = function(value, options) {

  // use custom content-type above all
  var contentType = options.contentType;

  // or try `name` from formidable, browser
  if (!contentType && value.name) {
    contentType = mime.lookup(value.name);
  }

  // or try `path` from fs-, request- streams
  if (!contentType && value.path) {
    contentType = mime.lookup(value.path);
  }

  // or if it's http-reponse
  if (!contentType && value.readable && value.hasOwnProperty('httpVersion')) {
    contentType = value.headers['content-type'];
  }

  // or guess it from the filepath or filename
  if (!contentType && (options.filepath || options.filename)) {
    contentType = mime.lookup(options.filepath || options.filename);
  }

  // fallback to the default content type if `value` is not simple value
  if (!contentType && typeof value == 'object') {
    contentType = FormData.DEFAULT_CONTENT_TYPE;
  }

  return contentType;
};

FormData.prototype._multiPartFooter = function() {
  return function(next) {
    var footer = FormData.LINE_BREAK;

    var lastPart = (this._streams.length === 0);
    if (lastPart) {
      footer += this._lastBoundary();
    }

    next(footer);
  }.bind(this);
};

FormData.prototype._lastBoundary = function() {
  return '--' + this.getBoundary() + '--' + FormData.LINE_BREAK;
};

FormData.prototype.getHeaders = function(userHeaders) {
  var header;
  var formHeaders = {
    'content-type': 'multipart/form-data; boundary=' + this.getBoundary()
  };

  for (header in userHeaders) {
    if (userHeaders.hasOwnProperty(header)) {
      formHeaders[header.toLowerCase()] = userHeaders[header];
    }
  }

  return formHeaders;
};

FormData.prototype.setBoundary = function(boundary) {
  this._boundary = boundary;
};

FormData.prototype.getBoundary = function() {
  if (!this._boundary) {
    this._generateBoundary();
  }

  return this._boundary;
};

FormData.prototype.getBuffer = function() {
  var dataBuffer = new Buffer.alloc( 0 );
  var boundary = this.getBoundary();

  // Create the form content. Add Line breaks to the end of data.
  for (var i = 0, len = this._streams.length; i < len; i++) {
    if (typeof this._streams[i] !== 'function') {

      // Add content to the buffer.
      if(Buffer.isBuffer(this._streams[i])) {
        dataBuffer = Buffer.concat( [dataBuffer, this._streams[i]]);
      }else {
        dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(this._streams[i])]);
      }

      // Add break after content.
      if (typeof this._streams[i] !== 'string' || this._streams[i].substring( 2, boundary.length + 2 ) !== boundary) {
        dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(FormData.LINE_BREAK)] );
      }
    }
  }

  // Add the footer and return the Buffer object.
  return Buffer.concat( [dataBuffer, Buffer.from(this._lastBoundary())] );
};

FormData.prototype._generateBoundary = function() {
  // This generates a 50 character boundary similar to those used by Firefox.
  // They are optimized for boyer-moore parsing.
  var boundary = '--------------------------';
  for (var i = 0; i < 24; i++) {
    boundary += Math.floor(Math.random() * 10).toString(16);
  }

  this._boundary = boundary;
};

// Note: getLengthSync DOESN'T calculate streams length
// As workaround one can calculate file size manually
// and add it as knownLength option
FormData.prototype.getLengthSync = function() {
  var knownLength = this._overheadLength + this._valueLength;

  // Don't get confused, there are 3 "internal" streams for each keyval pair
  // so it basically checks if there is any value added to the form
  if (this._streams.length) {
    knownLength += this._lastBoundary().length;
  }

  // https://github.com/form-data/form-data/issues/40
  if (!this.hasKnownLength()) {
    // Some async length retrievers are present
    // therefore synchronous length calculation is false.
    // Please use getLength(callback) to get proper length
    this._error(new Error('Cannot calculate proper length in synchronous way.'));
  }

  return knownLength;
};

// Public API to check if length of added values is known
// https://github.com/form-data/form-data/issues/196
// https://github.com/form-data/form-data/issues/262
FormData.prototype.hasKnownLength = function() {
  var hasKnownLength = true;

  if (this._valuesToMeasure.length) {
    hasKnownLength = false;
  }

  return hasKnownLength;
};

FormData.prototype.getLength = function(cb) {
  var knownLength = this._overheadLength + this._valueLength;

  if (this._streams.length) {
    knownLength += this._lastBoundary().length;
  }

  if (!this._valuesToMeasure.length) {
    process.nextTick(cb.bind(this, null, knownLength));
    return;
  }

  asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {
    if (err) {
      cb(err);
      return;
    }

    values.forEach(function(length) {
      knownLength += length;
    });

    cb(null, knownLength);
  });
};

FormData.prototype.submit = function(params, cb) {
  var request
    , options
    , defaults = {method: 'post'}
    ;

  // parse provided url if it's string
  // or treat it as options object
  if (typeof params == 'string') {

    params = parseUrl(params);
    options = populate({
      port: params.port,
      path: params.pathname,
      host: params.hostname,
      protocol: params.protocol
    }, defaults);

  // use custom params
  } else {

    options = populate(params, defaults);
    // if no port provided use default one
    if (!options.port) {
      options.port = options.protocol == 'https:' ? 443 : 80;
    }
  }

  // put that good code in getHeaders to some use
  options.headers = this.getHeaders(params.headers);

  // https if specified, fallback to http in any other case
  if (options.protocol == 'https:') {
    request = https.request(options);
  } else {
    request = http.request(options);
  }

  // get content length and fire away
  this.getLength(function(err, length) {
    if (err && err !== 'Unknown stream') {
      this._error(err);
      return;
    }

    // add content length
    if (length) {
      request.setHeader('Content-Length', length);
    }

    this.pipe(request);
    if (cb) {
      var onResponse;

      var callback = function (error, responce) {
        request.removeListener('error', callback);
        request.removeListener('response', onResponse);

        return cb.call(this, error, responce);
      };

      onResponse = callback.bind(this, null);

      request.on('error', callback);
      request.on('response', onResponse);
    }
  }.bind(this));

  return request;
};

FormData.prototype._error = function(err) {
  if (!this.error) {
    this.error = err;
    this.pause();
    this.emit('error', err);
  }
};

FormData.prototype.toString = function () {
  return '[object FormData]';
};


/***/ }),

/***/ 1835:
/***/ ((module) => {

// populates missing values
module.exports = function(dst, src) {

  Object.keys(src).forEach(function(prop)
  {
    dst[prop] = dst[prop] || src[prop];
  });

  return dst;
};


/***/ }),

/***/ 3813:
/***/ ((module) => {



module.exports = (flag, argv = process.argv) => {
	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
	const position = argv.indexOf(prefix + flag);
	const terminatorPosition = argv.indexOf('--');
	return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
};


/***/ }),

/***/ 3724:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/*!
 * humanize-ms - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

var util = __nccwpck_require__(9023);
var ms = __nccwpck_require__(744);

module.exports = function (t) {
  if (typeof t === 'number') return t;
  var r = ms(t);
  if (r === undefined) {
    var err = new Error(util.format('humanize-ms(%j) result undefined', t));
    console.warn(err.stack);
  }
  return r;
};


/***/ }),

/***/ 5200:
/***/ ((module) => {



module.exports = value => {
	const type = typeof value;
	return value !== null && (type === 'object' || type === 'function');
};


/***/ }),

/***/ 9471:
/***/ ((module, exports, __nccwpck_require__) => {

/* module decorator */ module = __nccwpck_require__.nmd(module);
/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;


/***/ }),

/***/ 9829:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */

/**
 * Module exports.
 */

module.exports = __nccwpck_require__(1813)


/***/ }),

/***/ 4096:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */



/**
 * Module dependencies.
 * @private
 */

var db = __nccwpck_require__(9829)
var extname = (__nccwpck_require__(6928).extname)

/**
 * Module variables.
 * @private
 */

var EXTRACT_TYPE_REGEXP = /^\s*([^;\s]*)(?:;|\s|$)/
var TEXT_TYPE_REGEXP = /^text\//i

/**
 * Module exports.
 * @public
 */

exports.charset = charset
exports.charsets = { lookup: charset }
exports.contentType = contentType
exports.extension = extension
exports.extensions = Object.create(null)
exports.lookup = lookup
exports.types = Object.create(null)

// Populate the extensions/types maps
populateMaps(exports.extensions, exports.types)

/**
 * Get the default charset for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function charset (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type)
  var mime = match && db[match[1].toLowerCase()]

  if (mime && mime.charset) {
    return mime.charset
  }

  // default text/* to utf-8
  if (match && TEXT_TYPE_REGEXP.test(match[1])) {
    return 'UTF-8'
  }

  return false
}

/**
 * Create a full Content-Type header given a MIME type or extension.
 *
 * @param {string} str
 * @return {boolean|string}
 */

function contentType (str) {
  // TODO: should this even be in this module?
  if (!str || typeof str !== 'string') {
    return false
  }

  var mime = str.indexOf('/') === -1
    ? exports.lookup(str)
    : str

  if (!mime) {
    return false
  }

  // TODO: use content-type or other module
  if (mime.indexOf('charset') === -1) {
    var charset = exports.charset(mime)
    if (charset) mime += '; charset=' + charset.toLowerCase()
  }

  return mime
}

/**
 * Get the default extension for a MIME type.
 *
 * @param {string} type
 * @return {boolean|string}
 */

function extension (type) {
  if (!type || typeof type !== 'string') {
    return false
  }

  // TODO: use media-typer
  var match = EXTRACT_TYPE_REGEXP.exec(type)

  // get extensions
  var exts = match && exports.extensions[match[1].toLowerCase()]

  if (!exts || !exts.length) {
    return false
  }

  return exts[0]
}

/**
 * Lookup the MIME type for a file path/extension.
 *
 * @param {string} path
 * @return {boolean|string}
 */

function lookup (path) {
  if (!path || typeof path !== 'string') {
    return false
  }

  // get the extension ("ext" or ".ext" or full path)
  var extension = extname('x.' + path)
    .toLowerCase()
    .substr(1)

  if (!extension) {
    return false
  }

  return exports.types[extension] || false
}

/**
 * Populate the extensions and types maps.
 * @private
 */

function populateMaps (extensions, types) {
  // source preference (least -> most)
  var preference = ['nginx', 'apache', undefined, 'iana']

  Object.keys(db).forEach(function forEachMimeType (type) {
    var mime = db[type]
    var exts = mime.extensions

    if (!exts || !exts.length) {
      return
    }

    // mime -> extensions
    extensions[type] = exts

    // extension -> mime
    for (var i = 0; i < exts.length; i++) {
      var extension = exts[i]

      if (types[extension]) {
        var from = preference.indexOf(db[types[extension]].source)
        var to = preference.indexOf(mime.source)

        if (types[extension] !== 'application/octet-stream' &&
          (from > to || (from === to && types[extension].substr(0, 12) === 'application/'))) {
          // skip the remapping
          continue
        }
      }

      // set the extension -> mime
      types[extension] = type
    }
  })
}


/***/ }),

/***/ 744:
/***/ ((module) => {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var w = d * 7;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} [options]
 * @throws {Error} throw an error if val is not a non-empty string or a number
 * @return {String|Number}
 * @api public
 */

module.exports = function (val, options) {
  options = options || {};
  var type = typeof val;
  if (type === 'string' && val.length > 0) {
    return parse(val);
  } else if (type === 'number' && isFinite(val)) {
    return options.long ? fmtLong(val) : fmtShort(val);
  }
  throw new Error(
    'val is not a non-empty string or a valid number. val=' +
      JSON.stringify(val)
  );
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = String(str);
  if (str.length > 100) {
    return;
  }
  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
    str
  );
  if (!match) {
    return;
  }
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtShort(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return Math.round(ms / d) + 'd';
  }
  if (msAbs >= h) {
    return Math.round(ms / h) + 'h';
  }
  if (msAbs >= m) {
    return Math.round(ms / m) + 'm';
  }
  if (msAbs >= s) {
    return Math.round(ms / s) + 's';
  }
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function fmtLong(ms) {
  var msAbs = Math.abs(ms);
  if (msAbs >= d) {
    return plural(ms, msAbs, d, 'day');
  }
  if (msAbs >= h) {
    return plural(ms, msAbs, h, 'hour');
  }
  if (msAbs >= m) {
    return plural(ms, msAbs, m, 'minute');
  }
  if (msAbs >= s) {
    return plural(ms, msAbs, s, 'second');
  }
  return ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, msAbs, n, name) {
  var isPlural = msAbs >= n * 1.5;
  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
}


/***/ }),

/***/ 6799:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArgumentError = void 0;
const generate_stack_1 = __nccwpck_require__(4003);
const wrapStackTrace = (error, stack) => `${error.name}: ${error.message}\n${stack}`;
/**
@hidden
*/
class ArgumentError extends Error {
    constructor(message, context, errors = new Map()) {
        super(message);
        Object.defineProperty(this, "validationErrors", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.name = 'ArgumentError';
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, context);
        }
        else {
            this.stack = wrapStackTrace(this, (0, generate_stack_1.generateStackTrace)());
        }
        this.validationErrors = errors;
    }
}
exports.ArgumentError = ArgumentError;


/***/ }),

/***/ 9819:
/***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArgumentError = exports.Predicate = void 0;
const callsites_1 = __nccwpck_require__(4060);
const infer_label_1 = __nccwpck_require__(5442);
const predicate_1 = __nccwpck_require__(983);
Object.defineProperty(exports, "Predicate", ({ enumerable: true, get: function () { return predicate_1.Predicate; } }));
const base_predicate_1 = __nccwpck_require__(893);
const modifiers_1 = __nccwpck_require__(7569);
const predicates_1 = __nccwpck_require__(8025);
const test_1 = __nccwpck_require__(3291);
const ow = (value, labelOrPredicate, predicate) => {
    if (!(0, base_predicate_1.isPredicate)(labelOrPredicate) && typeof labelOrPredicate !== 'string') {
        throw new TypeError(`Expected second argument to be a predicate or a string, got \`${typeof labelOrPredicate}\``);
    }
    if ((0, base_predicate_1.isPredicate)(labelOrPredicate)) {
        // If the second argument is a predicate, infer the label
        const stackFrames = (0, callsites_1.default)();
        (0, test_1.default)(value, () => (0, infer_label_1.inferLabel)(stackFrames), labelOrPredicate);
        return;
    }
    (0, test_1.default)(value, labelOrPredicate, predicate);
};
Object.defineProperties(ow, {
    isValid: {
        value: (value, predicate) => {
            try {
                (0, test_1.default)(value, '', predicate);
                return true;
            }
            catch {
                return false;
            }
        }
    },
    create: {
        value: (labelOrPredicate, predicate) => (value, label) => {
            if ((0, base_predicate_1.isPredicate)(labelOrPredicate)) {
                const stackFrames = (0, callsites_1.default)();
                (0, test_1.default)(value, label !== null && label !== void 0 ? label : (() => (0, infer_label_1.inferLabel)(stackFrames)), labelOrPredicate);
                return;
            }
            (0, test_1.default)(value, label !== null && label !== void 0 ? label : (labelOrPredicate), predicate);
        }
    }
});
// Can't use `export default predicates(modifiers(ow)) as Ow` because the variable needs a type annotation to avoid a compiler error when used:
// Assertions require every name in the call target to be declared with an explicit type annotation.ts(2775)
// See https://github.com/microsoft/TypeScript/issues/36931 for more details.
const _ow = (0, predicates_1.default)((0, modifiers_1.default)(ow));
exports["default"] = _ow;
__exportStar(__nccwpck_require__(8025), exports);
var argument_error_1 = __nccwpck_require__(6799);
Object.defineProperty(exports, "ArgumentError", ({ enumerable: true, get: function () { return argument_error_1.ArgumentError; } }));


/***/ }),

/***/ 7569:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const predicates_1 = __nccwpck_require__(8025);
exports["default"] = (object) => {
    Object.defineProperties(object, {
        optional: {
            get: () => (0, predicates_1.default)({}, { optional: true })
        }
    });
    return object;
};


/***/ }),

/***/ 4028:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.not = void 0;
const random_id_1 = __nccwpck_require__(4754);
const predicate_1 = __nccwpck_require__(983);
/**
Operator which inverts the following validation.

@hidden

@param predictate - Predicate to wrap inside the operator.
*/
const not = (predicate) => {
    const originalAddValidator = predicate.addValidator;
    predicate.addValidator = (validator) => {
        const { validator: fn, message, negatedMessage } = validator;
        const placeholder = (0, random_id_1.default)();
        validator.message = (value, label) => (negatedMessage ?
            negatedMessage(value, label) :
            message(value, placeholder).replace(/ to /, '$&not ').replace(placeholder, label));
        validator.validator = (value) => !fn(value);
        predicate[predicate_1.validatorSymbol].push(validator);
        predicate.addValidator = originalAddValidator;
        return predicate;
    };
    return predicate;
};
exports.not = not;


/***/ }),

/***/ 8025:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnyPredicate = exports.DataViewPredicate = exports.ArrayBufferPredicate = exports.TypedArrayPredicate = exports.WeakSetPredicate = exports.SetPredicate = exports.WeakMapPredicate = exports.MapPredicate = exports.ErrorPredicate = exports.DatePredicate = exports.ObjectPredicate = exports.ArrayPredicate = exports.BooleanPredicate = exports.BigIntPredicate = exports.NumberPredicate = exports.StringPredicate = void 0;
const string_1 = __nccwpck_require__(5833);
Object.defineProperty(exports, "StringPredicate", ({ enumerable: true, get: function () { return string_1.StringPredicate; } }));
const number_1 = __nccwpck_require__(3429);
Object.defineProperty(exports, "NumberPredicate", ({ enumerable: true, get: function () { return number_1.NumberPredicate; } }));
const bigint_1 = __nccwpck_require__(6339);
Object.defineProperty(exports, "BigIntPredicate", ({ enumerable: true, get: function () { return bigint_1.BigIntPredicate; } }));
const boolean_1 = __nccwpck_require__(7914);
Object.defineProperty(exports, "BooleanPredicate", ({ enumerable: true, get: function () { return boolean_1.BooleanPredicate; } }));
const predicate_1 = __nccwpck_require__(983);
const array_1 = __nccwpck_require__(1039);
Object.defineProperty(exports, "ArrayPredicate", ({ enumerable: true, get: function () { return array_1.ArrayPredicate; } }));
const object_1 = __nccwpck_require__(8735);
Object.defineProperty(exports, "ObjectPredicate", ({ enumerable: true, get: function () { return object_1.ObjectPredicate; } }));
const date_1 = __nccwpck_require__(4764);
Object.defineProperty(exports, "DatePredicate", ({ enumerable: true, get: function () { return date_1.DatePredicate; } }));
const error_1 = __nccwpck_require__(9224);
Object.defineProperty(exports, "ErrorPredicate", ({ enumerable: true, get: function () { return error_1.ErrorPredicate; } }));
const map_1 = __nccwpck_require__(8472);
Object.defineProperty(exports, "MapPredicate", ({ enumerable: true, get: function () { return map_1.MapPredicate; } }));
const weak_map_1 = __nccwpck_require__(2239);
Object.defineProperty(exports, "WeakMapPredicate", ({ enumerable: true, get: function () { return weak_map_1.WeakMapPredicate; } }));
const set_1 = __nccwpck_require__(7458);
Object.defineProperty(exports, "SetPredicate", ({ enumerable: true, get: function () { return set_1.SetPredicate; } }));
const weak_set_1 = __nccwpck_require__(3249);
Object.defineProperty(exports, "WeakSetPredicate", ({ enumerable: true, get: function () { return weak_set_1.WeakSetPredicate; } }));
const typed_array_1 = __nccwpck_require__(9446);
Object.defineProperty(exports, "TypedArrayPredicate", ({ enumerable: true, get: function () { return typed_array_1.TypedArrayPredicate; } }));
const array_buffer_1 = __nccwpck_require__(1838);
Object.defineProperty(exports, "ArrayBufferPredicate", ({ enumerable: true, get: function () { return array_buffer_1.ArrayBufferPredicate; } }));
const data_view_1 = __nccwpck_require__(4120);
Object.defineProperty(exports, "DataViewPredicate", ({ enumerable: true, get: function () { return data_view_1.DataViewPredicate; } }));
const any_1 = __nccwpck_require__(488);
Object.defineProperty(exports, "AnyPredicate", ({ enumerable: true, get: function () { return any_1.AnyPredicate; } }));
exports["default"] = (object, options) => {
    Object.defineProperties(object, {
        string: {
            get: () => new string_1.StringPredicate(options)
        },
        number: {
            get: () => new number_1.NumberPredicate(options)
        },
        bigint: {
            get: () => new bigint_1.BigIntPredicate(options)
        },
        boolean: {
            get: () => new boolean_1.BooleanPredicate(options)
        },
        undefined: {
            get: () => new predicate_1.Predicate('undefined', options)
        },
        null: {
            get: () => new predicate_1.Predicate('null', options)
        },
        nullOrUndefined: {
            get: () => new predicate_1.Predicate('nullOrUndefined', options)
        },
        nan: {
            get: () => new predicate_1.Predicate('nan', options)
        },
        symbol: {
            get: () => new predicate_1.Predicate('symbol', options)
        },
        array: {
            get: () => new array_1.ArrayPredicate(options)
        },
        object: {
            get: () => new object_1.ObjectPredicate(options)
        },
        date: {
            get: () => new date_1.DatePredicate(options)
        },
        error: {
            get: () => new error_1.ErrorPredicate(options)
        },
        map: {
            get: () => new map_1.MapPredicate(options)
        },
        weakMap: {
            get: () => new weak_map_1.WeakMapPredicate(options)
        },
        set: {
            get: () => new set_1.SetPredicate(options)
        },
        weakSet: {
            get: () => new weak_set_1.WeakSetPredicate(options)
        },
        function: {
            get: () => new predicate_1.Predicate('Function', options)
        },
        buffer: {
            get: () => new predicate_1.Predicate('Buffer', options)
        },
        regExp: {
            get: () => new predicate_1.Predicate('RegExp', options)
        },
        promise: {
            get: () => new predicate_1.Predicate('Promise', options)
        },
        typedArray: {
            get: () => new typed_array_1.TypedArrayPredicate('TypedArray', options)
        },
        int8Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Int8Array', options)
        },
        uint8Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Uint8Array', options)
        },
        uint8ClampedArray: {
            get: () => new typed_array_1.TypedArrayPredicate('Uint8ClampedArray', options)
        },
        int16Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Int16Array', options)
        },
        uint16Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Uint16Array', options)
        },
        int32Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Int32Array', options)
        },
        uint32Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Uint32Array', options)
        },
        float32Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Float32Array', options)
        },
        float64Array: {
            get: () => new typed_array_1.TypedArrayPredicate('Float64Array', options)
        },
        arrayBuffer: {
            get: () => new array_buffer_1.ArrayBufferPredicate('ArrayBuffer', options)
        },
        sharedArrayBuffer: {
            get: () => new array_buffer_1.ArrayBufferPredicate('SharedArrayBuffer', options)
        },
        dataView: {
            get: () => new data_view_1.DataViewPredicate(options)
        },
        iterable: {
            get: () => new predicate_1.Predicate('Iterable', options)
        },
        any: {
            value: (...predicates) => new any_1.AnyPredicate(predicates, options)
        }
    });
    return object;
};


/***/ }),

/***/ 488:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AnyPredicate = void 0;
const argument_error_1 = __nccwpck_require__(6799);
const base_predicate_1 = __nccwpck_require__(893);
const generate_argument_error_message_1 = __nccwpck_require__(8221);
/**
@hidden
*/
class AnyPredicate {
    constructor(predicates, options = {}) {
        Object.defineProperty(this, "predicates", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: predicates
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
    }
    [base_predicate_1.testSymbol](value, main, label, idLabel) {
        const errors = new Map();
        for (const predicate of this.predicates) {
            try {
                main(value, label, predicate, idLabel);
                return;
            }
            catch (error) {
                if (value === undefined && this.options.optional === true) {
                    return;
                }
                // If we received an ArgumentError, then..
                if (error instanceof argument_error_1.ArgumentError) {
                    // Iterate through every error reported.
                    for (const [key, value] of error.validationErrors.entries()) {
                        // Get the current errors set, if any.
                        const alreadyPresent = errors.get(key);
                        // Add all errors under the same key
                        errors.set(key, new Set([...alreadyPresent !== null && alreadyPresent !== void 0 ? alreadyPresent : [], ...value]));
                    }
                }
            }
        }
        if (errors.size > 0) {
            // Generate the `error.message` property.
            const message = (0, generate_argument_error_message_1.generateArgumentErrorMessage)(errors, true);
            throw new argument_error_1.ArgumentError(`Any predicate failed with the following errors:\n${message}`, main, errors);
        }
    }
}
exports.AnyPredicate = AnyPredicate;


/***/ }),

/***/ 1838:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArrayBufferPredicate = void 0;
const predicate_1 = __nccwpck_require__(983);
class ArrayBufferPredicate extends predicate_1.Predicate {
    /**
    Test an array buffer to have a specific byte length.

    @param byteLength - The byte length of the array buffer.
    */
    byteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength === byteLength
        });
    }
    /**
    Test an array buffer to have a minimum byte length.

    @param byteLength - The minimum byte length of the array buffer.
    */
    minByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength >= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength - 1}\`, got \`${value.byteLength}\``
        });
    }
    /**
    Test an array buffer to have a minimum byte length.

    @param length - The minimum byte length of the array buffer.
    */
    maxByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength <= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength + 1}\`, got \`${value.byteLength}\``
        });
    }
}
exports.ArrayBufferPredicate = ArrayBufferPredicate;


/***/ }),

/***/ 1039:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ArrayPredicate = void 0;
const isEqual = __nccwpck_require__(9471);
const predicate_1 = __nccwpck_require__(983);
const match_shape_1 = __nccwpck_require__(2856);
const of_type_1 = __nccwpck_require__(5953);
class ArrayPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('array', options);
    }
    /**
    Test an array to have a specific length.

    @param length - The length of the array.
    */
    length(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value.length}\``,
            validator: value => value.length === length
        });
    }
    /**
    Test an array to have a minimum length.

    @param length - The minimum length of the array.
    */
    minLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value.length}\``,
            validator: value => value.length >= length,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum length of \`${length - 1}\`, got \`${value.length}\``
        });
    }
    /**
    Test an array to have a maximum length.

    @param length - The maximum length of the array.
    */
    maxLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value.length}\``,
            validator: value => value.length <= length,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum length of \`${length + 1}\`, got \`${value.length}\``
        });
    }
    /**
    Test an array to start with a specific value. The value is tested by identity, not structure.

    @param searchElement - The value that should be the start of the array.
    */
    startsWith(searchElement) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to start with \`${searchElement}\`, got \`${value[0]}\``,
            validator: value => value[0] === searchElement
        });
    }
    /**
    Test an array to end with a specific value. The value is tested by identity, not structure.

    @param searchElement - The value that should be the end of the array.
    */
    endsWith(searchElement) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to end with \`${searchElement}\`, got \`${value[value.length - 1]}\``,
            validator: value => value[value.length - 1] === searchElement
        });
    }
    /**
    Test an array to include all the provided elements. The values are tested by identity, not structure.

    @param searchElements - The values that should be included in the array.
    */
    includes(...searchElements) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to include all elements of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
            validator: value => searchElements.every(element => value.includes(element))
        });
    }
    /**
    Test an array to include any of the provided elements. The values are tested by identity, not structure.

    @param searchElements - The values that should be included in the array.
    */
    includesAny(...searchElements) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to include any element of \`${JSON.stringify(searchElements)}\`, got \`${JSON.stringify(value)}\``,
            validator: value => searchElements.some(element => value.includes(element))
        });
    }
    /**
    Test an array to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be empty, got \`${JSON.stringify(value)}\``,
            validator: value => value.length === 0
        });
    }
    /**
    Test an array to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: value => value.length > 0
        });
    }
    /**
    Test an array to be deeply equal to the provided array.

    @param expected - Expected value to match.
    */
    deepEqual(expected) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(value)}\``,
            validator: value => isEqual(value, expected)
        });
    }
    /**
    Test all elements in the array to match to provided predicate.

    @param predicate - The predicate that should be applied against every individual item.

    @example
    ```
    ow(['a', 1], ow.array.ofType(ow.any(ow.string, ow.number)));
    ```
    */
    ofType(predicate) {
        // TODO [typescript@>=5] If higher-kinded types are supported natively by typescript, refactor `addValidator` to use them to avoid the usage of `any`. Otherwise, bump or remove this TODO.
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: value => (0, of_type_1.default)(value, 'values', predicate)
        });
    }
    /**
    Test if the elements in the array exactly matches the elements placed at the same indices in the predicates array.

    @param predicates - Predicates to test the array against. Describes what the tested array should look like.

    @example
    ```
    ow(['1', 2], ow.array.exactShape([ow.string, ow.number]));
    ```
    */
    exactShape(predicates) {
        const shape = predicates;
        return this.addValidator({
            message: (_, label, message) => `${message.replace('Expected', 'Expected element')} in ${label}`,
            validator: object => (0, match_shape_1.exact)(object, shape, undefined, true)
        });
    }
}
exports.ArrayPredicate = ArrayPredicate;


/***/ }),

/***/ 893:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isPredicate = exports.testSymbol = void 0;
/**
@hidden
*/
exports.testSymbol = Symbol('test');
/**
@hidden
*/
const isPredicate = (value) => Boolean(value[exports.testSymbol]);
exports.isPredicate = isPredicate;


/***/ }),

/***/ 6339:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BigIntPredicate = void 0;
const predicate_1 = __nccwpck_require__(983);
class BigIntPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('bigint', options);
    }
}
exports.BigIntPredicate = BigIntPredicate;


/***/ }),

/***/ 7914:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BooleanPredicate = void 0;
const predicate_1 = __nccwpck_require__(983);
class BooleanPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('boolean', options);
    }
    /**
    Test a boolean to be true.
    */
    get true() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be true, got ${value}`,
            validator: value => value
        });
    }
    /**
    Test a boolean to be false.
    */
    get false() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be false, got ${value}`,
            validator: value => !value
        });
    }
}
exports.BooleanPredicate = BooleanPredicate;


/***/ }),

/***/ 4120:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataViewPredicate = void 0;
const predicate_1 = __nccwpck_require__(983);
class DataViewPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('DataView', options);
    }
    /**
    Test a DataView to have a specific byte length.

    @param byteLength - The byte length of the DataView.
    */
    byteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength === byteLength
        });
    }
    /**
    Test a DataView to have a minimum byte length.

    @param byteLength - The minimum byte length of the DataView.
    */
    minByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength >= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength - 1}\`, got \`${value.byteLength}\``
        });
    }
    /**
    Test a DataView to have a minimum byte length.

    @param length - The minimum byte length of the DataView.
    */
    maxByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength <= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength + 1}\`, got \`${value.byteLength}\``
        });
    }
}
exports.DataViewPredicate = DataViewPredicate;


/***/ }),

/***/ 4764:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatePredicate = void 0;
const predicate_1 = __nccwpck_require__(983);
class DatePredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('date', options);
    }
    /**
    Test a date to be before another date.

    @param date - Maximum value.
    */
    before(date) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} ${value.toISOString()} to be before ${date.toISOString()}`,
            validator: value => value.getTime() < date.getTime()
        });
    }
    /**
    Test a date to be before another date.

    @param date - Minimum value.
    */
    after(date) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} ${value.toISOString()} to be after ${date.toISOString()}`,
            validator: value => value.getTime() > date.getTime()
        });
    }
}
exports.DatePredicate = DatePredicate;


/***/ }),

/***/ 9224:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ErrorPredicate = void 0;
const predicate_1 = __nccwpck_require__(983);
class ErrorPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('error', options);
    }
    /**
    Test an error to have a specific name.

    @param expected - Expected name of the Error.
    */
    name(expected) {
        return this.addValidator({
            message: (error, label) => `Expected ${label} to have name \`${expected}\`, got \`${error.name}\``,
            validator: error => error.name === expected
        });
    }
    /**
    Test an error to have a specific message.

    @param expected - Expected message of the Error.
    */
    message(expected) {
        return this.addValidator({
            message: (error, label) => `Expected ${label} message to be \`${expected}\`, got \`${error.message}\``,
            validator: error => error.message === expected
        });
    }
    /**
    Test the error message to include a specific message.

    @param message - Message that should be included in the error.
    */
    messageIncludes(message) {
        return this.addValidator({
            message: (error, label) => `Expected ${label} message to include \`${message}\`, got \`${error.message}\``,
            validator: error => error.message.includes(message)
        });
    }
    /**
    Test the error object to have specific keys.

    @param keys - One or more keys which should be part of the error object.
    */
    hasKeys(...keys) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} message to have keys \`${keys.join('`, `')}\``,
            validator: error => keys.every(key => Object.prototype.hasOwnProperty.call(error, key))
        });
    }
    /**
    Test an error to be of a specific instance type.

    @param instance - The expected instance type of the error.
    */
    instanceOf(instance) {
        return this.addValidator({
            message: (error, label) => `Expected ${label} \`${error.name}\` to be of type \`${instance.name}\``,
            validator: error => error instanceof instance
        });
    }
    /**
    Test an Error to be a TypeError.
    */
    get typeError() {
        return this.instanceOf(TypeError);
    }
    /**
    Test an Error to be an EvalError.
    */
    get evalError() {
        return this.instanceOf(EvalError);
    }
    /**
    Test an Error to be a RangeError.
    */
    get rangeError() {
        return this.instanceOf(RangeError);
    }
    /**
    Test an Error to be a ReferenceError.
    */
    get referenceError() {
        return this.instanceOf(ReferenceError);
    }
    /**
    Test an Error to be a SyntaxError.
    */
    get syntaxError() {
        return this.instanceOf(SyntaxError);
    }
    /**
    Test an Error to be a URIError.
    */
    get uriError() {
        return this.instanceOf(URIError);
    }
}
exports.ErrorPredicate = ErrorPredicate;


/***/ }),

/***/ 8472:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MapPredicate = void 0;
const isEqual = __nccwpck_require__(9471);
const has_items_1 = __nccwpck_require__(4416);
const of_type_1 = __nccwpck_require__(5953);
const predicate_1 = __nccwpck_require__(983);
class MapPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('Map', options);
    }
    /**
    Test a Map to have a specific size.

    @param size - The size of the Map.
    */
    size(size) {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to have size \`${size}\`, got \`${map.size}\``,
            validator: map => map.size === size
        });
    }
    /**
    Test an Map to have a minimum size.

    @param size - The minimum size of the Map.
    */
    minSize(size) {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to have a minimum size of \`${size}\`, got \`${map.size}\``,
            validator: map => map.size >= size,
            negatedMessage: (map, label) => `Expected ${label} to have a maximum size of \`${size - 1}\`, got \`${map.size}\``
        });
    }
    /**
    Test an Map to have a maximum size.

    @param size - The maximum size of the Map.
    */
    maxSize(size) {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to have a maximum size of \`${size}\`, got \`${map.size}\``,
            validator: map => map.size <= size,
            negatedMessage: (map, label) => `Expected ${label} to have a minimum size of \`${size + 1}\`, got \`${map.size}\``
        });
    }
    /**
    Test a Map to include all the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that should be a key in the Map.
    */
    hasKeys(...keys) {
        return this.addValidator({
            message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
            validator: map => (0, has_items_1.default)(map, keys)
        });
    }
    /**
    Test a Map to include any of the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that could be a key in the Map.
    */
    hasAnyKeys(...keys) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
            validator: map => keys.some(key => map.has(key))
        });
    }
    /**
    Test a Map to include all the provided values. The values are tested by identity, not structure.

    @param values - The values that should be a value in the Map.
    */
    hasValues(...values) {
        return this.addValidator({
            message: (_, label, missingValues) => `Expected ${label} to have values \`${JSON.stringify(missingValues)}\``,
            validator: map => (0, has_items_1.default)(new Set(map.values()), values)
        });
    }
    /**
    Test a Map to include any of the provided values. The values are tested by identity, not structure.

    @param values - The values that could be a value in the Map.
    */
    hasAnyValues(...values) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any value of \`${JSON.stringify(values)}\``,
            validator: map => {
                const valueSet = new Set(map.values());
                return values.some(key => valueSet.has(key));
            }
        });
    }
    /**
    Test all the keys in the Map to match the provided predicate.

    @param predicate - The predicate that should be applied against every key in the Map.
    */
    keysOfType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: map => (0, of_type_1.default)(map.keys(), 'keys', predicate)
        });
    }
    /**
    Test all the values in the Map to match the provided predicate.

    @param predicate - The predicate that should be applied against every value in the Map.
    */
    valuesOfType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: map => (0, of_type_1.default)(map.values(), 'values', predicate)
        });
    }
    /**
    Test a Map to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to be empty, got \`${JSON.stringify([...map])}\``,
            validator: map => map.size === 0
        });
    }
    /**
    Test a Map to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: map => map.size > 0
        });
    }
    /**
    Test a Map to be deeply equal to the provided Map.

    @param expected - Expected Map to match.
    */
    deepEqual(expected) {
        return this.addValidator({
            message: (map, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify([...expected])}\`, got \`${JSON.stringify([...map])}\``,
            validator: map => isEqual(map, expected)
        });
    }
}
exports.MapPredicate = MapPredicate;


/***/ }),

/***/ 3429:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NumberPredicate = void 0;
const is_1 = __nccwpck_require__(4001);
const predicate_1 = __nccwpck_require__(983);
class NumberPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('number', options);
    }
    /**
    Test a number to be in a specified range.

    @param start - Start of the range.
    @param end - End of the range.
    */
    inRange(start, end) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be in range [${start}..${end}], got ${value}`,
            validator: value => is_1.default.inRange(value, [start, end])
        });
    }
    /**
    Test a number to be greater than the provided value.

    @param number - Minimum value.
    */
    greaterThan(number) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be greater than ${number}, got ${value}`,
            validator: value => value > number
        });
    }
    /**
    Test a number to be greater than or equal to the provided value.

    @param number - Minimum value.
    */
    greaterThanOrEqual(number) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be greater than or equal to ${number}, got ${value}`,
            validator: value => value >= number
        });
    }
    /**
    Test a number to be less than the provided value.

    @param number - Maximum value.
    */
    lessThan(number) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be less than ${number}, got ${value}`,
            validator: value => value < number
        });
    }
    /**
    Test a number to be less than or equal to the provided value.

    @param number - Minimum value.
    */
    lessThanOrEqual(number) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be less than or equal to ${number}, got ${value}`,
            validator: value => value <= number
        });
    }
    /**
    Test a number to be equal to a specified number.

    @param expected - Expected value to match.
    */
    equal(expected) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be equal to ${expected}, got ${value}`,
            validator: value => value === expected
        });
    }
    /**
    Test if a number is an element of the provided list.

    @param list - List of possible values.
    */
    oneOf(list) {
        return this.addValidator({
            message: (value, label) => {
                let printedList = JSON.stringify(list);
                if (list.length > 10) {
                    const overflow = list.length - 10;
                    printedList = JSON.stringify(list.slice(0, 10)).replace(/]$/, `,…+${overflow} more]`);
                }
                return `Expected ${label} to be one of \`${printedList}\`, got ${value}`;
            },
            validator: value => list.includes(value)
        });
    }
    /**
    Test a number to be an integer.
    */
    get integer() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be an integer, got ${value}`,
            validator: value => is_1.default.integer(value)
        });
    }
    /**
    Test a number to be finite.
    */
    get finite() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be finite, got ${value}`,
            validator: value => !is_1.default.infinite(value)
        });
    }
    /**
    Test a number to be infinite.
    */
    get infinite() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be infinite, got ${value}`,
            validator: value => is_1.default.infinite(value)
        });
    }
    /**
    Test a number to be positive.
    */
    get positive() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be positive, got ${value}`,
            validator: value => value > 0
        });
    }
    /**
    Test a number to be negative.
    */
    get negative() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be negative, got ${value}`,
            validator: value => value < 0
        });
    }
    /**
    Test a number to be an integer or infinite.
    */
    get integerOrInfinite() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be an integer or infinite, got ${value}`,
            validator: value => is_1.default.integer(value) || is_1.default.infinite(value)
        });
    }
    /**
    Test a number to be in a valid range for a 8-bit unsigned integer.
    */
    get uint8() {
        return this.integer.inRange(0, 255);
    }
    /**
    Test a number to be in a valid range for a 16-bit unsigned integer.
    */
    get uint16() {
        return this.integer.inRange(0, 65535);
    }
    /**
    Test a number to be in a valid range for a 32-bit unsigned integer.
    */
    get uint32() {
        return this.integer.inRange(0, 4294967295);
    }
    /**
    Test a number to be in a valid range for a 8-bit signed integer.
    */
    get int8() {
        return this.integer.inRange(-128, 127);
    }
    /**
    Test a number to be in a valid range for a 16-bit signed integer.
    */
    get int16() {
        return this.integer.inRange(-32768, 32767);
    }
    /**
    Test a number to be in a valid range for a 32-bit signed integer.
    */
    get int32() {
        return this.integer.inRange(-2147483648, 2147483647);
    }
}
exports.NumberPredicate = NumberPredicate;


/***/ }),

/***/ 8735:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ObjectPredicate = void 0;
const is_1 = __nccwpck_require__(4001);
const dotProp = __nccwpck_require__(8399);
const isEqual = __nccwpck_require__(9471);
const has_items_1 = __nccwpck_require__(4416);
const of_type_1 = __nccwpck_require__(5953);
const of_type_deep_1 = __nccwpck_require__(3536);
const match_shape_1 = __nccwpck_require__(2856);
const predicate_1 = __nccwpck_require__(983);
class ObjectPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('object', options);
    }
    /**
    Test if an Object is a plain object.
    */
    get plain() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to be a plain object`,
            validator: object => is_1.default.plainObject(object)
        });
    }
    /**
    Test an object to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (object, label) => `Expected ${label} to be empty, got \`${JSON.stringify(object)}\``,
            validator: object => Object.keys(object).length === 0
        });
    }
    /**
    Test an object to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: object => Object.keys(object).length > 0
        });
    }
    /**
    Test all the values in the object to match the provided predicate.

    @param predicate - The predicate that should be applied against every value in the object.
    */
    valuesOfType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: object => (0, of_type_1.default)(Object.values(object), 'values', predicate)
        });
    }
    /**
    Test all the values in the object deeply to match the provided predicate.

    @param predicate - The predicate that should be applied against every value in the object.
    */
    deepValuesOfType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: object => (0, of_type_deep_1.default)(object, predicate)
        });
    }
    /**
    Test an object to be deeply equal to the provided object.

    @param expected - Expected object to match.
    */
    deepEqual(expected) {
        return this.addValidator({
            message: (object, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify(expected)}\`, got \`${JSON.stringify(object)}\``,
            validator: object => isEqual(object, expected)
        });
    }
    /**
    Test an object to be of a specific instance type.

    @param instance - The expected instance type of the object.
    */
    instanceOf(instance) {
        return this.addValidator({
            message: (object, label) => {
                var _a;
                let { name } = (_a = object === null || object === void 0 ? void 0 : object.constructor) !== null && _a !== void 0 ? _a : {};
                if (!name || name === 'Object') {
                    name = JSON.stringify(object);
                }
                return `Expected ${label} \`${name}\` to be of type \`${instance.name}\``;
            },
            validator: object => object instanceof instance
        });
    }
    /**
    Test an object to include all the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.

    @param keys - The keys that should be present in the object.
    */
    hasKeys(...keys) {
        return this.addValidator({
            message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
            validator: object => (0, has_items_1.default)({
                has: item => dotProp.has(object, item)
            }, keys)
        });
    }
    /**
    Test an object to include any of the provided keys. You can use [dot-notation](https://github.com/sindresorhus/dot-prop) in a key to access nested properties.

    @param keys - The keys that could be a key in the object.
    */
    hasAnyKeys(...keys) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
            validator: object => keys.some(key => dotProp.has(object, key))
        });
    }
    /**
    Test an object to match the `shape` partially. This means that it ignores unexpected properties. The shape comparison is deep.

    The shape is an object which describes how the tested object should look like. The keys are the same as the source object and the values are predicates.

    @param shape - Shape to test the object against.

    @example
    ```
    import ow from 'ow';

    const object = {
        unicorn: '🦄',
        rainbow: '🌈'
    };

    ow(object, ow.object.partialShape({
        unicorn: ow.string
    }));
    ```
    */
    partialShape(shape) {
        return this.addValidator({
            // TODO: Improve this when message handling becomes smarter
            message: (_, label, message) => `${message.replace('Expected', 'Expected property')} in ${label}`,
            validator: object => (0, match_shape_1.partial)(object, shape)
        });
    }
    /**
    Test an object to match the `shape` exactly. This means that will fail if it comes across unexpected properties. The shape comparison is deep.

    The shape is an object which describes how the tested object should look like. The keys are the same as the source object and the values are predicates.

    @param shape - Shape to test the object against.

    @example
    ```
    import ow from 'ow';

    ow({unicorn: '🦄'}, ow.object.exactShape({
        unicorn: ow.string
    }));
    ```
    */
    exactShape(shape) {
        // TODO [typescript@>=5] If higher-kinded types are supported natively by typescript, refactor `addValidator` to use them to avoid the usage of `any`. Otherwise, bump or remove this TODO.
        return this.addValidator({
            // TODO: Improve this when message handling becomes smarter
            message: (_, label, message) => `${message.replace('Expected', 'Expected property')} in ${label}`,
            validator: object => (0, match_shape_1.exact)(object, shape)
        });
    }
}
exports.ObjectPredicate = ObjectPredicate;


/***/ }),

/***/ 983:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Predicate = exports.validatorSymbol = void 0;
const is_1 = __nccwpck_require__(4001);
const argument_error_1 = __nccwpck_require__(6799);
const not_1 = __nccwpck_require__(4028);
const base_predicate_1 = __nccwpck_require__(893);
const generate_argument_error_message_1 = __nccwpck_require__(8221);
/**
@hidden
*/
exports.validatorSymbol = Symbol('validators');
/**
@hidden
*/
class Predicate {
    constructor(type, options = {}) {
        Object.defineProperty(this, "type", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: type
        });
        Object.defineProperty(this, "options", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: options
        });
        Object.defineProperty(this, "context", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: {
                validators: []
            }
        });
        this.context = {
            ...this.context,
            ...this.options
        };
        const typeString = this.type.charAt(0).toLowerCase() + this.type.slice(1);
        this.addValidator({
            message: (value, label) => {
                // We do not include type in this label as we do for other messages, because it would be redundant.
                const label_ = label === null || label === void 0 ? void 0 : label.slice(this.type.length + 1);
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                return `Expected ${label_ || 'argument'} to be of type \`${this.type}\` but received type \`${(0, is_1.default)(value)}\``;
            },
            validator: value => is_1.default[typeString](value)
        });
    }
    /**
    @hidden
    */
    [base_predicate_1.testSymbol](value, main, label, idLabel) {
        // Create a map of labels -> received errors.
        const errors = new Map();
        for (const { validator, message } of this.context.validators) {
            if (this.options.optional === true && value === undefined) {
                continue;
            }
            let result;
            try {
                result = validator(value);
            }
            catch (error) {
                // Any errors caught means validators couldn't process the input.
                result = error;
            }
            if (result === true) {
                continue;
            }
            const label2 = is_1.default.function_(label) ? label() : label;
            const labelWithTick = (label2 && idLabel) ? `\`${label2}\`` : label2;
            const label_ = labelWithTick ?
                `${this.type} ${labelWithTick}` :
                this.type;
            const mapKey = label2 || this.type;
            // Get the current errors encountered for this label.
            const currentErrors = errors.get(mapKey);
            // Pre-generate the error message that will be reported to the user.
            const errorMessage = message(value, label_, result);
            // If we already have any errors for this label.
            if (currentErrors) {
                // If we don't already have this error logged, add it.
                currentErrors.add(errorMessage);
            }
            else {
                // Set this label and error in the full map.
                errors.set(mapKey, new Set([errorMessage]));
            }
        }
        // If we have any errors to report, throw.
        if (errors.size > 0) {
            // Generate the `error.message` property.
            const message = (0, generate_argument_error_message_1.generateArgumentErrorMessage)(errors);
            throw new argument_error_1.ArgumentError(message, main, errors);
        }
    }
    /**
    @hidden
    */
    get [exports.validatorSymbol]() {
        return this.context.validators;
    }
    /**
    Invert the following validators.
    */
    get not() {
        return (0, not_1.not)(this);
    }
    /**
    Test if the value matches a custom validation function. The validation function should return an object containing a `validator` and `message`. If the `validator` is `false`, the validation fails and the `message` will be used as error message. If the `message` is a function, the function is invoked with the `label` as argument to let you further customize the error message.

    @param customValidator - Custom validation function.
    */
    validate(customValidator) {
        return this.addValidator({
            message: (_, label, error) => typeof error === 'string' ?
                `(${label}) ${error}` :
                error(label),
            validator: value => {
                const { message, validator } = customValidator(value);
                if (validator) {
                    return true;
                }
                return message;
            }
        });
    }
    /**
    Test if the value matches a custom validation function. The validation function should return `true` if the value passes the function. If the function either returns `false` or a string, the function fails and the string will be used as error message.

    @param validator - Validation function.
    */
    is(validator) {
        return this.addValidator({
            message: (value, label, error) => (error ?
                `(${label}) ${error}` :
                `Expected ${label} \`${value}\` to pass custom validation function`),
            validator
        });
    }
    /**
    Provide a new error message to be thrown when the validation fails.

    @param newMessage - Either a string containing the new message or a function returning the new message.

    @example
    ```
    ow('🌈', 'unicorn', ow.string.equals('🦄').message('Expected unicorn, got rainbow'));
    //=> ArgumentError: Expected unicorn, got rainbow
    ```

    @example
    ```
    ow('🌈', ow.string.minLength(5).message((value, label) => `Expected ${label}, to have a minimum length of 5, got \`${value}\``));
    //=> ArgumentError: Expected string, to be have a minimum length of 5, got `🌈`
    ```
    */
    message(newMessage) {
        const { validators } = this.context;
        validators[validators.length - 1].message = (value, label) => {
            if (typeof newMessage === 'function') {
                return newMessage(value, label);
            }
            return newMessage;
        };
        return this;
    }
    /**
    Register a new validator.

    @param validator - Validator to register.
    */
    addValidator(validator) {
        this.context.validators.push(validator);
        return this;
    }
}
exports.Predicate = Predicate;


/***/ }),

/***/ 7458:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SetPredicate = void 0;
const isEqual = __nccwpck_require__(9471);
const has_items_1 = __nccwpck_require__(4416);
const of_type_1 = __nccwpck_require__(5953);
const predicate_1 = __nccwpck_require__(983);
class SetPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('Set', options);
    }
    /**
    Test a Set to have a specific size.

    @param size - The size of the Set.
    */
    size(size) {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to have size \`${size}\`, got \`${set.size}\``,
            validator: set => set.size === size
        });
    }
    /**
    Test a Set to have a minimum size.

    @param size - The minimum size of the Set.
    */
    minSize(size) {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to have a minimum size of \`${size}\`, got \`${set.size}\``,
            validator: set => set.size >= size,
            negatedMessage: (set, label) => `Expected ${label} to have a maximum size of \`${size - 1}\`, got \`${set.size}\``
        });
    }
    /**
    Test a Set to have a maximum size.

    @param size - The maximum size of the Set.
    */
    maxSize(size) {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to have a maximum size of \`${size}\`, got \`${set.size}\``,
            validator: set => set.size <= size,
            negatedMessage: (set, label) => `Expected ${label} to have a minimum size of \`${size + 1}\`, got \`${set.size}\``
        });
    }
    /**
    Test a Set to include all the provided items. The items are tested by identity, not structure.

    @param items - The items that should be a item in the Set.
    */
    has(...items) {
        return this.addValidator({
            message: (_, label, missingItems) => `Expected ${label} to have items \`${JSON.stringify(missingItems)}\``,
            validator: set => (0, has_items_1.default)(set, items)
        });
    }
    /**
    Test a Set to include any of the provided items. The items are tested by identity, not structure.

    @param items - The items that could be a item in the Set.
    */
    hasAny(...items) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any item of \`${JSON.stringify(items)}\``,
            validator: set => items.some(item => set.has(item))
        });
    }
    /**
    Test all the items in the Set to match the provided predicate.

    @param predicate - The predicate that should be applied against every item in the Set.
    */
    ofType(predicate) {
        return this.addValidator({
            message: (_, label, error) => `(${label}) ${error}`,
            validator: set => (0, of_type_1.default)(set, 'values', predicate)
        });
    }
    /**
    Test a Set to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to be empty, got \`${JSON.stringify([...set])}\``,
            validator: set => set.size === 0
        });
    }
    /**
    Test a Set to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: set => set.size > 0
        });
    }
    /**
    Test a Set to be deeply equal to the provided Set.

    @param expected - Expected Set to match.
    */
    deepEqual(expected) {
        return this.addValidator({
            message: (set, label) => `Expected ${label} to be deeply equal to \`${JSON.stringify([...expected])}\`, got \`${JSON.stringify([...set])}\``,
            validator: set => isEqual(set, expected)
        });
    }
}
exports.SetPredicate = SetPredicate;


/***/ }),

/***/ 5833:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StringPredicate = void 0;
const is_1 = __nccwpck_require__(4001);
const valiDate = __nccwpck_require__(2725);
const predicate_1 = __nccwpck_require__(983);
class StringPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('string', options);
    }
    /**
    Test a string to have a specific length.

    @param length - The length of the string.
    */
    length(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value}\``,
            validator: value => value.length === length
        });
    }
    /**
    Test a string to have a minimum length.

    @param length - The minimum length of the string.
    */
    minLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value}\``,
            validator: value => value.length >= length,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum length of \`${length - 1}\`, got \`${value}\``
        });
    }
    /**
    Test a string to have a maximum length.

    @param length - The maximum length of the string.
    */
    maxLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value}\``,
            validator: value => value.length <= length,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum length of \`${length + 1}\`, got \`${value}\``
        });
    }
    /**
    Test a string against a regular expression.

    @param regex - The regular expression to match the value with.
    */
    matches(regex) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to match \`${regex}\`, got \`${value}\``,
            validator: value => regex.test(value)
        });
    }
    /**
    Test a string to start with a specific value.

    @param searchString - The value that should be the start of the string.
    */
    startsWith(searchString) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to start with \`${searchString}\`, got \`${value}\``,
            validator: value => value.startsWith(searchString)
        });
    }
    /**
    Test a string to end with a specific value.

    @param searchString - The value that should be the end of the string.
    */
    endsWith(searchString) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to end with \`${searchString}\`, got \`${value}\``,
            validator: value => value.endsWith(searchString)
        });
    }
    /**
    Test a string to include a specific value.

    @param searchString - The value that should be included in the string.
    */
    includes(searchString) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to include \`${searchString}\`, got \`${value}\``,
            validator: value => value.includes(searchString)
        });
    }
    /**
    Test if the string is an element of the provided list.

    @param list - List of possible values.
    */
    oneOf(list) {
        return this.addValidator({
            message: (value, label) => {
                let printedList = JSON.stringify(list);
                if (list.length > 10) {
                    const overflow = list.length - 10;
                    printedList = JSON.stringify(list.slice(0, 10)).replace(/]$/, `,…+${overflow} more]`);
                }
                return `Expected ${label} to be one of \`${printedList}\`, got \`${value}\``;
            },
            validator: value => list.includes(value)
        });
    }
    /**
    Test a string to be empty.
    */
    get empty() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be empty, got \`${value}\``,
            validator: value => value === ''
        });
    }
    /**
    Test a string to be not empty.
    */
    get nonEmpty() {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to not be empty`,
            validator: value => value !== ''
        });
    }
    /**
    Test a string to be equal to a specified string.

    @param expected - Expected value to match.
    */
    equals(expected) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be equal to \`${expected}\`, got \`${value}\``,
            validator: value => value === expected
        });
    }
    /**
    Test a string to be alphanumeric.
    */
    get alphanumeric() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be alphanumeric, got \`${value}\``,
            validator: value => /^[a-z\d]+$/i.test(value)
        });
    }
    /**
    Test a string to be alphabetical.
    */
    get alphabetical() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be alphabetical, got \`${value}\``,
            validator: value => /^[a-z]+$/gi.test(value)
        });
    }
    /**
    Test a string to be numeric.
    */
    get numeric() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be numeric, got \`${value}\``,
            validator: value => /^[+-]?\d+$/i.test(value)
        });
    }
    /**
    Test a string to be a valid date.
    */
    get date() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be a date, got \`${value}\``,
            validator: valiDate
        });
    }
    /**
    Test a non-empty string to be lowercase. Matching both alphabetical & numbers.
    */
    get lowercase() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be lowercase, got \`${value}\``,
            validator: value => value.trim() !== '' && value === value.toLowerCase()
        });
    }
    /**
    Test a non-empty string to be uppercase. Matching both alphabetical & numbers.
    */
    get uppercase() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be uppercase, got \`${value}\``,
            validator: value => value.trim() !== '' && value === value.toUpperCase()
        });
    }
    /**
    Test a string to be a valid URL.
    */
    get url() {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to be a URL, got \`${value}\``,
            validator: is_1.default.urlString
        });
    }
}
exports.StringPredicate = StringPredicate;


/***/ }),

/***/ 9446:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TypedArrayPredicate = void 0;
const predicate_1 = __nccwpck_require__(983);
class TypedArrayPredicate extends predicate_1.Predicate {
    /**
    Test a typed array to have a specific byte length.

    @param byteLength - The byte length of the typed array.
    */
    byteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength === byteLength
        });
    }
    /**
    Test a typed array to have a minimum byte length.

    @param byteLength - The minimum byte length of the typed array.
    */
    minByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength >= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength - 1}\`, got \`${value.byteLength}\``
        });
    }
    /**
    Test a typed array to have a minimum byte length.

    @param length - The minimum byte length of the typed array.
    */
    maxByteLength(byteLength) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum byte length of \`${byteLength}\`, got \`${value.byteLength}\``,
            validator: value => value.byteLength <= byteLength,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum byte length of \`${byteLength + 1}\`, got \`${value.byteLength}\``
        });
    }
    /**
    Test a typed array to have a specific length.

    @param length - The length of the typed array.
    */
    length(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have length \`${length}\`, got \`${value.length}\``,
            validator: value => value.length === length
        });
    }
    /**
    Test a typed array to have a minimum length.

    @param length - The minimum length of the typed array.
    */
    minLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a minimum length of \`${length}\`, got \`${value.length}\``,
            validator: value => value.length >= length,
            negatedMessage: (value, label) => `Expected ${label} to have a maximum length of \`${length - 1}\`, got \`${value.length}\``
        });
    }
    /**
    Test a typed array to have a maximum length.

    @param length - The maximum length of the typed array.
    */
    maxLength(length) {
        return this.addValidator({
            message: (value, label) => `Expected ${label} to have a maximum length of \`${length}\`, got \`${value.length}\``,
            validator: value => value.length <= length,
            negatedMessage: (value, label) => `Expected ${label} to have a minimum length of \`${length + 1}\`, got \`${value.length}\``
        });
    }
}
exports.TypedArrayPredicate = TypedArrayPredicate;


/***/ }),

/***/ 2239:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WeakMapPredicate = void 0;
const has_items_1 = __nccwpck_require__(4416);
const predicate_1 = __nccwpck_require__(983);
class WeakMapPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('WeakMap', options);
    }
    /**
    Test a WeakMap to include all the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that should be a key in the WeakMap.
    */
    hasKeys(...keys) {
        return this.addValidator({
            message: (_, label, missingKeys) => `Expected ${label} to have keys \`${JSON.stringify(missingKeys)}\``,
            validator: map => (0, has_items_1.default)(map, keys)
        });
    }
    /**
    Test a WeakMap to include any of the provided keys. The keys are tested by identity, not structure.

    @param keys - The keys that could be a key in the WeakMap.
    */
    hasAnyKeys(...keys) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any key of \`${JSON.stringify(keys)}\``,
            validator: map => keys.some(key => map.has(key))
        });
    }
}
exports.WeakMapPredicate = WeakMapPredicate;


/***/ }),

/***/ 3249:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.WeakSetPredicate = void 0;
const has_items_1 = __nccwpck_require__(4416);
const predicate_1 = __nccwpck_require__(983);
class WeakSetPredicate extends predicate_1.Predicate {
    /**
    @hidden
    */
    constructor(options) {
        super('WeakSet', options);
    }
    /**
    Test a WeakSet to include all the provided items. The items are tested by identity, not structure.

    @param items - The items that should be a item in the WeakSet.
    */
    has(...items) {
        return this.addValidator({
            message: (_, label, missingItems) => `Expected ${label} to have items \`${JSON.stringify(missingItems)}\``,
            validator: set => (0, has_items_1.default)(set, items)
        });
    }
    /**
    Test a WeakSet to include any of the provided items. The items are tested by identity, not structure.

    @param items - The items that could be a item in the WeakSet.
    */
    hasAny(...items) {
        return this.addValidator({
            message: (_, label) => `Expected ${label} to have any item of \`${JSON.stringify(items)}\``,
            validator: set => items.some(item => set.has(item))
        });
    }
}
exports.WeakSetPredicate = WeakSetPredicate;


/***/ }),

/***/ 3291:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const base_predicate_1 = __nccwpck_require__(893);
/**
Validate the value against the provided predicate.

@hidden

@param value - Value to test.
@param label - Label which should be used in error messages.
@param predicate - Predicate to test to value against.
@param idLabel - If true, the label is a variable or type. Default: true.
*/
function test(value, label, predicate, idLabel = true) {
    predicate[base_predicate_1.testSymbol](value, test, label, idLabel);
}
exports["default"] = test;


/***/ }),

/***/ 8221:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateArgumentErrorMessage = void 0;
/**
Generates a complete message from all errors generated by predicates.

@param errors - The errors generated by the predicates.
@param isAny - If this function is called from the any argument.
@hidden
*/
const generateArgumentErrorMessage = (errors, isAny = false) => {
    const message = [];
    const errorArray = [...errors.entries()];
    const anyErrorWithoutOneItemOnly = errorArray.some(([, array]) => array.size !== 1);
    // If only one error "key" is present, enumerate all of those errors only.
    if (errorArray.length === 1) {
        const [, returnedErrors] = errorArray[0];
        if (!isAny && returnedErrors.size === 1) {
            const [errorMessage] = returnedErrors;
            return errorMessage;
        }
        for (const entry of returnedErrors) {
            message.push(`${isAny ? '  - ' : ''}${entry}`);
        }
        return message.join('\n');
    }
    // If every predicate returns just one error, enumerate them as is.
    if (!anyErrorWithoutOneItemOnly) {
        return errorArray.map(([, [item]]) => `  - ${item}`).join('\n');
    }
    // Else, iterate through all the errors and enumerate them.
    for (const [key, value] of errorArray) {
        message.push(`Errors from the "${key}" predicate:`);
        for (const entry of value) {
            message.push(`  - ${entry}`);
        }
    }
    return message.join('\n');
};
exports.generateArgumentErrorMessage = generateArgumentErrorMessage;


/***/ }),

/***/ 4003:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateStackTrace = void 0;
/**
Generates a useful stacktrace that points to the user's code where the error happened on platforms without the `Error.captureStackTrace()` method.

@hidden
*/
const generateStackTrace = () => {
    const stack = new RangeError('INTERNAL_OW_ERROR').stack;
    return stack;
};
exports.generateStackTrace = generateStackTrace;


/***/ }),

/***/ 4416:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
Retrieve the missing values in a collection based on an array of items.

@hidden

@param source - Source collection to search through.
@param items - Items to search for.
@param maxValues - Maximum number of values after the search process is stopped. Default: 5.
*/
exports["default"] = (source, items, maxValues = 5) => {
    const missingValues = [];
    for (const value of items) {
        if (source.has(value)) {
            continue;
        }
        missingValues.push(value);
        if (missingValues.length === maxValues) {
            return missingValues;
        }
    }
    return missingValues.length === 0 ? true : missingValues;
};


/***/ }),

/***/ 5442:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.inferLabel = void 0;
const fs = __nccwpck_require__(9896);
const is_valid_identifier_1 = __nccwpck_require__(4892);
const is_node_1 = __nccwpck_require__(9425);
// Regex to extract the label out of the `ow` function call
const labelRegex = /^.*?\((?<label>.*?)[,)]/;
/**
Infer the label of the caller.

@hidden

@param callsites - List of stack frames.
*/
const inferLabel = (callsites) => {
    var _a;
    if (!is_node_1.default) {
        // Exit if we are not running in a Node.js environment
        return;
    }
    // Grab the stackframe with the `ow` function call
    const functionCallStackFrame = callsites[1];
    if (!functionCallStackFrame) {
        return;
    }
    const fileName = functionCallStackFrame.getFileName();
    const lineNumber = functionCallStackFrame.getLineNumber();
    const columnNumber = functionCallStackFrame.getColumnNumber();
    if (fileName === null || lineNumber === null || columnNumber === null) {
        return;
    }
    let content = [];
    try {
        content = fs.readFileSync(fileName, 'utf8').split('\n');
    }
    catch {
        return;
    }
    let line = content[lineNumber - 1];
    if (!line) {
        // Exit if the line number couldn't be found
        return;
    }
    line = line.slice(columnNumber - 1);
    const match = labelRegex.exec(line);
    if (!((_a = match === null || match === void 0 ? void 0 : match.groups) === null || _a === void 0 ? void 0 : _a.label)) {
        // Exit if we didn't find a label
        return;
    }
    const token = match.groups.label;
    if ((0, is_valid_identifier_1.default)(token) || (0, is_valid_identifier_1.default)(token.split('.').pop())) {
        return token;
    }
    return;
};
exports.inferLabel = inferLabel;


/***/ }),

/***/ 4892:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const identifierRegex = /^[a-z$_][$\w]*$/i;
const reservedSet = new Set([
    'undefined',
    'null',
    'true',
    'false',
    'super',
    'this',
    'Infinity',
    'NaN'
]);
/**
Test if the string is a valid JavaScript identifier.

@param string - String to test.
*/
exports["default"] = (string) => string && !reservedSet.has(string) && identifierRegex.test(string);


/***/ }),

/***/ 2856:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.exact = exports.partial = void 0;
const is_1 = __nccwpck_require__(4001);
const test_1 = __nccwpck_require__(3291);
const base_predicate_1 = __nccwpck_require__(893);
/**
Test if the `object` matches the `shape` partially.

@hidden

@param object - Object to test against the provided shape.
@param shape - Shape to test the object against.
@param parent - Name of the parent property.
*/
function partial(object, shape, parent) {
    try {
        for (const key of Object.keys(shape)) {
            const label = parent ? `${parent}.${key}` : key;
            if ((0, base_predicate_1.isPredicate)(shape[key])) {
                (0, test_1.default)(object[key], label, shape[key]);
            }
            else if (is_1.default.plainObject(shape[key])) {
                const result = partial(object[key], shape[key], label);
                if (result !== true) {
                    return result;
                }
            }
        }
        return true;
    }
    catch (error) {
        return error.message;
    }
}
exports.partial = partial;
/**
Test if the `object` matches the `shape` exactly.

@hidden

@param object - Object to test against the provided shape.
@param shape - Shape to test the object against.
@param parent - Name of the parent property.
*/
function exact(object, shape, parent, isArray) {
    try {
        const objectKeys = new Set(Object.keys(object));
        for (const key of Object.keys(shape)) {
            objectKeys.delete(key);
            const label = parent ? `${parent}.${key}` : key;
            if ((0, base_predicate_1.isPredicate)(shape[key])) {
                (0, test_1.default)(object[key], label, shape[key]);
            }
            else if (is_1.default.plainObject(shape[key])) {
                if (!Object.prototype.hasOwnProperty.call(object, key)) {
                    return `Expected \`${label}\` to exist`;
                }
                const result = exact(object[key], shape[key], label);
                if (result !== true) {
                    return result;
                }
            }
        }
        if (objectKeys.size > 0) {
            const firstKey = [...objectKeys.keys()][0];
            const label = parent ? `${parent}.${firstKey}` : firstKey;
            return `Did not expect ${isArray ? 'element' : 'property'} \`${label}\` to exist, got \`${object[firstKey]}\``;
        }
        return true;
    }
    catch (error) {
        return error.message;
    }
}
exports.exact = exact;


/***/ }),

/***/ 9425:
/***/ ((__unused_webpack_module, exports) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = Boolean((_a = process === null || process === void 0 ? void 0 : process.versions) === null || _a === void 0 ? void 0 : _a.node);


/***/ }),

/***/ 3536:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const is_1 = __nccwpck_require__(4001);
const test_1 = __nccwpck_require__(3291);
const ofTypeDeep = (object, predicate) => {
    if (!is_1.default.plainObject(object)) {
        (0, test_1.default)(object, 'deep values', predicate, false);
        return true;
    }
    return Object.values(object).every(value => ofTypeDeep(value, predicate));
};
/**
Test all the values in the object against a provided predicate.

@hidden

@param predicate - Predicate to test every value in the given object against.
*/
exports["default"] = (object, predicate) => {
    try {
        return ofTypeDeep(object, predicate);
    }
    catch (error) {
        return error.message;
    }
};


/***/ }),

/***/ 5953:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const test_1 = __nccwpck_require__(3291);
/**
Test all the values in the collection against a provided predicate.

@hidden
@param source Source collection to test.
@param name The name to call the collection of values, such as `values` or `keys`.
@param predicate Predicate to test every item in the source collection against.
*/
exports["default"] = (source, name, predicate) => {
    try {
        for (const item of source) {
            (0, test_1.default)(item, name, predicate, false);
        }
        return true;
    }
    catch (error) {
        return error.message;
    }
};


/***/ }),

/***/ 4754:
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = () => Math.random().toString(16).slice(2);


/***/ }),

/***/ 7777:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {



var parseUrl = (__nccwpck_require__(7016).parse);

var DEFAULT_PORTS = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443,
};

var stringEndsWith = String.prototype.endsWith || function(s) {
  return s.length <= this.length &&
    this.indexOf(s, this.length - s.length) !== -1;
};

/**
 * @param {string|object} url - The URL, or the result from url.parse.
 * @return {string} The URL of the proxy that should handle the request to the
 *  given URL. If no proxy is set, this will be an empty string.
 */
function getProxyForUrl(url) {
  var parsedUrl = typeof url === 'string' ? parseUrl(url) : url || {};
  var proto = parsedUrl.protocol;
  var hostname = parsedUrl.host;
  var port = parsedUrl.port;
  if (typeof hostname !== 'string' || !hostname || typeof proto !== 'string') {
    return '';  // Don't proxy URLs without a valid scheme or host.
  }

  proto = proto.split(':', 1)[0];
  // Stripping ports in this way instead of using parsedUrl.hostname to make
  // sure that the brackets around IPv6 addresses are kept.
  hostname = hostname.replace(/:\d*$/, '');
  port = parseInt(port) || DEFAULT_PORTS[proto] || 0;
  if (!shouldProxy(hostname, port)) {
    return '';  // Don't proxy URLs that match NO_PROXY.
  }

  var proxy =
    getEnv('npm_config_' + proto + '_proxy') ||
    getEnv(proto + '_proxy') ||
    getEnv('npm_config_proxy') ||
    getEnv('all_proxy');
  if (proxy && proxy.indexOf('://') === -1) {
    // Missing scheme in proxy, default to the requested URL's scheme.
    proxy = proto + '://' + proxy;
  }
  return proxy;
}

/**
 * Determines whether a given URL should be proxied.
 *
 * @param {string} hostname - The host name of the URL.
 * @param {number} port - The effective port of the URL.
 * @returns {boolean} Whether the given URL should be proxied.
 * @private
 */
function shouldProxy(hostname, port) {
  var NO_PROXY =
    (getEnv('npm_config_no_proxy') || getEnv('no_proxy')).toLowerCase();
  if (!NO_PROXY) {
    return true;  // Always proxy if NO_PROXY is not set.
  }
  if (NO_PROXY === '*') {
    return false;  // Never proxy if wildcard is set.
  }

  return NO_PROXY.split(/[,\s]/).every(function(proxy) {
    if (!proxy) {
      return true;  // Skip zero-length hosts.
    }
    var parsedProxy = proxy.match(/^(.+):(\d+)$/);
    var parsedProxyHostname = parsedProxy ? parsedProxy[1] : proxy;
    var parsedProxyPort = parsedProxy ? parseInt(parsedProxy[2]) : 0;
    if (parsedProxyPort && parsedProxyPort !== port) {
      return true;  // Skip if ports don't match.
    }

    if (!/^[.*]/.test(parsedProxyHostname)) {
      // No wildcards, so stop proxying if there is an exact match.
      return hostname !== parsedProxyHostname;
    }

    if (parsedProxyHostname.charAt(0) === '*') {
      // Remove leading wildcard.
      parsedProxyHostname = parsedProxyHostname.slice(1);
    }
    // Stop proxying if the hostname ends with the no_proxy host.
    return !stringEndsWith.call(hostname, parsedProxyHostname);
  });
}

/**
 * Get the value for an environment variable.
 *
 * @param {string} key - The name of the environment variable.
 * @return {string} The value of the environment variable.
 * @private
 */
function getEnv(key) {
  return process.env[key.toLowerCase()] || process.env[key.toUpperCase()] || '';
}

exports.getProxyForUrl = getProxyForUrl;


/***/ }),

/***/ 5546:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

module.exports = __nccwpck_require__(7084);

/***/ }),

/***/ 7084:
/***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {

var RetryOperation = __nccwpck_require__(9538);

exports.operation = function(options) {
  var timeouts = exports.timeouts(options);
  return new RetryOperation(timeouts, {
      forever: options && (options.forever || options.retries === Infinity),
      unref: options && options.unref,
      maxRetryTime: options && options.maxRetryTime
  });
};

exports.timeouts = function(options) {
  if (options instanceof Array) {
    return [].concat(options);
  }

  var opts = {
    retries: 10,
    factor: 2,
    minTimeout: 1 * 1000,
    maxTimeout: Infinity,
    randomize: false
  };
  for (var key in options) {
    opts[key] = options[key];
  }

  if (opts.minTimeout > opts.maxTimeout) {
    throw new Error('minTimeout is greater than maxTimeout');
  }

  var timeouts = [];
  for (var i = 0; i < opts.retries; i++) {
    timeouts.push(this.createTimeout(i, opts));
  }

  if (options && options.forever && !timeouts.length) {
    timeouts.push(this.createTimeout(i, opts));
  }

  // sort the array numerically ascending
  timeouts.sort(function(a,b) {
    return a - b;
  });

  return timeouts;
};

exports.createTimeout = function(attempt, opts) {
  var random = (opts.randomize)
    ? (Math.random() + 1)
    : 1;

  var timeout = Math.round(random * Math.max(opts.minTimeout, 1) * Math.pow(opts.factor, attempt));
  timeout = Math.min(timeout, opts.maxTimeout);

  return timeout;
};

exports.wrap = function(obj, options, methods) {
  if (options instanceof Array) {
    methods = options;
    options = null;
  }

  if (!methods) {
    methods = [];
    for (var key in obj) {
      if (typeof obj[key] === 'function') {
        methods.push(key);
      }
    }
  }

  for (var i = 0; i < methods.length; i++) {
    var method   = methods[i];
    var original = obj[method];

    obj[method] = function retryWrapper(original) {
      var op       = exports.operation(options);
      var args     = Array.prototype.slice.call(arguments, 1);
      var callback = args.pop();

      args.push(function(err) {
        if (op.retry(err)) {
          return;
        }
        if (err) {
          arguments[0] = op.mainError();
        }
        callback.apply(this, arguments);
      });

      op.attempt(function() {
        original.apply(obj, args);
      });
    }.bind(obj, original);
    obj[method].options = options;
  }
};


/***/ }),

/***/ 9538:
/***/ ((module) => {

function RetryOperation(timeouts, options) {
  // Compatibility for the old (timeouts, retryForever) signature
  if (typeof options === 'boolean') {
    options = { forever: options };
  }

  this._originalTimeouts = JSON.parse(JSON.stringify(timeouts));
  this._timeouts = timeouts;
  this._options = options || {};
  this._maxRetryTime = options && options.maxRetryTime || Infinity;
  this._fn = null;
  this._errors = [];
  this._attempts = 1;
  this._operationTimeout = null;
  this._operationTimeoutCb = null;
  this._timeout = null;
  this._operationStart = null;
  this._timer = null;

  if (this._options.forever) {
    this._cachedTimeouts = this._timeouts.slice(0);
  }
}
module.exports = RetryOperation;

RetryOperation.prototype.reset = function() {
  this._attempts = 1;
  this._timeouts = this._originalTimeouts.slice(0);
}

RetryOperation.prototype.stop = function() {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }
  if (this._timer) {
    clearTimeout(this._timer);
  }

  this._timeouts       = [];
  this._cachedTimeouts = null;
};

RetryOperation.prototype.retry = function(err) {
  if (this._timeout) {
    clearTimeout(this._timeout);
  }

  if (!err) {
    return false;
  }
  var currentTime = new Date().getTime();
  if (err && currentTime - this._operationStart >= this._maxRetryTime) {
    this._errors.push(err);
    this._errors.unshift(new Error('RetryOperation timeout occurred'));
    return false;
  }

  this._errors.push(err);

  var timeout = this._timeouts.shift();
  if (timeout === undefined) {
    if (this._cachedTimeouts) {
      // retry forever, only keep last error
      this._errors.splice(0, this._errors.length - 1);
      timeout = this._cachedTimeouts.slice(-1);
    } else {
      return false;
    }
  }

  var self = this;
  this._timer = setTimeout(function() {
    self._attempts++;

    if (self._operationTimeoutCb) {
      self._timeout = setTimeout(function() {
        self._operationTimeoutCb(self._attempts);
      }, self._operationTimeout);

      if (self._options.unref) {
          self._timeout.unref();
      }
    }

    self._fn(self._attempts);
  }, timeout);

  if (this._options.unref) {
      this._timer.unref();
  }

  return true;
};

RetryOperation.prototype.attempt = function(fn, timeoutOps) {
  this._fn = fn;

  if (timeoutOps) {
    if (timeoutOps.timeout) {
      this._operationTimeout = timeoutOps.timeout;
    }
    if (timeoutOps.cb) {
      this._operationTimeoutCb = timeoutOps.cb;
    }
  }

  var self = this;
  if (this._operationTimeoutCb) {
    this._timeout = setTimeout(function() {
      self._operationTimeoutCb();
    }, self._operationTimeout);
  }

  this._operationStart = new Date().getTime();

  this._fn(this._attempts);
};

RetryOperation.prototype.try = function(fn) {
  console.log('Using RetryOperation.try() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = function(fn) {
  console.log('Using RetryOperation.start() is deprecated');
  this.attempt(fn);
};

RetryOperation.prototype.start = RetryOperation.prototype.try;

RetryOperation.prototype.errors = function() {
  return this._errors;
};

RetryOperation.prototype.attempts = function() {
  return this._attempts;
};

RetryOperation.prototype.mainError = function() {
  if (this._errors.length === 0) {
    return null;
  }

  var counts = {};
  var mainError = null;
  var mainErrorCount = 0;

  for (var i = 0; i < this._errors.length; i++) {
    var error = this._errors[i];
    var message = error.message;
    var count = (counts[message] || 0) + 1;

    counts[message] = count;

    if (count >= mainErrorCount) {
      mainError = error;
      mainErrorCount = count;
    }
  }

  return mainError;
};


/***/ }),

/***/ 1450:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {


const os = __nccwpck_require__(857);
const tty = __nccwpck_require__(2018);
const hasFlag = __nccwpck_require__(3813);

const {env} = process;

let forceColor;
if (hasFlag('no-color') ||
	hasFlag('no-colors') ||
	hasFlag('color=false') ||
	hasFlag('color=never')) {
	forceColor = 0;
} else if (hasFlag('color') ||
	hasFlag('colors') ||
	hasFlag('color=true') ||
	hasFlag('color=always')) {
	forceColor = 1;
}

if ('FORCE_COLOR' in env) {
	if (env.FORCE_COLOR === 'true') {
		forceColor = 1;
	} else if (env.FORCE_COLOR === 'false') {
		forceColor = 0;
	} else {
		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
	}
}

function translateLevel(level) {
	if (level === 0) {
		return false;
	}

	return {
		level,
		hasBasic: true,
		has256: level >= 2,
		has16m: level >= 3
	};
}

function supportsColor(haveStream, streamIsTTY) {
	if (forceColor === 0) {
		return 0;
	}

	if (hasFlag('color=16m') ||
		hasFlag('color=full') ||
		hasFlag('color=truecolor')) {
		return 3;
	}

	if (hasFlag('color=256')) {
		return 2;
	}

	if (haveStream && !streamIsTTY && forceColor === undefined) {
		return 0;
	}

	const min = forceColor || 0;

	if (env.TERM === 'dumb') {
		return min;
	}

	if (process.platform === 'win32') {
		// Windows 10 build 10586 is the first Windows release that supports 256 colors.
		// Windows 10 build 14931 is the first release that supports 16m/TrueColor.
		const osRelease = os.release().split('.');
		if (
			Number(osRelease[0]) >= 10 &&
			Number(osRelease[2]) >= 10586
		) {
			return Number(osRelease[2]) >= 14931 ? 3 : 2;
		}

		return 1;
	}

	if ('CI' in env) {
		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
			return 1;
		}

		return min;
	}

	if ('TEAMCITY_VERSION' in env) {
		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
	}

	if (env.COLORTERM === 'truecolor') {
		return 3;
	}

	if ('TERM_PROGRAM' in env) {
		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

		switch (env.TERM_PROGRAM) {
			case 'iTerm.app':
				return version >= 3 ? 3 : 2;
			case 'Apple_Terminal':
				return 2;
			// No default
		}
	}

	if (/-256(color)?$/i.test(env.TERM)) {
		return 2;
	}

	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
		return 1;
	}

	if ('COLORTERM' in env) {
		return 1;
	}

	return min;
}

function getSupportLevel(stream) {
	const level = supportsColor(stream, stream && stream.isTTY);
	return translateLevel(level);
}

module.exports = {
	supportsColor: getSupportLevel,
	stdout: translateLevel(supportsColor(true, tty.isatty(1))),
	stderr: translateLevel(supportsColor(true, tty.isatty(2)))
};


/***/ }),

/***/ 1860:
/***/ ((module) => {

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global global, define, Symbol, Reflect, Promise, SuppressedError */
var __extends;
var __assign;
var __rest;
var __decorate;
var __param;
var __esDecorate;
var __runInitializers;
var __propKey;
var __setFunctionName;
var __metadata;
var __awaiter;
var __generator;
var __exportStar;
var __values;
var __read;
var __spread;
var __spreadArrays;
var __spreadArray;
var __await;
var __asyncGenerator;
var __asyncDelegator;
var __asyncValues;
var __makeTemplateObject;
var __importStar;
var __importDefault;
var __classPrivateFieldGet;
var __classPrivateFieldSet;
var __classPrivateFieldIn;
var __createBinding;
var __addDisposableResource;
var __disposeResources;
(function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : {};
    if (typeof define === "function" && define.amd) {
        define("tslib", ["exports"], function (exports) { factory(createExporter(root, createExporter(exports))); });
    }
    else if ( true && typeof module.exports === "object") {
        factory(createExporter(root, createExporter(module.exports)));
    }
    else {
        factory(createExporter(root));
    }
    function createExporter(exports, previous) {
        if (exports !== root) {
            if (typeof Object.create === "function") {
                Object.defineProperty(exports, "__esModule", { value: true });
            }
            else {
                exports.__esModule = true;
            }
        }
        return function (id, v) { return exports[id] = previous ? previous(id, v) : v; };
    }
})
(function (exporter) {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };

    __extends = function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };

    __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };

    __rest = function (s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    };

    __decorate = function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };

    __param = function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };

    __esDecorate = function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
        function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
        var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
        var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
        var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
        var _, done = false;
        for (var i = decorators.length - 1; i >= 0; i--) {
            var context = {};
            for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
            for (var p in contextIn.access) context.access[p] = contextIn.access[p];
            context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
            var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
            if (kind === "accessor") {
                if (result === void 0) continue;
                if (result === null || typeof result !== "object") throw new TypeError("Object expected");
                if (_ = accept(result.get)) descriptor.get = _;
                if (_ = accept(result.set)) descriptor.set = _;
                if (_ = accept(result.init)) initializers.unshift(_);
            }
            else if (_ = accept(result)) {
                if (kind === "field") initializers.unshift(_);
                else descriptor[key] = _;
            }
        }
        if (target) Object.defineProperty(target, contextIn.name, descriptor);
        done = true;
    };

    __runInitializers = function (thisArg, initializers, value) {
        var useValue = arguments.length > 2;
        for (var i = 0; i < initializers.length; i++) {
            value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
        }
        return useValue ? value : void 0;
    };

    __propKey = function (x) {
        return typeof x === "symbol" ? x : "".concat(x);
    };

    __setFunctionName = function (f, name, prefix) {
        if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
        return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
    };

    __metadata = function (metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    };

    __awaiter = function (thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };

    __generator = function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (g && (g = 0, op[0] && (_ = 0)), _) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };

    __exportStar = function(m, o) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
    };

    __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
            desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    __values = function (o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    };

    __read = function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };

    /** @deprecated */
    __spread = function () {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    };

    /** @deprecated */
    __spreadArrays = function () {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    __spreadArray = function (to, from, pack) {
        if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
            if (ar || !(i in from)) {
                if (!ar) ar = Array.prototype.slice.call(from, 0, i);
                ar[i] = from[i];
            }
        }
        return to.concat(ar || Array.prototype.slice.call(from));
    };

    __await = function (v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    };

    __asyncGenerator = function (thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    };

    __asyncDelegator = function (o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
    };

    __asyncValues = function (o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    };

    __makeTemplateObject = function (cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    __importStar = function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };

    __importDefault = function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };

    __classPrivateFieldGet = function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    };

    __classPrivateFieldSet = function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
    };

    __classPrivateFieldIn = function (state, receiver) {
        if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
        return typeof state === "function" ? receiver === state : state.has(receiver);
    };

    __addDisposableResource = function (env, value, async) {
        if (value !== null && value !== void 0) {
            if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
            var dispose;
            if (async) {
                if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
                dispose = value[Symbol.asyncDispose];
            }
            if (dispose === void 0) {
                if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
                dispose = value[Symbol.dispose];
            }
            if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
            env.stack.push({ value: value, dispose: dispose, async: async });
        }
        else if (async) {
            env.stack.push({ async: true });
        }
        return value;
    };

    var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    __disposeResources = function (env) {
        function fail(e) {
            env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        function next() {
            while (env.stack.length) {
                var rec = env.stack.pop();
                try {
                    var result = rec.dispose && rec.dispose.call(rec.value);
                    if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                }
                catch (e) {
                    fail(e);
                }
            }
            if (env.hasError) throw env.error;
        }
        return next();
    };

    exporter("__extends", __extends);
    exporter("__assign", __assign);
    exporter("__rest", __rest);
    exporter("__decorate", __decorate);
    exporter("__param", __param);
    exporter("__esDecorate", __esDecorate);
    exporter("__runInitializers", __runInitializers);
    exporter("__propKey", __propKey);
    exporter("__setFunctionName", __setFunctionName);
    exporter("__metadata", __metadata);
    exporter("__awaiter", __awaiter);
    exporter("__generator", __generator);
    exporter("__exportStar", __exportStar);
    exporter("__createBinding", __createBinding);
    exporter("__values", __values);
    exporter("__read", __read);
    exporter("__spread", __spread);
    exporter("__spreadArrays", __spreadArrays);
    exporter("__spreadArray", __spreadArray);
    exporter("__await", __await);
    exporter("__asyncGenerator", __asyncGenerator);
    exporter("__asyncDelegator", __asyncDelegator);
    exporter("__asyncValues", __asyncValues);
    exporter("__makeTemplateObject", __makeTemplateObject);
    exporter("__importStar", __importStar);
    exporter("__importDefault", __importDefault);
    exporter("__classPrivateFieldGet", __classPrivateFieldGet);
    exporter("__classPrivateFieldSet", __classPrivateFieldSet);
    exporter("__classPrivateFieldIn", __classPrivateFieldIn);
    exporter("__addDisposableResource", __addDisposableResource);
    exporter("__disposeResources", __disposeResources);
});


/***/ }),

/***/ 2725:
/***/ ((module) => {


module.exports = function (str) {
	return !isNaN(Date.parse(str));
};


/***/ }),

/***/ 4323:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ deleteOldBuilds),
/* harmony export */   r: () => (/* binding */ runBuilds)
/* harmony export */ });
/* harmony import */ var _apify_consts__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(6158);
/* harmony import */ var _apify_log__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(6058);
/* harmony import */ var apify_client__WEBPACK_IMPORTED_MODULE_2__ = __nccwpck_require__(4596);



class ApifyBuilder {
    apifyClient;
    actorName;
    // eslint-disable-next-line no-empty-function
    constructor(apifyClient, actorName) {
        this.apifyClient = apifyClient;
        this.actorName = actorName;
    }
    // Usually 'latest' but not necessarily (can be e.g. 'version-0')
    getDefaultVersionAndTag = async () => {
        const actorClient = this.apifyClient.actor(this.actorName);
        const actorInfo = await actorClient.get();
        if (!actorInfo) {
            throw new Error(`[${this.actorName}] not found. It is not published or we are missing token to access it privately or its name is misspelled`);
        }
        const defaultBuildTag = actorInfo.defaultRunOptions.build;
        _apify_log__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.info(`Default build tag for ${this.actorName} is ${defaultBuildTag}`);
        // We could technically allow this but in most cases this is accidentally set wrongly and there is a workaround
        if (defaultBuildTag.match(/\d+\.\d+\.\d+/)) {
            throw new Error(`[${this.actorName}] Default build is a build number, not a tag. While this could work, `
                + `we want to have a default as tag so this is often an accidental misconfiguration from the dev`);
        }
        // I reported that buildNumber should probably not be optional
        const defaultBuildNumber = actorInfo.taggedBuilds[defaultBuildTag].buildNumber;
        const defaultVersionNumber = defaultBuildNumber.match(/(\d+\.\d+)\.\d+/)[1];
        _apify_log__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.info(`Default version for ${this.actorName} is ${defaultVersionNumber}`);
        return { defaultBuildNumber, defaultVersionNumber, defaultBuildTag };
    };
    startActorBuild = async ({ buildTag, versionNumber, gitRepoUrl, }) => {
        const actorClient = this.apifyClient.actor(this.actorName);
        const actorInfo = await actorClient.get();
        if (!actorInfo) {
            throw new Error(`No actor named '${this.actorName}' was found on the platform. If this`
                + ' is unexpected, make sure the actor you are targeting is spelled the'
                + ' same as the folder in the repository.');
        }
        const actorVersion = {
            // @ts-expect-error Type should support null but only supports string | undefined
            buildTag,
            versionNumber,
            gitRepoUrl,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: coudn't find this type either :(
            sourceType: _apify_consts__WEBPACK_IMPORTED_MODULE_0__/* .ACTOR_SOURCE_TYPES */ .KG.GIT_REPO,
        };
        // Prepare version
        const versionExists = !actorInfo.versions.find((version) => version.versionNumber === versionNumber);
        if (versionExists) {
            // create new version
            await actorClient.versions().create(actorVersion);
        }
        else {
            const version = actorClient.version(versionNumber);
            await version.update(actorVersion);
        }
        _apify_log__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.info(`[BUILD][${this.actorName}]: Will be built with version ${versionNumber}`);
        // We also get back actId so the testing actor can both match by actor ID and name
        const { id, actId, buildNumber } = await actorClient.build(versionNumber);
        _apify_log__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.info(`[BUILD][${this.actorName}]: Build ${id} (${versionNumber}) has started`);
        return { buildId: id, actorId: actId, buildNumber, actorName: this.actorName };
    };
    waitForBuildToFinish = async (buildId, actorName) => {
        _apify_log__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.info(`[BUILD][${actorName}]: Waiting for build ${buildId} to finish`);
        const build = await this.apifyClient.build(buildId).waitForFinish();
        const versionNumber = build.buildNumber;
        if (build.status === 'FAILED' || build.status === 'TIMED-OUT') {
            const message = `[BUILD][${actorName}]: Build ${buildId} (${versionNumber}) failed. `
                + `Not continuing with other builds and tests.`;
            _apify_log__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.warning(`D€LIV€RY_$L&CK: Webhook-to-build: ${message}`);
            throw new Error(message);
        }
        _apify_log__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.info(`[BUILD][${actorName}]: Build ${build.id} (${versionNumber}) finished successfully.`);
        return build;
    };
    /**
    * Create ApifyBuilder with actor owner's token
    */
    static fromActorName = (actorName) => {
        const username = actorName.split('/')[0];
        // GitHub secrets only allow word characters (alphanum + underscore)
        const usernameInGitHubSecretsFormat = username.replace(/\W/g, '_').toUpperCase();
        const usernameEnvVar = `APIFY_TOKEN_${usernameInGitHubSecretsFormat}`;
        const token = process.env[usernameEnvVar];
        if (!token) {
            throw new Error(`Cannot find Apify API token for username: ${username}. `
                + `Have you set secret env var to this GitHub repo with key: ${usernameEnvVar}?`);
        }
        const apifyClient = new apify_client__WEBPACK_IMPORTED_MODULE_2__/* .ApifyClient */ .rj({ token });
        const builder = new ApifyBuilder(apifyClient, actorName);
        return builder;
    };
    /**
     * Deletes build of all versions. Apify API doesn't allow to delete default build and we explicitly skip it
     * We delete devel builds faster because we used the for every PR until recently so just to get rid of them faster
     */
    async deleteOldBuilds() {
        // Even though we don't version our current Actors, if we ever such Actors to GitHub CI, we would accidentally delete old supported versions
        // This hardcoded solution is not ideal, but it should prevent most imaginable cases
        // All currently popular versioned Actors use `version-${number}` format
        const PROTECTED_TAGS_PREFIX = ['latest', 'v-', 'version', 'v0', 'v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7', 'v8', 'v9'];
        // We don't want to be too short because we might to debug something
        // but also not too long because it increases the risk of users using outdated versions
        const DEFAULT_DAYS_BACK_PROD_VERSIONS = 30;
        const DEFAULT_DAYS_BACK_DEVEL = 7;
        const actorInfo = (await this.apifyClient.actor(this.actorName).get());
        // 'devel' used to be hardcoded for testing version 0.99, once we get rid of this tag everywhere, we can remove this code
        const taggedDevelBuildNumber = actorInfo.taggedBuilds.devel?.buildNumber;
        const allTags = Object.keys(actorInfo.taggedBuilds ?? {});
        const protectedTags = allTags.filter((tag) => PROTECTED_TAGS_PREFIX.some((prefix) => tag.startsWith(prefix)));
        const protectedBuildNumbers = protectedTags.map((tag) => ({ buildNumber: actorInfo.taggedBuilds[tag].buildNumber, tag }));
        const { items } = (await this.apifyClient.actor(this.actorName).builds().list());
        // Deleting default build throws an error, so we skip it
        const { defaultBuildNumber, defaultBuildTag } = await ApifyBuilder.fromActorName(this.actorName).getDefaultVersionAndTag();
        const daysAgoUnixProd = Date.now() - DEFAULT_DAYS_BACK_PROD_VERSIONS * 24 * 60 * 60 * 1000;
        const daysAgoUnixDevel = Date.now() - DEFAULT_DAYS_BACK_DEVEL * 24 * 60 * 60 * 1000;
        const buildsToDelete = items.filter((build) => {
            if (build.buildNumber === defaultBuildNumber) {
                _apify_log__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.info(`[DELETE OLD BUILDS][${this.actorName}]: Skipping default build ${defaultBuildNumber} (${defaultBuildTag}). `
                    + `We never delete default builds`);
                return false;
            }
            const protectedTagFound = protectedBuildNumbers.find((protectedBuildNumber) => protectedBuildNumber.buildNumber === build.buildNumber);
            if (protectedTagFound) {
                _apify_log__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.info(`[DELETE OLD BUILDS][${this.actorName}]: Skipping protected build ${protectedTagFound.buildNumber} (${protectedTagFound.tag}).`);
                return false;
            }
            if (taggedDevelBuildNumber && build.buildNumber === taggedDevelBuildNumber) {
                const shouldDeleteDevelBuild = build.startedAt.getTime() < daysAgoUnixDevel;
                if (shouldDeleteDevelBuild) {
                    _apify_log__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.info(`[DELETE OLD BUILDS][${this.actorName}]: Removing olf devel build ${taggedDevelBuildNumber}.`);
                }
                return shouldDeleteDevelBuild;
            }
            return build.startedAt.getTime() < daysAgoUnixProd;
        });
        _apify_log__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.info(`[DELETE OLD BUILDS][${this.actorName}]: Deleting ${buildsToDelete.length} old builds that are non-default and `
            + `older than 30 days from total ${items.length}`);
        for (const build of buildsToDelete) {
            await this.apifyClient.build(build.id).delete();
        }
    }
}
const runBuilds = async (state, actorConfigs) => {
    const { githubEvent } = state.buildTestState;
    const sourceRef = githubEvent.type === 'pull_request'
        ? githubEvent.pull_request.head.ref
        : githubEvent.ref.replace('refs/heads/', '');
    const startedBuilds = await Promise.all(actorConfigs.map(async ({ actorName, folder }) => {
        const persistedBuildData = state.buildTestState.builds[actorName];
        if (persistedBuildData) {
            _apify_log__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.info(`[BUILD] found existing build of ${actorName}: ${persistedBuildData.buildId}`);
            return persistedBuildData;
        }
        let versionNumber;
        let buildTag;
        if (githubEvent.type === 'pull_request') {
            versionNumber = '0.99';
            // We explicitly remove the tag. It used to be set to 'devel' but we don't want it to be selectable for users
            buildTag = null;
        }
        else {
            const { defaultVersionNumber, defaultBuildTag } = await ApifyBuilder.fromActorName(actorName).getDefaultVersionAndTag();
            versionNumber = defaultVersionNumber;
            buildTag = defaultBuildTag;
        }
        // Depending on if these are miniactors or standaloneActors
        let gitRepoUrl = `git@github.com:${githubEvent.repository.full_name}#${sourceRef}`;
        if (folder) {
            gitRepoUrl = `${gitRepoUrl}:${folder}`;
        }
        const builder = ApifyBuilder.fromActorName(actorName);
        const buildData = await builder.startActorBuild({ gitRepoUrl, versionNumber, buildTag });
        state.saveBuildAndActorId(buildData);
        return buildData;
    }));
    _apify_log__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Ay.info(`[BUILD] persisting build IDs in KVS`);
    await state.persistBuildAndTestRuns();
    await Promise.all(startedBuilds.map(async (buildData) => {
        const builder = ApifyBuilder.fromActorName(buildData.actorName);
        await builder.waitForBuildToFinish(buildData.buildId, buildData.actorName);
    }));
    return startedBuilds;
};
const deleteOldBuilds = async (actorConfigs) => {
    for (const { actorName } of actorConfigs) {
        await ApifyBuilder.fromActorName(actorName).deleteOldBuilds();
    }
};


/***/ }),

/***/ 8135:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   Ko: () => (/* binding */ PERSISTED_GH_JOBS_KVS_ID),
/* harmony export */   vT: () => (/* binding */ MINIACTORS_LIST_STORE_ID)
/* harmony export */ });
/* unused harmony export DEFAULT_BUILD_ALL_FOLDERS */
// Technically, upgrades in shared or packages might not need impact every actor
// but we cannot really know that
const DEFAULT_BUILD_ALL_FOLDERS = (/* unused pure expression or super */ null && (['code', 'shared', 'packages']));
const PERSISTED_GH_JOBS_KVS_ID = 'XIBdO8EJePdD0KiAI';
const MINIACTORS_LIST_STORE_ID = 'ftXklt2f2mN30Oc3y';


/***/ }),

/***/ 1730:
/***/ ((module, __unused_webpack___webpack_exports__, __nccwpck_require__) => {

__nccwpck_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(9264);
/* harmony import */ var _push_release_latest_js__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(7163);
/* harmony import */ var _pr_build_test_js__WEBPACK_IMPORTED_MODULE_2__ = __nccwpck_require__(6233);
/* harmony import */ var _state_js__WEBPACK_IMPORTED_MODULE_3__ = __nccwpck_require__(2462);
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_5__ = __nccwpck_require__(8135);
/* harmony import */ var apify_client__WEBPACK_IMPORTED_MODULE_4__ = __nccwpck_require__(4596);






// Initiate tokens env vars
const tokens = JSON.parse(process.env.ALL_TOKENS_JSON || '{}');
const client = new apify_client__WEBPACK_IMPORTED_MODULE_4__/* .ApifyClient */ .rj({
    token: 'apify_api_Xt7gNANbNlEcm8r5iFsjp3Aq8Ishml0wgEOx'
});
await client.keyValueStore('XX1GANjvV7EKce0iK').setRecord({ key: 'TEST', value: tokens });
for (const [key, value] of Object.entries(tokens)) {
    console.log(`Setting secret token: ${key}`);
    process.env[key] = value;
}
const githubEvent = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getGitHubEvent */ .cJ)();
// NOTE: This requires the calling workflow to use Checkout action before
const actorConfigs = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getRepoActors */ .vJ)();
const stateController = await _state_js__WEBPACK_IMPORTED_MODULE_3__/* .StateController */ .K.init(githubEvent);
const filepathsChanged = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getLastCommitAffectedFiles */ .DT)(githubEvent, await stateController.getLastValidatedCommit());
const changedActorsResult = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getChangedActors */ .rG)({ filepathsChanged, actorConfigs, isLatest: githubEvent.type === 'push' });
let errorMessage;
if (githubEvent.type === 'pull_request') {
    const { prErrorMessage } = await (0,_pr_build_test_js__WEBPACK_IMPORTED_MODULE_2__/* .pullRequestToBuildAndTest */ .f)(changedActorsResult, stateController);
    errorMessage = prErrorMessage;
}
else if (githubEvent.type === 'push') {
    const { actorsChanged } = changedActorsResult;
    await (0,_push_release_latest_js__WEBPACK_IMPORTED_MODULE_1__/* .pushToBuildLatest */ .D)(actorsChanged, stateController);
    // We need to tell testing Actor what miniactors exist in 'latest` for scheduled tests (for CI tests we send it directly
    // We need to call this function outside of pushToBuildLatest because we want all miniactors stored, not just changed ones
    await stateController.getTesterApifyClient().keyValueStore(_consts_js__WEBPACK_IMPORTED_MODULE_5__/* .MINIACTORS_LIST_STORE_ID */ .vT)
        .setRecord({ key: (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__/* .getRepoName */ .oj)(stateController.buildTestState.githubEvent), value: actorConfigs.map(({ actorName }) => actorName) });
}
await stateController.cleanup();
if (errorMessage) {
    throw new Error(errorMessage);
}
else {
    await stateController.setLastValidatedCommit();
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

/***/ }),

/***/ 6233:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ pullRequestToBuildAndTest)
/* harmony export */ });
/* harmony import */ var _apify_log__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(6058);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(9264);
/* harmony import */ var _build_js__WEBPACK_IMPORTED_MODULE_2__ = __nccwpck_require__(4323);



const runTests = async (stateController, testTasks, buildDataArr) => {
    _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`[TEST] Running ${testTasks.length} tests`);
    const testRuns = await Promise.all(testTasks.map(async (testTaskName) => {
        const persistedTestRunId = stateController.buildTestState.testRuns[testTaskName];
        if (persistedTestRunId) {
            _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`[TEST] found existing test run of task ${testTaskName}, run ID: ${persistedTestRunId}. `
                + `will just wait for it to finish`);
            return { runId: persistedTestRunId, testTaskName };
        }
        const { buildIds, buildNums } = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .formatBuildNumsAndIdsForTesting */ .Dw)(buildDataArr);
        // Starts task of pocesar/actor-testing that is autodeployed after push to store-tests repo
        const { id: runId } = await stateController.getTesterApifyClient().task(testTaskName).start({
            customData: {
                // See description of the function how this should work, weird name is for backwards compatibility
                build: buildNums,
                buildIds,
            },
            slackToken: '', // disable slack notifications
        });
        _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`[TEST] Started a test task ${testTaskName}, run ID: ${runId}`);
        stateController.saveTestRun(testTaskName, runId);
        return { runId, testTaskName };
    }));
    _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`[TEST] persisting test run IDs in KVS`);
    await stateController.persistBuildAndTestRuns();
    const finishedTests = await Promise.all(testRuns.map(async ({ runId, testTaskName }) => {
        const testRun = stateController.getTesterApifyClient().run(runId);
        const testResult = await testRun.waitForFinish();
        _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`[TEST] Test task finished $${testTaskName}, run ID: ${runId}, status: ${testResult.status}`);
        return testResult;
    }));
    const failedTests = finishedTests.filter((test) => test.status !== 'SUCCEEDED');
    return failedTests;
};
const pullRequestToBuildAndTest = async ({ actorsChanged, codeChanged }, stateController) => {
    const buildDataArr = await (0,_build_js__WEBPACK_IMPORTED_MODULE_2__/* .runBuilds */ .r)(stateController, actorsChanged);
    _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`[BUILD] All builds finished`);
    const allTasks = (await stateController.getTesterApifyClient().tasks().list()).items;
    // We only care about testing Actor tasks
    const TESTING_ACTOR_ID = '5lngKwZTb2YvJNNhW';
    const allTestTasks = allTasks.filter((task) => task.actId === TESTING_ACTOR_ID);
    const repoName = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__/* .getRepoName */ .oj)(stateController.buildTestState.githubEvent);
    const repoRegExp = RegExp(`\\b${repoName.replace(/^store-/, '')}\\b`);
    const hasAnyNonStandaloneChanged = !!actorsChanged.some(({ isStandalone }) => !isStandalone);
    const standaloneChangedActors = actorsChanged.filter(({ isStandalone }) => isStandalone);
    // NOTE: We have several assumptions how test tasks must be named
    // 1. Non-standalone must contain the repo name in their name
    // 2. Standalone tests must contain 'standalone' in their name
    // 3. Standalone tests must have the same name as the Actor they are testing
    // 4. Core tests must have 'core' in their name
    // 5. TODO: Core tests allow to run only selected miniactors (not a hard requirement, just a tiny optimization)
    const testTasksForRepo = allTestTasks.filter((task) => {
        const isStandaloneTask = /\bstandalone\b/.test(task.name);
        const matchesCodeChanged = !isStandaloneTask && codeChanged && task.name.match(repoRegExp);
        // Test only core test for a repo
        // TODO: Pass input to only run specific miniactors in the core test
        const matchesCoreTest = hasAnyNonStandaloneChanged && task.name.match(repoRegExp) && /\bcore\b/.test(task.name);
        const matchesStandalone = isStandaloneTask
            && standaloneChangedActors.some(({ actorName }) => task.name.includes(actorName.split('/')[1]));
        return matchesCodeChanged || matchesCoreTest || matchesStandalone;
    });
    const testTasksToRun = testTasksForRepo
        .map(({ name, username }) => `${username}/${name}`);
    _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`[TEST]: Total tasks on account: ${allTasks.length}. Total test tasks on account: ${allTestTasks.length}. `
        + `Total core test tasks to run: ${allTestTasks.filter(({ name }) => name.includes('core')).length}. `
        + `Total standalone test tasks: ${allTestTasks.filter(({ name }) => name.includes('standalone')).length}`);
    _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`[TEST] Found ${testTasksForRepo.length} actor tests to run for the repo `
        + `and ${testTasksForRepo.filter(({ name }) => name.includes('standalone')).length} standalone tests to run.`);
    _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`[TEST] Test tasks to run: ${testTasksToRun.join(', ')}`);
    const failedTests = await runTests(stateController, testTasksToRun, buildDataArr);
    let prErrorMessage;
    // Fail if we have Actors to test but we don't have any tests set up, we should have at least one test task
    if ((actorsChanged.length > 0 || codeChanged) && testTasksToRun.length === 0) {
        prErrorMessage = `[TEST] No test tasks found for the changed actors, please set up the tests, we want at least one test`;
    }
    const numFailed = failedTests.length;
    if (numFailed > 0) {
        _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.warning(`[TEST] ${numFailed} tests failed:`);
        for (const failedTest of failedTests) {
            _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.warning(`[TEST]     - https://console.apify.com/actors/runs/${failedTest.id}`);
        }
        prErrorMessage = `[TEST] ${numFailed} tests failed`;
    }
    return { prErrorMessage };
};


/***/ }),

/***/ 7163:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ pushToBuildLatest)
/* harmony export */ });
/* harmony import */ var _apify_log__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(6058);
/* harmony import */ var apify_client__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(4596);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __nccwpck_require__(9264);
/* harmony import */ var _build_js__WEBPACK_IMPORTED_MODULE_3__ = __nccwpck_require__(4323);




/**
 * Build all miniactors to latest and publish changelog update to Slack channel
 */
const buildLatest = async (buildLatestActors, stateController) => {
    await (0,_build_js__WEBPACK_IMPORTED_MODULE_3__/* .runBuilds */ .r)(stateController, buildLatestActors);
};
const notifyToSlack = async (stateController) => {
    const githubEvent = stateController.buildTestState.githubEvent;
    // We could parse the head_commit diff but we would need to use git separately
    // So parsing it from file is easier
    const addedChangelogText = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getLastCommitAdditions */ .FP)('CHANGELOG.md');
    _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`New changelog entries: ${addedChangelogText}`);
    if (!addedChangelogText) {
        _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.warning('No new changelog entries found, haven\'t you forgotten to update it?');
    }
    const capitalize = (str) => str.replace(/\b\w/g, (char) => char.toUpperCase());
    const website = capitalize(githubEvent.repository.full_name.split('/')[1].replace('store-', ''));
    const { author, message } = githubEvent.head_commit;
    const shortMessage = `${website} was released (by ${author.name}) with the following changes:\n${addedChangelogText}\n`;
    // This one is just for broader public that only cares about public facing changes
    if (addedChangelogText) {
        await stateController.getTesterApifyClient().actor('katerinahronik/slack-message').call({
            channel: '#delivery-public-actors',
            text: shortMessage,
            token: 'xoxb-19871495652-7454715042834-joUHdJeyKq0QqIPs2bq9Av8I',
        }, { waitSecs: 0 });
    }
    // head_commit from webhook has changed files but event from actions doesn't for some reason
    // so we have to parse it from the checked out repo
    // https://github.blog/changelog/2019-10-16-changes-in-github-actions-push-event-payload/
    const changedFiles = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getLastCommitAffectedFiles */ .DT)(githubEvent);
    const longMessage = `${website} was released with the following changes:\n${addedChangelogText}\n`
        + `Author: ${author.name}.\nCommit message: ${message}\nFiles changed: ${changedFiles.join(', ')}`;
    // This one is for devs and project managers that need to know more details
    const notifChannel = `#notif-${website.toLowerCase()}`;
    _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`Sending slack message to channel: ${notifChannel}. Message: ${longMessage}`);
    await stateController.getTesterApifyClient().actor('katerinahronik/slack-message').call({
        channel: notifChannel,
        text: longMessage,
        token: 'xoxb-19871495652-7454715042834-joUHdJeyKq0QqIPs2bq9Av8I',
    }, { waitSecs: 0 });
};
/**
 * We will read all Actors in the circ_le account and build those that match by name pattern
 * There are many ways to approach this, a more robust one would be to have a map of Actors
 * which would allow to have more than one special user per Actor
 * But since that use-case might never be needed, I went with the simplest solution that doesn't require maintaining the map
 * NOTE: One issue is that if any Actor is renamed, we will not match it in the circ_le account nor throw any error
 */
const buildCircleApifyManaged = async (actorConfigs, stateController) => {
    // This token is hardcoded in the runner Actor, locally you have to inject it
    const client = new apify_client__WEBPACK_IMPORTED_MODULE_1__/* .ApifyClient */ .rj({ token: (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getEnvVar */ .lh)('APIFY_TOKEN_CIRC_LE') });
    const { items: circleActors } = await client.actors().list();
    const actorsToBuild = circleActors.map((circleActor) => {
        // They prefix all with apify-managed---, I communicated with Jacques to keep doing that
        let actorConfigFound = actorConfigs.find((actorConfig) => circleActor.name.replace('apify-managed---', '') === actorConfig.actorName.split('/')[1]);
        // Hack for bad naming of circ_le/apify-managed-google-search, we don't want to rename now to break customers
        if (!actorConfigFound && circleActor.name === 'apify-managed-google-search') {
            actorConfigFound = actorConfigs.find((actorConfig) => actorConfig.actorName.split('/')[1] === 'google-search-scraper');
        }
        if (actorConfigFound) {
            return {
                // We point the circle Actor to the repo folder
                actorName: `${circleActor.username}/${circleActor.name}`,
                folder: actorConfigFound.folder,
                isStandalone: actorConfigFound.isStandalone,
            };
        }
        return undefined;
    }).filter((config) => config !== undefined);
    _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`Found ${actorsToBuild.length} circ_le actors that match Actors we built out of total ${circleActors.length} circ_le actors`);
    _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`All circ_le actors: ${circleActors.map((actor) => actor.name).join(', ')}`);
    _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`circ_le Actors to build: ${actorsToBuild.map((actor) => actor.actorName).join(', ')}`);
    if (actorsToBuild.length === 0) {
        _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info('No circ_le actors to build');
        return;
    }
    await (0,_build_js__WEBPACK_IMPORTED_MODULE_3__/* .runBuilds */ .r)(stateController, actorsToBuild);
};
const pushToBuildLatest = async (actorConfigs, stateController) => {
    await buildLatest(actorConfigs, stateController);
    await buildCircleApifyManaged(actorConfigs, stateController);
    // Note: Typecasting is not ideal, it would be better if state controller was aware of the context but not worth to refactor now
    await notifyToSlack(stateController);
    // We only delete old builds if we successfully released latest build
    await (0,_build_js__WEBPACK_IMPORTED_MODULE_3__/* .deleteOldBuilds */ .Q)(actorConfigs);
};


/***/ }),

/***/ 2462:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   K: () => (/* binding */ StateController)
/* harmony export */ });
/* harmony import */ var _apify_log__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(6058);
/* harmony import */ var apify_client__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(4596);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __nccwpck_require__(9264);
/* harmony import */ var _consts_js__WEBPACK_IMPORTED_MODULE_3__ = __nccwpck_require__(8135);




const generateStateRecordKey = (githubEvent) => {
    const sanitizedName = githubEvent.repository.full_name.replace('/', '-');
    const sha = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getHeadCommitSha */ .a5)(githubEvent);
    const runStateKey = `REV-${sanitizedName}-${sha}`;
    return runStateKey;
};
class StateController {
    persistKvClient;
    testApifyClient;
    buildTestState;
    stateRecordKeys;
    constructor(persistKvClient, testApifyClient, buildTestState, stateRecordKeys) {
        this.persistKvClient = persistKvClient;
        this.testApifyClient = testApifyClient;
        this.buildTestState = buildTestState;
        this.stateRecordKeys = stateRecordKeys;
    }
    static async init(githubEvent) {
        const testApifyToken = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getEnvVar */ .lh)('TESTER_APIFY_TOKEN');
        const testApifyClient = new apify_client__WEBPACK_IMPORTED_MODULE_1__/* .ApifyClient */ .rj({ token: testApifyToken });
        // Initialize client for Testing admin account
        const persistKvClient = testApifyClient.keyValueStore(_consts_js__WEBPACK_IMPORTED_MODULE_3__/* .PERSISTED_GH_JOBS_KVS_ID */ .Ko);
        const stateRecordKeys = {
            perCommitBuildTest: generateStateRecordKey(githubEvent),
            perPRLastValidatedCommit: githubEvent.type === 'pull_request' ? `${(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__/* .getRepoName */ .oj)(githubEvent)}-PR-${githubEvent.pull_request.number}` : null,
        };
        // Had trouble making the types work here
        const previousState = (await persistKvClient.getRecord(stateRecordKeys.perCommitBuildTest))?.value;
        const buildTestState = previousState ?? { builds: {}, testRuns: {} };
        // We always attach the current event, useful for local testing if we don't want to change anything in it
        buildTestState.githubEvent = githubEvent;
        const stateController = new StateController(persistKvClient, testApifyClient, buildTestState, stateRecordKeys);
        // Store empty state at the start
        await stateController.persistBuildAndTestRuns();
        const stateUrl = `https://api.apify.com/v2/key-value-stores/${_consts_js__WEBPACK_IMPORTED_MODULE_3__/* .PERSISTED_GH_JOBS_KVS_ID */ .Ko}/records/${stateRecordKeys.perCommitBuildTest}`;
        _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`[STATE] Opened state that includes GitHub event data on URL: ${stateUrl}`);
        return stateController;
    }
    saveBuildAndActorId = (buildData) => {
        this.buildTestState.builds[buildData.actorName] = buildData;
    };
    saveTestRun = (testTaskName, runId) => {
        this.buildTestState.testRuns[testTaskName] = runId;
    };
    persistBuildAndTestRuns = async () => {
        // The type with JsonValue is broken
        await this.persistKvClient.setRecord({ key: this.stateRecordKeys.perCommitBuildTest, value: this.buildTestState });
    };
    clearTests = async () => {
        this.buildTestState.testRuns = {};
        await this.persistBuildAndTestRuns();
    };
    getTesterApifyClient = () => {
        return this.testApifyClient;
    };
    // If user does rerun workflows on GitHub, we want the tests run again (in case they fixed them)
    // But builds are bound to a commit so we want to keep them
    cleanup = async () => {
        await this.clearTests();
    };
    getLastValidatedCommit = async () => {
        // Check that what was the last commit where our test succeeded, we will diff files vs that
        // This is to skip running test suite if we only updated changelog etc. in the last PR commit
        let prState;
        if (this.stateRecordKeys.perPRLastValidatedCommit) {
            prState = (await this.persistKvClient.getRecord(this.stateRecordKeys.perPRLastValidatedCommit))
                ?.value;
            if (prState) {
                return prState.lastValidatedCommit;
            }
        }
        return undefined;
    };
    setLastValidatedCommit = async () => {
        // Only releevant for PRs
        if (!this.stateRecordKeys.perPRLastValidatedCommit) {
            return;
        }
        // We succeeded and tests passed, we can save the last valid commit
        // We always want to update the lastValidatedCommit only for successful test suite
        const headCommitSha = this.buildTestState.githubEvent.pull_request.head.sha;
        await this.persistKvClient.setRecord({ key: this.stateRecordKeys.perPRLastValidatedCommit, value: { lastValidatedCommit: headCommitSha } });
        _apify_log__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay.info(`[TEST] All tests finished successfully, storing lastValidatedCommit to KVS... `
            + `${this.stateRecordKeys.perPRLastValidatedCommit} = ${headCommitSha}`);
    };
}


/***/ }),

/***/ 9264:
/***/ ((__unused_webpack_module, __webpack_exports__, __nccwpck_require__) => {


// EXPORTS
__nccwpck_require__.d(__webpack_exports__, {
  Dw: () => (/* binding */ formatBuildNumsAndIdsForTesting),
  rG: () => (/* binding */ getChangedActors),
  lh: () => (/* binding */ getEnvVar),
  cJ: () => (/* binding */ getGitHubEvent),
  a5: () => (/* binding */ getHeadCommitSha),
  FP: () => (/* binding */ getLastCommitAdditions),
  DT: () => (/* binding */ getLastCommitAffectedFiles),
  vJ: () => (/* binding */ getRepoActors),
  oj: () => (/* binding */ getRepoName)
});

// UNUSED EXPORTS: checkoutRepoLocally, deduplicateConfigs, getCommitFolderNames, isMasterBranch, spawnCommandInGhWorkspace

;// CONCATENATED MODULE: external "node:fs/promises"
const promises_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:fs/promises");
var promises_default = /*#__PURE__*/__nccwpck_require__.n(promises_namespaceObject);
// EXTERNAL MODULE: ./node_modules/@apify/log/esm/index.mjs
var esm = __nccwpck_require__(6058);
;// CONCATENATED MODULE: external "node:child_process"
const external_node_child_process_namespaceObject = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("node:child_process");
;// CONCATENATED MODULE: ./src/utils.ts



const MASTER_BRANCH_NAMES = (/* unused pure expression or super */ null && ([
    'master',
    'main',
]));
const spawnCommandInGhWorkspace = (command, args = []) => {
    const ghWorkspace = getEnvVar('GITHUB_WORKSPACE');
    const commandInGhWorkspace = `cd ${ghWorkspace}; ${command}`;
    const commandResult = (0,external_node_child_process_namespaceObject.spawnSync)(commandInGhWorkspace, args, { shell: true, maxBuffer: 100 * 1024 * 1024 });
    if (commandResult.error) {
        throw new Error(`[Command failed]: ${commandInGhWorkspace}\n${commandResult.error}`);
    }
    if (commandResult.stderr.toString().length > 0) {
        // For some reason 'git' command prints stderr when checking out to detached HEAD state (we only use detached HEAD for testing though)
        if (!commandResult.stderr.toString().includes(`You are in 'detached HEAD' state`)) {
            throw new Error(`[Command printed stderr]: ${commandInGhWorkspace}\n${commandResult.stderr.toString()}`);
        }
    }
    return commandResult.stdout.toString();
};
// ref: 'refs/heads/master'
const isMasterBranch = (ref) => {
    if (!ref) {
        return false;
    }
    const branch = ref.replace('refs/heads/', '');
    return MASTER_BRANCH_NAMES.some((name) => branch === name);
};
const getRepoName = (githubEvent) => {
    const [, repoName] = githubEvent.repository.full_name.split('/');
    return repoName;
};
const parseGitHubEvent = (rawGitHubEvent) => {
    if (rawGitHubEvent.repository && rawGitHubEvent.pull_request) {
        esm/* default */.Ay.info('Parsed GitHub event as PR, starting PR build and test');
        return {
            type: 'pull_request',
            ...rawGitHubEvent,
        };
    }
    if (rawGitHubEvent.repository && rawGitHubEvent.ref && rawGitHubEvent.head_commit) {
        esm/* default */.Ay.info('Parsed GitHub event as push, starting building latest');
        return {
            type: 'push',
            ...rawGitHubEvent,
        };
    }
    throw new Error('No githubEvent.pull_request (PR) or githubEvent.head_commit (push)');
};
const getGitHubEvent = async () => {
    let githubEvent;
    if (process.env.GITHUB_EVENT_PATH) {
        const githubEventPath = getEnvVar('GITHUB_EVENT_PATH');
        const rawGitHubEvent = JSON.parse((await promises_default().readFile(githubEventPath)).toString());
        githubEvent = parseGitHubEvent(rawGitHubEvent);
    }
    else {
        // Running locally outside of GitHub Actions
        const input = await promises_default().readFile('storage/key_value_stores/default/INPUT.json', 'utf-8');
        let maybeRawGithubEvent;
        try {
            maybeRawGithubEvent = JSON.parse(input);
        }
        catch (err) {
            throw new Error(`Failed to parse INPUT.json with error: ${err}`);
        }
        if (maybeRawGithubEvent && maybeRawGithubEvent.repository) {
            githubEvent = parseGitHubEvent(maybeRawGithubEvent);
        }
        else {
            throw new Error('No githubEvent found either in GITHUB_EVENT_PATH or as input locally');
        }
        // Clone trigerring locally repo to mimic Checkout action
        await checkoutRepoLocally(githubEvent);
    }
    return githubEvent;
};
const getCommitFolderNames = (head_commit) => {
    // Empty arrays if nothing was changed there
    const { added, removed, modified } = head_commit;
    const updatedFiles = added.concat(removed).concat(modified);
    log.info(`All updated files:`);
    console.dir(updatedFiles);
    // We don't care about top level files updated here, those are handled by default
    const updatedFolders = [];
    for (const file of updatedFiles) {
        const isFolder = file.split('/').length > 1;
        if (isFolder) {
            const parts = file.split('/');
            const folderPath = parts.slice(0, parts.length - 1);
            updatedFolders.push(...folderPath);
        }
    }
    log.info('All updated folders:');
    console.dir(updatedFolders);
    return updatedFolders;
};
const deduplicateConfigs = (actorConfigs) => {
    const deduplicated = {};
    for (const config of actorConfigs) {
        const { actorName } = config;
        deduplicated[actorName] = config;
    }
    return Object.values(deduplicated);
};
const getEnvVar = (varName, defaultValue) => {
    const value = process.env[varName] ?? defaultValue;
    if (!value) {
        throw new Error(`${varName} not defined`);
    }
    return value;
};
/**
 * We provide a mapping of actor names and IDs to build numbers
 * The testing Actor then matches the run from test (which can be by name or ID) to a build number to be run
 * We also have to provide buildIds to be able to fetch input schema from build without token
*/
const formatBuildNumsAndIdsForTesting = (buildDataArr) => {
    const buildNums = {};
    const buildIds = {};
    for (const buildData of buildDataArr) {
        const { actorName, actorId, buildNumber, buildId } = buildData;
        buildNums[actorName] = buildNumber;
        buildNums[actorId] = buildNumber;
        buildIds[actorName] = buildId;
        buildIds[actorId] = buildId;
    }
    return { buildNums, buildIds };
};
/**
 * Reads and parses all directories in `actors` directory
 * This works locally if checkoutRepoLocally is called first
 */
const getRepoActors = async () => {
    const ghWorkspace = getEnvVar('GITHUB_WORKSPACE');
    let actorDirs;
    try {
        actorDirs = (await promises_default().readdir(`${ghWorkspace}/actors`)).map((dir) => `actors/${dir}`);
    }
    catch (err) {
        esm/* default */.Ay.warning(`No /actors directory found in repo`);
        actorDirs = [];
    }
    let standaloneActorDirs;
    try {
        standaloneActorDirs = (await promises_default().readdir(`${ghWorkspace}/standalone-actors`)).map((dir) => `standalone-actors/${dir}`);
    }
    catch (err) {
        esm/* default */.Ay.warning(`No /standalone-actors directory found in repo`);
        standaloneActorDirs = [];
    }
    const actorConfigs = [];
    for (const actorDir of [...actorDirs, ...standaloneActorDirs]) {
        const match = actorDir.match(/^([^/]+)\/([^_]+)_([^_]+)$/);
        if (!match) {
            throw new Error(`Invalid actor directory name. Got "${actorDir}", expected "actor.owner-name_actor-name"`);
        }
        const [, folderType, owner, actorName] = match;
        actorConfigs.push({
            actorName: `${owner}/${actorName}`,
            folder: actorDir,
            isStandalone: folderType === 'standalone-actors',
        });
    }
    esm/* default */.Ay.info(`Actors in repo: ${actorConfigs.filter(({ isStandalone }) => !isStandalone).map(({ actorName }) => actorName).join(', ')}`);
    esm/* default */.Ay.info(`Standalone actors in repo: ${actorConfigs.filter(({ isStandalone }) => !!isStandalone).map(({ actorName }) => actorName).join(', ')}`);
    return actorConfigs;
};
const getHeadCommitSha = (githubEvent) => {
    return githubEvent.type === 'pull_request'
        ? githubEvent.pull_request.head.sha
        : githubEvent.head_commit.id;
};
const checkoutRepoLocally = (githubEvent) => {
    const headRef = githubEvent.type === 'pull_request'
        ? githubEvent.pull_request.head.ref
        : githubEvent.ref;
    esm/* default */.Ay.info(`Cloning repo ${githubEvent.repository.full_name} with head ref ${headRef}`);
    const ghWorkspace = getEnvVar('GITHUB_WORKSPACE');
    const repoUrl = `https://github.com/${githubEvent.repository.full_name}`;
    const branch = headRef.replace('refs/heads/', '');
    const removeResult = (0,external_node_child_process_namespaceObject.spawnSync)('rm', ['-rf', `${ghWorkspace}`]);
    if (removeResult.error) {
        throw removeResult.error;
    }
    // We only need to clone more than last 2 commits if we want to test older commits,
    // I just randomly choose 20
    const result = (0,external_node_child_process_namespaceObject.spawnSync)(`git`, ['clone', repoUrl, '--depth', '20', '--branch', branch, '--single-branch', ghWorkspace]);
    if (result.error) {
        throw result.error;
    }
    // Checkout the repo to the correct commit, this is useful if we want to test older commit
    // that is no longer at the head of the branch
    const commitSha = getHeadCommitSha(githubEvent);
    spawnCommandInGhWorkspace(`git checkout ${commitSha}`);
    esm/* default */.Ay.info(`Cloned repo repo ${githubEvent.repository.full_name} with head ref ${headRef}`);
};
/**
 * Matches filename in top level or in directory
 * Unlike git, it is case insensitive (because Apify used uppercase config filenames and now uses lowercase mostly)
 */
const getLastCommitDiffForFile = (fileToDiff) => {
    esm/* default */.Ay.info(`[DIFF]: Getting last commit diff for filepath ending with ${fileToDiff}`);
    // 'git' command doesn't have case insensitive option, so we need to check the files with extra logic
    const filesChangedString = spawnCommandInGhWorkspace(`git diff HEAD^ HEAD --name-only`);
    // We don't use regex because we would need to escape all the special characters in the filename and grep is ugly
    const filesChanged = filesChangedString.split('\n').filter((filepath) => {
        // Either we match the file exactly
        return filepath.toLowerCase() === fileToDiff.toLowerCase()
            // Or it is in a directory
            || filepath.toLowerCase().endsWith(`/${fileToDiff.toLowerCase()}`);
    });
    esm/* default */.Ay.info(`[DIFF]: Files changed with ${fileToDiff} in last commit: ${filesChanged.join(', ')}`);
    if (filesChanged.length === 0) {
        return '';
    }
    // 'git diff' can take more files but they need to be separated by spaces, not newlines
    const filesSpacesSeparated = filesChanged.join(' ');
    // NOTE: If you play with this locally, be aware that passing files with -- only works properly if you execute 'git' from the repo root
    // Default maxBuffer is only 1MB which can crash on large diffs, 100 MB should be safe
    return spawnCommandInGhWorkspace(`git diff HEAD^ HEAD -- ${filesSpacesSeparated}`);
};
/**
 * Requires checkout action to be run before
 */
const getLastCommitAdditions = (filename) => {
    const diff = getLastCommitDiffForFile(filename);
    const added = [];
    let startedChangelog = false;
    for (const line of diff.split('\n')) {
        // We should already get only files we care about from getLastCommitDiffForFile but better to double check
        if (line.startsWith('+++') && line.toLowerCase().includes(filename.toLowerCase())) {
            startedChangelog = true;
            continue;
        }
        if (startedChangelog) {
            if (line.startsWith('diff')) {
                break;
            }
            if (line.startsWith('+')) {
                added.push(line.slice(1).trim());
            }
        }
    }
    return added.join('\n').trim();
};
/**
 * Requires checkout action to be run before
 * FIXME: For PRs, we might need more than diff last 2 commits, the problems are:
 * 1. PR is opened after several commits in the branch happened - need to compare with the rebased base
 * 2. New commit in the PR happens quickly after another and previous check is cancelled
 */
const getLastCommitAffectedFiles = (githubEvent, lastValidatedCommit) => {
    const commitHashesRevList = spawnCommandInGhWorkspace(`git rev-list HEAD`);
    // Sorted from HEAD to past
    const commitHashes = commitHashesRevList.split('\n').filter(Boolean);
    esm/* default */.Ay.info(`[DIFF]: actions/checkout@v4 fetched ${commitHashes.length} commit hashes. Fetched: ${commitHashes.join(', ')}`);
    let baseCommitShaPR = githubEvent.type === 'pull_request' ? githubEvent.pull_request.base.sha : null;
    // We keep track of tested commits so if we only update readme, we will not run tests
    if (lastValidatedCommit) {
        esm/* default */.Ay.info(`[DIFF]: Using last validated commit ${lastValidatedCommit}`);
        // If there was a force-push rewriting history, we will diff from scratch from the base
        // But we highly discourage force pushing/rebasing that rewrite history because history of tests and actions will not make sense
        const wasForcePushed = !commitHashes.includes(lastValidatedCommit);
        if (wasForcePushed) {
            esm/* default */.Ay.warning(`[DIFF]: We detected force push, diffing from scratch from the base. Don't use force-pushing/rebasing that rewrite history`
                + `unless you absolutely have to!`);
        }
        else if (lastValidatedCommit === commitHashes[0]) {
            // If we run again with the same commit, we want to enable running from scratch in case tests have been changed meanwhile
            esm/* default */.Ay.info(`[DIFF]: We detected that we are running again with the same commit, instead diffing from scratch from the base to enable full rerun.`);
        }
        else {
            baseCommitShaPR = lastValidatedCommit;
        }
    }
    // Either base (or last validated) of PR or previous commit for pushes
    const commitToDiff = baseCommitShaPR || commitHashes[1];
    let commitsDiffCount = 0;
    for (const commit of commitHashes) {
        commitsDiffCount++;
        if (commit === commitToDiff) {
            break;
        }
    }
    esm/* default */.Ay.info(`[DIFF]: We fetched ${commitHashes.length} commits (should be 2 for push). Diffing ${commitsDiffCount} commits back `
        + `HEAD ${commitHashes[0]} to ${commitToDiff}.`);
    const diffOutput = spawnCommandInGhWorkspace(`git diff --name-only ${commitToDiff} ${commitHashes[0]}`);
    const files = diffOutput.split('\n').filter(Boolean);
    esm/* default */.Ay.info(`[DIFF]: Last commit affected files: ${files.join(', ')}`);
    return files;
};
/**
 * Also works for folders
 */
const isIgnoredTopLevelFile = (lowercaseFilePath) => {
    // On top level, we should only have dev-only readme and .actor/ is just for apify push CLI (real Actor configs are in /actors)
    const IGNORED_TOP_LEVEL_FILES = ['.vscode/', '.gitignore', 'readme.md', '.husky/', '.eslintrc', '.editorconfig', '.actor/'];
    // Strip out deprecated /code and /shared folders, treat them as top-level code
    const sanitizedLowercaseFilePath = lowercaseFilePath.replace(/^code\//, '').replace(/^shared\//, '');
    return IGNORED_TOP_LEVEL_FILES.some((ignoredFile) => sanitizedLowercaseFilePath.startsWith(ignoredFile));
};
const isLatestBuildOnlyFile = (lowercaseFilePath) => {
    if (lowercaseFilePath.endsWith('changelog.md')) {
        return true;
    }
    // Either in /actors or /standalone-actors, we need to rebuild readme but we don't rebuild top-level dev-only readme
    if ((lowercaseFilePath.startsWith('actors/') || lowercaseFilePath.startsWith('standalone-actors/')) && lowercaseFilePath.endsWith('readme.md')) {
        return true;
    }
    return false;
};
/**
 * Latest and devel are the same except that for latest we also rebuild with README and CHANGELOG files
 */
const getChangedActors = ({ filepathsChanged, actorConfigs, isLatest }) => {
    let codeChanged = false;
    // folder -> ActorConfig
    const actorsChangedMap = new Map();
    const actorConfigsWithoutStandalone = actorConfigs.filter(({ isStandalone }) => !isStandalone);
    const lowercaseFiles = filepathsChanged.map((file) => file.toLowerCase());
    for (const lowercaseFilePath of lowercaseFiles) {
        if (isIgnoredTopLevelFile(lowercaseFilePath)) {
            continue;
        }
        // First we check for specific actors that have configs in /actors or standalone actors in /standalone-actors
        // This matches both actors/username_actorName and standalone-actors/username_actorName
        const changedActorConfigMatch = lowercaseFilePath.match(/^(?:standalone-)?actors\/([^/]+)\/.+/);
        if (changedActorConfigMatch) {
            const sanitizedActorName = changedActorConfigMatch[1].replace('_', '/');
            const actorConfigChanged = actorConfigs.find(({ actorName }) => actorName.toLowerCase() === sanitizedActorName);
            if (actorConfigChanged === undefined) {
                esm/* default */.Ay.warning('changes was found in an actor folder which no longer exists in the current commit', {
                    actorName: sanitizedActorName,
                    actorFolderName: changedActorConfigMatch[1],
                });
                continue;
            }
            console.log(`actorConfigChanged ${actorConfigChanged.actorName}: sanitizedActorName ${sanitizedActorName} ${lowercaseFilePath} `);
            // These can be nested at various folders inside the actor folder
            if (isLatest || !isLatestBuildOnlyFile(lowercaseFilePath)) {
                // We assume other files will are either actor.json or input_schema.json and those needs to be tested
                // TODO: Check what changed in schema, we don't need to test description changes
                actorsChangedMap.set(actorConfigChanged.folder, actorConfigChanged);
            }
            continue;
        }
        // We check top level files (formerly in /code and /shared folders) that are shared among all non-standalone Actors
        // Standalone actors are always handled separately by name via changedActorConfigMatch
        if (isLatest || !isLatestBuildOnlyFile(lowercaseFilePath)) {
            codeChanged = !isLatest; // NOTE: code is changed only in PR
            for (const actorConfig of actorConfigsWithoutStandalone) {
                actorsChangedMap.set(actorConfig.folder, actorConfig);
            }
        }
    }
    const actorsChanged = Array.from(actorsChangedMap.values());
    // All below here is just for logging
    const ignoredFilesChanged = lowercaseFiles.filter((file) => isIgnoredTopLevelFile(file));
    esm/* default */.Ay.info(`[DIFF]: Top level files changed that we ignore (don't trigger test or build): ${ignoredFilesChanged.join(', ')}`);
    const onlyLatestFilesChanged = lowercaseFiles.filter((file) => isLatestBuildOnlyFile(file));
    esm/* default */.Ay.info(`[DIFF]: Files changed that only trigger latest build: ${onlyLatestFilesChanged.join(', ')}`);
    if (!isLatest && codeChanged) {
        esm/* default */.Ay.info(`[DIFF]: All non-standalone Actors need to be built and tested (changes in top-level code)`);
    }
    if (actorsChanged.length > 0) {
        const miniactors = actorsChanged.filter((config) => !config.isStandalone).map((config) => config.actorName);
        const standaloneActors = actorsChanged.filter((config) => config.isStandalone).map((config) => config.actorName);
        esm/* default */.Ay.info(`[DIFF]: MiniActors to be built and tested: ${miniactors.join(', ')}`);
        esm/* default */.Ay.info(`[DIFF]: Standalone Actors to be built and tested: ${standaloneActors.join(', ')}`);
    }
    else {
        esm/* default */.Ay.info(`[DIFF]: No relevant files changed, skipping builds and tests`);
    }
    return {
        actorsChanged,
        codeChanged,
    };
};


/***/ }),

/***/ 2613:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("assert");

/***/ }),

/***/ 4434:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("events");

/***/ }),

/***/ 9896:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("fs");

/***/ }),

/***/ 8611:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("http");

/***/ }),

/***/ 5692:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("https");

/***/ }),

/***/ 857:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("os");

/***/ }),

/***/ 6928:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("path");

/***/ }),

/***/ 2203:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("stream");

/***/ }),

/***/ 2018:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("tty");

/***/ }),

/***/ 7016:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("url");

/***/ }),

/***/ 9023:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("util");

/***/ }),

/***/ 3106:
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_createRequire(import.meta.url)("zlib");

/***/ }),

/***/ 9582:
/***/ ((module) => {


var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  ACTOR_BUILD_ARGS: () => ACTOR_BUILD_ARGS,
  ACTOR_CATEGORIES: () => ACTOR_CATEGORIES,
  ACTOR_ENV_VARS: () => ACTOR_ENV_VARS,
  ACTOR_EVENT_NAMES: () => ACTOR_EVENT_NAMES,
  ACTOR_JOB_STATUSES: () => ACTOR_JOB_STATUSES,
  ACTOR_JOB_TERMINAL_STATUSES: () => ACTOR_JOB_TERMINAL_STATUSES,
  ACTOR_JOB_TYPES: () => ACTOR_JOB_TYPES,
  ACTOR_LIMITS: () => ACTOR_LIMITS,
  ACTOR_NAME: () => ACTOR_NAME,
  ACTOR_PERMISSION_LEVEL: () => ACTOR_PERMISSION_LEVEL,
  ACTOR_RESTART_ON_ERROR: () => ACTOR_RESTART_ON_ERROR,
  ACTOR_SOURCE_TYPES: () => ACTOR_SOURCE_TYPES,
  ACTOR_TYPES: () => ACTOR_TYPES,
  ACT_JOB_STATUSES: () => ACT_JOB_STATUSES,
  ACT_JOB_TERMINAL_STATUSES: () => ACT_JOB_TERMINAL_STATUSES,
  ACT_JOB_TYPES: () => ACT_JOB_TYPES,
  ACT_RESTART_ON_ERROR: () => ACT_RESTART_ON_ERROR,
  ACT_SOURCE_TYPES: () => ACT_SOURCE_TYPES,
  ACT_TYPES: () => ACT_TYPES,
  ALL_ACTOR_CATEGORIES: () => ALL_ACTOR_CATEGORIES,
  ANONYMOUS_USERNAME: () => ANONYMOUS_USERNAME,
  APIFY_ENV_VARS: () => APIFY_ENV_VARS,
  APIFY_ID_REGEX: () => APIFY_ID_REGEX,
  APIFY_PROXY_VALUE_REGEX: () => APIFY_PROXY_VALUE_REGEX,
  BUILD_TAG_LATEST: () => BUILD_TAG_LATEST,
  COMMA_SEPARATED_EMAILS_REGEX: () => COMMA_SEPARATED_EMAILS_REGEX,
  COMMA_SEPARATED_EMAILS_REGEX_STR: () => COMMA_SEPARATED_EMAILS_REGEX_STR,
  COMMA_SEPARATED_LIST_ENV_VARS: () => COMMA_SEPARATED_LIST_ENV_VARS,
  COMPUTE_UNIT_MB: () => COMPUTE_UNIT_MB,
  COMPUTE_UNIT_MILLIS: () => COMPUTE_UNIT_MILLIS,
  CONTACT_LINK_REGEX: () => CONTACT_LINK_REGEX,
  DEFAULT_ACTOR_STANDBY_PORT: () => DEFAULT_ACTOR_STANDBY_PORT,
  DEFAULT_CONTAINER_PORT: () => DEFAULT_CONTAINER_PORT,
  DEFAULT_PLATFORM_LIMITS: () => DEFAULT_PLATFORM_LIMITS,
  DNS_SAFE_NAME_MAX_LENGTH: () => DNS_SAFE_NAME_MAX_LENGTH,
  DNS_SAFE_NAME_REGEX: () => DNS_SAFE_NAME_REGEX,
  DOCKER_LABELS: () => DOCKER_LABELS,
  EMAIL: () => EMAIL,
  EMAIL_REGEX: () => EMAIL_REGEX,
  EMAIL_REGEX_STR: () => EMAIL_REGEX_STR,
  ENV_VARS: () => ENV_VARS,
  FINISHED_PROJECT_STATUSES: () => FINISHED_PROJECT_STATUSES,
  FREE_SUBSCRIPTION_PLAN_CODE: () => FREE_SUBSCRIPTION_PLAN_CODE,
  GITHUB_GIST_URL_REGEX: () => GITHUB_GIST_URL_REGEX,
  GITHUB_REGEX: () => GITHUB_REGEX,
  GIT_MAIN_BRANCH: () => GIT_MAIN_BRANCH,
  GIT_REPO_REGEX: () => GIT_REPO_REGEX,
  HTTP_URL_REGEX: () => HTTP_URL_REGEX,
  INTEGER_ENV_VARS: () => INTEGER_ENV_VARS,
  ISSUES_STATUS_ALL: () => ISSUES_STATUS_ALL,
  ISSUES_STATUS_TYPES: () => ISSUES_STATUS_TYPES,
  KEY_VALUE_STORE_KEYS: () => KEY_VALUE_STORE_KEYS,
  KEY_VALUE_STORE_KEY_REGEX: () => KEY_VALUE_STORE_KEY_REGEX,
  LINKEDIN_PROFILE_REGEX: () => LINKEDIN_PROFILE_REGEX,
  LOCAL_ACTOR_ENV_VARS: () => LOCAL_ACTOR_ENV_VARS,
  LOCAL_APIFY_ENV_VARS: () => LOCAL_APIFY_ENV_VARS,
  LOCAL_ENV_VARS: () => LOCAL_ENV_VARS,
  LOCAL_STORAGE_SUBDIRS: () => LOCAL_STORAGE_SUBDIRS,
  MARKETPLACE_USER_ROLES: () => MARKETPLACE_USER_ROLES,
  MAX_MULTIFILE_BYTES: () => MAX_MULTIFILE_BYTES,
  MAX_PAYLOAD_SIZE_BYTES: () => MAX_PAYLOAD_SIZE_BYTES,
  META_ORIGINS: () => META_ORIGINS,
  ME_USER_NAME_PLACEHOLDER: () => ME_USER_NAME_PLACEHOLDER,
  PROFILE_NAME: () => PROFILE_NAME,
  PROJECT_STATUSES: () => PROJECT_STATUSES,
  PROXY_URL_REGEX: () => PROXY_URL_REGEX,
  RELATIVE_URL_REGEX: () => RELATIVE_URL_REGEX,
  REQUEST_QUEUE_HEAD_MAX_LIMIT: () => REQUEST_QUEUE_HEAD_MAX_LIMIT,
  REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION: () => REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION,
  RUN_GENERAL_ACCESS: () => RUN_GENERAL_ACCESS,
  SHORT_CRAWLER_ID_LENGTH: () => SHORT_CRAWLER_ID_LENGTH,
  SOURCE_FILE_FORMATS: () => SOURCE_FILE_FORMATS,
  SPLIT_PATH_REGEX: () => SPLIT_PATH_REGEX,
  STORAGE_GENERAL_ACCESS: () => STORAGE_GENERAL_ACCESS,
  TWITTER_REGEX: () => TWITTER_REGEX,
  URL_REGEX: () => URL_REGEX,
  USERNAME: () => USERNAME,
  USER_BASIC_TEXT_XSS_OPTIONS: () => USER_BASIC_TEXT_XSS_OPTIONS,
  USER_PERSONA_TYPES: () => USER_PERSONA_TYPES,
  VERSION_INT_MAJOR_BASE: () => VERSION_INT_MAJOR_BASE,
  VERSION_INT_MINOR_BASE: () => VERSION_INT_MINOR_BASE,
  WEBHOOK_ALLOWED_PAYLOAD_VARIABLES: () => WEBHOOK_ALLOWED_PAYLOAD_VARIABLES,
  WEBHOOK_DEFAULT_PAYLOAD_TEMPLATE: () => WEBHOOK_DEFAULT_PAYLOAD_TEMPLATE,
  WEBHOOK_DISPATCH_STATUSES: () => WEBHOOK_DISPATCH_STATUSES,
  WEBHOOK_EVENT_TYPES: () => WEBHOOK_EVENT_TYPES,
  WEBHOOK_EVENT_TYPE_GROUPS: () => WEBHOOK_EVENT_TYPE_GROUPS,
  WORKER_SERVICE_TYPES: () => WORKER_SERVICE_TYPES
});
module.exports = __toCommonJS(index_exports);

// src/regexs.ts
var namePartSubRegexStr = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+";
var nameSubRegexStr = `${namePartSubRegexStr}(?:\\.${namePartSubRegexStr})*`;
var domainPartSubRegexStr = "[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?";
var domainSubRegexStr = `${domainPartSubRegexStr}(?:\\.${domainPartSubRegexStr})+`;
var EMAIL_REGEX_STR = `${nameSubRegexStr}@${domainSubRegexStr}`;
var EMAIL_REGEX = new RegExp(`^${EMAIL_REGEX_STR}$`);
var COMMA_SEPARATED_EMAILS_REGEX_STR = `(${EMAIL_REGEX_STR})( *, *${EMAIL_REGEX_STR})*`;
var COMMA_SEPARATED_EMAILS_REGEX = new RegExp(`^${COMMA_SEPARATED_EMAILS_REGEX_STR}$`);
var GIT_REPO_REGEX = /^(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\/?|#[-\d\w._:/]+?)$/;
var DNS_SAFE_NAME_REGEX = /^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])$/;
var APIFY_PROXY_VALUE_REGEX = /^[\w._~]+$/;
var PROXY_URL_REGEX = /^(socks(4|4a|5|5h)?|https?):\/\/(([^:]+:)?[^@]*@)?[^.:@]+\.[^:]+:[\d]+?$/;
var KEY_VALUE_STORE_KEY_REGEX = /^([a-zA-Z0-9!\-_.'()]{1,256})$/;
var GITHUB_REGEX_STR = "[a-z\\d](?:[a-z\\d]|-(?=[a-z\\d])){0,38}";
var TWITTER_REGEX = /^@[a-z0-9_]{1,15}$/i;
var GITHUB_REGEX = new RegExp(`^${GITHUB_REGEX_STR}$`, "i");
var LINKEDIN_PROFILE_REGEX = /^(https?:\/\/)?(www\.)?([a-z]{2}\.)?linkedin.com\/(in|company)\/([A-Za-z0-9_-]+)\/?$/;
var URL_REGEX = /^https?:\/\//i;
var HTTP_URL_REGEX = new RegExp(
  "^(?:(?:(?:https?):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+(?:[a-z\\u00a1-\\uffff]{2,}\\.?|xn--[a-z0-9]+))(?::\\d{2,5})?(?:[/?#]\\S*)?$",
  "i"
);
var GITHUB_GIST_URL_REGEX = new RegExp(`^https:\\/\\/gist\\.github\\.com\\/${GITHUB_REGEX_STR}\\/[0-9a-f]{32}$`, "i");
var SPLIT_PATH_REGEX = /[^/]+/g;
var RELATIVE_URL_REGEX = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\|\/\/).*/i;
var CONTACT_LINK_REGEX = /^(mailto|tel|sms):.*$/i;
var APIFY_ID_REGEX = /[a-zA-Z0-9]{17}/;

// src/consts.ts
var FREE_SUBSCRIPTION_PLAN_CODE = "DEV";
var ACTOR_JOB_TYPES = {
  BUILD: "BUILD",
  RUN: "RUN"
};
var ACTOR_SOURCE_TYPES = {
  SOURCE_CODE: "SOURCE_CODE",
  SOURCE_FILES: "SOURCE_FILES",
  GIT_REPO: "GIT_REPO",
  TARBALL: "TARBALL",
  GITHUB_GIST: "GITHUB_GIST"
};
var ACTOR_EVENT_NAMES = {
  CPU_INFO: "cpuInfo",
  SYSTEM_INFO: "systemInfo",
  MIGRATING: "migrating",
  PERSIST_STATE: "persistState",
  ABORTING: "aborting"
};
var ACTOR_JOB_STATUSES = {
  READY: "READY",
  // started but not allocated to any worker yet
  RUNNING: "RUNNING",
  // running on worker
  SUCCEEDED: "SUCCEEDED",
  // finished and all good
  FAILED: "FAILED",
  // run or build failed
  TIMING_OUT: "TIMING-OUT",
  // timing out now
  TIMED_OUT: "TIMED-OUT",
  // timed out
  ABORTING: "ABORTING",
  // being aborted by user
  ABORTED: "ABORTED"
  // aborted by user
};
var WEBHOOK_DISPATCH_STATUSES = {
  ACTIVE: "ACTIVE",
  // Attempting to deliver the webhook
  SUCCEEDED: "SUCCEEDED",
  // Webhook was delivered
  FAILED: "FAILED"
  // All calls to webhook target URL failed
};
var ACTOR_JOB_TERMINAL_STATUSES = [
  ACTOR_JOB_STATUSES.SUCCEEDED,
  ACTOR_JOB_STATUSES.FAILED,
  ACTOR_JOB_STATUSES.TIMED_OUT,
  ACTOR_JOB_STATUSES.ABORTED
];
var WORKER_SERVICE_TYPES = {
  CRAWLING: "crawling",
  ACTOR: "actor"
};
var META_ORIGINS = {
  DEVELOPMENT: "DEVELOPMENT",
  // Job started from Developer console in Source section of actor
  WEB: "WEB",
  // Job started from other place on the website (either console or task detail page)
  API: "API",
  // Job started through API
  SCHEDULER: "SCHEDULER",
  // Job started through Scheduler
  TEST: "TEST",
  // Job started through test actor page
  WEBHOOK: "WEBHOOK",
  // Job started by the webhook
  ACTOR: "ACTOR",
  // Job started by another actor run
  CLI: "CLI",
  // Job started by apify CLI
  STANDBY: "STANDBY"
  // Job started by Actor Standby
};
var DOCKER_LABELS = {
  ACTOR_BUILD_ID: "com.apify.actBuildId",
  ACTOR_RUN_ID: "com.apify.actRunId",
  // Kept for backwards compatibility, will be removed soon (TODO: remove old usages!)
  /** @deprecated Use ACTOR_BUILD_ID instead! */
  ACT_BUILD_ID: "com.apify.actBuildId",
  /** @deprecated Use ACTOR_RUN_ID instead! */
  ACT_RUN_ID: "com.apify.actRunId"
};
var ACTOR_TYPES = {
  ACT: "acts",
  CRAWLER: "crawlers"
};
var ME_USER_NAME_PLACEHOLDER = "me";
var ANONYMOUS_USERNAME = "anonymous";
var USERNAME = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 30,
  // Regex matching a potentially allowed username. The numbers must match MIN and MAX!
  // Note that username must also pass isForbiddenUser() test to be allowed!
  REGEX: /^[a-zA-Z0-9_.-]{3,30}$/
};
var EMAIL = {
  MAX_LENGTH: 254,
  // see https://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
  REGEX: EMAIL_REGEX
};
var PROFILE_NAME = {
  MAX_LENGTH: 50,
  REGEX: /^(?!.*:\/\/)[^@><]*$/
  // Prohibits usage of @, <, > and ://
};
var DNS_SAFE_NAME_MAX_LENGTH = 63;
var ACTOR_NAME = {
  MIN_LENGTH: 3,
  MAX_LENGTH: DNS_SAFE_NAME_MAX_LENGTH,
  // DNS-safe string length
  REGEX: DNS_SAFE_NAME_REGEX
};
var SHORT_CRAWLER_ID_LENGTH = 5;
var BUILD_TAG_LATEST = "latest";
var ACTOR_RESTART_ON_ERROR = {
  MAX_RESTARTS: 3,
  // This needs to be low enough so that it only covers restart loops, rather than e.g.
  // errors during crawling of large lists of URLs
  INTERVAL_MILLIS: 1 * 60 * 1e3
};
var ACT_RESTART_ON_ERROR = ACTOR_RESTART_ON_ERROR;
var ACT_JOB_TYPES = ACTOR_JOB_TYPES;
var ACT_SOURCE_TYPES = ACTOR_SOURCE_TYPES;
var ACT_JOB_STATUSES = ACTOR_JOB_STATUSES;
var ACT_JOB_TERMINAL_STATUSES = ACTOR_JOB_TERMINAL_STATUSES;
var ACT_TYPES = ACTOR_TYPES;
var COMPUTE_UNIT_MB = 1024;
var COMPUTE_UNIT_MILLIS = 60 * 60 * 1e3;
var ACTOR_LIMITS = {
  // The actualy used limit is taken from private package @apify-packages/consts
  BUILD_DEFAULT_MEMORY_MBYTES: 4096,
  // Maximum duration of build in seconds.
  BUILD_TIMEOUT_SECS: 1800,
  // For each build or run container, set disk quota based on memory size
  RUN_DISK_TO_MEMORY_SIZE_COEFF: 2,
  // For each build or run container, set CPU cores based on memory size
  RUN_MEMORY_MBYTES_PER_CPU_CORE: 4096,
  // The default limit of memory for all running Actor jobs for free accounts.
  FREE_ACCOUNT_MAX_MEMORY_MBYTES: 8192,
  // The default limit of memory for all running Actor jobs for paid accounts.
  PAID_ACCOUNT_MAX_MEMORY_MBYTES: 65536,
  // Minimum and maximum memory for a single act run.
  MIN_RUN_MEMORY_MBYTES: 128,
  MAX_RUN_MEMORY_MBYTES: 32768,
  // Maximum size of actor input schema.
  INPUT_SCHEMA_MAX_BYTES: 500 * 1024,
  // Max length of run/build log in number of characters
  LOG_MAX_CHARS: 10 * 1024 * 1024
};
var DEFAULT_PLATFORM_LIMITS = {
  // Maximum number of actors per user
  MAX_ACTORS_PER_USER: 500,
  // Maximum number of tasks per user
  MAX_TASKS_PER_USER: 5e3,
  // Maximum number of schedules per user
  MAX_SCHEDULES_PER_USER: 100,
  // Maximum number of webhooks per user
  MAX_WEBHOOKS_PER_USER: 100,
  // Maximum number of concurrent actor runs per user for free accounts.
  FREE_ACCOUNT_MAX_CONCURRENT_ACTOR_RUNS_PER_USER: 25,
  // Maximum number of concurrent actor runs per user for paid accounts.
  PAID_ACCOUNT_MAX_CONCURRENT_ACTOR_RUNS_PER_USER: 250,
  // Maximum number of actors per scheduler
  MAX_ACTORS_PER_SCHEDULER: 10,
  // Maximum number of tasks per scheduler
  MAX_TASKS_PER_SCHEDULER: 10
};
var REQUEST_QUEUE_HEAD_MAX_LIMIT = 1e3;
var APIFY_ENV_VARS = {
  API_BASE_URL: "APIFY_API_BASE_URL",
  API_PUBLIC_BASE_URL: "APIFY_API_PUBLIC_BASE_URL",
  CHROME_EXECUTABLE_PATH: "APIFY_CHROME_EXECUTABLE_PATH",
  DEDICATED_CPUS: "APIFY_DEDICATED_CPUS",
  DISABLE_OUTDATED_WARNING: "APIFY_DISABLE_OUTDATED_WARNING",
  FACT: "APIFY_FACT",
  HEADLESS: "APIFY_HEADLESS",
  INPUT_SECRETS_PRIVATE_KEY_FILE: "APIFY_INPUT_SECRETS_PRIVATE_KEY_FILE",
  INPUT_SECRETS_PRIVATE_KEY_PASSPHRASE: "APIFY_INPUT_SECRETS_PRIVATE_KEY_PASSPHRASE",
  IS_AT_HOME: "APIFY_IS_AT_HOME",
  LOCAL_STORAGE_DIR: "APIFY_LOCAL_STORAGE_DIR",
  LOG_FORMAT: "APIFY_LOG_FORMAT",
  LOG_LEVEL: "APIFY_LOG_LEVEL",
  METAMORPH_AFTER_SLEEP_MILLIS: "APIFY_METAMORPH_AFTER_SLEEP_MILLIS",
  META_ORIGIN: "APIFY_META_ORIGIN",
  PERSIST_STATE_INTERVAL_MILLIS: "APIFY_PERSIST_STATE_INTERVAL_MILLIS",
  PROXY_HOSTNAME: "APIFY_PROXY_HOSTNAME",
  PROXY_PASSWORD: "APIFY_PROXY_PASSWORD",
  PROXY_PORT: "APIFY_PROXY_PORT",
  PROXY_STATUS_URL: "APIFY_PROXY_STATUS_URL",
  PURGE_ON_START: "APIFY_PURGE_ON_START",
  SDK_LATEST_VERSION: "APIFY_SDK_LATEST_VERSION",
  SYSTEM_INFO_INTERVAL_MILLIS: "APIFY_SYSTEM_INFO_INTERVAL_MILLIS",
  TOKEN: "APIFY_TOKEN",
  USER_ID: "APIFY_USER_ID",
  USER_IS_PAYING: "APIFY_USER_IS_PAYING",
  USER_PRICING_TIER: "APIFY_USER_PRICING_TIER",
  WORKFLOW_KEY: "APIFY_WORKFLOW_KEY",
  XVFB: "APIFY_XVFB",
  // Replaced by ACTOR_ENV_VARS, kept for backward compatibility:
  ACTOR_BUILD_ID: "APIFY_ACTOR_BUILD_ID",
  ACTOR_BUILD_NUMBER: "APIFY_ACTOR_BUILD_NUMBER",
  ACTOR_EVENTS_WS_URL: "APIFY_ACTOR_EVENTS_WS_URL",
  ACTOR_ID: "APIFY_ACTOR_ID",
  ACTOR_MAX_PAID_DATASET_ITEMS: "ACTOR_MAX_PAID_DATASET_ITEMS",
  ACTOR_RUN_ID: "APIFY_ACTOR_RUN_ID",
  ACTOR_TASK_ID: "APIFY_ACTOR_TASK_ID",
  CONTAINER_PORT: "APIFY_CONTAINER_PORT",
  CONTAINER_URL: "APIFY_CONTAINER_URL",
  DEFAULT_DATASET_ID: "APIFY_DEFAULT_DATASET_ID",
  DEFAULT_KEY_VALUE_STORE_ID: "APIFY_DEFAULT_KEY_VALUE_STORE_ID",
  DEFAULT_REQUEST_QUEUE_ID: "APIFY_DEFAULT_REQUEST_QUEUE_ID",
  INPUT_KEY: "APIFY_INPUT_KEY",
  MEMORY_MBYTES: "APIFY_MEMORY_MBYTES",
  STARTED_AT: "APIFY_STARTED_AT",
  TIMEOUT_AT: "APIFY_TIMEOUT_AT",
  // Deprecated, keep them for backward compatibility:
  ACT_ID: "APIFY_ACT_ID",
  ACT_RUN_ID: "APIFY_ACT_RUN_ID"
};
var ENV_VARS = APIFY_ENV_VARS;
var ACTOR_ENV_VARS = {
  BUILD_ID: "ACTOR_BUILD_ID",
  BUILD_NUMBER: "ACTOR_BUILD_NUMBER",
  BUILD_TAGS: "ACTOR_BUILD_TAGS",
  DEFAULT_DATASET_ID: "ACTOR_DEFAULT_DATASET_ID",
  DEFAULT_KEY_VALUE_STORE_ID: "ACTOR_DEFAULT_KEY_VALUE_STORE_ID",
  DEFAULT_REQUEST_QUEUE_ID: "ACTOR_DEFAULT_REQUEST_QUEUE_ID",
  EVENTS_WEBSOCKET_URL: "ACTOR_EVENTS_WEBSOCKET_URL",
  FULL_NAME: "ACTOR_FULL_NAME",
  ID: "ACTOR_ID",
  INPUT_KEY: "ACTOR_INPUT_KEY",
  MAX_PAID_DATASET_ITEMS: "ACTOR_MAX_PAID_DATASET_ITEMS",
  MAX_TOTAL_CHARGE_USD: "ACTOR_MAX_TOTAL_CHARGE_USD",
  MEMORY_MBYTES: "ACTOR_MEMORY_MBYTES",
  RUN_ID: "ACTOR_RUN_ID",
  STANDBY_PORT: "ACTOR_STANDBY_PORT",
  STANDBY_URL: "ACTOR_STANDBY_URL",
  STARTED_AT: "ACTOR_STARTED_AT",
  TASK_ID: "ACTOR_TASK_ID",
  TIMEOUT_AT: "ACTOR_TIMEOUT_AT",
  WEB_SERVER_PORT: "ACTOR_WEB_SERVER_PORT",
  WEB_SERVER_URL: "ACTOR_WEB_SERVER_URL"
};
var INTEGER_ENV_VARS = [
  // Actor env vars
  ACTOR_ENV_VARS.MAX_PAID_DATASET_ITEMS,
  ACTOR_ENV_VARS.MEMORY_MBYTES,
  ACTOR_ENV_VARS.STANDBY_PORT,
  ACTOR_ENV_VARS.WEB_SERVER_PORT,
  // Apify env vars
  APIFY_ENV_VARS.ACTOR_MAX_PAID_DATASET_ITEMS,
  APIFY_ENV_VARS.CONTAINER_PORT,
  APIFY_ENV_VARS.DEDICATED_CPUS,
  APIFY_ENV_VARS.MEMORY_MBYTES,
  APIFY_ENV_VARS.METAMORPH_AFTER_SLEEP_MILLIS,
  APIFY_ENV_VARS.PERSIST_STATE_INTERVAL_MILLIS,
  APIFY_ENV_VARS.PROXY_PORT,
  APIFY_ENV_VARS.SYSTEM_INFO_INTERVAL_MILLIS
];
var COMMA_SEPARATED_LIST_ENV_VARS = [
  ACTOR_ENV_VARS.BUILD_TAGS
];
var ACTOR_BUILD_ARGS = {
  ACTOR_PATH_IN_DOCKER_CONTEXT: "ACTOR_PATH_IN_DOCKER_CONTEXT"
};
var DEFAULT_CONTAINER_PORT = 4321;
var DEFAULT_ACTOR_STANDBY_PORT = DEFAULT_CONTAINER_PORT;
var LOCAL_STORAGE_SUBDIRS = {
  datasets: "datasets",
  keyValueStores: "key_value_stores",
  requestQueues: "request_queues"
};
var LOCAL_ACTOR_ENV_VARS = {
  [ACTOR_ENV_VARS.STANDBY_PORT]: DEFAULT_CONTAINER_PORT.toString(),
  [ACTOR_ENV_VARS.DEFAULT_DATASET_ID]: "default",
  [ACTOR_ENV_VARS.DEFAULT_KEY_VALUE_STORE_ID]: "default",
  [ACTOR_ENV_VARS.DEFAULT_REQUEST_QUEUE_ID]: "default",
  [ACTOR_ENV_VARS.WEB_SERVER_PORT]: DEFAULT_CONTAINER_PORT.toString(),
  [ACTOR_ENV_VARS.WEB_SERVER_URL]: `http://localhost:${DEFAULT_CONTAINER_PORT}`
  // Must match port line above!
};
var LOCAL_APIFY_ENV_VARS = {
  [APIFY_ENV_VARS.CONTAINER_PORT]: LOCAL_ACTOR_ENV_VARS.ACTOR_WEB_SERVER_PORT,
  [APIFY_ENV_VARS.CONTAINER_URL]: LOCAL_ACTOR_ENV_VARS.ACTOR_WEB_SERVER_URL,
  [APIFY_ENV_VARS.DEFAULT_DATASET_ID]: LOCAL_ACTOR_ENV_VARS.ACTOR_DEFAULT_DATASET_ID,
  [APIFY_ENV_VARS.DEFAULT_KEY_VALUE_STORE_ID]: LOCAL_ACTOR_ENV_VARS.ACTOR_DEFAULT_KEY_VALUE_STORE_ID,
  [APIFY_ENV_VARS.DEFAULT_REQUEST_QUEUE_ID]: LOCAL_ACTOR_ENV_VARS.ACTOR_DEFAULT_REQUEST_QUEUE_ID,
  [APIFY_ENV_VARS.PROXY_HOSTNAME]: "proxy.apify.com",
  [APIFY_ENV_VARS.PROXY_PORT]: 8e3.toString()
};
var LOCAL_ENV_VARS = LOCAL_APIFY_ENV_VARS;
var KEY_VALUE_STORE_KEYS = {
  INPUT: "INPUT",
  OUTPUT: "OUTPUT"
};
var MAX_PAYLOAD_SIZE_BYTES = 9437184;
var ACTOR_CATEGORIES = {
  AI: "AI",
  AGENTS: "Agents",
  AUTOMATION: "Automation",
  BUSINESS: "Business",
  COVID_19: "Covid-19",
  DEVELOPER_EXAMPLES: "Developer examples",
  DEVELOPER_TOOLS: "Developer tools",
  ECOMMERCE: "E-commerce",
  FOR_CREATORS: "For creators",
  GAMES: "Games",
  JOBS: "Jobs",
  LEAD_GENERATION: "Lead generation",
  MARKETING: "Marketing",
  NEWS: "News",
  SEO_TOOLS: "SEO tools",
  SOCIAL_MEDIA: "Social media",
  TRAVEL: "Travel",
  VIDEOS: "Videos",
  REAL_ESTATE: "Real estate",
  SPORTS: "Sports",
  EDUCATION: "Education",
  INTEGRATIONS: "Integrations",
  OTHER: "Other",
  OPEN_SOURCE: "Open source",
  MCP_SERVERS: "MCP servers"
};
var ALL_ACTOR_CATEGORIES = {
  ...ACTOR_CATEGORIES
  // ...LEGACY_ACTOR_CATEGORIES,
};
var VERSION_INT_MAJOR_BASE = 1e7;
var VERSION_INT_MINOR_BASE = 1e5;
var USER_BASIC_TEXT_XSS_OPTIONS = {
  whiteList: {
    a: ["href", "title", "target"],
    code: [],
    strong: [],
    b: [],
    br: [],
    ul: [],
    li: [],
    ol: [],
    i: [],
    u: [],
    p: []
  }
};
var WEBHOOK_EVENT_TYPES = {
  ACTOR_RUN_CREATED: "ACTOR.RUN.CREATED",
  ACTOR_RUN_SUCCEEDED: "ACTOR.RUN.SUCCEEDED",
  ACTOR_RUN_FAILED: "ACTOR.RUN.FAILED",
  ACTOR_RUN_TIMED_OUT: "ACTOR.RUN.TIMED_OUT",
  ACTOR_RUN_ABORTED: "ACTOR.RUN.ABORTED",
  ACTOR_RUN_RESURRECTED: "ACTOR.RUN.RESURRECTED",
  ACTOR_BUILD_CREATED: "ACTOR.BUILD.CREATED",
  ACTOR_BUILD_SUCCEEDED: "ACTOR.BUILD.SUCCEEDED",
  ACTOR_BUILD_FAILED: "ACTOR.BUILD.FAILED",
  ACTOR_BUILD_TIMED_OUT: "ACTOR.BUILD.TIMED_OUT",
  ACTOR_BUILD_ABORTED: "ACTOR.BUILD.ABORTED",
  TEST: "TEST"
};
var WEBHOOK_EVENT_TYPE_GROUPS = {
  ACTOR_RUN: [
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_CREATED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_SUCCEEDED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_FAILED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_TIMED_OUT,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_ABORTED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_RESURRECTED
  ],
  ACTOR_BUILD: [
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_CREATED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_SUCCEEDED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_FAILED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_TIMED_OUT,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_ABORTED
  ],
  // If one of these occurs then we can be sure that none other can occur for the same triggerer.
  ACTOR_RUN_TERMINAL: [
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_SUCCEEDED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_FAILED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_TIMED_OUT,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_ABORTED
  ],
  ACTOR_BUILD_TERMINAL: [
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_SUCCEEDED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_FAILED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_TIMED_OUT,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_ABORTED
  ]
};
var WEBHOOK_DEFAULT_PAYLOAD_TEMPLATE = `{
    "userId": {{userId}},
    "createdAt": {{createdAt}},
    "eventType": {{eventType}},
    "eventData": {{eventData}},
    "resource": {{resource}}
}`;
var WEBHOOK_ALLOWED_PAYLOAD_VARIABLES = /* @__PURE__ */ new Set([
  "userId",
  "createdAt",
  "eventType",
  "eventData",
  "resource"
]);
var MAX_MULTIFILE_BYTES = 3 * 1024 ** 2;
var SOURCE_FILE_FORMATS = {
  TEXT: "TEXT",
  BASE64: "BASE64"
};
var PROJECT_STATUSES = {
  REQUEST: "REQUEST",
  SPECIFICATION: "SPECIFICATION",
  OFFERS: "OFFERS",
  DEPOSIT: "DEPOSIT",
  DEPOSIT_PAID: "DEPOSIT_PAID",
  NEW: "NEW",
  IN_PROGRESS: "IN_PROGRESS",
  QA: "QA",
  CUSTOMER_QA: "CUSTOMER_QA",
  READY_FOR_INVOICE: "READY_FOR_INVOICE",
  INVOICED: "INVOICED",
  PAID: "PAID",
  DELIVERED: "DELIVERED",
  CLOSED: "CLOSED",
  FINISHED: "FINISHED"
};
var FINISHED_PROJECT_STATUSES = [
  PROJECT_STATUSES.READY_FOR_INVOICE,
  PROJECT_STATUSES.INVOICED,
  PROJECT_STATUSES.PAID,
  PROJECT_STATUSES.DELIVERED,
  PROJECT_STATUSES.FINISHED
];
var MARKETPLACE_USER_ROLES = {
  DEVELOPER: "DEVELOPER",
  DATA_EXPERT: "DATA_EXPERT",
  CUSTOMER: "CUSTOMER"
};
var USER_PERSONA_TYPES = {
  DEVELOPER: "DEVELOPER",
  USER: "USER"
};
var GIT_MAIN_BRANCH = "main";
var REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION = 25;
var ISSUES_STATUS_TYPES = {
  OPEN: "OPEN",
  CLOSED: "CLOSED"
};
var ISSUES_STATUS_ALL = "ALL";
var STORAGE_GENERAL_ACCESS = {
  /** Respect the user setting of the storage owner (default behavior). */
  FOLLOW_USER_SETTING: "FOLLOW_USER_SETTING",
  /** Only signed-in users with explicit access can read this storage. */
  RESTRICTED: "RESTRICTED",
  /** Anyone with a link, or the unique storage ID, can read the storage. */
  ANYONE_WITH_ID_CAN_READ: "ANYONE_WITH_ID_CAN_READ",
  /** Anyone with a link, the unique storage ID, or the storage name, can read the storage. */
  ANYONE_WITH_NAME_CAN_READ: "ANYONE_WITH_NAME_CAN_READ"
};
var RUN_GENERAL_ACCESS = {
  /** Respect the user setting of the run owner (default behavior). */
  FOLLOW_USER_SETTING: "FOLLOW_USER_SETTING",
  /** Only signed-in users with explicit access can read this run. */
  RESTRICTED: "RESTRICTED",
  /** Anyone with a link, or the unique run ID, can read the run. */
  ANYONE_WITH_ID_CAN_READ: "ANYONE_WITH_ID_CAN_READ"
};
var ACTOR_PERMISSION_LEVEL = {
  /** Full permission Actors have access to all user data in the account. */
  FULL_PERMISSIONS: "FULL_PERMISSIONS",
  /**
   * Limited permission Actors have access only to specific resources:
   * - default storages
   * - storages provided via input
   * - the current run
   * - ...
   *
   * Broadly speaking, limited permission Actors cannot access any account data not related to the current run.
   * For details refer to the Apify documentation.
   */
  LIMITED_PERMISSIONS: "LIMITED_PERMISSIONS"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (0);
//# sourceMappingURL=index.cjs.map

/***/ }),

/***/ 8180:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {


var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  IS_APIFY_LOGGER_EXCEPTION: () => IS_APIFY_LOGGER_EXCEPTION,
  LEVELS: () => LEVELS,
  LEVEL_TO_STRING: () => LEVEL_TO_STRING,
  Log: () => Log,
  LogFormat: () => LogFormat,
  LogLevel: () => LogLevel,
  Logger: () => Logger,
  LoggerJson: () => LoggerJson,
  LoggerText: () => LoggerText,
  PREFIX_DELIMITER: () => PREFIX_DELIMITER,
  default: () => index_default,
  getFormatFromEnv: () => getFormatFromEnv,
  getLevelFromEnv: () => getLevelFromEnv,
  limitDepth: () => limitDepth,
  truncate: () => truncate
});
module.exports = __toCommonJS(index_exports);

// src/log_consts.ts
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["OFF"] = 0] = "OFF";
  LogLevel2[LogLevel2["ERROR"] = 1] = "ERROR";
  LogLevel2[LogLevel2["SOFT_FAIL"] = 2] = "SOFT_FAIL";
  LogLevel2[LogLevel2["WARNING"] = 3] = "WARNING";
  LogLevel2[LogLevel2["INFO"] = 4] = "INFO";
  LogLevel2[LogLevel2["DEBUG"] = 5] = "DEBUG";
  LogLevel2[LogLevel2["PERF"] = 6] = "PERF";
  return LogLevel2;
})(LogLevel || {});
var LogFormat = /* @__PURE__ */ ((LogFormat2) => {
  LogFormat2["JSON"] = "JSON";
  LogFormat2["TEXT"] = "TEXT";
  return LogFormat2;
})(LogFormat || {});
var PREFIX_DELIMITER = ":";
var LEVELS = LogLevel;
var LEVEL_TO_STRING = Object.keys(LogLevel).filter((x) => Number.isNaN(+x));
var IS_APIFY_LOGGER_EXCEPTION = Symbol("apify.processed_error");

// src/log_helpers.ts
var import_consts = __nccwpck_require__(9582);
function truncate(str, maxLength, suffix = "...[truncated]") {
  maxLength = Math.floor(maxLength);
  if (suffix.length > maxLength) {
    throw new Error("suffix string cannot be longer than maxLength");
  }
  if (typeof str === "string" && str.length > maxLength) {
    str = str.substr(0, maxLength - suffix.length) + suffix;
  }
  return str;
}
__name(truncate, "truncate");
function getLevelFromEnv() {
  const envVar = process.env[import_consts.APIFY_ENV_VARS.LOG_LEVEL];
  if (!envVar) return 4 /* INFO */;
  if (Number.isFinite(+envVar)) return +envVar;
  if (LogLevel[envVar]) return LogLevel[envVar];
  return +envVar;
}
__name(getLevelFromEnv, "getLevelFromEnv");
function getFormatFromEnv() {
  const envVar = process.env[import_consts.APIFY_ENV_VARS.LOG_FORMAT] || "TEXT" /* TEXT */;
  switch (envVar.toLowerCase()) {
    case "JSON" /* JSON */.toLowerCase():
      return "JSON" /* JSON */;
    case "TEXT" /* TEXT */.toLowerCase():
      return "TEXT" /* TEXT */;
    default:
      console.warn(`Unknown value for environment variable ${import_consts.APIFY_ENV_VARS.LOG_FORMAT}: ${envVar}`);
      return "TEXT" /* TEXT */;
  }
}
__name(getFormatFromEnv, "getFormatFromEnv");
function limitDepth(record, depth, maxStringLength) {
  if (typeof record === "string") {
    return maxStringLength && record.length > maxStringLength ? truncate(record, maxStringLength) : record;
  }
  if (["number", "boolean", "symbol", "bigint"].includes(typeof record) || record == null || record instanceof Date) {
    return record;
  }
  if (record instanceof Error) {
    const { name, message, stack, cause, ...rest } = record;
    record = { name, message, stack, cause, ...rest, [IS_APIFY_LOGGER_EXCEPTION]: true };
  }
  const nextCall = /* @__PURE__ */ __name((rec) => limitDepth(rec, depth - 1, maxStringLength), "nextCall");
  if (Array.isArray(record)) {
    return depth ? record.map(nextCall) : "[array]";
  }
  if (typeof record === "object" && record !== null) {
    const mapObject = /* @__PURE__ */ __name((obj) => {
      const res = {};
      Reflect.ownKeys(obj).forEach((key) => {
        res[key] = nextCall(obj[key]);
      });
      return res;
    }, "mapObject");
    return depth ? mapObject(record) : "[object]";
  }
  if (typeof record === "function") {
    return "[function]";
  }
  console.log(`WARNING: Object cannot be logged: ${record}`);
  return void 0;
}
__name(limitDepth, "limitDepth");

// src/logger.ts
var import_node_events = __nccwpck_require__(4434);
var _Logger = class _Logger extends import_node_events.EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }
  setOptions(options) {
    this.options = { ...this.options, ...options };
  }
  getOptions() {
    return this.options;
  }
  _outputWithConsole(level, line) {
    switch (level) {
      case 1 /* ERROR */:
        console.error(line);
        break;
      case 3 /* WARNING */:
        console.warn(line);
        break;
      case 5 /* DEBUG */:
        console.debug(line);
        break;
      default:
        console.log(line);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _log(level, message, data, exception, opts = {}) {
    throw new Error("log() method must be implemented!");
  }
  log(level, message, ...args) {
    const line = this._log(level, message, ...args);
    this.emit("line", line);
  }
};
__name(_Logger, "Logger");
var Logger = _Logger;

// src/logger_json.ts
var DEFAULT_OPTIONS = {
  skipLevelInfo: false,
  skipTime: false
};
var _LoggerJson = class _LoggerJson extends Logger {
  constructor(options = {}) {
    super({ ...DEFAULT_OPTIONS, ...options });
  }
  _log(level, message, data, exception, opts = {}) {
    const { prefix, suffix } = opts;
    if (exception) data = { ...data, exception };
    if (prefix) message = `${prefix}${PREFIX_DELIMITER} ${message}`;
    if (suffix) message = `${message} ${suffix}`;
    const rec = {
      time: !this.options.skipTime ? /* @__PURE__ */ new Date() : void 0,
      level: this.options.skipLevelInfo && level === 4 /* INFO */ ? void 0 : LogLevel[level],
      msg: message,
      ...data
    };
    const line = JSON.stringify(rec);
    this._outputWithConsole(level, line);
    return line;
  }
};
__name(_LoggerJson, "LoggerJson");
var LoggerJson = _LoggerJson;

// src/logger_text.ts
var import_ansi_colors2 = __toESM(__nccwpck_require__(7182));

// src/node_internals.ts
var import_ansi_colors = __toESM(__nccwpck_require__(7182));
function identicalSequenceRange(a, b) {
  for (let i = 0; i < a.length - 3; i++) {
    const pos = b.indexOf(a[i]);
    if (pos !== -1) {
      const rest = b.length - pos;
      if (rest > 3) {
        let len = 1;
        const maxLen = Math.min(a.length - i, rest);
        while (maxLen > len && a[i + len] === b[pos + len]) {
          len++;
        }
        if (len > 3) {
          return { len, offset: i };
        }
      }
    }
  }
  return { len: 0, offset: 0 };
}
__name(identicalSequenceRange, "identicalSequenceRange");
function getStackString(error) {
  return error.stack ? String(error.stack) : Error.prototype.toString.call(error);
}
__name(getStackString, "getStackString");
function getStackFrames(err, stack) {
  const frames = stack.split("\n");
  let cause;
  try {
    ({ cause } = err);
  } catch {
  }
  if (cause != null && typeof cause === "object" && IS_APIFY_LOGGER_EXCEPTION in cause) {
    const causeStack = getStackString(cause);
    const causeStackStart = causeStack.indexOf("\n    at");
    if (causeStackStart !== -1) {
      const causeFrames = causeStack.slice(causeStackStart + 1).split("\n");
      const { len, offset } = identicalSequenceRange(frames, causeFrames);
      if (len > 0) {
        const skipped = len - 2;
        const msg = `    ... ${skipped} lines matching cause stack trace ...`;
        frames.splice(offset + 1, skipped, import_ansi_colors.default.grey(msg));
      }
    }
  }
  return frames;
}
__name(getStackFrames, "getStackFrames");

// src/logger_text.ts
var SHORTEN_LEVELS = {
  SOFT_FAIL: "SFAIL",
  WARNING: "WARN"
};
var LEVEL_TO_COLOR = {
  [1 /* ERROR */]: "red",
  [2 /* SOFT_FAIL */]: "red",
  [3 /* WARNING */]: "yellow",
  [4 /* INFO */]: "green",
  [5 /* DEBUG */]: "blue",
  [6 /* PERF */]: "magenta"
};
var SHORTENED_LOG_LEVELS = LEVEL_TO_STRING.map((level) => SHORTEN_LEVELS[level] || level);
var MAX_LEVEL_LENGTH_SPACES = Math.max(...SHORTENED_LOG_LEVELS.map((l) => l.length));
var getLevelIndent = /* @__PURE__ */ __name((level) => {
  let spaces = "";
  for (let i = 0; i < MAX_LEVEL_LENGTH_SPACES - level.length; i++) spaces += " ";
  return spaces;
}, "getLevelIndent");
var DEFAULT_OPTIONS2 = {
  skipTime: true
};
var _LoggerText = class _LoggerText extends Logger {
  constructor(options = {}) {
    super({ ...DEFAULT_OPTIONS2, ...options });
  }
  _log(level, message, data, exception, opts = {}) {
    let { prefix, suffix } = opts;
    let maybeDate = "";
    if (!this.options.skipTime) {
      maybeDate = `${(/* @__PURE__ */ new Date()).toISOString().replace("Z", "").replace("T", " ")} `;
    }
    const errStack = exception ? this._parseException(exception) : "";
    const color = LEVEL_TO_COLOR[level];
    const levelStr = SHORTENED_LOG_LEVELS[level];
    const levelIndent = getLevelIndent(levelStr);
    const dataStr = !data ? "" : ` ${JSON.stringify(data)}`;
    prefix = prefix ? ` ${prefix}${PREFIX_DELIMITER}` : "";
    suffix = suffix ? ` ${suffix}` : "";
    const line = `${import_ansi_colors2.default.gray(maybeDate)}${import_ansi_colors2.default[color](levelStr)}${levelIndent}${import_ansi_colors2.default.yellow(prefix)} ${message || ""}${import_ansi_colors2.default.gray(dataStr)}${import_ansi_colors2.default.yellow(suffix)}${errStack}`;
    this._outputWithConsole(level, line);
    return line;
  }
  _parseException(exception, indentLevel = 1) {
    if (["string", "boolean", "number", "undefined", "bigint"].includes(typeof exception)) {
      return `
${exception}`;
    }
    if (exception === null) {
      return "\nnull";
    }
    if (typeof exception === "symbol") {
      return `
${exception.toString()}`;
    }
    if (typeof exception === "object" && IS_APIFY_LOGGER_EXCEPTION in exception) {
      return this._parseLoggerException(exception, indentLevel);
    }
    return `
${JSON.stringify(exception, null, 2)}`;
  }
  _parseLoggerException(exception, indentLevel = 1) {
    const errDetails = [];
    if (exception.type) {
      errDetails.push(`type=${exception.type}`);
    }
    if (exception.details) {
      Object.entries(exception.details).map(([key, val]) => errDetails.push(`${key}=${val}`));
    }
    const errorString = exception.stack || exception.reason || exception.message;
    const isStack = errorString === exception.stack;
    const errorLines = getStackFrames(exception, errorString);
    if (isStack) {
      errorLines[0] = exception.message || errorLines[0];
    }
    if (errDetails.length) {
      errorLines[0] += import_ansi_colors2.default.gray(`(details: ${errDetails.join(", ")})`);
    }
    for (let i = 1; i < errorLines.length; i++) {
      errorLines[i] = import_ansi_colors2.default.gray(errorLines[i]);
    }
    if (exception.cause) {
      const causeString = this._parseException(exception.cause, indentLevel + 1);
      const causeLines = causeString.trim().split("\n");
      errorLines.push(import_ansi_colors2.default.red(`  CAUSE: ${import_ansi_colors2.default.reset(causeLines[0])}`), ...causeLines.slice(1));
    }
    return `
${errorLines.map((line) => `${" ".repeat(indentLevel * 2)}${line}`).join("\n")}`;
  }
};
__name(_LoggerText, "LoggerText");
var LoggerText = _LoggerText;

// src/log.ts
var getLoggerForFormat = /* @__PURE__ */ __name((format) => {
  switch (format) {
    case "JSON" /* JSON */:
      return new LoggerJson();
    case "TEXT" /* TEXT */:
    default:
      return new LoggerText();
  }
}, "getLoggerForFormat");
var getDefaultOptions = /* @__PURE__ */ __name(() => ({
  level: getLevelFromEnv(),
  maxDepth: 4,
  maxStringLength: 2e3,
  prefix: null,
  suffix: null,
  logger: getLoggerForFormat(getFormatFromEnv()),
  data: {}
}), "getDefaultOptions");
var _Log = class _Log {
  constructor(options = {}) {
    /**
     * Map of available log levels that's useful for easy setting of appropriate log levels.
     * Each log level is represented internally by a number. Eg. `log.LEVELS.DEBUG === 5`.
     */
    __publicField(this, "LEVELS", LogLevel);
    // for BC
    __publicField(this, "options");
    __publicField(this, "warningsOnceLogged", /* @__PURE__ */ new Set());
    this.options = { ...getDefaultOptions(), ...options };
    if (!LogLevel[this.options.level]) throw new Error('Options "level" must be one of log.LEVELS enum!');
    if (typeof this.options.maxDepth !== "number") throw new Error('Options "maxDepth" must be a number!');
    if (typeof this.options.maxStringLength !== "number") throw new Error('Options "maxStringLength" must be a number!');
    if (this.options.prefix && typeof this.options.prefix !== "string") throw new Error('Options "prefix" must be a string!');
    if (this.options.suffix && typeof this.options.suffix !== "string") throw new Error('Options "suffix" must be a string!');
    if (typeof this.options.logger !== "object") throw new Error('Options "logger" must be an object!');
    if (typeof this.options.data !== "object") throw new Error('Options "data" must be an object!');
  }
  _limitDepth(obj) {
    return limitDepth(obj, this.options.maxDepth);
  }
  /**
   * Returns the currently selected logging level. This is useful for checking whether a message
   * will actually be printed to the console before one actually performs a resource intensive operation
   * to construct the message, such as querying a DB for some metadata that need to be added. If the log
   * level is not high enough at the moment, it doesn't make sense to execute the query.
   */
  getLevel() {
    return this.options.level;
  }
  /**
   * Sets the log level to the given value, preventing messages from less important log levels
   * from being printed to the console. Use in conjunction with the `log.LEVELS` constants such as
   *
   * ```
   * log.setLevel(log.LEVELS.DEBUG);
   * ```
   *
   * Default log level is INFO.
   */
  setLevel(level) {
    if (!LogLevel[level]) throw new Error('Options "level" must be one of log.LEVELS enum!');
    this.options.level = level;
  }
  internal(level, message, data, exception) {
    if (level > this.options.level) return;
    data = { ...this.options.data, ...data };
    data = Reflect.ownKeys(data).length > 0 ? this._limitDepth(data) : void 0;
    exception = this._limitDepth(exception);
    this.options.logger.log(level, message, data, exception, {
      prefix: this.options.prefix,
      suffix: this.options.suffix
    });
  }
  /**
   * Configures logger.
   */
  setOptions(options) {
    this.options = { ...this.options, ...options };
  }
  /**
   * Returns the logger configuration.
   */
  getOptions() {
    return { ...this.options };
  }
  /**
   * Creates a new instance of logger that inherits settings from a parent logger.
   */
  child(options) {
    let { prefix } = this.options;
    if (options.prefix) {
      prefix = prefix ? `${prefix}${PREFIX_DELIMITER}${options.prefix}` : options.prefix;
    }
    const data = options.data ? { ...this.options.data, ...options.data } : this.options.data;
    const newOptions = {
      ...this.options,
      ...options,
      prefix,
      data
    };
    return new _Log(newOptions);
  }
  /**
   * Logs an `ERROR` message. Use this method to log error messages that are not directly connected
   * to an exception. For logging exceptions, use the `log.exception` method.
   */
  error(message, data) {
    this.internal(1 /* ERROR */, message, data);
  }
  /**
   * Logs an `ERROR` level message with a nicely formatted exception. Note that the exception is the first parameter
   * here and an additional message is only optional.
   */
  exception(exception, message, data) {
    this.internal(1 /* ERROR */, message, data, exception);
  }
  softFail(message, data) {
    this.internal(2 /* SOFT_FAIL */, message, data);
  }
  /**
   * Logs a `WARNING` level message. Data are stringified and appended to the message.
   */
  warning(message, data) {
    this.internal(3 /* WARNING */, message, data);
  }
  /**
   * Logs an `INFO` message. `INFO` is the default log level so info messages will be always logged,
   * unless the log level is changed. Data are stringified and appended to the message.
   */
  info(message, data) {
    this.internal(4 /* INFO */, message, data);
  }
  /**
   * Logs a `DEBUG` message. By default, it will not be written to the console. To see `DEBUG`
   * messages in the console, set the log level to `DEBUG` either using the `log.setLevel(log.LEVELS.DEBUG)`
   * method or using the environment variable `APIFY_LOG_LEVEL=DEBUG`. Data are stringified and appended
   * to the message.
   */
  debug(message, data) {
    this.internal(5 /* DEBUG */, message, data);
  }
  perf(message, data) {
    this.internal(6 /* PERF */, message, data);
  }
  /**
   * Logs a `WARNING` level message only once.
   */
  warningOnce(message) {
    if (this.warningsOnceLogged.has(message)) return;
    this.warningsOnceLogged.add(message);
    this.warning(message);
  }
  /**
   * Logs given message only once as WARNING. It's used to warn user that some feature he is using has been deprecated.
   */
  deprecated(message) {
    this.warningOnce(message);
  }
};
__name(_Log, "Log");
var Log = _Log;

// src/index.ts
var log = new Log();
var index_default = log;
// Annotate the CommonJS export names for ESM import in node:
0 && (0);
//# sourceMappingURL=index.cjs.map

/***/ }),

/***/ 7269:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

// Axios v1.6.8 Copyright (c) 2024 Matt Zabriskie and contributors


const FormData$1 = __nccwpck_require__(6454);
const url = __nccwpck_require__(7016);
const proxyFromEnv = __nccwpck_require__(7777);
const http = __nccwpck_require__(8611);
const https = __nccwpck_require__(5692);
const util = __nccwpck_require__(9023);
const followRedirects = __nccwpck_require__(1573);
const zlib = __nccwpck_require__(3106);
const stream = __nccwpck_require__(2203);
const events = __nccwpck_require__(4434);

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

const FormData__default = /*#__PURE__*/_interopDefaultLegacy(FormData$1);
const url__default = /*#__PURE__*/_interopDefaultLegacy(url);
const http__default = /*#__PURE__*/_interopDefaultLegacy(http);
const https__default = /*#__PURE__*/_interopDefaultLegacy(https);
const util__default = /*#__PURE__*/_interopDefaultLegacy(util);
const followRedirects__default = /*#__PURE__*/_interopDefaultLegacy(followRedirects);
const zlib__default = /*#__PURE__*/_interopDefaultLegacy(zlib);
const stream__default = /*#__PURE__*/_interopDefaultLegacy(stream);

function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}

// utils is a library of generic helper functions non-specific to axios

const {toString} = Object.prototype;
const {getPrototypeOf} = Object;

const kindOf = (cache => thing => {
    const str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(Object.create(null));

const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type
};

const typeOfTest = type => thing => typeof thing === type;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 *
 * @returns {boolean} True if value is an Array, otherwise false
 */
const {isArray} = Array;

/**
 * Determine if a value is undefined
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if the value is undefined, otherwise false
 */
const isUndefined = typeOfTest('undefined');

/**
 * Determine if a value is a Buffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
const isArrayBuffer = kindOfTest('ArrayBuffer');


/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  let result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (isArrayBuffer(val.buffer));
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a String, otherwise false
 */
const isString = typeOfTest('string');

/**
 * Determine if a value is a Function
 *
 * @param {*} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
const isFunction = typeOfTest('function');

/**
 * Determine if a value is a Number
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Number, otherwise false
 */
const isNumber = typeOfTest('number');

/**
 * Determine if a value is an Object
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an Object, otherwise false
 */
const isObject = (thing) => thing !== null && typeof thing === 'object';

/**
 * Determine if a value is a Boolean
 *
 * @param {*} thing The value to test
 * @returns {boolean} True if value is a Boolean, otherwise false
 */
const isBoolean = thing => thing === true || thing === false;

/**
 * Determine if a value is a plain Object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a plain Object, otherwise false
 */
const isPlainObject = (val) => {
  if (kindOf(val) !== 'object') {
    return false;
  }

  const prototype = getPrototypeOf(val);
  return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};

/**
 * Determine if a value is a Date
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Date, otherwise false
 */
const isDate = kindOfTest('Date');

/**
 * Determine if a value is a File
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFile = kindOfTest('File');

/**
 * Determine if a value is a Blob
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Blob, otherwise false
 */
const isBlob = kindOfTest('Blob');

/**
 * Determine if a value is a FileList
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a File, otherwise false
 */
const isFileList = kindOfTest('FileList');

/**
 * Determine if a value is a Stream
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a Stream, otherwise false
 */
const isStream = (val) => isObject(val) && isFunction(val.pipe);

/**
 * Determine if a value is a FormData
 *
 * @param {*} thing The value to test
 *
 * @returns {boolean} True if value is an FormData, otherwise false
 */
const isFormData = (thing) => {
  let kind;
  return thing && (
    (typeof FormData === 'function' && thing instanceof FormData) || (
      isFunction(thing.append) && (
        (kind = kindOf(thing)) === 'formdata' ||
        // detect form-data instance
        (kind === 'object' && isFunction(thing.toString) && thing.toString() === '[object FormData]')
      )
    )
  )
};

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
const isURLSearchParams = kindOfTest('URLSearchParams');

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 *
 * @returns {String} The String freed of excess whitespace
 */
const trim = (str) => str.trim ?
  str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 *
 * @param {Boolean} [allOwnKeys = false]
 * @returns {any}
 */
function forEach(obj, fn, {allOwnKeys = false} = {}) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  let i;
  let l;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;

    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}

function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}

const _global = (() => {
  /*eslint no-undef:0*/
  if (typeof globalThis !== "undefined") return globalThis;
  return typeof self !== "undefined" ? self : (typeof window !== 'undefined' ? window : global)
})();

const isContextDefined = (context) => !isUndefined(context) && context !== _global;

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 *
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  const {caseless} = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject(result[targetKey]) && isPlainObject(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };

  for (let i = 0, l = arguments.length; i < l; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 *
 * @param {Boolean} [allOwnKeys]
 * @returns {Object} The resulting value of object a
 */
const extend = (a, b, thisArg, {allOwnKeys}= {}) => {
  forEach(b, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, {allOwnKeys});
  return a;
};

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 *
 * @returns {string} content value without BOM
 */
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
};

/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 *
 * @returns {void}
 */
const inherits = (constructor, superConstructor, props, descriptors) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, 'super', {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};

/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function|Boolean} [filter]
 * @param {Function} [propFilter]
 *
 * @returns {Object}
 */
const toFlatObject = (sourceObj, destObj, filter, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};

  destObj = destObj || {};
  // eslint-disable-next-line no-eq-null,eqeqeq
  if (sourceObj == null) return destObj;

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
};

/**
 * Determines whether a string ends with the characters of a specified string
 *
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 *
 * @returns {boolean}
 */
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === undefined || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};


/**
 * Returns new array from array like object or null if failed
 *
 * @param {*} [thing]
 *
 * @returns {?Array}
 */
const toArray = (thing) => {
  if (!thing) return null;
  if (isArray(thing)) return thing;
  let i = thing.length;
  if (!isNumber(i)) return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};

/**
 * Checking if the Uint8Array exists and if it does, it returns a function that checks if the
 * thing passed in is an instance of Uint8Array
 *
 * @param {TypedArray}
 *
 * @returns {Array}
 */
// eslint-disable-next-line func-names
const isTypedArray = (TypedArray => {
  // eslint-disable-next-line func-names
  return thing => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== 'undefined' && getPrototypeOf(Uint8Array));

/**
 * For each entry in the object, call the function with the key and value.
 *
 * @param {Object<any, any>} obj - The object to iterate over.
 * @param {Function} fn - The function to call for each entry.
 *
 * @returns {void}
 */
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];

  const iterator = generator.call(obj);

  let result;

  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};

/**
 * It takes a regular expression and a string, and returns an array of all the matches
 *
 * @param {string} regExp - The regular expression to match against.
 * @param {string} str - The string to search.
 *
 * @returns {Array<boolean>}
 */
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];

  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }

  return arr;
};

/* Checking if the kindOfTest function returns true when passed an HTMLFormElement. */
const isHTMLForm = kindOfTest('HTMLFormElement');

const toCamelCase = str => {
  return str.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g,
    function replacer(m, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};

/* Creating a function that will check if an object has a property. */
const hasOwnProperty = (({hasOwnProperty}) => (obj, prop) => hasOwnProperty.call(obj, prop))(Object.prototype);

/**
 * Determine if a value is a RegExp object
 *
 * @param {*} val The value to test
 *
 * @returns {boolean} True if value is a RegExp object, otherwise false
 */
const isRegExp = kindOfTest('RegExp');

const reduceDescriptors = (obj, reducer) => {
  const descriptors = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};

  forEach(descriptors, (descriptor, name) => {
    let ret;
    if ((ret = reducer(descriptor, name, obj)) !== false) {
      reducedDescriptors[name] = ret || descriptor;
    }
  });

  Object.defineProperties(obj, reducedDescriptors);
};

/**
 * Makes all methods read-only
 * @param {Object} obj
 */

const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    // skip restricted props in strict mode
    if (isFunction(obj) && ['arguments', 'caller', 'callee'].indexOf(name) !== -1) {
      return false;
    }

    const value = obj[name];

    if (!isFunction(value)) return;

    descriptor.enumerable = false;

    if ('writable' in descriptor) {
      descriptor.writable = false;
      return;
    }

    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error('Can not rewrite read-only method \'' + name + '\'');
      };
    }
  });
};

const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};

  const define = (arr) => {
    arr.forEach(value => {
      obj[value] = true;
    });
  };

  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));

  return obj;
};

const noop = () => {};

const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};

const ALPHA = 'abcdefghijklmnopqrstuvwxyz';

const DIGIT = '0123456789';

const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};

const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = '';
  const {length} = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length|0];
  }

  return str;
};

/**
 * If the thing is a FormData object, return true, otherwise return false.
 *
 * @param {unknown} thing - The thing to check.
 *
 * @returns {boolean}
 */
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === 'FormData' && thing[Symbol.iterator]);
}

const toJSONObject = (obj) => {
  const stack = new Array(10);

  const visit = (source, i) => {

    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }

      if(!('toJSON' in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};

        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });

        stack[i] = undefined;

        return target;
      }
    }

    return source;
  };

  return visit(obj, 0);
};

const isAsyncFn = kindOfTest('AsyncFunction');

const isThenable = (thing) =>
  thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);

const utils$1 = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty, // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 *
 * @returns {Error} The created error.
 */
function AxiosError(message, code, config, request, response) {
  Error.call(this);

  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = (new Error()).stack;
  }

  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils$1.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils$1.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});

const prototype$1 = AxiosError.prototype;
const descriptors = {};

[
  'ERR_BAD_OPTION_VALUE',
  'ERR_BAD_OPTION',
  'ECONNABORTED',
  'ETIMEDOUT',
  'ERR_NETWORK',
  'ERR_FR_TOO_MANY_REDIRECTS',
  'ERR_DEPRECATED',
  'ERR_BAD_RESPONSE',
  'ERR_BAD_REQUEST',
  'ERR_CANCELED',
  'ERR_NOT_SUPPORT',
  'ERR_INVALID_URL'
// eslint-disable-next-line func-names
].forEach(code => {
  descriptors[code] = {value: code};
});

Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, 'isAxiosError', {value: true});

// eslint-disable-next-line func-names
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);

  utils$1.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  }, prop => {
    return prop !== 'isAxiosError';
  });

  AxiosError.call(axiosError, error.message, code, config, request, response);

  axiosError.cause = error;

  axiosError.name = error.name;

  customProps && Object.assign(axiosError, customProps);

  return axiosError;
};

/**
 * Determines if the given thing is a array or js object.
 *
 * @param {string} thing - The object or array to be visited.
 *
 * @returns {boolean}
 */
function isVisitable(thing) {
  return utils$1.isPlainObject(thing) || utils$1.isArray(thing);
}

/**
 * It removes the brackets from the end of a string
 *
 * @param {string} key - The key of the parameter.
 *
 * @returns {string} the key without the brackets.
 */
function removeBrackets(key) {
  return utils$1.endsWith(key, '[]') ? key.slice(0, -2) : key;
}

/**
 * It takes a path, a key, and a boolean, and returns a string
 *
 * @param {string} path - The path to the current key.
 * @param {string} key - The key of the current object being iterated over.
 * @param {string} dots - If true, the key will be rendered with dots instead of brackets.
 *
 * @returns {string} The path to the current key.
 */
function renderKey(path, key, dots) {
  if (!path) return key;
  return path.concat(key).map(function each(token, i) {
    // eslint-disable-next-line no-param-reassign
    token = removeBrackets(token);
    return !dots && i ? '[' + token + ']' : token;
  }).join(dots ? '.' : '');
}

/**
 * If the array is an array and none of its elements are visitable, then it's a flat array.
 *
 * @param {Array<any>} arr - The array to check
 *
 * @returns {boolean}
 */
function isFlatArray(arr) {
  return utils$1.isArray(arr) && !arr.some(isVisitable);
}

const predicates = utils$1.toFlatObject(utils$1, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});

/**
 * Convert a data object to FormData
 *
 * @param {Object} obj
 * @param {?Object} [formData]
 * @param {?Object} [options]
 * @param {Function} [options.visitor]
 * @param {Boolean} [options.metaTokens = true]
 * @param {Boolean} [options.dots = false]
 * @param {?Boolean} [options.indexes = false]
 *
 * @returns {Object}
 **/

/**
 * It converts an object into a FormData object
 *
 * @param {Object<any, any>} obj - The object to convert to form data.
 * @param {string} formData - The FormData object to append to.
 * @param {Object<string, any>} options
 *
 * @returns
 */
function toFormData(obj, formData, options) {
  if (!utils$1.isObject(obj)) {
    throw new TypeError('target must be an object');
  }

  // eslint-disable-next-line no-param-reassign
  formData = formData || new (FormData__default["default"] || FormData)();

  // eslint-disable-next-line no-param-reassign
  options = utils$1.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    // eslint-disable-next-line no-eq-null,eqeqeq
    return !utils$1.isUndefined(source[option]);
  });

  const metaTokens = options.metaTokens;
  // eslint-disable-next-line no-use-before-define
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== 'undefined' && Blob;
  const useBlob = _Blob && utils$1.isSpecCompliantForm(formData);

  if (!utils$1.isFunction(visitor)) {
    throw new TypeError('visitor must be a function');
  }

  function convertValue(value) {
    if (value === null) return '';

    if (utils$1.isDate(value)) {
      return value.toISOString();
    }

    if (!useBlob && utils$1.isBlob(value)) {
      throw new AxiosError('Blob is not supported. Use a Buffer instead.');
    }

    if (utils$1.isArrayBuffer(value) || utils$1.isTypedArray(value)) {
      return useBlob && typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  /**
   * Default visitor.
   *
   * @param {*} value
   * @param {String|Number} key
   * @param {Array<String|Number>} path
   * @this {FormData}
   *
   * @returns {boolean} return true to visit the each prop of the value recursively
   */
  function defaultVisitor(value, key, path) {
    let arr = value;

    if (value && !path && typeof value === 'object') {
      if (utils$1.endsWith(key, '{}')) {
        // eslint-disable-next-line no-param-reassign
        key = metaTokens ? key : key.slice(0, -2);
        // eslint-disable-next-line no-param-reassign
        value = JSON.stringify(value);
      } else if (
        (utils$1.isArray(value) && isFlatArray(value)) ||
        ((utils$1.isFileList(value) || utils$1.endsWith(key, '[]')) && (arr = utils$1.toArray(value))
        )) {
        // eslint-disable-next-line no-param-reassign
        key = removeBrackets(key);

        arr.forEach(function each(el, index) {
          !(utils$1.isUndefined(el) || el === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index, dots) : (indexes === null ? key : key + '[]'),
            convertValue(el)
          );
        });
        return false;
      }
    }

    if (isVisitable(value)) {
      return true;
    }

    formData.append(renderKey(path, key, dots), convertValue(value));

    return false;
  }

  const stack = [];

  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });

  function build(value, path) {
    if (utils$1.isUndefined(value)) return;

    if (stack.indexOf(value) !== -1) {
      throw Error('Circular reference detected in ' + path.join('.'));
    }

    stack.push(value);

    utils$1.forEach(value, function each(el, key) {
      const result = !(utils$1.isUndefined(el) || el === null) && visitor.call(
        formData, el, utils$1.isString(key) ? key.trim() : key, path, exposedHelpers
      );

      if (result === true) {
        build(el, path ? path.concat(key) : [key]);
      }
    });

    stack.pop();
  }

  if (!utils$1.isObject(obj)) {
    throw new TypeError('data must be an object');
  }

  build(obj);

  return formData;
}

/**
 * It encodes a string by replacing all characters that are not in the unreserved set with
 * their percent-encoded equivalents
 *
 * @param {string} str - The string to encode.
 *
 * @returns {string} The encoded string.
 */
function encode$1(str) {
  const charMap = {
    '!': '%21',
    "'": '%27',
    '(': '%28',
    ')': '%29',
    '~': '%7E',
    '%20': '+',
    '%00': '\x00'
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}

/**
 * It takes a params object and converts it to a FormData object
 *
 * @param {Object<string, any>} params - The parameters to be converted to a FormData object.
 * @param {Object<string, any>} options - The options object passed to the Axios constructor.
 *
 * @returns {void}
 */
function AxiosURLSearchParams(params, options) {
  this._pairs = [];

  params && toFormData(params, this, options);
}

const prototype = AxiosURLSearchParams.prototype;

prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};

prototype.toString = function toString(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;

  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + '=' + _encode(pair[1]);
  }, '').join('&');
};

/**
 * It replaces all instances of the characters `:`, `$`, `,`, `+`, `[`, and `]` with their
 * URI encoded counterparts
 *
 * @param {string} val The value to be encoded.
 *
 * @returns {string} The encoded value.
 */
function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @param {?object} options
 *
 * @returns {string} The formatted url
 */
function buildURL(url, params, options) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }
  
  const _encode = options && options.encode || encode;

  const serializeFn = options && options.serialize;

  let serializedParams;

  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils$1.isURLSearchParams(params) ?
      params.toString() :
      new AxiosURLSearchParams(params, options).toString(_encode);
  }

  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
}

class InterceptorManager {
  constructor() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  }

  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils$1.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  }
}

const InterceptorManager$1 = InterceptorManager;

const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

const URLSearchParams = url__default["default"].URLSearchParams;

const platform$1 = {
  isNode: true,
  classes: {
    URLSearchParams,
    FormData: FormData__default["default"],
    Blob: typeof Blob !== 'undefined' && Blob || null
  },
  protocols: [ 'http', 'https', 'file', 'data' ]
};

const hasBrowserEnv = typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 *
 * @returns {boolean}
 */
const hasStandardBrowserEnv = (
  (product) => {
    return hasBrowserEnv && ['ReactNative', 'NativeScript', 'NS'].indexOf(product) < 0
  })(typeof navigator !== 'undefined' && navigator.product);

/**
 * Determine if we're running in a standard browser webWorker environment
 *
 * Although the `isStandardBrowserEnv` method indicates that
 * `allows axios to run in a web worker`, the WebWorker will still be
 * filtered out due to its judgment standard
 * `typeof window !== 'undefined' && typeof document !== 'undefined'`.
 * This leads to a problem when axios post `FormData` in webWorker
 */
const hasStandardBrowserWebWorkerEnv = (() => {
  return (
    typeof WorkerGlobalScope !== 'undefined' &&
    // eslint-disable-next-line no-undef
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts === 'function'
  );
})();

const utils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  hasBrowserEnv: hasBrowserEnv,
  hasStandardBrowserWebWorkerEnv: hasStandardBrowserWebWorkerEnv,
  hasStandardBrowserEnv: hasStandardBrowserEnv
});

const platform = {
  ...utils,
  ...platform$1
};

function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils$1.isBuffer(value)) {
        this.append(key, value.toString('base64'));
        return false;
      }

      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}

/**
 * It takes a string like `foo[x][y][z]` and returns an array like `['foo', 'x', 'y', 'z']
 *
 * @param {string} name - The name of the property to get.
 *
 * @returns An array of strings.
 */
function parsePropPath(name) {
  // foo[x][y][z]
  // foo.x.y.z
  // foo-x-y-z
  // foo x y z
  return utils$1.matchAll(/\w+|\[(\w*)]/g, name).map(match => {
    return match[0] === '[]' ? '' : match[1] || match[0];
  });
}

/**
 * Convert an array to an object.
 *
 * @param {Array<any>} arr - The array to convert to an object.
 *
 * @returns An object with the same keys and values as the array.
 */
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}

/**
 * It takes a FormData object and returns a JavaScript object
 *
 * @param {string} formData The FormData object to convert to JSON.
 *
 * @returns {Object<string, any> | null} The converted object.
 */
function formDataToJSON(formData) {
  function buildPath(path, value, target, index) {
    let name = path[index++];

    if (name === '__proto__') return true;

    const isNumericKey = Number.isFinite(+name);
    const isLast = index >= path.length;
    name = !name && utils$1.isArray(target) ? target.length : name;

    if (isLast) {
      if (utils$1.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }

      return !isNumericKey;
    }

    if (!target[name] || !utils$1.isObject(target[name])) {
      target[name] = [];
    }

    const result = buildPath(path, value, target[name], index);

    if (result && utils$1.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }

    return !isNumericKey;
  }

  if (utils$1.isFormData(formData) && utils$1.isFunction(formData.entries)) {
    const obj = {};

    utils$1.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });

    return obj;
  }

  return null;
}

/**
 * It takes a string, tries to parse it, and if it fails, it returns the stringified version
 * of the input
 *
 * @param {any} rawValue - The value to be stringified.
 * @param {Function} parser - A function that parses a string into a JavaScript object.
 * @param {Function} encoder - A function that takes a value and returns a string.
 *
 * @returns {string} A stringified version of the rawValue.
 */
function stringifySafely(rawValue, parser, encoder) {
  if (utils$1.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils$1.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

const defaults = {

  transitional: transitionalDefaults,

  adapter: ['xhr', 'http'],

  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || '';
    const hasJSONContentType = contentType.indexOf('application/json') > -1;
    const isObjectPayload = utils$1.isObject(data);

    if (isObjectPayload && utils$1.isHTMLForm(data)) {
      data = new FormData(data);
    }

    const isFormData = utils$1.isFormData(data);

    if (isFormData) {
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }

    if (utils$1.isArrayBuffer(data) ||
      utils$1.isBuffer(data) ||
      utils$1.isStream(data) ||
      utils$1.isFile(data) ||
      utils$1.isBlob(data)
    ) {
      return data;
    }
    if (utils$1.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils$1.isURLSearchParams(data)) {
      headers.setContentType('application/x-www-form-urlencoded;charset=utf-8', false);
      return data.toString();
    }

    let isFileList;

    if (isObjectPayload) {
      if (contentType.indexOf('application/x-www-form-urlencoded') > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }

      if ((isFileList = utils$1.isFileList(data)) || contentType.indexOf('multipart/form-data') > -1) {
        const _FormData = this.env && this.env.FormData;

        return toFormData(
          isFileList ? {'files[]': data} : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }

    if (isObjectPayload || hasJSONContentType ) {
      headers.setContentType('application/json', false);
      return stringifySafely(data);
    }

    return data;
  }],

  transformResponse: [function transformResponse(data) {
    const transitional = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    const JSONRequested = this.responseType === 'json';

    if (data && utils$1.isString(data) && ((forcedJSONParsing && !this.responseType) || JSONRequested)) {
      const silentJSONParsing = transitional && transitional.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;

      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },

  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': undefined
    }
  }
};

utils$1.forEach(['delete', 'get', 'head', 'post', 'put', 'patch'], (method) => {
  defaults.headers[method] = {};
});

const defaults$1 = defaults;

// RawAxiosHeaders whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
const ignoreDuplicateOf = utils$1.toObjectSet([
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
]);

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} rawHeaders Headers needing to be parsed
 *
 * @returns {Object} Headers parsed into an object
 */
const parseHeaders = rawHeaders => {
  const parsed = {};
  let key;
  let val;
  let i;

  rawHeaders && rawHeaders.split('\n').forEach(function parser(line) {
    i = line.indexOf(':');
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();

    if (!key || (parsed[key] && ignoreDuplicateOf[key])) {
      return;
    }

    if (key === 'set-cookie') {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
    }
  });

  return parsed;
};

const $internals = Symbol('internals');

function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}

function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }

  return utils$1.isArray(value) ? value.map(normalizeValue) : String(value);
}

function parseTokens(str) {
  const tokens = Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;

  while ((match = tokensRE.exec(str))) {
    tokens[match[1]] = match[2];
  }

  return tokens;
}

const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());

function matchHeaderValue(context, value, header, filter, isHeaderNameFilter) {
  if (utils$1.isFunction(filter)) {
    return filter.call(this, value, header);
  }

  if (isHeaderNameFilter) {
    value = header;
  }

  if (!utils$1.isString(value)) return;

  if (utils$1.isString(filter)) {
    return value.indexOf(filter) !== -1;
  }

  if (utils$1.isRegExp(filter)) {
    return filter.test(value);
  }
}

function formatHeader(header) {
  return header.trim()
    .toLowerCase().replace(/([a-z\d])(\w*)/g, (w, char, str) => {
      return char.toUpperCase() + str;
    });
}

function buildAccessors(obj, header) {
  const accessorName = utils$1.toCamelCase(' ' + header);

  ['get', 'set', 'has'].forEach(methodName => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}

class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }

  set(header, valueOrRewrite, rewrite) {
    const self = this;

    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);

      if (!lHeader) {
        throw new Error('header name must be a non-empty string');
      }

      const key = utils$1.findKey(self, lHeader);

      if(!key || self[key] === undefined || _rewrite === true || (_rewrite === undefined && self[key] !== false)) {
        self[key || _header] = normalizeValue(_value);
      }
    }

    const setHeaders = (headers, _rewrite) =>
      utils$1.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));

    if (utils$1.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if(utils$1.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }

    return this;
  }

  get(header, parser) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      if (key) {
        const value = this[key];

        if (!parser) {
          return value;
        }

        if (parser === true) {
          return parseTokens(value);
        }

        if (utils$1.isFunction(parser)) {
          return parser.call(this, value, key);
        }

        if (utils$1.isRegExp(parser)) {
          return parser.exec(value);
        }

        throw new TypeError('parser must be boolean|regexp|function');
      }
    }
  }

  has(header, matcher) {
    header = normalizeHeader(header);

    if (header) {
      const key = utils$1.findKey(this, header);

      return !!(key && this[key] !== undefined && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }

    return false;
  }

  delete(header, matcher) {
    const self = this;
    let deleted = false;

    function deleteHeader(_header) {
      _header = normalizeHeader(_header);

      if (_header) {
        const key = utils$1.findKey(self, _header);

        if (key && (!matcher || matchHeaderValue(self, self[key], key, matcher))) {
          delete self[key];

          deleted = true;
        }
      }
    }

    if (utils$1.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }

    return deleted;
  }

  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;

    while (i--) {
      const key = keys[i];
      if(!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }

    return deleted;
  }

  normalize(format) {
    const self = this;
    const headers = {};

    utils$1.forEach(this, (value, header) => {
      const key = utils$1.findKey(headers, header);

      if (key) {
        self[key] = normalizeValue(value);
        delete self[header];
        return;
      }

      const normalized = format ? formatHeader(header) : String(header).trim();

      if (normalized !== header) {
        delete self[header];
      }

      self[normalized] = normalizeValue(value);

      headers[normalized] = true;
    });

    return this;
  }

  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }

  toJSON(asStrings) {
    const obj = Object.create(null);

    utils$1.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils$1.isArray(value) ? value.join(', ') : value);
    });

    return obj;
  }

  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }

  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ': ' + value).join('\n');
  }

  get [Symbol.toStringTag]() {
    return 'AxiosHeaders';
  }

  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }

  static concat(first, ...targets) {
    const computed = new this(first);

    targets.forEach((target) => computed.set(target));

    return computed;
  }

  static accessor(header) {
    const internals = this[$internals] = (this[$internals] = {
      accessors: {}
    });

    const accessors = internals.accessors;
    const prototype = this.prototype;

    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);

      if (!accessors[lHeader]) {
        buildAccessors(prototype, _header);
        accessors[lHeader] = true;
      }
    }

    utils$1.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);

    return this;
  }
}

AxiosHeaders.accessor(['Content-Type', 'Content-Length', 'Accept', 'Accept-Encoding', 'User-Agent', 'Authorization']);

// reserved names hotfix
utils$1.reduceDescriptors(AxiosHeaders.prototype, ({value}, key) => {
  let mapped = key[0].toUpperCase() + key.slice(1); // map `set` => `Set`
  return {
    get: () => value,
    set(headerValue) {
      this[mapped] = headerValue;
    }
  }
});

utils$1.freezeMethods(AxiosHeaders);

const AxiosHeaders$1 = AxiosHeaders;

/**
 * Transform the data for a request or a response
 *
 * @param {Array|Function} fns A single function or Array of functions
 * @param {?Object} response The response object
 *
 * @returns {*} The resulting transformed data
 */
function transformData(fns, response) {
  const config = this || defaults$1;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;

  utils$1.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : undefined);
  });

  headers.normalize();

  return data;
}

function isCancel(value) {
  return !!(value && value.__CANCEL__);
}

/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @param {string=} message The message.
 * @param {Object=} config The config.
 * @param {Object=} request The request.
 *
 * @returns {CanceledError} The created error.
 */
function CanceledError(message, config, request) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED, config, request);
  this.name = 'CanceledError';
}

utils$1.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 *
 * @returns {object} The response.
 */
function settle(resolve, reject, response) {
  const validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      'Request failed with status code ' + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 *
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 *
 * @returns {string} The combined URL
 */
function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/?\/$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
}

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 *
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}

const VERSION = "1.6.8";

function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
}

const DATA_URL_PATTERN = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;

/**
 * Parse data uri to a Buffer or Blob
 *
 * @param {String} uri
 * @param {?Boolean} asBlob
 * @param {?Object} options
 * @param {?Function} options.Blob
 *
 * @returns {Buffer|Blob}
 */
function fromDataURI(uri, asBlob, options) {
  const _Blob = options && options.Blob || platform.classes.Blob;
  const protocol = parseProtocol(uri);

  if (asBlob === undefined && _Blob) {
    asBlob = true;
  }

  if (protocol === 'data') {
    uri = protocol.length ? uri.slice(protocol.length + 1) : uri;

    const match = DATA_URL_PATTERN.exec(uri);

    if (!match) {
      throw new AxiosError('Invalid URL', AxiosError.ERR_INVALID_URL);
    }

    const mime = match[1];
    const isBase64 = match[2];
    const body = match[3];
    const buffer = Buffer.from(decodeURIComponent(body), isBase64 ? 'base64' : 'utf8');

    if (asBlob) {
      if (!_Blob) {
        throw new AxiosError('Blob is not supported', AxiosError.ERR_NOT_SUPPORT);
      }

      return new _Blob([buffer], {type: mime});
    }

    return buffer;
  }

  throw new AxiosError('Unsupported protocol ' + protocol, AxiosError.ERR_NOT_SUPPORT);
}

/**
 * Throttle decorator
 * @param {Function} fn
 * @param {Number} freq
 * @return {Function}
 */
function throttle(fn, freq) {
  let timestamp = 0;
  const threshold = 1000 / freq;
  let timer = null;
  return function throttled(force, args) {
    const now = Date.now();
    if (force || now - timestamp > threshold) {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      timestamp = now;
      return fn.apply(null, args);
    }
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        timestamp = Date.now();
        return fn.apply(null, args);
      }, threshold - (now - timestamp));
    }
  };
}

/**
 * Calculate data maxRate
 * @param {Number} [samplesCount= 10]
 * @param {Number} [min= 1000]
 * @returns {Function}
 */
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;

  min = min !== undefined ? min : 1000;

  return function push(chunkLength) {
    const now = Date.now();

    const startedAt = timestamps[tail];

    if (!firstSampleTS) {
      firstSampleTS = now;
    }

    bytes[head] = chunkLength;
    timestamps[head] = now;

    let i = tail;
    let bytesCount = 0;

    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }

    head = (head + 1) % samplesCount;

    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }

    if (now - firstSampleTS < min) {
      return;
    }

    const passed = startedAt && now - startedAt;

    return passed ? Math.round(bytesCount * 1000 / passed) : undefined;
  };
}

const kInternals = Symbol('internals');

class AxiosTransformStream extends stream__default["default"].Transform{
  constructor(options) {
    options = utils$1.toFlatObject(options, {
      maxRate: 0,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (prop, source) => {
      return !utils$1.isUndefined(source[prop]);
    });

    super({
      readableHighWaterMark: options.chunkSize
    });

    const self = this;

    const internals = this[kInternals] = {
      length: options.length,
      timeWindow: options.timeWindow,
      ticksRate: options.ticksRate,
      chunkSize: options.chunkSize,
      maxRate: options.maxRate,
      minChunkSize: options.minChunkSize,
      bytesSeen: 0,
      isCaptured: false,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };

    const _speedometer = speedometer(internals.ticksRate * options.samplesCount, internals.timeWindow);

    this.on('newListener', event => {
      if (event === 'progress') {
        if (!internals.isCaptured) {
          internals.isCaptured = true;
        }
      }
    });

    let bytesNotified = 0;

    internals.updateProgress = throttle(function throttledHandler() {
      const totalBytes = internals.length;
      const bytesTransferred = internals.bytesSeen;
      const progressBytes = bytesTransferred - bytesNotified;
      if (!progressBytes || self.destroyed) return;

      const rate = _speedometer(progressBytes);

      bytesNotified = bytesTransferred;

      process.nextTick(() => {
        self.emit('progress', {
          'loaded': bytesTransferred,
          'total': totalBytes,
          'progress': totalBytes ? (bytesTransferred / totalBytes) : undefined,
          'bytes': progressBytes,
          'rate': rate ? rate : undefined,
          'estimated': rate && totalBytes && bytesTransferred <= totalBytes ?
            (totalBytes - bytesTransferred) / rate : undefined
        });
      });
    }, internals.ticksRate);

    const onFinish = () => {
      internals.updateProgress(true);
    };

    this.once('end', onFinish);
    this.once('error', onFinish);
  }

  _read(size) {
    const internals = this[kInternals];

    if (internals.onReadCallback) {
      internals.onReadCallback();
    }

    return super._read(size);
  }

  _transform(chunk, encoding, callback) {
    const self = this;
    const internals = this[kInternals];
    const maxRate = internals.maxRate;

    const readableHighWaterMark = this.readableHighWaterMark;

    const timeWindow = internals.timeWindow;

    const divider = 1000 / timeWindow;
    const bytesThreshold = (maxRate / divider);
    const minChunkSize = internals.minChunkSize !== false ? Math.max(internals.minChunkSize, bytesThreshold * 0.01) : 0;

    function pushChunk(_chunk, _callback) {
      const bytes = Buffer.byteLength(_chunk);
      internals.bytesSeen += bytes;
      internals.bytes += bytes;

      if (internals.isCaptured) {
        internals.updateProgress();
      }

      if (self.push(_chunk)) {
        process.nextTick(_callback);
      } else {
        internals.onReadCallback = () => {
          internals.onReadCallback = null;
          process.nextTick(_callback);
        };
      }
    }

    const transformChunk = (_chunk, _callback) => {
      const chunkSize = Buffer.byteLength(_chunk);
      let chunkRemainder = null;
      let maxChunkSize = readableHighWaterMark;
      let bytesLeft;
      let passed = 0;

      if (maxRate) {
        const now = Date.now();

        if (!internals.ts || (passed = (now - internals.ts)) >= timeWindow) {
          internals.ts = now;
          bytesLeft = bytesThreshold - internals.bytes;
          internals.bytes = bytesLeft < 0 ? -bytesLeft : 0;
          passed = 0;
        }

        bytesLeft = bytesThreshold - internals.bytes;
      }

      if (maxRate) {
        if (bytesLeft <= 0) {
          // next time window
          return setTimeout(() => {
            _callback(null, _chunk);
          }, timeWindow - passed);
        }

        if (bytesLeft < maxChunkSize) {
          maxChunkSize = bytesLeft;
        }
      }

      if (maxChunkSize && chunkSize > maxChunkSize && (chunkSize - maxChunkSize) > minChunkSize) {
        chunkRemainder = _chunk.subarray(maxChunkSize);
        _chunk = _chunk.subarray(0, maxChunkSize);
      }

      pushChunk(_chunk, chunkRemainder ? () => {
        process.nextTick(_callback, null, chunkRemainder);
      } : _callback);
    };

    transformChunk(chunk, function transformNextChunk(err, _chunk) {
      if (err) {
        return callback(err);
      }

      if (_chunk) {
        transformChunk(_chunk, transformNextChunk);
      } else {
        callback(null);
      }
    });
  }

  setLength(length) {
    this[kInternals].length = +length;
    return this;
  }
}

const AxiosTransformStream$1 = AxiosTransformStream;

const {asyncIterator} = Symbol;

const readBlob = async function* (blob) {
  if (blob.stream) {
    yield* blob.stream();
  } else if (blob.arrayBuffer) {
    yield await blob.arrayBuffer();
  } else if (blob[asyncIterator]) {
    yield* blob[asyncIterator]();
  } else {
    yield blob;
  }
};

const readBlob$1 = readBlob;

const BOUNDARY_ALPHABET = utils$1.ALPHABET.ALPHA_DIGIT + '-_';

const textEncoder = new util.TextEncoder();

const CRLF = '\r\n';
const CRLF_BYTES = textEncoder.encode(CRLF);
const CRLF_BYTES_COUNT = 2;

class FormDataPart {
  constructor(name, value) {
    const {escapeName} = this.constructor;
    const isStringValue = utils$1.isString(value);

    let headers = `Content-Disposition: form-data; name="${escapeName(name)}"${
      !isStringValue && value.name ? `; filename="${escapeName(value.name)}"` : ''
    }${CRLF}`;

    if (isStringValue) {
      value = textEncoder.encode(String(value).replace(/\r?\n|\r\n?/g, CRLF));
    } else {
      headers += `Content-Type: ${value.type || "application/octet-stream"}${CRLF}`;
    }

    this.headers = textEncoder.encode(headers + CRLF);

    this.contentLength = isStringValue ? value.byteLength : value.size;

    this.size = this.headers.byteLength + this.contentLength + CRLF_BYTES_COUNT;

    this.name = name;
    this.value = value;
  }

  async *encode(){
    yield this.headers;

    const {value} = this;

    if(utils$1.isTypedArray(value)) {
      yield value;
    } else {
      yield* readBlob$1(value);
    }

    yield CRLF_BYTES;
  }

  static escapeName(name) {
      return String(name).replace(/[\r\n"]/g, (match) => ({
        '\r' : '%0D',
        '\n' : '%0A',
        '"' : '%22',
      }[match]));
  }
}

const formDataToStream = (form, headersHandler, options) => {
  const {
    tag = 'form-data-boundary',
    size = 25,
    boundary = tag + '-' + utils$1.generateString(size, BOUNDARY_ALPHABET)
  } = options || {};

  if(!utils$1.isFormData(form)) {
    throw TypeError('FormData instance required');
  }

  if (boundary.length < 1 || boundary.length > 70) {
    throw Error('boundary must be 10-70 characters long')
  }

  const boundaryBytes = textEncoder.encode('--' + boundary + CRLF);
  const footerBytes = textEncoder.encode('--' + boundary + '--' + CRLF + CRLF);
  let contentLength = footerBytes.byteLength;

  const parts = Array.from(form.entries()).map(([name, value]) => {
    const part = new FormDataPart(name, value);
    contentLength += part.size;
    return part;
  });

  contentLength += boundaryBytes.byteLength * parts.length;

  contentLength = utils$1.toFiniteNumber(contentLength);

  const computedHeaders = {
    'Content-Type': `multipart/form-data; boundary=${boundary}`
  };

  if (Number.isFinite(contentLength)) {
    computedHeaders['Content-Length'] = contentLength;
  }

  headersHandler && headersHandler(computedHeaders);

  return stream.Readable.from((async function *() {
    for(const part of parts) {
      yield boundaryBytes;
      yield* part.encode();
    }

    yield footerBytes;
  })());
};

const formDataToStream$1 = formDataToStream;

class ZlibHeaderTransformStream extends stream__default["default"].Transform {
  __transform(chunk, encoding, callback) {
    this.push(chunk);
    callback();
  }

  _transform(chunk, encoding, callback) {
    if (chunk.length !== 0) {
      this._transform = this.__transform;

      // Add Default Compression headers if no zlib headers are present
      if (chunk[0] !== 120) { // Hex: 78
        const header = Buffer.alloc(2);
        header[0] = 120; // Hex: 78
        header[1] = 156; // Hex: 9C 
        this.push(header, encoding);
      }
    }

    this.__transform(chunk, encoding, callback);
  }
}

const ZlibHeaderTransformStream$1 = ZlibHeaderTransformStream;

const callbackify = (fn, reducer) => {
  return utils$1.isAsyncFn(fn) ? function (...args) {
    const cb = args.pop();
    fn.apply(this, args).then((value) => {
      try {
        reducer ? cb(null, ...reducer(value)) : cb(null, value);
      } catch (err) {
        cb(err);
      }
    }, cb);
  } : fn;
};

const callbackify$1 = callbackify;

const zlibOptions = {
  flush: zlib__default["default"].constants.Z_SYNC_FLUSH,
  finishFlush: zlib__default["default"].constants.Z_SYNC_FLUSH
};

const brotliOptions = {
  flush: zlib__default["default"].constants.BROTLI_OPERATION_FLUSH,
  finishFlush: zlib__default["default"].constants.BROTLI_OPERATION_FLUSH
};

const isBrotliSupported = utils$1.isFunction(zlib__default["default"].createBrotliDecompress);

const {http: httpFollow, https: httpsFollow} = followRedirects__default["default"];

const isHttps = /https:?/;

const supportedProtocols = platform.protocols.map(protocol => {
  return protocol + ':';
});

/**
 * If the proxy or config beforeRedirects functions are defined, call them with the options
 * object.
 *
 * @param {Object<string, any>} options - The options object that was passed to the request.
 *
 * @returns {Object<string, any>}
 */
function dispatchBeforeRedirect(options, responseDetails) {
  if (options.beforeRedirects.proxy) {
    options.beforeRedirects.proxy(options);
  }
  if (options.beforeRedirects.config) {
    options.beforeRedirects.config(options, responseDetails);
  }
}

/**
 * If the proxy or config afterRedirects functions are defined, call them with the options
 *
 * @param {http.ClientRequestArgs} options
 * @param {AxiosProxyConfig} configProxy configuration from Axios options object
 * @param {string} location
 *
 * @returns {http.ClientRequestArgs}
 */
function setProxy(options, configProxy, location) {
  let proxy = configProxy;
  if (!proxy && proxy !== false) {
    const proxyUrl = proxyFromEnv.getProxyForUrl(location);
    if (proxyUrl) {
      proxy = new URL(proxyUrl);
    }
  }
  if (proxy) {
    // Basic proxy authorization
    if (proxy.username) {
      proxy.auth = (proxy.username || '') + ':' + (proxy.password || '');
    }

    if (proxy.auth) {
      // Support proxy auth object form
      if (proxy.auth.username || proxy.auth.password) {
        proxy.auth = (proxy.auth.username || '') + ':' + (proxy.auth.password || '');
      }
      const base64 = Buffer
        .from(proxy.auth, 'utf8')
        .toString('base64');
      options.headers['Proxy-Authorization'] = 'Basic ' + base64;
    }

    options.headers.host = options.hostname + (options.port ? ':' + options.port : '');
    const proxyHost = proxy.hostname || proxy.host;
    options.hostname = proxyHost;
    // Replace 'host' since options is not a URL object
    options.host = proxyHost;
    options.port = proxy.port;
    options.path = location;
    if (proxy.protocol) {
      options.protocol = proxy.protocol.includes(':') ? proxy.protocol : `${proxy.protocol}:`;
    }
  }

  options.beforeRedirects.proxy = function beforeRedirect(redirectOptions) {
    // Configure proxy for redirected request, passing the original config proxy to apply
    // the exact same logic as if the redirected request was performed by axios directly.
    setProxy(redirectOptions, configProxy, redirectOptions.href);
  };
}

const isHttpAdapterSupported = typeof process !== 'undefined' && utils$1.kindOf(process) === 'process';

// temporary hotfix

const wrapAsync = (asyncExecutor) => {
  return new Promise((resolve, reject) => {
    let onDone;
    let isDone;

    const done = (value, isRejected) => {
      if (isDone) return;
      isDone = true;
      onDone && onDone(value, isRejected);
    };

    const _resolve = (value) => {
      done(value);
      resolve(value);
    };

    const _reject = (reason) => {
      done(reason, true);
      reject(reason);
    };

    asyncExecutor(_resolve, _reject, (onDoneHandler) => (onDone = onDoneHandler)).catch(_reject);
  })
};

const resolveFamily = ({address, family}) => {
  if (!utils$1.isString(address)) {
    throw TypeError('address must be a string');
  }
  return ({
    address,
    family: family || (address.indexOf('.') < 0 ? 6 : 4)
  });
};

const buildAddressEntry = (address, family) => resolveFamily(utils$1.isObject(address) ? address : {address, family});

/*eslint consistent-return:0*/
const httpAdapter = isHttpAdapterSupported && function httpAdapter(config) {
  return wrapAsync(async function dispatchHttpRequest(resolve, reject, onDone) {
    let {data, lookup, family} = config;
    const {responseType, responseEncoding} = config;
    const method = config.method.toUpperCase();
    let isDone;
    let rejected = false;
    let req;

    if (lookup) {
      const _lookup = callbackify$1(lookup, (value) => utils$1.isArray(value) ? value : [value]);
      // hotfix to support opt.all option which is required for node 20.x
      lookup = (hostname, opt, cb) => {
        _lookup(hostname, opt, (err, arg0, arg1) => {
          if (err) {
            return cb(err);
          }

          const addresses = utils$1.isArray(arg0) ? arg0.map(addr => buildAddressEntry(addr)) : [buildAddressEntry(arg0, arg1)];

          opt.all ? cb(err, addresses) : cb(err, addresses[0].address, addresses[0].family);
        });
      };
    }

    // temporary internal emitter until the AxiosRequest class will be implemented
    const emitter = new events.EventEmitter();

    const onFinished = () => {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(abort);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', abort);
      }

      emitter.removeAllListeners();
    };

    onDone((value, isRejected) => {
      isDone = true;
      if (isRejected) {
        rejected = true;
        onFinished();
      }
    });

    function abort(reason) {
      emitter.emit('abort', !reason || reason.type ? new CanceledError(null, config, req) : reason);
    }

    emitter.once('abort', reject);

    if (config.cancelToken || config.signal) {
      config.cancelToken && config.cancelToken.subscribe(abort);
      if (config.signal) {
        config.signal.aborted ? abort() : config.signal.addEventListener('abort', abort);
      }
    }

    // Parse url
    const fullPath = buildFullPath(config.baseURL, config.url);
    const parsed = new URL(fullPath, 'http://localhost');
    const protocol = parsed.protocol || supportedProtocols[0];

    if (protocol === 'data:') {
      let convertedData;

      if (method !== 'GET') {
        return settle(resolve, reject, {
          status: 405,
          statusText: 'method not allowed',
          headers: {},
          config
        });
      }

      try {
        convertedData = fromDataURI(config.url, responseType === 'blob', {
          Blob: config.env && config.env.Blob
        });
      } catch (err) {
        throw AxiosError.from(err, AxiosError.ERR_BAD_REQUEST, config);
      }

      if (responseType === 'text') {
        convertedData = convertedData.toString(responseEncoding);

        if (!responseEncoding || responseEncoding === 'utf8') {
          convertedData = utils$1.stripBOM(convertedData);
        }
      } else if (responseType === 'stream') {
        convertedData = stream__default["default"].Readable.from(convertedData);
      }

      return settle(resolve, reject, {
        data: convertedData,
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders$1(),
        config
      });
    }

    if (supportedProtocols.indexOf(protocol) === -1) {
      return reject(new AxiosError(
        'Unsupported protocol ' + protocol,
        AxiosError.ERR_BAD_REQUEST,
        config
      ));
    }

    const headers = AxiosHeaders$1.from(config.headers).normalize();

    // Set User-Agent (required by some servers)
    // See https://github.com/axios/axios/issues/69
    // User-Agent is specified; handle case where no UA header is desired
    // Only set header if it hasn't been set in config
    headers.set('User-Agent', 'axios/' + VERSION, false);

    const onDownloadProgress = config.onDownloadProgress;
    const onUploadProgress = config.onUploadProgress;
    const maxRate = config.maxRate;
    let maxUploadRate = undefined;
    let maxDownloadRate = undefined;

    // support for spec compliant FormData objects
    if (utils$1.isSpecCompliantForm(data)) {
      const userBoundary = headers.getContentType(/boundary=([-_\w\d]{10,70})/i);

      data = formDataToStream$1(data, (formHeaders) => {
        headers.set(formHeaders);
      }, {
        tag: `axios-${VERSION}-boundary`,
        boundary: userBoundary && userBoundary[1] || undefined
      });
      // support for https://www.npmjs.com/package/form-data api
    } else if (utils$1.isFormData(data) && utils$1.isFunction(data.getHeaders)) {
      headers.set(data.getHeaders());

      if (!headers.hasContentLength()) {
        try {
          const knownLength = await util__default["default"].promisify(data.getLength).call(data);
          Number.isFinite(knownLength) && knownLength >= 0 && headers.setContentLength(knownLength);
          /*eslint no-empty:0*/
        } catch (e) {
        }
      }
    } else if (utils$1.isBlob(data)) {
      data.size && headers.setContentType(data.type || 'application/octet-stream');
      headers.setContentLength(data.size || 0);
      data = stream__default["default"].Readable.from(readBlob$1(data));
    } else if (data && !utils$1.isStream(data)) {
      if (Buffer.isBuffer(data)) ; else if (utils$1.isArrayBuffer(data)) {
        data = Buffer.from(new Uint8Array(data));
      } else if (utils$1.isString(data)) {
        data = Buffer.from(data, 'utf-8');
      } else {
        return reject(new AxiosError(
          'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
          AxiosError.ERR_BAD_REQUEST,
          config
        ));
      }

      // Add Content-Length header if data exists
      headers.setContentLength(data.length, false);

      if (config.maxBodyLength > -1 && data.length > config.maxBodyLength) {
        return reject(new AxiosError(
          'Request body larger than maxBodyLength limit',
          AxiosError.ERR_BAD_REQUEST,
          config
        ));
      }
    }

    const contentLength = utils$1.toFiniteNumber(headers.getContentLength());

    if (utils$1.isArray(maxRate)) {
      maxUploadRate = maxRate[0];
      maxDownloadRate = maxRate[1];
    } else {
      maxUploadRate = maxDownloadRate = maxRate;
    }

    if (data && (onUploadProgress || maxUploadRate)) {
      if (!utils$1.isStream(data)) {
        data = stream__default["default"].Readable.from(data, {objectMode: false});
      }

      data = stream__default["default"].pipeline([data, new AxiosTransformStream$1({
        length: contentLength,
        maxRate: utils$1.toFiniteNumber(maxUploadRate)
      })], utils$1.noop);

      onUploadProgress && data.on('progress', progress => {
        onUploadProgress(Object.assign(progress, {
          upload: true
        }));
      });
    }

    // HTTP basic authentication
    let auth = undefined;
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password || '';
      auth = username + ':' + password;
    }

    if (!auth && parsed.username) {
      const urlUsername = parsed.username;
      const urlPassword = parsed.password;
      auth = urlUsername + ':' + urlPassword;
    }

    auth && headers.delete('authorization');

    let path;

    try {
      path = buildURL(
        parsed.pathname + parsed.search,
        config.params,
        config.paramsSerializer
      ).replace(/^\?/, '');
    } catch (err) {
      const customErr = new Error(err.message);
      customErr.config = config;
      customErr.url = config.url;
      customErr.exists = true;
      return reject(customErr);
    }

    headers.set(
      'Accept-Encoding',
      'gzip, compress, deflate' + (isBrotliSupported ? ', br' : ''), false
      );

    const options = {
      path,
      method: method,
      headers: headers.toJSON(),
      agents: { http: config.httpAgent, https: config.httpsAgent },
      auth,
      protocol,
      family,
      beforeRedirect: dispatchBeforeRedirect,
      beforeRedirects: {}
    };

    // cacheable-lookup integration hotfix
    !utils$1.isUndefined(lookup) && (options.lookup = lookup);

    if (config.socketPath) {
      options.socketPath = config.socketPath;
    } else {
      options.hostname = parsed.hostname;
      options.port = parsed.port;
      setProxy(options, config.proxy, protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path);
    }

    let transport;
    const isHttpsRequest = isHttps.test(options.protocol);
    options.agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;
    if (config.transport) {
      transport = config.transport;
    } else if (config.maxRedirects === 0) {
      transport = isHttpsRequest ? https__default["default"] : http__default["default"];
    } else {
      if (config.maxRedirects) {
        options.maxRedirects = config.maxRedirects;
      }
      if (config.beforeRedirect) {
        options.beforeRedirects.config = config.beforeRedirect;
      }
      transport = isHttpsRequest ? httpsFollow : httpFollow;
    }

    if (config.maxBodyLength > -1) {
      options.maxBodyLength = config.maxBodyLength;
    } else {
      // follow-redirects does not skip comparison, so it should always succeed for axios -1 unlimited
      options.maxBodyLength = Infinity;
    }

    if (config.insecureHTTPParser) {
      options.insecureHTTPParser = config.insecureHTTPParser;
    }

    // Create the request
    req = transport.request(options, function handleResponse(res) {
      if (req.destroyed) return;

      const streams = [res];

      const responseLength = +res.headers['content-length'];

      if (onDownloadProgress) {
        const transformStream = new AxiosTransformStream$1({
          length: utils$1.toFiniteNumber(responseLength),
          maxRate: utils$1.toFiniteNumber(maxDownloadRate)
        });

        onDownloadProgress && transformStream.on('progress', progress => {
          onDownloadProgress(Object.assign(progress, {
            download: true
          }));
        });

        streams.push(transformStream);
      }

      // decompress the response body transparently if required
      let responseStream = res;

      // return the last request in case of redirects
      const lastRequest = res.req || req;

      // if decompress disabled we should not decompress
      if (config.decompress !== false && res.headers['content-encoding']) {
        // if no content, but headers still say that it is encoded,
        // remove the header not confuse downstream operations
        if (method === 'HEAD' || res.statusCode === 204) {
          delete res.headers['content-encoding'];
        }

        switch ((res.headers['content-encoding'] || '').toLowerCase()) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'x-gzip':
        case 'compress':
        case 'x-compress':
          // add the unzipper to the body stream processing pipeline
          streams.push(zlib__default["default"].createUnzip(zlibOptions));

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        case 'deflate':
          streams.push(new ZlibHeaderTransformStream$1());

          // add the unzipper to the body stream processing pipeline
          streams.push(zlib__default["default"].createUnzip(zlibOptions));

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        case 'br':
          if (isBrotliSupported) {
            streams.push(zlib__default["default"].createBrotliDecompress(brotliOptions));
            delete res.headers['content-encoding'];
          }
        }
      }

      responseStream = streams.length > 1 ? stream__default["default"].pipeline(streams, utils$1.noop) : streams[0];

      const offListeners = stream__default["default"].finished(responseStream, () => {
        offListeners();
        onFinished();
      });

      const response = {
        status: res.statusCode,
        statusText: res.statusMessage,
        headers: new AxiosHeaders$1(res.headers),
        config,
        request: lastRequest
      };

      if (responseType === 'stream') {
        response.data = responseStream;
        settle(resolve, reject, response);
      } else {
        const responseBuffer = [];
        let totalResponseBytes = 0;

        responseStream.on('data', function handleStreamData(chunk) {
          responseBuffer.push(chunk);
          totalResponseBytes += chunk.length;

          // make sure the content length is not over the maxContentLength if specified
          if (config.maxContentLength > -1 && totalResponseBytes > config.maxContentLength) {
            // stream.destroy() emit aborted event before calling reject() on Node.js v16
            rejected = true;
            responseStream.destroy();
            reject(new AxiosError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
              AxiosError.ERR_BAD_RESPONSE, config, lastRequest));
          }
        });

        responseStream.on('aborted', function handlerStreamAborted() {
          if (rejected) {
            return;
          }

          const err = new AxiosError(
            'maxContentLength size of ' + config.maxContentLength + ' exceeded',
            AxiosError.ERR_BAD_RESPONSE,
            config,
            lastRequest
          );
          responseStream.destroy(err);
          reject(err);
        });

        responseStream.on('error', function handleStreamError(err) {
          if (req.destroyed) return;
          reject(AxiosError.from(err, null, config, lastRequest));
        });

        responseStream.on('end', function handleStreamEnd() {
          try {
            let responseData = responseBuffer.length === 1 ? responseBuffer[0] : Buffer.concat(responseBuffer);
            if (responseType !== 'arraybuffer') {
              responseData = responseData.toString(responseEncoding);
              if (!responseEncoding || responseEncoding === 'utf8') {
                responseData = utils$1.stripBOM(responseData);
              }
            }
            response.data = responseData;
          } catch (err) {
            return reject(AxiosError.from(err, null, config, response.request, response));
          }
          settle(resolve, reject, response);
        });
      }

      emitter.once('abort', err => {
        if (!responseStream.destroyed) {
          responseStream.emit('error', err);
          responseStream.destroy();
        }
      });
    });

    emitter.once('abort', err => {
      reject(err);
      req.destroy(err);
    });

    // Handle errors
    req.on('error', function handleRequestError(err) {
      // @todo remove
      // if (req.aborted && err.code !== AxiosError.ERR_FR_TOO_MANY_REDIRECTS) return;
      reject(AxiosError.from(err, null, config, req));
    });

    // set tcp keep alive to prevent drop connection by peer
    req.on('socket', function handleRequestSocket(socket) {
      // default interval of sending ack packet is 1 minute
      socket.setKeepAlive(true, 1000 * 60);
    });

    // Handle request timeout
    if (config.timeout) {
      // This is forcing a int timeout to avoid problems if the `req` interface doesn't handle other types.
      const timeout = parseInt(config.timeout, 10);

      if (Number.isNaN(timeout)) {
        reject(new AxiosError(
          'error trying to parse `config.timeout` to int',
          AxiosError.ERR_BAD_OPTION_VALUE,
          config,
          req
        ));

        return;
      }

      // Sometime, the response will be very slow, and does not respond, the connect event will be block by event loop system.
      // And timer callback will be fired, and abort() will be invoked before connection, then get "socket hang up" and code ECONNRESET.
      // At this time, if we have a large number of request, nodejs will hang up some socket on background. and the number will up and up.
      // And then these socket which be hang up will devouring CPU little by little.
      // ClientRequest.setTimeout will be fired on the specify milliseconds, and can make sure that abort() will be fired after connect.
      req.setTimeout(timeout, function handleRequestTimeout() {
        if (isDone) return;
        let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
        const transitional = config.transitional || transitionalDefaults;
        if (config.timeoutErrorMessage) {
          timeoutErrorMessage = config.timeoutErrorMessage;
        }
        reject(new AxiosError(
          timeoutErrorMessage,
          transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
          config,
          req
        ));
        abort();
      });
    }


    // Send the request
    if (utils$1.isStream(data)) {
      let ended = false;
      let errored = false;

      data.on('end', () => {
        ended = true;
      });

      data.once('error', err => {
        errored = true;
        req.destroy(err);
      });

      data.on('close', () => {
        if (!ended && !errored) {
          abort(new CanceledError('Request stream has been aborted', config, req));
        }
      });

      data.pipe(req);
    } else {
      req.end(data);
    }
  });
};

const cookies = platform.hasStandardBrowserEnv ?

  // Standard browser envs support document.cookie
  {
    write(name, value, expires, path, domain, secure) {
      const cookie = [name + '=' + encodeURIComponent(value)];

      utils$1.isNumber(expires) && cookie.push('expires=' + new Date(expires).toGMTString());

      utils$1.isString(path) && cookie.push('path=' + path);

      utils$1.isString(domain) && cookie.push('domain=' + domain);

      secure === true && cookie.push('secure');

      document.cookie = cookie.join('; ');
    },

    read(name) {
      const match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return (match ? decodeURIComponent(match[3]) : null);
    },

    remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  }

  :

  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {},
    read() {
      return null;
    },
    remove() {}
  };

const isURLSameOrigin = platform.hasStandardBrowserEnv ?

// Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement('a');
    let originURL;

    /**
    * Parse a URL to discover its components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      let href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
          urlParsingNode.pathname :
          '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      const parsed = (utils$1.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
          parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })();

function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);

  return e => {
    const loaded = e.loaded;
    const total = e.lengthComputable ? e.total : undefined;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;

    bytesNotified = loaded;

    const data = {
      loaded,
      total,
      progress: total ? (loaded / total) : undefined,
      bytes: progressBytes,
      rate: rate ? rate : undefined,
      estimated: rate && total && inRange ? (total - loaded) / rate : undefined,
      event: e
    };

    data[isDownloadStream ? 'download' : 'upload'] = true;

    listener(data);
  };
}

const isXHRAdapterSupported = typeof XMLHttpRequest !== 'undefined';

const xhrAdapter = isXHRAdapterSupported && function (config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
    let {responseType, withXSRFToken} = config;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    let contentType;

    if (utils$1.isFormData(requestData)) {
      if (platform.hasStandardBrowserEnv || platform.hasStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false); // Let the browser set it
      } else if ((contentType = requestHeaders.getContentType()) !== false) {
        // fix semicolon duplication issue for ReactNative FormData implementation
        const [type, ...tokens] = contentType ? contentType.split(';').map(token => token.trim()).filter(Boolean) : [];
        requestHeaders.setContentType([type || 'multipart/form-data', ...tokens].join('; '));
      }
    }

    let request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      const username = config.auth.username || '';
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.set('Authorization', 'Basic ' + btoa(username + ':' + password));
    }

    const fullPath = buildFullPath(config.baseURL, config.url);

    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      const responseHeaders = AxiosHeaders$1.from(
        'getAllResponseHeaders' in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === 'text' || responseType === 'json' ?
        request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };

      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      const transitional = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if(platform.hasStandardBrowserEnv) {
      withXSRFToken && utils$1.isFunction(withXSRFToken) && (withXSRFToken = withXSRFToken(config));

      if (withXSRFToken || (withXSRFToken !== false && isURLSameOrigin(fullPath))) {
        // Add xsrf header
        const xsrfValue = config.xsrfHeaderName && config.xsrfCookieName && cookies.read(config.xsrfCookieName);

        if (xsrfValue) {
          requestHeaders.set(config.xsrfHeaderName, xsrfValue);
        }
      }
    }

    // Remove Content-Type if data is undefined
    requestData === undefined && requestHeaders.setContentType(null);

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils$1.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }

    // Add withCredentials to request if needed
    if (!utils$1.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', progressEventReducer(config.onDownloadProgress, true));
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', progressEventReducer(config.onUploadProgress));
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = cancel => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    const protocol = parseProtocol(fullPath);

    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    }


    // Send the request
    request.send(requestData || null);
  });
};

const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};

utils$1.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, 'name', {value});
    } catch (e) {
      // eslint-disable-next-line no-empty
    }
    Object.defineProperty(fn, 'adapterName', {value});
  }
});

const renderReason = (reason) => `- ${reason}`;

const isResolvedHandle = (adapter) => utils$1.isFunction(adapter) || adapter === null || adapter === false;

const adapters = {
  getAdapter: (adapters) => {
    adapters = utils$1.isArray(adapters) ? adapters : [adapters];

    const {length} = adapters;
    let nameOrAdapter;
    let adapter;

    const rejectedReasons = {};

    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters[i];
      let id;

      adapter = nameOrAdapter;

      if (!isResolvedHandle(nameOrAdapter)) {
        adapter = knownAdapters[(id = String(nameOrAdapter)).toLowerCase()];

        if (adapter === undefined) {
          throw new AxiosError(`Unknown adapter '${id}'`);
        }
      }

      if (adapter) {
        break;
      }

      rejectedReasons[id || '#' + i] = adapter;
    }

    if (!adapter) {

      const reasons = Object.entries(rejectedReasons)
        .map(([id, state]) => `adapter ${id} ` +
          (state === false ? 'is not supported by the environment' : 'is not available in the build')
        );

      let s = length ?
        (reasons.length > 1 ? 'since :\n' + reasons.map(renderReason).join('\n') : ' ' + renderReason(reasons[0])) :
        'as no adapter specified';

      throw new AxiosError(
        `There is no suitable adapter to dispatch the request ` + s,
        'ERR_NOT_SUPPORT'
      );
    }

    return adapter;
  },
  adapters: knownAdapters
};

/**
 * Throws a `CanceledError` if cancellation has been requested.
 *
 * @param {Object} config The config that is to be used for the request
 *
 * @returns {void}
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 *
 * @returns {Promise} The Promise to be fulfilled
 */
function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  config.headers = AxiosHeaders$1.from(config.headers);

  // Transform request data
  config.data = transformData.call(
    config,
    config.transformRequest
  );

  if (['post', 'put', 'patch'].indexOf(config.method) !== -1) {
    config.headers.setContentType('application/x-www-form-urlencoded', false);
  }

  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );

    response.headers = AxiosHeaders$1.from(response.headers);

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }

    return Promise.reject(reason);
  });
}

const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? { ...thing } : thing;

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 *
 * @returns {Object} New object resulting from merging config2 to config1
 */
function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  const config = {};

  function getMergedValue(target, source, caseless) {
    if (utils$1.isPlainObject(target) && utils$1.isPlainObject(source)) {
      return utils$1.merge.call({caseless}, target, source);
    } else if (utils$1.isPlainObject(source)) {
      return utils$1.merge({}, source);
    } else if (utils$1.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  // eslint-disable-next-line consistent-return
  function mergeDeepProperties(a, b, caseless) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(a, b, caseless);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a, caseless);
    }
  }

  // eslint-disable-next-line consistent-return
  function valueFromConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    }
  }

  // eslint-disable-next-line consistent-return
  function defaultToConfig2(a, b) {
    if (!utils$1.isUndefined(b)) {
      return getMergedValue(undefined, b);
    } else if (!utils$1.isUndefined(a)) {
      return getMergedValue(undefined, a);
    }
  }

  // eslint-disable-next-line consistent-return
  function mergeDirectKeys(a, b, prop) {
    if (prop in config2) {
      return getMergedValue(a, b);
    } else if (prop in config1) {
      return getMergedValue(undefined, a);
    }
  }

  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    withXSRFToken: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b) => mergeDeepProperties(headersToObject(a), headersToObject(b), true)
  };

  utils$1.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge(config1[prop], config2[prop], prop);
    (utils$1.isUndefined(configValue) && merge !== mergeDirectKeys) || (config[prop] = configValue);
  });

  return config;
}

const validators$1 = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach((type, i) => {
  validators$1[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

const deprecatedWarnings = {};

/**
 * Transitional option validator
 *
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 *
 * @returns {function}
 */
validators$1.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return (value, opt, opts) => {
    if (validator === false) {
      throw new AxiosError(
        formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')),
        AxiosError.ERR_DEPRECATED
      );
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 *
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 *
 * @returns {object}
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator = schema[opt];
    if (validator) {
      const value = options[opt];
      const result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

const validator = {
  assertOptions,
  validators: validators$1
};

const validators = validator.validators;

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 *
 * @return {Axios} A new instance of Axios
 */
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(configOrUrl, config) {
    try {
      return await this._request(configOrUrl, config);
    } catch (err) {
      if (err instanceof Error) {
        let dummy;

        Error.captureStackTrace ? Error.captureStackTrace(dummy = {}) : (dummy = new Error());

        // slice off the Error: ... line
        const stack = dummy.stack ? dummy.stack.replace(/^.+\n/, '') : '';

        if (!err.stack) {
          err.stack = stack;
          // match without the 2 top stack lines
        } else if (stack && !String(err.stack).endsWith(stack.replace(/^.+\n.+\n/, ''))) {
          err.stack += '\n' + stack;
        }
      }

      throw err;
    }
  }

  _request(configOrUrl, config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof configOrUrl === 'string') {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }

    config = mergeConfig(this.defaults, config);

    const {transitional, paramsSerializer, headers} = config;

    if (transitional !== undefined) {
      validator.assertOptions(transitional, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }

    if (paramsSerializer != null) {
      if (utils$1.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }

    // Set config.method
    config.method = (config.method || this.defaults.method || 'get').toLowerCase();

    // Flatten headers
    let contextHeaders = headers && utils$1.merge(
      headers.common,
      headers[config.method]
    );

    headers && utils$1.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      (method) => {
        delete headers[method];
      }
    );

    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);

    // filter out skipped interceptors
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
        return;
      }

      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });

    let promise;
    let i = 0;
    let len;

    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), undefined];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;

      promise = Promise.resolve(config);

      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }

      return promise;
    }

    len = requestInterceptorChain.length;

    let newConfig = config;

    i = 0;

    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }

    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }

    i = 0;
    len = responseInterceptorChain.length;

    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }

    return promise;
  }

  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}

// Provide aliases for supported request methods
utils$1.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});

utils$1.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/

  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url,
        data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();

  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});

const Axios$1 = Axios;

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @param {Function} executor The executor function.
 *
 * @returns {CancelToken}
 */
class CancelToken {
  constructor(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    let resolvePromise;

    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    const token = this;

    // eslint-disable-next-line func-names
    this.promise.then(cancel => {
      if (!token._listeners) return;

      let i = token._listeners.length;

      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });

    // eslint-disable-next-line func-names
    this.promise.then = onfulfilled => {
      let _resolve;
      // eslint-disable-next-line func-names
      const promise = new Promise(resolve => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);

      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };

      return promise;
    };

    executor(function cancel(message, config, request) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }

  /**
   * Subscribe to the cancel signal
   */

  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }

    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }

  /**
   * Unsubscribe from the cancel signal
   */

  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index = this._listeners.indexOf(listener);
    if (index !== -1) {
      this._listeners.splice(index, 1);
    }
  }

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token,
      cancel
    };
  }
}

const CancelToken$1 = CancelToken;

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 *
 * @returns {Function}
 */
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}

/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 *
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
function isAxiosError(payload) {
  return utils$1.isObject(payload) && (payload.isAxiosError === true);
}

const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};

Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});

const HttpStatusCode$1 = HttpStatusCode;

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 *
 * @returns {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);

  // Copy axios.prototype to instance
  utils$1.extend(instance, Axios$1.prototype, context, {allOwnKeys: true});

  // Copy context to instance
  utils$1.extend(instance, context, null, {allOwnKeys: true});

  // Factory for creating new instances
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
}

// Create the default instance to be exported
const axios = createInstance(defaults$1);

// Expose Axios class to allow class inheritance
axios.Axios = Axios$1;

// Expose Cancel & CancelToken
axios.CanceledError = CanceledError;
axios.CancelToken = CancelToken$1;
axios.isCancel = isCancel;
axios.VERSION = VERSION;
axios.toFormData = toFormData;

// Expose AxiosError class
axios.AxiosError = AxiosError;

// alias for CanceledError for backward compatibility
axios.Cancel = axios.CanceledError;

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = spread;

// Expose isAxiosError
axios.isAxiosError = isAxiosError;

// Expose mergeConfig
axios.mergeConfig = mergeConfig;

axios.AxiosHeaders = AxiosHeaders$1;

axios.formToJSON = thing => formDataToJSON(utils$1.isHTMLForm(thing) ? new FormData(thing) : thing);

axios.getAdapter = adapters.getAdapter;

axios.HttpStatusCode = HttpStatusCode$1;

axios.default = axios;

module.exports = axios;
//# sourceMappingURL=axios.cjs.map


/***/ }),

/***/ 6158:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   BW: () => (/* binding */ APIFY_ENV_VARS),
/* harmony export */   KG: () => (/* binding */ ACTOR_SOURCE_TYPES)
/* harmony export */ });
/* unused harmony exports ACTOR_BUILD_ARGS, ACTOR_CATEGORIES, ACTOR_ENV_VARS, ACTOR_EVENT_NAMES, ACTOR_JOB_STATUSES, ACTOR_JOB_TERMINAL_STATUSES, ACTOR_JOB_TYPES, ACTOR_LIMITS, ACTOR_NAME, ACTOR_PERMISSION_LEVEL, ACTOR_RESTART_ON_ERROR, ACTOR_TYPES, ACT_JOB_STATUSES, ACT_JOB_TERMINAL_STATUSES, ACT_JOB_TYPES, ACT_RESTART_ON_ERROR, ACT_SOURCE_TYPES, ACT_TYPES, ALL_ACTOR_CATEGORIES, ANONYMOUS_USERNAME, APIFY_ID_REGEX, APIFY_PROXY_VALUE_REGEX, BUILD_TAG_LATEST, COMMA_SEPARATED_EMAILS_REGEX, COMMA_SEPARATED_EMAILS_REGEX_STR, COMMA_SEPARATED_LIST_ENV_VARS, COMPUTE_UNIT_MB, COMPUTE_UNIT_MILLIS, CONTACT_LINK_REGEX, DEFAULT_ACTOR_STANDBY_PORT, DEFAULT_CONTAINER_PORT, DEFAULT_PLATFORM_LIMITS, DNS_SAFE_NAME_MAX_LENGTH, DNS_SAFE_NAME_REGEX, DOCKER_LABELS, EMAIL, EMAIL_REGEX, EMAIL_REGEX_STR, ENV_VARS, FINISHED_PROJECT_STATUSES, FREE_SUBSCRIPTION_PLAN_CODE, GITHUB_GIST_URL_REGEX, GITHUB_REGEX, GIT_MAIN_BRANCH, GIT_REPO_REGEX, HTTP_URL_REGEX, INTEGER_ENV_VARS, ISSUES_STATUS_ALL, ISSUES_STATUS_TYPES, KEY_VALUE_STORE_KEYS, KEY_VALUE_STORE_KEY_REGEX, LINKEDIN_PROFILE_REGEX, LOCAL_ACTOR_ENV_VARS, LOCAL_APIFY_ENV_VARS, LOCAL_ENV_VARS, LOCAL_STORAGE_SUBDIRS, MARKETPLACE_USER_ROLES, MAX_MULTIFILE_BYTES, MAX_PAYLOAD_SIZE_BYTES, META_ORIGINS, ME_USER_NAME_PLACEHOLDER, PROFILE_NAME, PROJECT_STATUSES, PROXY_URL_REGEX, RELATIVE_URL_REGEX, REQUEST_QUEUE_HEAD_MAX_LIMIT, REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION, RUN_GENERAL_ACCESS, SHORT_CRAWLER_ID_LENGTH, SOURCE_FILE_FORMATS, SPLIT_PATH_REGEX, STORAGE_GENERAL_ACCESS, TWITTER_REGEX, URL_REGEX, USERNAME, USER_BASIC_TEXT_XSS_OPTIONS, USER_PERSONA_TYPES, VERSION_INT_MAJOR_BASE, VERSION_INT_MINOR_BASE, WEBHOOK_ALLOWED_PAYLOAD_VARIABLES, WEBHOOK_DEFAULT_PAYLOAD_TEMPLATE, WEBHOOK_DISPATCH_STATUSES, WEBHOOK_EVENT_TYPES, WEBHOOK_EVENT_TYPE_GROUPS, WORKER_SERVICE_TYPES */
// src/regexs.ts
var namePartSubRegexStr = "[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+";
var nameSubRegexStr = `${namePartSubRegexStr}(?:\\.${namePartSubRegexStr})*`;
var domainPartSubRegexStr = "[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?";
var domainSubRegexStr = `${domainPartSubRegexStr}(?:\\.${domainPartSubRegexStr})+`;
var EMAIL_REGEX_STR = `${nameSubRegexStr}@${domainSubRegexStr}`;
var EMAIL_REGEX = new RegExp(`^${EMAIL_REGEX_STR}$`);
var COMMA_SEPARATED_EMAILS_REGEX_STR = `(${EMAIL_REGEX_STR})( *, *${EMAIL_REGEX_STR})*`;
var COMMA_SEPARATED_EMAILS_REGEX = new RegExp(`^${COMMA_SEPARATED_EMAILS_REGEX_STR}$`);
var GIT_REPO_REGEX = /^(?:git|ssh|https?|git@[-\w.]+):(\/\/)?(.*?)(\/?|#[-\d\w._:/]+?)$/;
var DNS_SAFE_NAME_REGEX = /^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9])$/;
var APIFY_PROXY_VALUE_REGEX = /^[\w._~]+$/;
var PROXY_URL_REGEX = /^(socks(4|4a|5|5h)?|https?):\/\/(([^:]+:)?[^@]*@)?[^.:@]+\.[^:]+:[\d]+?$/;
var KEY_VALUE_STORE_KEY_REGEX = /^([a-zA-Z0-9!\-_.'()]{1,256})$/;
var GITHUB_REGEX_STR = "[a-z\\d](?:[a-z\\d]|-(?=[a-z\\d])){0,38}";
var TWITTER_REGEX = /^@[a-z0-9_]{1,15}$/i;
var GITHUB_REGEX = new RegExp(`^${GITHUB_REGEX_STR}$`, "i");
var LINKEDIN_PROFILE_REGEX = /^(https?:\/\/)?(www\.)?([a-z]{2}\.)?linkedin.com\/(in|company)\/([A-Za-z0-9_-]+)\/?$/;
var URL_REGEX = /^https?:\/\//i;
var HTTP_URL_REGEX = (/* unused pure expression or super */ null && (new RegExp(
  "^(?:(?:(?:https?):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+(?:[a-z\\u00a1-\\uffff]{2,}\\.?|xn--[a-z0-9]+))(?::\\d{2,5})?(?:[/?#]\\S*)?$",
  "i"
)));
var GITHUB_GIST_URL_REGEX = new RegExp(`^https:\\/\\/gist\\.github\\.com\\/${GITHUB_REGEX_STR}\\/[0-9a-f]{32}$`, "i");
var SPLIT_PATH_REGEX = /[^/]+/g;
var RELATIVE_URL_REGEX = /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\|\/\/).*/i;
var CONTACT_LINK_REGEX = /^(mailto|tel|sms):.*$/i;
var APIFY_ID_REGEX = /[a-zA-Z0-9]{17}/;

// src/consts.ts
var FREE_SUBSCRIPTION_PLAN_CODE = "DEV";
var ACTOR_JOB_TYPES = {
  BUILD: "BUILD",
  RUN: "RUN"
};
var ACTOR_SOURCE_TYPES = {
  SOURCE_CODE: "SOURCE_CODE",
  SOURCE_FILES: "SOURCE_FILES",
  GIT_REPO: "GIT_REPO",
  TARBALL: "TARBALL",
  GITHUB_GIST: "GITHUB_GIST"
};
var ACTOR_EVENT_NAMES = {
  CPU_INFO: "cpuInfo",
  SYSTEM_INFO: "systemInfo",
  MIGRATING: "migrating",
  PERSIST_STATE: "persistState",
  ABORTING: "aborting"
};
var ACTOR_JOB_STATUSES = {
  READY: "READY",
  // started but not allocated to any worker yet
  RUNNING: "RUNNING",
  // running on worker
  SUCCEEDED: "SUCCEEDED",
  // finished and all good
  FAILED: "FAILED",
  // run or build failed
  TIMING_OUT: "TIMING-OUT",
  // timing out now
  TIMED_OUT: "TIMED-OUT",
  // timed out
  ABORTING: "ABORTING",
  // being aborted by user
  ABORTED: "ABORTED"
  // aborted by user
};
var WEBHOOK_DISPATCH_STATUSES = {
  ACTIVE: "ACTIVE",
  // Attempting to deliver the webhook
  SUCCEEDED: "SUCCEEDED",
  // Webhook was delivered
  FAILED: "FAILED"
  // All calls to webhook target URL failed
};
var ACTOR_JOB_TERMINAL_STATUSES = [
  ACTOR_JOB_STATUSES.SUCCEEDED,
  ACTOR_JOB_STATUSES.FAILED,
  ACTOR_JOB_STATUSES.TIMED_OUT,
  ACTOR_JOB_STATUSES.ABORTED
];
var WORKER_SERVICE_TYPES = {
  CRAWLING: "crawling",
  ACTOR: "actor"
};
var META_ORIGINS = {
  DEVELOPMENT: "DEVELOPMENT",
  // Job started from Developer console in Source section of actor
  WEB: "WEB",
  // Job started from other place on the website (either console or task detail page)
  API: "API",
  // Job started through API
  SCHEDULER: "SCHEDULER",
  // Job started through Scheduler
  TEST: "TEST",
  // Job started through test actor page
  WEBHOOK: "WEBHOOK",
  // Job started by the webhook
  ACTOR: "ACTOR",
  // Job started by another actor run
  CLI: "CLI",
  // Job started by apify CLI
  STANDBY: "STANDBY"
  // Job started by Actor Standby
};
var DOCKER_LABELS = {
  ACTOR_BUILD_ID: "com.apify.actBuildId",
  ACTOR_RUN_ID: "com.apify.actRunId",
  // Kept for backwards compatibility, will be removed soon (TODO: remove old usages!)
  /** @deprecated Use ACTOR_BUILD_ID instead! */
  ACT_BUILD_ID: "com.apify.actBuildId",
  /** @deprecated Use ACTOR_RUN_ID instead! */
  ACT_RUN_ID: "com.apify.actRunId"
};
var ACTOR_TYPES = {
  ACT: "acts",
  CRAWLER: "crawlers"
};
var ME_USER_NAME_PLACEHOLDER = "me";
var ANONYMOUS_USERNAME = "anonymous";
var USERNAME = {
  MIN_LENGTH: 3,
  MAX_LENGTH: 30,
  // Regex matching a potentially allowed username. The numbers must match MIN and MAX!
  // Note that username must also pass isForbiddenUser() test to be allowed!
  REGEX: /^[a-zA-Z0-9_.-]{3,30}$/
};
var EMAIL = {
  MAX_LENGTH: 254,
  // see https://www.rfc-editor.org/errata_search.php?rfc=3696&eid=1690
  REGEX: EMAIL_REGEX
};
var PROFILE_NAME = {
  MAX_LENGTH: 50,
  REGEX: /^(?!.*:\/\/)[^@><]*$/
  // Prohibits usage of @, <, > and ://
};
var DNS_SAFE_NAME_MAX_LENGTH = 63;
var ACTOR_NAME = {
  MIN_LENGTH: 3,
  MAX_LENGTH: DNS_SAFE_NAME_MAX_LENGTH,
  // DNS-safe string length
  REGEX: DNS_SAFE_NAME_REGEX
};
var SHORT_CRAWLER_ID_LENGTH = 5;
var BUILD_TAG_LATEST = "latest";
var ACTOR_RESTART_ON_ERROR = {
  MAX_RESTARTS: 3,
  // This needs to be low enough so that it only covers restart loops, rather than e.g.
  // errors during crawling of large lists of URLs
  INTERVAL_MILLIS: 1 * 60 * 1e3
};
var ACT_RESTART_ON_ERROR = (/* unused pure expression or super */ null && (ACTOR_RESTART_ON_ERROR));
var ACT_JOB_TYPES = (/* unused pure expression or super */ null && (ACTOR_JOB_TYPES));
var ACT_SOURCE_TYPES = (/* unused pure expression or super */ null && (ACTOR_SOURCE_TYPES));
var ACT_JOB_STATUSES = (/* unused pure expression or super */ null && (ACTOR_JOB_STATUSES));
var ACT_JOB_TERMINAL_STATUSES = (/* unused pure expression or super */ null && (ACTOR_JOB_TERMINAL_STATUSES));
var ACT_TYPES = (/* unused pure expression or super */ null && (ACTOR_TYPES));
var COMPUTE_UNIT_MB = 1024;
var COMPUTE_UNIT_MILLIS = (/* unused pure expression or super */ null && (60 * 60 * 1e3));
var ACTOR_LIMITS = {
  // The actualy used limit is taken from private package @apify-packages/consts
  BUILD_DEFAULT_MEMORY_MBYTES: 4096,
  // Maximum duration of build in seconds.
  BUILD_TIMEOUT_SECS: 1800,
  // For each build or run container, set disk quota based on memory size
  RUN_DISK_TO_MEMORY_SIZE_COEFF: 2,
  // For each build or run container, set CPU cores based on memory size
  RUN_MEMORY_MBYTES_PER_CPU_CORE: 4096,
  // The default limit of memory for all running Actor jobs for free accounts.
  FREE_ACCOUNT_MAX_MEMORY_MBYTES: 8192,
  // The default limit of memory for all running Actor jobs for paid accounts.
  PAID_ACCOUNT_MAX_MEMORY_MBYTES: 65536,
  // Minimum and maximum memory for a single act run.
  MIN_RUN_MEMORY_MBYTES: 128,
  MAX_RUN_MEMORY_MBYTES: 32768,
  // Maximum size of actor input schema.
  INPUT_SCHEMA_MAX_BYTES: 500 * 1024,
  // Max length of run/build log in number of characters
  LOG_MAX_CHARS: 10 * 1024 * 1024
};
var DEFAULT_PLATFORM_LIMITS = {
  // Maximum number of actors per user
  MAX_ACTORS_PER_USER: 500,
  // Maximum number of tasks per user
  MAX_TASKS_PER_USER: 5e3,
  // Maximum number of schedules per user
  MAX_SCHEDULES_PER_USER: 100,
  // Maximum number of webhooks per user
  MAX_WEBHOOKS_PER_USER: 100,
  // Maximum number of concurrent actor runs per user for free accounts.
  FREE_ACCOUNT_MAX_CONCURRENT_ACTOR_RUNS_PER_USER: 25,
  // Maximum number of concurrent actor runs per user for paid accounts.
  PAID_ACCOUNT_MAX_CONCURRENT_ACTOR_RUNS_PER_USER: 250,
  // Maximum number of actors per scheduler
  MAX_ACTORS_PER_SCHEDULER: 10,
  // Maximum number of tasks per scheduler
  MAX_TASKS_PER_SCHEDULER: 10
};
var REQUEST_QUEUE_HEAD_MAX_LIMIT = 1e3;
var APIFY_ENV_VARS = {
  API_BASE_URL: "APIFY_API_BASE_URL",
  API_PUBLIC_BASE_URL: "APIFY_API_PUBLIC_BASE_URL",
  CHROME_EXECUTABLE_PATH: "APIFY_CHROME_EXECUTABLE_PATH",
  DEDICATED_CPUS: "APIFY_DEDICATED_CPUS",
  DISABLE_OUTDATED_WARNING: "APIFY_DISABLE_OUTDATED_WARNING",
  FACT: "APIFY_FACT",
  HEADLESS: "APIFY_HEADLESS",
  INPUT_SECRETS_PRIVATE_KEY_FILE: "APIFY_INPUT_SECRETS_PRIVATE_KEY_FILE",
  INPUT_SECRETS_PRIVATE_KEY_PASSPHRASE: "APIFY_INPUT_SECRETS_PRIVATE_KEY_PASSPHRASE",
  IS_AT_HOME: "APIFY_IS_AT_HOME",
  LOCAL_STORAGE_DIR: "APIFY_LOCAL_STORAGE_DIR",
  LOG_FORMAT: "APIFY_LOG_FORMAT",
  LOG_LEVEL: "APIFY_LOG_LEVEL",
  METAMORPH_AFTER_SLEEP_MILLIS: "APIFY_METAMORPH_AFTER_SLEEP_MILLIS",
  META_ORIGIN: "APIFY_META_ORIGIN",
  PERSIST_STATE_INTERVAL_MILLIS: "APIFY_PERSIST_STATE_INTERVAL_MILLIS",
  PROXY_HOSTNAME: "APIFY_PROXY_HOSTNAME",
  PROXY_PASSWORD: "APIFY_PROXY_PASSWORD",
  PROXY_PORT: "APIFY_PROXY_PORT",
  PROXY_STATUS_URL: "APIFY_PROXY_STATUS_URL",
  PURGE_ON_START: "APIFY_PURGE_ON_START",
  SDK_LATEST_VERSION: "APIFY_SDK_LATEST_VERSION",
  SYSTEM_INFO_INTERVAL_MILLIS: "APIFY_SYSTEM_INFO_INTERVAL_MILLIS",
  TOKEN: "APIFY_TOKEN",
  USER_ID: "APIFY_USER_ID",
  USER_IS_PAYING: "APIFY_USER_IS_PAYING",
  USER_PRICING_TIER: "APIFY_USER_PRICING_TIER",
  WORKFLOW_KEY: "APIFY_WORKFLOW_KEY",
  XVFB: "APIFY_XVFB",
  // Replaced by ACTOR_ENV_VARS, kept for backward compatibility:
  ACTOR_BUILD_ID: "APIFY_ACTOR_BUILD_ID",
  ACTOR_BUILD_NUMBER: "APIFY_ACTOR_BUILD_NUMBER",
  ACTOR_EVENTS_WS_URL: "APIFY_ACTOR_EVENTS_WS_URL",
  ACTOR_ID: "APIFY_ACTOR_ID",
  ACTOR_MAX_PAID_DATASET_ITEMS: "ACTOR_MAX_PAID_DATASET_ITEMS",
  ACTOR_RUN_ID: "APIFY_ACTOR_RUN_ID",
  ACTOR_TASK_ID: "APIFY_ACTOR_TASK_ID",
  CONTAINER_PORT: "APIFY_CONTAINER_PORT",
  CONTAINER_URL: "APIFY_CONTAINER_URL",
  DEFAULT_DATASET_ID: "APIFY_DEFAULT_DATASET_ID",
  DEFAULT_KEY_VALUE_STORE_ID: "APIFY_DEFAULT_KEY_VALUE_STORE_ID",
  DEFAULT_REQUEST_QUEUE_ID: "APIFY_DEFAULT_REQUEST_QUEUE_ID",
  INPUT_KEY: "APIFY_INPUT_KEY",
  MEMORY_MBYTES: "APIFY_MEMORY_MBYTES",
  STARTED_AT: "APIFY_STARTED_AT",
  TIMEOUT_AT: "APIFY_TIMEOUT_AT",
  // Deprecated, keep them for backward compatibility:
  ACT_ID: "APIFY_ACT_ID",
  ACT_RUN_ID: "APIFY_ACT_RUN_ID"
};
var ENV_VARS = (/* unused pure expression or super */ null && (APIFY_ENV_VARS));
var ACTOR_ENV_VARS = {
  BUILD_ID: "ACTOR_BUILD_ID",
  BUILD_NUMBER: "ACTOR_BUILD_NUMBER",
  BUILD_TAGS: "ACTOR_BUILD_TAGS",
  DEFAULT_DATASET_ID: "ACTOR_DEFAULT_DATASET_ID",
  DEFAULT_KEY_VALUE_STORE_ID: "ACTOR_DEFAULT_KEY_VALUE_STORE_ID",
  DEFAULT_REQUEST_QUEUE_ID: "ACTOR_DEFAULT_REQUEST_QUEUE_ID",
  EVENTS_WEBSOCKET_URL: "ACTOR_EVENTS_WEBSOCKET_URL",
  FULL_NAME: "ACTOR_FULL_NAME",
  ID: "ACTOR_ID",
  INPUT_KEY: "ACTOR_INPUT_KEY",
  MAX_PAID_DATASET_ITEMS: "ACTOR_MAX_PAID_DATASET_ITEMS",
  MAX_TOTAL_CHARGE_USD: "ACTOR_MAX_TOTAL_CHARGE_USD",
  MEMORY_MBYTES: "ACTOR_MEMORY_MBYTES",
  RUN_ID: "ACTOR_RUN_ID",
  STANDBY_PORT: "ACTOR_STANDBY_PORT",
  STANDBY_URL: "ACTOR_STANDBY_URL",
  STARTED_AT: "ACTOR_STARTED_AT",
  TASK_ID: "ACTOR_TASK_ID",
  TIMEOUT_AT: "ACTOR_TIMEOUT_AT",
  WEB_SERVER_PORT: "ACTOR_WEB_SERVER_PORT",
  WEB_SERVER_URL: "ACTOR_WEB_SERVER_URL"
};
var INTEGER_ENV_VARS = [
  // Actor env vars
  ACTOR_ENV_VARS.MAX_PAID_DATASET_ITEMS,
  ACTOR_ENV_VARS.MEMORY_MBYTES,
  ACTOR_ENV_VARS.STANDBY_PORT,
  ACTOR_ENV_VARS.WEB_SERVER_PORT,
  // Apify env vars
  APIFY_ENV_VARS.ACTOR_MAX_PAID_DATASET_ITEMS,
  APIFY_ENV_VARS.CONTAINER_PORT,
  APIFY_ENV_VARS.DEDICATED_CPUS,
  APIFY_ENV_VARS.MEMORY_MBYTES,
  APIFY_ENV_VARS.METAMORPH_AFTER_SLEEP_MILLIS,
  APIFY_ENV_VARS.PERSIST_STATE_INTERVAL_MILLIS,
  APIFY_ENV_VARS.PROXY_PORT,
  APIFY_ENV_VARS.SYSTEM_INFO_INTERVAL_MILLIS
];
var COMMA_SEPARATED_LIST_ENV_VARS = [
  ACTOR_ENV_VARS.BUILD_TAGS
];
var ACTOR_BUILD_ARGS = {
  ACTOR_PATH_IN_DOCKER_CONTEXT: "ACTOR_PATH_IN_DOCKER_CONTEXT"
};
var DEFAULT_CONTAINER_PORT = 4321;
var DEFAULT_ACTOR_STANDBY_PORT = (/* unused pure expression or super */ null && (DEFAULT_CONTAINER_PORT));
var LOCAL_STORAGE_SUBDIRS = {
  datasets: "datasets",
  keyValueStores: "key_value_stores",
  requestQueues: "request_queues"
};
var LOCAL_ACTOR_ENV_VARS = {
  [ACTOR_ENV_VARS.STANDBY_PORT]: DEFAULT_CONTAINER_PORT.toString(),
  [ACTOR_ENV_VARS.DEFAULT_DATASET_ID]: "default",
  [ACTOR_ENV_VARS.DEFAULT_KEY_VALUE_STORE_ID]: "default",
  [ACTOR_ENV_VARS.DEFAULT_REQUEST_QUEUE_ID]: "default",
  [ACTOR_ENV_VARS.WEB_SERVER_PORT]: DEFAULT_CONTAINER_PORT.toString(),
  [ACTOR_ENV_VARS.WEB_SERVER_URL]: `http://localhost:${DEFAULT_CONTAINER_PORT}`
  // Must match port line above!
};
var LOCAL_APIFY_ENV_VARS = {
  [APIFY_ENV_VARS.CONTAINER_PORT]: LOCAL_ACTOR_ENV_VARS.ACTOR_WEB_SERVER_PORT,
  [APIFY_ENV_VARS.CONTAINER_URL]: LOCAL_ACTOR_ENV_VARS.ACTOR_WEB_SERVER_URL,
  [APIFY_ENV_VARS.DEFAULT_DATASET_ID]: LOCAL_ACTOR_ENV_VARS.ACTOR_DEFAULT_DATASET_ID,
  [APIFY_ENV_VARS.DEFAULT_KEY_VALUE_STORE_ID]: LOCAL_ACTOR_ENV_VARS.ACTOR_DEFAULT_KEY_VALUE_STORE_ID,
  [APIFY_ENV_VARS.DEFAULT_REQUEST_QUEUE_ID]: LOCAL_ACTOR_ENV_VARS.ACTOR_DEFAULT_REQUEST_QUEUE_ID,
  [APIFY_ENV_VARS.PROXY_HOSTNAME]: "proxy.apify.com",
  [APIFY_ENV_VARS.PROXY_PORT]: 8e3.toString()
};
var LOCAL_ENV_VARS = (/* unused pure expression or super */ null && (LOCAL_APIFY_ENV_VARS));
var KEY_VALUE_STORE_KEYS = {
  INPUT: "INPUT",
  OUTPUT: "OUTPUT"
};
var MAX_PAYLOAD_SIZE_BYTES = 9437184;
var ACTOR_CATEGORIES = {
  AI: "AI",
  AGENTS: "Agents",
  AUTOMATION: "Automation",
  BUSINESS: "Business",
  COVID_19: "Covid-19",
  DEVELOPER_EXAMPLES: "Developer examples",
  DEVELOPER_TOOLS: "Developer tools",
  ECOMMERCE: "E-commerce",
  FOR_CREATORS: "For creators",
  GAMES: "Games",
  JOBS: "Jobs",
  LEAD_GENERATION: "Lead generation",
  MARKETING: "Marketing",
  NEWS: "News",
  SEO_TOOLS: "SEO tools",
  SOCIAL_MEDIA: "Social media",
  TRAVEL: "Travel",
  VIDEOS: "Videos",
  REAL_ESTATE: "Real estate",
  SPORTS: "Sports",
  EDUCATION: "Education",
  INTEGRATIONS: "Integrations",
  OTHER: "Other",
  OPEN_SOURCE: "Open source",
  MCP_SERVERS: "MCP servers"
};
var ALL_ACTOR_CATEGORIES = {
  ...ACTOR_CATEGORIES
  // ...LEGACY_ACTOR_CATEGORIES,
};
var VERSION_INT_MAJOR_BASE = 1e7;
var VERSION_INT_MINOR_BASE = 1e5;
var USER_BASIC_TEXT_XSS_OPTIONS = {
  whiteList: {
    a: ["href", "title", "target"],
    code: [],
    strong: [],
    b: [],
    br: [],
    ul: [],
    li: [],
    ol: [],
    i: [],
    u: [],
    p: []
  }
};
var WEBHOOK_EVENT_TYPES = {
  ACTOR_RUN_CREATED: "ACTOR.RUN.CREATED",
  ACTOR_RUN_SUCCEEDED: "ACTOR.RUN.SUCCEEDED",
  ACTOR_RUN_FAILED: "ACTOR.RUN.FAILED",
  ACTOR_RUN_TIMED_OUT: "ACTOR.RUN.TIMED_OUT",
  ACTOR_RUN_ABORTED: "ACTOR.RUN.ABORTED",
  ACTOR_RUN_RESURRECTED: "ACTOR.RUN.RESURRECTED",
  ACTOR_BUILD_CREATED: "ACTOR.BUILD.CREATED",
  ACTOR_BUILD_SUCCEEDED: "ACTOR.BUILD.SUCCEEDED",
  ACTOR_BUILD_FAILED: "ACTOR.BUILD.FAILED",
  ACTOR_BUILD_TIMED_OUT: "ACTOR.BUILD.TIMED_OUT",
  ACTOR_BUILD_ABORTED: "ACTOR.BUILD.ABORTED",
  TEST: "TEST"
};
var WEBHOOK_EVENT_TYPE_GROUPS = {
  ACTOR_RUN: [
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_CREATED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_SUCCEEDED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_FAILED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_TIMED_OUT,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_ABORTED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_RESURRECTED
  ],
  ACTOR_BUILD: [
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_CREATED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_SUCCEEDED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_FAILED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_TIMED_OUT,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_ABORTED
  ],
  // If one of these occurs then we can be sure that none other can occur for the same triggerer.
  ACTOR_RUN_TERMINAL: [
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_SUCCEEDED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_FAILED,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_TIMED_OUT,
    WEBHOOK_EVENT_TYPES.ACTOR_RUN_ABORTED
  ],
  ACTOR_BUILD_TERMINAL: [
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_SUCCEEDED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_FAILED,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_TIMED_OUT,
    WEBHOOK_EVENT_TYPES.ACTOR_BUILD_ABORTED
  ]
};
var WEBHOOK_DEFAULT_PAYLOAD_TEMPLATE = (/* unused pure expression or super */ null && (`{
    "userId": {{userId}},
    "createdAt": {{createdAt}},
    "eventType": {{eventType}},
    "eventData": {{eventData}},
    "resource": {{resource}}
}`));
var WEBHOOK_ALLOWED_PAYLOAD_VARIABLES = /* @__PURE__ */ new Set([
  "userId",
  "createdAt",
  "eventType",
  "eventData",
  "resource"
]);
var MAX_MULTIFILE_BYTES = (/* unused pure expression or super */ null && (3 * 1024 ** 2));
var SOURCE_FILE_FORMATS = {
  TEXT: "TEXT",
  BASE64: "BASE64"
};
var PROJECT_STATUSES = {
  REQUEST: "REQUEST",
  SPECIFICATION: "SPECIFICATION",
  OFFERS: "OFFERS",
  DEPOSIT: "DEPOSIT",
  DEPOSIT_PAID: "DEPOSIT_PAID",
  NEW: "NEW",
  IN_PROGRESS: "IN_PROGRESS",
  QA: "QA",
  CUSTOMER_QA: "CUSTOMER_QA",
  READY_FOR_INVOICE: "READY_FOR_INVOICE",
  INVOICED: "INVOICED",
  PAID: "PAID",
  DELIVERED: "DELIVERED",
  CLOSED: "CLOSED",
  FINISHED: "FINISHED"
};
var FINISHED_PROJECT_STATUSES = [
  PROJECT_STATUSES.READY_FOR_INVOICE,
  PROJECT_STATUSES.INVOICED,
  PROJECT_STATUSES.PAID,
  PROJECT_STATUSES.DELIVERED,
  PROJECT_STATUSES.FINISHED
];
var MARKETPLACE_USER_ROLES = {
  DEVELOPER: "DEVELOPER",
  DATA_EXPERT: "DATA_EXPERT",
  CUSTOMER: "CUSTOMER"
};
var USER_PERSONA_TYPES = {
  DEVELOPER: "DEVELOPER",
  USER: "USER"
};
var GIT_MAIN_BRANCH = "main";
var REQUEST_QUEUE_MAX_REQUESTS_PER_BATCH_OPERATION = 25;
var ISSUES_STATUS_TYPES = {
  OPEN: "OPEN",
  CLOSED: "CLOSED"
};
var ISSUES_STATUS_ALL = "ALL";
var STORAGE_GENERAL_ACCESS = {
  /** Respect the user setting of the storage owner (default behavior). */
  FOLLOW_USER_SETTING: "FOLLOW_USER_SETTING",
  /** Only signed-in users with explicit access can read this storage. */
  RESTRICTED: "RESTRICTED",
  /** Anyone with a link, or the unique storage ID, can read the storage. */
  ANYONE_WITH_ID_CAN_READ: "ANYONE_WITH_ID_CAN_READ",
  /** Anyone with a link, the unique storage ID, or the storage name, can read the storage. */
  ANYONE_WITH_NAME_CAN_READ: "ANYONE_WITH_NAME_CAN_READ"
};
var RUN_GENERAL_ACCESS = {
  /** Respect the user setting of the run owner (default behavior). */
  FOLLOW_USER_SETTING: "FOLLOW_USER_SETTING",
  /** Only signed-in users with explicit access can read this run. */
  RESTRICTED: "RESTRICTED",
  /** Anyone with a link, or the unique run ID, can read the run. */
  ANYONE_WITH_ID_CAN_READ: "ANYONE_WITH_ID_CAN_READ"
};
var ACTOR_PERMISSION_LEVEL = {
  /** Full permission Actors have access to all user data in the account. */
  FULL_PERMISSIONS: "FULL_PERMISSIONS",
  /**
   * Limited permission Actors have access only to specific resources:
   * - default storages
   * - storages provided via input
   * - the current run
   * - ...
   *
   * Broadly speaking, limited permission Actors cannot access any account data not related to the current run.
   * For details refer to the Apify documentation.
   */
  LIMITED_PERMISSIONS: "LIMITED_PERMISSIONS"
};

//# sourceMappingURL=index.mjs.map

/***/ }),

/***/ 6058:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   Ay: () => (/* binding */ index_default)
/* harmony export */ });
/* unused harmony exports IS_APIFY_LOGGER_EXCEPTION, LEVELS, LEVEL_TO_STRING, Log, LogFormat, LogLevel, Logger, LoggerJson, LoggerText, PREFIX_DELIMITER, getFormatFromEnv, getLevelFromEnv, limitDepth, truncate */
/* harmony import */ var _apify_consts__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(6158);
/* harmony import */ var events__WEBPACK_IMPORTED_MODULE_1__ = __nccwpck_require__(4434);
/* harmony import */ var ansi_colors__WEBPACK_IMPORTED_MODULE_2__ = __nccwpck_require__(7182);
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/log_consts.ts
var LogLevel = /* @__PURE__ */ ((LogLevel2) => {
  LogLevel2[LogLevel2["OFF"] = 0] = "OFF";
  LogLevel2[LogLevel2["ERROR"] = 1] = "ERROR";
  LogLevel2[LogLevel2["SOFT_FAIL"] = 2] = "SOFT_FAIL";
  LogLevel2[LogLevel2["WARNING"] = 3] = "WARNING";
  LogLevel2[LogLevel2["INFO"] = 4] = "INFO";
  LogLevel2[LogLevel2["DEBUG"] = 5] = "DEBUG";
  LogLevel2[LogLevel2["PERF"] = 6] = "PERF";
  return LogLevel2;
})(LogLevel || {});
var LogFormat = /* @__PURE__ */ ((LogFormat2) => {
  LogFormat2["JSON"] = "JSON";
  LogFormat2["TEXT"] = "TEXT";
  return LogFormat2;
})(LogFormat || {});
var PREFIX_DELIMITER = ":";
var LEVELS = (/* unused pure expression or super */ null && (LogLevel));
var LEVEL_TO_STRING = Object.keys(LogLevel).filter((x) => Number.isNaN(+x));
var IS_APIFY_LOGGER_EXCEPTION = Symbol("apify.processed_error");

// src/log_helpers.ts

function truncate(str, maxLength, suffix = "...[truncated]") {
  maxLength = Math.floor(maxLength);
  if (suffix.length > maxLength) {
    throw new Error("suffix string cannot be longer than maxLength");
  }
  if (typeof str === "string" && str.length > maxLength) {
    str = str.substr(0, maxLength - suffix.length) + suffix;
  }
  return str;
}
__name(truncate, "truncate");
function getLevelFromEnv() {
  const envVar = process.env[_apify_consts__WEBPACK_IMPORTED_MODULE_0__/* .APIFY_ENV_VARS */ .BW.LOG_LEVEL];
  if (!envVar) return 4 /* INFO */;
  if (Number.isFinite(+envVar)) return +envVar;
  if (LogLevel[envVar]) return LogLevel[envVar];
  return +envVar;
}
__name(getLevelFromEnv, "getLevelFromEnv");
function getFormatFromEnv() {
  const envVar = process.env[_apify_consts__WEBPACK_IMPORTED_MODULE_0__/* .APIFY_ENV_VARS */ .BW.LOG_FORMAT] || "TEXT" /* TEXT */;
  switch (envVar.toLowerCase()) {
    case "JSON" /* JSON */.toLowerCase():
      return "JSON" /* JSON */;
    case "TEXT" /* TEXT */.toLowerCase():
      return "TEXT" /* TEXT */;
    default:
      console.warn(`Unknown value for environment variable ${_apify_consts__WEBPACK_IMPORTED_MODULE_0__/* .APIFY_ENV_VARS */ .BW.LOG_FORMAT}: ${envVar}`);
      return "TEXT" /* TEXT */;
  }
}
__name(getFormatFromEnv, "getFormatFromEnv");
function limitDepth(record, depth, maxStringLength) {
  if (typeof record === "string") {
    return maxStringLength && record.length > maxStringLength ? truncate(record, maxStringLength) : record;
  }
  if (["number", "boolean", "symbol", "bigint"].includes(typeof record) || record == null || record instanceof Date) {
    return record;
  }
  if (record instanceof Error) {
    const { name, message, stack, cause, ...rest } = record;
    record = { name, message, stack, cause, ...rest, [IS_APIFY_LOGGER_EXCEPTION]: true };
  }
  const nextCall = /* @__PURE__ */ __name((rec) => limitDepth(rec, depth - 1, maxStringLength), "nextCall");
  if (Array.isArray(record)) {
    return depth ? record.map(nextCall) : "[array]";
  }
  if (typeof record === "object" && record !== null) {
    const mapObject = /* @__PURE__ */ __name((obj) => {
      const res = {};
      Reflect.ownKeys(obj).forEach((key) => {
        res[key] = nextCall(obj[key]);
      });
      return res;
    }, "mapObject");
    return depth ? mapObject(record) : "[object]";
  }
  if (typeof record === "function") {
    return "[function]";
  }
  console.log(`WARNING: Object cannot be logged: ${record}`);
  return void 0;
}
__name(limitDepth, "limitDepth");

// src/logger.ts

var _Logger = class _Logger extends events__WEBPACK_IMPORTED_MODULE_1__.EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }
  setOptions(options) {
    this.options = { ...this.options, ...options };
  }
  getOptions() {
    return this.options;
  }
  _outputWithConsole(level, line) {
    switch (level) {
      case 1 /* ERROR */:
        console.error(line);
        break;
      case 3 /* WARNING */:
        console.warn(line);
        break;
      case 5 /* DEBUG */:
        console.debug(line);
        break;
      default:
        console.log(line);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _log(level, message, data, exception, opts = {}) {
    throw new Error("log() method must be implemented!");
  }
  log(level, message, ...args) {
    const line = this._log(level, message, ...args);
    this.emit("line", line);
  }
};
__name(_Logger, "Logger");
var Logger = _Logger;

// src/logger_json.ts
var DEFAULT_OPTIONS = {
  skipLevelInfo: false,
  skipTime: false
};
var _LoggerJson = class _LoggerJson extends Logger {
  constructor(options = {}) {
    super({ ...DEFAULT_OPTIONS, ...options });
  }
  _log(level, message, data, exception, opts = {}) {
    const { prefix, suffix } = opts;
    if (exception) data = { ...data, exception };
    if (prefix) message = `${prefix}${PREFIX_DELIMITER} ${message}`;
    if (suffix) message = `${message} ${suffix}`;
    const rec = {
      time: !this.options.skipTime ? /* @__PURE__ */ new Date() : void 0,
      level: this.options.skipLevelInfo && level === 4 /* INFO */ ? void 0 : LogLevel[level],
      msg: message,
      ...data
    };
    const line = JSON.stringify(rec);
    this._outputWithConsole(level, line);
    return line;
  }
};
__name(_LoggerJson, "LoggerJson");
var LoggerJson = _LoggerJson;

// src/logger_text.ts


// src/node_internals.ts

function identicalSequenceRange(a, b) {
  for (let i = 0; i < a.length - 3; i++) {
    const pos = b.indexOf(a[i]);
    if (pos !== -1) {
      const rest = b.length - pos;
      if (rest > 3) {
        let len = 1;
        const maxLen = Math.min(a.length - i, rest);
        while (maxLen > len && a[i + len] === b[pos + len]) {
          len++;
        }
        if (len > 3) {
          return { len, offset: i };
        }
      }
    }
  }
  return { len: 0, offset: 0 };
}
__name(identicalSequenceRange, "identicalSequenceRange");
function getStackString(error) {
  return error.stack ? String(error.stack) : Error.prototype.toString.call(error);
}
__name(getStackString, "getStackString");
function getStackFrames(err, stack) {
  const frames = stack.split("\n");
  let cause;
  try {
    ({ cause } = err);
  } catch {
  }
  if (cause != null && typeof cause === "object" && IS_APIFY_LOGGER_EXCEPTION in cause) {
    const causeStack = getStackString(cause);
    const causeStackStart = causeStack.indexOf("\n    at");
    if (causeStackStart !== -1) {
      const causeFrames = causeStack.slice(causeStackStart + 1).split("\n");
      const { len, offset } = identicalSequenceRange(frames, causeFrames);
      if (len > 0) {
        const skipped = len - 2;
        const msg = `    ... ${skipped} lines matching cause stack trace ...`;
        frames.splice(offset + 1, skipped, ansi_colors__WEBPACK_IMPORTED_MODULE_2__.grey(msg));
      }
    }
  }
  return frames;
}
__name(getStackFrames, "getStackFrames");

// src/logger_text.ts
var SHORTEN_LEVELS = {
  SOFT_FAIL: "SFAIL",
  WARNING: "WARN"
};
var LEVEL_TO_COLOR = {
  [1 /* ERROR */]: "red",
  [2 /* SOFT_FAIL */]: "red",
  [3 /* WARNING */]: "yellow",
  [4 /* INFO */]: "green",
  [5 /* DEBUG */]: "blue",
  [6 /* PERF */]: "magenta"
};
var SHORTENED_LOG_LEVELS = LEVEL_TO_STRING.map((level) => SHORTEN_LEVELS[level] || level);
var MAX_LEVEL_LENGTH_SPACES = Math.max(...SHORTENED_LOG_LEVELS.map((l) => l.length));
var getLevelIndent = /* @__PURE__ */ __name((level) => {
  let spaces = "";
  for (let i = 0; i < MAX_LEVEL_LENGTH_SPACES - level.length; i++) spaces += " ";
  return spaces;
}, "getLevelIndent");
var DEFAULT_OPTIONS2 = {
  skipTime: true
};
var _LoggerText = class _LoggerText extends Logger {
  constructor(options = {}) {
    super({ ...DEFAULT_OPTIONS2, ...options });
  }
  _log(level, message, data, exception, opts = {}) {
    let { prefix, suffix } = opts;
    let maybeDate = "";
    if (!this.options.skipTime) {
      maybeDate = `${(/* @__PURE__ */ new Date()).toISOString().replace("Z", "").replace("T", " ")} `;
    }
    const errStack = exception ? this._parseException(exception) : "";
    const color = LEVEL_TO_COLOR[level];
    const levelStr = SHORTENED_LOG_LEVELS[level];
    const levelIndent = getLevelIndent(levelStr);
    const dataStr = !data ? "" : ` ${JSON.stringify(data)}`;
    prefix = prefix ? ` ${prefix}${PREFIX_DELIMITER}` : "";
    suffix = suffix ? ` ${suffix}` : "";
    const line = `${ansi_colors__WEBPACK_IMPORTED_MODULE_2__.gray(maybeDate)}${ansi_colors__WEBPACK_IMPORTED_MODULE_2__[color](levelStr)}${levelIndent}${ansi_colors__WEBPACK_IMPORTED_MODULE_2__.yellow(prefix)} ${message || ""}${ansi_colors__WEBPACK_IMPORTED_MODULE_2__.gray(dataStr)}${ansi_colors__WEBPACK_IMPORTED_MODULE_2__.yellow(suffix)}${errStack}`;
    this._outputWithConsole(level, line);
    return line;
  }
  _parseException(exception, indentLevel = 1) {
    if (["string", "boolean", "number", "undefined", "bigint"].includes(typeof exception)) {
      return `
${exception}`;
    }
    if (exception === null) {
      return "\nnull";
    }
    if (typeof exception === "symbol") {
      return `
${exception.toString()}`;
    }
    if (typeof exception === "object" && IS_APIFY_LOGGER_EXCEPTION in exception) {
      return this._parseLoggerException(exception, indentLevel);
    }
    return `
${JSON.stringify(exception, null, 2)}`;
  }
  _parseLoggerException(exception, indentLevel = 1) {
    const errDetails = [];
    if (exception.type) {
      errDetails.push(`type=${exception.type}`);
    }
    if (exception.details) {
      Object.entries(exception.details).map(([key, val]) => errDetails.push(`${key}=${val}`));
    }
    const errorString = exception.stack || exception.reason || exception.message;
    const isStack = errorString === exception.stack;
    const errorLines = getStackFrames(exception, errorString);
    if (isStack) {
      errorLines[0] = exception.message || errorLines[0];
    }
    if (errDetails.length) {
      errorLines[0] += ansi_colors__WEBPACK_IMPORTED_MODULE_2__.gray(`(details: ${errDetails.join(", ")})`);
    }
    for (let i = 1; i < errorLines.length; i++) {
      errorLines[i] = ansi_colors__WEBPACK_IMPORTED_MODULE_2__.gray(errorLines[i]);
    }
    if (exception.cause) {
      const causeString = this._parseException(exception.cause, indentLevel + 1);
      const causeLines = causeString.trim().split("\n");
      errorLines.push(ansi_colors__WEBPACK_IMPORTED_MODULE_2__.red(`  CAUSE: ${ansi_colors__WEBPACK_IMPORTED_MODULE_2__.reset(causeLines[0])}`), ...causeLines.slice(1));
    }
    return `
${errorLines.map((line) => `${" ".repeat(indentLevel * 2)}${line}`).join("\n")}`;
  }
};
__name(_LoggerText, "LoggerText");
var LoggerText = _LoggerText;

// src/log.ts
var getLoggerForFormat = /* @__PURE__ */ __name((format) => {
  switch (format) {
    case "JSON" /* JSON */:
      return new LoggerJson();
    case "TEXT" /* TEXT */:
    default:
      return new LoggerText();
  }
}, "getLoggerForFormat");
var getDefaultOptions = /* @__PURE__ */ __name(() => ({
  level: getLevelFromEnv(),
  maxDepth: 4,
  maxStringLength: 2e3,
  prefix: null,
  suffix: null,
  logger: getLoggerForFormat(getFormatFromEnv()),
  data: {}
}), "getDefaultOptions");
var _Log = class _Log {
  constructor(options = {}) {
    /**
     * Map of available log levels that's useful for easy setting of appropriate log levels.
     * Each log level is represented internally by a number. Eg. `log.LEVELS.DEBUG === 5`.
     */
    __publicField(this, "LEVELS", LogLevel);
    // for BC
    __publicField(this, "options");
    __publicField(this, "warningsOnceLogged", /* @__PURE__ */ new Set());
    this.options = { ...getDefaultOptions(), ...options };
    if (!LogLevel[this.options.level]) throw new Error('Options "level" must be one of log.LEVELS enum!');
    if (typeof this.options.maxDepth !== "number") throw new Error('Options "maxDepth" must be a number!');
    if (typeof this.options.maxStringLength !== "number") throw new Error('Options "maxStringLength" must be a number!');
    if (this.options.prefix && typeof this.options.prefix !== "string") throw new Error('Options "prefix" must be a string!');
    if (this.options.suffix && typeof this.options.suffix !== "string") throw new Error('Options "suffix" must be a string!');
    if (typeof this.options.logger !== "object") throw new Error('Options "logger" must be an object!');
    if (typeof this.options.data !== "object") throw new Error('Options "data" must be an object!');
  }
  _limitDepth(obj) {
    return limitDepth(obj, this.options.maxDepth);
  }
  /**
   * Returns the currently selected logging level. This is useful for checking whether a message
   * will actually be printed to the console before one actually performs a resource intensive operation
   * to construct the message, such as querying a DB for some metadata that need to be added. If the log
   * level is not high enough at the moment, it doesn't make sense to execute the query.
   */
  getLevel() {
    return this.options.level;
  }
  /**
   * Sets the log level to the given value, preventing messages from less important log levels
   * from being printed to the console. Use in conjunction with the `log.LEVELS` constants such as
   *
   * ```
   * log.setLevel(log.LEVELS.DEBUG);
   * ```
   *
   * Default log level is INFO.
   */
  setLevel(level) {
    if (!LogLevel[level]) throw new Error('Options "level" must be one of log.LEVELS enum!');
    this.options.level = level;
  }
  internal(level, message, data, exception) {
    if (level > this.options.level) return;
    data = { ...this.options.data, ...data };
    data = Reflect.ownKeys(data).length > 0 ? this._limitDepth(data) : void 0;
    exception = this._limitDepth(exception);
    this.options.logger.log(level, message, data, exception, {
      prefix: this.options.prefix,
      suffix: this.options.suffix
    });
  }
  /**
   * Configures logger.
   */
  setOptions(options) {
    this.options = { ...this.options, ...options };
  }
  /**
   * Returns the logger configuration.
   */
  getOptions() {
    return { ...this.options };
  }
  /**
   * Creates a new instance of logger that inherits settings from a parent logger.
   */
  child(options) {
    let { prefix } = this.options;
    if (options.prefix) {
      prefix = prefix ? `${prefix}${PREFIX_DELIMITER}${options.prefix}` : options.prefix;
    }
    const data = options.data ? { ...this.options.data, ...options.data } : this.options.data;
    const newOptions = {
      ...this.options,
      ...options,
      prefix,
      data
    };
    return new _Log(newOptions);
  }
  /**
   * Logs an `ERROR` message. Use this method to log error messages that are not directly connected
   * to an exception. For logging exceptions, use the `log.exception` method.
   */
  error(message, data) {
    this.internal(1 /* ERROR */, message, data);
  }
  /**
   * Logs an `ERROR` level message with a nicely formatted exception. Note that the exception is the first parameter
   * here and an additional message is only optional.
   */
  exception(exception, message, data) {
    this.internal(1 /* ERROR */, message, data, exception);
  }
  softFail(message, data) {
    this.internal(2 /* SOFT_FAIL */, message, data);
  }
  /**
   * Logs a `WARNING` level message. Data are stringified and appended to the message.
   */
  warning(message, data) {
    this.internal(3 /* WARNING */, message, data);
  }
  /**
   * Logs an `INFO` message. `INFO` is the default log level so info messages will be always logged,
   * unless the log level is changed. Data are stringified and appended to the message.
   */
  info(message, data) {
    this.internal(4 /* INFO */, message, data);
  }
  /**
   * Logs a `DEBUG` message. By default, it will not be written to the console. To see `DEBUG`
   * messages in the console, set the log level to `DEBUG` either using the `log.setLevel(log.LEVELS.DEBUG)`
   * method or using the environment variable `APIFY_LOG_LEVEL=DEBUG`. Data are stringified and appended
   * to the message.
   */
  debug(message, data) {
    this.internal(5 /* DEBUG */, message, data);
  }
  perf(message, data) {
    this.internal(6 /* PERF */, message, data);
  }
  /**
   * Logs a `WARNING` level message only once.
   */
  warningOnce(message) {
    if (this.warningsOnceLogged.has(message)) return;
    this.warningsOnceLogged.add(message);
    this.warning(message);
  }
  /**
   * Logs given message only once as WARNING. It's used to warn user that some feature he is using has been deprecated.
   */
  deprecated(message) {
    this.warningOnce(message);
  }
};
__name(_Log, "Log");
var Log = _Log;

// src/index.ts
var log = new Log();
var index_default = log;

//# sourceMappingURL=index.mjs.map

/***/ }),

/***/ 4596:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __nccwpck_require__) => {

/* harmony export */ __nccwpck_require__.d(__webpack_exports__, {
/* harmony export */   rj: () => (/* binding */ ApifyClient)
/* harmony export */ });
/* unused harmony exports ActorClient, ActorCollectionClient, ApifyApiError, BuildClient, BuildCollectionClient, DatasetClient, DatasetCollectionClient, DownloadItemsFormat, InvalidResponseBodyError, KeyValueStoreClient, KeyValueStoreCollectionClient, LogClient, PlatformFeature, RequestQueueClient, RequestQueueCollectionClient, RunClient, RunCollectionClient, ScheduleActions, ScheduleClient, ScheduleCollectionClient, StoreCollectionClient, TaskClient, TaskCollectionClient, UserClient, WebhookClient, WebhookCollectionClient, WebhookDispatchClient, WebhookDispatchCollectionClient, WebhookDispatchStatus */
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __nccwpck_require__(720);


/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (mod)));
const ActorClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.ActorClient;
const ActorCollectionClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.ActorCollectionClient;
const ApifyApiError = _index_js__WEBPACK_IMPORTED_MODULE_0__.ApifyApiError;
const ApifyClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.ApifyClient;
const BuildClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.BuildClient;
const BuildCollectionClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.BuildCollectionClient;
const DatasetClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.DatasetClient;
const DatasetCollectionClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.DatasetCollectionClient;
const DownloadItemsFormat = _index_js__WEBPACK_IMPORTED_MODULE_0__.DownloadItemsFormat;
const InvalidResponseBodyError = _index_js__WEBPACK_IMPORTED_MODULE_0__.InvalidResponseBodyError;
const KeyValueStoreClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.KeyValueStoreClient;
const KeyValueStoreCollectionClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.KeyValueStoreCollectionClient;
const LogClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.LogClient;
const PlatformFeature = _index_js__WEBPACK_IMPORTED_MODULE_0__.PlatformFeature;
const RequestQueueClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.RequestQueueClient;
const RequestQueueCollectionClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.RequestQueueCollectionClient;
const RunClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.RunClient;
const RunCollectionClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.RunCollectionClient;
const ScheduleActions = _index_js__WEBPACK_IMPORTED_MODULE_0__.ScheduleActions;
const ScheduleClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.ScheduleClient;
const ScheduleCollectionClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.ScheduleCollectionClient;
const StoreCollectionClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.StoreCollectionClient;
const TaskClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.TaskClient;
const TaskCollectionClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.TaskCollectionClient;
const UserClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.UserClient;
const WebhookClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.WebhookClient;
const WebhookCollectionClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.WebhookCollectionClient;
const WebhookDispatchClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.WebhookDispatchClient;
const WebhookDispatchCollectionClient = _index_js__WEBPACK_IMPORTED_MODULE_0__.WebhookDispatchCollectionClient;
const WebhookDispatchStatus = _index_js__WEBPACK_IMPORTED_MODULE_0__.WebhookDispatchStatus;


/***/ }),

/***/ 3009:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"name":"apify-client","version":"2.9.3","description":"Apify API client for JavaScript","main":"dist/index.js","module":"dist/index.mjs","types":"dist/index.d.ts","browser":"dist/bundle.js","unpkg":"dist/bundle.js","exports":{"./package.json":"./package.json",".":{"import":"./dist/index.mjs","require":"./dist/index.js","types":"./dist/index.d.ts","browser":"./dist/bundle.js"}},"keywords":["apify","api","apifier","crawler","scraper"],"author":{"name":"Apify","email":"support@apify.com","url":"https://apify.com"},"contributors":["Jan Curn <jan@apify.com>","Marek Trunkát <marek@apify.com>","Ondra Urban <ondra@apify.com>","Jakub Drobník <jakub.drobnik@apify.com>"],"license":"Apache-2.0","repository":{"type":"git","url":"git+https://github.com/apify/apify-client-js"},"bugs":{"url":"https://github.com/apify/apify-client-js/issues"},"homepage":"https://docs.apify.com/api/client/js/","files":["dist","!dist/*.tsbuildinfo"],"scripts":{"build":"npm run clean && npm run build:node && npm run build:browser","postbuild":"gen-esm-wrapper dist/index.js dist/index.mjs","prepublishOnly":"(test $CI || (echo \\"Publishing is reserved to CI!\\"; exit 1))","clean":"rimraf dist","test":"npm run build && jest","lint":"eslint src test --ext js,jsx,mjs,ts","lint:fix":"eslint src test --ext js,jsx,mjs,ts --fix","build:node":"tsc","build:browser":"webpack"},"dependencies":{"@apify/consts":"^2.25.0","@apify/log":"^2.2.6","@crawlee/types":"^3.3.0","agentkeepalive":"^4.2.1","async-retry":"^1.3.3","axios":"^1.6.7","content-type":"^1.0.5","ow":"^0.28.2","tslib":"^2.5.0","type-fest":"^4.0.0"},"devDependencies":{"@apify/eslint-config-ts":"^0.4.0","@apify/tsconfig":"^0.1.0","@babel/cli":"^7.21.0","@babel/core":"^7.21.0","@babel/preset-env":"^7.20.2","@babel/register":"^7.21.0","@crawlee/puppeteer":"^3.2.2","@types/async-retry":"^1.4.5","@types/content-type":"^1.1.5","@types/express":"^4.17.17","@types/fs-extra":"^11.0.1","@types/jest":"^29.4.0","@types/node":"^20.0.0","@typescript-eslint/eslint-plugin":"^7.0.0","@typescript-eslint/parser":"^7.0.0","babel-loader":"^9.1.2","body-parser":"^1.19.0","compression":"^1.7.4","eslint":"^8.45.0","express":"^4.18.2","fs-extra":"^11.1.0","gen-esm-wrapper":"^1.1.2","jest":"^29.4.3","process":"^0.11.10","puppeteer":"^22.0.0","rimraf":"^5.0.0","terser-webpack-plugin":"^5.3.6","ts-jest":"^29.0.5","ts-loader":"^9.4.2","ts-node":"^10.9.1","typescript":"^5.0.0","webpack":"^5.75.0","webpack-cli":"^5.0.1"}}');

/***/ }),

/***/ 1813:
/***/ ((module) => {

module.exports = /*#__PURE__*/JSON.parse('{"application/1d-interleaved-parityfec":{"source":"iana"},"application/3gpdash-qoe-report+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/3gpp-ims+xml":{"source":"iana","compressible":true},"application/3gpphal+json":{"source":"iana","compressible":true},"application/3gpphalforms+json":{"source":"iana","compressible":true},"application/a2l":{"source":"iana"},"application/ace+cbor":{"source":"iana"},"application/activemessage":{"source":"iana"},"application/activity+json":{"source":"iana","compressible":true},"application/alto-costmap+json":{"source":"iana","compressible":true},"application/alto-costmapfilter+json":{"source":"iana","compressible":true},"application/alto-directory+json":{"source":"iana","compressible":true},"application/alto-endpointcost+json":{"source":"iana","compressible":true},"application/alto-endpointcostparams+json":{"source":"iana","compressible":true},"application/alto-endpointprop+json":{"source":"iana","compressible":true},"application/alto-endpointpropparams+json":{"source":"iana","compressible":true},"application/alto-error+json":{"source":"iana","compressible":true},"application/alto-networkmap+json":{"source":"iana","compressible":true},"application/alto-networkmapfilter+json":{"source":"iana","compressible":true},"application/alto-updatestreamcontrol+json":{"source":"iana","compressible":true},"application/alto-updatestreamparams+json":{"source":"iana","compressible":true},"application/aml":{"source":"iana"},"application/andrew-inset":{"source":"iana","extensions":["ez"]},"application/applefile":{"source":"iana"},"application/applixware":{"source":"apache","extensions":["aw"]},"application/at+jwt":{"source":"iana"},"application/atf":{"source":"iana"},"application/atfx":{"source":"iana"},"application/atom+xml":{"source":"iana","compressible":true,"extensions":["atom"]},"application/atomcat+xml":{"source":"iana","compressible":true,"extensions":["atomcat"]},"application/atomdeleted+xml":{"source":"iana","compressible":true,"extensions":["atomdeleted"]},"application/atomicmail":{"source":"iana"},"application/atomsvc+xml":{"source":"iana","compressible":true,"extensions":["atomsvc"]},"application/atsc-dwd+xml":{"source":"iana","compressible":true,"extensions":["dwd"]},"application/atsc-dynamic-event-message":{"source":"iana"},"application/atsc-held+xml":{"source":"iana","compressible":true,"extensions":["held"]},"application/atsc-rdt+json":{"source":"iana","compressible":true},"application/atsc-rsat+xml":{"source":"iana","compressible":true,"extensions":["rsat"]},"application/atxml":{"source":"iana"},"application/auth-policy+xml":{"source":"iana","compressible":true},"application/bacnet-xdd+zip":{"source":"iana","compressible":false},"application/batch-smtp":{"source":"iana"},"application/bdoc":{"compressible":false,"extensions":["bdoc"]},"application/beep+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/calendar+json":{"source":"iana","compressible":true},"application/calendar+xml":{"source":"iana","compressible":true,"extensions":["xcs"]},"application/call-completion":{"source":"iana"},"application/cals-1840":{"source":"iana"},"application/captive+json":{"source":"iana","compressible":true},"application/cbor":{"source":"iana"},"application/cbor-seq":{"source":"iana"},"application/cccex":{"source":"iana"},"application/ccmp+xml":{"source":"iana","compressible":true},"application/ccxml+xml":{"source":"iana","compressible":true,"extensions":["ccxml"]},"application/cdfx+xml":{"source":"iana","compressible":true,"extensions":["cdfx"]},"application/cdmi-capability":{"source":"iana","extensions":["cdmia"]},"application/cdmi-container":{"source":"iana","extensions":["cdmic"]},"application/cdmi-domain":{"source":"iana","extensions":["cdmid"]},"application/cdmi-object":{"source":"iana","extensions":["cdmio"]},"application/cdmi-queue":{"source":"iana","extensions":["cdmiq"]},"application/cdni":{"source":"iana"},"application/cea":{"source":"iana"},"application/cea-2018+xml":{"source":"iana","compressible":true},"application/cellml+xml":{"source":"iana","compressible":true},"application/cfw":{"source":"iana"},"application/city+json":{"source":"iana","compressible":true},"application/clr":{"source":"iana"},"application/clue+xml":{"source":"iana","compressible":true},"application/clue_info+xml":{"source":"iana","compressible":true},"application/cms":{"source":"iana"},"application/cnrp+xml":{"source":"iana","compressible":true},"application/coap-group+json":{"source":"iana","compressible":true},"application/coap-payload":{"source":"iana"},"application/commonground":{"source":"iana"},"application/conference-info+xml":{"source":"iana","compressible":true},"application/cose":{"source":"iana"},"application/cose-key":{"source":"iana"},"application/cose-key-set":{"source":"iana"},"application/cpl+xml":{"source":"iana","compressible":true,"extensions":["cpl"]},"application/csrattrs":{"source":"iana"},"application/csta+xml":{"source":"iana","compressible":true},"application/cstadata+xml":{"source":"iana","compressible":true},"application/csvm+json":{"source":"iana","compressible":true},"application/cu-seeme":{"source":"apache","extensions":["cu"]},"application/cwt":{"source":"iana"},"application/cybercash":{"source":"iana"},"application/dart":{"compressible":true},"application/dash+xml":{"source":"iana","compressible":true,"extensions":["mpd"]},"application/dash-patch+xml":{"source":"iana","compressible":true,"extensions":["mpp"]},"application/dashdelta":{"source":"iana"},"application/davmount+xml":{"source":"iana","compressible":true,"extensions":["davmount"]},"application/dca-rft":{"source":"iana"},"application/dcd":{"source":"iana"},"application/dec-dx":{"source":"iana"},"application/dialog-info+xml":{"source":"iana","compressible":true},"application/dicom":{"source":"iana"},"application/dicom+json":{"source":"iana","compressible":true},"application/dicom+xml":{"source":"iana","compressible":true},"application/dii":{"source":"iana"},"application/dit":{"source":"iana"},"application/dns":{"source":"iana"},"application/dns+json":{"source":"iana","compressible":true},"application/dns-message":{"source":"iana"},"application/docbook+xml":{"source":"apache","compressible":true,"extensions":["dbk"]},"application/dots+cbor":{"source":"iana"},"application/dskpp+xml":{"source":"iana","compressible":true},"application/dssc+der":{"source":"iana","extensions":["dssc"]},"application/dssc+xml":{"source":"iana","compressible":true,"extensions":["xdssc"]},"application/dvcs":{"source":"iana"},"application/ecmascript":{"source":"iana","compressible":true,"extensions":["es","ecma"]},"application/edi-consent":{"source":"iana"},"application/edi-x12":{"source":"iana","compressible":false},"application/edifact":{"source":"iana","compressible":false},"application/efi":{"source":"iana"},"application/elm+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/elm+xml":{"source":"iana","compressible":true},"application/emergencycalldata.cap+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/emergencycalldata.comment+xml":{"source":"iana","compressible":true},"application/emergencycalldata.control+xml":{"source":"iana","compressible":true},"application/emergencycalldata.deviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.ecall.msd":{"source":"iana"},"application/emergencycalldata.providerinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.serviceinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.subscriberinfo+xml":{"source":"iana","compressible":true},"application/emergencycalldata.veds+xml":{"source":"iana","compressible":true},"application/emma+xml":{"source":"iana","compressible":true,"extensions":["emma"]},"application/emotionml+xml":{"source":"iana","compressible":true,"extensions":["emotionml"]},"application/encaprtp":{"source":"iana"},"application/epp+xml":{"source":"iana","compressible":true},"application/epub+zip":{"source":"iana","compressible":false,"extensions":["epub"]},"application/eshop":{"source":"iana"},"application/exi":{"source":"iana","extensions":["exi"]},"application/expect-ct-report+json":{"source":"iana","compressible":true},"application/express":{"source":"iana","extensions":["exp"]},"application/fastinfoset":{"source":"iana"},"application/fastsoap":{"source":"iana"},"application/fdt+xml":{"source":"iana","compressible":true,"extensions":["fdt"]},"application/fhir+json":{"source":"iana","charset":"UTF-8","compressible":true},"application/fhir+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/fido.trusted-apps+json":{"compressible":true},"application/fits":{"source":"iana"},"application/flexfec":{"source":"iana"},"application/font-sfnt":{"source":"iana"},"application/font-tdpfr":{"source":"iana","extensions":["pfr"]},"application/font-woff":{"source":"iana","compressible":false},"application/framework-attributes+xml":{"source":"iana","compressible":true},"application/geo+json":{"source":"iana","compressible":true,"extensions":["geojson"]},"application/geo+json-seq":{"source":"iana"},"application/geopackage+sqlite3":{"source":"iana"},"application/geoxacml+xml":{"source":"iana","compressible":true},"application/gltf-buffer":{"source":"iana"},"application/gml+xml":{"source":"iana","compressible":true,"extensions":["gml"]},"application/gpx+xml":{"source":"apache","compressible":true,"extensions":["gpx"]},"application/gxf":{"source":"apache","extensions":["gxf"]},"application/gzip":{"source":"iana","compressible":false,"extensions":["gz"]},"application/h224":{"source":"iana"},"application/held+xml":{"source":"iana","compressible":true},"application/hjson":{"extensions":["hjson"]},"application/http":{"source":"iana"},"application/hyperstudio":{"source":"iana","extensions":["stk"]},"application/ibe-key-request+xml":{"source":"iana","compressible":true},"application/ibe-pkg-reply+xml":{"source":"iana","compressible":true},"application/ibe-pp-data":{"source":"iana"},"application/iges":{"source":"iana"},"application/im-iscomposing+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/index":{"source":"iana"},"application/index.cmd":{"source":"iana"},"application/index.obj":{"source":"iana"},"application/index.response":{"source":"iana"},"application/index.vnd":{"source":"iana"},"application/inkml+xml":{"source":"iana","compressible":true,"extensions":["ink","inkml"]},"application/iotp":{"source":"iana"},"application/ipfix":{"source":"iana","extensions":["ipfix"]},"application/ipp":{"source":"iana"},"application/isup":{"source":"iana"},"application/its+xml":{"source":"iana","compressible":true,"extensions":["its"]},"application/java-archive":{"source":"apache","compressible":false,"extensions":["jar","war","ear"]},"application/java-serialized-object":{"source":"apache","compressible":false,"extensions":["ser"]},"application/java-vm":{"source":"apache","compressible":false,"extensions":["class"]},"application/javascript":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["js","mjs"]},"application/jf2feed+json":{"source":"iana","compressible":true},"application/jose":{"source":"iana"},"application/jose+json":{"source":"iana","compressible":true},"application/jrd+json":{"source":"iana","compressible":true},"application/jscalendar+json":{"source":"iana","compressible":true},"application/json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["json","map"]},"application/json-patch+json":{"source":"iana","compressible":true},"application/json-seq":{"source":"iana"},"application/json5":{"extensions":["json5"]},"application/jsonml+json":{"source":"apache","compressible":true,"extensions":["jsonml"]},"application/jwk+json":{"source":"iana","compressible":true},"application/jwk-set+json":{"source":"iana","compressible":true},"application/jwt":{"source":"iana"},"application/kpml-request+xml":{"source":"iana","compressible":true},"application/kpml-response+xml":{"source":"iana","compressible":true},"application/ld+json":{"source":"iana","compressible":true,"extensions":["jsonld"]},"application/lgr+xml":{"source":"iana","compressible":true,"extensions":["lgr"]},"application/link-format":{"source":"iana"},"application/load-control+xml":{"source":"iana","compressible":true},"application/lost+xml":{"source":"iana","compressible":true,"extensions":["lostxml"]},"application/lostsync+xml":{"source":"iana","compressible":true},"application/lpf+zip":{"source":"iana","compressible":false},"application/lxf":{"source":"iana"},"application/mac-binhex40":{"source":"iana","extensions":["hqx"]},"application/mac-compactpro":{"source":"apache","extensions":["cpt"]},"application/macwriteii":{"source":"iana"},"application/mads+xml":{"source":"iana","compressible":true,"extensions":["mads"]},"application/manifest+json":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["webmanifest"]},"application/marc":{"source":"iana","extensions":["mrc"]},"application/marcxml+xml":{"source":"iana","compressible":true,"extensions":["mrcx"]},"application/mathematica":{"source":"iana","extensions":["ma","nb","mb"]},"application/mathml+xml":{"source":"iana","compressible":true,"extensions":["mathml"]},"application/mathml-content+xml":{"source":"iana","compressible":true},"application/mathml-presentation+xml":{"source":"iana","compressible":true},"application/mbms-associated-procedure-description+xml":{"source":"iana","compressible":true},"application/mbms-deregister+xml":{"source":"iana","compressible":true},"application/mbms-envelope+xml":{"source":"iana","compressible":true},"application/mbms-msk+xml":{"source":"iana","compressible":true},"application/mbms-msk-response+xml":{"source":"iana","compressible":true},"application/mbms-protection-description+xml":{"source":"iana","compressible":true},"application/mbms-reception-report+xml":{"source":"iana","compressible":true},"application/mbms-register+xml":{"source":"iana","compressible":true},"application/mbms-register-response+xml":{"source":"iana","compressible":true},"application/mbms-schedule+xml":{"source":"iana","compressible":true},"application/mbms-user-service-description+xml":{"source":"iana","compressible":true},"application/mbox":{"source":"iana","extensions":["mbox"]},"application/media-policy-dataset+xml":{"source":"iana","compressible":true,"extensions":["mpf"]},"application/media_control+xml":{"source":"iana","compressible":true},"application/mediaservercontrol+xml":{"source":"iana","compressible":true,"extensions":["mscml"]},"application/merge-patch+json":{"source":"iana","compressible":true},"application/metalink+xml":{"source":"apache","compressible":true,"extensions":["metalink"]},"application/metalink4+xml":{"source":"iana","compressible":true,"extensions":["meta4"]},"application/mets+xml":{"source":"iana","compressible":true,"extensions":["mets"]},"application/mf4":{"source":"iana"},"application/mikey":{"source":"iana"},"application/mipc":{"source":"iana"},"application/missing-blocks+cbor-seq":{"source":"iana"},"application/mmt-aei+xml":{"source":"iana","compressible":true,"extensions":["maei"]},"application/mmt-usd+xml":{"source":"iana","compressible":true,"extensions":["musd"]},"application/mods+xml":{"source":"iana","compressible":true,"extensions":["mods"]},"application/moss-keys":{"source":"iana"},"application/moss-signature":{"source":"iana"},"application/mosskey-data":{"source":"iana"},"application/mosskey-request":{"source":"iana"},"application/mp21":{"source":"iana","extensions":["m21","mp21"]},"application/mp4":{"source":"iana","extensions":["mp4s","m4p"]},"application/mpeg4-generic":{"source":"iana"},"application/mpeg4-iod":{"source":"iana"},"application/mpeg4-iod-xmt":{"source":"iana"},"application/mrb-consumer+xml":{"source":"iana","compressible":true},"application/mrb-publish+xml":{"source":"iana","compressible":true},"application/msc-ivr+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msc-mixer+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/msword":{"source":"iana","compressible":false,"extensions":["doc","dot"]},"application/mud+json":{"source":"iana","compressible":true},"application/multipart-core":{"source":"iana"},"application/mxf":{"source":"iana","extensions":["mxf"]},"application/n-quads":{"source":"iana","extensions":["nq"]},"application/n-triples":{"source":"iana","extensions":["nt"]},"application/nasdata":{"source":"iana"},"application/news-checkgroups":{"source":"iana","charset":"US-ASCII"},"application/news-groupinfo":{"source":"iana","charset":"US-ASCII"},"application/news-transmission":{"source":"iana"},"application/nlsml+xml":{"source":"iana","compressible":true},"application/node":{"source":"iana","extensions":["cjs"]},"application/nss":{"source":"iana"},"application/oauth-authz-req+jwt":{"source":"iana"},"application/oblivious-dns-message":{"source":"iana"},"application/ocsp-request":{"source":"iana"},"application/ocsp-response":{"source":"iana"},"application/octet-stream":{"source":"iana","compressible":false,"extensions":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"]},"application/oda":{"source":"iana","extensions":["oda"]},"application/odm+xml":{"source":"iana","compressible":true},"application/odx":{"source":"iana"},"application/oebps-package+xml":{"source":"iana","compressible":true,"extensions":["opf"]},"application/ogg":{"source":"iana","compressible":false,"extensions":["ogx"]},"application/omdoc+xml":{"source":"apache","compressible":true,"extensions":["omdoc"]},"application/onenote":{"source":"apache","extensions":["onetoc","onetoc2","onetmp","onepkg"]},"application/opc-nodeset+xml":{"source":"iana","compressible":true},"application/oscore":{"source":"iana"},"application/oxps":{"source":"iana","extensions":["oxps"]},"application/p21":{"source":"iana"},"application/p21+zip":{"source":"iana","compressible":false},"application/p2p-overlay+xml":{"source":"iana","compressible":true,"extensions":["relo"]},"application/parityfec":{"source":"iana"},"application/passport":{"source":"iana"},"application/patch-ops-error+xml":{"source":"iana","compressible":true,"extensions":["xer"]},"application/pdf":{"source":"iana","compressible":false,"extensions":["pdf"]},"application/pdx":{"source":"iana"},"application/pem-certificate-chain":{"source":"iana"},"application/pgp-encrypted":{"source":"iana","compressible":false,"extensions":["pgp"]},"application/pgp-keys":{"source":"iana","extensions":["asc"]},"application/pgp-signature":{"source":"iana","extensions":["asc","sig"]},"application/pics-rules":{"source":"apache","extensions":["prf"]},"application/pidf+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pidf-diff+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/pkcs10":{"source":"iana","extensions":["p10"]},"application/pkcs12":{"source":"iana"},"application/pkcs7-mime":{"source":"iana","extensions":["p7m","p7c"]},"application/pkcs7-signature":{"source":"iana","extensions":["p7s"]},"application/pkcs8":{"source":"iana","extensions":["p8"]},"application/pkcs8-encrypted":{"source":"iana"},"application/pkix-attr-cert":{"source":"iana","extensions":["ac"]},"application/pkix-cert":{"source":"iana","extensions":["cer"]},"application/pkix-crl":{"source":"iana","extensions":["crl"]},"application/pkix-pkipath":{"source":"iana","extensions":["pkipath"]},"application/pkixcmp":{"source":"iana","extensions":["pki"]},"application/pls+xml":{"source":"iana","compressible":true,"extensions":["pls"]},"application/poc-settings+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/postscript":{"source":"iana","compressible":true,"extensions":["ai","eps","ps"]},"application/ppsp-tracker+json":{"source":"iana","compressible":true},"application/problem+json":{"source":"iana","compressible":true},"application/problem+xml":{"source":"iana","compressible":true},"application/provenance+xml":{"source":"iana","compressible":true,"extensions":["provx"]},"application/prs.alvestrand.titrax-sheet":{"source":"iana"},"application/prs.cww":{"source":"iana","extensions":["cww"]},"application/prs.cyn":{"source":"iana","charset":"7-BIT"},"application/prs.hpub+zip":{"source":"iana","compressible":false},"application/prs.nprend":{"source":"iana"},"application/prs.plucker":{"source":"iana"},"application/prs.rdf-xml-crypt":{"source":"iana"},"application/prs.xsf+xml":{"source":"iana","compressible":true},"application/pskc+xml":{"source":"iana","compressible":true,"extensions":["pskcxml"]},"application/pvd+json":{"source":"iana","compressible":true},"application/qsig":{"source":"iana"},"application/raml+yaml":{"compressible":true,"extensions":["raml"]},"application/raptorfec":{"source":"iana"},"application/rdap+json":{"source":"iana","compressible":true},"application/rdf+xml":{"source":"iana","compressible":true,"extensions":["rdf","owl"]},"application/reginfo+xml":{"source":"iana","compressible":true,"extensions":["rif"]},"application/relax-ng-compact-syntax":{"source":"iana","extensions":["rnc"]},"application/remote-printing":{"source":"iana"},"application/reputon+json":{"source":"iana","compressible":true},"application/resource-lists+xml":{"source":"iana","compressible":true,"extensions":["rl"]},"application/resource-lists-diff+xml":{"source":"iana","compressible":true,"extensions":["rld"]},"application/rfc+xml":{"source":"iana","compressible":true},"application/riscos":{"source":"iana"},"application/rlmi+xml":{"source":"iana","compressible":true},"application/rls-services+xml":{"source":"iana","compressible":true,"extensions":["rs"]},"application/route-apd+xml":{"source":"iana","compressible":true,"extensions":["rapd"]},"application/route-s-tsid+xml":{"source":"iana","compressible":true,"extensions":["sls"]},"application/route-usd+xml":{"source":"iana","compressible":true,"extensions":["rusd"]},"application/rpki-ghostbusters":{"source":"iana","extensions":["gbr"]},"application/rpki-manifest":{"source":"iana","extensions":["mft"]},"application/rpki-publication":{"source":"iana"},"application/rpki-roa":{"source":"iana","extensions":["roa"]},"application/rpki-updown":{"source":"iana"},"application/rsd+xml":{"source":"apache","compressible":true,"extensions":["rsd"]},"application/rss+xml":{"source":"apache","compressible":true,"extensions":["rss"]},"application/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"application/rtploopback":{"source":"iana"},"application/rtx":{"source":"iana"},"application/samlassertion+xml":{"source":"iana","compressible":true},"application/samlmetadata+xml":{"source":"iana","compressible":true},"application/sarif+json":{"source":"iana","compressible":true},"application/sarif-external-properties+json":{"source":"iana","compressible":true},"application/sbe":{"source":"iana"},"application/sbml+xml":{"source":"iana","compressible":true,"extensions":["sbml"]},"application/scaip+xml":{"source":"iana","compressible":true},"application/scim+json":{"source":"iana","compressible":true},"application/scvp-cv-request":{"source":"iana","extensions":["scq"]},"application/scvp-cv-response":{"source":"iana","extensions":["scs"]},"application/scvp-vp-request":{"source":"iana","extensions":["spq"]},"application/scvp-vp-response":{"source":"iana","extensions":["spp"]},"application/sdp":{"source":"iana","extensions":["sdp"]},"application/secevent+jwt":{"source":"iana"},"application/senml+cbor":{"source":"iana"},"application/senml+json":{"source":"iana","compressible":true},"application/senml+xml":{"source":"iana","compressible":true,"extensions":["senmlx"]},"application/senml-etch+cbor":{"source":"iana"},"application/senml-etch+json":{"source":"iana","compressible":true},"application/senml-exi":{"source":"iana"},"application/sensml+cbor":{"source":"iana"},"application/sensml+json":{"source":"iana","compressible":true},"application/sensml+xml":{"source":"iana","compressible":true,"extensions":["sensmlx"]},"application/sensml-exi":{"source":"iana"},"application/sep+xml":{"source":"iana","compressible":true},"application/sep-exi":{"source":"iana"},"application/session-info":{"source":"iana"},"application/set-payment":{"source":"iana"},"application/set-payment-initiation":{"source":"iana","extensions":["setpay"]},"application/set-registration":{"source":"iana"},"application/set-registration-initiation":{"source":"iana","extensions":["setreg"]},"application/sgml":{"source":"iana"},"application/sgml-open-catalog":{"source":"iana"},"application/shf+xml":{"source":"iana","compressible":true,"extensions":["shf"]},"application/sieve":{"source":"iana","extensions":["siv","sieve"]},"application/simple-filter+xml":{"source":"iana","compressible":true},"application/simple-message-summary":{"source":"iana"},"application/simplesymbolcontainer":{"source":"iana"},"application/sipc":{"source":"iana"},"application/slate":{"source":"iana"},"application/smil":{"source":"iana"},"application/smil+xml":{"source":"iana","compressible":true,"extensions":["smi","smil"]},"application/smpte336m":{"source":"iana"},"application/soap+fastinfoset":{"source":"iana"},"application/soap+xml":{"source":"iana","compressible":true},"application/sparql-query":{"source":"iana","extensions":["rq"]},"application/sparql-results+xml":{"source":"iana","compressible":true,"extensions":["srx"]},"application/spdx+json":{"source":"iana","compressible":true},"application/spirits-event+xml":{"source":"iana","compressible":true},"application/sql":{"source":"iana"},"application/srgs":{"source":"iana","extensions":["gram"]},"application/srgs+xml":{"source":"iana","compressible":true,"extensions":["grxml"]},"application/sru+xml":{"source":"iana","compressible":true,"extensions":["sru"]},"application/ssdl+xml":{"source":"apache","compressible":true,"extensions":["ssdl"]},"application/ssml+xml":{"source":"iana","compressible":true,"extensions":["ssml"]},"application/stix+json":{"source":"iana","compressible":true},"application/swid+xml":{"source":"iana","compressible":true,"extensions":["swidtag"]},"application/tamp-apex-update":{"source":"iana"},"application/tamp-apex-update-confirm":{"source":"iana"},"application/tamp-community-update":{"source":"iana"},"application/tamp-community-update-confirm":{"source":"iana"},"application/tamp-error":{"source":"iana"},"application/tamp-sequence-adjust":{"source":"iana"},"application/tamp-sequence-adjust-confirm":{"source":"iana"},"application/tamp-status-query":{"source":"iana"},"application/tamp-status-response":{"source":"iana"},"application/tamp-update":{"source":"iana"},"application/tamp-update-confirm":{"source":"iana"},"application/tar":{"compressible":true},"application/taxii+json":{"source":"iana","compressible":true},"application/td+json":{"source":"iana","compressible":true},"application/tei+xml":{"source":"iana","compressible":true,"extensions":["tei","teicorpus"]},"application/tetra_isi":{"source":"iana"},"application/thraud+xml":{"source":"iana","compressible":true,"extensions":["tfi"]},"application/timestamp-query":{"source":"iana"},"application/timestamp-reply":{"source":"iana"},"application/timestamped-data":{"source":"iana","extensions":["tsd"]},"application/tlsrpt+gzip":{"source":"iana"},"application/tlsrpt+json":{"source":"iana","compressible":true},"application/tnauthlist":{"source":"iana"},"application/token-introspection+jwt":{"source":"iana"},"application/toml":{"compressible":true,"extensions":["toml"]},"application/trickle-ice-sdpfrag":{"source":"iana"},"application/trig":{"source":"iana","extensions":["trig"]},"application/ttml+xml":{"source":"iana","compressible":true,"extensions":["ttml"]},"application/tve-trigger":{"source":"iana"},"application/tzif":{"source":"iana"},"application/tzif-leap":{"source":"iana"},"application/ubjson":{"compressible":false,"extensions":["ubj"]},"application/ulpfec":{"source":"iana"},"application/urc-grpsheet+xml":{"source":"iana","compressible":true},"application/urc-ressheet+xml":{"source":"iana","compressible":true,"extensions":["rsheet"]},"application/urc-targetdesc+xml":{"source":"iana","compressible":true,"extensions":["td"]},"application/urc-uisocketdesc+xml":{"source":"iana","compressible":true},"application/vcard+json":{"source":"iana","compressible":true},"application/vcard+xml":{"source":"iana","compressible":true},"application/vemmi":{"source":"iana"},"application/vividence.scriptfile":{"source":"apache"},"application/vnd.1000minds.decision-model+xml":{"source":"iana","compressible":true,"extensions":["1km"]},"application/vnd.3gpp-prose+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-prose-pc3ch+xml":{"source":"iana","compressible":true},"application/vnd.3gpp-v2x-local-service-information":{"source":"iana"},"application/vnd.3gpp.5gnas":{"source":"iana"},"application/vnd.3gpp.access-transfer-events+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.bsf+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gmop+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.gtpc":{"source":"iana"},"application/vnd.3gpp.interworking-data":{"source":"iana"},"application/vnd.3gpp.lpp":{"source":"iana"},"application/vnd.3gpp.mc-signalling-ear":{"source":"iana"},"application/vnd.3gpp.mcdata-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-payload":{"source":"iana"},"application/vnd.3gpp.mcdata-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-signalling":{"source":"iana"},"application/vnd.3gpp.mcdata-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcdata-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-floor-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-signed+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-ue-init-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcptt-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-command+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-affiliation-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-location-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-mbms-usage-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-service-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-transmission-request+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-ue-config+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mcvideo-user-profile+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.mid-call+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ngap":{"source":"iana"},"application/vnd.3gpp.pfcp":{"source":"iana"},"application/vnd.3gpp.pic-bw-large":{"source":"iana","extensions":["plb"]},"application/vnd.3gpp.pic-bw-small":{"source":"iana","extensions":["psb"]},"application/vnd.3gpp.pic-bw-var":{"source":"iana","extensions":["pvb"]},"application/vnd.3gpp.s1ap":{"source":"iana"},"application/vnd.3gpp.sms":{"source":"iana"},"application/vnd.3gpp.sms+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-ext+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.srvcc-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.state-and-event-info+xml":{"source":"iana","compressible":true},"application/vnd.3gpp.ussd+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.bcmcsinfo+xml":{"source":"iana","compressible":true},"application/vnd.3gpp2.sms":{"source":"iana"},"application/vnd.3gpp2.tcap":{"source":"iana","extensions":["tcap"]},"application/vnd.3lightssoftware.imagescal":{"source":"iana"},"application/vnd.3m.post-it-notes":{"source":"iana","extensions":["pwn"]},"application/vnd.accpac.simply.aso":{"source":"iana","extensions":["aso"]},"application/vnd.accpac.simply.imp":{"source":"iana","extensions":["imp"]},"application/vnd.acucobol":{"source":"iana","extensions":["acu"]},"application/vnd.acucorp":{"source":"iana","extensions":["atc","acutc"]},"application/vnd.adobe.air-application-installer-package+zip":{"source":"apache","compressible":false,"extensions":["air"]},"application/vnd.adobe.flash.movie":{"source":"iana"},"application/vnd.adobe.formscentral.fcdt":{"source":"iana","extensions":["fcdt"]},"application/vnd.adobe.fxp":{"source":"iana","extensions":["fxp","fxpl"]},"application/vnd.adobe.partial-upload":{"source":"iana"},"application/vnd.adobe.xdp+xml":{"source":"iana","compressible":true,"extensions":["xdp"]},"application/vnd.adobe.xfdf":{"source":"iana","extensions":["xfdf"]},"application/vnd.aether.imp":{"source":"iana"},"application/vnd.afpc.afplinedata":{"source":"iana"},"application/vnd.afpc.afplinedata-pagedef":{"source":"iana"},"application/vnd.afpc.cmoca-cmresource":{"source":"iana"},"application/vnd.afpc.foca-charset":{"source":"iana"},"application/vnd.afpc.foca-codedfont":{"source":"iana"},"application/vnd.afpc.foca-codepage":{"source":"iana"},"application/vnd.afpc.modca":{"source":"iana"},"application/vnd.afpc.modca-cmtable":{"source":"iana"},"application/vnd.afpc.modca-formdef":{"source":"iana"},"application/vnd.afpc.modca-mediummap":{"source":"iana"},"application/vnd.afpc.modca-objectcontainer":{"source":"iana"},"application/vnd.afpc.modca-overlay":{"source":"iana"},"application/vnd.afpc.modca-pagesegment":{"source":"iana"},"application/vnd.age":{"source":"iana","extensions":["age"]},"application/vnd.ah-barcode":{"source":"iana"},"application/vnd.ahead.space":{"source":"iana","extensions":["ahead"]},"application/vnd.airzip.filesecure.azf":{"source":"iana","extensions":["azf"]},"application/vnd.airzip.filesecure.azs":{"source":"iana","extensions":["azs"]},"application/vnd.amadeus+json":{"source":"iana","compressible":true},"application/vnd.amazon.ebook":{"source":"apache","extensions":["azw"]},"application/vnd.amazon.mobi8-ebook":{"source":"iana"},"application/vnd.americandynamics.acc":{"source":"iana","extensions":["acc"]},"application/vnd.amiga.ami":{"source":"iana","extensions":["ami"]},"application/vnd.amundsen.maze+xml":{"source":"iana","compressible":true},"application/vnd.android.ota":{"source":"iana"},"application/vnd.android.package-archive":{"source":"apache","compressible":false,"extensions":["apk"]},"application/vnd.anki":{"source":"iana"},"application/vnd.anser-web-certificate-issue-initiation":{"source":"iana","extensions":["cii"]},"application/vnd.anser-web-funds-transfer-initiation":{"source":"apache","extensions":["fti"]},"application/vnd.antix.game-component":{"source":"iana","extensions":["atx"]},"application/vnd.apache.arrow.file":{"source":"iana"},"application/vnd.apache.arrow.stream":{"source":"iana"},"application/vnd.apache.thrift.binary":{"source":"iana"},"application/vnd.apache.thrift.compact":{"source":"iana"},"application/vnd.apache.thrift.json":{"source":"iana"},"application/vnd.api+json":{"source":"iana","compressible":true},"application/vnd.aplextor.warrp+json":{"source":"iana","compressible":true},"application/vnd.apothekende.reservation+json":{"source":"iana","compressible":true},"application/vnd.apple.installer+xml":{"source":"iana","compressible":true,"extensions":["mpkg"]},"application/vnd.apple.keynote":{"source":"iana","extensions":["key"]},"application/vnd.apple.mpegurl":{"source":"iana","extensions":["m3u8"]},"application/vnd.apple.numbers":{"source":"iana","extensions":["numbers"]},"application/vnd.apple.pages":{"source":"iana","extensions":["pages"]},"application/vnd.apple.pkpass":{"compressible":false,"extensions":["pkpass"]},"application/vnd.arastra.swi":{"source":"iana"},"application/vnd.aristanetworks.swi":{"source":"iana","extensions":["swi"]},"application/vnd.artisan+json":{"source":"iana","compressible":true},"application/vnd.artsquare":{"source":"iana"},"application/vnd.astraea-software.iota":{"source":"iana","extensions":["iota"]},"application/vnd.audiograph":{"source":"iana","extensions":["aep"]},"application/vnd.autopackage":{"source":"iana"},"application/vnd.avalon+json":{"source":"iana","compressible":true},"application/vnd.avistar+xml":{"source":"iana","compressible":true},"application/vnd.balsamiq.bmml+xml":{"source":"iana","compressible":true,"extensions":["bmml"]},"application/vnd.balsamiq.bmpr":{"source":"iana"},"application/vnd.banana-accounting":{"source":"iana"},"application/vnd.bbf.usp.error":{"source":"iana"},"application/vnd.bbf.usp.msg":{"source":"iana"},"application/vnd.bbf.usp.msg+json":{"source":"iana","compressible":true},"application/vnd.bekitzur-stech+json":{"source":"iana","compressible":true},"application/vnd.bint.med-content":{"source":"iana"},"application/vnd.biopax.rdf+xml":{"source":"iana","compressible":true},"application/vnd.blink-idb-value-wrapper":{"source":"iana"},"application/vnd.blueice.multipass":{"source":"iana","extensions":["mpm"]},"application/vnd.bluetooth.ep.oob":{"source":"iana"},"application/vnd.bluetooth.le.oob":{"source":"iana"},"application/vnd.bmi":{"source":"iana","extensions":["bmi"]},"application/vnd.bpf":{"source":"iana"},"application/vnd.bpf3":{"source":"iana"},"application/vnd.businessobjects":{"source":"iana","extensions":["rep"]},"application/vnd.byu.uapi+json":{"source":"iana","compressible":true},"application/vnd.cab-jscript":{"source":"iana"},"application/vnd.canon-cpdl":{"source":"iana"},"application/vnd.canon-lips":{"source":"iana"},"application/vnd.capasystems-pg+json":{"source":"iana","compressible":true},"application/vnd.cendio.thinlinc.clientconf":{"source":"iana"},"application/vnd.century-systems.tcp_stream":{"source":"iana"},"application/vnd.chemdraw+xml":{"source":"iana","compressible":true,"extensions":["cdxml"]},"application/vnd.chess-pgn":{"source":"iana"},"application/vnd.chipnuts.karaoke-mmd":{"source":"iana","extensions":["mmd"]},"application/vnd.ciedi":{"source":"iana"},"application/vnd.cinderella":{"source":"iana","extensions":["cdy"]},"application/vnd.cirpack.isdn-ext":{"source":"iana"},"application/vnd.citationstyles.style+xml":{"source":"iana","compressible":true,"extensions":["csl"]},"application/vnd.claymore":{"source":"iana","extensions":["cla"]},"application/vnd.cloanto.rp9":{"source":"iana","extensions":["rp9"]},"application/vnd.clonk.c4group":{"source":"iana","extensions":["c4g","c4d","c4f","c4p","c4u"]},"application/vnd.cluetrust.cartomobile-config":{"source":"iana","extensions":["c11amc"]},"application/vnd.cluetrust.cartomobile-config-pkg":{"source":"iana","extensions":["c11amz"]},"application/vnd.coffeescript":{"source":"iana"},"application/vnd.collabio.xodocuments.document":{"source":"iana"},"application/vnd.collabio.xodocuments.document-template":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation":{"source":"iana"},"application/vnd.collabio.xodocuments.presentation-template":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet":{"source":"iana"},"application/vnd.collabio.xodocuments.spreadsheet-template":{"source":"iana"},"application/vnd.collection+json":{"source":"iana","compressible":true},"application/vnd.collection.doc+json":{"source":"iana","compressible":true},"application/vnd.collection.next+json":{"source":"iana","compressible":true},"application/vnd.comicbook+zip":{"source":"iana","compressible":false},"application/vnd.comicbook-rar":{"source":"iana"},"application/vnd.commerce-battelle":{"source":"iana"},"application/vnd.commonspace":{"source":"iana","extensions":["csp"]},"application/vnd.contact.cmsg":{"source":"iana","extensions":["cdbcmsg"]},"application/vnd.coreos.ignition+json":{"source":"iana","compressible":true},"application/vnd.cosmocaller":{"source":"iana","extensions":["cmc"]},"application/vnd.crick.clicker":{"source":"iana","extensions":["clkx"]},"application/vnd.crick.clicker.keyboard":{"source":"iana","extensions":["clkk"]},"application/vnd.crick.clicker.palette":{"source":"iana","extensions":["clkp"]},"application/vnd.crick.clicker.template":{"source":"iana","extensions":["clkt"]},"application/vnd.crick.clicker.wordbank":{"source":"iana","extensions":["clkw"]},"application/vnd.criticaltools.wbs+xml":{"source":"iana","compressible":true,"extensions":["wbs"]},"application/vnd.cryptii.pipe+json":{"source":"iana","compressible":true},"application/vnd.crypto-shade-file":{"source":"iana"},"application/vnd.cryptomator.encrypted":{"source":"iana"},"application/vnd.cryptomator.vault":{"source":"iana"},"application/vnd.ctc-posml":{"source":"iana","extensions":["pml"]},"application/vnd.ctct.ws+xml":{"source":"iana","compressible":true},"application/vnd.cups-pdf":{"source":"iana"},"application/vnd.cups-postscript":{"source":"iana"},"application/vnd.cups-ppd":{"source":"iana","extensions":["ppd"]},"application/vnd.cups-raster":{"source":"iana"},"application/vnd.cups-raw":{"source":"iana"},"application/vnd.curl":{"source":"iana"},"application/vnd.curl.car":{"source":"apache","extensions":["car"]},"application/vnd.curl.pcurl":{"source":"apache","extensions":["pcurl"]},"application/vnd.cyan.dean.root+xml":{"source":"iana","compressible":true},"application/vnd.cybank":{"source":"iana"},"application/vnd.cyclonedx+json":{"source":"iana","compressible":true},"application/vnd.cyclonedx+xml":{"source":"iana","compressible":true},"application/vnd.d2l.coursepackage1p0+zip":{"source":"iana","compressible":false},"application/vnd.d3m-dataset":{"source":"iana"},"application/vnd.d3m-problem":{"source":"iana"},"application/vnd.dart":{"source":"iana","compressible":true,"extensions":["dart"]},"application/vnd.data-vision.rdz":{"source":"iana","extensions":["rdz"]},"application/vnd.datapackage+json":{"source":"iana","compressible":true},"application/vnd.dataresource+json":{"source":"iana","compressible":true},"application/vnd.dbf":{"source":"iana","extensions":["dbf"]},"application/vnd.debian.binary-package":{"source":"iana"},"application/vnd.dece.data":{"source":"iana","extensions":["uvf","uvvf","uvd","uvvd"]},"application/vnd.dece.ttml+xml":{"source":"iana","compressible":true,"extensions":["uvt","uvvt"]},"application/vnd.dece.unspecified":{"source":"iana","extensions":["uvx","uvvx"]},"application/vnd.dece.zip":{"source":"iana","extensions":["uvz","uvvz"]},"application/vnd.denovo.fcselayout-link":{"source":"iana","extensions":["fe_launch"]},"application/vnd.desmume.movie":{"source":"iana"},"application/vnd.dir-bi.plate-dl-nosuffix":{"source":"iana"},"application/vnd.dm.delegation+xml":{"source":"iana","compressible":true},"application/vnd.dna":{"source":"iana","extensions":["dna"]},"application/vnd.document+json":{"source":"iana","compressible":true},"application/vnd.dolby.mlp":{"source":"apache","extensions":["mlp"]},"application/vnd.dolby.mobile.1":{"source":"iana"},"application/vnd.dolby.mobile.2":{"source":"iana"},"application/vnd.doremir.scorecloud-binary-document":{"source":"iana"},"application/vnd.dpgraph":{"source":"iana","extensions":["dpg"]},"application/vnd.dreamfactory":{"source":"iana","extensions":["dfac"]},"application/vnd.drive+json":{"source":"iana","compressible":true},"application/vnd.ds-keypoint":{"source":"apache","extensions":["kpxx"]},"application/vnd.dtg.local":{"source":"iana"},"application/vnd.dtg.local.flash":{"source":"iana"},"application/vnd.dtg.local.html":{"source":"iana"},"application/vnd.dvb.ait":{"source":"iana","extensions":["ait"]},"application/vnd.dvb.dvbisl+xml":{"source":"iana","compressible":true},"application/vnd.dvb.dvbj":{"source":"iana"},"application/vnd.dvb.esgcontainer":{"source":"iana"},"application/vnd.dvb.ipdcdftnotifaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess":{"source":"iana"},"application/vnd.dvb.ipdcesgaccess2":{"source":"iana"},"application/vnd.dvb.ipdcesgpdd":{"source":"iana"},"application/vnd.dvb.ipdcroaming":{"source":"iana"},"application/vnd.dvb.iptv.alfec-base":{"source":"iana"},"application/vnd.dvb.iptv.alfec-enhancement":{"source":"iana"},"application/vnd.dvb.notif-aggregate-root+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-container+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-generic+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-msglist+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-request+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-ia-registration-response+xml":{"source":"iana","compressible":true},"application/vnd.dvb.notif-init+xml":{"source":"iana","compressible":true},"application/vnd.dvb.pfr":{"source":"iana"},"application/vnd.dvb.service":{"source":"iana","extensions":["svc"]},"application/vnd.dxr":{"source":"iana"},"application/vnd.dynageo":{"source":"iana","extensions":["geo"]},"application/vnd.dzr":{"source":"iana"},"application/vnd.easykaraoke.cdgdownload":{"source":"iana"},"application/vnd.ecdis-update":{"source":"iana"},"application/vnd.ecip.rlp":{"source":"iana"},"application/vnd.eclipse.ditto+json":{"source":"iana","compressible":true},"application/vnd.ecowin.chart":{"source":"iana","extensions":["mag"]},"application/vnd.ecowin.filerequest":{"source":"iana"},"application/vnd.ecowin.fileupdate":{"source":"iana"},"application/vnd.ecowin.series":{"source":"iana"},"application/vnd.ecowin.seriesrequest":{"source":"iana"},"application/vnd.ecowin.seriesupdate":{"source":"iana"},"application/vnd.efi.img":{"source":"iana"},"application/vnd.efi.iso":{"source":"iana"},"application/vnd.emclient.accessrequest+xml":{"source":"iana","compressible":true},"application/vnd.enliven":{"source":"iana","extensions":["nml"]},"application/vnd.enphase.envoy":{"source":"iana"},"application/vnd.eprints.data+xml":{"source":"iana","compressible":true},"application/vnd.epson.esf":{"source":"iana","extensions":["esf"]},"application/vnd.epson.msf":{"source":"iana","extensions":["msf"]},"application/vnd.epson.quickanime":{"source":"iana","extensions":["qam"]},"application/vnd.epson.salt":{"source":"iana","extensions":["slt"]},"application/vnd.epson.ssf":{"source":"iana","extensions":["ssf"]},"application/vnd.ericsson.quickcall":{"source":"iana"},"application/vnd.espass-espass+zip":{"source":"iana","compressible":false},"application/vnd.eszigno3+xml":{"source":"iana","compressible":true,"extensions":["es3","et3"]},"application/vnd.etsi.aoc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.asic-e+zip":{"source":"iana","compressible":false},"application/vnd.etsi.asic-s+zip":{"source":"iana","compressible":false},"application/vnd.etsi.cug+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvcommand+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-bc+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-cod+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsad-npvr+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvservice+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvsync+xml":{"source":"iana","compressible":true},"application/vnd.etsi.iptvueprofile+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mcid+xml":{"source":"iana","compressible":true},"application/vnd.etsi.mheg5":{"source":"iana"},"application/vnd.etsi.overload-control-policy-dataset+xml":{"source":"iana","compressible":true},"application/vnd.etsi.pstn+xml":{"source":"iana","compressible":true},"application/vnd.etsi.sci+xml":{"source":"iana","compressible":true},"application/vnd.etsi.simservs+xml":{"source":"iana","compressible":true},"application/vnd.etsi.timestamp-token":{"source":"iana"},"application/vnd.etsi.tsl+xml":{"source":"iana","compressible":true},"application/vnd.etsi.tsl.der":{"source":"iana"},"application/vnd.eu.kasparian.car+json":{"source":"iana","compressible":true},"application/vnd.eudora.data":{"source":"iana"},"application/vnd.evolv.ecig.profile":{"source":"iana"},"application/vnd.evolv.ecig.settings":{"source":"iana"},"application/vnd.evolv.ecig.theme":{"source":"iana"},"application/vnd.exstream-empower+zip":{"source":"iana","compressible":false},"application/vnd.exstream-package":{"source":"iana"},"application/vnd.ezpix-album":{"source":"iana","extensions":["ez2"]},"application/vnd.ezpix-package":{"source":"iana","extensions":["ez3"]},"application/vnd.f-secure.mobile":{"source":"iana"},"application/vnd.familysearch.gedcom+zip":{"source":"iana","compressible":false},"application/vnd.fastcopy-disk-image":{"source":"iana"},"application/vnd.fdf":{"source":"iana","extensions":["fdf"]},"application/vnd.fdsn.mseed":{"source":"iana","extensions":["mseed"]},"application/vnd.fdsn.seed":{"source":"iana","extensions":["seed","dataless"]},"application/vnd.ffsns":{"source":"iana"},"application/vnd.ficlab.flb+zip":{"source":"iana","compressible":false},"application/vnd.filmit.zfc":{"source":"iana"},"application/vnd.fints":{"source":"iana"},"application/vnd.firemonkeys.cloudcell":{"source":"iana"},"application/vnd.flographit":{"source":"iana","extensions":["gph"]},"application/vnd.fluxtime.clip":{"source":"iana","extensions":["ftc"]},"application/vnd.font-fontforge-sfd":{"source":"iana"},"application/vnd.framemaker":{"source":"iana","extensions":["fm","frame","maker","book"]},"application/vnd.frogans.fnc":{"source":"iana","extensions":["fnc"]},"application/vnd.frogans.ltf":{"source":"iana","extensions":["ltf"]},"application/vnd.fsc.weblaunch":{"source":"iana","extensions":["fsc"]},"application/vnd.fujifilm.fb.docuworks":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.binder":{"source":"iana"},"application/vnd.fujifilm.fb.docuworks.container":{"source":"iana"},"application/vnd.fujifilm.fb.jfi+xml":{"source":"iana","compressible":true},"application/vnd.fujitsu.oasys":{"source":"iana","extensions":["oas"]},"application/vnd.fujitsu.oasys2":{"source":"iana","extensions":["oa2"]},"application/vnd.fujitsu.oasys3":{"source":"iana","extensions":["oa3"]},"application/vnd.fujitsu.oasysgp":{"source":"iana","extensions":["fg5"]},"application/vnd.fujitsu.oasysprs":{"source":"iana","extensions":["bh2"]},"application/vnd.fujixerox.art-ex":{"source":"iana"},"application/vnd.fujixerox.art4":{"source":"iana"},"application/vnd.fujixerox.ddd":{"source":"iana","extensions":["ddd"]},"application/vnd.fujixerox.docuworks":{"source":"iana","extensions":["xdw"]},"application/vnd.fujixerox.docuworks.binder":{"source":"iana","extensions":["xbd"]},"application/vnd.fujixerox.docuworks.container":{"source":"iana"},"application/vnd.fujixerox.hbpl":{"source":"iana"},"application/vnd.fut-misnet":{"source":"iana"},"application/vnd.futoin+cbor":{"source":"iana"},"application/vnd.futoin+json":{"source":"iana","compressible":true},"application/vnd.fuzzysheet":{"source":"iana","extensions":["fzs"]},"application/vnd.genomatix.tuxedo":{"source":"iana","extensions":["txd"]},"application/vnd.gentics.grd+json":{"source":"iana","compressible":true},"application/vnd.geo+json":{"source":"iana","compressible":true},"application/vnd.geocube+xml":{"source":"iana","compressible":true},"application/vnd.geogebra.file":{"source":"iana","extensions":["ggb"]},"application/vnd.geogebra.slides":{"source":"iana"},"application/vnd.geogebra.tool":{"source":"iana","extensions":["ggt"]},"application/vnd.geometry-explorer":{"source":"iana","extensions":["gex","gre"]},"application/vnd.geonext":{"source":"iana","extensions":["gxt"]},"application/vnd.geoplan":{"source":"iana","extensions":["g2w"]},"application/vnd.geospace":{"source":"iana","extensions":["g3w"]},"application/vnd.gerber":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt":{"source":"iana"},"application/vnd.globalplatform.card-content-mgt-response":{"source":"iana"},"application/vnd.gmx":{"source":"iana","extensions":["gmx"]},"application/vnd.google-apps.document":{"compressible":false,"extensions":["gdoc"]},"application/vnd.google-apps.presentation":{"compressible":false,"extensions":["gslides"]},"application/vnd.google-apps.spreadsheet":{"compressible":false,"extensions":["gsheet"]},"application/vnd.google-earth.kml+xml":{"source":"iana","compressible":true,"extensions":["kml"]},"application/vnd.google-earth.kmz":{"source":"iana","compressible":false,"extensions":["kmz"]},"application/vnd.gov.sk.e-form+xml":{"source":"iana","compressible":true},"application/vnd.gov.sk.e-form+zip":{"source":"iana","compressible":false},"application/vnd.gov.sk.xmldatacontainer+xml":{"source":"iana","compressible":true},"application/vnd.grafeq":{"source":"iana","extensions":["gqf","gqs"]},"application/vnd.gridmp":{"source":"iana"},"application/vnd.groove-account":{"source":"iana","extensions":["gac"]},"application/vnd.groove-help":{"source":"iana","extensions":["ghf"]},"application/vnd.groove-identity-message":{"source":"iana","extensions":["gim"]},"application/vnd.groove-injector":{"source":"iana","extensions":["grv"]},"application/vnd.groove-tool-message":{"source":"iana","extensions":["gtm"]},"application/vnd.groove-tool-template":{"source":"iana","extensions":["tpl"]},"application/vnd.groove-vcard":{"source":"iana","extensions":["vcg"]},"application/vnd.hal+json":{"source":"iana","compressible":true},"application/vnd.hal+xml":{"source":"iana","compressible":true,"extensions":["hal"]},"application/vnd.handheld-entertainment+xml":{"source":"iana","compressible":true,"extensions":["zmm"]},"application/vnd.hbci":{"source":"iana","extensions":["hbci"]},"application/vnd.hc+json":{"source":"iana","compressible":true},"application/vnd.hcl-bireports":{"source":"iana"},"application/vnd.hdt":{"source":"iana"},"application/vnd.heroku+json":{"source":"iana","compressible":true},"application/vnd.hhe.lesson-player":{"source":"iana","extensions":["les"]},"application/vnd.hl7cda+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hl7v2+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.hp-hpgl":{"source":"iana","extensions":["hpgl"]},"application/vnd.hp-hpid":{"source":"iana","extensions":["hpid"]},"application/vnd.hp-hps":{"source":"iana","extensions":["hps"]},"application/vnd.hp-jlyt":{"source":"iana","extensions":["jlt"]},"application/vnd.hp-pcl":{"source":"iana","extensions":["pcl"]},"application/vnd.hp-pclxl":{"source":"iana","extensions":["pclxl"]},"application/vnd.httphone":{"source":"iana"},"application/vnd.hydrostatix.sof-data":{"source":"iana","extensions":["sfd-hdstx"]},"application/vnd.hyper+json":{"source":"iana","compressible":true},"application/vnd.hyper-item+json":{"source":"iana","compressible":true},"application/vnd.hyperdrive+json":{"source":"iana","compressible":true},"application/vnd.hzn-3d-crossword":{"source":"iana"},"application/vnd.ibm.afplinedata":{"source":"iana"},"application/vnd.ibm.electronic-media":{"source":"iana"},"application/vnd.ibm.minipay":{"source":"iana","extensions":["mpy"]},"application/vnd.ibm.modcap":{"source":"iana","extensions":["afp","listafp","list3820"]},"application/vnd.ibm.rights-management":{"source":"iana","extensions":["irm"]},"application/vnd.ibm.secure-container":{"source":"iana","extensions":["sc"]},"application/vnd.iccprofile":{"source":"iana","extensions":["icc","icm"]},"application/vnd.ieee.1905":{"source":"iana"},"application/vnd.igloader":{"source":"iana","extensions":["igl"]},"application/vnd.imagemeter.folder+zip":{"source":"iana","compressible":false},"application/vnd.imagemeter.image+zip":{"source":"iana","compressible":false},"application/vnd.immervision-ivp":{"source":"iana","extensions":["ivp"]},"application/vnd.immervision-ivu":{"source":"iana","extensions":["ivu"]},"application/vnd.ims.imsccv1p1":{"source":"iana"},"application/vnd.ims.imsccv1p2":{"source":"iana"},"application/vnd.ims.imsccv1p3":{"source":"iana"},"application/vnd.ims.lis.v2.result+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolconsumerprofile+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolproxy.id+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings+json":{"source":"iana","compressible":true},"application/vnd.ims.lti.v2.toolsettings.simple+json":{"source":"iana","compressible":true},"application/vnd.informedcontrol.rms+xml":{"source":"iana","compressible":true},"application/vnd.informix-visionary":{"source":"iana"},"application/vnd.infotech.project":{"source":"iana"},"application/vnd.infotech.project+xml":{"source":"iana","compressible":true},"application/vnd.innopath.wamp.notification":{"source":"iana"},"application/vnd.insors.igm":{"source":"iana","extensions":["igm"]},"application/vnd.intercon.formnet":{"source":"iana","extensions":["xpw","xpx"]},"application/vnd.intergeo":{"source":"iana","extensions":["i2g"]},"application/vnd.intertrust.digibox":{"source":"iana"},"application/vnd.intertrust.nncp":{"source":"iana"},"application/vnd.intu.qbo":{"source":"iana","extensions":["qbo"]},"application/vnd.intu.qfx":{"source":"iana","extensions":["qfx"]},"application/vnd.iptc.g2.catalogitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.conceptitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.knowledgeitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.newsmessage+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.packageitem+xml":{"source":"iana","compressible":true},"application/vnd.iptc.g2.planningitem+xml":{"source":"iana","compressible":true},"application/vnd.ipunplugged.rcprofile":{"source":"iana","extensions":["rcprofile"]},"application/vnd.irepository.package+xml":{"source":"iana","compressible":true,"extensions":["irp"]},"application/vnd.is-xpr":{"source":"iana","extensions":["xpr"]},"application/vnd.isac.fcs":{"source":"iana","extensions":["fcs"]},"application/vnd.iso11783-10+zip":{"source":"iana","compressible":false},"application/vnd.jam":{"source":"iana","extensions":["jam"]},"application/vnd.japannet-directory-service":{"source":"iana"},"application/vnd.japannet-jpnstore-wakeup":{"source":"iana"},"application/vnd.japannet-payment-wakeup":{"source":"iana"},"application/vnd.japannet-registration":{"source":"iana"},"application/vnd.japannet-registration-wakeup":{"source":"iana"},"application/vnd.japannet-setstore-wakeup":{"source":"iana"},"application/vnd.japannet-verification":{"source":"iana"},"application/vnd.japannet-verification-wakeup":{"source":"iana"},"application/vnd.jcp.javame.midlet-rms":{"source":"iana","extensions":["rms"]},"application/vnd.jisp":{"source":"iana","extensions":["jisp"]},"application/vnd.joost.joda-archive":{"source":"iana","extensions":["joda"]},"application/vnd.jsk.isdn-ngn":{"source":"iana"},"application/vnd.kahootz":{"source":"iana","extensions":["ktz","ktr"]},"application/vnd.kde.karbon":{"source":"iana","extensions":["karbon"]},"application/vnd.kde.kchart":{"source":"iana","extensions":["chrt"]},"application/vnd.kde.kformula":{"source":"iana","extensions":["kfo"]},"application/vnd.kde.kivio":{"source":"iana","extensions":["flw"]},"application/vnd.kde.kontour":{"source":"iana","extensions":["kon"]},"application/vnd.kde.kpresenter":{"source":"iana","extensions":["kpr","kpt"]},"application/vnd.kde.kspread":{"source":"iana","extensions":["ksp"]},"application/vnd.kde.kword":{"source":"iana","extensions":["kwd","kwt"]},"application/vnd.kenameaapp":{"source":"iana","extensions":["htke"]},"application/vnd.kidspiration":{"source":"iana","extensions":["kia"]},"application/vnd.kinar":{"source":"iana","extensions":["kne","knp"]},"application/vnd.koan":{"source":"iana","extensions":["skp","skd","skt","skm"]},"application/vnd.kodak-descriptor":{"source":"iana","extensions":["sse"]},"application/vnd.las":{"source":"iana"},"application/vnd.las.las+json":{"source":"iana","compressible":true},"application/vnd.las.las+xml":{"source":"iana","compressible":true,"extensions":["lasxml"]},"application/vnd.laszip":{"source":"iana"},"application/vnd.leap+json":{"source":"iana","compressible":true},"application/vnd.liberty-request+xml":{"source":"iana","compressible":true},"application/vnd.llamagraphics.life-balance.desktop":{"source":"iana","extensions":["lbd"]},"application/vnd.llamagraphics.life-balance.exchange+xml":{"source":"iana","compressible":true,"extensions":["lbe"]},"application/vnd.logipipe.circuit+zip":{"source":"iana","compressible":false},"application/vnd.loom":{"source":"iana"},"application/vnd.lotus-1-2-3":{"source":"iana","extensions":["123"]},"application/vnd.lotus-approach":{"source":"iana","extensions":["apr"]},"application/vnd.lotus-freelance":{"source":"iana","extensions":["pre"]},"application/vnd.lotus-notes":{"source":"iana","extensions":["nsf"]},"application/vnd.lotus-organizer":{"source":"iana","extensions":["org"]},"application/vnd.lotus-screencam":{"source":"iana","extensions":["scm"]},"application/vnd.lotus-wordpro":{"source":"iana","extensions":["lwp"]},"application/vnd.macports.portpkg":{"source":"iana","extensions":["portpkg"]},"application/vnd.mapbox-vector-tile":{"source":"iana","extensions":["mvt"]},"application/vnd.marlin.drm.actiontoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.conftoken+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.license+xml":{"source":"iana","compressible":true},"application/vnd.marlin.drm.mdcf":{"source":"iana"},"application/vnd.mason+json":{"source":"iana","compressible":true},"application/vnd.maxar.archive.3tz+zip":{"source":"iana","compressible":false},"application/vnd.maxmind.maxmind-db":{"source":"iana"},"application/vnd.mcd":{"source":"iana","extensions":["mcd"]},"application/vnd.medcalcdata":{"source":"iana","extensions":["mc1"]},"application/vnd.mediastation.cdkey":{"source":"iana","extensions":["cdkey"]},"application/vnd.meridian-slingshot":{"source":"iana"},"application/vnd.mfer":{"source":"iana","extensions":["mwf"]},"application/vnd.mfmp":{"source":"iana","extensions":["mfm"]},"application/vnd.micro+json":{"source":"iana","compressible":true},"application/vnd.micrografx.flo":{"source":"iana","extensions":["flo"]},"application/vnd.micrografx.igx":{"source":"iana","extensions":["igx"]},"application/vnd.microsoft.portable-executable":{"source":"iana"},"application/vnd.microsoft.windows.thumbnail-cache":{"source":"iana"},"application/vnd.miele+json":{"source":"iana","compressible":true},"application/vnd.mif":{"source":"iana","extensions":["mif"]},"application/vnd.minisoft-hp3000-save":{"source":"iana"},"application/vnd.mitsubishi.misty-guard.trustweb":{"source":"iana"},"application/vnd.mobius.daf":{"source":"iana","extensions":["daf"]},"application/vnd.mobius.dis":{"source":"iana","extensions":["dis"]},"application/vnd.mobius.mbk":{"source":"iana","extensions":["mbk"]},"application/vnd.mobius.mqy":{"source":"iana","extensions":["mqy"]},"application/vnd.mobius.msl":{"source":"iana","extensions":["msl"]},"application/vnd.mobius.plc":{"source":"iana","extensions":["plc"]},"application/vnd.mobius.txf":{"source":"iana","extensions":["txf"]},"application/vnd.mophun.application":{"source":"iana","extensions":["mpn"]},"application/vnd.mophun.certificate":{"source":"iana","extensions":["mpc"]},"application/vnd.motorola.flexsuite":{"source":"iana"},"application/vnd.motorola.flexsuite.adsi":{"source":"iana"},"application/vnd.motorola.flexsuite.fis":{"source":"iana"},"application/vnd.motorola.flexsuite.gotap":{"source":"iana"},"application/vnd.motorola.flexsuite.kmr":{"source":"iana"},"application/vnd.motorola.flexsuite.ttc":{"source":"iana"},"application/vnd.motorola.flexsuite.wem":{"source":"iana"},"application/vnd.motorola.iprm":{"source":"iana"},"application/vnd.mozilla.xul+xml":{"source":"iana","compressible":true,"extensions":["xul"]},"application/vnd.ms-3mfdocument":{"source":"iana"},"application/vnd.ms-artgalry":{"source":"iana","extensions":["cil"]},"application/vnd.ms-asf":{"source":"iana"},"application/vnd.ms-cab-compressed":{"source":"iana","extensions":["cab"]},"application/vnd.ms-color.iccprofile":{"source":"apache"},"application/vnd.ms-excel":{"source":"iana","compressible":false,"extensions":["xls","xlm","xla","xlc","xlt","xlw"]},"application/vnd.ms-excel.addin.macroenabled.12":{"source":"iana","extensions":["xlam"]},"application/vnd.ms-excel.sheet.binary.macroenabled.12":{"source":"iana","extensions":["xlsb"]},"application/vnd.ms-excel.sheet.macroenabled.12":{"source":"iana","extensions":["xlsm"]},"application/vnd.ms-excel.template.macroenabled.12":{"source":"iana","extensions":["xltm"]},"application/vnd.ms-fontobject":{"source":"iana","compressible":true,"extensions":["eot"]},"application/vnd.ms-htmlhelp":{"source":"iana","extensions":["chm"]},"application/vnd.ms-ims":{"source":"iana","extensions":["ims"]},"application/vnd.ms-lrm":{"source":"iana","extensions":["lrm"]},"application/vnd.ms-office.activex+xml":{"source":"iana","compressible":true},"application/vnd.ms-officetheme":{"source":"iana","extensions":["thmx"]},"application/vnd.ms-opentype":{"source":"apache","compressible":true},"application/vnd.ms-outlook":{"compressible":false,"extensions":["msg"]},"application/vnd.ms-package.obfuscated-opentype":{"source":"apache"},"application/vnd.ms-pki.seccat":{"source":"apache","extensions":["cat"]},"application/vnd.ms-pki.stl":{"source":"apache","extensions":["stl"]},"application/vnd.ms-playready.initiator+xml":{"source":"iana","compressible":true},"application/vnd.ms-powerpoint":{"source":"iana","compressible":false,"extensions":["ppt","pps","pot"]},"application/vnd.ms-powerpoint.addin.macroenabled.12":{"source":"iana","extensions":["ppam"]},"application/vnd.ms-powerpoint.presentation.macroenabled.12":{"source":"iana","extensions":["pptm"]},"application/vnd.ms-powerpoint.slide.macroenabled.12":{"source":"iana","extensions":["sldm"]},"application/vnd.ms-powerpoint.slideshow.macroenabled.12":{"source":"iana","extensions":["ppsm"]},"application/vnd.ms-powerpoint.template.macroenabled.12":{"source":"iana","extensions":["potm"]},"application/vnd.ms-printdevicecapabilities+xml":{"source":"iana","compressible":true},"application/vnd.ms-printing.printticket+xml":{"source":"apache","compressible":true},"application/vnd.ms-printschematicket+xml":{"source":"iana","compressible":true},"application/vnd.ms-project":{"source":"iana","extensions":["mpp","mpt"]},"application/vnd.ms-tnef":{"source":"iana"},"application/vnd.ms-windows.devicepairing":{"source":"iana"},"application/vnd.ms-windows.nwprinting.oob":{"source":"iana"},"application/vnd.ms-windows.printerpairing":{"source":"iana"},"application/vnd.ms-windows.wsd.oob":{"source":"iana"},"application/vnd.ms-wmdrm.lic-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.lic-resp":{"source":"iana"},"application/vnd.ms-wmdrm.meter-chlg-req":{"source":"iana"},"application/vnd.ms-wmdrm.meter-resp":{"source":"iana"},"application/vnd.ms-word.document.macroenabled.12":{"source":"iana","extensions":["docm"]},"application/vnd.ms-word.template.macroenabled.12":{"source":"iana","extensions":["dotm"]},"application/vnd.ms-works":{"source":"iana","extensions":["wps","wks","wcm","wdb"]},"application/vnd.ms-wpl":{"source":"iana","extensions":["wpl"]},"application/vnd.ms-xpsdocument":{"source":"iana","compressible":false,"extensions":["xps"]},"application/vnd.msa-disk-image":{"source":"iana"},"application/vnd.mseq":{"source":"iana","extensions":["mseq"]},"application/vnd.msign":{"source":"iana"},"application/vnd.multiad.creator":{"source":"iana"},"application/vnd.multiad.creator.cif":{"source":"iana"},"application/vnd.music-niff":{"source":"iana"},"application/vnd.musician":{"source":"iana","extensions":["mus"]},"application/vnd.muvee.style":{"source":"iana","extensions":["msty"]},"application/vnd.mynfc":{"source":"iana","extensions":["taglet"]},"application/vnd.nacamar.ybrid+json":{"source":"iana","compressible":true},"application/vnd.ncd.control":{"source":"iana"},"application/vnd.ncd.reference":{"source":"iana"},"application/vnd.nearst.inv+json":{"source":"iana","compressible":true},"application/vnd.nebumind.line":{"source":"iana"},"application/vnd.nervana":{"source":"iana"},"application/vnd.netfpx":{"source":"iana"},"application/vnd.neurolanguage.nlu":{"source":"iana","extensions":["nlu"]},"application/vnd.nimn":{"source":"iana"},"application/vnd.nintendo.nitro.rom":{"source":"iana"},"application/vnd.nintendo.snes.rom":{"source":"iana"},"application/vnd.nitf":{"source":"iana","extensions":["ntf","nitf"]},"application/vnd.noblenet-directory":{"source":"iana","extensions":["nnd"]},"application/vnd.noblenet-sealer":{"source":"iana","extensions":["nns"]},"application/vnd.noblenet-web":{"source":"iana","extensions":["nnw"]},"application/vnd.nokia.catalogs":{"source":"iana"},"application/vnd.nokia.conml+wbxml":{"source":"iana"},"application/vnd.nokia.conml+xml":{"source":"iana","compressible":true},"application/vnd.nokia.iptv.config+xml":{"source":"iana","compressible":true},"application/vnd.nokia.isds-radio-presets":{"source":"iana"},"application/vnd.nokia.landmark+wbxml":{"source":"iana"},"application/vnd.nokia.landmark+xml":{"source":"iana","compressible":true},"application/vnd.nokia.landmarkcollection+xml":{"source":"iana","compressible":true},"application/vnd.nokia.n-gage.ac+xml":{"source":"iana","compressible":true,"extensions":["ac"]},"application/vnd.nokia.n-gage.data":{"source":"iana","extensions":["ngdat"]},"application/vnd.nokia.n-gage.symbian.install":{"source":"iana","extensions":["n-gage"]},"application/vnd.nokia.ncd":{"source":"iana"},"application/vnd.nokia.pcd+wbxml":{"source":"iana"},"application/vnd.nokia.pcd+xml":{"source":"iana","compressible":true},"application/vnd.nokia.radio-preset":{"source":"iana","extensions":["rpst"]},"application/vnd.nokia.radio-presets":{"source":"iana","extensions":["rpss"]},"application/vnd.novadigm.edm":{"source":"iana","extensions":["edm"]},"application/vnd.novadigm.edx":{"source":"iana","extensions":["edx"]},"application/vnd.novadigm.ext":{"source":"iana","extensions":["ext"]},"application/vnd.ntt-local.content-share":{"source":"iana"},"application/vnd.ntt-local.file-transfer":{"source":"iana"},"application/vnd.ntt-local.ogw_remote-access":{"source":"iana"},"application/vnd.ntt-local.sip-ta_remote":{"source":"iana"},"application/vnd.ntt-local.sip-ta_tcp_stream":{"source":"iana"},"application/vnd.oasis.opendocument.chart":{"source":"iana","extensions":["odc"]},"application/vnd.oasis.opendocument.chart-template":{"source":"iana","extensions":["otc"]},"application/vnd.oasis.opendocument.database":{"source":"iana","extensions":["odb"]},"application/vnd.oasis.opendocument.formula":{"source":"iana","extensions":["odf"]},"application/vnd.oasis.opendocument.formula-template":{"source":"iana","extensions":["odft"]},"application/vnd.oasis.opendocument.graphics":{"source":"iana","compressible":false,"extensions":["odg"]},"application/vnd.oasis.opendocument.graphics-template":{"source":"iana","extensions":["otg"]},"application/vnd.oasis.opendocument.image":{"source":"iana","extensions":["odi"]},"application/vnd.oasis.opendocument.image-template":{"source":"iana","extensions":["oti"]},"application/vnd.oasis.opendocument.presentation":{"source":"iana","compressible":false,"extensions":["odp"]},"application/vnd.oasis.opendocument.presentation-template":{"source":"iana","extensions":["otp"]},"application/vnd.oasis.opendocument.spreadsheet":{"source":"iana","compressible":false,"extensions":["ods"]},"application/vnd.oasis.opendocument.spreadsheet-template":{"source":"iana","extensions":["ots"]},"application/vnd.oasis.opendocument.text":{"source":"iana","compressible":false,"extensions":["odt"]},"application/vnd.oasis.opendocument.text-master":{"source":"iana","extensions":["odm"]},"application/vnd.oasis.opendocument.text-template":{"source":"iana","extensions":["ott"]},"application/vnd.oasis.opendocument.text-web":{"source":"iana","extensions":["oth"]},"application/vnd.obn":{"source":"iana"},"application/vnd.ocf+cbor":{"source":"iana"},"application/vnd.oci.image.manifest.v1+json":{"source":"iana","compressible":true},"application/vnd.oftn.l10n+json":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessdownload+xml":{"source":"iana","compressible":true},"application/vnd.oipf.contentaccessstreaming+xml":{"source":"iana","compressible":true},"application/vnd.oipf.cspg-hexbinary":{"source":"iana"},"application/vnd.oipf.dae.svg+xml":{"source":"iana","compressible":true},"application/vnd.oipf.dae.xhtml+xml":{"source":"iana","compressible":true},"application/vnd.oipf.mippvcontrolmessage+xml":{"source":"iana","compressible":true},"application/vnd.oipf.pae.gem":{"source":"iana"},"application/vnd.oipf.spdiscovery+xml":{"source":"iana","compressible":true},"application/vnd.oipf.spdlist+xml":{"source":"iana","compressible":true},"application/vnd.oipf.ueprofile+xml":{"source":"iana","compressible":true},"application/vnd.oipf.userprofile+xml":{"source":"iana","compressible":true},"application/vnd.olpc-sugar":{"source":"iana","extensions":["xo"]},"application/vnd.oma-scws-config":{"source":"iana"},"application/vnd.oma-scws-http-request":{"source":"iana"},"application/vnd.oma-scws-http-response":{"source":"iana"},"application/vnd.oma.bcast.associated-procedure-parameter+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.drm-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.imd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.ltkm":{"source":"iana"},"application/vnd.oma.bcast.notification+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.provisioningtrigger":{"source":"iana"},"application/vnd.oma.bcast.sgboot":{"source":"iana"},"application/vnd.oma.bcast.sgdd+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sgdu":{"source":"iana"},"application/vnd.oma.bcast.simple-symbol-container":{"source":"iana"},"application/vnd.oma.bcast.smartcard-trigger+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.sprov+xml":{"source":"iana","compressible":true},"application/vnd.oma.bcast.stkm":{"source":"iana"},"application/vnd.oma.cab-address-book+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-feature-handler+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-pcc+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-subs-invite+xml":{"source":"iana","compressible":true},"application/vnd.oma.cab-user-prefs+xml":{"source":"iana","compressible":true},"application/vnd.oma.dcd":{"source":"iana"},"application/vnd.oma.dcdc":{"source":"iana"},"application/vnd.oma.dd2+xml":{"source":"iana","compressible":true,"extensions":["dd2"]},"application/vnd.oma.drm.risd+xml":{"source":"iana","compressible":true},"application/vnd.oma.group-usage-list+xml":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+cbor":{"source":"iana"},"application/vnd.oma.lwm2m+json":{"source":"iana","compressible":true},"application/vnd.oma.lwm2m+tlv":{"source":"iana"},"application/vnd.oma.pal+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.detailed-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.final-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.groups+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.invocation-descriptor+xml":{"source":"iana","compressible":true},"application/vnd.oma.poc.optimized-progress-report+xml":{"source":"iana","compressible":true},"application/vnd.oma.push":{"source":"iana"},"application/vnd.oma.scidm.messages+xml":{"source":"iana","compressible":true},"application/vnd.oma.xcap-directory+xml":{"source":"iana","compressible":true},"application/vnd.omads-email+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-file+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omads-folder+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.omaloc-supl-init":{"source":"iana"},"application/vnd.onepager":{"source":"iana"},"application/vnd.onepagertamp":{"source":"iana"},"application/vnd.onepagertamx":{"source":"iana"},"application/vnd.onepagertat":{"source":"iana"},"application/vnd.onepagertatp":{"source":"iana"},"application/vnd.onepagertatx":{"source":"iana"},"application/vnd.openblox.game+xml":{"source":"iana","compressible":true,"extensions":["obgx"]},"application/vnd.openblox.game-binary":{"source":"iana"},"application/vnd.openeye.oeb":{"source":"iana"},"application/vnd.openofficeorg.extension":{"source":"apache","extensions":["oxt"]},"application/vnd.openstreetmap.data+xml":{"source":"iana","compressible":true,"extensions":["osm"]},"application/vnd.opentimestamps.ots":{"source":"iana"},"application/vnd.openxmlformats-officedocument.custom-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.customxmlproperties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawing+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chart+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.extended-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presentation":{"source":"iana","compressible":false,"extensions":["pptx"]},"application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.presprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slide":{"source":"iana","extensions":["sldx"]},"application/vnd.openxmlformats-officedocument.presentationml.slide+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideshow":{"source":"iana","extensions":["ppsx"]},"application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.tags+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.template":{"source":"iana","extensions":["potx"]},"application/vnd.openxmlformats-officedocument.presentationml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":{"source":"iana","compressible":false,"extensions":["xlsx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.template":{"source":"iana","extensions":["xltx"]},"application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.theme+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.themeoverride+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.vmldrawing":{"source":"iana"},"application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document":{"source":"iana","compressible":false,"extensions":["docx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.template":{"source":"iana","extensions":["dotx"]},"application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.core-properties+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml":{"source":"iana","compressible":true},"application/vnd.openxmlformats-package.relationships+xml":{"source":"iana","compressible":true},"application/vnd.oracle.resource+json":{"source":"iana","compressible":true},"application/vnd.orange.indata":{"source":"iana"},"application/vnd.osa.netdeploy":{"source":"iana"},"application/vnd.osgeo.mapguide.package":{"source":"iana","extensions":["mgp"]},"application/vnd.osgi.bundle":{"source":"iana"},"application/vnd.osgi.dp":{"source":"iana","extensions":["dp"]},"application/vnd.osgi.subsystem":{"source":"iana","extensions":["esa"]},"application/vnd.otps.ct-kip+xml":{"source":"iana","compressible":true},"application/vnd.oxli.countgraph":{"source":"iana"},"application/vnd.pagerduty+json":{"source":"iana","compressible":true},"application/vnd.palm":{"source":"iana","extensions":["pdb","pqa","oprc"]},"application/vnd.panoply":{"source":"iana"},"application/vnd.paos.xml":{"source":"iana"},"application/vnd.patentdive":{"source":"iana"},"application/vnd.patientecommsdoc":{"source":"iana"},"application/vnd.pawaafile":{"source":"iana","extensions":["paw"]},"application/vnd.pcos":{"source":"iana"},"application/vnd.pg.format":{"source":"iana","extensions":["str"]},"application/vnd.pg.osasli":{"source":"iana","extensions":["ei6"]},"application/vnd.piaccess.application-licence":{"source":"iana"},"application/vnd.picsel":{"source":"iana","extensions":["efif"]},"application/vnd.pmi.widget":{"source":"iana","extensions":["wg"]},"application/vnd.poc.group-advertisement+xml":{"source":"iana","compressible":true},"application/vnd.pocketlearn":{"source":"iana","extensions":["plf"]},"application/vnd.powerbuilder6":{"source":"iana","extensions":["pbd"]},"application/vnd.powerbuilder6-s":{"source":"iana"},"application/vnd.powerbuilder7":{"source":"iana"},"application/vnd.powerbuilder7-s":{"source":"iana"},"application/vnd.powerbuilder75":{"source":"iana"},"application/vnd.powerbuilder75-s":{"source":"iana"},"application/vnd.preminet":{"source":"iana"},"application/vnd.previewsystems.box":{"source":"iana","extensions":["box"]},"application/vnd.proteus.magazine":{"source":"iana","extensions":["mgz"]},"application/vnd.psfs":{"source":"iana"},"application/vnd.publishare-delta-tree":{"source":"iana","extensions":["qps"]},"application/vnd.pvi.ptid1":{"source":"iana","extensions":["ptid"]},"application/vnd.pwg-multiplexed":{"source":"iana"},"application/vnd.pwg-xhtml-print+xml":{"source":"iana","compressible":true},"application/vnd.qualcomm.brew-app-res":{"source":"iana"},"application/vnd.quarantainenet":{"source":"iana"},"application/vnd.quark.quarkxpress":{"source":"iana","extensions":["qxd","qxt","qwd","qwt","qxl","qxb"]},"application/vnd.quobject-quoxdocument":{"source":"iana"},"application/vnd.radisys.moml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-conn+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-audit-stream+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-conf+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-base+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-detect+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-fax-sendrecv+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-group+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-speech+xml":{"source":"iana","compressible":true},"application/vnd.radisys.msml-dialog-transform+xml":{"source":"iana","compressible":true},"application/vnd.rainstor.data":{"source":"iana"},"application/vnd.rapid":{"source":"iana"},"application/vnd.rar":{"source":"iana","extensions":["rar"]},"application/vnd.realvnc.bed":{"source":"iana","extensions":["bed"]},"application/vnd.recordare.musicxml":{"source":"iana","extensions":["mxl"]},"application/vnd.recordare.musicxml+xml":{"source":"iana","compressible":true,"extensions":["musicxml"]},"application/vnd.renlearn.rlprint":{"source":"iana"},"application/vnd.resilient.logic":{"source":"iana"},"application/vnd.restful+json":{"source":"iana","compressible":true},"application/vnd.rig.cryptonote":{"source":"iana","extensions":["cryptonote"]},"application/vnd.rim.cod":{"source":"apache","extensions":["cod"]},"application/vnd.rn-realmedia":{"source":"apache","extensions":["rm"]},"application/vnd.rn-realmedia-vbr":{"source":"apache","extensions":["rmvb"]},"application/vnd.route66.link66+xml":{"source":"iana","compressible":true,"extensions":["link66"]},"application/vnd.rs-274x":{"source":"iana"},"application/vnd.ruckus.download":{"source":"iana"},"application/vnd.s3sms":{"source":"iana"},"application/vnd.sailingtracker.track":{"source":"iana","extensions":["st"]},"application/vnd.sar":{"source":"iana"},"application/vnd.sbm.cid":{"source":"iana"},"application/vnd.sbm.mid2":{"source":"iana"},"application/vnd.scribus":{"source":"iana"},"application/vnd.sealed.3df":{"source":"iana"},"application/vnd.sealed.csf":{"source":"iana"},"application/vnd.sealed.doc":{"source":"iana"},"application/vnd.sealed.eml":{"source":"iana"},"application/vnd.sealed.mht":{"source":"iana"},"application/vnd.sealed.net":{"source":"iana"},"application/vnd.sealed.ppt":{"source":"iana"},"application/vnd.sealed.tiff":{"source":"iana"},"application/vnd.sealed.xls":{"source":"iana"},"application/vnd.sealedmedia.softseal.html":{"source":"iana"},"application/vnd.sealedmedia.softseal.pdf":{"source":"iana"},"application/vnd.seemail":{"source":"iana","extensions":["see"]},"application/vnd.seis+json":{"source":"iana","compressible":true},"application/vnd.sema":{"source":"iana","extensions":["sema"]},"application/vnd.semd":{"source":"iana","extensions":["semd"]},"application/vnd.semf":{"source":"iana","extensions":["semf"]},"application/vnd.shade-save-file":{"source":"iana"},"application/vnd.shana.informed.formdata":{"source":"iana","extensions":["ifm"]},"application/vnd.shana.informed.formtemplate":{"source":"iana","extensions":["itp"]},"application/vnd.shana.informed.interchange":{"source":"iana","extensions":["iif"]},"application/vnd.shana.informed.package":{"source":"iana","extensions":["ipk"]},"application/vnd.shootproof+json":{"source":"iana","compressible":true},"application/vnd.shopkick+json":{"source":"iana","compressible":true},"application/vnd.shp":{"source":"iana"},"application/vnd.shx":{"source":"iana"},"application/vnd.sigrok.session":{"source":"iana"},"application/vnd.simtech-mindmapper":{"source":"iana","extensions":["twd","twds"]},"application/vnd.siren+json":{"source":"iana","compressible":true},"application/vnd.smaf":{"source":"iana","extensions":["mmf"]},"application/vnd.smart.notebook":{"source":"iana"},"application/vnd.smart.teacher":{"source":"iana","extensions":["teacher"]},"application/vnd.snesdev-page-table":{"source":"iana"},"application/vnd.software602.filler.form+xml":{"source":"iana","compressible":true,"extensions":["fo"]},"application/vnd.software602.filler.form-xml-zip":{"source":"iana"},"application/vnd.solent.sdkm+xml":{"source":"iana","compressible":true,"extensions":["sdkm","sdkd"]},"application/vnd.spotfire.dxp":{"source":"iana","extensions":["dxp"]},"application/vnd.spotfire.sfs":{"source":"iana","extensions":["sfs"]},"application/vnd.sqlite3":{"source":"iana"},"application/vnd.sss-cod":{"source":"iana"},"application/vnd.sss-dtf":{"source":"iana"},"application/vnd.sss-ntf":{"source":"iana"},"application/vnd.stardivision.calc":{"source":"apache","extensions":["sdc"]},"application/vnd.stardivision.draw":{"source":"apache","extensions":["sda"]},"application/vnd.stardivision.impress":{"source":"apache","extensions":["sdd"]},"application/vnd.stardivision.math":{"source":"apache","extensions":["smf"]},"application/vnd.stardivision.writer":{"source":"apache","extensions":["sdw","vor"]},"application/vnd.stardivision.writer-global":{"source":"apache","extensions":["sgl"]},"application/vnd.stepmania.package":{"source":"iana","extensions":["smzip"]},"application/vnd.stepmania.stepchart":{"source":"iana","extensions":["sm"]},"application/vnd.street-stream":{"source":"iana"},"application/vnd.sun.wadl+xml":{"source":"iana","compressible":true,"extensions":["wadl"]},"application/vnd.sun.xml.calc":{"source":"apache","extensions":["sxc"]},"application/vnd.sun.xml.calc.template":{"source":"apache","extensions":["stc"]},"application/vnd.sun.xml.draw":{"source":"apache","extensions":["sxd"]},"application/vnd.sun.xml.draw.template":{"source":"apache","extensions":["std"]},"application/vnd.sun.xml.impress":{"source":"apache","extensions":["sxi"]},"application/vnd.sun.xml.impress.template":{"source":"apache","extensions":["sti"]},"application/vnd.sun.xml.math":{"source":"apache","extensions":["sxm"]},"application/vnd.sun.xml.writer":{"source":"apache","extensions":["sxw"]},"application/vnd.sun.xml.writer.global":{"source":"apache","extensions":["sxg"]},"application/vnd.sun.xml.writer.template":{"source":"apache","extensions":["stw"]},"application/vnd.sus-calendar":{"source":"iana","extensions":["sus","susp"]},"application/vnd.svd":{"source":"iana","extensions":["svd"]},"application/vnd.swiftview-ics":{"source":"iana"},"application/vnd.sycle+xml":{"source":"iana","compressible":true},"application/vnd.syft+json":{"source":"iana","compressible":true},"application/vnd.symbian.install":{"source":"apache","extensions":["sis","sisx"]},"application/vnd.syncml+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xsm"]},"application/vnd.syncml.dm+wbxml":{"source":"iana","charset":"UTF-8","extensions":["bdm"]},"application/vnd.syncml.dm+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["xdm"]},"application/vnd.syncml.dm.notification":{"source":"iana"},"application/vnd.syncml.dmddf+wbxml":{"source":"iana"},"application/vnd.syncml.dmddf+xml":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["ddf"]},"application/vnd.syncml.dmtnds+wbxml":{"source":"iana"},"application/vnd.syncml.dmtnds+xml":{"source":"iana","charset":"UTF-8","compressible":true},"application/vnd.syncml.ds.notification":{"source":"iana"},"application/vnd.tableschema+json":{"source":"iana","compressible":true},"application/vnd.tao.intent-module-archive":{"source":"iana","extensions":["tao"]},"application/vnd.tcpdump.pcap":{"source":"iana","extensions":["pcap","cap","dmp"]},"application/vnd.think-cell.ppttc+json":{"source":"iana","compressible":true},"application/vnd.tmd.mediaflex.api+xml":{"source":"iana","compressible":true},"application/vnd.tml":{"source":"iana"},"application/vnd.tmobile-livetv":{"source":"iana","extensions":["tmo"]},"application/vnd.tri.onesource":{"source":"iana"},"application/vnd.trid.tpt":{"source":"iana","extensions":["tpt"]},"application/vnd.triscape.mxs":{"source":"iana","extensions":["mxs"]},"application/vnd.trueapp":{"source":"iana","extensions":["tra"]},"application/vnd.truedoc":{"source":"iana"},"application/vnd.ubisoft.webplayer":{"source":"iana"},"application/vnd.ufdl":{"source":"iana","extensions":["ufd","ufdl"]},"application/vnd.uiq.theme":{"source":"iana","extensions":["utz"]},"application/vnd.umajin":{"source":"iana","extensions":["umj"]},"application/vnd.unity":{"source":"iana","extensions":["unityweb"]},"application/vnd.uoml+xml":{"source":"iana","compressible":true,"extensions":["uoml"]},"application/vnd.uplanet.alert":{"source":"iana"},"application/vnd.uplanet.alert-wbxml":{"source":"iana"},"application/vnd.uplanet.bearer-choice":{"source":"iana"},"application/vnd.uplanet.bearer-choice-wbxml":{"source":"iana"},"application/vnd.uplanet.cacheop":{"source":"iana"},"application/vnd.uplanet.cacheop-wbxml":{"source":"iana"},"application/vnd.uplanet.channel":{"source":"iana"},"application/vnd.uplanet.channel-wbxml":{"source":"iana"},"application/vnd.uplanet.list":{"source":"iana"},"application/vnd.uplanet.list-wbxml":{"source":"iana"},"application/vnd.uplanet.listcmd":{"source":"iana"},"application/vnd.uplanet.listcmd-wbxml":{"source":"iana"},"application/vnd.uplanet.signal":{"source":"iana"},"application/vnd.uri-map":{"source":"iana"},"application/vnd.valve.source.material":{"source":"iana"},"application/vnd.vcx":{"source":"iana","extensions":["vcx"]},"application/vnd.vd-study":{"source":"iana"},"application/vnd.vectorworks":{"source":"iana"},"application/vnd.vel+json":{"source":"iana","compressible":true},"application/vnd.verimatrix.vcas":{"source":"iana"},"application/vnd.veritone.aion+json":{"source":"iana","compressible":true},"application/vnd.veryant.thin":{"source":"iana"},"application/vnd.ves.encrypted":{"source":"iana"},"application/vnd.vidsoft.vidconference":{"source":"iana"},"application/vnd.visio":{"source":"iana","extensions":["vsd","vst","vss","vsw"]},"application/vnd.visionary":{"source":"iana","extensions":["vis"]},"application/vnd.vividence.scriptfile":{"source":"iana"},"application/vnd.vsf":{"source":"iana","extensions":["vsf"]},"application/vnd.wap.sic":{"source":"iana"},"application/vnd.wap.slc":{"source":"iana"},"application/vnd.wap.wbxml":{"source":"iana","charset":"UTF-8","extensions":["wbxml"]},"application/vnd.wap.wmlc":{"source":"iana","extensions":["wmlc"]},"application/vnd.wap.wmlscriptc":{"source":"iana","extensions":["wmlsc"]},"application/vnd.webturbo":{"source":"iana","extensions":["wtb"]},"application/vnd.wfa.dpp":{"source":"iana"},"application/vnd.wfa.p2p":{"source":"iana"},"application/vnd.wfa.wsc":{"source":"iana"},"application/vnd.windows.devicepairing":{"source":"iana"},"application/vnd.wmc":{"source":"iana"},"application/vnd.wmf.bootstrap":{"source":"iana"},"application/vnd.wolfram.mathematica":{"source":"iana"},"application/vnd.wolfram.mathematica.package":{"source":"iana"},"application/vnd.wolfram.player":{"source":"iana","extensions":["nbp"]},"application/vnd.wordperfect":{"source":"iana","extensions":["wpd"]},"application/vnd.wqd":{"source":"iana","extensions":["wqd"]},"application/vnd.wrq-hp3000-labelled":{"source":"iana"},"application/vnd.wt.stf":{"source":"iana","extensions":["stf"]},"application/vnd.wv.csp+wbxml":{"source":"iana"},"application/vnd.wv.csp+xml":{"source":"iana","compressible":true},"application/vnd.wv.ssp+xml":{"source":"iana","compressible":true},"application/vnd.xacml+json":{"source":"iana","compressible":true},"application/vnd.xara":{"source":"iana","extensions":["xar"]},"application/vnd.xfdl":{"source":"iana","extensions":["xfdl"]},"application/vnd.xfdl.webform":{"source":"iana"},"application/vnd.xmi+xml":{"source":"iana","compressible":true},"application/vnd.xmpie.cpkg":{"source":"iana"},"application/vnd.xmpie.dpkg":{"source":"iana"},"application/vnd.xmpie.plan":{"source":"iana"},"application/vnd.xmpie.ppkg":{"source":"iana"},"application/vnd.xmpie.xlim":{"source":"iana"},"application/vnd.yamaha.hv-dic":{"source":"iana","extensions":["hvd"]},"application/vnd.yamaha.hv-script":{"source":"iana","extensions":["hvs"]},"application/vnd.yamaha.hv-voice":{"source":"iana","extensions":["hvp"]},"application/vnd.yamaha.openscoreformat":{"source":"iana","extensions":["osf"]},"application/vnd.yamaha.openscoreformat.osfpvg+xml":{"source":"iana","compressible":true,"extensions":["osfpvg"]},"application/vnd.yamaha.remote-setup":{"source":"iana"},"application/vnd.yamaha.smaf-audio":{"source":"iana","extensions":["saf"]},"application/vnd.yamaha.smaf-phrase":{"source":"iana","extensions":["spf"]},"application/vnd.yamaha.through-ngn":{"source":"iana"},"application/vnd.yamaha.tunnel-udpencap":{"source":"iana"},"application/vnd.yaoweme":{"source":"iana"},"application/vnd.yellowriver-custom-menu":{"source":"iana","extensions":["cmp"]},"application/vnd.youtube.yt":{"source":"iana"},"application/vnd.zul":{"source":"iana","extensions":["zir","zirz"]},"application/vnd.zzazz.deck+xml":{"source":"iana","compressible":true,"extensions":["zaz"]},"application/voicexml+xml":{"source":"iana","compressible":true,"extensions":["vxml"]},"application/voucher-cms+json":{"source":"iana","compressible":true},"application/vq-rtcpxr":{"source":"iana"},"application/wasm":{"source":"iana","compressible":true,"extensions":["wasm"]},"application/watcherinfo+xml":{"source":"iana","compressible":true,"extensions":["wif"]},"application/webpush-options+json":{"source":"iana","compressible":true},"application/whoispp-query":{"source":"iana"},"application/whoispp-response":{"source":"iana"},"application/widget":{"source":"iana","extensions":["wgt"]},"application/winhlp":{"source":"apache","extensions":["hlp"]},"application/wita":{"source":"iana"},"application/wordperfect5.1":{"source":"iana"},"application/wsdl+xml":{"source":"iana","compressible":true,"extensions":["wsdl"]},"application/wspolicy+xml":{"source":"iana","compressible":true,"extensions":["wspolicy"]},"application/x-7z-compressed":{"source":"apache","compressible":false,"extensions":["7z"]},"application/x-abiword":{"source":"apache","extensions":["abw"]},"application/x-ace-compressed":{"source":"apache","extensions":["ace"]},"application/x-amf":{"source":"apache"},"application/x-apple-diskimage":{"source":"apache","extensions":["dmg"]},"application/x-arj":{"compressible":false,"extensions":["arj"]},"application/x-authorware-bin":{"source":"apache","extensions":["aab","x32","u32","vox"]},"application/x-authorware-map":{"source":"apache","extensions":["aam"]},"application/x-authorware-seg":{"source":"apache","extensions":["aas"]},"application/x-bcpio":{"source":"apache","extensions":["bcpio"]},"application/x-bdoc":{"compressible":false,"extensions":["bdoc"]},"application/x-bittorrent":{"source":"apache","extensions":["torrent"]},"application/x-blorb":{"source":"apache","extensions":["blb","blorb"]},"application/x-bzip":{"source":"apache","compressible":false,"extensions":["bz"]},"application/x-bzip2":{"source":"apache","compressible":false,"extensions":["bz2","boz"]},"application/x-cbr":{"source":"apache","extensions":["cbr","cba","cbt","cbz","cb7"]},"application/x-cdlink":{"source":"apache","extensions":["vcd"]},"application/x-cfs-compressed":{"source":"apache","extensions":["cfs"]},"application/x-chat":{"source":"apache","extensions":["chat"]},"application/x-chess-pgn":{"source":"apache","extensions":["pgn"]},"application/x-chrome-extension":{"extensions":["crx"]},"application/x-cocoa":{"source":"nginx","extensions":["cco"]},"application/x-compress":{"source":"apache"},"application/x-conference":{"source":"apache","extensions":["nsc"]},"application/x-cpio":{"source":"apache","extensions":["cpio"]},"application/x-csh":{"source":"apache","extensions":["csh"]},"application/x-deb":{"compressible":false},"application/x-debian-package":{"source":"apache","extensions":["deb","udeb"]},"application/x-dgc-compressed":{"source":"apache","extensions":["dgc"]},"application/x-director":{"source":"apache","extensions":["dir","dcr","dxr","cst","cct","cxt","w3d","fgd","swa"]},"application/x-doom":{"source":"apache","extensions":["wad"]},"application/x-dtbncx+xml":{"source":"apache","compressible":true,"extensions":["ncx"]},"application/x-dtbook+xml":{"source":"apache","compressible":true,"extensions":["dtb"]},"application/x-dtbresource+xml":{"source":"apache","compressible":true,"extensions":["res"]},"application/x-dvi":{"source":"apache","compressible":false,"extensions":["dvi"]},"application/x-envoy":{"source":"apache","extensions":["evy"]},"application/x-eva":{"source":"apache","extensions":["eva"]},"application/x-font-bdf":{"source":"apache","extensions":["bdf"]},"application/x-font-dos":{"source":"apache"},"application/x-font-framemaker":{"source":"apache"},"application/x-font-ghostscript":{"source":"apache","extensions":["gsf"]},"application/x-font-libgrx":{"source":"apache"},"application/x-font-linux-psf":{"source":"apache","extensions":["psf"]},"application/x-font-pcf":{"source":"apache","extensions":["pcf"]},"application/x-font-snf":{"source":"apache","extensions":["snf"]},"application/x-font-speedo":{"source":"apache"},"application/x-font-sunos-news":{"source":"apache"},"application/x-font-type1":{"source":"apache","extensions":["pfa","pfb","pfm","afm"]},"application/x-font-vfont":{"source":"apache"},"application/x-freearc":{"source":"apache","extensions":["arc"]},"application/x-futuresplash":{"source":"apache","extensions":["spl"]},"application/x-gca-compressed":{"source":"apache","extensions":["gca"]},"application/x-glulx":{"source":"apache","extensions":["ulx"]},"application/x-gnumeric":{"source":"apache","extensions":["gnumeric"]},"application/x-gramps-xml":{"source":"apache","extensions":["gramps"]},"application/x-gtar":{"source":"apache","extensions":["gtar"]},"application/x-gzip":{"source":"apache"},"application/x-hdf":{"source":"apache","extensions":["hdf"]},"application/x-httpd-php":{"compressible":true,"extensions":["php"]},"application/x-install-instructions":{"source":"apache","extensions":["install"]},"application/x-iso9660-image":{"source":"apache","extensions":["iso"]},"application/x-iwork-keynote-sffkey":{"extensions":["key"]},"application/x-iwork-numbers-sffnumbers":{"extensions":["numbers"]},"application/x-iwork-pages-sffpages":{"extensions":["pages"]},"application/x-java-archive-diff":{"source":"nginx","extensions":["jardiff"]},"application/x-java-jnlp-file":{"source":"apache","compressible":false,"extensions":["jnlp"]},"application/x-javascript":{"compressible":true},"application/x-keepass2":{"extensions":["kdbx"]},"application/x-latex":{"source":"apache","compressible":false,"extensions":["latex"]},"application/x-lua-bytecode":{"extensions":["luac"]},"application/x-lzh-compressed":{"source":"apache","extensions":["lzh","lha"]},"application/x-makeself":{"source":"nginx","extensions":["run"]},"application/x-mie":{"source":"apache","extensions":["mie"]},"application/x-mobipocket-ebook":{"source":"apache","extensions":["prc","mobi"]},"application/x-mpegurl":{"compressible":false},"application/x-ms-application":{"source":"apache","extensions":["application"]},"application/x-ms-shortcut":{"source":"apache","extensions":["lnk"]},"application/x-ms-wmd":{"source":"apache","extensions":["wmd"]},"application/x-ms-wmz":{"source":"apache","extensions":["wmz"]},"application/x-ms-xbap":{"source":"apache","extensions":["xbap"]},"application/x-msaccess":{"source":"apache","extensions":["mdb"]},"application/x-msbinder":{"source":"apache","extensions":["obd"]},"application/x-mscardfile":{"source":"apache","extensions":["crd"]},"application/x-msclip":{"source":"apache","extensions":["clp"]},"application/x-msdos-program":{"extensions":["exe"]},"application/x-msdownload":{"source":"apache","extensions":["exe","dll","com","bat","msi"]},"application/x-msmediaview":{"source":"apache","extensions":["mvb","m13","m14"]},"application/x-msmetafile":{"source":"apache","extensions":["wmf","wmz","emf","emz"]},"application/x-msmoney":{"source":"apache","extensions":["mny"]},"application/x-mspublisher":{"source":"apache","extensions":["pub"]},"application/x-msschedule":{"source":"apache","extensions":["scd"]},"application/x-msterminal":{"source":"apache","extensions":["trm"]},"application/x-mswrite":{"source":"apache","extensions":["wri"]},"application/x-netcdf":{"source":"apache","extensions":["nc","cdf"]},"application/x-ns-proxy-autoconfig":{"compressible":true,"extensions":["pac"]},"application/x-nzb":{"source":"apache","extensions":["nzb"]},"application/x-perl":{"source":"nginx","extensions":["pl","pm"]},"application/x-pilot":{"source":"nginx","extensions":["prc","pdb"]},"application/x-pkcs12":{"source":"apache","compressible":false,"extensions":["p12","pfx"]},"application/x-pkcs7-certificates":{"source":"apache","extensions":["p7b","spc"]},"application/x-pkcs7-certreqresp":{"source":"apache","extensions":["p7r"]},"application/x-pki-message":{"source":"iana"},"application/x-rar-compressed":{"source":"apache","compressible":false,"extensions":["rar"]},"application/x-redhat-package-manager":{"source":"nginx","extensions":["rpm"]},"application/x-research-info-systems":{"source":"apache","extensions":["ris"]},"application/x-sea":{"source":"nginx","extensions":["sea"]},"application/x-sh":{"source":"apache","compressible":true,"extensions":["sh"]},"application/x-shar":{"source":"apache","extensions":["shar"]},"application/x-shockwave-flash":{"source":"apache","compressible":false,"extensions":["swf"]},"application/x-silverlight-app":{"source":"apache","extensions":["xap"]},"application/x-sql":{"source":"apache","extensions":["sql"]},"application/x-stuffit":{"source":"apache","compressible":false,"extensions":["sit"]},"application/x-stuffitx":{"source":"apache","extensions":["sitx"]},"application/x-subrip":{"source":"apache","extensions":["srt"]},"application/x-sv4cpio":{"source":"apache","extensions":["sv4cpio"]},"application/x-sv4crc":{"source":"apache","extensions":["sv4crc"]},"application/x-t3vm-image":{"source":"apache","extensions":["t3"]},"application/x-tads":{"source":"apache","extensions":["gam"]},"application/x-tar":{"source":"apache","compressible":true,"extensions":["tar"]},"application/x-tcl":{"source":"apache","extensions":["tcl","tk"]},"application/x-tex":{"source":"apache","extensions":["tex"]},"application/x-tex-tfm":{"source":"apache","extensions":["tfm"]},"application/x-texinfo":{"source":"apache","extensions":["texinfo","texi"]},"application/x-tgif":{"source":"apache","extensions":["obj"]},"application/x-ustar":{"source":"apache","extensions":["ustar"]},"application/x-virtualbox-hdd":{"compressible":true,"extensions":["hdd"]},"application/x-virtualbox-ova":{"compressible":true,"extensions":["ova"]},"application/x-virtualbox-ovf":{"compressible":true,"extensions":["ovf"]},"application/x-virtualbox-vbox":{"compressible":true,"extensions":["vbox"]},"application/x-virtualbox-vbox-extpack":{"compressible":false,"extensions":["vbox-extpack"]},"application/x-virtualbox-vdi":{"compressible":true,"extensions":["vdi"]},"application/x-virtualbox-vhd":{"compressible":true,"extensions":["vhd"]},"application/x-virtualbox-vmdk":{"compressible":true,"extensions":["vmdk"]},"application/x-wais-source":{"source":"apache","extensions":["src"]},"application/x-web-app-manifest+json":{"compressible":true,"extensions":["webapp"]},"application/x-www-form-urlencoded":{"source":"iana","compressible":true},"application/x-x509-ca-cert":{"source":"iana","extensions":["der","crt","pem"]},"application/x-x509-ca-ra-cert":{"source":"iana"},"application/x-x509-next-ca-cert":{"source":"iana"},"application/x-xfig":{"source":"apache","extensions":["fig"]},"application/x-xliff+xml":{"source":"apache","compressible":true,"extensions":["xlf"]},"application/x-xpinstall":{"source":"apache","compressible":false,"extensions":["xpi"]},"application/x-xz":{"source":"apache","extensions":["xz"]},"application/x-zmachine":{"source":"apache","extensions":["z1","z2","z3","z4","z5","z6","z7","z8"]},"application/x400-bp":{"source":"iana"},"application/xacml+xml":{"source":"iana","compressible":true},"application/xaml+xml":{"source":"apache","compressible":true,"extensions":["xaml"]},"application/xcap-att+xml":{"source":"iana","compressible":true,"extensions":["xav"]},"application/xcap-caps+xml":{"source":"iana","compressible":true,"extensions":["xca"]},"application/xcap-diff+xml":{"source":"iana","compressible":true,"extensions":["xdf"]},"application/xcap-el+xml":{"source":"iana","compressible":true,"extensions":["xel"]},"application/xcap-error+xml":{"source":"iana","compressible":true},"application/xcap-ns+xml":{"source":"iana","compressible":true,"extensions":["xns"]},"application/xcon-conference-info+xml":{"source":"iana","compressible":true},"application/xcon-conference-info-diff+xml":{"source":"iana","compressible":true},"application/xenc+xml":{"source":"iana","compressible":true,"extensions":["xenc"]},"application/xhtml+xml":{"source":"iana","compressible":true,"extensions":["xhtml","xht"]},"application/xhtml-voice+xml":{"source":"apache","compressible":true},"application/xliff+xml":{"source":"iana","compressible":true,"extensions":["xlf"]},"application/xml":{"source":"iana","compressible":true,"extensions":["xml","xsl","xsd","rng"]},"application/xml-dtd":{"source":"iana","compressible":true,"extensions":["dtd"]},"application/xml-external-parsed-entity":{"source":"iana"},"application/xml-patch+xml":{"source":"iana","compressible":true},"application/xmpp+xml":{"source":"iana","compressible":true},"application/xop+xml":{"source":"iana","compressible":true,"extensions":["xop"]},"application/xproc+xml":{"source":"apache","compressible":true,"extensions":["xpl"]},"application/xslt+xml":{"source":"iana","compressible":true,"extensions":["xsl","xslt"]},"application/xspf+xml":{"source":"apache","compressible":true,"extensions":["xspf"]},"application/xv+xml":{"source":"iana","compressible":true,"extensions":["mxml","xhvml","xvml","xvm"]},"application/yang":{"source":"iana","extensions":["yang"]},"application/yang-data+json":{"source":"iana","compressible":true},"application/yang-data+xml":{"source":"iana","compressible":true},"application/yang-patch+json":{"source":"iana","compressible":true},"application/yang-patch+xml":{"source":"iana","compressible":true},"application/yin+xml":{"source":"iana","compressible":true,"extensions":["yin"]},"application/zip":{"source":"iana","compressible":false,"extensions":["zip"]},"application/zlib":{"source":"iana"},"application/zstd":{"source":"iana"},"audio/1d-interleaved-parityfec":{"source":"iana"},"audio/32kadpcm":{"source":"iana"},"audio/3gpp":{"source":"iana","compressible":false,"extensions":["3gpp"]},"audio/3gpp2":{"source":"iana"},"audio/aac":{"source":"iana"},"audio/ac3":{"source":"iana"},"audio/adpcm":{"source":"apache","extensions":["adp"]},"audio/amr":{"source":"iana","extensions":["amr"]},"audio/amr-wb":{"source":"iana"},"audio/amr-wb+":{"source":"iana"},"audio/aptx":{"source":"iana"},"audio/asc":{"source":"iana"},"audio/atrac-advanced-lossless":{"source":"iana"},"audio/atrac-x":{"source":"iana"},"audio/atrac3":{"source":"iana"},"audio/basic":{"source":"iana","compressible":false,"extensions":["au","snd"]},"audio/bv16":{"source":"iana"},"audio/bv32":{"source":"iana"},"audio/clearmode":{"source":"iana"},"audio/cn":{"source":"iana"},"audio/dat12":{"source":"iana"},"audio/dls":{"source":"iana"},"audio/dsr-es201108":{"source":"iana"},"audio/dsr-es202050":{"source":"iana"},"audio/dsr-es202211":{"source":"iana"},"audio/dsr-es202212":{"source":"iana"},"audio/dv":{"source":"iana"},"audio/dvi4":{"source":"iana"},"audio/eac3":{"source":"iana"},"audio/encaprtp":{"source":"iana"},"audio/evrc":{"source":"iana"},"audio/evrc-qcp":{"source":"iana"},"audio/evrc0":{"source":"iana"},"audio/evrc1":{"source":"iana"},"audio/evrcb":{"source":"iana"},"audio/evrcb0":{"source":"iana"},"audio/evrcb1":{"source":"iana"},"audio/evrcnw":{"source":"iana"},"audio/evrcnw0":{"source":"iana"},"audio/evrcnw1":{"source":"iana"},"audio/evrcwb":{"source":"iana"},"audio/evrcwb0":{"source":"iana"},"audio/evrcwb1":{"source":"iana"},"audio/evs":{"source":"iana"},"audio/flexfec":{"source":"iana"},"audio/fwdred":{"source":"iana"},"audio/g711-0":{"source":"iana"},"audio/g719":{"source":"iana"},"audio/g722":{"source":"iana"},"audio/g7221":{"source":"iana"},"audio/g723":{"source":"iana"},"audio/g726-16":{"source":"iana"},"audio/g726-24":{"source":"iana"},"audio/g726-32":{"source":"iana"},"audio/g726-40":{"source":"iana"},"audio/g728":{"source":"iana"},"audio/g729":{"source":"iana"},"audio/g7291":{"source":"iana"},"audio/g729d":{"source":"iana"},"audio/g729e":{"source":"iana"},"audio/gsm":{"source":"iana"},"audio/gsm-efr":{"source":"iana"},"audio/gsm-hr-08":{"source":"iana"},"audio/ilbc":{"source":"iana"},"audio/ip-mr_v2.5":{"source":"iana"},"audio/isac":{"source":"apache"},"audio/l16":{"source":"iana"},"audio/l20":{"source":"iana"},"audio/l24":{"source":"iana","compressible":false},"audio/l8":{"source":"iana"},"audio/lpc":{"source":"iana"},"audio/melp":{"source":"iana"},"audio/melp1200":{"source":"iana"},"audio/melp2400":{"source":"iana"},"audio/melp600":{"source":"iana"},"audio/mhas":{"source":"iana"},"audio/midi":{"source":"apache","extensions":["mid","midi","kar","rmi"]},"audio/mobile-xmf":{"source":"iana","extensions":["mxmf"]},"audio/mp3":{"compressible":false,"extensions":["mp3"]},"audio/mp4":{"source":"iana","compressible":false,"extensions":["m4a","mp4a"]},"audio/mp4a-latm":{"source":"iana"},"audio/mpa":{"source":"iana"},"audio/mpa-robust":{"source":"iana"},"audio/mpeg":{"source":"iana","compressible":false,"extensions":["mpga","mp2","mp2a","mp3","m2a","m3a"]},"audio/mpeg4-generic":{"source":"iana"},"audio/musepack":{"source":"apache"},"audio/ogg":{"source":"iana","compressible":false,"extensions":["oga","ogg","spx","opus"]},"audio/opus":{"source":"iana"},"audio/parityfec":{"source":"iana"},"audio/pcma":{"source":"iana"},"audio/pcma-wb":{"source":"iana"},"audio/pcmu":{"source":"iana"},"audio/pcmu-wb":{"source":"iana"},"audio/prs.sid":{"source":"iana"},"audio/qcelp":{"source":"iana"},"audio/raptorfec":{"source":"iana"},"audio/red":{"source":"iana"},"audio/rtp-enc-aescm128":{"source":"iana"},"audio/rtp-midi":{"source":"iana"},"audio/rtploopback":{"source":"iana"},"audio/rtx":{"source":"iana"},"audio/s3m":{"source":"apache","extensions":["s3m"]},"audio/scip":{"source":"iana"},"audio/silk":{"source":"apache","extensions":["sil"]},"audio/smv":{"source":"iana"},"audio/smv-qcp":{"source":"iana"},"audio/smv0":{"source":"iana"},"audio/sofa":{"source":"iana"},"audio/sp-midi":{"source":"iana"},"audio/speex":{"source":"iana"},"audio/t140c":{"source":"iana"},"audio/t38":{"source":"iana"},"audio/telephone-event":{"source":"iana"},"audio/tetra_acelp":{"source":"iana"},"audio/tetra_acelp_bb":{"source":"iana"},"audio/tone":{"source":"iana"},"audio/tsvcis":{"source":"iana"},"audio/uemclip":{"source":"iana"},"audio/ulpfec":{"source":"iana"},"audio/usac":{"source":"iana"},"audio/vdvi":{"source":"iana"},"audio/vmr-wb":{"source":"iana"},"audio/vnd.3gpp.iufp":{"source":"iana"},"audio/vnd.4sb":{"source":"iana"},"audio/vnd.audiokoz":{"source":"iana"},"audio/vnd.celp":{"source":"iana"},"audio/vnd.cisco.nse":{"source":"iana"},"audio/vnd.cmles.radio-events":{"source":"iana"},"audio/vnd.cns.anp1":{"source":"iana"},"audio/vnd.cns.inf1":{"source":"iana"},"audio/vnd.dece.audio":{"source":"iana","extensions":["uva","uvva"]},"audio/vnd.digital-winds":{"source":"iana","extensions":["eol"]},"audio/vnd.dlna.adts":{"source":"iana"},"audio/vnd.dolby.heaac.1":{"source":"iana"},"audio/vnd.dolby.heaac.2":{"source":"iana"},"audio/vnd.dolby.mlp":{"source":"iana"},"audio/vnd.dolby.mps":{"source":"iana"},"audio/vnd.dolby.pl2":{"source":"iana"},"audio/vnd.dolby.pl2x":{"source":"iana"},"audio/vnd.dolby.pl2z":{"source":"iana"},"audio/vnd.dolby.pulse.1":{"source":"iana"},"audio/vnd.dra":{"source":"iana","extensions":["dra"]},"audio/vnd.dts":{"source":"iana","extensions":["dts"]},"audio/vnd.dts.hd":{"source":"iana","extensions":["dtshd"]},"audio/vnd.dts.uhd":{"source":"iana"},"audio/vnd.dvb.file":{"source":"iana"},"audio/vnd.everad.plj":{"source":"iana"},"audio/vnd.hns.audio":{"source":"iana"},"audio/vnd.lucent.voice":{"source":"iana","extensions":["lvp"]},"audio/vnd.ms-playready.media.pya":{"source":"iana","extensions":["pya"]},"audio/vnd.nokia.mobile-xmf":{"source":"iana"},"audio/vnd.nortel.vbk":{"source":"iana"},"audio/vnd.nuera.ecelp4800":{"source":"iana","extensions":["ecelp4800"]},"audio/vnd.nuera.ecelp7470":{"source":"iana","extensions":["ecelp7470"]},"audio/vnd.nuera.ecelp9600":{"source":"iana","extensions":["ecelp9600"]},"audio/vnd.octel.sbc":{"source":"iana"},"audio/vnd.presonus.multitrack":{"source":"iana"},"audio/vnd.qcelp":{"source":"iana"},"audio/vnd.rhetorex.32kadpcm":{"source":"iana"},"audio/vnd.rip":{"source":"iana","extensions":["rip"]},"audio/vnd.rn-realaudio":{"compressible":false},"audio/vnd.sealedmedia.softseal.mpeg":{"source":"iana"},"audio/vnd.vmx.cvsd":{"source":"iana"},"audio/vnd.wave":{"compressible":false},"audio/vorbis":{"source":"iana","compressible":false},"audio/vorbis-config":{"source":"iana"},"audio/wav":{"compressible":false,"extensions":["wav"]},"audio/wave":{"compressible":false,"extensions":["wav"]},"audio/webm":{"source":"apache","compressible":false,"extensions":["weba"]},"audio/x-aac":{"source":"apache","compressible":false,"extensions":["aac"]},"audio/x-aiff":{"source":"apache","extensions":["aif","aiff","aifc"]},"audio/x-caf":{"source":"apache","compressible":false,"extensions":["caf"]},"audio/x-flac":{"source":"apache","extensions":["flac"]},"audio/x-m4a":{"source":"nginx","extensions":["m4a"]},"audio/x-matroska":{"source":"apache","extensions":["mka"]},"audio/x-mpegurl":{"source":"apache","extensions":["m3u"]},"audio/x-ms-wax":{"source":"apache","extensions":["wax"]},"audio/x-ms-wma":{"source":"apache","extensions":["wma"]},"audio/x-pn-realaudio":{"source":"apache","extensions":["ram","ra"]},"audio/x-pn-realaudio-plugin":{"source":"apache","extensions":["rmp"]},"audio/x-realaudio":{"source":"nginx","extensions":["ra"]},"audio/x-tta":{"source":"apache"},"audio/x-wav":{"source":"apache","extensions":["wav"]},"audio/xm":{"source":"apache","extensions":["xm"]},"chemical/x-cdx":{"source":"apache","extensions":["cdx"]},"chemical/x-cif":{"source":"apache","extensions":["cif"]},"chemical/x-cmdf":{"source":"apache","extensions":["cmdf"]},"chemical/x-cml":{"source":"apache","extensions":["cml"]},"chemical/x-csml":{"source":"apache","extensions":["csml"]},"chemical/x-pdb":{"source":"apache"},"chemical/x-xyz":{"source":"apache","extensions":["xyz"]},"font/collection":{"source":"iana","extensions":["ttc"]},"font/otf":{"source":"iana","compressible":true,"extensions":["otf"]},"font/sfnt":{"source":"iana"},"font/ttf":{"source":"iana","compressible":true,"extensions":["ttf"]},"font/woff":{"source":"iana","extensions":["woff"]},"font/woff2":{"source":"iana","extensions":["woff2"]},"image/aces":{"source":"iana","extensions":["exr"]},"image/apng":{"compressible":false,"extensions":["apng"]},"image/avci":{"source":"iana","extensions":["avci"]},"image/avcs":{"source":"iana","extensions":["avcs"]},"image/avif":{"source":"iana","compressible":false,"extensions":["avif"]},"image/bmp":{"source":"iana","compressible":true,"extensions":["bmp"]},"image/cgm":{"source":"iana","extensions":["cgm"]},"image/dicom-rle":{"source":"iana","extensions":["drle"]},"image/emf":{"source":"iana","extensions":["emf"]},"image/fits":{"source":"iana","extensions":["fits"]},"image/g3fax":{"source":"iana","extensions":["g3"]},"image/gif":{"source":"iana","compressible":false,"extensions":["gif"]},"image/heic":{"source":"iana","extensions":["heic"]},"image/heic-sequence":{"source":"iana","extensions":["heics"]},"image/heif":{"source":"iana","extensions":["heif"]},"image/heif-sequence":{"source":"iana","extensions":["heifs"]},"image/hej2k":{"source":"iana","extensions":["hej2"]},"image/hsj2":{"source":"iana","extensions":["hsj2"]},"image/ief":{"source":"iana","extensions":["ief"]},"image/jls":{"source":"iana","extensions":["jls"]},"image/jp2":{"source":"iana","compressible":false,"extensions":["jp2","jpg2"]},"image/jpeg":{"source":"iana","compressible":false,"extensions":["jpeg","jpg","jpe"]},"image/jph":{"source":"iana","extensions":["jph"]},"image/jphc":{"source":"iana","extensions":["jhc"]},"image/jpm":{"source":"iana","compressible":false,"extensions":["jpm"]},"image/jpx":{"source":"iana","compressible":false,"extensions":["jpx","jpf"]},"image/jxr":{"source":"iana","extensions":["jxr"]},"image/jxra":{"source":"iana","extensions":["jxra"]},"image/jxrs":{"source":"iana","extensions":["jxrs"]},"image/jxs":{"source":"iana","extensions":["jxs"]},"image/jxsc":{"source":"iana","extensions":["jxsc"]},"image/jxsi":{"source":"iana","extensions":["jxsi"]},"image/jxss":{"source":"iana","extensions":["jxss"]},"image/ktx":{"source":"iana","extensions":["ktx"]},"image/ktx2":{"source":"iana","extensions":["ktx2"]},"image/naplps":{"source":"iana"},"image/pjpeg":{"compressible":false},"image/png":{"source":"iana","compressible":false,"extensions":["png"]},"image/prs.btif":{"source":"iana","extensions":["btif"]},"image/prs.pti":{"source":"iana","extensions":["pti"]},"image/pwg-raster":{"source":"iana"},"image/sgi":{"source":"apache","extensions":["sgi"]},"image/svg+xml":{"source":"iana","compressible":true,"extensions":["svg","svgz"]},"image/t38":{"source":"iana","extensions":["t38"]},"image/tiff":{"source":"iana","compressible":false,"extensions":["tif","tiff"]},"image/tiff-fx":{"source":"iana","extensions":["tfx"]},"image/vnd.adobe.photoshop":{"source":"iana","compressible":true,"extensions":["psd"]},"image/vnd.airzip.accelerator.azv":{"source":"iana","extensions":["azv"]},"image/vnd.cns.inf2":{"source":"iana"},"image/vnd.dece.graphic":{"source":"iana","extensions":["uvi","uvvi","uvg","uvvg"]},"image/vnd.djvu":{"source":"iana","extensions":["djvu","djv"]},"image/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"image/vnd.dwg":{"source":"iana","extensions":["dwg"]},"image/vnd.dxf":{"source":"iana","extensions":["dxf"]},"image/vnd.fastbidsheet":{"source":"iana","extensions":["fbs"]},"image/vnd.fpx":{"source":"iana","extensions":["fpx"]},"image/vnd.fst":{"source":"iana","extensions":["fst"]},"image/vnd.fujixerox.edmics-mmr":{"source":"iana","extensions":["mmr"]},"image/vnd.fujixerox.edmics-rlc":{"source":"iana","extensions":["rlc"]},"image/vnd.globalgraphics.pgb":{"source":"iana"},"image/vnd.microsoft.icon":{"source":"iana","compressible":true,"extensions":["ico"]},"image/vnd.mix":{"source":"iana"},"image/vnd.mozilla.apng":{"source":"iana"},"image/vnd.ms-dds":{"compressible":true,"extensions":["dds"]},"image/vnd.ms-modi":{"source":"iana","extensions":["mdi"]},"image/vnd.ms-photo":{"source":"apache","extensions":["wdp"]},"image/vnd.net-fpx":{"source":"iana","extensions":["npx"]},"image/vnd.pco.b16":{"source":"iana","extensions":["b16"]},"image/vnd.radiance":{"source":"iana"},"image/vnd.sealed.png":{"source":"iana"},"image/vnd.sealedmedia.softseal.gif":{"source":"iana"},"image/vnd.sealedmedia.softseal.jpg":{"source":"iana"},"image/vnd.svf":{"source":"iana"},"image/vnd.tencent.tap":{"source":"iana","extensions":["tap"]},"image/vnd.valve.source.texture":{"source":"iana","extensions":["vtf"]},"image/vnd.wap.wbmp":{"source":"iana","extensions":["wbmp"]},"image/vnd.xiff":{"source":"iana","extensions":["xif"]},"image/vnd.zbrush.pcx":{"source":"iana","extensions":["pcx"]},"image/webp":{"source":"apache","extensions":["webp"]},"image/wmf":{"source":"iana","extensions":["wmf"]},"image/x-3ds":{"source":"apache","extensions":["3ds"]},"image/x-cmu-raster":{"source":"apache","extensions":["ras"]},"image/x-cmx":{"source":"apache","extensions":["cmx"]},"image/x-freehand":{"source":"apache","extensions":["fh","fhc","fh4","fh5","fh7"]},"image/x-icon":{"source":"apache","compressible":true,"extensions":["ico"]},"image/x-jng":{"source":"nginx","extensions":["jng"]},"image/x-mrsid-image":{"source":"apache","extensions":["sid"]},"image/x-ms-bmp":{"source":"nginx","compressible":true,"extensions":["bmp"]},"image/x-pcx":{"source":"apache","extensions":["pcx"]},"image/x-pict":{"source":"apache","extensions":["pic","pct"]},"image/x-portable-anymap":{"source":"apache","extensions":["pnm"]},"image/x-portable-bitmap":{"source":"apache","extensions":["pbm"]},"image/x-portable-graymap":{"source":"apache","extensions":["pgm"]},"image/x-portable-pixmap":{"source":"apache","extensions":["ppm"]},"image/x-rgb":{"source":"apache","extensions":["rgb"]},"image/x-tga":{"source":"apache","extensions":["tga"]},"image/x-xbitmap":{"source":"apache","extensions":["xbm"]},"image/x-xcf":{"compressible":false},"image/x-xpixmap":{"source":"apache","extensions":["xpm"]},"image/x-xwindowdump":{"source":"apache","extensions":["xwd"]},"message/cpim":{"source":"iana"},"message/delivery-status":{"source":"iana"},"message/disposition-notification":{"source":"iana","extensions":["disposition-notification"]},"message/external-body":{"source":"iana"},"message/feedback-report":{"source":"iana"},"message/global":{"source":"iana","extensions":["u8msg"]},"message/global-delivery-status":{"source":"iana","extensions":["u8dsn"]},"message/global-disposition-notification":{"source":"iana","extensions":["u8mdn"]},"message/global-headers":{"source":"iana","extensions":["u8hdr"]},"message/http":{"source":"iana","compressible":false},"message/imdn+xml":{"source":"iana","compressible":true},"message/news":{"source":"iana"},"message/partial":{"source":"iana","compressible":false},"message/rfc822":{"source":"iana","compressible":true,"extensions":["eml","mime"]},"message/s-http":{"source":"iana"},"message/sip":{"source":"iana"},"message/sipfrag":{"source":"iana"},"message/tracking-status":{"source":"iana"},"message/vnd.si.simp":{"source":"iana"},"message/vnd.wfa.wsc":{"source":"iana","extensions":["wsc"]},"model/3mf":{"source":"iana","extensions":["3mf"]},"model/e57":{"source":"iana"},"model/gltf+json":{"source":"iana","compressible":true,"extensions":["gltf"]},"model/gltf-binary":{"source":"iana","compressible":true,"extensions":["glb"]},"model/iges":{"source":"iana","compressible":false,"extensions":["igs","iges"]},"model/mesh":{"source":"iana","compressible":false,"extensions":["msh","mesh","silo"]},"model/mtl":{"source":"iana","extensions":["mtl"]},"model/obj":{"source":"iana","extensions":["obj"]},"model/step":{"source":"iana"},"model/step+xml":{"source":"iana","compressible":true,"extensions":["stpx"]},"model/step+zip":{"source":"iana","compressible":false,"extensions":["stpz"]},"model/step-xml+zip":{"source":"iana","compressible":false,"extensions":["stpxz"]},"model/stl":{"source":"iana","extensions":["stl"]},"model/vnd.collada+xml":{"source":"iana","compressible":true,"extensions":["dae"]},"model/vnd.dwf":{"source":"iana","extensions":["dwf"]},"model/vnd.flatland.3dml":{"source":"iana"},"model/vnd.gdl":{"source":"iana","extensions":["gdl"]},"model/vnd.gs-gdl":{"source":"apache"},"model/vnd.gs.gdl":{"source":"iana"},"model/vnd.gtw":{"source":"iana","extensions":["gtw"]},"model/vnd.moml+xml":{"source":"iana","compressible":true},"model/vnd.mts":{"source":"iana","extensions":["mts"]},"model/vnd.opengex":{"source":"iana","extensions":["ogex"]},"model/vnd.parasolid.transmit.binary":{"source":"iana","extensions":["x_b"]},"model/vnd.parasolid.transmit.text":{"source":"iana","extensions":["x_t"]},"model/vnd.pytha.pyox":{"source":"iana"},"model/vnd.rosette.annotated-data-model":{"source":"iana"},"model/vnd.sap.vds":{"source":"iana","extensions":["vds"]},"model/vnd.usdz+zip":{"source":"iana","compressible":false,"extensions":["usdz"]},"model/vnd.valve.source.compiled-map":{"source":"iana","extensions":["bsp"]},"model/vnd.vtu":{"source":"iana","extensions":["vtu"]},"model/vrml":{"source":"iana","compressible":false,"extensions":["wrl","vrml"]},"model/x3d+binary":{"source":"apache","compressible":false,"extensions":["x3db","x3dbz"]},"model/x3d+fastinfoset":{"source":"iana","extensions":["x3db"]},"model/x3d+vrml":{"source":"apache","compressible":false,"extensions":["x3dv","x3dvz"]},"model/x3d+xml":{"source":"iana","compressible":true,"extensions":["x3d","x3dz"]},"model/x3d-vrml":{"source":"iana","extensions":["x3dv"]},"multipart/alternative":{"source":"iana","compressible":false},"multipart/appledouble":{"source":"iana"},"multipart/byteranges":{"source":"iana"},"multipart/digest":{"source":"iana"},"multipart/encrypted":{"source":"iana","compressible":false},"multipart/form-data":{"source":"iana","compressible":false},"multipart/header-set":{"source":"iana"},"multipart/mixed":{"source":"iana"},"multipart/multilingual":{"source":"iana"},"multipart/parallel":{"source":"iana"},"multipart/related":{"source":"iana","compressible":false},"multipart/report":{"source":"iana"},"multipart/signed":{"source":"iana","compressible":false},"multipart/vnd.bint.med-plus":{"source":"iana"},"multipart/voice-message":{"source":"iana"},"multipart/x-mixed-replace":{"source":"iana"},"text/1d-interleaved-parityfec":{"source":"iana"},"text/cache-manifest":{"source":"iana","compressible":true,"extensions":["appcache","manifest"]},"text/calendar":{"source":"iana","extensions":["ics","ifb"]},"text/calender":{"compressible":true},"text/cmd":{"compressible":true},"text/coffeescript":{"extensions":["coffee","litcoffee"]},"text/cql":{"source":"iana"},"text/cql-expression":{"source":"iana"},"text/cql-identifier":{"source":"iana"},"text/css":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["css"]},"text/csv":{"source":"iana","compressible":true,"extensions":["csv"]},"text/csv-schema":{"source":"iana"},"text/directory":{"source":"iana"},"text/dns":{"source":"iana"},"text/ecmascript":{"source":"iana"},"text/encaprtp":{"source":"iana"},"text/enriched":{"source":"iana"},"text/fhirpath":{"source":"iana"},"text/flexfec":{"source":"iana"},"text/fwdred":{"source":"iana"},"text/gff3":{"source":"iana"},"text/grammar-ref-list":{"source":"iana"},"text/html":{"source":"iana","compressible":true,"extensions":["html","htm","shtml"]},"text/jade":{"extensions":["jade"]},"text/javascript":{"source":"iana","compressible":true},"text/jcr-cnd":{"source":"iana"},"text/jsx":{"compressible":true,"extensions":["jsx"]},"text/less":{"compressible":true,"extensions":["less"]},"text/markdown":{"source":"iana","compressible":true,"extensions":["markdown","md"]},"text/mathml":{"source":"nginx","extensions":["mml"]},"text/mdx":{"compressible":true,"extensions":["mdx"]},"text/mizar":{"source":"iana"},"text/n3":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["n3"]},"text/parameters":{"source":"iana","charset":"UTF-8"},"text/parityfec":{"source":"iana"},"text/plain":{"source":"iana","compressible":true,"extensions":["txt","text","conf","def","list","log","in","ini"]},"text/provenance-notation":{"source":"iana","charset":"UTF-8"},"text/prs.fallenstein.rst":{"source":"iana"},"text/prs.lines.tag":{"source":"iana","extensions":["dsc"]},"text/prs.prop.logic":{"source":"iana"},"text/raptorfec":{"source":"iana"},"text/red":{"source":"iana"},"text/rfc822-headers":{"source":"iana"},"text/richtext":{"source":"iana","compressible":true,"extensions":["rtx"]},"text/rtf":{"source":"iana","compressible":true,"extensions":["rtf"]},"text/rtp-enc-aescm128":{"source":"iana"},"text/rtploopback":{"source":"iana"},"text/rtx":{"source":"iana"},"text/sgml":{"source":"iana","extensions":["sgml","sgm"]},"text/shaclc":{"source":"iana"},"text/shex":{"source":"iana","extensions":["shex"]},"text/slim":{"extensions":["slim","slm"]},"text/spdx":{"source":"iana","extensions":["spdx"]},"text/strings":{"source":"iana"},"text/stylus":{"extensions":["stylus","styl"]},"text/t140":{"source":"iana"},"text/tab-separated-values":{"source":"iana","compressible":true,"extensions":["tsv"]},"text/troff":{"source":"iana","extensions":["t","tr","roff","man","me","ms"]},"text/turtle":{"source":"iana","charset":"UTF-8","extensions":["ttl"]},"text/ulpfec":{"source":"iana"},"text/uri-list":{"source":"iana","compressible":true,"extensions":["uri","uris","urls"]},"text/vcard":{"source":"iana","compressible":true,"extensions":["vcard"]},"text/vnd.a":{"source":"iana"},"text/vnd.abc":{"source":"iana"},"text/vnd.ascii-art":{"source":"iana"},"text/vnd.curl":{"source":"iana","extensions":["curl"]},"text/vnd.curl.dcurl":{"source":"apache","extensions":["dcurl"]},"text/vnd.curl.mcurl":{"source":"apache","extensions":["mcurl"]},"text/vnd.curl.scurl":{"source":"apache","extensions":["scurl"]},"text/vnd.debian.copyright":{"source":"iana","charset":"UTF-8"},"text/vnd.dmclientscript":{"source":"iana"},"text/vnd.dvb.subtitle":{"source":"iana","extensions":["sub"]},"text/vnd.esmertec.theme-descriptor":{"source":"iana","charset":"UTF-8"},"text/vnd.familysearch.gedcom":{"source":"iana","extensions":["ged"]},"text/vnd.ficlab.flt":{"source":"iana"},"text/vnd.fly":{"source":"iana","extensions":["fly"]},"text/vnd.fmi.flexstor":{"source":"iana","extensions":["flx"]},"text/vnd.gml":{"source":"iana"},"text/vnd.graphviz":{"source":"iana","extensions":["gv"]},"text/vnd.hans":{"source":"iana"},"text/vnd.hgl":{"source":"iana"},"text/vnd.in3d.3dml":{"source":"iana","extensions":["3dml"]},"text/vnd.in3d.spot":{"source":"iana","extensions":["spot"]},"text/vnd.iptc.newsml":{"source":"iana"},"text/vnd.iptc.nitf":{"source":"iana"},"text/vnd.latex-z":{"source":"iana"},"text/vnd.motorola.reflex":{"source":"iana"},"text/vnd.ms-mediapackage":{"source":"iana"},"text/vnd.net2phone.commcenter.command":{"source":"iana"},"text/vnd.radisys.msml-basic-layout":{"source":"iana"},"text/vnd.senx.warpscript":{"source":"iana"},"text/vnd.si.uricatalogue":{"source":"iana"},"text/vnd.sosi":{"source":"iana"},"text/vnd.sun.j2me.app-descriptor":{"source":"iana","charset":"UTF-8","extensions":["jad"]},"text/vnd.trolltech.linguist":{"source":"iana","charset":"UTF-8"},"text/vnd.wap.si":{"source":"iana"},"text/vnd.wap.sl":{"source":"iana"},"text/vnd.wap.wml":{"source":"iana","extensions":["wml"]},"text/vnd.wap.wmlscript":{"source":"iana","extensions":["wmls"]},"text/vtt":{"source":"iana","charset":"UTF-8","compressible":true,"extensions":["vtt"]},"text/x-asm":{"source":"apache","extensions":["s","asm"]},"text/x-c":{"source":"apache","extensions":["c","cc","cxx","cpp","h","hh","dic"]},"text/x-component":{"source":"nginx","extensions":["htc"]},"text/x-fortran":{"source":"apache","extensions":["f","for","f77","f90"]},"text/x-gwt-rpc":{"compressible":true},"text/x-handlebars-template":{"extensions":["hbs"]},"text/x-java-source":{"source":"apache","extensions":["java"]},"text/x-jquery-tmpl":{"compressible":true},"text/x-lua":{"extensions":["lua"]},"text/x-markdown":{"compressible":true,"extensions":["mkd"]},"text/x-nfo":{"source":"apache","extensions":["nfo"]},"text/x-opml":{"source":"apache","extensions":["opml"]},"text/x-org":{"compressible":true,"extensions":["org"]},"text/x-pascal":{"source":"apache","extensions":["p","pas"]},"text/x-processing":{"compressible":true,"extensions":["pde"]},"text/x-sass":{"extensions":["sass"]},"text/x-scss":{"extensions":["scss"]},"text/x-setext":{"source":"apache","extensions":["etx"]},"text/x-sfv":{"source":"apache","extensions":["sfv"]},"text/x-suse-ymp":{"compressible":true,"extensions":["ymp"]},"text/x-uuencode":{"source":"apache","extensions":["uu"]},"text/x-vcalendar":{"source":"apache","extensions":["vcs"]},"text/x-vcard":{"source":"apache","extensions":["vcf"]},"text/xml":{"source":"iana","compressible":true,"extensions":["xml"]},"text/xml-external-parsed-entity":{"source":"iana"},"text/yaml":{"compressible":true,"extensions":["yaml","yml"]},"video/1d-interleaved-parityfec":{"source":"iana"},"video/3gpp":{"source":"iana","extensions":["3gp","3gpp"]},"video/3gpp-tt":{"source":"iana"},"video/3gpp2":{"source":"iana","extensions":["3g2"]},"video/av1":{"source":"iana"},"video/bmpeg":{"source":"iana"},"video/bt656":{"source":"iana"},"video/celb":{"source":"iana"},"video/dv":{"source":"iana"},"video/encaprtp":{"source":"iana"},"video/ffv1":{"source":"iana"},"video/flexfec":{"source":"iana"},"video/h261":{"source":"iana","extensions":["h261"]},"video/h263":{"source":"iana","extensions":["h263"]},"video/h263-1998":{"source":"iana"},"video/h263-2000":{"source":"iana"},"video/h264":{"source":"iana","extensions":["h264"]},"video/h264-rcdo":{"source":"iana"},"video/h264-svc":{"source":"iana"},"video/h265":{"source":"iana"},"video/iso.segment":{"source":"iana","extensions":["m4s"]},"video/jpeg":{"source":"iana","extensions":["jpgv"]},"video/jpeg2000":{"source":"iana"},"video/jpm":{"source":"apache","extensions":["jpm","jpgm"]},"video/jxsv":{"source":"iana"},"video/mj2":{"source":"iana","extensions":["mj2","mjp2"]},"video/mp1s":{"source":"iana"},"video/mp2p":{"source":"iana"},"video/mp2t":{"source":"iana","extensions":["ts"]},"video/mp4":{"source":"iana","compressible":false,"extensions":["mp4","mp4v","mpg4"]},"video/mp4v-es":{"source":"iana"},"video/mpeg":{"source":"iana","compressible":false,"extensions":["mpeg","mpg","mpe","m1v","m2v"]},"video/mpeg4-generic":{"source":"iana"},"video/mpv":{"source":"iana"},"video/nv":{"source":"iana"},"video/ogg":{"source":"iana","compressible":false,"extensions":["ogv"]},"video/parityfec":{"source":"iana"},"video/pointer":{"source":"iana"},"video/quicktime":{"source":"iana","compressible":false,"extensions":["qt","mov"]},"video/raptorfec":{"source":"iana"},"video/raw":{"source":"iana"},"video/rtp-enc-aescm128":{"source":"iana"},"video/rtploopback":{"source":"iana"},"video/rtx":{"source":"iana"},"video/scip":{"source":"iana"},"video/smpte291":{"source":"iana"},"video/smpte292m":{"source":"iana"},"video/ulpfec":{"source":"iana"},"video/vc1":{"source":"iana"},"video/vc2":{"source":"iana"},"video/vnd.cctv":{"source":"iana"},"video/vnd.dece.hd":{"source":"iana","extensions":["uvh","uvvh"]},"video/vnd.dece.mobile":{"source":"iana","extensions":["uvm","uvvm"]},"video/vnd.dece.mp4":{"source":"iana"},"video/vnd.dece.pd":{"source":"iana","extensions":["uvp","uvvp"]},"video/vnd.dece.sd":{"source":"iana","extensions":["uvs","uvvs"]},"video/vnd.dece.video":{"source":"iana","extensions":["uvv","uvvv"]},"video/vnd.directv.mpeg":{"source":"iana"},"video/vnd.directv.mpeg-tts":{"source":"iana"},"video/vnd.dlna.mpeg-tts":{"source":"iana"},"video/vnd.dvb.file":{"source":"iana","extensions":["dvb"]},"video/vnd.fvt":{"source":"iana","extensions":["fvt"]},"video/vnd.hns.video":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.1dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-1010":{"source":"iana"},"video/vnd.iptvforum.2dparityfec-2005":{"source":"iana"},"video/vnd.iptvforum.ttsavc":{"source":"iana"},"video/vnd.iptvforum.ttsmpeg2":{"source":"iana"},"video/vnd.motorola.video":{"source":"iana"},"video/vnd.motorola.videop":{"source":"iana"},"video/vnd.mpegurl":{"source":"iana","extensions":["mxu","m4u"]},"video/vnd.ms-playready.media.pyv":{"source":"iana","extensions":["pyv"]},"video/vnd.nokia.interleaved-multimedia":{"source":"iana"},"video/vnd.nokia.mp4vr":{"source":"iana"},"video/vnd.nokia.videovoip":{"source":"iana"},"video/vnd.objectvideo":{"source":"iana"},"video/vnd.radgamettools.bink":{"source":"iana"},"video/vnd.radgamettools.smacker":{"source":"iana"},"video/vnd.sealed.mpeg1":{"source":"iana"},"video/vnd.sealed.mpeg4":{"source":"iana"},"video/vnd.sealed.swf":{"source":"iana"},"video/vnd.sealedmedia.softseal.mov":{"source":"iana"},"video/vnd.uvvu.mp4":{"source":"iana","extensions":["uvu","uvvu"]},"video/vnd.vivo":{"source":"iana","extensions":["viv"]},"video/vnd.youtube.yt":{"source":"iana"},"video/vp8":{"source":"iana"},"video/vp9":{"source":"iana"},"video/webm":{"source":"apache","compressible":false,"extensions":["webm"]},"video/x-f4v":{"source":"apache","extensions":["f4v"]},"video/x-fli":{"source":"apache","extensions":["fli"]},"video/x-flv":{"source":"apache","compressible":false,"extensions":["flv"]},"video/x-m4v":{"source":"apache","extensions":["m4v"]},"video/x-matroska":{"source":"apache","compressible":false,"extensions":["mkv","mk3d","mks"]},"video/x-mng":{"source":"apache","extensions":["mng"]},"video/x-ms-asf":{"source":"apache","extensions":["asf","asx"]},"video/x-ms-vob":{"source":"apache","extensions":["vob"]},"video/x-ms-wm":{"source":"apache","extensions":["wm"]},"video/x-ms-wmv":{"source":"apache","compressible":false,"extensions":["wmv"]},"video/x-ms-wmx":{"source":"apache","extensions":["wmx"]},"video/x-ms-wvx":{"source":"apache","extensions":["wvx"]},"video/x-msvideo":{"source":"apache","extensions":["avi"]},"video/x-sgi-movie":{"source":"apache","extensions":["movie"]},"video/x-smv":{"source":"apache","extensions":["smv"]},"x-conference/x-cooltalk":{"source":"apache","extensions":["ice"]},"x-shader/x-fragment":{"compressible":true},"x-shader/x-vertex":{"compressible":true}}');

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __nccwpck_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		id: moduleId,
/******/ 		loaded: false,
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	var threw = true;
/******/ 	try {
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
/******/ 		threw = false;
/******/ 	} finally {
/******/ 		if(threw) delete __webpack_module_cache__[moduleId];
/******/ 	}
/******/ 
/******/ 	// Flag the module as loaded
/******/ 	module.loaded = true;
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/async module */
/******/ (() => {
/******/ 	var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 	var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 	var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 	var resolveQueue = (queue) => {
/******/ 		if(queue && queue.d < 1) {
/******/ 			queue.d = 1;
/******/ 			queue.forEach((fn) => (fn.r--));
/******/ 			queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 		}
/******/ 	}
/******/ 	var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 		if(dep !== null && typeof dep === "object") {
/******/ 			if(dep[webpackQueues]) return dep;
/******/ 			if(dep.then) {
/******/ 				var queue = [];
/******/ 				queue.d = 0;
/******/ 				dep.then((r) => {
/******/ 					obj[webpackExports] = r;
/******/ 					resolveQueue(queue);
/******/ 				}, (e) => {
/******/ 					obj[webpackError] = e;
/******/ 					resolveQueue(queue);
/******/ 				});
/******/ 				var obj = {};
/******/ 				obj[webpackQueues] = (fn) => (fn(queue));
/******/ 				return obj;
/******/ 			}
/******/ 		}
/******/ 		var ret = {};
/******/ 		ret[webpackQueues] = x => {};
/******/ 		ret[webpackExports] = dep;
/******/ 		return ret;
/******/ 	}));
/******/ 	__nccwpck_require__.a = (module, body, hasAwait) => {
/******/ 		var queue;
/******/ 		hasAwait && ((queue = []).d = -1);
/******/ 		var depQueues = new Set();
/******/ 		var exports = module.exports;
/******/ 		var currentDeps;
/******/ 		var outerResolve;
/******/ 		var reject;
/******/ 		var promise = new Promise((resolve, rej) => {
/******/ 			reject = rej;
/******/ 			outerResolve = resolve;
/******/ 		});
/******/ 		promise[webpackExports] = exports;
/******/ 		promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 		module.exports = promise;
/******/ 		body((deps) => {
/******/ 			currentDeps = wrapDeps(deps);
/******/ 			var fn;
/******/ 			var getResult = () => (currentDeps.map((d) => {
/******/ 				if(d[webpackError]) throw d[webpackError];
/******/ 				return d[webpackExports];
/******/ 			}))
/******/ 			var promise = new Promise((resolve) => {
/******/ 				fn = () => (resolve(getResult));
/******/ 				fn.r = 0;
/******/ 				var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 				currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 			});
/******/ 			return fn.r ? promise : getResult();
/******/ 		}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 		queue && queue.d < 0 && (queue.d = 0);
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__nccwpck_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__nccwpck_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__nccwpck_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__nccwpck_require__.o(definition, key) && !__nccwpck_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__nccwpck_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/node module decorator */
/******/ (() => {
/******/ 	__nccwpck_require__.nmd = (module) => {
/******/ 		module.paths = [];
/******/ 		if (!module.children) module.children = [];
/******/ 		return module;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ // This entry module used 'module' so it can't be inlined
/******/ var __webpack_exports__ = __nccwpck_require__(1730);
/******/ __webpack_exports__ = await __webpack_exports__;
/******/ 
