"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StarWarsDatabankError = void 0;
class StarWarsDatabankError extends Error {
    isStarWarsDatabankError = true;
    sdk = 'StarWarsDatabank';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.StarWarsDatabankError = StarWarsDatabankError;
//# sourceMappingURL=StarWarsDatabankError.js.map