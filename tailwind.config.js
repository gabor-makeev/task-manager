import defaultTheme from "tailwindcss/defaultTheme"
import forms from "@tailwindcss/forms"

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
		"./storage/framework/views/*.php",
		"./resources/views/**/*.blade.php",
		"./resources/js/**/*.jsx",
	],

	theme: {
		extend: {
			fontFamily: {
				sans: ["Figtree", ...defaultTheme.fontFamily.sans],
			},
			margin: {
				"80px": "80px",
			},
		},
	},

	plugins: [forms],

	safelist: [
		{
			pattern: /bg-.+/,
		},
		{
			pattern: /border-.+/,
		},
		{
			pattern: /stroke-.+/,
		},
		{
			pattern: /fill-.+/,
		},
		{
			pattern: /ring-.+/,
		},
	],
}
