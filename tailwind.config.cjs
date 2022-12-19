const config = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    // Keep existing values and append the following:
    require('path').join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
  ],

  theme: {
    extend: {}
  },

  plugins: [
    // Keep any existing plugins present and append the following:
    require('@skeletonlabs/skeleton/tailwind/theme.cjs'),
    require('@tailwindcss/forms')
  ]
}

module.exports = config
