/*
  LIVE STREAM SETTINGS
  Change isLive to true when you start streaming.
  Change it back to false when the stream ends.
  Replace streamUrl with your real Kick, TikTok, or YouTube live link.
*/
window.RNM_CONFIG = {
  /*
    Write one of these usernames when they go live:
    "ranimegaming"
    "darwish.hajj"

    Leave it empty ("") when nobody is live.
  */
  liveStreamer: "",
  streamers: {
    "ranimegaming": {
      name: "RANIMEGAMING",
      url: "https://www.tiktok.com/@ranimegaming/live"
    },
    "darwish.hajj": {
      name: "DARWISH.HAJJ",
      url: "https://www.tiktok.com/@darwish.hajj/live"
    }
  },

  /*
    SUPABASE SETTINGS
    Create a Supabase project, run supabase-schema.sql, then paste:
    - Project URL
    - anon public key
  */
  supabase: {
    url: "",
    anonKey: "",
    videoBucket: "rnm-videos",
    table: "video_submissions"
  }
};
