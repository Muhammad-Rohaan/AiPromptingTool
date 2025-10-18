# WordPress Integration Guide

This guide explains how to integrate the AI Prompt Generator into your WordPress site.

## Option 1: Standalone Embed (Recommended)

The application is built as a standalone React app that can be embedded in WordPress without conflicts.

### Steps:

1. **Build the Application**
   ```bash
   npm run build
   ```
   This creates optimized files in the `dist/` directory.

2. **Upload Files to WordPress**
   - Upload all files from `dist/assets/` to your WordPress media library or a dedicated folder
   - Note the URLs of the uploaded JavaScript and CSS files

3. **Create a WordPress Page**
   - Create a new page in WordPress
   - Add a Custom HTML block
   - Insert the following code:

   ```html
   <div id="root"></div>
   <link rel="stylesheet" href="YOUR_CSS_FILE_URL">
   <script type="module" src="YOUR_JS_FILE_URL"></script>
   ```

4. **Style Container (Optional)**
   Add custom CSS to ensure the app takes full width:
   ```css
   #root {
     width: 100%;
     min-height: 800px;
   }
   ```

## Option 2: WordPress Plugin

For a more integrated experience, you can create a simple WordPress plugin:

### Create Plugin File: `ai-prompt-generator.php`

```php
<?php
/**
 * Plugin Name: AI Prompt Generator
 * Description: Embeds the AI Prompt Generator tool
 * Version: 1.0
 */

function ai_prompt_generator_shortcode() {
    $output = '
    <div id="ai-prompt-generator-root"></div>
    <link rel="stylesheet" href="' . plugins_url('assets/index.css', __FILE__) . '">
    <script type="module" src="' . plugins_url('assets/index.js', __FILE__) . '"></script>
    <script>
        // Ensure the app renders in the shortcode div
        window.addEventListener("DOMContentLoaded", function() {
            if(document.getElementById("ai-prompt-generator-root")) {
                // App will auto-mount to #root
            }
        });
    </script>
    ';
    return $output;
}
add_shortcode('ai_prompt_generator', 'ai_prompt_generator_shortcode');
```

### Plugin Structure:
```
wp-content/plugins/ai-prompt-generator/
├── ai-prompt-generator.php
└── assets/
    ├── index.js
    ├── index.css
    └── [other built files]
```

### Usage:
Simply add `[ai_prompt_generator]` shortcode to any page or post.

## Option 3: Direct Page Template

For full control, create a custom WordPress page template:

### Create: `page-prompt-generator.php` in your theme

```php
<?php
/**
 * Template Name: AI Prompt Generator
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Prompt Generator - <?php bloginfo('name'); ?></title>
    <?php wp_head(); ?>
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/ai-generator/index.css">
</head>
<body <?php body_class(); ?>>
    <div id="root"></div>
    <script type="module" src="<?php echo get_template_directory_uri(); ?>/ai-generator/index.js"></script>
    <?php wp_footer(); ?>
</body>
</html>
```

## Important Configuration

### Environment Variables
The app requires a Gemini API key to function. Set this in your hosting environment:

**For WordPress Hosting:**
1. Access your hosting control panel
2. Set environment variable: `GEMINI_API_KEY=your_api_key_here`

**For Backend API:**
If hosting the backend separately, ensure the API endpoint is configured:
- Update API requests in the frontend to point to your backend URL
- Set CORS headers on your backend to allow WordPress domain

### Styling Considerations

The app uses Tailwind CSS with scoped styles. It should not conflict with WordPress themes, but you may want to:

1. **Isolate Styles**: Wrap in a container with reset styles
   ```css
   .ai-prompt-generator-container * {
     all: revert;
   }
   ```

2. **Adjust Container Width**: Set max-width if needed
   ```css
   #root {
     max-width: 1400px;
     margin: 0 auto;
     padding: 20px;
   }
   ```

3. **Override Theme Conflicts**: If your WordPress theme interferes, add specific overrides

### Mobile Responsiveness

The app is fully responsive and works on all screen sizes. Ensure your WordPress theme doesn't add conflicting mobile styles.

## Troubleshooting

### Issue: Styles Not Loading
- Ensure CSS file URL is correct and accessible
- Check browser console for 404 errors
- Verify CORS settings if files are on different domain

### Issue: JavaScript Not Running
- Check that script is loaded as `type="module"`
- Verify JavaScript file URL is correct
- Check browser console for errors

### Issue: API Key Errors
- Verify GEMINI_API_KEY is set in environment
- Check that your hosting supports environment variables
- Test API key with curl or Postman first

### Issue: WordPress Theme Conflicts
- Some themes aggressively style all elements
- Wrap the app in an iframe if conflicts persist
- Use browser dev tools to identify conflicting CSS

## Performance Optimization

1. **Enable Caching**: Cache the built JS/CSS files
2. **Use CDN**: Host static assets on a CDN
3. **Lazy Loading**: Load the app only when needed using lazy loading techniques
4. **Minification**: The build process already minifies files

## Support

For issues or questions:
1. Check browser console for errors
2. Verify all file URLs are correct
3. Ensure Gemini API key is valid
4. Test outside WordPress first to isolate issues
