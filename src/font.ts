import { Roboto } from 'next/font/google'

/**
 * @constant roboto
 * @description Configuration object for the Roboto font, imported using next/font.
 * This ensures optimized font loading for Next.js performance.
 *
 * @property weight - An array specifying the desired font weights (e.g., '300', '400').
 * @property subsets - An array of character subsets to load (e.g., 'latin').
 * @property display - The font display strategy. 'swap' indicates that text
 * will be displayed using a system font until the web font is loaded.
 * @property variable - Defines a CSS variable that will be used for this font.
 * This allows easy application of the font in CSS (e.g., `font-family: var(--font-roboto)`).
 */
export const roboto = Roboto({
  weight: ['300', '400', '500', '700'], // Specify the desired weights for the Roboto font.
  subsets: ['latin'], // Load the Latin character subset.
  display: 'swap', // Use the 'swap' font-display strategy for better UX.
  variable: '--font-roboto', // Define a CSS variable for easy font usage.
})
