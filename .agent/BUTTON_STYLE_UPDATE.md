# Button Style Update - Blog Page

## 🎨 Update Overview

Replaced the standard "Load More" button with the custom game-style button used on the landing page ("Projects", "About").

## ✅ Button Specifications

### **Visual Style**
- **Background**: Gradient Yellow (`from-yellow-300 to-yellow-500`)
- **Border**: Bottom border `4px` solid Orange (`border-orange-600`)
- **Shadows**:
  - Outer: `0 6px 15px rgba(0,0,0,0.15)`
  - Inner: `inset 0px 4px 4px rgba(97,82,61,0.25)`
- **Text Style**:
  - Class: `heavy-stroke-text` (1px black stroke, white fill)
  - Shadow: `2px 2px 4px rgba(0,0,0,0.3)` + White highlight
  - Font: Bold, 2xl/3xl

### **Decorative Elements**
1. **Glossy Highlight**: 
   - White rounded pill
   - Top-right corner
   - Rotated -35deg
   - Opacity 80%
2. **Depth Highlight**:
   - Gradient white strip
   - Top edge
   - Opacity 40%
3. **Glow Effect**:
   - Yellow gradient overlay
   - Fades in on hover

### **Animations**

1. **Container**:
   - Hover: Scale 1.02
   - Tap: Scale 0.98
   - Spring transition

2. **Button Body**:
   - Hover: Y -2px, Shadow increase
   - Tap: Y +1px, Shadow decrease

3. **Text**:
   - Hover: Scale 1.05
   - Tap: Scale 0.95

4. **Highlights**:
   - Glossy: Scale 1.2 on hover
   - Depth: Opacity 0.6 on hover

## 📐 Dimensions

Adjusted width to accommodate "Load More" text:
- `w-64` (mobile)
- `sm:w-72`
- `md:w-80`
- Height: `h-16` / `h-18` / `h-20`

## 📝 Files Modified

1. `src/components/Blogs/BlogPageClient.tsx`
   - Replaced button JSX
   - Added inline variants
   - Updated width classes

## 🔗 References

- Source Component: `src/components/Home/NavLinks/Navigators.tsx`
- Global Styles: `src/app/globals.css` (.heavy-stroke-text)
