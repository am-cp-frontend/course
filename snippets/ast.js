const ASTTransform = {
    ast: null,
    modules: [],
    parseAST (input) {
        const { children } = this.tokenize(input, 0)
        this.ast = children
    },

    tokenize (input, index) {
        let token = '', resultingObject = [], stopIndex

        const addBasicNode = (name, children) => resultingObject.push({
            type: 'BasicNode',
            name,
            children
        })

        for (let i = index; i < input.length; i++) {
            if (input[i] === '{') {
                const { newIndex, children } = this.tokenize(input, i + 1)
                addBasicNode(token, children)
                i = newIndex
                token = ''
            } else if (input[i] === '\n') {
                if (token) addBasicNode(token, null)
                token = ''
            } else if (input[i] === '}') {
                if (token) addBasicNode(token, null)
                stopIndex = i + 1
                break
            } else if (input[i] !== ' ') {
                token += input[i]
            }
        }

        return {
            newIndex: stopIndex,
            children: resultingObject
        }
    },

    analyzeAST (input) {
        this.parseAST(input)

        this.modules.forEach(module => module.call(this))

        console.log(this.ast)
    },

    registerModule (module) {
        this.modules.push(module)
    }
}

const replaceVar = function () {
    const traverseAST = node => {
        if (node.name === 'var') node.name = 'const'
        if (node.children) node.children.forEach(child => traverseAST(child))
    }

    this.ast.forEach(node => traverseAST(node))
}

ASTTransform.registerModule(replaceVar)

ASTTransform.analyzeAST(`some {
    statement
    if {
        var
        var
        anotherNode
    }
}`)