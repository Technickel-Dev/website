// TODO
// This is on hold until I figure out a way to correctly calculate css values from variables.
import wave from './waves.svg?raw';

export function GET({ request, url }) {
	const fill = decodeURIComponent(url.searchParams.get('f')) || '#fff';
	console.log('fill', fill);
	const stroke = url.searchParams.get('s') || '#000';
	const replaced_fill_svg = wave.replaceAll('#fill', fill);
	// h = parseInt(url.searchParams.get('h') || '1000');
	// count = parseInt(url.searchParams.get('count') || '100');

	// const svg = render();
	return new Response(replaced_fill_svg, {
		headers: {
			'content-type': 'image/svg+xml',
			'cache-control': 'private, max-age=3600'
		}
	});
}
