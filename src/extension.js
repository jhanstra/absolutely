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
/**
 * Provides code actions for calling format document
 */
class FormatActions {
    provideCodeActions(document, range) {
        vscode.window.showInformationMessage(`Hello there from absolutely!`);
        const editor = vscode.window.activeTextEditor;
        vscode.workspace.openTextDocument('./absolutely.json').then((document) => {
            let text = document.getText();
            console.log('absolutelyConfig', text);
        });
        const text = document.getText();
        const newText = text.split('').reverse().join('');
        editor.edit(editBuilder => {
            const position = new vscode.Position(0, 0);
            editBuilder.replace(position, 'test');
        });
        // console.log('range', range)
        // console.log('cache', cache)
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
            title: "Format Document Absolutely Command",
            tooltip: "This will format the document with absolutely.",
        };
        return action;
    }
}
exports.FormatActions = FormatActions;
FormatActions.providedCodeActionKinds = [
    DOCUMENT_CODE_ACTION_KIND,
];
// const vscode = require('vscode');
// function activate(context) {
//   const disposable = vscode.commands.registerCommand('absolutely.run', function () {
// 		const editor = vscode.window.activeTextEditor;
//     console.log('editor', editor)
//     if (editor) {
//       const document = editor.document.getText();
//       console.log('document', document)
//       const newDocument = document.split('').reverse().join('')
//       vscode.window.showInformationMessage(`Hello there from ${newDocument}!`);
//       console.log('newDocument', newDocument)
//       editor.edit(editBuilder => {
//         const position = new vscode.Position(0, 0)
//         editBuilder.replace(position, 'test');
//       });
//     }
// 	});
// 	context.subscriptions.push(disposable);
// }
// // This method is called when your extension is deactivated
// function deactivate() {}
// module.exports = {
// 	activate,
// 	deactivate
// }
//# sourceMappingURL=extension.js.map