export class Timer {
	private callback: () => void;
	private remaining: number;
	private startInMs: number;
	private id: NodeJS.Timeout | null;

	constructor(callback: () => void, delay: number) {
		this.callback = callback;
		this.remaining = delay;
		this.startInMs = 0;
		this.id = null;
	}

	pause() {
		clearTimeout(this.id!);
		const now = Date.now();
		this.remaining -= now - this.startInMs;
	}

	resume() {
		this.startInMs = Date.now();
		clearTimeout(this.id!);
		this.id = setTimeout(this.callback, this.remaining);
	}

	start() {
		this.startInMs = Date.now();
		this.id = setTimeout(this.callback, this.remaining);
	}
}
