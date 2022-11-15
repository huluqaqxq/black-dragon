module.exports = {
  title: '@black-dragon',
  // theme: '@vuepress/blog',
  base: '/black-dragon/',
  // 部署是用到
  dest: './black-dragon',
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@alias': '.vuepress/public/images',
  //     }
  //   }
  // },
  head: [
    ['link', {
      rel: 'icon',
      href: 'bg.ico'
    }]
  ],

  themeConfig: {
    // logo: '/images/favicon.ico',
    navbar: [
      {
        text: 'JAVA',
        children: [
          { text: 'JVM', link: '/java/jvm/jvm.md' },
          
        ]

      },
      {
        text: 'Spring',
        children: [
          { text: 'spring', children: [{ text: 'SpringMVC', link: '/spring/springmvc/SpringMVC.md' }] },
        ]

      },
      {
        text: '面试',
        link: '/interview/'
      },
      {
        text: 'docker',
        children: [
          { text: '使用 docker 容器化搭建 监控平台', link: '/docker/使用 docker 容器化搭建 监控平台 grafana + prometheus + rabbitmq.md'},
        ]
      },
      {
        text: '数据库',
        link: '/db/'
      },
      {
        text: 'books',
        link: '/book/book.md'
      },
      {
        text: '关于',
        link: '/about/'
      }
    ]
  },


};