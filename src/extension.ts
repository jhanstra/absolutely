import * as vscode from 'vscode';

const FORMAT_DOCUMENT = "editor.action.absolutely";
const DOCUMENT_CODE_ACTION_KIND = vscode.CodeActionKind.Source.append("absolutely");

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider("*", new FormatActions(), {
      providedCodeActionKinds: FormatActions.providedCodeActionKinds,
    })
  );
}

let cache: vscode.CodeAction[] | undefined;
interface Object { [fieldName: string]: any };

export class FormatActions implements vscode.CodeActionProvider {
  public static readonly providedCodeActionKinds = [
    DOCUMENT_CODE_ACTION_KIND,
  ];

  public provideCodeActions(
    document: vscode.TextDocument,
    range: vscode.Range
  ): vscode.CodeAction[] | undefined {
    const editor = vscode.window.activeTextEditor;
    const currentDocPath = vscode.window.activeTextEditor?.document.uri.path
    let folderPath
    if (!vscode.workspace.workspaceFolders || !currentDocPath) return
    vscode.workspace.workspaceFolders.forEach(f => {
      if (currentDocPath.includes(f.uri.path)) folderPath = f.uri.path
    })
    const file = document.getText()

    let config: Object = {}
    vscode.workspace.openTextDocument(`${folderPath}/absolutely.json`).then((document) => {
      config = JSON.parse(document.getText());
      const relevant: Object = {}
      Object.entries(config).forEach(([library, arrOfImports]: [string, string[]]) => {
        arrOfImports.forEach((mod: string) => {
          if (file.includes(mod)) {
            if (!relevant[library]) relevant[library] = []
            relevant[library].push(mod)
          }
        })
      })


      let toAdd = ''
      Object.keys(relevant).forEach((library: string) => {
        toAdd += `import { ${relevant[library].join(', ')} } from "${library}"\n`
      })

      if (!editor) return
      editor.edit(editBuilder => {
        const position = new vscode.Position(0, 0)
        editBuilder.replace(position, toAdd);
      });
    });

    if (cache) return cache;
    const formatDocumentAction = this.getFormatDocumentAction();
    cache = [formatDocumentAction];
    return cache;
  }

  private getFormatDocumentAction(
    actionKind: vscode.CodeActionKind = DOCUMENT_CODE_ACTION_KIND
  ): vscode.CodeAction {
    const action = new vscode.CodeAction("Format Document Absolutely", actionKind);
    action.command = {
      command: "editor.action.absolutely",
      title: "Absolutely - add imports automagically",
      tooltip: "This will add imports that do not exist yet in this file.",
    };
    return action;
  }
}
