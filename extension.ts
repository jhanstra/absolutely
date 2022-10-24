/*---------------------------------------------------------
 * Copyright (C) Rohit Gohri (https://rohit.page). All rights reserved.
 *--------------------------------------------------------*/

const vscode = require('vscode');

const FORMAT_DOCUMENT = "editor.action.absolutely";

/**
 * @deprecated
 */
const DOCUMENT_CODE_ACTION_KIND_LEGACY = vscode.CodeActionKind.SourceFixAll.append(
  "format"
);

const DOCUMENT_CODE_ACTION_KIND = vscode.CodeActionKind.Source.append(
  "absolutely"
);

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider("*", new FormatActions(), {
      providedCodeActionKinds: FormatActions.providedCodeActionKinds,
    })
  );
}

let cache: vscode.CodeAction[] | undefined;

/**
 * Provides code actions for calling format document and format modified
 */
export class FormatActions implements vscode.CodeActionProvider {
  public static readonly providedCodeActionKinds = [
    DOCUMENT_CODE_ACTION_KIND_LEGACY,
    DOCUMENT_CODE_ACTION_KIND,
    MODIFIED_CODE_ACTION_KIND,
  ];

  public provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range
  ): vscode.CodeAction[] | undefined {
    if (cache) return cache;
    const formatDocumentActionLegacy = this.getFormatDocumentAction(
      DOCUMENT_CODE_ACTION_KIND_LEGACY
    );
    const formatDocumentAction = this.getFormatDocumentAction();
    const formatModifiedAction = this.getFormatModifiedAction();

    cache = [
      formatDocumentActionLegacy,
      formatDocumentAction,
      formatModifiedAction,
    ];
    return cache;
  }

  private getFormatDocumentAction(
    actionKind: vscode.CodeActionKind = DOCUMENT_CODE_ACTION_KIND
  ): vscode.CodeAction {
    const action = new vscode.CodeAction("Format Document", actionKind);
    action.command = {
      command: FORMAT_DOCUMENT,
      title: "Format Document",
      tooltip: "This will format the document with the default formatter.",
    };
    return action;
  }

}

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
