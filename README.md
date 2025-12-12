# Agora Token Generator

A self-contained, client-side Agora token generator that runs entirely in the browser. No server required! Generate tokens for all Agora services using a simple web interface.

## Features

- ✅ **RTC Token Builder** - Generate tokens for Real-Time Communication
- ✅ **RTM Token Builder** - Generate tokens for Real-Time Messaging
- ✅ **RTC + RTM Token Builder** - Generate combined tokens for both RTC and RTM services
- ✅ **Chat Token Builder** - Generate tokens for Agora Chat
- ✅ **Education Token Builder** - Generate tokens for Agora Education
- ✅ **FPA Token Builder** - Generate tokens for FPA (Flexible Classroom)
- ✅ **APAAS Token Builder** - Generate tokens for Agora PaaS

All token generation happens **client-side** - your App ID and App Certificate never leave your browser!

## Quick Start

### Option 1: Deploy to GitHub Pages (Recommended)

1. **Copy this folder to your GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Agora Token Generator"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on **Settings**
   - Scroll down to **Pages** section
   - Under **Source**, select **main** branch
   - Select **/ (root)** folder
   - Click **Save**
   - Your site will be available at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

3. **Access your token generator**
   - Visit the URL provided by GitHub Pages
   - Start generating tokens!

### Option 2: Run Locally

1. **Serve the files using a local web server**

   **Using Python:**
   ```bash
   # Python 3
   python3 -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```

   **Using Node.js (http-server):**
   ```bash
   npx http-server -p 8000
   ```

   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

2. **Open your browser**
   - Navigate to `http://localhost:8000`
   - Start generating tokens!

## File Structure

```
agora-token-generator/
├── index.html              # Main HTML file with UI
├── styles.css              # Styling
├── .nojekyll               # GitHub Pages configuration
├── README.md               # This file
└── js/
    ├── AccessToken2.js     # Core token generation logic
    ├── RtcTokenBuilder2.js # RTC token builder
    ├── RtmTokenBuilder2.js # RTM token builder
    ├── ChatTokenBuilder.js # Chat token builder
    ├── EducationTokenBuilder.js
    ├── FpaTokenBuilder.js
    ├── ApaasTokenBuilder.js
    ├── app.js              # Main application logic
    ├── md5.min.js          # MD5 library (for Education/APAAS tokens)
    └── pako.min.js         # Pako library (for compression)
```

## How to Use

1. **Select Token Type**
   - Click on the tab for the token type you want to generate (RTC, RTM, RTC + RTM, Chat, etc.)

2. **Fill in the Form**
   - **App ID**: Your Agora App ID (32-character hex string)
   - **App Certificate**: Your Agora App Certificate (32-character hex string)
   - Fill in other required fields based on the token type

3. **Generate Token**
   - Click the "Generate" button
   - Your token will appear in the result box below

4. **Copy Token**
   - Click "Copy Token" to copy the generated token to your clipboard

## Token Types Guide

### RTC Token
- **Channel Name**: The name of the RTC channel
- **User ID or User Account**: Either a numeric UID or a string account
- **Role**: PUBLISHER (can publish audio/video) or SUBSCRIBER (can only subscribe)
- **Expiration**: Token expiration time in seconds
- **Privileges**: Optional individual privilege expiration times

### RTM Token
- **User ID**: The RTM user ID (max 64 bytes)
- **Expiration**: Token expiration time in seconds

### RTC + RTM Token
- **Channel Name**: The name of the RTC channel
- **User Account**: User account used for both RTC and RTM services
- **Role**: PUBLISHER (can publish audio/video) or SUBSCRIBER (can only subscribe)
- **Token Expiration**: Token expiration time in seconds
- **Privilege Expiration**: Privilege expiration time in seconds
- Generates a single token with both RTC channel access and RTM login privileges

### Chat Token
- **Token Type**: User Token or App Token
- **User UUID**: Required for User Token
- **Expiration**: Token expiration time in seconds

### Education Token
- **Token Type**: Room User Token, User Token, or App Token
- **Room UUID**: Required for Room User Token
- **User UUID**: Required for Room User Token and User Token
- **Role**: Required for Room User Token
- **Expiration**: Token expiration time in seconds

### FPA Token
- Only requires App ID and App Certificate
- Token expires after 24 hours

### APAAS Token
- Similar to Education Token
- **Token Type**: Room User Token, User Token, or App Token
- **Room UUID**: Required for Room User Token
- **User UUID**: Required for Room User Token and User Token
- **Role**: Required for Room User Token
- **Expiration**: Token expiration time in seconds

## Security Notes

⚠️ **Important**: While this tool runs client-side and your credentials never leave your browser, be aware that:

- Anyone with access to your GitHub Pages URL can use the tool
- The generated tokens are displayed in plain text
- Always use HTTPS when accessing the tool (GitHub Pages provides this automatically)
- Never share your App Certificate publicly
- Consider using this tool only for development/testing purposes

## Browser Compatibility

This tool uses modern web APIs:
- **Web Crypto API** for HMAC-SHA256 (supported in all modern browsers)
- **Pako.js** for zlib compression/decompression (included locally)
- **TextEncoder/TextDecoder** for string encoding

**Minimum browser versions:**
- Chrome 37+
- Firefox 34+
- Safari 11+
- Edge 79+

## Troubleshooting

### Token generation fails
- Make sure your App ID and App Certificate are valid 32-character hex strings
- Check that all required fields are filled in
- Verify that expiration times are positive numbers
- Check the browser console for detailed error messages

### "Crypto is not defined" error
- Make sure you're accessing the page via HTTPS (GitHub Pages provides this)
- The Web Crypto API requires a secure context

### Token doesn't work with Agora SDK
- Verify that your App ID and App Certificate are correct
- Check that the token hasn't expired
- Ensure you're using the correct token type for your use case
- Verify channel name, user ID, and other parameters match your SDK configuration

## Dependencies

All dependencies are included locally:
- **pako.js** (v2.1.0) - For zlib compression/decompression (`js/pako.min.js`)
- **js-md5** (v0.8.3) - For MD5 hashing (`js/md5.min.js`)

This project is completely self-contained and requires no external dependencies or CDN connections.

## Contributing

Feel free to submit issues or pull requests if you find bugs or want to add features!

## License

This project uses the same license as the parent AgoraDynamicKey repository.

## Support

For Agora-specific questions, visit:
- [Agora Documentation](https://docs.agora.io/)
- [Agora Developer Community](https://www.agora.io/en/community/)
