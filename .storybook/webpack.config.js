const path = require('path')
const rootPath = path.resolve(__dirname, '../')

module.exports = async ({ config }) => {
  mode = 'development'

  config.module.rules.push({
    test: /\.(otf|eot|svg|ttf|woff|woff2)(\?.+)?$/,
    loader: 'url-loader',
  })

  config.module.rules.push({
    test: /\.ts/,
    use: [
      {
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true,
        },
      },
    ],
  })

  config.module.rules.push({
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  })

  config.resolve.extensions = ['.js', '.vue', '.json', 'scss']
  config.resolve.alias['~'] = rootPath
  config.resolve.alias['@'] = rootPath

  return config
}
