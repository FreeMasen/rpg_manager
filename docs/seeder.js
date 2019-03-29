/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./ts/services/seeder.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/dexie/dist/dexie.es.js":
/*!*********************************************!*\
  !*** ./node_modules/dexie/dist/dexie.es.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*
 * Dexie.js - a minimalistic wrapper for IndexedDB
 * ===============================================
 *
 * By David Fahlander, david.fahlander@gmail.com
 *
 * Version {version}, {date}
 *
 * http://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
 */
 
var keys = Object.keys;
var isArray = Array.isArray;
var _global = typeof self !== 'undefined' ? self :
    typeof window !== 'undefined' ? window :
        global;
function extend(obj, extension) {
    if (typeof extension !== 'object')
        return obj;
    keys(extension).forEach(function (key) {
        obj[key] = extension[key];
    });
    return obj;
}
var getProto = Object.getPrototypeOf;
var _hasOwn = {}.hasOwnProperty;
function hasOwn(obj, prop) {
    return _hasOwn.call(obj, prop);
}
function props(proto, extension) {
    if (typeof extension === 'function')
        extension = extension(getProto(proto));
    keys(extension).forEach(function (key) {
        setProp(proto, key, extension[key]);
    });
}
var defineProperty = Object.defineProperty;
function setProp(obj, prop, functionOrGetSet, options) {
    defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === 'function' ?
        { get: functionOrGetSet.get, set: functionOrGetSet.set, configurable: true } :
        { value: functionOrGetSet, configurable: true, writable: true }, options));
}
function derive(Child) {
    return {
        from: function (Parent) {
            Child.prototype = Object.create(Parent.prototype);
            setProp(Child.prototype, "constructor", Child);
            return {
                extend: props.bind(null, Child.prototype)
            };
        }
    };
}
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
function getPropertyDescriptor(obj, prop) {
    var pd = getOwnPropertyDescriptor(obj, prop), proto;
    return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
}
var _slice = [].slice;
function slice(args, start, end) {
    return _slice.call(args, start, end);
}
function override(origFunc, overridedFactory) {
    return overridedFactory(origFunc);
}
function assert(b) {
    if (!b)
        throw new Error("Assertion Failed");
}
function asap(fn) {
    if (_global.setImmediate)
        setImmediate(fn);
    else
        setTimeout(fn, 0);
}

/** Generate an object (hash map) based on given array.
 * @param extractor Function taking an array item and its index and returning an array of 2 items ([key, value]) to
 *        instert on the resulting object for each item in the array. If this function returns a falsy value, the
 *        current item wont affect the resulting object.
 */
function arrayToObject(array, extractor) {
    return array.reduce(function (result, item, i) {
        var nameAndValue = extractor(item, i);
        if (nameAndValue)
            result[nameAndValue[0]] = nameAndValue[1];
        return result;
    }, {});
}
function trycatcher(fn, reject) {
    return function () {
        try {
            fn.apply(this, arguments);
        }
        catch (e) {
            reject(e);
        }
    };
}
function tryCatch(fn, onerror, args) {
    try {
        fn.apply(null, args);
    }
    catch (ex) {
        onerror && onerror(ex);
    }
}
function getByKeyPath(obj, keyPath) {
    // http://www.w3.org/TR/IndexedDB/#steps-for-extracting-a-key-from-a-value-using-a-key-path
    if (hasOwn(obj, keyPath))
        return obj[keyPath]; // This line is moved from last to first for optimization purpose.
    if (!keyPath)
        return obj;
    if (typeof keyPath !== 'string') {
        var rv = [];
        for (var i = 0, l = keyPath.length; i < l; ++i) {
            var val = getByKeyPath(obj, keyPath[i]);
            rv.push(val);
        }
        return rv;
    }
    var period = keyPath.indexOf('.');
    if (period !== -1) {
        var innerObj = obj[keyPath.substr(0, period)];
        return innerObj === undefined ? undefined : getByKeyPath(innerObj, keyPath.substr(period + 1));
    }
    return undefined;
}
function setByKeyPath(obj, keyPath, value) {
    if (!obj || keyPath === undefined)
        return;
    if ('isFrozen' in Object && Object.isFrozen(obj))
        return;
    if (typeof keyPath !== 'string' && 'length' in keyPath) {
        assert(typeof value !== 'string' && 'length' in value);
        for (var i = 0, l = keyPath.length; i < l; ++i) {
            setByKeyPath(obj, keyPath[i], value[i]);
        }
    }
    else {
        var period = keyPath.indexOf('.');
        if (period !== -1) {
            var currentKeyPath = keyPath.substr(0, period);
            var remainingKeyPath = keyPath.substr(period + 1);
            if (remainingKeyPath === "")
                if (value === undefined)
                    delete obj[currentKeyPath];
                else
                    obj[currentKeyPath] = value;
            else {
                var innerObj = obj[currentKeyPath];
                if (!innerObj)
                    innerObj = (obj[currentKeyPath] = {});
                setByKeyPath(innerObj, remainingKeyPath, value);
            }
        }
        else {
            if (value === undefined)
                delete obj[keyPath];
            else
                obj[keyPath] = value;
        }
    }
}
function delByKeyPath(obj, keyPath) {
    if (typeof keyPath === 'string')
        setByKeyPath(obj, keyPath, undefined);
    else if ('length' in keyPath)
        [].map.call(keyPath, function (kp) {
            setByKeyPath(obj, kp, undefined);
        });
}
function shallowClone(obj) {
    var rv = {};
    for (var m in obj) {
        if (hasOwn(obj, m))
            rv[m] = obj[m];
    }
    return rv;
}
var concat = [].concat;
function flatten(a) {
    return concat.apply([], a);
}
//https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm
var intrinsicTypes = "Boolean,String,Date,RegExp,Blob,File,FileList,ArrayBuffer,DataView,Uint8ClampedArray,ImageData,Map,Set"
    .split(',').concat(flatten([8, 16, 32, 64].map(function (num) { return ["Int", "Uint", "Float"].map(function (t) { return t + num + "Array"; }); }))).filter(function (t) { return _global[t]; }).map(function (t) { return _global[t]; });
function deepClone(any) {
    if (!any || typeof any !== 'object')
        return any;
    var rv;
    if (isArray(any)) {
        rv = [];
        for (var i = 0, l = any.length; i < l; ++i) {
            rv.push(deepClone(any[i]));
        }
    }
    else if (intrinsicTypes.indexOf(any.constructor) >= 0) {
        rv = any;
    }
    else {
        rv = any.constructor ? Object.create(any.constructor.prototype) : {};
        for (var prop in any) {
            if (hasOwn(any, prop)) {
                rv[prop] = deepClone(any[prop]);
            }
        }
    }
    return rv;
}
function getObjectDiff(a, b, rv, prfx) {
    // Compares objects a and b and produces a diff object.
    rv = rv || {};
    prfx = prfx || '';
    keys(a).forEach(function (prop) {
        if (!hasOwn(b, prop))
            rv[prfx + prop] = undefined; // Property removed
        else {
            var ap = a[prop], bp = b[prop];
            if (typeof ap === 'object' && typeof bp === 'object' &&
                ap && bp &&
                // Now compare constructors are same (not equal because wont work in Safari)
                ('' + ap.constructor) === ('' + bp.constructor))
                // Same type of object but its properties may have changed
                getObjectDiff(ap, bp, rv, prfx + prop + ".");
            else if (ap !== bp)
                rv[prfx + prop] = b[prop]; // Primitive value changed
        }
    });
    keys(b).forEach(function (prop) {
        if (!hasOwn(a, prop)) {
            rv[prfx + prop] = b[prop]; // Property added
        }
    });
    return rv;
}
// If first argument is iterable or array-like, return it as an array
var iteratorSymbol = typeof Symbol !== 'undefined' && Symbol.iterator;
var getIteratorOf = iteratorSymbol ? function (x) {
    var i;
    return x != null && (i = x[iteratorSymbol]) && i.apply(x);
} : function () { return null; };
var NO_CHAR_ARRAY = {};
// Takes one or several arguments and returns an array based on the following criteras:
// * If several arguments provided, return arguments converted to an array in a way that
//   still allows javascript engine to optimize the code.
// * If single argument is an array, return a clone of it.
// * If this-pointer equals NO_CHAR_ARRAY, don't accept strings as valid iterables as a special
//   case to the two bullets below.
// * If single argument is an iterable, convert it to an array and return the resulting array.
// * If single argument is array-like (has length of type number), convert it to an array.
function getArrayOf(arrayLike) {
    var i, a, x, it;
    if (arguments.length === 1) {
        if (isArray(arrayLike))
            return arrayLike.slice();
        if (this === NO_CHAR_ARRAY && typeof arrayLike === 'string')
            return [arrayLike];
        if ((it = getIteratorOf(arrayLike))) {
            a = [];
            while ((x = it.next()), !x.done)
                a.push(x.value);
            return a;
        }
        if (arrayLike == null)
            return [arrayLike];
        i = arrayLike.length;
        if (typeof i === 'number') {
            a = new Array(i);
            while (i--)
                a[i] = arrayLike[i];
            return a;
        }
        return [arrayLike];
    }
    i = arguments.length;
    a = new Array(i);
    while (i--)
        a[i] = arguments[i];
    return a;
}

// By default, debug will be true only if platform is a web platform and its page is served from localhost.
// When debug = true, error's stacks will contain asyncronic long stacks.
var debug = typeof location !== 'undefined' &&
    // By default, use debug mode if served from localhost.
    /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
function setDebug(value, filter) {
    debug = value;
    libraryFilter = filter;
}
var libraryFilter = function () { return true; };
var NEEDS_THROW_FOR_STACK = !new Error("").stack;
function getErrorWithStack() {
    "use strict";
    if (NEEDS_THROW_FOR_STACK)
        try {
            // Doing something naughty in strict mode here to trigger a specific error
            // that can be explicitely ignored in debugger's exception settings.
            // If we'd just throw new Error() here, IE's debugger's exception settings
            // will just consider it as "exception thrown by javascript code" which is
            // something you wouldn't want it to ignore.
            getErrorWithStack.arguments;
            throw new Error(); // Fallback if above line don't throw.
        }
        catch (e) {
            return e;
        }
    return new Error();
}
function prettyStack(exception, numIgnoredFrames) {
    var stack = exception.stack;
    if (!stack)
        return "";
    numIgnoredFrames = (numIgnoredFrames || 0);
    if (stack.indexOf(exception.name) === 0)
        numIgnoredFrames += (exception.name + exception.message).split('\n').length;
    return stack.split('\n')
        .slice(numIgnoredFrames)
        .filter(libraryFilter)
        .map(function (frame) { return "\n" + frame; })
        .join('');
}
function deprecated(what, fn) {
    return function () {
        console.warn(what + " is deprecated. See https://github.com/dfahlander/Dexie.js/wiki/Deprecations. " + prettyStack(getErrorWithStack(), 1));
        return fn.apply(this, arguments);
    };
}

var dexieErrorNames = [
    'Modify',
    'Bulk',
    'OpenFailed',
    'VersionChange',
    'Schema',
    'Upgrade',
    'InvalidTable',
    'MissingAPI',
    'NoSuchDatabase',
    'InvalidArgument',
    'SubTransaction',
    'Unsupported',
    'Internal',
    'DatabaseClosed',
    'PrematureCommit',
    'ForeignAwait'
];
var idbDomErrorNames = [
    'Unknown',
    'Constraint',
    'Data',
    'TransactionInactive',
    'ReadOnly',
    'Version',
    'NotFound',
    'InvalidState',
    'InvalidAccess',
    'Abort',
    'Timeout',
    'QuotaExceeded',
    'Syntax',
    'DataClone'
];
var errorList = dexieErrorNames.concat(idbDomErrorNames);
var defaultTexts = {
    VersionChanged: "Database version changed by other database connection",
    DatabaseClosed: "Database has been closed",
    Abort: "Transaction aborted",
    TransactionInactive: "Transaction has already completed or failed"
};
//
// DexieError - base class of all out exceptions.
//
function DexieError(name, msg) {
    // Reason we don't use ES6 classes is because:
    // 1. It bloats transpiled code and increases size of minified code.
    // 2. It doesn't give us much in this case.
    // 3. It would require sub classes to call super(), which
    //    is not needed when deriving from Error.
    this._e = getErrorWithStack();
    this.name = name;
    this.message = msg;
}
derive(DexieError).from(Error).extend({
    stack: {
        get: function () {
            return this._stack ||
                (this._stack = this.name + ": " + this.message + prettyStack(this._e, 2));
        }
    },
    toString: function () { return this.name + ": " + this.message; }
});
function getMultiErrorMessage(msg, failures) {
    return msg + ". Errors: " + failures
        .map(function (f) { return f.toString(); })
        .filter(function (v, i, s) { return s.indexOf(v) === i; }) // Only unique error strings
        .join('\n');
}
//
// ModifyError - thrown in Collection.modify()
// Specific constructor because it contains members failures and failedKeys.
//
function ModifyError(msg, failures, successCount, failedKeys) {
    this._e = getErrorWithStack();
    this.failures = failures;
    this.failedKeys = failedKeys;
    this.successCount = successCount;
}
derive(ModifyError).from(DexieError);
function BulkError(msg, failures) {
    this._e = getErrorWithStack();
    this.name = "BulkError";
    this.failures = failures;
    this.message = getMultiErrorMessage(msg, failures);
}
derive(BulkError).from(DexieError);
//
//
// Dynamically generate error names and exception classes based
// on the names in errorList.
//
//
// Map of {ErrorName -> ErrorName + "Error"}
var errnames = errorList.reduce(function (obj, name) { return (obj[name] = name + "Error", obj); }, {});
// Need an alias for DexieError because we're gonna create subclasses with the same name.
var BaseException = DexieError;
// Map of {ErrorName -> exception constructor}
var exceptions = errorList.reduce(function (obj, name) {
    // Let the name be "DexieError" because this name may
    // be shown in call stack and when debugging. DexieError is
    // the most true name because it derives from DexieError,
    // and we cannot change Function.name programatically without
    // dynamically create a Function object, which would be considered
    // 'eval-evil'.
    var fullName = name + "Error";
    function DexieError(msgOrInner, inner) {
        this._e = getErrorWithStack();
        this.name = fullName;
        if (!msgOrInner) {
            this.message = defaultTexts[name] || fullName;
            this.inner = null;
        }
        else if (typeof msgOrInner === 'string') {
            this.message = msgOrInner;
            this.inner = inner || null;
        }
        else if (typeof msgOrInner === 'object') {
            this.message = msgOrInner.name + " " + msgOrInner.message;
            this.inner = msgOrInner;
        }
    }
    derive(DexieError).from(BaseException);
    obj[name] = DexieError;
    return obj;
}, {});
// Use ECMASCRIPT standard exceptions where applicable:
exceptions.Syntax = SyntaxError;
exceptions.Type = TypeError;
exceptions.Range = RangeError;
var exceptionMap = idbDomErrorNames.reduce(function (obj, name) {
    obj[name + "Error"] = exceptions[name];
    return obj;
}, {});
function mapError(domError, message) {
    if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name])
        return domError;
    var rv = new exceptionMap[domError.name](message || domError.message, domError);
    if ("stack" in domError) {
        // Derive stack from inner exception if it has a stack
        setProp(rv, "stack", { get: function () {
                return this.inner.stack;
            } });
    }
    return rv;
}
var fullNameExceptions = errorList.reduce(function (obj, name) {
    if (["Syntax", "Type", "Range"].indexOf(name) === -1)
        obj[name + "Error"] = exceptions[name];
    return obj;
}, {});
fullNameExceptions.ModifyError = ModifyError;
fullNameExceptions.DexieError = DexieError;
fullNameExceptions.BulkError = BulkError;

function nop() { }
function mirror(val) { return val; }
function pureFunctionChain(f1, f2) {
    // Enables chained events that takes ONE argument and returns it to the next function in chain.
    // This pattern is used in the hook("reading") event.
    if (f1 == null || f1 === mirror)
        return f2;
    return function (val) {
        return f2(f1(val));
    };
}
function callBoth(on1, on2) {
    return function () {
        on1.apply(this, arguments);
        on2.apply(this, arguments);
    };
}
function hookCreatingChain(f1, f2) {
    // Enables chained events that takes several arguments and may modify first argument by making a modification and then returning the same instance.
    // This pattern is used in the hook("creating") event.
    if (f1 === nop)
        return f2;
    return function () {
        var res = f1.apply(this, arguments);
        if (res !== undefined)
            arguments[0] = res;
        var onsuccess = this.onsuccess, // In case event listener has set this.onsuccess
        onerror = this.onerror; // In case event listener has set this.onerror
        this.onsuccess = null;
        this.onerror = null;
        var res2 = f2.apply(this, arguments);
        if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        return res2 !== undefined ? res2 : res;
    };
}
function hookDeletingChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function () {
        f1.apply(this, arguments);
        var onsuccess = this.onsuccess, // In case event listener has set this.onsuccess
        onerror = this.onerror; // In case event listener has set this.onerror
        this.onsuccess = this.onerror = null;
        f2.apply(this, arguments);
        if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
    };
}
function hookUpdatingChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function (modifications) {
        var res = f1.apply(this, arguments);
        extend(modifications, res); // If f1 returns new modifications, extend caller's modifications with the result before calling next in chain.
        var onsuccess = this.onsuccess, // In case event listener has set this.onsuccess
        onerror = this.onerror; // In case event listener has set this.onerror
        this.onsuccess = null;
        this.onerror = null;
        var res2 = f2.apply(this, arguments);
        if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        return res === undefined ?
            (res2 === undefined ? undefined : res2) :
            (extend(res, res2));
    };
}
function reverseStoppableEventChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function () {
        if (f2.apply(this, arguments) === false)
            return false;
        return f1.apply(this, arguments);
    };
}

function promisableChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function () {
        var res = f1.apply(this, arguments);
        if (res && typeof res.then === 'function') {
            var thiz = this, i = arguments.length, args = new Array(i);
            while (i--)
                args[i] = arguments[i];
            return res.then(function () {
                return f2.apply(thiz, args);
            });
        }
        return f2.apply(this, arguments);
    };
}

/*
 * Copyright (c) 2014-2017 David Fahlander
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/LICENSE-2.0
 */
//
// Promise and Zone (PSD) for Dexie library
//
// I started out writing this Promise class by copying promise-light (https://github.com/taylorhakes/promise-light) by
// https://github.com/taylorhakes - an A+ and ECMASCRIPT 6 compliant Promise implementation.
//
// In previous versions this was fixed by not calling setTimeout when knowing that the resolve() or reject() came from another
// tick. In Dexie v1.4.0, I've rewritten the Promise class entirely. Just some fragments of promise-light is left. I use
// another strategy now that simplifies everything a lot: to always execute callbacks in a new micro-task, but have an own micro-task
// engine that is indexedDB compliant across all browsers.
// Promise class has also been optimized a lot with inspiration from bluebird - to avoid closures as much as possible.
// Also with inspiration from bluebird, asyncronic stacks in debug mode.
//
// Specific non-standard features of this Promise class:
// * Custom zone support (a.k.a. PSD) with ability to keep zones also when using native promises as well as
//   native async / await.
// * Promise.follow() method built upon the custom zone engine, that allows user to track all promises created from current stack frame
//   and below + all promises that those promises creates or awaits.
// * Detect any unhandled promise in a PSD-scope (PSD.onunhandled). 
//
// David Fahlander, https://github.com/dfahlander
//
// Just a pointer that only this module knows about.
// Used in Promise constructor to emulate a private constructor.
var INTERNAL = {};
// Async stacks (long stacks) must not grow infinitely.
var LONG_STACKS_CLIP_LIMIT = 100;
var MAX_LONG_STACKS = 20;
var ZONE_ECHO_LIMIT = 7;
var nativePromiseInstanceAndProto = (function () {
    try {
        // Be able to patch native async functions
        return new Function("let F=async ()=>{},p=F();return [p,Object.getPrototypeOf(p),Promise.resolve(),F.constructor];")();
    }
    catch (e) {
        var P = _global.Promise;
        return P ?
            [P.resolve(), P.prototype, P.resolve()] :
            [];
    }
})();
var resolvedNativePromise = nativePromiseInstanceAndProto[0];
var nativePromiseProto = nativePromiseInstanceAndProto[1];
var resolvedGlobalPromise = nativePromiseInstanceAndProto[2];
var nativePromiseThen = nativePromiseProto && nativePromiseProto.then;
var NativePromise = resolvedNativePromise && resolvedNativePromise.constructor;
var AsyncFunction = nativePromiseInstanceAndProto[3];
var patchGlobalPromise = !!resolvedGlobalPromise;
var stack_being_generated = false;
/* The default function used only for the very first promise in a promise chain.
   As soon as then promise is resolved or rejected, all next tasks will be executed in micro ticks
   emulated in this module. For indexedDB compatibility, this means that every method needs to
   execute at least one promise before doing an indexedDB operation. Dexie will always call
   db.ready().then() for every operation to make sure the indexedDB event is started in an
   indexedDB-compatible emulated micro task loop.
*/
var schedulePhysicalTick = resolvedGlobalPromise ?
    function () { resolvedGlobalPromise.then(physicalTick); }
    :
        _global.setImmediate ?
            // setImmediate supported. Those modern platforms also supports Function.bind().
            setImmediate.bind(null, physicalTick) :
            _global.MutationObserver ?
                // MutationObserver supported
                function () {
                    var hiddenDiv = document.createElement("div");
                    (new MutationObserver(function () {
                        physicalTick();
                        hiddenDiv = null;
                    })).observe(hiddenDiv, { attributes: true });
                    hiddenDiv.setAttribute('i', '1');
                } :
                // No support for setImmediate or MutationObserver. No worry, setTimeout is only called
                // once time. Every tick that follows will be our emulated micro tick.
                // Could have uses setTimeout.bind(null, 0, physicalTick) if it wasnt for that FF13 and below has a bug 
                function () { setTimeout(physicalTick, 0); };
// Configurable through Promise.scheduler.
// Don't export because it would be unsafe to let unknown
// code call it unless they do try..catch within their callback.
// This function can be retrieved through getter of Promise.scheduler though,
// but users must not do Promise.scheduler = myFuncThatThrowsException
var asap$1 = function (callback, args) {
    microtickQueue.push([callback, args]);
    if (needsNewPhysicalTick) {
        schedulePhysicalTick();
        needsNewPhysicalTick = false;
    }
};
var isOutsideMicroTick = true;
var needsNewPhysicalTick = true;
var unhandledErrors = [];
var rejectingErrors = [];
var currentFulfiller = null;
var rejectionMapper = mirror; // Remove in next major when removing error mapping of DOMErrors and DOMExceptions
var globalPSD = {
    id: 'global',
    global: true,
    ref: 0,
    unhandleds: [],
    onunhandled: globalError,
    pgp: false,
    env: {},
    finalize: function () {
        this.unhandleds.forEach(function (uh) {
            try {
                globalError(uh[0], uh[1]);
            }
            catch (e) { }
        });
    }
};
var PSD = globalPSD;
var microtickQueue = []; // Callbacks to call in this or next physical tick.
var numScheduledCalls = 0; // Number of listener-calls left to do in this physical tick.
var tickFinalizers = []; // Finalizers to call when there are no more async calls scheduled within current physical tick.
function Promise(fn) {
    if (typeof this !== 'object')
        throw new TypeError('Promises must be constructed via new');
    this._listeners = [];
    this.onuncatched = nop; // Deprecate in next major. Not needed. Better to use global error handler.
    // A library may set `promise._lib = true;` after promise is created to make resolve() or reject()
    // execute the microtask engine implicitely within the call to resolve() or reject().
    // To remain A+ compliant, a library must only set `_lib=true` if it can guarantee that the stack
    // only contains library code when calling resolve() or reject().
    // RULE OF THUMB: ONLY set _lib = true for promises explicitely resolving/rejecting directly from
    // global scope (event handler, timer etc)!
    this._lib = false;
    // Current async scope
    var psd = (this._PSD = PSD);
    if (debug) {
        this._stackHolder = getErrorWithStack();
        this._prev = null;
        this._numPrev = 0; // Number of previous promises (for long stacks)
    }
    if (typeof fn !== 'function') {
        if (fn !== INTERNAL)
            throw new TypeError('Not a function');
        // Private constructor (INTERNAL, state, value).
        // Used internally by Promise.resolve() and Promise.reject().
        this._state = arguments[1];
        this._value = arguments[2];
        if (this._state === false)
            handleRejection(this, this._value); // Map error, set stack and addPossiblyUnhandledError().
        return;
    }
    this._state = null; // null (=pending), false (=rejected) or true (=resolved)
    this._value = null; // error or result
    ++psd.ref; // Refcounting current scope
    executePromiseTask(this, fn);
}
// Prepare a property descriptor to put onto Promise.prototype.then
var thenProp = {
    get: function () {
        var psd = PSD, microTaskId = totalEchoes;
        function then(onFulfilled, onRejected) {
            var _this = this;
            var possibleAwait = !psd.global && (psd !== PSD || microTaskId !== totalEchoes);
            if (possibleAwait)
                decrementExpectedAwaits();
            var rv = new Promise(function (resolve, reject) {
                propagateToListener(_this, new Listener(nativeAwaitCompatibleWrap(onFulfilled, psd, possibleAwait), nativeAwaitCompatibleWrap(onRejected, psd, possibleAwait), resolve, reject, psd));
            });
            debug && linkToPreviousPromise(rv, this);
            return rv;
        }
        then.prototype = INTERNAL; // For idempotense, see setter below.
        return then;
    },
    // Be idempotent and allow another framework (such as zone.js or another instance of a Dexie.Promise module) to replace Promise.prototype.then
    // and when that framework wants to restore the original property, we must identify that and restore the original property descriptor.
    set: function (value) {
        setProp(this, 'then', value && value.prototype === INTERNAL ?
            thenProp : // Restore to original property descriptor.
            {
                get: function () {
                    return value; // Getter returning provided value (behaves like value is just changed)
                },
                set: thenProp.set // Keep a setter that is prepared to restore original.
            });
    }
};
props(Promise.prototype, {
    then: thenProp,
    _then: function (onFulfilled, onRejected) {
        // A little tinier version of then() that don't have to create a resulting promise.
        propagateToListener(this, new Listener(null, null, onFulfilled, onRejected, PSD));
    },
    catch: function (onRejected) {
        if (arguments.length === 1)
            return this.then(null, onRejected);
        // First argument is the Error type to catch
        var type = arguments[0], handler = arguments[1];
        return typeof type === 'function' ? this.then(null, function (err) {
            // Catching errors by its constructor type (similar to java / c++ / c#)
            // Sample: promise.catch(TypeError, function (e) { ... });
            return err instanceof type ? handler(err) : PromiseReject(err);
        })
            : this.then(null, function (err) {
                // Catching errors by the error.name property. Makes sense for indexedDB where error type
                // is always DOMError but where e.name tells the actual error type.
                // Sample: promise.catch('ConstraintError', function (e) { ... });
                return err && err.name === type ? handler(err) : PromiseReject(err);
            });
    },
    finally: function (onFinally) {
        return this.then(function (value) {
            onFinally();
            return value;
        }, function (err) {
            onFinally();
            return PromiseReject(err);
        });
    },
    stack: {
        get: function () {
            if (this._stack)
                return this._stack;
            try {
                stack_being_generated = true;
                var stacks = getStack(this, [], MAX_LONG_STACKS);
                var stack = stacks.join("\nFrom previous: ");
                if (this._state !== null)
                    this._stack = stack; // Stack may be updated on reject.
                return stack;
            }
            finally {
                stack_being_generated = false;
            }
        }
    },
    timeout: function (ms, msg) {
        var _this = this;
        return ms < Infinity ?
            new Promise(function (resolve, reject) {
                var handle = setTimeout(function () { return reject(new exceptions.Timeout(msg)); }, ms);
                _this.then(resolve, reject).finally(clearTimeout.bind(null, handle));
            }) : this;
    }
});
if (typeof Symbol !== 'undefined' && Symbol.toStringTag)
    setProp(Promise.prototype, Symbol.toStringTag, 'Promise');
// Now that Promise.prototype is defined, we have all it takes to set globalPSD.env.
// Environment globals snapshotted on leaving global zone
globalPSD.env = snapShot();
function Listener(onFulfilled, onRejected, resolve, reject, zone) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.resolve = resolve;
    this.reject = reject;
    this.psd = zone;
}
// Promise Static Properties
props(Promise, {
    all: function () {
        var values = getArrayOf.apply(null, arguments) // Supports iterables, implicit arguments and array-like.
            .map(onPossibleParallellAsync); // Handle parallell async/awaits 
        return new Promise(function (resolve, reject) {
            if (values.length === 0)
                resolve([]);
            var remaining = values.length;
            values.forEach(function (a, i) { return Promise.resolve(a).then(function (x) {
                values[i] = x;
                if (!--remaining)
                    resolve(values);
            }, reject); });
        });
    },
    resolve: function (value) {
        if (value instanceof Promise)
            return value;
        if (value && typeof value.then === 'function')
            return new Promise(function (resolve, reject) {
                value.then(resolve, reject);
            });
        var rv = new Promise(INTERNAL, true, value);
        linkToPreviousPromise(rv, currentFulfiller);
        return rv;
    },
    reject: PromiseReject,
    race: function () {
        var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
        return new Promise(function (resolve, reject) {
            values.map(function (value) { return Promise.resolve(value).then(resolve, reject); });
        });
    },
    PSD: {
        get: function () { return PSD; },
        set: function (value) { return PSD = value; }
    },
    //totalEchoes: {get: ()=>totalEchoes},
    //task: {get: ()=>task},
    newPSD: newScope,
    usePSD: usePSD,
    scheduler: {
        get: function () { return asap$1; },
        set: function (value) { asap$1 = value; }
    },
    rejectionMapper: {
        get: function () { return rejectionMapper; },
        set: function (value) { rejectionMapper = value; } // Map reject failures
    },
    follow: function (fn, zoneProps) {
        return new Promise(function (resolve, reject) {
            return newScope(function (resolve, reject) {
                var psd = PSD;
                psd.unhandleds = []; // For unhandled standard- or 3rd party Promises. Checked at psd.finalize()
                psd.onunhandled = reject; // Triggered directly on unhandled promises of this library.
                psd.finalize = callBoth(function () {
                    var _this = this;
                    // Unhandled standard or 3rd part promises are put in PSD.unhandleds and
                    // examined upon scope completion while unhandled rejections in this Promise
                    // will trigger directly through psd.onunhandled
                    run_at_end_of_this_or_next_physical_tick(function () {
                        _this.unhandleds.length === 0 ? resolve() : reject(_this.unhandleds[0]);
                    });
                }, psd.finalize);
                fn();
            }, zoneProps, resolve, reject);
        });
    }
});
/**
* Take a potentially misbehaving resolver function and make sure
* onFulfilled and onRejected are only called once.
*
* Makes no guarantees about asynchrony.
*/
function executePromiseTask(promise, fn) {
    // Promise Resolution Procedure:
    // https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
    try {
        fn(function (value) {
            if (promise._state !== null)
                return; // Already settled
            if (value === promise)
                throw new TypeError('A promise cannot be resolved with itself.');
            var shouldExecuteTick = promise._lib && beginMicroTickScope();
            if (value && typeof value.then === 'function') {
                executePromiseTask(promise, function (resolve, reject) {
                    value instanceof Promise ?
                        value._then(resolve, reject) :
                        value.then(resolve, reject);
                });
            }
            else {
                promise._state = true;
                promise._value = value;
                propagateAllListeners(promise);
            }
            if (shouldExecuteTick)
                endMicroTickScope();
        }, handleRejection.bind(null, promise)); // If Function.bind is not supported. Exception is handled in catch below
    }
    catch (ex) {
        handleRejection(promise, ex);
    }
}
function handleRejection(promise, reason) {
    rejectingErrors.push(reason);
    if (promise._state !== null)
        return;
    var shouldExecuteTick = promise._lib && beginMicroTickScope();
    reason = rejectionMapper(reason);
    promise._state = false;
    promise._value = reason;
    debug && reason !== null && typeof reason === 'object' && !reason._promise && tryCatch(function () {
        var origProp = getPropertyDescriptor(reason, "stack");
        reason._promise = promise;
        setProp(reason, "stack", {
            get: function () {
                return stack_being_generated ?
                    origProp && (origProp.get ?
                        origProp.get.apply(reason) :
                        origProp.value) :
                    promise.stack;
            }
        });
    });
    // Add the failure to a list of possibly uncaught errors
    addPossiblyUnhandledError(promise);
    propagateAllListeners(promise);
    if (shouldExecuteTick)
        endMicroTickScope();
}
function propagateAllListeners(promise) {
    //debug && linkToPreviousPromise(promise);
    var listeners = promise._listeners;
    promise._listeners = [];
    for (var i = 0, len = listeners.length; i < len; ++i) {
        propagateToListener(promise, listeners[i]);
    }
    var psd = promise._PSD;
    --psd.ref || psd.finalize(); // if psd.ref reaches zero, call psd.finalize();
    if (numScheduledCalls === 0) {
        // If numScheduledCalls is 0, it means that our stack is not in a callback of a scheduled call,
        // and that no deferreds where listening to this rejection or success.
        // Since there is a risk that our stack can contain application code that may
        // do stuff after this code is finished that may generate new calls, we cannot
        // call finalizers here.
        ++numScheduledCalls;
        asap$1(function () {
            if (--numScheduledCalls === 0)
                finalizePhysicalTick(); // Will detect unhandled errors
        }, []);
    }
}
function propagateToListener(promise, listener) {
    if (promise._state === null) {
        promise._listeners.push(listener);
        return;
    }
    var cb = promise._state ? listener.onFulfilled : listener.onRejected;
    if (cb === null) {
        // This Listener doesnt have a listener for the event being triggered (onFulfilled or onReject) so lets forward the event to any eventual listeners on the Promise instance returned by then() or catch()
        return (promise._state ? listener.resolve : listener.reject)(promise._value);
    }
    ++listener.psd.ref;
    ++numScheduledCalls;
    asap$1(callListener, [cb, promise, listener]);
}
function callListener(cb, promise, listener) {
    try {
        // Set static variable currentFulfiller to the promise that is being fullfilled,
        // so that we connect the chain of promises (for long stacks support)
        currentFulfiller = promise;
        // Call callback and resolve our listener with it's return value.
        var ret, value = promise._value;
        if (promise._state) {
            // cb is onResolved
            ret = cb(value);
        }
        else {
            // cb is onRejected
            if (rejectingErrors.length)
                rejectingErrors = [];
            ret = cb(value);
            if (rejectingErrors.indexOf(value) === -1)
                markErrorAsHandled(promise); // Callback didnt do Promise.reject(err) nor reject(err) onto another promise.
        }
        listener.resolve(ret);
    }
    catch (e) {
        // Exception thrown in callback. Reject our listener.
        listener.reject(e);
    }
    finally {
        // Restore env and currentFulfiller.
        currentFulfiller = null;
        if (--numScheduledCalls === 0)
            finalizePhysicalTick();
        --listener.psd.ref || listener.psd.finalize();
    }
}
function getStack(promise, stacks, limit) {
    if (stacks.length === limit)
        return stacks;
    var stack = "";
    if (promise._state === false) {
        var failure = promise._value, errorName, message;
        if (failure != null) {
            errorName = failure.name || "Error";
            message = failure.message || failure;
            stack = prettyStack(failure, 0);
        }
        else {
            errorName = failure; // If error is undefined or null, show that.
            message = "";
        }
        stacks.push(errorName + (message ? ": " + message : "") + stack);
    }
    if (debug) {
        stack = prettyStack(promise._stackHolder, 2);
        if (stack && stacks.indexOf(stack) === -1)
            stacks.push(stack);
        if (promise._prev)
            getStack(promise._prev, stacks, limit);
    }
    return stacks;
}
function linkToPreviousPromise(promise, prev) {
    // Support long stacks by linking to previous completed promise.
    var numPrev = prev ? prev._numPrev + 1 : 0;
    if (numPrev < LONG_STACKS_CLIP_LIMIT) {
        promise._prev = prev;
        promise._numPrev = numPrev;
    }
}
/* The callback to schedule with setImmediate() or setTimeout().
   It runs a virtual microtick and executes any callback registered in microtickQueue.
 */
function physicalTick() {
    beginMicroTickScope() && endMicroTickScope();
}
function beginMicroTickScope() {
    var wasRootExec = isOutsideMicroTick;
    isOutsideMicroTick = false;
    needsNewPhysicalTick = false;
    return wasRootExec;
}
/* Executes micro-ticks without doing try..catch.
   This can be possible because we only use this internally and
   the registered functions are exception-safe (they do try..catch
   internally before calling any external method). If registering
   functions in the microtickQueue that are not exception-safe, this
   would destroy the framework and make it instable. So we don't export
   our asap method.
*/
function endMicroTickScope() {
    var callbacks, i, l;
    do {
        while (microtickQueue.length > 0) {
            callbacks = microtickQueue;
            microtickQueue = [];
            l = callbacks.length;
            for (i = 0; i < l; ++i) {
                var item = callbacks[i];
                item[0].apply(null, item[1]);
            }
        }
    } while (microtickQueue.length > 0);
    isOutsideMicroTick = true;
    needsNewPhysicalTick = true;
}
function finalizePhysicalTick() {
    var unhandledErrs = unhandledErrors;
    unhandledErrors = [];
    unhandledErrs.forEach(function (p) {
        p._PSD.onunhandled.call(null, p._value, p);
    });
    var finalizers = tickFinalizers.slice(0); // Clone first because finalizer may remove itself from list.
    var i = finalizers.length;
    while (i)
        finalizers[--i]();
}
function run_at_end_of_this_or_next_physical_tick(fn) {
    function finalizer() {
        fn();
        tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
    }
    tickFinalizers.push(finalizer);
    ++numScheduledCalls;
    asap$1(function () {
        if (--numScheduledCalls === 0)
            finalizePhysicalTick();
    }, []);
}
function addPossiblyUnhandledError(promise) {
    // Only add to unhandledErrors if not already there. The first one to add to this list
    // will be upon the first rejection so that the root cause (first promise in the
    // rejection chain) is the one listed.
    if (!unhandledErrors.some(function (p) { return p._value === promise._value; }))
        unhandledErrors.push(promise);
}
function markErrorAsHandled(promise) {
    // Called when a reject handled is actually being called.
    // Search in unhandledErrors for any promise whos _value is this promise_value (list
    // contains only rejected promises, and only one item per error)
    var i = unhandledErrors.length;
    while (i)
        if (unhandledErrors[--i]._value === promise._value) {
            // Found a promise that failed with this same error object pointer,
            // Remove that since there is a listener that actually takes care of it.
            unhandledErrors.splice(i, 1);
            return;
        }
}
function PromiseReject(reason) {
    return new Promise(INTERNAL, false, reason);
}
function wrap(fn, errorCatcher) {
    var psd = PSD;
    return function () {
        var wasRootExec = beginMicroTickScope(), outerScope = PSD;
        try {
            switchToZone(psd, true);
            return fn.apply(this, arguments);
        }
        catch (e) {
            errorCatcher && errorCatcher(e);
        }
        finally {
            switchToZone(outerScope, false);
            if (wasRootExec)
                endMicroTickScope();
        }
    };
}
//
// variables used for native await support
//
var task = { awaits: 0, echoes: 0, id: 0 }; // The ongoing macro-task when using zone-echoing.
var taskCounter = 0; // ID counter for macro tasks.
var zoneStack = []; // Stack of left zones to restore asynchronically.
var zoneEchoes = 0; // zoneEchoes is a must in order to persist zones between native await expressions.
var totalEchoes = 0; // ID counter for micro-tasks. Used to detect possible native await in our Promise.prototype.then.
var zone_id_counter = 0;
function newScope(fn, props$$1, a1, a2) {
    var parent = PSD, psd = Object.create(parent);
    psd.parent = parent;
    psd.ref = 0;
    psd.global = false;
    psd.id = ++zone_id_counter;
    // Prepare for promise patching (done in usePSD):
    var globalEnv = globalPSD.env;
    psd.env = patchGlobalPromise ? {
        Promise: Promise,
        PromiseProp: { value: Promise, configurable: true, writable: true },
        all: Promise.all,
        race: Promise.race,
        resolve: Promise.resolve,
        reject: Promise.reject,
        nthen: getPatchedPromiseThen(globalEnv.nthen, psd),
        gthen: getPatchedPromiseThen(globalEnv.gthen, psd) // global then
    } : {};
    if (props$$1)
        extend(psd, props$$1);
    // unhandleds and onunhandled should not be specifically set here.
    // Leave them on parent prototype.
    // unhandleds.push(err) will push to parent's prototype
    // onunhandled() will call parents onunhandled (with this scope's this-pointer though!)
    ++parent.ref;
    psd.finalize = function () {
        --this.parent.ref || this.parent.finalize();
    };
    var rv = usePSD(psd, fn, a1, a2);
    if (psd.ref === 0)
        psd.finalize();
    return rv;
}
// Function to call if scopeFunc returns NativePromise
// Also for each NativePromise in the arguments to Promise.all()
function incrementExpectedAwaits() {
    if (!task.id)
        task.id = ++taskCounter;
    ++task.awaits;
    task.echoes += ZONE_ECHO_LIMIT;
    return task.id;
}
// Function to call when 'then' calls back on a native promise where onAwaitExpected() had been called.
// Also call this when a native await calls then method on a promise. In that case, don't supply
// sourceTaskId because we already know it refers to current task.
function decrementExpectedAwaits(sourceTaskId) {
    if (!task.awaits || (sourceTaskId && sourceTaskId !== task.id))
        return;
    if (--task.awaits === 0)
        task.id = 0;
    task.echoes = task.awaits * ZONE_ECHO_LIMIT; // Will reset echoes to 0 if awaits is 0.
}
// Call from Promise.all() and Promise.race()
function onPossibleParallellAsync(possiblePromise) {
    if (task.echoes && possiblePromise && possiblePromise.constructor === NativePromise) {
        incrementExpectedAwaits();
        return possiblePromise.then(function (x) {
            decrementExpectedAwaits();
            return x;
        }, function (e) {
            decrementExpectedAwaits();
            return rejection(e);
        });
    }
    return possiblePromise;
}
function zoneEnterEcho(targetZone) {
    ++totalEchoes;
    if (!task.echoes || --task.echoes === 0) {
        task.echoes = task.id = 0; // Cancel zone echoing.
    }
    zoneStack.push(PSD);
    switchToZone(targetZone, true);
}
function zoneLeaveEcho() {
    var zone = zoneStack[zoneStack.length - 1];
    zoneStack.pop();
    switchToZone(zone, false);
}
function switchToZone(targetZone, bEnteringZone) {
    var currentZone = PSD;
    if (bEnteringZone ? task.echoes && (!zoneEchoes++ || targetZone !== PSD) : zoneEchoes && (!--zoneEchoes || targetZone !== PSD)) {
        // Enter or leave zone asynchronically as well, so that tasks initiated during current tick
        // will be surrounded by the zone when they are invoked.
        enqueueNativeMicroTask(bEnteringZone ? zoneEnterEcho.bind(null, targetZone) : zoneLeaveEcho);
    }
    if (targetZone === PSD)
        return;
    PSD = targetZone; // The actual zone switch occurs at this line.
    // Snapshot on every leave from global zone.
    if (currentZone === globalPSD)
        globalPSD.env = snapShot();
    if (patchGlobalPromise) {
        // Let's patch the global and native Promises (may be same or may be different)
        var GlobalPromise = globalPSD.env.Promise;
        // Swich environments (may be PSD-zone or the global zone. Both apply.)
        var targetEnv = targetZone.env;
        // Change Promise.prototype.then for native and global Promise (they MAY differ on polyfilled environments, but both can be accessed)
        // Must be done on each zone change because the patched method contains targetZone in its closure.
        nativePromiseProto.then = targetEnv.nthen;
        GlobalPromise.prototype.then = targetEnv.gthen;
        if (currentZone.global || targetZone.global) {
            // Leaving or entering global zone. It's time to patch / restore global Promise.
            // Set this Promise to window.Promise so that transiled async functions will work on Firefox, Safari and IE, as well as with Zonejs and angular.
            Object.defineProperty(_global, 'Promise', targetEnv.PromiseProp);
            // Support Promise.all() etc to work indexedDB-safe also when people are including es6-promise as a module (they might
            // not be accessing global.Promise but a local reference to it)
            GlobalPromise.all = targetEnv.all;
            GlobalPromise.race = targetEnv.race;
            GlobalPromise.resolve = targetEnv.resolve;
            GlobalPromise.reject = targetEnv.reject;
        }
    }
}
function snapShot() {
    var GlobalPromise = _global.Promise;
    return patchGlobalPromise ? {
        Promise: GlobalPromise,
        PromiseProp: Object.getOwnPropertyDescriptor(_global, "Promise"),
        all: GlobalPromise.all,
        race: GlobalPromise.race,
        resolve: GlobalPromise.resolve,
        reject: GlobalPromise.reject,
        nthen: nativePromiseProto.then,
        gthen: GlobalPromise.prototype.then
    } : {};
}
function usePSD(psd, fn, a1, a2, a3) {
    var outerScope = PSD;
    try {
        switchToZone(psd, true);
        return fn(a1, a2, a3);
    }
    finally {
        switchToZone(outerScope, false);
    }
}
function enqueueNativeMicroTask(job) {
    //
    // Precondition: nativePromiseThen !== undefined
    //
    nativePromiseThen.call(resolvedNativePromise, job);
}
function nativeAwaitCompatibleWrap(fn, zone, possibleAwait) {
    return typeof fn !== 'function' ? fn : function () {
        var outerZone = PSD;
        if (possibleAwait)
            incrementExpectedAwaits();
        switchToZone(zone, true);
        try {
            return fn.apply(this, arguments);
        }
        finally {
            switchToZone(outerZone, false);
        }
    };
}
function getPatchedPromiseThen(origThen, zone) {
    return function (onResolved, onRejected) {
        return origThen.call(this, nativeAwaitCompatibleWrap(onResolved, zone, false), nativeAwaitCompatibleWrap(onRejected, zone, false));
    };
}
var UNHANDLEDREJECTION = "unhandledrejection";
function globalError(err, promise) {
    var rv;
    try {
        rv = promise.onuncatched(err);
    }
    catch (e) { }
    if (rv !== false)
        try {
            var event, eventData = { promise: promise, reason: err };
            if (_global.document && document.createEvent) {
                event = document.createEvent('Event');
                event.initEvent(UNHANDLEDREJECTION, true, true);
                extend(event, eventData);
            }
            else if (_global.CustomEvent) {
                event = new CustomEvent(UNHANDLEDREJECTION, { detail: eventData });
                extend(event, eventData);
            }
            if (event && _global.dispatchEvent) {
                dispatchEvent(event);
                if (!_global.PromiseRejectionEvent && _global.onunhandledrejection)
                    // No native support for PromiseRejectionEvent but user has set window.onunhandledrejection. Manually call it.
                    try {
                        _global.onunhandledrejection(event);
                    }
                    catch (_) { }
            }
            if (!event.defaultPrevented) {
                console.warn("Unhandled rejection: " + (err.stack || err));
            }
        }
        catch (e) { }
}
var rejection = Promise.reject;

function Events(ctx) {
    var evs = {};
    var rv = function (eventName, subscriber) {
        if (subscriber) {
            // Subscribe. If additional arguments than just the subscriber was provided, forward them as well.
            var i = arguments.length, args = new Array(i - 1);
            while (--i)
                args[i - 1] = arguments[i];
            evs[eventName].subscribe.apply(null, args);
            return ctx;
        }
        else if (typeof (eventName) === 'string') {
            // Return interface allowing to fire or unsubscribe from event
            return evs[eventName];
        }
    };
    rv.addEventType = add;
    for (var i = 1, l = arguments.length; i < l; ++i) {
        add(arguments[i]);
    }
    return rv;
    function add(eventName, chainFunction, defaultFunction) {
        if (typeof eventName === 'object')
            return addConfiguredEvents(eventName);
        if (!chainFunction)
            chainFunction = reverseStoppableEventChain;
        if (!defaultFunction)
            defaultFunction = nop;
        var context = {
            subscribers: [],
            fire: defaultFunction,
            subscribe: function (cb) {
                if (context.subscribers.indexOf(cb) === -1) {
                    context.subscribers.push(cb);
                    context.fire = chainFunction(context.fire, cb);
                }
            },
            unsubscribe: function (cb) {
                context.subscribers = context.subscribers.filter(function (fn) { return fn !== cb; });
                context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
            }
        };
        evs[eventName] = rv[eventName] = context;
        return context;
    }
    function addConfiguredEvents(cfg) {
        // events(this, {reading: [functionChain, nop]});
        keys(cfg).forEach(function (eventName) {
            var args = cfg[eventName];
            if (isArray(args)) {
                add(eventName, cfg[eventName][0], cfg[eventName][1]);
            }
            else if (args === 'asap') {
                // Rather than approaching event subscription using a functional approach, we here do it in a for-loop where subscriber is executed in its own stack
                // enabling that any exception that occur wont disturb the initiator and also not nescessary be catched and forgotten.
                var context = add(eventName, mirror, function fire() {
                    // Optimazation-safe cloning of arguments into args.
                    var i = arguments.length, args = new Array(i);
                    while (i--)
                        args[i] = arguments[i];
                    // All each subscriber:
                    context.subscribers.forEach(function (fn) {
                        asap(function fireEvent() {
                            fn.apply(null, args);
                        });
                    });
                });
            }
            else
                throw new exceptions.InvalidArgument("Invalid event config");
        });
    }
}

/*
 * Dexie.js - a minimalistic wrapper for IndexedDB
 * ===============================================
 *
 * Copyright (c) 2014-2017 David Fahlander
 *
 * Version {version}, {date}
 *
 * http://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/LICENSE-2.0
 *
 */
var DEXIE_VERSION = '{version}';
var maxString = String.fromCharCode(65535);
var maxKey = (function () { try {
    IDBKeyRange.only([[]]);
    return [[]];
}
catch (e) {
    return maxString;
} })();
var minKey = -Infinity;
var INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
var STRING_EXPECTED = "String expected.";
var connections = [];
var isIEOrEdge = typeof navigator !== 'undefined' && /(MSIE|Trident|Edge)/.test(navigator.userAgent);
var hasIEDeleteObjectStoreBug = isIEOrEdge;
var hangsOnDeleteLargeKeyRange = isIEOrEdge;
var dexieStackFrameFilter = function (frame) { return !/(dexie\.js|dexie\.min\.js)/.test(frame); };
var dbNamesDB; // Global database for backing Dexie.getDatabaseNames() on browser without indexedDB.webkitGetDatabaseNames() 
// Init debug
setDebug(debug, dexieStackFrameFilter);
function Dexie(dbName, options) {
    /// <param name="options" type="Object" optional="true">Specify only if you wich to control which addons that should run on this instance</param>
    var deps = Dexie.dependencies;
    var opts = extend({
        // Default Options
        addons: Dexie.addons,
        autoOpen: true,
        indexedDB: deps.indexedDB,
        IDBKeyRange: deps.IDBKeyRange // Backend IDBKeyRange api. Default to browser env.
    }, options);
    var addons = opts.addons, autoOpen = opts.autoOpen, indexedDB = opts.indexedDB, IDBKeyRange = opts.IDBKeyRange;
    var globalSchema = this._dbSchema = {};
    var versions = [];
    var dbStoreNames = [];
    var allTables = {};
    ///<var type="IDBDatabase" />
    var idbdb = null; // Instance of IDBDatabase
    var dbOpenError = null;
    var isBeingOpened = false;
    var onReadyBeingFired = null;
    var openComplete = false;
    var READONLY = "readonly", READWRITE = "readwrite";
    var db = this;
    var dbReadyResolve, dbReadyPromise = new Promise(function (resolve) {
        dbReadyResolve = resolve;
    }), cancelOpen, openCanceller = new Promise(function (_, reject) {
        cancelOpen = reject;
    });
    var autoSchema = true;
    var hasNativeGetDatabaseNames = !!getNativeGetDatabaseNamesFn(indexedDB), hasGetAll;
    function init() {
        // Default subscribers to "versionchange" and "blocked".
        // Can be overridden by custom handlers. If custom handlers return false, these default
        // behaviours will be prevented.
        db.on("versionchange", function (ev) {
            // Default behavior for versionchange event is to close database connection.
            // Caller can override this behavior by doing db.on("versionchange", function(){ return false; });
            // Let's not block the other window from making it's delete() or open() call.
            // NOTE! This event is never fired in IE,Edge or Safari.
            if (ev.newVersion > 0)
                console.warn("Another connection wants to upgrade database '" + db.name + "'. Closing db now to resume the upgrade.");
            else
                console.warn("Another connection wants to delete database '" + db.name + "'. Closing db now to resume the delete request.");
            db.close();
            // In many web applications, it would be recommended to force window.reload()
            // when this event occurs. To do that, subscribe to the versionchange event
            // and call window.location.reload(true) if ev.newVersion > 0 (not a deletion)
            // The reason for this is that your current web app obviously has old schema code that needs
            // to be updated. Another window got a newer version of the app and needs to upgrade DB but
            // your window is blocking it unless we close it here.
        });
        db.on("blocked", function (ev) {
            if (!ev.newVersion || ev.newVersion < ev.oldVersion)
                console.warn("Dexie.delete('" + db.name + "') was blocked");
            else
                console.warn("Upgrade '" + db.name + "' blocked by other connection holding version " + ev.oldVersion / 10);
        });
    }
    //
    //
    //
    // ------------------------- Versioning Framework---------------------------
    //
    //
    //
    this.version = function (versionNumber) {
        /// <param name="versionNumber" type="Number"></param>
        /// <returns type="Version"></returns>
        if (idbdb || isBeingOpened)
            throw new exceptions.Schema("Cannot add version when database is open");
        this.verno = Math.max(this.verno, versionNumber);
        var versionInstance = versions.filter(function (v) { return v._cfg.version === versionNumber; })[0];
        if (versionInstance)
            return versionInstance;
        versionInstance = new Version(versionNumber);
        versions.push(versionInstance);
        versions.sort(lowerVersionFirst);
        // Disable autoschema mode, as at least one version is specified.
        autoSchema = false;
        return versionInstance;
    };
    function Version(versionNumber) {
        this._cfg = {
            version: versionNumber,
            storesSource: null,
            dbschema: {},
            tables: {},
            contentUpgrade: null
        };
        this.stores({}); // Derive earlier schemas by default.
    }
    extend(Version.prototype, {
        stores: function (stores) {
            /// <summary>
            ///   Defines the schema for a particular version
            /// </summary>
            /// <param name="stores" type="Object">
            /// Example: <br/>
            ///   {users: "id++,first,last,&amp;username,*email", <br/>
            ///   passwords: "id++,&amp;username"}<br/>
            /// <br/>
            /// Syntax: {Table: "[primaryKey][++],[&amp;][*]index1,[&amp;][*]index2,..."}<br/><br/>
            /// Special characters:<br/>
            ///  "&amp;"  means unique key, <br/>
            ///  "*"  means value is multiEntry, <br/>
            ///  "++" means auto-increment and only applicable for primary key <br/>
            /// </param>
            this._cfg.storesSource = this._cfg.storesSource ? extend(this._cfg.storesSource, stores) : stores;
            // Derive stores from earlier versions if they are not explicitely specified as null or a new syntax.
            var storesSpec = {};
            versions.forEach(function (version) {
                extend(storesSpec, version._cfg.storesSource);
            });
            var dbschema = (this._cfg.dbschema = {});
            this._parseStoresSpec(storesSpec, dbschema);
            // Update the latest schema to this version
            // Update API
            globalSchema = db._dbSchema = dbschema;
            removeTablesApi([allTables, db, Transaction.prototype]); // Keep Transaction.prototype even though it should be depr.
            setApiOnPlace([allTables, db, Transaction.prototype, this._cfg.tables], keys(dbschema), dbschema);
            dbStoreNames = keys(dbschema);
            return this;
        },
        upgrade: function (upgradeFunction) {
            this._cfg.contentUpgrade = upgradeFunction;
            return this;
        },
        _parseStoresSpec: function (stores, outSchema) {
            keys(stores).forEach(function (tableName) {
                if (stores[tableName] !== null) {
                    var instanceTemplate = {};
                    var indexes = parseIndexSyntax(stores[tableName]);
                    var primKey = indexes.shift();
                    if (primKey.multi)
                        throw new exceptions.Schema("Primary key cannot be multi-valued");
                    if (primKey.keyPath)
                        setByKeyPath(instanceTemplate, primKey.keyPath, primKey.auto ? 0 : primKey.keyPath);
                    indexes.forEach(function (idx) {
                        if (idx.auto)
                            throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
                        if (!idx.keyPath)
                            throw new exceptions.Schema("Index must have a name and cannot be an empty string");
                        setByKeyPath(instanceTemplate, idx.keyPath, idx.compound ? idx.keyPath.map(function () { return ""; }) : "");
                    });
                    outSchema[tableName] = new TableSchema(tableName, primKey, indexes, instanceTemplate);
                }
            });
        }
    });
    function runUpgraders(oldVersion, idbtrans, reject) {
        var trans = db._createTransaction(READWRITE, dbStoreNames, globalSchema);
        trans.create(idbtrans);
        trans._completion.catch(reject);
        var rejectTransaction = trans._reject.bind(trans);
        newScope(function () {
            PSD.trans = trans;
            if (oldVersion === 0) {
                // Create tables:
                keys(globalSchema).forEach(function (tableName) {
                    createTable(idbtrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
                });
                Promise.follow(function () { return db.on.populate.fire(trans); }).catch(rejectTransaction);
            }
            else
                updateTablesAndIndexes(oldVersion, trans, idbtrans).catch(rejectTransaction);
        });
    }
    function updateTablesAndIndexes(oldVersion, trans, idbtrans) {
        // Upgrade version to version, step-by-step from oldest to newest version.
        // Each transaction object will contain the table set that was current in that version (but also not-yet-deleted tables from its previous version)
        var queue = [];
        var oldVersionStruct = versions.filter(function (version) { return version._cfg.version === oldVersion; })[0];
        if (!oldVersionStruct)
            throw new exceptions.Upgrade("Dexie specification of currently installed DB version is missing");
        globalSchema = db._dbSchema = oldVersionStruct._cfg.dbschema;
        var anyContentUpgraderHasRun = false;
        var versToRun = versions.filter(function (v) { return v._cfg.version > oldVersion; });
        versToRun.forEach(function (version) {
            /// <param name="version" type="Version"></param>
            queue.push(function () {
                var oldSchema = globalSchema;
                var newSchema = version._cfg.dbschema;
                adjustToExistingIndexNames(oldSchema, idbtrans);
                adjustToExistingIndexNames(newSchema, idbtrans);
                globalSchema = db._dbSchema = newSchema;
                var diff = getSchemaDiff(oldSchema, newSchema);
                // Add tables           
                diff.add.forEach(function (tuple) {
                    createTable(idbtrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
                });
                // Change tables
                diff.change.forEach(function (change) {
                    if (change.recreate) {
                        throw new exceptions.Upgrade("Not yet support for changing primary key");
                    }
                    else {
                        var store = idbtrans.objectStore(change.name);
                        // Add indexes
                        change.add.forEach(function (idx) {
                            addIndex(store, idx);
                        });
                        // Update indexes
                        change.change.forEach(function (idx) {
                            store.deleteIndex(idx.name);
                            addIndex(store, idx);
                        });
                        // Delete indexes
                        change.del.forEach(function (idxName) {
                            store.deleteIndex(idxName);
                        });
                    }
                });
                if (version._cfg.contentUpgrade) {
                    anyContentUpgraderHasRun = true;
                    return Promise.follow(function () {
                        version._cfg.contentUpgrade(trans);
                    });
                }
            });
            queue.push(function (idbtrans) {
                if (!anyContentUpgraderHasRun || !hasIEDeleteObjectStoreBug) {
                    var newSchema = version._cfg.dbschema;
                    // Delete old tables
                    deleteRemovedTables(newSchema, idbtrans);
                }
            });
        });
        // Now, create a queue execution engine
        function runQueue() {
            return queue.length ? Promise.resolve(queue.shift()(trans.idbtrans)).then(runQueue) :
                Promise.resolve();
        }
        return runQueue().then(function () {
            createMissingTables(globalSchema, idbtrans); // At last, make sure to create any missing tables. (Needed by addons that add stores to DB without specifying version)
        });
    }
    function getSchemaDiff(oldSchema, newSchema) {
        var diff = {
            del: [],
            add: [],
            change: [] // Array of {name: tableName, recreate: newDefinition, del: delIndexNames, add: newIndexDefs, change: changedIndexDefs}
        };
        for (var table in oldSchema) {
            if (!newSchema[table])
                diff.del.push(table);
        }
        for (table in newSchema) {
            var oldDef = oldSchema[table], newDef = newSchema[table];
            if (!oldDef) {
                diff.add.push([table, newDef]);
            }
            else {
                var change = {
                    name: table,
                    def: newDef,
                    recreate: false,
                    del: [],
                    add: [],
                    change: []
                };
                if (oldDef.primKey.src !== newDef.primKey.src) {
                    // Primary key has changed. Remove and re-add table.
                    change.recreate = true;
                    diff.change.push(change);
                }
                else {
                    // Same primary key. Just find out what differs:
                    var oldIndexes = oldDef.idxByName;
                    var newIndexes = newDef.idxByName;
                    for (var idxName in oldIndexes) {
                        if (!newIndexes[idxName])
                            change.del.push(idxName);
                    }
                    for (idxName in newIndexes) {
                        var oldIdx = oldIndexes[idxName], newIdx = newIndexes[idxName];
                        if (!oldIdx)
                            change.add.push(newIdx);
                        else if (oldIdx.src !== newIdx.src)
                            change.change.push(newIdx);
                    }
                    if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
                        diff.change.push(change);
                    }
                }
            }
        }
        return diff;
    }
    function createTable(idbtrans, tableName, primKey, indexes) {
        /// <param name="idbtrans" type="IDBTransaction"></param>
        var store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? { keyPath: primKey.keyPath, autoIncrement: primKey.auto } : { autoIncrement: primKey.auto });
        indexes.forEach(function (idx) { addIndex(store, idx); });
        return store;
    }
    function createMissingTables(newSchema, idbtrans) {
        keys(newSchema).forEach(function (tableName) {
            if (!idbtrans.db.objectStoreNames.contains(tableName)) {
                createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
            }
        });
    }
    function deleteRemovedTables(newSchema, idbtrans) {
        for (var i = 0; i < idbtrans.db.objectStoreNames.length; ++i) {
            var storeName = idbtrans.db.objectStoreNames[i];
            if (newSchema[storeName] == null) {
                idbtrans.db.deleteObjectStore(storeName);
            }
        }
    }
    function addIndex(store, idx) {
        store.createIndex(idx.name, idx.keyPath, { unique: idx.unique, multiEntry: idx.multi });
    }
    //
    //
    //      Dexie Protected API
    //
    //
    this._allTables = allTables;
    this._createTransaction = function (mode, storeNames, dbschema, parentTransaction) {
        return new Transaction(mode, storeNames, dbschema, parentTransaction);
    };
    /* Generate a temporary transaction when db operations are done outside a transaction scope.
    */
    function tempTransaction(mode, storeNames, fn) {
        if (!openComplete && (!PSD.letThrough)) {
            if (!isBeingOpened) {
                if (!autoOpen)
                    return rejection(new exceptions.DatabaseClosed());
                db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
            }
            return dbReadyPromise.then(function () { return tempTransaction(mode, storeNames, fn); });
        }
        else {
            var trans = db._createTransaction(mode, storeNames, globalSchema);
            try {
                trans.create();
            }
            catch (ex) {
                return rejection(ex);
            }
            return trans._promise(mode, function (resolve, reject) {
                return newScope(function () {
                    PSD.trans = trans;
                    return fn(resolve, reject, trans);
                });
            }).then(function (result) {
                // Instead of resolving value directly, wait with resolving it until transaction has completed.
                // Otherwise the data would not be in the DB if requesting it in the then() operation.
                // Specifically, to ensure that the following expression will work:
                //
                //   db.friends.put({name: "Arne"}).then(function () {
                //       db.friends.where("name").equals("Arne").count(function(count) {
                //           assert (count === 1);
                //       });
                //   });
                //
                return trans._completion.then(function () { return result; });
            }); /*.catch(err => { // Don't do this as of now. If would affect bulk- and modify methods in a way that could be more intuitive. But wait! Maybe change in next major.
                trans._reject(err);
                return rejection(err);
            });*/
        }
    }
    this._whenReady = function (fn) {
        return openComplete || PSD.letThrough ? fn() : new Promise(function (resolve, reject) {
            if (!isBeingOpened) {
                if (!autoOpen) {
                    reject(new exceptions.DatabaseClosed());
                    return;
                }
                db.open().catch(nop); // Open in background. If if fails, it will be catched by the final promise anyway.
            }
            dbReadyPromise.then(resolve, reject);
        }).then(fn);
    };
    //
    //
    //
    //
    //      Dexie API
    //
    //
    //
    this.verno = 0;
    this.open = function () {
        if (isBeingOpened || idbdb)
            return dbReadyPromise.then(function () { return dbOpenError ? rejection(dbOpenError) : db; });
        debug && (openCanceller._stackHolder = getErrorWithStack()); // Let stacks point to when open() was called rather than where new Dexie() was called.
        isBeingOpened = true;
        dbOpenError = null;
        openComplete = false;
        // Function pointers to call when the core opening process completes.
        var resolveDbReady = dbReadyResolve, 
        // upgradeTransaction to abort on failure.
        upgradeTransaction = null;
        return Promise.race([openCanceller, new Promise(function (resolve, reject) {
                // Multiply db.verno with 10 will be needed to workaround upgrading bug in IE:
                // IE fails when deleting objectStore after reading from it.
                // A future version of Dexie.js will stopover an intermediate version to workaround this.
                // At that point, we want to be backward compatible. Could have been multiplied with 2, but by using 10, it is easier to map the number to the real version number.
                // If no API, throw!
                if (!indexedDB)
                    throw new exceptions.MissingAPI("indexedDB API not found. If using IE10+, make sure to run your code on a server URL " +
                        "(not locally). If using old Safari versions, make sure to include indexedDB polyfill.");
                var req = autoSchema ? indexedDB.open(dbName) : indexedDB.open(dbName, Math.round(db.verno * 10));
                if (!req)
                    throw new exceptions.MissingAPI("IndexedDB API not available"); // May happen in Safari private mode, see https://github.com/dfahlander/Dexie.js/issues/134
                req.onerror = eventRejectHandler(reject);
                req.onblocked = wrap(fireOnBlocked);
                req.onupgradeneeded = wrap(function (e) {
                    upgradeTransaction = req.transaction;
                    if (autoSchema && !db._allowEmptyDB) {
                        // Caller did not specify a version or schema. Doing that is only acceptable for opening alread existing databases.
                        // If onupgradeneeded is called it means database did not exist. Reject the open() promise and make sure that we
                        // do not create a new database by accident here.
                        req.onerror = preventDefault; // Prohibit onabort error from firing before we're done!
                        upgradeTransaction.abort(); // Abort transaction (would hope that this would make DB disappear but it doesnt.)
                        // Close database and delete it.
                        req.result.close();
                        var delreq = indexedDB.deleteDatabase(dbName); // The upgrade transaction is atomic, and javascript is single threaded - meaning that there is no risk that we delete someone elses database here!
                        delreq.onsuccess = delreq.onerror = wrap(function () {
                            reject(new exceptions.NoSuchDatabase("Database " + dbName + " doesnt exist"));
                        });
                    }
                    else {
                        upgradeTransaction.onerror = eventRejectHandler(reject);
                        var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion; // Safari 8 fix.
                        runUpgraders(oldVer / 10, upgradeTransaction, reject, req);
                    }
                }, reject);
                req.onsuccess = wrap(function () {
                    // Core opening procedure complete. Now let's just record some stuff.
                    upgradeTransaction = null;
                    idbdb = req.result;
                    connections.push(db); // Used for emulating versionchange event on IE/Edge/Safari.
                    if (autoSchema)
                        readGlobalSchema();
                    else if (idbdb.objectStoreNames.length > 0) {
                        try {
                            adjustToExistingIndexNames(globalSchema, idbdb.transaction(safariMultiStoreFix(idbdb.objectStoreNames), READONLY));
                        }
                        catch (e) {
                            // Safari may bail out if > 1 store names. However, this shouldnt be a showstopper. Issue #120.
                        }
                    }
                    idbdb.onversionchange = wrap(function (ev) {
                        db._vcFired = true; // detect implementations that not support versionchange (IE/Edge/Safari)
                        db.on("versionchange").fire(ev);
                    });
                    if (!hasNativeGetDatabaseNames && dbName !== '__dbnames') {
                        dbNamesDB.dbnames.put({ name: dbName }).catch(nop);
                    }
                    resolve();
                }, reject);
            })]).then(function () {
            // Before finally resolving the dbReadyPromise and this promise,
            // call and await all on('ready') subscribers:
            // Dexie.vip() makes subscribers able to use the database while being opened.
            // This is a must since these subscribers take part of the opening procedure.
            onReadyBeingFired = [];
            return Promise.resolve(Dexie.vip(db.on.ready.fire)).then(function fireRemainders() {
                if (onReadyBeingFired.length > 0) {
                    // In case additional subscribers to db.on('ready') were added during the time db.on.ready.fire was executed.
                    var remainders = onReadyBeingFired.reduce(promisableChain, nop);
                    onReadyBeingFired = [];
                    return Promise.resolve(Dexie.vip(remainders)).then(fireRemainders);
                }
            });
        }).finally(function () {
            onReadyBeingFired = null;
        }).then(function () {
            // Resolve the db.open() with the db instance.
            isBeingOpened = false;
            return db;
        }).catch(function (err) {
            try {
                // Did we fail within onupgradeneeded? Make sure to abort the upgrade transaction so it doesnt commit.
                upgradeTransaction && upgradeTransaction.abort();
            }
            catch (e) { }
            isBeingOpened = false; // Set before calling db.close() so that it doesnt reject openCanceller again (leads to unhandled rejection event).
            db.close(); // Closes and resets idbdb, removes connections, resets dbReadyPromise and openCanceller so that a later db.open() is fresh.
            // A call to db.close() may have made on-ready subscribers fail. Use dbOpenError if set, since err could be a follow-up error on that.
            dbOpenError = err; // Record the error. It will be used to reject further promises of db operations.
            return rejection(dbOpenError);
        }).finally(function () {
            openComplete = true;
            resolveDbReady(); // dbReadyPromise is resolved no matter if open() rejects or resolved. It's just to wake up waiters.
        });
    };
    this.close = function () {
        var idx = connections.indexOf(db);
        if (idx >= 0)
            connections.splice(idx, 1);
        if (idbdb) {
            try {
                idbdb.close();
            }
            catch (e) { }
            idbdb = null;
        }
        autoOpen = false;
        dbOpenError = new exceptions.DatabaseClosed();
        if (isBeingOpened)
            cancelOpen(dbOpenError);
        // Reset dbReadyPromise promise:
        dbReadyPromise = new Promise(function (resolve) {
            dbReadyResolve = resolve;
        });
        openCanceller = new Promise(function (_, reject) {
            cancelOpen = reject;
        });
    };
    this.delete = function () {
        var hasArguments = arguments.length > 0;
        return new Promise(function (resolve, reject) {
            if (hasArguments)
                throw new exceptions.InvalidArgument("Arguments not allowed in db.delete()");
            if (isBeingOpened) {
                dbReadyPromise.then(doDelete);
            }
            else {
                doDelete();
            }
            function doDelete() {
                db.close();
                var req = indexedDB.deleteDatabase(dbName);
                req.onsuccess = wrap(function () {
                    if (!hasNativeGetDatabaseNames) {
                        dbNamesDB.dbnames.delete(dbName).catch(nop);
                    }
                    resolve();
                });
                req.onerror = eventRejectHandler(reject);
                req.onblocked = fireOnBlocked;
            }
        });
    };
    this.backendDB = function () {
        return idbdb;
    };
    this.isOpen = function () {
        return idbdb !== null;
    };
    this.hasBeenClosed = function () {
        return dbOpenError && (dbOpenError instanceof exceptions.DatabaseClosed);
    };
    this.hasFailed = function () {
        return dbOpenError !== null;
    };
    this.dynamicallyOpened = function () {
        return autoSchema;
    };
    //
    // Properties
    //
    this.name = dbName;
    // db.tables - an array of all Table instances.
    props(this, {
        tables: {
            get: function () {
                /// <returns type="Array" elementType="Table" />
                return keys(allTables).map(function (name) { return allTables[name]; });
            }
        }
    });
    //
    // Events
    //
    this.on = Events(this, "populate", "blocked", "versionchange", { ready: [promisableChain, nop] });
    this.on.ready.subscribe = override(this.on.ready.subscribe, function (subscribe) {
        return function (subscriber, bSticky) {
            Dexie.vip(function () {
                if (openComplete) {
                    // Database already open. Call subscriber asap.
                    if (!dbOpenError)
                        Promise.resolve().then(subscriber);
                    // bSticky: Also subscribe to future open sucesses (after close / reopen) 
                    if (bSticky)
                        subscribe(subscriber);
                }
                else if (onReadyBeingFired) {
                    // db.on('ready') subscribers are currently being executed and have not yet resolved or rejected
                    onReadyBeingFired.push(subscriber);
                    if (bSticky)
                        subscribe(subscriber);
                }
                else {
                    // Database not yet open. Subscribe to it.
                    subscribe(subscriber);
                    // If bSticky is falsy, make sure to unsubscribe subscriber when fired once.
                    if (!bSticky)
                        subscribe(function unsubscribe() {
                            db.on.ready.unsubscribe(subscriber);
                            db.on.ready.unsubscribe(unsubscribe);
                        });
                }
            });
        };
    });
    this.transaction = function () {
        /// <summary>
        ///
        /// </summary>
        /// <param name="mode" type="String">"r" for readonly, or "rw" for readwrite</param>
        /// <param name="tableInstances">Table instance, Array of Table instances, String or String Array of object stores to include in the transaction</param>
        /// <param name="scopeFunc" type="Function">Function to execute with transaction</param>
        var args = extractTransactionArgs.apply(this, arguments);
        return this._transaction.apply(this, args);
    };
    function extractTransactionArgs(mode, _tableArgs_, scopeFunc) {
        // Let table arguments be all arguments between mode and last argument.
        var i = arguments.length;
        if (i < 2)
            throw new exceptions.InvalidArgument("Too few arguments");
        // Prevent optimzation killer (https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments)
        // and clone arguments except the first one into local var 'args'.
        var args = new Array(i - 1);
        while (--i)
            args[i - 1] = arguments[i];
        // Let scopeFunc be the last argument and pop it so that args now only contain the table arguments.
        scopeFunc = args.pop();
        var tables = flatten(args); // Support using array as middle argument, or a mix of arrays and non-arrays.
        return [mode, tables, scopeFunc];
    }
    this._transaction = function (mode, tables, scopeFunc) {
        var parentTransaction = PSD.trans;
        // Check if parent transactions is bound to this db instance, and if caller wants to reuse it
        if (!parentTransaction || parentTransaction.db !== db || mode.indexOf('!') !== -1)
            parentTransaction = null;
        var onlyIfCompatible = mode.indexOf('?') !== -1;
        mode = mode.replace('!', '').replace('?', ''); // Ok. Will change arguments[0] as well but we wont touch arguments henceforth.
        try {
            //
            // Get storeNames from arguments. Either through given table instances, or through given table names.
            //
            var storeNames = tables.map(function (table) {
                var storeName = table instanceof Table ? table.name : table;
                if (typeof storeName !== 'string')
                    throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
                return storeName;
            });
            //
            // Resolve mode. Allow shortcuts "r" and "rw".
            //
            if (mode == "r" || mode == READONLY)
                mode = READONLY;
            else if (mode == "rw" || mode == READWRITE)
                mode = READWRITE;
            else
                throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);
            if (parentTransaction) {
                // Basic checks
                if (parentTransaction.mode === READONLY && mode === READWRITE) {
                    if (onlyIfCompatible) {
                        // Spawn new transaction instead.
                        parentTransaction = null;
                    }
                    else
                        throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
                }
                if (parentTransaction) {
                    storeNames.forEach(function (storeName) {
                        if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
                            if (onlyIfCompatible) {
                                // Spawn new transaction instead.
                                parentTransaction = null;
                            }
                            else
                                throw new exceptions.SubTransaction("Table " + storeName +
                                    " not included in parent transaction.");
                        }
                    });
                }
                if (onlyIfCompatible && parentTransaction && !parentTransaction.active) {
                    // '?' mode should not keep using an inactive transaction.
                    parentTransaction = null;
                }
            }
        }
        catch (e) {
            return parentTransaction ?
                parentTransaction._promise(null, function (_, reject) { reject(e); }) :
                rejection(e);
        }
        // If this is a sub-transaction, lock the parent and then launch the sub-transaction.
        return (parentTransaction ?
            parentTransaction._promise(mode, enterTransactionScope, "lock") :
            PSD.trans ?
                // no parent transaction despite PSD.trans exists. Make sure also
                // that the zone we create is not a sub-zone of current, because
                // Promise.follow() should not wait for it if so.
                usePSD(PSD.transless, function () { return db._whenReady(enterTransactionScope); }) :
                db._whenReady(enterTransactionScope));
        function enterTransactionScope() {
            return Promise.resolve().then(function () {
                // Keep a pointer to last non-transactional PSD to use if someone calls Dexie.ignoreTransaction().
                var transless = PSD.transless || PSD;
                // Our transaction.
                //return new Promise((resolve, reject) => {
                var trans = db._createTransaction(mode, storeNames, globalSchema, parentTransaction);
                // Let the transaction instance be part of a Promise-specific data (PSD) value.
                var zoneProps = {
                    trans: trans,
                    transless: transless
                };
                if (parentTransaction) {
                    // Emulate transaction commit awareness for inner transaction (must 'commit' when the inner transaction has no more operations ongoing)
                    trans.idbtrans = parentTransaction.idbtrans;
                }
                else {
                    trans.create(); // Create the backend transaction so that complete() or error() will trigger even if no operation is made upon it.
                }
                // Support for native async await.
                if (scopeFunc.constructor === AsyncFunction) {
                    incrementExpectedAwaits();
                }
                var returnValue;
                var promiseFollowed = Promise.follow(function () {
                    // Finally, call the scope function with our table and transaction arguments.
                    returnValue = scopeFunc.call(trans, trans);
                    if (returnValue) {
                        if (returnValue.constructor === NativePromise) {
                            var decrementor = decrementExpectedAwaits.bind(null, null);
                            returnValue.then(decrementor, decrementor);
                        }
                        else if (typeof returnValue.next === 'function' && typeof returnValue.throw === 'function') {
                            // scopeFunc returned an iterator with throw-support. Handle yield as await.
                            returnValue = awaitIterator(returnValue);
                        }
                    }
                }, zoneProps);
                return (returnValue && typeof returnValue.then === 'function' ?
                    // Promise returned. User uses promise-style transactions.
                    Promise.resolve(returnValue).then(function (x) { return trans.active ?
                        x // Transaction still active. Continue.
                        : rejection(new exceptions.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn")); })
                    // No promise returned. Wait for all outstanding promises before continuing. 
                    : promiseFollowed.then(function () { return returnValue; })).then(function (x) {
                    // sub transactions don't react to idbtrans.oncomplete. We must trigger a completion:
                    if (parentTransaction)
                        trans._resolve();
                    // wait for trans._completion
                    // (if root transaction, this means 'complete' event. If sub-transaction, we've just fired it ourselves)
                    return trans._completion.then(function () { return x; });
                }).catch(function (e) {
                    trans._reject(e); // Yes, above then-handler were maybe not called because of an unhandled rejection in scopeFunc!
                    return rejection(e);
                });
            });
        }
    };
    this.table = function (tableName) {
        /// <returns type="Table"></returns>
        if (!hasOwn(allTables, tableName)) {
            throw new exceptions.InvalidTable("Table " + tableName + " does not exist");
        }
        return allTables[tableName];
    };
    //
    //
    //
    // Table Class
    //
    //
    //
    function Table(name, tableSchema, optionalTrans) {
        /// <param name="name" type="String"></param>
        this.name = name;
        this.schema = tableSchema;
        this._tx = optionalTrans;
        this.hook = allTables[name] ? allTables[name].hook : Events(null, {
            "creating": [hookCreatingChain, nop],
            "reading": [pureFunctionChain, mirror],
            "updating": [hookUpdatingChain, nop],
            "deleting": [hookDeletingChain, nop]
        });
    }
    function BulkErrorHandlerCatchAll(errorList, done, supportHooks) {
        return (supportHooks ? hookedEventRejectHandler : eventRejectHandler)(function (e) {
            errorList.push(e);
            done && done();
        });
    }
    function bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook) {
        // If hasDeleteHook, keysOrTuples must be an array of tuples: [[key1, value2],[key2,value2],...],
        // else keysOrTuples must be just an array of keys: [key1, key2, ...].
        return new Promise(function (resolve, reject) {
            var len = keysOrTuples.length, lastItem = len - 1;
            if (len === 0)
                return resolve();
            if (!hasDeleteHook) {
                for (var i = 0; i < len; ++i) {
                    var req = idbstore.delete(keysOrTuples[i]);
                    req.onerror = eventRejectHandler(reject);
                    if (i === lastItem)
                        req.onsuccess = wrap(function () { return resolve(); });
                }
            }
            else {
                var hookCtx, errorHandler = hookedEventRejectHandler(reject), successHandler = hookedEventSuccessHandler(null);
                tryCatch(function () {
                    for (var i = 0; i < len; ++i) {
                        hookCtx = { onsuccess: null, onerror: null };
                        var tuple = keysOrTuples[i];
                        deletingHook.call(hookCtx, tuple[0], tuple[1], trans);
                        var req = idbstore.delete(tuple[0]);
                        req._hookCtx = hookCtx;
                        req.onerror = errorHandler;
                        if (i === lastItem)
                            req.onsuccess = hookedEventSuccessHandler(resolve);
                        else
                            req.onsuccess = successHandler;
                    }
                }, function (err) {
                    hookCtx.onerror && hookCtx.onerror(err);
                    throw err;
                });
            }
        });
    }
    props(Table.prototype, {
        //
        // Table Protected Methods
        //
        _trans: function getTransaction(mode, fn, writeLocked) {
            var trans = this._tx || PSD.trans;
            return trans && trans.db === db ?
                trans === PSD.trans ?
                    trans._promise(mode, fn, writeLocked) :
                    newScope(function () { return trans._promise(mode, fn, writeLocked); }, { trans: trans, transless: PSD.transless || PSD }) :
                tempTransaction(mode, [this.name], fn);
        },
        _idbstore: function getIDBObjectStore(mode, fn, writeLocked) {
            var tableName = this.name;
            function supplyIdbStore(resolve, reject, trans) {
                if (trans.storeNames.indexOf(tableName) === -1)
                    throw new exceptions.NotFound("Table" + tableName + " not part of transaction");
                return fn(resolve, reject, trans.idbtrans.objectStore(tableName), trans);
            }
            return this._trans(mode, supplyIdbStore, writeLocked);
        },
        //
        // Table Public Methods
        //
        get: function (keyOrCrit, cb) {
            if (keyOrCrit && keyOrCrit.constructor === Object)
                return this.where(keyOrCrit).first(cb);
            var self = this;
            return this._idbstore(READONLY, function (resolve, reject, idbstore) {
                var req = idbstore.get(keyOrCrit);
                req.onerror = eventRejectHandler(reject);
                req.onsuccess = wrap(function () {
                    resolve(self.hook.reading.fire(req.result));
                }, reject);
            }).then(cb);
        },
        where: function (indexOrCrit) {
            if (typeof indexOrCrit === 'string')
                return new WhereClause(this, indexOrCrit);
            if (isArray(indexOrCrit))
                return new WhereClause(this, "[" + indexOrCrit.join('+') + "]");
            // indexOrCrit is an object map of {[keyPath]:value} 
            var keyPaths = keys(indexOrCrit);
            if (keyPaths.length === 1)
                // Only one critera. This was the easy case:
                return this
                    .where(keyPaths[0])
                    .equals(indexOrCrit[keyPaths[0]]);
            // Multiple criterias.
            // Let's try finding a compound index that matches all keyPaths in
            // arbritary order:
            var compoundIndex = this.schema.indexes.concat(this.schema.primKey).filter(function (ix) {
                return ix.compound &&
                    keyPaths.every(function (keyPath) { return ix.keyPath.indexOf(keyPath) >= 0; }) &&
                    ix.keyPath.every(function (keyPath) { return keyPaths.indexOf(keyPath) >= 0; });
            })[0];
            if (compoundIndex && maxKey !== maxString)
                // Cool! We found such compound index
                // and this browser supports compound indexes (maxKey !== maxString)!
                return this
                    .where(compoundIndex.name)
                    .equals(compoundIndex.keyPath.map(function (kp) { return indexOrCrit[kp]; }));
            if (!compoundIndex)
                console.warn("The query " + JSON.stringify(indexOrCrit) + " on " + this.name + " would benefit of a " +
                    ("compound index [" + keyPaths.join('+') + "]"));
            // Ok, now let's fallback to finding at least one matching index
            // and filter the rest.
            var idxByName = this.schema.idxByName;
            var simpleIndex = keyPaths.reduce(function (r, keyPath) { return [
                r[0] || idxByName[keyPath],
                r[0] || !idxByName[keyPath] ?
                    combine(r[1], function (x) { return '' + getByKeyPath(x, keyPath) ==
                        '' + indexOrCrit[keyPath]; })
                    : r[1]
            ]; }, [null, null]);
            var idx = simpleIndex[0];
            return idx ?
                this.where(idx.name).equals(indexOrCrit[idx.keyPath])
                    .filter(simpleIndex[1]) :
                compoundIndex ?
                    this.filter(simpleIndex[1]) : // Has compound but browser bad. Allow filter.
                    this.where(keyPaths).equals(''); // No index at all. Fail lazily.
        },
        count: function (cb) {
            return this.toCollection().count(cb);
        },
        offset: function (offset) {
            return this.toCollection().offset(offset);
        },
        limit: function (numRows) {
            return this.toCollection().limit(numRows);
        },
        reverse: function () {
            return this.toCollection().reverse();
        },
        filter: function (filterFunction) {
            return this.toCollection().and(filterFunction);
        },
        each: function (fn) {
            return this.toCollection().each(fn);
        },
        toArray: function (cb) {
            return this.toCollection().toArray(cb);
        },
        orderBy: function (index) {
            return new Collection(new WhereClause(this, isArray(index) ?
                "[" + index.join('+') + "]" :
                index));
        },
        toCollection: function () {
            return new Collection(new WhereClause(this));
        },
        mapToClass: function (constructor, structure) {
            /// <summary>
            ///     Map table to a javascript constructor function. Objects returned from the database will be instances of this class, making
            ///     it possible to the instanceOf operator as well as extending the class using constructor.prototype.method = function(){...}.
            /// </summary>
            /// <param name="constructor">Constructor function representing the class.</param>
            /// <param name="structure" optional="true">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
            /// know what type each member has. Example: {name: String, emailAddresses: [String], password}</param>
            this.schema.mappedClass = constructor;
            var instanceTemplate = Object.create(constructor.prototype);
            if (structure) {
                // structure and instanceTemplate is for IDE code competion only while constructor.prototype is for actual inheritance.
                applyStructure(instanceTemplate, structure);
            }
            this.schema.instanceTemplate = instanceTemplate;
            // Now, subscribe to the when("reading") event to make all objects that come out from this table inherit from given class
            // no matter which method to use for reading (Table.get() or Table.where(...)... )
            var readHook = function (obj) {
                if (!obj)
                    return obj; // No valid object. (Value is null). Return as is.
                // Create a new object that derives from constructor:
                var res = Object.create(constructor.prototype);
                // Clone members:
                for (var m in obj)
                    if (hasOwn(obj, m))
                        try {
                            res[m] = obj[m];
                        }
                        catch (_) { }
                return res;
            };
            if (this.schema.readHook) {
                this.hook.reading.unsubscribe(this.schema.readHook);
            }
            this.schema.readHook = readHook;
            this.hook("reading", readHook);
            return constructor;
        },
        defineClass: function (structure) {
            /// <summary>
            ///     Define all members of the class that represents the table. This will help code completion of when objects are read from the database
            ///     as well as making it possible to extend the prototype of the returned constructor function.
            /// </summary>
            /// <param name="structure">Helps IDE code completion by knowing the members that objects contain and not just the indexes. Also
            /// know what type each member has. Example: {name: String, emailAddresses: [String], properties: {shoeSize: Number}}</param>
            return this.mapToClass(Dexie.defineClass(structure), structure);
        },
        bulkDelete: function (keys$$1) {
            if (this.hook.deleting.fire === nop) {
                return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                    resolve(bulkDelete(idbstore, trans, keys$$1, false, nop));
                });
            }
            else {
                return this
                    .where(':id')
                    .anyOf(keys$$1)
                    .delete()
                    .then(function () { }); // Resolve with undefined.
            }
        },
        bulkPut: function (objects, keys$$1) {
            var _this = this;
            return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                if (!idbstore.keyPath && !_this.schema.primKey.auto && !keys$$1)
                    throw new exceptions.InvalidArgument("bulkPut() with non-inbound keys requires keys array in second argument");
                if (idbstore.keyPath && keys$$1)
                    throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
                if (keys$$1 && keys$$1.length !== objects.length)
                    throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
                if (objects.length === 0)
                    return resolve(); // Caller provided empty list.
                var done = function (result) {
                    if (errorList.length === 0)
                        resolve(result);
                    else
                        reject(new BulkError(_this.name + ".bulkPut(): " + errorList.length + " of " + numObjs + " operations failed", errorList));
                };
                var req, errorList = [], errorHandler, numObjs = objects.length, table = _this;
                if (_this.hook.creating.fire === nop && _this.hook.updating.fire === nop) {
                    //
                    // Standard Bulk (no 'creating' or 'updating' hooks to care about)
                    //
                    errorHandler = BulkErrorHandlerCatchAll(errorList);
                    for (var i = 0, l = objects.length; i < l; ++i) {
                        req = keys$$1 ? idbstore.put(objects[i], keys$$1[i]) : idbstore.put(objects[i]);
                        req.onerror = errorHandler;
                    }
                    // Only need to catch success or error on the last operation
                    // according to the IDB spec.
                    req.onerror = BulkErrorHandlerCatchAll(errorList, done);
                    req.onsuccess = eventSuccessHandler(done);
                }
                else {
                    var effectiveKeys = keys$$1 || idbstore.keyPath && objects.map(function (o) { return getByKeyPath(o, idbstore.keyPath); });
                    // Generate map of {[key]: object}
                    var objectLookup = effectiveKeys && arrayToObject(effectiveKeys, function (key, i) { return key != null && [key, objects[i]]; });
                    var promise = !effectiveKeys ?
                        // Auto-incremented key-less objects only without any keys argument.
                        table.bulkAdd(objects) :
                        // Keys provided. Either as inbound in provided objects, or as a keys argument.
                        // Begin with updating those that exists in DB:
                        table.where(':id').anyOf(effectiveKeys.filter(function (key) { return key != null; })).modify(function () {
                            this.value = objectLookup[this.primKey];
                            objectLookup[this.primKey] = null; // Mark as "don't add this"
                        }).catch(ModifyError, function (e) {
                            errorList = e.failures; // No need to concat here. These are the first errors added.
                        }).then(function () {
                            // Now, let's examine which items didnt exist so we can add them:
                            var objsToAdd = [], keysToAdd = keys$$1 && [];
                            // Iterate backwards. Why? Because if same key was used twice, just add the last one.
                            for (var i = effectiveKeys.length - 1; i >= 0; --i) {
                                var key = effectiveKeys[i];
                                if (key == null || objectLookup[key]) {
                                    objsToAdd.push(objects[i]);
                                    keys$$1 && keysToAdd.push(key);
                                    if (key != null)
                                        objectLookup[key] = null; // Mark as "dont add again"
                                }
                            }
                            // The items are in reverse order so reverse them before adding.
                            // Could be important in order to get auto-incremented keys the way the caller
                            // would expect. Could have used unshift instead of push()/reverse(),
                            // but: http://jsperf.com/unshift-vs-reverse
                            objsToAdd.reverse();
                            keys$$1 && keysToAdd.reverse();
                            return table.bulkAdd(objsToAdd, keysToAdd);
                        }).then(function (lastAddedKey) {
                            // Resolve with key of the last object in given arguments to bulkPut():
                            var lastEffectiveKey = effectiveKeys[effectiveKeys.length - 1]; // Key was provided.
                            return lastEffectiveKey != null ? lastEffectiveKey : lastAddedKey;
                        });
                    promise.then(done).catch(BulkError, function (e) {
                        // Concat failure from ModifyError and reject using our 'done' method.
                        errorList = errorList.concat(e.failures);
                        done();
                    }).catch(reject);
                }
            }, "locked"); // If called from transaction scope, lock transaction til all steps are done.
        },
        bulkAdd: function (objects, keys$$1) {
            var self = this, creatingHook = this.hook.creating.fire;
            return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                if (!idbstore.keyPath && !self.schema.primKey.auto && !keys$$1)
                    throw new exceptions.InvalidArgument("bulkAdd() with non-inbound keys requires keys array in second argument");
                if (idbstore.keyPath && keys$$1)
                    throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
                if (keys$$1 && keys$$1.length !== objects.length)
                    throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
                if (objects.length === 0)
                    return resolve(); // Caller provided empty list.
                function done(result) {
                    if (errorList.length === 0)
                        resolve(result);
                    else
                        reject(new BulkError(self.name + ".bulkAdd(): " + errorList.length + " of " + numObjs + " operations failed", errorList));
                }
                var req, errorList = [], errorHandler, successHandler, numObjs = objects.length;
                if (creatingHook !== nop) {
                    //
                    // There are subscribers to hook('creating')
                    // Must behave as documented.
                    //
                    var keyPath = idbstore.keyPath, hookCtx;
                    errorHandler = BulkErrorHandlerCatchAll(errorList, null, true);
                    successHandler = hookedEventSuccessHandler(null);
                    tryCatch(function () {
                        for (var i = 0, l = objects.length; i < l; ++i) {
                            hookCtx = { onerror: null, onsuccess: null };
                            var key = keys$$1 && keys$$1[i];
                            var obj = objects[i], effectiveKey = keys$$1 ? key : keyPath ? getByKeyPath(obj, keyPath) : undefined, keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans);
                            if (effectiveKey == null && keyToUse != null) {
                                if (keyPath) {
                                    obj = deepClone(obj);
                                    setByKeyPath(obj, keyPath, keyToUse);
                                }
                                else {
                                    key = keyToUse;
                                }
                            }
                            req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
                            req._hookCtx = hookCtx;
                            if (i < l - 1) {
                                req.onerror = errorHandler;
                                if (hookCtx.onsuccess)
                                    req.onsuccess = successHandler;
                            }
                        }
                    }, function (err) {
                        hookCtx.onerror && hookCtx.onerror(err);
                        throw err;
                    });
                    req.onerror = BulkErrorHandlerCatchAll(errorList, done, true);
                    req.onsuccess = hookedEventSuccessHandler(done);
                }
                else {
                    //
                    // Standard Bulk (no 'creating' hook to care about)
                    //
                    errorHandler = BulkErrorHandlerCatchAll(errorList);
                    for (var i = 0, l = objects.length; i < l; ++i) {
                        req = keys$$1 ? idbstore.add(objects[i], keys$$1[i]) : idbstore.add(objects[i]);
                        req.onerror = errorHandler;
                    }
                    // Only need to catch success or error on the last operation
                    // according to the IDB spec.
                    req.onerror = BulkErrorHandlerCatchAll(errorList, done);
                    req.onsuccess = eventSuccessHandler(done);
                }
            });
        },
        add: function (obj, key) {
            /// <summary>
            ///   Add an object to the database. In case an object with same primary key already exists, the object will not be added.
            /// </summary>
            /// <param name="obj" type="Object">A javascript object to insert</param>
            /// <param name="key" optional="true">Primary key</param>
            var creatingHook = this.hook.creating.fire;
            return this._idbstore(READWRITE, function (resolve, reject, idbstore, trans) {
                var hookCtx = { onsuccess: null, onerror: null };
                if (creatingHook !== nop) {
                    var effectiveKey = (key != null) ? key : (idbstore.keyPath ? getByKeyPath(obj, idbstore.keyPath) : undefined);
                    var keyToUse = creatingHook.call(hookCtx, effectiveKey, obj, trans); // Allow subscribers to when("creating") to generate the key.
                    if (effectiveKey == null && keyToUse != null) {
                        if (idbstore.keyPath)
                            setByKeyPath(obj, idbstore.keyPath, keyToUse);
                        else
                            key = keyToUse;
                    }
                }
                try {
                    var req = key != null ? idbstore.add(obj, key) : idbstore.add(obj);
                    req._hookCtx = hookCtx;
                    req.onerror = hookedEventRejectHandler(reject);
                    req.onsuccess = hookedEventSuccessHandler(function (result) {
                        // TODO: Remove these two lines in next major release (2.0?)
                        // It's no good practice to have side effects on provided parameters
                        var keyPath = idbstore.keyPath;
                        if (keyPath)
                            setByKeyPath(obj, keyPath, result);
                        resolve(result);
                    });
                }
                catch (e) {
                    if (hookCtx.onerror)
                        hookCtx.onerror(e);
                    throw e;
                }
            });
        },
        put: function (obj, key) {
            var _this = this;
            /// <summary>
            ///   Add an object to the database but in case an object with same primary key alread exists, the existing one will get updated.
            /// </summary>
            /// <param name="obj" type="Object">A javascript object to insert or update</param>
            /// <param name="key" optional="true">Primary key</param>
            var creatingHook = this.hook.creating.fire, updatingHook = this.hook.updating.fire;
            if (creatingHook !== nop || updatingHook !== nop) {
                //
                // People listens to when("creating") or when("updating") events!
                // We must know whether the put operation results in an CREATE or UPDATE.
                //
                var keyPath = this.schema.primKey.keyPath;
                var effectiveKey = (key !== undefined) ? key : (keyPath && getByKeyPath(obj, keyPath));
                if (effectiveKey == null)
                    return this.add(obj);
                // Since key is optional, make sure we get it from obj if not provided
                // Primary key exist. Lock transaction and try modifying existing. If nothing modified, call add().
                // clone obj before this async call. If caller modifies obj the line after put(), the IDB spec requires that it should not affect operation.
                obj = deepClone(obj);
                return this._trans(READWRITE, function () {
                    return _this.where(":id").equals(effectiveKey).modify(function () {
                        // Replace extisting value with our object
                        // CRUD event firing handled in Collection.modify()
                        this.value = obj;
                    }).then(function (count) { return count === 0 ? _this.add(obj, key) : effectiveKey; });
                }, "locked"); // Lock needed because operation is splitted into modify() and add().
            }
            else {
                // Use the standard IDB put() method.
                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                    var req = key !== undefined ? idbstore.put(obj, key) : idbstore.put(obj);
                    req.onerror = eventRejectHandler(reject);
                    req.onsuccess = wrap(function (ev) {
                        var keyPath = idbstore.keyPath;
                        if (keyPath)
                            setByKeyPath(obj, keyPath, ev.target.result);
                        resolve(req.result);
                    });
                });
            }
        },
        'delete': function (key) {
            /// <param name="key">Primary key of the object to delete</param>
            if (this.hook.deleting.subscribers.length) {
                // People listens to when("deleting") event. Must implement delete using Collection.delete() that will
                // call the CRUD event. Only Collection.delete() will know whether an object was actually deleted.
                return this.where(":id").equals(key).delete();
            }
            else {
                // No one listens. Use standard IDB delete() method.
                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                    var req = idbstore.delete(key);
                    req.onerror = eventRejectHandler(reject);
                    req.onsuccess = wrap(function () {
                        resolve(req.result);
                    });
                });
            }
        },
        clear: function () {
            if (this.hook.deleting.subscribers.length) {
                // People listens to when("deleting") event. Must implement delete using Collection.delete() that will
                // call the CRUD event. Only Collection.delete() will knows which objects that are actually deleted.
                return this.toCollection().delete();
            }
            else {
                return this._idbstore(READWRITE, function (resolve, reject, idbstore) {
                    var req = idbstore.clear();
                    req.onerror = eventRejectHandler(reject);
                    req.onsuccess = wrap(function () {
                        resolve(req.result);
                    });
                });
            }
        },
        update: function (keyOrObject, modifications) {
            if (typeof modifications !== 'object' || isArray(modifications))
                throw new exceptions.InvalidArgument("Modifications must be an object.");
            if (typeof keyOrObject === 'object' && !isArray(keyOrObject)) {
                // object to modify. Also modify given object with the modifications:
                keys(modifications).forEach(function (keyPath) {
                    setByKeyPath(keyOrObject, keyPath, modifications[keyPath]);
                });
                var key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
                if (key === undefined)
                    return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"));
                return this.where(":id").equals(key).modify(modifications);
            }
            else {
                // key to modify
                return this.where(":id").equals(keyOrObject).modify(modifications);
            }
        }
    });
    //
    //
    //
    // Transaction Class
    //
    //
    //
    function Transaction(mode, storeNames, dbschema, parent) {
        var _this = this;
        /// <summary>
        ///    Transaction class. Represents a database transaction. All operations on db goes through a Transaction.
        /// </summary>
        /// <param name="mode" type="String">Any of "readwrite" or "readonly"</param>
        /// <param name="storeNames" type="Array">Array of table names to operate on</param>
        this.db = db;
        this.mode = mode;
        this.storeNames = storeNames;
        this.idbtrans = null;
        this.on = Events(this, "complete", "error", "abort");
        this.parent = parent || null;
        this.active = true;
        this._reculock = 0;
        this._blockedFuncs = [];
        this._resolve = null;
        this._reject = null;
        this._waitingFor = null;
        this._waitingQueue = null;
        this._spinCount = 0; // Just for debugging waitFor()
        this._completion = new Promise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });
        this._completion.then(function () {
            _this.active = false;
            _this.on.complete.fire();
        }, function (e) {
            var wasActive = _this.active;
            _this.active = false;
            _this.on.error.fire(e);
            _this.parent ?
                _this.parent._reject(e) :
                wasActive && _this.idbtrans && _this.idbtrans.abort();
            return rejection(e); // Indicate we actually DO NOT catch this error.
        });
    }
    props(Transaction.prototype, {
        //
        // Transaction Protected Methods (not required by API users, but needed internally and eventually by dexie extensions)
        //
        _lock: function () {
            assert(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.
            // Temporary set all requests into a pending queue if they are called before database is ready.
            ++this._reculock; // Recursive read/write lock pattern using PSD (Promise Specific Data) instead of TLS (Thread Local Storage)
            if (this._reculock === 1 && !PSD.global)
                PSD.lockOwnerFor = this;
            return this;
        },
        _unlock: function () {
            assert(!PSD.global); // Locking and unlocking reuires to be within a PSD scope.
            if (--this._reculock === 0) {
                if (!PSD.global)
                    PSD.lockOwnerFor = null;
                while (this._blockedFuncs.length > 0 && !this._locked()) {
                    var fnAndPSD = this._blockedFuncs.shift();
                    try {
                        usePSD(fnAndPSD[1], fnAndPSD[0]);
                    }
                    catch (e) { }
                }
            }
            return this;
        },
        _locked: function () {
            // Checks if any write-lock is applied on this transaction.
            // To simplify the Dexie API for extension implementations, we support recursive locks.
            // This is accomplished by using "Promise Specific Data" (PSD).
            // PSD data is bound to a Promise and any child Promise emitted through then() or resolve( new Promise() ).
            // PSD is local to code executing on top of the call stacks of any of any code executed by Promise():
            //         * callback given to the Promise() constructor  (function (resolve, reject){...})
            //         * callbacks given to then()/catch()/finally() methods (function (value){...})
            // If creating a new independant Promise instance from within a Promise call stack, the new Promise will derive the PSD from the call stack of the parent Promise.
            // Derivation is done so that the inner PSD __proto__ points to the outer PSD.
            // PSD.lockOwnerFor will point to current transaction object if the currently executing PSD scope owns the lock.
            return this._reculock && PSD.lockOwnerFor !== this;
        },
        create: function (idbtrans) {
            var _this = this;
            if (!this.mode)
                return this;
            assert(!this.idbtrans);
            if (!idbtrans && !idbdb) {
                switch (dbOpenError && dbOpenError.name) {
                    case "DatabaseClosedError":
                        // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
                        throw new exceptions.DatabaseClosed(dbOpenError);
                    case "MissingAPIError":
                        // Errors where it is no difference whether it was caused by the user operation or an earlier call to db.open()
                        throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
                    default:
                        // Make it clear that the user operation was not what caused the error - the error had occurred earlier on db.open()!
                        throw new exceptions.OpenFailed(dbOpenError);
                }
            }
            if (!this.active)
                throw new exceptions.TransactionInactive();
            assert(this._completion._state === null);
            idbtrans = this.idbtrans = idbtrans || idbdb.transaction(safariMultiStoreFix(this.storeNames), this.mode);
            idbtrans.onerror = wrap(function (ev) {
                preventDefault(ev); // Prohibit default bubbling to window.error
                _this._reject(idbtrans.error);
            });
            idbtrans.onabort = wrap(function (ev) {
                preventDefault(ev);
                _this.active && _this._reject(new exceptions.Abort(idbtrans.error));
                _this.active = false;
                _this.on("abort").fire(ev);
            });
            idbtrans.oncomplete = wrap(function () {
                _this.active = false;
                _this._resolve();
            });
            return this;
        },
        _promise: function (mode, fn, bWriteLock) {
            var _this = this;
            if (mode === READWRITE && this.mode !== READWRITE)
                return rejection(new exceptions.ReadOnly("Transaction is readonly"));
            if (!this.active)
                return rejection(new exceptions.TransactionInactive());
            if (this._locked()) {
                return new Promise(function (resolve, reject) {
                    _this._blockedFuncs.push([function () {
                            _this._promise(mode, fn, bWriteLock).then(resolve, reject);
                        }, PSD]);
                });
            }
            else if (bWriteLock) {
                return newScope(function () {
                    var p = new Promise(function (resolve, reject) {
                        _this._lock();
                        var rv = fn(resolve, reject, _this);
                        if (rv && rv.then)
                            rv.then(resolve, reject);
                    });
                    p.finally(function () { return _this._unlock(); });
                    p._lib = true;
                    return p;
                });
            }
            else {
                var p = new Promise(function (resolve, reject) {
                    var rv = fn(resolve, reject, _this);
                    if (rv && rv.then)
                        rv.then(resolve, reject);
                });
                p._lib = true;
                return p;
            }
        },
        _root: function () {
            return this.parent ? this.parent._root() : this;
        },
        waitFor: function (promise) {
            // Always operate on the root transaction (in case this is a sub stransaction)
            var root = this._root();
            // For stability reasons, convert parameter to promise no matter what type is passed to waitFor().
            // (We must be able to call .then() on it.)
            promise = Promise.resolve(promise);
            if (root._waitingFor) {
                // Already called waitFor(). Wait for both to complete.
                root._waitingFor = root._waitingFor.then(function () { return promise; });
            }
            else {
                // We're not in waiting state. Start waiting state.
                root._waitingFor = promise;
                root._waitingQueue = [];
                // Start interacting with indexedDB until promise completes:
                var store = root.idbtrans.objectStore(root.storeNames[0]);
                (function spin() {
                    ++root._spinCount; // For debugging only
                    while (root._waitingQueue.length)
                        (root._waitingQueue.shift())();
                    if (root._waitingFor)
                        store.get(-Infinity).onsuccess = spin;
                }());
            }
            var currentWaitPromise = root._waitingFor;
            return new Promise(function (resolve, reject) {
                promise.then(function (res) { return root._waitingQueue.push(wrap(resolve.bind(null, res))); }, function (err) { return root._waitingQueue.push(wrap(reject.bind(null, err))); }).finally(function () {
                    if (root._waitingFor === currentWaitPromise) {
                        // No one added a wait after us. Safe to stop the spinning.
                        root._waitingFor = null;
                    }
                });
            });
        },
        //
        // Transaction Public Properties and Methods
        //
        abort: function () {
            this.active && this._reject(new exceptions.Abort());
            this.active = false;
        },
        tables: {
            get: deprecated("Transaction.tables", function () { return allTables; })
        },
        table: function (name) {
            var table = db.table(name); // Don't check that table is part of transaction. It must fail lazily!
            return new Table(name, table.schema, this);
        }
    });
    //
    //
    //
    // WhereClause
    //
    //
    //
    function WhereClause(table, index, orCollection) {
        /// <param name="table" type="Table"></param>
        /// <param name="index" type="String" optional="true"></param>
        /// <param name="orCollection" type="Collection" optional="true"></param>
        this._ctx = {
            table: table,
            index: index === ":id" ? null : index,
            or: orCollection
        };
    }
    props(WhereClause.prototype, function () {
        // WhereClause private methods
        function fail(collectionOrWhereClause, err, T) {
            var collection = collectionOrWhereClause instanceof WhereClause ?
                new Collection(collectionOrWhereClause) :
                collectionOrWhereClause;
            collection._ctx.error = T ? new T(err) : new TypeError(err);
            return collection;
        }
        function emptyCollection(whereClause) {
            return new Collection(whereClause, function () { return IDBKeyRange.only(""); }).limit(0);
        }
        function upperFactory(dir) {
            return dir === "next" ? function (s) { return s.toUpperCase(); } : function (s) { return s.toLowerCase(); };
        }
        function lowerFactory(dir) {
            return dir === "next" ? function (s) { return s.toLowerCase(); } : function (s) { return s.toUpperCase(); };
        }
        function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp, dir) {
            var length = Math.min(key.length, lowerNeedle.length);
            var llp = -1;
            for (var i = 0; i < length; ++i) {
                var lwrKeyChar = lowerKey[i];
                if (lwrKeyChar !== lowerNeedle[i]) {
                    if (cmp(key[i], upperNeedle[i]) < 0)
                        return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
                    if (cmp(key[i], lowerNeedle[i]) < 0)
                        return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
                    if (llp >= 0)
                        return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
                    return null;
                }
                if (cmp(key[i], lwrKeyChar) < 0)
                    llp = i;
            }
            if (length < lowerNeedle.length && dir === "next")
                return key + upperNeedle.substr(key.length);
            if (length < key.length && dir === "prev")
                return key.substr(0, upperNeedle.length);
            return (llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1));
        }
        function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
            /// <param name="needles" type="Array" elementType="String"></param>
            var upper, lower, compare, upperNeedles, lowerNeedles, direction, nextKeySuffix, needlesLen = needles.length;
            if (!needles.every(function (s) { return typeof s === 'string'; })) {
                return fail(whereClause, STRING_EXPECTED);
            }
            function initDirection(dir) {
                upper = upperFactory(dir);
                lower = lowerFactory(dir);
                compare = (dir === "next" ? simpleCompare : simpleCompareReverse);
                var needleBounds = needles.map(function (needle) {
                    return { lower: lower(needle), upper: upper(needle) };
                }).sort(function (a, b) {
                    return compare(a.lower, b.lower);
                });
                upperNeedles = needleBounds.map(function (nb) { return nb.upper; });
                lowerNeedles = needleBounds.map(function (nb) { return nb.lower; });
                direction = dir;
                nextKeySuffix = (dir === "next" ? "" : suffix);
            }
            initDirection("next");
            var c = new Collection(whereClause, function () {
                return IDBKeyRange.bound(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix);
            });
            c._ondirectionchange = function (direction) {
                // This event onlys occur before filter is called the first time.
                initDirection(direction);
            };
            var firstPossibleNeedle = 0;
            c._addAlgorithm(function (cursor, advance, resolve) {
                /// <param name="cursor" type="IDBCursor"></param>
                /// <param name="advance" type="Function"></param>
                /// <param name="resolve" type="Function"></param>
                var key = cursor.key;
                if (typeof key !== 'string')
                    return false;
                var lowerKey = lower(key);
                if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
                    return true;
                }
                else {
                    var lowestPossibleCasing = null;
                    for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
                        var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
                        if (casing === null && lowestPossibleCasing === null)
                            firstPossibleNeedle = i + 1;
                        else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
                            lowestPossibleCasing = casing;
                        }
                    }
                    if (lowestPossibleCasing !== null) {
                        advance(function () { cursor.continue(lowestPossibleCasing + nextKeySuffix); });
                    }
                    else {
                        advance(resolve);
                    }
                    return false;
                }
            });
            return c;
        }
        //
        // WhereClause public methods
        //
        return {
            between: function (lower, upper, includeLower, includeUpper) {
                /// <summary>
                ///     Filter out records whose where-field lays between given lower and upper values. Applies to Strings, Numbers and Dates.
                /// </summary>
                /// <param name="lower"></param>
                /// <param name="upper"></param>
                /// <param name="includeLower" optional="true">Whether items that equals lower should be included. Default true.</param>
                /// <param name="includeUpper" optional="true">Whether items that equals upper should be included. Default false.</param>
                /// <returns type="Collection"></returns>
                includeLower = includeLower !== false; // Default to true
                includeUpper = includeUpper === true; // Default to false
                try {
                    if ((cmp(lower, upper) > 0) ||
                        (cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper)))
                        return emptyCollection(this); // Workaround for idiotic W3C Specification that DataError must be thrown if lower > upper. The natural result would be to return an empty collection.
                    return new Collection(this, function () { return IDBKeyRange.bound(lower, upper, !includeLower, !includeUpper); });
                }
                catch (e) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
            },
            equals: function (value) {
                return new Collection(this, function () { return IDBKeyRange.only(value); });
            },
            above: function (value) {
                return new Collection(this, function () { return IDBKeyRange.lowerBound(value, true); });
            },
            aboveOrEqual: function (value) {
                return new Collection(this, function () { return IDBKeyRange.lowerBound(value); });
            },
            below: function (value) {
                return new Collection(this, function () { return IDBKeyRange.upperBound(value, true); });
            },
            belowOrEqual: function (value) {
                return new Collection(this, function () { return IDBKeyRange.upperBound(value); });
            },
            startsWith: function (str) {
                /// <param name="str" type="String"></param>
                if (typeof str !== 'string')
                    return fail(this, STRING_EXPECTED);
                return this.between(str, str + maxString, true, true);
            },
            startsWithIgnoreCase: function (str) {
                /// <param name="str" type="String"></param>
                if (str === "")
                    return this.startsWith(str);
                return addIgnoreCaseAlgorithm(this, function (x, a) { return x.indexOf(a[0]) === 0; }, [str], maxString);
            },
            equalsIgnoreCase: function (str) {
                /// <param name="str" type="String"></param>
                return addIgnoreCaseAlgorithm(this, function (x, a) { return x === a[0]; }, [str], "");
            },
            anyOfIgnoreCase: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (set.length === 0)
                    return emptyCollection(this);
                return addIgnoreCaseAlgorithm(this, function (x, a) { return a.indexOf(x) !== -1; }, set, "");
            },
            startsWithAnyOfIgnoreCase: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (set.length === 0)
                    return emptyCollection(this);
                return addIgnoreCaseAlgorithm(this, function (x, a) {
                    return a.some(function (n) {
                        return x.indexOf(n) === 0;
                    });
                }, set, maxString);
            },
            anyOf: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                var compare = ascending;
                try {
                    set.sort(compare);
                }
                catch (e) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
                if (set.length === 0)
                    return emptyCollection(this);
                var c = new Collection(this, function () { return IDBKeyRange.bound(set[0], set[set.length - 1]); });
                c._ondirectionchange = function (direction) {
                    compare = (direction === "next" ? ascending : descending);
                    set.sort(compare);
                };
                var i = 0;
                c._addAlgorithm(function (cursor, advance, resolve) {
                    var key = cursor.key;
                    while (compare(key, set[i]) > 0) {
                        // The cursor has passed beyond this key. Check next.
                        ++i;
                        if (i === set.length) {
                            // There is no next. Stop searching.
                            advance(resolve);
                            return false;
                        }
                    }
                    if (compare(key, set[i]) === 0) {
                        // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
                        return true;
                    }
                    else {
                        // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
                        advance(function () { cursor.continue(set[i]); });
                        return false;
                    }
                });
                return c;
            },
            notEqual: function (value) {
                return this.inAnyRange([[minKey, value], [value, maxKey]], { includeLowers: false, includeUppers: false });
            },
            noneOf: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (set.length === 0)
                    return new Collection(this); // Return entire collection.
                try {
                    set.sort(ascending);
                }
                catch (e) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
                // Transform ["a","b","c"] to a set of ranges for between/above/below: [[minKey,"a"], ["a","b"], ["b","c"], ["c",maxKey]]
                var ranges = set.reduce(function (res, val) { return res ? res.concat([[res[res.length - 1][1], val]]) : [[minKey, val]]; }, null);
                ranges.push([set[set.length - 1], maxKey]);
                return this.inAnyRange(ranges, { includeLowers: false, includeUppers: false });
            },
            /** Filter out values withing given set of ranges.
            * Example, give children and elders a rebate of 50%:
            *
            *   db.friends.where('age').inAnyRange([[0,18],[65,Infinity]]).modify({Rebate: 1/2});
            *
            * @param {(string|number|Date|Array)[][]} ranges
            * @param {{includeLowers: boolean, includeUppers: boolean}} options
            */
            inAnyRange: function (ranges, options) {
                if (ranges.length === 0)
                    return emptyCollection(this);
                if (!ranges.every(function (range) { return range[0] !== undefined && range[1] !== undefined && ascending(range[0], range[1]) <= 0; })) {
                    return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
                }
                var includeLowers = !options || options.includeLowers !== false; // Default to true
                var includeUppers = options && options.includeUppers === true; // Default to false
                function addRange(ranges, newRange) {
                    for (var i = 0, l = ranges.length; i < l; ++i) {
                        var range = ranges[i];
                        if (cmp(newRange[0], range[1]) < 0 && cmp(newRange[1], range[0]) > 0) {
                            range[0] = min(range[0], newRange[0]);
                            range[1] = max(range[1], newRange[1]);
                            break;
                        }
                    }
                    if (i === l)
                        ranges.push(newRange);
                    return ranges;
                }
                var sortDirection = ascending;
                function rangeSorter(a, b) { return sortDirection(a[0], b[0]); }
                // Join overlapping ranges
                var set;
                try {
                    set = ranges.reduce(addRange, []);
                    set.sort(rangeSorter);
                }
                catch (ex) {
                    return fail(this, INVALID_KEY_ARGUMENT);
                }
                var i = 0;
                var keyIsBeyondCurrentEntry = includeUppers ?
                    function (key) { return ascending(key, set[i][1]) > 0; } :
                    function (key) { return ascending(key, set[i][1]) >= 0; };
                var keyIsBeforeCurrentEntry = includeLowers ?
                    function (key) { return descending(key, set[i][0]) > 0; } :
                    function (key) { return descending(key, set[i][0]) >= 0; };
                function keyWithinCurrentRange(key) {
                    return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
                }
                var checkKey = keyIsBeyondCurrentEntry;
                var c = new Collection(this, function () {
                    return IDBKeyRange.bound(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers);
                });
                c._ondirectionchange = function (direction) {
                    if (direction === "next") {
                        checkKey = keyIsBeyondCurrentEntry;
                        sortDirection = ascending;
                    }
                    else {
                        checkKey = keyIsBeforeCurrentEntry;
                        sortDirection = descending;
                    }
                    set.sort(rangeSorter);
                };
                c._addAlgorithm(function (cursor, advance, resolve) {
                    var key = cursor.key;
                    while (checkKey(key)) {
                        // The cursor has passed beyond this key. Check next.
                        ++i;
                        if (i === set.length) {
                            // There is no next. Stop searching.
                            advance(resolve);
                            return false;
                        }
                    }
                    if (keyWithinCurrentRange(key)) {
                        // The current cursor value should be included and we should continue a single step in case next item has the same key or possibly our next key in set.
                        return true;
                    }
                    else if (cmp(key, set[i][1]) === 0 || cmp(key, set[i][0]) === 0) {
                        // includeUpper or includeLower is false so keyWithinCurrentRange() returns false even though we are at range border.
                        // Continue to next key but don't include this one.
                        return false;
                    }
                    else {
                        // cursor.key not yet at set[i]. Forward cursor to the next key to hunt for.
                        advance(function () {
                            if (sortDirection === ascending)
                                cursor.continue(set[i][0]);
                            else
                                cursor.continue(set[i][1]);
                        });
                        return false;
                    }
                });
                return c;
            },
            startsWithAnyOf: function () {
                var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
                if (!set.every(function (s) { return typeof s === 'string'; })) {
                    return fail(this, "startsWithAnyOf() only works with strings");
                }
                if (set.length === 0)
                    return emptyCollection(this);
                return this.inAnyRange(set.map(function (str) {
                    return [str, str + maxString];
                }));
            }
        };
    });
    //
    //
    //
    // Collection Class
    //
    //
    //
    function Collection(whereClause, keyRangeGenerator) {
        /// <summary>
        ///
        /// </summary>
        /// <param name="whereClause" type="WhereClause">Where clause instance</param>
        /// <param name="keyRangeGenerator" value="function(){ return IDBKeyRange.bound(0,1);}" optional="true"></param>
        var keyRange = null, error = null;
        if (keyRangeGenerator)
            try {
                keyRange = keyRangeGenerator();
            }
            catch (ex) {
                error = ex;
            }
        var whereCtx = whereClause._ctx, table = whereCtx.table;
        this._ctx = {
            table: table,
            index: whereCtx.index,
            isPrimKey: (!whereCtx.index || (table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name)),
            range: keyRange,
            keysOnly: false,
            dir: "next",
            unique: "",
            algorithm: null,
            filter: null,
            replayFilter: null,
            justLimit: true,
            isMatch: null,
            offset: 0,
            limit: Infinity,
            error: error,
            or: whereCtx.or,
            valueMapper: table.hook.reading.fire
        };
    }
    function isPlainKeyRange(ctx, ignoreLimitFilter) {
        return !(ctx.filter || ctx.algorithm || ctx.or) &&
            (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
    }
    props(Collection.prototype, function () {
        //
        // Collection Private Functions
        //
        function addFilter(ctx, fn) {
            ctx.filter = combine(ctx.filter, fn);
        }
        function addReplayFilter(ctx, factory, isLimitFilter) {
            var curr = ctx.replayFilter;
            ctx.replayFilter = curr ? function () { return combine(curr(), factory()); } : factory;
            ctx.justLimit = isLimitFilter && !curr;
        }
        function addMatchFilter(ctx, fn) {
            ctx.isMatch = combine(ctx.isMatch, fn);
        }
        /** @param ctx {
         *      isPrimKey: boolean,
         *      table: Table,
         *      index: string
         * }
         * @param store IDBObjectStore
         **/
        function getIndexOrStore(ctx, store) {
            if (ctx.isPrimKey)
                return store;
            var indexSpec = ctx.table.schema.idxByName[ctx.index];
            if (!indexSpec)
                throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + store.name + " is not indexed");
            return store.index(indexSpec.name);
        }
        /** @param ctx {
         *      isPrimKey: boolean,
         *      table: Table,
         *      index: string,
         *      keysOnly: boolean,
         *      range?: IDBKeyRange,
         *      dir: "next" | "prev"
         * }
         */
        function openCursor(ctx, store) {
            var idxOrStore = getIndexOrStore(ctx, store);
            return ctx.keysOnly && 'openKeyCursor' in idxOrStore ?
                idxOrStore.openKeyCursor(ctx.range || null, ctx.dir + ctx.unique) :
                idxOrStore.openCursor(ctx.range || null, ctx.dir + ctx.unique);
        }
        function iter(ctx, fn, resolve, reject, idbstore) {
            var filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
            if (!ctx.or) {
                iterate(openCursor(ctx, idbstore), combine(ctx.algorithm, filter), fn, resolve, reject, !ctx.keysOnly && ctx.valueMapper);
            }
            else
                (function () {
                    var set = {};
                    var resolved = 0;
                    function resolveboth() {
                        if (++resolved === 2)
                            resolve(); // Seems like we just support or btwn max 2 expressions, but there are no limit because we do recursion.
                    }
                    function union(item, cursor, advance) {
                        if (!filter || filter(cursor, advance, resolveboth, reject)) {
                            var primaryKey = cursor.primaryKey;
                            var key = '' + primaryKey;
                            if (key === '[object ArrayBuffer]')
                                key = '' + new Uint8Array(primaryKey);
                            if (!hasOwn(set, key)) {
                                set[key] = true;
                                fn(item, cursor, advance);
                            }
                        }
                    }
                    ctx.or._iterate(union, resolveboth, reject, idbstore);
                    iterate(openCursor(ctx, idbstore), ctx.algorithm, union, resolveboth, reject, !ctx.keysOnly && ctx.valueMapper);
                })();
        }
        return {
            //
            // Collection Protected Functions
            //
            _read: function (fn, cb) {
                var ctx = this._ctx;
                return ctx.error ?
                    ctx.table._trans(null, rejection.bind(null, ctx.error)) :
                    ctx.table._idbstore(READONLY, fn).then(cb);
            },
            _write: function (fn) {
                var ctx = this._ctx;
                return ctx.error ?
                    ctx.table._trans(null, rejection.bind(null, ctx.error)) :
                    ctx.table._idbstore(READWRITE, fn, "locked"); // When doing write operations on collections, always lock the operation so that upcoming operations gets queued.
            },
            _addAlgorithm: function (fn) {
                var ctx = this._ctx;
                ctx.algorithm = combine(ctx.algorithm, fn);
            },
            _iterate: function (fn, resolve, reject, idbstore) {
                return iter(this._ctx, fn, resolve, reject, idbstore);
            },
            clone: function (props$$1) {
                var rv = Object.create(this.constructor.prototype), ctx = Object.create(this._ctx);
                if (props$$1)
                    extend(ctx, props$$1);
                rv._ctx = ctx;
                return rv;
            },
            raw: function () {
                this._ctx.valueMapper = null;
                return this;
            },
            //
            // Collection Public methods
            //
            each: function (fn) {
                var ctx = this._ctx;
                return this._read(function (resolve, reject, idbstore) {
                    iter(ctx, fn, resolve, reject, idbstore);
                });
            },
            count: function (cb) {
                var ctx = this._ctx;
                if (isPlainKeyRange(ctx, true)) {
                    // This is a plain key range. We can use the count() method if the index.
                    return this._read(function (resolve, reject, idbstore) {
                        var idx = getIndexOrStore(ctx, idbstore);
                        var req = (ctx.range ? idx.count(ctx.range) : idx.count());
                        req.onerror = eventRejectHandler(reject);
                        req.onsuccess = function (e) {
                            resolve(Math.min(e.target.result, ctx.limit));
                        };
                    }, cb);
                }
                else {
                    // Algorithms, filters or expressions are applied. Need to count manually.
                    var count = 0;
                    return this._read(function (resolve, reject, idbstore) {
                        iter(ctx, function () { ++count; return false; }, function () { resolve(count); }, reject, idbstore);
                    }, cb);
                }
            },
            sortBy: function (keyPath, cb) {
                /// <param name="keyPath" type="String"></param>
                var parts = keyPath.split('.').reverse(), lastPart = parts[0], lastIndex = parts.length - 1;
                function getval(obj, i) {
                    if (i)
                        return getval(obj[parts[i]], i - 1);
                    return obj[lastPart];
                }
                var order = this._ctx.dir === "next" ? 1 : -1;
                function sorter(a, b) {
                    var aVal = getval(a, lastIndex), bVal = getval(b, lastIndex);
                    return aVal < bVal ? -order : aVal > bVal ? order : 0;
                }
                return this.toArray(function (a) {
                    return a.sort(sorter);
                }).then(cb);
            },
            toArray: function (cb) {
                var ctx = this._ctx;
                return this._read(function (resolve, reject, idbstore) {
                    if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
                        // Special optimation if we could use IDBObjectStore.getAll() or
                        // IDBKeyRange.getAll():
                        var readingHook = ctx.table.hook.reading.fire;
                        var idxOrStore = getIndexOrStore(ctx, idbstore);
                        var req = ctx.limit < Infinity ?
                            idxOrStore.getAll(ctx.range, ctx.limit) :
                            idxOrStore.getAll(ctx.range);
                        req.onerror = eventRejectHandler(reject);
                        req.onsuccess = readingHook === mirror ?
                            eventSuccessHandler(resolve) :
                            eventSuccessHandler(function (res) {
                                try {
                                    resolve(res.map(readingHook));
                                }
                                catch (e) {
                                    reject(e);
                                }
                            });
                    }
                    else {
                        // Getting array through a cursor.
                        var a = [];
                        iter(ctx, function (item) { a.push(item); }, function arrayComplete() {
                            resolve(a);
                        }, reject, idbstore);
                    }
                }, cb);
            },
            offset: function (offset) {
                var ctx = this._ctx;
                if (offset <= 0)
                    return this;
                ctx.offset += offset; // For count()
                if (isPlainKeyRange(ctx)) {
                    addReplayFilter(ctx, function () {
                        var offsetLeft = offset;
                        return function (cursor, advance) {
                            if (offsetLeft === 0)
                                return true;
                            if (offsetLeft === 1) {
                                --offsetLeft;
                                return false;
                            }
                            advance(function () {
                                cursor.advance(offsetLeft);
                                offsetLeft = 0;
                            });
                            return false;
                        };
                    });
                }
                else {
                    addReplayFilter(ctx, function () {
                        var offsetLeft = offset;
                        return function () { return (--offsetLeft < 0); };
                    });
                }
                return this;
            },
            limit: function (numRows) {
                this._ctx.limit = Math.min(this._ctx.limit, numRows); // For count()
                addReplayFilter(this._ctx, function () {
                    var rowsLeft = numRows;
                    return function (cursor, advance, resolve) {
                        if (--rowsLeft <= 0)
                            advance(resolve); // Stop after this item has been included
                        return rowsLeft >= 0; // If numRows is already below 0, return false because then 0 was passed to numRows initially. Otherwise we wouldnt come here.
                    };
                }, true);
                return this;
            },
            until: function (filterFunction, bIncludeStopEntry) {
                addFilter(this._ctx, function (cursor, advance, resolve) {
                    if (filterFunction(cursor.value)) {
                        advance(resolve);
                        return bIncludeStopEntry;
                    }
                    else {
                        return true;
                    }
                });
                return this;
            },
            first: function (cb) {
                return this.limit(1).toArray(function (a) { return a[0]; }).then(cb);
            },
            last: function (cb) {
                return this.reverse().first(cb);
            },
            filter: function (filterFunction) {
                /// <param name="jsFunctionFilter" type="Function">function(val){return true/false}</param>
                addFilter(this._ctx, function (cursor) {
                    return filterFunction(cursor.value);
                });
                // match filters not used in Dexie.js but can be used by 3rd part libraries to test a
                // collection for a match without querying DB. Used by Dexie.Observable.
                addMatchFilter(this._ctx, filterFunction);
                return this;
            },
            and: function (filterFunction) {
                return this.filter(filterFunction);
            },
            or: function (indexName) {
                return new WhereClause(this._ctx.table, indexName, this);
            },
            reverse: function () {
                this._ctx.dir = (this._ctx.dir === "prev" ? "next" : "prev");
                if (this._ondirectionchange)
                    this._ondirectionchange(this._ctx.dir);
                return this;
            },
            desc: function () {
                return this.reverse();
            },
            eachKey: function (cb) {
                var ctx = this._ctx;
                ctx.keysOnly = !ctx.isMatch;
                return this.each(function (val, cursor) { cb(cursor.key, cursor); });
            },
            eachUniqueKey: function (cb) {
                this._ctx.unique = "unique";
                return this.eachKey(cb);
            },
            eachPrimaryKey: function (cb) {
                var ctx = this._ctx;
                ctx.keysOnly = !ctx.isMatch;
                return this.each(function (val, cursor) { cb(cursor.primaryKey, cursor); });
            },
            keys: function (cb) {
                var ctx = this._ctx;
                ctx.keysOnly = !ctx.isMatch;
                var a = [];
                return this.each(function (item, cursor) {
                    a.push(cursor.key);
                }).then(function () {
                    return a;
                }).then(cb);
            },
            primaryKeys: function (cb) {
                var ctx = this._ctx;
                if (hasGetAll && ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
                    // Special optimation if we could use IDBObjectStore.getAllKeys() or
                    // IDBKeyRange.getAllKeys():
                    return this._read(function (resolve, reject, idbstore) {
                        var idxOrStore = getIndexOrStore(ctx, idbstore);
                        var req = ctx.limit < Infinity ?
                            idxOrStore.getAllKeys(ctx.range, ctx.limit) :
                            idxOrStore.getAllKeys(ctx.range);
                        req.onerror = eventRejectHandler(reject);
                        req.onsuccess = eventSuccessHandler(resolve);
                    }).then(cb);
                }
                ctx.keysOnly = !ctx.isMatch;
                var a = [];
                return this.each(function (item, cursor) {
                    a.push(cursor.primaryKey);
                }).then(function () {
                    return a;
                }).then(cb);
            },
            uniqueKeys: function (cb) {
                this._ctx.unique = "unique";
                return this.keys(cb);
            },
            firstKey: function (cb) {
                return this.limit(1).keys(function (a) { return a[0]; }).then(cb);
            },
            lastKey: function (cb) {
                return this.reverse().firstKey(cb);
            },
            distinct: function () {
                var ctx = this._ctx, idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
                if (!idx || !idx.multi)
                    return this; // distinct() only makes differencies on multiEntry indexes.
                var set = {};
                addFilter(this._ctx, function (cursor) {
                    var strKey = cursor.primaryKey.toString(); // Converts any Date to String, String to String, Number to String and Array to comma-separated string
                    var found = hasOwn(set, strKey);
                    set[strKey] = true;
                    return !found;
                });
                return this;
            },
            //
            // Methods that mutate storage
            //
            modify: function (changes) {
                var self = this, ctx = this._ctx, hook = ctx.table.hook, updatingHook = hook.updating.fire, deletingHook = hook.deleting.fire;
                return this._write(function (resolve, reject, idbstore, trans) {
                    var modifyer;
                    if (typeof changes === 'function') {
                        // Changes is a function that may update, add or delete propterties or even require a deletion the object itself (delete this.item)
                        if (updatingHook === nop && deletingHook === nop) {
                            // Noone cares about what is being changed. Just let the modifier function be the given argument as is.
                            modifyer = changes;
                        }
                        else {
                            // People want to know exactly what is being modified or deleted.
                            // Let modifyer be a proxy function that finds out what changes the caller is actually doing
                            // and call the hooks accordingly!
                            modifyer = function (item) {
                                var origItem = deepClone(item); // Clone the item first so we can compare laters.
                                if (changes.call(this, item, this) === false)
                                    return false; // Call the real modifyer function (If it returns false explicitely, it means it dont want to modify anyting on this object)
                                if (!hasOwn(this, "value")) {
                                    // The real modifyer function requests a deletion of the object. Inform the deletingHook that a deletion is taking place.
                                    deletingHook.call(this, this.primKey, item, trans);
                                }
                                else {
                                    // No deletion. Check what was changed
                                    var objectDiff = getObjectDiff(origItem, this.value);
                                    var additionalChanges = updatingHook.call(this, objectDiff, this.primKey, origItem, trans);
                                    if (additionalChanges) {
                                        // Hook want to apply additional modifications. Make sure to fullfill the will of the hook.
                                        item = this.value;
                                        keys(additionalChanges).forEach(function (keyPath) {
                                            setByKeyPath(item, keyPath, additionalChanges[keyPath]); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
                                        });
                                    }
                                }
                            };
                        }
                    }
                    else if (updatingHook === nop) {
                        // changes is a set of {keyPath: value} and no one is listening to the updating hook.
                        var keyPaths = keys(changes);
                        var numKeys = keyPaths.length;
                        modifyer = function (item) {
                            var anythingModified = false;
                            for (var i = 0; i < numKeys; ++i) {
                                var keyPath = keyPaths[i], val = changes[keyPath];
                                if (getByKeyPath(item, keyPath) !== val) {
                                    setByKeyPath(item, keyPath, val); // Adding {keyPath: undefined} means that the keyPath should be deleted. Handled by setByKeyPath
                                    anythingModified = true;
                                }
                            }
                            return anythingModified;
                        };
                    }
                    else {
                        // changes is a set of {keyPath: value} and people are listening to the updating hook so we need to call it and
                        // allow it to add additional modifications to make.
                        var origChanges = changes;
                        changes = shallowClone(origChanges); // Let's work with a clone of the changes keyPath/value set so that we can restore it in case a hook extends it.
                        modifyer = function (item) {
                            var anythingModified = false;
                            var additionalChanges = updatingHook.call(this, changes, this.primKey, deepClone(item), trans);
                            if (additionalChanges)
                                extend(changes, additionalChanges);
                            keys(changes).forEach(function (keyPath) {
                                var val = changes[keyPath];
                                if (getByKeyPath(item, keyPath) !== val) {
                                    setByKeyPath(item, keyPath, val);
                                    anythingModified = true;
                                }
                            });
                            if (additionalChanges)
                                changes = shallowClone(origChanges); // Restore original changes for next iteration
                            return anythingModified;
                        };
                    }
                    var count = 0;
                    var successCount = 0;
                    var iterationComplete = false;
                    var failures = [];
                    var failKeys = [];
                    var currentKey = null;
                    function modifyItem(item, cursor) {
                        currentKey = cursor.primaryKey;
                        var thisContext = {
                            primKey: cursor.primaryKey,
                            value: item,
                            onsuccess: null,
                            onerror: null
                        };
                        function onerror(e) {
                            failures.push(e);
                            failKeys.push(thisContext.primKey);
                            checkFinished();
                            return true; // Catch these errors and let a final rejection decide whether or not to abort entire transaction
                        }
                        if (modifyer.call(thisContext, item, thisContext) !== false) {
                            var bDelete = !hasOwn(thisContext, "value");
                            ++count;
                            tryCatch(function () {
                                var req = (bDelete ? cursor.delete() : cursor.update(thisContext.value));
                                req._hookCtx = thisContext;
                                req.onerror = hookedEventRejectHandler(onerror);
                                req.onsuccess = hookedEventSuccessHandler(function () {
                                    ++successCount;
                                    checkFinished();
                                });
                            }, onerror);
                        }
                        else if (thisContext.onsuccess) {
                            // Hook will expect either onerror or onsuccess to always be called!
                            thisContext.onsuccess(thisContext.value);
                        }
                    }
                    function doReject(e) {
                        if (e) {
                            failures.push(e);
                            failKeys.push(currentKey);
                        }
                        return reject(new ModifyError("Error modifying one or more objects", failures, successCount, failKeys));
                    }
                    function checkFinished() {
                        if (iterationComplete && successCount + failures.length === count) {
                            if (failures.length > 0)
                                doReject();
                            else
                                resolve(successCount);
                        }
                    }
                    self.clone().raw()._iterate(modifyItem, function () {
                        iterationComplete = true;
                        checkFinished();
                    }, doReject, idbstore);
                });
            },
            'delete': function () {
                var _this = this;
                var ctx = this._ctx, range = ctx.range, deletingHook = ctx.table.hook.deleting.fire, hasDeleteHook = deletingHook !== nop;
                if (!hasDeleteHook &&
                    isPlainKeyRange(ctx) &&
                    ((ctx.isPrimKey && !hangsOnDeleteLargeKeyRange) || !range)) {
                    // May use IDBObjectStore.delete(IDBKeyRange) in this case (Issue #208)
                    // For chromium, this is the way most optimized version.
                    // For IE/Edge, this could hang the indexedDB engine and make operating system instable
                    // (https://gist.github.com/dfahlander/5a39328f029de18222cf2125d56c38f7)
                    return this._write(function (resolve, reject, idbstore) {
                        // Our API contract is to return a count of deleted items, so we have to count() before delete().
                        var onerror = eventRejectHandler(reject), countReq = (range ? idbstore.count(range) : idbstore.count());
                        countReq.onerror = onerror;
                        countReq.onsuccess = function () {
                            var count = countReq.result;
                            tryCatch(function () {
                                var delReq = (range ? idbstore.delete(range) : idbstore.clear());
                                delReq.onerror = onerror;
                                delReq.onsuccess = function () { return resolve(count); };
                            }, function (err) { return reject(err); });
                        };
                    });
                }
                // Default version to use when collection is not a vanilla IDBKeyRange on the primary key.
                // Divide into chunks to not starve RAM.
                // If has delete hook, we will have to collect not just keys but also objects, so it will use
                // more memory and need lower chunk size.
                var CHUNKSIZE = hasDeleteHook ? 2000 : 10000;
                return this._write(function (resolve, reject, idbstore, trans) {
                    var totalCount = 0;
                    // Clone collection and change its table and set a limit of CHUNKSIZE on the cloned Collection instance.
                    var collection = _this
                        .clone({
                        keysOnly: !ctx.isMatch && !hasDeleteHook
                    }) // load just keys (unless filter() or and() or deleteHook has subscribers)
                        .distinct() // In case multiEntry is used, never delete same key twice because resulting count
                        .limit(CHUNKSIZE)
                        .raw(); // Don't filter through reading-hooks (like mapped classes etc)
                    var keysOrTuples = [];
                    // We're gonna do things on as many chunks that are needed.
                    // Use recursion of nextChunk function:
                    var nextChunk = function () { return collection.each(hasDeleteHook ? function (val, cursor) {
                        // Somebody subscribes to hook('deleting'). Collect all primary keys and their values,
                        // so that the hook can be called with its values in bulkDelete().
                        keysOrTuples.push([cursor.primaryKey, cursor.value]);
                    } : function (val, cursor) {
                        // No one subscribes to hook('deleting'). Collect only primary keys:
                        keysOrTuples.push(cursor.primaryKey);
                    }).then(function () {
                        // Chromium deletes faster when doing it in sort order.
                        hasDeleteHook ?
                            keysOrTuples.sort(function (a, b) { return ascending(a[0], b[0]); }) :
                            keysOrTuples.sort(ascending);
                        return bulkDelete(idbstore, trans, keysOrTuples, hasDeleteHook, deletingHook);
                    }).then(function () {
                        var count = keysOrTuples.length;
                        totalCount += count;
                        keysOrTuples = [];
                        return count < CHUNKSIZE ? totalCount : nextChunk();
                    }); };
                    resolve(nextChunk());
                });
            }
        };
    });
    //
    //
    //
    // ------------------------- Help functions ---------------------------
    //
    //
    //
    function lowerVersionFirst(a, b) {
        return a._cfg.version - b._cfg.version;
    }
    function setApiOnPlace(objs, tableNames, dbschema) {
        tableNames.forEach(function (tableName) {
            var schema = dbschema[tableName];
            objs.forEach(function (obj) {
                if (!(tableName in obj)) {
                    if (obj === Transaction.prototype || obj instanceof Transaction) {
                        // obj is a Transaction prototype (or prototype of a subclass to Transaction)
                        // Make the API a getter that returns this.table(tableName)
                        setProp(obj, tableName, { get: function () { return this.table(tableName); } });
                    }
                    else {
                        // Table will not be bound to a transaction (will use Dexie.currentTransaction)
                        obj[tableName] = new Table(tableName, schema);
                    }
                }
            });
        });
    }
    function removeTablesApi(objs) {
        objs.forEach(function (obj) {
            for (var key in obj) {
                if (obj[key] instanceof Table)
                    delete obj[key];
            }
        });
    }
    function iterate(req, filter, fn, resolve, reject, valueMapper) {
        // Apply valueMapper (hook('reading') or mappped class)
        var mappedFn = valueMapper ? function (x, c, a) { return fn(valueMapper(x), c, a); } : fn;
        // Wrap fn with PSD and microtick stuff from Promise.
        var wrappedFn = wrap(mappedFn, reject);
        if (!req.onerror)
            req.onerror = eventRejectHandler(reject);
        if (filter) {
            req.onsuccess = trycatcher(function filter_record() {
                var cursor = req.result;
                if (cursor) {
                    var c = function () { cursor.continue(); };
                    if (filter(cursor, function (advancer) { c = advancer; }, resolve, reject))
                        wrappedFn(cursor.value, cursor, function (advancer) { c = advancer; });
                    c();
                }
                else {
                    resolve();
                }
            }, reject);
        }
        else {
            req.onsuccess = trycatcher(function filter_record() {
                var cursor = req.result;
                if (cursor) {
                    var c = function () { cursor.continue(); };
                    wrappedFn(cursor.value, cursor, function (advancer) { c = advancer; });
                    c();
                }
                else {
                    resolve();
                }
            }, reject);
        }
    }
    function parseIndexSyntax(indexes) {
        /// <param name="indexes" type="String"></param>
        /// <returns type="Array" elementType="IndexSpec"></returns>
        var rv = [];
        indexes.split(',').forEach(function (index) {
            index = index.trim();
            var name = index.replace(/([&*]|\+\+)/g, ""); // Remove "&", "++" and "*"
            // Let keyPath of "[a+b]" be ["a","b"]:
            var keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split('+') : name;
            rv.push(new IndexSpec(name, keyPath || null, /\&/.test(index), /\*/.test(index), /\+\+/.test(index), isArray(keyPath), /\./.test(index)));
        });
        return rv;
    }
    function cmp(key1, key2) {
        return indexedDB.cmp(key1, key2);
    }
    function min(a, b) {
        return cmp(a, b) < 0 ? a : b;
    }
    function max(a, b) {
        return cmp(a, b) > 0 ? a : b;
    }
    function ascending(a, b) {
        return indexedDB.cmp(a, b);
    }
    function descending(a, b) {
        return indexedDB.cmp(b, a);
    }
    function simpleCompare(a, b) {
        return a < b ? -1 : a === b ? 0 : 1;
    }
    function simpleCompareReverse(a, b) {
        return a > b ? -1 : a === b ? 0 : 1;
    }
    function combine(filter1, filter2) {
        return filter1 ?
            filter2 ?
                function () { return filter1.apply(this, arguments) && filter2.apply(this, arguments); } :
                filter1 :
            filter2;
    }
    function readGlobalSchema() {
        db.verno = idbdb.version / 10;
        db._dbSchema = globalSchema = {};
        dbStoreNames = slice(idbdb.objectStoreNames, 0);
        if (dbStoreNames.length === 0)
            return; // Database contains no stores.
        var trans = idbdb.transaction(safariMultiStoreFix(dbStoreNames), 'readonly');
        dbStoreNames.forEach(function (storeName) {
            var store = trans.objectStore(storeName), keyPath = store.keyPath, dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
            var primKey = new IndexSpec(keyPath, keyPath || "", false, false, !!store.autoIncrement, keyPath && typeof keyPath !== 'string', dotted);
            var indexes = [];
            for (var j = 0; j < store.indexNames.length; ++j) {
                var idbindex = store.index(store.indexNames[j]);
                keyPath = idbindex.keyPath;
                dotted = keyPath && typeof keyPath === 'string' && keyPath.indexOf('.') !== -1;
                var index = new IndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== 'string', dotted);
                indexes.push(index);
            }
            globalSchema[storeName] = new TableSchema(storeName, primKey, indexes, {});
        });
        setApiOnPlace([allTables], keys(globalSchema), globalSchema);
    }
    function adjustToExistingIndexNames(schema, idbtrans) {
        /// <summary>
        /// Issue #30 Problem with existing db - adjust to existing index names when migrating from non-dexie db
        /// </summary>
        /// <param name="schema" type="Object">Map between name and TableSchema</param>
        /// <param name="idbtrans" type="IDBTransaction"></param>
        var storeNames = idbtrans.db.objectStoreNames;
        for (var i = 0; i < storeNames.length; ++i) {
            var storeName = storeNames[i];
            var store = idbtrans.objectStore(storeName);
            hasGetAll = 'getAll' in store;
            for (var j = 0; j < store.indexNames.length; ++j) {
                var indexName = store.indexNames[j];
                var keyPath = store.index(indexName).keyPath;
                var dexieName = typeof keyPath === 'string' ? keyPath : "[" + slice(keyPath).join('+') + "]";
                if (schema[storeName]) {
                    var indexSpec = schema[storeName].idxByName[dexieName];
                    if (indexSpec)
                        indexSpec.name = indexName;
                }
            }
        }
        // Bug with getAll() on Safari ver<604 on Workers only, see discussion following PR #579
        if (/Safari/.test(navigator.userAgent) &&
            !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
            _global.WorkerGlobalScope && _global instanceof _global.WorkerGlobalScope &&
            [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) {
            hasGetAll = false;
        }
    }
    function fireOnBlocked(ev) {
        db.on("blocked").fire(ev);
        // Workaround (not fully*) for missing "versionchange" event in IE,Edge and Safari:
        connections
            .filter(function (c) { return c.name === db.name && c !== db && !c._vcFired; })
            .map(function (c) { return c.on("versionchange").fire(ev); });
    }
    extend(this, {
        Collection: Collection,
        Table: Table,
        Transaction: Transaction,
        Version: Version,
        WhereClause: WhereClause
    });
    init();
    addons.forEach(function (fn) {
        fn(db);
    });
}
function parseType(type) {
    if (typeof type === 'function') {
        return new type();
    }
    else if (isArray(type)) {
        return [parseType(type[0])];
    }
    else if (type && typeof type === 'object') {
        var rv = {};
        applyStructure(rv, type);
        return rv;
    }
    else {
        return type;
    }
}
function applyStructure(obj, structure) {
    keys(structure).forEach(function (member) {
        var value = parseType(structure[member]);
        obj[member] = value;
    });
    return obj;
}
function hookedEventSuccessHandler(resolve) {
    // wrap() is needed when calling hooks because the rare scenario of:
    //  * hook does a db operation that fails immediately (IDB throws exception)
    //    For calling db operations on correct transaction, wrap makes sure to set PSD correctly.
    //    wrap() will also execute in a virtual tick.
    //  * If not wrapped in a virtual tick, direct exception will launch a new physical tick.
    //  * If this was the last event in the bulk, the promise will resolve after a physical tick
    //    and the transaction will have committed already.
    // If no hook, the virtual tick will be executed in the reject()/resolve of the final promise,
    // because it is always marked with _lib = true when created using Transaction._promise().
    return wrap(function (event) {
        var req = event.target, ctx = req._hookCtx, // Contains the hook error handler. Put here instead of closure to boost performance.
        result = ctx.value || req.result, // Pass the object value on updates. The result from IDB is the primary key.
        hookSuccessHandler = ctx && ctx.onsuccess;
        hookSuccessHandler && hookSuccessHandler(result);
        resolve && resolve(result);
    }, resolve);
}
function eventRejectHandler(reject) {
    return wrap(function (event) {
        preventDefault(event);
        reject(event.target.error);
        return false;
    });
}
function eventSuccessHandler(resolve) {
    return wrap(function (event) {
        resolve(event.target.result);
    });
}
function hookedEventRejectHandler(reject) {
    return wrap(function (event) {
        // See comment on hookedEventSuccessHandler() why wrap() is needed only when supporting hooks.
        var req = event.target, err = req.error, ctx = req._hookCtx, // Contains the hook error handler. Put here instead of closure to boost performance.
        hookErrorHandler = ctx && ctx.onerror;
        hookErrorHandler && hookErrorHandler(err);
        preventDefault(event);
        reject(err);
        return false;
    });
}
function preventDefault(event) {
    if (event.stopPropagation)
        event.stopPropagation();
    if (event.preventDefault)
        event.preventDefault();
}
function awaitIterator(iterator) {
    var callNext = function (result) { return iterator.next(result); }, doThrow = function (error) { return iterator.throw(error); }, onSuccess = step(callNext), onError = step(doThrow);
    function step(getNext) {
        return function (val) {
            var next = getNext(val), value = next.value;
            return next.done ? value :
                (!value || typeof value.then !== 'function' ?
                    isArray(value) ? Promise.all(value).then(onSuccess, onError) : onSuccess(value) :
                    value.then(onSuccess, onError));
        };
    }
    return step(callNext)();
}
//
// IndexSpec struct
//
function IndexSpec(name, keyPath, unique, multi, auto, compound, dotted) {
    /// <param name="name" type="String"></param>
    /// <param name="keyPath" type="String"></param>
    /// <param name="unique" type="Boolean"></param>
    /// <param name="multi" type="Boolean"></param>
    /// <param name="auto" type="Boolean"></param>
    /// <param name="compound" type="Boolean"></param>
    /// <param name="dotted" type="Boolean"></param>
    this.name = name;
    this.keyPath = keyPath;
    this.unique = unique;
    this.multi = multi;
    this.auto = auto;
    this.compound = compound;
    this.dotted = dotted;
    var keyPathSrc = typeof keyPath === 'string' ? keyPath : keyPath && ('[' + [].join.call(keyPath, '+') + ']');
    this.src = (unique ? '&' : '') + (multi ? '*' : '') + (auto ? "++" : "") + keyPathSrc;
}
//
// TableSchema struct
//
function TableSchema(name, primKey, indexes, instanceTemplate) {
    /// <param name="name" type="String"></param>
    /// <param name="primKey" type="IndexSpec"></param>
    /// <param name="indexes" type="Array" elementType="IndexSpec"></param>
    /// <param name="instanceTemplate" type="Object"></param>
    this.name = name;
    this.primKey = primKey || new IndexSpec();
    this.indexes = indexes || [new IndexSpec()];
    this.instanceTemplate = instanceTemplate;
    this.mappedClass = null;
    this.idxByName = arrayToObject(indexes, function (index) { return [index.name, index]; });
}
function safariMultiStoreFix(storeNames) {
    return storeNames.length === 1 ? storeNames[0] : storeNames;
}
function getNativeGetDatabaseNamesFn(indexedDB) {
    var fn = indexedDB && (indexedDB.getDatabaseNames || indexedDB.webkitGetDatabaseNames);
    return fn && fn.bind(indexedDB);
}
// Export Error classes
props(Dexie, fullNameExceptions); // Dexie.XXXError = class XXXError {...};
//
// Static methods and properties
// 
props(Dexie, {
    //
    // Static delete() method.
    //
    delete: function (databaseName) {
        var db = new Dexie(databaseName), promise = db.delete();
        promise.onblocked = function (fn) {
            db.on("blocked", fn);
            return this;
        };
        return promise;
    },
    //
    // Static exists() method.
    //
    exists: function (name) {
        return new Dexie(name).open().then(function (db) {
            db.close();
            return true;
        }).catch(Dexie.NoSuchDatabaseError, function () { return false; });
    },
    //
    // Static method for retrieving a list of all existing databases at current host.
    //
    getDatabaseNames: function (cb) {
        var getDatabaseNames = getNativeGetDatabaseNamesFn(Dexie.dependencies.indexedDB);
        return getDatabaseNames ? new Promise(function (resolve, reject) {
            var req = getDatabaseNames();
            req.onsuccess = function (event) {
                resolve(slice(event.target.result, 0)); // Converst DOMStringList to Array<String>
            };
            req.onerror = eventRejectHandler(reject);
        }).then(cb) : dbNamesDB.dbnames.toCollection().primaryKeys(cb);
    },
    defineClass: function () {
        // Default constructor able to copy given properties into this object.
        function Class(properties) {
            /// <param name="properties" type="Object" optional="true">Properties to initialize object with.
            /// </param>
            if (properties)
                extend(this, properties);
        }
        return Class;
    },
    applyStructure: applyStructure,
    ignoreTransaction: function (scopeFunc) {
        // In case caller is within a transaction but needs to create a separate transaction.
        // Example of usage:
        //
        // Let's say we have a logger function in our app. Other application-logic should be unaware of the
        // logger function and not need to include the 'logentries' table in all transaction it performs.
        // The logging should always be done in a separate transaction and not be dependant on the current
        // running transaction context. Then you could use Dexie.ignoreTransaction() to run code that starts a new transaction.
        //
        //     Dexie.ignoreTransaction(function() {
        //         db.logentries.add(newLogEntry);
        //     });
        //
        // Unless using Dexie.ignoreTransaction(), the above example would try to reuse the current transaction
        // in current Promise-scope.
        //
        // An alternative to Dexie.ignoreTransaction() would be setImmediate() or setTimeout(). The reason we still provide an
        // API for this because
        //  1) The intention of writing the statement could be unclear if using setImmediate() or setTimeout().
        //  2) setTimeout() would wait unnescessary until firing. This is however not the case with setImmediate().
        //  3) setImmediate() is not supported in the ES standard.
        //  4) You might want to keep other PSD state that was set in a parent PSD, such as PSD.letThrough.
        return PSD.trans ?
            usePSD(PSD.transless, scopeFunc) : // Use the closest parent that was non-transactional.
            scopeFunc(); // No need to change scope because there is no ongoing transaction.
    },
    vip: function (fn) {
        // To be used by subscribers to the on('ready') event.
        // This will let caller through to access DB even when it is blocked while the db.ready() subscribers are firing.
        // This would have worked automatically if we were certain that the Provider was using Dexie.Promise for all asyncronic operations. The promise PSD
        // from the provider.connect() call would then be derived all the way to when provider would call localDatabase.applyChanges(). But since
        // the provider more likely is using non-promise async APIs or other thenable implementations, we cannot assume that.
        // Note that this method is only useful for on('ready') subscribers that is returning a Promise from the event. If not using vip()
        // the database could deadlock since it wont open until the returned Promise is resolved, and any non-VIPed operation started by
        // the caller will not resolve until database is opened.
        return newScope(function () {
            PSD.letThrough = true; // Make sure we are let through if still blocking db due to onready is firing.
            return fn();
        });
    },
    async: function (generatorFn) {
        return function () {
            try {
                var rv = awaitIterator(generatorFn.apply(this, arguments));
                if (!rv || typeof rv.then !== 'function')
                    return Promise.resolve(rv);
                return rv;
            }
            catch (e) {
                return rejection(e);
            }
        };
    },
    spawn: function (generatorFn, args, thiz) {
        try {
            var rv = awaitIterator(generatorFn.apply(thiz, args || []));
            if (!rv || typeof rv.then !== 'function')
                return Promise.resolve(rv);
            return rv;
        }
        catch (e) {
            return rejection(e);
        }
    },
    // Dexie.currentTransaction property
    currentTransaction: {
        get: function () { return PSD.trans || null; }
    },
    waitFor: function (promiseOrFunction, optionalTimeout) {
        // If a function is provided, invoke it and pass the returning value to Transaction.waitFor()
        var promise = Promise.resolve(typeof promiseOrFunction === 'function' ? Dexie.ignoreTransaction(promiseOrFunction) : promiseOrFunction)
            .timeout(optionalTimeout || 60000); // Default the timeout to one minute. Caller may specify Infinity if required.       
        // Run given promise on current transaction. If no current transaction, just return a Dexie promise based
        // on given value.
        return PSD.trans ? PSD.trans.waitFor(promise) : promise;
    },
    // Export our Promise implementation since it can be handy as a standalone Promise implementation
    Promise: Promise,
    // Dexie.debug proptery:
    // Dexie.debug = false
    // Dexie.debug = true
    // Dexie.debug = "dexie" - don't hide dexie's stack frames.
    debug: {
        get: function () { return debug; },
        set: function (value) {
            setDebug(value, value === 'dexie' ? function () { return true; } : dexieStackFrameFilter);
        }
    },
    // Export our derive/extend/override methodology
    derive: derive,
    extend: extend,
    props: props,
    override: override,
    // Export our Events() function - can be handy as a toolkit
    Events: Events,
    // Utilities
    getByKeyPath: getByKeyPath,
    setByKeyPath: setByKeyPath,
    delByKeyPath: delByKeyPath,
    shallowClone: shallowClone,
    deepClone: deepClone,
    getObjectDiff: getObjectDiff,
    asap: asap,
    maxKey: maxKey,
    minKey: minKey,
    // Addon registry
    addons: [],
    // Global DB connection list
    connections: connections,
    MultiModifyError: exceptions.Modify,
    errnames: errnames,
    // Export other static classes
    IndexSpec: IndexSpec,
    TableSchema: TableSchema,
    //
    // Dependencies
    //
    // These will automatically work in browsers with indexedDB support, or where an indexedDB polyfill has been included.
    //
    // In node.js, however, these properties must be set "manually" before instansiating a new Dexie().
    // For node.js, you need to require indexeddb-js or similar and then set these deps.
    //
    dependencies: (function () {
        try {
            return {
                // Required:
                indexedDB: _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
                IDBKeyRange: _global.IDBKeyRange || _global.webkitIDBKeyRange
            };
        }
        catch (e) {
            return {
                indexedDB: null,
                IDBKeyRange: null
            };
        }
    })(),
    // API Version Number: Type Number, make sure to always set a version number that can be comparable correctly. Example: 0.9, 0.91, 0.92, 1.0, 1.01, 1.1, 1.2, 1.21, etc.
    semVer: DEXIE_VERSION,
    version: DEXIE_VERSION.split('.')
        .map(function (n) { return parseInt(n); })
        .reduce(function (p, c, i) { return p + (c / Math.pow(10, i * 2)); }),
    // https://github.com/dfahlander/Dexie.js/issues/186
    // typescript compiler tsc in mode ts-->es5 & commonJS, will expect require() to return
    // x.default. Workaround: Set Dexie.default = Dexie.
    default: Dexie,
    // Make it possible to import {Dexie} (non-default import)
    // Reason 1: May switch to that in future.
    // Reason 2: We declare it both default and named exported in d.ts to make it possible
    // to let addons extend the Dexie interface with Typescript 2.1 (works only when explicitely
    // exporting the symbol, not just default exporting)
    Dexie: Dexie
});
// Map DOMErrors and DOMExceptions to corresponding Dexie errors. May change in Dexie v2.0.
Promise.rejectionMapper = mapError;
// Initialize dbNamesDB (won't ever be opened on chromium browsers')
dbNamesDB = new Dexie('__dbnames');
dbNamesDB.version(1).stores({ dbnames: 'name' });
(function () {
    // Migrate from Dexie 1.x database names stored in localStorage:
    var DBNAMES = 'Dexie.DatabaseNames';
    try {
        if (typeof localStorage !== undefined && _global.document !== undefined) {
            // Have localStorage and is not executing in a worker. Lets migrate from Dexie 1.x.
            JSON.parse(localStorage.getItem(DBNAMES) || "[]")
                .forEach(function (name) { return dbNamesDB.dbnames.put({ name: name }).catch(nop); });
            localStorage.removeItem(DBNAMES);
        }
    }
    catch (_e) { }
})();

/* harmony default export */ __webpack_exports__["default"] = (Dexie);
//# sourceMappingURL=dexie.es.js.map

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../../timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./ts/models/abilityScore.ts":
/*!***********************************!*\
  !*** ./ts/models/abilityScore.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AbilityScores {
    constructor(scores) {
        if (!scores) {
            this.scores = [
                new AbilityScore(8, AbilityKind.Strength),
                new AbilityScore(8, AbilityKind.Dexterity),
                new AbilityScore(8, AbilityKind.Constitution),
                new AbilityScore(8, AbilityKind.Intelligence),
                new AbilityScore(8, AbilityKind.Wisdom),
                new AbilityScore(8, AbilityKind.Charisma),
            ];
        }
        else {
            this.scores = scores;
        }
    }
    static Empty() {
        return new AbilityScores([
            new AbilityScore(0, AbilityKind.Strength),
            new AbilityScore(0, AbilityKind.Dexterity),
            new AbilityScore(0, AbilityKind.Constitution),
            new AbilityScore(0, AbilityKind.Intelligence),
            new AbilityScore(0, AbilityKind.Wisdom),
            new AbilityScore(0, AbilityKind.Charisma),
        ]);
    }
    map(cb) {
        return this.scores.map(cb);
    }
    reduce(cb, acc) {
        return this.scores.reduce(cb, acc);
    }
    modifier(kind) {
        return this.scores.find(k => k.kind == kind).modifier;
    }
    clone() {
        return AbilityScores.fromJson(this);
    }
    set(kind, value) {
        let idx = this.scores.findIndex(a => a.kind == kind);
        if (idx < 0)
            return;
        this.scores[idx].value = value;
    }
    add(other) {
        return new AbilityScores([
            new AbilityScore(this.scores[0].value + other.scores[0].value, this.scores[0].kind),
            new AbilityScore(this.scores[1].value + other.scores[1].value, this.scores[1].kind),
            new AbilityScore(this.scores[2].value + other.scores[2].value, this.scores[2].kind),
            new AbilityScore(this.scores[3].value + other.scores[3].value, this.scores[3].kind),
            new AbilityScore(this.scores[4].value + other.scores[4].value, this.scores[4].kind),
            new AbilityScore(this.scores[5].value + other.scores[5].value, this.scores[5].kind),
        ]);
    }
    static fromJson(json) {
        return new AbilityScores(json.scores.map(AbilityScore.fromJson));
    }
}
exports.AbilityScores = AbilityScores;
class AbilityScore {
    constructor(value, kind) {
        this.value = value;
        this.kind = kind;
    }
    get modifier() {
        return Math.floor((this.value - 10) / 2);
    }
    static fromJson(json) {
        return new AbilityScore(json.value, json.kind);
    }
}
exports.AbilityScore = AbilityScore;
var AbilityKind;
(function (AbilityKind) {
    AbilityKind["Strength"] = "Strength";
    AbilityKind["Dexterity"] = "Dexterity";
    AbilityKind["Constitution"] = "Constitution";
    AbilityKind["Intelligence"] = "Intelligence";
    AbilityKind["Wisdom"] = "Wisdom";
    AbilityKind["Charisma"] = "Charisma";
})(AbilityKind = exports.AbilityKind || (exports.AbilityKind = {}));


/***/ }),

/***/ "./ts/models/background.ts":
/*!*********************************!*\
  !*** ./ts/models/background.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const skills_1 = __webpack_require__(/*! ./skills */ "./ts/models/skills.ts");
const tools_1 = __webpack_require__(/*! ./tools */ "./ts/models/tools.ts");
const GAMING_SETS = Object.getOwnPropertyNames(tools_1.GamingSet).map(n => tools_1.GamingSet[n]);
const INSTRUMENTS = Object.getOwnPropertyNames(tools_1.Instrument).map(n => tools_1.Instrument[n]);
const ARTISAN_TOOLS = Object.getOwnPropertyNames(tools_1.ArtisanTools).map(n => tools_1.ArtisanTools[n]);
const VEHICLES = Object.getOwnPropertyNames(tools_1.Mount).map(n => tools_1.Mount[n])
    .concat(Object.getOwnPropertyNames(tools_1.Vehicle).map(n => tools_1.Vehicle[n]))
    .concat(Object.getOwnPropertyNames(tools_1.Boat).map(n => tools_1.Boat[n]));
class Background {
    constructor(kind, skills = [], languages = [], toolProficiencies = [], toolOptions = []) {
        this.kind = kind;
        this.skills = skills;
        this.languages = languages;
        this.toolProficiencies = toolProficiencies;
        this.toolOptions = toolOptions;
    }
    static Acolyte() {
        return new Background(BackgroundKind.Acolyte, [skills_1.SkillKind.Insight, skills_1.SkillKind.Religion], [null, null], [], []);
    }
    static Charlatan() {
        return new Background(BackgroundKind.Charlatan, [skills_1.SkillKind.Deception, skills_1.SkillKind.SleightOfHand], [], [tools_1.MiscTools.Disguise, tools_1.MiscTools.Forgery]);
    }
    static Criminal() {
        return new Background(BackgroundKind.Criminal, [skills_1.SkillKind.Deception, skills_1.SkillKind.Stealth], [], [tools_1.MiscTools.Thieves, null], [null, GAMING_SETS]);
    }
    static Entertainer() {
        return new Background(BackgroundKind.Entertainer, [skills_1.SkillKind.Acrobatics, skills_1.SkillKind.Performance], [], [tools_1.MiscTools.Disguise, null], [null, INSTRUMENTS]);
    }
    static FolkHero() {
        return new Background(BackgroundKind.FolkHero, [skills_1.SkillKind.AnimalHandling, skills_1.SkillKind.Survival], [], [null, null], [ARTISAN_TOOLS,
            VEHICLES]);
    }
    static GuildArtisan() {
        return new Background(BackgroundKind.GuildArtisan, [skills_1.SkillKind.Insight, skills_1.SkillKind.Persuasion], [null], [null], [ARTISAN_TOOLS]);
    }
    static Hermit() {
        return new Background(BackgroundKind.Hermit, [skills_1.SkillKind.Medicine, skills_1.SkillKind.Religion], [null], [tools_1.MiscTools.Herbalism], []);
    }
    static Noble() {
        return new Background(BackgroundKind.Noble, [skills_1.SkillKind.History, skills_1.SkillKind.Persuasion], [null], [null], [GAMING_SETS]);
    }
    static Outlander() {
        return new Background(BackgroundKind.Outlander, [skills_1.SkillKind.Athletics, skills_1.SkillKind.Survival], [null], [null], [INSTRUMENTS]);
    }
    static Sage() {
        return new Background(BackgroundKind.Sage, [skills_1.SkillKind.Arcana, skills_1.SkillKind.History], [null, null], [], []);
    }
    static Sailor() {
        return new Background(BackgroundKind.Sailor, [skills_1.SkillKind.Athletics, skills_1.SkillKind.Perception], [], [tools_1.MiscTools.Navigator, null], [null, Object.getOwnPropertyNames(tools_1.Boat).map(n => tools_1.Boat[n])]);
    }
    static Soldier() {
        return new Background(BackgroundKind.Soldier, [skills_1.SkillKind.Athletics, skills_1.SkillKind.Intimidation], [], [null, null], [GAMING_SETS, Object.getOwnPropertyNames(tools_1.Vehicle).map(n => tools_1.Vehicle[n])]);
    }
    static Urchin() {
        return new Background(BackgroundKind.Urchin, [skills_1.SkillKind.SleightOfHand, skills_1.SkillKind.Stealth], [], [tools_1.MiscTools.Disguise, tools_1.MiscTools.Thieves], []);
    }
    static fromJson(json) {
        return new Background(json.kind, json.skills, json.languages, json.toolProficiencies, json.toolOptions);
    }
}
exports.Background = Background;
var BackgroundKind;
(function (BackgroundKind) {
    BackgroundKind["Acolyte"] = "Acolyte";
    BackgroundKind["Charlatan"] = "Charlatan";
    BackgroundKind["Criminal"] = "Criminal";
    BackgroundKind["Entertainer"] = "Entertainer";
    BackgroundKind["FolkHero"] = "Folk Hero";
    BackgroundKind["GuildArtisan"] = "Guild Artisan";
    BackgroundKind["Hermit"] = "Hermit";
    BackgroundKind["Noble"] = "Noble";
    BackgroundKind["Outlander"] = "Outlander";
    BackgroundKind["Sage"] = "Sage";
    BackgroundKind["Sailor"] = "Sailor";
    BackgroundKind["Soldier"] = "Soldier";
    BackgroundKind["Urchin"] = "Urchin";
})(BackgroundKind = exports.BackgroundKind || (exports.BackgroundKind = {}));
exports.ACOLYTE_TRAITS = [
    'I idolize a particular hero of my faith, and constantly refer to that person\'s deeds and example,',
    'I can find common ground between lhe fiercest enemies, empathizing with them and always working toward peace.',
    'I see omens in every event and action. The gods try to speak to us we just need lo listen',
    'Nothing can shake my optimistic attitude.',
    'I quote (or misquote) sacred texts and proverbs in almost every situation.',
    'I am tolerant (or intolerant) of other faiths and respect (or condemn) the worship of other gods.',
    'I\'ve enjoyed fine food, drink, and high society among my temple\'s elite. Rough living grates on me.',
    'I\'ve spent so long in the tem pie that I have little practical experience dealing with people in the outside world.'
];
exports.ACOLYTE_IDEALS = [
    'Tradition. lhe ancient traditions of worship and sacrifice must be preserved and upheld. (Lawful)',
    'Charily. I always try to help those in need, no matter what the personal cost. (Good)',
    'Change. We must help bring about the changes lhe gods are constantly working in the world. (Chaotic)',
    'Power. I hope to one day rise to the top of my faith\'s religious hierarchy. (Lawful)',
    'Faith. I trust that my deity will guide my actions. I have faith that if I work hard, things will go well. (Lawful)',
    'Aspiration. I seek lo prove myself worthy of my god\'s favor by matching my actions against his or her teachings. (Any)',
];
exports.ACOLYTE_BONDS = [
    'I would die to recover an ancient relic of my faith that was lost long ago.',
    'I will someday get revenge on the corrupt temple hierarchy who branded me a heretic.',
    'I owe my life to the priest who took me in when my parents died.',
    'Everything I do is for the common people.',
    'I will do anything lo protect the tem pie where I served.',
    'I seek to preserve a sacred text that my enemies consider heretical and seek to destroy.',
];
exports.ACOLYTE_FLAWS = [
    'I judge others harshly, and myself even more severely.',
    'I put roo much trust in those who wield power within my temple\'s hierarchy.',
    'My piety sometimes leads me lo blindly trust those that profess faith in my god.',
    'I am inflexible in my thinking.',
    'I am suspicious af strangers and expect the worst of them.',
    'Once I pick a goal, I become obsessed with it to the detriment of everything else in my life.'
];
exports.CHARLATAN_TRAITS = [];
exports.CHARLATAN_IDEALS = [];
exports.CHARLATAN_BONDS = [];
exports.CHARLATAN_FLAWS = [];
exports.ALL_BACKGROUNDS = [
    Background.Acolyte(),
    Background.Charlatan(),
    Background.Criminal(),
    Background.Entertainer(),
    Background.FolkHero(),
    Background.GuildArtisan(),
    Background.Hermit(),
    Background.Noble(),
    Background.Outlander(),
    Background.Sage(),
    Background.Sailor(),
    Background.Soldier(),
    Background.Urchin(),
];


/***/ }),

/***/ "./ts/models/character.ts":
/*!********************************!*\
  !*** ./ts/models/character.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const abilityScore_1 = __webpack_require__(/*! ./abilityScore */ "./ts/models/abilityScore.ts");
const data_1 = __webpack_require__(/*! ../services/data */ "./ts/services/data.ts");
const race_1 = __webpack_require__(/*! ./race */ "./ts/models/race.ts");
const class_1 = __webpack_require__(/*! ./class */ "./ts/models/class.ts");
const background_1 = __webpack_require__(/*! ./background */ "./ts/models/background.ts");
const skills_1 = __webpack_require__(/*! ./skills */ "./ts/models/skills.ts");
const range_1 = __webpack_require__(/*! ./range */ "./ts/models/range.ts");
class Character {
    constructor(name = Character.nextName(), abilityScores = new abilityScore_1.AbilityScores(), race = new race_1.Race(), characterClass = new class_1.Class(class_1.ClassKind.Fighter, 1), background = new background_1.Background(background_1.BackgroundKind.Criminal), alignment = Alignment.ChaoticGood(), experience = 0, height = new Height(), weight = 160, eyeColor = 'grey', inspiration = 0, armor = null, shield = null, skills = new skills_1.Skills(), weapons = [new Weapon()], wealth = new Wealth(), languages = [NormalLanguage.Common], notes = [], damage = 0, tempHp = 0, magicItems = [], expendables = []) {
        this.name = name;
        this.abilityScores = abilityScores;
        this.race = race;
        this.characterClass = characterClass;
        this.background = background;
        this.alignment = alignment;
        this.experience = experience;
        this.height = height;
        this.weight = weight;
        this.eyeColor = eyeColor;
        this.inspiration = inspiration;
        this.armor = armor;
        this.shield = shield;
        this.skills = skills;
        this.weapons = weapons;
        this.wealth = wealth;
        this.languages = languages;
        this.notes = notes;
        this.damage = damage;
        this.tempHp = tempHp;
        this.magicItems = magicItems;
        this.expendables = expendables;
        this.background.skills.map(s => {
            this.skills.set(s, true);
        });
    }
    resetSkills() {
        this.skills = new skills_1.Skills();
        this.background.skills.map(s => {
            this.skills.set(s, true);
        });
    }
    get proficiencyBonus() {
        return this.characterClass.proficiencyBonus();
    }
    get proficiency() {
        let ret = this.characterClass.armorProfs.map(p => `${p} Armor`);
        ret.push(...this.characterClass.weaponProfs.map(p => {
            if (StdWeaponName[p.replace(/\s/g, '')]) {
                return p;
            }
            return `${p} Weapons`;
        }));
        ret.push(...this.characterClass.miscProfs);
        this.background.toolProficiencies.forEach(p => {
            if (Array.isArray(p)) {
                return;
            }
            ret.push(p);
        });
        if (this.background.languages.length > 0) {
            if (this.background.languages.filter(l => l != null).length == 0) {
                ret.push(`${this.background.languages.length} languages of your choice`);
            }
            else {
                ret.push(...this.background.languages);
            }
        }
        return ret;
    }
    static nextName() {
        let ret = 'Carl';
        if (Character.counter > 0) {
            ret += ` ${Character.counter}`;
        }
        Character.counter++;
        return ret;
    }
    get saves() {
        let fullScores = this.abilityScores.map(score => {
            let s = new abilityScore_1.AbilityScore(score.value, score.kind);
            let raceMod = this.race.abilityModifiers.find(m => m[0] == s.kind);
            if (raceMod) {
                s.value += raceMod[1];
            }
            let classMod = this.characterClass.bonusAbilityScores.find(m => m[0] == s.kind);
            if (classMod) {
                s.value += classMod[1];
            }
            return s;
        });
        let prefs = this.characterClass.savingThrows;
        return fullScores.map(score => {
            let pref = prefs.indexOf(score.kind) > -1;
            let value = pref ? score.modifier + this.proficiencyBonus : score.modifier;
            return new Save(score.kind, pref, value);
        });
    }
    get rawSkills() {
        let bonuses = this.modifiedAbilityScores().reduce((acc, ability) => {
            acc[ability.kind] = ability.modifier;
            return acc;
        }, {});
        return this.skills.map(skill => {
            let mod = bonuses[skill.modifier];
            let bonus = 0;
            let enabled = skill.enabled
                || this.characterClass.selectedSkills.indexOf(skill.kind) > -1;
            if (enabled) {
                bonus = this.proficiencyBonus;
            }
            else if (this.characterClass.name === class_1.ClassKind.Bard && this.level > 1) {
                bonus = Math.floor(this.proficiencyBonus / 2);
            }
            if (this.characterClass.name == class_1.ClassKind.Rogue
                || this.characterClass.name === class_1.ClassKind.Bard) {
                let det = this.characterClass.classDetails;
                if (det.expertise.indexOf(skill.kind) > -1) {
                    bonus *= 2;
                }
            }
            let value = mod + bonus;
            return [skill.kind, value, enabled];
        });
    }
    modifiedAbilityScores() {
        let updated = this.abilityScores.map(score => {
            let { kind, value } = score;
            let racialMod = this.race.abilityModifiers.find(m => m[0] == kind);
            if (racialMod) {
                value += racialMod[1];
            }
            let classMod = this.characterClass.bonusAbilityScores.find(m => m[0] == kind);
            if (classMod) {
                value += classMod[1];
            }
            return new abilityScore_1.AbilityScore(value, kind);
        });
        return new abilityScore_1.AbilityScores(updated);
    }
    get passiveWisdom() {
        return this.abilityScores.modifier(abilityScore_1.AbilityKind.Wisdom) + this.proficiencyBonus;
    }
    get initiative() {
        return this.abilityScores.modifier(abilityScore_1.AbilityKind.Dexterity);
    }
    armorClass() {
        let dex = this.modifiedAbilityScores().modifier(abilityScore_1.AbilityKind.Dexterity);
        let bonus = 0;
        if (this.armor) {
            bonus = this.armor.bonus;
            if (this.armor.dexLimit && this.armor.dexLimit < dex) {
                dex = this.armor.dexLimit;
            }
        }
        else if (this.characterClass.name == class_1.ClassKind.Barbarian) {
            bonus = this.abilityScores.modifier(abilityScore_1.AbilityKind.Constitution);
        }
        if (this.shield) {
            bonus += this.shield.bonus;
        }
        return 10 + bonus + dex;
    }
    get level() {
        let ret = data_1.Data.levelForExp(this.experience);
        if (this.characterClass.level != ret) {
            this.characterClass.level = ret;
        }
        return ret;
    }
    addExperience(points) {
        this.experience += points;
    }
    get expToNextLevel() {
        switch (this.level) {
            case 1:
                return 300 - this.experience;
            case 2:
                return 900 - this.experience;
            case 3:
                return 2700 - this.experience;
            case 4:
                return 6500 - this.experience;
            case 5:
                return 14000 - this.experience;
            case 6:
                return 23000 - this.experience;
            case 7:
                return 34000 - this.experience;
            case 8:
                return 48000 - this.experience;
            case 9:
                return 64000 - this.experience;
            case 10:
                return 85000 - this.experience;
            case 11:
                return 100000 - this.experience;
            case 12:
                return 120000 - this.experience;
            case 13:
                return 140000 - this.experience;
            case 14:
                return 165000 - this.experience;
            case 15:
                return 195000 - this.experience;
            case 16:
                return 225000 - this.experience;
            case 17:
                return 265000 - this.experience;
            case 18:
                return 305000 - this.experience;
            case 19:
                return 355000 - this.experience;
        }
    }
    needsLevelUp() {
        return (this.level === 1 && this.experience > 300)
            || (this.level === 2 && this.experience > 900)
            || (this.level === 3 && this.experience > 2700)
            || (this.level === 4 && this.experience > 6500)
            || (this.level === 5 && this.experience > 14000)
            || (this.level === 6 && this.experience > 23000)
            || (this.level === 7 && this.experience > 34000)
            || (this.level === 8 && this.experience > 48000)
            || (this.level === 9 && this.experience > 64000)
            || (this.level === 10 && this.experience > 85000)
            || (this.level === 10 && this.experience > 100000)
            || (this.level === 11 && this.experience > 120000)
            || (this.level === 12 && this.experience > 140000)
            || (this.level === 13 && this.experience > 165000)
            || (this.level === 15 && this.experience > 195000)
            || (this.level === 16 && this.experience > 225000)
            || (this.level === 17 && this.experience > 265000)
            || (this.level === 18 && this.experience > 305000)
            || (this.level === 19 && this.experience > 355000);
    }
    hitPoints() {
        let con = this.abilityScores.modifier(abilityScore_1.AbilityKind.Constitution);
        let base = this.characterClass.hitDie + con;
        let avg = data_1.Data.averageHpFor(this.characterClass.name);
        for (let i = 0; i < this.level; i++) {
            base += avg + con;
        }
        return base;
    }
    currentHealth() {
        return this.hitPoints() + this.tempHp - this.damage;
    }
    get speed() {
        if (this.characterClass.name == class_1.ClassKind.Barbarian && this.level > 4) {
            return this.race.speed + 10;
        }
        return this.race.speed;
    }
    static fromJson(json) {
        let ret = new Character(json.name, abilityScore_1.AbilityScores.fromJson(json.abilityScores), race_1.Race.fromJson(json.race), class_1.Class.fromJson(json.characterClass), background_1.Background.fromJson(json.background), Alignment.fromJson(json.alignment), json.experience, Height.fromJson(json.height), json.weight, json.eyeColor, json.inspiration, Armor.fromJson(json.armor), Armor.fromJson(json.shield), skills_1.Skills.fromJson(json.skills), json.weapons.map(Weapon.fromJson), Wealth.fromJson(json.wealth), json.languages, json.notes, json.damage, json.tempHp, json.magicItems.map(MagicItem.fromJson), json.expendables.map(ExpendableItem.fromJson));
        if (json.id) {
            ret.id = json.id;
        }
        return ret;
    }
}
Character.counter = 0;
exports.Character = Character;
var NormalLanguage;
(function (NormalLanguage) {
    NormalLanguage["Common"] = "Common";
    NormalLanguage["Dwarvish"] = "Dwarvish";
    NormalLanguage["Elvish"] = "Elvish";
    NormalLanguage["Halfling"] = "Halfling";
    NormalLanguage["Draconic"] = "Draconic";
    NormalLanguage["Gnomish"] = "Gnomish";
    NormalLanguage["Orc"] = "Orc";
    NormalLanguage["Infernal"] = "Infernal";
})(NormalLanguage = exports.NormalLanguage || (exports.NormalLanguage = {}));
var ClassLanguage;
(function (ClassLanguage) {
    ClassLanguage["ThievesCant"] = "Thieves' Cant";
    ClassLanguage["Druidic"] = "Druidic";
})(ClassLanguage = exports.ClassLanguage || (exports.ClassLanguage = {}));
var CharacterSize;
(function (CharacterSize) {
    CharacterSize["Small"] = "Small";
    CharacterSize["Medium"] = "Medium";
    CharacterSize["Large"] = "Large";
})(CharacterSize = exports.CharacterSize || (exports.CharacterSize = {}));
class Alignment {
    constructor(major, minor) {
        this.major = major;
        this.minor = minor;
    }
    toString() {
        if (this.major == AlignmentMajor.Neutral
            && this.minor == AlignmentMinor.Neutral) {
            return 'True Neutral';
        }
        return `${this.major} ${this.minor}`;
    }
    static LawfulGood() {
        return new Alignment(AlignmentMajor.Lawful, AlignmentMinor.Good);
    }
    static LawfulNeutral() {
        return new Alignment(AlignmentMajor.Lawful, AlignmentMinor.Neutral);
    }
    static LawfulEvil() {
        return new Alignment(AlignmentMajor.Lawful, AlignmentMinor.Evil);
    }
    static NeutralGood() {
        return new Alignment(AlignmentMajor.Neutral, AlignmentMinor.Good);
    }
    static TrueNeutral() {
        return new Alignment(AlignmentMajor.Neutral, AlignmentMinor.Neutral);
    }
    static NeutralEvil() {
        return new Alignment(AlignmentMajor.Neutral, AlignmentMinor.Evil);
    }
    static ChaoticGood() {
        return new Alignment(AlignmentMajor.Chaotic, AlignmentMinor.Good);
    }
    static ChaoticNeutral() {
        return new Alignment(AlignmentMajor.Chaotic, AlignmentMinor.Neutral);
    }
    static ChaoticEvil() {
        return new Alignment(AlignmentMajor.Chaotic, AlignmentMinor.Evil);
    }
    static fromJson(json) {
        return new Alignment(json.major, json.minor);
    }
}
exports.Alignment = Alignment;
var AlignmentMajor;
(function (AlignmentMajor) {
    AlignmentMajor["Lawful"] = "Lawful";
    AlignmentMajor["Neutral"] = "Neutral";
    AlignmentMajor["Chaotic"] = "Chaotic";
})(AlignmentMajor = exports.AlignmentMajor || (exports.AlignmentMajor = {}));
var AlignmentMinor;
(function (AlignmentMinor) {
    AlignmentMinor["Good"] = "Good";
    AlignmentMinor["Neutral"] = "Neutral";
    AlignmentMinor["Evil"] = "Evil";
})(AlignmentMinor = exports.AlignmentMinor || (exports.AlignmentMinor = {}));
class Height {
    constructor(feet = 5, inches = 9) {
        this.feet = feet;
        this.inches = inches;
    }
    toString() {
        return `${this.feet}' ${this.inches}"`;
    }
    static fromJson(json) {
        return new Height(json.feet, json.inches);
    }
}
exports.Height = Height;
class Save {
    constructor(kind, enabled, value) {
        this.kind = kind;
        this.enabled = enabled;
        this.value = value;
    }
    static fromJson(json) {
        return new Save(json.kind, json.enabled, json.value);
    }
}
exports.Save = Save;
class Armor {
    constructor(name, kind, bonus, dexLimit) {
        this.name = name;
        this.kind = kind;
        this.bonus = bonus;
        this.dexLimit = dexLimit;
    }
    static fromJson(json) {
        if (!json)
            return null;
        return new Armor(json.name, json.kind, json.bonus, json.dexLimit);
    }
}
exports.Armor = Armor;
var LightArmor;
(function (LightArmor) {
    LightArmor["Padded"] = "Padded";
    LightArmor["Leather"] = "Leather";
    LightArmor["StuddedLeather"] = "StuddedLeather";
})(LightArmor = exports.LightArmor || (exports.LightArmor = {}));
var MediumArmor;
(function (MediumArmor) {
    MediumArmor["Hide"] = "Hide";
    MediumArmor["ChainShirt"] = "ChainShirt";
    MediumArmor["ScaleMail"] = "ScaleMail";
    MediumArmor["BreastPlate"] = "BreastPlate";
    MediumArmor["HalfPlate"] = "HalfPlate";
})(MediumArmor = exports.MediumArmor || (exports.MediumArmor = {}));
var HeavyArmor;
(function (HeavyArmor) {
    HeavyArmor["RingMail"] = "RingMail";
    HeavyArmor["ChainMail"] = "ChainMail";
    HeavyArmor["Splint"] = "Splint";
    HeavyArmor["Plate"] = "Plate";
})(HeavyArmor = exports.HeavyArmor || (exports.HeavyArmor = {}));
var ArmorWeight;
(function (ArmorWeight) {
    ArmorWeight["Light"] = "Light";
    ArmorWeight["Medium"] = "Medium";
    ArmorWeight["Heavy"] = "Heavy";
    ArmorWeight["Shield"] = "Shield";
})(ArmorWeight = exports.ArmorWeight || (exports.ArmorWeight = {}));
class Weapon {
    constructor(name = 'Daggar', weaponType = WeaponType.Melee, kind = WeaponKind.Simple, damageKind = WeaponDamageKind.Piercing, weight = WeaponWeight.Light, handedness = WeaponHandedness.One, hitDie = [1, 4], range = new range_1.Range(5), carryWeight = 1, thrown = new range_1.Range(20, 60), isRanged = false, isFinesse = true, notes = '') {
        this.name = name;
        this.weaponType = weaponType;
        this.kind = kind;
        this.damageKind = damageKind;
        this.weight = weight;
        this.handedness = handedness;
        this.hitDie = hitDie;
        this.range = range;
        this.carryWeight = carryWeight;
        this.thrown = thrown;
        this.isRanged = isRanged;
        this.isFinesse = isFinesse;
        this.notes = notes;
    }
    miscString() {
        let ret = `${this.damageKind.substr(0, 1)}`;
        if (this.handedness) {
            ret += `/${this.handedness.substr(0, 1)}`;
        }
        if (this.weight) {
            ret += `/${this.weight.substr(0, 1).toLocaleLowerCase()}`;
        }
        if (this.isRanged) {
            ret += '/R';
        }
        if (this.thrown) {
            ret += '/T';
        }
        if (this.isFinesse) {
            ret += '/F';
        }
        ret += '/' + this.range.metaString();
        return ret;
    }
    static fromJson(json) {
        return new Weapon(json.name, json.weaponType, json.kind, json.damageKind, json.weight, json.handedness, json.hitDie, range_1.Range.fromJson(json.range), json.carryWeight, range_1.Range.fromJson(json.thrown), json.isRanged, json.isFinesse, json.notes);
    }
}
exports.Weapon = Weapon;
var StdWeaponName;
(function (StdWeaponName) {
    StdWeaponName["Battleaxe"] = "Battleaxe";
    StdWeaponName["HandAxe"] = "Hand Axe";
    StdWeaponName["ThrowingHammer"] = "Throwing Hammer";
    StdWeaponName["WarHammer"] = "War Hammer";
    StdWeaponName["LongSword"] = "Long Sword";
    StdWeaponName["ShortSword"] = "Short Sword";
    StdWeaponName["ShortBow"] = "Short Bow";
    StdWeaponName["LongBow"] = "Long Bow";
    StdWeaponName["Rapier"] = "Rapier";
    StdWeaponName["HandCrossbow"] = "Hand Crossbow";
    StdWeaponName["Club"] = "Club";
    StdWeaponName["Dagger"] = "Dagger";
    StdWeaponName["Dart"] = "Dart";
    StdWeaponName["Javelin"] = "Javelin";
    StdWeaponName["Mace"] = "Mace";
    StdWeaponName["QuarterStaff"] = "Quarter Staff";
    StdWeaponName["Scimitar"] = "Scimitar";
    StdWeaponName["Sickle"] = "Sickle";
    StdWeaponName["Sling"] = "Sling";
    StdWeaponName["LightCrossbow"] = "LightCrossbow";
    StdWeaponName["Spear"] = "Spear";
})(StdWeaponName = exports.StdWeaponName || (exports.StdWeaponName = {}));
var WeaponType;
(function (WeaponType) {
    WeaponType["Melee"] = "Melee";
    WeaponType["Range"] = "Range";
})(WeaponType = exports.WeaponType || (exports.WeaponType = {}));
var WeaponKind;
(function (WeaponKind) {
    WeaponKind["Simple"] = "Simple";
    WeaponKind["Martial"] = "Martial";
    WeaponKind["Natural"] = "Natural";
})(WeaponKind = exports.WeaponKind || (exports.WeaponKind = {}));
var WeaponDamageKind;
(function (WeaponDamageKind) {
    WeaponDamageKind["Piercing"] = "Piercing";
    WeaponDamageKind["Slashing"] = "Slashing";
    WeaponDamageKind["Bludgeoning"] = "Bludgeoning";
    WeaponDamageKind["Acid"] = "Acid";
    WeaponDamageKind["Fire"] = "Fire";
    WeaponDamageKind["Lightening"] = "Lightening";
    WeaponDamageKind["Cold"] = "Cold";
    WeaponDamageKind["Poison"] = "Poison";
})(WeaponDamageKind = exports.WeaponDamageKind || (exports.WeaponDamageKind = {}));
var WeaponWeight;
(function (WeaponWeight) {
    WeaponWeight["Light"] = "Light";
    WeaponWeight["Heavy"] = "Heavy";
})(WeaponWeight = exports.WeaponWeight || (exports.WeaponWeight = {}));
var WeaponHandedness;
(function (WeaponHandedness) {
    WeaponHandedness["One"] = "One";
    WeaponHandedness["Two"] = "Two";
    WeaponHandedness["Versatile"] = "Versatile";
})(WeaponHandedness = exports.WeaponHandedness || (exports.WeaponHandedness = {}));
class Wealth {
    constructor(copper = 0, silver = 0, electrum = 0, gold = 0, platinum = 0) {
        this.copper = copper;
        this.silver = silver;
        this.electrum = electrum;
        this.gold = gold;
        this.platinum = platinum;
        this.balance();
    }
    balance() {
        this.roundUp();
        this.roundDown();
    }
    clone() {
        return Wealth.fromJson(this);
    }
    add(other) {
        return new Wealth(this.copper + other.copper, this.silver + other.silver, this.electrum + other.electrum, this.gold + other.gold, this.platinum + other.platinum);
    }
    mul(mul) {
        return new Wealth(this.copper * mul, this.silver * mul, this.electrum * mul, this.gold * mul, this.platinum * mul);
    }
    roundUp() {
        while (this.copper > 99) {
            this.copper -= 100;
            this.silver++;
        }
        while (this.silver > 99) {
            this.silver -= 100;
            this.electrum++;
        }
        while (this.electrum > 99) {
            this.electrum -= 100;
            this.gold++;
        }
        while (this.gold > 99) {
            this.gold -= 100;
            this.platinum += 1;
        }
    }
    roundDown() {
        while (this.copper < -100) {
            this.silver--;
            this.copper += 100;
        }
        while (this.silver < -100) {
            this.electrum--;
            this.silver += 100;
        }
        while (this.electrum < -100) {
            this.gold--;
            this.electrum += 100;
        }
        while (this.gold < -100) {
            this.platinum--;
            this.gold += 100;
        }
    }
    static fromJson(json) {
        return new Wealth(json.copper || 0, json.silver || 0, json.electrum || 0, json.gold || 0, json.platinum || 0);
    }
}
exports.Wealth = Wealth;
class MagicItem {
    constructor(name, buf) {
        this.name = name;
        this.buf = buf;
    }
    static fromJson(json) {
        return new MagicItem(json.name, json.buf);
    }
}
exports.MagicItem = MagicItem;
class ExpendableItem {
    constructor(quantity, name, desc) {
        this.quantity = quantity;
        this.name = name;
        this.desc = desc;
    }
    static fromJson(json) {
        return new ExpendableItem(json.quantity, json.name, json.desc);
    }
}
exports.ExpendableItem = ExpendableItem;


/***/ }),

/***/ "./ts/models/class.ts":
/*!****************************!*\
  !*** ./ts/models/class.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const abilityScore_1 = __webpack_require__(/*! ./abilityScore */ "./ts/models/abilityScore.ts");
const character_1 = __webpack_require__(/*! ./character */ "./ts/models/character.ts");
const skills_1 = __webpack_require__(/*! ./skills */ "./ts/models/skills.ts");
const classDetails_1 = __webpack_require__(/*! ./classDetails */ "./ts/models/classDetails.ts");
const data_1 = __webpack_require__(/*! ../services/data */ "./ts/services/data.ts");
exports.DEFAULT_BONUS_ABILITY_SCORES = [
    [abilityScore_1.AbilityKind.Strength, 0],
    [abilityScore_1.AbilityKind.Dexterity, 0],
    [abilityScore_1.AbilityKind.Constitution, 0],
    [abilityScore_1.AbilityKind.Intelligence, 0],
    [abilityScore_1.AbilityKind.Wisdom, 0],
    [abilityScore_1.AbilityKind.Charisma, 0],
];
class Class {
    constructor(name, _level, bonusAbilityScores = exports.DEFAULT_BONUS_ABILITY_SCORES, selectedSkills = []) {
        this.name = name;
        this._level = _level;
        this.bonusAbilityScores = bonusAbilityScores;
        this.selectedSkills = selectedSkills;
        this.numberOfPrimaryAbilities = 1;
        this.savingThrows = [];
        this.weaponProfs = [];
        this.armorProfs = [];
        this.canUseShield = false;
        this.features = [];
        this.numberOfSkills = 0;
        this.availableSkills = [];
        this.miscProfs = [];
        this.isCaster = false;
        switch (name) {
            case ClassKind.Barbarian:
                this.barbarianCtor();
                break;
            case ClassKind.Bard:
                this.bardCtor();
                break;
            case ClassKind.Cleric:
                this.clericCtor();
                break;
            case ClassKind.Druid:
                this.druidCtor();
            case ClassKind.Fighter:
                this.fighterCtor();
                break;
            case ClassKind.Monk:
                this.monkCtor();
                break;
            case ClassKind.Paladin:
                this.paladinCtor();
                break;
            case ClassKind.Ranger:
                this.rangerCtor();
                break;
            case ClassKind.Rogue:
                this.rogueCtor();
                break;
            case ClassKind.Sorcerer:
                this.sorcererCtor();
                break;
            case ClassKind.Warlock:
                this.warlockCtor();
                break;
            case ClassKind.Wizard:
                this.wizardCtor();
                break;
        }
    }
    get level() {
        return this._level;
    }
    set level(value) {
        this._level = value;
        if (this.classDetails.level) {
            this.classDetails.level = value;
        }
    }
    proficiencyBonus() {
        return data_1.Data.proficiencyBonusFor(this.level);
    }
    barbarianCtor(details = new classDetails_1.BarbarianDetails(this._level, null, null)) {
        this.desc = 'A fierce warrior of primitive background who can enter a battle rage';
        this.classDetails = details;
        this.hitDie = 12;
        this.primaryAbility = [abilityScore_1.AbilityKind.Strength, abilityScore_1.AbilityKind.Constitution];
        this.savingThrows = [
            abilityScore_1.AbilityKind.Strength,
            abilityScore_1.AbilityKind.Constitution
        ];
        this.weaponProfs = [
            character_1.WeaponKind.Martial,
            character_1.WeaponKind.Simple
        ];
        this.armorProfs = [
            character_1.ArmorWeight.Light,
            character_1.ArmorWeight.Medium,
            character_1.ArmorWeight.Heavy
        ];
        this.canUseShield = true;
        this.numberOfSkills = 2;
        this.availableSkills = [
            skills_1.SkillKind.AnimalHandling,
            skills_1.SkillKind.Athletics,
            skills_1.SkillKind.Intimidation,
            skills_1.SkillKind.Nature,
            skills_1.SkillKind.Perception,
            skills_1.SkillKind.Survival,
        ];
    }
    bardCtor(details = new classDetails_1.BardDetails(this._level, null, [])) {
        this.desc = 'An inspiring magician whose power echoes the music of creation';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [abilityScore_1.AbilityKind.Charisma];
        this.isCaster = true;
        this.savingThrows = [
            abilityScore_1.AbilityKind.Charisma,
            abilityScore_1.AbilityKind.Dexterity,
        ];
        this.weaponProfs = [
            character_1.WeaponKind.Simple,
            character_1.StdWeaponName.HandCrossbow,
            character_1.StdWeaponName.LongSword,
            character_1.StdWeaponName.Rapier,
            character_1.StdWeaponName.ShortSword,
        ];
        this.armorProfs = [
            character_1.ArmorWeight.Light,
        ];
        this.numberOfSkills = 3;
        this.availableSkills = Object.getOwnPropertyNames(skills_1.SkillKind).map(n => skills_1.SkillKind[n]);
        if (this.classDetails.bardCollege === classDetails_1.BardCollege.Valor && this._level > 2) {
            this.weaponProfs.push(character_1.WeaponKind.Martial);
            this.armorProfs.push(character_1.ArmorWeight.Medium);
            this.canUseShield = true;
        }
        this.miscProfs = ['Musical Instrument'];
    }
    clericCtor(details = new classDetails_1.ClericDetails(this._level, null)) {
        this.desc = 'A priestly champion who wields divine magic in service of a higher power';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [abilityScore_1.AbilityKind.Wisdom];
        this.isCaster = true;
        this.savingThrows = [
            abilityScore_1.AbilityKind.Wisdom,
            abilityScore_1.AbilityKind.Charisma,
        ];
        this.weaponProfs = [
            character_1.WeaponKind.Simple,
        ];
        this.armorProfs = [
            character_1.ArmorWeight.Light,
            character_1.ArmorWeight.Medium,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            skills_1.SkillKind.History,
            skills_1.SkillKind.Insight,
            skills_1.SkillKind.Medicine,
            skills_1.SkillKind.Persuasion,
            skills_1.SkillKind.Religion,
        ];
        this.canUseShield = true;
    }
    druidCtor(details = new classDetails_1.DruidDetails(this._level, null)) {
        this.desc = 'A priest of the Old Faith, wielding lhe powers of nature-moonlight and plant growth, fire and lightning-and adopting animal forms';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [abilityScore_1.AbilityKind.Wisdom];
        this.isCaster = true;
        this.savingThrows = [
            abilityScore_1.AbilityKind.Wisdom,
            abilityScore_1.AbilityKind.Intelligence
        ];
        this.weaponProfs = [
            character_1.StdWeaponName.Club,
            character_1.StdWeaponName.Dagger,
            character_1.StdWeaponName.Dart,
            character_1.StdWeaponName.Javelin,
            character_1.StdWeaponName.Mace,
            character_1.StdWeaponName.QuarterStaff,
            character_1.StdWeaponName.Scimitar,
            character_1.StdWeaponName.Sickle,
            character_1.StdWeaponName.Spear,
        ];
        this.armorProfs = [
            character_1.ArmorWeight.Light,
            character_1.ArmorWeight.Medium,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            skills_1.SkillKind.Arcana,
            skills_1.SkillKind.AnimalHandling,
            skills_1.SkillKind.Insight,
            skills_1.SkillKind.Medicine,
            skills_1.SkillKind.Nature,
            skills_1.SkillKind.Perception,
            skills_1.SkillKind.Religion,
            skills_1.SkillKind.Survival,
        ];
        this.canUseShield = true;
    }
    fighterCtor(details = new classDetails_1.FighterDetails(this._level, null)) {
        this.desc = 'A master of martial combat, skilled with a variety of weapons and armor';
        this.classDetails = details;
        this.hitDie = 10;
        this.primaryAbility = [
            abilityScore_1.AbilityKind.Strength,
            abilityScore_1.AbilityKind.Dexterity,
        ];
        this.savingThrows = [
            abilityScore_1.AbilityKind.Strength,
            abilityScore_1.AbilityKind.Dexterity,
        ];
        this.armorProfs = [
            character_1.ArmorWeight.Light,
            character_1.ArmorWeight.Medium,
            character_1.ArmorWeight.Heavy,
        ];
        this.weaponProfs = [
            character_1.WeaponKind.Simple,
            character_1.WeaponKind.Martial,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            skills_1.SkillKind.Acrobatics,
            skills_1.SkillKind.AnimalHandling,
            skills_1.SkillKind.Athletics,
            skills_1.SkillKind.History,
            skills_1.SkillKind.Insight,
            skills_1.SkillKind.Intimidation,
            skills_1.SkillKind.Perception,
            skills_1.SkillKind.Survival,
        ];
        this.canUseShield = true;
    }
    monkCtor(details = new classDetails_1.MonkDetails(this._level)) {
        this.desc = 'An master of martial arts, harnessing the power of lhe body in pursuit of physical and spiritual perfection';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [
            abilityScore_1.AbilityKind.Dexterity,
            abilityScore_1.AbilityKind.Wisdom,
        ];
        this.numberOfPrimaryAbilities = 2;
        this.savingThrows = [
            abilityScore_1.AbilityKind.Strength,
            abilityScore_1.AbilityKind.Dexterity,
        ];
        this.armorProfs = [];
        this.weaponProfs = [
            character_1.WeaponKind.Simple,
            character_1.StdWeaponName.ShortSword,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            skills_1.SkillKind.Acrobatics,
            skills_1.SkillKind.Athletics,
            skills_1.SkillKind.History,
            skills_1.SkillKind.Insight,
            skills_1.SkillKind.Religion,
            skills_1.SkillKind.Stealth,
        ];
    }
    paladinCtor(details = new classDetails_1.PaladinDetails(this._level, null, null)) {
        this.desc = 'A holy warrior bound to a sacred oath';
        this.classDetails = details;
        this.hitDie = 10;
        this.primaryAbility = [
            abilityScore_1.AbilityKind.Strength,
            abilityScore_1.AbilityKind.Charisma,
        ];
        this.numberOfPrimaryAbilities = 2;
        this.isCaster = true;
        this.savingThrows = [
            abilityScore_1.AbilityKind.Wisdom,
            abilityScore_1.AbilityKind.Charisma,
        ];
        this.canUseShield = true;
        this.armorProfs = [
            character_1.ArmorWeight.Light,
            character_1.ArmorWeight.Medium,
            character_1.ArmorWeight.Heavy,
        ];
        this.weaponProfs = [
            character_1.WeaponKind.Martial,
            character_1.WeaponKind.Simple,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            skills_1.SkillKind.Athletics,
            skills_1.SkillKind.Insight,
            skills_1.SkillKind.Intimidation,
            skills_1.SkillKind.Medicine,
            skills_1.SkillKind.Persuasion,
            skills_1.SkillKind.Religion,
        ];
    }
    rangerCtor(details = new classDetails_1.RangerDetails(this._level, null)) {
        this.desc = 'A warrior who uses martial prowess and nature magic lo combat threats on lhe edges of civilization';
        this.classDetails = details;
        this.hitDie = 10;
        this.primaryAbility = [
            abilityScore_1.AbilityKind.Dexterity,
            abilityScore_1.AbilityKind.Wisdom,
        ];
        this.numberOfPrimaryAbilities = 2;
        if (this._level > 1) {
            this.isCaster = true;
        }
        this.savingThrows = [
            abilityScore_1.AbilityKind.Strength,
            abilityScore_1.AbilityKind.Dexterity,
        ];
        this.armorProfs = [
            character_1.ArmorWeight.Light,
            character_1.ArmorWeight.Medium,
        ];
        this.canUseShield = true;
        this.weaponProfs = [
            character_1.WeaponKind.Simple,
            character_1.WeaponKind.Martial,
        ];
        this.numberOfSkills = 3;
        this.availableSkills = [
            skills_1.SkillKind.AnimalHandling,
            skills_1.SkillKind.Athletics,
            skills_1.SkillKind.Insight,
            skills_1.SkillKind.Investigation,
            skills_1.SkillKind.Nature,
            skills_1.SkillKind.Perception,
            skills_1.SkillKind.Stealth,
            skills_1.SkillKind.Survival,
        ];
    }
    rogueCtor(details = new classDetails_1.RogueDetails(this.level, null, [])) {
        this.desc = 'A scoundrel who uses stealth and trickery to overcome obstacles and enemies';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [abilityScore_1.AbilityKind.Dexterity];
        this.savingThrows = [
            abilityScore_1.AbilityKind.Strength,
            abilityScore_1.AbilityKind.Dexterity,
        ];
        this.armorProfs = [
            character_1.ArmorWeight.Light,
            character_1.ArmorWeight.Medium,
        ];
        this.canUseShield = true;
        this.isCaster = details.archType === classDetails_1.RoguishArchType.ArcaneTrickster;
        this.weaponProfs = [
            character_1.WeaponKind.Simple,
            character_1.StdWeaponName.HandCrossbow,
            character_1.StdWeaponName.LongSword,
            character_1.StdWeaponName.Rapier,
            character_1.StdWeaponName.ShortSword,
        ];
        this.numberOfSkills = 4;
        this.availableSkills = [
            skills_1.SkillKind.Acrobatics,
            skills_1.SkillKind.Athletics,
            skills_1.SkillKind.Deception,
            skills_1.SkillKind.Insight,
            skills_1.SkillKind.Intimidation,
            skills_1.SkillKind.Investigation,
            skills_1.SkillKind.Perception,
            skills_1.SkillKind.Performance,
            skills_1.SkillKind.Persuasion,
            skills_1.SkillKind.SleightOfHand,
            skills_1.SkillKind.Stealth,
        ];
    }
    sorcererCtor(details = new classDetails_1.SorcererDetails(this._level, null, null)) {
        this.desc = 'A spell caster who draws on inherent magic from a gift or bloodline';
        this.classDetails = details;
        this.hitDie = 6;
        this.primaryAbility = [abilityScore_1.AbilityKind.Charisma];
        this.isCaster = true;
        this.savingThrows = [
            abilityScore_1.AbilityKind.Constitution,
            abilityScore_1.AbilityKind.Charisma,
        ];
        this.weaponProfs = [
            character_1.StdWeaponName.Dagger,
            character_1.StdWeaponName.Sling,
            character_1.StdWeaponName.Dart,
            character_1.StdWeaponName.QuarterStaff,
            character_1.StdWeaponName.LightCrossbow,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            skills_1.SkillKind.Arcana,
            skills_1.SkillKind.Deception,
            skills_1.SkillKind.Insight,
            skills_1.SkillKind.Intimidation,
            skills_1.SkillKind.Persuasion,
            skills_1.SkillKind.Religion,
        ];
    }
    warlockCtor(details = new classDetails_1.WarlockDetails(this._level, null)) {
        this.desc = 'A wielder of magic that is derived from a bargain with an extra-planar entity';
        this.classDetails = details;
        this.hitDie = 8;
        this.primaryAbility = [abilityScore_1.AbilityKind.Charisma];
        this.isCaster = true;
        this.savingThrows = [
            abilityScore_1.AbilityKind.Wisdom,
            abilityScore_1.AbilityKind.Charisma,
        ];
        this.armorProfs = [
            character_1.ArmorWeight.Light,
        ];
        this.weaponProfs = [
            character_1.WeaponKind.Simple,
        ];
        this.numberOfSkills = 2;
        this.availableSkills = [
            skills_1.SkillKind.Arcana,
            skills_1.SkillKind.Deception,
            skills_1.SkillKind.History,
            skills_1.SkillKind.Intimidation,
            skills_1.SkillKind.Investigation,
            skills_1.SkillKind.Nature,
            skills_1.SkillKind.Religion,
        ];
    }
    wizardCtor(details = new classDetails_1.WizardDetails(this._level, null)) {
        this.desc = 'A scholarly magic-user capable of manipulating lhe structures of reality';
        this.classDetails = details;
        this.hitDie = 6;
        this.primaryAbility = [abilityScore_1.AbilityKind.Intelligence];
        this.isCaster = true;
        this.savingThrows = [
            abilityScore_1.AbilityKind.Intelligence,
            abilityScore_1.AbilityKind.Wisdom,
        ];
        this.weaponProfs = [
            character_1.StdWeaponName.Dagger,
            character_1.StdWeaponName.Dart,
            character_1.StdWeaponName.Sling,
            character_1.StdWeaponName.QuarterStaff,
            character_1.StdWeaponName.LightCrossbow,
        ];
        this.armorProfs = [];
        this.numberOfSkills = 2;
        this.availableSkills = [
            skills_1.SkillKind.Arcana,
            skills_1.SkillKind.History,
            skills_1.SkillKind.Insight,
            skills_1.SkillKind.Investigation,
            skills_1.SkillKind.Medicine,
            skills_1.SkillKind.Religion,
        ];
    }
    addLevel() {
        this.level += 1;
    }
    static fromJson(json) {
        let ret = new Class(null, json._level, json.bonusAbilityScores, json.availableSkills);
        ret.name = json.name;
        switch (json.name) {
            case ClassKind.Barbarian:
                ret.barbarianCtor(classDetails_1.BarbarianDetails.fromJson(json.classDetails));
                break;
            case ClassKind.Bard:
                ret.bardCtor(classDetails_1.BardDetails.fromJson(json.classDetails));
                break;
            case ClassKind.Cleric:
                ret.clericCtor(classDetails_1.ClericDetails.fromJson(json.classDetails));
                break;
            case ClassKind.Druid:
                ret.druidCtor(classDetails_1.DruidDetails.fromJson(json.classDetails));
                break;
            case ClassKind.Fighter:
                ret.fighterCtor(classDetails_1.FighterDetails.fromJson(json.classDetails));
                break;
            case ClassKind.Monk:
                ret.monkCtor(classDetails_1.MonkDetails.fromJson(json.classDetails));
                break;
            case ClassKind.Paladin:
                ret.paladinCtor(classDetails_1.PaladinDetails.fromJson(json.classDetails));
                break;
            case ClassKind.Ranger:
                ret.rangerCtor(classDetails_1.RangerDetails.fromJson(json.classDetails));
                break;
            case ClassKind.Rogue:
                ret.rogueCtor(classDetails_1.RogueDetails.fromJson(json.classDetails));
                break;
            case ClassKind.Sorcerer:
                ret.sorcererCtor(classDetails_1.SorcererDetails.fromJson(json.classDetails));
                break;
            case ClassKind.Warlock:
                ret.warlockCtor(classDetails_1.WarlockDetails.fromJson(json.classDetails));
                break;
            case ClassKind.Wizard:
                ret.wizardCtor(classDetails_1.WizardDetails.fromJson(json.classDetails));
                break;
        }
        return ret;
    }
}
exports.Class = Class;
var ClassKind;
(function (ClassKind) {
    ClassKind["Barbarian"] = "Barbarian";
    ClassKind["Bard"] = "Bard";
    ClassKind["Cleric"] = "Cleric";
    ClassKind["Druid"] = "Druid";
    ClassKind["Fighter"] = "Fighter";
    ClassKind["Monk"] = "Monk";
    ClassKind["Paladin"] = "Paladin";
    ClassKind["Ranger"] = "Ranger";
    ClassKind["Rogue"] = "Rogue";
    ClassKind["Sorcerer"] = "Sorcerer";
    ClassKind["Warlock"] = "Warlock";
    ClassKind["Wizard"] = "Wizard";
})(ClassKind = exports.ClassKind || (exports.ClassKind = {}));


/***/ }),

/***/ "./ts/models/classDetails.ts":
/*!***********************************!*\
  !*** ./ts/models/classDetails.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = __webpack_require__(/*! ./class */ "./ts/models/class.ts");
const note_1 = __webpack_require__(/*! ./note */ "./ts/models/note.ts");
class BarbarianDetails {
    constructor(level, primalPath = null, totem = []) {
        this.level = level;
        this.primalPath = primalPath;
        this.totem = totem;
    }
    static fromJson(json) {
        return new BarbarianDetails(json.level, json.primalPath, json.totem);
    }
    notes(level) {
        if (!level) {
            level = this.level;
        }
        let ret = [
            new note_1.Note(`Rage`, `${this.dailyRages} times daily, you rage for 1 minute (10 rounds)`, `You can enter into a rage a certain number of times depending on your level. 
            During that time you have the following benefits.
            - Advantage on Strength Checks,
            - +${this.rageDamage} damage on Strength based attacks,
            - Resistance to bludgeoning, piercing and slashing damage (halve damage)
            A rage last for 1 minute which is 10 round of combat, you can be forced to end your rage early in one of the following situations.
            - You do not attempt to attack an opponent on your turn
            - You are knocked unconscious
            Rages are only regained after a long rest`),
            new note_1.Note('Unarmored Defense', 'When not wearing armor your AC = 10 + DEX + CON (can use shield)', `When not wearing any armor your calculate your Armor Class by adding your dexterity and constitution modifiers to 10.
                    If you are carrying a shield add the bonus from that as well.`),
        ];
        if (level > 1) {
            ret.push(new note_1.Note('Reckless Attack', 'Your first attack on a turn can be declared reckless giving you advantage on attack rolls that use strength but attack rolls against you have the advantage until the rest of your turn', ''));
            ret.push(new note_1.Note('Danger Sense', 'You have the advantage on DEX saving throws against effects you an see', ''));
        }
        if (level > 2) {
            ret.push(new note_1.Note('Primal Path', this.pathDesc(), ''));
            if (this.primalPath) {
                ret.push(...this.pathNotes());
            }
        }
        if (level > 3 && level < 8) {
            ret.push(new note_1.Note('Bonus Ability Scores', '2', ''));
        }
        if (level > 7 && level < 12) {
            ret.push(new note_1.Note('Bonus Ability Scores', '4', ''));
        }
        if (level > 11 && level < 16) {
            ret.push(new note_1.Note('Bonus Ability Scores', '6', ''));
        }
        if (level > 15 && level < 19) {
            ret.push(new note_1.Note('Bonus Ability Scores', '8', ''));
        }
        if (level > 18) {
            ret.push(new note_1.Note('Bonus Ability Scores', '10', ''));
        }
        if (level > 4) {
            ret.push(new note_1.Note('Extra Attack', 'You can attack twice on your turn', ''));
            ret.push(new note_1.Note('Fast Movement', 'Add 10 to your movement speed', ''));
        }
        if (level > 6) {
            ret.push(new note_1.Note('Feral Instinct', 'Advantage on Initiative rolls, if surprised at the beginning of combat you act normally on your first turn if you immediately rage', ''));
        }
        if (level > 8) {
            ret.push(new note_1.Note('Brutal Critical', `Add ${this.brutalCriticalDice} to your critical damage rolls`, ''));
        }
        if (level > 10) {
            ret.push(new note_1.Note('Relentless Rage', 'If you drop to 0HP you can make a CON save to drop to 1, DC starts at 10 and goes up by 5 for each attempt per day', ''));
        }
        if (level > 14) {
            ret.push(new note_1.Note('Persistent Rage', 'Rage no longer ends early if you don\'t attack an enemy your turn', ''));
        }
        if (level > 17) {
            ret.push(new note_1.Note('Indomitable Might', 'If your total for a STR check is less than your STR score you can use your STR score instead', ''));
        }
        if (level > 19) {
            ret.push(new note_1.Note('Primal Champion', 'Add 4 to your STR and CON scores (max 24)', ''));
        }
        return ret;
    }
    pathDesc() {
        if (!this.primalPath) {
            return 'Choose between Berserker or Totem Warrior';
        }
        else {
            return this.primalPath;
        }
    }
    pathNotes() {
        let ret = [];
        switch (this.primalPath) {
            case PrimalPath.Berserker:
                if (this.level > 2) {
                    ret.push(new note_1.Note('Frenzy', 'While raging you can go into a frenzy, each turn after you get a single melee attack as a bonus action. (1 level of Exhaustion when rage ends see PHB 291)', ''));
                }
                if (this.level > 5) {
                    ret.push(new note_1.Note('Mindless Rage', 'Can\'t be charmed or frightened while raging', ''));
                }
                if (this.level > 9) {
                    ret.push(new note_1.Note('Intimidating Presence', 'Can use action to frighten someone DC 8 + proficiency bonus + CHA, failed attempt you can\'t use this again for 24 hours', ''));
                }
                if (this.level > 13) {
                    ret.push(new note_1.Note('Retaliation', 'When you take damage from a creature within 5 feet of you you can make a melee weapon attack against that target', ''));
                }
                break;
            case PrimalPath.TotemWarrior:
                return this.totemNotes();
        }
        return ret;
    }
    totemNotes() {
        let ret = [];
        ret.push('- Spirit Seeker: cast Beast Sense and Speak with Animals as Rituals');
        if (this.totem.length > 0) {
            for (let i = 0; i < this.totem.length; i++) {
                switch (this.totem[i]) {
                    case Totem.Bear:
                        ret.push(this.bearNotes(i + 1));
                        break;
                    case Totem.Eagle:
                        ret.push(this.eagleNotes(i + 1));
                        break;
                    case Totem.Wolf:
                        ret.push(this.wolfNotes(i + 1));
                        break;
                }
            }
        }
        if (this.level > 9) {
            let spirit = this.totem[0] === this.totem[1] ? this.totem[0] : `${this.totem[0]} or ${this.totem[1]}`;
            ret.push(`- Spirit Walker You can cast commune with nature as a ritual (spirit will be ${spirit})`);
        }
        return ret;
    }
    bearNotes(level) {
        if (level === 1) {
            return new note_1.Note('Spirit Totem (Bear)', 'While raging you have resistance to all damage but psychic', '');
        }
        if (level === 2) {
            return new note_1.Note('Aspect of the Beast (Bear)', 'You double your carrying capacity and have advantage on STR checks to push, pull, lift or break objects', '');
        }
        if (level === 3) {
            return new note_1.Note('Totemic Attunement (Bear)', 'While raging enemies withing 5 feet of you have disadvantage on attack rolls against others (enemy must be able to see you can be frightened)', '');
        }
    }
    eagleNotes(level) {
        if (level === 1) {
            return new note_1.Note('Spirit Totem (Eagle)', 'While raging you can Dash as bonus action, enemies have disadvantage on opportunity attacks', '');
        }
        if (level === 2) {
            return new note_1.Note('Aspect of the Beast (Eagle)', 'You can see up to 1 mile with no difficulty as though it were 100 ft, dim light doesn\'t impose a disadvantage on perception checks', '');
        }
        if (level === 3) {
            return new note_1.Note('Totemic Attunement (Eagle)', 'While raging you have a flying speed equal to your current walking speed, if you end your turn in the air you fall', '');
        }
    }
    wolfNotes(level) {
        if (level === 1) {
            return new note_1.Note('Spirit Totem (Wolf)', 'While raging your friends have advantage on attack rolls against any creature within 5 ft of you', '');
        }
        if (level === 2) {
            return new note_1.Note('Aspect of the Beast (Wolf)', 'You can track at a fast pace, can move stealthily at normal pace', '');
        }
        if (level === 3) {
            return new note_1.Note('Totemic Attunement (Wolf)', 'While raging you can use a bonus action to knock a large (or smaller) creature prone after a successful hit with a melee weapon attack', '');
        }
    }
    get dailyRages() {
        if (this.level < 3) {
            return 2;
        }
        if (this.level < 6) {
            return 3;
        }
        if (this.level < 12) {
            return 4;
        }
        if (this.level < 17) {
            return 5;
        }
        if (this.level < 20) {
            return 6;
        }
        return Infinity;
    }
    get rageDamage() {
        if (this.level < 9) {
            return 2;
        }
        if (this.level < 16) {
            return 3;
        }
        return 4;
    }
    get brutalCriticalDice() {
        if (this.level < 9) {
            return 0;
        }
        if (this.level < 13) {
            return 1;
        }
        if (this.level < 17) {
            return 2;
        }
        return 3;
    }
}
exports.BarbarianDetails = BarbarianDetails;
var PrimalPath;
(function (PrimalPath) {
    PrimalPath["Berserker"] = "Berserker";
    PrimalPath["TotemWarrior"] = "Totem Warrior";
})(PrimalPath = exports.PrimalPath || (exports.PrimalPath = {}));
var Totem;
(function (Totem) {
    Totem["Bear"] = "Bear";
    Totem["Eagle"] = "Eagle";
    Totem["Wolf"] = "Wolf";
})(Totem = exports.Totem || (exports.Totem = {}));
class BardDetails {
    constructor(level, bardCollege = null, expertise = []) {
        this.level = level;
        this.bardCollege = bardCollege;
        this.expertise = expertise;
    }
    notes() {
        let ret = [
            new note_1.Note('Spell Casting', 'Your music and/or voice is imbued with magic', `Your music and/or voice is imbued with magic.
                    This magic can support and inspire allies or deflate and hurt foes.`),
            new note_1.Note(`Bardic Inspiration`, `You can bestow a 1d${this.bardicInspirationDie} on any ally equal to your DEX mod per day, this die can be used to augment and skill, attack or saving roll before or after the roll. Must be declared before DM says it was successful or not, must be used within 10 minutes`, `You can doll out inspiration like a currency boosting the dice rolls of your allies.
                    The number of times you can do this and how powerful the effect is increases as you level.
                    Any inspired ally must use this effect within 10 minutes.
                    You regain this ability after a long rest.`),
        ];
        if (this.level > 1) {
            ret.push(new note_1.Note('Jack of All Trades', 'Add half your proficiency bonus (rounded down) to any ability check that doesn\'t include your proficiency bonus', ''));
            ret.push(new note_1.Note(`Song of Rest`, `You can sing/orate during a short rest, all allies gain an additional ${this.songOfRestDice} HP`, ''));
        }
        if (this.level > 2) {
            ret.push(new note_1.Note(`Bard College`, this.collegeDesc(), ''));
            ret.push(...this.collegeNotes());
            ret.push(new note_1.Note('Expertise', 'Double your proficiency bonus on 2 skills', ''));
        }
        if (this.level > 3 && this.level < 8) {
            ret.push(new note_1.Note('Bonus Ability Scores', '2', ''));
        }
        if (this.level > 7 && this.level < 12) {
            ret.push(new note_1.Note('Bonus Ability Scores', '4', ''));
        }
        if (this.level > 11 && this.level < 16) {
            ret.push(new note_1.Note('Bonus Ability Scores', '6', ''));
        }
        if (this.level > 15 && this.level < 19) {
            ret.push(new note_1.Note('Bonus Ability Scores', '8', ''));
        }
        if (this.level > 18) {
            ret.push(new note_1.Note('Bonus Ability Scores', '10', ''));
        }
        if (this.level > 4) {
            ret.push(new note_1.Note('Font of Inspiration', 'You regain all expended uses of Bardic Inspiration when you finish a short of long rest', ''));
        }
        if (this.level > 5) {
            ret.push(new note_1.Note('Counter-charm', 'You can use music or words to disrupt mind-influencing effects as an action on your turn, during which you and any allies within 30 ft have the advantage on saving throws again fear or charm', ''));
        }
        if (this.level > 9) {
            ret.push(new note_1.Note(`Magical Secrets`, `You can choose to add ${this.magicalSecrets} spells from any spell book to your know spells so long as it meets your caster level`, ''));
        }
        if (this.level > 19) {
            ret.push(new note_1.Note('Superior Inspiration', 'When your roll initiative and have no Bardic Inspiration left you regain one', ''));
        }
        return ret;
    }
    get bardicInspirationDie() {
        if (this.level < 5) {
            return 6;
        }
        if (this.level > 10) {
            return 8;
        }
        if (this.level < 15) {
            return 10;
        }
        return 12;
    }
    get expertiseCount() {
        if (this.level > 2) {
            return 2;
        }
        if (this.level > 9) {
            return 4;
        }
        return 0;
    }
    get magicalSecrets() {
        let ret = 0;
        if (this.level > 5 && this.bardCollege === BardCollege.Lore) {
            ret += 2;
        }
        if (this.level > 9) {
            ret += 2;
        }
        if (this.level > 13) {
            ret += 2;
        }
        if (this.level > 17) {
            ret += 2;
        }
        return ret;
    }
    collegeDesc() {
        if (!this.bardCollege) {
            return 'Choose between the College of Lore or Valor';
        }
        return this.bardCollege;
    }
    collegeNotes() {
        let ret = [];
        switch (this.bardCollege) {
            case BardCollege.Lore:
                if (this.level > 2) {
                    ret.push(new note_1.Note('Bonus Proficiencies', 'Become proficient in 3 additional skills', ''));
                    ret.push(new note_1.Note('Cutting Words', 'When an enemy within 30 feet makes an attack roll you can use a Bardic Inspiration roll to remove that number of points from their roll', ''));
                }
                if (this.level > 5) {
                    ret.push(new note_1.Note('Additional Magical Secrets', 'You gain 2 new spells from any spell book, these do not count against your known spells', ''));
                }
                if (this.level > 13) {
                    ret.push(new note_1.Note('Peerless Skill', 'You can use Bardic Inspiration on yourself', ''));
                }
            case BardCollege.Valor:
                if (this.level > 2) {
                    ret.push(new note_1.Note('Bonus Proficiencies', 'Become proficient in Medium Armor, Shields, and Martial Weapons', ''));
                }
                if (this.level > 5) {
                    ret.push(new note_1.Note('Extra Attack', 'If you attack on your action you can attack twice', ''));
                }
                if (this.level > 13) {
                    ret.push(new note_1.Note('Battle Magic', 'When you use a bard spell on your action you can attack as a bonus action', ''));
                }
        }
        return ret;
    }
    get songOfRestDice() {
        if (this.level === 1) {
            return 'no';
        }
        if (this.level < 9) {
            return '1d6';
        }
        if (this.level < 13) {
            return '1d8';
        }
        if (this.level < 17) {
            return '1d10';
        }
        return '1d12';
    }
    cantripsKnown() {
        if (this.level < 4) {
            return 2;
        }
        if (this.level < 10) {
            return 3;
        }
        return 4;
    }
    spellsKnown() {
        if (this.level < 10) {
            return this.level + 3;
        }
        switch (this.level) {
            case 10:
                return 14;
            case 11:
            case 12:
                return 15;
            case 13:
                return 16;
            case 14:
                return 18;
            case 15:
            case 16:
                return 19;
            case 17:
                return 20;
            default:
                return 22;
        }
    }
    spellSlots() {
        switch (this.level) {
            case 1:
                return [2, 0, 0, 0, 0, 0, 0, 0, 0];
            case 2:
                return [3, 0, 0, 0, 0, 0, 0, 0, 0];
            case 3:
                return [4, 2, 0, 0, 0, 0, 0, 0, 0];
            case 4:
                return [4, 3, 0, 0, 0, 0, 0, 0, 0];
            case 5:
                return [4, 3, 2, 0, 0, 0, 0, 0, 0];
            case 6:
                return [4, 3, 3, 0, 0, 0, 0, 0, 0];
            case 7:
                return [4, 3, 3, 1, 0, 0, 0, 0, 0];
            case 8:
                return [4, 3, 3, 2, 0, 0, 0, 0, 0];
            case 9:
                return [4, 3, 3, 3, 1, 0, 0, 0, 0];
            case 10:
                return [4, 3, 3, 3, 2, 0, 0, 0, 0];
            case 11:
            case 12:
                return [4, 3, 3, 3, 2, 1, 0, 0, 0];
            case 13:
            case 14:
                return [4, 3, 3, 3, 2, 1, 1, 0, 0];
            case 15:
            case 16:
                return [4, 3, 3, 3, 2, 1, 1, 1, 0];
            case 17:
                return [4, 3, 3, 3, 2, 1, 1, 1, 1];
            case 18:
                return [4, 3, 3, 3, 3, 1, 1, 1, 1];
            case 19:
                return [4, 3, 3, 3, 3, 2, 1, 1, 1];
            case 20:
                return [4, 3, 3, 3, 3, 2, 2, 1, 1];
        }
    }
    static fromJson(json) {
        return new BardDetails(json.level, json.barbCollege, json.expertise);
    }
}
exports.BardDetails = BardDetails;
var BardCollege;
(function (BardCollege) {
    BardCollege["Lore"] = "College of Lore";
    BardCollege["Valor"] = "College of Valor";
})(BardCollege = exports.BardCollege || (exports.BardCollege = {}));
class ClericDetails {
    constructor(level, domain) {
        this.level = level;
        this.domain = domain;
    }
    notes() {
        let ret = [
            new note_1.Note('Spell Casting', 'Your religious pursuits have enable you to wield magic', `Your god has betrothed you the ability to wield magic, this gift does not come unchecked, your available spells are restricted by the god you worship.`),
            new note_1.Note('Divine Domain', this.domainDesc(), this.longDomainDesc()),
        ];
        if (this.level > 2) {
            ret.push(new note_1.Note('Channel Divinity', `You can channel energy directly from your god ${this.channels} times before resting`, `Your connection to the divine is so strong that you are able to act as a conduit for your god's will.
                    A certain number of times per day between long or short rests you can invoke a prayer that will impact the world around you.`));
            ret.push(...this.availableChannels());
        }
        if (this.level > 3 && this.level < 8) {
            ret.push(new note_1.Note('Bonus Ability Scores', '2', ''));
        }
        if (this.level > 7 && this.level < 12) {
            ret.push(new note_1.Note('Bonus Ability Scores', '4', ''));
        }
        if (this.level > 11 && this.level < 16) {
            ret.push(new note_1.Note('Bonus Ability Scores', '6', ''));
        }
        if (this.level > 15 && this.level < 19) {
            ret.push(new note_1.Note('Bonus Ability Scores', '8', ''));
        }
        if (this.level > 18) {
            ret.push(new note_1.Note('Bonus Ability Scores', '10', ''));
        }
        return ret;
    }
    get channels() {
        if (this.level < 6) {
            return 1;
        }
        if (this.level < 18) {
            return 2;
        }
        return 3;
    }
    availableChannels() {
        let ret = [
            new note_1.Note('Channel Divinity - Turn Undead', 'Each undead that can hear you within 30 feet will spend the next 1 minute trying to get as far away from you as possible', ''),
        ];
        ret.push(...this.domainChannels());
        if (this.level > 4) {
            ret.push(new note_1.Note('Channel Divinity - Destroy Undead', `Successfully turning undead with a challenge ranting of ${this.destroyUndeadCR()} or lower destroys that creature`, ''));
        }
        if (this.level > 9) {
            ret.push(new note_1.Note('Channel Divinity - Divine Intervention', 'You can choose to call on your deity for extreme intervention, roll your percentile dice, if the value is below your cleric level your deity intervenes (DM chooses the nature of the intervention) on success you must wait 7 days before using again on failure you must rest', ''));
        }
        return ret;
    }
    destroyUndeadCR() {
        if (this.level < 8) {
            return 0.5;
        }
        if (this.level < 11) {
            return 1;
        }
        if (this.level < 14) {
            return 2;
        }
        if (this.level < 16) {
            return 3;
        }
        return 4;
    }
    domainChannels() {
        let ret = [];
        switch (this.domain) {
            case ClericDomain.Knowledge:
                if (this.level > 1) {
                    ret.push(new note_1.Note('Channel Divinity: Knowledge of the Ages', 'For 10 minutes you have proficiency with a chosen skill or tool', ''));
                }
                if (this.level > 5) {
                    ret.push(new note_1.Note('Channel Divinity: Read Thoughts', '', ''));
                }
                break;
            case ClericDomain.Life:
                break;
            case ClericDomain.Light:
                break;
            case ClericDomain.Nature:
                break;
            case ClericDomain.Tempest:
                break;
            case ClericDomain.Trickery:
                break;
            case ClericDomain.War:
                break;
        }
        return ret;
    }
    domainDesc() {
        if (!this.domain) {
            return 'Choose between Knowledge, Life, Light, Nature, Tempest, Trickery, or War';
        }
        return this.domain;
    }
    longDomainDesc() {
        switch (this.domain) {
            case ClericDomain.Knowledge:
                return 'The gods of knowledge-including Gilean, Aureon, \
                    and Thoth-value learning and understanding above all. \
                    Some teach that knowledge is to be gathered and \
                    shared in libraries and universities, or promote \
                    the practical knowledge of craft and invention. \
                    Some deities hoard knowledge and keep its secrets \
                    to themselves. And some promise their followers \
                    that they will gain tremendous power if they \
                    unlock the secrets of the multiverse. Followers \
                    of these gods study esoteric lore, collect old \
                    tomes, delve into the secret places of the earth, \
                    and learn all they can to Some gods of knowledge \
                    promote the practical knowledge of craft and invention, \
                    including smith deities like Gond, Reorx, Onatar, \
                    Moradin, Hephaestus, and Goibhniu.';
            case ClericDomain.Life:
                return 'The Life domain focuses on the vibrant positive energy-one of the fundamental \
                    forces of the universe-that sustains all ife. The gods of life promote vitality and \
                    health through healing the sick and wounded, caring for those in need, and driving away \
                    the forces of death and undeath. Almost any non-evil deity can claim influence over this \
                    domain, particularly agricultural deities (such as Chauntea, Arawai, and Demeter), sun gods \
                    (such as Lathander, Pelor, and Re-Horakhty), gods of healing or endurance (such as IlIllatcr, \
                    Mishakal, Apollo, and Diancecht), and gods of home and community (such as Hestia, Hathor, and Boldrei).';
            case ClericDomain.Light:
                return 'Gods of light-including Helm, Lathander, Pholtus, Branchala, the Silver Flame, Belenus, Apollo, and Re-Horakty-\
                    promote the ideals of rebirth and renewal, truth, vigilance, adn beauty, often using the symbol of the sun. Some \
                    of these gods are portrayed as the sun itself or as a charioteer who guides the sun across the sky. Others \
                    are tireless sentinels whose eyes pierce every shadow and see through ever deception. Some are deities of beauty and \
                    artistry, who teach that art is a vehicle for the soul\'s improvement. Clerics of a god of light are enlightened souls \
                    infused with radiance and the power of their god\'s discerning vision, charged with chasing away lies and burning \
                    away darkness.';
            case ClericDomain.Nature:
                return 'Gods of nature are as varied as the natural world \
                    itself, from illscrutable gods of the deep forests (such \
                    as Silvanus, Obad-Hai, Chislev, Balinor, and Pan) to friendly \
                    deities associated with particular springs and groves (such as Eldath). \
                    Druids revere nature as a whole and might serve one of these deities, \
                    practicing mysterious rites and reciting all-but-forgotten prayers in \
                    their own secret tongue. But many of these gods have clerics as well, \
                    champions who take a more active role in advancing the interests of a \
                    particular nature god. These clerics might hunt the evil monstrosities \
                    that despoil the woodlands, bless the harvest of the faithful, or \
                    wither the crops of those who anger their gods.';
            case ClericDomain.Tempest:
                return 'Gods whose portfolios include the Tempest domain- including \
                    Talos, Umberlee, Kord, Zeboim, the Devourer, Zeus, and Thor-govern \
                    storms, sea, and sky. They include gods of lightning and thunder, gods \
                    of earthquakes, some tire gods, and certain gods of violence, physical \
                    strength, and courage. In some pantheons, a god of this domain rules over \
                    other deities and is known for swift justice delivered by thunderbolts. \
                    In the pantheons of seafaring people, gods of this domain are ocean \
                    deities and the patrons of sailors. Tempest gods send their clerics to \
                    inspire fear in the common folk, either to keep those folk on the path of \
                    righteousness or to encourage them to offer sacrifices of propitiation to \
                    ward off divine wrath.';
            case ClericDomain.Trickery:
                return 'Gods of trickery-such as Tymora, Beshaba, Olidammara, the Traveler, \
                    Garl Glittergold, and Loki-are mischief-makers and instigators who stand \
                    as a constant challenge to the accepted order among both gods and mortais. \
                    They\'re patrons of thieves, scoundrels, gamblers, rebels, and liberators. \
                    Their clerics are a disruptive force in the world, puncturing pride, \
                    mocking tyrants, stealing from the rich, freeing captives, and \
                    flouting hollow traditions. They prefer subterfuge, pranks, deception, \
                    and theft rather than direct confrontation.';
            case ClericDomain.War:
                return 'War has many manifestations. It can make heroes of ordinary people. \
                    It can be desperate and horrific, with acts of cruelty and cowardice \
                    eclipsing instances of excellence and courage. In either case, \
                    the gods of war watch over warriors and reward them for their great \
                    deeds. The clerics of such gods excel in battle, inspiring others \
                    to fight the good fight or offering acts of violence as prayers. \
                    Gods of war include champions of honor and chivalry (such as \
                    Torm, Heironeous, and Kiri-Jolith) as well as gods of \
                    destruction and pillage (such as Erythnul, the Fury, \
                    Gruumsh, and Ares) and gods of conquest and domination \
                    (such as Bane, Hextor, and Maglubiyet). Other war gods \
                    (such as Tempus, Nike, and Nuada) take a more neutral stance, promoting war\
                    in all its manifestations and supporting warriors in any circumstance.';
            default:
                return '';
        }
    }
    domainNotes() {
        let ret = [];
        switch (this.domain) {
            case ClericDomain.Knowledge:
                ret.push(new note_1.Note('Knowledge Domain', 'You gain knowledge of 2 additional languages', ''));
                if (this.level > 7) {
                    ret.push(new note_1.Note('Potent Spellcasting', 'Add your WIS modifier cantrip spell damage', ''));
                }
                if (this.level > 16) {
                    ret.push(new note_1.Note('Visions of the Past', '', ''));
                }
                break;
            case ClericDomain.Life:
                ret.push(new note_1.Note('Life Domain', 'You can now wear Heavy Armor', 'You can now wear Heavy Armor'));
                ret.push(new note_1.Note('Life Domain: Disciple of Life', 'Add +2 to add heals spells', ''));
                if (this.level > 1) {
                }
                break;
        }
        return ret;
    }
    cantripsKnown() {
        if (this.level < 4) {
            return 3;
        }
        if (this.level < 10) {
            return 4;
        }
        return 5;
    }
    spellSlots() {
        switch (this.level) {
            case 1:
                return [2, 0, 0, 0, 0, 0, 0, 0, 0];
            case 2:
                return [3, 0, 0, 0, 0, 0, 0, 0, 0];
            case 3:
                return [4, 2, 0, 0, 0, 0, 0, 0, 0];
            case 4:
                return [4, 3, 0, 0, 0, 0, 0, 0, 0];
            case 5:
                return [4, 3, 2, 0, 0, 0, 0, 0, 0];
            case 6:
                return [4, 3, 3, 0, 0, 0, 0, 0, 0];
            case 7:
                return [4, 3, 3, 1, 0, 0, 0, 0, 0];
            case 8:
                return [4, 3, 3, 2, 0, 0, 0, 0, 0];
            case 9:
                return [4, 3, 3, 3, 1, 0, 0, 0, 0];
            case 10:
                return [4, 3, 3, 3, 2, 0, 0, 0, 0];
            case 11:
            case 12:
                return [4, 3, 3, 3, 2, 1, 0, 0, 0];
            case 13:
            case 14:
                return [4, 3, 3, 3, 2, 1, 1, 0, 0];
            case 15:
            case 16:
                return [4, 3, 3, 3, 2, 1, 1, 1, 0];
            case 17:
                return [4, 3, 3, 3, 2, 1, 1, 1, 1];
            case 18:
                return [4, 3, 3, 3, 3, 2, 1, 1, 1];
            case 19:
                return [4, 3, 3, 3, 3, 2, 2, 1, 1];
            case 20:
        }
    }
    static fromJson(json) {
        return new ClericDetails(json.level, json.domain);
    }
}
exports.ClericDetails = ClericDetails;
var ClericDomain;
(function (ClericDomain) {
    ClericDomain["Knowledge"] = "Knowledge";
    ClericDomain["Life"] = "Life";
    ClericDomain["Light"] = "Light";
    ClericDomain["Nature"] = "Nature";
    ClericDomain["Tempest"] = "Tempest";
    ClericDomain["Trickery"] = "Trickery";
    ClericDomain["War"] = "War";
})(ClericDomain = exports.ClericDomain || (exports.ClericDomain = {}));
class DruidDetails {
    constructor(level, circle) {
        this.level = level;
        this.circle = circle;
    }
    notes() {
        let ret = [
            new note_1.Note('Spell Casting', 'Your relationship with nature has enable you to wield magic.', `Your relationship with nature has reach a point that allows you to manipulate the world around in extraordinary ways.`)
        ];
        if (this.level > 1) {
            new note_1.Note('Wild Shape', `You can turn into a beast with a challenge rating ${this.maxWildShapeCR()} or less 2 times between rests for up to ${this.maxWildShapeHours()} hours`, `You can turn into a beast with a challenge rating ${this.maxWildShapeCR()} or less 2 times between rests for up to ${this.maxWildShapeHours()} hours.
                Transforming take an action.
                ${this.wildShapeRestrictions()}
                You take on the attributes and abilities of the beast except for the following.
                - Alignment
                - Personality
                - Intelligence
                - Wisdom
                - Charisma
                - You cannot use any legendary or lair actions of this beast.
                You're are forced to revert if knocked unconscious.
                While in beast form you cannot cast spells.
                You can choose between the following three options for the items your are wearing.
                - They drop where you transformed
                - They merge into the beast
                - The beast will be wearing them (note: the DM gets final vote on the practicality of this)`);
        }
        return ret;
    }
    maxWildShapeCR() {
        if (this.level < 4) {
            return 0.25;
        }
        if (this.level < 8) {
            return 0.5;
        }
        return 1;
    }
    maxWildShapeHours() {
        return Math.floor(this.level / 2);
    }
    wildShapeRestrictions() {
        if (this.level < 4) {
            return 'The beast cannot have a swim or flying speed';
        }
        if (this.level < 8) {
            return 'The beast cannot have a flying speed';
        }
        return 'No additional restrictions on the beast';
    }
    static fromJson(json) {
        return new DruidDetails(json.level, json.circle);
    }
}
exports.DruidDetails = DruidDetails;
var DruidCircle;
(function (DruidCircle) {
    DruidCircle["Land"] = "Land";
    DruidCircle["Moon"] = "Moon";
})(DruidCircle = exports.DruidCircle || (exports.DruidCircle = {}));
class FighterDetails {
    constructor(level, fightingStyle, combatArchtype) {
        this.level = level;
        this.fightingStyle = fightingStyle;
        this.combatArchtype = combatArchtype;
    }
    notes() {
        let ret = [];
        return ret;
    }
    get maneuversCount() {
        if (this.level < 3 || this.combatArchtype === CombatArchtype.BattleMaster) {
            return 0;
        }
        if (this.level < 7) {
            return 3;
        }
        if (this.level < 10) {
            return 5;
        }
        if (this.level < 15) {
            return 7;
        }
        return 9;
    }
    get cantripCount() {
        if (this.level < 3 || this.combatArchtype !== CombatArchtype.BattleMaster) {
            return 0;
        }
        if (this.level < 10) {
            return 2;
        }
        return 3;
    }
    get indomitableCount() {
        if (this.level < 9) {
            return 0;
        }
        if (this.level < 13) {
            return 1;
        }
        if (this.level < 17) {
            return 2;
        }
        return 3;
    }
    get actionSurges() {
        if (this.level < 2) {
            return 0;
        }
        if (this.level < 17) {
            return 1;
        }
        return 2;
    }
    get attacks() {
        if (this.level < 5) {
            return 1;
        }
        if (this.level < 11) {
            return 2;
        }
        return 3;
    }
    get critStart() {
        if (this.level < 3 || this.combatArchtype !== CombatArchtype.Champion) {
            return 20;
        }
        if (this.level < 15) {
            return 19;
        }
        return 18;
    }
    get superiorityDie() {
        if (this.level < 2 || this.combatArchtype === CombatArchtype.BattleMaster) {
            return 0;
        }
    }
    static fromJson(json) {
        return new FighterDetails(json.level, json.fightingStyle);
    }
}
exports.FighterDetails = FighterDetails;
var FighterStyle;
(function (FighterStyle) {
    FighterStyle["Archery"] = "Archery";
    FighterStyle["Defense"] = "Defense";
    FighterStyle["Dueling"] = "Dueling";
    FighterStyle["GreatWeapon"] = "Great Weapon Fighting";
    FighterStyle["Protection"] = "Protection";
    FighterStyle["TwoWeapon"] = "Two Weapon Fighting";
})(FighterStyle = exports.FighterStyle || (exports.FighterStyle = {}));
var CombatArchtype;
(function (CombatArchtype) {
    CombatArchtype[CombatArchtype["BattleMaster"] = 0] = "BattleMaster";
    CombatArchtype[CombatArchtype["Champion"] = 1] = "Champion";
    CombatArchtype[CombatArchtype["EldrichKnight"] = 2] = "EldrichKnight";
})(CombatArchtype = exports.CombatArchtype || (exports.CombatArchtype = {}));
class MonkDetails {
    constructor(level) {
        this.level = level;
    }
    notes() {
        let ret = [];
        return ret;
    }
    get kiPoints() {
        if (this.level < 1) {
            return 0;
        }
        return this.level;
    }
    get attacks() {
        if (this.level < 5) {
            return 1;
        }
        if (this.level < 0) {
            return 2;
        }
    }
    get martialArtsDie() {
        if (this.level < 5) {
            return 'd4';
        }
        if (this.level < 0) {
            return 'd6';
        }
        return 'd10';
    }
    get movementBonus() {
        if (this.level < 5) {
            return 10;
        }
        if (this.level < 18) {
            return 15;
        }
        return 20;
    }
    static fromJson(json) {
        return new MonkDetails(json.level);
    }
}
exports.MonkDetails = MonkDetails;
class PaladinDetails {
    constructor(level, fightingStyle, oath) {
        this.level = level;
        this.fightingStyle = fightingStyle;
        this.oath = oath;
    }
    notes() {
        let ret = [];
        return ret;
    }
    get bonusAttacks() {
        if (this.level < 5) {
            return 1;
        }
        return 2;
    }
    static fromJson(json) {
        return new PaladinDetails(json.level, json.fightingStyle, json.oath);
    }
}
exports.PaladinDetails = PaladinDetails;
var PaladinStyle;
(function (PaladinStyle) {
    PaladinStyle["Defense"] = "Defense";
    PaladinStyle["Dueling"] = "Dueling";
    PaladinStyle["GreatWeapon"] = "Great Weapon Fighting";
    PaladinStyle["Protection"] = "Protection";
})(PaladinStyle = exports.PaladinStyle || (exports.PaladinStyle = {}));
var PaladinOath;
(function (PaladinOath) {
    PaladinOath["Ancients"] = "Ancients";
    PaladinOath["Devotion"] = "Devotion";
    PaladinOath["Vengeance"] = "Vengeance";
})(PaladinOath = exports.PaladinOath || (exports.PaladinOath = {}));
class RangerDetails {
    constructor(level, favoredEnemy) {
        this.level = level;
        this.favoredEnemy = favoredEnemy;
    }
    notes() {
        let ret = [];
        return ret;
    }
    get attacks() {
        if (this.level < 5) {
            return 1;
        }
        return 2;
    }
    get favoredTerrainCount() {
        if (this.level < 6) {
            return 1;
        }
        if (this.level < 14) {
            return 2;
        }
        return 3;
    }
    get favoredEnemyCount() {
        if (this.level < 6) {
            return 1;
        }
        return 2;
    }
    static fromJson(json) {
        return new RangerDetails(json.level, json.favoredEnemy);
    }
}
exports.RangerDetails = RangerDetails;
var RangerEnemy;
(function (RangerEnemy) {
    RangerEnemy["Aberration"] = "Aberration";
    RangerEnemy["Beast"] = "Beast";
    RangerEnemy["Celestial"] = "Celestial";
    RangerEnemy["Construct"] = "Construct";
    RangerEnemy["Dragon"] = "Dragon";
    RangerEnemy["Elemental"] = "Elemental";
    RangerEnemy["Fey"] = "Fey";
    RangerEnemy["Fiend"] = "Fiend";
    RangerEnemy["Giant"] = "Giant";
    RangerEnemy["Monstrosity"] = "Monstrosity";
    RangerEnemy["Ooze"] = "Ooze";
    RangerEnemy["Plant"] = "Plant";
    RangerEnemy["Undead"] = "Undead";
})(RangerEnemy = exports.RangerEnemy || (exports.RangerEnemy = {}));
class RogueDetails {
    constructor(level = 1, archType, expertise = [], bonusAbilityScores = class_1.DEFAULT_BONUS_ABILITY_SCORES) {
        this.level = level;
        this.archType = archType;
        this.expertise = expertise;
        this.bonusAbilityScores = bonusAbilityScores;
    }
    notes() {
        let ret = [];
        ret.push(new note_1.Note(`Expertise`, `Double ${this.expertiseNumber()} proficiency bonus`, ''));
        ret.push(new note_1.Note(`Sneak Attack`, `Add ${this.sneakAttackDice()}d6 to DMG rolls with advantage or another aly within 5 feet of enemy`, ''));
        ret.push(new note_1.Note(`Thieves Cant`, `Secret rogue slang language`, ''));
        if (this.level > 2) {
            ret.push(new note_1.Note(`Cunning Action`, `Bonus action of Dash, Disengage, or Hide on any combat turn`, ''));
            ret.push(new note_1.Note(`Roguish ArchType`, `${this.archTypeDesc()}`, ''));
            ret.push(...this.archTypeDetails());
        }
        if (this.level > 3 && this.level < 8) {
            ret.push(new note_1.Note('Bonus Ability Scores', '2', ''));
        }
        if (this.level > 7 && this.level < 12) {
            ret.push(new note_1.Note('Bonus Ability Scores', '4', ''));
        }
        if (this.level > 11 && this.level < 16) {
            ret.push(new note_1.Note('Bonus Ability Scores', '6', ''));
        }
        if (this.level > 15 && this.level < 19) {
            ret.push(new note_1.Note('Bonus Ability Scores', '8', ''));
        }
        if (this.level > 18) {
            ret.push(new note_1.Note('Bonus Ability Scores:', '0', ''));
        }
        if (this.level > 4) {
            ret.push(new note_1.Note('Uncanny Dodge', 'you can use your reaction to halve the attack\'s damage against you (must be able to see attacker)', ''));
        }
        if (this.level > 6) {
            ret.push(new note_1.Note('Evasion', 'AOEs that a dex save would halve damage, you take no damage on success and half if failed', ''));
        }
        if (this.level > 10) {
            ret.push(new note_1.Note('Reliable Talent', 'On skills that include proficiency bonus any roll 9 or less is counted as 10', ''));
        }
        if (this.level > 13) {
            ret.push(new note_1.Note('Blind Sense', 'If you can hear you are aware of any hidden or invisible creature within 10 feet', ''));
        }
        if (this.level > 17) {
            ret.push(new note_1.Note('Elusive', 'No attack roll has advantage against you unless incapacitated', ''));
        }
        if (this.level > 19) {
            ret.push(new note_1.Note('Stroke of Luck', 'Once a day you can convert any failed skill roll into a 20 or missed attack into a hit', ''));
        }
        return ret;
    }
    expertiseNumber() {
        if (this.level < 6) {
            return 2;
        }
        return 4;
    }
    archTypeDesc() {
        if (this.archType) {
            return this.archType;
        }
        else {
            return 'Choose between Thief, Assassin, and Arcane Trickster';
        }
    }
    archTypeDetails() {
        let ret = [];
        switch (this.archType) {
            case RoguishArchType.Thief:
                if (this.level > 2) {
                    ret.push('- Bonus Cunning Actions: Disarm Trap, Open Lock, Use Object');
                    ret.push('- Second Story Work: Climb without movement penalty');
                }
                if (this.level > 8) {
                    ret.push('- Supreme Sneak: Advantage on Stealth when moving 1/2 your speed');
                }
                if (this.level > 12) {
                    ret.push('- Use Magic Device: Ignore all Class, Race and Level requirements when using a magic item');
                }
                if (this.level > 16) {
                    ret.push('- Thief\'s Reflexes: You take 2 turns on the first round of combat (Second turn at Initiative - 10, cannot use when surprised)');
                }
                break;
            case RoguishArchType.Assassin:
                if (this.level > 2) {
                    ret.push('- Bonus Proficiencies: Poisoner\'s and Disguise Kit');
                    ret.push('- Assassinate: Advantage against enemies who have not taken a turn; surprise always crits');
                }
                if (this.level > 8) {
                    ret.push('- Infiltration Expertise: You can unfailingly create false identities (see PH:97 for details)');
                }
                if (this.level > 12) {
                    ret.push('- Imposter: Unerringly mimic another person\'s speech, writing, and behavior (see PH:97 for details)');
                }
                if (this.level > 16) {
                    ret.push('- Death Strike: Surprised Attacks must also make a CON save (8 + DEX + Prof), failed saves double damage');
                }
                break;
            case RoguishArchType.ArcaneTrickster:
                //TODO add this...
                break;
        }
        return ret;
    }
    sneakAttackDice() {
        return Math.ceil(this.level / 2);
    }
    allowedBonusAbilityScores() {
        if (this.level < 4) {
            return 0;
        }
        if (this.level < 8) {
            return 2;
        }
        if (this.level < 10) {
            return 4;
        }
        if (this.level < 12) {
            return 6;
        }
        if (this.level < 16) {
            return 8;
        }
        if (this.level < 19) {
            return 10;
        }
        return 12;
    }
    get expertiseCount() {
        if (this.level > 5) {
            return 4;
        }
        return 2;
    }
    static fromJson(json) {
        return new RogueDetails(json.level, json.archType, json.expertise, json.bonusAbilityScores);
    }
}
exports.RogueDetails = RogueDetails;
class SorcererDetails {
    constructor(level, metaMagic, origins) {
        this.level = level;
        this.metaMagic = metaMagic;
        this.origins = origins;
    }
    notes() {
        let ret = [];
        return ret;
    }
    get sorceryPoints() {
        if (this.level < 2) {
            return 0;
        }
        return this.level;
    }
    get metaMagicCount() {
        if (this.level < 3) {
            return 0;
        }
        if (this.level < 10) {
            return 2;
        }
        if (this.level < 17) {
            return 3;
        }
        return 4;
    }
    static fromJson(json) {
        return new SorcererDetails(json.level, json.metaMagic, json.origins);
    }
}
exports.SorcererDetails = SorcererDetails;
var MetaMagic;
(function (MetaMagic) {
    MetaMagic["Carful"] = "Carful";
    MetaMagic["Distant"] = "Distant";
    MetaMagic["Empowered"] = "Empowered";
    MetaMagic["Extended"] = "Extended";
    MetaMagic["Heightened"] = "Heightened";
    MetaMagic["Quickened"] = "Quickened";
    MetaMagic["Subtle"] = "Subtle";
    MetaMagic["Twinned"] = "Twinned";
})(MetaMagic = exports.MetaMagic || (exports.MetaMagic = {}));
var SorcererOrigins;
(function (SorcererOrigins) {
    SorcererOrigins["DraconicAncestor"] = "DraconicAncestor";
    SorcererOrigins["Wild"] = "Wild";
})(SorcererOrigins = exports.SorcererOrigins || (exports.SorcererOrigins = {}));
class WarlockDetails {
    constructor(level, patron) {
        this.level = level;
        this.patron = patron;
    }
    notes() {
        let ret = [];
        return ret;
    }
    get eldrichInvocationCount() {
        if (this.level < 2) {
            return 0;
        }
        if (this.level < 5) {
            return 2;
        }
        if (this.level < 9) {
            return 3;
        }
        if (this.level < 12) {
            return 4;
        }
        if (this.level < 15) {
            return 5;
        }
        if (this.level < 18) {
            return 6;
        }
        return 7;
    }
    get mysticArcanumSpells() {
        if (this.level < 11) {
            return [];
        }
        if (this.level < 13) {
            return [6];
        }
        if (this.level < 15) {
            return [6, 7];
        }
        if (this.level < 17) {
            return [6, 7, 8];
        }
        return [6, 7, 8, 9];
    }
    static fromJson(json) {
        return new WarlockDetails(json.level, json.patron);
    }
}
exports.WarlockDetails = WarlockDetails;
var OtherworldlyPatron;
(function (OtherworldlyPatron) {
    OtherworldlyPatron[OtherworldlyPatron["ArchFey"] = 0] = "ArchFey";
    OtherworldlyPatron[OtherworldlyPatron["Fiend"] = 1] = "Fiend";
    OtherworldlyPatron[OtherworldlyPatron["GreatOldOne"] = 2] = "GreatOldOne";
})(OtherworldlyPatron = exports.OtherworldlyPatron || (exports.OtherworldlyPatron = {}));
class WizardDetails {
    constructor(level, arcaneTradition) {
        this.level = level;
        this.arcaneTradition = arcaneTradition;
    }
    notes() {
        let ret = [];
        return ret;
    }
    static fromJson(json) {
        return new WizardDetails(json.level, json.arcaneTradition);
    }
}
exports.WizardDetails = WizardDetails;
var ArcaneTradition;
(function (ArcaneTradition) {
    ArcaneTradition["Abjuration"] = "Abjuration";
    ArcaneTradition["Conjuration"] = "Conjuration";
    ArcaneTradition["Divination"] = "Divination";
    ArcaneTradition["Enchantment"] = "Enchantment";
    ArcaneTradition["Evocation"] = "Evocation";
    ArcaneTradition["Illusion"] = "Illusion";
    ArcaneTradition["Necromancy"] = "Necromancy";
    ArcaneTradition["Transmutation"] = "Transmutation";
})(ArcaneTradition = exports.ArcaneTradition || (exports.ArcaneTradition = {}));
var RoguishArchType;
(function (RoguishArchType) {
    RoguishArchType["Thief"] = "Thief";
    RoguishArchType["Assassin"] = "Assassin";
    RoguishArchType["ArcaneTrickster"] = "Arcane Trickster";
})(RoguishArchType = exports.RoguishArchType || (exports.RoguishArchType = {}));


/***/ }),

/***/ "./ts/models/note.ts":
/*!***************************!*\
  !*** ./ts/models/note.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Note {
    constructor(name, shortDesc, longDesc) {
        this.name = name;
        this.shortDesc = shortDesc;
        this.longDesc = longDesc;
    }
    toString() {
        return `${this.name}: ${this.shortDesc}`;
    }
}
exports.Note = Note;


/***/ }),

/***/ "./ts/models/race.ts":
/*!***************************!*\
  !*** ./ts/models/race.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const character_1 = __webpack_require__(/*! ./character */ "./ts/models/character.ts");
const range_1 = __webpack_require__(/*! ./range */ "./ts/models/range.ts");
const abilityScore_1 = __webpack_require__(/*! ./abilityScore */ "./ts/models/abilityScore.ts");
const tools_1 = __webpack_require__(/*! ./tools */ "./ts/models/tools.ts");
class Race {
    constructor(name = RaceKind.Human, subRace = null) {
        this.name = name;
        this.size = character_1.CharacterSize.Medium;
        this.speed = 30;
        this.weaponProfs = [];
        this.toolProfs = [];
        this.languages = [];
        this.armorProfs = [];
        this.miscBenefits = [];
        this.bonusLanguages = 0;
        this.naturalWeapons = [
            new character_1.Weapon('Left Fist', character_1.WeaponType.Melee, character_1.WeaponKind.Martial, character_1.WeaponDamageKind.Bludgeoning, character_1.WeaponWeight.Light, character_1.WeaponHandedness.One, [1, 4]),
            new character_1.Weapon('Right Fist', character_1.WeaponType.Melee, character_1.WeaponKind.Martial, character_1.WeaponDamageKind.Bludgeoning, character_1.WeaponWeight.Light, character_1.WeaponHandedness.One, [1, 4]),
        ];
        if (name == RaceKind.Dragonborn && subRace == null) {
            subRace = Dragon.Black;
        }
        this.checkSubRace(subRace);
        this.subRace = subRace;
        switch (name) {
            case RaceKind.Dwarf:
                this.dwarfCtor();
                break;
            case RaceKind.Elf:
                this.elfCtor();
                break;
            case RaceKind.Halfling:
                this.halflingCtor();
                break;
            case RaceKind.Human:
                this.humanCtor();
                break;
            case RaceKind.Dragonborn:
                this.dragonbornCtor();
                break;
            case RaceKind.Gnome:
                this.gnomeCtor();
                break;
            case RaceKind.HalfElf:
                this.halfElfCtor();
                break;
            case RaceKind.HalfOrc:
                this.halfOrcCtor();
                break;
            case RaceKind.Tiefling:
                this.tieflingCtor();
                break;
        }
    }
    dwarfCtor() {
        this.abilityModifiers = [
            [abilityScore_1.AbilityKind.Constitution, 2]
        ];
        if (this.subRace == Dwarf.Hill) {
            this.abilityModifiers.push([abilityScore_1.AbilityKind.Wisdom, 1]);
        }
        if (this.subRace == Dwarf.Mountain) {
            this.abilityModifiers.push([abilityScore_1.AbilityKind.Strength, 2]);
        }
        this.ageRange = [50, 350];
        this.preferredAlignment = new character_1.Alignment(character_1.AlignmentMajor.Lawful, character_1.AlignmentMinor.Good);
        this.heightRange = [new character_1.Height(4, 0), new character_1.Height(5, 0)];
        this.size = character_1.CharacterSize.Medium;
        this.avgWeight = 150;
        this.speed = 25;
        this.darkVision = new range_1.Range(60);
        this.weaponProfs = [
            character_1.StdWeaponName.Battleaxe,
            character_1.StdWeaponName.HandAxe,
            character_1.StdWeaponName.ThrowingHammer,
            character_1.StdWeaponName.WarHammer,
        ];
        this.languages = [
            character_1.NormalLanguage.Common,
            character_1.NormalLanguage.Dwarvish
        ];
        this.miscBenefits = [
            'Your speed is not reduced by wearing heavy armor',
            'Stonecunning: +1 on Int (History) checks about Stonework',
        ];
        if (this.subRace == Dwarf.Hill) {
            this.miscBenefits.push('+1 max HP at each level');
        }
        if (this.subRace == Dwarf.Mountain) {
            this.armorProfs = [character_1.ArmorWeight.Light, character_1.ArmorWeight.Medium];
        }
    }
    elfCtor() {
        this.abilityModifiers = [[abilityScore_1.AbilityKind.Dexterity, 2]];
        if (this.subRace == Elf.High) {
            this.abilityModifiers.push([abilityScore_1.AbilityKind.Intelligence, 1]);
        }
        if (this.subRace == Elf.Wood) {
            this.abilityModifiers.push([abilityScore_1.AbilityKind.Wisdom, 1]);
        }
        if (this.subRace == Elf.Drow) {
            this.abilityModifiers.push([abilityScore_1.AbilityKind.Charisma, 1]);
        }
        this.ageRange = [100, 750];
        this.preferredAlignment = new character_1.Alignment(character_1.AlignmentMajor.Chaotic, this.subRace == Elf.Drow ? character_1.AlignmentMinor.Evil : character_1.AlignmentMinor.Good);
        this.heightRange = [new character_1.Height(5, 0), new character_1.Height(6, 0)];
        this.avgWeight = 130;
        this.size = character_1.CharacterSize.Medium;
        this.speed = 30;
        this.darkVision = new range_1.Range(60);
        this.languages = [
            character_1.NormalLanguage.Common,
            character_1.NormalLanguage.Elvish,
        ];
        this.miscBenefits = [
            'Keen Senses: Proficiency in perception',
            'Fey Ancestry: Advantage against being charmed and magic cannot be put to sleep',
            'Trance: Instead of sleeping you meditate for 4 hours',
        ];
        if (this.subRace == Elf.High) {
            this.weaponProfs = [
                character_1.StdWeaponName.LongBow,
                character_1.StdWeaponName.LongSword,
                character_1.StdWeaponName.ShortBow,
                character_1.StdWeaponName.ShortSword,
            ];
            this.miscBenefits.push('Cantrip: You know one Cantrip of your choice from lhe wizard spell list');
            this.bonusLanguages = 1;
        }
        if (this.subRace == Elf.Wood) {
            this.weaponProfs = [
                character_1.StdWeaponName.LongBow,
                character_1.StdWeaponName.LongSword,
                character_1.StdWeaponName.ShortBow,
                character_1.StdWeaponName.ShortSword,
            ];
            this.speed = 35;
            this.miscBenefits.push('Mask of the Wild: You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, and other natural phenomena.');
        }
        if (this.subRace == Elf.Drow) {
            this.darkVision = new range_1.Range(120);
            this.miscBenefits.push('Sun Light Sensitivity: You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight');
            this.miscBenefits.push('Drow Magic: You know the dancing lights Cantrip. At level 3 you can cas Faerie Fire once per day, at level 5 you can cast Darkness once per day Charisma is your spell casting ability');
            this.weaponProfs = [
                character_1.StdWeaponName.ShortSword,
                character_1.StdWeaponName.Rapier,
                character_1.StdWeaponName.HandCrossbow,
            ];
        }
    }
    halflingCtor() {
        this.abilityModifiers = [[abilityScore_1.AbilityKind.Dexterity, 2]];
        this.heightRange = [new character_1.Height(2, 6), new character_1.Height(3, 6)];
        this.avgWeight = 40;
        this.preferredAlignment = character_1.Alignment.LawfulGood();
        this.speed = 25;
        this.size = character_1.CharacterSize.Small;
        this.languages = [
            character_1.NormalLanguage.Common,
            character_1.NormalLanguage.Halfling,
        ];
        this.ageRange = [20, 175];
        this.miscBenefits = [
            'Lucky: When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll',
            'Brave: Vou have advantage on saving throws against being frightened',
            'Halfling Nimbleness: You can move through the space of any creature that is of a size larger than yours',
        ];
        if (this.subRace == Halfling.Lightfoot) {
            this.abilityModifiers.push([abilityScore_1.AbilityKind.Charisma, 1]);
            this.miscBenefits.push('Naturally Stealthy: You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you');
        }
        if (this.subRace == Halfling.Stout) {
            this.abilityModifiers.push([abilityScore_1.AbilityKind.Constitution, 1]);
            this.miscBenefits.push('Stout Resilience: You have advantage on saving throws against poison, and you have resistance against poison damage');
        }
    }
    humanCtor() {
        this.abilityModifiers = [
            [abilityScore_1.AbilityKind.Strength, 1],
            [abilityScore_1.AbilityKind.Dexterity, 1],
            [abilityScore_1.AbilityKind.Constitution, 1],
            [abilityScore_1.AbilityKind.Intelligence, 1],
            [abilityScore_1.AbilityKind.Wisdom, 1],
            [abilityScore_1.AbilityKind.Charisma, 1],
        ];
        this.ageRange = [16, 90];
        this.preferredAlignment = character_1.Alignment.TrueNeutral();
        this.heightRange = [new character_1.Height(5, 0), new character_1.Height(7, 0)];
        this.avgWeight = 150;
        this.speed = 30;
        this.languages = [character_1.NormalLanguage.Common];
        this.bonusLanguages = 1;
    }
    dragonbornCtor() {
        this.abilityModifiers = [[abilityScore_1.AbilityKind.Strength, 2]];
        this.ageRange = [15, 80];
        this.preferredAlignment = character_1.Alignment.NeutralGood();
        this.heightRange = [new character_1.Height(6, 0), new character_1.Height(9, 0)];
        this.avgWeight = 250;
        this.size = character_1.CharacterSize.Medium;
        this.speed = 30;
        let breathDmgKind, breathRange, notes;
        switch (this.subRace) {
            case Dragon.Black:
            case Dragon.Copper:
                breathRange = new range_1.Range(30);
                this.damageResistance = breathDmgKind = character_1.WeaponDamageKind.Acid;
                notes = 'Dex save';
                break;
            case Dragon.Blue:
            case Dragon.Bronze:
                breathRange = new range_1.Range(30);
                this.damageResistance = breathDmgKind = character_1.WeaponDamageKind.Lightening;
                notes = 'Dex save';
                break;
            case Dragon.Brass:
            case Dragon.Gold:
            case Dragon.Red:
                breathRange = this.subRace == Dragon.Brass ? new range_1.Range(30) : new range_1.Range(15);
                this.damageResistance = breathDmgKind = character_1.WeaponDamageKind.Fire;
                notes = 'Dex save';
                break;
            case Dragon.Green:
                breathRange = new range_1.Range(15);
                this.damageResistance = breathDmgKind = character_1.WeaponDamageKind.Poison;
                notes = 'Con save';
                break;
            case Dragon.Silver:
            case Dragon.White:
                breathRange = new range_1.Range(15);
                this.damageResistance = breathDmgKind = character_1.WeaponDamageKind.Cold;
                notes = 'Con save';
                break;
        }
        this.naturalWeapons.push(new character_1.Weapon('Breath Weapon', character_1.WeaponType.Melee, character_1.WeaponKind.Natural, breathDmgKind, null, null, [2, 6], breathRange, 0, null, false, notes));
        this.languages = [
            character_1.NormalLanguage.Common,
            character_1.NormalLanguage.Draconic,
        ];
    }
    gnomeCtor() {
        this.abilityModifiers = [[abilityScore_1.AbilityKind.Intelligence, 2]];
        if (this.subRace == 'Forest') {
            this.abilityModifiers.push([abilityScore_1.AbilityKind.Dexterity, 1]);
        }
        if (this.subRace == 'Rock') {
            this.abilityModifiers.push([abilityScore_1.AbilityKind.Constitution, 1]);
        }
        this.ageRange = [17, 500];
        this.preferredAlignment = character_1.Alignment.NeutralGood();
        this.heightRange = [new character_1.Height(3, 0), new character_1.Height(4, 0)];
        this.avgWeight = 40;
        this.size = character_1.CharacterSize.Small;
        this.speed = 25;
        this.darkVision = new range_1.Range(60);
        this.languages = [
            character_1.NormalLanguage.Common,
            character_1.NormalLanguage.Gnomish,
        ];
        this.miscBenefits = [
            'Gnome Cunning: You have advantage on all Int, Wis, & Cha saving throws against magic',
        ];
        if (this.subRace == Gnome.Forest) {
            this.miscBenefits.push('Natural Illusionist: You know the minor illusion Cantrip. Intelligence is your spell casting ability', 'Speak with Small Beasts: You can communicate with small or smaller beasts');
        }
        if (this.subRace == Gnome.Rock) {
            this.toolProfs = [tools_1.ArtisanTools.Tinker];
            this.miscBenefits.push('Artificer\'s Lore: Whenever you make an Intelligence (History) check related to magic items, alchemical objects, ar technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally appIy', `Tinker: You can create 1 clockwork device (AC5, 1hp) it takes 1 hour and 10 gp. 
Clockwork Toy: animal, monster or person (i.e. mouse, dragon, soldier). It moves 5 feet each turn and makes noises appropriate to the creature it represents
Fire Starter: A lighter
Music Box: When opened it plays a single song an moderate volume, stops when song ends/is closed
`);
        }
    }
    halfElfCtor() {
        this.abilityModifiers = [[abilityScore_1.AbilityKind.Charisma, 2]];
        this.ageRange = [20, 180];
        this.preferredAlignment = character_1.Alignment.ChaoticGood();
        this.heightRange = [new character_1.Height(5, 0), new character_1.Height(6, 0)];
        this.avgWeight = 160;
        this.size = character_1.CharacterSize.Medium;
        this.speed = 25;
        this.darkVision = new range_1.Range(60);
        this.bonusLanguages = 1;
        this.languages = [
            character_1.NormalLanguage.Common,
            character_1.NormalLanguage.Elvish,
        ];
        this.miscBenefits = [
            'Skill Versatility: You gain proficiency in two skills of your choice',
            'Fey Ancestry: Advantage against being charmed and magic cannot be put to sleep',
        ];
    }
    halfOrcCtor() {
        this.abilityModifiers = [
            [abilityScore_1.AbilityKind.Strength, 2],
            [abilityScore_1.AbilityKind.Constitution, 1],
        ];
        this.ageRange = [14, 75];
        this.preferredAlignment = character_1.Alignment.ChaoticGood();
        this.heightRange = [new character_1.Height(5, 0), new character_1.Height(8, 0)];
        this.avgWeight = 200;
        this.size = character_1.CharacterSize.Medium;
        this.speed = 30;
        this.darkVision = new range_1.Range(60);
        this.languages = [
            character_1.NormalLanguage.Common,
            character_1.NormalLanguage.Orc,
        ];
        this.miscBenefits = [
            'Menacing: You gain proficiency in the Intimidation skill',
            'Savage Attacks: When you score a critical hit with a melee weapon attack you add 1 hit die to the damage role as bonus damage',
        ];
    }
    tieflingCtor() {
        this.abilityModifiers = [
            [abilityScore_1.AbilityKind.Intelligence, 1],
            [abilityScore_1.AbilityKind.Charisma, 2],
        ];
        this.ageRange = [16, 120];
        this.preferredAlignment = character_1.Alignment.ChaoticEvil();
        this.heightRange = [new character_1.Height(5, 0), new character_1.Height(7, 0)];
        this.avgWeight = 160;
        this.speed = 30;
        this.darkVision = new range_1.Range(60);
        this.damageResistance = character_1.WeaponDamageKind.Fire;
        this.languages = [
            character_1.NormalLanguage.Common,
            character_1.NormalLanguage.Infernal,
        ];
        this.miscBenefits = [
            `Infernal Legacy: You know the thaumaturgy cantrip. Once you reach 3rd level, you can cast the hellish rebuke spell once per day as a 2nd-level spell. Once you reach 5th level, you can also cast the darkness spell once per day. Charisma is your spell casting ability for these spells.`
        ];
    }
    checkSubRace(subRace) {
        if (((subRace == Gnome.Rock || subRace == Gnome.Forest) && this.name != RaceKind.Gnome)
            || ((subRace == Elf.Drow || subRace == Elf.High || subRace == Elf.Wood) && this.name != RaceKind.Elf)
            || ((subRace == Dwarf.Hill || subRace == Dwarf.Mountain) && this.name != RaceKind.Dwarf)
            || ((subRace == Halfling.Lightfoot || subRace == Halfling.Stout) && this.name != RaceKind.Halfling)
            || ((subRace == Dragon.Black
                || subRace == Dragon.Blue
                || subRace == Dragon.Brass
                || subRace == Dragon.Bronze
                || subRace == Dragon.Copper
                || subRace == Dragon.Gold
                || subRace == Dragon.Green
                || subRace == Dragon.Red
                || subRace == Dragon.Silver
                || subRace == Dragon.White) && this.name != RaceKind.Dragonborn)) {
            throw new Error(`Subrace ${subRace} isn't compatible with ${this.name}`);
        }
        if (!subRace && this.name == RaceKind.Dragonborn) {
            throw new Error('Dragonborn must pick an ancestry');
        }
    }
    static fromJson(json) {
        return new Race(json.name, json.subRace);
    }
}
exports.Race = Race;
var RaceKind;
(function (RaceKind) {
    RaceKind["Dwarf"] = "Dwarf";
    RaceKind["Elf"] = "Elf";
    RaceKind["Halfling"] = "Halfling";
    RaceKind["Human"] = "Human";
    RaceKind["Dragonborn"] = "Dragonborn";
    RaceKind["Gnome"] = "Gnome";
    RaceKind["HalfElf"] = "Half-Elf";
    RaceKind["HalfOrc"] = "Half-Orc";
    RaceKind["Tiefling"] = "Tiefling";
})(RaceKind = exports.RaceKind || (exports.RaceKind = {}));
var Dwarf;
(function (Dwarf) {
    Dwarf["Hill"] = "Hill";
    Dwarf["Mountain"] = "Mountain";
})(Dwarf = exports.Dwarf || (exports.Dwarf = {}));
var Elf;
(function (Elf) {
    Elf["Drow"] = "Drow";
    Elf["Wood"] = "Wood";
    Elf["High"] = "High";
})(Elf = exports.Elf || (exports.Elf = {}));
var Halfling;
(function (Halfling) {
    Halfling["Stout"] = "Stout";
    Halfling["Lightfoot"] = "Lightfoot";
})(Halfling = exports.Halfling || (exports.Halfling = {}));
var Gnome;
(function (Gnome) {
    Gnome["Forest"] = "Forest";
    Gnome["Rock"] = "Rock";
})(Gnome = exports.Gnome || (exports.Gnome = {}));
var Dragon;
(function (Dragon) {
    Dragon["Black"] = "Black";
    Dragon["Blue"] = "Blue";
    Dragon["Brass"] = "Brass";
    Dragon["Bronze"] = "Bronze";
    Dragon["Copper"] = "Copper";
    Dragon["Gold"] = "Gold";
    Dragon["Green"] = "Green";
    Dragon["Red"] = "Red";
    Dragon["Silver"] = "Silver";
    Dragon["White"] = "White";
})(Dragon = exports.Dragon || (exports.Dragon = {}));


/***/ }),

/***/ "./ts/models/range.ts":
/*!****************************!*\
  !*** ./ts/models/range.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Range {
    constructor(first, second = null) {
        this.first = first;
        this.second = second;
    }
    metaString() {
        if (this.second) {
            return `${this.first}/${this.second}`;
        }
        return this.first.toString();
    }
    static fromJson(json) {
        if (!json)
            return null;
        return new Range(json.first || 0, json.second);
    }
}
exports.Range = Range;


/***/ }),

/***/ "./ts/models/skills.ts":
/*!*****************************!*\
  !*** ./ts/models/skills.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const abilityScore_1 = __webpack_require__(/*! ./abilityScore */ "./ts/models/abilityScore.ts");
class Skills {
    constructor(skills = [
        new Skill(SkillKind.Acrobatics, false, abilityScore_1.AbilityKind.Dexterity),
        new Skill(SkillKind.AnimalHandling, false, abilityScore_1.AbilityKind.Wisdom),
        new Skill(SkillKind.Athletics, false, abilityScore_1.AbilityKind.Strength),
        new Skill(SkillKind.Arcana, false, abilityScore_1.AbilityKind.Intelligence),
        new Skill(SkillKind.Deception, false, abilityScore_1.AbilityKind.Charisma),
        new Skill(SkillKind.History, false, abilityScore_1.AbilityKind.Intelligence),
        new Skill(SkillKind.Insight, false, abilityScore_1.AbilityKind.Wisdom),
        new Skill(SkillKind.Intimidation, false, abilityScore_1.AbilityKind.Charisma),
        new Skill(SkillKind.Investigation, false, abilityScore_1.AbilityKind.Intelligence),
        new Skill(SkillKind.Medicine, false, abilityScore_1.AbilityKind.Wisdom),
        new Skill(SkillKind.Nature, false, abilityScore_1.AbilityKind.Intelligence),
        new Skill(SkillKind.Perception, false, abilityScore_1.AbilityKind.Wisdom),
        new Skill(SkillKind.Performance, false, abilityScore_1.AbilityKind.Charisma),
        new Skill(SkillKind.Persuasion, false, abilityScore_1.AbilityKind.Charisma),
        new Skill(SkillKind.Religion, false, abilityScore_1.AbilityKind.Intelligence),
        new Skill(SkillKind.SleightOfHand, false, abilityScore_1.AbilityKind.Dexterity),
        new Skill(SkillKind.Stealth, false, abilityScore_1.AbilityKind.Dexterity),
        new Skill(SkillKind.Survival, false, abilityScore_1.AbilityKind.Wisdom),
    ]) {
        this.skills = skills;
    }
    isEnabled(skillKind) {
        if (!this.skills)
            return false;
        let filter = this.skills.filter(s => s.kind == skillKind);
        if (filter.length > 0) {
            return filter[0].enabled;
        }
        return false;
    }
    map(cb) {
        return this.skills.map(cb);
    }
    set(skillKind, enabled) {
        let skillIdx = this.skills.findIndex(s => s.kind == skillKind);
        if (skillIdx > -1) {
            this.skills[skillIdx].enabled = enabled;
        }
    }
    static fromJson(json) {
        return new Skills(json.skills.map(Skill.fromJson));
    }
}
exports.Skills = Skills;
class Skill {
    constructor(kind, enabled, modifier) {
        this.kind = kind;
        this.enabled = enabled;
        this.modifier = modifier;
    }
    static from(other) {
        return new Skill(other.kind, other.enabled, other.modifier);
    }
    get desc() {
        switch (this.kind) {
            case SkillKind.Acrobatics:
                return `Dealing with difficult physical situations like tumbling or balancing on a ledge, modified by ${this.modifier}`;
            case SkillKind.AnimalHandling:
                return `Your ability to communicate with animals like calming your mount or interpreting your dog's needs, modified by ${this.modifier}`;
            case SkillKind.Arcana:
                return `This represents your knowledge about all things magic, modified by ${this.modifier}`;
            case SkillKind.Athletics:
                return `Physical situations that might be an olympic individual competition like long/high jump or swimming, modified by ${this.modifier}`;
            case SkillKind.Deception:
                return `Your ability to hide information from someone else, modified by ${this.modifier}`;
            case SkillKind.History:
                return `Your ability to recall important things from the past, modified by ${this.modifier}`;
            case SkillKind.Insight:
                return `Your ability to see through deception, modified by ${this.modifier}`;
            case SkillKind.Intimidation:
                return `Your ability to scare someone into doing what you want, modified by ${this.modifier}`;
            case SkillKind.Investigation:
                return `Your ability to discern the information you need from the resources in front of you, modified by ${this.modifier}`;
            case SkillKind.Medicine:
                return `Your ability to stabilize someone who's below 0 HP, modified by ${this.modifier}`;
            case SkillKind.Nature:
                return `You knowledge of the natural world, modified by ${this.modifier}`;
            case SkillKind.Perception:
                return `Your ability to notice something in your current environment, modified by ${this.modifier}`;
            case SkillKind.Performance:
                return `Your ability to entertain a crowd, modified by ${this.modifier}`;
            case SkillKind.Persuasion:
                return `Your ability to influence someone else's decision, modified by ${this.modifier}`;
            case SkillKind.Religion:
                return `Your knowledge about the gods and their worshipers, modified by ${this.modifier}`;
            case SkillKind.SleightOfHand:
                return `When you want to do something with your hands discretely enough that someone else doesn't see/feel it like card tricks or pick pocketing, modified by ${this.modifier}`;
            case SkillKind.Stealth:
                return `When you want to remain hidden, modified by ${this.modifier}`;
            case SkillKind.Survival:
                return `Anything Bear Grills would need to do to survive, modified by ${this.modifier}`;
            default:
                return '';
        }
    }
    copy() {
        return Skill.from(this);
    }
    static fromJson(json) {
        return new Skill(json.kind, json.enabled, json.modifier);
    }
}
exports.Skill = Skill;
var SkillKind;
(function (SkillKind) {
    SkillKind["Acrobatics"] = "Acrobatics";
    SkillKind["AnimalHandling"] = "Animal Handling";
    SkillKind["Arcana"] = "Arcana";
    SkillKind["Athletics"] = "Athletics";
    SkillKind["Deception"] = "Deception";
    SkillKind["History"] = "History";
    SkillKind["Insight"] = "Insight";
    SkillKind["Intimidation"] = "Intimidation";
    SkillKind["Investigation"] = "Investigation";
    SkillKind["Medicine"] = "Medicine";
    SkillKind["Nature"] = "Nature";
    SkillKind["Perception"] = "Perception";
    SkillKind["Performance"] = "Performance";
    SkillKind["Persuasion"] = "Persuasion";
    SkillKind["Religion"] = "Religion";
    SkillKind["SleightOfHand"] = "Sleight Of Hand";
    SkillKind["Stealth"] = "Stealth";
    SkillKind["Survival"] = "Survival";
})(SkillKind = exports.SkillKind || (exports.SkillKind = {}));


/***/ }),

/***/ "./ts/models/spells.ts":
/*!*****************************!*\
  !*** ./ts/models/spells.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Spells {
    constructor(spells = []) {
        this.spells = spells;
    }
    map(cb) {
        return this.spells.map(cb);
    }
    static fromJson(json) {
        return new Spells(json.spells.map(Spell.fromJson));
    }
}
exports.Spells = Spells;
var SpellName;
(function (SpellName) {
    SpellName["AcidSplash"] = "Acid Splash";
    SpellName["BladeWard"] = "Blade Ward";
    SpellName["ChillTouch"] = "Chill Touch";
    SpellName["DancingLights"] = "Dancing Lights";
    SpellName["Druidcraft"] = "Druidcraft";
    SpellName["EldritchBlast"] = "Eldritch Blast";
    SpellName["FireBolt"] = "Fire Bolt";
    SpellName["Friends"] = "Friends";
    SpellName["Guidance"] = "Guidance";
    SpellName["Light"] = "Light";
    SpellName["MageHand"] = "Mage Hand";
    SpellName["Mending"] = "Mending";
    SpellName["Message"] = "Message";
    SpellName["MinorIllusion"] = "Minor Illusion";
    SpellName["PoisonSpray"] = "Poison Spray";
    SpellName["Prestidigitation"] = "Prestidigitation";
    SpellName["ProduceFlame"] = "Produce Flame";
    SpellName["RayOfFrost"] = "Ray of Frost";
    SpellName["Resistance"] = "Resistance";
    SpellName["SacredFlame"] = "Sacred Flame";
    SpellName["Shillelagh"] = "Shillelagh";
    SpellName["ShockingGrasp"] = "Shocking Grasp";
    SpellName["SpareTheDying"] = "Spare the Dying";
    SpellName["Thaumaturgy"] = "Thaumaturgy";
    SpellName["ThornWhip"] = "Thorn Whip";
    SpellName["TrueStrike"] = "True Strike";
    SpellName["ViciousMockery"] = "Vicious Mockery";
    SpellName["Alarm"] = "Alarm";
    SpellName["AnimalFriendship"] = "Animal Friendship";
    SpellName["ArmorOfAgathys"] = "Armor of Agathys";
    SpellName["ArmsOfHadar"] = "Arms of Hadar";
    SpellName["Bane"] = "Bane";
    SpellName["Bless"] = "Bless";
    SpellName["BurningHands"] = "Burning Hands";
    SpellName["CharmPerson"] = "Charm Person";
    SpellName["ChromaticOrb"] = "Chromatic Orb";
    SpellName["ColorSpray"] = "Color Spray";
    SpellName["Command"] = "Command";
    SpellName["CompelledDuel"] = "Compelled Duel";
    SpellName["ComprehendLanguages"] = "Comprehend Languages";
    SpellName["CreateOrDestroyWater"] = "Create or Destroy Water";
    SpellName["CureWounds"] = "Cure Wounds";
    SpellName["DetectEvilAndGood"] = "Detect Evil and Good";
    SpellName["DetectMagic"] = "Detect Magic";
    SpellName["DetectPoisonAndDisease"] = "Detect Poison and Disease";
    SpellName["DisguiseSelf"] = "Disguise Self";
    SpellName["DissonantWhispers"] = "Dissonant Whispers";
    SpellName["DivineFavor"] = "Divine Favor";
    SpellName["EnsnaringStrike"] = "Ensnaring Strike";
    SpellName["Entangle"] = "Entangle";
    SpellName["ExpeditiousRetreat"] = "Expeditious Retreat";
    SpellName["FaerieFire"] = "Faerie Fire";
    SpellName["FalseLife"] = "False Life";
    SpellName["FeatherFall"] = "Feather Fall";
    SpellName["FindFamiliar"] = "Find Familiar";
    SpellName["FogCloud"] = "Fog Cloud";
    SpellName["Goodberry"] = "Goodberry";
    SpellName["Grease"] = "Grease";
    SpellName["GuidingBolt"] = "Guiding Bolt";
    SpellName["HailOfThorns"] = "Hail of Thorns";
    SpellName["HealingWord"] = "Healing Word";
    SpellName["HellishRebuke"] = "Hellish Rebuke";
    SpellName["Heroism"] = "Heroism";
    SpellName["Hex"] = "Hex";
    SpellName["HuntersMark"] = "Hunter's Mark";
    SpellName["Identify"] = "Identify";
    SpellName["IllusoryScript"] = "Illusory Script";
    SpellName["InflictWounds"] = "Inflict Wounds";
    SpellName["Jump"] = "Jump";
    SpellName["Longstrider"] = "Longstrider";
    SpellName["MageArmor"] = "Mage Armor";
    SpellName["MagicMissile"] = "Magic Missile";
    SpellName["ProtectionFromEvilAndGood"] = "Protection from Evil and Good";
    SpellName["PurifyFoodAndDrink"] = "Purify Food and Drink";
    SpellName["RayOfSickness"] = "Ray of Sickness";
    SpellName["Sanctuary"] = "Sanctuary";
    SpellName["SearingSmite"] = "Searing Smite";
    SpellName["Shield"] = "Shield";
    SpellName["ShieldOfFaith"] = "Shield of Faith";
    SpellName["SilentImage"] = "Silent Image";
    SpellName["Sleep"] = "Sleep";
    SpellName["SpeakWithAnimals"] = "Speak with Animals";
    SpellName["TashasHideousLaughter"] = "Tasha's Hideous Laughter";
    SpellName["TensersFloatingDisk"] = "Tenser's Floating Disk";
    SpellName["ThunderousSmite"] = "Thunderous Smite";
    SpellName["Thunderwave"] = "Thunderwave";
    SpellName["UnseenServant"] = "Unseen Servant";
    SpellName["WitchBolt"] = "Witch Bolt";
    SpellName["WrathfulSmite"] = "Wrathful Smite";
    SpellName["Aid"] = "Aid";
    SpellName["AlterSelf"] = "Alter Self";
    SpellName["AnimalMessenger"] = "Animal Messenger";
    SpellName["ArcaneLock"] = "Arcane Lock";
    SpellName["Augury"] = "Augury";
    SpellName["Barkskin"] = "Barkskin";
    SpellName["BeastSense"] = "Beast Sense";
    SpellName["BlindnessDeafness"] = "Blindness/Deafness";
    SpellName["Blur"] = "Blur";
    SpellName["BrandingSmite"] = "Branding Smite";
    SpellName["CalmEmotions"] = "Calm Emotions";
    SpellName["CloudOfDaggers"] = "Cloud of Daggers";
    SpellName["ContinualFlame"] = "Continual Flame";
    SpellName["CordonOfArrows"] = "Cordon of Arrows";
    SpellName["CrownOfMadness"] = "Crown of Madness";
    SpellName["Darkness"] = "Darkness";
    SpellName["Darkvision"] = "Darkvision";
    SpellName["DetectThoughts"] = "Detect Thoughts";
    SpellName["EnhanceAbility"] = "Enhance Ability";
    SpellName["EnlargeReduce"] = "Enlarge/Reduce";
    SpellName["Enthrall"] = "Enthrall";
    SpellName["FindSteed"] = "Find Steed";
    SpellName["FindTraps"] = "Find Traps";
    SpellName["FlameBlade"] = "Flame Blade";
    SpellName["FlamingSphere"] = "Flaming Sphere";
    SpellName["GentleRepose"] = "Gentle Repose";
    SpellName["GustOfWind"] = "Gust of Wind";
    SpellName["HeatMetal"] = "Heat Metal";
    SpellName["HoldPerson"] = "Hold Person";
    SpellName["Invisibility"] = "Invisibility";
    SpellName["Knock"] = "Knock";
    SpellName["LesserRestoration"] = "Lesser Restoration";
    SpellName["Levitate"] = "Levitate";
    SpellName["LocateAnimalsOrPlants"] = "Locate Animals or Plants";
    SpellName["LocateObject"] = "Locate Object";
    SpellName["MagicMouth"] = "Magic Mouth";
    SpellName["MagicWeapon"] = "Magic Weapon";
    SpellName["MelfsAcidArrow"] = "Melf's Acid Arrow";
    SpellName["MirrorImage"] = "Mirror Image";
    SpellName["MistyStep"] = "Misty Step";
    SpellName["Moonbeam"] = "Moonbeam";
    SpellName["NystulsMagicAura"] = "Nystul's Magic Aura";
    SpellName["PassWithoutTrace"] = "Pass Without Trace";
    SpellName["PhantasmalForce"] = "Phantasmal Force";
    SpellName["PrayerOfHealing"] = "Prayer of Healing";
    SpellName["ProtectionFromPoison"] = "Protection from Poison";
    SpellName["RayOfEnfeeblement"] = "Ray of Enfeeblement";
    SpellName["RopeTrick"] = "Rope Trick";
    SpellName["ScorchingRay"] = "Scorching Ray";
    SpellName["SeeInvisibility"] = "See Invisibility";
    SpellName["Shatter"] = "Shatter";
    SpellName["Silence"] = "Silence";
    SpellName["SpiderClimb"] = "Spider Climb";
    SpellName["SpikeGrowth"] = "Spike Growth";
    SpellName["SpiritualWeapon"] = "Spiritual Weapon";
    SpellName["Suggestion"] = "Suggestion";
    SpellName["WardingBond"] = "Warding Bond";
    SpellName["Web"] = "Web";
    SpellName["ZoneOfTruth"] = "Zone of Truth";
    SpellName["AnimateDead"] = "Animate Dead";
    SpellName["AuraOfVitality"] = "Aura of Vitality";
    SpellName["BeaconOfHope"] = "Beacon of Hope";
    SpellName["BestowCurse"] = "Bestow Curse";
    SpellName["BlindingSmite"] = "Blinding Smite";
    SpellName["Blink"] = "Blink";
    SpellName["CallLightning"] = "Call Lightning";
    SpellName["Clairvoyance"] = "Clairvoyance";
    SpellName["ConjureAnimals"] = "Conjure Animals";
    SpellName["ConjureBarrage"] = "Conjure Barrage";
    SpellName["Counterspell"] = "Counterspell";
    SpellName["CreateFoodAndWater"] = "Create Food and Water";
    SpellName["CrusadersMantle"] = "Crusader's Mantle";
    SpellName["Daylight"] = "Daylight";
    SpellName["DispelMagic"] = "Dispel Magic";
    SpellName["ElementalWeapon"] = "Elemental Weapon";
    SpellName["Fear"] = "Fear";
    SpellName["FeignDeath"] = "Feign Death";
    SpellName["Fireball"] = "Fireball";
    SpellName["Fly"] = "Fly";
    SpellName["GaseousForm"] = "Gaseous Form";
    SpellName["GlyphOfWarding"] = "Glyph of Warding";
    SpellName["Haste"] = "Haste";
    SpellName["HungerOfHadar"] = "Hunger of Hadar";
    SpellName["HypnoticPattern"] = "Hypnotic Pattern";
    SpellName["LeomundsTinyHut"] = "Leomund's Tiny Hut";
    SpellName["LightningArrow"] = "Lightning Arrow";
    SpellName["LightningBolt"] = "Lightning Bolt";
    SpellName["MagicCircle"] = "Magic Circle";
    SpellName["MajorImage"] = "Major Image";
    SpellName["MassHealingWord"] = "Mass Healing Word";
    SpellName["MeldIntoStone"] = "Meld into Stone";
    SpellName["Nondetection"] = "Nondetection";
    SpellName["PhantomSteed"] = "Phantom Steed";
    SpellName["PlantGrowth"] = "Plant Growth";
    SpellName["ProtectionFromEnergy"] = "Protection from Energy";
    SpellName["RemoveCurse"] = "Remove Curse";
    SpellName["Revivify"] = "Revivify";
    SpellName["Sending"] = "Sending";
    SpellName["SleetStorm"] = "Sleet Storm";
    SpellName["Slow"] = "Slow";
    SpellName["SpeakWithDead"] = "Speak with Dead";
    SpellName["SpeakWithPlants"] = "Speak with Plants";
    SpellName["SpiritGuardians"] = "Spirit Guardians";
    SpellName["StinkingCloud"] = "Stinking Cloud";
    SpellName["Tongues"] = "Tongues";
    SpellName["VampiricTouch"] = "Vampiric Touch";
    SpellName["WaterBreathing"] = "Water Breathing";
    SpellName["WaterWalk"] = "Water Walk";
    SpellName["WindWall"] = "Wind Wall";
    SpellName["ArcaneEye"] = "Arcane Eye";
    SpellName["AuraOfLife"] = "Aura of Life";
    SpellName["AuraOfPurity"] = "Aura of Purity";
    SpellName["Banishment"] = "Banishment";
    SpellName["Blight"] = "Blight";
    SpellName["Compulsion"] = "Compulsion";
    SpellName["Confusion"] = "Confusion";
    SpellName["ConjureMinorElementals"] = "Conjure Minor Elementals";
    SpellName["ConjureWoodlandBeings"] = "Conjure Woodland Beings";
    SpellName["ControlWater"] = "Control Water";
    SpellName["DeathWard"] = "Death Ward";
    SpellName["DimensionDoor"] = "Dimension Door";
    SpellName["Divination"] = "Divination";
    SpellName["DominateBeast"] = "Dominate Beast";
    SpellName["EvardsBlackTentacles"] = "Evard's Black Tentacles";
    SpellName["Fabricate"] = "Fabricate";
    SpellName["FireShield"] = "Fire Shield";
    SpellName["FreedomOfMovement"] = "Freedom of Movement";
    SpellName["GiantInsect"] = "Giant Insect";
    SpellName["GraspingVine"] = "Grasping Vine";
    SpellName["GreaterInvisibility"] = "Greater Invisibility";
    SpellName["GuardianOfFaith"] = "Guardian of Faith";
    SpellName["HallucinatoryTerrain"] = "Hallucinatory Terrain";
    SpellName["IceStorm"] = "Ice Storm";
    SpellName["LeomundsSecretChest"] = "Leomund's Secret Chest";
    SpellName["LocateCreature"] = "Locate Creature";
    SpellName["MordenkainensFaithfulHound"] = "Mordenkainen's Faithful Hound";
    SpellName["MordenkainensPrivateSanctum"] = "Mordenkainen's Private Sanctum";
    SpellName["OtilukesResilientSphere"] = "Otiluke's Resilient Sphere";
    SpellName["PhantasmalKiller"] = "Phantasmal Killer";
    SpellName["Polymorph"] = "Polymorph";
    SpellName["StaggeringSmite"] = "Staggering Smite";
    SpellName["StoneShape"] = "Stone Shape";
    SpellName["Stoneskin"] = "Stoneskin";
    SpellName["WallOfFire"] = "Wall of Fire";
    SpellName["AnimateObjects"] = "Animate Objects";
    SpellName["AntilifeShell"] = "Antilife Shell";
    SpellName["Awaken"] = "Awaken";
    SpellName["BanishingSmite"] = "Banishing Smite";
    SpellName["BigbysHand"] = "Bigby's Hand";
    SpellName["CircleOfPower"] = "Circle of Power";
    SpellName["Cloudkill"] = "Cloudkill";
    SpellName["Commune"] = "Commune";
    SpellName["CommuneWithNature"] = "Commune with Nature";
    SpellName["ConeOfCold"] = "Cone of Cold";
    SpellName["ConjureElemental"] = "Conjure Elemental";
    SpellName["ConjureVolley"] = "Conjure Volley";
    SpellName["ContactOtherPlane"] = "Contact Other Plane";
    SpellName["Contagion"] = "Contagion";
    SpellName["Creation"] = "Creation";
    SpellName["DestructiveWave"] = "Destructive Wave";
    SpellName["DispelEvilAndGood"] = "Dispel Evil and Good";
    SpellName["DominatePerson"] = "Dominate Person";
    SpellName["Dream"] = "Dream";
    SpellName["FlameStrike"] = "Flame Strike";
    SpellName["Geas"] = "Geas";
    SpellName["GreaterRestoration"] = "Greater Restoration";
    SpellName["Hallow"] = "Hallow";
    SpellName["HoldMonster"] = "Hold Monster";
    SpellName["InsectPlague"] = "Insect Plague";
    SpellName["LegendLore"] = "Legend Lore";
    SpellName["MassCureWounds"] = "Mass Cure Wounds";
    SpellName["Mislead"] = "Mislead";
    SpellName["ModifyMemory"] = "Modify Memory";
    SpellName["Passwall"] = "Passwall";
    SpellName["PlanarBinding"] = "Planar Binding";
    SpellName["RaiseDead"] = "Raise Dead";
    SpellName["RarysTelepathicBond"] = "Rary's Telepathic Bond";
    SpellName["Reincarnate"] = "Reincarnate";
    SpellName["Scrying"] = "Scrying";
    SpellName["Seeming"] = "Seeming";
    SpellName["SwiftQuiver"] = "Swift Quiver";
    SpellName["Telekinesis"] = "Telekinesis";
    SpellName["TeleportationCircle"] = "Teleportation Circle";
    SpellName["TreeStride"] = "Tree Stride";
    SpellName["WallOfForce"] = "Wall of Force";
    SpellName["WallOfStone"] = "Wall of Stone";
    SpellName["ArcaneGate"] = "Arcane Gate";
    SpellName["BladeBarrier"] = "Blade Barrier";
    SpellName["ChainLightning"] = "Chain Lightning";
    SpellName["CircleOfDeath"] = "Circle of Death";
    SpellName["ConjureFey"] = "Conjure Fey";
    SpellName["Contingency"] = "Contingency";
    SpellName["CreateUndead"] = "Create Undead";
    SpellName["Disintegrate"] = "Disintegrate";
    SpellName["DrawmijsInstantSummon"] = "Drawmij's Instant Summon";
    SpellName["Eyebite"] = "Eyebite";
    SpellName["FindThePath"] = "Find the Path";
    SpellName["FleshToStone"] = "Flesh to Stone";
    SpellName["Forbiddance"] = "Forbiddance";
    SpellName["GlobeOfInvulnerability"] = "Globe of Invulnerability";
    SpellName["GuardsAndWards"] = "Guards and Wards";
    SpellName["Harm"] = "Harm";
    SpellName["Heal"] = "Heal";
    SpellName["HeroesFeast"] = "Heroes' Feast";
    SpellName["MagicJar"] = "Magic Jar";
    SpellName["MassSuggestion"] = "Mass Suggestion";
    SpellName["MoveEarth"] = "Move Earth";
    SpellName["OtilukesFreezingSphere"] = "Otiluke's Freezing Sphere";
    SpellName["OttosIrresistibleDance"] = "Otto's Irresistible Dance";
    SpellName["PlanarAlly"] = "Planar Ally";
    SpellName["ProgrammedIllusion"] = "Programmed Illusion";
    SpellName["Sunbeam"] = "Sunbeam";
    SpellName["TransportViaPlants"] = "Transport via Plants";
    SpellName["TrueSeeing"] = "True Seeing";
    SpellName["WallOfIce"] = "Wall of Ice";
    SpellName["WallOfThorns"] = "Wall of Thorns";
    SpellName["WindWalk"] = "Wind Walk";
    SpellName["WordOfRecall"] = "Word of Recall";
    SpellName["ConjureCelestial"] = "Conjure Celestial";
    SpellName["DelayedBlastFireball"] = "Delayed Blast Fireball";
    SpellName["DivineWord"] = "Divine Word";
    SpellName["Etherealness"] = "Etherealness";
    SpellName["FingerOfDeath"] = "Finger of Death";
    SpellName["FireStorm"] = "Fire Storm";
    SpellName["Forcecage"] = "Forcecage";
    SpellName["MirageArcane"] = "Mirage Arcane";
    SpellName["MordenkainensMagnificentMansion"] = "Mordenkainen's Magnificent Mansion";
    SpellName["MordenkainensSword"] = "Mordenkainen's Sword";
    SpellName["PlaneShift"] = "Plane Shift";
    SpellName["PrismaticSpray"] = "Prismatic Spray";
    SpellName["ProjectImage"] = "Project Image";
    SpellName["Regenerate"] = "Regenerate";
    SpellName["Resurrection"] = "Resurrection";
    SpellName["ReverseGravity"] = "Reverse Gravity";
    SpellName["Sequester"] = "Sequester";
    SpellName["Simulacrum"] = "Simulacrum";
    SpellName["Symbol"] = "Symbol";
    SpellName["Teleport"] = "Teleport";
    SpellName["AnimalShapes"] = "Animal Shapes";
    SpellName["AntimagicField"] = "Antimagic Field";
    SpellName["AntipathySympathy"] = "Antipathy/Sympathy";
    SpellName["Clone"] = "Clone";
    SpellName["ControlWeather"] = "Control Weather";
    SpellName["Demiplane"] = "Demiplane";
    SpellName["DominateMonster"] = "Dominate Monster";
    SpellName["Earthquake"] = "Earthquake";
    SpellName["Feeblemind"] = "Feeblemind";
    SpellName["Glibness"] = "Glibness";
    SpellName["HolyAura"] = "Holy Aura";
    SpellName["IncendiaryCloud"] = "Incendiary Cloud";
    SpellName["Maze"] = "Maze";
    SpellName["MindBlank"] = "Mind Blank";
    SpellName["PowerWordStun"] = "Power Word Stun";
    SpellName["Sunburst"] = "Sunburst";
    SpellName["Telepathy"] = "Telepathy";
    SpellName["Tsunami"] = "Tsunami";
    SpellName["AstralProjection"] = "Astral Projection";
    SpellName["Foresight"] = "Foresight";
    SpellName["Gate"] = "Gate";
    SpellName["Imprisonment"] = "Imprisonment";
    SpellName["MassHeal"] = "Mass Heal";
    SpellName["MeteorSwarm"] = "Meteor Swarm";
    SpellName["PowerWordHeal"] = "Power Word Heal";
    SpellName["PowerWordKill"] = "Power Word Kill";
    SpellName["PrismaticWall"] = "Prismatic Wall";
    SpellName["Shapechange"] = "Shapechange";
    SpellName["StormOfVengeance"] = "Storm of Vengeance";
    SpellName["TimeStop"] = "Time Stop";
    SpellName["TruePolymorph"] = "True Polymorph";
    SpellName["TrueResurrection"] = "True Resurrection";
    SpellName["Weird"] = "Weird";
    SpellName["Wish"] = "Wish";
})(SpellName = exports.SpellName || (exports.SpellName = {}));
class Spell {
    constructor(name, level, verbalRequirement, somaticRequirement, materialRequirement, castingTime, desc, duration, range, save) {
        this.name = name;
        this.level = level;
        this.verbalRequirement = verbalRequirement;
        this.somaticRequirement = somaticRequirement;
        this.materialRequirement = materialRequirement;
        this.castingTime = castingTime;
        this.desc = desc;
        this.duration = duration;
        this.range = range;
        this.save = save;
    }
    static fromJson(json) {
        let ret = new Spell(json.name, json.level, json.verbalRequirement, json.somaticRequirement, json.materialRequirement, json.castingTime, json.desc, json.duration, json.range, SpellSave.fromJson(json.save));
        ret.id = json.id;
        return ret;
    }
}
exports.Spell = Spell;
class SpellSave {
    constructor(ability, toBeat, ifBeaten, ifLost) {
        this.ability = ability;
        this.toBeat = toBeat;
        this.ifBeaten = ifBeaten;
        this.ifLost = ifLost;
    }
    static fromJson(json) {
        if (!json)
            return;
        return new SpellSave(json.ability, json.toBeat, json.ifBeaten, json.ifLost);
    }
}
exports.SpellSave = SpellSave;


/***/ }),

/***/ "./ts/models/tools.ts":
/*!****************************!*\
  !*** ./ts/models/tools.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ArtisanTools;
(function (ArtisanTools) {
    ArtisanTools["Alchemist"] = "Alchemist's Supplies";
    ArtisanTools["Brewer"] = "Brewer's Supplies ";
    ArtisanTools["Calligrapher"] = "Calligrapher's Supplies ";
    ArtisanTools["Carpenter"] = "Carpenter's Tools";
    ArtisanTools["Cartographer"] = "Cartographer's Tools";
    ArtisanTools["Cobbler"] = "Cobbler's Tools";
    ArtisanTools["Cook"] = "Cook's Utensils ";
    ArtisanTools["Glassblower"] = "Glassblower's Tools";
    ArtisanTools["Jeweler"] = "Jeweler's Tools";
    ArtisanTools["Leatherworker"] = "Leatherworker's Tools";
    ArtisanTools["Mason"] = "Mason's Tools";
    ArtisanTools["Painter"] = "Painter's Supplies";
    ArtisanTools["Potter"] = "Potter's Tools";
    ArtisanTools["Smith"] = "Smith's Tools";
    ArtisanTools["Tinker"] = "Tinker's Tools";
    ArtisanTools["Weaver"] = "Weaver's Tools";
    ArtisanTools["Woodcarver"] = "Woodcarver's Tools";
})(ArtisanTools = exports.ArtisanTools || (exports.ArtisanTools = {}));
var GamingSet;
(function (GamingSet) {
    GamingSet["Dice"] = "Dice Set";
    GamingSet["Dragonchess"] = "Dragonchess Set";
    GamingSet["PlayingCards"] = "Playing Card Set";
    GamingSet["ThreeDragonAnte"] = "Three-Dragon Ante Set";
})(GamingSet = exports.GamingSet || (exports.GamingSet = {}));
var Instrument;
(function (Instrument) {
    Instrument["Bagpipes"] = "Bagpipes";
    Instrument["Drum"] = "Drum";
    Instrument["Dulcimer"] = "Dulcimer";
    Instrument["Flute"] = "Flute";
    Instrument["Lute"] = "Lute ";
    Instrument["Lyre"] = "Lyre";
    Instrument["Horn"] = "Horn";
    Instrument["Pan"] = "Pan Flute";
    Instrument["Shawm"] = "Shawm";
    Instrument["Viol"] = "Viol";
})(Instrument = exports.Instrument || (exports.Instrument = {}));
var MiscTools;
(function (MiscTools) {
    MiscTools["Disguise"] = "Disguise Kit";
    MiscTools["Forgery"] = "Forgery Kit";
    MiscTools["Herbalism"] = "Herbalism Kit";
    MiscTools["Navigator"] = "Navigator's Tools";
    MiscTools["Poisoner"] = "Poisoner's Kit";
    MiscTools["Thieves"] = "Thieves' Tools";
})(MiscTools = exports.MiscTools || (exports.MiscTools = {}));
var Mount;
(function (Mount) {
    Mount["Camel"] = "Camel";
    Mount["Donkey"] = "Donkey";
    Mount["Elephant"] = "Elephant";
    Mount["DraftHorse"] = "Horse (draft)";
    Mount["Horse"] = "Horse (riding)";
    Mount["Mastiff"] = "Mastiff";
    Mount["Pony"] = "Pony";
    Mount["Warhorse"] = "Warhorse";
})(Mount = exports.Mount || (exports.Mount = {}));
var Vehicle;
(function (Vehicle) {
    Vehicle["Carriage"] = "Carriage";
    Vehicle["Cart"] = "Cart";
    Vehicle["Chariot"] = "Chariot";
    Vehicle["Sled"] = "Sled";
    Vehicle["Wagon"] = "Wagon";
})(Vehicle = exports.Vehicle || (exports.Vehicle = {}));
var Boat;
(function (Boat) {
    Boat["Galley"] = "Galley";
    Boat["Keelboat"] = "Keelboat";
    Boat["Longship"] = "Longship";
    Boat["Rowboat"] = "Rowboat";
    Boat["Sailing"] = "Sailing";
    Boat["Warship"] = "Warship";
})(Boat = exports.Boat || (exports.Boat = {}));


/***/ }),

/***/ "./ts/services/data.ts":
/*!*****************************!*\
  !*** ./ts/services/data.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const character_1 = __webpack_require__(/*! ../models/character */ "./ts/models/character.ts");
const race_1 = __webpack_require__(/*! ../models/race */ "./ts/models/race.ts");
const class_1 = __webpack_require__(/*! ../models/class */ "./ts/models/class.ts");
const background_1 = __webpack_require__(/*! ../models/background */ "./ts/models/background.ts");
const spells_1 = __webpack_require__(/*! ../models/spells */ "./ts/models/spells.ts");
const dexie_1 = __webpack_require__(/*! dexie */ "./node_modules/dexie/dist/dexie.es.js");
class Data {
    constructor() {
        this.db = new Database();
    }
    getCharacters() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db.ready) {
                yield this.db.init();
            }
            return yield this.db.allCharacters();
        });
    }
    addCharacter(ch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.addCharacter(ch);
        });
    }
    saveCharacter(ch) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.saveCharacters([ch]);
        });
    }
    saveCharacters(characters) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.db.ready) {
                yield this.db.init();
            }
            return yield this.db.saveCharacters(characters);
        });
    }
    getSpellsForClass(cls) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.spellsForClass(cls);
        });
    }
    static getAllClasses() {
        return Object.getOwnPropertyNames(class_1.ClassKind).map(n => class_1.ClassKind[n]);
    }
    static getAllRaces() {
        return Object.getOwnPropertyNames(race_1.RaceKind).map(n => race_1.RaceKind[n]);
    }
    static subRaceFor(race) {
        switch (race) {
            case race_1.RaceKind.Elf:
                return Object.getOwnPropertyNames(race_1.Elf).map(n => race_1.Elf[n]);
            case race_1.RaceKind.Dwarf:
                return Object.getOwnPropertyNames(race_1.Dwarf).map(n => race_1.Dwarf[n]);
            case race_1.RaceKind.Gnome:
                return Object.getOwnPropertyNames(race_1.Gnome).map(n => race_1.Gnome[n]);
            case race_1.RaceKind.Halfling:
                return Object.getOwnPropertyNames(race_1.Halfling).map(n => race_1.Halfling[n]);
            case race_1.RaceKind.Dragonborn:
                return Object.getOwnPropertyNames(race_1.Dragon).map(n => race_1.Dragon[n]);
            default:
                return null;
        }
    }
    static getAllBackground() {
        return [
            background_1.Background.Acolyte(),
            background_1.Background.Charlatan(),
            background_1.Background.Criminal(),
            background_1.Background.Entertainer(),
            background_1.Background.FolkHero(),
            background_1.Background.GuildArtisan(),
            background_1.Background.Hermit(),
            background_1.Background.Noble(),
            background_1.Background.Outlander(),
            background_1.Background.Sage(),
            background_1.Background.Sailor(),
            background_1.Background.Soldier(),
            background_1.Background.Urchin(),
        ];
    }
    static levelForExp(exp) {
        if (exp < 300) {
            return 1;
        }
        if (exp < 900) {
            return 2;
        }
        if (exp < 2700) {
            return 3;
        }
        if (exp < 6500) {
            return 4;
        }
        if (exp < 14000) {
            return 5;
        }
        if (exp < 23000) {
            return 6;
        }
        if (exp < 34000) {
            return 7;
        }
        if (exp < 48000) {
            return 8;
        }
        if (exp < 64000) {
            return 9;
        }
        if (exp < 85000) {
            return 10;
        }
        if (exp < 100000) {
            return 11;
        }
        if (exp < 120000) {
            return 12;
        }
        if (exp < 140000) {
            return 13;
        }
        if (exp < 165000) {
            return 14;
        }
        if (exp < 195000) {
            return 15;
        }
        if (exp < 225000) {
            return 16;
        }
        if (exp < 265000) {
            return 17;
        }
        if (exp < 305000) {
            return 18;
        }
        if (exp < 355000) {
            return 19;
        }
        return 20;
    }
    static proficiencyBonusFor(level) {
        if (level < 5) {
            return 2;
        }
        if (level < 9) {
            return 3;
        }
        if (level < 13) {
            return 4;
        }
        if (level < 17) {
            return 5;
        }
        return 6;
    }
    static averageHpFor(classKind) {
        switch (classKind) {
            case class_1.ClassKind.Barbarian:
                return 7;
            case class_1.ClassKind.Fighter:
            case class_1.ClassKind.Paladin:
            case class_1.ClassKind.Ranger:
                return 6;
            case class_1.ClassKind.Bard:
            case class_1.ClassKind.Cleric:
            case class_1.ClassKind.Druid:
            case class_1.ClassKind.Rogue:
            case class_1.ClassKind.Warlock:
                return 5;
            case class_1.ClassKind.Sorcerer:
            case class_1.ClassKind.Wizard:
                return 4;
        }
    }
    static startingWealthFor(classKind) {
        let mul = 10;
        let numD4 = 0;
        switch (classKind) {
            case class_1.ClassKind.Barbarian:
            case class_1.ClassKind.Druid:
                numD4 = 2;
                break;
            case class_1.ClassKind.Sorcerer:
                numD4 = 3;
                break;
            case class_1.ClassKind.Rogue:
            case class_1.ClassKind.Warlock:
            case class_1.ClassKind.Wizard:
                numD4 = 4;
                break;
            default:
                numD4 = 5;
            case class_1.ClassKind.Monk:
                mul = 1;
                break;
        }
        let gp = 0;
        for (var i = 0; i < numD4; i++) {
            gp += Math.floor(Math.random() * 4) + 1;
        }
        return new character_1.Wealth(0, 0, 0, gp * mul, 0);
    }
}
exports.Data = Data;
class ClassFeature {
    constructor(classKind, level, name, shortDesc, longDesc, options, id) {
        this.classKind = classKind;
        this.level = level;
        this.name = name;
        this.shortDesc = shortDesc;
        this.longDesc = longDesc;
        this.options = options;
        if (id) {
            this.id = id;
        }
    }
    static fromJson(json) {
        let ret = new ClassFeature(json.classKind, json.level, json.name, json.shortDesc, json.longDesc);
        if (json.options) {
            ret.options = json.options.map(ClassFeatureOption.fromJson);
        }
        if (json.id) {
            ret.id = json.id;
        }
        return ret;
    }
}
exports.ClassFeature = ClassFeature;
class ClassFeatureOption {
    constructor(name, shortDesc, longDesc, features, id) {
        this.name = name;
        this.shortDesc = shortDesc;
        this.longDesc = longDesc;
        this.features = features;
        if (id) {
            this.id = id;
        }
    }
    static fromJson(json, features) {
        let ret = new ClassFeatureOption(json.name, json.shortDesc, json.longDesc);
        if (features) {
            ret.features = features.map(ClassFeature.fromJson);
        }
        if (json.id) {
            ret.id = json.id;
        }
        return ret;
    }
}
exports.ClassFeatureOption = ClassFeatureOption;
class Database extends dexie_1.default {
    constructor() {
        super("DnDCharacterManager");
        this.ready = false;
        this.version(2).stores({
            seeds: "++id",
            characters: "++id,name",
            spells: "++id,name,*classKinds",
            classFeatures: "++id,classKind,level,optionId",
            classFeatureOptions: "++id,featId,"
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            console.info('checking for seeds');
            if ((yield this.seeds.count()) === 0) {
                console.info('no seeds... seeding');
                yield this.seed();
            }
            this.ready = true;
        });
    }
    seed() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let mod = yield Promise.resolve().then(() => __webpack_require__(/*! ./seeder */ "./ts/services/seeder.ts"));
                yield mod.seed(this);
            }
            catch (e) {
                console.error('error seeding', e);
                throw e;
            }
        });
    }
    allCharacters() {
        return __awaiter(this, void 0, void 0, function* () {
            let arr = yield this.characters.toArray();
            return arr.map(character_1.Character.fromJson);
        });
    }
    addCharacter(ch) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.characters.add(ch);
            }
            catch (e) {
                console.error('failed to add character', e, ch);
            }
        });
    }
    saveCharacters(chs) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.characters.bulkPut(chs);
            }
            catch (e) {
                console.error('Failed to save characters', e, chs);
            }
        });
    }
    spellsForClass(cls) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let dbSpells = yield this.spells.where('classKind').equals(cls).toArray();
                return dbSpells.map(s => new spells_1.Spell(s.name, s.level, s.verbalRequirement, s.somaticRequirement, s.materialRequirement, s.castingTime, s.desc, s.duration, s.range, s.save));
            }
            catch (e) {
                console.error('failed to get spells for ', cls, e);
                throw e;
            }
        });
    }
}
exports.Database = Database;


/***/ }),

/***/ "./ts/services/seeder.ts":
/*!*******************************!*\
  !*** ./ts/services/seeder.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const classDetails_1 = __webpack_require__(/*! ../models/classDetails */ "./ts/models/classDetails.ts");
const skills_1 = __webpack_require__(/*! ../models/skills */ "./ts/models/skills.ts");
const character_1 = __webpack_require__(/*! ../models/character */ "./ts/models/character.ts");
const range_1 = __webpack_require__(/*! ../models/range */ "./ts/models/range.ts");
const abilityScore_1 = __webpack_require__(/*! ../models/abilityScore */ "./ts/models/abilityScore.ts");
const race_1 = __webpack_require__(/*! ../models/race */ "./ts/models/race.ts");
const class_1 = __webpack_require__(/*! ../models/class */ "./ts/models/class.ts");
const background_1 = __webpack_require__(/*! ../models/background */ "./ts/models/background.ts");
const tools_1 = __webpack_require__(/*! ../models/tools */ "./ts/models/tools.ts");
function seed(db) {
    return __awaiter(this, void 0, void 0, function* () {
        let spellBooks = yield fetch(window.location.href + 'spellBook.json')
            .then(res => res.json());
        console.info('seeding characters');
        yield db.characters.bulkPut(seedCharacters());
        console.info('seeding spells');
        yield db.spells.bulkPut(spellBooks);
        console.info('seeding seeds');
        yield db.seeds.put({ when: new Date().toISOString() });
        if (db.verno > 1) {
        }
    });
}
exports.seed = seed;
function seedCharacters() {
    let d = new character_1.Character('Daggers', new abilityScore_1.AbilityScores([
        new abilityScore_1.AbilityScore(8, abilityScore_1.AbilityKind.Strength),
        new abilityScore_1.AbilityScore(8 + 7, abilityScore_1.AbilityKind.Dexterity),
        new abilityScore_1.AbilityScore(8, abilityScore_1.AbilityKind.Constitution),
        new abilityScore_1.AbilityScore(8, abilityScore_1.AbilityKind.Intelligence),
        new abilityScore_1.AbilityScore(8 + 1, abilityScore_1.AbilityKind.Wisdom),
        new abilityScore_1.AbilityScore(8 + 7, abilityScore_1.AbilityKind.Charisma),
    ]), new race_1.Race(race_1.RaceKind.Human), new class_1.Class(class_1.ClassKind.Rogue, 4, [
        [abilityScore_1.AbilityKind.Strength, 0],
        [abilityScore_1.AbilityKind.Dexterity, 2],
        [abilityScore_1.AbilityKind.Constitution, 0],
        [abilityScore_1.AbilityKind.Intelligence, 0],
        [abilityScore_1.AbilityKind.Wisdom, 0],
        [abilityScore_1.AbilityKind.Charisma, 0],
    ], [skills_1.SkillKind.Acrobatics, skills_1.SkillKind.SleightOfHand, skills_1.SkillKind.Persuasion, skills_1.SkillKind.Perception,]), new background_1.Background(background_1.BackgroundKind.Criminal, [skills_1.SkillKind.Stealth, skills_1.SkillKind.Deception], [], [tools_1.MiscTools.Thieves, tools_1.GamingSet.Dragonchess]), character_1.Alignment.TrueNeutral(), 5116, new character_1.Height(5, 8), 160, 'Blue', 0, new character_1.Armor(character_1.LightArmor.Leather, character_1.ArmorWeight.Light, 2), null, new skills_1.Skills(), [new character_1.Weapon('Dagger', character_1.WeaponType.Melee, character_1.WeaponKind.Simple, character_1.WeaponDamageKind.Piercing, character_1.WeaponWeight.Light, character_1.WeaponHandedness.One, [1, 4], new range_1.Range(5), 1, new range_1.Range(20, 60), false, true),
        new character_1.Weapon('Short Bow', character_1.WeaponType.Range, character_1.WeaponKind.Simple, character_1.WeaponDamageKind.Piercing, character_1.WeaponWeight.Light, character_1.WeaponHandedness.Two, [1, 6], new range_1.Range(80, 320), 1, null, true, false),
    ], new character_1.Wealth(0, 0, 0, 3450, 0), [character_1.NormalLanguage.Common], [], 0, 0, [
        new character_1.MagicItem('Cloak of Elvenkind', 'Hood up: Preception checks to see you have disadvantage, stealth checks have advantage'),
        new character_1.MagicItem('Goggles of Night', 'Darkvision (60 feet)'),
    ], [new character_1.ExpendableItem(1, 'Health Pot.', 'heal 2d4+2 Damage')]);
    let details = d.characterClass.classDetails;
    details.archType = classDetails_1.RoguishArchType.Thief;
    details.expertise.push(skills_1.SkillKind.Deception, skills_1.SkillKind.Stealth);
    return [d];
}


/***/ })

/******/ });
//# sourceMappingURL=seeder.js.map