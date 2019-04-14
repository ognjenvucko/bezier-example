import Framework from 'froobit';

const MARGIN = 20;

export class InfoText extends Framework.Entity {
	render(p) {
		p.textAlign(p.TOP);
		p.text('Click to set control points; Drag to change the curve;', MARGIN, MARGIN);
	}
}