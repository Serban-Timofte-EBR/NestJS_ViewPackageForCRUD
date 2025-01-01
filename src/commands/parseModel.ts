import * as ts from "typescript";

export function parseModel(modelPath: string): { fields: string[] } {
  const program = ts.createProgram([modelPath], {});
  const sourceFile = program.getSourceFile(modelPath);

  if (!sourceFile) {
    throw new Error(`Cannot find model file at ${modelPath}`);
  }

  const fields: string[] = [];

  ts.forEachChild(sourceFile, (node) => {
    if (ts.isInterfaceDeclaration(node)) {
      node.members.forEach((member) => {
        if (ts.isPropertySignature(member) && member.name) {
          fields.push(member.name.getText());
        }
      });
    } else if (ts.isTypeAliasDeclaration(node)) {
      if (
        ts.isTypeLiteralNode(node.type) &&
        node.type.members.every((member) => ts.isPropertySignature(member))
      ) {
        node.type.members.forEach((member) => {
          if (ts.isPropertySignature(member) && member.name) {
            fields.push(member.name.getText());
          }
        });
      }
    }
  });

  return { fields };
}
