import Framework from 'froobit';

const MARGIN = 5;

export class MadeWith extends Framework.Entity {
	render(p, { img }) {
		const x = MARGIN;
		const y = p.height - img.height - MARGIN;
		p.translate(x, y);
		p.image(img, 0, 0);
	}
}