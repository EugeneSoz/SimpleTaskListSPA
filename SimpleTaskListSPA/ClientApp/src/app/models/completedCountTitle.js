"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CompletedCountTitle = /** @class */ (function () {
    function CompletedCountTitle() {
    }
    CompletedCountTitle.prototype.getTitle = function (taskCount) {
        var valueToCheck = taskCount < 20
            ? taskCount
            : taskCount % taskCount.toString().length;
        switch (valueToCheck) {
            case 1:
                return taskCount + " \u0437\u0430\u0434\u0430\u0447\u0430";
            case 2:
            case 3:
            case 4:
                return taskCount + " \u0437\u0430\u0434\u0430\u0447\u0438";
            default:
                return taskCount + " \u0437\u0430\u0434\u0430\u0447";
        }
    };
    return CompletedCountTitle;
}());
exports.CompletedCountTitle = CompletedCountTitle;
//# sourceMappingURL=completedCountTitle.js.map