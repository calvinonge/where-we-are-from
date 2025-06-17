# Where We're From

A sophisticated vulnerability-prompt game inspired by We're Not Really Strangers. Explore identity, memory, and belonging through three levels of thoughtful conversation.

## 🌟 Features

- **Three-Tier Journey**: Surface → Story → Soul questions that progressively deepen
- **Randomized Experience**: 18 cards per tier, 10 selected randomly each game
- **Elegant Design**: Warm color palette with sophisticated typography
- **Reflection Mode**: Hold any card for 60-second silent journaling
- **Word Cloud**: Collect meaningful words and create a group portrait
- **Responsive**: Beautiful on phones, tablets, and desktops
- **Accessible**: Full keyboard navigation and screen reader support

## 🚀 Quick Start

### Option 1: GitHub Pages (Recommended)
1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch" → main branch → / (root)
4. Your site will be live at `https://yourusername.github.io/where-we-are-from`

### Option 2: Netlify
1. Fork this repository
2. Connect your GitHub account to [Netlify](https://netlify.com)
3. Deploy directly from your GitHub repo
4. Automatic deployments on every commit

### Option 3: Vercel
1. Fork this repository
2. Connect your GitHub account to [Vercel](https://vercel.com)
3. Import your repository
4. Deploy with zero configuration

## 🎮 How to Play

1. **Gather**: Sit around a single device (phone, tablet, or laptop)
2. **Begin**: Tap "Begin Journey" to start
3. **Share**: One person reads the prompt aloud, everyone answers
4. **Reflect**: Hold any card for 60 seconds of silent journaling
5. **Progress**: Tap "Next" to continue through all three tiers
6. **Celebrate**: Create a word cloud portrait of your group's journey

## 🎨 Design Philosophy

Inspired by the aesthetic sophistication of We're Not Really Strangers:
- **Warm Colors**: Coral → Gold → Burgundy progression
- **Special Typography**: Playfair Display for questions, Inter for interface
- **Clean Design**: No gradients, generous white space, elegant proportions
- **Conversation-Friendly**: Colors and layout that encourage vulnerability

## 📁 Project Structure

```
├── index.html          # Main application
├── style.css           # Sophisticated styling
├── app.js              # Game logic and interactions
├── identity.json       # Question prompts (18 per tier)
└── README.md           # This file
```

## 🛠️ Customization

### Adding New Questions
Edit `identity.json` to add more prompts to any tier:

```json
{
  "surface": ["Your new surface question..."],
  "story": ["Your new story question..."],
  "soul": ["Your new soul question..."]
}
```

### Changing Colors
Modify CSS custom properties in `style.css`:

```css
:root {
  --warm-coral: #your-color;
  --warm-gold: #your-color;
  --deep-burgundy: #your-color;
}
```

### Adjusting Game Length
Change `cardsPerTier` in `app.js`:

```javascript
const cardsPerTier = 10; // Change to your preferred number
```

## 🌍 Deployment Options Compared

| Platform | Setup | Custom Domain | Auto Deploy | Cost |
|----------|-------|---------------|-------------|------|
| **GitHub Pages** | Easy | ✅ | ✅ | Free |
| **Netlify** | Easy | ✅ | ✅ | Free tier |
| **Vercel** | Easy | ✅ | ✅ | Free tier |

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this for personal or commercial projects.

## 🙏 Acknowledgments

- Inspired by We're Not Really Strangers
- Typography: Google Fonts (Playfair Display, Inter)
- Built with vanilla JavaScript for maximum compatibility

---

**Perfect for**: Date nights, friend gatherings, team building, family dinners, therapy groups, book clubs, or any time you want to go deeper than small talk.

