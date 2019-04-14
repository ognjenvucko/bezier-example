import Framework from 'froobit';

export class ControlPoint extends Framework.Entity {
	static id = 0
	constructor(point, radius) {
		super();
		this.id = ControlPoint.id++;
		this.point = point;
		this.radius = radius;
	}
	update(x, y) {
		this.point = {
			x, y,
		};
	}
	getPos() {
		return {
			...this.point,
		};
	}
	render(p) {
		const { x, y } = this.point;
		p.fill(0, 100);
		if (this.id === 1 || this.id === 2) {
			p.fill(0, 200);
		}
		p.noStroke();
		p.ellipse(x, y, this.radius, this.radius);
	}
}