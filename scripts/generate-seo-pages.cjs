const fs = require('fs')
const path = require('path')

const siteUrl = 'https://amina.tatar'
const pages = {
  multfilm: {
    title: 'Татарча мультфильмнар | Әминә',
    description: 'Балалар өчен Әминә татарча мультфильмнары. Татар телен кызыклы сюжетлар һәм җырлар аша өйрәнү.',
    heading: 'Татарча мультфильмнар',
  },
  songs: {
    title: 'Балалар өчен татарча җырлар | Әминә',
    description: 'Әминә белән татарча балалар җырларын тыңлагыз һәм татар телен җиңел өйрәнегез.',
    heading: 'Балалар өчен татарча җырлар',
  },
  songs_text: {
    title: 'Татарча җыр сүзләре | Әминә',
    description: 'Әминә проекты җырларының татарча текстлары. Җырлагыз, укыгыз һәм яңа сүзләр өйрәнегез.',
    heading: 'Татарча җыр сүзләре',
  },
  songs_minuses: {
    title: 'Татарча җырларның минусовкалары | Әминә',
    description: 'Балалар өчен татарча җырларның минусовкаларын тыңлагыз һәм йөкләгез.',
    heading: 'Татарча җырларның минусовкалары',
  },
  news: {
    title: 'Яңалыклар | Әминә',
    description: 'Әминә татар теле проектының соңгы яңалыклары, чаралары һәм яңа материаллары.',
    heading: 'Әминә проекты яңалыклары',
  },
  about: {
    title: 'Әминә проекты турында',
    description: 'Балаларга татар телен җырлар һәм мультфильмнар аша өйрәтүче Әминә проекты турында.',
    heading: 'Әминә проекты турында',
  },
  method: {
    title: 'Әминә проектының методикасы',
    description: 'Әминә белем бирү проектында татар телен балаларга өйрәтү методикасы.',
    heading: 'Әминә проектының методикасы',
  },
}

const buildDir = path.resolve(__dirname, '..', 'build')
const template = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8')
const outputDir = path.join(buildDir, 'seo')
fs.mkdirSync(outputDir, { recursive: true })

const replaceAttribute = (html, selector, value) =>
  html.replace(selector, (tag) => tag.replace(/content="[^"]*"/, `content="${value}"`))

for (const [route, page] of Object.entries(pages)) {
  const url = `${siteUrl}/${route}`
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${page.title}</title>`)
  html = replaceAttribute(html, /<meta name="description"[^>]*>/, page.description)
  html = replaceAttribute(html, /<meta property="og:title"[^>]*>/, page.title)
  html = replaceAttribute(html, /<meta property="og:description"[^>]*>/, page.description)
  html = replaceAttribute(html, /<meta property="og:url"[^>]*>/, url)
  html = replaceAttribute(html, /<meta name="twitter:title"[^>]*>/, page.title)
  html = replaceAttribute(html, /<meta name="twitter:description"[^>]*>/, page.description)
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}"/>`)
  html = html.replace(
    /<body>\s*<noscript>.*?<\/noscript>/s,
    `<body><noscript><main><h1>${page.heading}</h1><p>${page.description}</p><p><a href="/">Әминә проектының баш битенә кайтырга</a></p></main></noscript>`,
  )
  fs.writeFileSync(path.join(outputDir, `${route}.html`), html)
}

console.log(`Generated ${Object.keys(pages).length} SEO pages`)
