'use strict';
/**
 * Using statement.
 * @template T
 * @param {T} resource
 * @param {(resource: T) => void} func
 */
function using(resource, func) {
    try {
        func(resource);
        resource.dispose();
    }
    catch (ex) {
        if (resource !== null) {
            resource.dispose();
        }
        throw ex;
    }
}
exports.using = using;
;

//# sourceMappingURL=../maps/common/Using.js.map
