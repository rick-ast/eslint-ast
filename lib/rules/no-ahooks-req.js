// @ts-check
const ahooks = 'ahooks'
const useRequest = 'useRequest'
/**
 * if use custom `useRequest` as a wrapper,
 * enable this rule to avoid accidentally import `useRequest` from ahooks
 * ```ts
 * export const useRequest = <TData, TParam extends any[]>(
 *  service: Service<TData, TParam>,
 *  deps: DependencyList,
 *  options?: Omit<Options<TData, TParam>, 'refreshDeps'>,
 * ) => {
 *  return useARequest<TData, TParam>(service, {
 *    ...options,
 *    refreshDeps: deps,
 *  })
 * }
 * ```
 * then add rule
 * ```json
 * {
 *   // ...
 *   "react-hooks/exhaustive-deps": [
 *     "warn",
 *     {
 *       "additionalHooks": "(useRequest)"
 *     }
 *   ]
 * }
 *  ```
 *  to eslint config
 */
module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: `disallow access to ${useRequest} from ${ahooks}`,
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: 'code',
    hasSuggestions: true,
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        autoFix: false,
        properties: {
          autoFix: {
            type: 'boolean',
          },
        },
      },
    ],
  },
  create(context) {
    function checkNode(node) {
      const { source, specifiers } = node

      if (!source) return

      if (source.value === ahooks) {
        const reqSpec = specifiers.find((spec) => {
          const name = spec.imported?.name ?? spec.exported?.name
          return name === useRequest
        })
        if (reqSpec) {
          const fix = (fixer) => {
            return fixer.replaceTextRange(
              [
                specifiers[0].range[0],
                specifiers[specifiers.length - 1].range[1],
              ],
              specifiers
                .filter((spec) => {
                  const name = spec.imported?.name ?? spec.exported?.name
                  return name !== useRequest
                })
                .map((spec) => spec.imported?.name ?? spec.exported?.name)
                .join(', '),
            )
          }
          context.report({
            node,
            loc: reqSpec.loc,
            message: `Please do not use '${useRequest}' from ${ahooks}.`,
            fix: context.options[0]?.autoFix && fix,
            suggest: [
              {
                desc: `Remove the '${useRequest}' import from ${ahooks}`,
                fix,
              },
            ],
          })
        }
      }
    }
    /** @see https://astexplorer.net/ */
    return {
      ImportDeclaration: checkNode,
      ExportNamedDeclaration: checkNode,
    }
  },
}
