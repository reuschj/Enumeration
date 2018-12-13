
'use strict';

/**
 * Holds enumerated value with case and raw value
 */
class EnumeratedValue {
    /**
     * @constructor
     * @param {string} enumeratedCase
     * @param {*} rawValue
     * @return {Readonly<EnumeratedValue>}
     */
    constructor(enumeratedCase, rawValue) {
        this.enumeratedCase = enumeratedCase;
        this.rawValue = rawValue;
        return Object.freeze(this);
    }

    /**
     * Getter for enumerated case
     * @return {string}
     */
    getEnumeratedCase() {
        return this.enumeratedCase;
    }

    /**
     * Getter for raw value
     * @return {*}
     */
    getRawValue() {
        return this.rawValue;
    }

}

// Export
module.exports = EnumeratedValue;