# eribbit-client-pc

{
  "editor.unicodeHighlight.nonBasicASCII": false,
  "editor.mouseWheelZoom": true,
  "path-autocomplete.excludedItems": {},
  "path-autocomplete.extensionOnImport": true,
  "path-autocomplete.pathMappings": {
    "@": "${folder}/src"
  },
  "editor.tabSize": 2,
  "emmet.triggerExpansionOnTab": true,
  "emmet.showSuggestionsAsSnippets": true,
  "editor.formatOnSave": true,
  // ESLint 插件的配置
  "editor.codeActionsOnSave": {
    "source.fixAll": true
  },
  // eslint
  "eslint.alwaysShowStatus": true,
  // vetur
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.ignoreProjectWarning": true,
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "semi": false, //不加分号
      "singleQuote": true, //用单引号
      "trailingComma": "none",
      "arrowParens": "avoid",
      "printWidth": 300
    },
    "js-beautify-html": {
      "wrap_attributes": false
    }
  },
  "files.associations": {
    "*.vue": "vue"
  },
  // prettie
  //下面这一行是在Users的自己用户下建立一个 .prettierrc 文件
  "prettier.configPath": "C:\\Users\\2899173331\\.prettierrc",

  "prettier.printWidth": 300,
  "prettier.semi": false,
  "prettier.singleQuote": true,
  "prettier.arrowParens": "avoid",
  "prettier.trailingComma": "none",
  "[vue]": {
    //   "editor.defaultFormatter": "Vue.volar"
    // "editor.defaultFormatter": "esbenp.prettier-vscode"
    "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"

  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }, // 对象最后一个属性不加添加逗号
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // 从别处来的配置

  // "[vue]": {
  //   "editor.defaultFormatter": "octref.vetur"
  // },
  "[javascript]": {
    "editor.defaultFormatter": "vscode.typescript-language-features"
  },
  "eslint.validate": ["javascript", "javascriptreact"],
  "vetur.ignoreProjectWarning": true,
  "vetur.format.defaultFormatter.js": "vscode-typescript",
  "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_line_length": 80,
      // Wrap attributes to new lines [auto|force|force-aligned|force-expand-multiline] ["auto"]
      "wrap_attributes": "force-expand-multiline"
    }
  },
  "editor.tabSize": 2,
  "git.ignoreLimitWarning": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "git.confirmSync": false,
  "eslint.quiet": true,
  "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
  "typescript.format.insertSpaceAfterConstructor": true,
  "typescript.format.insertSpaceBeforeFunctionParenthesis": true,
  "javascript.preferences.quoteStyle": "single",
  "javascript.format.insertSpaceAfterConstructor": true,
  "typescript.preferences.quoteStyle": "single",
  "html.format.wrapAttributes": "force-expand-multiline",
  "editor.formatOnSave": true,
  "prettier.vueIndentScriptAndStyle": true,
  "prettier.singleQuote": true,
  "prettier.useTabs": true,
  "prettier.printWidth": 100,
  "eslint.workingDirectories": [
    ".eslintrc.js",
    {
      "mode": "auto"
    }
  ],
  "diffEditor.wordWrap": "off",
  "editor.wordWrap": "on",
  "update.mode": "manual",
  "terminal.integrated.enablePersistentSessions": false,
  "terminal.integrated.persistentSessionReviveProcess": "never",
  "terminal.integrated.shellIntegration.history": 0,
  "vetur.validation.template": false,
  "volar.codeLens.scriptSetupTools": true,
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "workbench.colorTheme": "Solarized Light",

}

