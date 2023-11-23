/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
const reactHooksPlugin = require('eslint-plugin-react-hooks')

const reactHooksCreate = reactHooksPlugin.rules['exhaustive-deps'].create

const hook = 'useRequest'

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: `verifies the list of dependencies for ${hook}`,
      recommended: true,
    },
    hasSuggestions: false,
  },
  create(context) {
    const report = (problem) => {
      problem.message = problem.message
        .replace('React Hook', hook)
        .replace(
          /Either include (it|them) or remove the dependency array/,
          "Please add $1 to 'options.refreshDeps'",
        )
      problem.suggest = undefined
      // const { loc } = problem.node
      // loc.end = {
      //   line: loc.start.line,
      //   column: loc.start.column + hook.length,
      // }
      context.report(problem)
    }
    const reactHooksCallExpression = reactHooksCreate({
      options: [{ additionalHooks: `(${hook})` }],
      report,
      getScope: context.getScope,
      getSource: context.getSource,
      getSourceCode: context.getSourceCode,
    })

    return {
      CallExpression: function (node) {
        if (node.callee.type === 'Identifier' && hook === node.callee.name) {
          const arg1 = node.arguments[1]
          let refreshDeps
          if (arg1?.type === 'ObjectExpression') {
            for (const opt of arg1.properties) {
              if (opt.key.name === 'refreshDeps') {
                refreshDeps = opt.value.elements
                break
              }
            }
          }
          node.arguments[1] = {
            type: 'ArrayExpression',
            elements: refreshDeps || [],
            loc: node.loc,
            parent: node.parent,
            range: node.range,
          }
          reactHooksCallExpression.CallExpression(node)
        }
      },
    }
  },
}
