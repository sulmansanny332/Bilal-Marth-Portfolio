# Bilal Marth Portfolio

A responsive, animated portfolio in vanilla HTML, CSS, and JavaScript. No build step or dependencies are required.

## Preview

Open `index.html` directly, or run `python3 -m http.server 3000` and visit `http://localhost:3000`.

## Features

- Simple light theme, clear biography cards, and animated scenic images with a pause control.
- Scroll reveals, reading progress, responsive navigation, story dialogs, and visible personal-life articles.
- Accessible native dialogs, keyboard focus styles, and reduced-motion support.
- Contact section links directly to the supplied TikTok, YouTube, and Instagram profiles, with inline SVG icons; the old collaboration form was removed.

## Content notes

Copy is adapted from the supplied biography, credited to the Editorial Team. Reported audience size, financial estimates, and business interests are attributed to that text. Height follows the updated user-provided value: 5 feet 11 inches (180 cm). Missing birth details and private family names are not invented. The four supplied portfolio images are loaded from the local assets folder.

Before publication, add verified contact details and social profile URLs. All portfolio images load locally, including offline. Google Fonts require internet access; system fonts provide fallbacks.

## Website animations

`motion.css` adds staggered section and profile-card reveals, hero text entrances, an animated logo, rotating decorative stars, card hover effects, button highlights, dialog entrances, and moving contact-section decoration. Text remains stationary after its entrance. The fixed pause/play button controls site animations and remembers the preference locally when browser storage is available. Reduced-motion settings show all content without animation. Scroll reveals use a single IntersectionObserver and do not hide content when JavaScript is disabled.

## Updated biography and BM7

Added Chak No. 7 / Mandi Bahauddin roots, the Paris family-business connection, updated reported TikTok audience, media appearances, and BM7 products and virtual try-on. Official BM7 About Us, homepage, and try-on pages were read to support brand content. Supplied social/interview links could not be independently inspected for their claims; follower totals and the SirkupAI / first-in-Pakistan claims are clearly attributed. Personal social links and official store links are now available on the page.
