Setup with `npm install`.

Development work with `npm run dev`. Be sure to run this command in *this directory*.

Production build with `docker build . -t your-image-name-here`

Production deploy with `docker run -d -p 53706:53706 your-image-name-here`

Production deploy (w/ mounted db) with `docker run -d -p 53706:53706 -v /your/mount/db.db:/usr/src/app/db.db your-image-name-here`
