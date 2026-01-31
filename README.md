# Mangala Hospital Physiocare & Sports Rehab Center Website

A modern, mobile-first, fully dynamic website with an admin panel for easy content management.

## 🚀 Features

- ✅ **Fully Dynamic Website** - All content editable via admin panel
- ✅ **Mobile-First Design** - Perfect on phones, tablets, and desktops
- ✅ **Admin Panel** - Easy-to-use interface for content management
- ✅ **No Backend Required** - Runs entirely in the browser using LocalStorage
- ✅ **Fast & Responsive** - Optimized performance with smooth animations
- ✅ **SEO Optimized** - Customizable meta tags for search engines

## 📁 Project Structure

```
d:/jeramcc/
├── index.html              # Main website
├── admin.html              # Admin panel
├── css/
│   ├── main.css           # Frontend styles
│   └── admin.css          # Admin panel styles
├── js/
│   ├── data-service.js    # Data management
│   ├── main.js            # Frontend functionality
│   └── admin.js           # Admin panel functionality
├── images/
│   └── logo.jpg           # Clinic logo
└── README.md              # This file
```

## 🎯 Getting Started

### 1. View the Website

Simply open `index.html` in your web browser:
- **Double-click** `index.html`, or
- **Right-click** → Open with → Your preferred browser

### 2. Access Admin Panel

Open `admin.html` in your web browser to manage content:
- **Double-click** `admin.html`, or
- **Right-click** → Open with → Your preferred browser

The admin panel has 10 sections:
- **Dashboard** - Overview and quick actions
- **Clinic Info** - Name, logo, tagline
- **Hero Section** - Main banner content
- **About** - About section text
- **Services** - Add/edit/delete services
- **Treatments** - Manage treatments and therapies
- **Contact** - Contact details and map
- **Footer** - Footer content
- **Social** - Social media links
- **SEO** - Meta title and description

## ✏️ How to Edit Content

1. Open `admin.html` in your browser
2. Navigate to the section you want to edit using the tabs
3. Fill in or modify the form fields
4. Click "Save Changes"
5. Changes appear instantly on the website!

### Adding Services or Treatments

1. Go to **Services** or **Treatments** tab
2. Click "Add New Service/Treatment"
3. Fill in the form (name, description, icon)
4. Click "Save"
5. Your new item appears on the website immediately

### Changing the Logo

1. Go to **Clinic Info** tab
2. Click "Choose File" under Logo
3. Select your new logo image
4. The logo updates automatically

### Updating Google Maps Location

1. Go to [Google Maps](https://www.google.com/maps/)
2. Search for your location
3. Click "Share" → "Embed a map"
4. Copy the iframe URL
5. Paste it in the **Contact** tab under "Google Maps Embed URL"

## 💾 Data Storage

All your data is stored in your browser's **LocalStorage**. This means:

✅ **Pros:**
- No server needed - completely free!
- Instant updates
- Easy to deploy anywhere

⚠️ **Important Notes:**
- Data is stored **per browser** on **each device**
- Clearing browser data will erase your content
- Changes won't sync across different devices/browsers

### Backup Your Data

To backup your data:
1. Open browser DevTools (F12)
2. Go to Console
3. Type: `DataService.exportData()`
4. Copy and save the JSON output

### Restore Data

To restore data:
1. Open browser DevTools (F12)
2. Go to Console
3. Type: `DataService.importData('YOUR_JSON_HERE')`

### Reset to Default

In the admin panel, click the "Reset Data" button to restore default content.

## 🌐 Deployment

### Option 1: Simple Hosting (Recommended)

Upload all files to any free hosting service:
- **GitHub Pages** (free & easy)
- **Netlify** (drag & drop deployment)
- **Vercel** (instant deployment)
- **000webhost** (free PHP hosting)

Just upload the entire `jeramcc` folder and you're live!

### Option 2: Use as-is

Simply keep these files on your computer and open them when needed.

## 📱 Browser Compatibility

Tested and working on:
- ✅ Chrome / Edge (Recommended)
- ✅ Firefox
- ✅ Safari (Desktop & Mobile)
- ✅ Mobile browsers (Android & iOS)

## 🎨 Customization

### Changing Colors

Edit `css/main.css` and modify the CSS custom properties at the top:

```css
:root {
  --primary-color: #0891b2;  /* Change this */
  --secondary-color: #84cc16; /* And this */
}
```

### Adding More Sections

To add a new section:
1. Add HTML in `index.html`
2. Style it in `css/main.css`
3. Add a form in `admin.html`
4. Add handlers in `js/admin.js`

## 🛠️ Troubleshooting

### Content not appearing?
- Make sure JavaScript is enabled in your browser
- Try refreshing the page (Ctrl + F5)
- Check browser console for errors (F12)

### Changes not saving?
- Ensure LocalStorage is enabled
- Check if you're in incognito/private mode (LocalStorage is limited there)
- Try a different browser

### Logo not displaying?
- Make sure the image file exists in the `images/` folder
- Check the image format (JPG, PNG, GIF supported)
- Try uploading a smaller image (< 1MB recommended)

## 📞 Support

For issues or questions about this website, contact your web developer.

## 📝 License

This website is custom-built for Mangala Hospital Physiocare & Sports Rehab Center.

---

**Built with ❤️ using HTML, CSS, and JavaScript**
