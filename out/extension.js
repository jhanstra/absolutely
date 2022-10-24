"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatActions = exports.activate = void 0;
const vscode = require("vscode");
const FORMAT_DOCUMENT = "editor.action.absolutely";
const DOCUMENT_CODE_ACTION_KIND = vscode.CodeActionKind.Source.append("absolutely");
function activate(context) {
    context.subscriptions.push(vscode.languages.registerCodeActionsProvider("*", new FormatActions(), {
        providedCodeActionKinds: FormatActions.providedCodeActionKinds,
    }));
}
exports.activate = activate;
let cache;
;
class FormatActions {
    provideCodeActions(document, range) {
        var _a;
        const editor = vscode.window.activeTextEditor;
        const currentDocPath = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.document.uri.path;
        let folderPath;
        if (!vscode.workspace.workspaceFolders || !currentDocPath)
            return;
        vscode.workspace.workspaceFolders.forEach(f => {
            if (currentDocPath.includes(f.uri.path))
                folderPath = f.uri.path;
        });
        const file = document.getText();
        let config = {};
        vscode.workspace.openTextDocument(`${folderPath}/absolutely.json`).then((document) => {
            config = JSON.parse(document.getText());
            const relevant = {};
            Object.entries(config).forEach(([library, arrOfImports]) => {
                arrOfImports.forEach((mod) => {
                    if (file.includes(mod)) {
                        if (!relevant[library])
                            relevant[library] = [];
                        relevant[library].push(mod);
                    }
                });
            });
            let toAdd = '';
            Object.keys(relevant).forEach((library) => {
                toAdd += `import { ${relevant[library].join(', ')} } from "${library}"\n`;
            });
            if (!editor)
                return;
            editor.edit(editBuilder => {
                const position = new vscode.Position(0, 0);
                editBuilder.replace(position, toAdd);
            });
        });
        if (cache)
            return cache;
        const formatDocumentAction = this.getFormatDocumentAction();
        cache = [formatDocumentAction];
        return cache;
    }
    getFormatDocumentAction(actionKind = DOCUMENT_CODE_ACTION_KIND) {
        const action = new vscode.CodeAction("Format Document Absolutely", actionKind);
        action.command = {
            command: "editor.action.absolutely",
            title: "Absolutely - add imports automagically",
            tooltip: "This will add imports that do not exist yet in this file.",
        };
        return action;
    }
}
exports.FormatActions = FormatActions;
FormatActions.providedCodeActionKinds = [
    DOCUMENT_CODE_ACTION_KIND,
];
//# sourceMappingURL=extension.js.map