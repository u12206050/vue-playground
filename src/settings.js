const baseApi = 'http://demo3388642.mockable.io'
module.exports = {
  menuApi: baseApi + '/menus/main',
  hero: {
    title: 'Hva er realfag',
    image: {
      src: 'https://unsplash.it/1170/468/?random',
      alt: 'Unsplash Image'
    },
    excerpt: `Hva er egentlig realfag?
    Denne filmen gir et lite innblikk i de mange mulihetene realfag gir.`,
    links: [
      {
        url: '/ta-testen',
        title: 'Ta testen',
        external: false
      }
    ],
    _entitytype: 'hero_card',
    _grouptype: 'entity'
  },
  barehero: {
    title: 'Realfag i vidergående',
    image: {
      src: 'https://unsplash.it/1200/480/?random',
      alt: 'Unsplash Image'
    },
    _entitytype: 'hero_card',
    _grouptype: 'entity'
  },
  cta: {
    title: 'Hei du',
    text: `Si oss hva som beskriver deg så gir vi deg informasjonen du leter etter`,
    links: [
      {
        url: '/article',
        title: 'Article Page',
        external: false
      }, {
        url: '/landing',
        title: 'Landing Page',
        external: false
      }, {
        url: 'http://google.com',
        title: 'Search google',
        external: true
      }
    ],
    _entitytype: 'base_card',
    _grouptype: 'entity'
  },
  acBlocks: {
    _grouptype: 'entity',
    _entitytype: 'accordion',
    blocks: [
      {
        title: 'Notes',
        byline: 'Here you can see all your notes',
        icon: 'note',
        content: '<p>Some text</p>'
      },
      {
        title: 'Alarms',
        byline: 'Here you can see all your alarms',
        icon: 'snooze',
        content: '<p>Some text</p>'
      },
      {
        title: 'Movies',
        byline: 'Here are all your movies',
        icon: 'movie',
        content: '<p>Some text</p>'
      },
      {
        title: 'HD Movies',
        byline: 'Here are all your HD movies',
        icon: 'hd',
        content: '<p>Some text</p>'
      }
    ]
  },
  factbox: {
    _entitytype: 'fact_box',
    title: 'Nyttige fakta',
    content: `
      <p>Kravkode: MEROD</p>
      <p>Norske byer du kan studere dette i: Trondheim, Oslo, Bergen, Tromsø</p>
      <p>Antall som jobber som det i dag: 10 816 personer</p>
      <p>Gjennomsnittlig årslønn: 807 600 kr</p>
    `
  },
  html: {
    title: 'Some nice text and images',
    content: `<div id='lipsum'>
      <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id convallis nunc. Aliquam vitae venenatis turpis. Nam et ultrices neque, sit amet tincidunt arcu. Integer suscipit, purus vitae tincidunt pulvinar, sem erat elementum elit, tincidunt aliquet risus ex at nisl. Mauris pulvinar imperdiet lacus nec ultricies. Nulla convallis velit eu est fringilla, sit amet molestie mauris aliquet. Sed ut laoreet tortor. Donec tincidunt neque non odio facilisis sodales. Proin pellentesque porttitor nulla, in ornare mauris venenatis tempor. Nunc pretium felis sapien, vitae consectetur magna cursus et. Integer vestibulum eros a eros feugiat pellentesque. Praesent fermentum consequat diam at mattis.
      </p>
      <p>
      Vestibulum et semper quam. Vestibulum suscipit justo sit amet magna fringilla, sit amet hendrerit dui rutrum. Duis ut erat id quam facilisis ornare. Aliquam fermentum eget est sit amet lacinia. Fusce dui velit, mollis sed convallis id, consequat nec lectus. Pellentesque bibendum magna in facilisis facilisis. Mauris fermentum eu arcu non ornare. Duis in quam ultricies, convallis magna eget, ullamcorper justo. Vestibulum maximus ultricies dolor vitae mollis.
      </p>
      <figure>
        <img src='https://unsplash.it/3600/2000' alt='Macaque in the trees'>
        <figcaption>A cheeky macaque, Lower Kintaganban River, Borneo. Original by <a href='http://www.flickr.com/photos/rclark/'>Richard Clark</a></figcaption>
      </figure>
      <p>
      Praesent id libero arcu. Suspendisse non aliquam libero. Vestibulum sed dignissim est. Quisque rhoncus posuere eleifend. Nam et massa vel erat maximus fermentum. In hac habitasse platea dictumst. Proin metus elit, volutpat vel feugiat sed, eleifend et justo. Vivamus pellentesque quis felis et imperdiet. Integer fringilla eros lorem, non facilisis mi ornare vitae. Vivamus et tellus sed est facilisis varius ac ac ipsum. Nunc commodo magna nisl, a malesuada metus convallis dapibus. Ut sed metus a velit ornare cursus in ut augue. Sed fermentum, nisi sit amet tempor blandit, nisl sem auctor velit, a efficitur diam libero id orci. Nulla facilisi.
      </p>
      <p>
      Cras nisi risus, vehicula vitae felis in, maximus laoreet leo. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet mi eget leo rutrum blandit a vel libero. Sed vel tincidunt ex, eget euismod orci. Ut consectetur commodo ipsum sed vehicula. Cras vitae ante non nulla hendrerit cursus vitae sed nisi. Donec nulla dui, ultricies ut nisl cursus, gravida tincidunt ligula.
      </p>
      <figure>
        <img src='https://unsplash.it/4000/4000' alt='Macaque in the trees'>
        <figcaption>A cheeky macaque, Lower Kintaganban River, Borneo. Original by <a href='http://www.flickr.com/photos/rclark/'>Richard Clark</a></figcaption>
      </figure>
      <p>
      Nulla sodales convallis erat ut imperdiet. Quisque faucibus bibendum massa nec maximus. Sed aliquam, elit sed rutrum fermentum, arcu ipsum mattis mauris, in placerat erat sapien vitae ante. Pellentesque vestibulum accumsan nunc non sagittis. Proin rhoncus justo et eleifend tincidunt. Nulla eget neque sollicitudin, malesuada urna at, sagittis ipsum. Vestibulum pellentesque mi ac risus fringilla efficitur. Integer ultrices, erat at fermentum hendrerit, eros neque malesuada metus, id mattis enim augue et nunc. Integer ac orci velit. Vestibulum vel malesuada risus, id facilisis metus. Suspendisse eget faucibus massa. Fusce ut tempus lacus. Proin vel volutpat sem, quis laoreet nunc.
      </p></div>`,
    _entitytype: 'text_block',
    _grouptype: 'entity'
  },
  small_card: {
    title: 'Hva er realfag',
    image: {
      src: 'https://unsplash.it/400',
      alt: 'Unsplash Image'
    },
    excerpt: `Hva er egentlig realfag?
    Denne filmen gir et lite innblikk i de mange mulihetene realfag gir.`,
    links: [
      {
        url: '/article',
        title: 'Les mer',
        external: false
      }
    ],
    _entitytype: 'small_card',
    _grouptype: 'entity'
  },
  wide_card: {
    title: 'Hva er realfag',
    image: {
      src: 'https://unsplash.it/500/200',
      alt: 'Unsplash Image'
    },
    excerpt: `Hva er egentlig realfag?
    Denne filmen gir et lite innblikk i de mange mulihetene realfag gir.`,
    links: [
      {
        url: '/article',
        title: 'Les mer',
        external: false
      }
    ],
    _entitytype: 'node_preview',
    _grouptype: 'entity'
  },
  blog_card: {
    title: 'En dag med pingviner',
    image: {
      src: 'https://unsplash.it/500/200',
      alt: 'Unsplash Image'
    },
    author: {
      image: {
        src: 'https://unsplash.it/140/140',
        alt: 'author'
      },
      name: 'Anine Wessel'
    },
    tag: 'Realfag i hverdagen',
    date: 1484663019277,
    links: [
      {
        url: '/article',
        title: 'Les mer',
        external: false
      }
    ],
    _entitytype: 'blog',
    _grouptype: 'entity'
  },
  video_card: {
    title: 'Hva er realfag',
    image: {
      src: 'https://unsplash.it/750/300',
      alt: 'Unsplash Image'
    },
    excerpt: `Hva er egentlig realfag?
    Denne filmen gir et lite innblikk i de mange mulihetene realfag gir.`,
    links: [
      {
        url: '/article',
        title: 'Se filmen',
        external: false
      }
    ],
    _entitytype: 'video',
    _grouptype: 'entity'
  },
  big_card: {
    title: 'Hei du',
    image: {
      src: 'https://unsplash.it/800',
      alt: 'Unsplash Image'
    },
    excerpt: `Si oss hva som beskriver deg så gir vi deg informasjonen du leter etter`,
    links: [
      {
        url: '/article',
        title: 'Article Page',
        external: false
      },
      {
        url: '/landing',
        title: 'Ta testen',
        external: false
      }
    ],
    _entitytype: 'big_card',
    _grouptype: 'entity'
  }
}
