# RNM ESPORTS

Premium static esports clan website built with HTML, CSS, and JavaScript.

## Run locally

Open `index.html` directly, or run any static file server in this folder.

## Deploy

This folder can be deployed as-is to Vercel or Cloudflare Pages. No build command is required; use the project root as the output directory.

Before publishing, replace the placeholder social URLs and connect the join form to your preferred form service (Formspree, Web3Forms, or a serverless function).

## Live notification

Open `config.js` and set `liveStreamer` to `"ranimegaming"` or `"darwish.hajj"` when that person starts streaming. The red live banner and Watch Live button automatically use the selected TikTok channel. Set `liveStreamer` back to `""` when nobody is live.

For fully automatic Kick/TikTok/YouTube detection, connect `config.js` to the platform API through a serverless function.

## Join uploads

The form accepts a gameplay video and PUBG ID screenshot in the browser. Connect the form to Cloudinary, Supabase Storage, or another upload backend before publishing so uploaded files are delivered and stored.
