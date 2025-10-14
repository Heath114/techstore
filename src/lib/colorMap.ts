// src/lib/colorMap.ts
// Map color names to hex values

export const colorMap: { [key: string]: string } = {
  // Basic colors
  'black': '#000000',
  'white': '#FFFFFF',
  'red': '#EF4444',
  'blue': '#3B82F6',
  'green': '#10B981',
  'yellow': '#FBBF24',
  'purple': '#A855F7',
  'pink': '#EC4899',
  'orange': '#F97316',
  'gray': '#6B7280',
  'grey': '#6B7280',
  
  // Extended colors
  'silver': '#C0C0C0',
  'gold': '#FFD700',
  'rose gold': '#B76E79',
  'navy': '#1E3A8A',
  'sky blue': '#0EA5E9',
  'lime': '#84CC16',
  'teal': '#14B8A6',
  'indigo': '#6366F1',
  'violet': '#8B5CF6',
  'fuchsia': '#D946EF',
  'rose': '#F43F5E',
  'cyan': '#06B6D4',
  'amber': '#F59E0B',
  'emerald': '#059669',
  
  // Material/finish colors
  'matte black': '#1A1A1A',
  'glossy black': '#000000',
  'space gray': '#52525B',
  'midnight': '#1E293B',
  'graphite': '#3F3F46',
  'bronze': '#CD7F32',
  'copper': '#B87333',
  'titanium': '#878681',
  'platinum': '#E5E4E2',
  'champagne': '#F7E7CE',
  
  // Pastel colors
  'pastel pink': '#FFD1DC',
  'pastel blue': '#AEC6CF',
  'pastel green': '#B4E7B8',
  'pastel purple': '#E0BBE4',
  'mint': '#98FF98',
  'coral': '#FF7F50',
  'peach': '#FFE5B4',
  'lavender': '#E6E6FA',
  'beige': '#F5F5DC',
  'cream': '#FFFDD0',
  
  // Dark variants
  'dark red': '#991B1B',
  'dark blue': '#1E3A8A',
  'dark green': '#065F46',
  'dark gray': '#374151',
  'dark purple': '#581C87',
  
  // Light variants
  'light gray': '#D1D5DB',
  'light blue': '#BFDBFE',
  'light pink': '#FBCFE8',
  'light green': '#BBF7D0',
};

/**
 * Get hex color from color name
 * Returns the hex code if found, otherwise returns a default gray
 */
export function getColorHex(colorName: string): string {
  const normalized = colorName.toLowerCase().trim();
  return colorMap[normalized] || '#9CA3AF'; // Default to gray if not found
}

/**
 * Get a list of color objects from color names
 */
export function getColorObjects(colorNames: string[]): Array<{ name: string; hex: string }> {
  return colorNames.map(name => ({
    name: name,
    hex: getColorHex(name)
  }));
}
