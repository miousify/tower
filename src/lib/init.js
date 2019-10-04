var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let Model = require('../lib/db/models');
let Actions = require('../lib/actions').Actions;
const JobModel = Model.JobModel;
const LogModel = Model.LogModel;
module.exports = function () {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Started");
        let jobs = yield JobModel.find().exec();
        let actions = new Actions();
        let services = yield actions.getAllServices();
    });
};
//# sourceMappingURL=init.js.map