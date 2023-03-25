export default class Timer {
	constructor(root) {
		root.innerHTML = Timer.getHTML();
		
		this.el = {
		    minutes: root.querySelector(".timer__part--minutes"),
		    seconds: root.querySelector(".timer__part--seconds"),
		    control: root.querySelector(".timer__btn--control"),
		    reset: root.querySelector(".timer__btn--reset"),
		    respawn: root.querySelector(".timer__part--respawn"),
		    nextmin: root.querySelector(".timer__part--nextmins"),
		    nextsec: root.querySelector(".timer__part--nextsecs")
		};
		
		console.log(this.el.minutes);
		console.log(this.el.seconds);
		
		this.interval = null;
		
		this.audioQueue = true;
		
		console.log(this.respawnWave);
		
		const d = new Date();
		this.now = d.getTime();
		this.millisecondsPast = this.now % 1800000;
		this.remainingSeconds = Math.floor((1800000 - this.millisecondsPast)/1000);
		
		console.log(this.remainingSeconds);
		this.getRespawn();
		console.log(this.respawnWave);
		
		this.updateInterfaceTime();
		this.start();
	}
	
	toggleAudio() {
        if (this.audioQueue) {
            console.log("MUTING")
            this.audioQueue = true 
        }
        else {
            console.log("UNMUTING")
            this.audioQueue = true 
        }
}
	
	getRespawn() {
	    this.data = [1780, 1760, 1740, 1720, 1700, 1680, 1660, 1640, 1620, 1600, 1580, 1560, 1540, 1520, 1492, 1464, 1436, 1408, 1380, 1352, 1324, 1296, 1268, 1240, 1212, 1184, 1148, 1112, 1076, 1040, 1004, 968, 932, 896, 860, 816, 772, 728, 684, 640, 596, 552, 500, 448, 396, 344, 292, 232, 172, 112, 52];

	    console.log("GETTING RESPAWN");
	    
	    let i = 0;
	    while (this.remainingSeconds < this.data[i]) {
	        i++;
	    }
	    
	    console.log(this.respawnWave);
	    this.respawnWave = i;
	}
	
	updateInterfaceTime() {
	    const mins = Math.floor(this.remainingSeconds / 60);
        const secs = this.remainingSeconds % 60;
        this.timeToSpawn = this.remainingSeconds - this.data[this.respawnWave];
        this.nextMins = Math.floor(this.data[this.respawnWave] / 60);
        this.nextSecs = this.data[this.respawnWave] % 60;

        this.el.minutes.textContent = mins.toString().padStart(2, "0");
        this.el.seconds.textContent = secs.toString().padStart(2, "0");
        this.el.respawn.textContent = this.timeToSpawn.toString().padStart(2, "0");
        this.el.nextmin.textContent = this.nextMins.toString().padStart(2,"0");
        this.el.nextsec.textContent = this.nextSecs.toString().padStart(2,"0");
	}
	
	playAudio() {
	    switch (this.timeToSpawn) {
	        case 30:
	            var audio30 = new Audio('30seconds.mp3');
	            console.log("Playing audio 30.");
				audio30.play();
	            break;
	        case 20:
	            var audio20 = new Audio('20seconds.mp3');
	            console.log("Playing audio 20.");
				audio20.play();
	            break;
	        case 10:
	            var audio10 = new Audio('10seconds.mp3');
	            console.log("Playing audio 10.");
				audio10.play();
	            break;
	        case 5:
	            var audio5 = new Audio('5.mp3');
	            console.log("Playing audio 5.");
				audio5.play();
				break;
	        case 4:
	            var audio4 = new Audio('4.mp3');
				console.log("Playing audio 4.");
	            audio4.play();
	            break;
	        case 3:
	            var audio3 = new Audio('3.mp3');
				console.log("Playing audio 3.");
	            audio3.play();
	            break;
	        case 2:
				var audio2 = new Audio('2.mp3');
				console.log("Playing audio 2.");
	            audio2.play();
	            break;
	        case 1:
	            var audio1 = new Audio('1.mp3');
				console.log("Playing audio 1.");
	            audio1.play();
	            break;
	        case 0:
	            var audioRespawning = new Audio('respawn.mp3');
				console.log("Playing audio Respawning.");
	            audioRespawning.play();
	            break;
	       }
	}
	
	start() {
	    if (this.remainingSeconds === 0) return;
	    
	    this.interval = setInterval(() => {
	        this.remainingSeconds--;
	        this.updateInterfaceTime();
	        
	        if (this.audioQueue) {
	            this.playAudio();
	        }
	        
	        if (this.remainingSeconds === 0) {
	            this.remainingSeconds = 1800;
	            this.respawnWave = 0;
	            this.timeToSpawn = 20;
	        }
	        if (this.timeToSpawn <= 0) {
	            this.respawnWave++; 
	        }
	    }, 1000);
	}

	
	static getHTML() {
		return `
			<span class="timer__part">War - </span>
			<span class="timer__part timer__part--minutes">00</span>
			<span class="timer__part">:</span>
			<span class="timer__part timer__part--seconds">00</span>
			<br>
			<span class="timer__part">Next respawn in: </span>
			<span class="timer__part timer__part--respawn">00</span>
			<br>
			<span class="timer__part">(</span>
			<span class="timer__part timer__part--nextmins">00</span>
			<span class="timer__part">:</span>
			<span class="timer__part timer__part--nextsecs">00</span>
			<span class="timer__part">)</span>
		`;
	}
}