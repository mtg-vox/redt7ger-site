# Merch assets

Drop product images here. The site reads the following filenames by default (configured in `src/App.tsx` → `merch` array):

| File | Default product card |
| ---- | -------------------- |
| `tiger-logo-tee.jpg`     | RED T7GER Tiger Logo Tee |
| `tiger-mark-hoodie.jpg`  | Tiger Mark Hoodie |
| `magic-trick-poster.jpg` | Magic Trick Poster |
| `dirty-f7ck-poster.jpg`  | Dirty F7ck Poster |

Recommended size: 1200×1200, square.

To replace a card with a real Etsy listing, edit the `merch` array in `src/App.tsx` and set:

```ts
{
  title: 'Real product title',
  tag: 'Apparel',
  image: '/merch/your-file.jpg',
  href: 'https://www.etsy.com/listing/<id>/<slug>',
}
```

Do not put unreleased product photography here. This folder is shipped publicly with the site.
