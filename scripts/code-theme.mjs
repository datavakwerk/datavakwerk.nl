// Shiki-thema voor codeblokken in blogposts, in het kleurenpalet van de site.
// Dezelfde kleuren als de handmatig getokeniseerde .tok-*-classes van het
// codepaneel op de homepage (styles.css), zodat beide panelen één geheel zijn.
export default {
  name: 'datavakwerk-dark',
  type: 'dark',
  colors: {
    'editor.background': '#101218',
    'editor.foreground': '#d4d4d4',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#5b6472' },
    },
    {
      scope: ['string', 'string.quoted', 'punctuation.definition.string'],
      settings: { foreground: '#ffe099' },
    },
    {
      scope: ['keyword', 'keyword.other', 'storage.type', 'storage.modifier'],
      settings: { foreground: '#93c5fd' },
    },
    {
      scope: ['constant.numeric', 'constant.language'],
      settings: { foreground: '#f9997a' },
    },
    {
      scope: ['entity.name.function', 'support.function'],
      settings: { foreground: '#60a5fa' },
    },
    {
      scope: ['punctuation', 'meta.brace', 'keyword.operator'],
      settings: { foreground: '#8b95a7' },
    },
    {
      scope: ['variable', 'entity.name.tag', 'support.type'],
      settings: { foreground: '#d4d4d4' },
    },
  ],
}
