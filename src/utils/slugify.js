exports.slugify = str =>
  str
    .toLowerCase()
    .replace(/[^\w/]+/g, '-')
    .replace(/^-|-$/g, '')
