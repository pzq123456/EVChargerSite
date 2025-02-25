export const themeConfig = {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
        { text: 'Home', link: '/' },
        // { text: 'About', link: '/about' },
        { text: 'Map', link: '/map' },
        { text: 'Data', link: '/data' },
        { text: 'Publications', link: '/publications' },
        { text: 'News', link: '/News' },
        {
            text: 'Contact',
            items: [
              { text: 'Contact Us', link: '/contact' },
              { text: 'Team', link: '/team' },
              { text: 'Statistics', link: '/report' }
            ]
          }
    ],

    logo: '/logo.png',
    head: [
      'link',
      { rel: 'icon', href: '/favicon.ico' }
    ],

    footer: {
        copyright: 'GlobalEVData © 2024 - Present | <a href="https://thetipteam.editorx.io/website/">The TIP Research Group</a> @ <a href="https://www.polyu.edu.hk/"> HKPolyU </a>'

    },

    search: {
        provider: 'local'
    },


}