import Framework from 'froobit';

export class BezierCurve extends Framework.Entity {
	initizalize() {
		this.controlPoints = [];
	}
	update(points) {
		this.controlPoints = points;
	}
	render(p) {
		p.noFill();
		p.stroke(255, 0, 0);
		p.strokeWeight(2);
		if (this.controlPoints) {
			p.bezier(...this.controlPoints);
		}
	}
}